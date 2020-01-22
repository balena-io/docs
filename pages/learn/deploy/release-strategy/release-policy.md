---
title: Release policy
excerpt: Manage the application and device release policy
---

# Release policy

When managing an application fleet, you may require devices to be running different releases. By default, applications follow a rolling release policy where new releases are deployed to all devices in the fleet once successfully built. However, you can customize this behavior, so the application fleet or individual devices remain on a fixed release by pinning them.

You may define the application and device release policy via the [{{ $names.cloud.lower }} dashboard]({{ $links.dashboardUrl }}) or programmatically through the [API][api] or [SDKs][sdk].

__Note:__ It is currently not possible to specify the application or device release policy via the {{ $names.cli.lower }}.

## Pin application to a release

In the Applications dashboard, there is a _Release policy_ header. By default, this policy is set to `track latest`, which means that new releases are immediately deployed to all devices in the application when built. Expanding this _Release policy_ dropdown menu displays all releases for the application, and you can select a specific release to pin the application to.  When the application is pinned, all devices are updated to run the pinned release, and in the future, releases will not be deployed until the _Release policy_ is updated to a newer release or set to `track latest`.

<img src="/img/common/release-policy/mNCaLF8.gif" width="100%" alt="Pin application to release">

## Pin device to a release

As well as pinning an application to a specific release, you may pin individual devices to a specific release. By default, all devices track the application release. However, you may wish to run a different release on select devices, for example, a development device or when performing a [canary deployment][canary].

To do so, from the Device dashboard, select the device menu and choose _Pin to release_.

<img src="/img/common/release-policy/obsIjdo.png" width="80%" alt="Pin device to release">

Selecting _Pin to release_ opens a modal window displaying a list of all successful application releases from which you can select a specific release to pin the device to.

<img src="/img/common/release-policy/T3Jy5l1.png" width="60%" alt="Pin to a specific device">

Once the device has updated, it is shown to be on a _Pinned_ release policy on the Application dashboard rather than following the release policy of the application.

<img src="/img/common/release-policy/SCESUYd.png" width="100%" alt="Device release policy">

You can also pin multiple devices to a target release in the Application dashboard by selecting them and choosing the _Pin to release_ option from the _Actions_ menu. Again this action opens a modal window allowing you to choose a specific release to pin the devices to.

<img src="/img/common/release-policy/HKAHHmS.png" width="80%" alt="Pin multiple devices">

Using [device tags][device-tags], you can quickly select a group of devices and pin them all to a specific release by [filtering by the device tag][device-filters] and choosing _Pin to release_ from the _Actions_ menu.

<img src="/img/common/release-policy/rdKoNe9.png" width="80%" alt="Using tags to pin multiple devices">

__Note:__ For more details about using the API to manage the release policy see the [Fleet Management Masterclass][masterclass].

[masterclass]:https://github.com/balena-io/balena-fleet-management-masterclass/blob/master/README.md#6-Release-Policy
[canary]:/learn/welcome/production-plan/#canary-deployments
[api]:/reference/api/overview/
[sdk]:/reference/sdk/node-sdk/
[device-tags]:/learn/manage/filters-tags/#device-tags
[device-filters]:/learn/manage/filters-tags/#device-filters
