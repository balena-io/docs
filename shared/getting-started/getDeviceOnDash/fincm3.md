The next step is to flash the downloaded image onto your {{ $device.name }}'s internal eMMC. The easiest way to flash the image onto the device is using {{ $names.company.lower }}’s [Etcher][etcher-link]. Support for the CM3L is available on Etcher starting from version 1.2.1 for OSX and Windows (Windows still needs the Raspberry Pi Foundation [usbboot drivers](https://github.com/raspberrypi/usbboot/blob/master/win32/rpiboot_setup.exe) installed).

The Raspberry Pi Foundation provides a tool that allows the Compute Module to expose the eMMC as a mass storage device that can be flashed like any other media. If you want to use the tool provided by the Raspberry Pi Foundation instead, please follow their instructions [here](https://www.raspberrypi.com/documentation/computers/compute-module.html#flashing-the-compute-module-emmc).

Once you have everything set up, run Etcher on your computer, connect your balena Fin via CM3L Debug (see USB_DBG on Image 1) and power it (see BARREL_JACK on Image 1).

After a couple of seconds, the balena Fin eMMC should be detected on your computer by Etcher, which will initialize and list the board as a Compute Module based device (naming might change in the future). Select the downloaded image and press the “Flash!” button.

<img src="/img/fincm3/etcher-usboot.png" width="100%">

After flash is complete, power off your balena Fin and unplug the DEBUG micro-USB cable. Powering the balena Fin on will now result in the device booting from the freshly-written eMMC.

__Note:__ You can flash several {{ $device.name }}s with the same OS image file and all the devices will boot and provision into your fleet. You can also disable the auto-ejecting or validation steps from the **Etcher** settings panel.

[etcher-link]:https://www.balena.io/etcher
