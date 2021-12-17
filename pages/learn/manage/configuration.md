---
title: Configuration
---

# Configuration

Variables on the configuration page allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `{{ $names.company.allCaps}}_` or `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration can be managed at both the fleet and device level.

__Note:__ Configuration defined in the dashboard will not apply to devices in [local mode][local-mode].

## Variable list

Aside from [variables][variables], you can also configure device behavior with Supervisor or device type specific variables.

For a complete list of valid configuration variables that can be configured, check the [configuration list][configuration-list].

## Fleet configuration management

Configuration defined at the fleet level controls the behavior of any devices running in that fleet unless it is overridden with device configuration of the same name. If you want to change the default value for any of the pre-populated configuration, make sure you are in the *Configuration* tab on the fleet, then click *activate* for the variable you wish to define:

<img alt="Activate fleet level configuration" src="/img/configuration/activate_default_config.png" width="100%">

After activating, the variable will be populated with the default value. Variables that can be enabled or disabled can be switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon. To remove the fleet wide configuration, and reset it to its default value, click the delete (trash can) icon.

If you have already defined configuration at the device level, they will appear in a list below your fleet wide configuration. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img alt="Define device level configuration fleet-wide" src="/img/configuration/define_app_wide.png" width="100%">

In order to delete device level overrides of a fleet wide configuration, click the "overrides" button in the list to delete device configuration for specific devices and enforce fleet wide configuration back on those device.

<img alt="Override device configuration" src="/img/configuration/override_config.png" width="80%">

## Device configuration management

Device configuration defines the behavior of a single device. If both the fleet and the device have configuration of the same name, the code on the device will use the value given in the device configuration. In other words, device level configuration redefines (or overrides) fleet wide configuration.

The device level configuration list includes the pre-populated default values. Variables that can be enabled or disabled can be easily switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon.

<img alt="Device configuration" src="/img/configuration/device_config_variables.png" width="100%">

Clicking the small edit (pencil) icon will pop up a small dialog for editing the value:

<img alt="Edit device configuration" src="/img/configuration/edit_device_config.png" width="80%">

To remove the device level configuration, and reset it to its default value, click the delete (trash can) icon.

## Adding custom configuration

The custom configuration section can be used to modify configuration options beyond the ones pre-populated for your device using the balenaCloud dashboard. Examples include, [modifying config.txt using configuration variables][boot-config-guide] for Raspberry Pi devices.

To define custom fleet wide configuration, scroll past the automatically populated options, then click the *Add custom configuration* button in the lower-right corner:

<img alt="Add custom fleet" src="/img/configuration/add_fleet_configuration.png" width="100%">

A dialog pops up giving you the option to define a name and value (remember, all config variable names must begin with `{{ $names.company.allCaps}}_` or `RESIN_`). Click *Add* to apply:

<img alt="Add custom fleet configuration" src="/img/configuration/variable_editor_config.png" width="80%">

Adding custom device configuration is similar to adding custom fleet configuration. You can override the value of custom fleet configuration by clicking *override* inside device configuration. This will pop up the variable editing dialog, where you can change the value:

<img alt="Add custom device configuration" src="/img/configuration/add_device_custom_variable.png" width="100%">


__Note:__ In addition to the dashboard, this configuration can be also be set using the API or any of its clients, including the [SDK][sdk] and [CLI][cli].

[sdk]:/reference/sdk/node-sdk
[cli]:/reference/cli/reference/balena-cli/#envs
[local-mode]:/learn/develop/local-mode
[update-locking]:/learn/deploy/release-strategy/update-locking
[boot-config-guide]:/reference/OS/advanced#modifying-configtxt-using-configuration-variables
[service-variables]:/learn/manage/variables
[configuration-list]:/reference/supervisor/configuration-list
[variables]:/learn/manage/variables
