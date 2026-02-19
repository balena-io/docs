---
title: Offline updates
excerpt: >-
  An efficient approach for updating previously deployed IoT devices when
  they're offline by design.
---

# Offline Updates

Offline updates is a process to update devices without needing an internet connection. It involves preloading an image and reflashing it to on a device in a way that it retains its unique balena identity, releases, and configurations. This process helps in scenarios where a device's internet access is unavailable, limited, blocked, or even when it's air-gapped.

## Overview of the process

When a device is reflashed, it defaults back to a factory state. The device is provisioned with a new identity, a new API key, and updated [`config.json`](../../reference/os/configuration.md#valid-fields) settings. All services, data and logs stored on the device are erased permanently.

With the offline updates process, the device still resets to a default factory state. It adds a new API key while preserving its identity in [`config.json`](../../reference/os/configuration.md#valid-fields). It uses [`balena preload`](../../external-docs/balena-cli/latest.md#preload) to load an updated release. That way, the device will pick up right where it left off with the same name and UUID but with an updated release or/and balenaOS update.

Broad steps of the process include:

1. Downloading appropriate balenaOS version (can be an upgrade or the same version).
2. Generating a device-specific `config.json` file for the device.
3. Inserting the custom `config.json` file into the downloaded balenaOS image.
4. Running `balena preload` on the image, pointing to whichever version of your code you want to deploy to the device.
5. Flashing this preloaded image to an SD card, a device's eMMC or a separate (flasher) USB drive.
6. Updating device state on balenaCloud and optionally tagging the device.

When you insert the SD card or USB drive into your device and boot it, the device will be reflashed, retaining its balena identity, and all your updates will be in place and running.

## Configuration and Data Recovery

Some consideration is required if an application requiring persistent data storage is being used to recover user data while using the offline update process. The application can't use the pre-provisioned [named volumes](../develop/multicontainer.md#named-volumes), since these will be wiped during the offline update process.

If this is the case, mount an external mass storage (USB) device into a privileged data container and share it with other containers (if applicable) via NFS or a similar network storage protocol for the data. These external storage devices are not a part of the update process. Hence, data on them would be left intact, as long as they are temporarily disconnected during the update process.

By contrast, a typical balena online update leaves services and data intact, and [persistent logging](../../reference/os/configuration.md#persistentlogging) can be enabled to save your logs across device restarts.

## Performing an Offline Update

To perform an offline update, we will be using [balena-cli](../../external-docs/balena-cli/latest.md). All commands should work on Linux distributions running Docker on Linux Kernel with AUFS and overlay filesystem support. For Windows and macOS, the last version of Docker Desktop supporting AUFS is 18.06.1

{% hint style="warning" %}
In an offline updates process, all data on the device is wiped at this point, making this different from a typical software update process in the balena ecosystem. Any additional user data and system settings written to various device partitions would be lost in this process.
{% endhint %}

Offline update includes the following steps:

* [Setup](offline-updates.md#setup)
* [Create/use pre-existing fleet](offline-updates.md#create-use-pre-existing-fleet)
* [Create/use pre-existing offline device](offline-updates.md#create-use-pre-existing-offline-device)
* [Download balenaOS image](offline-updates.md#download-balenaos-image)
* [Configure balenaOS image](offline-updates.md#configure-balenaos-image)
* [Create and preload release](offline-updates.md#create-and-preload-release)
* [Create update media](offline-updates.md#create-update-media)
* [Process of reprovisioning](offline-updates.md#process-of-reprovisioning)
* [Update device registration(s)](offline-updates.md#update-device-registration-s)

The process needs some prerequisite knowledge of the balena ecosystem, [balena-cli](../../external-docs/balena-cli/latest.md) commands and shell commands. Please read all instructions carefully and make sure to try the update process first on a test device.

### Setup

> Download and install [balena-cli](../../external-docs/balena-cli/latest.md) on a Linux distribution. The commands have been tested to work on Ubuntu 20.04.

Several `balena-cli` commands require access to a balenaCloud account. Those commands require creating a CLI login session by running [`balena login`](../../external-docs/balena-cli/latest.md#login) in the terminal.

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

### Create/Use Pre-existing Fleet

Initialize the `arch` and `device-type` environment variable with correct CPU architecture (`aarch64`, `armv7l`, etc.) and device type (`raspberrypi4-64`, `raspberrypi3`, etc.). The list of names for supported device types and their architectures can be found on the [hardware](../../reference/hardware/devices.md) page.

If a pre-existing fleet needs to be re-used, then initialize the `fleet_name` variable with that fleet's's name.

```bash
$ arch=<CPU ARCHITECTURE TYPE>
$ device_type=<DEVICE_TYPE>
$ fleet_name=offline-${arch}
```

These environment variables will be used later in the process. If a pre-existing fleet needs to be used, then the next step can be skipped. Otherwise, create a new balenaCloud fleet by running [`balena fleet create`](../../external-docs/balena-cli/latest.md#fleet-create).

```bash
$ balena fleet create ${fleet_name} --type ${device_type}
```

Initialize the `fleet_slug` environment variable with the command below to store the slug of the fleet.

```bash
$ fleet_slug=$(balena fleet ${fleet_name} | grep Slug | awk '{print $3}')
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

With [`balena device register`](../../external-docs/balena-cli/latest.md#device-register), devices can be preregistered to a balenaCloud fleet involving a simple call with a unique identifier for the device. You can read more about the full process of pre-registering a device in the [balena-cli advanced masterclass](../../external-docs/masterclasses/advanced-cli.md#id-5.2-preregistering-a-device). This step can be skipped if a pre-existing device is needed to be updated.

```bash
$ balena device register ${fleet_slug} --uuid ${uuid}
```

### Download balenaOS Image

Download the latest production version of [balenaOS](https://www.balena.io/os) for the device type initialized in the `device_type` version.

```bash
$ os_version=$(balena os versions ${device_type} | head -n 1 | awk '{print $1}')
$ tmpimg=$(mktemp).img

$ balena os download ${device_type} \
  --output ${tmpimg} \
  --version ${os_version}
```

### Configure balenaOS Image

Configure the downloaded image by injecting a [config.json](../../reference/os/configuration.md#valid-fields) file using the [`balena os configure`](../../external-docs/balena-cli/latest.md#os-configure) command. Most common system settings can be (re)specified via [config.json](../../reference/os/configuration.md#valid-fields). To preserve the pre-existing registered device's identity, the same `uuid` initialized earlier will be used to generate a config.json file.

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
    --config ${config}

$ rm ${tmpconfig}
$ rm ${config}
```

### Create and Preload Release

Offline updates revolve around the concept of [balena preload](../../external-docs/balena-cli/latest.md#preload). Preload is used to flash the balenaOS image and your fleet release in a single step, so the device starts running your release's containers as soon as it boots. Preloading removes the need for your devices to download the initial images directly from balena's build servers, making it an ideal base for the offline update process. Read more about [preloading a device image](../../external-docs/masterclasses/advanced-cli.md#id-5.1-preloading-a-device-image).

{% hint style="warning" %}
[balena preload](../../external-docs/balena-cli/latest.md#preload) functionality requires Docker with AUFS support.
{% endhint %}

Preload involves flashing a fleet's release with the balenaOS image. If the pre-existing fleet doesn't have any releases, then a release needs to be created using [`balena deploy`](deployment.md#balena-build-and-deploy). Navigate to the directory of your source code folder and run the command below to deploy the latest release of your fleet. If a release is present already, then the next step can be skipped.

```bash
$ balena deploy ${fleet_slug} --build --emulated --source .
```

The following steps will flash the latest release onto the balenaOS image downloaded in the previous steps and pin the device to mentioned release commit.

```bash
$ commit=$(balena fleet ${fleet_slug} | grep Commit | awk '{print $3}')

$ balena preload ${tmpimg} \
    --fleet ${fleet_slug} \
    --commit ${commit} \
    --pin-device-to-release
```

### Create Update Media

Next, a USB flash drive, an SD card or any relevant storage media needs to be prepared and flashed. This storage media will be used to update the device through the offline process. Plug in your storage media and run the following commands.

{% hint style="warning" %}
The process of flashing will delete all data stored on the storage media.
{% endhint %}

```bash
# list the devices available to flash
$ balena util available-drives

# Please make sure `--drive` is really the disk you want to write to.
$ sudo balena local flash ${tmpimg} \
    --drive /dev/{{flash-usb-disk}}

$ rm ${tmpimg}
```

### Process of Reprovisioning

{% hint style="danger" %}
For devices with internal storage, this procedure erases the internal media of your device. Remove any mass storage devices containing user data.
{% endhint %}

With the update media already having the latest release of the fleet preloaded, follow the device's provisioning instructions present on balenaCloud dashboard for your specific device.

An example for Raspberry Pi devices: insert the recently flashed SD card and power up the device. When the process is complete, (re)connect any mass storage devices containing user data back to the device. Reconnect the device to the local air-gapped network(s). Later, use SSH to connect and inspect logs, etc.

#### Strategies to remotely update with an SD card or USB device

If a device isn't locally deployed, one can ship the flashed SD cards or USB sticks/drives to a remote location. There someone can run the update by simply inserting them into the devices and booting.

If the target device exists on an air-gapped or Internet restricted network, [inserting ssh keys](../../reference/os/configuration.md#sshkeys) during the configuration step will allow fleet managers at the remote site to connect to the device directly via OpenSSH and verify the update by examining container logs, etc.

If the target device is connected via a low-bandwidth connection, it should eventually establish a connection to balenaCloud. Depending on the connection's quality, it may respond to [web terminal](../manage/ssh-access.md#using-the-dashboard-web-terminal) commands and output container logs to the dashboard.

### Update Device Registration(s)

This section deals with device registration in the cloud (balenaCloud or openBalena). The following steps help in manually reflecting the new state of the device for offline devices or devices on private networks without Internet access.

#### Patch State Endpoint - Update Device State in the Cloud

This step updates the device state in the cloud (balenaCloud or openBalena) on behalf of the device, as if the device was online. It is only required for devices that do not have an internet connection. If the device has an internet connection, even if low bandwidth, this step may be skipped because the device itself will be able to contact the cloud to update its state.

```bash
$ os_version_tag=$(echo ${os_version} | awk -F'+' '{print $1}')
$ os_version_semver=$(echo ${os_version_tag} | sed 's/v//g')
$ os_revision=$(echo ${os_version} | awk -F'+' '{print $2}' | awk -F'.' '{print $1}')
$ os_variant=$(echo ${os_version} | awk -F'+' '{print $2}' | awk -F'.' '{print $2}')

$ supervisor_version=$(curl --silent https://raw.githubusercontent.com/balena-os/meta-balena/${os_version_tag}/meta-balena-common/recipes-containers/balena-supervisor/balena-supervisor.inc \
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
    --data-binary "{\"os_variant\":\"${os_variant}\",\"os_version\":\"balenaOS ${os_version_semver}+${os_revision}\",\"supervisor_version\":\"${supervisor_version}\",\"is_running__release\":${release_id}}"
```

#### \[Optional] Set Tags on Devices

Tags help identify and track devices in your fleet as to what commit and OS version have they been flashed & updated offline with. One can use [`balena tag set`](../../external-docs/balena-cli/latest.md#tag-set) to create new tags as needed.

```bash
$ balena tag set 'offline:commit' "${commit}" \
  --device ${uuid}

$ balena tag set 'offline:hostOS' "${os_version}" \
  --device ${uuid}
```

Read more about how the process can work better for your use case in the [offline updates](https://balena.io/blog/offline-updates-make-it-easier-to-update-balena-devices-without-the-internet) blog.
