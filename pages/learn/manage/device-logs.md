---
title: Device Logs
---

# Device Logs

Device logging and the storage of device logs in {{ $names.cloud.lower }} is designed to be a debugging feature for balena devices. The Logs section in the balenaCloud dashboard can be used to view and download logs from the system and app services running on the device in real-time.

<img alt="Dashboard Logs" src="/img/common/main_dashboard/device_logs.webp">

## Device logs on the balenaCloud dashboard

Device logs contain anything written to stdout and stderr of app services and the system logs of the device. The dashboard allows logs to be cleared, filtered, searched, and viewed according to the browser timezone (or UTC).

The maximum limit of logs displayed on the dashboard is 1000 lines. This is also the amount of logs stored in the API and available for download. Device logging in balenaCloud isn't meant for long-term, reliable storage of logs. It's instead designed to provide the latest logs from the device for debugging purposes. We plan to expand our logging solution to offer long-term storage and search.

## Persistent logging

The ability to read logs from the different system services running in balenaOS is vital in tracking issues. On reboot, these journal logs are cleared, and so examining them will not, for example, give any insight as to why the reboot may have occurred (or which services may have failed, causing a reboot).
To alleviate this, balenaOS allows persistent journals (logs). Persistent logs provide vital insight into checking why a reboot occurred and help make debugging easier.

Persistent logging can be enabled using the Configuration tab on the sidebar for either a specific device or fleet-wide. Select 'Activate' to enable persistent logging on a specific device or on all devices in a fleet.
Since logs are stored in the data partition of the hostOS, the device(s) will reboot to activate persistent logging and apply the related settings.
Once persistent logging is enabled, the logs are stored as part of the data partition on the device (either on SD card, eMMC, hard disk, etc.). Logs are located on-device at `/var/log/journal/<uuid>`,where `<uuid>` matches the contents of the `/etc/machine-id` and is not related with the balena device UUID.

Journals can be read like those for any unit file, using journalctl, although the flags passed to the command are slightly different. Here's an example of how to read persistent journals:

```
root@dee2945:~# cd /var/log/journal/b9ccd869194e4f1381c06967f99b0265/
root@dee2945:/var/log/journal/b9ccd869194e4f1381c06967f99b0265# ls -l
total 2051
-rw-r----- 1 root root 1048576 Jan 13 11:05 system.journal
-rw-r----- 1 root root 1048576 Jan 13 11:05 system@2ad94f188fb64c2da9803557662b57b2-0000000000000001-00058b3468ac9625.journal
root@dee2945:/var/log/journal/b9ccd869194e4f1381c06967f99b0265# journalctl -a --file system.journal
-- Logs begin at Mon 2020-01-13 11:05:06 UTC, end at Mon 2020-01-13 11:05:37 UTC. --
Jan 13 11:05:06 dee2945 systemd-journald[490]: Time spent on flushing to /var is 65.151ms for 795 entries.
Jan 13 11:05:06 dee2945 systemd-journald[490]: System journal (/var/log/journal/b9ccd869194e4f1381c06967f99b0265) is 2.0M, max 8.0M, 5.9M free.
Jan 13 11:05:07 dee2945 systemd[1]: Started Resin persistent logs.
Jan 13 11:05:07 dee2945 resin-persistent-logs[670]: resin-persistent-logs: Persistent logging activated.
Jan 13 11:05:06 dee2945 kernel[664]: [   14.553592] systemd-journald[490]: Received request to flush runtime journal from PID 1
Jan 13 11:05:07 dee2945 systemd[1]: Started Modem Manager.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2694] NetworkManager (version 1.18.0) is starting... (for the first time)
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2698] Read config: /etc/NetworkManager/NetworkManager.conf (etc: os-networkmanager.conf)
Jan 13 11:05:07 dee2945 systemd[1]: Started Network Manager.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2862] bus-manager: acquired D-Bus service "org.freedesktop.NetworkManager"
Jan 13 11:05:07 dee2945 systemd[1]: Reached target Network.
Jan 13 11:05:07 dee2945 systemd[1]: Started OpenVPN.
Jan 13 11:05:07 dee2945 systemd[1]: Starting Resin init service...
Jan 13 11:05:07 dee2945 systemd[1]: Starting DNS forwarder and DHCP server...
Jan 13 11:05:07 dee2945 systemd[1]: Started OS configuration update service.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.3047] manager[0x12ec000]: monitoring kernel firmware directory '/lib/firmware'.
Jan 13 11:05:07 dee2945 bash[758]: Board specific initialization...
Jan 13 11:05:07 dee2945 dnsmasq[759]: dnsmasq: syntax check OK.
Jan 13 11:05:07 dee2945 systemd[1]: Started DNS forwarder and DHCP server.
Jan 13 11:05:07 dee2945 systemd[1]: Starting Balena Application Container Engine...
Jan 13 11:05:07 dee2945 systemd[1]: Starting Resin proxy configuration service...
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: started, version 2.78 cachesize 150
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: compile time options: IPv6 GNU-getopt DBus no-i18n no-IDN DHCP DHCPv6 no-Lua TFTP no-conntrack ipset auth no-DNSSEC >
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: DBus support enabled: connected to system bus
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: reading /etc/resolv.dnsmasq
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: using nameserver 8.8.8.8#53
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: read /etc/hosts - 6 addresses
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: using nameserver 8.8.8.8#53
Jan 13 11:05:07 dee2945 kernel: i2c /dev entries driver
Jan 13 11:05:07 dee2945 kernel[664]: [   14.974497] i2c /dev entries driver
```

## Increasing size of persistent logs store

Depending on the OS version, the size of persistent logs can be increased to store more logs than the default size (32 MB currently). This can be done by adjusting the `SystemMaxUse=` setting in `/etc/systemd/journald.conf.d/journald-balena-os.conf` (refer to [journald.conf docs](https://www.freedesktop.org/software/systemd/man/journald.conf.html) for more information). Mistakes in the configuration can cause hard-to-solve problems, hence we recommend testing the changes on development test devices first.

We consider changes to the size of persistent log store to be a temporary debugging tool, not a long-term solution. In particular, changes made to `journald-balena-os.conf` will be overwritten when balenaOS is updated.

Do keep in mind persistent logging increases the wear on the storage medium due to increased writes. Refer to [long term storage of device logs](#long-term-device-logs-storage) for ways to offset this.

## Long term device logs storage

If you are dealing with excessive logs, persistent logging might not be a reliable long-term solution. Persistent logging increases writes on the device's storage media, which results in higher wear and tear over time.

Instead, device logs can be streamed using the supervisor API. Refer to the [Supervisor's journald](https://www.balena.io/docs/reference/supervisor/supervisor-api/#journald-logs) endpoint. Through this endpoint, device logs can be streamed to whichever cloud monitoring platform you use to store logs reliably over time. For example, using a solution like [Datadog](https://www.balena.io/blog/iot-fleet-monitoring-with-datadog-and-balenacloud-how-small-agent-containers-make-a-big-impact/).

