<img style="float: right;padding-left: 10px;" src="/img/{{ $device.id }}/{{ $device.id }}.jpg" width="25%">

* An [{{ $device.name }}][device]. See our [supported devices list][supportedDevicesList] for other boards.
* A 4GB or larger microSD card. The [speed class][sdSpeed] of the card also matters - class 10 card or above is the way to go.
* A micro USB cable.
* **[Optional]** An ethernet cable.
* **[Optional]** A [2A micro USB power supply][psu].
* A [{{ $names.company.lower }} account][link-to-signup].

[device]:{{ $device.link }}
[psu]:https://www.raspberrypi.org/products/raspberry-pi-universal-power-supply/
[sdSpeed]:https://en.wikipedia.org/wiki/Secure_Digital#Speed_class_rating
[supportedDevicesList]:/reference/hardware/devices/
[link-to-signup]:{{ $links.dashboardUrl }}/signup
