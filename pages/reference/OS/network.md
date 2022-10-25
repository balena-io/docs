---
title: Network Setup on balenaOS

---

# Networking on {{ $names.os.lower }}

* [Introduction](#introduction)
* [WiFi Setup](#wifi-setup)
* [Ethernet Setup](#ethernet-setup)
* [Regulatory Domain](#regulatory-domain)
* [Setting a Static IP](#setting-a-static-ip)
* [Creating a Hotspot](#creating-a-hotspot)
* [Cellular Modem Setup](#cellular-modem-setup)
* [Changing the Network at Runtime](#changing-the-network-at-runtime)
* [Network Requirements](#network-requirements)
* [Connecting Behind a Proxy](#connecting-behind-a-proxy)
* [Checking connectivity](#checking-connectivity)
* [Disable IPv6](#disable-ipv6)

## Introduction

With {{ $names.os.lower }} 2.0, connectivity management changed from **[ConnMan][connman-link]** to **[NetworkManager][networkmanager-link]**. **NetworkManager** allows {{ $names.os.lower }} more flexibility when configuring the network setup, and, in conjunction with **[ModemManager][modemmanager-link]**, allows {{ $names.os.lower }} to offer first class [GSM/Cellular support](#cellular-modem-setup).

All of the network configuration for {{ $names.os.lower }} can be done through files in the boot partition of your device. If you have a freshly downloaded {{ $names.os.lower }} `.img`, you can mount it and inspect the `resin-boot` or `resin-flash` (for devices that boot from eMMC) partition. In the boot partition you will find a directory called `system-connections`.

__Note:__ When editing files for connectivity in the boot partition, make sure you're in the `/mnt/boot/system-connections` folder so that they persist after reboot.

The `system-connections` directory consists of a set of connection files—one file per connection. The file `balena-sample.ignore` is a template or example file which you can copy to create new connections. If you added a WiFi connection from the dashboard when you downloaded your image, you should see its configuration file already created for you under the name `resin-wifi`. You will notice that there is no file for ethernet, this is because **NetworkManager** will always set up a default ethernet connection. If you want a specific configuration for the ethernet connection you will need to create a new connection file for it. Most of the allowed options for these connection files can be found in the [**NetworkManager** settings reference][nm-setting-ref]

## WiFi Setup

If you entered your WiFi SSID and passphrase when you downloaded {{ $names.os.lower }} from the dashboard, you should have a file called `resin-wifi` in the folder `/system-connections/` (as mentioned above, this is found in the boot partition of your image).

```
[connection]
id={{ $names.company.short }}-wifi
type=wifi

[wifi]
hidden=true
mode=infrastructure
ssid=My Awesome WiFi Ssid

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto

[wifi-security]
auth-alg=open
key-mgmt=wpa-psk
psk=super_secret_wifi_password
```

This file sets up a simple WiFi connection to a network named `My Awesome WiFi Ssid` with a WiFi password (`psk`) of `super_secret_wifi_password`. If you want to add multiple different WiFi credentials, then simply make a copy of `resin-wifi` or `balena-sample.ignore` and change the `SSID` and `psk` key values. You can also add the `autoconnect-priority` integer values in each file to define the priority of each connection when the device has multiple WiFi connections it can connect to.

To set WiFi as the default route to the internet, you need to force `eth0` to have a low route metric and set the `never-default` option. The following ethernet configuration file can be put in the `/system-connections/` folder to accomplish this:

```
[connection]
id=my-ethernet
type=ethernet
interface-name=eth0
permissions=
secondaries=

[ethernet]
mac-address-blacklist=

[ipv4]
never-default=true
route-metric=2000
dns-search=

ignore-auto-routes=true
method=auto

[ipv6]
addr-gen-mode=stable-privacy
dns-search=
method=auto
```
__Note:__ Depending on the device, the interface name may not be `eth0`. To check the correct name, you can run `ifconfig` from the web terminal found on the device dashboard.

The connection file also defines what kind of security the network expects. If you want to set up a network with more elaborate security requirements, checkout the [**NetworkManager** settings reference page][nm-setting-ref]. If you want to connect to an unsecured WiFi network, simply remove the `[wifi-security]` section.

As an example the below config sets up a WPA2-enterprise WiFi connection:
```
[connection]
id={{ $names.company.short }}-wifi
type=wifi

[wifi]
ssid=PLACE_SSID_HERE
mode=infrastructure
security=802-11-wireless-security

[wifi-security]
key-mgmt=wpa-eap

[802-1x]
eap=peap
identity=PLACE_YOUR_ID_HERE
phase2-auth=mschapv2
password=PLACE_YOUR_PASSWORD_HERE

[ipv4]
method=auto

[ipv6]
method=auto
```

An example for [Eduroam][eduroam-ref] (network for students and universities) is shown in the config below. You'll need to change the listed fields for your educational institution. Contact your educational institution's IT department for the connection specifics.

```
[connection]
id=eduroam
type=wifi

[wifi]
ssid=eduroam
mode=infrastructure
security=802-11-wireless-security

[wifi-security]
key-mgmt=wpa-eap

[802-1x]
eap=peap;
identity=PLACE_YOUR_USERNAME_HERE@PLACE_YOUR_INSTITUTION_DOMAIN_HERE
ca-cert=PLACE_YOUR_CERTIFICATE_HERE
phase2-auth=mschapv2
password=PLACE_YOUR_PASSWORD_HERE
private-key-password-flags=1
phase2-private-key-password-flags=1

[ipv4]
method=auto

[ipv6]
method=auto
```

## Ethernet Setup

Out of the box, Ethernet should work without requiring any specific configuration for **Network Manager**. There are some instances where you may wish to customize your configuration, such as with sharing a network connection from a WiFi access point to another device connected with Ethernet.

Below is an example for sharing a network connection to another device attached by Ethernet:

```
[connection]
id=shared-ethernet
type=ethernet
interface-name=eth0

[ipv4]
method=shared

[ipv6]
method=shared
```

__Note:__ Ensure to specify the `interface-name`, for instance `eth0`.

By default, when an interface is shared, NetworkManager uses `10.42.x.0/24` as the `ipv4` subnet for the interface. This can be set manually by specifying the `address1` parameter manner within the `[ipv4]` block and specifying one address; for example: `address1=192.168.1.1`. [Read more][nm-ipv4-setting-ref]


## Regulatory Domain

By default, the WiFi regulatory domain for your device is not set until it is connected to a network. If you need your device to connect at first boot to channels that may be restricted in some countries, you can specify the regulatory domain in the `config.json` file (like the above WiFi settings, this is found in the boot partition). Regulatory domain is set using the `country` field.

As an example, if you are deploying your device in Great Britain and need it to connect to channel 12 or 13, you would set `"country":"GB"`.

## Setting a Static IP

Setting a static IP is possible by adding a few fields to the `[ipv4]` section of your connection file.

```
[connection]
id=my-ethernet
type=ethernet
interface-name=eth0
permissions=
secondaries=

[ethernet]
mac-address-blacklist=

[ipv4]
address1=192.168.1.111/24,192.168.1.1
dns=8.8.8.8;8.8.4.4;
dns-search=
method=manual

[ipv6]
addr-gen-mode=stable-privacy
dns-search=
method=auto
```

The important bits to take note of here are `interface-name=eth0` which indicates which network interface to use and the `address1=192.168.1.111/24,192.168.1.1` line which shows we have a static IP of `192.168.1.111` and the network gateway is `192.168.1.1`. The final piece is to add the `dns=8.8.8.8;8.8.4.4;` line, which tell the device to use Google DNS. The set up for a WiFi connection is very much the same, as can be seen in the below example.

```
[connection]
id={{ $names.company.short }}-wifi
type=wifi

[wifi]
hidden=true
mode=infrastructure
ssid=PLACE_SSID_HERE

[ipv4]
address1=192.168.1.127/24,192.168.1.1
dns=8.8.8.8;8.8.4.4;
dns-search=
method=manual

[ipv6]
addr-gen-mode=stable-privacy
method=auto

[wifi-security]
auth-alg=open
key-mgmt=wpa-psk
psk=PLACE_YOUR_PASSWORD_HERE
```

## Creating a Hotspot

With **NetworkManager**, setting up your device as a hotspot is as simple as creating a `{{ $names.company.short }}-hotspot` file in `/system-connections/`:

```
[connection]
id={{ $names.company.short }}-hotspot
uuid=36060c57-aebd-4ccf-aba4-ef75121b5f77
type=wifi
autoconnect=true
interface-name=wlan0
permissions=
secondaries=

[wifi]
band=bg
mac-address-blacklist=
mac-address-randomization=0
mode=ap
seen-bssids=
ssid=PLACE_SSID_HERE

[wifi-security]
group=
key-mgmt=wpa-psk
pairwise=
proto=rsn
psk=PLACE_YOUR_PASSWORD_HERE

[ipv4]
dns-search=
method=shared

[ipv6]
addr-gen-mode=stable-privacy
dns-search=
method=auto
```

This will create a WPA2/rsn hotspot, in case you need WPA protocol replace `proto=rsn` with `proto=` in section `[wifi-security]`.

## Cellular Modem Setup

For cellular or GSM based connections, {{ $names.os.lower }} makes use of **[ModemManager][modemmanager-link]** and is configured in much the same way as WiFi connections are configured. The connection profile can either be specified in your application code (see [Changing the Network at Runtime](#changing-the-network-at-runtime) below), or you can add a cellular configuration by adding a connection file to `/resin-boot/system-connections` in the downloaded {{ $names.os.lower }} `.img` file. In the future, cellular connections will be configurable from the dashboard at time of adding a device and downloading a {{ $names.os.lower }} image.

To set up a cellular connection with your device, just drop the below example configuration into a file in the `/resin-boot/system-connections/` directory in the `.img` or on SD card (if you have it flashed with the OS already) and name it something like `cellular`. Replace the `apn=` and `number=` values with your mobile providers APN and PPP dialing number. If your mobile carrier requires a password and username, you will need to add those as well. For a more in depth look at available settings options for GSM, have a look at `Table 58. gsm setting` in the [**NetworkManager** GSM settings reference][nm-gsm-setting-ref].

```
[connection]
id=cellular
type=gsm
autoconnect=true

[gsm]
apn=giffgaff.com
number=*99#
password=password
username=giffgaff

[serial]
baud=115200

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

### Known Tested Modems

Check out the list of [balena supported modems](wifi-dongles).

## Changing the Network at Runtime

__Warning:__ Making changes to the networking of a device is extremely dangerous and can lead to a device being unrecoverable, so exercise caution with any of the following.

Often there are times where the WiFi network that the device will be provisioned into is not known beforehand. In these cases the device needs a mechanism to be able to add its own WiFi credentials during some kind of setup stage. For this reason we built the [WiFi Connect][wifi-connect] project.

WiFi Connect enables the device to create a wireless access point called `WiFi Connect` (also customizable) which serves a captive portal. This allows your end user to connect to the device and add their WiFi credentials. The device will then automatically leave the setup mode and connect to the specified user network.

Under the hood, WiFi Connect is interacting with **NetworkManager** via its [DBUS][dbus-link] API. The DBUS API is a useful way to interact with the {{ $names.os.lower }} host NetworkManager, and there are DBUS bindings for most languages. Below is a minimal Python example from the [**NetworkManager** examples][network-manager-examples], which creates a new **NetworkManager** connection file that can be used to enable connecting to a new WiFi access point.

__Note:__ You will need to install the `dbus` module in order to run this example (`apt-get install python-dbus`) and make sure `DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket` is exported in the environment. This ensures that DBUS calls are directed to the system bus that the host OS is listening on rather than the DBUS bus in your container. If you are using our [Python build images][python-build-images], then you do not have to install the `dbus` module, since it is already included there.

The following example will add a new WiFi connection file to your host OS **NetworkManager** configuration in `/etc/NetworkManager/system-connections`. It should be noted that you will not see a new file created in `resin-boot/system-connections` because there isn't a two-way binding. On device boot, the files in `resin-boot/system-connections` are copied into `/mnt/state/root-overlay/etc/NetworkManager/system-connections` without removing any files from the destination. That directory is then bind mounted to `/etc/NetworkManager/system-connections` in the root filesystem on the host.

```
#!/usr/bin/env python
import dbus, uuid, sys

## Change these values
SSID="<SSID>"
PASSWORD="<PASSWORD>"
##

s_con = dbus.Dictionary({
    'type': '802-11-wireless',
    'uuid': str(uuid.uuid4()),
    'id': SSID,
})

s_wifi = dbus.Dictionary({
    'ssid': dbus.ByteArray(bytes(SSID) if sys.version_info < (3, 0) else bytes(SSID, 'utf-8')),
    'mode': 'infrastructure',
    'hidden': dbus.Boolean(True),
})

s_wsec = dbus.Dictionary({
    'key-mgmt': 'wpa-psk',
    'auth-alg': 'open',
    'psk': PASSWORD,
})

s_ip4 = dbus.Dictionary({'method': 'auto'})
s_ip6 = dbus.Dictionary({'method': 'auto'})

con = dbus.Dictionary({
    'connection': s_con,
    '802-11-wireless': s_wifi,
    '802-11-wireless-security': s_wsec,
    'ipv4': s_ip4,
    'ipv6': s_ip6,
})


bus = dbus.SystemBus()

proxy = bus.get_object("org.freedesktop.NetworkManager", "/org/freedesktop/NetworkManager/Settings")
settings = dbus.Interface(proxy, "org.freedesktop.NetworkManager.Settings")

settings.AddConnection(con)
```

The following example will print device name and all associated IPv4 addresses for each network device with an IPv4 connection.

```
#!/usr/bin/env python

import dbus
import ipaddress

bus = dbus.SystemBus()

# Get base NetworkManager dbus proxy
nm_proxy = bus.get_object("org.freedesktop.NetworkManager", "/org/freedesktop/NetworkManager")
nm_props = dbus.Interface(nm_proxy, "org.freedesktop.DBus.Properties")

# Enumerate all devices
devices = nm_props.Get("org.freedesktop.NetworkManager", "Devices")
for device in devices:
    # Get dbus proxy for the device
    device_proxy = bus.get_object("org.freedesktop.NetworkManager", device)
    device_props = dbus.Interface(device_proxy, "org.freedesktop.DBus.Properties")

    # Get IPv4 configuration details
    ipv4_path = device_props.Get("org.freedesktop.NetworkManager.Device", "Ip4Config")

    # Skip devices that do not have IPv4 configured
    if not ipv4_path or ipv4_path == "/":
        continue

    # Get dbus proxy for IPv4 configuration
    ipv4_proxy = bus.get_object("org.freedesktop.NetworkManager", ipv4_path)
    ipv4_props = dbus.Interface(ipv4_proxy, "org.freedesktop.DBus.Properties")

    # List all IPv4 addresses
    ipv4_addresses = ipv4_props.Get("org.freedesktop.NetworkManager.IP4Config", "Addresses")
    addresses = []
    for address in ipv4_addresses:
        # address is an array where address[0] is the IPv4 address and address[1] is the netmask
        # The IPv4 addresses are returned as integers, we need to flip endianity
        addr_bytes = address[0].to_bytes(4, "little")
        addr = ipaddress.IPv4Address(addr_bytes)
        addresses.append("%s/%s" % (addr.compressed, address[1]))

    # Get device name
    device_name = device_props.Get("org.freedesktop.NetworkManager.Device", "Interface")

    # Print all the information for a single device
    print("%s: %s" % (device_name, ", ".join(addresses)))
```

For other network setting needs, such as modifying existing network connection files, or listing connection information, please see the [**NetworkManager** examples][network-manager-examples].

__Warning:__ It can be dangerous to install **NetworkManager** or **python-networkmanager** in your container, especially if you have `INITSYSTEM=on`, as systemd will automatically try to start your container **NetworkManager** and this will take your devices offline. However, you can prevent this behavior by masking the **NetworkManager** service in your Dockerfile: `RUN apt-get update && apt-get install -y network-manager && systemctl mask NetworkManager.service`.

__Note:__ The **python-networkmanager** Debian package depends on **NetworkManager**. Preferably **python-networkmanager** should be installed with **pip** instead of **apt-get**. That will avoid the issue described in the warning above and additionally the application container size will be kept minimal. It is most straightforward to use our [Python base images][python-base-images], since they provide **pip** support out of the box: `RUN pip install python-networkmanager`.

## Network Requirements

In order for a {{ $names.company.lower }} device to get outside of the local network and connect to the {{ $names.company.lower }} API, there are a few core network requirements.

{{ $names.company.upper }} makes use of the following ports:

* `443` TCP - This is the most fundamental requirement - it is used to connect to Cloudlink and the web terminal, and many web endpoints using TLS (https://.)
* `123` UDP - For NTP time synchronization.
* `53` UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings. Additionally, the NTP (`123`) and DNS (`53`) ports may be blocked if a local NTP and DNS server are provided.

Additionally, you should allowlist the following domains for the relevant ports above:
* `*.{{ $names.cloud_domain }}`

For older devices using `*.resin.io`, a `301 Moved Permanently` redirection to `*.{{ $names.cloud_domain }}` is in place so they remain compatible. Your systems should be able to handle this redirect so they can connect to the API.

Example:
```
$ curl -I http://api.resin.io
HTTP/1.1 301 Moved Permanently
Date: Wed, 25 Mar 2020 17:55:22 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 63
Connection: keep-alive
Location: https://api.balena-cloud.com/
Vary: Accept
```

NTP / UDP packets (port 123) are exchanged with:

* `0.resinio.pool.ntp.org`
* `1.resinio.pool.ntp.org`
* `2.resinio.pool.ntp.org`
* `3.resinio.pool.ntp.org`

[Google's Public DNS](https://developers.google.com/speed/public-dns) server at 8.8.8.8 is used by
default and in addition to DNS servers obtained via DHCP from your local network or service provider (balenaOS may issue queries to multiple DNS servers simultaneously, for the quickest response to be used). If additional DNS servers are configured via DHCP or other means, it is OK for the local network to block requests to `8.8.8.8`.
To avoid any requests being made to `8.8.8.8` by balenaOS, modify the
[dnsServers setting]({{ $links.githubOS }}/meta-balena#dnsservers) in `config.json`.

__Note:__ {{>"general/country-firewall"}}

## Connecting Behind a Proxy

We use **[redsocks](https://github.com/darkk/redsocks)** to connect your device to {{ $names.company.lower }} from behind a proxy. There are two ways to enable redsocks proxy. The preferred method is through Supervisor's `GET/PATCH /v1/device/host-config` endpoints - more info may be found <a href="https://www.balena.io/docs/reference/supervisor/supervisor-api/#patch-v1devicehost-config" target="_blank">here</a>. 

Alternatively, a `redsocks.conf` file should be added at `/mnt/boot/system-proxy/`, specifying the needed proxy configuration:

```apache
base {
    log_debug = off;
    log_info = on;
    log = stderr;
    daemon = off;
    redirector = iptables;
}

redsocks {
    type = socks5;
    ip = <SERVER IP>;
    port = 8123;
    local_ip = 127.0.0.1;
    local_port = 12345;
    login = "<YOUR_USERNAME>";
	password = "<YOUR_PASSWORD>";
}
```

Note that:

- File logging (`log = "file:/var/log/redsocks";`) is not used. It will lead to permission problems.
- `daemon = off` is set, so that **redsocks** doesn’t fork.
- `local_port = 12345` is set, so that the iptables rules and **redsocks** port match.
- Available redsocks types include `socks4`, `socks5`, `http-connect`, and `http-relay`.

Additionally, a `/mnt/boot/system-proxy/no_proxy` file can be added with a newline-separated list of IPs or subnets to not route through the proxy.

We've published an example [here](https://github.com/balenalabs/proxy-tunnel) demonstrating how to implement this on devices.

## Checking connectivity

You can configure a connectivity check using NetworkManager's builtin [feature][nm-connectivity]. In order to configure
custom endpoints, the URL, expected response, and check interval can be set in `config.json` (more information available
[here][meta-balena-connectivity]). By default, NetworkManager is configured to use {{ $names.cloud.lower }} to perform the check.

## Disable IPv6

In cases where a local network issue is preventing IPv6 traffic from being routed, you can fully disable IPv6 in {{ $names.os.lower }} 2.0 with the following commands.

__Warning:__ Making changes to the networking of a device is extremely dangerous and can lead to a device being unrecoverable, so exercise caution with any of the following.

```
root@087fd7c:/# nmcli c show
NAME                UUID                                  TYPE      DEVICE
Wired connection    087fd7cd-9a6b-423c-8b64-c30cbf6a7126  ethernet  eno1
...

root@087fd7c:~# nmcli c edit 087fd7cd-9a6b-423c-8b64-c30cbf6a7126

nmcli> set ipv6.method disable

nmcli> save persistent
Connection 'Wired connection' (087fd7cd-9a6b-423c-8b64-c30cbf6a7126) successfully updated.

nmcli> quit

root@087fd7c:~# nmcli c up 087fd7cd-9a6b-423c-8b64-c30cbf6a7126
```

To re-enable IPv6 follow the same commands but with `set ipv6.method enable`.

<!-- links -->

[nm-setting-ref]:https://developer-old.gnome.org/NetworkManager/stable/ref-settings.html
[nm-ipv4-setting-ref]:https://developer-old.gnome.org/NetworkManager/stable/settings-ipv4.html
[eduroam-ref]:https://www.eduroam.org
[nm-gsm-setting-ref]:https://developer-old.gnome.org/NetworkManager/stable/settings-gsm.html
[connman-link]: https://en.wikipedia.org/wiki/ConnMan
[networkmanager-link]:https://developer-old.gnome.org/NetworkManager/
[modemmanager-link]:https://www.freedesktop.org/wiki/Software/ModemManager/
[wifi-connect]:{{ $links.githubOS }}/wifi-connect
[dbus-link]:https://www.freedesktop.org/wiki/Software/dbus/
[network-manager-examples]:https://wiki.gnome.org/Projects/NetworkManager/Developers#Show_me_more_examples.21 "NetworkManager: Show me more examples!"
[redsocks]:https://github.com/darkk/redsocks
[redsocks-conf-example]:https://github.com/darkk/redsocks/blob/master/redsocks.conf.example
[python-base-images]:/reference/base-images/base-images/
[python-build-images]:/reference/base-images/base-images/#run-vs-build
[nm-connectivity]:https://manpages.debian.org/jessie/network-manager/NetworkManager.conf.5.en.html#CONNECTIVITY_SECTION
[wifi-dongles]:/reference/hardware/wifi-dongles
[meta-balena-connectivity]:{{ $links.githubOS }}/meta-balena#connectivity

