<img style="float: right;padding-left: 10px;" src="/img/beaglebone-black/beaglebone-black.jpg" width="25%">

* A [Beaglebone Black][bbb-link] or [Beaglebone Green][bbg-link].
* A 4GB or larger SD card. Both the Beaglebone Black and Green use a Micro SD card. The [speed class][speed_class] of the card also matters - this determines its maximum transfer rate. We strongly recommend you get hold of a class 10 card or above.
* An ethernet cable or [WiFi adapter][wifi-adapters-link] to connect your device to the
  internet. The WiFi adapter for the Beaglebone Black is known to be unstable at moment, it is recommended that you use a usb WiFi adapter with a large external antenna.
* A mini USB cable the Beaglebone Black **OR** a micro USB cable for the Green.
* **[Optional]** A 5VDC 1A power supply unit for the Beaglebone Black.
* A [{{ $names.company.lower }} account][link-to-signup].

__Note:__ Always run the board from 5VDC 1A minimum supply when using a WiFi Dongle. You may need to use a extension cable to move the dongle away from the planes of the PCB. We also have had instances where when placed in a metal case, there can be WiFi issues as well. It will also help to use a dongle with a real antenna on it.

[bbb-link]:{{ $links.beaglebone.black }}
[bbg-link]:{{ $links.beaglebone.green }}
[wifi-adapters-link]:/hardware/wifi-dongles/
[speed_class]:https://en.wikipedia.org/wiki/Secure_Digital#Speed_class_rating
