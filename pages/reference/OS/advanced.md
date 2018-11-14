---
title: Advanced boot settings
excerpts: Configuration options to expose more device functionality to {{ $names.os.lower }}
---

# Advanced boot settings

__Warning:__ This page contains details of the more *involved* configuration
options that expose more functionality but potentially enable you to break
things should you configure them incorrectly - tread carefully!

## Raspberry Pi

### config.txt

The Raspberry Pi exposes device configuration options via a text file on the
boot medium, `config.txt` - you change boot options simply by editing this file.

__Note:__ You will only find the `config.txt` file after first boot, it can then easily be found in the `resin-boot` partition of the SD card.

#### Modifying `config.txt` locally after the first boot

The `config.txt` is located in the root of the `resin-boot` partition, and you can modify it by mounting the SD card on a computer.

#### Modifying `config.txt` **remotely**

If your device has a supervisor version above 1.0.0, it has support for modifying the values in `config.txt` remotely using [configuration variables][config-vars]. These can be set as fleet-wide values (for all devices in an application) or device-specific ones.

The variables that start with the `RESIN_HOST_CONFIG_` prefix will be added to the `config.txt` file, also replacing the preexisting values of such variables in the file.

For example, setting the value of `RESIN_HOST_CONFIG_gpu_mem` to 16 will produce the following entry in `config.txt`:

```
gpu_mem=16
```

These variables can be set using the API or any of its clients, including the [SDK][sdk], the [CLI][cli], and the dashboard. To configure via the dashboard, add variables to the *Fleet Configuration* page for fleet-wide config variables and to *Device Configuration* for device specific variables. The device-specific variables, if defined, will override the fleet-wide variables of the same name.

**After modifying a config.txt variable, the device supervisor will apply the changes and reboot the device.**

__Note:__ Configuration variables defined through the API will not apply to devices in [local mode][local-mode]. You will need to define them in your `resin-sync.yml`.

### GPU Memory

You can configure the amount of memory shared with the GPU by adding entries to
`config.txt` as follows:

```
gpu_mem=16
gpu_mem_256=64
gpu_mem_512=128
```

Each of these values is specified in megabytes.

Note that `gpu_mem_256` is used by the 256MB Raspberry Pi (Model A - you
probably *don't* have one of these), and `gpu_mem_512` is used by the 512MB
Raspberry Pi (Model B/B+ - this is probably what you have.)

The Model A Raspberry Pi ignores the 512MB setting altogether while the model B
and B+ ignore the 256MB setting. Both `gpu_mem_256` and `gpu_mem_512` override
`gpu_mem`.

By default we assign 16MB of memory to the GPU (specified by `gpu_mem`.) This
may well be less than you require depending on your application (particularly
applications which make heavy use of the Pi's graphics card.)

### Enable serial interface

The BCM2837 on the Raspberry Pi3 has 2 UARTs (as did its predecessors), however to support the Bluetooth functionality the fully featured PL011 UART was moved from the header pins to the Bluetooth chip and the mini UART made available on header pins 8 & 10.

This has a number of consequences for users of the serial interface.
 - The /dev/ttyAMA0 previously used to access the UART now connects to Bluetooth.
 - The miniUART is now available on /dev/ttyS0, disabled by default.
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

To enable the miniUART an entry should be added to `config.txt` as follows:
```
enable_uart=1
```

### Further Reading

There are more details on the options available in `config.txt` over at
[elinux's RPi Config page][elinux].

[elinux]:http://elinux.org/RPiconfig
[config-vars]:/learn/manage/configuration
[sdk]:/reference/sdk/node-sdk
[cli]:/reference/cli
[local-mode]:/learn/develop/local-mode
