---
title: Actions
---

# Actions

Actions allow you to control the status of your fleets and the devices that are part of it during runtime. Most actions can be applied in one of three ways:

1. Accessing the *Actions* tab from the fleet summary page allows you to make changes to the fleet in general, and to all the devices in that fleet.
2. The *Actions* menu on the device summary page lets you apply changes that only affect that one device.
3. To apply actions on a subset of devices, you can specify which devices will be affected by clicking the check boxes next to the devices in the devices list. When selected, use the *Actions* dropdown menu on the fleet summary page to apply the action on only the selected devices. This is helpful in case you use filters or a saved view to run action frequently on a subset of devices. 

## General actions

[Fleet members][fleet-members] with the Operator role and above can perform any of the actions listed below.

### Enable Public Device URL

{{ $names.company.upper }} currently exposes **port 80** for web forwarding. This setting enables web forwarding and generates a web accessible url for any applicable devices. The URLs will be of the form `<{{ $names.company.allCaps }}_DEVICE_UUID>.balena-devices.com`, where `<{{ $names.company.allCaps }}_DEVICE_UUID>` is the unique ID of the device which you can see on your dashboard. Currently only HTTP traffic (level 7 OSI traffic) is supported via the device URLs.

<img alt="Enable public device URL" src="/img/common/actions/device-public-url-enabled.png">

To see what your device is serving on port 80, click on the [public URL][public-url]. If no service inside your app is serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<img alt="Public URL error" src="/img/common/actions/public-url-error.png" width="80%">

You may also enable or disable public device URLs by clicking the _Public device URL_ toggle button on the device summary page.

<img alt="Public URL toggle" src="/img/common/actions/public-url-toggle.png" width="80%">

### Restart Fleet

The `Restart Fleet` action restarts the currently running **services** for all devices in your fleet. Your fleet's running containers will be removed and recreated from scratch. This behavior is intended and is different from running `balena restart [OPTIONS] CONTAINER [CONTAINER...]` in a host OS terminal instance from your dashboard, which will not remove your containers. If you are trying to persist data between container removals, see [persistent storage][persistent-storage] for strategies.

By removing containers and recreating them from scratch, we see benefits like the following:

- Containers are meant to be ephemeral, meaning that a new container should be a drop-in replacement for an old container with minimal to no impact. Removing and recreating containers adheres to this philosophy.

- Because containers are removed and recreated with the restart action, you're encouraged to follow best practices in Docker data persistence. For more information, see our [persistent storage][persistent-storage] documentation or [Docker's data persistence strategies][docker-data-persistence-strategies]. These strategies also offer a performance boost over storing files in the container's writable layer.

- Removing and recreating containers may allow recovery from release bugs where the container was stuck in an invalid state. For example, a process ID file that is no longer valid but is persisted to the container filesystem would be cleaned up when recreating the container.

When the containers are being restarted, the containers are politely asked to stop by sending a `SIGTERM`. If the containers haven't stopped after 10 seconds, a `SIGKILL` is sent.

__Note:__ During a restart any data that is not stored in `/data` will be lost.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ Restart device container is not equivalent to a reboot of the device!

### Purge Data

This action clears [persistent storage][persistent-storage] on any applicable devices. For devices running {{ $names.os.lower }} versions before 2.12.0, this means clearing the `/data` folder in the container (and the associated volume at `/mnt/data/resin-data`). On newer {{ $names.os.lower }} versions, this action deletes all named volumes and recreates them as empty.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Reboot

This action allows you to perform a reboot on your devices. This is different from the `Restart Fleet` action mentioned above. With this action, the entire device, including the kernel, will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Shutdown

The `Shutdown` action allows you to safely shut down your devices. It should be noted that once you trigger this action, there is no way for {{ $names.company.lower }} to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

## Device-specific actions

[Fleet members][fleet-members] with the Operator role and above can perform any of the actions listed below.

### Update Locking

In many uses cases devices are performing sensitive or critical functionality and are not able to pause to receive an update or restart the container. For this reason we added the [update lock functionality][update-locks] in the {{ $names.company.lower }} device supervisor. This allows your services to pick and choose when and where it would like to allow updates to happen.

Added to this functionality we provided a convenient button to override the lock on the device and essentially force an update. This is a precautionary measure for those times when your services crash and haven't released the update lock. This gives you a nice safety net to ensure you can always push new updates.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Move to Another Fleet

With the `Move Device` action it is possible to transfer a device from one fleet to another. This allows you incrementally rollout devices or move certain devices to specific branches of functionality. To move a device from one fleet to another, click the `Move to another fleet…` button and you will be presented with a list of compatible architecture fleets that you can move your device to.

Note that you are only able to move devices between fleets with device types that share the same architecture. For example, a Raspberry Pi 3 device could be moved to a BeagleBone Black fleet, but not to an Intel NUC fleet.

Obviously you may only select one fleet to transfer your device to. Once you select the appropriate radio button, your device will immediately appear in the selected fleet's device list. Note that it will take a while for the device to start the update process as it does not receive a push notification of a new code update from the API, so it has to wait for the update poll, which happens every couple of minutes.

__Warning:__ For devices running {{ $names.os.lower }} version 2.12.0 and above, data in [persistent storage][persistent-storage] (named volumes) is automatically purged when a device is moved to a new fleet. On older host OS versions, the `/data` folder in the new fleet will not contain any of the old fleet data, but it can still be accessed via the host OS and if the device is switched back to the original fleet. Unless you plan to revert back to the original fleet, be sure to [purge][purge-data] the `/data` folder.

To see a demonstration of moving devices between fleet and a little more on the motivation behind the feature have a look at our blog post: [Canary Rollouts with {{ $names.company.lower }}][move-app-blog-post]

### {{ $names.os.upper }} Update

This action allows you to remotely update the host OS running on your device. For more details on supported devices and the update process, check out our {{ $names.os.lower }} [update documentation][updates].

### Local Mode

Turning on local mode is useful when you are prototyping your services, as it allows you to push changes to your device over the local network without relying on the {{ $names.company.lower }} build pipeline. You can find more information in our [development guide][local-mode].

### Deactivate Device

This action will [deactivate the device][inactive-devices] and charge a one-time deactivation fee. To deactivate, the device must be offline, not be part of a Starter fleet, and be attached to a valid billing account.

### Delete Device

The `Delete Device` action is an extremely dangerous action and results in disassociating the device from the fleet and remote endpoint. Once you have deleted a device from the fleet it is not possible to reconnect to it unless you set it back up again. The device itself will continue to run the container and code you pushed most recently, but will never be able to receive new updates or commands from the {{ $names.company.lower }} dashboard or API.

### Grant Support Access

This action allows you to [enable support access][support-access] to an individual devices for a set time period.

### Change device type

If one or more devices has been added to a fleet with the wrong [device type](https://www.balena.io/docs/reference/hardware/versioning/#device-types), one can change the device-type for their devices through the dashboard. There are 2 ways to go about this,

Option 1: On the fleet’s device list, select one or more devices and click the `Actions` drop-down menu on the top right corner. Select `Change device type` option from the list and follow the instructions on the modal.

![Change the device type from the device list](/img/common/actions/change-device-type-device-list.png)

Option 2: On the device page, click `Actions` tab on the left sidebar menu. Scroll down to the `Dangerous actions` section and click `Change device type` after which follow the instructions on the modal to change your device-type.

![Change the device type from the device page](/img/common/actions/change-device-type-device-page.png)

__Warning:__ Only change the device type if a device was incorrectly provisioned. This does not make any changes to the OS running on the device.

## Fleet-specific actions

These actions can be found on the "Actions" menu for each fleet and apply to the fleet and all the devices in the fleet. [Fleet members][fleet-members] with the adminstrator role can perform any of the actions listed below.

### Change Fleet Type

This option allows you to convert your fleet to [another type][fleet-types], as long as the devices in the fleet meet the {{ $names.os.lower }} version requirements and your account has the appropriate privileges.

### Rename Fleet

This action allows you to rename your fleet. This action is only available for new [fleet types][fleet-types] such as `Starter`, `Microservices` or `Essentials`. It's not currently possible to rename `Legacy` or `Classic` fleets, you will first need to upgrade your fleet type.

### Enable/Disable All Public Device URLs

This action allows you to enable or disable all the device URLs for the devices in your fleet. Note that this will only apply to already provisioned devices in the fleet, any devices added after you enabled this fleet wide will need to have their device URL manually enabled.

You may also enable or disable public URLs for a subset of devices by selecting them on the fleet summary page and clicking  _Enable public device URL_ in the _Actions_ menu.

<img alt="Enable public device URLs for a fleet" src="/img/common/actions/application-public-urls.png">

### Transfer Fleet Ownership

Fleets with all their associated devices, releases and members can be transferred to any other balenaCloud [organization][organization]. Fleet transfers are between a **source** and a **target** organization.

Only organization [administrators][administrator] can initiate and complete fleet transfers. You must coordinate with one of the receiving organization's administrators to perform the following actions:

1. Take note of the fleet name in the **source** organization and your balenaCloud username (*in the top-right drop-down menu*).
2. Ask an administrator of the **target** balenaCloud organization to create a new empty fleet using the same fleet name (the [fleet type][fleet-types] doesn't need to match).
3. Ask the administrator of the **target** balenaCloud organization to [add you as a member][add-application-member] of the newly created fleet with a [`Developer`][developer] role, using your username. If you are an administrator of the **target** organization, you already have access to the new fleet & this step can be skipped.
4. In the **source** organization, select **<Fleet>** --> **Actions** --> **Transfer This Fleet** and pick the **target** organization from the list to complete the transfer.

__Note:__ If the **Transfer This Fleet** button is grayed out, ensure that you have created an empty fleet in the **target** organization with the same name as the source fleet, and that user that is transferring ownership of the fleet from the source organization has been added as a **Developer** to the **target** fleet.

Once the transfer of ownership has been completed, the source fleet owner will no longer be a member of the target fleet. If required, you will need to invite them to become a member of the fleet again. All other members of the source fleet will retain their membership of the target fleet once the transfer is complete.

During and after the transfer process, the devices state will remain unchanged from before the transfer process was started. For example, devices that were online before the process was started will remain online throughout.

### Grant Support Access

This action allows you to [enable support access][support-access] to the entire fleet for a set time period.

### Delete Fleet

This option permanently deletes your fleet.

__Warning:__ It is a good idea to [move your devices to another fleet][move-devices] before deleting your current fleet. If you do not, **all devices attached to the fleet will become orphaned and you will need to reconfigure them from scratch**. The most recent code deployment will continue to function as before, but the devices will not be able to receive code updates or device actions from {{ $names.company.lower }}.

[update-locks]:/learn/deploy/release-strategy/update-locking
[move-app-blog-post]:{{ $links.blogSiteUrl }}/canary-rollouts-on-resin-io/
[updates]:/reference/OS/updates/self-service
[local-mode]:/learn/develop/local-mode
[move-devices]:#move-to-another-application
[fleet-types]:/learn/manage/app-types
[persistent-storage]:/learn/develop/runtime/#persistent-storage
[purge-data]:#purge-data
[organization]:/learn/manage/organizations/
[administrator]:/learn/manage/organizations/#managing-roles--access-in-an-organization
[add-application-member]:/learn/manage/account/#add-an-application-member
[developer]:/learn/manage/account/#developer
[support-access]:/learn/manage/support-access
[inactive-devices]:/learn/manage/billing/#inactive-devices
[fleet-members]:/learn/manage/account/#fleet-members
[docker-data-persistence-strategies]:https://docs.docker.com/storage/
[public-url]:learn/develop/runtime/#public-device-urls
