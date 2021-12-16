---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

In order to provide users with essential information about their devices, the {{ $names.company.lower }} Supervisor on the device regularly keeps the API informed about the device's state. Upon receiving a target device state which differs from the current device state, the Supervisor applies changes, such as downloading new application updates or setting environment variables. While a quick response to actions is great during development, it also leads to of increased data usage.

In order to give our power users control over data flow, we enabled a few `BALENA_` variables in the [configuration][configuration] tab.

| Variable                               | Allowed Value      |   Action                                             | Default | Available with Supervisor Version |
|----------------------------------------|--------------------|------------------------------------------------------|---------|-----------------------------------|
| `BALENA_SUPERVISOR_VPN_CONTROL`        | true/false         |  Enable / Disable VPN                                |  true   |  v1.1.0                           |
| `BALENA_SUPERVISOR_CONNECTIVITY_CHECK` | true/false         |  Enable / Disable VPN connectivity check             |  true   |  v1.3.0                           |
| `BALENA_SUPERVISOR_POLL_INTERVAL`      | 600000 to 86400000 |  API Poll interval in milliseconds                   |  900000 |  v1.3.0                           |
| `BALENA_SUPERVISOR_LOG_CONTROL`        | true/false         |  Enable / Disable logs from being sent to API        |  true   |  v1.3.0                           |
| `BALENA_SUPERVISOR_HARDWARE_METRICS`   | true/false         |  Enable / Disable device hardware metrics reporting  |  true   |  v12.8.0                          |

Side Effects / Warnings
-------------------

`BALENA_SUPERVISOR_VPN_CONTROL`: This defines the ability to send instantaneous updates to the device. Turning off the VPN means that any configuration or variable update is reflected only when the device polls for these changes. The Web Terminal does not function when the VPN is disabled. This also disables the public URL functionality.

`BALENA_SUPERVISOR_CONNECTIVITY_CHECK`: Defines the device's ability to test and indicate (via an LED when available) that it has issues with connectivity.

`BALENA_SUPERVISOR_POLL_INTERVAL`: This defines the time interval when any changes made to the fleet, i.e either new code pushes or environment variables changes or VPN control changes are propagated to the device. Think of it as the interval when the device checks in with {{ $names.company.lower }} API to ask for new updates. Making this interval long, would mean that any change is only reflected in the device after this interval, if the VPN is not operational. (We suggest limiting this to less than 24 hours.)

`BALENA_SUPERVISOR_LOG_CONTROL`: Any logs written by the user container or the device Agent are not sent to the dashboard when this variable is set to false.

`BALENA_SUPERVISOR_HARDWARE_METRICS`: [Device metrics][device-metrics] such as CPU temperature and memory usage won't be reported to the API, and won't be displayed on the summary page of the device dashboard.

Data usage impact
-----------------

| Service                                                                 | Usage (Including DNS overhead)                          | Related Configuration Variable       |
|-------------------------------------------------------------------------|---------------------------------------------------------|--------------------------------------|
| API poll (Once per 15min)                                               | 6650 Bytes per request                                  | BALENA_SUPERVISOR_POLL_INTERVAL      |
| {{ $names.company.lower }} Supervisor update poll (Once every 24 hours) | 6693 Bytes per request                                  | Not configurable via variables       |
| VPN enabled                                                             | 43 Bytes / second                                       | BALENA_SUPERVISOR_VPN_CONTROL        |
| TCP check cost (When VPN disabled)                                      | 47.36 Bytes / second                                    | BALENA_SUPERVISOR_CONNECTIVITY_CHECK |
| Hardware metrics reporting                                              | ~66 Bytes every 10 seconds when there have been changes | BALENA_SUPERVISOR_HARDWARE_METRICS   |

Example minimum bandwidth settings
----------------------------------

The following settings lead to data usage of approximately 1.3MB per month:

* Disable `BALENA_SUPERVISOR_VPN_CONTROL`
* Disable `BALENA_SUPERVISOR_CONNECTIVITY_CHECK`
* Change `BALENA_SUPERVISOR_POLL_INTERVAL` to 24 hours (86400000 ms)
* Disable `BALENA_SUPERVISOR_LOG_CONTROL`
* Disable `BALENA_SUPERVISOR_HARDWARE_METRICS`

[device-metrics]:/reference/supervisor/device-metrics
[configuration]:/learn/manage/configuration
