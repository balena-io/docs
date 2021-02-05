---
title: Offline updates
excerpt: An efficient approach for updating previously deployed IoT devices when they’re offline by design.
---

# Offline updates

Offline updates is an efficient process to update your device without needing an internet connection. It involves preloading a image and reflashing it to on a device in a way that it retains its unique balena identity, apps, and configurations. This is helpful in scenarios where device's internet access is unavailable, limited, blocked or even when it's air-gapped. 

## Performing an offline upgrade 

To perform an offline upgrade, we will be using [balena-cli](https://www.balena.io/docs/reference/balena-cli/). All commands should work on Linux distributions running Docker on Linux Kernel with AUFS and overlay filesystem support. We will be extending support and more features to other platforms too where balena-cli is available such as Windows and MacOS soon. 

> Note: In an offline upgrades process, all data on device is wiped at this point, making this different from a typical software update process in the balena ecosystem. In this process, any additional user data and system settings written to various device partitions would be lost.

## Overview of the process

<Add what will be happening over the next steps>
<A line about Mention how important env variables in the process>
<A line about optional stages and where actually the process is the same for both new and existing devices>

Offline updates includes the following steps

- [overview](#overview)
- [setup](#setup)
- [create application](#create-application)
- [create offline device](#create-offline-device)
- [download balenaOS image](#download-balenaos-image)
- [configure balenaOS image](#configure-balenaos-image)
- [create and preload release](#create-and-preload-release)
- [create update media](#create-update-media)
- [update device registration(s)](#update-device-registrations)

### Setup

> Download and install [balena-cli][balena-cli] on your linux distributions. The commands have been tested to work on Ubuntu 20.04.

#### Logging in

Several `balena-cli` commands require access to your balenaCloud account. Those commands require creating a CLI login session by running [`balena login`](https://www.balena.io/docs/reference/balena-cli/#logging-in) in your terminal. 

```bash
$ balena login
```

Store the filename of your OpenSSH private key in an environment variable or generate an SSH key using the commands below. (MENTION WHY)

```bash
# (optional) if you already have SSH key(s)
$ ssh-keygen -o -a 100 -t ed25519 -f id_ed25519 -C 'offline-updates' -N ''

# must contain the filename of your OpenSSH private key
$ ssh_key=<NAME OF FILENAME>.pub
```

### Create/Use pre-existing application

Initalise the `arch` and `device-type` environment variable with correct CPU architecture (`aarch64`, `armv7l`, etc.) and device type (`raspberrypi4-64`, `raspberrypi3`, etc.). The list of names for supported device types and their architectures can be found on the [hardware][supportedDevicesList] page. 

If a pre-existing application needs to be re-used, then initalise the `app_name` variable with the name of that application.

```bash
$ arch=<CPU ARCHITECTURE TYPE>
$ device_type=<DEVICE_TYPE>
$ app_name=offline-${arch}
```

The environement variables will be used later in the process. If a pre-existing application is needed to be used then the next step can be skipped. Otherwise, create a new balenaCloud application by running [`balena app create`](https://www.balena.io/docs/reference/balena-cli/#app-create-name). 

```bash
$ balena app create ${app_name} --type ${device_type}
```

Initalise the `app_slug` environment variable to store the slug of the application.

```bash
$ app_slug=$(balena app ${app_name} | grep SLUG | awk '{print $2}')
```

### Create/Use pre-existing offline device

If a new offline device is being created, then the following command can be used. Otherwise, the `uuid` environment variable can be initialised with the UUID of a pre-existing device that needs to be updated.  

```bash
$ uuid=$(uuidgen | tr '[:upper:]' '[:lower:]' | sed 's/-//g')
```

With `balena device register`, devices can be preregistered to a balenaCloud application  involving a simple call with a unique identifier for the device. You can read more about full process of pre-registering a device in the [balena-cli advanced masterclass][balena-cli advanced masterclass]. This step can be skipped if a pre-existing device is needs to be updated. 

```bash
$ balena device register ${app_slug} --uuid ${uuid}
```

### Download balenaOS

Download the latest production version of [balenaOS][balenaOS] for the device type initalised in the `device_type` version.

```bash
$ os_version=$(balena os versions ${device_type} | grep prod | head -n 1 | awk '{print $1}')
$ tmpimg=$(mktemp).img

$ balena os download ${device_type} \
  --output ${tmpimg} \
  --version ${os_version}
```

### Configure balenaOS image

Next, configure the downloaded image by injecting a [config.json][config-file] file using the [`balena os configure`][balena-os-configure] command. To preserve the identify of the pre-existing registered device, the same `uuid` initalised earlier will be used for generating a config.json file.

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

With the update media ready having the latest release of the application preloaded. Follow the device's provisioning instructions as present on balenaCloud dashboard. 

For example: For Raspberrypi devices, insert the recently flashed SD card and power up the device.

### Update Device Registration(s)

This section deals with device registration.

>  manually reflect the new state of the device in balenaCloud for offline devices or devices on private networks without Internet access

#### [Optional] patch state endpoint

> strictly not required for devices with low bandwidth Internet connections as they will update the state endpoint automatically

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

#### [Optional] set tags

```bash
$ balena tag set 'offline:commit' "${commit}" \
  --device ${uuid}

$ balena tag set 'offline:hostOS' "${os_version}" \
  --device ${uuid}
```

Read more about it: blog link goes here
Here's an example project to test things out https://github.com/balena-io-playground/offline-updates/



# Reflash any device offline without losing its apps or identity
Today, when you reflash a previously deployed device, you’re resetting it to a factory default state. Your device gets a new identity, a new API key, and updated `config.json` settings. All your apps, data and logs stored on the device are lost. 

With the Offline Upgrades process, you’ll still be resetting the device to factory default state, while restoring its identity in `config.json`, and then using `balena preload` to load your updated applications. That way, your device will pick up right where it left off with the same name and UUID.


### Remotely updating with a SD card or USB device

If a device isn’t local, you can just ship the SD card or USB stick/drive to a remote location and let someone there run the update by simply inserting it into the device and booting.

If the target device exists on an air-gapped or Internet restricted network, inserting [ssh](https://www.balena.io/docs/reference/OS/configuration/#sshkeys) keys during the configuration step will allow fleet managers at the remote site to connect into the device directly via OpenSSH and verify the update by examining container logs, etc.

In the event the target device is connected via a low-bandwidth connection, it should eventually establish a connection to balenaCloud, and depending on the quality of the connection, it may respond to Web Terminal commands and output container logs to the dashboard.

## Settings and data recovery

Most common system settings can be (re)specified via [config.json]().

However, recovering user data takes some careful consideration, especially if the application requires persistent data storage. In the event that it does, the application can’t use the pre-provisioned [named volumes](https://www.balena.io/docs/learn/develop/multicontainer/#named-volumes), since these will be wiped during the upgrade process.

If this is the case, we recommend mounting an external mass storage (USB) device into a privileged data container and sharing it to other containers (if applicable) via NFS or similar network storage protocol. These external storage devices are not part of the upgrade process, so data on them would be left intact, as long as they are temporarily disconnected during the upgrade process.

By contrast, a typical balena online update leaves your apps and data intact, and persistent logging can be enabled to save your logs across device restarts.

[balena-cli]:/reference/balena-cli/
[supportedDevicesList]:/reference/hardware/devices/
[balena-cli advanced masterclass]:/learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[balenaOS]:{{ $links.osSiteUrl }}
[balena-os-configure]:/reference/balena-cli/#os-configure-image
[config-file]:/reference/OS/configuration/#valid-fields
[balena-preload]:/reference/balena-cli/#preload
[preloading-device-image]:/learn/more/masterclasses/advanced-cli/#51-preloading-a-device-image
