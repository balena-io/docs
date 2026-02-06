# Troubleshooting information for Nvidia Jetson TX2 NX (with Xavier NX Devkit)

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to the Dashboard

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.balena-cloud.com` domains.

### I get `$'\r': command not found` when my device tries to run scripts

Line endings differ between Windows and the Unix-y world (they used to be different again for Mac but not for many years), which can result in issues. E.g. a user seeing something like:
/usr/src/app/run.sh: line 2: $'\r': command not found

To resolve this, you will need to configure git to automatically convert line endings. In order to configure this for Windows have a look here: https://help.github.com/articles/dealing-with-line-endings/#platform-windows.

### Device keeps dropping off wifi

If your device keeps dropping offline, it may be worth switching to a 5GHz band wifi dongle, as we have seen cases where 2.4GHz gets badly affected by surrounding noise.

### Unsupported Syscall: 384 from qemu on builder

The qemu: Unsupported syscall: 384 is a warning that the getrandom(2) system call is not implemented by our emulation layer, qemu. It can be safely ignored. Since it's a fairly new system call (introduced in kernel 3.17), `apt` and almost all programs automatically fall back to reading from `/dev/urandom` when this syscall fails.

### Help! My device won't show up.

If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly (if you need help fixing your credentials, see [WiFi Help](../pages/reference/OS/network.md#wifi-setup)) and ensure that your network meets these [basic requirements](../pages/reference/OS/network.md#network-requirements). If the device has a LED indicator, it may also be worth checking it for any known error codes or signals.

If you have an HDMI screen attached, you should see balena logo on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted.


### Are L4T 28.4 and 28.5 releases supported in balenaOS?

The L4T versions 28.4 and 28.5 did not follow the usual incremental release process, instead these version were released in July 2020 and July 2021 respectively, after the first iterations of L4T 32.X were released.
Since balenaOS uses the [OE4T/meta-tegra](https://github.com/OE4T/meta-tegra) yocto repository and only updates to incremetal versions of L4T, balenaOS images based on 28.4 and and 28.5 which were released after L4T 32.1 are not available in the balenaCloud.

### Can a balenaOS update from an older L4T 28.X based release to a newer L4T 32.X be interrupted? Can I boot back into the old OS?

Starting with L4T 32.1 the L4T partition layout has changed as well as the firmware and bootloaders stored on the raw partitions. The balenaOS update process thus needs to re-create all the L4T partitions that were modified in the newer L4T, to allow for the newer bootloaders and kernels to run. The L4T 28.x partition layout is not compatible with the L4T 32.x format and vice-versa, which means that a newer kernel cannot boot with the older partition format, nor can an older kernel boot with the new layout and contents. Therefore, the balenaOS update process should not interrupted on the Jetson family of boards, otherwise the device may not boot. Please ensure the device is powered correctly or has sufficient battery, the internet connectivity is stable and that it is not powered-off or rebooted manually during the balenaOS update.

In the case of a device that will not boot because of an interrupted update procedure, it will need to be re-flashed. This can be done by [downloading the L4T Driver Package](https://developer.nvidia.com/embedded/linux-tegra-archive) (BSP), unpacking it, putting the device in recovery mode and executing `sudo ./flash.sh jetson-tx2 mmcblk0p1`. Once the L4T partitions are finished writing, the device can be booted using the appropriate balenaOS flasher SD-CARD image for the targeted L4T version.

### Custom device tree support

Loading of custom device trees (DT) in balenaOS is supported only by the Jetson Nano and Jetson TX2 family of devices, which have u-boot support. The complete list of devices supporting custom DT and how to apply them is available in the [hardware section](../pages/learn/develop/hardware/i2c-and-spi.md#jetson-devices).


## Jetson L4T versions

### How can I determine which L4T a balenaOS image uses?

If the device is running, typing `uname -a` will show the L4T in the kernel version string. Additionally, the L4T version is visible in the [balena-jetson github repository](https://github.com/balena-os/balena-jetson/tree/master/layers/meta-balena-jetson/recipes-bsp/tegra-binaries) for every release tag.

### Custom device tree support

Loading of custom device trees (DT) in balenaOS is supported only by the Jetson Nano and Jetson TX2 family of devices, which have u-boot support. The complete list of devices supporting custom DT and how to apply them is available in the [hardware section](../pages/learn/develop/hardware/i2c-and-spi.md#jetson-devices).


If you still can't get your device online, come on over and talk to us on our [support channel](../pages/learn/accounts/support-access.md).

### This is the wrong balena device.

If you see this error, there are several potential causes, including:

- The config.json file is missing or corrupted
- The UUID in the config.json file does not match the device's UUID
    - This could be caused by config.json corruption or storage corruption
- You are attempting to SSH into a device using the wrong IP address

Please contact [balena support](../pages/learn/accounts/support-access.md) if you encounter this issue so that we can investigate the root cause.
