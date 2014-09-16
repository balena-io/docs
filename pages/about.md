
# What is Resin.io?

[Resin.io][resin] is a service which makes it simple to deploy, update, and maintain code running on remote devices.

Our goal is to empower you to write great applications for devices - both in the virtual realm and those that cross over into the physical world - without having to worry about the friction involved in getting your hardware working and keeping your application up to date.

Doing this manually involves setting up an operating system, establishing a secure local network, configuring some means of recording and viewing logs, and providing some means of shipping new versions of code to devices in the field, amongst other equally vexing tasks.

Resin.io handles all of this for you.

## What Does Resin.io Do?

Resin.io leverages open source technologies including [containers][containers] and the [git][git] version control system to allow you to deploy code with a simple `git push resin` to any number of devices at once.

You simply create an account, download an installation tool, boot your devices and they appear in your web dashboard ready to receive code.

## What is Resin.io Useful For?

The most obvious example is having small devices connected around your house providing home automation - e.g. turning on the heating before you arrive home, or waking you up with natural sunlight by opening your curtains at a set time.

Though this kind of application is incredibly useful, the broader possibilities are far more exciting - imagine industrial machines detecting that they require maintenance ahead of time and automatically ordering required parts and scheduling technicians to fix them, or swarms of drones which conduct searches for missing people in vast areas far more efficiently and precisely than humans ever could.

In each of these examples there is significant work in getting up and running before you are even able to start using your hardware - Resin.io eliminates these distractions altogether.

## Launch Devices

### Raspberry Pi

We've chosen to target a small set of target devices on launch, with particular focus on the [Raspberry Pi][rpi].

With over 2 million units shipped worldwide, the Raspberry Pi is nothing short of a phenomenon. Unfortunately a lot of these devices end up in a drawer or an attic somewhere, sadly unused.

Both of these facts motivated us in choosing the Pi - its popularity means there are there are lots of projects already available for people to implement, and the latter suggests that removing friction from users' experience could be of real benefit.

Though we target the Raspberry Pi, we are by no means limited to it or devices like it - our infrastructure and systems are written with as few assumptions as possible and we plan to support a number of devices of different types and computational capabilities.

## Getting Started

To get started, check out our [guide][gettingStarted].

[resin]:http://resin.io
[rpi]:http://www.raspberrypi.org/

[gettingStarted]:/pages/gettingStarted.md

[containers]:http://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[git]:http://git-scm.com/
