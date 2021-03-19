---
title: Application types
---

# Application types

When you create an application, in addition to selecting a Device Type, you must select an Application Type:

<img src="/img/common/app/create_app.png" width="80%">

The type of application defines the capabilities of the devices provisioned to that application and is tied closely to the [pricing plans][pricing].

## New applications

The three available application types for new applications are:

### Starter

Starter applications, available for free to all users, are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url] for each of your devices. You are limited to ten devices across all starter applications.

### Microservices

Microservices applications, like starter applications, are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url], and are available to all paid plans.

### Essentials

Essentials applications allow you to run a single container and do not permit public device URLs. Like microservices applications, they are only available to paid plans.

__Note:__ All devices in starter, microservices, and essentials applications must run {{ $names.os.lower }} v2.12.0 or higher. If you do not have the option to choose one of these application types, the selected device type does not yet have a high enough {{ $names.os.lower }} version available. A [classic][classic] application type will be assigned by default.

## Classic and legacy applications

The classic and legacy application types allow for applications that don't meet the requirements for new applications. Classic applications support devices with {{ $names.os.lower }} v2.0.3 and above, and legacy applications support all earlier {{ $names.os.lower }} versions. Classic applications use Docker Registry V2, whereas legacy applications use the slower and less reliable Registry V1.

While it is possible to provision new devices to these applications, it is not possible to create new legacy applications, and new classic applications can only be created for device types that do not yet have {{ $names.os.lower }} v2.12.0 or higher available. It is important to note that you cannot run multiple containers with these application types. However, for supported device types, you can convert a classic or legacy application to a microservices or essentials application, as described below.

## Convert between application types

Existing applications can be converted to any of the types available for new applications, as long as all devices belonging to that application meet the OS version requirements, and the account has appropriate privileges. Users can convert any application to classic if they have an existing classic or legacy application, and to legacy, if they have an existing legacy application.

To convert your application, first be sure all devices meet the {{ $names.os.lower }} version requirements for the desired application type, [updating][update] if necessary. Then, from the application summary page, click *Actions*, followed by *Change Application Type*. A dialog will appear with the available application types:

<img src="/img/common/app/change-app-type.png" width="80%">

Select the application type you would like to convert to. If your application cannot be converted to the selected type, you will see an error message at the top of the *Actions* page.

## Changing application types after upgrading to a paid plan

If you've upgraded to a paid plan, the ten-device limit on Starter applications will still apply. In order to add more than ten devices after upgrading, you will either need to create new Microservices or Essentials applications, or convert your Starter application to a Microservices or Essentials application. 

[pricing]:{{ $links.mainSiteUrl }}/pricing/
[multicontainer]:/learn/develop/multicontainer
[public-url]:/learn/manage/actions/#enable-public-device-url
[update]:/reference/OS/updates/self-service
[classic]:#classic-and-legacy-applications
