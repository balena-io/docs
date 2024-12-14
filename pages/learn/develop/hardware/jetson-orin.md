---
title: Provisioning Jetson Orin
---

# Provisioning Jetson Orin

## Check your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

The debug UART interface can be accessed on the Orin Nano and Orin NX devices by connecting a USB to RS232 converter to the TX, RX and GND pins on the carrier board, which are located underneath the Orin module.

On AGX Orin Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using `minicom -D /dev/ttyACM0`.

If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp)

Alternatively, if booting is stopped in the UEFI menu by pressing `Esc`, the firmware version will be printed in the top-left corner:

![Orin UEFI uart menu](/img/jetson-orin/jetson_orin_uart_uefi_menu.webp)

If your Orin is connected to a monitor, the UEFI firmware version will be displayed at the top of the screen:

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

If the firmware version is older or newer than v36.3, please re-flash its firmware by following the corresponding guide below:

- [Firmware update for Orin Nano SD-CARD](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#firmware)
- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager)

## Booting balenaOS flasher images from a USB key

In the unexpected event that your device does not boot the balenaOS flasher image from an attached USB key automatically, please follow the following steps to make the USB key the boot media to boot from:

1) Attach a USB keyboard and a monitor to the device.
2) Power on the device and press 'Esc' when prompted by the UEFI firmware, or 'F11' to enter the Boot Manager Menu directly.
![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)
![Orin UEFI boot manager](/img/jetson-orin/jetson_orin_uefi_boot_manager.webp)
3) Select the attached USB key as boot media:
![Orin UEFI boot manager](/img/jetson-orin/jetson_orin_uefi_usb_key.webp)
4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.

Should you encounter any other unexpected issues while provisioning your device, please follow the [Jetson Flash flashing instructions](https://github.com/balena-os/jetson-flash?tab=readme-ov-file#instructions) to flash your device in recovery boot mode.

## Post-provisioning UEFI firmware update

Once your device has been provisioned and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)

Please do not interrupt this process by reseting or cutting power from the device.
