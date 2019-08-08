---
title: Environment and service variables
---

# Environment and service variables

Environment and service variables allow you to provide runtime configuration to one or more running services without having to modify your source code. You can use them to keep secrets and other sensitive values out of your codebase.

__Note:__ Adding or modifying an environment variable will restart all services on a device. Service variables only restart the affected service.

Environment variables are accessible to all services running on a device, whereas service variables are assigned to a specific service. Both environment and service variables can be applied at the fleet or the individual device level.

Values defined for individual devices always override those defined for the fleet. Values defined for services override environment variables defined at the same level. So for any given variable, the **device service variable** will always have top priority, followed by the **device environment variable**, then the **fleet service variable**, and finally the **fleet environment variable**.

__Note:__ Environment and service variables defined in the dashboard will not apply to devices in [local mode][local-mode].

## Fleet environment and service variables

Environment and service variables defined on the fleet level are available to all devices in that fleet, unless they are redefined with a variable of the same name on the device level.

They can be found from the application summary page under the *Environment Variables* and *Service Variables* tabs.

To define a new variable, click the *Add variable* button in the upper-left corner:

<img src="/img/env-vars/add_application_variable.png" width="40%">

For service variables, you will be asked to select a service from the drop down menu.

Define a name and value for your variable. Click *Add* to apply to all devices in your fleet that do not have their own values defined:

<img src="/img/env-vars/variable_editor.png" width="60%">

Your new environment or service variable will show up in the list, where it can easily be edited or removed:

<img src="/img/env-vars/variable_list.png" width="100%">

__Note:__ Deleting a fleet-level variable will not delete a device-level variable of the same name.

If you have already defined environment or service variables at the device level, they will appear below the fleet variables of the same type. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img src="/img/env-vars/define_app_wide.png" width="100%">

## Device environment and service variables

Device environment and service variables are applied to only one device. Device service variables override device environment variables of the same name, and all device variables override fleet variables.

Adding a device variable is very similar to adding a fleet variable. From the device summary page, select *Device Variables* for environment variables or *Device Service Variables* for service variables. Click *Add variable*, select the appropriate service if necessary, add a name and and a value, and click *Add*.

The variable list will include both values defined for that specific device, as well as any fleet variables of the same type:

<img src="/img/env-vars/device_variables.png" width="100%">

You can override the value of a fleet variable by clicking *override* in the far-right column. This will pop up the variable editing dialog, where you can change the value:

<img src="/img/env-vars/override.png" width="60%">

## Managing with the CLI & SDK

The {{ $names.company.lower }} CLI and SDKs all include methods to easily read, add or update environment and service variables. Consult the appropriate reference for code examples.

* [CLI environment reference](/tools/cli/#envs)
* [Node.js SDK environment reference](/reference/sdk/node-sdk/#balena.models.application.envVar)
* [Python SDK environment reference](/reference/sdk/python-sdk/#environmentvariable)

[local-mode]:/learn/develop/local-mode
