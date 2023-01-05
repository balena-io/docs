---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

balenaOS and the device Supervisor provide convenient features that make it easy to manage a device remotely, like forwarding container logs, hardware metrics reporting, and Cloudlink for on-demand external access. However, these features consume network bandwidth, and typically cellular connectivity is charged by the megabyte. To allow you to trade off between cost and features, you may configure their use individually.

Most of these controls are available from the fleet/device configuration tabs on the dashboard as well as via Supervisor variables. The NetworkManager connectivity check may be configured via `config.json`.

The table below shows measurements from our testing with a cellular connection. **The minimum bandwidth required was approximately 1 MB per month**, when turning off all of the features below and setting API Polling to the minimum value of once per day. Below the table we describe our measurement setup, and the [Side Effects](#side-effects--warnings) section describes the impact of turning off each feature.

| Feature / Variable Name | Monthly Bandwidth if enabled | Measurement Notes |
| ------- | --------- | -------- |
| Cloudlink VPN<br>`BALENA_SUPERVISOR_VPN_CONTROL` | 81 MB | No use of VPN; just to maintain connection  |
| Device Metrics<br>`BALENA_SUPERVISOR_HARDWARE_METRICS` | 73 MB | Measured with minimal application activity |
| API Poll Interval<br>`BALENA_SUPERVISOR_POLL_INTERVAL` |4x/hour: 28 MB<br>1x/day: 1 MB | 4x/hour is default; 1x/day is minimum   |
| Network Manager connectivity check<br>(no variable; see [docs](https://balena.io/docs/reference/OS/network/#checking-connectivity) to set) | 1x/hour: 8 MB | N/A |
| Device Logging<br>`BALENA_SUPERVISOR_LOG_CONTROL`| 9 MB | Measured with one short message per hour; depends on application use |
| Cloudlink connectivity check<br>`BALENA_SUPERVISOR_CONNECTIVITY_CHECK` | N/A  | Requires bandwidth only under error conditions |

These measurements were made with a Quectel modem on a SixFab HAT on a Raspberry Pi4, and using a Twilio North American SIM. See this [blog post](https://www.balena.io/blog/cellular-iot-isnt-as-hard-as-you-think/) for a similar setup. The device was running balenaOS v2.107.10 and Supervisor v14.4.4. To keep results generic, the device ran only the application to measure bandwidth: [Network Metrics Logger](https://github.com/balena-io-examples/network-metrics-logger).

Bandwidth measurements may vary with your hardware or cellular provider. We encourage you to measure yourself! It's easy to deploy the Network Metrics Logger with your own device and workload.

## Side Effects / Warnings

**Cloudlink VPN** Defines the ability to send instantaneous updates to the device. Turning off cloudlink means that any configuration or variable update is reflected only when the device polls for these changes. The Web Terminal does not function when cloudlink is disabled. This also disables the public URL functionality.

**Device Metrics** [Device metrics][device-metrics] such as CPU temperature and memory usage won't be reported to the API, and won't be displayed on the summary page of the device dashboard.

**API Poll Interval** Defines the time interval between device checks for updates to the fleet, for example new code pushes, environment variables changes, or cloudlink control changes for the device. If cloudlink is disabled, lengthening this interval increases the latency of propagating these updates to the device.

**NetworkManager connectivity check** ??? What happens if it fails?

**Device Logging** Any logs written by the user container or the device Agent are not sent to the dashboard when this variable is set to false.

**Cloudlink connectivity check** Defines the device's ability to test and indicate (via an LED when available) that it has issues with connectivity.


[device-metrics]:/reference/supervisor/device-metrics
