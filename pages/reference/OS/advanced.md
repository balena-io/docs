---
title: Advanced boot settings
excerpts: Configuration options to expose more device functionality to {{ $names.os.lower }}
---

# Advanced boot settings

__Warning:__ This page contains details of advanced configuration options that expose more functionality, but any mistakes may potentially leave a device inaccessible.

## Raspberry Pi

The Raspberry Pi exposes device [configuration options][config-txt] via a text file on the [boot partition][boot-partition] named [`config.txt`][config-txt]. You can change boot options in this file, either by manually editing it before the device's first boot or editing the device [configuration variables][config-vars]. By default, the following values are set for Raspberry Pi devices:

{{> "general/config-variables-pi" }}

The boot partition is mounted on the device at `/mnt/boot`, and so on the device, the file is located at `/mnt/boot/config.txt`. For example, to view the contents of `config.txt` on a provisioned device use the following commands:

```shell
$ balena ssh <uuid>
$ cat /mnt/boot/config.txt
```

### Modifying `config.txt` locally before the first boot

Before the device is [provisioned][device-provisioning], you may edit `config.txt` by mounting a flashed SD card (with the partition label `resin-boot`) and editing the file directly. Any values added to `config.txt` will be added to the {{ $names.cloud.lower }} API during device provisioning and displayed on the dashboard. This will only work if you edit the file before the device's first boot, as after device provisioning, any changes will be overwritten by the device supervisor with values read from the {{ $names.cloud.lower }} API.

### Modifying `config.txt` using configuration variables

After the device has been [provisioned][device-provisioning], you can modify the values in `config.txt` using [configuration variables][config-vars].

__Note:__ After modifying a `config.txt` variable, the device supervisor will apply the changes and reboot the device.

Variables that start with the `BALENA_HOST_CONFIG_` or `RESIN_HOST_CONFIG_` prefix will be added to the `config.txt` file, replacing any preexisting values in the file. For example, a variable named `BALENA_HOST_CONFIG_start_x` with the value of `1` will result in the following entry in `config.txt`:

```
start_x=1
```

To manage configuration variables via the dashboard, add/edit variables via the *Fleet Configuration* page for [fleet-wide config variables][config-vars-fleet] and *Device Configuration* for [device specific variables][config-vars-device]. The device-specific variables, if defined, will override the fleet-wide variables of the same name. See the [configuration variables documentation][config-vars] for more details.

Configuration values that are prepopulated may be edited or toggled (enabled/disabled):

<img alt="Prepopulated device configuration variables" src="/img/configuration/default_configuration.png" width="100%">

Custom configuration variables may be added by clicking _Add custom variable_ and entering a name with the prefix of `BALENA_HOST_CONFIG_` or `RESIN_HOST_CONFIG_` as shown below:

<img alt="Add fleet configuration variable" src="/img/configuration/variable_editor_config.png" width="60%">

__Note:__ In addition to the dashboard, these configuration variables can be also be set using the API or any of its clients, including the [SDK][sdk] and [CLI][cli].

### GPU Memory

The [amount of memory][gpu-memory] that is addressable from the GPU may be configured by adding entries to `config.txt`. You can also set specific values of `gpu_mem` for Raspberry Pis with 256, 512, or 1024 MB (or greater) of RAM. Values will be ignored for those devices whose memory size does not match. For the Raspberry Pi 4, which has versions with RAM greater than 1GB, the minimum and maximum values are the same as for a 1GB device.

```
gpu_mem=16
gpu_mem_256=64
gpu_mem_512=128
gpu_mem_1024=256
```

`gpu_mem` is the default amount of memory, which, by default, is set to 16MB (specified by `gpu_mem=16`). This may well be less than you require depending on your application (particularly applications that make heavy use of the Raspberry Pi's graphics capabilities). As per the [Raspberry Pi documentation][gpu-memory], values of `gpu_mem` over 512 are not recommended, will provide no performance improvements, and are untested.

### Enable serial interface

The BCM2837 on the Raspberry Pi 3 has 2 built-in [UARTs][uart] (as did its predecessors), however, to support the Bluetooth functionality the fully-featured PL011 UART was moved from the header pins to the Bluetooth chip and the mini UART made available on header pins 8 & 10.

This has a number of consequences for users of the serial interface:

- The /dev/ttyAMA0 previously used to access the UART now connects to Bluetooth.
- The mini UART is now available on /dev/ttyS0. This is disabled by default for [production images][image-variants] and enabled by default for [development images][image-variants].
- The mini UART is a secondary low throughput UART intended to be used as a console. it supports the following functionality:
  - 7 or 8 bit operation.
  - 1 start and 1 stop bit.
  - No parities.
  - Break generation.
  - 8 symbols deep FIFOs for receive and transmit.
  - SW controlled RTS, SW readable CTS.
  - Auto flow control with programmable FIFO level.
  - 16550 like registers.
  - Baudrate derived from system clock.

The mini UART is enabled by default for development images. For production images either enable it using [configuration variables][config-vars] or before device provisioning by adding the following entry to `config.txt`:

```
enable_uart=1
```

__Note:__ For further information on UART device tree overlays, see the [Raspberry Pi documentation][uart].

### Setting device tree overlays (`dtoverlay`) and parameters (`dtparam`)

The Raspberry Pi allows loading [custom device tree overlays][device-tree-overlay] using the `dtoverlay` setting in `config.txt`. It also allows setting parameters for the default overlay with the `dtparam` setting. For these settings, the syntax is different from other keys because several entries can be added, and the bootloader will use all of them.

To allow setting several values, devices running {{ $names.os.lower }} version >= 2.12.0  (supervisor >= 7.0.0), will parse the values of `BALENA_HOST_CONFIG_dtoverlay` and `BALENA_HOST_CONFIG_dtparam` in a special way where the value of the configuration variable will be treated as the contents of a JSON array (without the enclosing braces `[]`), so a comma-separated list of quote-enclosed values will be split into several lines.

For example, the default value of `BALENA_HOST_CONFIG_dtparam = "i2c_arm=on","spi=on","audio=on"` will translate into the following entries in config.txt:

```
dtparam=i2c_arm=on
dtparam=spi=on
dtparam=audio=on
```

Another example would be setting several overlays with their own parameters, e.g. `BALENA_HOST_CONFIG_dtoverlay = "i2c-rtc,ds1307","lirc-rpi"` will translate to:

```
dtoverlay=i2c-rtc,ds1307
dtoverlay=lirc-rpi
```

This parsing will only be done if the value is a valid string, so if it doesn't begin with a quote `"`, the value will be parsed as a single string and not split into several lines. For instance `BALENA_HOST_CONFIG_dtoverlay = i2c-rtc,ds1307` will translate to:

```
dtoverlay=i2c-rtc,ds1307
```

### Disabling the rainbow splash screen

To disable the Raspberry Pi rainbow splash screen, add the `disable_splash=1` entry to `config.txt`.

__Note:__ This setting disables the Raspberry Pi rainbow splash screen but does not disable the {{ $names.company.lower }} logo splash screen. If you would like to replace the {{ $names.company.lower }} logo with your custom splash logo, replace `splash/balena-logo.png` located in the [boot partition][boot-partition] of the image. Note that this file may be called `resin-logo.png` on older releases.

[boot-partition]:/reference/OS/overview/2.x/#image-partition-layout
[cli]:/reference/cli/reference/balena-cli/#envs
[config-txt]:https://www.raspberrypi.org/documentation/configuration/config-txt/
[config-vars]:/learn/manage/configuration
[config-vars-fleet]:/learn/manage/configuration/#managing-fleet-configuration-variables
[config-vars-device]:/learn/manage/configuration/#managing-device-configuration-variables
[device-provisioning]:/learn/welcome/primer/#device-provisioning
[device-tree-overlay]:https://github.com/raspberrypi/linux/blob/rpi-4.19.y/arch/arm/boot/dts/overlays/README
[gpu-memory]:https://www.raspberrypi.org/documentation/configuration/config-txt/memory.md
[image-variants]:/reference/OS/overview/2.x/#variants-of-balenaos
[sdk]:/reference/sdk/node-sdk
[uart]:https://www.raspberrypi.org/documentation/configuration/uart.md
