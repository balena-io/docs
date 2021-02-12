---
title: Offline updates
excerpt: An efficient approach for updating previously deployed IoT devices when they're offline by design.
---

# Offline Updates

Offline updates is a process to update devices without needing an internet connection. It involves preloading an image and reflashing it to on a device in a way that it retains its unique balena identity, apps, and configurations. This process helps in scenarios where device's internet access is unavailable, limited, blocked or even when it's air-gapped.

## Overview of the process

When a device is reflashed, it defaults back to a factory state. The device is provisioned with a new identity, a new API key, and updated [`config.json`][config-file] settings. All services, data and logs stored on the device are erased permanently.

With the offline updates process, the device still resets to a default factory state. It adds a new API key while preserving its identity in [`config.json`][config-file]. It uses [`balena preload`][balena-preload] to load an updated application release. That way, the device will pick up right where it left off with the same name and UUID but with an updated application release or/and balenaOS update. Broad steps of the process include:

1. Downloading appropriate balenaOS version (can be an upgrade or the same version).
2. Generating a device-specific `config.json` file for the device.
3. Inserting the custom `config.json` file into the downloaded balenaOS image.
4. Running `balena preload` on the image, pointing to whichever version of your code you want to deploy to the device.
5. Flashing this preloaded image to an SD card, a device's eMMC or a separate (flasher) USB drive.
6. Updating device state on balenaCloud and optionally tagging the device.

When you insert the SD card or USB drive into your device and boot it, the device will be reflashed, retaining its balena identity, and all your updates will be in place and running.

## Configuration and Data Recovery

Some consideration is required if an application requiring persistent data storage is being used to recover user data while using the offline update process. The application can't use the pre-provisioned [named volumes][named-volumes], since these will be wiped during the offline update process.

If this is the case, mount an external mass storage (USB) device into a privileged data container and share it to other containers (if applicable) via NFS or similar network storage protocol for the data. These external storage devices are not part of the update process. Hence, data on them would be left intact, as long as they are temporarily disconnected during the update process. By contrast, a typical balena online update leaves services and data intact, and [persistent logging][persistent-logging] can be enabled to save your logs across device restarts.

## Performing an Offline Update

To perform an offline update, we will be using [balena-cli][balena-cli]. All commands should work on Linux distributions running Docker on Linux Kernel with AUFS and overlay filesystem support. For Windows and macOS, the last version of Docker Desktop supporting AUFS is 18.06.1

> Note: In an offline updates process, all data on the device is wiped at this point, making this different from a typical software update process in the balena ecosystem. Any additional user data and system settings written to various device partitions would be lost in this process.

Offline update includes the following steps:

- [Setup](#setup)
- [Create/use pre-existing application](#createuse-pre-existing-application)
- [Create/use pre-existing offline device](#createuse-pre-existing-offline-device)
- [Download balenaOS image](#download-balenaos-image)
- [Configure balenaOS image](#configure-balenaos-image)
- [Create and preload release](#create-and-preload-release)
- [Create update media](#create-update-media)
- [Update device registration(s)](#update-device-registrations)
- [Process of reprovisioning](#process-of-reprovisioning)

The process needs some prerequiste knowledge of the balena ecosystem, [balena-cli][balena-cli] commands and shell commands. Please read all instructions carefully and make sure to try the update process first on a test device.

### Setup

> Download and install [balena-cli][balena-cli] on a Linux distribution. The commands have been tested to work on Ubuntu 20.04.

Several `balena-cli` commands require access to a balenaCloud account. Those commands require creating a CLI login session by running [`balena login`](https://www.balena.io/docs/reference/balena-cli/#logging-in) in the terminal.

```bash
$ balena login
```

Store the filename of your OpenSSH private key in an environment variable or generate an SSH key using the commands below. The SSH keys will be added to the device and used to SSH into the device after provisioning to help in debugging if needed.

```bash
# (optional) if you already have SSH key(s)
$ ssh-keygen -o -a 100 -t ed25519 -f id_ed25519 -C 'offline-updates' -N ''

# must contain the filename of the OpenSSH private key
$ ssh_key=id_ed25519.pub
```

### Create/Use Pre-existing Application

Initialize the `arch` and `device-type` environment variable with correct CPU architecture (`aarch64`, `armv7l`, etc.) and device type (`raspberrypi4-64`, `raspberrypi3`, etc.). The list of names for supported device types and their architectures can be found on the [hardware][supported-devices-list] page.

If a pre-existing application needs to be re-used, then initialize the `app_name` variable with that application's name.

```bash
$ arch=<CPU ARCHITECTURE TYPE>
$ device_type=<DEVICE_TYPE>
$ app_name=offline-${arch}
```

These environment variables will be used later in the process. If a pre-existing application is needed to be used, then the next step can be skipped. Otherwise, create a new balenaCloud application by running [`balena app create`](https://www.balena.io/docs/reference/balena-cli/#app-create-name).

```bash
$ balena app create ${app_name} --type ${device_type}
```

Initialize the `app_slug` environment variable with the command below to store the slug of the application.

```bash
$ app_slug=$(balena app ${app_name} | grep SLUG | awk '{print $2}')
```

### Create/Use Pre-existing Offline Device

If a new offline device is being created, then the following command can be used. Otherwise, the `uuid` environment variable can be initialized with the UUID of a pre-existing device that needs to be updated.

```bash
$ uuid=$(uuidgen | tr '[:upper:]' '[:lower:]' | sed 's/-//g')
```
OR
```
$ uuid=<UUID OF YOUR DEVICE>
```

With [`balena device register`][balena-device-register], devices can be preregistered to a balenaCloud application involving a simple call with a unique identifier for the device. You can read more about the full process of pre-registering a device in the [balena-cli advanced masterclass][balena-cli advanced masterclass]. This step can be skipped if a pre-existing device is needed to be updated.

```bash
$ balena device register ${app_slug} --uuid ${uuid}
```

### Download balenaOS Image

Download the latest production version of [balenaOS][balenaos] for the device type initialized in the `device_type` version.

```bash
$ os_version=$(balena os versions ${device_type} | grep prod | head -n 1 | awk '{print $1}')
$ tmpimg=$(mktemp).img

$ balena os download ${device_type} \
  --output ${tmpimg} \
  --version ${os_version}
```

### Configure balenaOS Image

Configure the downloaded image by injecting a [config.json][config-file] file using the [`balena os configure`][balena-os-configure] command. Most common system settings can be (re)specified via [config.json][config-file]. To preserve the pre-existing registered device's identity, the same `uuid` initialized earlier will be used to generate a config.json file.

```bash
$ tmpconfig=$(mktemp)
$ config=$(mktemp)

$ balena config generate \
    --device ${uuid} \
    --version ${os_version} \
    --network ethernet \
    --appUpdatePollInterval 10 \
    --output ${tmpconfig} \
    && cat ${tmpconfig} | jq .

$ cat < ${tmpconfig} \
    | jq --arg keys "$(cat ${ssh_key})" '. + {os: {sshKeys: [$keys]}}' > "${config}" \
    && cat < ${config} | jq .

$ balena os configure ${tmpimg} \
    --app ${app_slug} \
    --device-type ${device_type} \
    --version ${os_version} \
    --config-network ethernet \
    --config ${config}

$ rm ${tmpconfig}
$ rm ${config}
```

### Create and Preload Release

Offline update revolve around the concept of [balena preload][balena-preload]. Preload is used to flash the balenaOS image and your application release in a single step, so the device starts running your application containers as soon as it boots. Preloading removes the need for your devices to download the initial application images directly from balena's build servers, making it an ideal base for the offline update process. Read more about [preloading a device image][preloading-device-image].

> Important note: [balena preload](https://github.com/balena-io/balena-cli/blob/master/INSTALL-MAC.md#balena-preload) functionality requires Docker with AUFS support.

Since preload involves flashing an application release with the balenaOS image, if the pre-existing application doesn't have any releases, then a release needs to be created using [`balena deploy`][balena-deploy]. Navigate to the directory of your source code folder and run the command below to deploy the latest release of your application. If a release is present already, then the next step can be skipped.

```bash
$ balena deploy ${app_slug} --build --emulated --source .
```

The following steps will flash the latest release onto the balenaOS image downloaded in the previous steps and pin the device to mentioned release commit.

```bash
$ commit=$(balena app ${app_slug} | grep COMMIT | awk '{print $2}')

$ balena preload ${tmpimg} \
    --app ${app_slug} \
    --commit ${commit} \
    --no-pin-device-to-release
```

### Create Update Media

Next, a USB flash drive, an SD card or any relevant storage media needs to be prepared and flashed. This storage media will be used to update the device through the offline process. Plug in your storage media and run the following the commands.

> Note: The process of flashing will delete all data stored on the storage media.

```bash
# list the devices available to flash
$ balena util available-drives

# Please make sure `--drive` is really the disk you want to write to.
$ sudo balena local flash ${tmpimg} \
    --drive /dev/{{flash-usb-disk}}

$ rm ${tmpimg}
```

### Update Device Registration(s)

This section deals with device registration in the cloud (balenaCloud or openBalena). The following steps help in
* manually reflecting the new state of the device for offline devices or devices on private networks without Internet access
* prevent devices with restricted or low bandwidth connectivity from trying to download newer releases.

#### Patch State Endpoint - Update Device State in the Cloud

This step updates the device state in the cloud (balenaCloud or openBalena)
on behalf of the device, as if the had just installed the new release. It is
optional for devices that do not have an internet connection, but mandatory if
the device has a unreliable/limited connectivity or low bandwidth internet
connection.

In such unreliable or limited bandwidth connection situations, you will need to
run the commands of this step after you have powered off the device. This step
will pin the device to the release that was preloaded to the image, to ensure
that the device doesn't attempt to download a newer release over an unreliable
or limited bandwidth connection.

```bash
$ os_version_tag=$(echo ${os_version} | awk -F'+' '{print $1}')
$ os_version_semver=$(echo ${os_version_tag} | sed 's/v//g')
$ os_revision=$(echo ${os_version} | awk -F'+' '{print $2}' | awk -F'.' '{print $1}')
$ os_variant=$(echo ${os_version} | awk -F'+' '{print $2}' | awk -F'.' '{print $2}')

$ supervisor_version=$(curl --silent https://raw.githubusercontent.com/balena-os/meta-balena/${os_version_tag}/meta-balena-common/recipes-containers/resin-supervisor/resin-supervisor.inc \
    | grep SUPERVISOR_TAG \
    | awk '{print $3}' \
    | sed 's/"//g' \
    | sed 's/v//g')

$ if [ -z "$BALENARC_BALENA_URL" ]; then BALENARC_BALENA_URL=balena-cloud.com; fi

$ release_id=$(curl --silent \
    "https://api.${BALENARC_BALENA_URL}/v6/release?\$filter=startswith(commit,'${commit}')&\$select=id" \
    -H "Authorization: Bearer $(cat ~/.balena/token)" | jq -r .d[].id)

$ curl --silent \
    -X 'PATCH' "https://api.${BALENARC_BALENA_URL}/v6/device(uuid='${uuid}')" \
    -H "Authorization: Bearer $(cat ~/.balena/token)" \
    -H 'Content-type: application/json' \
    --data-binary "{\"os_variant\":\"${os_variant}\",\"os_version\":\"balenaOS ${os_version_semver}+${os_revision}\",\"supervisor_version\":\"${supervisor_version}\",\"is_running__release\":${release_id},\"should_be_running__release\":${release_id}}"
```

#### [Optional] Set Tags on Devices

Tags help identify and track devices in your fleet as to what commit and OS version have they been flashed & updated offline with. One can use [`balena tag set`][balena-tag-set] to create new tags as needed.

```bash
$ balena tag set 'offline:commit' "${commit}" \
  --device ${uuid}

$ balena tag set 'offline:hostOS' "${os_version}" \
  --device ${uuid}
```

### Process of Reprovisioning

> Warning: For devices with internal storage, this procedure erases the internal media of your device. Hence, remove any mass storage devices containing user data.

With the update media ready having the latest release of the application preloaded. Follow the device's provisioning instructions present on balenaCloud dashboard for your specific device.

For example: For Raspberry Pi devices, insert the recently flashed SD card and power up the device. When the process is complete, (re)connect any mass storage devices containing user data back to the device. Reconnect the device to the local air-gapped network(s). Later, use SSH to connect and inspect application logs, etc.

#### Strategies to remotely update with an SD card or USB device

If a device isn't locally deployed, one can ship the flashed SD cards or USB sticks/drives to a remote location.

If the target device exists on an air-gapped or Internet restricted network, [inserting ssh keys][insert-ssh-key] during the configuration step will allow fleet managers at the remote site to connect into the device directly via OpenSSH and verify the update by examining container logs, etc. In such cases someone can run the update by simply inserting them into the devices and booting.

If the target device is connected via a low-bandwidth connection, it should eventually establish a connection to balenaCloud. Depending on the connection's quality, it may respond to [web terminal][web-terminal] commands and output container logs to the dashboard.

Read more about how the process can work better for your usecase in the [offline updates](https://balena.io/blog/offline-updates-make-it-easier-to-update-balena-devices-without-the-internet) blog.

[named-volumes]: /learn/develop/multicontainer/#named-volumes
[persistent-logging]: /reference/OS/configuration/#persistentlogging
[balena-cli]: /reference/balena-cli/
[supported-devices-list]: /reference/hardware/devices/
[balena-cli advanced masterclass]: /learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[balena-deploy]:/learn/deploy/deployment/#balena-build--deploy
[balenaOS]:{{ $links.osSiteUrl }}
[insert-ssh-key]:/reference/OS/configuration/#sshkeys
[balena-os-configure]:/reference/balena-cli/#os-configure-image
[balena-device-register]:/reference/balena-cli/#device-register-application
[config-file]:/reference/OS/configuration/#valid-fields
[balena-preload]:/reference/balena-cli/#preload
[preloading-device-image]:/learn/more/masterclasses/advanced-cli/#51-preloading-a-device-image
[web-terminal]:/learn/manage/ssh-access/#using-the-dashboard-web-terminal
[balena-tag-set]:/reference/balena-cli/#tag-set-tagkey-value
