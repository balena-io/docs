### Unable to boot balenaOS image downloaded from balenaCloud

Starting with L4T 32.5, all bootloaders and firmware on the Jetson Nano family of boards have been moved from the sd-card/eMMC to the device's QSPI flash memory. L4T 32.5 and newer bootloaders are not compatible with previous L4T releases.

If you purchased a Jetson Nano SD-CARD Devkit or a Jetson Nano 2GB Devkit that won't boot balenaOS but boots the L4T Ubuntu image, or if you used an L4T 32.5 or newer Ubuntu image with your Jetson Nano and wish to run balenaOS, you can use [Jetson Flash][jetson-flash] to write the balenaOS cloud image on your device. This step is needed only once, for the initial QSPI flashing process, and only if the device does not boot the cloud image directly. You can further switch to newer L4T versions by performing balenaOS updates from the dashboard. You can always see what L4T version the device runs by issuing `uname -a`.

NOTE: On Jetson devices it is important to not interrupt the balenaOS update process. Please ensure the device is powered correctly or has sufficient battery, the internet connectivity is stable and that the device is not rebooted or shutdown during the balenaOS update, otherwise the device may fail to boot and will need to be re-flashed.

## Jetson L4T versions

### How can I determine which L4T a balenaOS image uses?

If the device is running, typing `uname -a` will show the L4T in the kernel version string. Additionally, the L4T version is visible in the [balena-jetson github repository][tegra-binaries-version] for every release tag.

### Custom device tree support

Loading of custom device trees (DT) in balenaOS is supported only by the Jetson Nano and Jetson TX2 family of devices, which have u-boot support. The complete list of devices supporting custom DT and how to apply them is available in the [hardware section][hardware section].


[tegra-binaries-version]:https://github.com/balena-os/balena-jetson/tree/master/layers/meta-balena-jetson/recipes-bsp/tegra-binaries
[jetson-flash]:https://github.com/balena-os/jetson-flash
[hardware section]:/learn/develop/hardware/i2c-and-spi/#jetson-devices