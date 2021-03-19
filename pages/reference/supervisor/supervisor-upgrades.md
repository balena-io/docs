# Self-service supervisor upgrades

The balena Supervisor can be upgraded independently of {{ $names.os.lower }}.

While the best long-term strategy is to consistently [upgrade the host OS](/reference/OS/updates/self-service), there are some cases
whereby an independent Supervisor upgrade is preferable:

* Enable features in the Supervisor not yet available in an OS release
* No reboot
* Less downtime (if any)
* Smaller update size

To run an update for an individual device, navigate to that device's *Actions* tab, click *Update supervisor*, and
select the version of the balena Supervisor you would like to update to:

![Supervisor device upgrade](/img/common/updates/supervisor-device-upgrade.png)

Updates can also be issued to multiple devices in the same application with the same CPU architecture. From the device
list, click the checkbox to the left of any online devices you wish to update. Then click the *Actions* button in the
upper-right corner of the dashboard, followed by *Update supervisor*:

![Supervisor batch upgrade](/img/common/updates/supervisor-batch-upgrade.svg)

Additionally, these devices can be scheduled for an offline device. The update will be performed once the device comes
back online and successfully connects to the {{ $names.cloud.lower }} backend.

__Note:__ Only devices running {{ $names.os.lower }} v2.12.0 or greater are able to upgrade the Supervisor independently.
