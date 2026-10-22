The behavior of balenaOS can be configured by setting the following keys in the config.json file in the boot partition. This configuration file is also used by the supervisor.

### hostname

(string) The configured hostname of the device, otherwise the device UUID is used.

### persistentLogging

(boolean) Enable or disable persistent logging on the device - defaults to false. Once persistent journals are enabled, they end up stored as part of the data partition on the device (either on SD card, eMMC, harddisk, etc.). This is located on-device at `/var/log/journal/<uuid>` where the UUID is variable.

### country

(string) [Two-letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for the country in which the device is operating. This is used for setting the WiFi regulatory domain, and you should check the WiFi device driver for a list of supported country codes.

### ntpServers

(string) A space-separated list of NTP servers to use for time synchronization. Defaults to `resinio.pool.ntp.org` servers:

- `0.resinio.pool.ntp.org`
- `1.resinio.pool.ntp.org`
- `2.resinio.pool.ntp.org`
- `3.resinio.pool.ntp.org`

### dnsServers

(string) A space-separated list of preferred DNS servers to use for name resolution.

- When `dnsServers` is not defined, or empty, Google's DNS server (8.8.8.8) is added to the list of DNS servers obtained via DHCP or statically configured in a NetworkManager connection profile.
- When `dnsServers` is "null" (a string), Google's DNS server (8.8.8.8) will NOT be added as described above.
- When `dnsServers` is defined and not "null", the listed servers will be added to the list of servers obtained via DHCP or statically configured via a NetworkManager connection profile.

### balenaRootCA

(string) A base64-encoded PEM CA certificate that will be installed into the root trust store. This makes the device trust TLS/SSL certificates from this authority. 
This is useful when the device is running behind a re-encrypting network device, like a transparent proxy or some deep packet inspection devices.

```json
"balenaRootCA": "4oCU4oCTQkVHSU4gQ0VSVElGSUNBVEXigJTi..."
```

### developmentMode

To enable development mode at runtime:

```json
"developmentMode": true
```

By default development mode enables unauthenticated SSH logins unless custom SSH keys are present, in which case SSH key access is enforced.

Also, development mode provides serial console passwordless login as well as an exposed balena engine socket to use in local mode development.

### os

An object containing settings that customize the host OS at runtime.

#### network

##### wifi

An object that defines the configuration related to Wi-Fi.

- "randomMacAddressScan" (boolean) Configures MAC address randomization of a Wi-Fi device during scanning

The following example disables MAC address randomization of Wi-Fi device during scanning:

```json
"os": {
 "network" : {
  "wifi": {
    "randomMacAddressScan": false
  }
 }
}
```

##### connectivity

An object that defines configuration related to networking connectivity checks. This feature builds on NetworkManager's connectivity check, which is further documented in the connectivity section [here](https://developer.gnome.org/NetworkManager/stable/NetworkManager.conf.html).

- "uri" (string) Value of the url to query for connectivity checks. Defaults to `$API_ENDPOINT/connectivity-check`.
- "interval" (string) Interval between connectivity checks in seconds. Defaults to 3600. To disable the connectivity checks set the interval to "0".
- "response" (string). If set controls what body content is checked for when requesting the URI. If it is an empty value, the HTTP server is expected to answer with status code 204 or send no data.

The following example configures the connectivity check by passing the balenaCloud connectivity endpoint with a 5-minute interval.

```json
"os": {
 "network" : {
  "connectivity": {
    "uri" : "https://api.balena-cloud.com/connectivity-check",
    "interval" : "300"
  }
 }
}
```

#### udevRules

An object containing one or more custom udev rules as `key:value` pairs.

To turn a rule into a format that can be easily added to `config.json`, use the following command:

```shell
cat rulefilename | jq -sR .
```

For example:

```shell
root@resin:/etc/udev/rules.d# cat 64.rules | jq -sR .
"ACTION!=\"add|change\", GOTO=\"modeswitch_rules_end\"\nKERNEL==\"ttyACM*\", ATTRS{idVendor}==\"1546\", ATTRS{idProduct}==\"1146\", TAG+=\"systemd\", ENV{SYSTEMD_WANTS}=\"u-blox-switch@'%E{DEVNAME}'.service\"\nLBEL=\"modeswitch_rules_end\"\n"
```

The following example contains two custom udev rules that will create `/etc/udev/rules.d/56.rules` and `/etc/udev/rules.d/64.rules`. The first time rules are added, or when they are modified, udevd will reload the rules and re-trigger.

```json
"os": {
 "udevRules": {
  "56": "ENV{ID_FS_LABEL_ENC}==\"resin-root*\", IMPORT{program}=\"resin_update_state_probe $devnode\", SYMLINK+=\"disk/by-state/$env{BALENA_UPDATE_STATE}\"",
  "64" : "ACTION!=\"add|change\", GOTO=\"modeswitch_rules_end\"\nKERNEL==\"ttyACM*\", ATTRS{idVendor}==\"1546\", ATTRS{idProduct}==\"1146\", TAG+=\"systemd\", ENV{SYSTEMD_WANTS}=\"u-blox-switch@'%E{DEVNAME}'.service\"\nLBEL=\"modeswitch_rules_end\"\n"
 }
}
```

#### sshKeys

(Array) An array of strings containing a list of public SSH keys that will be used by the SSH server for authentication.

```json
"os": {
 "sshKeys": [
  "ssh-rsa AAAAB3Nza...M2JB balena@macbook-pro",
  "ssh-rsa AAAAB3Nza...nFTQ balena@zenbook"
 ]
}
```

#### fan

An object that defines thermal related configuration. Available for Jetson Orin devices running Jetpack 6 or newer, balenaOS v6.1.24 or newer and Supervisor v16.10.0 or newer.

##### fan.profile

(string) A string which will be used to select the desired cooling profile. Supported values are "quiet" and "cool". At runtime, this
configuration option should be set through the API or from your balenaCloud dashboard.

```json
"os": {
 "fan": {
  "profile":"cool"
 }
}
```

#### power

An object that defines power consumption related configuration. Available for Jetson Orin devices running Jetpack 6 or newer, balenaOS v6.1.24 or newer and Supervisor v16.10.0 or newer.

##### power.mode

(string) A string which will be used to select the desired power mode. Supported values for Jetpack 6 and newer are "low", "mid" and "high", where "low"
is the lowest power consumption mode while "high" corresponds to MAXN or the highest available power mode for your device type. At runtime, this
configuration option should be set through the API or from your balenaCloud dashboard, and it will cause a device reboot.

```json
"os": {
 "power": {
  "mode":"high"
 }
}
```

#### kernel

An object that allows configuring kernel settings, which are applied during boot or at runtime.

##### kernel.extraFirmwareVol

(string) A string used for specifying the name of the volume used for storing additional firmware. This volume is used as an additional search path for Linux firmware.
At runtime this setting is managed by the Supervisor and the default volume name is "extra-firmware".

```json
"os": {
 "kernel": {
  "extraFirmwareVol":"extra-firmware"
 }
}
```


### installer

An object that configures the behaviour of the balenaOS installer image.

#### secureboot

(boolean) Opt-in to installing a secure boot and encrypted disk system for
supported device types.

```json
"installer": {
  "secureboot": true
}
```

#### migrate

An object that configures the behaviour of the balenaOS installer migration
module.

##### migrate.force

(boolean) Forces the migration to run. By default the migration only runs if
the installer is booting in a single disk system or the `migrate` argument
is passed in the kernel command line.

```json
"installer": {
  "migrate": {
    "force": true
  }
}
```

#### target_devices

(string) Overrides the default list of provisioning target mediums. May contain one or more
devices, separated by spaces. The first one found will be used.

```json
"installer": {
  "target_devices":"nvme0n1 sda"
}
```
