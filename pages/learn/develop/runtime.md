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

__Note:__ On all {{ $names.os.lower }} versions of the OS, both `RESIN_` and `BALENA_` variables will be injected into the container to maintain backwards compatibility.

|    Variable   	| Description 	|
|:----------:	    |:-----------:	|
| `{{ $names.company.allCaps }}_DEVICE_UUID` 	      |  The unique identification number for the device. This is used to identify it on {{ $names.company.lower }}	|
| `{{ $names.company.allCaps }}_APP_ID` 	            |  ID number of the {{ $names.company.lower }} application the device is associated. 	|
| `{{ $names.company.allCaps }}_APP_NAME`            |  The name of the {{ $names.company.lower }} application the device is associated with. |
| `{{ $names.company.allCaps }}_DEVICE_NAME_AT_INIT` |  The name of the device on first initialization. |
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

In some cases it's necessary to communicate with the host OS systemd to perform actions on the host. To do this you can use [dbus][dbus-link]. In order to ensure that you are communicating to the host OS systemd and not the systemd in your container it is important to set `DBUS_SYSTEM_BUS_ADDRESS` for all dbus communication. The setting of that environment variable is different for older and newer devices (based on the {{ $names.company.lower }} supervisor version), choose the line that is correct for your device's OS version (can be found in your device dashboard):

__Note:__ In multicontainer applications, the `io.balena.features.dbus` label must be applied for each service that requires access to the dbus. If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labeling as that will ensure backward compatibility.

```
# for {{ $names.company.lower }} supervisor versions 1.7.0 and newer (both {{ $names.os.lower }} 1.x and 2.x) use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
```

```
# for {{ $names.company.lower }} supervisor before 1.7.0 use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host_run/dbus/system_bus_socket
```

Below you can find a couple of examples. All of them requires either prepending the command with the above `DBUS_SYSTEM_BUS_ADDRESS=...` or setting the variable for all commands by running `export DBUS_SYSTEM_BUS_ADDRESS=...` with the correct environment variable value from above.

In multicontainer applications, you can also set `DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket` in the `environment` section of your service in the `docker-compose.yml` file:

```yaml
version: '2'
services:
  someservice:
    environment:
      - 'DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket'
    labels:
      io.balena.features.dbus: '1'
```

__Note:__ To use the `dbus-send` command in the example you will need to install the `dbus` package in your Dockerfile if you are using the Debian image, or check under what name does your chosen operating system supply the `dbus-send` executable.

#### Change the Device hostname

Changing the device hostname via a dbus-send method invocation of `org.freedesktop.hostname1.SetHostname` is no longer possible, due to the fact that this would attempt to write to `/etc/hostname`, which on the [host OS][host-os] is stored in the read-only root partition. To change the device hostname, use the [balena supervisor API][supervisor-api-device-host-config]


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

The entry `NTPSynchronized` shows `true`, so the device is NTP synchronized.  (The key `NTP` only shows whether the device is using the systemd service `systemd-timesyncd`; starting from balenaOS 2.13.1, the `chrony` service is used for time management.)

__Note:__ For additional dbus examples see the [{{$names.os.lower}} masterclass][os-masterclass]

### Blacklisting kernel modules won't work
Since the `/etc/modules` you see in your container belongs to the container's filesystem and is not the same as `/etc/modules` in the host OS, adding kernel modules to the modules blacklist in the container will have no effect. So in order to remove a module, you need to explicitly do a [`rmmod`](http://linux.die.net/man/8/rmmod).

## Supervisor

__Note:__ In multicontainer applications, the `io.balena.features.supervisor-api` label must be applied for each service that requires access to the Supervisor API.  If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labeling as that will ensure backward compatibility

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

{{ $names.engine.upper }} supports [host][network-host] and [bridge][network-bridge] network modes:

* Host mode allows a service to use all host network interfaces.
* Bridge mode uses a user-defined bridge network interface, to which service containers are connected.

Any service that uses host networking does not have to define ports for traffic ingress, and a service can bind to all interfaces of the host. Single container applications always use host networking.

In contrast to host networking, bridge networks isolate all services from the host, requiring services to explicitly define open ports to allow traffic from the host to be passed to them (all outgoing traffic is permitted). By default, multicontainer applications use a bridge network.

### Single container applications

Single container applications always use host networking, allowing them to bind to any of the host's network interfaces. If security and sandboxing are required for either privilege level or to ensure self-contained networking, then a multicontainer application should be used, even if only a single service is required.

### Multicontainer applications

Multicontainer applications use a user-defined bridge network by default. No ports are exposed to the host and must be explicitly enabled through the `ports` [keyword][network-ports]. Services on the same bridge network have access to all other services' ports.

The following [sample multicontainer][multicontainer] `docker-compose.yml` file allows incoming traffic on port 80 to the `proxy` service, but the `frontend` and `data` services are isolated from the host and only accessible via the bridge network, which all services are connected to.

```yaml
version: '2'
services:
  frontend:
    build: ./frontend
    expose:
      - "80"
  proxy:
    build: ./haproxy
    depends_on:
      - frontend
      - data
    ports:
      - "80:80"
  data:
    build: ./data
    expose:
      - "8080"
```

__Note:__ Exposing ports via the expose keyword is optional and a way of documenting which ports are used, but does not map or open any ports. By default, services on the same bridge network have access to all other services' ports.

For multicontainer applications, setting the service `network_mode` to `host` in `docker-compose.yml` allows the container to share the same network namespace as the host OS.

{{ $names.company.upper }} `docker-compose.yml` files support the creation of multiple bridge networks allowing you to compartmentalize further, so that some services exist in only one defined network, whereas others may be able to communicate in many. The `aliases` [keyword][network-aliases] for providing alias names for services (including FQDNs) and [IPAM bridge networks][network-ipam] are also supported.

__Note:__ For more information on networking with {{ $names.company.lower }}, see the [{{ $names.company.lower }} services masterclass][services-masterclass].

### Public device URLS

{{ $names.company.upper }} currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the {{ $names.cloud.lower }} dashboard and select the `Enable a public URL for this device` button. For more information about device URLs see the [Device Management Page](/management/devices#enable-public-device-url)

<img alt="Enable public device URL" src="/img/common/actions/device-public-url-enabled.png">

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
At the time of writing there is an inconsistency in the behavior of `/tmp` directory during reboot and application restart. With the current behavior any thing in `/tmp` will persist over a reboot, but will **not** persist over an application restart.

### Mounting external storage media

Since the release of multicontainer on the {{ $names.company.lower }} platform we no longer recommend the use of an initsystem in the container. This affects the way we deal with external storage since previously we relied on `systemd`/`OpenRC` and `/etc/fstab`.

The recommended way for mounting external storage media (SD cards, USB sticks, external drives, etc) into a container is now through the use of `mount`. Here we include a set of recommendations that will help you get started.

**{{ $names.os.lower }} kernel support**

Before you start it's a good idea to check if the {{ $names.os.lower }} kernel you are running was compiled with support for the filesystem you want to use. To do so, you can run this command on the **host** which will produce a list of supported filesystems: `cat /proc/filesystems`.

If your filesystem is not supported you can contact us through our [forums](https://forums.balena.io/) and we will be glad to help.

**Preparing the container**

In order to be able to detect external media dynamically you will need to run the container in privileged mode and enable `udevd` on it. This can be easily done if you are using [balena base images](https://www.balena.io/docs/reference/base-images/base-images/#working-with-dynamically-plugged-devices) by:
- Adding `privileged: true` to your container's service definition on the `docker-compose.yml` file
- Adding `ENV UDEV=on` to your container's `Dockerfile`

This will ensure that the host propagates udev events into the container, enabling us to manipulate the device from within it.

**General tips for external media**

Devices can be selected in many ways, for example by its device name (`/dev` entry), label, or UUID. From a practical point of view, we recommend using labels (`LABEL=...` entries). Labels can easily be made the same across multiple cards or thumb drives, while you can still identify each device by their UUID. Also, `/dev` entries are not static on some platforms, and their value depends on which order the system brings up the devices. Device names or UUIDs are a good choice when you can easily identify or predict their values, for example within the context of a UDev rule.

__Note:__ You can get a list of device names, labels and filesystem types by running `lsblk -f` (both on the host or container).

**Mounting**

To mount an external drive you can use Linux's `mount` command. Again, any selection method is supported:

```bash
mount -t <fstype> -o rw <device-name> <mount-point>
mount -t <fstype> -o rw -L <device-label> <mount-point>
mount -t <fstype> -o rw -U <device-uuid> <mount-point>
```

__Note:__ The mount point folder needs to exist for the mount to be successfull.

For more information about the `mount` command see the [mount man page](http://man7.org/linux/man-pages/man8/mount.8.html).

**Unmounting**

To unmount an external drive you can use Linux's `umount` command:

```bash
umount <mount-point>
```

For more information about the `umount` command see the [umount man page](http://man7.org/linux/man-pages/man8/umount.8.html).

**Automounting/unmounting with UDev rules**

The previous sections show how to manually mount or unmount external media. You probably want to automate this and have your media automatically mount/unmount when you plug it or unplug it. Fortunately this can be easily achieved by using UDev rules.

First we create a rules file `usb.rules`:

```
ACTION=="add", SUBSYSTEM=="block", ENV{DEVTYPE}=="partition", RUN+="/bin/sh -c '/usr/src/scripts/mount.sh'"
ACTION=="remove", SUBSYSTEM=="block", ENV{DEVTYPE}=="partition", RUN+="/bin/sh -c '/usr/src/scripts/unmount.sh'"
```

These rules will trigger everytime we plug or unplug a block partition device and run the scripts we provide (`/usr/src/mount.sh` or `/usr/src/unmount.sh`).

Copy both the rules and scripts to your container:
```Dockerfile
COPY usb.rules /etc/udev/rules.d/usb.rules
COPY scripts /usr/src/scripts
```

Finally we need to write the `mount.sh` and `unmount.sh` scripts. These scripts will use `mount` and `umount` commands in the same way we described on the **Mounting** and **Unmounting** sections above. 

You can find a fully working example of automounting/unmounting devices with UDev rules in this [project]({{ $links.githubPlayground }}/balena-storage).

**Sharing mounted devices across containers**

Note that currently it's not possible to share a mounted device across multiple containers. This is a feature that we are currently working on. This documentation will be updated once we add support for this feature.

[container-link]:https://docs.docker.com/engine/understanding-docker/#/inside-docker
[base-image-wiki-link]:/runtime/base-images/
[init-system-link]:https://en.wikipedia.org/wiki/Init
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[openrc-link]:https://en.wikipedia.org/wiki/OpenRC
[supervisor-api-link]:/runtime/supervisor-api/
[security-docs-link]:/learn/welcome/security/
[supervisor-api-device-host-config]:/reference/supervisor/supervisor-api/#patch-v1-device-host-config
[expressjs-link]:http://expressjs.com/
[projects-github]:{{ $links.githubLabs }}
[systemd-base-image-link]:https://hub.docker.com/r/{{ $names.company.short }}/raspberrypi-python/
[dnsmasq-link]:http://www.thekelleys.org.uk/dnsmasq/doc.html
[udev-link]:https://www.freedesktop.org/software/systemd/man/udev.html
[dbus-link]:https://www.freedesktop.org/wiki/Software/dbus/
[labels-link]:/reference/supervisor/docker-compose/#labels
[network-host]:https://docs.docker.com/network/host/
[network-bridge]:https://docs.docker.com/network/bridge/
[network-ports]:https://docs.docker.com/compose/compose-file/compose-file-v2/#ports
[multicontainer]:{{ $links.githubLabs }}/multicontainer-getting-started
[network-ipam]:https://docs.docker.com/compose/compose-file/compose-file-v2/#network-configuration-reference
[network-aliases]:https://docs.docker.com/compose/compose-file/compose-file-v2/#aliases
[os-masterclass]:/learn/more/masterclasses/host-os-masterclass/#13-advanced-dbus-examples
[services-masterclass]:/learn/more/masterclasses/services-masterclass/#4-networking-types
[host-os]:/reference/OS/overview/2.x/
