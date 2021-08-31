---
title: Configuration
---

# Configuration

Beyond [service variables][service-variables], you can also configure a lot of the device's behaviour with Supervisor and device specific variables.

To see the complete list of variables available go to the [Configuration Variables][configuration-reference] reference. 

**Note:** Some of these settings can potentially brick your device so we encourage that you read our [Advanced boot settings][boot-config-guide] guide.  

Setting these values can be done much like service variables in that you can manage them at the fleet or device level.

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
[boot-config-guide]:/reference/OS/advanced
[service-variables]:/learn/manage/variables
[configuration-reference]:/reference/supervisor/configuration-variables
