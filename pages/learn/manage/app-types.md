---
title: Application types
---

# Application types

When you first create an application, in addition to selecting a Device Type, you'll be asked to select an Application Type:

<img src="/img/common/app/app-type.png" width="40%">

The type of an application defines the capabilities of the devices provisioned to that application and is tied closely to [pricing plans][pricing].

## New applications

The three available application types for new applications are:

### Starter

Starter applications, available for free to all users, are full-featured, allowing you to run [multiple containers][multicontainer] and set up a [public URL][public-url] for each of your devices. You are limited to ten devices across all starter applications.

### Microservices

Microservices applications, like starter applications, are full-featured, and are available to all paid plans.

### Essentials

Essentials applications allow you to run a single container and do not permit public device URLs. Like microservices applications, they are only available to paid plans. 

The prototype and pilot pricing plans include 20 and 50 full-featured (microservices) devices, respectively. You can choose any combination of microservices and essentials devices within those limits, with no price difference until you scale up to a production plan. At the production level, 100 devices are included, with additional devices available for $1.50 for the microservices type, and $1 for the essentials type.

__Note:__ All devices provisioned to new applications must run resinOS v2.12.0 or higher.


## Classic and legacy applications

The classic and legacy application types allow for pre-existing applications that don't meet the requirements for new applications. Classic applications support devices with resinOS v2.0.3 and above, and legacy applications support all earlier resinOS versions. Classic applications use Docker Registry V2, whereas legacy applications use the slower and less reliable Registry V1.

While it is possible to provision new devices to these applications, it is not possible to create new classic and legacy applications. It is also not possible to run multiple containers with these application types. You can, however, convert a classic or legacy application to a microservices or essentials application, as described below.

## Convert between application types

Existing applications can be converted to any of the types available for new applications, as long as all devices belonging to that application meet the OS version requirements and the account has appropriate privileges. Paid users with at least one classic or legacy application can also convert applications of any type to classic.

To convert your application, first be sure all devices meet the resinOS version requirements for the desired application type, [updating][update] if necessary. Then, from the application summary page, click *Actions*, followed by *Change Application Type*. A dialog will appear with the available application types:

<img src="/img/common/app/change-app-type.png" width="60%">

Select the application type you would like to convert to. If your application cannot be converted to the selected type, you will see an error message at the top of the *Actions* page.

[pricing]:https://resin.io/pricing/
[multicontainer]:/learn/develop/multicontainer
[public-url]:/learn/manage/actions/#enable-public-device-url
[update]:/reference/resinOS/updates/self-service
