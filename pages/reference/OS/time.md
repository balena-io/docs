---
title: Time management
excerpt: How time is synchronized and managed for balena devices
---

# Time management

{% hint style="warning" %}
Starting from balenaOS 2.13.1 the `chrony` service is used for time management. Prior versions of balenaOS use `systemd-timesyncd`.
{% endhint %}

Devices running balenaOS make use of the `chrony` (or `systemd-timesyncd`) service to keep the system time synchronized. That service is running in the host OS, independent of the application containers.

It is important that the date and time are set correctly, as an inaccurate date can manifest itself as several different issues on the device, such as SSL/TLS certificates appearing invalid. If you want to query the current time on the device, you can do so by using the `date` utility or the datetime related functions of the standard library of your language.

```shell
$ date
Tue Mar  3 19:59:54 UTC 2020
```

Balena devices use [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) as their standard time zone. If you want to use a timezone other than UTC, you have to explicitly set the timezone for the operating system running within your container. To set the timezone on the container, find the name of your timezone from [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List), and set an environment variable called `TZ` with that value. This can be done either in the Dockerfile (hardcoded) by `ENV TZ <value>` or a new variable called `TZ` in the [dashboard](../../../management/env-vars/) with the value as the timezone you want to set. This will only work if `tzdata` package is installed in the container image. Refer to \[balena-timezone]\(https://github.com/balena-io-playground/balena-timezone) project for an example on setting the timezone in the container. The balenaCloud dashboard shows log timestamps using the local time for the browser you are viewing it on, and you can switch it to display the timestamps in UTC by using the toggle available in the log view.

If you want to learn if the system has completed at least one successful NTP synchronization since boot, you can use D-Bus from within your container. Check the "[Checking if device time is NTP synchronized](../../learn/develop/runtime.md#checking-if-device-time-is-ntp-synchronized)" example. The `NTPSynchronized` property will indicate if the device is running with a potentially stale clock or if the system time is synced.

## chrony

[chrony](https://chrony.tuxfamily.org/) is an implementation of the [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol). The chrony daemon `chronyd` is [configured](https://chrony.tuxfamily.org/doc/3.5/chrony.conf.html) via the `/etc/chrony.conf` file. The default `chrony.conf` file used in balenaOS can be viewed [here](https://github.com/balena-os/meta-balena/blob/master/meta-balena-common/recipes-core/chrony/files/chrony.conf).

Requests are sent to the supplied NTP sources approximately every four and a half hours (as specified by the `minpoll` and `maxpoll` directives). For the device's initial sync, the first four requests are sent at an interval of two seconds or less, before transitioning to the approximate four and half hour polling interval.

{% hint style="warning" %}
BalenaOS < 2.46.1 uses chrony defaults for `minpoll` (64 seconds) and `maxpoll` (1024 seconds) as opposed to the current value (16384 seconds).
{% endhint %}

The estimated drift of the system clock is saved to a driftfile located at `/var/lib/chrony/drift`. This allows `chronyd` to begin compensating the system clock at that rate whenever it is restarted. This driftfile is updated when the time is synchronized, and on exit, at most once per hour.

### chronyc

`chronyc` is a command-line utility that can be used to interoperate with `chronyd`. `chronyc` has [commands](https://chrony.tuxfamily.org/doc/3.5/chronyc.html) to see how `chronyd` is performing and identify any potential [issues](time.md#networking-requirements) preventing synchronization. For example:

* `chronyc sources` - A list of all the current NTP sources being used by the NTP daemon, which will also indicate if they are reachable.
* `chronyc tracking` - Information about the system clock itself, including skew.
* `chronyc ntpdata` - Detailed information on all the current NTP sources.

## systemd-timesyncd

{% hint style="warning" %}
This section is only applicable to balenaOS versions < 2.13.1.
{% endhint %}

When the balena device boots up, and before any container is run, the system will query the hardware clock to get the current time, while it will also read the timestamp value, stored in the last modification time of a special file, `/var/lib/systemd/clock`. If the hardware clock is behind the value stored with `/var/lib/systemd/clock`, the system will forcefully set the clock to the stored value. This is done to ensure that time from the point of view of the applications is monotonically increasing. After that, the device will start its Network Time Protocol (NTP) client, which will be attempting to sync the clock with NTP servers periodically. If a successful synchronization occurs, the last modification time of `/var/lib/systemd/clock` is updated to that timestamp.

When you first provision a device, as a fallback, `/var/lib/systemd/clock` is set to the timestamp of the host OS build (or more precisely, the timestamp of the systemd build within the host OS). For more info, you can check the [`systemd-timesyncd` documentation](https://www.freedesktop.org/software/systemd/man/systemd-timesyncd.service.html) and the [timesyncd source code](https://github.com/systemd/systemd/blob/master/src/timesync/timesyncd.c).

## Networking Requirements

There are certain networking requirements to ensure that the NTP service can properly function, and the device time may be kept synchronized.

The NTP service requires UDP port `123` to be open for outgoing connections from the device. See more [network requirements here](network.md#network-requirements).

Starting from balenaOS 2.0.7, the devices connect to the following NTP servers:

* 0.resinio.pool.ntp.org
* 1.resinio.pool.ntp.org
* 2.resinio.pool.ntp.org
* 3.resinio.pool.ntp.org

To be clear, `ntp.org` uses a large pool of servers that change frequently. So UDP port `123` must be open outgoing to all hosts.

You can configure your own NTP servers in the [`config.json` file](configuration.md#ntpservers) location in the [boot partition](overview.md#image-partition-layout). For example:

```json
"ntpServers": "0.resinio.pool.ntp.org 1.resinio.pool.ntp.org"
```

Starting from balenaOS 2.30.0, NTP servers can be set over DHCP.
