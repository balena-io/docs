<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 32GB">

#### Nvidia Jetson AGX Orin Devkit 32GB
The Nvidia Jetson AGX Orin 32GB development kit can be identified by the label printed on the inside bottom of the unit as shown. It mentions part number 975-13730-0000-000 but does not actually say 32GB.

![AGX Orin Devkit 32GB wide shot](/img/jetson-orin/AGX-Orin-64-wide2.webp)

![AGX Orin Devkit 32GB close up](/img/jetson-orin/AGX_Orin_32GB_Devkit_975-13730-0000-000.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 32GB's on-board eMMC. Currently, this is the only boot medium supported for this device type.
