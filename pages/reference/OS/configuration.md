---
title: Configuration
excerpt: Instructions for editing and customizing config.json for modifying the behavior of balenaOS
---

# Configuring balenaOS

## About config.json

A balenaOS image, by default, does not include any configuration information
to associate it with a fleet. When a customer downloads a provisioning
image from the Dashboard, balenaCloud injects the configuration for the specific
fleet the image is being downloaded for. Similarly, the balena CLI allows
the download of a balenaOS image for a device type (and specific version), but
requires that this image has a configuration added (usually via the use of
`balena os configure`) before flashing to bootable media.

**Note:** The `config.json` file is different from the [`config.txt`](/reference/OS/advanced/#configtxt) file, also located in the boot partition, which is used by the Raspberry Pi to set device configuration options.

The behavior of balenaOS can be configured by editing the
`config.json` file. This file is located in the boot partition accepts a
[range of fields](#valid-fields) to modify the behavior of the host OS.
The boot partition will be the one that shows up, usually named `resin-boot`.
On-device, the boot partition is mounted at `/mnt/boot/`. Assuming you're
still logged into your debug device, run the following:

```shell
root@f220105:~# ls -lah /mnt/boot
total 6.6M
drwxr-xr-x 6 root root 2.0K Jan  1  1970 .
drwxr-xr-x 7 root root 1.0K Mar  9  2018 ..
drwxr-xr-x 2 root root  512 Aug 19 06:23 .fseventsd
-rwxr-xr-x 1 root root   24 Jul  8 19:55 balena-image
-rwxr-xr-x 1 root root  17K Jul  8 19:55 balenaos.fingerprint
-rwxr-xr-x 1 root root  51K Jul  8 19:55 bcm2711-rpi-4-b.dtb
-rwxr-xr-x 1 root root  51K Jul  8 19:55 bcm2711-rpi-400.dtb
-rwxr-xr-x 1 root root  51K Jul  8 19:55 bcm2711-rpi-cm4.dtb
-rwxr-xr-x 1 root root  516 Jul  8 19:55 boot.scr
-rwxr-xr-x 1 root root  137 Jul  8 19:55 cmdline.txt
-rwxr-xr-x 1 root root  622 Aug 19 10:24 config.json
-rwxr-xr-x 1 root root  36K Jul  8 19:55 config.txt
-rwxr-xr-x 1 root root 2.1K Jul  8 19:55 device-type.json
-rwxr-xr-x 1 root root    0 Jul  8 19:55 extra_uEnv.txt
-rwxr-xr-x 1 root root 5.3K Jul  8 19:55 fixup4.dat
-rwxr-xr-x 1 root root 3.1K Jul  8 19:55 fixup4cd.dat
-rwxr-xr-x 1 root root 8.2K Jul  8 19:55 fixup4x.dat
-rwxr-xr-x 1 root root   44 Jul  8 19:55 image-version-info
-rwxr-xr-x 1 root root 578K Jul  8 19:55 kernel8.img
-rwxr-xr-x 1 root root  160 Jul  8 19:55 os-release
drwxr-xr-x 2 root root  22K Jul  8 19:55 overlays
-rwxr-xr-x 1 root root    0 Jul  8 19:55 rpi-bootfiles-20220120.stamp
drwxr-xr-x 2 root root  512 Aug 19 10:24 splash
-rwxr-xr-x 1 root root 2.2M Jul  8 19:55 start4.elf
-rwxr-xr-x 1 root root 782K Jul  8 19:55 start4cd.elf
-rwxr-xr-x 1 root root 2.9M Jul  8 19:55 start4x.elf
drwxr-xr-x 2 root root  512 Jul  8 19:55 system-connections
```

As you can see, all the boot required files exist in the root, including
`config.json`, and it is from the `/mnt/boot` mountpoint that any services that
require access to files on the boot partition (including the configuration)
read this data.

**Important note:** There is an occasional misunderstanding that the directory
`/resin-boot` when on-device is the correct directory to modify files in.
This is _not_ the case, and in fact this directory is a pre-built directory
that exists as part of the root FS partition, and _not_ the mounted boot
partition. Let's verify this:

```shell
root@f220105:~# cat /resin-boot/config.json
{
  "deviceType": "raspberrypi4-64",
  "persistentLogging": false
}
```

As you can see, there's very little information in the configuration file in
the `/resin-boot` directory, and certainly nothing that associates it with a
fleet. On the other hand, if we look at `/mnt/boot/config.json` you can
see that all the required information for the device to be associated with its
fleet exists:

```shell
root@f220105:~# cat /mnt/boot/config.json | jq
{
  "apiEndpoint": "https://api.balena-cloud.com",
  "appUpdatePollInterval": 900000,
  "applicationId": "1958513",
  "deltaEndpoint": "https://delta.balena-cloud.com",
  "developmentMode": "true",
  "deviceApiKey": "KEY",
  "deviceApiKeys": {
    "api.balena-cloud.com": "KEY"
  },
  "deviceType": "raspberrypi4-64",
  "listenPort": "48484",
  "mixpanelToken": "9ef939ea64cb6cd8bbc96af72345d70d",
  "registryEndpoint": "registry2.balena-cloud.com",
  "userId": "234385",
  "vpnEndpoint": "cloudlink.balena-cloud.com",
  "vpnPort": "443",
  "uuid": "f220105b5a8aa79b6359d2df76a73954",
  "registered_at": 1660904681747,
  "deviceId": 7842821
}
```

Key naming in `config.json` still adheres to the "legacy" convention of
balenaCloud applications instead of fleets. For details, refer to the [blog post](https://www.balena.io/blog/the-road-to-multi-app-transitioning-balenacloud-applications-to-fleets/).

There's a fairly easy way to remember which is the right place, the root FS
is read-only, so if you try and modify the `config.json` you'll be told it's
read-only.

## Configuring config.json

Before the device is [provisioned](/learn/welcome/primer/#device-provisioning), you may edit `config.json` by mounting a flashed SD card (with the partition label `resin-boot`) and editing the file directly. The [boot partition](/reference/OS/overview/2.x/#stateless-and-read-only-rootfs) is mounted on the device at `/mnt/boot`, and so on the device, the file is located at `/mnt/boot/config.json`. For example, to output a formatted version of `config.json` on a device, use the following commands:

```shell
balena ssh <uuid>
cat /mnt/boot/config.json | jq '.'
```

**Warning:** Editing config.json on a provisioned device should be done very carefully as any mistakes in the syntax of this file can leave a device inaccessible. If you do make a mistake, ensure that you do not
exit the device's SSH connection until the configuration _is_ correct.

After provisioning, editing `config.json` as described above is not reliable or advisable because the [supervisor](/reference/supervisor/supervisor-api/) may overwrite certain fields, such as `persistentLogging`, with values read from the balenaCloud API. To safely modify the values of `config.json` on a provisioned device use one of the following methods:

- Update the device [hostname](#hostname) via the [supervisor API](/reference/supervisor/supervisor-api/#patch-v1devicehost-config).
- Modify the [persistent logging](#persistentlogging) configuration via device [configuration](/learn/manage/configuration/) tab in the balenaCloud dashboard.
- Apply `config.json` updates remotely via the balena CLI using the [configizer project](https://github.com/balena-io-playground/configizer).

Alternatively, you can always reprovision a device with an updated `config.json` file.

As an example, we're going to change the hostname from the short UUID of the
device to something else. We will start by taking a backup of the config.json and printing out the file using the `jq` command. Here, we have changed the value of `hostname` field to `debug-device`

```shell
root@f220105:~# cd /mnt/boot/
root@f220105:/mnt/boot# cp config.json config.json.backup && cat config.json.backup | jq ".hostname=\"debug-device\"" -c > config.json
root@f220105:/mnt/boot# cat config.json | jq
{
  "apiEndpoint": "https://api.balena-cloud.com",
  "appUpdatePollInterval": 900000,
  "applicationId": "1958513",
  "applicationName": "nuctest",
  "deltaEndpoint": "https://delta.balena-cloud.com",
  "developmentMode": "true",
  "deviceApiKey": "006e82c27eabcd579ce310687b937cd5",
  "deviceApiKeys": {
    "api.balena-cloud.com": "006e82c27eabcd579ce310687b937cd5"
  },
  "deviceType": "raspberrypi4-64",
  "listenPort": "48484",
  "mixpanelToken": "9ef939ea64cb6cd8bbc96af72345d70d",
  "persistentLogging": false,
  "pubnubPublishKey": "",
  "pubnubSubscribeKey": "",
  "registryEndpoint": "registry2.balena-cloud.com",
  "userId": 234385,
  "vpnEndpoint": "cloudlink.balena-cloud.com",
  "vpnPort": "443",
  "uuid": "f220105b5a8aa79b6359d2df76a73954",
  "registered_at": 1660904681747,
  "deviceId": 7842821,
  "hostname": "debug-device"
}
root@f220105:/mnt/boot# reboot
```

The reboot is required as the hostname change will not be picked up until the
device restarts. Wait a little while, and then SSH back into the device, we'll
see that the hostname has changed:

```shell
root@debug-device:~#
```

Whilst making the changes, the new configuration is written to the `config.json`
file, whilst we have a backup of the original (`config.json.backup`). Remember,
should you need to change anything, _always_ keep a copy of the original configuration
so you can restore it before you exit the device. Check out the
[valid fields](#sample-configjson) available to be configured on a balena device.

## Sample config.json

The following example provides all customizable configuration options available in `config.json`. Full details about each option may be found in the [valid fields](#valid-fields) section.

```json
{
	"hostname": "my-custom-hostname",
	"persistentLogging": true,
	"country": "GB",
	"ntpServers": "ntp-wwv.nist.gov resinio.pool.ntp.org",
	"dnsServers": "208.67.222.222 8.8.8.8",
	"os": {
		"network": {
			"connectivity": {
				"uri": "https://api.balena-cloud.com/connectivity-check",
				"interval": "300",
				"response": "optional value in the response"
			},
			"wifi": {
				"randomMacAddressScan": false
			}
		},
		"udevRules": {
			"56": "ENV{ID_FS_LABEL_ENC}==\"resin-root*\", IMPORT{program}=\"resin_update_state_probe $devnode\", SYMLINK+=\"disk/by-state/$env{RESIN_UPDATE_STATE}\"",
			"64": "ACTION!=\"add|change\", GOTO=\"modeswitch_rules_end\"\nKERNEL==\"ttyACM*\", ATTRS{idVendor}==\"1546\", ATTRS{idProduct}==\"1146\", TAG+=\"systemd\", ENV{SYSTEMD_WANTS}=\"u-blox-switch@'%E{DEVNAME}'.service\"\nLBEL=\"modeswitch_rules_end\"\n"
		},
		"sshKeys": [
			"ssh-rsa AAAAB3Nza...M2JB balena@macbook-pro",
			"ssh-rsa AAAAB3Nza...nFTQ balena@zenbook"
		]
	}
}
```

## Valid fields

{{> "meta-balena/config-json" }}

[country-codes]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
