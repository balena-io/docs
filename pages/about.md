
# What is Resin.io?

[Resin.io][resin] is a service which makes it as simple as possible to get and keep code running on remote devices.

We aim to eliminate as many of the non-programming tasks as possible so you can
focus on the code you want your devices to run without having to worry about configuring each device individually, setting up their operating systems, connecting them to a secured local network, configuring logging, and most important of all providing some means of shipping new versions of code to devices in the field.

We handle all of this for you.

## How Does Resin.io Work?

We provide an image for you to place on your devices which contains an OS and our supervisor software which configures a secure local virtual network, connects to our servers and listens for updates to your software which it runs, transmitting logs to your device dashboard.

## What is Resin.io Useful For?

There are many situations where you may wish to have devices running remotely - day-to-day it can be useful to have small devices connected around your house providing home automation such as turning on the heating before you arrive home, waking you up with natural sunlight by opening curtains at a set time, or perhaps a more sophisticated home automation task - intelligently monitoring energy usage around your home and providing detailed analyses so you can see the cost benefits of improving insulation, or even using face recognition technology to see if there are unwanted strangers in your home.

These are simple everyday examples, the possibilities are far broader - imagine industrial machines detecting that they require maintenance ahead of time and automatically ordering required parts and scheduling technicians to fix them, or swarms of drones which conduct searches for missing people in vast areas efficiently and far more precisely than humans ever could.

In each of these examples there are barriers to getting the thing working that extend beyond the technical and practical solutions to the problems themselves - the 'accidental complexity' of setup and maintenance that acts as a barrier to making these ideas into reality - that's where Resin.io fits in.

## Raspberry Pi

We chose to initially focus on a single device as we feel it's vital to start with a specific target in order to get something useful out there as soon as possible without having to worry about tackling a broad range of devices all at once right from the start.

With over 2 million units shipped worldwide the [Raspberry Pi][rpi] is nothing short of a phenomenon. Unfortunately, a lot of these devices end up in a drawer on a desk somewhere sadly unused. Both of these facts feed into why we chose the Raspberry Pi initially - the popularity of the pi mean there are there are lots of projects available for it out there, and by eliminating the pain of setting these up we make a lot of really interesting projects possible for people. The latter fact makes us sad and we are excited to unlock the potential of this great device!

While we target the Raspberry Pi initially, we are by no means limited to it or devices like it - our infrastructure and systems are written with as few assumptions as possible and we plan to expand to support a number of different devices of different types and computation capacities.

## Getting Stated

To get started, check out our [guide][gettingStarted].

[resin]:http://resin.io
[rpi]:http://www.raspberrypi.org/

[gettingStarted]:/pages/gettingStarted.md
