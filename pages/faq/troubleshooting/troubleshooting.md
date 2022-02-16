---
title: Troubleshooting
---

# Troubleshooting

* [General](#general)
  * [Terminal Closes On Update](#terminal-closes-on-update)
  * [Can't Login to the Dashboard](#cant-login-to-the-dashboard)
  * [I get `$'\r': command not found` when my device tries to run scripts](#i-get-r-command-not-found-when-my-device-tries-to-run-scripts)
  * [Device keeps dropping off wifi](#device-keeps-dropping-off-wifi)
* [Raspberry Pi](#raspberry-pi)
  * [My Device Doesn't Boot](#my-device-doesnt-boot)
  * [Connectivity](#connectivity)
  * [SD Card Corruption](#sd-card-corruption)
  * [Wifi doesn't connect on RPI3](#wifi-connection-problems-on-rpi3)
  * [BalenaOS boot issues with new hardware revision of RPi4](#balenaos-boot-issues-with-new-hardware-revision-of-rpi4)
* [Jetson TX2](#jetson-tx2)
  * [Unable to flash a board that was previously running L4T 28.x](#unable-to-flash-a-board-that-was-previously-running-l4t-28x)
  * [Are L4T 28.4 and 28.5 relases supported in balenaOS](#are-L4T-28.4-and-28.5-releases-supported-in-BalenaOS)
  * [Can a balenaOS update from an older L4T 28.X based release to a newer L4T 32.X be interrupted? Can I boot back into the old OS?](#can-a-balenaOS-update-from-an-older-L4T-28.X-based-release-to-a-newer-L4T-32.X-be-interrupted?-Can-I-boot-back-into-the-old-OS?)
* [Jetson Nano SD-CARD and Jetson Nano 2GB](#jetson-nano-sd-card-and-jetson-nano-2GB)
  * [Unable to boot balenaOS image downloaded from the Balena cloud](#unable-to-boot-balenaos-image-downloaded-from-balena-cloud)
* [Jetson L4T versions](#jetson-l4t-versions)
  * [How can I determine which L4T a balenaOS image uses?](#how-can-i-determine-which-l4t-a-balenaos-image-uses?)
* [Intel Edison](#intel-edison)
  * [Help!!! I want to restore my Edison to factory Yocto](#help-i-want-to-restore-my-edison-to-factory-yocto)
  * [I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows](#i-get-dfu-util-device-has-dfu-interface-but-has-no-dfu-functional-descriptor-in-windows)

## General

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to the Dashboard

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.{{ $names.cloud_domain }}` domains.

### I get `$'\r': command not found` when my device tries to run scripts
Line endings differ between Windows and the Unix-y world (they used to be different again for Mac but not for many years), which can result in issues. E.g. a user seeing something like:
/usr/src/app/run.sh: line 2: $'\r': command not found

To resolve this, you will need to configure git to automatically convert line endings. In order to configure this for Windows have a look here: https://help.github.com/articles/dealing-with-line-endings/#platform-windows.

### Device keeps dropping off wifi
If your device keeps dropping offline, it may be worth switching to a 5GHz band wifi dongle, as we have seen cases where 2.4GHz gets badly affected by surrounding noise.

### Unsupported Syscall: 384 from qemu on builder
The qemu: Unsupported syscall: 384 is a warning that the getrandom(2) system call is not implemented by our emulation layer, qemu. It can be safely ignored. Since it's a fairly new system call (introduced in kernel 3.17), `apt` and almost all programs automatically fall back to reading from `/dev/urandom` when this syscall fails.

## Raspberry Pi

### My Device Doesn't Boot

To determine the cause of this issue, check your ACT LED for known [error notifications][error]. If no known errors are shown on the ACT LED, attach a screen to your Pi's HDMI port.

One other thing to confirm is that you are not trying to boot a Raspberry Pi 2 with an OS download designed for the Raspberry Pi B+. This will not work. The Raspberry Pi 2 requires an OS download specific to its architecture.

### Connectivity

If a {{ $names.company.upper }} ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

* You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
* The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be *physically* worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

### Wifi connection problems on RPI3

If you are having issues with your RPI3 connecting to your wifi, make sure
to check that the 2.4 GHz channel on your wifi router is set to something less than 11, since
the firmware on the Raspberry Pi doesn't support channel 12 and 13.

### balenaOS boot issues with new hardware revision of RPi4

[Raspberry Pi](https://www.raspberrypi.com/) recently released [hardware Rev 1.5](https://forums.raspberrypi.com/viewtopic.php?t=329299) of the Raspberry Pi 4 Model B. This revision of the board requires a relatively recent version of [balenaOS](https://balena.io/os). We recommend using balenaOS v2.88.5+rev1 or later that contains the updated firmware version. BalenaOS v2.75.0+rev1 and earlier versions aren't tested and possibly won't boot on this revision of the board.

To determine if you have hardware Rev 1.5 of the Raspberry Pi 4 Model B, follow the steps below:

1. Run the following command in balenaOS v2.88.5+rev1 or later. The output should confirm the hardware revision.

```
$ cat /proc/cpuinfo | grep Model 
Raspberry Pi 4 Model B Rev 1.5
```

2. Look for the Dialog DA9090 power management controller next to the USB-C port. Check the picture below for reference.

<img src="/img/troubleshooting/DA9090_identified.jpg" width="50%">

For more information about Raspberry Pi 4 Model B Rev 1.5, please refer to the [Product Information Portal](https://pip.raspberrypi.com/restricted) by Raspberry Pi.

### Error Notifications

#### Unable to Connect to the Internet
If the Raspberry Pi is unable to connect to the {{ $names.company.lower }} servers, the `ACT` LED will flash a repeated pattern of 4 short flashes followed by a pause (`*_*_*_*____*_*_*_*____`).

This is either because it is not connected to the network or because the network ports which {{ $names.company.lower }} relies on are blocked in some way.

* The first things to check in this case is that your device is correctly connected to ethernet or that you correctly entered the wifi credentials. To check wifi credentials, power your device down, remove the SD card, and mount the SD card on your personal computer. If your device is running {{ $names.os.lower }} version 2.0 or greater, wifi credentials are listed in `system-connections/resin-wifi`, found in the `resin-boot` partition of the SD card. Otherwise, check the `config.json` file (in the `resin-boot` partition for versions 1.2 and greater, or `resin-conf` for earlier versions).
* Secondly check that your network is not restricting or blocking the ports specified in the [{{ $names.company.lower }} network requirements](/reference/OS/network/2.x/#network-requirements).
* If you still aren't able to get your device online, reach out to us in the [forums]({{ $names.forums_domain }}).

#### Can't Boot the Kernel.img
If the `ACT` LED blinks with the repeated pattern of 7 quick flashes and a pause (`*_*_*_*_*_*_*____*_*_*_*_*_*_*____`), this means that the Raspberry Pi boot loader is not able to load the correct kernel.img.
* The first thing to check here is that you are using the right OS image for your board type. If you look at the small white print near the GPIO pins of the Raspberry Pi you should see the type of Raspberry Pi you have. You need to ensure that this is the same as the device type that you selected when creating the fleet on the {{ $names.company.lower }} dashboard. You can check the type of device for an existing fleet by looking at the 'How to add devices' help text inside the fleet or the icon for that fleet on your dashboard.
* It's important to note that a Raspberry Pi 2 fleet's balenaOS image will not boot on a Raspberry Pi 1 board and vice versa.
* For more in-depth info the boot related LED patterns have a look at the [Raspberry Pi wiki](http://elinux.org/R-Pi_Troubleshooting#Green_LED_blinks_in_a_specific_pattern).

#### Poor Power Supply
If you have a screen attached to your Raspberry Pi and notice that there is a small flashing colorful square in the top right of the screen, it could be the case that your power supply or USB cable is not suitable. Take a look at the [Troubleshooting Power Problems](http://elinux.org/R-Pi_Troubleshooting#Troubleshooting_power_problems) page on the Raspberry Pi wiki. Additionally, if the onboard `PWR` LED is flashing intermittently, this too could indicate issues with the power supply.

## Jetson TX2

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

## Jetson Nano SD-CARD and Jetson Nano 2GB

### Unable to boot balenaOS image downloaded from Balena cloud

Starting with L4T 32.5, all bootloaders and firmware on the Jetson Nano family of boards have been moved from the sd-card/eMMC to the device's QSPI flash memory. L4T 32.5 and newer bootloaders are not compatible with previous L4T releases.

If you purchased a Jetson Nano SD-CARD Devkit or a Jetson Nano 2GB Devkit that won't boot balenaOS but boots the L4T Ubuntu image, or if you used an L4T 32.5 or newer Ubuntu image with your Jetson Nano and wish to run balenaOS, you can use [Jetson Flash][jetson-flash] to write the balenaOS cloud image on your device. This step is needed only once, for the initial QSPI flashing process, and only if the device does not boot the cloud image directly. You can further switch to newer L4T versions by performing balenaOS updates from the dashboard. You can always see what L4T version the device runs by issuing `uname -a`.

NOTE: On Jetson devices it is important to not interrupt the balenaOS update process. Please ensure the device is powered correctly or has sufficient battery, the internet connectivity is stable and that the device is not rebooted or shutdown during the balenaOS update, otherwise the device may fail to boot and will need to be re-flashed.

## Jetson L4T versions

### How can I determine which L4T a balenaOS image uses?

If the device is running, typing `uname -a` will show the L4T in the kernel version string. Additionally, the L4T version is visible in the [balena-jetson github repository][tegra-binaries-version] for every release tag.

## Intel Edison

### Help, I want to restore my Edison to factory Yocto

If you are one of the unfortunate people who feel they want to return to the old Yocto build of the Edison you can have a look over here on our guide to [restore original Edison firmware](/faq/troubleshooting/restore-edison).

### I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows

Make sure you have [Intel Edison drivers](https://software.intel.com/en-us/iot/hardware/edison/downloads) installed in your computer.

[error]:#error-notifications
[l4t]:https://developer.nvidia.com/embedded/linux-tegra
[l4t-download]:https://developer.nvidia.com/embedded/linux-tegra-archive
[meta-tegra]:https://github.com/OE4T/meta-tegra
[self-service-update]:/reference/OS/updates/self-service/
[tegra-binaries-version]:https://github.com/balena-os/balena-jetson/tree/master/layers/meta-balena-jetson/recipes-bsp/tegra-binaries
[jetson-flash]:https://github.com/balena-os/jetson-flash
