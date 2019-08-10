---
title: Communicate outside the container
excerpt: Talk to the host OS, supervisor, and network from within a {{ $names.company.lower }} container
thumbnail: /img/common/device/running-webterminal-session.png
---

# Communicate outside the container

For many applications, the code running in your container will need some way to communicate with outside services and devices, whether this means the host OS, the device supervisor, the network, or internal and external storage. Below,  you'll find different methods for external communication, as well as some tips and tricks to keep in mind.

## Host OS

### Environment variables

Inside your running container, you'll have access to a number of `{{ $names.company.allCaps }}_` namespaced environment variables, which provide information from the system outside the container:

__Note:__ On all balenaOS versions of the OS, both `RESIN_` and `BALENA_` variables will be injected into the container to maintain backwards compatibility.

|    Variable   	| Description 	|
|:----------:	    |:-----------:	|
| `{{ $names.company.allCaps }}_DEVICE_UUID` 	      |  The unique identification number for the device. This is used to identify it on {{ $names.company.lower }}	|
| `{{ $names.company.allCaps }}_APP_ID` 	            |  ID number of the {{ $names.company.lower }} application the device is associated. 	|
| `{{ $names.company.allCaps }}_APP_NAME`            |  The name of the {{ $names.company.lower }} application the device is associated with. |
| `{{ $names.company.allCaps }}_DEVICE_NAME_AT_INIT` |  The name of the device on first initialisation. |
| `{{ $names.company.allCaps }}_DEVICE_TYPE`         |  The type of device the application is running on. |
| `{{ $names.company.allCaps }}` 	                  |  The `{{ $names.company.allCaps }}=1` variable can be used by your software to detect that it is running on a {{ $names.company.lower }} device. 	|
| `{{ $names.company.allCaps }}_SUPERVISOR_VERSION` 	|  The current version of the supervisor agent running on the device.	|
| `{{ $names.company.allCaps }}_SUPERVISOR_API_KEY` 	|  Authentication key for the supervisor API. This makes sure requests to the supervisor are only coming from containers on the device. See the [Supervisor API reference][supervisor-api-link]	for detailed usage. For multicontainer the service needs the [io.{{ $names.company.lower }}.features.supervisor-api][labels-link] label set. |
| `{{ $names.company.allCaps }}_SUPERVISOR_ADDRESS` 	|  The network address of the supervisor API. Default: `http://127.0.0.1:48484`. For multicontainer the service needs the [io.{{ $names.company.lower }}.features.supervisor-api][labels-link] label set. |
| `{{ $names.company.allCaps }}_SUPERVISOR_HOST` 	  |  The IP address of the supervisor API.	Default: `127.0.0.1`. For multicontainer the service needs the [io.resin.features.supervisor-api][labels-link] set|
| `{{ $names.company.allCaps }}_SUPERVISOR_PORT` 	  |  The network port number for the supervisor API. Default: `48484`. For multicontainer the service needs the [io.{{ $names.company.lower }}.features.supervisor-api][labels-link] label set. |
| `{{ $names.company.allCaps }}_API_KEY` 	          |  API key which can be used to authenticate requests to the {{ $names.company.lower }} backend. Can be used with the SDKs on the device. **WARNING** This API key gives the code permissions to affect the device's metadata in the balena API; refer to our [security documentation][security-docs-link] for more details. For multicontainer the service needs the [io.{{ $names.company.lower }}.features.supervisor-api][labels-link] label set. |
| `{{ $names.company.allCaps }}_HOST_OS_VERSION`     |  The version of the host OS. |
| `{{ $names.company.allCaps }}_DEVICE_RESTART` 	    |  This is a internal mechanism for restarting containers and can be ignored as its not very useful to application code.  Example: `1.13.0`	|

Here's an example from a Raspberry Pi 3:

```Bash
root@raspberrypi3-cc723d7:/# printenv | grep {{ $names.company.allCaps }}
{{ $names.company.allCaps }}_SUPERVISOR_API_KEY=1111deadbeef2222
{{ $names.company.allCaps }}_APP_ID=157270
{{ $names.company.allCaps }}_DEVICE_TYPE=raspberrypi3
{{ $names.company.allCaps }}=1
{{ $names.company.allCaps }}_SUPERVISOR_ADDRESS=http://127.0.0.1:48484
{{ $names.company.allCaps }}_SUPERVISOR_HOST=127.0.0.1
{{ $names.company.allCaps }}_DEVICE_UUID=cb6f09d18ab4c08556f54a5bd7cfd353d4907c4a61998ba8a54cd9f2abc5ee
{{ $names.company.allCaps }}_API_KEY=deadbeef12345
{{ $names.company.allCaps }}_SUPERVISOR_VERSION=2.8.3
{{ $names.company.allCaps }}_APP_NAME=Example
{{ $names.company.allCaps }}_DEVICE_NAME_AT_INIT=damp-haze
{{ $names.company.allCaps }}_HOST_OS_VERSION={{ $names.os.lower }} 2.20.0
{{ $names.company.allCaps }}_SUPERVISOR_PORT=48484
```

### Dbus communication with host OS

In some cases its necessary to communicate with the host OS systemd to perform actions on the host, for example changing the hostname. To do this you can use [dbus][dbus-link]. In order to ensure that you are communicating to the host OS systemd and not the systemd in your container it is important to set `DBUS_SYSTEM_BUS_ADDRESS` for all dbus communication. The setting of that environment variable is different for older and newer devices (based on the {{ $names.company.lower }} supervisor version), choose the line that is correct for your device's OS version (can be found in your device dashboard):

__Note:__ In multicontainer applications, the `io.balena.features.dbus` label must be applied for each service that requires access to the dbus. If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labelling as that will ensure backward compatibility.

```
# for {{ $names.company.lower }} supervisor versions 1.7.0 and newer (both {{ $names.os.lower }} 1.x and 2.x) use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
```

```
# for {{ $names.company.lower }} supervisor before 1.7.0 use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host_run/dbus/system_bus_socket
```

Below you can find a couple of examples. All of them requires either prepending the command with the above `DBUS_SYSTEM_BUS_ADDRESS=...` or setting the variable for all commands by running `export DBUS_SYSTEM_BUS_ADDRESS=...` with the correct environment variable value from above.

__Note:__ To use the `dbus-send` command in the example you will need to install the `dbus` package in your Dockerfile if you are using the Debian image, or check under what name does your chosen operating system supply the `dbus-send` executable.

#### Change the Device hostname

Changing the device hostname is no longer possible via this method, due to the fact that the `/etc/hostname` file is stored on the read-only root partition. To change the device hostname, use the [balena supervisor API][supervisor-api-device-host-config].

#### Rebooting the Device
```Bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
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

### Blacklisting kernel modules won't work
Since the `/etc/modules` you see in your container belongs to the container's filesystem and is not the same as `/etc/modules` in the host OS, adding kernel modules to the modules blacklist in the container will have no effect. So in order to remove a module, you need to explicitly do a [`rmmod`](http://linux.die.net/man/8/rmmod).

## Supervisor

__Note:__ In multicontainer applications, the `io.balena.features.supervisor-api` label must be applied for each service that requires access to the Supervisor API.  If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labelling as that will ensure backward compatibility

### Reboot from Inside the Container

You may notice that if you issue a `reboot`, `halt`, or `shutdown` your container either gets into a weird zombie state or doesn't do anything. The reason for this is that these commands do not propagate down to the host OS system. If you need to issue a `reboot` from your container you should use the supervisor API as shown:
```
curl -X POST --header "Content-Type:application/json" \
    "${{ $names.company.allCaps }}_SUPERVISOR_ADDRESS/v1/reboot?apikey=${{ $names.company.allCaps }}_SUPERVISOR_API_KEY"
```
[Read more about the supervisor API](/runtime/supervisor-api/#post-v1-reboot)

__Note:__ `{{ $names.company.allCaps }}_SUPERVISOR_API_KEY` and `{{ $names.company.allCaps }}_SUPERVISOR_ADDRESS` should already be in your environment by default for single containers, but for multicontainer devices the service needs the [io.resin.features.supervisor-api][labels-link] set . You will also **need** `curl` installed in your container.

Alternatively, it is possible to reboot the device via the dbus interface as described above.

### Writing to logs on the Dashboard

Anything written from the application to `stdout` and `stderr` should appear on the device's dashboard logs. Have a look at some of our [example projects][projects-github] on github to get an idea of how to do this.

## Network

### Exposed ports

{{ $names.company.upper }} devices expose all ports by default, meaning you can run applications
which listen on any port without issue. There is no need to have the Docker `EXPOSE` command in your `Dockerfile`.

### Public device URLS

{{ $names.company.upper }} currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the {{ $names.company.lower }} dashboard and select the `Enable a public URL for this device` checkbox. For more information about device URLS you can head over to the [Device Management Page](/management/devices#enable-public-device-url)

![Enable device url](/img/common/enable-public-URLs.png)

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

### Using DNS resolvers in your container
In the {{ $names.company.lower }} host OS [dnsmasq][dnsmasq-link] is used to manage DNS since {{ $names.os.lower }} 1.1.2. This means that if you have dnsmasq or other DNS resolvers such as [bind9](http://www.bind9.org/) running in your container, it can potentially cause problems because they usually try to bind to `0.0.0.0` which interferes with the host dnsmasq. To get around this you need to add `bind-interfaces` to your dnsmasq configuration in your container, or make sure your server only binds to external IPs, and there shouldn't be conflicts anymore.

## Storage

### Persistent Storage

{{> "general/persistent-storage"}}

### Inconsistency in `/tmp` Directory
At the time of writing there is an inconsistency in the behaviour of `/tmp` directory during reboot and application restart. With the current behaviour any thing in `/tmp` will persist over a reboot, but will **not** persist over an application restart.

### Mounting external storage media

Mounting external storage media, such as SD cards or USB thumb drives, within your application (running inside Docker) works somewhat different compared to mounting devices directly in Linux. Here we include a set of recommendations that helps you can get started.

**Without the init system**

If you have not enabled an init system in your application or chose to mount manually, you can add the mount logic into your start script. This can be made simpler by adding the storage media settings to `/etc/fstab` in your Dockerfile:
```Dockerfile
RUN echo "LABEL=mysdcard /mnt/storage ext4 rw,relatime,discard,data=ordered 0 2" >> /etc/fstab
```
Modify your settings as appropriate (device identification, mount endpoint, file system, mount options), and see more information about the possible settings at the [fstab man page](http://man7.org/linux/man-pages/man5/fstab.5.html).

Then in your start script you need to create the mount directory and mount the device:
```Bash
mkdir -p /mnt/storage && mount /mnt/storage
```

**Using systemd**

Normally systemd mounts entries from `/etc/fstab` on startup automatically, but running within Docker, it will only mount entries that are not block devices, such as `tmpfs` entries. For non-block devices, adding entries `/etc/fstab` is sufficient, for example in your Dockerfile:
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
[base-image-wiki-link]:/runtime/base-images/
[init-system-link]:https://en.wikipedia.org/wiki/Init
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[openrc-link]:https://en.wikipedia.org/wiki/OpenRC
[supervisor-api-link]:/runtime/supervisor-api/
[security-docs-link]:/learn/welcome/security/
[supervisor-api-device-host-config]:/reference/supervisor/supervisor-api/#patch-v1-device-host-config
[expressjs-link]:http://expressjs.com/
[projects-github]:{{ $links.githubProjects }}
[systemd-base-image-link]:https://hub.docker.com/r/{{ $names.company.short }}/raspberrypi-python/
[dnsmasq-link]:http://www.thekelleys.org.uk/dnsmasq/doc.html
[udev-link]:https://www.freedesktop.org/software/systemd/man/udev.html
[dbus-link]:https://www.freedesktop.org/wiki/Software/dbus/
[labels-link]:/reference/supervisor/docker-compose/#labels
