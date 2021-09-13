---
title: Release policy
excerpt: Manage the fleet and device release policy
---

# Release policy

When managing a fleet, you may require devices to be running different releases. By default, fleets follow a rolling release policy where new releases are deployed to all devices in the fleet once successfully built. However, you can customize this behavior, so the fleet or individual devices remain on a fixed release, by utlizing release pinning.

You may define the fleet and device release policies via the [{{ $names.cloud.lower }} dashboard]({{ $links.dashboardUrl }}) or programmatically through the [API][api] or [SDKs][sdk].

__Note:__ It is currently not possible to specify the fleet or device release policy via the {{ $names.cli.lower }}.

## Pin fleet to a release

In the fleets dashboard summary, there is a _Releases_ header where you can manage the _Release policy_. By default, this policy is set to `track latest`, which means that new releases are immediately deployed to all devices in the fleet when built. Expanding this dropdown menu displays all releases for the fleet, and you can select a specific release to pin the fleet to.  When the fleet is pinned, all devices are updated to run the pinned release, and in the future, releases will not be deployed until the _Release policy_ is updated to a newer release or set to `track latest`.

<img src="/img/common/release-policy/U95dXrS.png" width="100%" alt="Pin fleet to release">

## Pin device to a release

As well as pinning a fleet to a specific release, you may pin individual devices to a specific release. By default, all devices track the fleet release. However, you may wish to run a different release on select devices, for example, a development device or when performing a [canary deployment][canary].

To do so, from the Device dashboard, select the device menu and choose _Pin to release_.

<img src="/img/common/release-policy/obsIjdo.png" width="80%" alt="Pin device to release">

Selecting _Pin to release_ opens a modal window displaying a list of all successful releases from which you can select a specific release to pin the device to.

<img src="/img/common/release-policy/T3Jy5l1.png" width="60%" alt="Pin to a specific device">

Once the device has updated, it is shown to be on a _Pinned_ release policy on the fleet dashboard rather than following the release policy of the fleet.

<img src="/img/common/release-policy/SCESUYd.png" width="100%" alt="Device release policy">

You can also pin multiple devices to a target release in the fleet dashboard by selecting them and choosing the _Pin to release_ option from the _Actions_ menu. Again this action opens a modal window allowing you to choose a specific release to pin the devices to.

<img src="/img/common/release-policy/HKAHHmS.png" width="80%" alt="Pin multiple devices">

Using [device tags][device-tags], you can quickly select a group of devices and pin them all to a specific release by [filtering by the device tag][device-filters] and choosing _Pin to release_ from the _Actions_ menu.

<img src="/img/common/release-policy/rdKoNe9.png" width="80%" alt="Using tags to pin multiple devices">

__Note:__ For more details about using the API to manage the release policy see the [Fleet Management Masterclass][masterclass].

[masterclass]:/learn/more/masterclasses/fleet-management/#6-release-policy
[canary]:/learn/welcome/production-plan/#canary-deployments
[api]:/reference/api/overview/
[sdk]:/reference/sdk/node-sdk/
[device-tags]:/learn/manage/filters-tags/#device-tags
[device-filters]:/learn/manage/filters-tags/#device-filters
