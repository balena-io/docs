---
title: Extended Support Release Process
excerpt: An overview of the {{ $names.company.lower }} extended support release process
extras: esr-devices-js
---

# Extended Support Release (ESR) process

**Note:** This feature is only available on \[Production and Enterprise plans]\[billing].

The \{{ $names.os.lower \}} Extended Support Release (ESR) process allows fleet owners to update to a new ESR version on their devices at most twice a year to ensure they are on a supported version. New ESR versions are released on a three-month schedule, and as such, fleet owners know in advance when releases will be available and when they need to upgrade.

Each ESR release is supported for nine months from the time of release. A supported ESR version implies that high-risk security vulnerabilities and critical bug fixes will be backported to that version, and are guaranteed not to break the interface. Backports of any functional enhancements are not in scope.

## ESR schedule

Three lines of ESR versions are supported, known as _next_, _current_, and _sunset_. Every three months, a new ESR version is released, and each line will transition forward at that time as illustrated on the following diagram:

ESR versions are named by year and month `yyyy.m` and contain a patch version number starting at 0. So, `2022.1.4` would be the fifth release of the `2022.1` ESR version. Since ESR versions will only receive backports for high-risk security vulnerabilities and critical bug fixes, new releases during the lifecycle of an ESR version will only increment the patch number.

For example, an ESR version is released known as `2022.10`, which becomes the _next-ESR_. In three months, a new ESR version, i.e., `2023.1`, becomes the _next-ESR_ line, while `2022.10` transitions to become the _current-ESR_. Similarly, three months after that, there is a new ESR version, and `2022.10` becomes the _sunset-ESR_. Three months later and nine months after release, the `2022.10` ESR version will reach its end-of-life, and no further updates will be offered, and users should update to one of the supported releases to receive future updates by performing a [self-service update](../../../reference/OS/updates/self-service/#running-an-update).

## Using an ESR host OS version

### Adding a new device

For new devices, if you are on a Production or Enterprise plan with a [supported device type](extended-support-release.md#supported-devices), when you add a new device, you will be given the option to _Select OS type_ which defaults to _\{{$names.os.lower\}} ESR_. If you would like a non-ESR version, expand this dropdown and select _\{{$names.os.lower\}}_ for the host OS type.



Next, select the ESR version as either _next_, _current_, or _sunset_ if available. The _next_ version is selected by default and offers at least six months (and up to nine months) of critical backports and fixes.

### Host OS update

For those users on a Production or Enterprise plan with an existing [supported device](extended-support-release.md#supported-devices), you can update to an ESR version via a [self-serve update](../../../reference/OS/updates/self-service/#running-an-update). You should select the _\{{$names.os.lower\}} ESR_ host OS type and your chosen ESR version.

**Note:** Once updated to an ESR version, it is not possible to update from an ESR host OS version to a non-ESR one.

## Supported devices

All device types are eligible for ESR, however they require a dedicated build and release pipeline so support needs to be requested via our \[support channels]\(\{{ $links.mainSiteUrl \}}/support).

ESR host OS versions are currently available for the following devices:

|   | Device Name | Machine Name | Architecture |
| - | ----------- | ------------ | ------------ |

\[billing]:\{{ $links.mainSiteUrl \}}/pricing/
