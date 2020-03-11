Next, we will flash the downloaded image onto the device. To do so, follow the following steps:

<!-- Loop through device instructions-->
{{#$device.instructions}}
  * {{{ i }}} 
{{/$device.instructions}}

When complete, after a minute or two the device should appear on your {{$names.cloud.lower}} [dashboard][dashboard], and you should now be ready to deploy some code!

##### Help! My device won't show up.
If your device still hasn't shown up on your dashboard after a few minutes, something is definitely wrong. First check, if using WiFi, you entered the credentials correctly, and ensure that your network meets these [basic requirements][networkRequirements]. Also, see our [troubleshooting guide][troubleshooting].

If you still can't get your device online, come on over and talk to us on our [support channel][usingSupport].

[dashboard]:{{ $links.dashboardUrl }}/
[networkRequirements]:/reference/OS/network/2.x/#network-requirements
[troubleshooting]:/faq/troubleshooting/troubleshooting/
[usingSupport]:/support/
