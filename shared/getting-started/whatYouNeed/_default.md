<!-- Once device images are available in device contracts this can be uncommented -->
<!-- <img height=150px style="float: right;padding-left: 10px;" src="/img/{{ $device.id }}/{{ $device.id }}.jpg" width="30%"> -->

* The device: {{ $device.name }}. Checkout our [supported devices list][supportedDevicesList].
* A tool to flash the new operating system on to the device. We recommend [Etcher](https://www.balena.io/etcher).
* A way of connecting the device to the internet, either through wifi (if available) or ethernet cable.
* A method of reliably powering the device.
* A [{{ $names.cloud.lower }} account][link-to-signup].
* Install [balena CLI](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md) to develop & manage your device on balenaCloud


[supportedDevicesList]:/reference/hardware/devices/
[link-to-signup]:{{ $links.dashboardUrl }}/signup
