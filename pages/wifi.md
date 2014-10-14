# Wifi Guide

## Connecting a Device to WiFi

![Wifi Settings](/img/screenshots/wifi_settings.png)

To connect your devices to a WiFi network choose 'Wireless LAN', put in your
network's SSID and, if the network is encrypted, enter a passphrase.

__NOTE:__ The device will automatically determine your network's encryption (if
any) and connect using the provided passphrase, there's no need to specify the
encryption type.

## Raspberry Pi

The [Raspberry Pi][rpi] can be expanded to connect to a WiFi network by
installing a adapter:-

### Known Working Devices

* [Pi Hut USB WiFi Adapter][pi-hut-usb] - Small form-factor and works right out
  of the box!
* [TP-Link Nano Router][nano-router] - Though this isn't strictly a WiFi
  adapter, it does enable you to connect to WiFi network using the ethernet port
  of the Pi and is known to work correctly with Resin.io. As a result no further
  configuration is required.
* [Adafruit Miniature Wifi (802.11B/G/N) Module][adafruit]
* [EP-N8531][epn8531]
* Generally speaking, WiFi devices listed over at the [elinux rpi wifi page][elinux]
  or devices which use one of the `linux-firmware-ath9k`, `linux-firmware-ralink`
  and `linux-firmware-rtl8192cu` firmwares should work correctly.

### Configuration

__Important Note:__ Wifi adapters drain a lot of power which unfortunately
causes power issues with the Raspberry Pi if you try to *hotswap* them in
(adding a WiFi adapter to your Pi *after* power-on), so __ensure__ you connect
your WiFi device prior to switching on your Pi to avoid instability.

### Troubleshooting

If you have issues connecting with the WiFi device, first check to ensure the
SSID and passphrase are correct. If they are, try rebooting with an ethernet
cable plugged in, then booting again with just WiFi.

If neither of these approaches work, please let us know on the
[support forums][support]!

[rpi]:http://www.raspberrypi.org/
[nano-router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[adafruit]:http://www.adafruit.com/products/814
[epn8531]:http://www.amazon.com/BestDealUSA-EP-N8531-150Mbps-802-11n-Wireless/dp/B00AT7S060
[elinux]:http://elinux.org/RPi_USB_Wi-Fi_Adapters
[support]:http://support.resin.io/
[pi-hut-usb]:http://thepihut.com/products/usb-wifi-adapter-for-the-raspberry-pi
