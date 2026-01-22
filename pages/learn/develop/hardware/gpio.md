---
title: GPIO Interface
---

# GPIO

Recommended ways of interacting with GPIO on balena devices.

- [Raspberry Pi](../../../../hardware/gpio/#raspberry-pi)
- [Beaglebone](../../../../hardware/gpio/#beaglebone)

## Raspberry Pi

All Raspberry Pi SBCs have a header that includes a number of [General Purpose Input/Output ("GPIO")](https://en.wikipedia.org/wiki/General-purpose_input/output) pins. These pins can be used to control external hardware such as LEDs, solenoids, motors, or other devices, as well as read data from various sensors. (The GPIO pins employ standard 3.3 volt logic and can't drive high current devices directly.) The earliest models used a 26 pin header, but all recent models use a 40 pin header.

#### Background

As Raspberry Pi models have evolved over the years, the hardware driving these GPIO pins has changed multiple times. The original Pi GPIO pins were directly driven from the SoC itself, while the Pi 5 uses a separate RP1 chip to drive the user-facing GPIO pins. For this reason, GPIO software libraries that use direct access to registers may stop working as hardware and kernel updates change the location of these registers.

This situation is very evident on libraries that depend on the long-deprecated `sysfs` interface, which is due to be removed completely from the Linux kernel.

The appropriate method to access GPIO features is via the standard Linux libgpiod library. Using a hardware abstraction such as this means the Linux kernel handles any differences in hardware that may be encountered between different models.

#### Library Access

The current Raspberry Pi GPIO libraries include:

- [Libgpiod](https://libgpiod.readthedocs.io/en/latest/) is a C library and set of tools for interacting with the Linux GPIO character devices (/dev/gpiochipX).
- [Pinctrl](https://github.com/raspberrypi/utils/tree/master/pinctrl) is a more powerful replacement for raspi-gpio, a tool for displaying and modifying the GPIO and pin muxing state of a system. It accesses the hardware directly, bypassing the kernel drivers
- [Rpi-lgpio](https://rpi-lgpio.readthedocs.io/en/release-0.4/) is a compatibility package intended to provide compatibility with the rpi-gpio (aka RPi.GPIO) library, on top of kernels that only support the gpiochip device (and which have removed the deprecated sysfs GPIO interface).

These libraries have been tested to run equally well on multiple models of Raspberry Pi and various balenaOS and kernel versions. ([Example repository](https://github.com/balena-io-experimental/pi-gpio).)

Much of this information and the image above is an excerpt from "A history of GPIO usage on Raspberry Pi devices, and current best practices" by [Raspberry Pi Ltd](https://pip.raspberrypi.com/categories/685-whitepapers-app-notes/documents/RP-006553-WP/A-history-of-GPIO-usage-on-Raspberry-Pi-devices-and-current-best-practices.pdf).

## Beaglebone

Currently Beaglebone devices are running a new 4.1 kernel, unfortunately many of the userspace libraries haven't caught up yet so they only work with the older 3.8 kernel. Checkout the [Octalbonescript](https://github.com/theoctal/octalbonescript) JS library and a Node.js module here: [https://www.npmjs.com/package/octalbonescript_capemgr4_1](https://www.npmjs.com/package/octalbonescript_capemgr4_1).

With this module you should be able to carry out basic GPIO and analog-to-digital conversion operations. To get you started we have a \[example using this module]\(https://github.com/balena-io-playground/beaglebone-adc-node).

The [Adafruit BBIO](https://github.com/adafruit/adafruit-beaglebone-io-python) library enables GPIO, PWM, ADC, UART, SPI, and eQEP hardware access from Python.

\[balena]:https://balena.io
