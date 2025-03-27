---
title: Nvidia Jetson Orin

layout: jetson-orin.html

dynamic:
  variables: [ $jetsonorin ]
  ref: $original_ref/$jetsonorin
  $switch_text: I want to work with $jetsonorin
---

{{import "jetson-orin"}}

## Post-provisioning UEFI firmware update

Once your device has been provisioned with balenaOS and powered back-on, it will attempt to update the UEFI firmware automatically.
The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

__Note:__ Please do not interrupt the UEFI firmware process by resetting or cutting power to the device.

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:
                                                                                                                                               
![Orin UEFI firmware update progress](/img/jetson-orin/post_provisioning_uefi_firmware_update.webp)

If a display is connected to the device, the firmware update process will also be rendered on the screen:

![Orin UEFI firmware update progress](/img/jetson-orin/jetson_orin_uefi_firmware_update.webp)


## Alternative provisioning options

By default, most Jetson Orin devices need an internal storage media and a USB flash drive in order to be provisioned. If your device is an Orin Nano or Orin NX, an NVMe drive has to be attached to the
carrier board before starting the provisioning process. The AGX Orin 32GB and 64GB Devkits have a built-in eMMC which is used by default for provisioning balenaOS.

Select devices allow using other internal or external storage mediums for provisioning. Pick your device below to see the available provisioning options:

<details>
<summary><b>Jetson AGX Orin 32GB Devkit</b></summary>

Currently, the Jetson AGX Orin 32GB can be provisioned with balenaOS on the eMMC only, by using the <a href="https://github.com/balena-os/jetson-flash">Jetson Flash</a> tool.

</details>

<details>
<summary><b>Jetson AGX Orin 64GB Devkit</b></summary>

The default internal storage used for provisioning balenaOS is the AGX Orin 64GB's on-board eMMC.

  - If you would like to use a USB flash drive to flash an NVME drive attached to your Jetson AGX Orin 64GB instead of the on-board eMMC, use the [installer.target_devices][installer.target_devices] configuration option in the flasher USB flash drive's [config.json][config_json] to specify the NVME as target medium:

  ```json
  "installer": {
      "target_devices":"nvme0n1"
  }
  ```

  - If you would like the same USB flash drive or NVMe on which the balenaOS flasher image has been written to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:
  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"sda nvme0n1"
  }
  ```

  The first medium found in the `target_devices` list will be used for provisioning and it will become the main storage of your device once flashing is complete.

  Available target devices are:
    - <code>mmcblk0</code> - on-board eMMC. Unless overriden, this is the default for the AGX Orin Devkit 64GB
    - <code>sda</code> - removable drives like USB flash keys or SSDs
    - <code>nvme0n1</code> - NVMe drive

  <details>
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>

  1) Make sure you have <a href="https://jqlang.org/download/">jq</a> and the <a href="https://docs.balena.io/reference/balena-cli/latest/">balena CLI</a> installed on your host/development PC. You can obtain it from <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL.md">here</a>.

  2) Download the balenaOS image from the balenaCloud dashboard or use the balena CLI to obtain one:

  ```shell
  balena os download jetson-agx-orin-devkit-64gb -o balena.img
  ```

  3) Download a configuration file from your balenaCloud dashboard or generate a new one using the balena CLI:

  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ``` 
  Replace <code>balena_cloud_org</code> and <code>balena_cloud_fleet</code> with your actual balena cloud organization and fleet.

  4) Depending on your desired provisioning setup, set one or more of the available installer options:
  
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

  5) Use the balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```

  6) Write the balenaOS image (balena.img) to your USB flash drive or NVMe. We recommend using <a href="https://etcher.balena.io">Etcher</a>.

  7) If your AGX Orin is powered on, press the power button and wait for the device to turn off.

  8) Insert the freshly flashed USB flash drive or NVMe drive into the Jetson AGX Orin Devkit and press the power button.

  9) Once provisioning is complete, the board will perform one of the following actions:
    - restart and boot balenaOS automatically, if [installer.migrate.force][installer.migrate] has been set in [config.json][config_json].
    - shut down if [installer.migrate.force][installer.migrate] has not been set in [config.json][config_json]. Unplug the flasher USB flash drive before powering the AGX Orin Devkit back on.

  10) Your device should appear in your application dashboard within a few minutes.
  </details>

</details>
  
<details>
<summary><b>Jetson Orin Nano (SD) Devkit NVMe</b></summary>

  - If you would like to use a USB flash drive to flash an NVMe drive attached to your Jetson Orin Nano (SD) Devkit NVMe, simply insert the USB flash drive into your device and connect power to the board.

  - If you would like the same SD-Card, USB flash drive or NVMe on which the balenaOS flasher image has been written to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:

  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"mmcblk0 sda nvme0n1"
  }
  ```

  The first medium found in the `target_devices` list will be used for provisioning and it will become the main storage of your device once flashing is complete.

  Available target devices are:
    - <code>mmcblk0</code> - SD-CARD
    - <code>sda</code> - removable drives like USB flash keys or SSDs
    - <code>nvme0n1</code> - NVMe drive. Unless overriden, this is the default for the Jetson Orin Nano Devkit

  <details>
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>

  1) Make sure you have <a href="https://jqlang.org/download/">jq</a> and the <a href="https://docs.balena.io/reference/balena-cli/latest/">balena CLI</a> installed on your host/development PC. You can obtain it from <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL.md">here</a>.

  2) Download the balenaOS image from the balenaCloud dashboard or use the balena CLI to obtain one:

  ```shell
  balena os download jetson-orin-nano-devkit-nvme -o balena.img
  ```

  3) Download a configuration file from your balenaCloud dashboard or generate a new one using the balena CLI:
  
  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ``` 
  Replace <code>balena_cloud_org</code> and <code>balena_cloud_fleet</code> with your actual balena cloud organization and fleet.

  4) Depending your desired provisioning setup, set one or more of the available installer options:

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
  
  5) Use the balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```

  6) Write the balenaOS image (balena.img) to your SD-CARD, USB flash drive or NVMe. We recommend using <a href="https://etcher.balena.io">Etcher</a>.

  7) Ensure the power cable is disconnected from the Orin Nano Devkit.

  8) Insert the freshly flashed SD-CARD, USB flash drive or NVMe drive into the Devkit and connect its power cable.

  9) Once provisioning is complete, the board will perform one of the following actions:
     - restart and boot balenaOS automatically, if [installer.migrate.force][installer.migrate] has been set in [config.json][config_json].
     - shut down if [installer.migrate.force][installer.migrate] has not been set in [config.json][config_json]. Unplug the external flasher medium and then remove and re-connect the power cable to the Devkit.

  10) Your device should appear in your application dashboard within a few minutes.
</details>
</details>

<details>
<summary><b>Jetson Orin NX 16GB in Xavier NX Devkit / Seeed reComputer J3010 / Seeed reComputer J4012</b></summary>

  - If you would like to use a USB flash drive an NVME drive attached to your device, simply insert the USB flash drive and connect power to the board.

  - If you would like the same USB flash drive or NVMe on which the balenaOS flasher image has been written to be used as both install and boot media, use both the [installer.migrate][installer.migrate] and [installer.target_devices][installer.target_devices] configuration options:

  ```json
  "installer": {
      "migrate": {
        "force": true
      },
      "target_devices":"sda nvme0n1"
  }
  ```

  The first medium found in the `target_devices` list will be used and it will become the main storage of your device once flashing is complete.

  Available target devices are:
    - <code>sda</code> - removable drives like USB flash keys or SSDs
    - <code>nvme0n1</code> - NVMe drive. Unless overriden, this option is the default for your device

  <details>
  <summary><b>How do I set this configuration in my balenaOS image?</b></summary>

  1) Make sure you have <a href="https://jqlang.org/download/">jq</a> and the <a href="https://docs.balena.io/reference/balena-cli/latest/">balena CLI</a> installed on your host/development PC. You can obtain it from <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL.md">here</a>.

  2) Download the balenaOS image from the balenaCloud dashboard or use the balena CLI to obtain one. Use the <a href="https://docs.balena.io/reference/hardware/devices/">balena device type list</a> to obtain the device-type SLUG (machine name).
  
  ```shell
  balena os download <device-type slug> -o balena.img
  ```
  
  3) Download a configuration file from your balenaCloud dashboard or generate a new one using the balena CLI:
  
  ```shell
  balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
  ```
  Replace <code>balena_cloud_org</code> and <code>balena_cloud_fleet</code> with your actual balena cloud organization and fleet.

  4) Depending your desired provisioning setup, set one or more of the available installer options:
  
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
  
  5) Use the balena CLI to inject the modified configuration file in the newly downloaded image:
  ```shell
  sudo balena config inject config.json -d balena.img
  ```

  6) Write the balenaOS image (balena.img) to your USB flash drive or NVMe. We recommend using <a href="https://etcher.balena.io">Etcher</a>.

  7) Ensure the power cable is disconnected from your device.

  8) Insert the freshly flashed SD-CARD, USB flash drive or NVMe drive into the carrier board and connect its power cable.

  9) Once provisioning is complete, the board will perform one of the following actions:
     - restart and boot balenaOS automatically, if [installer.migrate.force][installer.migrate] has been set in [config.json][config_json].
     - shut down if [installer.migrate.force][installer.migrate] has not been set in [config.json][config_json]. Unplug the external flasher medium and then remove and re-connect the power cable to the carrier board.

  10) Your device should appear in your application dashboard within a few minutes.
</details>
</details>

[installer.target_devices]:/reference/OS/configuration/#target_devices

[installer.migrate]:/reference/OS/configuration/#migrate

[config_json]:/reference/OS/configuration/#about-configjson

