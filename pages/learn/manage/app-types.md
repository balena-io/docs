---
title: Fleet types
---

# Fleet types

When you create a fleet, in addition to selecting a Device Type, you must select a Fleet Type:

<img src="/img/common/app/create_app.png" width="80%">

The type of fleet defines the capabilities of the devices provisioned to that fleet and is tied closely to the [pricing plan][pricing].

## New fleets

The three available fleet types for new fleets are:

### Starter

Starter fleets, available for free to all users, are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url] for each of your devices. You are limited to ten devices across all starter fleets.

__Note:__ Inactive devices **do count** against your starter fleet device limit.

### Microservices

Microservices fleets, like starter fleets, are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url], and are available to all paid plans.

### Essentials

Essentials fleets allow you to run a single container and do not permit public device URLs. Like microservices fleets, they are only available to paid plans.

__Note:__ All devices in starter, microservices, and essentials fleets must run {{ $names.os.lower }} v2.12.0 or higher. If you do not have the option to choose one of these fleet types, the selected device type does not yet have a high enough {{ $names.os.lower }} version available. A [classic][classic] fleet type will be assigned by default.

## Classic and legacy fleets

The classic and legacy fleet types allow for fleets that don't meet the requirements for new fleet types. Classic fleets support devices with {{ $names.os.lower }} v2.0.3 and above, and legacy fleets support all earlier {{ $names.os.lower }} versions. Classic fleets use Docker Registry V2, whereas legacy fleets use the slower and less reliable Registry V1.

While it is possible to provision new devices to these fleets, it is not possible to create new legacy fleets, and new classic fleets can only be created for device types that do not yet have {{ $names.os.lower }} v2.12.0 or higher available. It is important to note that you cannot run multiple containers with these fleet types. However, for supported device types, you can convert a classic or legacy fleet to a microservices or essentials fleet, as described below.

## Convert between fleet types

Existing fleets can be converted to any of the types available for new fleets, as long as all devices belonging to that fleet meet the OS version requirements, and the account has appropriate privileges. Users can convert any fleet to classic if they have an existing classic or legacy fleet, and to legacy, if they have an existing legacy fleet.

To convert your fleet, first be sure all devices meet the {{ $names.os.lower }} version requirements for the desired fleet type, [updating][update] if necessary. Then, from the fleet summary page, click *Settings*, followed by *Change Fleet Type*. A dialog will appear with the available fleet types:

<img src="/img/common/app/change-app-type.png" width="80%">

Select the fleet type you would like to convert to. If your fleet cannot be converted to the selected type, you will see an error message at the top of the *Settings* page.

## Changing fleet types after upgrading to a paid plan

If you've upgraded to a paid plan, the ten-device limit on Starter fleets will still apply. In order to add more than ten devices after upgrading, you will either need to create new Microservices or Essentials fleets, or convert your Starter fleet to a Microservices or Essentials fleet. 

[pricing]:{{ $links.mainSiteUrl }}/pricing/
[multicontainer]:/learn/develop/multicontainer
[public-url]:/learn/manage/actions/#enable-public-device-url
[update]:/reference/OS/updates/self-service
[classic]:#classic-and-legacy-fleets
