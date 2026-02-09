---
title: Actions and Settings
---

# Actions and Settings

Actions and Settings allow you to control the status of your fleets and the devices that are part of it during runtime. Most operations can be applied in one of three ways:

1. Accessing the _Settings_ tab from the fleet summary page allows you to make changes to the fleet in general, and to all the devices in that fleet.
2. The _Actions_ or _Settings_ menu on the device summary page lets you apply changes that only affect that one device.
3. To apply operations on a subset of devices, you can specify which devices will be affected by clicking the check boxes next to the devices in the devices list. When selected, use the _Modify_ dropdown menu on the devices list to apply the operation on only the selected devices. This is helpful in case you use filters or a saved view to run operations frequently on a subset of devices.

## Device actions

[Fleet members](../accounts/fleet-members.md) with the Operator role and above can perform any of the actions or settings listed below.

### Restart Services

The `Restart Services` action restarts the currently running **services** for all devices in your fleet. Your fleet's running containers will be removed and recreated from scratch. This behavior is intended and is different from running `balena restart [OPTIONS] CONTAINER [CONTAINER...]` in a host OS terminal instance from your dashboard, which will not remove your containers. If you are trying to persist data between container removals, see [persistent storage](../develop/runtime.md#persistent-storage) for strategies.

By removing containers and recreating them from scratch, we see benefits like the following:

* Containers are meant to be ephemeral, meaning that a new container should be a drop-in replacement for an old container with minimal to no impact. Removing and recreating containers adheres to this philosophy.
* Because containers are removed and recreated with the restart action, you're encouraged to follow best practices in Docker data persistence. For more information, see our [persistent storage](../develop/runtime.md) documentation or [Docker's data persistence strategies](https://docs.docker.com/storage/). These strategies also offer a performance boost over storing files in the container's writable layer.
* Removing and recreating containers may allow recovery from release bugs where the container was stuck in an invalid state. For example, a process ID file that is no longer valid but is persisted to the container filesystem would be cleaned up when recreating the container.

When the containers are being restarted, the containers are politely asked to stop by sending a `SIGTERM`. If the containers haven't stopped after 10 seconds, a `SIGKILL` is sent.

{% hint style="warning" %}
During a restart any data that is not stored in `/data` will be lost.
{% endhint %}

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

{% hint style="danger" %}
Restart device container is not equivalent to a reboot of the device!
{% endhint %}

### Purge Data

This action clears [persistent storage](../develop/runtime.md#persistent-storage) on any applicable devices. For devices running balenaOS versions before 2.12.0, this means clearing the `/data` folder in the container (and the associated volume at `/mnt/data/resin-data`). On newer balenaOS versions, this action deletes all named volumes and recreates them as empty.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

{% hint style="danger" %}
This action is only supported on devices with an Agent version >= 1.1.0
{% endhint %}

### Reboot

This action allows you to perform a reboot on your devices. This is different from the `Restart Services` action mentioned above. With this action, the entire device, including the kernel, will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

{% hint style="danger" %}
This action is only supported on devices with an Agent version >= 1.1.0
{% endhint %}

### Shutdown

The `Shutdown` action allows you to safely shut down your devices. It should be noted that once you trigger this action, there is no way for balena to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible

{% hint style="danger" %}
This action is only supported on devices with an Agent version >= 1.1.0
{% endhint %}

### Delete Device

The `Delete Device` action is an extremely dangerous action and results in disassociating the device from the fleet and remote endpoint. Once you have deleted a device from the fleet it is not possible to reconnect to it unless you set it back up again. The device itself will continue to run the container and code you pushed most recently, but will never be able to receive new updates or commands from the balena dashboard or API.

## Device settings

[Fleet members](../accounts/fleet-members.md) with the Operator role and above can perform any of the actions listed below.

### Public Device URL

Balena currently exposes **port 80** for web forwarding. This setting enables web forwarding and generates a web accessible url for any applicable devices. The URLs will be of the form `<BALENA_DEVICE_UUID>.balena-devices.com`, where `<BALENA_DEVICE_UUID>` is the unique ID of the device which you can see on your dashboard. Currently only HTTP traffic (level 7 OSI traffic) is supported via the device URLs.

The Public Device URL feature is a tool for remote configuration, debugging, and other intermittent or periodic use cases. The feature is built on [Cloudlink](../welcome/security.md#cloudlink) and not designed for high availability. We do not recommend using the Public Device URL feature for continuous use as part of your application.

For applications that require a stable, continuously available public endpoint, we recommend using a dedicated tunneling service designed for production use. Popular services include [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel/) (See our [blog post](https://www.balena.io/blog/expose-your-balena-device-to-the-internet-with-cloudflare-tunnel/), [Tailscale](https://tailscale.com/) and [Ngrok](https://ngrok.com/).

<figure><img src="../../.gitbook/assets/toggle-public-url (1).webp" alt=""><figcaption></figcaption></figure>

To see what your device is serving on port 80, click on the [public URL](../develop/runtime.md#public-device-urls). If no service inside your app is serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<figure><img src="../../.gitbook/assets/public-url-error (1).webp" alt=""><figcaption></figcaption></figure>

You may also enable or disable public device URLs by clicking the _Public device URL_ toggle button on the device summary page.

<figure><img src="../../.gitbook/assets/public-url-toggle (1).webp" alt=""><figcaption></figcaption></figure>

### Move device to another Fleet

With the `Fleet` setting it is possible to transfer a device from one fleet to another. This allows you to incrementally rollout devices or move certain devices to specific branches of functionality. To move a device from one fleet to another, click the `Fleet` dropdown on the Device Settings page and you will be presented with a list of compatible architecture fleets that you can move your device to.

Note that you are only able to move devices between fleets with device types that share the same architecture. For example, a Raspberry Pi 3 device could be moved to a BeagleBone Black fleet, but not to an Intel NUC fleet.

Obviously you may only select one fleet to transfer your device to. Once you select the appropriate radio button, your device will immediately appear in the selected fleet's device list. Note that it will take a while for the device to start the update process as it does not receive a push notification of a new code update from the API, so it has to wait for the update poll, which happens every couple of minutes.

{% hint style="danger" %}
For devices running balenaOS version 2.12.0 and above, data in [persistent storage](../develop/runtime.md#persistent-storage) (named volumes) is automatically purged when a device is moved to a new fleet. On older host OS versions, the `/data` folder in the new fleet will not contain any of the old fleet data, but it can still be accessed via the host OS and if the device is switched back to the original fleet. Unless you plan to revert back to the original fleet, be sure to [purge](actions.md#purge-data) the `/data` folder.
{% endhint %}

### BalenaOS Update

This setting allows you to remotely update the host OS running on your device. For more details on supported devices and the update process, check out our balenaOS [update documentation](../../reference/OS/updates/self-service.md).

### Local Mode

Turning on local mode is useful when you are prototyping your services, as it allows you to push changes to your device over the local network without relying on the balena build pipeline. You can find more information in our [development guide](../develop/local-mode.md).

### Deactivate Device

This setting will [deactivate the device](../accounts/billing.md#inactive-devices) and charge a one-time deactivation fee (equivalent to the cost of a single undiscounted device-month) that is not covered by your plan's allowance. To deactivate, the device must be offline and be attached to a valid billing account.

Once the device is deactivated, the device won't be counted towards your device total. It will remain inactive until it comes back online.

### Grant Support Access

This setting allows you to [enable support access](../accounts/support-access.md) for one or more devices for a set time period.

## Fleet/Block/App settings

These settings can be found on the "Settings" menu for each fleet and apply to the fleet and all the devices in the fleet. [Fleet members](../accounts/fleet-members.md) with the administrator role can perform any of the settings listed below.

### Change Fleet Type

This option allows you to convert your fleet to [another type](../accounts/fleet-types.md), as long as the devices in the fleet meet the balenaOS version requirements and your account has the appropriate privileges.

### Rename Fleet

This operation allows you to rename your fleet. This operation is only available `Microservices` and `Essentials` [fleet types](../accounts/fleet-types.md). It's not currently possible to rename `Legacy` or `Classic` fleets, you will first need to upgrade your fleet type.

### Transfer Fleet Ownership

Fleets with all their associated devices, releases and members can be transferred to any other balenaCloud [organization](../accounts/organizations.md). Upon transfer, your fleet ID and UUID will remain the same, fleet history will be maintained, and you will be able to roll back to a prior release.

Fleet transfers are between a **source** and a **target** organization. If you are transferring a **source** fleet from a [paid plan to a free plan](https://www.balena.io/pricing/) and your fleet exceeds the device limit, your fleet will be frozen until a plan is purchased for the **target** organization.

Only organization [administrators](../accounts/organizations.md#managing-roles-and-access-in-an-organization)can initiate and complete fleet transfers. You must coordinate with one of the receiving organization's administrators to perform the following actions:

1. Take note of the fleet name in the **source** organization and your balenaCloud username (_in the top-right drop-down menu_).
2. Ask an administrator of the **target** balenaCloud organization to create a new empty fleet using the same fleet name (the [fleet type](../accounts/fleet-types.md) doesn't need to match).
3. Ask the administrator of the **target** balenaCloud organization to [add you as a member](../accounts/fleet-members.md#add-a-fleet-member) of the newly created fleet with a [`Developer`](../accounts/fleet-members.md#developer) role, using your username. If you are an administrator of the **target** organization, you already have access to the new fleet & this step can be skipped.
4. In the **source** organization, select --> **Settings** --> **Set this fleet's ownership** and pick the **target** organization from the list to complete the transfer.

{% hint style="warning" %}
If the **Set this fleet's ownership** button is grayed out, ensure that you have created an empty fleet in the **target** organization with the same name as the source fleet, and that the user that is transferring ownership of the fleet from the source organization has been added as a **Developer** to the **target** fleet.
{% endhint %}

Once the transfer of ownership has been completed, the source fleet owner will no longer be a member of the target fleet. If required, you will need to invite them to become a member of the fleet again. All other members of the source fleet will retain their membership of the target fleet once the transfer is complete.

During and after the transfer process, the devices state will remain unchanged from before the transfer process was started. For example, devices that were online before the process was started will remain online throughout.

### Transfer Block Ownership

Blocks with all their associated releases and members can be transferred to any other balenaCloud [organization](../accounts/organizations.md). Block transfers are between a **source** and a **target** organization.

Only organization [administrators](../accounts/organizations.md#managing-roles-and-access-in-an-organization) can initiate and complete block transfers. You must coordinate with one of the receiving organization's administrators to perform the following actions:

1. Take note of the block name in the **source** organization and your balenaCloud username (_in the top-right drop-down menu_).
2. Ask an administrator of the **target** balenaCloud organization to create a new empty block using the same block name.
3. Ask the administrator of the **target** balenaCloud organization to [add you as a member](../accounts/fleet-members.md#add-a-fleet-member) of the newly created block with a [`Developer`](../accounts/fleet-members.md#developer) role, using your username. If you are an administrator of the **target** organization, you already have access to the new block & this step can be skipped.
4. In the **source** organization, select --> **Settings** --> **Set this block's ownership** and pick the **target** organization from the list to complete the transfer.

{% hint style="warning" %}
If the **Set this block's ownership** button is grayed out, ensure that you have created an empty block in the **target** organization with the same name as the source block, and that user that is transferring ownership of the block from the source organization has been added as a **Developer** to the **target** block.
{% endhint %}

Once the transfer of ownership has been completed, the source block owner will no longer be a member of the target block. If required, you will need to invite them to become a member of the block again. All other members of the source block will retain their membership of the target block once the transfer is complete.

### Delete Fleet

This option permanently deletes your fleet.

{% hint style="danger" %}
**Warning:** It is a good idea to [move your devices to another fleet](actions.md#move-device-to-another-fleet) before deleting your current fleet. If you do not, **all devices attached to the fleet will become orphaned and you will need to reconfigure them from scratch**. The most recent code deployment will continue to function as before, but the devices will not be able to receive code updates or device operations from balena.
{% endhint %}

## Release settings

These settings can be found on the "Settings" menu for each release.

### Validation Status

This option can be used to mark your release as valid or invalid. Entities can only be pinned to valid releases. If you invalidate a release, any devices that are running it and are not pinned to it will be updated to the fleet's target release. If an entity is pinned to a release when it is invalidated, it will not be affected. If you wish to allow pinning to the release again, you could re-validate it via this same setting.

### Delete Release

This option permanently deletes your release. This may be the setting you want to use if you want to clean up releases beyond simply [invalidating releases](actions.md#validation-status).

**Info:** If you have a device [preloaded](/broken/pages/tAdmS7VhfWwHTNcoKQDc#id-5.-preloading-and-preregistering) with an OS version lower than 2.113.14 and a release, and you delete the release before provisioning the device, then when the device provisions it will be in a VPN-only state. To fix this, you must update the supervisor on the device to version 14.9.4 or higher.
