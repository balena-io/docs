---
title: Configuration
---

# Configuration

Variables on the configuration page allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `{{ $names.company.allCaps}}_` or `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration can be managed at both the fleet and device level.

**Note:** Configuration defined in the dashboard will not apply to devices in [local mode](../../../learn/develop/local-mode/).

## Variable list

Aside from [variables](../../../learn/manage/variables/), you can also configure device behavior with Supervisor or device type specific variables.

For a complete list of valid configuration variables that can be configured, check the [configuration list](../../../reference/supervisor/configuration-list/).

## Fleet configuration management

Configuration defined at the fleet level controls the behavior of any devices running in that fleet unless it is overridden with device configuration of the same name. If you want to change the default value for any of the pre-populated configuration, make sure you are in the _Configuration_ tab on the fleet, then click _activate_ for the variable you wish to define:



After activating, the variable will be populated with the default value. Variables that can be enabled or disabled can be switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon. To remove the fleet wide configuration, and reset it to its default value, click the delete (trash can) icon.

If you have already defined configuration at the device level, they will appear in a list below your fleet wide configuration. You can easily apply a device value to the entire fleet by clicking _Define fleet-wide_:



In order to delete device level overrides of a fleet wide configuration, click the "overrides" button in the list to delete device configuration for specific devices and enforce fleet wide configuration back on those device.



## Device configuration management

Device configuration defines the behavior of a single device. If both the fleet and the device have configuration of the same name, the code on the device will use the value given in the device configuration. In other words, device level configuration redefines (or overrides) fleet wide configuration.

The device level configuration list includes the pre-populated default values. Variables that can be enabled or disabled can be easily switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon.



Clicking the small edit (pencil) icon will pop up a small dialog for editing the value:



To remove the device level configuration, and reset it to its default value, click the delete (trash can) icon.

## Overriding the splash screen

To replace the \{{ $names.company.lower \}} logo with your custom splash logo, go to your Fleet or Device `Configuration` page and find the configuration for `Define the PNG image to be used for the boot splash screen. Only supported by supervisor versions >= v12.3.0.`. Click `activate` to upload your image.



## Adding custom configuration

The custom configuration section can be used to modify configuration options beyond the ones pre-populated for your device using the balenaCloud dashboard. Examples include, [modifying config.txt using configuration variables](../../../reference/OS/advanced/#modifying-configtxt-using-configuration-variables) for Raspberry Pi devices.

To define custom fleet wide configuration, scroll past the automatically populated options, then click the _Add custom configuration_ button in the lower-right corner:



A dialog pops up giving you the option to define a name and value (remember, all config variable names must begin with `{{ $names.company.allCaps}}_` or `RESIN_`). Click _Add_ to apply:



Adding custom device configuration is similar to adding custom fleet configuration. You can override the value of custom fleet configuration by clicking _override_ inside device configuration. This will pop up the variable editing dialog, where you can change the value:



**Note:** In addition to the dashboard, this configuration can be also be set using the API or any of its clients, including the [SDK](../../../reference/sdk/node-sdk/) and [CLI](../../../reference/balena-cli/#envs).
