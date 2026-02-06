# Troubleshooting information for Nvidia Jetson Nano eMMC

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

If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly (if you need help fixing your credentials, see [WiFi Help](/reference/OS/network/2.x/#wifi-setup)) and ensure that your network meets these [basic requirements](/reference/OS/network/2.x/#network-requirements). If the device has a LED indicator, it may also be worth checking it for any known error codes or signals.

If you have an HDMI screen attached, you should see balena logo on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted.

### Unable to boot balenaOS image downloaded from balenaCloud

Starting with L4T 32.5, all bootloaders and firmware on the Jetson Nano family of boards have been moved from the sd-card/eMMC to the device's QSPI flash memory. L4T 32.5 and newer bootloaders are not compatible with previous L4T releases.

If you purchased a Jetson Nano SD-CARD Devkit or a Jetson Nano 2GB Devkit that won't boot balenaOS but boots the L4T Ubuntu image, or if you used an L4T 32.5 or newer Ubuntu image with your Jetson Nano and wish to run balenaOS, you can use [Jetson Flash](https://github.com/balena-os/jetson-flash) to write the balenaOS cloud image on your device. This step is needed only once, for the initial QSPI flashing process, and only if the device does not boot the cloud image directly. You can further switch to newer L4T versions by performing balenaOS updates from the dashboard. You can always see what L4T version the device runs by issuing `uname -a`.

NOTE: On Jetson devices it is important to not interrupt the balenaOS update process. Please ensure the device is powered correctly or has sufficient battery, the internet connectivity is stable and that the device is not rebooted or shutdown during the balenaOS update, otherwise the device may fail to boot and will need to be re-flashed.

## Jetson L4T versions

### How can I determine which L4T a balenaOS image uses?

If the device is running, typing `uname -a` will show the L4T in the kernel version string. Additionally, the L4T version is visible in the [balena-jetson github repository](https://github.com/balena-os/balena-jetson/tree/master/layers/meta-balena-jetson/recipes-bsp/tegra-binaries) for every release tag.

### Custom device tree support

Loading of custom device trees (DT) in balenaOS is supported only by the Jetson Nano and Jetson TX2 family of devices, which have u-boot support. The complete list of devices supporting custom DT and how to apply them is available in the [hardware section](/learn/develop/hardware/i2c-and-spi/#jetson-devices).


If you still can't get your device online, come on over and talk to us on our [support channel](/support/).

### This is the wrong balena device.

If you see this error, there are several potential causes, including:

- The config.json file is missing or corrupted
- The UUID in the config.json file does not match the device's UUID
    - This could be caused by config.json corruption or storage corruption
- You are attempting to SSH into a device using the wrong IP address

Please contact [balena support](/support/) if you encounter this issue so that we can investigate the root cause.
