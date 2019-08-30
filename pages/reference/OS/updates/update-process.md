---
title: Update process details
excerpt: Details of the {{ $names.os.lower }} self-service update process
---

# What happens during a {{ $names.company.lower }} host OS update?

The ability to remotely update the entire host operating system (OS) of your device, rather than just the user application, is a core feature of {{ $names.company.lower }}. Performing updates may feel like an opaque process, so we thought it would be useful to break it down.

__Note:__ Once a successful host OS update has been made, it is not possible to roll back to a previous OS version.

In general, host OS updates are meant to be atomic: if an update is run, it either finishes correctly or it fails and leaves the system in its previous, usable state. If deploying the new root file system is unsuccessful, the boot settings are not switched over to the new parition. This means the device can be rebooted with the previous OS version and no noticable changes. For failures related to the boot partition, the latest versions of {{ $names.os.lower }} have a rollback feature that will the leave the partition in a good state.

Since {{ $names.os.lower }} 1.x and 2.x behave somewhat differently in how they manage updates, we'll examine the three main use cases. In all three cases, an updater script gets transferred to the device to handle the update process, as described in detail below.

## Upgrading between {{ $names.os.lower }} 2.x versions

The first step the updater script performs includes a number of sanity checks, so that an update does not progress if something isn't right. The checks include, among other things, whether the device is running a {{ $names.os.lower }} version that it can work with (i.e., not on 1.x), whether the script is running on the right device type, whether it can reach the **DockerHub** registry to get the target {{ $names.os.lower }} image, and whether that image exists.

Next, the supervisor is stopped so it does not inadvertently interfere with the update process. The user application is kept running to minimize downtime. The updater then uses **{{ $names.engine.lower }}** to pull the new {{ $names.os.lower }} image. When the pull succeeds, the spare root partition is formatted and the contents of the image are exported onto that partition. The modifications to the boot partition are also applied.

The updater script checks to see if the new {{ $names.os.lower }} version ships with a newer supervisor version than what the device currently runs, and, if so, the supervisor is updated.

Finally, the boot settings are modified so that on the next reboot the new root file system is used. As a last step, the device is rebooted.

For devices running {{ $names.os.lower }} 2.x, a status of `OS update failed` means the user application should still be running normally, and the reasons for failure can be examined throught the update logs at `/mnt/data/resinhup/`. The device may have some reduced functionality, for instance if the supervisor was stopped for the update, but we are working on ways to automatically restore full functionality whenever possible.

## Upgrading from {{ $names.os.lower }} 1.x to 2.x

There are quite a few [changes between {{ $names.os.lower }} 1.x and 2.x][changes], which makes this type of update the most complex of the three. The main differences that the updater has to account for are a different partition layout, a different **Docker** file system, and the switch from **ConnMan** to **NetworkManager**.

As mentioned above, the updater script starts with a number of cross-checks, the most important being whether the OS is running from the main or the secondary root partition. The latter would happen if the device has already been updated between 1.x versions. If it's running from the secondary root partition, as a first step the script stops the user application, switches to read only mode, copies over the data to the main partition, switches the boot settings, and reboots the device to run from the main partition. It is then ready to retry the update process.

After the checks are run, both the supervisor and the user application are stopped and the containers and images are removed.

Next, the script downloads a couple of binary tools that are not present in 1.x systems but are required for the transition (mainly tools handling the ext4 file system).

The contents of the `resin-data` folder, where the contents of your application’s `/data` folder are stored, are backed up on the secondary root partition temporarily. This limits the amount of data that can be backed up automatically to about 170MB (compressed). If there's more data than this, the update process will stop, but the device hasn't been materially modified yet.

Next, the device’s file system is modified to match the setup required by {{ $names.os.lower }} 2.x. **Docker** is then restarted and pulls a new {{ $names.os.lower }} image, which is exported into a compressed archive. Finally, the new rootfs is populated, and `resin-data` is restored.


The WiFi settings are then migrated from the 1.x setup (in `config.json`) to the 2.x setup (as **NetworkManager** files). The migration also tries to create configurations from any [**WiFi Connect**][wifi-connect] settings found.

The boot settings are switched so that the next time the device boots, it will do so from the {{ $names.os.lower }} 2.x system. The supervisor version is checked, and if the target {{ $names.os.lower }} version has a newer supervisor, then the device is marked for a supervisor update as well.

Finally, the device is rebooted. On the first boot it will necessarily come online without any **Docker** images (as the update process needed to remove the images). So when the device starts, it will first redownload the required supervisor, which then redownloads the user application. After this all the heavy lifting is done you should have a brand new {{ $names.os.lower }} 2.x device, with all the improvements from its former life as a 1.x device.

## Upgrading between {{ $names.os.lower }} 1.x versions

The process for upgrading between 1.x versions mirrors the process used for 2.x versions, though the tooling is somewhat different.

The updater script first does a couple of cross-checks, stops the supervisor and user containers, and if everything looks okay, starts by checking if any supervisor updates are needed.

Then a `resinhup` **Docker** image is pulled, which contains all the tools and the secondary Python updater scripts for the main migration. Since the {{ $names.os.lower }} 1.x root filesystem is read-write, the `resinhup` updater scripts start with a fingerprint check to see if any files have been modified. If there have been any modifications, it will stop the update as not to unexpectedly overwrite any modifications.

If the fingerprint check succeeds, the updater will use **Docker** to pull the target {{ $names.os.lower }} image and export the relevant contents onto the spare root partition and the boot partition. Next, the updater runs any required data migrations (for example, to account for any changes to the location and contents of the `config.json` file). As a final step, this Python-based updater will switch the boot settings, so that next time the device boots, it will boot from the updated system.

From here, the original updater script takes back control, and finishes up any other changes required by the update. When all this is done, the device is rebooted into the new system.

[changes]:/reference/OS/updates/migrate-to-2.0/
[wifi-connect]:{{ $links.githubMain }}/wifi-connect
