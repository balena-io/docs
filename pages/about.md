# What is Resin.io?

[Resin.io][resin] makes it simple to deploy, update, and maintain code running on remote devices.

Our goal is to empower you to write great applications for devices - both in the virtual realm and those that cross over into the physical world - without having to worry about the friction involved in getting your hardware working and keeping your application up to date.

Doing this manually involves setting up an operating system, establishing a secure local network, configuring some means of recording and viewing logs, and providing some means of shipping new versions of code to devices in the field, amongst other equally vexing tasks.

Resin.io handles all of this for you.

## What Does Resin.io Do?

Resin.io leverages open source technologies including [containers][containers] and the [git][git] version control system to allow you to deploy code with a simple `git push resin` to any number of devices at once.

You simply create an account, download an installation tool, boot your devices and they appear in your web dashboard ready to receive code.

## What is Resin.io Useful For?

The most obvious example is having small devices connected around your house providing home automation - e.g. turning on the heating before you arrive home, or waking you up with natural sunlight by opening your curtains at a set time.

Though this kind of application is incredibly useful, the broader possibilities are far more exciting - imagine industrial machines detecting that they require maintenance ahead of time and automatically ordering required parts and scheduling technicians to fix them, or swarms of drones which conduct searches for missing people in vast areas far more efficiently and precisely than humans ever could.

In each of these examples there is significant work in getting up and running before you are even able to start using your hardware - resin.io eliminates these distractions altogether.

## Launch Devices

We've chosen to target a small set of target devices on launch - the [Raspberry Pi][rpi], the [Beaglebone Black][bbb] and the [ODROID-W][odroid].

Though we are target smaller devices on launch, we are by no means limited to devices of this form factor - our infrastructure and systems are written with as few assumptions as possible and we plan to support a number of devices of different types and computational capabilities.

In the coming months we plan to add support for other single board computers (SBC) such as the [Intel Edison][edison], [Parallella][parallella] and the i.MX 6 based [Hummingboard][hummingboard].

### Raspberry Pi

![Raspberry Pi](/img/rpi_b_plus.jpg)

With over 2 million units shipped worldwide, the [Raspberry Pi][rpi] is nothing short of a phenomenon. Unfortunately a lot of these devices end up in a drawer or an attic somewhere, sadly unused.

Both of these facts motivated us to target the Pi - the former means there are there are lots of projects already available for people to implement, and the latter suggests that removing friction from users' experience could be of real benefit.

### Beaglebone Black

![Beaglebone Black](/img/bbb.jpg)

The [Beaglebone Black][bbb] is a small $45 device similar to the Raspberry Pi but with significantly improved computational ability - 1GHz vs. the Raspberry Pi's 700MHz and a more recent [Cortex V8][cortex] ARM chip, with the better supported ARMv7 instruction set vs. the Raspberry Pi's ARMv6.

We chose to target the Beaglebone Black to provide support for a more capable device in the same class and price point as the Raspberry Pi.

### ODROID-W

![ODROID-W](/img/odroid.jpg)

The [ODROID-W][odroid] is a compressed design of the [Raspberry Pi][rpi] and based on the Broadcom BCM2835 CPU, it also includes an onboard analog-to-digital converter and a real-time clock.

Sadly this board was discontinued soon after its first production run, so if you can get your hands on one of these lovely boards, count yourself lucky. 

## Getting Started

To get started building a fleet of connected devices, check out our [getting started guide][gettingStarted].

[gettingStarted]:/pages/installing/gettingStarted.md

[resin]:http://resin.io
[containers]:http://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[git]:http://git-scm.com/
[cortex]:http://en.wikipedia.org/wiki/ARM_Cortex-A8

[rpi]:http://www.raspberrypi.org/
[nuc]:http://www.intel.co.uk/content/www/uk/en/nuc/overview.html
[bbb]:http://beagleboard.org/black
[odroid]:http://www.hardkernel.com/main/products/prdt_info.php?g_code=g140610189490
[edison]:http://www.intel.co.uk/content/www/uk/en/do-it-yourself/edison.html
[parallella]:https://www.parallella.org/board/
[hummingboard]:http://www.solid-run.com/products/hummingboard/
