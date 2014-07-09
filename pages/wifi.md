# Wifi Guide

The [Raspberry Pi][rpi] unfortunately does not come with a Wifi device included,
however there are various devices you can use to connect it to a wifi
network. Below we list ones we know to work correctly with Resin.io:-

## Known Working Devices

* [TP-Link Nano Router][nano-router] - Though this isn't strictly a wifi
  adapter, it does enable you to connect to wifi network using the ethernet port
  of the Pi and is known to work correctly with Resin.io.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit] - Note that currently
  you cannot hotswap this device in and have it work correctly (e.g. attach the
  device to the pi after it has booted.)

[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
