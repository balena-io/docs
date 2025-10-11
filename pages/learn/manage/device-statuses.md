---
title: Device and Update statuses
excerpt: Determine the status and connectivity of a device
---

# Device statuses

Device statuses are displayed on the Devices page and the Device Summary page. An overview of the device statuses of a fleet is shown on the Fleets page. Each device can have one of the following statuses:

| Status                                       | Description                                                                                                                                                                      |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Operational**                              | The device is functioning normally and communicating with the cloud within the expected time interval. In the standard configuration, this means both [cloudlink][cloudlink] and the device heartbeat API are working. If [cloudlink is disabled][bandwidth-reduction], the device will still appear `Operational` if the heartbeat API is functional.   |
| **Reduced Functionality**        | The device is connected to the backend but is experiencing limited functionality due to either **missing recent Heartbeat API communications** or **lack of connection to cloudlink**.                                                                                       |
| **Disconnected**                                  | The device is not connected to cloudlink and has not communicated via the Heartbeat API for a duration exceeding the [API polling interval][poll-interval]. This status indicates that the device is completely unable to send or receive any data from the balena cloud.                                                                                                                                                           |
| **Configuring**                              | The device is applying OS configuration. For example, an OS upgrade.                                                                                                                                         |
| **Updating**                                 | The device is updating to a new App release. In future versions this will also reflect OS updates.                                                                                                                                        |
| **Post Provisioning**                        | The device has been [provisioned][device-provisioning] but has not yet been booted from its internal storage (e.g. eMMC or NVMe).                                                                                              |
| **Inactive**                                 | The device has been [deactivated][deactivated] or has been [preregistered][preregistered] but has not yet connected to the {{ $names.cloud.lower }} API.                         |
| **Frozen**                                   | The device has been frozen because it's outside the organization's allowance, or is in a paid [fleet type][fleet type] on a free tier organization.                              |


## Device Connectivity states



The balena device uses two mechanisms to maintain communication with balenaCloud, namely a periodic HTTP API heartbeat and a VPN based tunnel called cloudlink. The state of both of these links can be seen in the device listing.

![Device connectivity indicators](/img/common/main_dashboard/device_status.webp)

`Reduced Functionality` indicates that the device is experiencing limited connectivity. This can be due to either **missing recent Heartbeat API communications** or **lack of connection to cloudlink**. The boolean columns for these states are as follows:

- **Cloudlink available, but heartbeat not**: The device is unable to communicate with the {{ $names.cloud.lower }} API. A device with cloudlink only is not able to apply any new changes made such as deploying new releases, applying service configuration values, or switching to local mode. However, since cloudlink is available, the device is accessible via SSH or the web terminal. When a device exhibits this state, the first troubleshooting step is to [run a healthcheck](https://docs.balena.io/reference/diagnostics/#device-health-checks) and pull [device diagnostics](https://docs.balena.io/reference/diagnostics/#device-diagnostics). This should help determine the reason the supervisor is not communicating with the balenaCloud backend.

- **Heartbeat available, but Cloudlink not**: The device is unable to connect to Cloudlink (e.g. a firewall is blocking VPN traffic). [Features enabled by Cloudlink][cloudlink] such as [SSH access][ssh-access] will not be available. A device with Heartbeat Only status has internet connectivity, is able to reach the API, and can poll the cloud for new updates to apply, but actions that take immediate effect, such as purging data, restarting services, rebooting or shutting down, will not be available as they are performed via Cloudlink.

__Note:__ If the device is powered off or loses all network connectivity, the `heartbeat` indicator will show as connected (green) until enough time has passed to cover the device [API polling interval][poll-interval], at which time it will be marked as `Disconnected`.


## Update statuses

The `Update status` and `Update status duration` fields on devices represent the state of the current application update to target state. 

__Note:__ Data for these states will only get populated for devices with [supervisor 16.7.0](https://github.com/balena-os/balena-supervisor/blob/master/CHANGELOG.md#v1670) or later.

| Status                                       | Description                                                                                                                                                                      |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Done**                              | The update, restart or configuration change is complete and the device is in its target state.                                          |
| **Downloading**                       | The supervisor is downloading one or more container images associated with the target release                                           |
| **Downloaded**                        | All container images in the target release have been downloaded. **Note:** If the device holds an update lock, it will stop in this state until the lock is released (depending on the [update strategy](https://docs.balena.io/learn/deploy/release-strategy/update-strategies/#controlling-the-update-strategy)). |
| **Applying Changes**                  | The supervisor is performing actions to install the new release, i.e. killing old containers and making volumes/network/container changes.    |
| **Rejected**                          | The target release has required services that do not meet the [necessary requirements](https://docs.balena.io/learn/develop/multicontainer/#container-requirements) to run. |
| **Aborted**                           | The supervisor has given up on trying to install a new release. There are currently no conditions under which the supervisor returns this state, but future work could allow the supervisor to abort an update, for instance, after a number of failed download tries.    |

## Update Status Duration

This field is calculated based on the timestamp of the most recent update event. For example: In the screenshot above for Device Connectivity states, the device `bitter-wind` shows an update status duration of 17 minutes. This signifies that the device update status changed to `Downloaded` 17 minutes ago, which was the most recent update event. This value will reset when the update status changes again for the device. When querying this data from the API, you will receive a timestamp instead of a duration.

It is important to note that when the application starts up after a reboot or an app restart, this behavior is indistinguishable from an app installation. Consequently, the `Update Status Duration` timestamp will be refreshed whenever a reboot or restart occurs.

## Statuses and OS upgrades

The `Update status` currently focuses on application updates, and for the time being OS updates are still reflected as part of the device status. When a device is performing an OS update, the status will change to `Configuring` with additional details in parentheses, such as `Configuring (Update successful, rebooting)`. While filtering or searching based on the data in parentheses is not yet available, we are working towards unifying all update paths under the `Update Status` mechanism used by applications. This will make it even easier to track and manage updates in the future.

## Debugging Device Status

If you find your device to be displaying a status which is unclear even with the above notes, visit the [device debugging masterclass][debugging-masterclass] for more information.

[deactivated]: /learn/accounts/billing/#inactive-devices
[poll-interval]: /learn/manage/configuration/#variable-list
[device-provisioning]: /learn/welcome/primer/#device-provisioning
[preregistered]:/learn/more/masterclasses/advanced-cli/#52-preregistering-a-device
[fleet type]:/learn/accounts/fleet-types
[debugging-masterclass]:/learn/more/masterclasses/device-debugging
[cloudlink]:/learn/welcome/security/#cloudlink
[bandwidth-reduction]:/reference/supervisor/bandwidth-reduction/#side-effects--warnings
[ssh-access]:/learn/manage/ssh-access/
