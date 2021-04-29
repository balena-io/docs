---
title: Device statuses
excerpt: Determine the status and connectivity of a device
---

# Device statuses

The application overview page shows the status of each device in the application.

<img src="/img/common/main_dashboard/application_device_status.png" alt="Application device status" width="40%" >

Each device can have one of the following statuses:

| Status | Description |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Online | The device is connected to the VPN and is communicating with the cloud within the correct interval. See [device connectivity](#device-connectivity) for more details on the possible Online states. |
| Configuring | The device is applying OS configuration. |
| Updating | The device is updating to a new application release. |
| Offline | The device is offline and is not connected to VPN and has not any recent API communications. |
| Post Provisioning | The device has been [provisioned][device-provisioning] but has not yet come online. |
| Inactive | The device has been [deactivated][deactivated] or has been [preregistered][preregistered] but has not yet connected to the {{ $names.cloud.lower }} API. |
| Frozen | The device has been frozen because it's outside the organization's allowance, or is in a paid [application type][application type] on a free tier organization. |

## Device connectivity

![Device connectivity indicators](/img/common/main_dashboard/device_status.png)

In addition to the device status, there are indicators to show if the device is having any partial connectivity issue. These indicators can be used to identify common issues, such as a firewall blocking VPN traffic or an inability of the device to communicate with the {{ $names.cloud.lower }} API.

| Status | Description |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Online (VPN Only) | The device is connected to the {{ $names.cloud.lower }} VPN which provides remote SSH connections. |
| Online (Heartbeat Only) | The device is sending requests to fetch the target state within the configured [API polling interval][poll-interval]. |

**Note:** If the device is powered off or loses all network connectivity, it will remain in the Online (Heartbeat Only) state until the last target state fetch exceeds the polling interval.

## Debugging Device Status

If you find your device to be displaying a status which is unclear even with the above notes, visit the [device status][debugging-masterclass#device-status] section in [device debugging masterclass][debugging-masterclass] for more information and what it means for your application.

[deactivated]: /learn/manage/billing/#inactive-devices
[host-os-updates]: /reference/OS/updates/self-service/
[poll-interval]: /learn/manage/configuration/#variable-list
[device-provisioning]: /learn/welcome/primer/#device-provisioning
[preregistered]: /learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[application type]: /learn/manage/app-types
[debugging-masterclass]:/learn/more/masterclasses/device-debugging
[debugging-masterclass#device-status]:/learn/more/masterclasses/device-debugging#12-Device-connectivity-status
