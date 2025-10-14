---
title: I2C and Other Interfaces
---

## I2C and Other Interfaces


* [Raspberry Pi Family](/hardware/i2c-and-spi#raspberry-pi-family)
  * [I2C](/hardware/i2c-and-spi#i2c)
  * [SPI](/hardware/i2c-and-spi#spi)
  * [1-wire and Digital Temperature sensors](/hardware/i2c-and-spi#1-wire-and-digital-temperature-sensors)
  * [Using UART or Serial on Raspberry Pi 3](/hardware/i2c-and-spi#using-uart-or-serial-on-raspberry-pi-3)
  * [Raspberry Pi camera module](/hardware/i2c-and-spi#raspberry-pi-camera-module)
  * [Raspberry Pi 7” Touchscreen Display](/hardware/i2c-and-spi#raspberry-pi-7-touchscreen-display)
  * [Customizing config.txt](/hardware/i2c-and-spi#customizing-config-txt)
* [Beaglebone](/hardware/i2c-and-spi#beaglebone)
  * [Capemgr support](/hardware/i2c-and-spi#capemgr-support)
  * [Disable HDMI](/hardware/i2c-and-spi#disable-hdmi)
* [Intel Edison](/hardware/i2c-and-spi#intel-edison)
  * [MRAA for GPIO and hardware access](/hardware/i2c-and-spi#mraa-for-gpio-and-hardware-access)
  * [Edison in USB Host mode](/hardware/i2c-and-spi#edison-in-usb-host-mode)
* [IOT-GATE-iMX8](/hardware/i2c-and-spi#iot-gate-imx8)
* [Up Squared](/hardware/i2c-and-spi#up-squared)
  * [Serial ports](/hardware/i2c-and-spi#serial-ports)
* [Jetson Devices](/hardware/i2c-and-spi#jetson-devices)
  * [Custom device trees](/hardware/i2c-and-spi#custom-device-trees)
  * [Configurable fan profiles](/hardware/i2c-and-spi#configurable-fan-profiles)
  * [Configurable power modes](/hardware/i2c-and-spi#configurable-power-modes)

## Raspberry Pi Family

Many sensors and peripherals use either the [I²C (Inter-Integrated Circuit)][i2c-link] or the [SPI (Serial Peripheral Interface)][spi-link] to communicate with the CPU. In most linux environments, using this kind of low level communication requires enabling a kernel module. In {{ $names.company.lower }} containers this can be done in a similar way because the containers are run in `--privileged` mode.

### I2C

I2C is enabled by default in BalenaOS via the `dtparam=i2c_arm=on` device tree parameter used on RaspberryPi devices. The i2c-dev module is loaded by the kernel automatically on startup. To access /dev/i2c-* char device files from a multi-container application, you can either list each file in your docker-compose.yml using device mappings:

```Dockerfile
services:
  my-service:
  ...
    devices:
      - "/dev/i2c-1:/dev/i2c-1"
```

or mark the container as privileged if you want to have all /dev/ nodes bind-mounted inside the container:

```Dockerfile
services:
  my-service:
  ...
    privileged:true
```

Single-container fleets run in privileged mode by default. If security and sandboxing are required then a multicontainer release should be created, even if only a single service is required.

To get you started, here is an [example project][balena-sense-example] that supports a variety of i2c sensors to build your own monitoring system for your environment and visualize data from a remote dashboard.

### SPI

SPI is enabled by default on {{ $names.os.lower }} via the `dtparam=spi=on` [device tree parameter][dt-params]. This default behavior can be modified by editing the [device configuration][device-configuration].

For Node.js applications it should work out of the box with the [spi node module][spi-npm]. For an example of this, check out this project: [digitiser][digitiser-link].

### Serial

Serial is disabled by default on the Raspberry Pi 3. To enable it you will need to do the following:

* Edit the `config.txt` in `{{ $names.company.short }}-boot` partition of the SD card and append the following lines.

```
enable_uart=1
```

### 1-wire and Digital Temperature sensors

In order to work work with 1-wire and digital temperature sensors you will need to do the following:

* Edit the `config.txt` in `{{ $names.company.short }}-boot` partition of the SD card and append the following lines.

```
dtoverlay=w1-gpio
```
* Add `modprobe w1-gpio && modprobe w1-therm` before your start scripts in either your package.json start command or Dockerfile `CMD` command.

An example of this is shown in our [Firebase Temperature Logger][firebaseTemp-link] project.

### Using UART or Serial on Raspberry Pi 3

To enable UART on `GPIO14 / UART0 TX` and `GPIO15 / UART0 RX` , you will need to apply the `pi3-miniuart-bt` device tree overlay.
This can be done in two ways:
1. Add the following Device (or Fleet) Configuration variable to your device (or Fleet).
```
BALENA_HOST_CONFIG_dtoverlay = pi3-miniuart-bt
```

2. The second, more manual way to enable this configuration is to mount the SD card on your development machine. Find the `resin-boot` partition and in there you should see the Raspberry Pi's boot files, one of which is called `config.txt`. Open this file up and add the following line to the end of the file:
```
dtoverlay=pi3-miniuart-bt
```

Now eject the SD card and pop it back into the RPI3, and you can boot the device up again.

To demonstrate this functionality, you can push this project ({{ $links.githubPlayground }}/rpi3-uart) to your RPI3. You will also need to add a small jumper wire between `GPIO14 / UART0 TX` and `GPIO15 / UART0 RX`, so that the data sent out of the UART is read back in and displayed in the logs.

### Raspberry Pi camera module

Depending on the version of your {{ $names.os.lower }}, the system contains different version of the Raspberry Pi firmware, and you need to apply slightly different settings. In both cases you can either modify `config.txt` on the `resin-boot` partition of your SD card, or add the settings remotely by using `BALENA_HOST_CONFIG_variablename` settings in your [fleet or device configuration](/learn/manage/configuration/).

**{{ $names.os.upper }} 1.16.0 and newer**

Set the following values in `config.txt`:
```
gpu_mem=128
start_x=1
```
or for remote update
* `BALENA_HOST_CONFIG_gpu_mem` to `128`
* `BALENA_HOST_CONFIG_start_x` to `1`
in the fleet or device configuration.

**{{ $names.os.upper }} 1.8.0 and earlier**

Set the following values in `config.txt`:
```
gpu_mem=128
start_file=start_x.elf
fixup_file=fixup_x.dat
```
or for remote update
* `BALENA_HOST_CONFIG_gpu_mem` to `128`
* `BALENA_HOST_CONFIG_start_file` to `start_x.elf`
* `BALENA_HOST_CONFIG_fixup_file` to `fixup_x.dat`
in the fleet or device configuration.

You will also need to add `modprobe bcm2835-v4l2` before your start scripts in either your `package.json` start command or Dockerfile `CMD` command.

An example of this is shown in our [Raspberry Pi python picamera][picamera-link] project.

### Raspberry Pi 7” Touchscreen Display

In order to work with the Raspberry Pi display you will need to do the following:

* Edit the `config.txt` in `resin-boot` partition of the SD card and append the following line.

```
device_tree_overlay=rpi-ft5406-overlay.dtb
```

If you want a quick example project to get you started with you new screen, you might want to checkout our [Raspberry Pi Electron starter App]({{ $links.githubPlayground }}/electron-rpi-quick-start).

If you find that you need to change the orientation of you LCD screen, you can easily achieve this by adding the following key/value to your `/boot/config.txt` on your SD card:
```
lcd_rotate = 0
```
And set the value to either 0, 90, 180 or 270, depending on your desired orientation.

__Note:__ The 90 and 270 degrees rotation options require additional memory on GPU,
so won't work with the 16M GPU split.

### Customizing config.txt
These are some tips and tricks for customizing your raspberry pi. Most of them require changing settings in the `config.txt` file on the SD cards `boot` partition. See [here](/configuration/advanced/) for more details.

You can also set all of these variables remotely for a single device or the entire fleet using the Configuration tab on the device or fleet level respectively. If the setting in `config.txt` is `variable=value`, you can achieve the same settings by adding a configuration variable with `BALENA_HOST_CONFIG_variable` set to the value `value`. For example:

![Setting the device configuration for Raspberry Pi config.txt variables](/img/hardware/host_config.webp)

For simplicity, below all examples are using the `config.txt` formatting, but all of them are available to set remotely as outlined above.

For further details and explanation regarding the settings below you may check the official [`config.txt` documentation](https://www.raspberrypi.com/documentation/computers/config_txt.html).

##### Binary Blobs for GPU/vcore
This is necessary for any graphics acceleration or if you want to use the official raspberry pi camera module
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

Currently the Beaglebone devices are running a very new 4.1 kernel (which is obviously awesome), unfortunately many of the userspace libraries haven't caught up yet so they only work with the older 3.8 kernel. Luckily [ruth0000](https://github.com/ruth0000) was kind enough to patch the Octalbonescript JS library and made a lovely node.js module over here: https://www.npmjs.com/package/octalbonescript_capemgr4_1 .

With this module you should be able to basic GPIO and analog-to-digital conversion stuff. To get you started we have a simple example using this module [here]({{ $links.githubPlayground }}/beaglebone-adc-node).

__Note:__ The ADC voltage is only rated to 1.8V, if you apply more you risk frying the pin.

### Capemgr support

__Warning:__ Capemgr is only supported in {{ $names.company.lower }} BBB devices with a 4.1 linux kernel. This kernel was only enabled in production on `25-09-2015`. If you don't know which kernel you are running, open a web terminal to your BBB and run `uname -a`.

##### Loading a Cape
```Bash
echo cape-universaln > /sys/devices/platform/bone_capemgr/slots
```
##### Checking which Capes are loaded.
```Bash
cat /sys/devices/platform/bone_capemgr/slots
```

```Bash
cat /sys/devices/platform/ocp/ocp:cape-universal/status

OCPDIR=/sys/devices/platform/ocp/ocp*
SLOTS=/sys/devices/platform/bone_capemgr/slots
```

### Disable HDMI

Before provisioning, mount the `.img`, in the `flash-boot` partition you should see a file named `uEnv.txt_internal` open that up with your favorite text editor and add
the following line to the bottom of the file:
```
fdtfile=am335x-boneblack-emmc-overlay.dtb
```

You should now be able to use any of the pins that used to be occupied by the HDMI. To test this you can run the following from your web terminal:
```bash
echo 74 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio74/direction
echo 1 > /sys/class/gpio/gpio74/value
```
Pin 41 of Header P8 should go high.

## IOT-GATE-iMX8

### Serial ports

The IOT-GATE-iMX8 has at least one serial port that can be configured as either RS232 or RS485. To select the RS232 operating mode, in the host operating system, add the following line to `/mnt/boot/extra_uEnv.txt`:

```Bash
uart_mode=rs232
```

Similarly, rs485 can be selected in the environment file as well. The device should be rebooted after setting the uart operating mode the for the changes to take effect.

## Up Squared

### Serial Ports

Depending on the HAT Configuration defined in BIOS, the Up Squared UART communication on pins 8 and 10 can be performed using either `/dev/ttyS4` or `/dev/ttyS5`. Please consult the HAT Configurations menu in BIOS for details on how pins are configured on your device.

## Jetson Devices

### Custom device trees
Loading of custom device trees in balenaOS for Nvidia boards is supported by the Jetson Nano, Jetson TX2 and Jetson Orin family of devices. The list of devices that support this function includes:
- Floyd  Nano
- Jetson Nano SD-CARD
- Jetson Nano eMMC
- Jetson Nano 2GB Devkit SD
- JN30B  Nano
- Photon Nano
- Astro   TX2
- Jetson  TX2
- Jetson  TX2 NX (with Xavier NX Devkit)
- Orbitty TX2
- Photon  TX2 NX
- Spacely TX2
- Jetson AGX Orin Devkit
- Jetson Orin NX in Xavier NX Devkit NVMe (16GB RAM)
- Jetson Orin Nano 8GB (SD) Devkit NVME

Loading of custom device trees is not supported for the Jetson Xavier family of devices in balenaOS. U-Boot provides the complete set of functionality necessary for loading custom device-trees in balenaOS for the Jetson Nano and TX2 devices, and this bootloader is not supported by the Jetson AGX Xavier and Jetson Xavier NX BSP. The Jetson AGX Orin family of devices uses a new Tegra UEFI bootloader which allows balenaOS to load custom device-trees.

To test a custom device tree on a Jetson Nano, TX2 or Jetson AGX Orin or Orin NX device, place your custom compiled device tree in the host operating system of your device, in the following path: `/mnt/sysroot/active/current/boot/`
After that, navigate to the `Device Configuration` tab in the balenaCloud dashboard, activate the following configuration with the description `Define the file name of the DTB to be used`, and specify the file name of the custom device tree. The value of this configuration should contain the file name only. After the change is applied, the device will automatically reboot and load the new device tree.

After the custom device tree has been validated, it can be included in newer balenaOS images. For Jetson TX2 and Nano, open a pull request in the [balena Jetson device](https://github.com/balena-os/balena-jetson) repository following this [example commit](https://github.com/balena-os/balena-jetson/commit/3dbf9c96e5986c2138f318d1ee9f0d5c1a2fc3c8). For the Jetson AGX Orin, the PR should be opened in the [balena Jetson Orin](https://github.com/balena-os/balena-jetson-orin) repository. Once your PR is approved and merged, a new balenaOS image that includes your custom device tree will become available shortly.

Please note that if the changes for your carrier board expand past kernel device-trees, or require modifications to board configuration files like pin multiplexing configuration files or any other device-trees or files used by firmware, these may not be provided by the existing cloud images. During provisioning the resulting configuration changes are stored in the QSPI or in the hardware defined boot partitions, and thus will be replaced with the default values when updating the Host Operating System. Please [contact us](https://www.balena.io/contact-sales) if you would like to use a Jetson carrier board which may not be fully compatible with its' corresponding devkit, or with any of our cloud images for your Jetson module.

### Configurable fan profiles

Jetson Orin Devices running balenaOS revisions newer than v6.1.24 and supervisor versions greater than v16.10.0 offer support for configurable fan profiles. You can switch between the options provided by Jetpack by navigating to the Device/Fleet Configuration tab on the sidebar of the balenaCloud dashboard, clicking "activate" on the "Define the device fan profile" configuration option, and typing in the desired value. The input value should be a string, without quotes. The change will be applied at runtime and will not trigger a device reboot. Preloading the [fan profile configuration](/reference/OS/configuration/#fanprofile) before provisioning your device can be achieved by editing the [config.json](/reference/OS/configuration/#about-configjson) file.

### Configurable power modes

Jetson Orin Devices running balenaOS revisions newer than v6.1.24 and supervisor versions greater than v16.10.0 also offer the possibility for selecting the desired power mode. You can set the values *low*, *mid* and *high* or specify the power mode ID directly by navigating to the Device/Fleet Configuration tab on the sidebar of the balenaCloud dashboard, clicking "activate" on the "Define the device power mode" configuration option, and typing in the desired value. The input value should be a string, or a single digit number, without quotes. Please note that your device(s) will automatically reboot to apply the new power mode. The available power modes IDs for your device type are visible in the host OS in `/etc/nvpmodel.conf`. Preloading the desired power mode configuration can be achieved by editing the [config.json](/reference/OS/configuration/#about-configjson) file and specifying the desired [power mode](/reference/OS/configuration/#powermode) before provisioning the device.

### Container packages

The Jetson specific packages installed in your container images need to be in sync with the Linux for Tegra version used by the Host Operating System. Our base images for Jetson devices come pre-populated with `/etc/apt/sources.list.d/nvidia.list` files, which include the necessary links so that the apt repositories are in sync with the L4T version used by our latest OS images. If you suspect you encountered a mismatch, please check the `L4T` version in your Host OS using `uname -r` and compare it to the release version in your container's `/etc/apt/sources.list.d/nvidia.list` file. Please check our [Jetson Examples](https://github.com/balena-io-examples/jetson-examples) repository for more information on how to set-up your container images.

## iMX8 Devices

### Custom device-trees
Loading of custom device trees in balenaOS for iMX boards is currently supported on the Variscite DART-MX8M Mini and Variscite VAR-SOM-MX8M-MINI Devkit.

To test your custom device tree, place it in the host operating system of your device in the following path: `/mnt/sysroot/active/current/boot/` . Then, navigate to the `Device Configuration` tab in the balenaCloud dashboard, activate the following configuration with the description `Define the file name of the DTB to be used`, and specify the file name of the custom device tree. The value of this configuration should contain the file name only. After the change is applied, the device will automatically reboot and load the new device tree.

After you have validated your custom device, it can be included in newer balenaOS images by opening a pull request in the [balena-variscite-mx8](https://github.com/balena-os/balena-variscite-mx8) repository. Once your PR is approved and merged, a new balenaOS image which includes your custom device tree will be made available shortly.

[i2c-link]:https://en.wikipedia.org/wiki/I%C2%B2C
[spi-link]:https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus
[balena-sense-example]:https://github.com/balena-labs-projects/balena-sense
[ads1115-link]:https://www.adafruit.com/product/1085
[digitiser-link]:{{ $links.githubPlayground }}/digitiser
[firebaseTemp-link]:{{ $links.githubPlayground }}/firebaseDTL
[spi-npm]:https://www.npmjs.com/package/spi
[picamera-link]:{{ $links.githubLabs }}/balena-rpi-python-picamera
[mraa-link]:https://github.com/intel-iot-devkit/mraa
[upm-link]:https://github.com/intel-iot-devkit/upm
[dockerbase-node]:https://hub.docker.com/r/{{ $names.base_images.lib }}/intel-edison-node/
[dockerbase-python]:https://hub.docker.com/r/{{ $names.base_images.lib }}/intel-edison-python/
[dt-params]:/reference/OS/advanced/#setting-device-tree-overlays-dtoverlay-and-parameters-dtparam
[device-configuration]:/learn/manage/configuration/#device-configuration-management
