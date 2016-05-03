---
title: Advanced Boot settings
---

# Advanced Boot Configuration Guide

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

If your device has an Agent (Supervisor) version above 1.0.0 (which you can check on the "Agent version" entry in the [device dashboard](https://dashboard.resin.io)), it has support for modifying the values in `config.txt` remotely using config variables which behave similarly to [environment variables](/management/env-vars) in that you can set application-wide values (for all devices in an application) or device-specific ones.

The variables that start with the `RESIN_HOST_CONFIG_` prefix will be added to the `config.txt` file, also replacing the preexisting values of such variables in the file.
For example, setting the value of `RESIN_HOST_CONFIG_gpu_mem` to 16 will produce the following entry in `config.txt`:

```
gpu_mem=16
```

These variables can be set using the [SDK](/tools/sdk) or the dashboard. To configure via the dashboard add variables to the "Fleet Config Variables" page for application-wide config variables and to "Device Config Variables" for device specific variables.

The device-specific variables, if defined, will override the application-wide variables of the same name.
**After modifying a config.txt variable, the Supervisor will apply the changes and reboot the device.**

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

### Further Reading

There are more details on the options available in `config.txt` over at
[elinux's RPi Config page][elinux].

<!-- NOTE: the dd link is probably legacy code since it isn't used anywhere on this page -->
[dd]:http://en.wikipedia.org/wiki/Dd
[elinux]:http://elinux.org/RPiconfig
