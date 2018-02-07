---
title: Configuration Variables
---

# Configuration Variables

Configuration variables allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `RESIN_`. Beginning with supervisor v7.0.0, a number of them appear automatically in your dashboard when your device is provisioned.

Configuration variables can be managed at the fleet and device levels.

## Variable List

This list contains the configuration variables that automatically appear for devices with supervisor v7.0.0 and greater. including the default values. While they may not automatically populate on older supervisor versions, some of these variables can still be used, so be sure to check the *Valid for* column:

Name | Default | Description | Valid for
--- | --- | --- | ---
RESIN_HOST_LOG_TO_DISPLAY | true | |
RESIN_SUPERVISOR_CONNECTIVITY_CHECK | true | |
RESIN_SUPERVISOR_DELTA | true | |
RESIN_SUPERVISOR_DELTA_APPLY_TIMEOUT | | |
RESIN_SUPERVISOR_DELTA_REQUEST_TIMEOUT | | |
RESIN_SUPERVISOR_DELTA_RETRY_COUNT | | |
RESIN_SUPERVISOR_DELTA_RETRY_INTERVAL | | |
RESIN_SUPERVISOR_LOCAL_MODE | false | |
RESIN_SUPERVISOR_LOG_CONTROL | true | |
RESIN_SUPERVISOR_POLL_INTERVAL | 60000 | |
RESIN_SUPERVISOR_POLL_INTERVAL | true | |

In addition to these values, there may be some configuration specific to your device type that is automatically populated. For example, these values appear by default for a Raspberry Pi 3, reflecting the contents of the `config.txt` file:

Name | Default | Description 
--- | --- | ---
RESIN_HOST_CONFIG_disable_splash | 1 |
RESIN_HOST_CONFIG_dtparam | "i2c_arm=on","spi=on","audio=on" |
RESIN_HOST_CONFIG_enable_uart | 1 |
RESIN_HOST_CONFIG_gpu_mem | 16 |

## Managing Fleet Configuration Variables

Configuration variables defined on the fleet level control the behavior of any devices running in that fleet, unless they are redefined with a device configuration variable of the same name.

To define a new fleet configuration variable, make sure you are in the *Fleet Configuration* tab, then click the *Add variable* button in the upper-left corner:

<img src="/img/configuration/add_fleet_configuration.png" width="40%">

A new window will pop up, allowing you to define the name and value for your configuration variable. Click *Add* to apply to all devices in your fleet that do not already have an identical device configuration variable defined:

<img src="/img/configuration/variable_editor_config.png" width="60%">

Any devices in your fleet will have a number of configuration variables already defined. These will appear in a list below your fleet configuration variables. You can easily apply a device value to the entire fleet by clicking *Define app-wide*:

<img src="/img/configuration/define_app_wide_config.png" width="100%">

## Managing Device Configuration Variables

Device configuration variables define the behavior of one device. If both the fleet and the device have a configuration variable of the same name, the code on the device will use the value of the device configuration variable. In other words, device configuration variables redefine (or override) fleet configuration variables.

Adding a device configuration variable is very similar to adding an fleet configuration variable. From the device summary page, select the *Device Configuration* tab, click *Add variable*, define a name and value, and click *Add*.

The device configuration variable list will include both values defined for that specific device, as well as any fleet configuration variables: 

<img src="/img/configuration/device_config_variables.png" width="100%">

You can override the value of a fleet configuration variable by clicking *override* in the far-right column. This will pop up the variable editing window, where you can change the value:

<img src="/img/configuration/override_config.png" width="60%">
