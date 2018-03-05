---
title: Service Variables
---

# Service Variables 

Service variables allow you to provide runtime configuration to a running service without having to modify your source code. You can use them to keep secrets and other sensitive values out of your code base.

__Note:__ Adding or modifying a service variable will cause the service to restart on any devices where the new setting is applied.

Resin.io allows you to set service variables at two levels: fleet and device.

## Fleet Service Variables

Service variables defined on the fleet level are available to the specified service on any device in that fleet, unless they are redefined with a device service variable of the same name.

The application dashboard has a *Service Variables* tab containing a list of all fleet service variables.

To define a new fleet service variable, make sure you are in the *Service Variables* tab, then click the *Add variable* button in the upper-left corner:

<img src="/img/env-vars/add_application_variable.png" width="40%">

A new window will pop up, asking you to select a service from the drop down menu. Once you have selected the service, you can define the name and value for your service variable. Click *Add* to apply to all devices in your fleet that do not already have an identical device service variable defined:

<img src="/img/env-vars/variable_editor.png" width="60%">

Your new service variable will show up in the list, where it can easily be edited or removed:

<img src="/img/env-vars/variable_list.png" width="100%">

__Note:__ Deleting a fleet service variable will not delete a device variable of the same name.

If you have already defined service variables at the device level, they will appear in a list below your fleet service variables. You can easily apply a device value to the entire fleet by clicking *Define app-wide*:

<img src="/img/env-vars/define_app_wide.png" width="100%">

## Device Service Variables

Device service variables are available to the service container running on that particular device. If both the fleet and the device have a service variable of the same name, the code on the device will use the value of the device service variable. In other words, device service variables redefine (or override) fleet service variables.

Adding a device service variable is very similar to adding a fleet service variable. From the device summary page, select the *Device Service Variables* tab, click *Add variable*, select the appropriate service from the drop down, add a name and value, and click *Add*.

The service variable list will include both values defined for that specific device, as well as any fleet service variables: 

<img src="/img/env-vars/device_variables.png" width="100%">

You can override the value of a fleet variable by clicking *override* in the far-right column. This will pop up the variable editing window, where you can change the value:

<img src="/img/env-vars/override.png" width="60%">

## Managing with the CLI & SDK

The resin.io CLI and SDKs all include methods to easily read, add or update service variables. Consult the appropriate reference for code examples.

* [CLI environment reference](/tools/cli/#envs)
* [Node.js SDK environment reference](/tools/sdk/#resin.models.environment-variables)
* [Python SDK environment reference](/tools/python-sdk/#environmentvariable)
