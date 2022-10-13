---
title: Supported WiFi adapters
excerpt: WiFi adapters known to work with {{ $names.company.lower }} devices
---

# Supported Wifi Adapters

{{> "meta-balena/supported-wifi-adapters" }}

There are however many other wifi adapters that will work out of the box with 
{{ $names.company.lower }} devices. Generally speaking, WiFi devices listed 
over at the [elinux rpi wifi page][elinux] or devices which use one of the
`linux-firmware-ath9k`, `linux-firmware-ralink` and `linux-firmware-rtl8192cu`
firmwares should work correctly.

Here are some notable devices known to work:

* [Pi Hut USB WiFi Adapter][pi-hut-usb] - Small form-factor and works right out of the box!
* [TP-Link WN725N][TL-WN725N] - Small, reliable and cheap TP Link device.
* [TP-Link AC600][TL-AC600] - Dual band alternative to WN725N.
* [TP-Link Nano Router][nano-router] - Though this isn't strictly a WiFi
  adapter, it does enable you to connect to WiFi network using the ethernet port
  of the Pi and is known to work correctly with {{ $names.company.upper }}. As a result no further
  configuration is required.


## Supported modems 

{{> "meta-balena/supported-modems" }}


## WiFi USB Dongle

{{> "meta-balena/supported-wifi-usb-dongle" }}


### Configuration

Wifi adapters drain a lot of power which unfortunately causes power issues with many 
devices if you try to *hotswap* the adapters (adding a WiFi adapter to your device 
*after* power-on). Be __sure__ you connect your WiFi adapter prior to switching on your 
device to avoid instability.

### Notes on Beaglebone Black

Always run the Beaglebone Black from a 5VDC 1A minimum supply when using a Wifi Dongle. You may also need to use an extension cable to move the dongle away from the planes of the PCB, as often times there is too much interference for the wifi dongles to work correctly. Sometimes standoffs will work. We also have had instances where when placed in a metal case, there can be Wifi issues as well. It will also help to use a dongle with a real antenna on it.

Have a look at this list of [wifi dongles][bbb-wifi-list] that are known to be compatible with the Beaglebone Black. We have seen that the [Beaglebone Green][beaglebone-green-link] does not exhibit these 
wifi issues and has much better wifi
stability overall.


[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[pi-hut-usb]:http://thepihut.com/products/usb-wifi-adapter-for-the-raspberry-pi
[bbb-wifi-list]:http://elinux.org/Beagleboard:BeagleBoneBlack#WIFI_Adapters
[TL-WN725N]:https://www.amazon.com/TP-Link-wireless-network-Adapter-SoftAP/dp/B008IFXQFU
[TL-AC600]:https://www.amazon.com/TP-Link-Mini-Wireless-Supports-10-9-10-14/dp/B07PB1X4CN
[beaglebone-green-link]:https://wiki.seeedstudio.com/BeagleBone_Green_Wireless/
