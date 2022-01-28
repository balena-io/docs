---
title: Device Logs
---

# {{ title }}

Device logging and the storage of device logs in {{ $names.cloud.lower }} is designed to be a debugging feature for balena devices. The Logs section can be used to view and download logs from the system and app services running on the device in real time.

<img alt="Dashboard Logs" src="/img/common/main_dashboard/device_logs.png">

## Device logs on the balenaCloud dashboard

Device logs on the balenaCloud dashboard contains anything written to stdout and stderr of app services, and the system logs of the device. The dashboard allows logs to be cleared, filtered, searched and viewed according to the browser timezone (or UTC). 

The maximum limit of logs that can be displayed on the dashboard is 1000 lines. That is also the amount of logs stored in the API, and available for download. Device logging in balenaCloud isn't meant for long-term, reliable storage of logs. It's instead designed to provide the latest logs from the device for debugging purposes. We do plan on expanding our logging solution to offer long-term storage and search.

## Persistent logging

The ability to read logs from the different system services running in balenaOS is vital in tracking issues. However, on reboot these logs will be cleared. To alleviate this, balenaOS allows persistent logs to be enabled by customers. This provides insight into the cause of reboots and helps make debugging easier. 

Persistent logging can be enabled using the Configuration tab on the sidebar for either a specific device or fleet wide. Select 'Activate' to enable persistent logging on your device/fleet. The device(s) will reboot once persistent logging is activated to ensure that the settings are applied. Once enabled, the logs are stored in `/var/log/journal/<uuid>` where the UUID is the device UUID.

Depending on the OS version, the size of persistent logs can also be increased to store more logs than the default size (32 MB currently). Do keep in mind persistent logging increases the wear on the storage medium due to increased writes. Refer to [long term storage of device logs](#long-term-device-logs-storage) for ways to offset this.

The `RuntimeMaxUse=` in `/etc/systemd/journald.conf` can be increased in order to potentially increase the amount of logs that can be stored. Refer to [journald.conf docs](https://www.freedesktop.org/software/systemd/man/journald.conf.html) for more information regaridng the same.

## Long term device logs storage

If you are dealing with excessive logs, then persistent logging might not be a reliable long term solution. Persistent logging results in increased writes on the storage media of the device which leads to your storage media degrading over time.

Instead, device logs can be streamed using the supervisor API. Refer to the [Supervisor's journald](https://www.balena.io/docs/reference/supervisor/supervisor-api/#journald-logs) endpoint. Through this endpoint, device logs can be streamed to whichever cloud monitoring platform you use to store logs reliably over the course of time. For example using a solution like [Datadog](https://www.balena.io/blog/iot-fleet-monitoring-with-datadog-and-balenacloud-how-small-agent-containers-make-a-big-impact/).
