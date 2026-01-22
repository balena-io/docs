---
title: Update process details
excerpt: Details of the balenaOS self-service update process
---

# What happens during a balena host OS update?

The ability to remotely update the entire host operating system (OS) of your device, rather than just the user application, is a core feature of balena. Performing updates may feel like an opaque process, so we thought it would be useful to break it down.

**Note:** Once a host OS update is successful, it is not possible to roll back to a previous OS version (except via [automatic rollbacks](#automatic-rollbacks) as noted below).

In general, host OS updates are meant to be atomic: if an update is run, it either finishes correctly or it fails and leaves the system in its previous, usable state. If deploying the new root file system is unsuccessful, the boot settings are not switched over to the new partition. This means the device can be rebooted with the previous OS version and no noticeable changes. For failures related to the boot partition, the latest versions of balenaOS have a rollback feature that will leave the partition in a good state. In the update process, an updater script gets transferred to the device to handle the update process, as described in detail below.

## Upgrading between balenaOS 2.x versions

The first step the updater script performs includes a number of coherence checks, so that an update does not progress if something isn't right. The checks include, among other things, whether the device is running a balenaOS version that it can work with (i.e., not on 1.x), whether the script is running on the right device type, and whether it can reach the {{ $names.cloud.lower }} registry to get the target balenaOS image.

Next, the supervisor is stopped so it does not inadvertently interfere with the update process. The user application is kept running to minimize downtime. The updater then attempts to locate the {{ $names.cloud.lower }} releases associated with the current & target OS versions to use deltas to reduce the over-the-wire size of the update. If a delta is not found or able to be created, the updater uses **balenaEngine** to pull the new balenaOS image directly from {{ $names.cloud.lower }}'s registry. Finally, if either the delta application fails or the registry pull fails, the updater falls back to Docker Hub. When the pull succeeds, the spare root partition is formatted and the contents of the image are exported onto that partition. The modifications to the boot partition are also applied. Not all files in the boot partition are updated though and some of them are kept back. These can vary depending on your OS version, but a current list can be found [here](https://github.com/balena-os/meta-balena/blob/master/meta-balena-common/recipes-support/hostapp-update-hooks/files/1-bootfiles).

The updater script checks to see if the new balenaOS version ships with a newer supervisor version than what the device currently runs, and, if so, the supervisor is updated.

Finally, the boot settings are modified so that on the next reboot the new root file system is used. As a last step, the device is rebooted.

For devices running balenaOS 2.x, a status of `OS update failed` means the user application should still be running normally, and the reasons for failure can be examined through the update logs at `/mnt/data/balenahup/` (or potentially the legacy location `/mnt/data/resinhup/`). The device may have some reduced functionality, for instance if the supervisor was stopped for the update, but we are working on ways to automatically restore full functionality whenever possible.

## Automatic rollbacks

Rollbacks is a framework designed to automatically roll back the OS update in case something goes wrong.

There are two rollback mechanisms in the OS, covering different update failure modes. One based on health checks called the `rollback-health`, and the recognizing if the new system is unbootable for some reason, the `rollback-altboot`. Learn more about [rollback mechanisms][rollback-mechanism].

[changes]: /reference/OS/updates/migrate-to-2.0/

[wifi-connect]:{{ $links.githubOS }}/wifi-connect
[rollback-mechanism]:/reference/OS/updates/rollbacks/
