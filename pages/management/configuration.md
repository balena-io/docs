---
title: Configuration Variables
---

# Configuration Variables

Configuration variables allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration variables can be managed at the fleet and device levels.

## Variable List

This list contains configuration variables that can be used with resin.io devices, some of which will automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the dashboard, most of these variables can still be used with older supervisor versions, so be sure to check the *Valid for* column:

Name | Default | Description | Valid from
--- | --- | --- | ---
RESIN_HOST_LOG_TO_DISPLAY | | Enable / Disable logs on the HDMI display | v1.7.0
RESIN_SUPERVISOR_CONNECTIVITY_CHECK | true | Enable / Disable VPN connectivity check | v1.3.0
RESIN_SUPERVISOR_DELTA | true | Enable / Disable [delta updates][deltas] | v1.7.0
RESIN_SUPERVISOR_DELTA_REQUEST_TIMEOUT | 30000| Define the timeout when requesting a delta, in milliseconds | v3.0.0
RESIN_SUPERVISOR_DELTA_RETRY_COUNT | 30 | Define the number of times a delta download should be retried | v6.2.0
RESIN_SUPERVISOR_DELTA_RETRY_INTERVAL | 1000 | Define the wait time between delta download attempts, in milliseconds | v6.2.0
RESIN_SUPERVISOR_LOCAL_MODE | false | Enable / Disable [local mode][local-mode] | v4.0.0
RESIN_SUPERVISOR_LOG_CONTROL | true | Enable / Disable logs being sent to resin.io | v1.3.0
RESIN_SUPERVISOR_POLL_INTERVAL | 60000 | Define the resin.io API poll interval in milliseconds | v1.3.0
RESIN_SUPERVISOR_VPN_CONTROL | true | Enable / Disable VPN | v1.3.0


In addition to these values, there may be some device-type specific configuration variables that can be set. For example, these values apply to Raspberry Pi devices, reflecting the contents of the `config.txt` file:

Name | Default | Description
--- | --- | ---
RESIN_HOST_CONFIG_disable_splash | 1 | Enable / Disable the resin splash screen
RESIN_HOST_CONFIG_dtparam | "i2c_arm=on","spi=on","audio=on" | Define DT parameters
RESIN_HOST_CONFIG_enable_uart | 1 | Enable / Disable UART
RESIN_HOST_CONFIG_gpu_mem | 16 | Define device GPU memory in megabytes

You can find more information on updating `config.txt` through configuration variables in our [Advanced Boot Configuration Guide][boot-config-guide].

## Managing Fleet Configuration Variables

Configuration variables defined on the fleet level control the behavior of any devices running in that fleet, unless they are redefined with a device configuration variable of the same name.

If you want to change the default value for one of the prepopulated configuration variables, make sure you are in the *Fleet Configuration* tab, then click *activate* for the variable you wish to define:

<img src="/img/configuration/activate_default_config.png" width="100%">

A new window will pop up, allowing you to define the value for your configuration variable. Click *Add* to apply to all devices in your fleet that do not already have an identical device configuration variable defined:

<img src="/img/configuration/editor_default_config.png" width="60%">

To define a custom fleet configuration variable, scroll past the automatically populated variables, then click the *Add custom variable* button in the lower-right corner:

<img src="/img/configuration/add_fleet_configuration.png" width="100%">

As before, a window pops up giving you the option to define a name and value (remember, all config variable names must begin with `RESIN_`). Click *Add* to apply:

<img src="/img/configuration/variable_editor_config.png" width="60%">

## Managing Device Configuration Variables

Device configuration variables define the behavior of one device. If both the fleet and the device have a configuration variable of the same name, the code on the device will use the value of the device configuration variable. In other words, device configuration variables redefine (or override) fleet configuration variables.

The device configuration variable list includes the prepopulated default values. Binary (true/false) variables can be easily switched with the provided toggles. Other values can be edited by clicking the small pencil icon:

<img src="/img/configuration/device_config_variables.png" width="100%">

This will pop up a small window for editing the value:

<img src="/img/configuration/edit_device_config.png" width="60%">

Adding a custom device configuration variable is very similar to adding a custom fleet configuration variable: scroll past the prepopulated variables, click *Add custom variable*, define a name and value, and click *Add*.

You can override the value of a custom fleet configuration variable by clicking *override* in the far-right column. This will pop up the variable editing window, where you can change the value:

<img src="/img/configuration/override_config.png" width="60%">

[deltas]:/runtime/delta
[local-mode]:/development/local-mode
[update-locking]:/runtime/update-locking
[boot-config-guide]:/configuration/advanced/#modifying-config-txt-remotely-
