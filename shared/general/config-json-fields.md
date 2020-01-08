## Valid fields

The following fields can be used to modify the behavior of the host OS.

### hostname

(string) The configured hostname of the device, otherwise the device UUID is used.

### persistentLogging

(boolean) Enable or disable persistent logging on the device - defaults to false.

### country

(string) [Two-letter country code][country-codes] for the country in which the device is operating. This is used for setting the WiFi regulatory domain, and you should check the WiFi device driver for a list of supported country codes.

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
- When `dnsServers` is defined and not "null", the listed servers will be added to the list of servers obtained via DCHP or statically configured via a NetworkManager connection profile.

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

An object that defines configuration related to networking connectivity checks. This feature builds on NetworkManager's connectivity check, which is further documented in the connectivity section [here][nm-connectivity].

- "uri" (string) Value of the url to query for connectivity checks. Defaults to `$API_ENDPOINT/connectivity-check`.
- "interval" (string) Interval between connectivity checks in seconds. Defaults to 3600.
- "response" (string). If set controls what body content is checked for when requesting the URI. If it is an empty value, the HTTP server is expected to answer with status code 204 or send no data.

The following example configures the connectivity check by passing the {{ $names.cloud.lower }} connectivity endpoint with a 5-minute interval.

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

The following example contains two custom udev rules that will create `/etc/udev/rules.d/56.rules` and `/etc/udev/rules.d/64.rules`. The first time rules are added/modified, udevd will reload the rules and re-trigger.

```json
"os": {
 "udevRules": {
  "56": "ENV{ID_FS_LABEL_ENC}==\"resin-root*\", IMPORT{program}=\"resin_update_state_probe $devnode\", SYMLINK+=\"disk/by-state/$env{RESIN_UPDATE_STATE}\"",
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
