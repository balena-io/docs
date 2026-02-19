---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

BalenaOS and the device Supervisor make it easy to manage a device remotely with features like container logs forwarding, hardware metrics reporting, and Cloudlink for on-demand external access. However, these features consume network bandwidth, and typically cellular providers charge by the megabyte. So to reduce bandwidth usage, a trade-off can be made between cost and features using the configuration options below.

To help you understand the costs, we measured data use over a cellular connection for features that require network transfer. **The minimum bandwidth required is approximately 1 MB per month** for balenaOS v2.108.18 and Supervisor v14.4.4 when all of the features in the table below are turned off and API Polling is set to the minimum value of once per day.

You may configure these features from the fleet/device configuration tabs on the dashboard and as configuration variables. Refer to the [Device Configuration docs](../../learn/manage/configuration.md) and the [Configuration List](config-list/) for more information. Below the table, we describe our measurement tool so you can repeat the tests. Finally, be sure to read the [Side Effects](bandwidth-reduction.md#side-effects-warnings) section for the impact of turning off each feature, particularly Cloudlink.

| Feature / Variable Name                                                                                                                                          | Monthly Bandwidth if enabled          | Measurement Notes                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| <p>Cloudlink<br><code>BALENA_SUPERVISOR_VPN_CONTROL</code></p>                                                                                                   | 80 MB                                 | No use of Cloudlink, just bandwidth required to maintain the connection |
| <p>Device Metrics<br><code>BALENA_SUPERVISOR_HARDWARE_METRICS</code></p>                                                                                         | 72 MB                                 | Measured with minimal application activity                              |
| <p>API Poll Interval<br><code>BALENA_SUPERVISOR_POLL_INTERVAL</code></p>                                                                                         | <p>4x/hour: 28 MB<br>1x/day: 1 MB</p> | 4x/hour is default; 1x/day is minimum                                   |
| <p>NetworkManager connectivity check<br>(no variable; see <a href="https://github.com/balena-os/meta-balena#connectivity"><code>config.json</code> docs</a>)</p> | 1x/hour: 8 MB                         | 1x/hour is default                                                      |
| <p>Device Logging<br><code>BALENA_SUPERVISOR_LOG_CONTROL</code></p>                                                                                              | 8 MB                                  | Measured with one short message per hour; depends on application use    |
| <p>Cloudlink connectivity check<br><code>BALENA_SUPERVISOR_CONNECTIVITY_CHECK</code></p>                                                                         | N/A                                   | Requires bandwidth only under error conditions                          |

## Setup and Rationale

These measurements were made with a Quectel modem on a SixFab HAT on a Raspberry Pi4, and used a Twilio North American SIM. Refer to this [blog post](https://www.balena.io/blog/cellular-iot-isnt-as-hard-as-you-think/) for a similar setup to reproduce results. The device was running balenaOS v2.108.18 and Supervisor v14.4.4. To keep the results generic, the device ran _**only**_ the application that measures bandwidth: [Network Metrics Logger](https://github.com/balena-io-examples/network-metrics-logger). We verified our results against the statistics provided by Twilio on the server side.

Your bandwidth measurements may vary based on hardware, location, or cellular provider, but we expect them to be comparable. Of course, your own app may add to network use. We encourage you to measure with your own device and workload! We recommend deploying the [Network Metrics Logger](https://github.com/balena-io-examples/network-metrics-logger) to test your setup.

The Network Metrics Logger is a generic, client-side tool to measure bandwidth. It uses the [NodeJS system information](https://systeminformation.io/) package, which in turn reads network statistics from `/sys/class/net/{iface}/statistics`. Twilio provides an ideal interface for their server-side statistics, but we wanted a tool that works across providers.

## Side Effects / Warnings

**Cloudlink:** Allows the device to be notified instantly of state changes. Turning off Cloudlink disables [certain functionality](../../learn/welcome/security.md#cloudlink). Also, updates to configuration, environment variables, and other states are not picked up by the device immediately; instead, they are delayed until the next time the device polls the API.

You can re-enable Cloudlink via the dashboard after turning it off. The device will re-establish the link the next time it polls the API, as defined by the poll interval.

[**Device metrics:**](device-metrics.md) Defines whether metrics such as CPU temperature and memory usage are reported to the API and displayed on the summary page of the device dashboard. If turned off, the metrics panel on the dashboard is hidden since the data has not been reported.

**API Poll Interval:** Defines the time interval between device checks for updates to the fleet, for example, new code pushes, environment variables changes or Cloudlink control changes for the device. If Cloudlink is disabled, lengthening this interval increases the latency of propagating these updates to the device.

**NetworkManager connectivity check:** When enabled for devices with multiple network interfaces, instructs NetworkManager to use routing metrics to avoid using an interface that fails the check. This adaptability is crucial to retain connectivity. However, for a single network interface, NetworkManager can provide only interface status from the check via DBus.

**Device Logging:** When disabled, any logs written by your application or components of balenaOS are not sent to the dashboard.

**Cloudlink connectivity check:** Defines the device's ability to test and indicate (via an LED when available) that it has connectivity issues.
