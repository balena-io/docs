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
{{#each $variables}}
| `{{this.name}}` | {{this.description}} | {{this.willReboot}} | {{this.type}} | {{this.default}} | 
{{/each}}

You can find more information on updating config.txt through configuration variables in our [Advanced Boot Configuration
Guide](../../os/advanced.md#modifying-configtxt-using-configuration-variables). In addition to the
dashboard, this configuration can be also be set using the API or any of its clients, including
the [SDK](../../../../external-docs/node-sdk/latest.md) and [CLI](../../../../external-docs/balena-cli/latest.md#env-list).
If you are using configuration to specify i2c or other interfaces, then check out the docs on how to go about
[interacting with hardware](../../../learn/develop/hardware/i2c-and-spi.md).
