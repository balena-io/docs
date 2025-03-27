#### Nvidia Jetson Orin Nano 8GB (SD) Devkit NVMe

![Orin Nano 8GB  wide shot](/img/jetson-orin/Orin_Nano_Devkit.webp)

The Orin Nano 8GB SD module has the part number 900-13767-0050-000. This number may not be printed on some modules, however, the part can be distinguished by having an SD-CARD slot.

![Orin Nano 8GB SD card slot](/img/jetson-orin/Nano_SD_in_Devkit.webp)

![Orin Nano 8GB SOM card slot](/img/jetson-orin/Nano_8GB_Devkit_SOM_900-13767-0050-000.webp)

The carrier board exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin module. Additionally, a monitor can be connected to the board's Display Port.

The default internal storage used for provisioning balenaOS on the Orin Nano 8GB (SD) Devkit is an NVMe drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SD card as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.

## Checking your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>
<p>For this step you will need a USB to TTL converter cable. The USB to TTL converter's pins need to be connected to the UART TXD, UART RXD and GND pins on the Jetson carrier board, which are located underneath the Orin module. The other end of the cable should be plugged into the USB port of your host/development PC. Your host PC can connect to the Jetson device using a serial communication program like <code>minicom</code></p>

![Orin Nano Devkit pinout location](/img/jetson-orin/Nano_pinout_with_module_square.webp)

![Orin Nano Devkit UART pins](/img/jetson-orin/Nano_pinout_close_square.webp)

<p>If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp)

<p>Alternatively, if booting is stopped in the UEFI menu by pressing <code>Esc</code>, the firmware version will be printed in the top-left corner:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uart_uefi_menu.webp)

<p>If instead you would like to use a monitor and a keyboard, please expand the section below.</p>

</details>


  <details>
  <summary><b>I want to use a monitor</b></summary>
<br>
A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson Orin Nano to a monitor. Once the monitor is attached, the UEFI firmware version will be displayed at the top of the screen:

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

</details>

<br>
In case the UEFI firmware version on your device is older than v36.3.0, please update its firmware by following any of the guides below:

- [Firmware update for Orin Nano SD-CARD](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#firmware) &#x1F517;
- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

If for whatever reason checking the UEFI firmware version is not possible, flashing Jetpack 6 using the SDK Manager will guarantee your device has the latest firmware installed.

Once your device's UEFI firmware is v36.3.0 or newer, you can use a USB flash drive to provision it directly with balenaOS.

## Booting balenaOS flasher images from a USB flash drive

If the firmware on your device is v36.3.0 or newer, inserting the USB flash drive with the balenaOS flasher image and connecting power to your device will provision the internal storage.
In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB flash drive automatically, use the following steps to manually select the USB flash drive for booting:

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>1) For this step you will need a USB to TTL converter cable. The USB to TTL converter's pins need to be connected to the UART TXD, UART RXD and GND pins on the Jetson carrier board, which are located underneath the Orin module. The other end of the cable should be plugged into the USB port of your host/development PC. Your host PC can connect to the Jetson device using a serial communication program like <code>minicom</code>

![Orin Nano Devkit pinout location](/img/jetson-orin/Nano_pinout_with_module_square.webp)

![Orin Nano Devkit UART pins](/img/jetson-orin/Nano_pinout_close_square.webp)

</p>

<p>2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly:<br> 

![Orin UEFI boot menu UART](/img/jetson-orin/interrupt_boot_uart.webp)

<p>If <code>Esc</code> was pressed, navigate to the Boot Manager Menu:</p>

![Orin UEFI Boot Manager on UART](/img/jetson-orin/boot_manager_uart.webp)

<p>3) Select the attached USB device as boot media:</p>

![Orin UEFI USB boot](/img/jetson-orin/usb_device.webp)

<p>4) Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.</p>

<p>5) Remove and re-connect power to the carrier board.</p>

<p>6) Your device should appear in your application dashboard within a few minutes.</p>

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool to flash your device in recovery boot mode.

If instead you would like to use a monitor and a keyboard, please expand the section below. 
</details>

<details>
<summary><b>I want to use a keyboard and monitor</b></summary>
<br>
A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson Orin Nano to a monitor.

1) Attach a USB keyboard and a monitor to the device.

2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly:

![Interrupting boot in UEFI](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

![UEFI Boot Manager](/img/jetson-orin/jetson_orin_uefi_boot_manager.webp)

3) Select the attached USB flash drive as boot media:

![UEFI Boot from USB flash drive](/img/jetson-orin/jetson_orin_uefi_usb_key.webp)

4) Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.

5) Remove and re-connect power to the carrier board.

6) Your device should appear in your application dashboard within a few minutes.

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool to flash your device in recovery boot mode.
</details>
<br>

## Post-provisioning UEFI firmware update

Once your device has been provisioned with balenaOS and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

__Note:__ Please do not interrupt the UEFI firmware process by resetting or cutting power to the device.

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:
                                                                                                                                               
![Orin UEFI firmware update progress](/img/jetson-orin/post_provisioning_uefi_firmware_update.webp)

If a display is connected to the device, the firmware update process will also be rendered on the screen:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)
