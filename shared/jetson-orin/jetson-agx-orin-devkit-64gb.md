#### Nvidia Jetson AGX Orin Devkit 64GB
The Nvidia Jetson AGX Orin 64 GB development kit also has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.

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
In case the UEFI firmware version on your device is older than v36.3.0, please update its firmware by following this guide: [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

If for whatever reason checking the UEFI firmware version is not possible, flashing Jetpack 6 using the SDK Manager will guarantee your device has the latest firmware installed.

Once your device's UEFI firmware is v36.3.0 or newer, you can use a USB flash drive to provision it directly with balenaOS.
