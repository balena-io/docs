---
title: WiFi adapters and Modems
excerpt: Notes on WiFi adapter and modem compatibility with balenaOS
---

# Wifi Adapters and Modems

Balena's software validation is only doing a [sanity check](https://github.com/balena-os/meta-balena/tree/1fb02321afaaea4e43e296ae556e628a1dfed530/tests/suites/os/tests/modem) on features that are commonly required by balenaOS. To run these tests, we use a sample modem with the driver provided by the manufacturer and the NetworkManager/ModemManager support. 

Balena cannot guarantee that a specific modem or chipset is reliable and ready for production from our end. End users should run the necessary tests to validate their use case end-to-end and work with the vendor to resolve issues.


### Configuration

Wifi adapters drain a lot of power which unfortunately causes power issues with many 
devices if you try to *hotswap* the adapters (adding a WiFi adapter to your device 
*after* power-on). Be __sure__ you connect your WiFi adapter prior to switching on your 
device to avoid instability.

With some of the modems listed in the [**ModemManager** Supported Devices list][modemmanager-supported-devices] you may find they struggle to connect, this is most likely due to [usb_modeswitch][usb_modeswitch-link] not knowing how to automatically switch the device to modem mode. In these cases you will need to have a look at your modem's data sheet and figure out how to force it to stay in modem mode.


### Notes on Raspberry Pi

If you are powering your USB modem from a Raspberry Pi, it is a good idea to enable the [full 1.2A current][max-current] throughput for the USB ports.


### Notes on Beaglebone Black

Always run the Beaglebone Black from a 5VDC 1A minimum supply when using a Wifi Dongle. You may also need to use an extension cable to move the dongle away from the planes of the PCB, as often times there is too much interference for the wifi dongles to work correctly. Sometimes standoffs will work. We also have had instances where when placed in a metal case, there can be Wifi issues as well. It will also help to use a dongle with a real antenna on it.

Have a look at this list of [wifi dongles][bbb-wifi-list] that are known to be compatible with the Beaglebone Black. We have seen that the [Beaglebone Green][beaglebone-green-link] does not exhibit these wifi issues and has much better wifi stability overall.


[bbb-wifi-list]:https://elinux.org/Beagleboard:BeagleBoneBlack#WIFI_Adapters
[beaglebone-green-link]:https://wiki.seeedstudio.com/BeagleBone_Green_Wireless/
[modemmanager-supported-devices]:https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/
[usb_modeswitch-link]:https://linux.die.net/man/1/usb_modeswitch
[max-current]:/learn/develop/hardware/i2c-and-spi/#increase-usb-current-throughput