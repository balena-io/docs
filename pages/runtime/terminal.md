---
title: Using the Web Terminal
---

# Using the Web Terminal

To help you debug and develop your application on resin.io, the dashboard provides a hand webterminal. This gives you console access to your running [container][docker-container] on the device and allows you to test out small snippets of code or check some system logs on your device. To use this feature, navigate your application and select the device you want access to. In that devices menu page you will find the `>_ Terminal` menu item.

__Note:__ Don't use this feature for production applications as it introduces security vulnerabilities. Use only for development versions of your applications and ensure you close the terminal session when you are done.

## Establishing a Terminal Session

  In order for you to start a terminal session in your device [container][docker-container], you first need to ensure that your device is **online** and code is **pushed to it** and is running. If your container code crashes or ends quickly, it is not possible to attach a console to it. One option to keep your containers running is to enable the INITSYSTEM in your container. This can easily be done by creating a device environment variable called `INITSYSTEM` and setting its value to `on`.

  If your device is **online** and has **a running container** then simply click the green "Start Terminal Session" button and a terminal session should be started for you in a second or two as shown below:

![A running web Terminal Session](/img/common/device/running-webterminal-session.png)

## Using the Terminal

The terminal session is hosted inside your application's [container][docker-container] where you are granted root privileges. By default your working directory will be the root directory of the filesystem.

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file. The recommended file path for your code is `/usr/src/app`.

### Node Applications

If you're running  node application (i.e. an application that has no `Dockerfile` but rather a `package.json`), all your code will be automatically placed in `/app`, which is symlinked to `/usr/src/app`.

## Troubleshooting

### Terminal Closes On Update

When you push updates or restart your container, the terminal session is automatically closed and you will see something like:
```
root@raspberrypi3-3e4242:/#                                                                                                       
Device disconnected
```
To restart the terminal session once the update is complete, simply tap the "Start Terminal Session" button again.

[tty.js]:https://github.com/chjj/tty.js/
[docker-container]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
[systemd-base-image-link]:https://hub.docker.com/r/resin/raspberrypi-python/
