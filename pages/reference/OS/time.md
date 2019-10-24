---
title: Time management
excerpt: How time is synchronized and managed for {{ $names.company.lower }} devices
---
# Time management

{{ $names.company.upper }} devices make use of the `systemd-timesyncd` or `chrony` service to keep the system time synchronized. That service is running in the host OS, independent of the application containers.

If you want to query the current time, you can do so by using the `date` utility or the datetime related functions of the standard library of your language.

{{ $names.company.upper }} devices use [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) as their standard time zone. If you want to use a timezone other than UTC, you have to explicitly set the timezone using the tools available for the operating system running within your container. [balena-timezone]({{ $links.githubPlayground }}/balena-timezone) is an example of how to do this in Debian. The {{ $names.company.lower }} dashboard shows log timestamps using the local time for the computer you are viewing it on, and you can switch it to display the timestamps in UTC by using the controls available at the log view.

If you want to learn if the system has completed at least one successful NTP synchronization since boot, you can use DBUS from your container. Check the "[Checking if device time is NTP synchronized](/runtime/runtime/#checking-if-device-time-is-ntp-synchronized)" example. The `NTPSynchronized` property will tell you if you're running with a potentially stale clock or if the system is synced.

## Technical Details

When the {{ $names.company.lower }} device boots up, and before any container is run, the system will query the hardware clock to get the current time, while it will also read the timestamp value, stored in the last modification time of a special file, `/var/lib/systemd/clock`. If the hardware clock is behind the value stored with `/var/lib/systemd/clock`, the system will forcefully set the clock to the stored value. This is done to ensure that time from the point of view of the applications is monotonically increasing. After that, the device will start its Network Time Protocol (NTP) client which will be attempting to sync the clock with NTP servers periodically. If a successful synchronization occurs, the last modification time of `/var/lib/systemd/clock` is updated to that timestamp.

When you first provision a device, as a fallback, `/var/lib/systemd/clock` is set to the timestamp of the host OS build (or more precisely, the timestamp of the systemd build within the host OS). For more info, you can check the [`systemd-timesyncd` documentation](https://www.freedesktop.org/software/systemd/man/systemd-timesyncd.service.html) and the [timesyncd source code](https://github.com/systemd/systemd/blob/master/src/timesync/timesyncd.c).

## Networking Requirements

There are certain networking requirements to ensure that the NTP service can properly function and the device time may be kept synchronized.

The NTP service requires UDP port `123` to be open, see more at our [network requirements page](/deployment/network/2.0.0/#network-requirements).

Up to {{ $names.os.lower }} 2.0.6 the NTP service connects to the following time servers by default and these need to be accessible to the device:

* pool.ntp.org
* time1.google.com
* time2.google.com
* time3.google.com
* time4.google.com

Starting from {{ $names.os.lower }} 2.0.7, the devices connect the following NTP servers:

* 0.resinio.pool.ntp.org
* 1.resinio.pool.ntp.org
* 2.resinio.pool.ntp.org
* 3.resinio.pool.ntp.org

Starting from {{ $names.os.lower }} 2.1.0, you can configure your own NTP servers in the `config.json` on the boot partition, example:

```
"ntpServers": "0.resinio.pool.ntp.org 1.resinio.pool.ntp.org"
```

Starting from {{ $names.os.lower }} 2.30.0, NTP servers can be set over DHCP.
