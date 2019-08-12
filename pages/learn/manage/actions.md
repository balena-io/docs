---
title: Actions
---

# Actions

Actions allow you to control the status of your applications and devices during runtime. Most actions can be applied in one of three ways:

1. Accessing the *Actions* menu from the left side of the application summary page allows you to make changes to the application in general, and to all the devices in that application.
2. The *Actions* menu on the device summary page lets you apply changes that only affect that one device.
3. *Group Actions*, found at the top-right of the application summary page, are applied to a subset of the devices in your fleet. You can specify which devices will be affected by clicking the check boxes on the left of the device list. If you apply any filters or a saved view, clicking the check box at the top of the device list will select only the devices that appear in the list. If no filters are applied, this check box will select all devices in the application.

## General actions

### Enable Public Device URL

{{ $names.company.upper }} currently exposes **port 80** for web forwarding. This setting enables web forwarding and generates a web accessible url for any applicable devices. The URLs will be of the form `<{{ $names.company.allCaps }}_DEVICE_UUID>.balena-devices.com`, where `<{{ $names.company.allCaps }}_DEVICE_UUID>` is the unique ID of the device which you can see on your dashboard. Currently only HTTP traffic (level 7 OSI traffic) is supported via the device URLs.

<img src="/img/common/enable-public-URLs.png" width="80%">

To see what your device is serving on port 80, just click on the URL. If your application is not serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<img src="/img/common/device/device_url_404.png" width="80%">

### Restart Application

The `Restart Application` action restarts the currently running **application containers**. Your application (A.K.A it's running containers) will be shutdown and restarted from scratch.

When the containers are stopped, the application is politely asked to stop by sending a `SIGTERM` and after 10 seconds of wait time a `SIGKILL` is sent.

__Note:__ During a restart any data that is not stored in `/data` will be lost.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ Restart device container is not equivalent to a reboot of the device!

### Purge Data

This action clears [persistent storage][persistent-storage] on any applicable devices. For devices running {{ $names.os.lower }} versions before 2.12.0, this means clearing the `/data` folder in the container (and the associated volume at `/mnt/data/resin-data`). On newer {{ $names.os.lower }} versions, this action deletes all named volumes and recreates them as empty.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Reboot

This action allows you to perform a reboot on your devices This is different from the `Restart Application` action mentioned above—with this action, the entire device, including the kernel, will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Shutdown

The `Shutdown` action allows you to safely shut down your devices. It should be noted that once you trigger this action, there is no way for {{ $names.company.lower }} to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

## Device-specific actions

### Update Locking

In many uses cases devices are performing sensitive or critical functionality and are not able to pause to receive an update or restart the container. For this reason we added the [update lock functionality][update-locks] in the {{ $names.company.lower }} device supervisor. This allows your application to pick and choose when and where it would like to allow updates to happen.

Added to this functionality we provided a convenient button to override the lock on the device and essentially force an update. This is a precautionary measure for those times when your application crashes and hasn't released the update lock. This gives you a nice safety net to ensure you can always push new updates.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Move to Another Application

With the `Move Device` action it is possible to transfer a device from one application to another. This allows you incrementally rollout devices or move certain devices to specific branches of functionality. To move a device from one application to another, simply click the `Move to another application…` button and you will be presented with a list of applications that you can move your device to.

Note that you are only able to move devices between applications with device types that share the same architecture. For example, a Raspberry Pi 3 device could be moved to a BeagleBone Black application, but not to an Intel NUC application.

Obviously you may only select one application to transfer your device to. Once you select the appropriate radio button, your device will immediately appear in the selected application's device list. Note that it will take a while for the device to start the update process as it does not receive a push notification of a new code update from the API, so it has to wait for the update poll, which happens every couple of minutes.

__Warning:__ For devices running {{ $names.os.lower }} version 2.12.0 and above, data in [persistent storage][persistent-storage] (named volumes) is automatically purged when a device is moved to a new application. On older host OS versions, the `/data` folder in the new application will not contain any of the old application data, but it can still be accessed via the host OS and if the device is switched back to the original application. Unless you plan to revert back to the original application, be sure to [purge][purge-data] the `/data` folder.

To see a demonstration of moving devices between applications and a little more on the motivation behind the feature have a look at our blog post: [Canary Rollouts with {{ $names.company.lower }}][move-app-blog-post]

### {{ $names.os.upper }} Update

This action allows you to remotely update the host OS running on your device. For more details on supported devices and the update process, check out our {{ $names.os.lower }} [update documentation][updates].

### Local Mode

Turning on local mode is useful when you are prototyping your application, as it allows you to push changes to your device over the local network without relying on the {{ $names.company.lower }} build pipeline. You can find more information in our [development guide][local-mode].

### Delete Device

The `Delete Device` action is an extremely dangerous action and results in disassociating the device from the application and remote endpoint. Once you have deleted a device from the application it is not possible to reconnect to it unless you set it back up again. The device itself will continue to run the container and code you pushed most recently, but will never be able to receive new updates or commands from the {{ $names.company.lower }} dashboard or API.

## Application-specific actions

These actions can be found on the "Actions" menu for each application and apply to the application and all the devices in the fleet.

### Change Application Type

This option allows you to convert your application to [another type][app-types], as long as the devices in the application meet the {{ $names.os.lower }} version requirements and your account has the appropriate privileges.

### Rename Application

This action allows you to rename your application. This action is only available for new [applications types][app-types] such as `Starter`, `Microservices` or `Essentials`. Its not currently possible to rename `Legacy` or `Classic` applications, you will first need to upgrade your app type.

### Enable/Disable All Public Device URLs

This action allows you to enable or disable all the device URLs for the devices in your application. Note that this will only apply to already provisioned devices in the app, any devices added after you enable this fleet wide will need to have their device URL manually enabled.

### Transfer Application Ownership

You can transfer application ownership between balenaCloud user accounts. In order to transfer application ownership, you will need to perform a series of steps using both the **source** account and **target** account.

1. Take note of the Application name and balenaCloud username (*in the top-right drop-down*) in the **source** account
2. In the **target** balenaCloud account, create a new balenaCloud Application using the same Application name
3. In the **Members** of the Application you just created, add the **source** balenaCloud username as a **Developer**
4. In the **source** balenaCloud account, select **<Application>** --> **Actions** --> **Transfer This Application**

**NOTE**: If the **Transfer This Application** button is greyed out, ensure that you have created an empty Application in the **target** balenaCloud account with the same name as the source Application, and that the **source** username has been added as a **Developer** to the **target** Application.

You can watch [this video](https://www.youtube.com/watch?v=nkYve7PwqmE) to learn how to transfer application ownership.

### Grant Support Access to Application

This action will allow you to give our balena engineering team access to the entire application fleet for a set time period.

<img src="/img/common/app/support_access.png" width="80%">

### Delete Application

This option permanently deletes your application.

__Warning:__ It is a good idea to [move your devices to another application][move-devices] before deleting your current application. If you do not, **all devices attached to the application will become orphaned and you will need to reconfigure them from scratch**. The most recent code deployment will continue to function as before, but the devices will not be able to receive code updates or device actions from {{ $names.company.lower }}.

[update-locks]:/learn/deploy/release-strategy/update-locking
[move-app-blog-post]:{{ $links.blogSiteUrl }}/canary-rollouts-on-resin-io/
[updates]:/reference/OS/updates/self-service
[local-mode]:/learn/develop/local-mode
[move-devices]:#move-to-another-application
[app-types]:/learn/manage/app-types
[persistent-storage]:/learn/develop/runtime/#persistent-storage
[purge-data]:#purge-data
