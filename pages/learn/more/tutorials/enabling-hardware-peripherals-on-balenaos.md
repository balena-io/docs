# Enabling hardware peripherals on balenaOS

In this tutorial, we’ll demonstrate how to enable third party add-on hardware such as modems and AI HATs. Typically, this extra hardware requires two things in order to work:

* A device “driver” is software that tells the OS how to communicate with a specific piece of hardware. The driver will often be in the form of a kernel module that can be loaded or unloaded as needed. Kernel modules for some popular hardware are already included in the kernel.
* The device firmware is low-level code that runs on the peripheral itself. It’s loaded onto the peripheral hardware at initialization and allows it to communicate with the host device (SBC). While some firmware for popular hardware is already included in balenaOS, others require an EULA to be accepted which limits their inclusion.

### Check for existing driver/kernel module

Before loading custom firmware or drivers, let’s see if any currently exist in the OS for our device. If you have access to the hardware, attach it and try the following steps. Otherwise, you can jump down to option two below.

#### Option 1: Checking the hardware

Use a command such as `lspci` or `lsusb` (depending on how the hardware is connected) to see if the OS detects it.

Here we’ve plugged an off-the-shelf wireless network adapter into a Pi 5 USB port and checked to see if it was detected:

<figure><img src="../../../.gitbook/assets/tutorial01 - rtl lsusb found device.png" alt=""><figcaption></figcaption></figure>

Running `lsusb` with the `-t` option shows us that a driver already existed in the OS:

<figure><img src="../../../.gitbook/assets/tutorial01- rtl driver found.png" alt=""><figcaption></figcaption></figure>

Now that we have confirmed the driver is loaded, we can check for the firmware with a command such as `dmesg | grep -i firmware` that confirms the firmware was found and loaded:

<figure><img src="../../../.gitbook/assets/tutorial01 - rtl fw found.png" alt=""><figcaption></figcaption></figure>

#### Option 2: Use the SBOM (Software Bill Of Materials)

To view an SBOM, click the link for the host OS version on a device summary or fleet summary page. (Some older versions of balenaOS do not have an SBOM populated.)

<figure><img src="../../../.gitbook/assets/tutorial01 -pi5 assets.webp" alt=""><figcaption></figcaption></figure>

The manifest file is a good place to start, since it lists all the components and libraries of the OS version. You’ll need some idea of the hardware or chipset information you’re looking for which you can often find on the manufacturer’s product page or device specifications. In keeping with our wireless card example above, we searched the manifest for “Ralink” and “rtl2800” which were found in the product’s specs.



<div align="left"><figure><img src="../../../.gitbook/assets/tutorial01 - hailo-fw-manifest.png" alt=""><figcaption></figcaption></figure></div>

<div align="left"><figure><img src="../../../.gitbook/assets/tutorial01 - ralink firmware.png" alt=""><figcaption></figcaption></figure></div>

Note that newer releases of balenaOS may remove previously included firmware files in order to save space, so always make these checks as part of your testing before upgrading to a new OS version.

### Loading firmware on balenaOS

We’ll use a [Pi HAILO AI HAT+](https://www.raspberrypi.com/products/ai-hat/) as our next hardware example. By searching for “hailo” in the manifest, we can see that neither the kernel module driver nor the firmware are available.

Typically device firmware files are stored in the `/lib/firmware` folder on the host device. However, you can’t simply copy files into that location because it’s in the rootfs which is by default read-only in balenaOS. We need to copy the Hailo firmware files into an accessible location that we can tell the kernel to read from.

In our [“AI HAT Demo” repository](https://github.com/balena-solutions/ai-hat-demo) you’ll see a service called “hailo-kmod” that includes the `io.balena.features.extra-firmware` label. The presence of this label accomplishes two things:

* &#x20;   It tells the Supervisor to mount a volume at `/extra-firmware` in the container.&#x20;
* &#x20;   It configures the OS to look in this volume first for firmware files before looking in the default location.

The AI HAT Getting Started Guide tells us that we can get the Hailo firmware by running `apt install hailo-all` so we do that in our Dockerfile.

The `load.sh` shell script completes the firmware loading process through the following steps:<br>

* It copies the downloaded Hailo firmware to the `/extra-firmware` volume
* It then reloads the kernel module (see below) via modprobe. This causes the firmware to be loaded from the newly specified location.

### Building an out-of-tree kernel module

Kernel modules that are not part of the core Linux kernel are considered "out-of-tree". Since the required Hailo module is not shipped with balenaOS, we'll consider it out-of-tree and go through the steps required to build it ourselves.

To build a module in our containerized application, we'll need to:

* Ensure all build dependencies are installed in the container
* Install the kernel headers for the kernel version of balenaOS on our device
* Use the kernel build system to compile the module.
* The application must then load the kernel module when required

In our same [“AI HAT Demo” repository](https://github.com/balena-solutions/ai-hat-demo) you’ll find a service (container) named "hailo-kmod" that performs all of the tasks in the list above:

* The `Dockerfile.template` file installs the build dependencies and downloads the Hailo driver source
* The `build.sh` script downloads the balena kernel headers and builds the Hailo PCIe module. BalenaOS provides kernel headers as a `kernel-modules-headers` compressed tarball artifact. Before using it, it must be built with `make modules_prepare`
* The `load.sh` script loads the built module

### Confirming the hardware

Later in dmesg, we can see the successful loading of the firmware and the module:

<figure><img src="../../../.gitbook/assets/tutorial01 - hailo fw found.png" alt=""><figcaption></figcaption></figure>

### More resources

* Docs: [extra-firmware.md](../../develop/extra-firmware.md "mention")

