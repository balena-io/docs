### Unable to flash a board that was previously running L4T 28.x

With {{ $names.os.lower }} 2.47, the [Tegra Linux Driver Package][l4t] (L4T) was upgraded to version 32.2 from a previous version of 28.x. Trying to flash a board that was previously running L4T 28.x with an SD card containing L4T 32.2 or newer will fail. This failure happens because L4T 32.2 and newer kernels are incompatible with the eMMC partitions from L4T 28.x, and vice-versa.

To resolve, either:

* Perform a [self-service update][self-service-update] to update {{ $names.os.lower }} to >=2.47.
* Update the Tegra partitions on the eMMC by [downloading the L4T Driver Package][l4t-download] (BSP), unpack it, put the board in recovery mode and execute `sudo ./flash.sh jetson-tx2 mmcblk0p1`. Once this completes, you can reboot the board with the SD card inserted and flash the board as normal. You only need to perform this process once.

### Are L4T 28.4 and 28.5 releases supported in balenaOS?

The L4T versions 28.4 and 28.5 did not follow the usual incremental release process, instead these version were released in July 2020 and July 2021 respectively, after the first iterations of L4T 32.X were released.
Since balenaOS uses the [OE4T/meta-tegra][meta-tegra] yocto repository and only updates to incremetal versions of L4T, balenaOS images based on 28.4 and and 28.5 which were released after L4T 32.1 are not available in the Balena cloud.

### Can a balenaOS update from an older L4T 28.X based release to a newer L4T 32.X be interrupted? Can I boot back into the old OS?

Starting with L4T 32.1 the L4T partition layout has changed as well as the firmware and bootloaders stored on the raw partitions. The balenaOS update process thus needs to re-create all the L4T partitions that were modified in the newer L4T, to allow for the newer bootloaders and kernels to run. The L4T 28.x partition layout is not compatible with the L4T 32.x format and vice-versa, which means that a newer kernel cannot boot with the older partition format, nor can an older kernel boot with the new layout and contents. Therefore, the balenaOS update process should not interrupted on the Jetson family of boards, otherwise the device may not boot. Please ensure the device is powered correctly or has sufficient battery, the internet connectivity is stable and that it is not powered-off or rebooted manually during the balenaOS update.

In the case of a device that will not boot because of an interrupted update procedure, it will need to be re-flashed. This can be done by [downloading the L4T Driver Package][l4t-download] (BSP), unpacking it, putting the device in recovery mode and executing `sudo ./flash.sh jetson-tx2 mmcblk0p1`. Once the L4T partitions are finished writing, the device can be booted using the appropriate balenaOS flasher SD-CARD image for the targeted L4T version.

## Jetson L4T versions

### How can I determine which L4T a balenaOS image uses?

If the device is running, typing `uname -a` will show the L4T in the kernel version string. Additionally, the L4T version is visible in the [balena-jetson github repository][tegra-binaries-version] for every release tag.

### Custom device tree support

Loading of custom device trees (DT) in balenaOS is supported only by the Jetson Nano and Jetson TX2 family of devices, which have u-boot support. The complete list of devices supporting custom DT and how to apply them is available in the [hardware section][hardware section].


[tegra-binaries-version]:https://github.com/balena-os/balena-jetson/tree/master/layers/meta-balena-jetson/recipes-bsp/tegra-binaries
[jetson-flash]:https://github.com/balena-os/jetson-flash
[hardware section]:/learn/develop/hardware/i2c-and-spi/#jetson-devices

[l4t]:https://developer.nvidia.com/embedded/linux-tegra
[l4t-download]:https://developer.nvidia.com/embedded/linux-tegra-archive
[meta-tegra]:https://github.com/OE4T/meta-tegra
[self-service-update]:/reference/OS/updates/self-service/
