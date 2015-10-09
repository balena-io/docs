# GPIO

## Raspberry Pi

__NOTE:__ The `GPIO4` and `GPIO5` ports (`GPIO5` is only available on the B+ and Raspberry Pi 2 devices) are currently reserved by us and therefore unavailable for use, attempts to use these pins will result in `EBUSY` error codes. We will soon remove this restriction, but for the time being avoid using these.

The [Raspberry Pi][rpi]'s [General Purpose I/O][gpio] (GPIO) pins can be used to send and receive arbitrary data from external hardware. In the diagram shown below the GPIO pins are located in the top-right hand corner of the device:-

![Raspberry Pi](/img/rpi.svg)

### Library Access

There are many libraries available for GPIO access, e.g. [Wiring Pi][wiring-pi]. For [node.js][node] users [npm][npm] has a number of [GPIO libraries][npm-gpio] available.

We recommend [Pi Pins][pi-pins] for node.js projects - we've found it works reliably on [Resin.io][resin]. Check out our [example GPIO application][example-gpio-app] which uses this library.

There are also specialist libraries available for powering particular classes of devices via GPIO, e.g. the [MAX7219 node library][max7219] for [MAX7219][max7219] LED displays.

### File System Access

You can use the file system directly to access GPIO pins using a [terminal][terminal] connection, scripts deployed to your Pi, or the file system interface of your programming environment.

GPIO pins are exposed via the Linux [sysfs][sysfs] file system at `/sys/class/gpio/gpio[pin number]`, e.g. pin 17 would be accessible via `/sys/class/gpio/gpio17`.

In order to gain access to a pin it first has to be exported - you can do this by outputting the desired pin number to `/sys/class/gpio/export`. You can later 'unexport' this GPIO pin by outputting this number to `/sys/class/gpio/unexport`.

Once a pin is exported you need to set its 'direction' - in or out - via `/sys/class/gpio/gpio[pin number]/direction`.

From then on you can output raw data to `/sys/class/gpio/gpio[pin number]/value` bit-by-bit - 0 is interpreted as a low signal, 1 or any other non-zero value is interpreted as a high signal.

E.g. accessing GPIO port 17 and sending some data:-

```
# ls /sys/class/gpio/gpio17
ls: cannot access /sys/class/gpio/gpio17: No such file or directory
# echo 17 > /sys/class/gpio/export
# ls /sys/class/gpio/gpio17
/sys/class/gpio/gpio17
# echo out > /sys/class/gpio/gpio17/direction
# echo 1 > /sys/class/gpio/gpio17/value
# echo 0 > /sys/class/gpio/gpio17/value
# echo 1 > /sys/class/gpio/gpio17/value
...
# echo 17 > /sys/class/gpio/unexport
# ls /sys/class/gpio/gpio17
ls: cannot access /sys/class/gpio/gpio17: No such file or directory
```

For more details on sysfs GPIO access see the [official kernel documentation][kernel-gpio].

### Pin Layout

GPIO pin numberings are listed below for all released models of the Raspberry Pi:-

__NOTE:__ The tables below assume your Pi is orientated as shown in the diagram above - the SD card should be at the top of the Pi and the ethernet port at the bottom. GND refers to ground pins.

__NOTE:__ If you have a 26-pin device, it's almost certainly a Raspberry Pi B rev2.

### Raspberry Pi B Rev 1

| Left |Right|
|------|-----|
| 3.3v | 5v  |
| 0    | 5v  |
| 1    | GND |
| 4    | 14  | (IMPORTANT: GPIO4 unavailable)
| GND  | 15  |
| 17   | 18  |
| 21   | GND |
| 22   | 23  |
| 3.3v | 24  |
| 10   | GND |
| 9    | 25  |
| 11   | 8   |
| GND  | 7   |

### Raspberry Pi A/B Rev 2

| Left |Right|
|------|-----|
| 3.3v | 5v  |
| 2    | 5v  |
| 3    | GND |
| 4    | 14  | (IMPORTANT: GPIO4 unavailable)
| GND  | 15  |
| 17   | 18  |
| 27   | GND |
| 22   | 23  |
| 3.3v | 24  |
| 10   | GND |
| 9    | 25  |
| 11   | 8   |
| GND  | 7   |

### Raspberry Pi B+ / Raspberry Pi 2

| Left |Right|
|------|-----|
| 3.3v | 5v  |
| 2    | 5v  |
| 3    | GND |
| 4    | 14  | (IMPORTANT: GPIO4 unavailable)
| GND  | 15  |
| 17   | 18  |
| 27   | GND |
| 22   | 23  |
| 3.3v | 24  |
| 10   | GND |
| 9    | 25  |
| 11   | 8   |
| GND  | 7   |
| ---  | --- |
| 5    | GND | (IMPORTANT: GPIO5 unavailable)
| 6    | 12  |
| 13   | GND |
| 19   | 16  |
| 26   | 20  |
| GND  | 21  |

__NOTE:__ The '---' pins between GND/7 and 5/GND are reserved for ID EEPROM and should not be used for GPIO ([reference][eeprom-diag])

### Voltage

All numbered data pins operate at 3.3v, however there are two 5v ports which output 5v DC output.

Please note that these are operating at a different voltage from the data pins - if you need to drive a 5v (or higher) device, you will need to use a [level converter][level-converter] to step up the data pin's voltage or your device will not be able to correctly interpret high signals from the Pi.

[terminal]:/pages/runtime/terminal.md

[resin]:https://resin.io

[rpi]:http://www.raspberrypi.org/
[node]:http://nodejs.org/
[npm]:https://www.npmjs.org/
[npm-gpio]:https://www.npmjs.org/search?q=gpio
[max7219]:http://www.maximintegrated.com/en/products/power/display-power-control/MAX7219.html

[gpio]:http://en.wikipedia.org/wiki/General-purpose_input/output
[sysfs]:http://en.wikipedia.org/wiki/Sysfs
[level-converter]:https://www.sparkfun.com/products/12009
[kernel-gpio]:https://www.kernel.org/doc/Documentation/gpio/sysfs.txt
[wiring-pi]:http://wiringpi.com/
[max7219]:https://github.com/victorporof/MAX7219.js
[eeprom-diag]:http://www.raspberrypi.org/wp-content/uploads/2014/04/bplus-gpio.png
[pi-pins]:https://www.npmjs.org/package/pi-pins
[example-gpio-app]:https://github.com/shaunmulligan/basic-gpio
