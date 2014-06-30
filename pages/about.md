
# What is Resin.io?

[Resin.io][resin] is a service which makes it as simple as possible to deploy, update, and maintain code running on remote devices.

We aim to eliminate as many of the non-programming tasks as possible so you can
focus on the code you want your devices to run without having to worry about configuring each device individually, setting up their operating systems, connecting them to a secured local network, configuring logging, and most important of all providing some means of shipping new versions of code to devices in the field.

We handle all of this for you.

## How Does Resin.io Work?

We provide an installation image for you to place on your devices which contains an OS and our supervisor software which configures a secure local virtual network, connects to our servers, listens for updates to your software, and executes your code.

Output from your code is securely transmitted from the device and displayed on your device's dashboard.

## What is Resin.io Useful For?

For a more in-depth analysis of potential uses, see the [uses page](/pages/uses.md).

There are many situations where you may wish to have devices running remotely - day-to-day it can be useful to have small devices connected around your house providing home automation such as turning on the heating before you arrive home, waking you up with natural sunlight by opening curtains at a set time, or perhaps a more sophisticated home automation task such as intelligently monitoring energy usage around your home and providing detailed analyses so you can see the cost benefits of improving insulation, or even using face recognition technology to see if there are unwanted strangers in your home.

These are simple everyday examples, the possibilities are far broader - imagine industrial machines detecting that they require maintenance ahead of time and automatically ordering required parts and scheduling technicians to fix them, or swarms of drones which conduct searches for missing people in vast areas efficiently and far more precisely than humans ever could.

In each of these examples there are barriers to getting the applications working beyond the technical and practical solutions to the problems themselves - the 'accidental complexity' of setup and maintenance that get in the way of making these ideas reality. This is where Resin.io shines.

## Raspberry Pi

We chose to initially focus on a single device, as we felt it was vital to avoid the distraction of supporting a number devices before getting something useful out there to provide real-world feedback on our product.

With over 2 million units shipped worldwide the [Raspberry Pi][rpi] is nothing short of a phenomenon. Unfortunately, a lot of these devices end up in a drawer or a desk somewhere, sadly unused. Both these facts motivated us in choosing the Pi - its popularity means there are there are lots of projects already available, and the latter suggests that removing friction from users' experience could be of real benefit to many owners out there.

While we are initially targeting the Raspberry Pi, we are by no means limited to it or devices like it - our infrastructure and systems are written with as few assumptions as possible, and we plan to expand to support a number of different devices of different types and computational capacities.

## Getting Stated

To get started, check out our [guide][gettingStarted].

[resin]:http://resin.io
[rpi]:http://www.raspberrypi.org/

[gettingStarted]:/pages/gettingStarted.md
