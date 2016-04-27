---
title: I2C and Other Interfaces
---

## I2C and Other Interfaces


* [Raspberry Pi Family](/hardware/i2c-and-spi#raspberry-pi-family)
  * [I2C](/hardware/i2c-and-spi#i2c)
  * [SPI](/hardware/i2c-and-spi#spi)
  * [1-wire and Digital Temperature sensors](/hardware/i2c-and-spi#1-wire-and-digital-temperature-sensors)
  * [Raspberry Pi camera module](/hardware/i2c-and-spi#raspberry-pi-camera-module)
  * [Raspberry Pi 7” Touchscreen Display](/hardware/i2c-and-spi#raspberry-pi-7-touchscreen-display)
  * [Customising config.txt](/hardware/i2c-and-spi#customizing-config-txt)
* [Beaglebone](/hardware/i2c-and-spi#beaglebone)
  * [Capemgr support](/hardware/i2c-and-spi#capemgr-support-on-resin-io-devices)
* [Intel Edison](/hardware/i2c-and-spi#intel-edison)
  * [MRAA for GPIO and hardware access](/hardware/i2c-and-spi#mraa-for-gpio-and-hardware-access)
  * [Edison in USB Host mode](/hardware/i2c-and-spi#edison-in-usb-host-mode)

## Raspberry Pi Family

Many sensors and peripherals use either the [I²C (Inter-Integrated Circuit)][i2c-link] or the [SPI (Serial Peripheral Interface)][spi-link] to communicate with the CPU. In most linux environments, using this kind of low level communication requires enabling a kernel module. In resin.io containers this can be done in a similar way because the containers are run in `--priviledged` mode.

### I2C

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

### SPI

SPI is enabled by default and should work out of the box with the [spi node module][spi-npm].

For an example of this, check our this project: [digitiser][digitiser-link].

### 1-wire and Digital Temperature sensors

To enable the DS18x20 temperature sensors, you need to add:
`modprobe w1-gpio && modprobe w1-therm `
before your start scripts in either your package.json or Dockerfile `CMD` command.

An example of this is shown in our [Firebase Temperature Logger][firebaseTemp-link] project.

### Raspberry Pi camera module

In order to work with the Raspberry Pi camera module you will need to do the following:

* Edit the `config.txt` in `resin-boot` partition of the SD card and append the following lines.

```
gpu_mem=128
start_file=start_x.elf
fixup_file=fixup_x.dat
```
* Add `modprobe bcm2835-v4l2` before your start scripts in either your package.json start command or Dockerfile `CMD` command.

An example of this is shown in our [Raspberry Pi python picamera][picamera-link] project.

### Raspberry Pi 7” Touchscreen Display

In order to work with the Raspberry Pi display you will need to do the following:

* Edit the `config.txt` in `resin-boot` partition of the SD card and append the following line.

```
device_tree_overlay=rpi-ft5406-overlay.dtb
```

If you want a quick example project to get you started with you new screen, you might want to checkout our [Raspberry Pi Electron starter App](https://github.com/resin-io-projects/electron-rpi-quick-start).

If you find that you need to change the orientation of you LCD screen, you can easily achieve this by adding the following key/value to your `/boot/config.txt` on your SD card:
```
lcd_rotate = 0
```
And set the value to either 0, 90, 180 or 270, depending on your desired orientation.

__Note:__ The 90 and 270 degrees rotation options require additional memory on GPU,
so won't work with the 16M GPU split.

### Customising config.txt
These are some tips and tricks for customizing your raspberry pi. Most of them require changing settings the the config.txt file on the SD cards `boot` partition.

##### Binary Blobs for GPU/vcore
This is neccessary for any graphics acceleration or if you want to use the official raspberry pi camera module
```
gpu_mem=128
start_file=start_x.elf
fixup_file=fixup_x.dat
```

##### Increase USB current throughput:

This can be useful if you are running a power hungry USB peripheral like a 3G dongle.
```
max_usb_current=1
safe_mode_gpio=4
```

##### overclock RPI2:

```
arm_freq=1000
core_freq=500
sdram_freq=400
over_voltage=0
over_voltage_sdram_p=0
over_voltage_sdram_i=0
over_voltage_sdram_c=0
```
###### OR
```
arm_freq=1000
sdram_freq=500
core_freq=500
over_voltage=2
temp_limit=80 #Will throttle to default clock speed if hit.
```

##### Fill the screen to the edges

```
disable_overscan=1
overscan_left=4
overscan_right=4
overscan_top=4
overscan_bottom=4
```

## Beaglebone

Currently the Beaglebone devices are running a very new 4.1 kernel (which is obviously awesome), unfortunately many of the userspace libraries haven't caught up yet so they only work with the older 3.8 kernel. Luckily [ruth0000](https://github.com/ruth0000) was kind enough to patch the Octalbonscript JS library and made a lovely node.js module over here: https://www.npmjs.com/package/octalbonescript_capemgr4_1 .

With this module you should be able to basic GPIO and analog-to-digital conversion stuff. To get you started we have a simple example using this module [here](https://github.com/resin-io-projects/beaglebone-adc-node).

__Note:__ The ADC voltage is only rated to 1.8V, if you apply more you risk frying the pin.

### Capemgr support on Resin.io devices

__Warning:__ Capemgr is only supported in resin.io BBB devices with a 4.1 linux kernel. This kernel was only enabled in production on `25-09-2015`. If you don't know which kernel you are running, open a webterminal to your BBB and run `uname -a`.

##### Loading a Cape
```
echo cape-universaln > /sys/devices/platform/bone_capemgr/slots              
```
##### Checking which Capes are loaded.
```
cat /sys/devices/platform/bone_capemgr/slots
```

```
cat /sys/devices/platform/ocp/ocp:cape-universal/status

OCPDIR=/sys/devices/platform/ocp/ocp*
SLOTS=/sys/devices/platform/bone_capemgr/slots
```

## Intel Edison
### MRAA for GPIO and hardware access
The best and easiest way to interface with GPIO, I2C, SPI or UART on the Intel Edison is to use the
[MRAA library][mraa-link], this library gives you a simple way to write C, python or Node.js applcations that
interact directly with the Edison hardware.

If you use our [resin/edison-node][resin-dockerbase-node] or [resin/edison-python][resin-dockerbase-python] base images in your applications, you will automatically have the mraa setup correctly for node.js or python respectively.

Have a look at this [python example](https://github.com/shaunmulligan/hello-python-edison) or this [node.js example](https://github.com/shaunmulligan/edison-blink-node) to get started.

### Edison in USB Host mode

The Edison needs a kernel module to be loaded to trigger the UBS HOST mode. This can be done in the following way.

##### Hardware Pre-requisites:
Your Edison will need to be powered externally for the USB host mode to be active - Either through the DC jack on the Arduino board or through the battery connector on the smaller Intel carrier board.

##### Software Pre-requisites:
The following code needs to be placed at the start before any device operations are run in your application container.
```
#!/bin/bash

mount -t devtmpfs none /dev
udevd --daemon

# g_multi needs a file to be passed which shows up as USB storage if Edison is in device mode.
# We are creating a blank file here.
dd if=/dev/zero of=/data/blank.img bs=10M count=1

# The following is needed to get the Edison to switch to host mode - If the power connections aren't made for the HOST mode this exposes the file above as USB storage, emulates a USB network card and USB serial connected to the Edison.
sync && modprobe g_multi file=/data/blank.img stall=0 idVendor=0x8087 idProduct=0x0A9E iProduct=Edison iManufacturer=Intel

udevadm trigger
udevadm settle

# Shutdown the unnecessary usb0 spawned by g_mutli
sleep 5s && ifconfig usb0 down
```

After this you should be able to easily use your Intel Edison in USB host mode.

[i2c-link]:http://en.wikipedia.org/wiki/I%C2%B2C
[spi-link]:http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus
[i2c-example]:https://github.com/shaunmulligan/resin-rpi-py-ADC
[ads1115-link]:http://www.adafruit.com/product/1085
[digitiser-link]:https://github.com/shaunmulligan/digitiser
[firebaseTemp-link]:https://github.com/shaunmulligan/firebaseDTL
[spi-npm]:https://www.npmjs.com/package/spi
[picamera-link]:https://github.com/resin-io-projects/resin-rpi-python-picamera
[mraa-link]:https://github.com/intel-iot-devkit/mraa
[resin-dockerbase-node]:https://hub.docker.com/r/resin/edison-node/
[resin-dockerbase-python]:https://hub.docker.com/r/resin/edison-python/
