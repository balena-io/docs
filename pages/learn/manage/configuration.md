---
title: Configuration variables
---

# Configuration variables

Configuration variables allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration variables can be managed at both the fleet and device level.

__Note:__ Configuration variables defined in the dashboard will not apply to devices in [local mode][local-mode].

## Variable list

This list contains configuration variables that can be used with {{ $names.company.lower }} devices, some of which will automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the dashboard, most of these variables can still be used with older supervisor versions, so be sure to check the *Valid from* column:

Name | Default | Description | Valid from
--- | --- | --- | ---
RESIN_SUPERVISOR_CONNECTIVITY_CHECK | true | Enable / Disable VPN connectivity check | v1.3.0
RESIN_SUPERVISOR_DELTA | false | Enable / Disable [delta updates][deltas] | v1.7.0
RESIN_SUPERVISOR_DELTA_REQUEST_TIMEOUT | 30000| Define the timeout when requesting a delta, in milliseconds | v3.0.0
RESIN_SUPERVISOR_DELTA_RETRY_COUNT | 30 | Define the number of times a delta download should be retried | v6.2.0
RESIN_SUPERVISOR_DELTA_RETRY_INTERVAL | 1000 | Define the wait time between delta download attempts, in milliseconds | v6.2.0
RESIN_SUPERVISOR_LOCAL_MODE | false | Enable / Disable [local mode][local-mode] | v4.0.0
RESIN_SUPERVISOR_LOG_CONTROL | true | Enable / Disable logs being sent to the {{ $names.company.lower }} API | v1.3.0
RESIN_SUPERVISOR_POLL_INTERVAL | 900000 | Define the {{ $names.company.lower }} API poll interval in milliseconds. This interval will only matter if the device is not connected to the VPN at the time an update is pushed, or if RESIN_SUPERVISOR_INSTANT_UPDATE_TRIGGER is set to false. Starting from supervisor v9.13.0, the supervisor will use a random time between 0.5 and 1.5 times this poll interval each time it checks the balenaCloud API. The minimum value for this variable is defined by the balenaCloud backend, and may vary. | v1.3.0
RESIN_SUPERVISOR_VPN_CONTROL | true | Enable / Disable VPN | v1.3.0
RESIN_SUPERVISOR_INSTANT_UPDATE_TRIGGER | true | Enable / Disable instant triggering of updates when a new release is deployed. If set to false, the device will ignore the notification that is triggered when the device's target state has changed. In this case, the device will rely on polling to apply updates. Coupled with a large RESIN_SUPERVISOR_POLL_INTERVAL, this allows spreading out updates in large fleets to avoid overloading local networks when there is a large number of devices at one location. | v9.13.0


In addition to these values, there may be some device-type specific configuration variables that can be set. For example, these are a few of the values that apply to Raspberry Pi devices, corresponding to the contents of the [Raspberry Pi `config.txt` file](https://www.raspberrypi.org/documentation/configuration/config-txt/README.md):

Name | Default | Description
--- | --- | ---
RESIN_HOST_CONFIG_disable_splash | 1 | Enable / Disable the {{ $names.company.lower }} splash screen
RESIN_HOST_CONFIG_dtparam | "i2c_arm=on","spi=on","audio=on" | Define DT parameters
RESIN_HOST_CONFIG_enable_uart | 1 | Enable / Disable UART
RESIN_HOST_CONFIG_gpu_mem | 16 | Define device GPU memory in megabytes

You can find more information on updating `config.txt` through configuration variables in our [Advanced Boot Configuration Guide][boot-config-guide].

## Managing fleet configuration variables

Configuration variables defined on the fleet level control the behavior of any devices running in that fleet, unless they are redefined with a device configuration variable of the same name.

If you want to change the default value for one of the prepopulated configuration variables, make sure you are in the *Fleet Configuration* tab, then click *activate* for the variable you wish to define:

<img src="/img/configuration/activate_default_config.png" width="100%">

A new dialog will pop up, allowing you to define the value for your configuration variable. Click *Add* to apply to all devices in your fleet that do not already have an identical device configuration variable defined:

<img src="/img/configuration/editor_default_config.png" width="60%">

To define a custom fleet configuration variable, scroll past the automatically populated variables, then click the *Add custom variable* button in the lower-right corner:

<img src="/img/configuration/add_fleet_configuration.png" width="100%">

As before, a dialog pops up giving you the option to define a name and value (remember, all config variable names must begin with `RESIN_`). Click *Add* to apply:

<img src="/img/configuration/variable_editor_config.png" width="60%">

If you have already defined configuration variables at the device level, they will appear in a list below your fleet configuration variables. You can easily apply a device value to the entire fleet by clicking *Define fleet-wide*:

<img src="/img/configuration/define_app_wide.png" width="100%">

## Managing device configuration variables

Device configuration variables define the behavior of a single device. If both the fleet and the device have a configuration variable of the same name, the code on the device will use the value of the device configuration variable. In other words, device configuration variables redefine (or override) fleet configuration variables.

The device configuration variable list includes the prepopulated default values. Binary (true/false) variables can be easily switched with the provided toggles. Other values can be edited by clicking the small pencil icon:

<img src="/img/configuration/device_config_variables.png" width="100%">

This will pop up a small dialog for editing the value:

<img src="/img/configuration/edit_device_config.png" width="60%">

Adding a custom device configuration variable is very similar to adding a custom fleet configuration variable: scroll past the prepopulated variables, click *Add custom variable*, define a name and value, and click *Add*.

You can override the value of a custom fleet configuration variable by clicking *override* in the far-right column. This will pop up the variable editing dialog, where you can change the value:

<img src="/img/configuration/override_config.png" width="60%">

[deltas]:/learn/deploy/delta
[local-mode]:/learn/develop/local-mode
[update-locking]:/learn/deploy/release-strategy/update-locking
[boot-config-guide]:/reference/OS/advanced/#modifying-configtxt-remotely
