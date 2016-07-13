---
title: Runtime Environment
---

# Runtime Environment

## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue. There is no need to have the docker `EXPOSE` command in your `Dockerfile`.

## Device URLS

Resin.io currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the resin.io dashboard and select the `Enable a public url for this device` checkbox. For more information about device URLS you can head over to the [Device Management Page](/management/devices#enable-public-device-url)

![Enable device url](/img/screenshots/device-url-new.png)


Running a server listening on port 80 with public device url enabled will allow you to serve content from the device to the world. Here is an example of an [express.js][expressjs-link] server which will serve to the devices url.

```javascript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
```

## Persistent Storage		

If you want specific data or configurations to persist on the device through the update process, you will need to store them in `/data` . This is a special folder on the device file system which is essentially a [docker data `VOLUME`][docker-volume-link].

This folder is guaranteed to be maintained across updates and thus		
files contained in it can act as persistent storage.		

Note that this folder is __not__ mounted when your project is building on our		
build server, so you can't access it from your `Dockerfile`. It is only created once your project is deployed to the actual devices. 		

Additionally, it is worth mentioning that the `/data` folder is created per-device and it is not kept in sync between devices in your fleet, so ensure your application takes this into account.

[expressjs-link]:http://expressjs.com/
[docker-volume-link]:https://docs.docker.com/userguide/dockervolumes/

## Using the Web Terminal

To help you debug and develop your application on resin.io, the dashboard provides a browser based terminal. This gives you console access to your running [container][docker-container] on the device and allows you to test out small snippets of code or check some system logs on your device. To use this feature, navigate your application and select the device you want access to. In that devices menu page you will find the `>_ Terminal` menu item.

### Establishing a Terminal Session

In order for you to start a terminal session in your device [container][docker-container], you first need to ensure that your device is **online** and code is **pushed to it** and is running. If your container code crashes or ends quickly, it is not possible to attach a console to it. One option to keep your containers running is to enable the INITSYSTEM in your container. This can easily be done by creating a device environment variable called `INITSYSTEM` and setting its value to `on`.

If your device is **online** and has **a running container** then simply click the blue ">_ Start Terminal" button and a terminal session should be initiated for you in a second or two as shown below:

<!-- TODO: update screenshot of webterminal -->
![A running web Terminal Session](/img/common/device/running-webterminal-session.png)

### Using the Terminal

The terminal session is hosted inside your application's [container][docker-container] where you are granted root privileges. By default your working directory will be the root directory of the filesystem.

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file. The recommended file path for your code is `/usr/src/app`.

#### Node Applications

If you're running a node application (i.e. an application that has no `Dockerfile` but rather a `package.json`), all your code will be automatically placed in `/app`, which is symlinked to `/usr/src/app`.

#### Terminal Closes On Update

When you push updates or restart your container, the terminal session is automatically closed and you will see something like:
```
root@beaglebone-green-wifi-9b01ed:/# SSH session disconnected                                                   
SSH reconnecting...                                                                                             
Spawning shell...    
```
The session should automatically restart once your container is up and running again.

[tty.js]:https://github.com/chjj/tty.js/
[docker-container]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
[systemd-base-image-link]:https://hub.docker.com/r/resin/raspberrypi-python/
