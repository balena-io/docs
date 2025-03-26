<img class="jetson-thumb" src="/img/jetson-orin/Jetson_Orin_NX_in_Xavier_NX_Devkit_thumb.webp" alt="Orin NX">

#### Nvidia Jetson Orin NX 16GB in Xavier NX Devkit NVME

![AGX Orin NX 16GB SOM](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000.webp)

Part number 900-13767-0000-000 is printed on the right side of the SOM bottom side, and can only be observed if the module is taken out of the devkit:

![AGX Orin NX 16GB SOM close up](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000_closeup.webp)

The Jetson Orin NX 16GB module can be used with the Xavier NX Devkit, which exposes a debug interface on the UART TXD, UART RXD and GND pins. The UART pins are located underneath the Orin NX module. Additionally, a monitor can be connected to the board's HDMI port.

The default internal storage used for provisioning balenaOS on the Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting via a USB flash drive containing the balenaOS flasher image. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.