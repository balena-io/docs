---
title: Time management
excerpt: How time is synchronized and managed for {{ $names.company.lower }} devices
---
# Time management

__Note:__ Starting from {{ $names.os.lower }} 2.13.1 the `chrony` service is used for time management. Prior versions of {{ $names.os.lower }} use `systemd-timesyncd`.

Devices running {{ $names.os.lower }} make use of the `chrony` (or `systemd-timesyncd`) service to keep the system time synchronized. That service is running in the host OS, independent of the application containers.

It is important that the date and time are set correctly, as an inaccurate date can manifest itself as several different issues on the device, such as SSL/TLS certificates appearing invalid. If you want to query the current time on the device, you can do so by using the `date` utility or the datetime related functions of the standard library of your language.

```shell
$ date
Tue Mar  3 19:59:54 UTC 2020
```

{{ $names.company.upper }} devices use [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) as their standard time zone. If you want to use a timezone other than UTC, you have to explicitly set the timezone using the tools available for the operating system running within your container. The [balena-timezone]({{ $links.githubPlayground }}/balena-timezone) project is an example of how to do this in Debian. The {{ $names.cloud.lower }} dashboard shows log timestamps using the local time for the browser you are viewing it on, and you can switch it to display the timestamps in UTC by using the toggle available in the log view.

![Change the logs to use UTC timezone](/img/common/main_dashboard/dashboard-utc.png)

If you want to learn if the system has completed at least one successful NTP synchronization since boot, you can use D-Bus from within your container. Check the "[Checking if device time is NTP synchronized](/runtime/runtime/#checking-if-device-time-is-ntp-synchronized)" example. The `NTPSynchronized` property will indicate if the device is running with a potentially stale clock or if the system time is synced.

## chrony

[chrony][chrony] is an implementation of the [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol). The chrony daemon `chronyd` is [configured](https://chrony.tuxfamily.org/doc/3.5/chrony.conf.html) via the `/etc/chrony.conf` file.  The default `chrony.conf` file used in {{$names.os.lower}} can be viewed [here]({{ $links.githubOS }}/meta-balena/blob/master/meta-balena-common/recipes-core/chrony/files/chrony.conf).

Requests are sent to the supplied NTP sources approximately every four and a half hours (as specified by the `minpoll` and `maxpoll` directives). For the device's initial sync, the first four requests are sent at an interval of two seconds or less, before transitioning to the approximate four and half hour polling interval.

__Note:__ {{$names.os.upper}} < 2.46.1 uses chrony defaults for `minpoll` (64 seconds) and `maxpoll` (1024 seconds) as opposed to the current value (16384 seconds).

The estimated drift of the system clock is saved to a driftfile located at `/var/lib/chrony/drift`. This allows `chronyd` to begin compensating the system clock at that rate whenever it is restarted. This driftfile is updated when the time is synchronized, and on exit, at most once per hour.

### chronyc

`chronyc` is a command-line utility that can be used to interoperate with `chronyd`. `chronyc` has [commands][chronyc] to see how `chronyd` is performing and identify any potential [issues](#networking-requirements) preventing synchronization. For example:

* `chronyc sources` - A list of all the current NTP sources being used by the NTP daemon, which will also indicate if they are reachable.
* `chronyc tracking` - Information about the system clock itself, including skew.
* `chronyc ntpdata` - Detailed information on all the current NTP sources.

## systemd-timesyncd

__Note:__ This section is only applicable to {{ $names.os.lower }} versions < 2.13.1.

When the {{ $names.company.lower }} device boots up, and before any container is run, the system will query the hardware clock to get the current time, while it will also read the timestamp value, stored in the last modification time of a special file, `/var/lib/systemd/clock`. If the hardware clock is behind the value stored with `/var/lib/systemd/clock`, the system will forcefully set the clock to the stored value. This is done to ensure that time from the point of view of the applications is monotonically increasing. After that, the device will start its Network Time Protocol (NTP) client, which will be attempting to sync the clock with NTP servers periodically. If a successful synchronization occurs, the last modification time of `/var/lib/systemd/clock` is updated to that timestamp.

When you first provision a device, as a fallback, `/var/lib/systemd/clock` is set to the timestamp of the host OS build (or more precisely, the timestamp of the systemd build within the host OS). For more info, you can check the [`systemd-timesyncd` documentation](https://www.freedesktop.org/software/systemd/man/systemd-timesyncd.service.html) and the [timesyncd source code](https://github.com/systemd/systemd/blob/master/src/timesync/timesyncd.c).

## Networking Requirements

There are certain networking requirements to ensure that the NTP service can properly function, and the device time may be kept synchronized.

The NTP service requires UDP port `123` to be open. See more [network requirements here](/deployment/network/2.0.0/#network-requirements).

Starting from {{ $names.os.lower }} 2.0.7, the devices connect to the following NTP servers:

* 0.resinio.pool.ntp.org
* 1.resinio.pool.ntp.org
* 2.resinio.pool.ntp.org
* 3.resinio.pool.ntp.org

Prior to {{ $names.os.lower }} 2.0.7 the NTP service connects to the following time servers by default and these need to be accessible to the device:

* pool.ntp.org
* time1.google.com
* time2.google.com
* time3.google.com
* time4.google.com

Starting from {{ $names.os.lower }} 2.1.0, you can configure your own NTP servers in the [`config.json` file][config-json] location in the [boot partition][boot-partition]. For example:

```json
"ntpServers": "0.resinio.pool.ntp.org 1.resinio.pool.ntp.org"
```

Starting from {{ $names.os.lower }} 2.30.0, NTP servers can be set over DHCP.

[boot-partition]:/reference/OS/overview/2.x/#image-partition-layout
[config-json]:/reference/OS/configuration/#ntpservers
[chrony]:https://chrony.tuxfamily.org/
[chronyc]:https://chrony.tuxfamily.org/doc/3.5/chronyc.html
