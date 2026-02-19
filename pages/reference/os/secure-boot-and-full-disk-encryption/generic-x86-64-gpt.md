---
title: Secure Boot and Full Disk Encryption for Generic x86_64 (GPT)
excerpt: Setup secure boot and full disk encryption for Generic x86_64 (GPT)
---

# Setup secure boot and full disk encryption for Generic x86\_64 (GPT)

This section describes how to setup a device with secure boot and full disk encryption using `Generic x86_64 (GPT)` balenaOS image. This image should be compatible on a wide range of x86\_64 devices. Note that `Generic x86-64 (legacy MBR)` and `Intel NUC` images do not provide secure boot and full disk encryption.

Before diving into how to provision a device with secure boot and full disk encryption, let's look at some important considerations around this feature specifically for x86\_64 devices. For more information on the general approach to secure boot, see our docs on a [general overview of our secure boot and full disk encryption implementation](./).

## Important Considerations and Caveats

* BalenaOS does not use the shim first stage bootloader that other Linux distributions do and is usually signed with Microsoft platform keys. BalenaOS is an embedded distribution, and when secure boot is enabled only balena signed operating systems are allowed to boot.
* Disk encryption and decryption is unattended - there is no user interaction when mounting the encrypted disks as it is expected from an embedded device.
* Secure boot and disk encryption have been designed to work as a bundle in balenaOS and they cannot be configured separately.
* Only system partitions are encrypted. Any extra storages are not encrypted.
* OS images are signed images and balena manages a secure signing server. We currently use a single key for the platform and consequently we can never provide the key to end users. You can read further on [how we handle keys](./#keys-and-certificates-in-secure-boot).
* It is not possible to configure GRUB or kernel parameters
* There are [other trade-offs](./#other-considerations) pertaining to debugging and system configuration.

## System requirements

*   **Secure Element: Trusted Platform Module (TPM) 2.0**

    To use secure boot and full disk encryption, your device must have a Trusted Platform Module (TPM) 2.0 which is the [secure element](./#secure-element) on x86\_64 devices. For initial setup, the TPM must be in a mode that allows enrolling new keys, often called "Setup Mode" in the BIOS/UEFI settings. While most modern x86\_64 devices support this, some models may be locked into "Deployed Mode," which prevents key enrollment and is therefore incompatible.

    Moreover, TPMs can be of two types:

    * Firmware TPM (fTPM): The TPM is integrated directly into the main CPU's firmware.
    * Discrete TPM (dTPM): The TPM is a separate, physical chip on the motherboard, external to the CPU.

    While balenaOS technically supports both, we **only** recommend using devices with a firmware TPM (fTPM) for deployments requiring secure boot and disk encryption. The primary reason we advise against using discrete TPMs (dTPMs) is the physical security risk they introduce. A dTPM communicates with the CPU over a bus on the motherboard, typically using protocols like SPI or I2C. This external communication path creates a potential attack vector, which is not present in fTPM.
* **The device should support Unified Extensible Firmware Interface (UEFI)**
*   **Persist UEFI settings for the expected lifetime of the device**

    As a necessary part of the provisioning process, customers will almost certainly change some UEFI settings to non-default values. The customer should test that these settings will persist for the expected lifetime of their device. For instance, customers should use an RTC / CMOS battery that will endure through the expected lifetime of the device. Note that extended periods without AC / mains power will shorten the life of an RTC battery.

## Setup

There are two steps required to install a secure boot enabled and disk encrypted system:

* Opt-in secure boot mode in the balenaOS installer
* Configure the device’s Unified Extensible Firmware Interface (UEFI) firmware for secure boot and setup mode

Note that balenaOS currently does not support updating from a non-secure boot enabled system into a secure boot enabled one. The only way to install a secure boot and disk encrypted system at this moment is by using a balenaOS installer image.

### Configuring balenaOS image to opt-in secure boot mode

`Generic x86_64 (GPT)` balenaOS images ship with the capability to provision a device with secure boot and full disk encryption. While the feature was introduced in balenaOS `v2.114.21`, it has since been has been hardened for security and updated for broader device compatibility in version `v6.6.1`. Balena recommends that all customers use the most recent releases.

#### Using balenaCloud

1. Add a device to your fleet. You should be presented with the following new option:
2. As mentioned, there are [important considerations and caveats](generic-x86-64-gpt.md#important-considerations-and-caveats) when enabling secure boot and full disk encryption. You will be presented with the following disclaimer when enabling the feature:

You can optionally surpress the disclaimer by selecting "Don't show me this warning again for this device type".

You can then proceed to download the configured image.

#### Using balena CLI

Balena CLI versions `16.2.0` or newer allow you to [configure](../../../../external-docs/balena-cli/latest.md#os-configure) a balenaOS installer image to opt-in secure boot by using the following command:

```
balena os configure <image> --secureBoot --fleet <fleetName> --device-type generic-amd64
```

### Flash the image to a USB key

The configured image should be flashed to a USB key.

* Insert the USB key into your laptop or computer.
* Write the balenaOS file you downloaded to the USB key. We recommend using Etcher.
* Wait for writing of balenaOS to complete.
* Remove the USB key from the host machine.
* Insert the freshly flashed USB key into the Generic x86\_64 (GPT).

### Provision the device

Once the image is ready, the device needs to be configured in secure boot setup mode. This depends on the UEFI/BIOS implementation, but in general there are the following steps to consider:

* Reset to the default UEFI configuration.
* Make sure the device is configured to boot in UEFI mode, for example by checking the Compatibility Support Module (CSM) used for Master Boot Record (MBR) booting is disabled.
* Change the boot options to allow booting only from the USB installer/flasher device and the main storage, and choose the USB as first boot option. The flasher will then set the UEFI configuration to boot from the main storage before rebooting.
* Disable restoring factory keys. Some systems default to restoring factory (Microsoft) keys rather than using the balena keys that will be installed during setup.
* Enable secure boot.
* Reset device to setup mode

On booting in setup mode, the installer will enroll the keys into UEFI variables and encrypt the disks using the TPM device. Note that enrolling the keys manually via the UEFI setup application, while possible on some systems, is not currently supported by balenaOS as the installer’s bootloader is not signed.

Wait for the device to finish flashing and shutdown. Please wait until all LEDs are off. You can then remove the USB key from the device and turn on the device again.

The device should show up on balenaCloud.

### Checking if it worked

**Note** We are working on adding support for the device to report it's secure boot and full disk encryption status to balenaCloud. In the meantime, you can use the following instructions to manually check the status.

1. SSH into the hostOS [using the dashboard web terminal](../../../learn/manage/ssh-access.md#using-the-dashboard-web-terminal) or [using the CLI](../../../learn/manage/ssh-access.md#using-balena-device-ssh-from-the-cli)
2. Run the following command to check if secure boot is enabled:

```
source /usr/libexec/os-helpers-sb
is_secured && echo "secured" || echo "not secured"
```

The above command returns `secured` if secure boot is enabled and the device is in user mode. 3. Run the following command to check if the disks are encrypted:

```
mount | grep luks
```

You should see a similar output as below:

```
/dev/mapper/luks-ac97b9b4-8708-4095-bf2d-484ab8fd66b9 on /mnt/sysroot/active type ext4 (rw,relatime)
/dev/mapper/luks-422d5d4f-bfec-499f-8cfe-1603d93e52ed on /mnt/state type ext4 (rw,relatime)
/dev/mapper/luks-422d5d4f-bfec-499f-8cfe-1603d93e52ed on /etc/machine-id type ext4 (rw,relatime)
/dev/mapper/luks-9cfb5e61-9a10-48f0-8df9-a1b94db6ccc5 on /mnt/data type ext4 (rw,relatime)
/dev/mapper/luks-f935e12f-a564-426d-b511-e10c35786763 on /mnt/boot type ext4 (rw,relatime)
/dev/mapper/luks-422d5d4f-bfec-499f-8cfe-1603d93e52ed on /etc/fake-hwclock type ext4 (rw,relatime)
/dev/mapper/luks-9cfb5e61-9a10-48f0-8df9-a1b94db6ccc5 on /resin-data type ext4 (rw,relatime)
/dev/mapper/luks-9cfb5e61-9a10-48f0-8df9-a1b94db6ccc5 on /var/lib/docker type ext4 (rw,relatime)
```
