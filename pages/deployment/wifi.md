# Wifi Guide

## Connecting a Device to WiFi

To connect your devices to a WiFi network select the `wifi` option, put in your
network's SSID and, if the network is encrypted, enter a passphrase.

![Wifi Settings](/img/screenshots/wifi-settings-new.png)

__NOTE:__ The device will automatically determine your network's encryption (if
any) and connect using the provided passphrase, there's no need to specify the
encryption type.

###Changing your SSID and/or Passphrase

On the Raspberry Pi and Beaglebone, it is possible to change your wifi SSID or Passphrase after downloading the `.img`.

Currently this can be done by editing the `config.json`. This file can be found in the `resin-conf` partition on the SD card for most devices, except the Beaglebone Black and the Intel Edison. For the Beaglebone Black it can be found in the `flash-conf` partition. For the Intel Edison it can be found in in `resin-conf` once you have mounted the `config.img`.

__Note:__ For both the Beaglebone Black and the Intel Edison, you can only change the wifi configuration **before you provision** the device. Trying to change these settings after provisioning will have no effect.

In the `config.json` file edit the section called `files` with whatever `SSID` and `passphrase` you need.

```
"files": {
    "network/settings": "[global]\nOfflineMode=false\n\n[WiFi]\nEnable=true\nTethering=false\n\n[Wired]\nEnable=true\nTethering=false\n\n[Bluetooth]\nEnable=true\nTethering=false",
    "network/network.config": "[service_home_ethernet]\nType = ethernet\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_home_wifi]\nType = wifi\nName = My_Wifi_Ssid\nPassphrase = my super secret wifi passphrase\nNameservers = 8.8.8.8,8.8.4.4"
  }
```


### Multiple WiFi Connections

Though we currently don't support multiple WiFi SSIDs through the user
interface, this can be achieved by manually editing the `config.json` file on your SD card. To add a second wifi network to the configuration simply append the following to `"network/network.config":`:

```
"files": {
    "network/settings": "[global]\nOfflineMode=false\n\n[WiFi]\nEnable=true\nTethering=false\n\n[Wired]\nEnable=true\nTethering=false\n\n[Bluetooth]\nEnable=true\nTethering=false",
    "network/network.config": "[service_home_ethernet]\nType = ethernet\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_home_wifi]\nType = wifi\nName = My_Wifi_Ssid\nPassphrase = my super secret wifi passphrase\nNameservers = 8.8.8.8,8.8.4.4\n\n[service_office_wifi]\nType = wifi\nName = My_2nd_Wifi_Ssid\nPassphrase = my super sexy wifi\nNameservers = 8.8.8.8,8.8.4.4"
  }
```

In general the network config follows the [ConnMan][connman] configuration file format, so you can configure your network in anyway connMan allows. Follow the [official guide][connman-format] for details of how to configure your network if you have more complicated requirements than the our standard configuration.

## Raspberry Pi

The [Raspberry Pi][rpi] can be expanded to connect to a WiFi network by
installing an adapter:-

### Known Working Devices

* [Pi Hut USB WiFi Adapter][pi-hut-usb] - Small form-factor and works right out
  of the box!
* [TP-Link Nano Router][nano-router] - Though this isn't strictly a WiFi
  adapter, it does enable you to connect to WiFi network using the ethernet port
  of the Pi and is known to work correctly with Resin.io. As a result no further
  configuration is required.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit]
* [EP-N8531][epn8531]
* Generally speaking, WiFi devices listed over at the [elinux rpi wifi page][elinux] or devices which use one of the `linux-firmware-ath9k`, `linux-firmware-ralink` and `linux-firmware-rtl8192cu` firmwares should work correctly.

### Beaglebone Black

Always run the Beaglebone Black from a 5VDC 1A minimum supply when using a Wifi Dongle. You may need to use an extension cable to move the dongle away from the planes of the PCB, as often times there is too much interference for the wifi dongles to work correctly. Sometimes standoffs will work. We also have had instances where when placed in a metal case, there can be Wifi issues as well. It will also help to use a dongle with a real antenna on it.

Have a look at this list of [wifi dongles][bbb-wifi-list] that are known to be compatible with the Beaglebone Black.

### Configuration

__Important Note:__ Wifi adapters drain a lot of power which unfortunately
causes power issues with the Raspberry Pi if you try to *hotswap* them in
(adding a WiFi adapter to your Pi *after* power-on), so __ensure__ you connect
your WiFi device prior to switching on your Pi to avoid instability.

### Troubleshooting

If you have issues connecting with the WiFi device, first check to ensure the
SSID and passphrase are correct. If they are, try rebooting with an ethernet
cable plugged in, then booting again with just WiFi.

If neither of these approaches work, please let us know!

[custom-network]:/pages/configuration/custom-network.md

[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[pi-hut-usb]:http://thepihut.com/products/usb-wifi-adapter-for-the-raspberry-pi
[bbb-wifi-list]:http://elinux.org/Beagleboard:BeagleBoneBlack#WIFI_Adapters
[connman]:http://en.wikipedia.org/wiki/ConnMan
[connman-format]:http://git.kernel.org/cgit/network/connman/connman.git/tree/doc/config-format.txt
