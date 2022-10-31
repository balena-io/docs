Next you will need to flash the downloaded image onto your {{ $device.name }}'s internal eMMC.
To flash the image onto the device, we suggest using {{ $names.company.lower }}’s [Etcher][etcher-link].
Support for the {{ $device.name }} is available on Etcher starting from version 1.2.1 for OSX and Windows (Windows requires the Raspberry Pi Foundation [usbboot drivers](https://github.com/raspberrypi/usbboot/blob/master/win32/rpiboot_setup.exe) to be installed).

If you want to use the tool provided by the Raspberry Pi Foundation for flashing instead, please follow their instructions [here](https://www.raspberrypi.com/documentation/computers/compute-module.html#flashing-the-compute-module-emmc).

Once everything is set up, launch Etcher and connect your {{ $device.name }} via the Micro USB programming port.
If you are using a {{ $device.name }} v1.0.x, you will also need to connect either the barrel jack or the phoenix connector for power.

The {{ $device.name }} eMMC should be detected on your computer by Etcher, after a couple of seconds, which will initialize and list the board as a Compute Module based device.
Select the downloaded image and press the "Flash!" button.

<img src="/img/fincm3/etcher-usbboot.png" width="100%">

After flashing is complete, power off your {{ $device.name }} and unplug the programming micro-USB cable.
Powering the {{ $device.name }} on will now allow the device to boot the balena OS image from the eMMC.

__Note:__ You can flash several {{ $device.name }}s with the same OS image file and subsequent devices will boot and provision into your fleet.
You can also disable the auto-ejecting or validation steps from the __Etcher__ settings panel.

[etcher-link]:https://www.balena.io/etcher
