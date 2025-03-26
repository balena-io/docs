<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 64GB">

#### Nvidia Jetson AGX Orin Devkit 64GB
The Nvidia Jetson AGX Orin 64 GB development kit also has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.

![AGX Orin Devkit 64GB wide shot](/img/jetson-orin/AGX-Orin-64-wide.webp)

![AGX Orin Devkit 64GB close up](/img/jetson-orin/orin-64GB-close.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 64GB's on-board eMMC. If instead you would like to use an NVMe drive as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
