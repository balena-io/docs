# Wifi Guide

## Raspberry Pi

Unfortunately the [Raspberry Pi][rpi] does not come with a wifi device equipped,
however you can install an adapter to overcome this limitation.

### Known Working Devices

* [TP-Link Nano Router][nano-router] - Though this isn't strictly a wifi
  adapter, it does enable you to connect to wifi network using the ethernet port
  of the Pi and is known to work correctly with Resin.io. As a result no further
  configuration is required.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit]
* [EP-N8531][epn8531]
* Generally speaking, wifi devices listed over at the [elinux rpi wifi page][elinux]
  or devices which use one of the `linux-firmware-ath9k`, `linux-firmware-ralink`
  and `linux-firmware-rtl8192cu` firmwares should work correctly.

### Configuration

__Important Note:__ Wifi adapters drain a lot of power which unfortunately
causes power issues with the Raspberry Pi if you try to *hotswap* them in
(adding a wifi adapter to your Pi *after* power-on), so __ensure__ you connect
your wifi device prior to switching on your Pi to avoid instability.

### Troubleshooting

If you have issues connecting with the wifi device, first check to ensure the
SSID and passphrase are correct. If they are, try rebooting with an ethernet
cable plugged in, then booting again with just wifi.

If neither of these approaches work, please let us know on the
[support forums][support]!

[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[support]:http://support.resin.io/
