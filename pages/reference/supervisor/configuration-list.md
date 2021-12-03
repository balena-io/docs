---
title: Configuration List for {{ $device.name }}

layout: config.html
extras: config-js

dynamic:
  variables: [ $device ]
  ref: $original_ref/$device
  $switch_text: Configuration for $device
---

# {{ title }}

This list contains configuration variables that can be used with {{ $names.company.lower }} devices, some of which will automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the dashboard, most of these variables can still be used with older supervisor versions, so be sure to check the *Valid from* column.

In addition to these values, there may be some device-type specific configuration variables that can be set. For example, these are a few of the values that apply to Raspberry Pi devices, corresponding to the contents of the [Raspberry Pi `config.txt` file](https://www.raspberrypi.org/documentation/configuration/config-txt/README.md)

You can find more information on updating `config.txt` through configuration variables in our [Advanced Boot Configuration Guide][boot-config-guide].

[boot-config-guide]:/reference/OS/advanced/#modifying-configtxt-remotely
