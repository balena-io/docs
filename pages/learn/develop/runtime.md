---
title: Communicate outside the container
excerpt: Talk to the host OS, supervisor, and network from within a balena container
thumbnail: /img/common/device/running-webterminal-session.webp
---

# Communicate outside the container

In many situations, the code running in your container will need some way to communicate with outside services and devices, whether this means the host OS, the device supervisor, the network, or internal and external storage. Below, you'll find different methods for external communication, as well as some tips and tricks to keep in mind.

## Host OS

### Environment variables

Inside your running container, you'll have access to a number of `BALENA_` namespaced environment variables, which provide information from the system outside the container:

On all balenaOS versions of the OS, both `RESIN_` and `BALENA_` variables will be injected into the container to maintain backwards compatibility.

|           Variable           |                                                                                                                                                                                                                     Description                                                                                                                                                                                                                    |
| :--------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     `BALENA_DEVICE_UUID`     |                                                                                                                                                                               The unique identification number for the device. This is used to identify it on balena                                                                                                                                                                               |
|        `BALENA_APP_ID`       |                                                                                                                                                                                               ID number of the balena fleet the device is associated.                                                                                                                                                                                              |
|       `BALENA_APP_NAME`      |                                                                                                                                                                                             The name of the balena fleet the device is associated with.                                                                                                                                                                                            |
| `BALENA_DEVICE_NAME_AT_INIT` |                                                                                                                                                                                                   The name of the device on first initialization.                                                                                                                                                                                                  |
|     `BALENA_DEVICE_TYPE`     |                                                                                                                                                                                                     The type of device the fleet is running on.                                                                                                                                                                                                    |
|           `BALENA`           |                                                                                                                                                                        The `BALENA=1` variable can be used by your software to detect that it is running on a balena device.                                                                                                                                                                       |
|  `BALENA_SUPERVISOR_API_KEY` |                                           Authentication key for the supervisor API. This makes sure requests to the supervisor are only coming from containers on the device. See the [Supervisor API reference](runtime.md#supervisor) for detailed usage. For multicontainer the service needs the [io.balena.features.supervisor-api](../../reference/supervisor/docker-compose.md#labels) label set.                                          |
|  `BALENA_SUPERVISOR_ADDRESS` |                                                                                                             The network address of the supervisor API. Default: `http://127.0.0.1:48484`. For multicontainer the service needs the [io.balena.features.supervisor-api](../../reference/supervisor/docker-compose.md#labels) label set.                                                                                                             |
|   `BALENA_SUPERVISOR_HOST`   |                                                                                                                          The IP address of the supervisor API. Default: `127.0.0.1`. For multicontainer the service needs the [io.resin.features.supervisor-api](../../reference/supervisor/docker-compose.md#labels) set                                                                                                                          |
|   `BALENA_SUPERVISOR_PORT`   |                                                                                                                   The network port number for the supervisor API. Default: `48484`. For multicontainer the service needs the [io.balena.features.supervisor-api](../../reference/supervisor/docker-compose.md#labels) label set.                                                                                                                   |
|       `BALENA_API_KEY`       | API key which can be used to authenticate requests to the balena backend. Can be used with the SDKs on the device. **WARNING** This API key gives the code permissions to affect the device's metadata in the balena API; refer to our [security documentation](../welcome/security.md) for more details. For multicontainer the service needs the [io.balena.features.balena-api](../../reference/supervisor/docker-compose.md#labels) label set. |
|   `BALENA_HOST_OS_VERSION`   |                                                                                                                                                                                                             The version of the host OS.                                                                                                                                                                                                            |
|    `BALENA_DEVICE_RESTART`   |                                                                                                                                                          This is an internal mechanism for restarting containers and can be ignored as it's not very useful to app code. Example: `1.13.0`                                                                                                                                                         |

Here's an example from a Raspberry Pi 3:

```bash
root@raspberrypi3-cc723d7:/# printenv | grep BALENA
BALENA_SUPERVISOR_API_KEY=1111deadbeef2222
BALENA_APP_ID=157270
BALENA_DEVICE_TYPE=raspberrypi3
BALENA=1
BALENA_SUPERVISOR_ADDRESS=http://127.0.0.1:48484
BALENA_SUPERVISOR_HOST=127.0.0.1
BALENA_DEVICE_UUID=cb6f09d18ab4c08556f54a5bd7cfd353d4907c4a61998ba8a54cd9f2abc5ee
BALENA_API_KEY=deadbeef12345
BALENA_APP_NAME=Example
BALENA_DEVICE_NAME_AT_INIT=damp-haze
BALENA_HOST_OS_VERSION=balenaOS 2.20.0
BALENA_SUPERVISOR_PORT=48484
```

### D-Bus communication with host OS

In some cases it's necessary to communicate with the host OS systemd to perform actions on the host. To do this you can use [dbus](https://www.freedesktop.org/wiki/Software/dbus/). In order to ensure that you are communicating to the host OS systemd and not the systemd in your container it is important to set `DBUS_SYSTEM_BUS_ADDRESS` for all D-Bus communication. The setting of that environment variable is different for older and newer devices (based on the balena supervisor version), choose the line that is correct for your device's OS version (can be found in your device dashboard):

{% hint style="danger" %}
In multicontainer fleets, the `io.balena.features.dbus` label must be applied for each service that requires access to the D-Bus. If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labeling as that will ensure backward compatibility.
{% endhint %}

```
# for balena supervisor versions 1.7.0 and newer (both balenaOS 1.x and 2.x) use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket
```

```
# for balena supervisor before 1.7.0 use this version:
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host_run/dbus/system_bus_socket
```

Below you can find a couple of examples. All of them requires either prepending the command with the above `DBUS_SYSTEM_BUS_ADDRESS=...` or setting the variable for all commands by running `export DBUS_SYSTEM_BUS_ADDRESS=...` with the correct environment variable value from above.

In multicontainer fleets, you can also set `DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket` in the `environment` section of your service in the `docker-compose.yml` file:

```yaml
version: '2'
services:
  someservice:
    environment:
      - 'DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket'
    labels:
      io.balena.features.dbus: '1'
```

{% hint style="warning" %}
Please be aware that setting `DBUS_SYSTEM_BUS_ADDRESS` as a service or environment variable and enabling systemd at the same time might introduce unexpected side effects. Systemd might start to interact with the host system instead of the container. These interactions can potentially cause balenaOS devices to disconnect from balenaCloud or even fall offline. Hence, users are advised to prefer prepending the command with the variable definition.
{% endhint %}

{% hint style="warning" %}
To use the `dbus-send` command in the example you will need to install the `dbus` package in your Dockerfile if you are using the Debian image, or check under what name does your chosen operating system supply the `dbus-send` executable.
{% endhint %}

#### Change the Device hostname

Changing the device hostname via a dbus-send method invocation of `org.freedesktop.hostname1.SetHostname` is no longer possible, due to the fact that this would attempt to write to `/etc/hostname`, which on the [host OS](../../reference/OS/overview.md) is stored in the read-only root partition. To change the device hostname, use the [balena supervisor API](../../../reference/supervisor/supervisor-api/#patch-v1devicehost-config)

#### Rebooting the Device

```bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
  --print-reply \
  --dest=org.freedesktop.systemd1 \
  /org/freedesktop/systemd1 \
  org.freedesktop.systemd1.Manager.Reboot
```

#### Stopping a systemd service

At times, you may wish to stop a running service on the host OS, such as `bluetooth.service`, in order to run your own instance of bluez containerized.

```bash
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
  --print-reply \
  --dest=org.freedesktop.systemd1 \
  /org/freedesktop/systemd1 \
  org.freedesktop.systemd1.Manager.StopUnit \
  string:bluetooth.service string:replace
```

#### Checking if device time is NTP synchronized

```bash
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

The entry `NTPSynchronized` shows `true`, so the device is NTP synchronized. (The key `NTP` only shows whether the device is using the systemd service `systemd-timesyncd`; starting from balenaOS 2.13.1, the `chrony` service is used for time management.)

{% hint style="warning" %}
For additional D-Bus examples see the [balenaOS masterclass](../more/masterclasses/host-os-masterclass.md#id-13.-advanced-dbus-examples)
{% endhint %}

### Blacklisting kernel modules won't work

Since the `/etc/modules` you see in your container belongs to the container's filesystem and is not the same as `/etc/modules` in the host OS, adding kernel modules to the modules blacklist in the container will have no effect. So in order to remove a module, you need to explicitly do a [`rmmod`](http://linux.die.net/man/8/rmmod).

## Supervisor

{% hint style="warning" %}
In multicontainer fleets, the `io.balena.features.supervisor-api` label must be applied for each service that requires access to the Supervisor API. If you have devices with a supervisor version lower than 7.22.0, you should use `io.resin.features` labeling as that will ensure backward compatibility
{% endhint %}

### Reboot from Inside the Container

You may notice that if you issue a `reboot`, `halt`, or `shutdown` your container either gets into a weird zombie state or doesn't do anything. The reason for this is that these commands do not propagate down to the host OS system. If you need to issue a `reboot` from your container you should use the supervisor API as shown:

```
curl -X POST --header "Content-Type:application/json" \
    "$BALENA_SUPERVISOR_ADDRESS/v1/reboot?apikey=$BALENA_SUPERVISOR_API_KEY"
```

[Read more about the supervisor API](../../reference/supervisor/supervisor-api.md#post-v1-reboot)

{% hint style="warning" %}
`BALENA_SUPERVISOR_API_KEY` and `BALENA_SUPERVISOR_ADDRESS` should already be in your environment by default for single containers, but for multicontainer devices the service needs the [io.resin.features.supervisor-api](../../reference/supervisor/docker-compose.md#labels) set . You will also **need** `curl` installed in your container.
{% endhint %}

Alternatively, it is possible to reboot the device via the D-Bus interface as described above.

### Writing to logs on the Dashboard

Anything written to `stdout` and `stderr` should appear on the device's dashboard logs. Have a look at some of our [example projects](https://github.com/balenalabs) on GitHub to get an idea of how to do this.

## Network

BalenaEngine supports [host](https://docs.docker.com/network/host/) and [bridge](https://docs.docker.com/network/bridge/) network modes:

* Host mode allows a service to use all host network interfaces.
* Bridge mode uses a user-defined bridge network interface, to which service containers are connected.

Any service that uses host networking does not have to define ports for traffic ingress, and a service can bind to all interfaces of the host. Single container releases always use host networking.

In contrast to host networking, bridge networks isolate all services from the host, requiring services to explicitly define open ports to allow traffic from the host to be passed to them (all outgoing traffic is permitted). By default, multicontainer releases use a bridge network.

### Single container

Single container releases always use host networking, allowing them to bind to any of the host's network interfaces. If security and sandboxing are required for either privilege level or to ensure self-contained networking, then a multicontainer release should be created, even if only a single service is required.

### Multicontainer

Multicontainer releases use a user-defined bridge network by default. No ports are exposed to the host and must be explicitly enabled through the `ports` [keyword](https://docs.docker.com/compose/compose-file/compose-file-v2/#ports). Services on the same bridge network have access to all other services' ports.

The following [sample multicontainer](multicontainer.md#named-volumes) `docker-compose.yml` file allows incoming traffic on port 80 to the `proxy` service, but the `frontend` and `data` services are isolated from the host and only accessible via the bridge network, which all services are connected to.

```yaml
version: '2'
services:
  frontend:
    build: ./frontend
    expose:
      - '80'
  proxy:
    build: ./haproxy
    depends_on:
      - frontend
      - data
    ports:
      - '80:80'
  data:
    build: ./data
    expose:
      - '8080'
```

{% hint style="warning" %}
Exposing ports via the expose keyword is optional and a way of documenting which ports are used, but does not map or open any ports. By default, services on the same bridge network have access to all other services' ports.
{% endhint %}

For multicontainer releases, setting the service `network_mode` to `host` in `docker-compose.yml` allows the container to share the same network namespace as the host OS.

Balena `docker-compose.yml` files support the creation of multiple bridge networks allowing you to compartmentalize further, so that some services exist in only one defined network, whereas others may be able to communicate in many. The `aliases` [keyword](https://docs.docker.com/compose/compose-file/compose-file-v2/#aliases) for providing alias names for services (including FQDNs) and [IPAM bridge networks](https://docs.docker.com/compose/compose-file/compose-file-v2/#network-configuration-reference) are also supported.

{% hint style="warning" %}
For more information on networking with balena, see the [balena services masterclass](../more/masterclasses/services-masterclass.md#id-4.-networking-types).
{% endhint %}

### Public device URLS

Balena currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the balenaCloud dashboard and select the `Enable a public URL for this device` button. For more information about device URLs see the [Device Management Page](../manage/actions.md#public-device-url)

<figure><img src="../../../summary/.gitbook/assets/enable-public-url-device.webp" alt=""><figcaption></figcaption></figure>

Running a server listening on port 80 with public device URL enabled will allow you to serve content from the device to the world. Here is an example of an [express.js](https://expressjs.com/) server which will serve to the devices URL.

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
```

### Using DNS resolvers in your container

In the balena host OS [dnsmasq](https://www.thekelleys.org.uk/dnsmasq/doc.html) is used to manage DNS since balenaOS 1.1.2. This means that if you have dnsmasq or other DNS resolvers such as [bind9](https://bind9.net/) running in your container, it can potentially cause problems because they usually try to bind to `0.0.0.0`, which interferes with the host dnsmasq. To get around this, you need to add `bind-interfaces` to your dnsmasq configuration in your container or make sure your server only binds to external IPs, and there shouldn't be conflicts anymore.

## Storage

### Persistent Storage

If you have data or configurations that you would like to persist through application and host OS updates, you have the option to keep them in persistent storage. Persistent storage is a good place to write system logs and other application data that should remain untouched even as your code changes.

**Before balenaOS v2.12.0**

On devices running OS versions before 2.12.0, the `/data` folder in the container is automatically linked to a directory on the host OS and guaranteed to persist across updates. The contents of the `/data` folder can be accessed via the host OS at `/mnt/data/resin-data/<APP ID>`.

The `/data` folder is not synced between devices in your fleet. In addition, the folder is unique to a specific fleet, so if you transfer your device to a new fleet the `/data` folder from the previous fleet will not be accessible in the container. It will, however, still be available via the host OS and if the device is moved back to the original fleet.

Note that the `/data` folder is **not** mounted when your project is building on our build servers, so you can't access it from your `Dockerfile`. The `/data` volume only exists when the container is running on the deployed devices.

**balenaOS v2.12.0 and above**

Beginning with balenaOS v2.12.0, persistent storage is handled through [named volumes](multicontainer.md#named-volumes). The behavior is much the same as persistent storage on older host OS versions. In fact, for single-container fleets, the default `docker-compose.yml` sets up a `resin-data` named volume that links to a `/data` directory in the container. The only difference between this and earlier versions is that accessing this data via the host OS is done at `/var/lib/docker/volumes/<APP ID>_resin-data/_data`, rather than the `/mnt/data/resin-data/<APP ID>` location used with earlier host OS versions.

Named volumes can be given arbitrary names and can be linked to a directory in one or more containers. As long as every release includes a `docker-compose.yml` and the volume name does not change, the data in the volume will persist between updates.

When using named volumes, note that:

* If a device is moved to a new fleet, the old `/data` folder will be automatically purged.
* During the build process, data added to a container directory that is configured to link to a named volume will be copied to the volume the first time it's created on the device.

**Using a Supervisor with a version >= v10.0.0**

Since balena-supervisor v10.0.0, volumes are no longer automatically removed from disk when references to them are removed from a fleet's `docker-compose` file. This means that it's no longer possible for data to be lost due to the accidental rename of a volume.

If you change volume names regularly, your device will now continue to retain all previous volumes including their contents. To avoid this the supervisor API now provides an [endpoint to cleanup unreferenced volumes](../../reference/supervisor/supervisor-api.md#cleanup-volumes-with-no-references). Additionally, it is possible to perform this action from the dashboard via the `Purge Data` action, found on the `Actions` tab for a device.

{% hint style="warning" %}
Volumes will continue to be removed automatically when moving a device between fleets.
{% endhint %}

**Transfer large files**

If you have large files you would like your containers to have access to, you can transfer them from your computer directly to your device's SD card. First insert the SD card in your computer and find the `resin-data` partition. Then look for the folder associated with your application, which will either be at `/resin-data/<APP ID>` or `/docker/volumes/<APP ID>_<VOLUME NAME>/_<CONTAINER DIRECTORY>`, depending on your host OS version. Note that these directories will only exist after your application has been started at least once.

### Temporary directories

Note that the `/tmp` and `/var/tmp` directories in a container are not true [tmpfs](https://www.kernel.org/doc/html/latest/filesystems/tmpfs.html) volumes by default, and they are treated like any other ephemeral container layers.

As a result, you can expect that data in these directories will persist over a device reboot, but will **not** persist when a [services restart](../manage/actions.md#restart-services) is triggered.

If you would like these directories to act more like `tmpfs` volumes and write to volatile memory, you can use [tmpfs mounts](https://docs.docker.com/storage/tmpfs/).

```yml
services:
  myapp:
    image: foo/bar
    tmpfs:
      - /tmp
      - /var/tmp
```

### Mounting external storage media

Since the release of multicontainer on the balena platform we no longer recommend the use of an initsystem in the container. This affects the way we deal with external storage since previously we relied on `systemd`/`OpenRC` and `/etc/fstab`.

The recommended way for mounting external storage media (SD cards, USB sticks, external drives, etc) into a container is now through the use of `mount`. Here we include a set of recommendations that will help you get started.

**balenaOS kernel support**

Before you start it's a good idea to check if the balenaOS kernel you are running was compiled with support for the filesystem you want to use. To do so, you can run this command on the **host** which will produce a list of supported filesystems: `cat /proc/filesystems`.

If your filesystem is not supported you can contact us through our [forums](https://forums.balena.io/) and we will be glad to help.

**Preparing the container**

In order to be able to detect external media dynamically you will need to run the container in privileged mode and enable `udevd` on it. This can be easily done if you are using [balena base images](../../reference/base-images/balena-base-images.md) by:

* Adding `privileged: true` to your container's service definition on the `docker-compose.yml` file.
* Adding `ENV UDEV=on` to your container's `Dockerfile`.
* Running the entrypoint as the `root` user in the container namespace. This is often the default but can be set in your container's `Dockerfile` with `USER root` in the target build stage, or in your `docker-compose.yml` file with `user: root`.

This will ensure that the host propagates udev events into the container, enabling us to manipulate the device from within it.

**General tips for external media**

Devices can be selected in many ways, for example by its device name (`/dev` entry), label, or UUID. From a practical point of view, we recommend using labels (`LABEL=...` entries). Labels can easily be made the same across multiple cards or thumb drives, while you can still identify each device by their UUID. Also, `/dev` entries are not static on some platforms, and their value depends on which order the system brings up the devices. Device names or UUIDs are a good choice when you can easily identify or predict their values, for example within the context of a udev rule.

{% hint style="warning" %}
You can get a list of device names, labels and filesystem types by running `lsblk -f` (both on the host or container).
{% endhint %}

**Mounting**

To mount an external drive you can use Linux's `mount` command. Again, any selection method is supported:

```bash
mount -t <fstype> -o rw <device-name> <mount-point>
mount -t <fstype> -o rw -L <device-label> <mount-point>
mount -t <fstype> -o rw -U <device-uuid> <mount-point>
```

{% hint style="warning" %}
The mount point folder needs to exist for the mount to be successful.
{% endhint %}

For more information about the `mount` command see the [mount man page](https://man7.org/linux/man-pages/man8/mount.8.html).

**Unmounting**

To unmount an external drive you can use Linux's `umount` command:

```bash
umount <mount-point>
```

For more information about the `umount` command see the [umount man page](https://man7.org/linux/man-pages/man8/umount.8.html).

**Automounting/unmounting with udev rules**

The previous sections show how to manually mount or unmount external media. You probably want to automate this and have your media automatically mount/unmount when you plug it or unplug it. Fortunately this can be easily achieved by using udev rules.

First we create a rules file `usb.rules`:

```
ACTION=="add", SUBSYSTEM=="block", ENV{DEVTYPE}=="partition", RUN+="/bin/sh -c '/usr/src/scripts/mount.sh'"
ACTION=="remove", SUBSYSTEM=="block", ENV{DEVTYPE}=="partition", RUN+="/bin/sh -c '/usr/src/scripts/unmount.sh'"
```

These rules will trigger every time we plug or unplug a block partition device and run the scripts we provide (`/usr/src/mount.sh` or `/usr/src/unmount.sh`).

Copy both the rules and scripts to your container:

```dockerfile
COPY usb.rules /etc/udev/rules.d/usb.rules
COPY scripts /usr/src/scripts
```

Finally we need to write the `mount.sh` and `unmount.sh` scripts. These scripts will use `mount` and `umount` commands in the same way we described on the **Mounting** and **Unmounting** sections above.

You can find a fully working example of automounting/unmounting devices with udev rules in this [project](https://github.com/balena-io-playground/balena-storage).

**Sharing mounted devices across containers**

Note that currently it's not possible to share a mounted device across multiple containers. This is a feature that we are currently working on. This documentation will be updated once we add support for this feature.
