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

Resin.io currently exposes **port 80** for web forwarding. This setting enables web forwarding and generates a web accessible url for any applicable devices. The URLs will be of the form `<RESIN_DEVICE_UUID>.resindevice.io`, where `<RESIN_DEVICE_UUID>` is the unique ID of the device which you can see on your dashboard.

<img src="/img/screenshots/device-url-new.png" width="80%">

To see what your device is serving on port 80, just click on the URL. If your application is not serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<img src="/img/common/device/device_url_404.png" width="80%">

### Restart Application

The `Restart Application` action restarts the currently running **application containers**. Your application (A.K.A it's running containers) will be shutdown and restarted from scratch.

When the containers are stopped, the application is politely asked to stop by sending a `SIGTERM` and after 10 seconds of wait time a `SIGKILL` is sent.

__Note:__ During a restart any data that is not stored in `/data` will be lost.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ Restart device container is not equivalent to a reboot of the device!

### Purge Data

This action clears [persistent storage][persistent-storage] on any applicable devices. For devices running resinOS versions before 2.12.0, this means clearing the `/data` folder in the container (and the associated volume at `/mnt/data/resin-data`). On newer resinOS versions, this action deletes all named volumes and recreates them as empty.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Reboot

This action allows you to perform a reboot on your devices This is different from the `Restart Application` action mentioned above—with this action, the entire device, including the kernel, will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Shutdown

The `Shutdown` action allows you to safely shut down your devices. It should be noted that once you trigger this action, there is no way for resin.io to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

## Device-specific actions

### Update Locking

In many uses cases devices are performing sensitive or critical functionality and are not able to pause to receive an update or restart the container. For this reason we added the [update lock functionality][update-locks] in the resin.io device supervisor. This allows your application to pick and choose when and where it would like to allow updates to happen.

Added to this functionality we provided a convenient button to override the lock on the device and essentially force an update. This is a precautionary measure for those times when your application crashes and hasn't released the update lock. This gives you a nice safety net to ensure you can always push new updates.  

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Move to Another Application

With the `Move Device` action it is possible to transfer a device from one application to another. This allows you incrementally rollout devices or move certain devices to specific branches of functionality. To move a device from one application to another, simply click the `Move to another application…` button and you will be presented with a list of applications that you can move your device to.

Note that currently you are only able to move devices between applications of the same device type. For example, in the screenshot below, I can only move the "little-brook" device to the list of `raspberry pi 1` applications. It is not possible to move it to an application with a device type of Raspberry pi 2 or Beaglebone.

<!-- TODO: screenshot doesn't match the text above -->
<img src="/img/common/device/device_action_move_app.png" width="80%">

Obviously you may only select one application to transfer your device to. Once you select the appropriate radio button, your device will immediately appear in the selected application's device list. Note that it will take a while for the device to start the update process as it does not receive a push notification of a new code update from the API, so it has to wait for the update poll, which happens every couple of minutes.

__Note:__ When moving between applications, the data stored in `/data` will persist, but will not be accessible to the new application. However, upon switching back to the original application, the `/data` store will be available once more. It is recommended that if one does not intend on reverting back to the original application, then a purge of `/data` is needed.

To see a demonstration of moving devices between applications and a little more on the motivation behind the feature have a look at our blog post: [Canary Rollouts with resin.io][move-app-blog-post]

### ResinOS Update

This action allows you to remotely update the host OS running on your device. For more details on supported devices and the update process, check out our resinOS [update documentation][updates].

### Local Mode

Turning on local mode is useful when you are prototyping your application, as it allows you to push changes to your device over the local network without relying on the resin.io build pipeline. You can find more information in our [development guide][local-mode].

### Delete Device

The `Delete Device` action is an extremely dangerous action and results in disassociating the device from the application and remote endpoint. Once you have deleted a device from the application it is not possible to reconnect to it unless you set it back up again. The device itself will continue to run the container and code you pushed most recently, but will never be able to receive new updates or commands from the resin.io dashboard or API.

## Application-specific actions

### Change Application Type

This option allows you to convert your application to [another type][app-types], as long as the devices in the application meet the resinOS version requirements and your account has the appropriate privileges.

### Delete Application

This option permanently deletes your application.

__Warning:__ It is a good idea to [move your devices to another application][move-devices] before deleting your current application. If you do not, **all devices attached to the application will become orphaned and you will need to reconfigure them from scratch**. The most recent code deployment will continue to function as before, but the devices will not be able to receive code updates or device actions from resin.io.

[update-locks]:/learn/deploy/release-strategy/update-locking
[move-app-blog-post]:https://resin.io/blog/canary-rollouts-on-resin-io/
[updates]:/reference/resinOS/updates/self-service
[local-mode]:/learn/develop/local-mode
[move-devices]:#move-to-another-application
[app-types]:/learn/manage/app-types
[persistent-storage]:/learn/develop/runtime/#persistent-storage
