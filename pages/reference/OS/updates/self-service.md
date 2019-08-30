---
title: Self-service updates
excerpt: How to update {{ $names.os.lower }} versions from your dashboard
---

# Self-service updates

## Which devices and versions are supported?

Since we periodically release updates and improvements to {{ $names.os.lower }} (the host OS running on all {{ $names.company.lower }} devices), we encourage you to keep your devices up to date. We offer self-service host OS updates between 2.x versions, from 1.x to 2.x versions, and between 1.x versions.

__Note__: {{ $names.os.upper }} 1.x to 2.x updates limit the amount of data you can have in your application's `/data` folder to about 170MB (compressed). If you have more data, the update will fail and your device won't be modified.

Supported device types:

* For the **Raspberry Pi** series, self-service updates are available from {{ $names.os.lower }} versions 1.8.0 and upwards (including 2.x versions) to any versions after {{ $names.os.lower }} 2.2.0.
* For **BeagleBone** devices, you can update {{ $names.os.lower }} 1.8.0 through 1.26.0 to the transitional 1.30.1 version, and from 1.30.1 and upwards (including 2.x versions) to version 2.2.0 and newer.
* For **Intel NUC** and **UP Boards**, you can update all 2.x versions to 2.2.0 and newer.
* **Banana Pi M1+** can be updated for all available versions.
* **Intel Edison** can be updated from all 2.x versions to 2.9.7+rev2 and above.
* **IOT2000** can be updated from all available versions to all newer versions.
* **Jetson TX1** can be updated for all available versions.
* **Jetson TX2** can be updated starting from {{ $names.os.lower }} 2.7.4+rev1 to all newer versions.
* **Odroid C1** can be updated beginning with the available 2.x versions.
* **Odroid XU4** can be updated beginning with the available 2.x versions.
* **Orange Pi Plus2** can be updated for all available versions.
* **QEMU** devices (both 32 and 64-bit versions) can be updated starting from {{ $names.os.lower }} 2.9.3+rev1 to all newer versions.
* **Samsung ARTIK 710** can be updated for all available versions.
* **TS-4900** can be updated starting from {{ $names.os.lower }} 2.4.1+rev1 to all newer versions.
* **Variscite DART-6UL** can be updated for all available versions.

At the moment, self-service updates are only available for production {{ $names.os.lower }} versions. If you need updates for development and beta versions, please contact support or start a thread on the [forums][forums].

For device types and {{ $names.os.lower }} versions that are not yet supported, please contact us on the [forums][forums]. We are continuously expanding the range of versions and types that can be updated.

## Running an update

To run an update for an individual device, navigate to that device's *Actions* tab, click *Update {{ $names.os.upper }}*, and select the version of {{ $names.os.lower }} you would like to update to:

<img src="/img/common/updates/update-os.png" width="80%">

Updates can also be made to multiple devices in the same application. From the device list, click the checkbox to the left of any online devices you wish to update. Then click the *Group Actions* button in the upper-right corner of the dashboard, followed by *Update {{ $names.os.lower }}*:

<img src="/img/common/updates/group-update.png" width="100%">

__Note:__ Updates to the supervisor, {{ $names.company.lower }}'s agent on the device, are handled in conjuction with host OS updates. If you need to update the supervisor separately from the host OS, please [contact us][troubleshooting] for assistance.

After an update begins, the device summary page will show a progress bar that marks the steps completed for the update. Some steps that take longer, such as the device downloading the new OS image, may make the progress bar appear stuck. This doesn't mean anything has gone wrong with your update. We are working on making the update process more informative.

Update time can vary significantly, depending on the speed of your network, the speed of your SD card (or other storage medium), and your device performance.

If your {{ $names.os.lower }} update fails for any reason, the device should still be recoverable. For devices running {{ $names.os.lower }} 2.x, the user application should still be running normally, and the reasons for failure can be examined throught the update logs at `/mnt/data/resinhup/`. If you have any issues, please contact us on the [troubleshooting section of the forums][troubleshooting].

You can learn more about what exactly goes on during the update process [here][update-process].

<!-- links -->
[forums]:{{ $names.forums_domain }}/
[troubleshooting]:{{ $names.forums_domain }}/c/troubleshooting
[update-process]:/updates/update-process/
