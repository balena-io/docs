#### Nvidia Jetson AGX Orin Devkit 32GB

![Jetson AGX Orin Devkit](/img/jetson-orin/AGX_Orin_perspective_2.webp)

The Nvidia Jetson AGX Orin 32GB development kit can be identified by the label printed on the inside bottom of the unit as shown. It mentions part number 975-13730-0000-000 but does not actually say 32GB.

![AGX Orin Devkit 32GB wide shot](/img/jetson-orin/AGX-Orin-64-wide2.webp)

![AGX Orin Devkit 32GB close up](/img/jetson-orin/AGX_Orin_32GB_Devkit_975-13730-0000-000.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 32GB's on-board eMMC, and the <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool is used for provisioning balenaOS. The eMMC is the only boot medium supported for this device type currently.

## Checking your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>
<p>The debug UART interface of the Jetson AGX Orin 32GB Devkit is available through the micro-USB interface, when the device is powered on. Connect the other end of the micro-usb cable to your host/development PC. If your host is running Linux, the serial connection to the Jetson device can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

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
A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson AGX Orin Devkit 32GB to a monitor. Once the monitor is attached, the UEFI firmware version will be displayed at the top of the screen:

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

</details>

If you want to see options for other Orin devices, select the device from the drop down at the top of this page.
