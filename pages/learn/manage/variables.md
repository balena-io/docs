---
title: Variables
excerpt: Set dynamic-named values on the dashboard that affect the way running processes will behave on the device by using variables.
---

# Variables

Variables allow you to provide runtime configuration to one or more running services without having to modify your source code. Variables can be added onto the device using the balenaCloud dashboard and can be assigned to either a specific service or all services running on the device. You can use variables to store secrets and other sensitive values out of your codebase and configure them when needed from the dashboard.
 
Variables defined in the dashboard are added to the device as environement variables and can be accessed within the service that they were defined for as shown below:
 
<img alt="Accessing variable" src="/img/variables/accessing_variables.png">

__Note:__ Adding or modifying a variable for all services will restart all services on the device. Similarly for variables defined for specific services will only restart the affected service.

Variables can be applied at the fleet or the individual device level through the Variables page. You can apply Variables to the entire fleet by navigating to the Variables page for that fleet. 

Values defined for individual devices always override those defined for the fleet. Values defined for specific services would override variables defined at the same level (Fleet or device level). So for any given variable, the **device service specific variable** will always have the top priority, followed by the **device variable for all services**, then the **fleet service specific variable**, and finally the **fleet variable for all services**.

__Note:__ Any variables defined through the dashboard do not apply to devices in [local mode][local-mode].

Values can be up to 1MB (or approximately 1 million characters) in size each. A device will re-download the variables every time the state changes in the API, which may potentially result in a lot of [network traffic][bandwidth-control]. The interval can be configured with the [BALENA_SUPERVISOR_POLL_INTERVAL configuration variable][poll-interval].

## Fleet-wide variables

Variables defined at the fleet level are available to all devices in that fleet unless they are redefined with a variable of the same name at the device level.

Fleet-wide variables can be found from the Fleet Summary page by clicking the *Variables* tabs.

To define a new variable, click the *Add variable* button in the upper-left corner.

<img alt="Add service variable" src="/img/variables/add_application_variable.png" width="80%">

In the dialog box that opens, select either a specific service or all services to apply the variable too.

Define a name and value for your variable. Click the *Add* button to apply the variable to all devices in your fleet that do not have their own values defined:

<img alt="Add service variable" src="/img/variables/variable_editor.png" width="80%">

Your new variable will show up in the list, where it can easily be modified or removed:

<img alt="List service variables" src="/img/variables/variable_list.png" width="100%">

__Note:__ Deleting a fleet-level variable will not delete a device-level variable of the same name.

If you have already defined variables at the device level, they will appear below the fleet variables of the same type. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img alt="Define device service variable fleet-wide" src="/img/variables/define_app_wide.png" width="100%">

## Device Variables

Device variables are applied to only one device. Device variables for a specific service override device variables for all services, and all device variables override fleet-wide variables.

Adding a device variable is very similar to adding a fleet variable. From the Device Summary page, select *Device Variables* to open the variables page. Click *Add variable* to select the appropriate service or all services if necessary. Add a name and a value for the variable you wish to apply, and click the *Add* button to add the variable.

The variable list will include variables defined for that specific device, as well as any fleet variables of the same type:

<img alt="Device service variables" src="/img/variables/device_variables.png" width="100%">

You can override the value of a fleet variable by clicking *override* in the far-right column. This will pop up the variable editing dialog, where you can change the value:

<img alt="Add device service variable" src="/img/variables/override.png" width="80%">

## Managing with the CLI & SDK

The {{ $names.company.lower }} CLI and SDKs all include methods to easily read, add or update environment and service variables. Consult the appropriate reference for code examples.

* [CLI environment reference](/tools/cli/#envs)
* [Node.js SDK environment reference](/reference/sdk/node-sdk/#balena.models.application.envVar)
* [Python SDK environment reference](/reference/sdk/python-sdk/#environmentvariable)

[local-mode]:/learn/develop/local-mode
[poll-interval]:/reference/supervisor/bandwidth-reduction/#side-effectwarning
[bandwidth-control]:/learn/manage/configuration/#variable-list
