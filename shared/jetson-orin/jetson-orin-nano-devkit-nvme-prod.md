<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Production_module_in_Orin_Nano_devkit_white_background_thumb.webp" alt="Orin Nano Devkit">

#### Nvidia Jetson Orin Nano 8GB Production module

The Orin Nano production module has the part number 900-13767-0030-000, which can be observed on the bottom. The main difference from the Orin Nano SD - 900-13767-0050-000 - is that it does not have an SD card slot. This module can be used with a Jetson Orin Nano Devkit carrier board, along with the balenaOS image for the Jetson Orin Nano 8GB (SD) Devkit, provided that the corresponding kernel device-tree is configured in your balena-cloud device configuration page.

![AGX Orin Nano 8GB](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000.webp)

![AGX Orin Nano 8GB SOM](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000_closeup.webp)

This module can be used with the carrier board provided by the Orin Nano Devkit, which exposes a debug interface on the UART TXD, UART RXD and GND pins. The UART pins are located underneath the Orin module. Additionally, a monitor can be connected to the board's Display Port.

The default internal storage used for provisioning balenaOS on the Orin Nano Production module is an NVMe drive, which needs to be attached to the carrier board prior to booting via a USB flash drive containing the balenaOS flasher image. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
