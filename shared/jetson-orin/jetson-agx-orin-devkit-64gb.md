#### Nvidia Jetson AGX Orin Devkit 64GB
The Nvidia Jetson AGX Orin 64 GB development kit has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.

![AGX Orin Devkit 64GB wide shot](/img/jetson-orin/AGX-Orin-64-wide.webp)

![AGX Orin Devkit 64GB close up](/img/jetson-orin/orin-64GB-close.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 64GB's on-board eMMC. If instead you would like to use an NVMe drive as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.

## Checking your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>
<p>The debug UART interface of the Jetson AGX Orin 64GB Devkit is available through the micro-USB interface, when the device is powered on. Connect the other end of the micro-usb cable to your host/development PC. If your host is running Linux, the serial connection to the Jetson device can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

![AGX Orin microUSB debug port](/img/jetson-orin/AGX_Orin_DP_microUSB_square.webp)

<p>If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp)

<p>Alternatively, if booting is stopped in the UEFI menu by pressing <code>Esc</code>, the firmware version will be printed in the top-left corner:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uart_uefi_menu.webp)

<p>If instead you would like to use a monitor and a keyboard, please expand the section below.</p>

</details>
  <details>
  <summary><b>I want to use a monitor</b></summary>
<br>
A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson AGX Orin Devkit 64GB to a monitor. Once the monitor is attached, the UEFI firmware version will be displayed at the top of the screen:

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

</details>

<br>
In case the UEFI firmware version on your device is older than v36.3.0, please update its firmware using the following guide:

- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

If for whatever reason checking the UEFI firmware version is not possible, flashing Jetpack 6 using the SDK Manager will guarantee your device has the latest firmware installed.

Once your device's UEFI firmware is v36.3.0 or newer, you can use a USB flash drive to provision it directly with balenaOS.

## Booting balenaOS flasher images from a USB flash drive

If the firmware on your device is v36.3.0 or newer, inserting the USB flash drive with the balenaOS flasher image and connecting power to your device will provision the internal storage.
In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB flash drive automatically, use the following steps to manually select the USB flash drive for booting:

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>
<p>1)The debug UART interface of the Jetson AGX Orin 64GB Devkit is available through the micro-USB interface, when the device is powered on. Connect the other end of the micro-usb cable to your host/development PC. If your host is running Linux, the serial connection to the Jetson device can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

![AGX Orin microUSB debug port](/img/jetson-orin/AGX_Orin_DP_microUSB_square.webp)

<p>2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br> 

![Orin UEFI boot menu UART](/img/jetson-orin/interrupt_boot_uart.webp)

<p>If <code>Esc</code> was pressed, navigate to the Boot Manager Menu</p>

![Orin UEFI Boot Manager on UART](/img/jetson-orin/boot_manager_uart.webp)

<p>3) Select the attached USB device as boot media</p>

![Orin UEFI USB boot](/img/jetson-orin/usb_device.webp)

<p>4) Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.</p>

<p>5) Press the power button of your Jetson AGX Orin 64GB to initiate booting.</p>

<p>6) Your device should appear in your application dashboard within a few minutes.</p>

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool to flash your device in recovery boot mode.

If instead you would like to use a monitor and a keyboard, please expand the section below. 
</details>

<details>
<summary><b>I want to use a keyboard and monitor</b></summary>
<br>
<b>A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson AGX Orin Devkit 64GB to a monitor.</b>

1) Attach a USB keyboard and a monitor to the device.

2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.

![Interrupting boot in UEFI](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

![UEFI Boot Manager](/img/jetson-orin/jetson_orin_uefi_boot_manager.webp)

3) Select the attached USB flash drive as boot media:

![UEFI Boot from USB flash drive](/img/jetson-orin/jetson_orin_uefi_usb_key.webp)

4) Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.

5) If your device uses an Orin Nano or an Orin NX module, remove and re-connect power to the carrier board. If it is an AGX Orin 64GB, press the power button to initiate booting.

6) Your device should appear in your application dashboard within a few minutes.

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool to flash your device in recovery boot mode.
</details>
<br>
