<img style="float: right;padding-left: 10px;" src="/img/raspberrypi4/raspberrypi4.webp" width="25%">

* A [Raspberry Pi 4 Model B][rpi4B]. See our [supported devices list][supportedDevicesList] for other boards.
* A 4GB or larger microSD card. The [speed class][sdSpeed] of the card also matters - use the fastest you can find.
* A USB-C cable (for power supply, rated at 3A).
* A [3A USB-C power supply][psu].
* **[Optional]** An ethernet cable.
* A [{{ $names.company.lower }} account][link-to-signup].

If you intend to use [hardware Rev 1.5][hardware-troubleshooting] of the Raspberry Pi 4 Model B, then we recommend using recent versions of balenaOS (v2.88.5+rev1 or later). Earlier balenaOS versions won’t boot due to [changes in this hardware revision](https://forums.raspberrypi.com/viewtopic.php?t=329299). Refer to [instructions][hardware-troubleshooting] for identifying the hardware revision of your Raspberry Pi 4 Model B.

[rpi4B]:https://www.raspberrypi.org/products/raspberry-pi-4-model-b/
[psu]:https://www.raspberrypi.org/products/type-c-power-supply/

[sdSpeed]:https://en.wikipedia.org/wiki/Secure_Digital#Speed_class_rating
[wifiAdapters]:/reference/hardware/wifi-dongles/
[supportedDevicesList]:/reference/hardware/devices/
[hardware-troubleshooting]:/faq/troubleshooting/raspberrypi4-64#balenaos-boot-issues-with-new-hardware-revision-of-rpi4 
[link-to-signup]:{{ $links.dashboardUrl }}/signup
