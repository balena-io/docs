---
title: Fleet types
---

# Fleet Types

Microservices fleets are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url].

__Note:__ As of March 2023, balena has removed the concept of fleet types, effectively enforcing that all future fleets are of type Microservices. There are still customers with essentials, classic, and legacy fleet types so we'll keep the following docs for posterity. While it is possible to provision new devices to existing essentials, legacy, and classic fleets, it is not possible to create new fleets of these types.

## Essentials, Classic, and Legacy (sunset)

Essentials, classic, and legacy fleets allow you to run a single container and do not permit public device URLs. The classic and legacy fleet types allow for fleets that don't meet the requirements for new fleet types. Classic fleets support devices with {{ $names.os.lower }} v2.0.3 and above, and legacy fleets support all earlier {{ $names.os.lower }} versions. Classic fleets use Docker Registry V2, whereas legacy fleets use the slower and less reliable Registry V1. New classic fleets can only be created for device types that do not yet have {{ $names.os.lower }} v2.12.0 or higher available. However, for supported device types, you can convert an essentials, classic, and legacy fleet to a microservices fleet, as described below.

__Note:__ All devices microservice and essentials fleets must run {{ $names.os.lower }} v2.12.0 or higher. If you do not have the option to choose one of these fleet types, the selected device type does not yet have a high enough {{ $names.os.lower }} version available. A classic fleet type will be assigned by default.

## Converting to Microservices

Existing fleets can be converted to Microservices, as long as all devices belonging to that fleet meet the OS version requirements, and the account has appropriate privileges.

To convert your fleet, first be sure all devices meet the {{ $names.os.lower }} version requirements for the desired fleet type, [updating][update] if necessary. Then, from the fleet summary page, click *Settings*, and scroll down to the *Fleet type* section. Select the fleet type you would like to convert to from the dropdown. If your fleet cannot be converted to the selected type, you will see it marked as unavailable.

[pricing]:{{ $links.mainSiteUrl }}/pricing/
[multicontainer]:/learn/develop/multicontainer
[public-url]:/learn/manage/actions/#enable-public-device-url
[update]:/reference/OS/updates/self-service
