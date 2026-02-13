---
title: Release policy
excerpt: Manage the fleet and device release policy
---

# Release policy

When managing a fleet, you may require devices to be running different releases. By default, fleets follow a rolling release policy where new releases are deployed to all devices in the fleet once successfully built. However, you can customize this behavior, so the fleet or individual devices remain on a fixed release, by utilizing release pinning.

You may define the fleet and device release policies via the [balenaCloud dashboard](https://dashboard.balena-cloud.com/) or programmatically through the [API](../../../reference/api/overview.md), [SDKs](../../../../external-docs/sdk/node-sdk/latest.md), or [CLI](../../../../external-docs/balena-cli/latest.md).

## Pin fleet to a release

By default, the setting is set to `track latest`, which means that new releases are immediately deployed to all devices in the fleet when built. When the fleet is pinned, all devices that are not currently pinned to a release are updated to run the pinned release, and in the future, releases will not be deployed until the pinned release is updated to a different release or set to `track latest`.

You can set the release the fleet is pinned to via the Releases card on the on the Fleet Summary page.

<figure><img src="../../../../summary/.gitbook/assets/releases_card_dropdown (2).webp" alt=""><figcaption></figcaption></figure>

This can also be achieved using the `Pin to release` setting on the Fleet settings page.

<figure><img src="../../../../summary/.gitbook/assets/pin_to_release_setting (2).webp" alt=""><figcaption></figcaption></figure>

The dropdown menu at each of the above locations displays all successful and valid releases for the fleet.

You can also pin a fleet to a release via the CLI as follows:

* Pin to a specific release: `balena fleet pin <FLEET_SLUG> <RELEASE_COMMIT>`
* Track latest: `balena fleet track-latest <FLEET_SLUG>`

## Pin device to a release

By default, all devices track the fleet release. However, you may wish to run a different release on select devices, for example, a development device or when performing a [canary deployment](../../welcome/production-plan.md#canary-deployments).

There are several ways to achieve this from the Device dashboard. The dropdown options are identical to the ones when trying to pin the fleet to a release:

* On the Devices page, you can select one or more devices using the checkboxes present on the table. Next, open the `Modify` menu and select the `Pin to release` option.

<figure><img src="../../../../summary/.gitbook/assets/devices_table_modify (2).webp" alt=""><figcaption></figcaption></figure>

* Alternatively, on hovering over the `Target release` property in the Device summary page, you will see a pencil icon appear. This can be used to pin the release as well.

<figure><img src="../../../../summary/.gitbook/assets/device_target_release_pencil (2).webp" alt=""><figcaption></figcaption></figure>

* Lastly, the Settings page of a device also has the option to pin the release.

<figure><img src="../../../../summary/.gitbook/assets/device_settings (2).webp" alt=""><figcaption></figcaption></figure>

Once the device has been pinned to a release and updated, its `Target release` column updates to the pinned release. It will show a pin, rather than just showing the release targetted by the fleet. The `Release policy` column also updates to say `Pinned`.

<figure><img src="../../../../summary/.gitbook/assets/target_release_pin (2).webp" alt=""><figcaption></figcaption></figure>

You can also pin a device to a release via the CLI as follows:

* Pin to a specific release: `balena device pin <DEVICE_UUID> <RELEASE_COMMIT>`
* Track latest: `balena device track-fleet <DEVICE_UUID>`

{% hint style="warning" %}
For more details about using the API to manage the release policy see the [Fleet Management Masterclass](../../../../external-docs/masterclasses/fleet-management.md).
{% endhint %}
