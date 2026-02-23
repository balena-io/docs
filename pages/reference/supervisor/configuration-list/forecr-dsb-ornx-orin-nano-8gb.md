The list contains configuration and their respective variables that can be used with balena devices. Some of which will
automatically appear for devices with supervisor v7.0.0 and greater. While they may not automatically populate in the
Configuration dashboard, most of these variables can still be used with older supervisor versions, so be sure to check
the *Supported by* context for each configuration.

In addition to these values, there may be device-type specific configuration variables that can be set. For example,
these are a few of the values that apply to Raspberry Pi devices, corresponding to the contents of the [Raspberry Pi
config.txt file](https://www.raspberrypi.com/documentation/computers/config_txt.html).

{% hint style="danger" %}
Warning: Wrong configuration may potentially leave a device inaccessible. Be sure to try your changes in a controlled
environment before applying them to production devices.
{% endhint %}

| Variable Name | Description | Will reboot | Type | Default |
|---------------|-------------|-------------|------|---------|
| `RESIN_SUPERVISOR_CONNECTIVITY_CHECK` | Enable / Disable Cloudlink connectivity check | No | false, true | true | 
| `RESIN_SUPERVISOR_LOG_CONTROL` | Enable / Disable logs from being sent to balena API | No | false, true | true | 
| `RESIN_SUPERVISOR_POLL_INTERVAL` | Define the balena API poll interval in milliseconds | No | integer | 900000 | 
| `RESIN_SUPERVISOR_VPN_CONTROL` | Enable / Disable Cloudlink service on device | No | false, true | true | 
| `RESIN_SUPERVISOR_PERSISTENT_LOGGING` | Enable persistent logging. Only supported by supervisor versions &gt;&#x3D; v7.15.0. | Yes | false, true | false | 
| `RESIN_SUPERVISOR_INSTANT_UPDATE_TRIGGER` | Enable / Disable triggering updates instantly on startup or after pushing a release. Only supported by supervisor versions &gt;&#x3D; v9.13.0. | No | false, true | true | 
| `RESIN_OVERRIDE_LOCK` | Override existing update lock(s) if your app is stuck in an invalid state under an update lock | No | 0, 1 | 0 | 
| `BALENA_HOST_SPLASH_IMAGE` | Define the PNG image to be used for the boot splash screen. Only supported by supervisor versions &gt;&#x3D; v12.3.0. | Yes | string |  | 
| `BALENA_SUPERVISOR_HARDWARE_METRICS` | Enable / Disable reporting device metrics such as CPU usage for bandwidth conservation. Only supported by supervisor versions &gt;&#x3D; v12.8.0. | No | false, true | true | 
| `BALENA_HOST_CONFIG_power_mode` | Define the device power mode. Supported by OS with Jetpack 6 or higher. Only supported by supervisor versions &gt;&#x3D; v17.1.2. | Yes | string |  | 
| `BALENA_HOST_CONFIG_fan_profile` | Define the device fan profile. Supported by OS with Jetpack 6 or higher. Only supported by supervisor versions &gt;&#x3D; v17.1.2. | No | string |  | 

You can find more information on updating config.txt through configuration variables in our [Advanced Boot Configuration
Guide](../../os/advanced.md#modifying-configtxt-using-configuration-variables). In addition to the
dashboard, this configuration can be also be set using the API or any of its clients, including
the [SDK](../../../external-docs/sdk/node-sdk/latest.md) and [CLI](../../../external-docs/balena-cli/latest.md#env-list).
If you are using configuration to specify i2c or other interfaces, then check out the docs on how to go about
[interacting with hardware](../../../learn/develop/hardware/i2c-and-spi.md).
