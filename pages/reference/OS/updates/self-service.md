---
title: Self-service updates
excerpt: How to update {{ $names.os.lower }} versions from your dashboard
---

# Self-service updates

## Which devices and versions are supported?

We periodically release updates and improvements to balenaOS, the host operating system that powers all balena devices. These releases are accessible through multiple channels, including the dashboard, SDK, and CLI.

Updating from one version to a newer one is generally supported; however, big version jumps may not always be guaranteed. Devices running balenaOS 2.x and above benefit from delta-based updates when available, significantly reducing the size of updates sent over the network.

Self-service updates are available for both `production` and `development` {{ $names.os.lower }} variants.

For device types and {{ $names.os.lower }} versions that are not yet supported, please contact us on the [forums][forums]. We are continuously expanding the range of versions and types that can be updated.

Find more information below about our version support policy.

__Note:__ {{ $names.os.upper }} 1.x to 2.x updates limit the amount of data you can have in your application's `/data` folder to about 170MB (compressed). If you have more data, the update will fail and your device won't be modified.

## Running an update

To run an update for an individual device, navigate to that device's *Settings* tab, go to the section *OS version*, and select the version of {{ $names.os.lower }} you would like to update to. After making your selection, click the *Save* button.

![Update device](/img/common/updates/update-os.webp)

Updates can also be made to multiple devices in the same fleet. From the device list, click the checkbox to the left of any online devices you wish to update. Then use the *Modify* dropdown to choose the *OS version* option to set and trigger an update on all selected devices.

![Device group update](/img/common/updates/group-update.webp)

From the dialog box that opens, select the OS version you would like to update to and click the `Apply` button to trigger the OS update. 

![device group update, dialog box](/img/common/updates/group-update-dialog.webp)

__Note:__ Updates to the balena Supervisor, {{ $names.company.lower }}'s agent on the device, can be [triggered independently](/reference/supervisor/supervisor-upgrades).

After an update begins, the device summary page will show a progress bar that marks the steps completed for the update. Some steps that take longer, such as the device downloading the new OS image, may make the progress bar appear stuck. This doesn't mean anything has gone wrong with your update. We are working on making the update process more informative.

Update time can vary significantly, depending on the speed of your network, the speed of your SD card (or other storage medium), and your device performance.

If your {{ $names.os.lower }} update fails for any reason, the device should still be recoverable. For devices running {{ $names.os.lower }} 2.x, the user application should still be running normally, and the reasons for failure can be examined through the update logs at `/mnt/data/balenahup/` (or potentially the legacy location `/mnt/data/resinhup/`). If you have any issues, please contact us on the [troubleshooting section of the forums][troubleshooting].

## Update locks

[Update locks](https://docs.balena.io/learn/deploy/release-strategy/update-locking/) is a mechanism that allows applications to enter critical sections of code and prevent updates that would interrupt the application from running. Update locks can also be used to delay the reboot that applies a hostOS update operation until the application exits the critical section by removing the update locks. HostOS update operations require the use of exclusive locks and will not respect shared locks. [Overriding update locks](https://docs.balena.io/learn/deploy/release-strategy/update-locking/#overriding-the-lock) will ignore existing locks and allow a hostOS update process to proceed with a reboot.

Check out our [update process][update-process] to understand how the process goes through each step.

## balenaOS support policy

We have two release strategies, that you can use depending on your needs and subscription plan. This is our maintenance and support policy:

### Rolling Releases

- We only maintain the latest rolling release of balenaOS.
- When a new release is published, the previous version is no longer maintained.
- If you’re not on the latest version and need help, we recommend updating to the most recent release for compatibility and support.
- You can report issues on the latest rolling release; bug fixes, if any, will only be included in future rolling releases.
- We understand it’s not always possible to stay up to date. For this reason, we offer reasonable assistance to help unblock you on your current version. However, any identified bugs will only be resolved in the latest rolling release.

### Extended Support Releases (ESR)

- ESR provides stable balenaOS releases supported for 9 months, with quarterly updates to adopt new versions.
- Only high-risk security fixes and critical bug fixes are backported; no new features are added.
- Each ESR version follows a 3-phase lifecycle:
  - `Next-ESR` (6-9 months with active fixes).
  - `Current-ESR` (3-6 months).
  - `Sunset-ESR` (final 3 months).
- After 9 months, the ESR version reaches end-of-life (EOL), with no further updates.

For more details, visit our [Extended Support Release documentation](https://docs.balena.io/reference/OS/extended-support-release/).

<!-- links -->
[forums]:{{ $names.forums_domain }}/
[troubleshooting]:{{ $names.forums_domain }}/c/troubleshooting
[update-process]:/updates/update-process/
