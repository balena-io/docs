{{import "getting-started/flashingOsToBootMedia"}}

Unplug the **{{ $device.name }}** and [change the boot mode switches][boot-switches] to boot from the SD card. Insert the SD card into your **{{ $device.name }}** and then power on the board using a 2-3A power cable connected to the USB-C port labeled "PWR".

__Warning:__ This will completely erase the internal storage media, so make a backup first.

When flashing is complete, your board will shutdown. Unplug the power, remove the SD card, and reset the boot switches to eMMC mode. Then power on the **{{ $device.name }}** again to boot the device from eMMC. It will take a minute or two for the **{{ $device.name }}** to appear on your {{ $names.company.lower }} [dashboard][dashboard].

You should now be ready to deploy some code!

[boot-switches]:https://coral.ai/docs/dev-board/reflash/#flash-from-u-boot-on-an-sd-card
