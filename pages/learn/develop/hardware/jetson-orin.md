---
title: Provisioning Jetson Orin
---

# Provisioning Jetson Orin

## Check your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the TX, RX and GND pins on the Jetson carrier board, which are located underneath the Orin module.</p>

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

<p>If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:</p>

<img src="/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp" alt="Orin UEFI uart logs">

<p>Alternatively, if booting is stopped in the UEFI menu by pressing <code>Esc</code>, the firmware version will be printed in the top-left corner:</p>

<img src="/img/jetson-orin/jetson_orin_uart_uefi_menu.webp" alt="Orin UEFI uart menu">

<p> If instead you would like to use a monitor and a keyboard, please expand the section below. </p>

</details>


<details>
<summary><b>I want to use a monitor</b></summary>
<br>

    <details>
    <summary><b><i>What type of video cable do I need for my device?</i></b></summary>
    <br>
    A Display Port cable, or Display Port to HDMI adapter - depending on the available input sources on your monitor - is necessary on the following devices:<br>
      * Jetson AGX Orin 32GB<br>
      * Jetson AGX Orin 64GB<br>
      * Jetson Orin Nano Devkit<br>
    <br>
    An HDMI cable is required for:<br>
      * Jetson Orin NX in Xavier NX Devkit<br>
      * Seeed J3010<br>
      * Seeed J4012<br>
    </details>
<br>
<p>If your Jetson Orin is connected to a monitor, the UEFI firmware version will be displayed at the top of the screen:</p>

<img src="/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp" alt="Orin UEFI display menu">

</details>

<br>
If the firmware version is older or newer than v36.3, please re-flash its firmware by following the corresponding guide below:

- [Firmware update for Orin Nano SD-CARD](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#firmware) &#x1F517;
- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

## Booting balenaOS flasher images from a USB key

In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB key automatically, please follow the following steps to make the USB key the boot media to boot from:

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>1)If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the TX, RX and GND pins on the Jetson carrier board, which are located underneath the Orin module.</p>

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br> 

<img src="/img/jetson-orin/interrupt_boot_uart.webp">

<p>If <code>Esc</code> was pressed, navigate to the Boot Manager Menu</p>

<img src="img/jetson-orin/boot_manager_uart.webp">

<p>3) Select the attached USB device as boot media</p>

<img src="/img/jetson-orin/usb_device.webp">

<p>4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.</p>

</details>

<details>
<summary><b>I want to use a keyboard and monitor</b></summary>
<br>

1) Attach a USB keyboard and a monitor to the device.<br>
2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br>
<img src="/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp"><br>
<img src="/img/jetson-orin/jetson_orin_uefi_boot_manager.webp"><br>
3) Select the attached USB key as boot media:<br>
<img src="/img/jetson-orin/jetson_orin_uefi_usb_key.webp"><br>
4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.<br>

</details>
<br>

Should you encounter any other unexpected issues while provisioning your device, please follow the instructions for our [Jetson Flash tool](https://github.com/balena-os/jetson-flash?tab=readme-ov-file#instructions) to flash your device in recovery boot mode.

## Post-provisioning UEFI firmware update

Once your device has been provisioned and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

**Please do not interrupt this process by reseting or cutting power to the device.**<br>

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:
                                                                                                                                               
![Orin UEFI firmware update progress](/img/jetson-orin/post_provisioning_uefi_firmware_update.webp)

If a display is connected to the device, the firmware update process will also be rendered on the screen:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)

