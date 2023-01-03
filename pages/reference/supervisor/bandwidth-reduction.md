---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

balenaOS and the device Supervisor provide convenient features that make it easy to manage a device remotely, like forwarding container logs, hardware metrics reporting, and Cloudlink for on-demand external access. However, these features consume network bandwidth, and typically cellular connectivity is charged by the megabyte. To allow you to trade off between cost and features, you may configure their use individually.

Most of these controls are available from the fleet/device configuration tabs on the dashboard as well as via Supervisor variables. The NetworkManager connectivity check may be configured via `config.json`.

**The minimum bandwidth required is approximately 1 MB per month**, when turning off all of the features below and setting API Polling to the minimum value of once per day. These measurements were made with a Quectel modem on a SixFab HAT on a Raspberry Pi4, and using a Twilio North American SIM. See this [blog post](https://www.balena.io/blog/cellular-iot-isnt-as-hard-as-you-think/) for a similar setup. The device was running balenaOS v2.107.10 and Supervisor v14.4.4.

| Control | Monthly Bandwidth if enabled | Variable Name<br>`BALENA_SUPERVISOR...` | Comments |
| ------- | --------- | -------- | -------- |
| Cloudlink VPN | 81 MB | ...`_VPN_CONTROL` | Bandwidth just to maintain connection |
| Device Metrics | 73 MB | ...`_HARDWARE_METRICS` | Minimal application activity |
| API Poll Interval, 4x hour | 28 MB | ...`_POLL_INTERVAL` | Default interval |
| Network Manager connectivity check, 1x hour | 8 MB | No variable, see [configuration][config-json] to set interval | Default interval |
| API Poll Interval, 1x day | 1 MB | ...`_POLL_INTERVAL` | Minimum interval |
| Device Logging| ?? | ...`_LOG_CONTROL` | Minimal application activity |
| Cloudlink connectivity check | N/A | ...`_CONNECTIVITY_CHECK`  | Only active when VPN is down |

Each actual variable name is prefixed with "`BALENA_SUPERVISOR`", for example `BALENA_SUPERVISOR_VPN_CONTROL`.

You can perform these measurements yourself as well! See the Network Metrics Logger [example](https://github.com/balena-io-examples/network-metrics-logger).


## Side Effects / Warnings

**Cloudlink VPN** Defines the ability to send instantaneous updates to the device. Turning off cloudlink means that any configuration or variable update is reflected only when the device polls for these changes. The Web Terminal does not function when cloudlink is disabled. This also disables the public URL functionality.

**Device Metrics** [Device metrics][device-metrics] such as CPU temperature and memory usage won't be reported to the API, and won't be displayed on the summary page of the device dashboard.

**API Poll Interval** Defines the time interval between device checks for updates to the fleet, for example new code pushes, environment variables changes, or cloudlink control changes for the device. If cloudlink is disabled, lengthening this interval increases the latency of propagating these updates to the device.

**NetworkManager connectivity check** ??? What happens if it fails?

**Device Logging** Any logs written by the user container or the device Agent are not sent to the dashboard when this variable is set to false.

**Cloudlink connectivity check** Defines the device's ability to test and indicate (via an LED when available) that it has issues with connectivity.


[device-metrics]:/reference/supervisor/device-metrics
[configuration]:/reference/OS/network/#checking-connectivity
