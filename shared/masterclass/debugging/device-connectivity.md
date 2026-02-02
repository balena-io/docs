The balena device uses two mechanisms to maintain communication with balenaCloud, namely a periodic HTTP API heartbeat and a VPN based tunnel called cloudlink. The state of both of these links can be seen in the device listing.

<figure><img src="../../.gitbook/assets/device_status.webp" alt=""><figcaption></figcaption></figure>

`Reduced Functionality` indicates that the device is experiencing limited connectivity. This can be due to either **missing recent Heartbeat API communications** or **lack of connection to cloudlink**. The boolean columns for these states are as follows:

* **Cloudlink available, but heartbeat not**: The device is unable to communicate with the balenaCloud API. A device with cloudlink only is not able to apply any new changes made such as deploying new releases, applying service configuration values, or switching to local mode. However, since cloudlink is available, the device is accessible via SSH or the web terminal. When a device exhibits this state, the first troubleshooting step is to [run a healthcheck](https://docs.balena.io/reference/diagnostics/#device-health-checks) and pull [device diagnostics](https://docs.balena.io/reference/diagnostics/#device-diagnostics). This should help determine the reason the supervisor is not communicating with the balenaCloud backend.
* **Heartbeat available, but Cloudlink not**: The device is unable to connect to Cloudlink (e.g. a firewall is blocking VPN traffic). [Features enabled by Cloudlink](../welcome/security.md#cloudlink) such as [SSH access](ssh-access.md) will not be available. A device with Heartbeat Only status has internet connectivity, is able to reach the API, and can poll the cloud for new updates to apply, but actions that take immediate effect, such as purging data, restarting services, rebooting or shutting down, will not be available as they are performed via Cloudlink.

{% hint style="warning" %}
If the device is powered off or loses all network connectivity, the `heartbeat` indicator will show as connected (green) until enough time has passed to cover the device [API polling interval](configuration.md#variable-list), at which time it will be marked as `Disconnected`.
{% endhint %}
