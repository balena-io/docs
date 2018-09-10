---
title: Reduce bandwidth usage
---

# Reduce bandwidth usage

In order to provide our users with a clear view of their devices, the {{ $names.company.lower }} device supervisor constantly keeps our API informed about the devices' conditions and applies any changes, like downloading new application updates or environment variable changes by negotiating with our API. While a quick reflection of actions is great during development, it comes at a cost of increased data usage.

In order to give our power users control over data flow we enabled a few RESIN [config environment variables](/management/env-vars).

|Variable                               | Allowed Value     |   Action                                             | Default |
|---------------------------------------|-------------------|----------------------------------------------------------------|
| `{{ $names.company.allCaps }}_SUPERVISOR_VPN_CONTROL`        | true/false        |  Enable / Disable VPN                                |   true  |
| `{{ $names.company.allCaps }}_SUPERVISOR_CONNECTIVITY_CHECK` | true/false        |  Enable / Disable connectivity check VPN is disabled |   true  |
| `{{ $names.company.allCaps }}_SUPERVISOR_POLL_INTERVAL`      | 600000 to 86400000 |  Resin API Poll interval in milliseconds             |   600000 |
| `{{ $names.company.allCaps }}_SUPERVISOR_LOG_CONTROL`        | true/false        |  Enable / Disable logs from being sent to Resin      |   true  |

Side-effect/Warning
-------------------

`{{ $names.company.allCaps }}_SUPERVISOR_VPN_CONTROL`: This defines the ability to send instantaneous updates to the device. Turning off the VPN means that any application or environment variable update is reflected only when the device polls for these changes. The Web Terminal does not function when the VPN is disabled. This also disables the public URLs functionality.

`{{ $names.company.allCaps }}_SUPERVISOR_CONNECTIVITY_CHECK`: Defines the device's ability to test and indicate (via an LED when available) that it has issues with connectivity.

`{{ $names.company.allCaps }}_SUPERVISOR_POLL_INTERVAL`: This defines the time interval when any changes made to the application, i.e either new code pushes or environment variables changes or VPN control changes are propagated to the device. Think of it as the interval when the device checks in with Resin API to ask for new updates. Making this interval long, would mean that any change is only reflected in the device after this interval, if the VPN is not operational. (We suggest limiting this to less than 24 hours)

`{{ $names.company.allCaps }}_SUPERVISOR_LOG_CONTROL`: Any logs written by the user container or the device Agent are not sent to the dashboard when this variable is set to False.


Data usage impact
-----------------

| Service                                             | Usage (Including DNS overhead) |
|-----------------------------------------------------|--------------------------------|
| API poll (Once per 10m)                             | 6650 Bytes per request         |
| Resin Agent update poll (Once every 24 hours)       | 6693 Bytes per request         |
| VPN enabled                                         | 43 Bytes / second              |
| TCP check cost (When VPN disabled)                  | 47.36 Bytes / second           |

Example minimum bandwidth settings
----------------------------------

The following settings tune the data usage to approximately 1.3MB per month:

* Disable VPN
* Disable CONNECTIVITY CHECK
* Change POLL interval to 24 hours
* Disable LOGS
