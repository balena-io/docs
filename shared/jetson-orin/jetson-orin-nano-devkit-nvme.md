<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Devkit_thumb.webp" alt="Orin Nano Devkit">

#### Nvidia Jetson Orin Nano 8GB (SD) Devkit NVMe

![AGX Orin Nano 8GB  wide shot](/img/jetson-orin/Orin_Nano_Devkit.webp)

The Orin Nano 8GB SD module has the part number 900-13767-0050-000. This number may not be printed on some modules, however, the part can be distinguished by having an SD-CARD slot.

![AGX Orin Nano 8GB SD card slot](/img/jetson-orin/Nano_SD_in_Devkit.webp)

![AGX Orin Nano 8GB SOM card slot](/img/jetson-orin/Nano_8GB_Devkit_SOM_900-13767-0050-000.webp)

The carrier board exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin module. Additionally, a monitor can be connected to the board's Display Port.

The default internal storage used for provisioning balenaOS on the Orin Nano 8GB (SD) Devkit is an NVMe drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SD card as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.

