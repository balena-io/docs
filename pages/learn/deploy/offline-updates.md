---
title: Offline updates
excerpt: An efficient approach for updating previously deployed IoT devices when they’re offline by design.
---

# Offline updates

Offline updates is an efficient process to update devices without needing an internet connection. It involves preloading a image and reflashing it to on a device in a way that it retains its unique balena identity, apps, and configurations. This is helpful in scenarios where device's internet access is unavailable, limited, blocked or even when it's air-gapped. 

## Overview of the process

When a device is reflashed, it defaults back to a factory state. The device gets a new identity, a new API key, and updated `config.json` settings. All services, data and logs stored on the device is erased permanently. 

With the offline upgrades process, the device still resets to a factory default state, all the preserving its identity in `config.json` with a new API key and then using `balena preload` to load an updated application release. That way, the device will pick up right where it left off with the same name and UUID but with an updated application release or/and balenaOS upgrade. Broad steps in the process include:

1. Download appropriate balenaOS version (can be an upgrade or the same)
2. Generate a device-specific `config.json` file for the device
3. Insert the custom `config.json` file into the downloaded balenaOS image
4. Run `balena preload` on the image, pointing to whichever version of your code you want to deploy
5. Flash this preloaded image to an SD card, a device’s eMMC or a separate (flasher) USB drive
6. Update device state on balenaCloud and optionally tag the device

When you insert the SD card or USB into your device and boot it, the device will be reflashed, retaining its balena identity, and all your updates will be in place and running.

## Configuration and data recovery

Application requiring persistent data storage will need some careful consideration to recovering user data if using the offline upgrade process. The application can’t use the pre-provisioned [named volumes][named-volumes], since these will be wiped during the offline upgrade process.

If this is the case, we recommend mounting an external mass storage (USB) device into a privileged data container and sharing it to other containers (if applicable) via NFS or similar network storage protocol. These external storage devices are not part of the upgrade process, so data on them would be left intact, as long as they are temporarily disconnected during the upgrade process. By contrast, a typical balena online update leaves services and data intact, and persistent logging can be enabled to save your logs across device restarts.s

## Performing an offline upgrade 

To perform an offline upgrade, we will be using [balena-cli](https://www.balena.io/docs/reference/balena-cli/). All commands should work on Linux distributions running Docker on Linux Kernel with AUFS and overlay filesystem support. For Windows and macOS, the last version of Docker Desktop supporting AUFS is 18.06.1

<A line about Mention how important env variables in the process>
<A line about optional stages and where actually the process is the same for both new and existing devices>

> Note: In an offline upgrades process, all data on device is wiped at this point, making this different from a typical software update process in the balena ecosystem. In this process, any additional user data and system settings written to various device partitions would be lost.

Offline updates includes the following steps:

- [Setup](#setup)
- [Create application](#createuse-pre-existing-application)
- [Create offline device](#createuse-pre-existing-offline-device)
- [Download balenaOS image](#download-balenaos-image)
- [Configure balenaOS image](#configure-balenaos-image)
- [Create and preload release](#create-and-preload-release)
- [Create update media](#create-update-media)
- [Reprovisioning process](#process-of-reprovisioning)
- [Update device registration(s)](#update-device-registrations)


### Setup

> Download and install [balena-cli][balena-cli] on a linux distribution. The commands have been tested to work on Ubuntu 20.04.

Several `balena-cli` commands require access to a balenaCloud account. Those commands require creating a CLI login session by running [`balena login`](https://www.balena.io/docs/reference/balena-cli/#logging-in) in the terminal. 

```bash
$ balena login
```

Store the filename of your OpenSSH private key in an environment variable or generate an SSH key using the commands below. The SSH keys will be added to the device and will be used to SSH into the device after provisioning that will help 

```bash
# (optional) if you already have SSH key(s)
$ ssh-keygen -o -a 100 -t ed25519 -f id_ed25519 -C 'offline-updates' -N ''

# must contain the filename of the OpenSSH private key
$ ssh_key= id_ed25519.pub
```

### Create/Use pre-existing application

Initalize the `arch` and `device-type` environment variable with correct CPU architecture (`aarch64`, `armv7l`, etc.) and device type (`raspberrypi4-64`, `raspberrypi3`, etc.). The list of names for supported device types and their architectures can be found on the [hardware][supportedDevicesList] page. 

If a pre-existing application needs to be re-used, then initalize the `app_name` variable with the name of that application.

```bash
$ arch=<CPU ARCHITECTURE TYPE>
$ device_type=<DEVICE_TYPE>
$ app_name=offline-${arch}
```

The environement variables will be used later in the process. If a pre-existing application is needed to be used then the next step can be skipped. Otherwise, create a new balenaCloud application by running [`balena app create`](https://www.balena.io/docs/reference/balena-cli/#app-create-name). 

```bash
$ balena app create ${app_name} --type ${device_type}
```

Initalize the `app_slug` environment variable to store the slug of the application.

```bash
$ app_slug=$(balena app ${app_name} | grep SLUG | awk '{print $2}')
```

### Create/Use pre-existing offline device

If a new offline device is being created, then the following command can be used. Otherwise, the `uuid` environment variable can be initialized with the UUID of a pre-existing device that needs to be updated.  

```bash
$ uuid=$(uuidgen | tr '[:upper:]' '[:lower:]' | sed 's/-//g')
```

With `balena device register`, devices can be preregistered to a balenaCloud application  involving a simple call with a unique identifier for the device. You can read more about full process of pre-registering a device in the [balena-cli advanced masterclass][balena-cli advanced masterclass]. This step can be skipped if a pre-existing device is needs to be updated. 

```bash
$ balena device register ${app_slug} --uuid ${uuid}
```

### Download balenaOS image

Download the latest production version of [balenaOS][balenaOS] for the device type initalized in the `device_type` version.

```bash
$ os_version=$(balena os versions ${device_type} | grep prod | head -n 1 | awk '{print $1}')
$ tmpimg=$(mktemp).img

$ balena os download ${device_type} \
  --output ${tmpimg} \
  --version ${os_version}
```

### Configure balenaOS image

Next, configure the downloaded image by injecting a [config.json][config-file] file using the [`balena os configure`][balena-os-configure] command. Most common system settings can be (re)specified via [config.json](config-file). To preserve the identify of the pre-existing registered device, the same `uuid` initalized earlier will be used for generating a config.json file. 

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

### Create and Preload release

Offline updates revolve around the concept of [balena preload][balena-preload]. Preload can be used to flash the balenaOS image and your application release in a single step so your device starts running your application containers as soon as it boots. Preloading removes the need for your devices to download the initial application images directly from balena’s build servers, making it an ideal base for the offline update process. Read more about [preloading a device image][preloading-device-image].

> Important note: [balena preload](https://github.com/balena-io/balena-cli/blob/master/INSTALL-MAC.md#balena-preload) functionality requires Docker with AUFS support

Since preload involves flashing an application release, if the pre-existing application doesn't have any releases then a release is needed to be made. Otherwise this next step is optional. 

```bash
$ date +%s > app/.epoch

$ balena deploy ${app_slug} --build --source .
```

The following steps will flash the latest release onto the balenaOS image downloaded in the previous steps along with pinning the device to said release. 

```bash
$ commit=$(balena app ${app_slug} | grep COMMIT | awk '{print $2}')

$ balena preload ${tmpimg} \
    --app ${app_slug} \
    --commit ${commit} \
    --pin-device-to-release
```

### Create Update media

Next, a USB flash drive, an SD card or any relevant storage media needs to be prepared and flashed. This storage media will be used to update the device through the offline process. Plug in your storage media and run the following the commands.

> Note: The process of flashing will delete all data stored on the storage media. 

```bash
# list the devices available to flash
$ balena util available-drives
/dev/...

# Please make sure `--drive` is really the disk you want to write to. 
$ sudo balena local flash ${tmpimg} \
    --drive /dev/{{flash-usb-disk}}

$ rm ${tmpimg}
```

### Process of reprovisioning 

> Warning: For devices with internal storage this procedure erases the internal media of your device. Hence, remove any mass storage devices containing user data.

With the update media ready having the latest release of the application preloaded. Follow the device's provisioning instructions present on balenaCloud dashboard for your specific device. 

For example: For Raspberrypi devices, insert the recently flashed SD card and power up the device. When the process is complete, (re)connect any mass storage devices containing user data back to the device. Reconnect the device to the local air-gapped network(s). Later, use SSH to connect and inspect application logs, etc.


#### Strategies to remotely update with a SD card or USB device

If a device isn’t local, you can just ship the SD card or USB stick/drive to a remote location and let someone there run the update by simply inserting it into the device and booting.

If the target device exists on an air-gapped or Internet restricted network, inserting [ssh](https://www.balena.io/docs/reference/OS/configuration/#sshkeys) keys during the configuration step will allow fleet managers at the remote site to connect into the device directly via OpenSSH and verify the update by examining container logs, etc.

In the event the target device is connected via a low-bandwidth connection, it should eventually establish a connection to balenaCloud, and depending on the quality of the connection, it may respond to Web Terminal commands and output container logs to the dashboard.

### Update Device Registration(s)

This section deals with device registration.

>  manually reflect the new state of the device in balenaCloud for offline devices or devices on private networks without Internet access

#### [Optional] patch state endpoint

This step is strictly not required for devices with low bandwidth internet connections as those devices would be able to update the state endpoint automatically.

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

# (e.g.) staging
$ release_id=$(curl --silent \
	  "https://api.balena-staging.com/v6/release?\$filter=startswith(commit,'${commit}')&\$select=id" \
	  -H "Authorization: Bearer $(cat ~/.balena/token)" | jq -r .d[].id)

$ curl --silent \
	  -X 'PATCH' "https://api.balena-staging.com/v6/device(uuid='${uuid}')" \
	  -H "Authorization: Bearer $(cat ~/.balena/token)" \
	  -H 'Content-type: application/json' \
	  --data-binary "{\"os_variant\":\"${os_variant}\",\"os_version\":\"balenaOS ${os_version_semver}+${os_revision}\",\"supervisor_version\":\"${supervisor_version}\",\"is_running__release\":${release_id}}"
```

#### [Optional] Set Tags

Tags help in better identification and tracking of devices in your fleet as to what commit and OS version have they been flashed & upgraded offline with. One can use [`balena tag set`][balena-tag-set] to create new tags as needed. 

```bash
$ balena tag set 'offline:commit' "${commit}" \
  --device ${uuid}

$ balena tag set 'offline:hostOS' "${os_version}" \
  --device ${uuid}
```

Read more about how the process can work better for your usecase on the [offline upgrades]() blog.
Here's an [example project](https://github.com/balena-io-example/offline-updates/) to demonstrate offline updates for offline devices with user data mounted on external storage media persisting between hostOS and application updates. 

[named volumes]:/learn/develop/multicontainer/#named-volumes
[balena-cli]:/reference/balena-cli/
[supportedDevicesList]:/reference/hardware/devices/
[balena-cli advanced masterclass]:/learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[balenaOS]:{{ $links.osSiteUrl }}
[balena-os-configure]:/reference/balena-cli/#os-configure-image
[config-file]:/reference/OS/configuration/#valid-fields
[balena-preload]:/reference/balena-cli/#preload
[preloading-device-image]:/learn/more/masterclasses/advanced-cli/#51-preloading-a-device-image
[balena-tag-set]:/reference/balena-cli/#tag-set-tagkey-value
