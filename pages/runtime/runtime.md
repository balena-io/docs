---
title: Container Runtime
---
# Container Runtime

On resin.io devices all your application code runs a [ Docker container][container-link]. This means that whatever you define as `CMD` in your `Dockerfile` will be PID 1 of the process tree in your container. It also means that this PID 1 process needs to know how to properly process UNIX signals, reap orphan zombie processes [[1]][ref-one] and if it crashes your whole container crashes, losing logs and debug info.

## Init System

For these reasons we have built an [init system][init-system-link] into most of the resin base images listed here: [Resin Base Images Wiki][base-image-wiki-link]. The init system will handle signals, reap zombies and also properly handle [udev][udev-link] hardware events correctly.

There are two ways of enabling the init system in your application. You can either add the following environment variable in your Dockerfile:
```Dockerfile
# enable container init system.
ENV INITSYSTEM=on
```
or you can add an environment variable from the Dashboard by navigating to the `Environment Variables` menu item on the left and adding the variable as show below:
![Enable init system](/img/common/app/app_initsystem_envvar.png)

Once you have enabled your init system you should see something like this in your device logs:
![init system enabled in logs](/img/common/device/device_logs_initsystem_enabled.png)

You shouldn't need to make any adjustments to your code or `CMD` it should just work out of the box. Note that if you are using our Debian or Fedora based images, then you should have [systemd][systemd-link] in your containers, where as if you use one of our Alpine images you will have [OpenRC][openrc-link] as your init system.

## SSH Access

{{> "general/container-ssh"}}

## The Container Environment

When you start a terminal session, either via the web terminal or the CLI, you are dropped into your applications running container. Its important to note that your container needs to be running for you to actually SSH into it, this is where the [init system](#init-system) helps a lot. By default you are the `root` user and granted root privileges in the container.

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file. The recommended file path for your code is `/usr/src/app` as you will see in most of our demo projects. If you're running a pure node.js application (i.e. an application that has no `Dockerfile` or `Dockerfile.template` but rather a `package.json`), all your code will be automatically placed in `/app`, which has a symbolic link to `/usr/src/app`.

Inside the container we provide a number of `RESIN_` namespaced environment variables. Below is a short description of some of these.

<!-- TODO: Add note about API key's permissions -->
|    Variable   	| Description 	|
|:----------:	    |:-----------:	|
| `RESIN_SUPERVISOR_API_KEY` 	|  blah blah  	|
| `RESIN_APP_ID` 	            |  blah blah  	|
| `RESIN` 	                  |  blah blah  	|
| `RESIN_SUPERVISOR_ADDRESS` 	|  blah blah  	|
| `RESIN_DEVICE_RESTART` 	    |  blah blah  	|
| `RESIN_SUPERVISOR_HOST` 	  |  blah blah  	|
| `RESIN_DEVICE_UUID` 	      |  blah blah  	|
| `RESIN_API_KEY` 	          |  blah blah  	|
| `RESIN_SUPERVISOR_VERSION` 	|  blah blah  	|
| `RESIN_SUPERVISOR_PORT` 	  |  blah blah  	|

root@raspberrypi3-cb6f09d:/# printenv | grep RESIN
RESIN_SUPERVISOR_API_KEY=039cd2dc36a96503fd9f8de7aa7c747e1ca9cd615eb658a66c29baf598733e19
RESIN_APP_ID=116522
RESIN=1
RESIN_SUPERVISOR_ADDRESS=http://127.0.0.1:48484
RESIN_DEVICE_RESTART=3505733431986444
RESIN_SUPERVISOR_HOST=127.0.0.1
RESIN_DEVICE_UUID=cb6f09d18ab4c08556f54a5bd7cfd353d4907c4a61998ba8a54cd9f2abc5ee
RESIN_API_KEY=Grzb2u8KqkHyXIXdCmwb0LuMjx6baYjW
RESIN_SUPERVISOR_VERSION=1.13.0
RESIN_SUPERVISOR_PORT=48484

## Persistent Storage		

{{> "general/persistent-storage"}}


## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue. There is no need to have the docker `EXPOSE` command in your `Dockerfile`.

## Public Device URLS

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

## Tips, Tricks and Troubleshooting

### Reboot from Inside the Container

You may notice that if you issue a `reboot`, `halt`, or `shutdown` your container either gets into a weird zombie state or doesn't do anything. The reason for this is that these commands do not propagate down to the hostOS system. If you need to issue a `reboot` from your container you should use the supervisor API as shown:
```
curl -X POST --header "Content-Type:application/json" \
    "$RESIN_SUPERVISOR_ADDRESS/v1/reboot?apikey=$RESIN_SUPERVISOR_API_KEY"
```
[Read more about the supervisor API](/runtime/supervisor-api/#post-v1-reboot)

__Note:__ `RESIN_SUPERVISOR_API_KEY` and `RESIN_SUPERVISOR_ADDRESS` should already be in your environment by default. You will also **need** `curl` installed in your container.

<!-- TODO: explain how to reboot from systemd -->
<!-- Or you can use the following [DBUS][dbus-link] call to the hostOS systemd. -->


### Failed to install release agent

You may see the following weird warning when enabling your init system:
```
Failed to install release agent, ignoring: No such file or directory
```
This is a known issue and doesn't affect your code in any way. It was fixed in images deployed after 13-07-2016, so we recommend moving to a newer base image. You can see the fix here: [release agent fix](https://github.com/resin-io-library/base-images/commit/3a50ebad6db4259ec5753750ff67274ae8683add)

### Terminal Closes On Update

When you push updates or restart your container, the terminal session is automatically closed and you will see something like:
```
root@beaglebone-green-wifi-9b01ed:/# SSH session disconnected                                                   
SSH reconnecting...                                                                                             
Spawning shell...    
```
The session should automatically restart once your container is up and running again.


[container-link]:https://docs.docker.com/engine/understanding-docker/#/inside-docker
[ref-one]:https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/
[base-image-wiki-link]:/runtime/resin-base-images/
[init-system-link]:https://en.wikipedia.org/wiki/Init
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[openrc-link]:https://en.wikipedia.org/wiki/OpenRC
[expressjs-link]:http://expressjs.com/

[systemd-base-image-link]:https://hub.docker.com/r/resin/raspberrypi-python/
