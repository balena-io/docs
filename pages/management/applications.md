---
title: Applications
---

# Applications

### What is a Resin.io Application?

A Resin.io __application__ contains both the code you want to run and the devices you want to run that code on.

To create an application you simply tap in a descriptive name in the [applications dashboard](https://dashboard.resin.io/) and hit create.

<!-- TODO: update the image here -->
<img src="/img/raspberrypi2/app_dashboard_fresh_device.png" width="80%">

Here we have an application named "myFleet" and currently it only has one device ("dawn-wildflower") provisioned.

### Associating Devices with Applications

When you create an application a special resin.io operating system is generated specifically for that application and its associated device type.

When you install this image onto your device it will automatically appear in your application dashboard, no manual intervention is required. You can copy this one download to multiple SD cards and resin.io will associate all these devices with their own unique ID and fancy name.


### Deploying Your Code to an Application

The key thing to know about any application from your perspective as a developer is it's git endpoint - this is visible in the applications list on the [applications dashboard](http://dashboar.resin.io) and also in the top-right hand corner of each individual application dashboard.

To configure a git repo to be able to push code to resin, you need to add a [git remote](http://gitref.org/remotes/) - simply click the button to the right of the git endpoint to copy the command to the clipboard and run it in the folder where your local git repo is located.

Alternatively, simply run `git remote add resin [git endpoint]`, and you're done. From then on in you can simply run `git push resin master` to push your master branch to your devices.

For more details on deployment, check out our [deployment guide](/deployment/deployment).

## Application Actions

### Download Image

This action will allow you to download a new device OS image so you can provision new devices into your fleet. It will also ask you to select and configure you network preferences before you download.

### Restart Application (on all devices)

The `Restart Application` action is a fleet wide action that will restart the application container on all the devices that are currently online. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of it.

## Dangerous Application Actions

### Purge Data (on all devices)

The purge data action operates on all devices in the application. It is used to delete all the data in `/data`. Note that this is a non-reversible action and should be carried out with extreme caution as once your data is purged, it is gone for good.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Reboot All Devices

This action allows you to perform a reboot of all the devices in the fleet/application. This is different from the `Restart Application` action mentioned above, because in this action, the entire device including the kernel will be rebooted as if there was a power cycle. It should be noted that currently these action notifications are not queued up, so if a device is offline when the action is triggered, it will never be notified of the action it missed.

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Shutdown All Devices

The `Shutdown` action allows you to safely shutdown all your device. It should be noted that once you trigger this action there is no way for resin.io to start your device back up, so you will need to physically restart your device. Obviously this action is not a wise choice if your device is somewhere remote and inaccessible :P

__Warning:__ This action is only supported on devices with an Agent version >= 1.1.0

### Deleting the application

Hidden behind the 'Dangerous' section is the option to delete your application.

__Warning:__ All devices attached to the application will become orphaned and you will need to reconfigure them from scratch in another application. Their most recent code deployment will continue to function as before, but all the devices will not be able to receive code updates or device actions from resin.io.

## Environment Variables

Applications can be customised via environment variables - simply enter environment variable key/value pairs.

__Warning:__ Changing an environment variable will, for the time being, result in your application restarting.

### System-Defined Environment Variables

__Note:__ Environment variables that are set by the system are prefixed with `RESIN_`; as a consequence you cannot define environment variables for an application with this prefix in their name.

* `RESIN_DEVICE_UUID` - The value of this variable is the current device's unique identifier.
