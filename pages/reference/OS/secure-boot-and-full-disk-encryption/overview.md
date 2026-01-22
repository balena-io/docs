---
title: Secure Boot and Full Disk Encryption
excerpt: >-
  General overview of balena's secure boot and full disk encryption
  implementation
---

# Secure Boot and Full Disk Encryption

\{{ $names.company.upper \}}’s secure boot and full disk encryption feature addresses two critical aspects of device security. Secure boot ensures that only trusted software can run on the device, while full disk encryption safeguards data at rest by preventing unauthorized access to the contents of storage media.

Given the diversity of hardware platforms that \{{ $names.os.lower \}} targets, it was essential to design a flexible framework capable of integrating device-specific secure boot mechanisms.

Key goals of \{{ $names.os.lower \}} secure boot and encryption design include:

- Flexible hardware integration: Support a wide variety of architectures and device types.
- Use of balena-specific keys: Avoid depending on third-party-signed shims (e.g., Microsoft keys) by default.
- Unattended unlocking: Eliminate the need for user-supplied secrets (like passphrases) at boot.
- Seamless updates and rollbacks: Retain the existing \{{ $names.os.lower \}} capability of rolling back to a known-good state if an update fails.

Owing to the design constraints above, a secured device uses both secure boot and disk encryption - these two functionalities are not provided separately.

## Keys and Certificates in Secure Boot

Secure boot depends fundamentally on cryptographic keys and certificates to verify the integrity of every component in the boot process.

These typically include:

- **Signing Keys** : A private key signs the bootloader, kernel, and other critical binaries. This key must be kept confidential; anyone possessing it can produce binaries that devices would trust.
- **Public Certificates or keys** : The matching public certificate (or key) is stored on the device. When the device attempts to execute a signed binary (e.g., the bootloader or kernel), a cryptographic check ensures the signature is valid.

Secure Boot-enabled \{{ $names.os.lower \}} images are provided pre-signed using **balena-owned** secrets - this is a convenient way to guarantee that only trusted software runs in the device while avoiding the friction of secrets generation, managing and safeguarding.

**Note:** We are aware that balena owned keys might not fit all use cases. Unique customer keys can also be used as an extra service. Contact [sales@balena.io](mailto:sales@balena.io) to discuss further.

## Secure Element

A secure element is a tamper-resistant, isolated environment within a device's hardware, designed to protect cryptographic keys and perform sensitive operations securely. \{{ $names.company.upper \}} **only** recommends using devices with secure elements that are embedded directly into the System on a Chip (SoC). This integrated approach is preferred over solutions that rely on external, discrete chips, as embedded elements are significantly less vulnerable to physical tampering and sophisticated hardware attacks. The specific implementation varies by hardware - for detailed information, always refer to the official technical reference manual for your particular device.

## Provisioning a secured device

Provisioning a device with secure boot and full disk encryption enabled typically involves the following high-level processes:

- Enroll secure boot keys into the device
- Generate a unique disk encryption key and uses it to encrypt the storage
- Program \{{ $names.os.lower \}} into storage
- Lock the device into secure boot mode

### Secure Boot Installer Images

Typically, \{{ $names.os.lower \}} images can be categorized as:

- **Non-flasher images** : The internal storage of a device is programmed directly with \{{ $names.os.lower \}} using a live image
- **Flasher images**: Used when the devices did not expose the internal storage. The flasher image boots from an external storage medium and then the os is programmed to the required internal storage

All secure boot-enabled devices have flasher images. Moreover, given that the image not only writes the os to disk but also does other tasks such as enrolling required keys and certificates, they can be considered as `installer` images. So, secure boot enabled devices provide an `installer` image instead that can be programmed either on external or internal storage, in the latter case running from memory and performing the installation on the same disk it is booted from.

The secure boot installer is itself using signed binaries and can be used to re-program locked devices. Re-running the installer will irrevocably lose all data on the disks as the encryption key is erased.

**Note:** This imposes a limitation on the specifications for device types to support secure boot - they must have enough memory to hold the raw image that is being programmed into disk. BalenaOS reduces this restriction by using compressed memory to hold the raw image, but still, memory constrained devices will not be able to support secure boot with the current design.

### Partition Layout and Disk Encryption

Balena uses the `dm-crypt` Linux kernel subsystem and `device-mapper` framework to encrypt block devices. Balena supports both direct `dm-crypt` and `LUKS` (Linux Unified Key Setup) - the actual system used depends on the device type's vendor implementation.

A secure boot installation also alters the default \{{ $names.os.lower \}} partition table as the boot partition is split into two:

- An unencrypted boot partition which contains the signed balena bootloader binary and other essential artifacts needed to run it.
- An encrypted boot partition that mounts in the traditional `/mnt/boot` path and contains all other artifacts, including confidential files like `config.json` which contains API keys.

## Boot Chain of Trust

The notion of a chain of trust arises because each stage in the boot process validates the integrity of the subsequent stage before executing it. If at any point a link in this chain is corrupted, unsigned, or otherwise fails validation, the boot process halts or reverts to a known-good state. This sequential validation ensures that if the first link is trusted, every subsequent link remains trustworthy, preventing unauthorized or tampered code from ever running.

The root of trust is always the device’s `bootROM`. `bootROM` refers to the very first piece of firmware that runs when a device powers on. It resides in read-only memory (ROM) that is physically embedded in the processor or system-on-chip (SoC). Because the code stored in bootROM is difficult or impossible to modify (without physically altering the chip), it serves as the hardware-enforced starting point or “root of trust” for the boot process.

Key responsibilities of a bootROM include:

- **Initializing critical hardware**: Setting up CPU registers, clocks, and memory controllers in order to begin loading higher-level software.
- **Locating and verifying the next boot stage**: Often checks for cryptographic signatures or checksums on the bootloader (or other initial executables) to ensure they have not been tampered with.
- **Passing control to a validated bootloader**: Once signature verification succeeds, execution is handed off to the bootloader, continuing the chain of trust.

A typical boot chain of trust for \{{ $names.os.lower \}} involves:

- The `bootROM` validates the balena bootloader and device trees and executes the balena bootloader
- The balena bootloader mounts the encrypted storage, validates the appropriate Linux kernel plus initramfs using in-kernel `X.509` certificates
- The balena bootloader then `kexec`s into the Linux kernel
- The Linux kernel validates kernel modules on load using the in-kernel `X.509` certificates

Some devices, like `UEFI`-based ones, are able to directly load the balena bootloader as an `EFI` artifact. Others need to use a vendor bootloader like `U-Boot` as a first stage which then loads and authenticates the balena bootloader.

### Balena Bootloader

The balena bootloader addresses several challenges unique to \{{ $names.os.lower \}}’s partitioning and update model:

**Single FAT32 Boot Partition** BalenaOS typically includes a single `FAT32` boot partition to facilitate configuration changes (such as editing config.json via the balenaCLI) and support a wide range of bootloaders. However, updating the bootloader on this partition during a hostOS update carries inherent risk: an unexpected power loss could render the device unbootable.

**Minimal Bootloader Updates** Conventional bootloaders are generally designed to remain small and rarely updated. On secure boot–enabled devices, the Linux kernel resides outside the boot partition—in a redundant root partition—allowing safe kernel updates without risking device bricking during power interruptions.

**Encrypted Partition Support** Standard bootloaders like GRUB or U-Boot often lack native support for mounting encrypted partitions. Because \{{ $names.os.lower \}} secures its kernel in encrypted storage, the balena bootloader must incorporate decryption capabilities to load the kernel securely.

**Unified Configuration and Rollback Mechanism** The balena bootloader centralizes configuration across diverse hardware platforms and includes hostOS update rollback logic. This approach simplifies hardware bring-up by using vendor bootloaders as unmodified first-stage loaders while relying on the balena bootloader for secure disk access and validated kernel loading.

The balena bootloader mounts and decrypts the appropriate root partition and then loads and authenticates the Linux kernel.

### Linux Kernel and Initramfs

BalenaOS uses kexec within the balena bootloader to transition control from the initial boot stage to the final Linux kernel. In this architecture, the Linux kernel is compiled to embed an initramfs, which contains the necessary logic to:

- Mount encrypted storage partitions.
- Mount the container filesystem that holds the hostOS root filesystem.
- Perform a root switch into the running init process (which in \{{ $names.os.lower \}} is managed by `systemd`).

`Kexec` authentication relies on an `X.509` certificate (`RSA 4096-bit`, `SHA-256`) that is bundled with the kernel at compile time. This certificate:

- Authenticates the final kernel during the `kexec` procedure, verifying its integrity before execution.
- Validates kernel modules on load, ensuring only trusted, signed modules become part of the running kernel.

In the current design, the chain of trust essentially ends at the kernel. The root partition and userspace is not signed and verified.

### Root Filesystem Integrity

BalenaOS’s chain of trust ends with the Linux kernel, as the root filesystem itself is not signed. While this means the filesystem cannot be authenticated in its entirety at runtime, all partitions are encrypted, preventing tampering at rest. The operating system strictly refuses to mount partitions that are either unencrypted or encrypted with unknown credentials. Consequently, any modifications to the filesystem content would be detectable through decryption failures or mismatch in encryption keys.

### Application Authentication

Currently, applications (container images) are not cryptographically signed. However, only a fully verified operating system (one that has passed secure boot checks) is permitted to install new applications. Furthermore, the following add another layer of security:

- the manifest (target state) can only come from balenaCloud API via a `HTTPS/TLS` connection
- container images themselves are downloaded exclusively and securely from balenaCloud’s authenticated registry over `HTTPS/TLS` and reference the image with the exact hash
- if the hash of the image or any of its layers doesn't match, the pull fails and the image is not run

We strongly recommend following security best practices to ensure a robust security posture. This includes properly managing secrets, tokens, and credentials to prevent unauthorized access, as well as implementing rigorous network security measures such as firewalls, secure communication protocols, and regular monitoring for potential threats.

## Other considerations

### Loading out-of-tree kernel modules

All the kernel modules need to be signed with a trusted key. At this moments we only sign the module at build time so only the out-of-tree modules that we build and ship as a part of \{{ $names.os.lower \}} are properly signed. Loading user-built kernel modules requires building custom software and is an extra service available on demand. Contact [sales@balena.io](mailto:sales@balena.io) to discuss further.

### Debugging

It is important to understand that due to the nature of the feature, not all debugging procedures are available. Some of the more common ones are:

- A device in production mode will not accept any input or produce any output (screen/keyboard/serial) unless the user application sets it up. This makes it nearly impossible to debug early boot process failures (bootloader/kernel). A device in development mode will still start getty but only after the system gets all the way to userspace.
- It is not possible to tamper with bootloader configuration, which includes changing kernel parameters or other boot configurations.
- Since the encryption keys can only be accessed on the device itself after authenticated booting, it is neither possible to remove the storage media and mount/inspect it on a different device nor boot off a temporary boot media on the same device.
- Some features of the kernel are not available due to it being in lockdown mode. See [`man 7 kernel_lockdown`](https://man7.org/linux/man-pages/man7/kernel_lockdown.7.html) for details.
