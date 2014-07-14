# Wifi Guide

Unfortunately the [Raspberry Pi][rpi] does not come with a wifi device equipped,
however you can install an adapter to overcome this limitation.

## Known Working Devices

* [TP-Link Nano Router][nano-router] - Though this isn't strictly a wifi
  adapter, it does enable you to connect to wifi network using the ethernet port
  of the Pi and is known to work correctly with Resin.io. As a result no further
  configuration is required.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit]
* [EP-N8531][epn8531]
* Generally speaking, wifi devices listed over at the [elinux rpi wifi page][elinux]
  or devices which use one of the `linux-firmware-ath9k`, `linux-firmware-ralink`
  and `linux-firmware-rtl8192cu` firmwares should work correctly.

## Configuration

__Important Note:__ Wifi adapters drain a lot of power which unfortunately
causes power issues with the Raspberry Pi if you try to *hotswap* them in
(adding a wifi adapter to your pi *after* power-on), so __ensure__ you connect
your wifi device prior to switching on your pi to avoid instability.

__Important Note:__ It's important that on *first boot* of your device you run
with an ethernet cable connected, otherwise the boot may not succeed. As with
much else at the alpha stage, we plan to eliminate this limitation soon :)

### Configuration Files

In order to configure a wifi adapter you need to manually update some files on
the SD card image. We plan to make this easier very soon.

The location the files need to be placed in varies depending on whether you have
booted from the SD card at least once:-

### Pre-Boot

If you haven't booted from your SD card yet, simply expand the zip file onto the
card and follow the steps described below.

### Post-Boot

If you have booted from the SD card at least once, you need to mount the first
partition, which should be roughly 200mb in size, e.g. in linux this could be
`/dev/mmcblk0p1`, depending on your distribution, linux configuration, and SD
card.

This partition may be labelled `RECOVERY`, again depending on your environment.

### Steps

You will know you have the correct partition as it will contain the `/resin`
directory. To configure your wifi do the following:-

1. Create the directory `/resin/network`.

2. Copy the two files listed below and modify them as needed to match your wifi
configuration.

These are [connman][connman] configuration files - we plan to provide more
details on specifying further options soon in the
[Advanced Configuration][advanced] section. For the time being, simply adapt
these to your needs!

### Setting Files

`settings`

```
[global]
OfflineMode=false

[WiFi]
Enable=true
Tethering=false

[Wired]
Enable=true
Tethering=false
```

`network.config`

```
[service_home_wifi]
Type = wifi
Name = SomeWifiSSID
Passphrase = VeryVeryVerySecret
```

[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[connman]:https://connman.net/
[advanced]:/pages/advanced.md
[wifi]:/pages/wifi.md
