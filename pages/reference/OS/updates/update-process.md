---
title: Update process details
excerpt: Details of the {{ $names.os.lower }} self-service update process
---

# {{ $names.company.upper }} host OS updates

With OTA updates (Over-the-Air) functionality built-in, {{ $names.os.lower }} enables you to remotely update the host operating system on your device, apart from the user application. {{ $names.os.upper }} provides two methods to perform host OS Updates (also, called HUP):

1. Standard HUP: The main mechanism for updating the hostOS, providing features such as [automatic rollbacks](#automatic-rollbacks) and [delta updates](#delta-updates-and-bandwidth-efficiency).

2. Advanced HUP: Standard HUP can be incompatible with certain upgrade paths. For these specific scenarios, we have the advanced HUP method to update devices. An example scenario would be updating from NVIDIA JetPack 4-based {{ $names.os.lower }}  to JetPack 5-based {{ $names.os.lower }}. This scenario would need advanced HUP for the update method due to a difference in partition layout. After the advanced HUP, the next updates can be carried out using the standard HUP process.

The method used to perform the host OS update doesn't need to be selected. Rather, {{ $names.company.lower }} determines the method to be used automatically. This is based on the current OS version running on the device and the target OS version selected.

## Standard HUP
Standard HUP is the main update mechanism used for updating the hostOS.

### How it works
After a host OS update (HUP) is triggered, an updater script gets transferred to the device from the backend to handle the update process. The updater script performs a number of coherence checks, so an update does not progress if something isn't right. The checks include, among other things, whether the device is running a {{ $names.os.lower }} version that it can work with, whether the script is running on the right device type, and whether it can reach the {{ $names.cloud.lower }} registry to get the target {{ $names.os.lower }} image.

Next, the supervisor is stopped so it does not inadvertently interfere with the update process. The user application is kept running to minimize downtime. The updater then attempts to locate the {{ $names.cloud.lower }} releases associated with the current & target OS versions to use deltas to reduce the over-the-wire size of the update. If a delta is not found or able to be created, the updater uses **{{ $names.engine.lower }}** to pull the new {{ $names.os.lower }} image directly from {{ $names.cloud.lower }}'s registry. Finally, if either the delta application fails or the registry pull fails, the updater falls back to Docker Hub. When the pull succeeds, the spare root partition is formatted and the contents of the image are exported onto that partition. The modifications to the boot partition are also applied. Not all files in the boot partition are updated though and some of them are kept back. These can vary depending on your OS version, but a current list can be found [here](https://github.com/balena-os/meta-balena/blob/master/meta-balena-common/recipes-support/hostapp-update-hooks/files/1-bootfiles).

The updater script checks to see if the new {{ $names.os.lower }} version ships with a newer supervisor version than what the device currently runs, and, if so, the supervisor is updated.

Finally, the boot settings are modified so that on the next reboot the new root file system is used. As a last step, the device is rebooted.

### Features

#### Atomic Updates
In general, host OS updates are meant to be atomic: if an update is run, it either finishes correctly or it fails and leaves the system in its previous, usable state. If deploying the new root file system is unsuccessful, the boot settings are not switched over to the new partition. This means the device can be rebooted with the previous OS version and no noticeable changes.

__Note:__ Once a host OS update is successful, it is not possible to roll back to a previous OS version.

#### Automatic Rollbacks
For failures related to the boot partition, the latest versions of {{ $names.os.lower }} have a rollback feature that will leave the partition in a good state.
There are two rollback mechanisms in the OS, covering different update failure modes. One based on health checks called the `rollback-health`, and the recognizing if the new system is unbootable for some reason, the `rollback-altboot`. Learn more about [rollback mechanisms][rollback-mechanism].

#### Delta Updates and Bandwidth Efficiency
A delta update contains only the differences between the current OS and the new version. This reduces the amount of data that needs to be transferred and can significantly lower network costs and update times. 


### Logging
A status of `OS update failed` means the user application should still be running normally, and the reasons for failure can be examined through the update logs at `/mnt/data/balenahup/` (or potentially the legacy location `/mnt/data/resinhup/`). The device may have some reduced functionality, for instance if the supervisor was stopped for the update, but we are working on ways to automatically restore full functionality whenever possible.

## Advanced HUP
Advanced HUP is only required for certain upgrade paths. The underlying reasons for incompatibility with standard HUP can be, but not limited to:

1. Partition layout changes from one OS version to another. For example:
    
    -  The partition layout for NVIDIA JetPack 4-based {{ $names.os.lower }} differs from JetPack 5-based {{ $names.os.lower }}. If a device is running already running JetPack-4 {{ $names.os.lower }}, you can use advanced HUP to update to a JetPack 5-based {{ $names.os.lower }}.
    - {{ $names.company.upper }} releases a new version of an OS for a certain device type whereby the root partition has been increased to accommodate more kernel module and drivers.
    -  {{ $names.company.upper }} releases a new version of an OS for a certain device type to include new functionality such as Secure Boot.
2. Changing OS architecture, for example: 
    - Switching from the 32-bit OS variant running on Raspberry Pi 3 to a 64-bit variant of {{ $names.os.lower }}.

__Note:__ If you've used advanced HUP, it does not necessarily mean that future updates won't be compatible with standard HUP. 

### Caveats
When using advanced HUP, it’s important to be aware of several limitations compared to the standard HUP mechanism.

- **Data loss**: Data loss may occur, as the process can involve overwriting partitions and filesystems. Always confirm that important data has been backed up before an advanced update. Also, after a successful update, all application containers will be downloaded again.

- **No automatic rollbacks**: Advanced update does not provide a built-in rollback mechanism, so it is inherently less safe than Standard update. Operational issues on a particular device may interfere with the update, so you also may wish to run device health checks beforehand. We also strongly recommend testing on a similar lab device before deploying to field devices. 

- **No delta updates**: The OS image is downloaded directly via the API. The registry and {{ $names.engine.lower }} is not used during the download process.

### How it works

The first step the updater script performs includes a number of coherence checks, so that an update does not progress if something isn't right. The checks include, among other things, whether the device is running a {{ $names.os.lower }} version that it can work with, whether the script is running on the right device type, and whether it can reach the {{ $names.cloud.lower }} api to get the target {{ $names.os.lower }} image.

Next, the updater script downloads the required OS image from the api. This differs from standard HUP whereby the OS image is downloaded from the registry and is the reason why advanced HUP does not provide delta updates. The updater script then downloads the advanced update executable, known as [takeover][takeover], which performs the update.

The updater script hands over to `takeover` which:
- Kills running processes
- Copies required files and artifacts to RAM
- Unmounts partitions
- Flashes the target OS image to disk already running {{ $names.os.lower }}
- Transfers required files that were copied to RAM to their respective destinations on the newly flashed OS

The device is then rebooted.

Learn more about the [takeover][takeover] tool and [how it works](https://github.com/balena-os/takeover?tab=readme-ov-file#how-it-works).

__Note:__ Since the disk running {{ $names.os.lower }} is overwritten with the target OS image during advanced HUP, there is no automated rollback mechanism. However, if the process was interrupted before the disk was overwritten, the device reboots into the OS that was already running.

### Logging
Logs for advanced HUP can be found in `/mnt/data/balenahup`.

- The updater script will log to a file named `upgrade-takeover.<datetime>.log`
- The `takeover` binary will log to `advanced.<datetime>.log`

Depending on the outcome of the update process, one or both files may be present. Only `advanced.<datetime>.log` logs are copied to `/mnt/data/balenahup` after a successful update.



[changes]:/reference/OS/updates/migrate-to-2.0/
[wifi-connect]:{{ $links.githubOS }}/wifi-connect
[rollback-mechanism]:/reference/OS/updates/rollbacks/
[takeover]:https://github.com/balena-os/takeover
