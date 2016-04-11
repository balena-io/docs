# Managing Your Devices and Applications

## Devices

### What are Resin.io Devices?

Devices represent your actual hardware and are exclusively owned by applications, inheriting their environment variables.

All code pushed to an application's git endpoint is automatically pushed to the devices it owns.

<img src="/img/raspberrypi2/newly_provisioned_device_dash.png" width="80%">

### Identifying Devices

Each device has a unique identifier or `UUID`, however you can assign a more meaningful name to each device, by either clicking on the name in its application dashboard to edit it or changing it in the device detail page.

#### Blink to Identify

We have also added a means of visually identifying devices that have an onboard LED. Clicking on the lightbulb icon on a device's application dashboard or the 'Identify Device (Blinks LED)' button on its details page will cause the onboard LED to blink so you can physically tell one device apart from the others.

### Logging

An extremely useful feature of the devices detail page is the log window. This is automatically synchronised with the application running on this device, showing both it's standard out and standard error output in real time. You can expand this log window to occupy the whole page if you need to view more log output at once.

<img src="/img/common/device/device_dashboard_empty_logs.png" width="80%">

## Device Actions

On the device's Actions page we give you access to a number of useful per-device actions.

* [Enable Public URL](/pages/management/devices.md#enable-public-device-url)
* [Update Locking](/pages/management/devices.md#update-locking)
* [Restart Application](/pages/management/devices.md#restart-device-container)
* [Move to Another Application](/pages/management/devices.md#move-to-another-application)
* [Purge Data](/pages/management/devices.md#purge-data)
* [Reboot](/pages/management/devices.md#reboot)
* [Shutdown](/pages/management/devices.md#shutdown)
* [Delete Device](/pages/management/devices.md#delete-device)

### Enable Public Device URL

Resin.io currently exposes **port 80** for web forwarding. To enable web forwarding on a specific device, select the `Enable a public url for this device` checkbox. Resin will then generate a web accessible url for the device. The URL will be of the form `<RESIN_DEVICE_UUID>.resindevice.io`, where `<RESIN_DEVICE_UUID.` is the unique ID of the device which you can see on your dashboard.

<img src="/img/screenshots/device-url-new.png" width="80%">

To see what your device is serving on port 80, just click on the URL. If your application is not serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<img src="/img/common/device/device_url_404.png" width="80%">

### Update Locking

In many uses cases devices are performing sensitive or critical functionality and are not able to pause to receive an update or restart the container. For this reason we added the [update.lock functionality](/pages/runtime/supervisor-api.md#update-locking) in the resin supervisor agent. This allows your application to pick and choose when and where it would like to allow updates to happen.

Added to this functionality we provided a convenient button to override the lock on the device and essentially force an update. This is a precautionary measure for those times when your application crashes and hasn't released the update lock. This gives you a nice safety net to ensure you can always push new updates.  

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Restart Device Container

The `Restart Device Container` action is a per-device **restart** of the currently running **application container**. Your application (A.K.A it's running container) will be shutdown and restarted from scratch.

When the container is stopped, the application is politely asked to stop by sending a `SIGTERM` and after 10 seconds of wait time a `SIGKILL` is sent. During a restart any data that is not stored in `/data` will be lost.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ Restart device container is not equivalent to a reboot of the device!

### Move to Another Application

With the `Move Application` action it is possible to transfer a device from one application to another. This allows you incrementally rollout devices or move certain devices to specific branches of functionality. To move a device from on application to another, simply click the action button and you will be presented with a list of applications that you can move your device to.

Note that currently you are only able to move devices between applications of the same device type. For example, in the screenshot below, I can only move the "little-brook" device to the list of `raspberry pi 1` applications. It is not possible to move it to an application with a device type of Raspberry pi 2 or Beaglebone.

<img src="/img/common/device/device_action_move_app.png" width="80%">

Obviously you may only select one application to transfer your device to. Once you select the appropriate radio button, you device will immediately appear in the selected application's device list. Note that it will take a while for the device to start the update process as it does not receive a push notification of a new code update from the API, so it has to wait for the update poll, which happens ever couple of minutes.

__Note:__ When moving between applications, the data stored in `/data` will persist, but will not be accessible to the new application. However, upon switching back to the original application, the `/data` store will be available once more. It is recommended that if one does not intend on reverting back to the original application, then a purge of `/data` is needed.

To see a demonstration of moving devices between applications and a little more on the motivation behind the feature have a look at our blog post: [Canary Rollouts with resin.io][move-app-blog-post]

## Dangerous Device Actions

### Purge Data

On all resin.io devices `/data` is a persistent data volume. This is useful for storing sensitive or non-volatile data that one would like to keep through out the update process. However, there are often times where it is necessary  to jettison all the persistent data. This can be done with the `Purge Data` action. Note that this is a dangerous action and that it is not possible to recover your data once you have purged the volume.

It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Reboot

This action allows you to perform a reboot on a specific device. This is different from the `Restart Application` action mentioned above, because in this action, the entire device including the kernel will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Shutdown

The `Shutdown` action allows you to safely shutdown a specific device. It should be noted that once you trigger this action there is no way for resin.io to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible :P

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Delete Device

The `Delete Device` action is an extremely dangerous action and results in disassociating the device from the application and remote endpoint. Once you have deleted a device from the application it is not possible to reconnect it. The device itself will continue to run the container and code you pushed most recently, but will never be able to receive new updates or commands from the resin.io dashboard or API.

[rpi]:http://www.raspberrypi.org/
[move-app-blog-post]:https://resin.io/blog/canary-rollouts-on-resin-io/
