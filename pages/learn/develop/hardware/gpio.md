---
title: GPIO Interface
---

# GPIO

Recommended ways of interacting with GPIO on {{ $names.company.lower }} devices.

* [Raspberry Pi](/hardware/gpio#raspberry-pi)
* [Beaglebone](/hardware/gpio#beaglebone)

## Raspberry Pi

The [Raspberry Pi][rpi]'s [General Purpose I/O][gpio] (GPIO) pins can be used to send and receive arbitrary data from external hardware. In the diagram shown below the GPIO pins are located in the top-right hand corner of the device:-

![Raspberry Pi](/img/rpi.svg)

#### Library Access

There are many libraries available for GPIO access. For [node.js][node] users, [npm][npm] has a number of [GPIO libraries][npm-gpio] available.

We recommend [Pi Pins][pi-pins] for node.js projects - we've found it works reliably on [{{ $names.company.lower }}][balena]. Check out our [example GPIO application][example-gpio-app] which uses this library.

There are also specialist libraries available for powering particular classes of devices via GPIO, e.g. the [MAX7219 node library][max7219] for [MAX7219][max7219] LED displays.

#### Voltage

All numbered data pins operate at 3.3v, however there are two 5v ports which output 5v DC output.

Please note that these are operating at a different voltage from the data pins - if you need to drive a 5v (or higher) device, you will need to use a [level converter][level-converter] to step up the data pin's voltage or your device will not be able to correctly interpret high signals from the Pi.

## Beaglebone

Currently the Beaglebone devices are running a very new 4.1 kernel (which is obviously awesome), unfortunately many of the userspace libraries haven't caught up yet so they only work with the older 3.8 kernel. Luckily [ruth0000](https://github.com/ruth0000) was kind enough to patch the [Octalbonescript](https://github.com/theoctal/octalbonescript) JS library and made a lovely node.js module over here: https://www.npmjs.com/package/octalbonescript_capemgr4_1 .

With this module you should be able to carry out basic GPIO and analog-to-digital conversion operations. To get you started we have a simple example using this module [here]({{ $links.githubPlayground }}/beaglebone-adc-node).

If you would prefer a python implementation, then look at this [github issue](https://github.com/adafruit/adafruit-beaglebone-io-python/issues/80#issuecomment-163073883) and get involved in making it happen.

[terminal]:/runtime/terminal

[balena]:{{ $links.mainSiteUrl }}

[rpi]:https://www.raspberrypi.org/
[node]:https://nodejs.org/
[npm]:https://www.npmjs.org/
[npm-gpio]:https://www.npmjs.org/search?q=gpio
[max7219]:https://www.analog.com/en/products/max7219.html

[gpio]:https://en.wikipedia.org/wiki/General-purpose_input/output
[sysfs]:https://en.wikipedia.org/wiki/Sysfs
[level-converter]:https://www.sparkfun.com/products/12009
[kernel-gpio]:https://www.kernel.org/doc/Documentation/gpio/sysfs.txt
[max7219]:https://github.com/victorporof/MAX7219.js
[eeprom-diag]:https://www.raspberrypi.org/wp-content/uploads/2014/04/bplus-gpio.png
[pi-pins]:https://www.npmjs.org/package/pi-pins
[example-gpio-app]:https://github.com/shaunmulligan/basic-gpio
