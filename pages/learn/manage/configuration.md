---
title: Configuration variables
---

# Configuration variables

Configuration variables allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `{{ $names.company.allCaps}}_` or `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration variables can be managed at both the fleet and device level.

__Note:__ Configuration variables defined in the dashboard will not apply to devices in [local mode][local-mode].

## Variable list

This list contains configuration variables that can be used with {{ $names.company.lower }} devices, some of which will automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the dashboard, most of these variables can still be used with older supervisor versions, so be sure to check the *Valid from* column:

Name | Default | Description | Valid from
--- | --- | --- | ---
BALENA_SUPERVISOR_CONNECTIVITY_CHECK | true | Enable / Disable VPN connectivity check | v1.3.0
BALENA_SUPERVISOR_LOCAL_MODE | false | Enable / Disable [local mode][local-mode] | v4.0.0
BALENA_SUPERVISOR_LOG_CONTROL | true | Enable / Disable logs being sent to the {{ $names.company.lower }} API | v1.3.0
BALENA_SUPERVISOR_POLL_INTERVAL | 900000 | Define the {{ $names.company.lower }} API poll interval in milliseconds. This interval will only matter if the device is not connected to the VPN at the time an update is pushed, or if BALENA_SUPERVISOR_INSTANT_UPDATE_TRIGGER is set to false. Starting from supervisor v9.13.0, the supervisor will use a random time between 0.5 and 1.5 times this poll interval each time it checks the balenaCloud API. The minimum value for this variable is defined by the balenaCloud backend, and may vary. | v1.3.0
BALENA_SUPERVISOR_VPN_CONTROL | true | Enable / Disable VPN | v1.3.0
BALENA_SUPERVISOR_INSTANT_UPDATE_TRIGGER | true | Enable / Disable instant triggering of updates when a new release is deployed. If set to false, the device will ignore the notification that is triggered when the device's target state has changed. In this case, the device will rely on polling to apply updates. Coupled with a large BALENA_SUPERVISOR_POLL_INTERVAL, this allows spreading out updates in large fleets to avoid overloading local networks when there is a large number of devices at one location. | v9.13.0

In addition to these values, there may be some device-type specific configuration variables that can be set. For example, these are a few of the values that apply to Raspberry Pi devices, corresponding to the contents of the [Raspberry Pi `config.txt` file](https://www.raspberrypi.org/documentation/configuration/config-txt/README.md):

{{> "general/config-variables-pi" }}

You can find more information on updating `config.txt` through configuration variables in our [Advanced Boot Configuration Guide][boot-config-guide].

## Managing fleet configuration variables

Configuration variables defined at the fleet level control the behavior of any devices running in that fleet unless they are redefined with a device configuration variable of the same name.

If you want to change the default value for one of the prepopulated configuration variables, make sure you are in the *Fleet Configuration* tab, then click *activate* for the variable you wish to define:

<img alt="Activate fleet configuration" src="/img/configuration/activate_default_config.png" width="100%">

After activating, the variable will be populated with the default value. Variables that can be enabled or disabled can be switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon. To remove the fleet configuration variable, and reset it to its default value, click the delete (trash can) icon.

To define a custom fleet configuration variable, scroll past the automatically populated variables, then click the *Add custom variable* button in the lower-right corner:

<img alt="Add custom fleet variable" src="/img/configuration/add_fleet_configuration.png" width="100%">

A dialog pops up giving you the option to define a name and value (remember, all config variable names must begin with `{{ $names.company.allCaps}}_` or `RESIN_`). Click *Add* to apply:

<img alt="Add fleet configuration variable" src="/img/configuration/variable_editor_config.png" width="60%">

If you have already defined configuration variables at the device level, they will appear in a list below your fleet configuration variables. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img alt="Define device configuration variables fleet-wide" src="/img/configuration/define_app_wide.png" width="100%">

## Managing device configuration variables

Device configuration variables define the behavior of a single device. If both the fleet and the device have a configuration variable of the same name, the code on the device will use the value of the device configuration variable. In other words, device configuration variables redefine (or override) fleet configuration variables.

The device configuration variable list includes the prepopulated default values. Variables that can be enabled or disabled can be easily switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon.

<img alt="Device configuration variables" src="/img/configuration/device_config_variables.png" width="100%">

Clicking the edit icon will pop up a small dialog for editing the value:

<img alt="Edit device configuration" src="/img/configuration/edit_device_config.png" width="60%">

To remove the device configuration variable, and reset it to its default value, click the delete (trash can) icon.

Adding a custom device configuration variable is very similar to adding a custom fleet configuration variable. Scroll past the prepopulated variables, click *Add custom variable*, define a name and value, and click *Add*.

<img alt="Add custom device configuration variable" src="/img/configuration/add_device_custom_variable.png" width="100%">

You can override the value of a custom fleet configuration variable by clicking *override*. This will pop up the variable editing dialog, where you can change the value:

<img alt="Override device configuration" src="/img/configuration/override_config.png" width="60%">

[local-mode]:/learn/develop/local-mode
[update-locking]:/learn/deploy/release-strategy/update-locking
[boot-config-guide]:/reference/OS/advanced/#modifying-configtxt-remotely
