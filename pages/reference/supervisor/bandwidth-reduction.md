---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

balenaOS and the device Supervisor make it easy to manage a device remotely with features like forwarding container logs, hardware metrics reporting, and Cloudlink for on-demand external access. However these features consume network bandwidth, and typically cellular providers  charge by the megabyte. So to trade off between cost and features, you may configure their use individually.

To help you understand the costs, we measured data use over a cellular connection for features that require network transfer. **The minimum bandwidth required is approximately 1 MB per month**, when turning off all of the features in the table below and setting API Polling to the minimum value of once per day.

You may control these features from the fleet/device configuration tabs on the dashboard, and as device variables. See the dashboard [docs][device-configuration], and the Configuration List [page][configuration-list]. Below the table we describe our measurement tool so you can repeat the tests. Finally, be sure to read the [Side Effects](#side-effects--warnings) section for the impact of turning off each feature.

| Feature / Variable Name | Monthly Bandwidth if enabled | Measurement Notes |
| ------- | --------- | -------- |
| Cloudlink VPN<br>`BALENA_SUPERVISOR_VPN_CONTROL` | 80 MB | No use of VPN; just to maintain connection  |
| Device Metrics<br>`BALENA_SUPERVISOR_HARDWARE_METRICS` | 72 MB | Measured with minimal application activity |
| API Poll Interval<br>`BALENA_SUPERVISOR_POLL_INTERVAL` |4x/hour: 28 MB<br>1x/day: 1 MB | 4x/hour is default; 1x/day is minimum   |
| NetworkManager connectivity check<br>(no variable; see `config.json` [docs][networking-connectivity]) | 1x/hour: 8 MB | 1x/hour is default |
| Device Logging<br>`BALENA_SUPERVISOR_LOG_CONTROL`| 8 MB | Measured with one short message per hour; depends on application use |
| Cloudlink connectivity check<br>`BALENA_SUPERVISOR_CONNECTIVITY_CHECK` | N/A  | Requires bandwidth only under error conditions |


## Setup and Rationale

These measurements were made with a Quectel modem on a SixFab HAT on a Raspberry Pi4, and used a Twilio North American SIM. See this [blog post](https://www.balena.io/blog/cellular-iot-isnt-as-hard-as-you-think/) for a similar setup. The device was running balenaOS v2.107.10 and Supervisor v14.4.4. To keep the results generic, the device ran only the application that measures bandwidth: [Network Metrics Logger](https://github.com/balena-io-examples/network-metrics-logger). We verified our results against the statistics provided by Twilio on the server side.

Your bandwidth measurements may vary based on hardware, location or cellular provider, but we expect them to be similar. We encourage you to measure with your own device and workload! It's easy to deploy the Network Metrics Logger.

We wrote Network Metrics Logger to provide a generic, client-side tool to measure bandwidth. It uses the NodeJS system information [library](https://systeminformation.io/), which in turn reads network statistics from `/sys/class/net/{iface}/statistics`. Twilio provides a nice interface to their server-side statistics, but we wanted a tool that works across providers.


## Side Effects / Warnings

**Cloudlink VPN** Provides the ability to send instantaneous updates to the device. Turning off cloudlink has several downsides: (1) configuration and variable updates are delayed by the device API polling interval; (2) CLI access is disabled via the web terminal or SSH; (3) device's public URL is not accessible.

**Device Metrics** [Device metrics][device-metrics] such as CPU temperature and memory usage won't be reported to the API if turned off, and so won't be displayed on the summary page of the device dashboard.

**API Poll Interval** Defines the time interval between device checks for updates to the fleet, for example new code pushes, environment variables changes, or cloudlink control changes for the device. If cloudlink is disabled, lengthening this interval increases the latency of propagating these updates to the device.

**NetworkManager connectivity check** When enabled for devices with multiple network interfaces, NetworkManager uses routing metrics to avoid use of an interface that fails the check. This adaptability is crucial to retain connectivity. However for a single network interface, NetworkManager can provide only interface status from the check via DBus.

**Device Logging** Any logs written by the user container or balena system are not sent to the dashboard when this variable is set to false.

**Cloudlink connectivity check** Defines the device's ability to test and indicate (via an LED when available) that it has issues with connectivity.


[configuration-list]:/reference/supervisor/configuration-list
[device-configuration]:/learn/manage/configuration
[device-metrics]:/reference/supervisor/device-metrics
[networking-connectivity]:https://github.com/balena-os/meta-balena#connectivity
