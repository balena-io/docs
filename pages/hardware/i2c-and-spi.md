#I2C and Other Interfaces

Many sensors and peripherals use either the [I²C (Inter-Integrated Circuit)][i2c-link] or the [SPI (Serial Peripheral Interface)][spi-link] to communicate with the CPU. In most linux enviroments, using this kind of low level communication requires enabling a kernel module.

##I2C

### Raspberry Pi

To enable I2C communication in your projects you will need to add the command `modprobe i2c-dev` to your package.json or Dockerfile.

The easiest way to add it so the package.json is to added to the "start" key. As shown here.
```
 "scripts": {
    "preinstall": "bash deps.sh",
    "start": "modprobe i2c-dev && node app.js"
  }
```

To add it to your Dockerfile, just add it before your entry script in the `CMD` command like so:
```
CMD modprobe i2c-dev && python /app/demo.py
```

After your first push, the code will most likely throw an error caused by the modules not being loaded. If this is the case, simply reboot the pi and the modules should be loaded.

__NOTE:__ A few places will talk about adding the modules to the /etc/modules file so that they are there on boot. This will not work on the resin.io system because that file is not mapped to the host OS.

To get you started, here is an [example][i2c-example] that uses i2c to communicate with the [ADS1115][ads1115-link] analog-to-digital converter to allow the Raspberry Pi to read analog signals, which is useful for a bunch of sensor types.

## SPI

SPI is enabled by default and should work out of the box with the [spi node module][spi-npm].

For an example of this, check our this project: [digitiser][digitiser-link].

## 1-wire and Digital Temperature sensors

To enable the DS18x20 temperature sensors, you need to add:
`modprobe w1-gpio && modprobe w1-therm `
before your start scripts in either your package.json or Dockerfile `CMD` command.

An example of this is shown in our [Firebase Temperature Logger][firebaseTemp-link] project.

## Raspberry Pi camera module

In order to work with the Raspberry Pi camera module you will need to do the following:

* Edit the `config.txt` in `resin-boot` partition of the SD card and append the following lines.

```
gpu_mem=128
start_file=start_x.elf
fixup_file=fixup_x.dat
```
* Add `modprobe bcm2835-v4l2` before your start scripts in either your package.json start command or Dockerfile `CMD` command.

An example of this is shown in our [Raspberry Pi python picamera][picamera-link] project.

[i2c-link]:http://en.wikipedia.org/wiki/I%C2%B2C
[spi-link]:http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus
[i2c-example]:https://github.com/shaunmulligan/resin-rpi-py-ADC
[ads1115-link]:http://www.adafruit.com/product/1085
[digitiser-link]:https://github.com/shaunmulligan/digitiser
[firebaseTemp-link]:https://github.com/shaunmulligan/firebaseDTL
[spi-npm]:https://www.npmjs.com/package/spi
[picamera-link]:https://github.com/resin-io-projects/resin-rpi-python-picamera
