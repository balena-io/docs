### Basic GPIO Control in Node.js

{{> icon class="octicon octicon-mark-github" }}
[Repository]({{ $links.githubPlayground }}/balena-rpi-nodejs-basic-gpio)

This sample project will get you started blinking LEDs on the **{{ $device.name }}** using only javascript. For this project you will need some additional hardware, namely a basic LED, a breadboard and a 220 ohm resistor.

### Audio stock ticker in Node.js

{{> icon class="octicon octicon-mark-github" }}
[Repository]({{ $links.githubPlayground }}/audio-stock-ticker)

The audio stock ticker will verbally announce a list of your favorite stocks every couple of minutes or hours, depending on how you configure it. For this project you will need some head phones or speakers to connect to the **{{ $device.name }}'s** audio jack.

### Servo motor control in Node.js

{{> icon class="octicon octicon-mark-github" }}
[Repository](https://github.com/hobochild/resin-servo-node)

A simple application to issue commands to a servo motor using pi-blaster.

### SMS 2 Speech

{{> icon class="octicon octicon-mark-github" }}
[Repository](https://github.com/alexandrosm/sms2speech)

Send SMSes with Twilio and convert them to speech on your Raspberry Pi. For this project you will need some head phones or speakers to connect to the {{ $device_details.name }}'s audio jack.

### I2C proximity sensor

{{> icon class="octicon octicon-mark-github" }}
[Repository]({{ $links.githubPlayground }}/i2c-nodejs)

This is a simple node.js project that uses [i2c-bus](https://www.npmjs.com/package/i2c-bus) to get data from a [VLNC4000 proximity & light sensor](https://www.adafruit.com/products/466). It is made to be generic and act as base for any i2c sensor integration. It should work on any of the {{ $names.company.lower }} supported devices, you just need to make sure i2c is enabled in the kernel and know the i2c bus number for you device.
