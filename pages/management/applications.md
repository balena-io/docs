---
title: Applications
---

# Applications

## What is a resin.io application?

An application is a group of devices of the same type that all run the same code. When you provision a device, it is added to a specific application, but can be migrated to another application at any time.

To create an application, simply type in a descriptive name in the [applications dashboard](https://dashboard.resin.io/) and click *Create New Application*.

Here we have an application with five devices provisioned:

<img src="/img/common/app/device-list-expanded.png" width="80%">

### Associate devices with an application

When you create an application, a resinOS image is generated specifically for that application and its associated device type.

When you flash this image onto your device, the device will automatically appear in your application dashboard—no manual intervention is required. You can use this image file for multiple devices, and resin.io will create a unique ID and name for each one.


### Deploy code to an application

Each application has an associated **git** endpoint, which follows the syntax `<USERNAME>@git.resin.io:<USERNAME>/<APPNAME>.git`. In the top-right corner of your application page, you'll find the command to add this endpoint as a **git** remote:

<img src="/img/common/app/remote-repo.png" width="80%">

When you are ready to deploy your code, navigate to your project directory, copy and paste the command from your application page, and push your master branch to the `resin` remote:

```shell 
$ cd FirstApp
$ git remote add resin <USERNAME>@git.resin.io:<USERNAME>/<APPNAME>.git
$ git push resin master
```
__Note:__ If you have made local changes to your code, make sure to `git add` and `git commit` as necessary before pushing to the remote.

Once you push the code to your resin.io application, a **Docker** container will be built on our servers and downloaded to any online devices.

For more details on deployment, check out our [deployment guide](/deployment/deployment).

## Device filters

As the number of devices in your application grows, the device list will become increasingly busy. Filters provide a convenient way to quickly find specific devices based on shared characteristics. 

### Add and update filters

To add a filter, click the *Add filter* button near the top-left corner of your application page. You'll be presented with a window to configure your filter:

<img src="/img/common/app/add-filter.png" width="80%">

The first dropdown lists the device characteristics you can filter on. These characteristics correspond to the columns in your device list. The second dropdown contains comparison operators appropriate to the device characteristic, such as `is`, `is before`, `contains`, and `matches RegEx`. The third field is where you specify a value to filter on. 

__Note:__ When filtering by [device tags][tags], you can filter by name, value, or both.

Click *Add filter* to apply your configuration.

When your filter has been added, you will see it in a box above the device list. The device list will now only show devices that match your filter:

<img src="/img/common/app/filter-applied.png" width="80%">

If you need to update your filter, simply click it and a new configuration window will appear. To remove, click the `x` to the filter's right. You can add any number of additional filters with the *Add filter* button.

### Create a view

When you create a view, you are saving a specific set of filters that you may want to use again. To do this, click *Save view* on the right side of the filter box:

<img src="/img/common/app/save-view.png" width="80%">

You will be asked to choose a name for the saved view. This view can then be selected at any time by clicking the *Views* button above the filter box.

## Device tags

Tags provide an easy way to include more information about your devices than what is already provided in the dashboard. With tags, you have the option to create key:value pairs that extend the available metadata for your devices. A device can be given multiple tags, and the tags can be used when you create [filters][filters].

### Create and edit tags

To add a tag from the device list, click the checkbox to the left of the devices you wish to tag, followed by the *Tags* button on the right side of the dashboard:

<img src="/img/common/app/tags.png" width="80%">

You can also manage tags from a device's summary page. The *Manage Tags* option is available in the action dropdown to the right of the *Reboot* and *Restart* buttons:

<img src="/img/common/app/device_manage_tags.png" width="40%">

Both of these options will open the tag management window, from which you can define a name for your tag. Note that tag name cannot be empty, cannot contain spaces, and cannot use the reserved `io.resin` prefix. In addition to a name, you can define a value, although this is optional. 

__Note:__ A device cannot have more than one tag with the same name, even if the values are different. If you create a new tag with the same name as an existing tag, the existing tag will be replaced.

This example shows how you could create a tag to keep track of device location:

<img src="/img/common/app/add_tag.png" width="80%">

Tags you add to your device will appear in a list in the management window. They can be edited or removed from here:

<img src="/img/common/app/tag_list.png" width="80%">

When you are finished creating and editing tags, click *Apply* to keep the changes.

__Note:__ Device tags can also be created and managed programatically [via the API][api-example].

### Tag columns

Once tags have been added to at least one device, a new *All Tags* column will appear on the right side of the device table:

<img src="/img/common/app/all_tags.png" width="80%">

This column can be hidden by clicking the arrow on the far right of the device table header. You can also add columns for specific tags by selecting *Add Tag Column*:

<img src="/img/common/app/add_tag_column.png" width="25%">

A new column will be created. You can then select which tag it should display:

<img src="/img/common/app/tag_column.png" width="25%">

## Application actions

Actions let you change the state of some or all of the devices in your application. They can be applied in two ways:

1. The *Actions* menu, located on the left side of the application page, allows you to apply state changes to all devices in the application.
2. *Group Actions*, found at the top-right of the device list, are applied to a subset of the devices in your fleet. You can specify which devices will be affected by clicking the check boxes on the left of the device list. If you apply any filters or a saved view, clicking the check box at the top of the device list will select only the devices that appear in the list. If no filters are applied, this check box will select all devices in the application.

<img src="/img/common/app/actions.png" width="80%">

### Public URL

This option enables a public URL for all devices in the application. For more details on public URLs, please refer to the [device page][device-page].

### Restart Application

The *Restart Application* action will restart the application container on selected devices that are currently online. It should be noted that these action notifications are not queued up, so if a device is offline when the action is triggered the application will not be restarted when it comes back online.

### Grant Support Access

Clicking *Grant Support Access* gives resin.io support staff the ability to access all the devices in your application for troubleshooting purposes. You will be asked to specify a time window for which support access is allowed.

## Dangerous application actions

### Purge Data

The *Purge Data* action operates on all selected devices. It is used to delete all the data in `/data`. Note that this is a non-reversible action and should be carried out with extreme caution. Purged data cannot be recovered.

__Note:__ This action is only supported on devices with a supervisor version >= 1.1.0

### Reboot

This action allows you to perform a reboot on all selected devices. This is different from the *Restart Application* action mentioned above. When you reboot, the entire device, including the kernel, will be rebooted as if there was a power cycle. It should be noted that these action notifications are not queued up, so if a device is offline when the action is triggered the device will not be rebooted when it comes back online.

__Note:__ This action is only supported on devices with a supervisor version >= 1.1.0

### Shutdown

The *Shutdown* action allows you to safely shutdown all selected devices. It should be noted that once you trigger this action, there is no way for resin.io to start your device back up, so you will need to physically restart your device. Do not perform this action if your device is somewhere remote and inaccessible.

__Note:__ This action is only supported on devices with a supervisor version >= 1.1.0

### Delete Application

This option permanently deletes your application.

__Warning:__ It is a good idea to [move your devices to another application][move-devices] before deleting your current application. If you do not, **all devices attached to the application will become orphaned and you will need to reconfigure them from scratch**. The most recent code deployment will continue to function as before, but the devices will not be able to receive code updates or device actions from resin.io.

## Environment Variables

Applications can be customized via environment variables - simply enter environment variable key/value pairs.
You can read more about environment variables on the [documentation page][env-vars].

__Warning:__ Changing an environment variable will result in your application restarting.

### System-Defined Environment Variables

__Note:__ Environment variables that are set by the system are prefixed with `RESIN_`; as a consequence you cannot define environment variables for an application with this prefix in their name.

* `RESIN_DEVICE_UUID` - The value of this variable is the current device's unique identifier.

## Best Practices

### Collaboration management

An organization should create a main account to host all applications that the organization owns. This allows a strict separation between applications the organization owns and employee applications created via their accounts. The main account is bound to the organization itself—the organization should have a well defined process to manage the credentials for its main account. Employees are granted access to the organization applications as collaborators. When an employee should no longer have access to the organization applications, access can be revoked by removing them as a collaborator.

[device-page]:/management/devices/#enable-public-device-url
[move-devices]:/management/devices/#move-to-another-application
[env-vars]:/management/env-vars/
[api-example]:https://github.com/resin-io-playground/device-tags
[filters]:/management/applications/#device-filters
[tags]:/management/applications/#device-tags

