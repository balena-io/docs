---
title: Configuration
excerpt: Instructions for editing and customizing config.json for modifying the behavior of {{ $names.os.lower }}
---

# Configuring {{ $names.os.lower }}

The behavior of {{ $names.os.lower }} can be configured by editing the `config.json` file. This file is located in the [boot partition][boot-partition] and accepts a [range of fields](#valid-fields) to modify the behavior of the host OS.

**Note:** The `config.json` file is different from the [`config.txt`][config-txt] file, also located in the boot partition, which is used by the Raspberry Pi to set device configuration options.

Before the device is [provisioned][provisioned], you may edit `config.json` by mounting a flashed SD card (with the partition label `resin-boot`) and editing the file directly. The boot partition is mounted on the device at `/mnt/boot`, and so on the device, the file is located at `/mnt/boot/config.json`. For example, to output a formatted version of `config.json` on a device, use the following commands:

```shell
{{ $names.company.lower }} ssh <uuid>
cat /mnt/boot/config.json | jq '.'
```

**Warning:** Editing config.json on a provisioned device should be done very carefully as any mistakes in the syntax of this file can leave a device inaccessible.

After provisioning, editing `config.json` as described above is not reliable or advisable because the [supervisor][supervisor] may overwrite certain fields, such as `persistentLogging`, with values read from the {{ $names.cloud.lower }} API. To safely modify the values of `config.json` on a provisioned device use one of the following methods:

- Update the device [hostname](#hostname) via the [supervisor API][hostname].
- Modify the [persistent logging](#persistentlogging) configuration via device [configuration][configuration] tab in the balenaCloud dashboard.
- Apply `config.json` updates remotely via the {{ $names.cli.lower }} using the [configizer project][configizer].

Alternatively, you can always reprovision a device with an updated `config.json` file.

**Note:** To manually edit `config.json` on a provisioned device, see the [{{ $names.os.lower }} masterclass instructions][masterclass-os].

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

[boot-partition]:/reference/OS/overview/2.x/#stateless-and-read-only-rootfs
[config-txt]:/reference/OS/advanced/#configtxt
[country-codes]:https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[hostname]:/reference/supervisor/supervisor-api/#patch-v1devicehost-config
[configuration]:/learn/manage/configuration/
[configizer]:{{ $links.githubPlayground }}/configizer
[masterclass-os]:/learn/more/masterclasses/host-os-masterclass/#12-advanced-editing-configjson-by-hand
[provisioned]:/learn/welcome/primer/#device-provisioning
[supervisor]:/reference/supervisor/supervisor-api/
