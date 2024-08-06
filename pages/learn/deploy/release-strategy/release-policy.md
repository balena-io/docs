---
title: Release policy
excerpt: Manage the fleet and device release policy
---

# Release policy

When managing a fleet, you may require devices to be running different releases. By default, fleets follow a rolling release policy where new releases are deployed to all devices in the fleet once successfully built. However, you can customize this behavior, so the fleet or individual devices remain on a fixed release, by utilizing release pinning.

You may define the fleet and device release policies via the [{{ $names.cloud.lower }} dashboard]({{ $links.dashboardUrl }}) or programmatically through the [API][api], [SDKs][sdk], or [CLI][cli].

## Pin fleet to a release

By default, the setting is set to `track latest`, which means that new releases are immediately deployed to all devices in the fleet when built. When the fleet is pinned, all devices that are not currently pinned to a release are updated to run the pinned release, and in the future, releases will not be deployed until the pinned release is updated to a different release or set to `track latest`.

You can set the release the fleet is pinned to via the Releases card on the on the Fleet Summary page. 

<img src="/img/common/release-policy/releases_card_dropdown.webp" width="100%" alt="Pin fleet to release from Releases card">

This can also be achieved using the `Pin to release` setting on the Fleet settings page.

<img src="/img/common/release-policy/pin_to_release_setting.webp" width="100%" alt="Pin fleet to release setting">

The dropdown menu at each of the above locations displays all successful and valid releases for the fleet. 

You can also pin a fleet to a release via the CLI as follows:
- Pin to a specific release: `balena fleet pin <FLEET_SLUG> <RELEASE_COMMIT>`
- Track latest: `balena fleet track-latest <FLEET_SLUG>`

## Pin device to a release

By default, all devices track the fleet release. However, you may wish to run a different release on select devices, for example, a development device or when performing a [canary deployment][canary].

There are several ways to achieve this from the Device dashboard. The dropdown options are identical to the ones when trying to pin the fleet to a release:

- On the Devices page, you can select one or more devices using the checkboxes present on the table. Next, open the `Modify` menu and select the `Pin to release` option.

<img src="/img/common/release-policy/devices_table_modify.webp" width="100%">

- Alternatively, on hovering over the `Target release` property in the Device summary page, you will see a pencil icon appear. This can be used to pin the release as well.

<img src="/img/common/release-policy/device_target_release_pencil.webp" width="100%">

- Lastly, the Settings page of a device also has the option to pin the release.

<img src="/img/common/release-policy/device_settings.webp" width="100%">

Once the device has been pinned to a release and updated, its `Target release` column updates to the pinned release. It will show a pin, rather than just showing the release targetted by the fleet. The `Release policy` column also updates to say `Pinned`.

<img src="/img/common/release-policy/target_release_pin.webp" width="100%" alt="Device release policy">

You can also pin a device to a release via the CLI as follows:
- Pin to a specific release: `balena device pin <DEVICE_UUID> <RELEASE_COMMIT>`
- Track latest: `balena device track-fleet <DEVICE_UUID>`

__Note:__ For more details about using the API to manage the release policy see the [Fleet Management Masterclass][masterclass].

[masterclass]:/learn/more/masterclasses/fleet-management/#6-release-policy
[canary]:/learn/welcome/production-plan/#canary-deployments
[api]:/reference/api/overview/
[sdk]:/reference/sdk/node-sdk/
[cli]:/reference/balena-cli/
