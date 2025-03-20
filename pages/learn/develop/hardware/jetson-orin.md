---
title: Nvidia Jetson Orin
---

# Nvidia Jetson Orin &trade;

## Supported Jetson Orin &trade; Devices 

<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 32GB">
<details>
<summary><b>AGX Orin Devkit 32GB</b></summary>

#### Nvidia Jetson AGX Orin Devkit 32GB
The Nvidia Jetson AGX 32GB development kit can be identified by the label printed on the inside bottom of the unit as shown. It mentions part number 975-13730-0000-000 but does not actually say 32GB.

<br>

![AGX Orin Devkit 32GB wide shot](/img/jetson-orin/AGX-Orin-64-wide2.webp)


![AGX Orin Devkit 32GB close up](/img/jetson-orin/AGX_Orin_32GB_Devkit_975-13730-0000-000.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 32GB's on-board eMMC.

<br>
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/AGX_Orin_Perspective_thumb.webp" alt="AGX Orin 64GB">
<details>
<summary><b>AGX Orin Devkit 64GB</b></summary>

#### Nvidia Jetson AGX Orin Devkit 64GB
The Nvidia Jetson 64 GB development kit also has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.
<br>

![AGX Orin Devkit 64GB wide shot](/img/jetson-orin/AGX-Orin-64-wide.webp)

![AGX Orin Devkit 64GB close up](/img/jetson-orin/orin-64GB-close.webp)

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 64GB's on-board eMMC. If instead you would like to use a NVME drive as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.

</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Devkit_thumb.webp" alt="Orin Nano Devkit">
<details>
<summary><b>Orin Nano 8GB (SD) Devkit NVME</b></summary>
<br>

#### Nvidia Jetson Orin Nano 8GB (SD) Devkit NVME

![AGX Orin Nano 8GB  wide shot](/img/jetson-orin/Orin_Nano_Devkit.webp)

The Orin Nano 8GB SD module has the part number 900-13767-0050-000. This number may not be printed on some modules, however, the part can be distinguished by having an SD-CARD slot.

![AGX Orin Nano 8GB SD card slot](/img/jetson-orin/Nano_SD_in_Devkit.webp)
<br>
![AGX Orin Nano 8GB SOM card slot](/img/jetson-orin/Nano_8GB_Devkit_SOM_900-13767-0050-000.webp)

The carrier board exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin module. Additionally, a monitor can be connected to the board's Display Port.

The default internal storage used for provisioning balenaOS on the Orin Nano 8GB (SD) Devkit is an NVME drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SD card, as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.

</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Orin_Nano_Production_module_in_Orin_Nano_devkit_white_background_thumb.webp" alt="Orin Nano Devkit">
<details>
<summary><b>Orin Nano 8GB Production module</b></summary>

#### Nvidia Jetson Orin Nano 8GB Production module

The Orin Nano production module has the part number 900-13767-0030-000, which can be observed on the bottom. The main difference from the Orin Nano SD - 900-13767-0050-000 - is that it does not have an SD card slot. This module can be used with a Jetson Orin Nano Devkit carrier board, along with the balenaOS image for the Jetson Orin Nano 8GB (SD) Devkit, provided that the corresponding kernel device-tree is configured in your balena-cloud device configuration page.

![AGX Orin Nano 8GB](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000.webp)
<br>
![AGX Orin Nano 8GB SOM](/img/jetson-orin/Nano_8GB_Production_SOM_900-13767-0030-000_closeup.webp)

This module can be used with the carrier board provided by the Orin Nano Devkit, which exposes a debug interface on the UART TXD, UART RXD and GND pins. The UART pins are located underneath the Orin module. Additionally, a monitor can be connected to the board's Display Port.

The default internal storage used for provisioning balenaOS on the Orin Nano Production module is an NVME drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/Jetson_Orin_NX_in_Xavier_NX_Devkit_thumb.webp" alt="Orin NX">
<details>
<summary><b>Nvidia Jetson Orin NX 16GB in Xavier NX Devkit NVME</b></summary>

#### Nvidia Jetson Orin NX 16GB in Xavier NX Devkit NVME

![AGX Orin NX 16GB SOM](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000.webp)
<br>
Part number 900-13767-0000-000 is printed on the right side of the SOM bottom side, and can only be observed if the module is taken out of the devkit:

![AGX Orin NX 16GB SOM close up](/img/jetson-orin/Orin_NX_16GB_SOM_900-13767-0000-000_closeup.webp)

The Jetson Orin NX 16GB module can is used with the Xavier NX Devkit, which exposes a debug interface on the UART TXD, UART RXD and GND pins. The UART pins are located underneath the Orin NX module. Additionally, a monitor can be connected to the board's HDMI port.

The default internal storage used for provisioning balenaOS on the Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/J4012_thumb.webp" alt="Seeed reComputer J4012">
<details>
<summary><b>Seeed reComputer J4012 Jetson Orin NX 16GB</b></summary>
<br>

#### Seeed reComputer J4012 Jetson Orin NX 16GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J4012 Case](/img/jetson-orin/J4012_case.webp)

The SOM in the Seeed reComputer J4012 is a Jetson Orin NX 16GB, which has the part number 900-13767-0000-000. The J401 carrier board exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin NX SOM. Additionally, a monitor can be connected to the board's HDMI Port.

The default internal storage used for provisioning balenaOS on the Seeed reComputer J4012 Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section.
</details>

<br>
<img class="jetson-thumb" src="/img/jetson-orin/j3010_thumb.webp" alt="Seeed reComputer J3010">
<details>
<summary><b>Seeed reComputer J3010 Jetson Orin Nano 4GB</b></summary>

#### Seeed reComputer J3010 Jetson Orin Nano 4GB

The device has the Seeed Studio logo on the back, and the following sticker on the bottom:

![J3010 Case](/img/jetson-orin/J3010_case.webp)

The SOM in the Seeed reComputer J3010 is a Jetson Orin Nano 4GB, which has the part number 900-13767-0040-000. This part number can be found on the bottom of the SOM, if it is taken out of the carrier board:

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000.webp)

![J3010 SOM](/img/jetson-orin/Nano_4GB_SOM_900-13767-0040-000_closeup.webp)

The J401 carrier board included in the full reComputer J3010 system exposes a debug interface on the UART TXD, UART RXD and GND pins, which are located underneath the Orin Nano SOM. Additionally, a monitor can be connected to the board's HDMI Port.

The default internal storage used for provisioning balenaOS on the Seeed reComputer J4012 Jetson Orin NX 16GB is an NVME drive, which needs to be attached to the carrier board prior to booting the flasher USB key. If instead you would like to use other media, like for example an SSD as main storage, please consult the OS installer [target_devices][installer.target_devices] configuration option or the [alternative provisioning options](#alternative-provisioning-options) section below.
</details>

## Checking your Jetson Orin's UEFI firmware version

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the UART TXD, UART RXD and GND pins on the Jetson carrier board, which are located underneath the Orin module.</p>

![Orin Nano Devkit pinout location](/img/jetson-orin/Nano_pinout_with_module_square.webp)

![Orin Nano Devkit UART pins](/img/jetson-orin/Nano_pinout_close_square.webp)

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.</p>

![AGX Orin microUSB debug port](/img/jetson-orin/AGX_Orin_DP_microUSB_square.webp)

<p>If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uefi_version_uart_logs.webp)

<p>Alternatively, if booting is stopped in the UEFI menu by pressing <code>Esc</code>, the firmware version will be printed in the top-left corner:</p>

![Orin UEFI uart logs](/img/jetson-orin/jetson_orin_uart_uefi_menu.webp)

<p>If instead you would like to use a monitor and a keyboard, please expand the section below. </p>

</details>


<details>
<summary><b>I want to use a monitor</b></summary>
<br>

<p>If your Jetson Orin is connected to a monitor, the UEFI firmware version will be displayed at the top of the screen:</p>

![Orin UEFI display menu](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

</details>

<details>
    <summary><b>What type of video cable do I need for my device?</b></summary>
    <br>
    A Display Port cable or Display Port to HDMI adapter is necessary on the following devices:<br>
      * Jetson AGX Orin 32GB<br>
      * Jetson AGX Orin 64GB<br>
      * Jetson Orin Nano Devkit<br>
    <br>
    An HDMI cable is required for:<br>
      * Jetson Orin NX in Xavier NX Devkit<br>
      * Seeed J3010<br>
      * Seeed J4012<br>
</details>

<br>
If the firmware version on your device is older than v36.3.0, please re-flash its firmware by following the corresponding guide below:

- [Firmware update for Orin Nano SD-CARD](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#firmware) &#x1F517;
- [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) &#x1F517;

## Booting balenaOS flasher images from a USB key

If the firmware on your device is v36.3.0 or newer, inserting the USB key with the balenaOS flasher image and connecting power to your device will provision the internal storage.
In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB key automatically, use the following steps to manually select the USB key for booting:

<details>
<summary><b>I want to use the debug UART interface</b></summary>
<br>

<p>1) If you are using the <b>Jetson Orin Nano Devkit</b>, <b>Jetson Orin NX</b>, the <b>Seeed J3010</b> or <b>Seeed J4010</b> you will need a USB to TTL converter cable and a serial communication program like <code>minicom</code>. The USB to TTL converter's pins need to be connected to the UART TXD, UART RXD and GND pins of the Jetson carrier board, which are located underneath the Orin module.

![Orin Nano Devkit pinout location](/img/jetson-orin/Nano_pinout_with_module_square.webp)

![Orin Nano Devkit UART pins](/img/jetson-orin/Nano_pinout_close_square.webp)

</p>

<p>On <b>Jetson AGX Orin 32GB</b> and <b>Jetson AGX Orin 64GB</b> Devkits, the debug UART interface is available through the micro-USB interface, when the device is powered on. On Linux machines, the serial connection can be accessed using <code>minicom -D /dev/ttyACM0</code>.

![AGX Orin microUSB debug port](/img/jetson-orin/AGX_Orin_DP_microUSB_square.webp)

</p>

<p>2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br> 

![Orin UEFI boot menu UART](/img/jetson-orin/interrupt_boot_uart.webp)

<p>If <code>Esc</code> was pressed, navigate to the Boot Manager Menu</p>

![Orin UEFI Boot Manager on UART](/img/jetson-orin/boot_manager_uart.webp)

<p>3) Select the attached USB device as boot media</p>

![Orin UEFI USB boot](/img/jetson-orin/usb_device.webp)

<p>4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.</p>

</details>

<details>
<summary><b>I want to use a keyboard and monitor</b></summary>
<br>
1) Attach a USB keyboard and a monitor to the device.<br>
2) Power on the device and press <code>Esc</code> when prompted by the UEFI firmware, or <code>F11</code> to enter the Boot Manager Menu directly.<br>

![Interrupting boot in UEFI](/img/jetson-orin/jetson_orin_interrupt_booting_uefi.webp)

![UEFI Boot Manager](/img/jetson-orin/jetson_orin_uefi_boot_manager.webp)

3) Select the attached USB key as boot media:

![UEFI Boot from USB Key](/img/jetson-orin/jetson_orin_uefi_usb_key.webp)

4) Your device should boot from the attached USB key and provision the internal storage. Once provisioning is complete and the device shuts down, the USB key can be unplugged.<br>
</details>
<br>

Should you encounter any other unexpected issues while provisioning your device, please follow the instructions for our [Jetson Flash][Jetson Flash] tool to flash your device in recovery boot mode.


## Post-provisioning UEFI firmware update

Once your device has been provisioned and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

__Note:__ Please do not interrupt the UEFI firmware process by resetting or cutting power to the device.

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:
                                                                                                                                               
![Orin UEFI firmware update progress](/img/jetson-orin/post_provisioning_uefi_firmware_update.webp)

If a display is connected to the device, the firmware update process will also be rendered on the screen:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)


## Alternative provisioning options

By default, Jetson Orin devices need an internal storage and a flasher USB key or tool in order to be provisioned. If your device is an Orin Nano or Orin NX, a NVME drive has to be attached to the
carrier board before starting the provisioning process. The AGX Orin 32GB and 64GB Devkits have a built-in eMMC which is used for provisioning balenaOS by default.

Alternatively, you can use other internal or external storage media for provisioning your Jetson Orin device. Pick your device below to see the available provisioning options:

<details>
<summary><b>Jetson AGX Orin 32GB Devkit</b></summary>
<br>

Currently, the Jetson AGX Orin 32GB can be provisioned with balenaOS on the eMMC only, by using the [Jetson Flash][Jetson Flash] tool.

</details>
<br>


<details>
<summary><b>Jetson AGX Orin 64GB Devkit</b></summary>
<br>

  - If you would like to use a USB key to flash a NVME drive attached to your Jetson AGX Orin 64GB, use the [installer.target_devices][installer.target_devices] configuration option in the flasher USB key's [config.json][config_json] to specify the NVME as target medium:

  ```json
  "installer": {
      "target_devices":"nvme0n1"
  }
  ```

  - If you would like the same USB Key or NVME, on which the balenaOS flasher image has been written, to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:
  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"sda nvme0n1"
  }
  ```

  The first medium found in the `target_devices` list will be used.
  
  <details>
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>
  <br>
  1) Make sure you have <code>jq</code> and [balena CLI][balena CLI] installed. You can obtain it from [here](https://github.com/balena-io/balena-cli).

  2) Download the balenaOS image from balena-cloud or use balena CLI to obtain one:
  
  ```shell
  balena os download jetson-agx-orin-devkit-64gb -o balena.img
  ```
  
  3) Download a configuration file from your balenaCloud dashboard or generate a new one using balena CLI:
  
  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ``` 
  
  4) Depending your desired provisioning setup, set the one or more of the available installer options:
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.migrate.force |= true' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.target_devices |= "sda nvme0n1"' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  5) Use balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```
  
  6) Write the balenaOS image to your USB key or NVME. We recommend using [Etcher][etcher].
  
</details>
<br>
</details>
<br>
  
<details>
<summary><b>Jetson Orin Nano (SD) Devkit NVME</b></summary>
<br>

  - If you would like to use a USB key to flash a NVME drive attached to your Jetson Orin Nano (SD) Devkit NVME, simply insert the USB flasher Key in your device and connect power to the board.

  - If you would like the same SD-Card, USB Key or NVME, on which the balenaOS flasher image has been written, to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:

  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"mmcblk0 sda nvme0n1"
  }
  ```

  The first medium found in the `target_devices` list will be used.
  
  <details>
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>
  <br>
  1) Make sure you have <code>jq</code> and [balena CLI][balena CLI] installed. You can obtain it from [here](https://github.com/balena-io/balena-cli).

  2) Download the balenaOS image from balena-cloud or use balena CLI to obtain one:
  
  ```shell
  balena os download jetson-orin-nano-devkit-nvme -o balena.img
  ```
  
  3) Download a configuration file from your balenaCloud dashboard or generate a new one using balena CLI:
  
  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ``` 
  
  4) Depending your desired provisioning setup, set the one or more of the available installer options:
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.migrate.force |= true' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.target_devices |= "mmcblk0 sda nvme0n1"' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  5) Use balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```
  
  6) Write the balenaOS image to your SD-CARD, USB key or NVME. We recommend using [Etcher][etcher].
  
</details>
<br>
</details>
<br>
</details>
<br>

<details>
<summary><b>Jetson Orin NX 16GB in Xavier NX Devkit / Seeed reComputer J3010 / Seeed reComputer J4012</b></summary>
<br>

  - If you would like to use a USB key to flash a NVME drive attached to your device, simply insert the USB flasher Key and connect power to the board.

  - If you would like the same USB Key or NVME, on which the balenaOS flasher image has been written, to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:

  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"mmcblk0 sda nvme0n1"
  }
  ```
  The first medium found in the `target_devices` list will be used.
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>
  <br>
  1) Make sure you have <code>jq</code> and [balena CLI][balena CLI] installed. You can obtain it from [here](https://github.com/balena-io/balena-cli).

  2) Download the balenaOS image from balena-cloud or use balena CLI to obtain one. Use <code>balena device-type list</code> to obtain the device-type SLUG.
  
  ```shell
  balena os download <device-type slug> -o balena.img
  ```
  
  3) Download a configuration file from your balenaCloud dashboard or generate a new one using balena CLI:
  
  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ``` 
  
  4) Depending your desired provisioning setup, set the one or more of the available installer options:
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.migrate.force |= true' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  ```shell
  tmp=$(mktemp)
  jq '.installer.target_devices |= "sda nvme0n1"' config.json > ${tmp}
  mv ${tmp} config.json
  ```
  
  5) Use balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```
  
  6) Write the balenaOS image to your USB key or NVME. We recommend using [Etcher][etcher].
  
</details>
<br>
  
</details>
<br>

[installer.target_devices]:/reference/OS/configuration/#target_devices

[installer.migrate]:/reference/OS/configuration/#migrate

[config_json]:/reference/OS/configuration/#about-configjson

[Jetson Flash]:(https://github.com/balena-os/jetson-flash)

[balena CLI]:(https://docs.balena.io/reference/balena-cli/latest/)

[etcher]:(https://etcher.balena.io)
