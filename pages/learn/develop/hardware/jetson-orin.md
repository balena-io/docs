---
title: Nvidia Jetson Orin
---

# Nvidia Jetson Orin &trade;

## Supported Jetson Orin &trade; Devices 

<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 32GB">
<details>
<summary><b>AGX Orin Devkit 32GB</b></summary>

#### Nvidia Jetson AGX Orin Devkit 32GB
The Nvidia Jetson AGX 32GB development kit can be identified by the label printed on the inside bottom of the unit as shown. It mentions part number 975-13730-0000-000 but does not actually say 32GB.
<br>
![AGX Orin Devkit 32GB wide shot](/img/jetson-orin/AGX-Orin-64-wide2.webp)
<br>
![AGX Orin Devkit 32GB close up](/img/jetson-orin/AGX_Orin_32GB_Devkit_975-13730-0000-000.webp)
<br>
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 64GB">
<details>
<summary><b>AGX Orin Devkit 64GB</b></summary>

#### Nvidia Jetson AGX Orin Devkit 64GB
The Nvidia Jetson 64 GB development kit also has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.
<br>
![AGX Orin Devkit 64GB wide shot](/img/jetson-orin/AGX-Orin-64-wide.webp)
<br>
![AGX Orin Devkit 64GB close up](/img/jetson-orin/orin-64GB-close.webp)
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Devkit_thumb.webp" alt="Orin Nano Devkit">
<details>
<summary><b>Orin Nano 8GB (SD) Devkit NVME</b></summary>
<br>

#### Nvidia Jetson Orin Nano 8GB (SD) Devkit NVME

![AGX Orin Nano 8GB  wide shot](/img/jetson-orin/Orin_Nano_Devkit.webp)

The Orin Nano 8GB SD module has the part number 900-13767-0050-000. This number may not be printed on some modules, however, the part can be distinguished by having an SD-CARD slot.

![AGX Orin Nano 8GB SD card slot](/img/jetson-orin/Nano_SD_in_Devkit.webp)
<br>
![AGX Orin Nano 8GB SOM card slot](/img/jetson-orin/Nano_8GB_Devkit_SOM_900-13767-0050-000.webp)
<br>
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Production_module_in_Orin_Nano_devkit_white_background_thumb.webp" alt="Orin Nano Devkit">
<details>
<summary><b>Orin Nano 8GB Production module</b></summary>

#### Nvidia Jetson Orin Nano 8GB Production module

The Orin Nano production module has the part number 900-13767-0030-000, which can be observed on the bottom. The main difference from the Orin Nano SD - 900-13767-0050-000 -  is that it does not have an SD card slot. This module can be used with a Jetson Orin Nano Devkit carrier board, along with the balenaOS image for the Jetson Orin Nano 8GB (SD) Devkit, provided that the corresponding kernel device-tree is configured in your balena-cloud device configuration page.

![AGX Orin Nano 8GB](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000.webp)
<br>
![AGX Orin Nano 8GB SOM](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000_closeup.webp)
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Jetson_Orin_NX_in_Xavier_NX_Devkit_thumb.webp" alt="Orin NX">
<details>
<summary><b>Nvidia Jetson Orin NX 16GB in Xavier NX Devkit NVME</b></summary>

#### Nvidia Jetson Orin NX 16GB in Xavier NX Devkit NVME

![AGX Orin NX 16GB SOM](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000.webp)
<br>
Part number 900-13767-0000-000 is printed on the right side of the SOM bottom side, and can only be observed if the module is taken out of the devkit:

![AGX Orin NX 16GB SOM close up](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000_closeup.webp)
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/J4012_thumb.webp" alt="Seeed reComputer J4012">
<details>
<summary><b>Seeed reComputer J4012 Jetson Orin NX 16GB</b></summary>
<br>

#### Seeed reComputer J4012 Jetson Orin NX 16GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J4012 Case](/img/jetson-orin/J4012_case.webp)

The SOM in the Seeed reComputer J012 is a Jetson Orin NX 16GB, which has the part number 900-13767-0000-000 

</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/j3010_thumb.webp" alt="Seeed reComputer J3010">
<details>
<summary><b>Seeed reComputer J3010 Jetson Orin Nano 4GB</b></summary>

#### Seeed reComputer J3010 Jetson Orin Nano 4GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J3010 Case](/img/jetson-orin/J3010_case.webp)

The SOM in the Seeed reComputer J3010 is a Jetson Orin Nano 4GB, which has the part number 900-13767-0040-000. This part number can be found on the bottom of the SOM, if it is taken out of the carrier board:

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000.webp)

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000_closeup.webp)

</details>

## Checking your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the TX, RX and GND pins on the Jetson carrier board, which are located underneath the Orin module.</p>

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

<p>If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp)

<p>Alternatively, if booting is stopped in the UEFI menu by pressing <code>Esc</code>, the firmware version will be printed in the top-left corner:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uart_uefi_menu.webp)

<p>If instead you would like to use a monitor and a keyboard, please expand the section below. </p>

</details>


<details>
<summary><b>I want to use a monitor</b></summary>
<br>

<p>If your Jetson Orin is connected to a monitor, the UEFI firmware version will be displayed at the top of the screen:</p>

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

</details>

<details>
    <summary><b>What type of video cable do I need for my device?</b></summary>
    <br>
    A Display Port cable or Display Port to HDMI adapter is necessary on the following devices:<br>
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
If the firmware version on your device is older or newer than v36.3, please re-flash its firmware by following the corresponding guide below:

- [Firmware update for Orin Nano SD-CARD](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#firmware) &#x1F517;
- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

## Booting balenaOS flasher images from a USB key

In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB key automatically, please use the following steps to manually select the USB key for booting:

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>1) If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the UART TXD, UART RXD and GND pins of the Jetson carrier board, which are located underneath the Orin module.

![Orin Nano Devkit pinout location](/img/jetson-orin/Nano_pinout_with_module_square.webp)

![Orin Nano Devkit UART pins](/img/jetson-orin/Nano_pinout_close_square.webp)

</p>

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.

![AGX Orin microUSB debug port](/img/jetson-orin/AGX_Orin_DP_microUSB_square.webp)

</p>

<p>2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br> 

![Orin UEFI boot menu UART](/img/jetson-orin/interrupt_boot_uart.webp)

<p>If <code>Esc</code> was pressed, navigate to the Boot Manager Menu</p>

![Orin UEFI Boot Manager on UART](/img/jetson-orin/boot_manager_uart.webp)

<p>3) Select the attached USB device as boot media</p>

![Orin UEFI USB boot](/img/jetson-orin/usb_device.webp)

<p>4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.</p>

</details>

<details>
<summary><b>I want to use a keyboard and monitor</b></summary>
<br>
1) Attach a USB keyboard and a monitor to the device.<br>
2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br>

![Interrupting boot in UEFI](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

![UEFI Boot Manager](/img/jetson-orin/jetson_orin_uefi_boot_manager.webp)

3) Select the attached USB key as boot media:

![UEFI Boot from USB Key](/img/jetson-orin/jetson_orin_uefi_usb_key.webp)

4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.<br>
</details>
<br>

Should you encounter any other unexpected issues while provisioning your device, please follow the instructions for our [Jetson Flash tool](https://github.com/balena-os/jetson-flash?tab=readme-ov-file#instructions) to flash your device in recovery boot mode.

## Post-provisioning UEFI firmware update

Once your device has been provisioned and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

**Please do not interrupt this process by resetting or cutting power to the device.**<br>

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:
                                                                                                                                               
![Orin UEFI firmware update progress](/img/jetson-orin/post_provisioning_uefi_firmware_update.webp)

If a display is connected to the device, the firmware update process will also be rendered on the screen:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)

