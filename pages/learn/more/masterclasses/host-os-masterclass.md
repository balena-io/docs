# BalenaOS Masterclass

- **Masterclass Type:** Core
- **Maximum Expected Time To Complete:** 60 minutes

## Introduction

This masterclass covers some common things that are quite often asked about balenaOS, for example:

- Filesystem layout and mount points
- Systemd services and journalctl
- Finding free disk space
- config.json (including a better way to edit at runtime)
- Editing balenaOS files (conf/systemd services) at runtime
- Making NetworkManager logs more verbose in several different ways
- Time/NTP/Chrony
- Some dbus examples

## Hardware and Software Requirements

Access to any device running balenaOS version 2.20+. A Raspberry Pi 3 or balenaFin would be best as a handful of examples require a wifi device.

## Exercises

All of the following exercises assume that you are running a shell on the HostOS. The easiest way would be to go via the balenaCloud dashboard, head to an online device, and access the HostOS Terminal on the bottom right side.

The exercises include commands which can be run in such a shell, and are represented by a line prefixed with `#`. Information returned from execution of a command may be appended under the line to show what might be returned. For example:

```shell
root@123123:~# balena -v
Docker version 18.09.10-dev, build 7cb464a406748016f2df0c31a9851d20456a3d31
root@123123:~#
```

_Unless explicitly stated, SSH access means accessing the host balenaOS and not a container._

### 1. Filesystem and Partition Layout

balenaOS uses a specific filesystem layout. There are 6 partitions:

- `resin-boot`: Contains the boot files
- `resin-rootA`: balenaOS root filesystem A (read-only at runtime)
- `resin-rootB`: balenaOS root filesystem B (read-only at runtime)
- `resin-state`: read-write configuration files (read-write at runtime)
- _empty alignment block that might look like partition_
- `resin-data`: balenaEngine(docker) storage partition that has the supervisor and application containers.

#### 1.1 The State Partition

`resin-rootA/B` are mounted read-only, although there are some configuration files that are read-write. These are overlayed from the state partition and bind mounted. More detail can be seen [here](https://www.balena.io/docs/reference/OS/overview/2.x/#stateless-and-read-only-rootfs).

Using the `mount` command, you can see various mounts:

```shell
root@123123:~# mount
/dev/mmcblk0p5 on /var/lib/bluetooth type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/volatile/lib/bluetooth type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/openvpn type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/lib/NetworkManager type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/volatile/lib/NetworkManager type ext4 (rw,relatime)
/dev/mmcblk0p5 on /home/root/.docker type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/udev/rules.d type ext4 (rw,relatime)
/dev/mmcblk0p5 on /home/root/.ssh type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/lib/chrony type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/volatile/lib/chrony type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/docker type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/NetworkManager/conf.d type ext4 (rw,relatime)
/dev/mmcblk0p5 on /home/root/.rnd type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/NetworkManager/system-connections type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/ssh/hostkeys type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/lib/systemd type ext4 (rw,relatime)
/dev/mmcblk0p5 on /var/volatile/lib/systemd type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/balena-supervisor type ext4 (rw,relatime)
/dev/mmcblk0p5 on /etc/hostname type ext4 (rw,relatime)
/dev/mmcblk0p6 on /var/volatile/log/journal type ext4 (rw,relatime)
```

The read-write files are in the state partition e.g:

```shell
root@123123:~# ls /mnt/state/root-overlay/
etc/  home/ var/
root@123123:~# ls /mnt/state/root-overlay/etc/NetworkManager/
conf.d  system-connections
```

#### 1.2 Determining the Specific Layout on a Device

When you access a balenaOS device from a terminal without specifying a service, you are in the hostOS.

Use `lsblk` to get a picture:

```shell
root@123123:~# lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0    8G  0 disk
|-sda1   8:1    0   40M  0 part /mnt/boot
|-sda2   8:2    0  312M  0 part
|-sda3   8:3    0  312M  0 part /mnt/sysroot/active
|-sda4   8:4    0    1K  0 part
|-sda5   8:5    0   20M  0 part /mnt/state
`-sda6   8:6    0  7.3G  0 part /mnt/data
```

The `MOUNTPOINT` column above is where you can see specific files in various partitions. For example, the boot files are in `/mnt/boot`.

We have two copies of the root filesystem. One is active and running, and the other is for the hostOS update.

- `/mnt/sysroot/active` points to which partition is currently active, and balenaOS is running from
- `/mnt/sysroot/inactive` points to which partition will get the update if we update the OS

If you want to check the partition labels such as `resin-boot`, `resin-rootA` check `/dev/disk/by-label/`:

```shell
root@123123:~# ls -al /dev/disk/by-label/
total 0
drwxr-xr-x 2 root root 200 Nov  5 08:06 .
drwxr-xr-x 7 root root 140 Nov  5 08:06 ..
lrwxrwxrwx 1 root root  10 Nov  5 08:06 resin-boot -> ../../sda1
lrwxrwxrwx 1 root root  10 Nov  5 08:06 resin-data -> ../../sda6
lrwxrwxrwx 1 root root  10 Nov  5 08:06 resin-rootA -> ../../sda2
lrwxrwxrwx 1 root root  10 Nov  5 08:06 resin-rootB -> ../../sda3
lrwxrwxrwx 1 root root  10 Nov  5 08:06 resin-state -> ../../sda5
```

#### 1.3 State Partition and the Root Overlay

People familiar with Linux but not balenaOS will naturally look for `boot` or `/resin-boot`. That will, in most cases be the wrong place to look. You most probably want to look at `/mnt/boot/`.

But I want to know more:

- `/resin-boot`: is a copy of the boot files that end up in the boot partition. The real currently running boot files are in `/mnt/boot`. These copies are part of the OS package and used to update the boot partition during a hostOS Update.

- `/boot`: These are just the containers copy. The real boot files from bootloaders perspective are in `/mnt/sysroot/active/current/boot`.

### 2. systemd Services

We use `systemd` as the init system in balenaOS. There are various `systemd` services that handle many different parts of the OS.

#### 2.1 Key systemd Services and Descriptions

- `chronyd.service` : A daemon that manages time in the OS via NTP
- `NetworkManager.service` : A daemon that manages network connections
- `ModemManager.service` : A daemon that manages 2g/3g/4g modems connections
- `balena.service` Runs the balenaEngine(docker) daemon on the device
- `balena-supervisor.service` : Runs the balena-supervisor container
- `openvpn.service`: openVPN daemon to connect with balenaCloud VPN

Other services that are not as commonly asked about:

- `avahi-daemon.service`: avahi advertises network services on the local network
- `plymouth*.service`: daemon that manages the balenaOS logo on the screen when booted (splash screen)
- `*getty*.service`: provides a login shell over serial/HDMI, with username: `root`

#### 2.2 Checking the State of a Device and/or Services

`systemctl` is a cli utility as part of systemd that can be used to check various services.

Some common uses:

```shell
root@123123:~# systemctl --failed
0 loaded units listed.
```

Or more commonly `systemctl status <serviceName>`, for example `systemctl status openvpn.service`.

**pro-tip: Use bash wildcards** : `systemctl status Mod*`, for example:

```shell
root@123123:~# systemctl status Mod*
● ModemManager.service - Modem Manager
   Loaded: loaded (/lib/systemd/system/ModemManager.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-10-17 13:39:32 UTC; 5 days ago
 Main PID: 533 (ModemManager)
    Tasks: 3
   Memory: 9.9M
   CGroup: /system.slice/ModemManager.service
           └─533 /usr/sbin/ModemManager --log-journal
```

### 3. journalctl

Logs from boot, containers, and various services go to `systemd-journald`. The way to see those logs is via the `journalctl` command. Here are some common use case scenarios.

#### 3.1 Checking logs for a Service

```shell
root@123123:~# journalctl -u chr*
-- Logs begin at Thu 2019-10-17 13:39:30 UTC, end at Wed 2019-10-23 10:25:29 UTC. --
Oct 17 13:39:32 localhost chronyd[562]: 2019-10-17T13:39:32Z chronyd version 3.5 starting (+CMDMON +NTP +REFCLOCK +RTC -PRIVDROP -SCFILTER -SIGND +ASYNCDNS -SECHASH +IPV6 -DEBUG)
Oct 17 13:39:32 localhost chronyd[562]: 2019-10-17T13:39:32Z Frequency -4.270 +/- 0.178 ppm read from /var/lib/chrony/drift
Oct 17 13:39:37 123123 chronyd[562]: 2019-10-17T13:39:39Z Selected source 195.171.43.10
```

#### 3.2 Viewing `[blob data]` in `balena.service` Logs

For example:

```shell
journalctl -u balena*
Oct 17 13:43:10 123123 e497a7d56394[646]: [1B blob data]
Oct 17 13:43:11 123123 00f53f8d26e5[646]: [event]   Event: Service started {"service":{"appId":1102984,"serviceId":90095,"serviceName":"data","releaseId":1086336}}
Oct 17 13:43:11 123123 00f53f8d26e5[646]: [api]     POST /v2/applications/1102984/restart-service 200 - 3062.906 ms
Oct 17 13:43:11 123123 e497a7d56394[646]: [31B blob data]
Oct 17 13:43:11 123123 3c15d0f45caf[646]: [1B blob data]
```

These are usually from the app container (or supervisor). Use `--all` to view the internal logs from those services (instead of `[* blob data]`):

```shell
root@123123:~# journalctl -u balena* --all
Oct 17 13:43:10 123123 e497a7d56394[646]: > node index.js
Oct 17 13:43:10 123123 e497a7d56394[646]:
Oct 17 13:43:11 123123 00f53f8d26e5[646]: [event]   Event: Service started {"service":{"appId":1102984,"serviceId":90095,"serviceName":"data","releaseId":1086336}}
Oct 17 13:43:11 123123 00f53f8d26e5[646]: [api]     POST /v2/applications/1102984/restart-service 200 - 3062.906 ms
Oct 17 13:43:11 123123 e497a7d56394[646]: server is listening on port 80
Oct 17 13:43:11 123123 3c15d0f45caf[646]:
Oct 17 13:43:11 123123 3c15d0f45caf[646]: > resin-websocket@1.0.1 start /usr/src/app
```

Use `--no-pager` to stop output being piped into a paging utility (a side effect is that it dumps the full log in the terminal, which can be useful at times):

```shell
root@123123:~# journalctl --all --no-pager -u balena-supervisor -u resin-supervisor
-- Logs begin at Thu 2019-10-17 13:39:30 UTC, end at Wed 2019-10-23 08:08:33 UTC. --
Oct 17 13:40:03 123123 balena-supervisor[1498]: balena_supervisor
Oct 17 13:40:03 123123 balena-supervisor[1568]: active
Oct 17 13:40:04 123123 balena-supervisor[1569]: Container config has not changed
Oct 17 13:40:04 123123 balena-supervisor[1569]: Starting system message bus: dbus.
```

Can use `-n 100` to limit the output to 100 lines.

#### 3.3 Tailing all Logs Generated in Realtime

Use `--follow` (whose short version is `-f`). This is follow mode. This will now run as an executable in the shell and show logs as they come. Useful if you are triggering some action from another shell such as connection reconnect:

```shell
root@123123:~# journalctl -f --all --no-pager
-- Logs begin at Thu 2019-10-17 13:39:30 UTC. --
Oct 23 10:25:29 123123 00f53f8d26e5[646]: [api]     GET /v1/healthy 200 - 3.613 ms
Oct 23 10:25:29 123123 balena-supervisor[1569]: [api]     GET /v1/healthy 200 - 3.613 ms
Oct 23 10:27:13 123123 balenad[646]: time="2019-10-23T10:27:13.181274213Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/b0a4366b92bb08d85d1a4b93e0b9a2a79c9cf7019a27360ba0734a4a12e65a29/shim.sock debug=false pid=154195
```

#### 3.4 Tailing Logs for a Service Generated in Realtime

For example, tailing NetworkManager logs as a cable is connect/disconnected:

```shell
root@123123:~# journalctl -u Netw* -f
-- Logs begin at Thu 2019-10-17 13:39:30 UTC. --
Oct 22 20:41:15 123123 NetworkManager[632]: <info>  [1571776875.9157] device (enp0s3): carrier: link connected
Oct 22 20:41:15 123123 NetworkManager[632]: <info>  [1571776875.9158] device (enp0s3): DHCPv4 lease renewal requested
Oct 22 20:41:15 123123 NetworkManager[632]: <info>  [1571776875.9159] dhcp4 (enp0s3): canceled DHCP transaction
```

#### 3.5 Tailing Logs for Multiple Services Generated in Realtime

For example, you want to restart an app container and keep an eye on balena/NetworkManager and supervisor:

```shell
root@123123:~# journalctl -u Netw* -u resin-su* -u bale* -f --all --no-pager
-- Logs begin at Thu 2019-10-17 13:39:30 UTC. --
Oct 23 10:30:30 123123 balena-supervisor[1569]: [api]     GET /v1/healthy 200 - 1.086 ms
Oct 23 10:32:47 123123 00f53f8d26e5[646]: [debug]   Attempting container log timestamp flush...
Oct 23 10:32:47 123123 00f53f8d26e5[646]: [debug]   Container log timestamp flush complete
```

#### 3.6 Viewing Logs in Reverse

Useful as you are usually interested in the most recent logs. Use `journalctl -r`.

### 4. Determining Free Disk Space

The data and state sometimes fill up. We have mitigations, but if they fill up, bad things happen.

`df` is the utility to find information about disk space:

```shell
root@123123:~# df -h | grep mnt
/dev/disk/by-label/resin-rootB  300M  266M   14M  96% /mnt/sysroot/active
/dev/disk/by-label/resin-state   19M  230K   17M   2% /mnt/state
/dev/sda1                        40M  2.5M   38M   7% /mnt/boot
/dev/sda6                       7.2G  295M  6.6G   5% /mnt/data
/dev/sda2                       300M  265M   16M  95% /mnt/sysroot/inactive
root@123123:~#
```

- `-h`: human readable
- `| grep mnt`: only interested in real partitions and not the virtual file systems

### 5. NetworkManager

#### 5.1 Connect to a WiFi SSID whilst Running balenaOS

Lets use `nmcli` to connect a device to a WiFI network:

- Syntax: `nmcli device wifi connect SSID password 'PASSWORD'`
- Example: `nmcli device wifi connect AndroidAP_1234 password 'nopassword'`

#### 5.2 Making NetworkManager Logs more Verbose in Four ways

##### 5.2.1 At runtime from HostOS

`nmcli` supports changing the NetworkManager daemon log level at run time.

`nmcli general logging level DEBUG domain ALL`

##### 5.2.2 Via dbus from Inside a Container

Start a container that has the dbus socket inside it.

```shell
balena run --rm -i -t -v /run/dbus/system_bus_socket:/host/run/dbus/system_bus_socket balenalib/intel-nuc-debian /bin/bash
```

Install NetworkManager by `apt-get update && apt-get install network-manager`, then use `nmcli`:

```shell
root@48fa6fc4bacb:/# DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket nmcli general logging level DEBUG domain ALL
```

`journalctl` on the host will show the change.

```shell
Nov 05 13:10:00 123123 48fa6fc4bacb[620]: root@48fa6fc4bacb:/# DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket nmcli general logging level DEBUG domain ALL
Nov 05 13:10:00 123123 systemd[1]: systemd-journald.service: Got notification message from PID 398 (WATCHDOG=1)
Nov 05 13:10:00 123123 NetworkManager[608]: <info>  [1572959400.8962] manager: logging: level 'DEBUG' domains 'PLATFORM,RFKILL,ETHER,WIFI,BT,MB,DHCP4,DHCP6,PPP,WIFI_SCAN,IP4,IP6,AUTOIP4,DNS,VPN,SHARING,SUPPLICANT,AGENTS,SETTINGS,SUSPEND,CORE,DEVICE,OLPC,INFINIBAND,FIREWALL,ADSL,BOND,VLAN,BRIDGE,DBUS_PROPS,TEAM,CONCHECK,DCB,DISPATCH,AUDIT,SYSTEMD,VPN_PLUGIN:INFO,PROXY'
```

##### 5.2.3 Editing OS Config Files to Persist on Reboot

- Remount the OS as read-write `mount -o remount,rw /`
- Edit `vi /etc/NetworkManager/NetworkManager.conf`
- Add the following at the end:

```shell
[logging]
level=DEBUG
```

- Restart NM service:

```shell
systemctl daemon-reload
systemctl restart NetworkManager
```

##### 5.2.4 Editing the systemd service and pass flags

Check the system service status to see the service file:

```shell
root@123123:~# systemctl status Netwo*
● NetworkManager.service - Network Manager
   Loaded: loaded (/lib/systemd/system/NetworkManager.service; enabled; vendor preset: enabled)
  Drop-In: /etc/systemd/system/NetworkManager.service.d
           └─NetworkManager.conf
```

Now edit either the Loaded file or the Drop-in file, depending on where `ExecStart=` is located. If `ExecStart=` exists in Drop-In: file, it will take precedence.

- Edit `/lib/systemd/system/NetworkManager.service` using `vi`
- Find the `ExecStart=` line
- Append `--log-level=INFO`
- Restart NM service:

```shell
systemctl daemon-reload
systemctl restart NetworkManager
```

### 6. config.json

`config.json` is a file on the device in the boot partition that is the source of truth about lots of useful bits of information.

**The real file is `/mnt/boot/config.json` and not `/resin-boot/config.json`**

#### 6.1 Pretty-Printing config.json

If you use `cat` to print `/mnt/boot/config.json`, it will show the file as one long line. Use `jq` to pretty print it in a human readable format:

`cat /mnt/boot/config.json | jq .` or `jq . /mnt/boot/config.json`

```shell
root@123123:~# cat /mnt/boot/config.json | jq .
{
  "apiEndpoint": "https://api.balena-cloud.com",
  "appUpdatePollInterval": 900000,
  "applicationId": 1102984,
  "applicationName": "nuctest",
  "deltaEndpoint": "https://delta.balena-cloud.com",
  "deviceApiKey": "b8a821156f510cb2c0e62d4433ea2045",
  "deviceApiKeys": {
    "api.balena-cloud.com": "b8a821156f510cb2c0e62d4433ea2045"
  },
  "deviceType": "intel-nuc",
  "hostname": "123123",
  "listenPort": 48484,
  "localMode": true,
  "mixpanelToken": "b8a821156f510cb2c0e62d4433ea2045",
  "persistentLogging": false,
  "pubnubPublishKey": "",
  "pubnubSubscribeKey": "",
  "registryEndpoint": "registry2.balena-cloud.com",
  "userId": 37413,
  "username": "zubair",
  "uuid": "b8a821156f510cb2c0e62d4433ea2045",
  "vpnEndpoint": "vpn.balena-cloud.com",
  "vpnPort": 443,
  "registered_at": 1568979964264,
  "deviceId": 1701155
}
```

You can check a specific key using:

```shell
root@123123:~# jq .deviceType /mnt/boot/config.json
"intel-nuc"
root@123123:~#
```

Edits to `config.json` should not generally be needed. Changing various options in the balenaCloud dashboard results in the supervisor safely editing `config.json` and restarting the specific service that consumes the specific options. Editing by hand manually is an [advanced topic](#advanced-editing-configjson-by-hand) discussed later.

### 7. Editing the Core OS Files at Runtime

balenaOS root filesystem is read-only by default for more robustness. But editing the OS files can be quite useful if you want to add more logging/debugging flags while investigating an issue.

We can switch to read-write mode using the following command and then you can edit the files:

- `mount -o remount,rw /`

### 8. Viewing Kernel Messages

Use `dmesg` to see the kernel messages.

### 9. Determining if a Kernel Config Option is Enabled

A copy of the kernel configuration is always available on a device in `/proc/config.gz`. Here is how you would search it to see if `CONFIG_SPI` is enabled on a device.

```shell
root@123123:~# zcat /proc/config.gz | grep -i config_spi*
...
# CONFIG_SPI is not set
```

So, in this example, SPI is not enabled in the kernel for this device.

### 10. Running balenaOS on your Laptop

We can use docker to spin up a balenaOS container and run bash to poke around. Useful for various use-cases:

```shell
zubairlk@zubair-xps-resin:$ docker run --rm -i -t resin/resinos:2.44.0_rev1.dev-intel-nuc /bin/bash
bash-4.4# cat /etc/os-release
ID="balena-os"
NAME="balenaOS"
VERSION="2.44.0+rev1"
VERSION_ID="2.44.0+rev1"
PRETTY_NAME="balenaOS 2.44.0+rev1"
MACHINE="genericx86-64"
VARIANT="Development"
VARIANT_ID="dev"
META_BALENA_VERSION="2.44.0"
RESIN_BOARD_REV="ba218f3"
META_RESIN_REV="7fed82f"
SLUG="intel-nuc"
bash-4.4# bash --version
GNU bash, version 4.4.23(1)-release (x86_64-poky-linux-gnu)
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
bash-4.4# nmcli --version
nmcli tool, version 1.20.2
bash-4.4# mmcli --version

mmcli 1.10.6
Copyright (2011 - 2019) Aleksander Morgado
License GPLv2+: GNU GPL version 2 or later <http://gnu.org/licenses/gpl-2.0.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

bash-4.4#
```

### 11. Running an arm/aarch64 balenaOS Image on your Laptop

We can use QEMU to run different arch docker images on a laptop. Windows/Mac users can use the same way as above. Linux users will need to install `binfmt-misc` and `qemu-user-static` packages and mount a statically linked qemu binary inside the container.

```shell
zubairlk@zubair-xps-resin:~/resin/yocto/balena-intel$ docker run -it --rm -v /usr/bin/qemu-aarch64-static:/usr/bin/qemu-aarch64-static -v /usr/bin/qemu-arm-static:/usr/bin/qemu-arm-static resin/resinos:2.44.0_rev1.dev-raspberry-pi /bin/bash
bash-4.4# cat /etc/os-release
ID="balena-os"
NAME="balenaOS"
VERSION="2.44.0+rev1"
VERSION_ID="2.44.0+rev1"
PRETTY_NAME="balenaOS 2.44.0+rev1"
MACHINE="raspberrypi"
VARIANT="Development"
VARIANT_ID="dev"
META_BALENA_VERSION="2.44.0"
RESIN_BOARD_REV="8fc90cc"
META_RESIN_REV="7fed82f"
SLUG="raspberry-pi"
bash-4.4#
```

### 12. Advanced: Editing config.json by Hand

It is generally not a good idea to hand-edit config.json. Here is a relatively safe way to do it.

**Warning**: Linux users might want to pipe a pretty config.json into config.json.

```shell
DO-NOT-DO-THIS:~# cat /mnt/boot/config.json | jq . > /mnt/boot/config.json
```

`jq` processes a stream, and reading/writing the same file ends up in an empty `config.json`. Instead, do the following:

```shell
root@123123:~# cat /mnt/boot/config.json  | jq . > /mnt/boot/config.json.new
# Edit config.json using vi
root@123123:~# vi /mnt/boot/config.json.new
# Test new config.json
root@123123:~# cat /mnt/boot/config.json.new  | jq .
parse error: Expected separator between values at line 18, column 29
# Oh no. I made a mistake. Fix it in vi until you get a pretty print that you look at and verify.
root@123123:~# cat /mnt/boot/config.json  | jq .
{
  ...
  "uuid": "b8a821156f510cb2c0e62d4433ea2045",
  "vpnEndpoint": "vpn.balena-cloud.com"
}
# Now it's ok and I can copy it over.
root@123123:~# mv /mnt/boot/config.json.new /mnt/boot/config.json
```

### 13. Advanced: dbus examples

Run a service container with dbus socket inside:

```shell
balena run --rm -i -t -v /run/dbus/system_bus_socket:/host/run/dbus/system_bus_socket balenalib/intel-nuc-debian /bin/bash
```

Install `dbus-send`:

```shell
apt-get update && apt-get install dbus
```

Scan dbus using `dbus-send`:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket dbus-send --system --dest=org.freedesktop.systemd1 --type=method_call --print-reply /org/freedesktop/systemd1 org.freedesktop.DBus.Introspectable.Introspect
```

Restart chronyd service on HostOS using `dbus-send`:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket dbus-send --system --dest=org.freedesktop.systemd1 --type=method_call --print-reply /org/freedesktop/systemd1   org.freedesktop.systemd1.Manager.RestartUnit string:"chronyd.service" string:"replace"
```

Stop plymouth service using `dbus-send`:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket dbus-send --system --dest=org.freedesktop.systemd1 --type=method_call --print-reply /org/freedesktop/systemd1   org.freedesktop.systemd1.Manager.StartUnit string:"plymouth-quit.service" string:"replace"
```

Change systemd log level to `debug`:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket dbus-send --system --dest=org.freedesktop.systemd1 --print-reply --type=method_call /org/freedesktop/systemd1 org.freedesktop.DBus.Properties.Set string:"org.freedesktop.systemd1.Manager" string:"LogLevel" variant:string:"debug"
```

Checking NTP sync:

```shell
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

Changing Avahi hostname:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket \
  dbus-send \
  --system \
  --print-reply \
  --reply-timeout=2000 \
  --type=method_call \
  --dest=org.freedesktop.Avahi \
  / \
  org.freedesktop.Avahi.Server.SetHostName \
  string:"${BALENA_DEVICE_UUID}"
```

`busctl` is another tool that is more user-friendly than `dbus-send`. It is part of the `systemd` package. Use `busctl` to restart chrony service:

```shell
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket busctl call org.freedesktop.systemd1 /org/freedesktop/systemd1 org.freedesktop.systemd1.Manager RestartUnit ss chronyd.service replace
```

You can also use `nmcli` inside the container via dbus:

```shell
root@48fa6fc4bacb:/# DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket nmcli c s
NAME                UUID                                  TYPE      DEVICE
Wired connection 1  8f7b32be-8f1b-3bd5-ab94-0a7c19318e84  ethernet  enp0s3
supervisor0         cee61ab9-9004-4b55-9534-f9f5b33a133c  bridge    supervisor0
root@48fa6fc4bacb:/#
```

## Conclusion

In this masterclass, you've learned some balenaOS fundamentals. You should now be able to:

- Explain the balenaOS filesystem and partition layout
- Identify running `systemd` services
- Use `journalctl` to explorer logs from running `systemd` services
- Determine free disk space on a device
- Work with the Network Manager service and increase the logging verbosity
- Explore the `config.json` file
- Run balenaOS on a laptop using docker

### Not Covered in this Masterclass

- Error is out of space.
- Running out of inodes. (not inotify) `df -hi`
- `initramfs` and `mobynit`

## References

None
