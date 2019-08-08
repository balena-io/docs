### Basic Analog input in Node.js on the Beaglebone

{{> icon class="octicon octicon-mark-github" }}
[Repository]({{ $links.githubPlayground }}/beaglebone-adc-node)

A simple node.js project that uses the [Octalbonescript](https://github.com/theoctal/octalbonescript) library to read an analog voltage signal from `P9_33` on the Beaglebone every 3 seconds.

__Warning:__ **--This project will only work on {{ $names.os.lower }} images downloaded after 22-09-2015--**

### I2C proximity sensor

{{> icon class="octicon octicon-mark-github" }}
[Repository]({{ $links.githubPlayground }}/i2c-nodejs)

This is a simple node.js project that uses [i2c-bus](https://www.npmjs.com/package/i2c-bus) to get data from a [VLNC4000 proximity & light sensor](https://www.adafruit.com/products/466). It is made to be generic and act as base for any i2c sensor integration. It should work on any of the {{ $names.company.lower }} supported devices, you just need to make sure i2c is enabled in the kernel and know the i2c bus number for you device.
