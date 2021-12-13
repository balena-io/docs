---
title: Configuration
---

# Configuration

Variables on the configuration page allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `{{ $names.company.allCaps}}_` or `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration can be managed at both the fleet and device level.

__Note:__ Configuration defined in the dashboard will not apply to devices in [local mode][local-mode].

## Variable list

This list contains variables that can be used with {{ $names.company.lower }} devices, some of which will automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the dashboard, most of these variables can still be used with older supervisor versions, so be sure to check the *Valid from* column:

Name | Default | Description | Valid from
--- | --- | --- | ---
BALENA_OVERRIDE_LOCK | 0 | When set to 1 overrides any existing [update lock][update-locking] on the device. Allows updating devices in the case that the release locked updates but is stuck in an invalid state. | v1.0.0
BALENA_SUPERVISOR_CONNECTIVITY_CHECK | true | Enable / Disable VPN connectivity check | v1.3.0
BALENA_SUPERVISOR_LOCAL_MODE | false | Enable / Disable [local mode][local-mode] | v4.0.0
BALENA_SUPERVISOR_LOG_CONTROL | true | Enable / Disable logs being sent to the {{ $names.company.lower }} API | v1.3.0
BALENA_SUPERVISOR_POLL_INTERVAL | 900000 | Define the {{ $names.company.lower }} API poll interval in milliseconds. This value can increase if the device needs to backoff due to server errors. The minimum value for this variable is defined by the balenaCloud backend, and may vary. | v1.3.0
BALENA_SUPERVISOR_VPN_CONTROL | true | Enable / Disable VPN | v1.3.0
BALENA_SUPERVISOR_INSTANT_UPDATE_TRIGGER | true | Enable / Disable instant triggering of updates when a new release is deployed. If set to false, the device will ignore the notification that is triggered when the device's target state has changed. In this case, the device will rely on polling to apply updates. Note: You can spread out updates on devices if you disable instant updates and specify a different poll interval for each device in your fleet. This avoids overloading local networks if they are all at one location. | v9.13.0

In addition to these values, there may be some device-type specific configuration variables that can be set. For example, these are a few of the values that apply to Raspberry Pi devices, corresponding to the contents of the [Raspberry Pi `config.txt` file](https://www.raspberrypi.com/documentation/computers/config_txt.html):

{{> "general/config-variables-pi" }}

You can find more information on updating `config.txt` through the configuration tab in our [Advanced Boot Configuration Guide][boot-config-guide].

## Fleet configuration management

Configuration defined at the fleet level controls the behavior of any devices running in that fleet unless it is overridden with device configuration of the same name.

If you want to change the default value for any of the pre-populated configuration, make sure you are in the *Configuration* tab on the fleet, then click *activate* for the variable you wish to define:

<img alt="Activate fleet level configuration" src="/img/configuration/activate_default_config.png" width="100%">

After activating, the variable will be populated with the default value. Variables that can be enabled or disabled can be switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon. To remove the fleet wide configuration, and reset it to its default value, click the delete (trash can) icon.

If you have already defined configuration at the device level, they will appear in a list below your fleet wide configuration. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img alt="Define device level configuration fleet-wide" src="/img/configuration/define_app_wide.png" width="100%">

## Device configuration management

Device configuration defines the behavior of a single device. If both the fleet and the device have configuration of the same name, the code on the device will use the value given in the device configuration. In other words, device level configuration redefines (or overrides) fleet wide configuration.

The device level configuration list includes the pre-populated default values. Variables that can be enabled or disabled can be easily switched with the provided toggles. Other values can be edited by clicking the small edit (pencil) icon.

<img alt="Device configuration" src="/img/configuration/device_config_variables.png" width="100%">

Clicking the edit icon will pop up a small dialog for editing the value:

<img alt="Edit device configuration" src="/img/configuration/edit_device_config.png" width="60%">

To remove the device level configuration, and reset it to its default value, click the delete (trash can) icon.

### Adding custom configuration

Custom configuration section can be used to modify configuration options beyond the ones pre-populated for your device using the balenaCloud dashboard. Examples include, [modifying config.txt using configuration variables][boot-config-guide] for Raspberry Pi devices.

To define custom fleet wide configuration, scroll past the automatically populated options, then click the *Add custom configuration* button in the lower-right corner:

<img alt="Add custom fleet" src="/img/configuration/add_fleet_configuration.png" width="100%">

A dialog pops up giving you the option to define a name and value (remember, all config variable names must begin with `{{ $names.company.allCaps}}_` or `RESIN_`). Click *Add* to apply:

<img alt="Add custom fleet configuration" src="/img/configuration/variable_editor_config.png" width="60%">

Adding custom device configuration is similar to adding custom fleet configuration. You can override the value of custom fleet configuration by clicking *override* inside device configuration. This will pop up the variable editing dialog, where you can change the value:

<img alt="Override device configuration" src="/img/configuration/override_config.png" width="60%">

<img alt="Add custom device configuration" src="/img/configuration/add_device_custom_variable.png" width="100%">


__Note:__ In addition to the dashboard, this configuration can be also be set using the API or any of its clients, including the [SDK][sdk] and [CLI][cli].

[sdk]:/reference/sdk/node-sdk
[cli]:/reference/cli/reference/balena-cli/#envs
[local-mode]:/learn/develop/local-mode
[update-locking]:/learn/deploy/release-strategy/update-locking
[boot-config-guide]:/reference/OS/advanced/#modifying-configtxt-using-configuration-variables
