---
title: Supported WiFi adapters
excerpt: WiFi adapters known to work with {{ $names.company.lower }} devices
---

# Supported Wifi Dongles

The officially supported {{ $names.company.lower }} wifi dongle is the [Official Raspberry Pi Wifi][rpi-official-wifi] with the BCM43143 chipset.
This chipset is guaranteed to work across all the device types supported by {{ $names.company.lower }}.

There are however many other USB wifi adapters that will work out of the box with {{ $names.company.lower }} devices.
## Known Working Devices

* [Pi Hut USB WiFi Adapter][pi-hut-usb] - Small form-factor and works right out
  of the box!
* [TP-Link Nano Router][nano-router] - Though this isn't strictly a WiFi
  adapter, it does enable you to connect to WiFi network using the ethernet port
  of the Pi and is known to work correctly with {{ $names.company.upper }}. As a result no further
  configuration is required.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit]
* [EP-N8531][epn8531]
* Generally speaking, WiFi devices listed over at the [elinux rpi wifi page][elinux] or devices which use one of the `linux-firmware-ath9k`, `linux-firmware-ralink` and `linux-firmware-rtl8192cu` firmwares should work correctly.

### Notes on Beaglebone Black

Always run the Beaglebone Black from a 5VDC 1A minimum supply when using a Wifi Dongle. You may also need to use an extension cable to move the dongle away from the planes of the PCB, as often times there is too much interference for the wifi dongles to work correctly. Sometimes standoffs will work. We also have had instances where when placed in a metal case, there can be Wifi issues as well. It will also help to use a dongle with a real antenna on it.

Have a look at this list of [wifi dongles][bbb-wifi-list] that are known to be compatible with the Beaglebone Black.

__Note:__ We have seen that the [Beaglebone Green][beaglebone-green-link] does not exhibit these wifi issues and has much better wifi
stability overall.

### Configuration

__Important Note:__ Wifi adapters drain a lot of power which unfortunately
causes power issues with many devices if you try to *hotswap* the adapters
(adding a WiFi adapter to your device *after* power-on). Be __sure__ you connect
your WiFi adapter prior to switching on your device to avoid instability.


[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[pi-hut-usb]:http://thepihut.com/products/usb-wifi-adapter-for-the-raspberry-pi
[bbb-wifi-list]:http://elinux.org/Beagleboard:BeagleBoneBlack#WIFI_Adapters
[connman]:http://en.wikipedia.org/wiki/ConnMan
[connman-format]:http://git.kernel.org/cgit/network/connman/connman.git/tree/doc/config-format.txt

[rpi-official-wifi]:https://www.raspberrypi.org/products/raspberry-pi-usb-wifi-dongle/
[beaglebone-green-link]:http://www.seeed.cc/beaglebone_green/
