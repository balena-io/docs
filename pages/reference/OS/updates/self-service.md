---
title: Self-service updates
excerpt: How to update {{ $names.os.lower }} versions from your dashboard
---

# Self-service updates

## Which devices and versions are supported?

Since we periodically release updates and improvements to {{ $names.os.lower }} (the host OS running on all {{ $names.company.lower }} devices), we encourage you to keep your devices up to date. We offer self-service host OS updates between 2.x versions and from 1.x to 2.x versions. All 2.x devices will default to delta-based updates if available, thus reducing the size of the update sent over the network.

__Note:__ {{ $names.os.upper }} 1.x to 2.x updates limit the amount of data you can have in your application's `/data` folder to about 170MB (compressed). If you have more data, the update will fail and your device won't be modified.

Self-service updates are available for both `production` and `development` {{ $names.os.lower }} variants.

For device types and {{ $names.os.lower }} versions that are not yet supported, please contact us on the [forums][forums]. We are continuously expanding the range of versions and types that can be updated.

## Running an update

To run an update for an individual device, navigate to that device's *Settings* tab, go to the section *OS version*, and select the version of {{ $names.os.lower }} you would like to update to:

![Update device](/img/common/updates/update-os.png)

Updates can also be made to multiple devices in the same fleet. From the device list, click the checkbox to the left of any online devices you wish to update. Then use the *Actions* dropdown in the upper-right corner of the dashboard, and choose the *Update {{ $names.os.lower }}* action:

![Device group update](/img/common/updates/group-update.png)

__Note:__ Updates to the balena Supervisor, {{ $names.company.lower }}'s agent on the device, can be triggered independently. Read more about that process [here](/reference/supervisor/supervisor-upgrades).

After an update begins, the device summary page will show a progress bar that marks the steps completed for the update. Some steps that take longer, such as the device downloading the new OS image, may make the progress bar appear stuck. This doesn't mean anything has gone wrong with your update. We are working on making the update process more informative.

Update time can vary significantly, depending on the speed of your network, the speed of your SD card (or other storage medium), and your device performance.

If your {{ $names.os.lower }} update fails for any reason, the device should still be recoverable. For devices running {{ $names.os.lower }} 2.x, the user application should still be running normally, and the reasons for failure can be examined through the update logs at `/mnt/data/balenahup/` (or potentially the legacy location `/mnt/data/resinhup/`). If you have any issues, please contact us on the [troubleshooting section of the forums][troubleshooting].

You can learn more about what exactly goes on during the update process [here][update-process].

<!-- links -->
[forums]:{{ $names.forums_domain }}/
[troubleshooting]:{{ $names.forums_domain }}/c/troubleshooting
[update-process]:/updates/update-process/
