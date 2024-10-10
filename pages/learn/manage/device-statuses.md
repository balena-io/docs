---
title: Device statuses
excerpt: Determine the status and connectivity of a device
---

# Device statuses

Device statuses are displayed on the Devices page and the Device Summary page. An overview of the device statuses of a fleet is shown on the Fleets page. Each device can have one of the following statuses:

<img src="/img/common/main_dashboard/application_device_status.webp" alt="Application device status" width="40%" >

| Status                    | Description                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Operational**           | The device is fully functional and is communicating with the balenaCloud backend as expected. Both heartbeat and cloudlink are operational.                        |
| **Reduced Functionality** | Neither the device's heartbeat nor cloudlink is operational, meaning the device is not able to communicate with the balenaCloud API or establish a VPN connection. |
| **Disconnected**          | The device is not connected to the balenaCloud backend. It could be powered off, have network issues, or be intentionally disconnected.                            |
| **Configuring**           | The device is applying OS configuration.                                                                                                                           |
| **Updating**              | The device is updating to a new release.                                                                                                                           |
| **Post Provisioning**     | The device has been [provisioned][device-provisioning] but has not yet come online.                                                                                |
| **Inactive**              | The device has been [deactivated][deactivated] or has been [preregistered][preregistered] but has not yet connected to the {{ $names.cloud.lower }} API.           |
| **Frozen**                | The device has been frozen because it's outside the organization's allowance or is in a paid [fleet type][fleet type] on a free tier organization.                 |

## Heartbeat

The heartbeat indicates whether the device's supervisor is operating correctly. It reflects the supervisor's health status and ability to communicate with the balenaCloud API. If the heartbeat is missing, the supervisor is either not running, malfunctioning, or unable to connect to the API, preventing the device from fetching updates.

## Cloudlink

Cloudlink represents the device's ability to establish a secure Cloudlink connection to communicate with the balena backend. If the cloudlink is unavailable, the device is unable to provide remote SSH access or perform actions that require real-time control, such as reboots or container restarts via the balenaCloud dashboard.

> **Note:** If the device loses all network connectivity or is powered off, it will remain in its last known state (e.g., Operational or Reduced Functionality) until the polling interval exceeds the configured threshold.

# Debugging Device Status

If you encounter an unclear status or connectivity issue, refer to the [device debugging masterclass][debugging-masterclass] for further guidance on troubleshooting your device.

[deactivated]: /learn/accounts/billing/#inactive-devices
[poll-interval]: /learn/manage/configuration/#variable-list
[device-provisioning]: /learn/welcome/primer/#device-provisioning
[preregistered]: /learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[fleet type]: /learn/accounts/fleet-types
[debugging-masterclass]: /learn/more/masterclasses/device-debugging
