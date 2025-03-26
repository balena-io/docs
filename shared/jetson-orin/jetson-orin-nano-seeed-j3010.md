<img class="jetson-thumb" src="/img/jetson-orin/j3010_thumb.webp" alt="Seeed reComputer J3010">

#### Seeed reComputer J3010 Jetson Orin Nano 4GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J3010 Case](/img/jetson-orin/J3010_case.webp)

The SOM in the Seeed reComputer J3010 is a Jetson Orin Nano 4GB, which has the part number 900-13767-0040-000. This part number can be found on the bottom of the SOM, if it is taken out of the carrier board:

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000.webp)

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000_closeup.webp)

The J401 carrier board included in the full reComputer J3010 system exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin Nano SOM. Additionally, a monitor can be connected to the board's HDMI Port.

The default internal storage used for provisioning balenaOS on the Seeed reComputer J4012 Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting via a USB flash drive containing the balenaOS flasher image. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section below.
