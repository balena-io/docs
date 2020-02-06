---
title: Extended Support Release Process
excerpt: An overview of the {{ $names.company.lower }} extended support release process
---
# Extended Support Release (ESR) process

__Note:__ This feature is only available on [Production and Enterprise plans][billing].

The {{ $names.os.lower }} Extended Support Release (ESR) process allows fleet owners to update the host OS on their devices at most twice a year to ensure they are on a supported version. New ESR versions are released on a three-month schedule, and as such, fleet owners know in advance when releases will be available and when they need to upgrade.

Each ESR release is supported for nine months from the time of release. A supported ESR version implies that high-risk security vulnerabilities and critical bug fixes will be backported to that version. Backports of any functional enhancements are not in scope.

## ESR schedule

Three lines of ESR versions are supported, known as _next_, _current_, and _sunset_. Every three months, a new ESR version is released, and each line will transition forward at that time as illustrated on the following diagram:

![ESR schedule](/img/common/esr-process.png)

ESR versions are named by year and month `yyyy.mm` and contain a patch version number starting at 0. So, `2019.10.4` would be the fifth release of the `2019.10` ESR version. Since ESR versions will only receive backports for high-risk security vulnerabilities and critical bug fixes, new releases during the lifecycle of an ESR version will only increment the patch number.

For example, an ESR version is released known as `2019.10`, which becomes the _next-ESR_. In three months, a new ESR version, i.e., `2020.01`, becomes the _next-ESR_ line, while `2019.10` transitions to become the _current-ESR_. Similarly, three months after that, there is a new ESR version, and `2019.10` becomes the _sunset-ESR_. Three months later and nine months after release, the `2019.10` ESR version will reach its end-of-life, and no further updates will be offered, and users should update to one of the supported releases to receive future updates by performing a [self-service update][self-service-updates].

## Using an ESR host OS version

### Adding a new device

For new devices, if you are on a Production or Enterprise plan with a [supported device type](#supported-devices), when you add a new device, you will be given the option to _Select OS type_ which defaults to _{{$names.os.lower}} ESR_. If you would like a non-ESR version, expand this dropdown and select _{{$names.os.lower}}_ for the host OS type.

<img src="/img/common/esr-new-device.png" alt="Add new ESR device" width="80%">

Next, select the ESR version as either _next_, _current_, or _sunset_ if available. The _next_ version is selected by default and offers at least six months (and up to nine months) of critical backports and fixes.

### Host OS update

For those users on a Production or Enterprise plan with an existing [supported device](#supported-devices), you can update to an ESR version via a [self-serve update][self-service-updates]. You should select the _{{$names.os.lower}} ESR_ host OS type and your chosen ESR version.

__Note:__ Once updated to an ESR version, it is not possible to update from an ESR host OS version to a non-ESR one.

## Supported devices

ESR host OS versions are currently available for the following devices with additional device support planned:

* Raspberry Pi (v1 and Zero)
* Raspberry Pi 3
* Raspberry Pi 4
* Beaglebone
* Balena Fin
* Intel NUC
* Nvidia Jetson TX2

[self-service-updates]:/reference/OS/updates/self-service/#running-an-update
[billing]:{{ $links.mainSiteUrl }}/pricing/
