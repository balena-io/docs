The next step is to flash the downloaded image onto your {{ $device.name }}'s internal eMMC. The easiest way to flash the image onto the device is using {{ $names.company.lower }}’s [Etcher][etcher-link]. Support for the CM3L is available on Etcher starting from version 1.2.1 for OSX and Windows (Windows still needs the Raspberry Pi Foundation [usbboot drivers](https://github.com/raspberrypi/usbboot/blob/master/win32/rpiboot_setup.exe) installed).

The Raspberry Pi Foundation provides a tool that allows the Compute Module to expose the eMMC as a mass storage device that can be flashed like any other media. If you want to use the tool provided by the Raspberry Pi Foundation instead, please follow their instructions [here](https://www.raspberrypi.org/documentation/hardware/computemodule/cm-emmc-flashing.md).

Once you have everything set up, run Etcher on your computer, connect your {{ $device.name }} to your laptop via a micro usb cable plugged into the port next to the label `MAX ADD`. Now power the {{ $device.name }} via the 10.7 - 28.8V power connectors.

After a couple of seconds, the {{ $device.name }}'s eMMC should be detected on your computer by Etcher, which will initialize and list the board as a Compute Module based device (naming might change in the future). Select the downloaded image and press the “Flash!” button.

<img src="/img/fincm3/etcher-usboot.png" width="100%">

After flash is complete, power off your {{ $device.name }} and unplug the micro-USB cable. Powering the {{ $device.name }} on will now result in the device booting from the freshly-written eMMC.

__Note:__ You can flash several {{ $device.name }}s with the same OS image file and all the devices will boot and provision into your application's fleet. You can also disable the auto-ejecting or validation steps from the **Etcher** settings panel.

[etcher-link]:https://www.balena.io/etcher
