# Nvidia Jetson AGX Orin Devkit 64GB

<figure><img src="../../../../../summary/.gitbook/assets/AGX_Orin_perspective_2.webp" alt=""><figcaption></figcaption></figure>

The Nvidia Jetson AGX Orin 64 GB development kit has a label on the inside bottom as shown. It mentions part number 945-13730-0050-000 and reads “Jetson AGX Orin 64GB Developer Kit”.

<figure><img src="../../../../../summary/.gitbook/assets/AGX-Orin-64-wide.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../../../summary/.gitbook/assets/orin-64GB-close.webp" alt=""><figcaption></figcaption></figure>

This device exposes a debug UART interface over the microUSB port. From Linux machines, the serial connection can be accessed using `minicom -D /dev/ttyACM0`. It also offers one Display Port for video output.

The default internal storage used for provisioning balenaOS is the AGX Orin 64GB's on-board eMMC. If instead you would like to use an NVMe drive as main storage, please consult the OS installer [target\_devices](../../../../reference/OS/configuration.md#valid-fields) configuration option or the [alternative provisioning options](jetson-agx-orin-devkit-64gb.md#alternative-provisioning-options) section.

#### **Checking your Jetson Orin's UEFI firmware version**

You can check which UEFI firmware version your Jetson Orin device is running either by connecting to your device's debug UART interface, or by attaching a display to the Orin's video port.

<details>

<summary>I want to use the debug UART interface</summary>

The debug UART interface of the Jetson AGX Orin 64GB Devkit is available through the micro-USB interface, when the device is powered on. Connect the other end of the micro-usb cable to your host/development PC. If your host is running Linux, the serial connection to the Jetson device can be accessed using `minicom -D /dev/ttyACM0`.

<figure><img src="../../../../../summary/.gitbook/assets/AGX_Orin_DP_microUSB_square.webp" alt=""><figcaption></figcaption></figure>

If you are using the UART interface, the UEFI firmware version will be printed in the boot sequence logs:

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_uefi_version_uart_logs.webp" alt=""><figcaption></figcaption></figure>

Alternatively, if booting is stopped in the UEFI menu by pressing `Esc`, the firmware version will be printed in the top-left corner:

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_uart_uefi_menu.webp" alt=""><figcaption></figcaption></figure>

If instead you would like to use a monitor and a keyboard, please expand the section below.

</details>

<details>

<summary>I want to use a monitor</summary>

**A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson AGX Orin Devkit 64GB to a monitor.** Once the monitor is attached, the UEFI firmware version will be displayed at the top of the screen:

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_interrupt_booting_uefi.webp" alt=""><figcaption></figcaption></figure>

</details>

\
In case the UEFI firmware version on your device is older than v36.3.0, please update its firmware using the following guide:

* [Flashing Jetpack 6 using SDK Manager](https://developer.ridgerun.com/wiki/index.php/JetPack_6_Migration_and_Developer_Guide/Installing_JetPack_6/Flashing_with_SDK_Manager) 🔗

If for whatever reason checking the UEFI firmware version is not possible, flashing Jetpack 6 using the SDK Manager will guarantee your device has the latest firmware installed.

Once your device's UEFI firmware is v36.3.0 or newer, you can use a USB flash drive to provision it directly with balenaOS.

#### **Booting balenaOS flasher images from a USB flash drive**

If the firmware on your device is v36.3.0 or newer, inserting the USB flash drive with the balenaOS flasher image and connecting power to your device will provision the internal storage. In the unexpected event that your device does not boot the balenaOS flasher image from the attached USB flash drive automatically, use the following steps to manually select the USB flash drive for booting:

<details>

<summary>I want to use the debug UART interface</summary>

1. The debug UART interface of the Jetson AGX Orin 64GB Devkit is available through the micro-USB interface, when the device is powered on. Connect the other end of the micro-usb cable to your host/development PC. If your host is running Linux, the serial connection to the Jetson device can be accessed using `minicom -D /dev/ttyACM0`.

<figure><img src="../../../../../summary/.gitbook/assets/AGX_Orin_DP_microUSB_square.webp" alt=""><figcaption></figcaption></figure>

2. Power on the device and press `Esc` when prompted by the UEFI firmware, or `F11` to enter the Boot Manager Menu directly.

<figure><img src="../../../../../summary/.gitbook/assets/interrupt_boot_uart.webp" alt=""><figcaption></figcaption></figure>

If `Esc` was pressed, navigate to the Boot Manager Menu

<figure><img src="../../../../../summary/.gitbook/assets/boot_manager_uart.webp" alt=""><figcaption></figcaption></figure>

3. Select the attached USB device as boot media

<figure><img src="../../../../../summary/.gitbook/assets/usb_device.webp" alt=""><figcaption></figcaption></figure>

4. Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.
5. Press the power button of your Jetson AGX Orin 64GB to initiate booting.
6. Your device should appear in your application dashboard within a few minutes.

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our [Jetson Flash](https://github.com/balena-os/jetson-flash) tool to flash your device in recovery boot mode.

If instead you would like to use a monitor and a keyboard, please expand the section below.

</details>

<details>

<summary>I want to use a keyboard and monitor</summary>

**A Display Port cable or Display Port to HDMI adapter is necessary for connecting your Jetson AGX Orin Devkit 64GB to a monitor.**

1. Attach a USB keyboard and a monitor to the device.
2. Power on the device and press `Esc` when prompted by the UEFI firmware, or `F11` to enter the Boot Manager Menu directly.

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_interrupt_booting_uefi.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_uefi_boot_manager.webp" alt=""><figcaption></figcaption></figure>

3. Select the attached USB flash drive as boot media:

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_uefi_usb_key.webp" alt=""><figcaption></figcaption></figure>

4. Your device should boot from the attached USB flash drive and provision the internal storage. Once provisioning is complete and the device shuts down, the USB flash drive can be unplugged.
5. Press the power button of your Jetson AGX Orin 64GB to initiate booting.
6. Your device should appear in your application dashboard within a few minutes.

Should you encounter any unexpected issues while provisioning your device, please follow the instructions for our [Jetson Flash](https://github.com/balena-os/jetson-flash) tool to flash your device in recovery boot mode.

</details>

#### **Post-provisioning UEFI firmware update**

Once your device has been provisioned with balenaOS and powered back-on, it will attempt to update the UEFI firmware automatically. The status of the UEFI firmware update process is depicted by a progress bar on the debug UART interface, as well on the display, if connected.

{% hint style="warning" %}
Please do not interrupt the UEFI firmware process by resetting or cutting power to the device.
{% endhint %}

If you are using the debug UART, the firmware update process will be displayed by a progress bar similar to the one below:

<figure><img src="../../../../../summary/.gitbook/assets/post_provisioning_uefi_firmware_update.webp" alt=""><figcaption></figcaption></figure>

If a display is connected to the device, the firmware update process will also be rendered on the screen:

<figure><img src="../../../../../summary/.gitbook/assets/jetson_orin_uefi_firmware_update.webp" alt=""><figcaption></figcaption></figure>

#### **Alternative provisioning options**

By default, most Jetson Orin devices need an internal storage media and a USB flash drive in order to be provisioned. The AGX Orin 64GB Devkit has a built-in eMMC which is used by default for provisioning balenaOS.

* If you would like to use a USB flash drive to flash an NVME drive attached to your Jetson AGX Orin 64GB instead of the on-board eMMC, use the installer.target\_devices configuration option in the flasher USB drive's [config.json](../../../../reference/OS/configuration.md#about-config.json) to specify the NVME as target medium:

```json
"installer": {
    "target_devices":"nvme0n1"
}
```

* If you would like the same USB flash drive or NVMe on which the balenaOS flasher image has been written to be used as both install and boot media, use both the installer.migrate and installer.target\_devices configuration options:

```json
"installer": {
    "migrate": {
      "force": true
    },
    "target_devices":"sda nvme0n1"
}
```

The first medium found in the `target_devices` list will be used for provisioning and it will become the main storage of your device once flashing is complete.

Available target devices are: - `mmcblk0` - on-board eMMC. Unless overriden, this is the default for the AGX Orin Devkit 64GB - `sda` - removable drives like USB flash drives or SSDs - `nvme0n1` - NVMe drive

<details>

<summary>How do I set this configuration in my balenaOS image?</summary>

1. Make sure you have [jq](https://jqlang.org/download/) and the [balena CLI](../../../../../external-docs/balena-cli/latest.md) installed on your host/development PC. You can obtain it from [here](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md).
2. Download the balenaOS image from the balenaCloud dashboard or use the balena CLI to obtain one:

```shell
balena os download jetson-agx-orin-devkit-64gb -o balena.img
```

3. Download a configuration file from your balenaCloud dashboard or generate a new one using the balena CLI:

```shell
balena config generate --fleet balena_cloud_org/balena_cloud_fleet --version 6.4.0 --network ethernet --appUpdatePollInterval 10 --output config.json
```

Replace `balena_cloud_org` and `balena_cloud_fleet` with your actual balena cloud organization and fleet.

4. Depending on your desired provisioning setup, set one or more of the available installer options:

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

5. Use the balena CLI to inject the modified configuration file in the newly downloaded image:

```shell
sudo balena config inject config.json -d balena.img
```

6. Write the balenaOS image (balena.img) to your USB flash drive or NVMe. We recommend using [Etcher](https://etcher.balena.io).
7. If your AGX Orin is powered on, press the power button and wait for the device to turn off.
8. Insert the freshly flashed USB flash drive or NVMe drive into the Jetson AGX Orin Devkit and press the power button.
9. Once provisioning is complete, the board will perform one of the following actions:

* restart and boot balenaOS automatically, if installer.migrate.force has been set in [config.json](../../../../reference/OS/configuration.md#about-config.json).
* shut down if installer.migrate.force has not been set in [config.json](../../../../reference/OS/configuration.md#about-config.json). Unplug the flasher USB flash drive before powering the AGX Orin Devkit back on.

10. Your device should appear in your application dashboard within a few minutes.

</details>

If you want to see options for other Orin devices, select the device from the drop down at the top of this page.
