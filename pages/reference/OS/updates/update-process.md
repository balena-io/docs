---
title: Update process details
excerpt: Details of the {{ $names.os.lower }} self-service update process
---

# {{ $names.company.upper }} host OS updates

With OTA (Over-the-Air) functionality built in, {{ $names.company.lower }} enables you to remotely update the entire host operating system (OS) on your device, rather than just the user application. {{ $names.company.upper }} provides two methods to perform Host OS Updates (HUP):

1. Standard HUP: The main mechanism for updating the hostOS, providing features such as automatic rollback and delta updates.

2. Advanced HUP: There are certain upgrade paths where Standard HUP is not compatible. This update mechanism is usually more involved and does not provide features such as automatic rollback and delta updates. Advanced HUP is usually used for certain specific scenarios and subsequent updates can then be done via Standard HUP. For example, the partition layout for NVIDIA JetPack 4-based {{ $names.os.lower }} differs from JetPack 5-based {{ $names.os.lower }}. If a device is running already running JetPack-4 {{ $names.os.lower }}, you can use Advanced HUP to update to a JetPack 5-based {{ $names.os.lower }}. Subsequent updates can be carried out using Standard HUP.

You cannot select the mechanism to be used for the update. Rather, {{ $names.company.lower }} determines the mechanism to be used based on the source OS version currently running on the device and the target OS version selected.

## Standard HUP

### Features

#### Atomic Updates
In general, host OS updates are meant to be atomic: if an update is run, it either finishes correctly or it fails and leaves the system in its previous, usable state. If deploying the new root file system is unsuccessful, the boot settings are not switched over to the new partition. This means the device can be rebooted with the previous OS version and no noticeable changes.

__Note:__ Once a host OS update is successful, it is not possible to roll back to a previous OS version (except via [automatic rollbacks](#automatic-rollbacks) as noted below).

#### Automatic Rollback
For failures related to the boot partition, the latest versions of {{ $names.os.lower }} have a rollback feature that will leave the partition in a good state.

#### Delta Updates and Bandwidth Efficiency
A delta update contains only the differences between the current OS and the new version. This reduces the amount of data that needs to be transferred and can significantly lower network costs and update times. 


### How it works
In the update process, an updater script gets transferred to the device to handle the update process, as described in detail below.

The first step the updater script performs includes a number of coherence checks, so that an update does not progress if something isn't right. The checks include, among other things, whether the device is running a {{ $names.os.lower }} version that it can work with, whether the script is running on the right device type, and whether it can reach the {{ $names.cloud.lower }} registry to get the target {{ $names.os.lower }} image.

Next, the supervisor is stopped so it does not inadvertently interfere with the update process. The user application is kept running to minimize downtime. The updater then attempts to locate the {{ $names.cloud.lower }} releases associated with the current & target OS versions to use deltas to reduce the over-the-wire size of the update. If a delta is not found or able to be created, the updater uses **{{ $names.engine.lower }}** to pull the new {{ $names.os.lower }} image directly from {{ $names.cloud.lower }}'s registry. Finally, if either the delta application fails or the registry pull fails, the updater falls back to Docker Hub. When the pull succeeds, the spare root partition is formatted and the contents of the image are exported onto that partition. The modifications to the boot partition are also applied. Not all files in the boot partition are updated though and some of them are kept back. These can vary depending on your OS version, but a current list can be found [here](https://github.com/balena-os/meta-balena/blob/master/meta-balena-common/recipes-support/hostapp-update-hooks/files/1-bootfiles).

The updater script checks to see if the new {{ $names.os.lower }} version ships with a newer supervisor version than what the device currently runs, and, if so, the supervisor is updated.

Finally, the boot settings are modified so that on the next reboot the new root file system is used. As a last step, the device is rebooted.

### Logging
A status of `OS update failed` means the user application should still be running normally, and the reasons for failure can be examined through the update logs at `/mnt/data/balenahup/` (or potentially the legacy location `/mnt/data/resinhup/`). The device may have some reduced functionality, for instance if the supervisor was stopped for the update, but we are working on ways to automatically restore full functionality whenever possible.

### Automatic rollbacks
Rollbacks is a framework designed to automatically roll back the OS update in case something goes wrong.

There are two rollback mechanisms in the OS, covering different update failure modes. One based on health checks called the `rollback-health`, and the recognizing if the new system is unbootable for some reason, the `rollback-altboot`. Learn more about [rollback mechanisms][rollback-mechanism].


## Advanced HUP
As mentioned above, Advanced HUP is usually required for certain very specific upgrade paths. The underlying reasons for incompatibility with Standard HUP can be, but not limited to:

1. Partition layout changes from one OS version to another. For example:
    
    -  The partition layout for NVIDIA JetPack 4-based {{ $names.os.lower }} differs from JetPack 5-based {{ $names.os.lower }}. If a device is running already running JetPack-4 {{ $names.os.lower }}, you can use Advanced HUP to update to a JetPack 5-based {{ $names.os.lower }}
    - {{ $names.company.upper }} releases a new version of an OS for a certain device type whereby the root partition has been increased to accommodate more kernel module and drivers
    -  {{ $names.company.upper }} releases a new version of an OS for a certain device type to include new functionality such as Secure Boot
2. Changing OS architecture, for example: 
    - Switching from a the 32-bit OS variant running on Raspberry Pi 3 to a 64-bit variant of {{ $names.os.lower }}

__Note:__ If you've used Advanced HUP, it does not mean necessarily updates won't be compatible with Standard HUP. For instance, if a device running 32-bit  {{ $names.os.lower }} on a Raspberry Pi 3 has been updated to a 64-bit variant of {{ $names.os.lower }}, Standard HUP can be used for future updates to the 64-bit OS. In this case, Advanced HUP is only used once to migrate the device from one OS architecture to another.

### Caveats
When using the Advanced HUP, it’s important to be aware of several limitations compared to the Standard HUP mechanism.

#### Data loss
Data loss may occur, as the process can involve overwriting partitions and filesystems. Please make sure to backup all data on the device before running any update. Also, after a successful update, all application containers will be downloaded again.

#### No automatic rollbacks
Advanced HUP does not provide a built-in rollback mechanism. If the new OS version proves unstable or introduces unexpected issues, there is no automated way to revert to a previous state. 

#### No delta updates
The OS image is downloaded directly via the ap. The registry and {{ $names.engine.lower }} is not used during the download process.

### How it works
Similar to Standard HUP, an updater script gets transferred to the device to handle the update process.

The first step the updater script performs includes a number of coherence checks, so that an update does not progress if something isn't right. The checks include, among other things, whether the device is running a {{ $names.os.lower }} version that it can work with, whether the script is running on the right device type, and whether it can reach the {{ $names.cloud.lower }} api to get the target {{ $names.os.lower }} image.

Next, the updater script downloads the required OS image from the api. This differs from Standard HUP whereby the OS image is downloaded from the registry and is the reason why Advanced HUP does not provide delta updates. The updater script then downloads the [takeover binary][takeover] which is responsible for the main update process.

The updater script hands over to `takeover` which:
- kills running processes
- copies required files and artifacts to RAM
- Unmounts partitions
- Flashes the target OS image to disk already running {{ $names.os.lower }}
- Transfers required files that were copied to RAM to their respective destinations on the newly flashed OS

The device is then rebooted.

You can read more about the tool [here](https://github.com/balena-os/takeover?tab=readme-ov-file#how-it-works).

__Note:__ Because the disk running {{ $names.os.lower }} is overwritten with the target OS image, there is no automated rollback mechanism when using Advanced HUP. However, if the process is interrupted before the disk is overwritten, the device is rebooted and it will boot into the OS that was already running.

### Logging
Logs for Advanced HUP can be found in `/mnt/data/balenahup`.

- The updater script will log to a file named `upgrade-takeover.<datetime>.log`
- The `takeover` binary will log to `advanced.<datetime>.log`

Depending on the outcome of the update process, one or both files may be present. Only `advanced.<datetime>.log` logs are copied to `/mnt/data/balenahup` after a successful update.



[changes]:/reference/OS/updates/migrate-to-2.0/
[wifi-connect]:{{ $links.githubOS }}/wifi-connect
[rollback-mechanism]:/reference/OS/updates/rollbacks/
[takeover]:https://github.com/balena-os/takeover
