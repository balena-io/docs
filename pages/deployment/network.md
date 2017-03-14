---
title: Network Setup
---

# Network Setup

* [Introduction](#introduction)
* [Network Requirements](#network-requirements)
* [Ethernet Connections](#ethernet-connections)
* [Wifi Connections](#wifi-connections)
* [Changing your network configuration](#changing-your-network-configuration)
* [3G or Cellular Connections](#3g-or-cellular-connections)
* [Captive Portal Network Setup](#captive-portal-network-setup)

## Introduction

In order to deploy code to your device(s), they will need to be connected to the internet in some shape or form. The resin.io HostOS manages your devices' network connection with [ConnMan][connman], an open source connection manager.

Currently all resin.io devices are configured to favour [ethernet](#ethernet-connections) and will automatically use this connection type if it is available. You can define all manner of network configurations using [Connman][connman], for example [setting a static IP](#set-static-ip).

## Network Requirements

In order for a resin.io device to get outside of the local network and connect to the resin.io API, there are a few core network requirements.

Resin.io makes use of the following ports:

* `443` TCP - This is the most fundamental requirement - it is used to connect to the VPN and the web terminal, and many web endpoints using TLS (https://.)
* `123` UDP - For NTP time synchronisation.
* `53` UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings.

Additionally, if the network your device is connecting to works with whitelisting, you should whitelist the following domains on Port `80` and `443`:
* `*.resin.io`
* `*.pubnub.com`

Additionally make an outgoing connection to `mixpanel.com`, but this is not a functional requirement for resin.io, but rather allows us to track some useful metrics.

## Ethernet Connections

As mentioned earlier, resin.io HostOS defaults to using ethernet for internet connectivity, so if you connect an active ethernet cable to your device and all the [network requirements](#network-requirements) are satisfied, your device should simply just connect to dashboard.resin.io and you should be able to push code to it.

If this this is not the case, and your device is still not online 10 minutes after power up, then give us a shout at `support@resin.io` or click on the small **`?`** in the bottom right of your resin.io dashboard.

### Set Static IP

In order to configure static IP on a pre-provisioned SD card perform the following steps:-
* Mount the FAT partitions of the OS image either directly from the `.img` file, or by burning the SD card and mounting it on your computer. The volume will be called `resin-boot`.
* Inside the `resin-boot` partition you will find a `config.json` file and in it you will see a network key/value pair which contains JSON string encoded [Connman][connman] settings. Now edit the value to include the following entry, replacing `<static IP>` with your desired static IP:-

__NOTE:__ Before Resin OS 1.2, the `resin-conf` partition was used instead of `resin-boot`.

```Ini
[service_home_ethernet]
Type = ethernet
IPv4 = <static IP>/255.255.255.0/192.168.1.1
Nameservers = 192.168.1.1,8.8.8.8
```
__Note:__ This assumes your network gateway/router is `192.168.1.1` and your DNS is `192.168.1.1,8.8.8.8`. Both of these can and will vary, so adjust this according to your local network configuration.

The image will now contain your static IP configuration, simply write it to your SD card as you usually would.
If you're curious about further configurability, this `network.config` file is simply a Connman network configuration file (see [here](https://en.wikipedia.org/wiki/ConnMan) and [here](https://wiki.archlinux.org/index.php/Connman)). The [Connman Docs][connman-format] have more details on other configuration options.

## WiFi Connections

To connect your devices to a WiFi network select the `wifi` option, put in your
network's SSID and, if the network is encrypted, enter a passphrase.

![Wifi Settings](/img/screenshots/wifi-settings-new.png)

__NOTE:__ The device will automatically determine your network's encryption (if
any) and connect using the provided passphrase, there's no need to specify the
encryption type.

### Multiple WiFi Connections

Though we currently don't support multiple WiFi SSIDs through the user
interface, this can be achieved by manually editing the `config.json` file on your SD card. To add a second wifi network to the configuration simply append the following to `"network/network.config":`:

```JSON
"files": {
    "network/settings": "[global]\nOfflineMode=false\n\n[WiFi]\nEnable=true\nTethering=false\n\n[Wired]\nEnable=true\nTethering=false\n\n[Bluetooth]\nEnable=true\nTethering=false",
    "network/network.config": "[service_home_ethernet]\nType = ethernet\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_home_wifi]\nType = wifi\nName = My_Wifi_Ssid\nPassphrase = my super secret wifi passphrase\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_office_wifi]\nType = wifi\nName = My_2nd_Wifi_Ssid\nPassphrase = my super sexy wifi\nNameservers = 8.8.8.8,8.8.4.4"
  }
```

In general the network config follows the [ConnMan][connman] configuration file format, so you can configure your network in anyway connMan allows. Follow the [official guide][connman-format] for details of how to configure your network if you have more complicated requirements than the our standard configuration.

## Changing your Network Configuration

On all devices excluding the [Intel Edison](/installing/gettingStarted-Edison), it is possible to change your wifi SSID or Passphrase after downloading the `.img`.

### Using the CLI

The best way to do this is using the [resin CLI][resin-cli]. Install the CLI, plug your SD Card into your computer and run the following command, passing the correct device type associated with your image.

Example for reconfiguring a Raspberry Pi image:
``` shell
$ sudo resin config reconfigure --type raspberry-pi
```

The command will ask a simple questions and will update the `config.json` file for you. You can also edit advanced settings by passing the `--advanced` flag.

``` shell
$ sudo resin config reconfigure --type raspberry-pi --advanced
```

To view an images current configuration run:
```shell
$ sudo resin config read --type raspberry-pi
```

If you'd like to reconfigure the image's network settings in an automated way you can use [`resin config write`](/tools/resin-cli#config-write-60-key-62-60-value-62-).

### Manually Editing Config.json

Currently this can be done by editing the `config.json`. This file can be found in a partition called `resin-boot` on the SD card for most devices (on Resin OS versions before 1.2 it was `resin-conf` or `flash-conf`), except the Intel Edison. For the Intel Edison it can be found in in `resin-conf` once you have mounted the `config.img`.

__Note:__ For the Beaglebone, VIA VAB-820, Intel NUC and the Intel Edison, you can only change the wifi configuration **before you provision** the device. Since these devices rely on burning the OS to internal media such as eMMC, trying to change these settings after provisioning will have no effect, you will need to reprovision the device.

In the `config.json` file you will need to edit the section called `files` with whatever `SSID` and `passphrase` you require.

```JSON
"files": {
    "network/settings": "[global]\nOfflineMode=false\n\n[WiFi]\nEnable=true\nTethering=false\n\n[Wired]\nEnable=true\nTethering=false\n\n[Bluetooth]\nEnable=true\nTethering=false",
    "network/network.config": "[service_home_ethernet]\nType = ethernet\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_home_wifi]\nType = wifi\nName = My_Wifi_Ssid\nPassphrase = my super secret wifi passphrase\nNameservers = 8.8.8.8,8.8.4.4"
  }
```
__Note:__ Unfortunately this file is not nicely formatted and it requires that you use the `\n` to signify a newline.

## 3G or Cellular Connections

Currently 3G or Cellular modems are not supported out of the box, but they are easily setup on a resin.io device. During the setup of your cellular connection, you will need an ethernet or wifi connection to the device so that it can correctly provision and download a container with the necessary configurations.

To get started with a cellular connection have a look at our blog post ["A guide to cellular connectivity on resin.io devices"](https://resin.io/blog/cellular-connectivity/) and the corresponding [github repository](https://github.com/resin-io-projects/cellular-modem.git).

## Captive Portal Network Setup

In some cases devices will need to be provisioned and sent out to sites where the exact network or wifi configuration is unknown. In these circumstances its often nice for a device to serve up an [captive portal][captive-portal-link] which allows an onsite user to configure the wifi for a device.

If you require this functionality in your devices, you should have a look at our captive portal project called [Resin Wifi Connect][wifi-connect-link] and its associated [blog post][wifi-connect-blog]

### Troubleshooting

If you have issues connecting with the WiFi device, first check to ensure the
SSID and passphrase are correct. If they are, try rebooting with an ethernet
cable plugged in, then booting again with just WiFi.

If neither of these approaches work, drop us a line at support@resin.io !

[resin-cli]:/tools/cli
[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[pi-hut-usb]:http://thepihut.com/products/usb-wifi-adapter-for-the-raspberry-pi
[bbb-wifi-list]:http://elinux.org/Beagleboard:BeagleBoneBlack#WIFI_Adapters
[connman]:http://en.wikipedia.org/wiki/ConnMan
[connman-format]:http://git.kernel.org/cgit/network/connman/connman.git/tree/doc/config-format.txt
[wifi-connect-link]:https://github.com/resin-io/resin-wifi-connect
[captive-portal-link]:https://en.wikipedia.org/wiki/Captive_portal
[wifi-connect-blog]:https://resin.io/blog/resin-wifi-connect/
