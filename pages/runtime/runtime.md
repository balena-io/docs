---
title: Container Runtime
excerpt: Detailed information on the container init system, environment, storage, and other relevant trips & tricks.
thumbnail: /img/common/device/running-webterminal-session.png
---
# Container Runtime

On resin.io devices all your application code runs a [ Docker container][container-link]. This means that whatever you define as `CMD` in your `Dockerfile` will be PID 1 of the process tree in your container. It also means that this PID 1 process needs to know how to properly process UNIX signals, reap orphan zombie processes [[1]](https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/) and if it crashes your whole container crashes, losing logs and debug info.

## Init System

For these reasons we have built an [init system][init-system-link] into most of the resin base images listed here: [Resin Base Images Wiki][base-image-wiki-link]. The init system will handle signals, reap zombies and also properly handle [udev][udev-link] hardware events correctly.

There are two ways of enabling the init system in your application. You can either add the following environment variable in your Dockerfile:
```Dockerfile
# enable container init system.
ENV INITSYSTEM on
```
or you can add an environment variable from the Dashboard by navigating to the `Environment Variables` menu item on the left and adding the variable as shown below:
![Enable init system](/img/common/app/app_initsystem_envvar.png)

Once you have enabled your init system you should see something like this in your device logs:
![init system enabled in logs](/img/common/device/device_logs_initsystem_enabled.png)

You shouldn't need to make any adjustments to your code or `CMD` it should just work out of the box. Note that if you are using our Debian or Fedora based images, then you should have [systemd][systemd-link] in your containers, whereas if you use one of our Alpine images you will have [OpenRC][openrc-link] as your init system.

## SSH Access

{{> "general/container-ssh"}}

## The Container Environment

When you start a terminal session, either via the web terminal or the CLI, you are dropped into your applications running container. It's important to note that your container needs to be running for you to actually SSH into it, this is where the [init system](#init-system) helps a lot. By default you are the `root` user and granted root privileges in the container.

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file. The recommended file path for your code is `/usr/src/app` as you will see in most of our demo projects. If you're running a pure node.js application (i.e. an application that has no `Dockerfile` or `Dockerfile.template` but rather a `package.json`), all your code will be automatically placed in `/app`, which has a symbolic link to `/usr/src/app`.

Inside the container we provide a number of `RESIN_` namespaced environment variables. Below is a short description of some of these.

|    Variable   	| Description 	|
|:----------:	    |:-----------:	|
| `RESIN_DEVICE_UUID` 	      |  The unique identification number for the device. This is used to identify it on resin.io	|
| `RESIN_APP_ID` 	            |  ID number of the resin.io application the device is associated. 	|
| `RESIN_APP_NAME`            |  The name of the resin.io application the device is associated with. |
| `RESIN_APP_RELEASE`         |  The commit hash of the deployed application version. |
| `RESIN_DEVICE_NAME_AT_INIT` |  The name of the device on first initialisation. |
| `RESIN_DEVICE_TYPE`         |  The type of device the application is running on. |
| `RESIN` 	                  |  The `RESIN=1` variable can be used by your software to detect that it is running on a resin.io device. 	|
| `RESIN_SUPERVISOR_VERSION` 	|  The current version of the supervisor agent running on the device.	|
| `RESIN_SUPERVISOR_API_KEY` 	|  Authentication key for the supervisor API. This makes sure requests to the supervisor are only coming from containers on the device. See the [Supervisor API reference][supervisor-api-link]	for detailed usage.|
| `RESIN_SUPERVISOR_ADDRESS` 	|  The network address of the supervisor API. Default: `http://127.0.0.1:48484`	|
| `RESIN_SUPERVISOR_HOST` 	  |  The IP address of the supervisor API.	Default: `127.0.0.1`|
| `RESIN_SUPERVISOR_PORT` 	  |  The network port number for the supervisor API. Default: `48484`	|
| `RESIN_API_KEY` 	          |  API key which can be used to authenticate requests to the resin.io backend. Can be used with resin SDK on the device. **WARNING** This API key gives the code full user permissions, so can be used to delete and update anything as you would on the Dashboard.  	|
| `RESIN_HOST_OS_VERSION`     |  The version of the resin host OS. |
| `RESIN_DEVICE_RESTART` 	    |  This is a internal mechanism for restarting containers and can be ignored as its not very useful to application code.  Example: `1.13.0`	|

Here's an example from a Raspberry Pi 3:

```Bash
root@raspberrypi3-cc723d7:/# printenv | grep RESIN
RESIN_SUPERVISOR_API_KEY=1111deadbeef2222                    
RESIN_APP_ID=157270                                                                                          
RESIN_DEVICE_TYPE=raspberrypi3                                                                               
RESIN=1                                                                                                      
RESIN_SUPERVISOR_ADDRESS=http://127.0.0.1:48484                                                              
RESIN_SUPERVISOR_HOST=127.0.0.1                                                                              
RESIN_DEVICE_UUID=cb6f09d18ab4c08556f54a5bd7cfd353d4907c4a61998ba8a54cd9f2abc5ee                             
RESIN_API_KEY=deadbeef12345                                                               
RESIN_APP_RELEASE=667153acf91a58886c1bc30fe4320c864471e23a                                                  
RESIN_SUPERVISOR_VERSION=2.8.3                                                                               
RESIN_APP_NAME=Example                                                                                      
RESIN_DEVICE_NAME_AT_INIT=damp-haze                                                                          
RESIN_HOST_OS_VERSION=Resin OS 1.24.0                                    
RESIN_SUPERVISOR_PORT=48484  
```

## Persistent Storage		

{{> "general/persistent-storage"}}


## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue. There is no need to have the docker `EXPOSE` command in your `Dockerfile`.

## Public Device URLS

Resin.io currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the resin.io dashboard and select the `Enable a public URL for this device` checkbox. For more information about device URLS you can head over to the [Device Management Page](/management/devices#enable-public-device-url)

![Enable device url](/img/screenshots/device-url-new.png)

Running a server listening on port 80 with public device URL enabled will allow you to serve content from the device to the world. Here is an example of an [express.js][expressjs-link] server which will serve to the devices URL.

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

## Access to /dev

In many projects you may need to control or have access to some external hardware via interfaces like GPIO, I2C or SPI. On resin.io your container application will automatically have access to `/dev` and these interfaces since the container is run in [**privileged** mode](https://docs.docker.com/engine/reference/commandline/run/#/full-container-capabilities-privileged). This means you should be able to use any hardware modules like you would in a vanilla linux environment.

__Note:__ If you are not using one of the docker base images recommended in our [base images wiki][base-image-wiki-link], then it's most likely you will need to handle the updating of `/dev` via [udev][udev-link] yourself. You can see an example of how our base images handle this [here](https://github.com/resin-io-library/base-images/blob/master/debian/armv7hf/jessie/entry.sh#L54).

## Tips, Tricks and Troubleshooting

### Writing to logs on the Dashboard

Anything written from the application to `stdout` and `stderr` should appear on the device's dashboard logs. Have a look at some of our [example projects][projects-github] on github to get an idea of how to do this.

### Reboot from Inside the Container

You may notice that if you issue a `reboot`, `halt`, or `shutdown` your container either gets into a weird zombie state or doesn't do anything. The reason for this is that these commands do not propagate down to the hostOS system. If you need to issue a `reboot` from your container you should use the supervisor API as shown:
```
curl -X POST --header "Content-Type:application/json" \
    "$RESIN_SUPERVISOR_ADDRESS/v1/reboot?apikey=$RESIN_SUPERVISOR_API_KEY"
```
[Read more about the supervisor API](/runtime/supervisor-api/#post-v1-reboot)

__Note:__ `RESIN_SUPERVISOR_API_KEY` and `RESIN_SUPERVISOR_ADDRESS` should already be in your environment by default. You will also **need** `curl` installed in your container.

Alternatively, it is possible to reboot the device via the dbus interface as described in the next section.
<!-- TODO: explain how to reboot from systemd -->
<!-- Or you can use the following [DBUS][dbus-link] call to the hostOS systemd. -->

### Dbus communication with hostOS

In some cases its necessary to communicate with the hostOS systemd to perform actions on the host, for example changing the hostname. To do this you can use [dbus][dbus-link]. In order to ensure that you are communicating to the hostOS systemd and not the systemd in your container it is important to set `DBUS_SYSTEM_BUS_ADDRESS` for all dbus communication. The setting of that environment variable is different for older and newer devices (based on the resin.io supervisor version), choose the line that is correct for your device's OS version (can be found in your device dashboard):

```
# for resin.io supervisor versions 1.7.0 and newer (both resinOS 1.x and 2.x) use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
```

```
# for resin.io supervisor before 1.7.0 use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host_run/dbus/system_bus_socket
```

Below you can find a couple of examples. All of them requires either prepending the command with the above `DBUS_SYSTEM_BUS_ADDRESS=...` or setting the variable for all commands by running `export DBUS_SYSTEM_BUS_ADDRESS=...` with the correct environment variable value from above.

#### Change the Device hostname
```Bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
  --print-reply \
  --reply-timeout=2000 \
  --type=method_call \
  --dest=org.freedesktop.hostname1 \
  /org/freedesktop/hostname1 \
  org.freedesktop.hostname1.SetStaticHostname \
  string:"YOUR-NEW-HOSTNAME" boolean:true
```

#### Rebooting the Device
```Bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system
  --print-reply \
  --dest=org.freedesktop.systemd1 \
  /org/freedesktop/systemd1 \
  org.freedesktop.systemd1.Manager.Reboot
```

#### Checking if device time is NTP synchronized
```Bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
  --print-reply \
  --reply-timeout=2000 \
  --type=method_call \
  --dest=org.freedesktop.timedate1 \
  /org/freedesktop/timedate1  \
  org.freedesktop.DBus.Properties.GetAll \
  string:"org.freedesktop.timedate1"
```

The reply would look like this:
```variant
method return time=1474008856.507103 sender=:1.12 -> destination=:1.11 serial=4 reply_serial=2
   array [
      dict entry(
         string "Timezone"
         variant             string "UTC"
      )
      dict entry(
         string "LocalRTC"
         variant             boolean false
      )
      dict entry(
         string "CanNTP"
         variant             boolean true
      )
      dict entry(
         string "NTP"
         variant             boolean true
      )
      dict entry(
         string "NTPSynchronized"
         variant             boolean true
      )
      dict entry(
         string "TimeUSec"
         variant             uint64 1474008856505839
      )
      dict entry(
         string "RTCTimeUSec"
         variant             uint64 1474008857000000
      )
   ]
```

__Note:__ To use the `dbus-send` command in the example you will need to install the `dbus` package in your Dockerfile if you are using the Debian image, or check under what name does your chosen operating system supply the `dbus-send` executable.

### Failed to install release agent

You may see the following weird warning when enabling your init system:
```Bash
Failed to install release agent, ignoring: No such file or directory
```
This is a known issue and doesn't affect your code in any way. It was fixed in images deployed after 13-07-2016, so we recommend moving to a newer base image. You can see the fix here: [release agent fix](https://github.com/resin-io-library/base-images/commit/3a50ebad6db4259ec5753750ff67274ae8683add)

### Terminal Closes On Update

When you push updates or restart your container, the terminal session is automatically closed and you will see something like:
```Bash
root@beaglebone-green-wifi-9b01ed:/# SSH session disconnected                                                   
SSH reconnecting...                                                                                             
Spawning shell...    
```
The session should automatically restart once your container is up and running again.

### Blacklisting kernel modules won't work
Since the `/etc/modules` you see in your container belongs to the container's filesystem and is not the same as `/etc/modules` in the hostOS, adding kernel modules to the modules blacklist in the container will have no effect. So in order to remove a module, you need to explicitly do a [`rmmod`](http://linux.die.net/man/8/rmmod).

### Inconsistency in `/tmp` Directory
At the time of writing there is an inconsistency in the behaviour of `/tmp` directory during reboot and application restart. With the current behaviour any thing in `/tmp` will persist over a reboot, but will **not** persist over an application restart.

### Setting Up a systemd service

In some cases its useful to set up a service that starts up when your container starts. To do this with systemd, make sure you have the initsystem enabled in your container as mentioned [above](#init-system). You can then create a basic service file in your code repository called `my_service.service` and add something like this:
```
[Unit]
Description=My Super Sweet Service

[Service]
EnvironmentFile=/etc/docker.env
Type=OneShot
ExecStart=/etc/init.d/my_super_sweet_service

[Install]
WantedBy=basic.target
```
Then by adding the following to your Dockerfile your service should be added/enabled on startup:
```Dockerfile
ENV INITSYSTEM on
COPY my_service.service /etc/systemd/system/my_service.service
RUN systemctl enable /etc/systemd/system/my_service.service
```
You may also need to check out https://www.freedesktop.org/software/systemd/man/systemd.service.html#Options in case you need a different service type (OneShot is for services that exit once they're finished starting, e.g. daemons)

### Using DNS resolvers in your container
In the resin.io host OS [dnsmasq][dnsmasq-link] is used to manage DNS since resinOS 1.1.2. This means that if you have dnsmasq or other DNS resolvers such as [bind9](http://www.bind9.org/) running in your container, it can potentially cause problems because they usually try to bind to `0.0.0.0` which interferes with the host dnsmasq. To get around this you need to add `bind-interfaces` to your dnsmasq configuration in your container, or make sure your server only binds to external IPs, and there shouldn't be conflicts anymore.

### Mounting external storage media

Mounting external storage media, such as SD cards or USB thumb drives, within your application (running inside Docker) works somewhat different compared to mounting devices directly in Linux. Here we include a set of recommendations that helps you can get started.

**Without the init system**

If you have not enabled an init system in your application or chose to mount manually, you can add the mount logic into your start script. This can be made simpler by adding the storage media settings to `/etc/fstab` in your Dockerfile:
```Dockerfile
RUN echo "LABEL=mysdcard /mnt/storage ext4 rw,relatime,discard,data=ordered 0 2" >> /etc/fstab
```
Modify your settings as apporopriate (device identification, mount endpoint, file system, mount options), and see more information about the possible settings at the [fstab man page](http://man7.org/linux/man-pages/man5/fstab.5.html).

Then in your start script you need to create the mount directory and mount the device:
```Bash
mkdir -p /mnt/storage && mount /mnt/storage
```

**Using systemd**

Normally systemd mounts entries from `/etc/fstab` on startup automatically, but running within Docker, it will only mount entries that are not block devices, such as `tempfs` entries. For non-block devices, adding entries `/etc/fstab` is sufficient, for example in your Dockerfile:
```Dockerfile
RUN echo "tmpfs  /cache  tmpfs  rw,size=200M,nosuid,nodev,noexec  0 0" >> /etc/fstab
```

For block devices (SD cards, USB sticks), `/etc/fstab` entries would result in this error at runtime: `Running in a container, ignoring fstab device entry for ...`. Instead, you have to use [systemd .mount files](https://www.freedesktop.org/software/systemd/man/systemd.mount.html). Let's assume you want to mount an external SD card to `/mnt/storage`. Then you have to create a file with the name `mnt-storage.mount` and the content such as:
```
[Unit]
Description = External SD Card

[Mount]
What = LABEL=mysdcard
Where = /mnt/storage
Type = ext4
Options = rw,relatime,data=ordered

[Install]
WantedBy = multi-user.target
```

Above you need to modify the options with the `[Unit]` and `[Mount]` sections as appropriate. For more information, see the [systemd.mount documentation](https://www.freedesktop.org/software/systemd/man/systemd.mount.html).

Finally copy and enable these systemd settings in your Dockerfile:
```Dockerfile
COPY mnt-storage.mount /etc/systemd/system/
RUN systemctl enable mnt-storage.mount
```

This way your storage media will be mounted on your application start. You can check the status of this job with the `systemctl is-active mnt-storage.mount` command.

Systemd is the init system on our Debian and Fedora base images.

**Using OpenRC**

OpenRC is the init system on our Alpine Linux base images. Its `localmount` service mounts entries defined in `/etc/fstab`. Unfortunately in its current form the `localmount` service is explicitly filtered out and disabled by the `-lxc` keyword in `/etc/init.d/localmount` when running inside Docker. This setting modifies some of its behaviour.

To use OpenRC to automount your media, add your `/etc/fstab` entries in your Dockerfile, such as:
```Dockerfile
RUN echo "LABEL=mysdcard /mnt/storage ext4 rw,relatime,discard,data=ordered 0 2" >> /etc/fstab
```
Then start the `localmount` service manually in your start script:
```Bash
rc-service localmount start
```
After running that command, the device should be mounted and ready to use in your application.

Because of the keyword filter, `localmount` cannot be automatically started (using `rc-update add`) and won't appear in the output of `rc-status`, even when it works correctly.

**General tips for external media**

Devices can be selected in many ways, for example by `/dev` entry, labels, or UUID. From a practical point of view, we recommend using labels (`LABEL=...` entries). Labels can easily be made the same across multiple cards or thumb drives, while you can still identify each device by their UUID. Also, `/dev` entries are not static on some platforms, and their value depends on which order the system brings up the devices.

[container-link]:https://docs.docker.com/engine/understanding-docker/#/inside-docker
[base-image-wiki-link]:/runtime/resin-base-images/
[init-system-link]:https://en.wikipedia.org/wiki/Init
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[openrc-link]:https://en.wikipedia.org/wiki/OpenRC
[supervisor-api-link]:/runtime/supervisor-api/
[expressjs-link]:http://expressjs.com/
[projects-github]:https://github.com/resin-io-projects
[systemd-base-image-link]:https://hub.docker.com/r/resin/raspberrypi-python/
[dnsmasq-link]:http://www.thekelleys.org.uk/dnsmasq/doc.html
[udev-link]:https://www.freedesktop.org/software/systemd/man/udev.html
[dbus-link]:https://www.freedesktop.org/wiki/Software/dbus/
