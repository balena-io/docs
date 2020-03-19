{{import "getting-started/flashingOsToBootMedia"}}

Before you can flash your **{{ $device.name }}** with {{ $names.os.lower }}, you'll need to make sure it has a compatible version of [JetPack](https://developer.nvidia.com/embedded/jetpack) installed. We currently recommend version 3.2 with L4T R28.2, as this is the latest we have tested for support, and other versions might not boot {{ $names.os.lower }}. If you need to install a different version, you can find instructions on the [Nvidia website](http://docs.nvidia.com/jetpack-l4t/#developertools/mobile/jetpack/l4t/3.2/install.htm).

Once you have a compatible version of JetPack, make sure your **{{ $device.name }}** development board is powered off. Insert the SD card you've flashed with {{ $names.os.lower }} and plug in the power cord. Press and hold the power button for one second to turn the device on.

__Note:__ This will also completely erase internal storage media, so please make a backup first.

<img src="/img/jetson-tx2/tx2devboard.png" width="40%">

At this point your device will attempt to connect to the internet. If you selected WiFi as your connectivity type, remember to attach the WiFi antennas before booting the board. If you selected ethernet, make sure your ethernet cable is plugged in. Your device should show up on the dashboard in 10 minutes or less.

After the device has been provisioned, it will shut itself off automatically. You can safely remove the SD card.

Your **{{ $device.name }}** is now ready to run an application. Press the power button once more to turn it on, and get ready to make your first code deploy!
