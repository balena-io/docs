<img class="jetson-thumb" src="/img/jetson-orin/J4012_thumb.webp" alt="Seeed reComputer J4012">

#### Seeed reComputer J4012 Jetson Orin NX 16GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J4012 Case](/img/jetson-orin/J4012_case.webp)

The SOM in the Seeed reComputer J4012 is a Jetson Orin NX 16GB, which has the part number 900-13767-0000-000. The J401 carrier board exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin NX SOM. Additionally, a monitor can be connected to the board's HDMI Port.

The default internal storage used for provisioning balenaOS on the Seeed reComputer J4012 Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting via a USB flash drive containing the balenaOS flasher image. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
