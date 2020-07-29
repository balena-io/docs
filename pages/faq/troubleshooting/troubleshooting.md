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
* [NVIDIA Jetson TX2](#nvidia-jetson-tx2)
  * [Unable to flash a board that was previously running L4T 28.x](#unable-to-flash-a-board-that-was-previously-running-l4t-28x)
* [Intel Edison](#intel-edison)
  * [Help!!! I want to restore my Edison to factory Yocto](#help-i-want-to-restore-my-edison-to-factory-yocto)
  * [I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows](#i-get-dfu-util-device-has-dfu-interface-but-has-no-dfu-functional-descriptor-in-windows)

## General

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to the Dashboard

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.{{ $names.cloud_domain }}` domains.

### I get `$'\r': command not found` when my device tries to run scripts
Line endings differ between windows and the unix-y world (they used to be different again for mac but not for many years), which can result in issues. E.g. a user seeing something like:
/usr/src/app/run.sh: line 2: $'\r': command not found

To resolve this, you will need to configure git to auto convert line endings. In order to configure this for windows have a look here: https://help.github.com/articles/dealing-with-line-endings/#platform-windows.

### Device keeps dropping off wifi
If your device keeps dropping offline, it may be worth switching to 5GHz band wifi dongle, as we have seen cases where 2.4GHz gets badly affected by surrounding noise.

### Unsupported Syscall: 384 from qemu on builder
The qemu: Unsupported syscall: 384 is a warning that the getrandom(2) system call is not implemented by our emulation layer, qemu. It can be safely ignored. Since it's a fairly new system call (introduced in kernel 3.17), apt and almost all programs automatically fall back to reading from `/dev/urandom` when this syscall fails.

## Raspberry Pi

### My Device Doesn't Boot

To determine the cause of this issue, check your ACT led for known [error notifications][error]. If no known errors are shown on the ACT led, attach a screen to your Pi's HDMI port.

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

### Error Notifications

#### Unable to Connect to the Internet
If the Raspberry pi is unable to connect to the {{ $names.company.lower }} servers, the `ACT` LED will flash a repeated pattern of 4 short flashes followed by a pause (`*_*_*_*____*_*_*_*____`).

This is either because it is not connected to the network or because the network ports which {{ $names.company.lower }} relies on are blocked in some way.

* The first things to check in this case is that your device is correctly connected to ethernet or that you correctly entered the wifi credentials. To check wifi credentials, power your device down, remove the SD card, and mount the SD card on your personal computer. If your device is running {{ $names.os.lower }} version 2.0 or greater, wifi credentials are listed in `system-connections/resin-wifi`, found in the `resin-boot` partition of the SD card. Otherwise, check the `config.json` file (in the `resin-boot` partition for versions 1.2 and greater, or `resin-conf` for earlier versions).
* Secondly check that your network is not restricting or blocking the ports specified in the [{{ $names.company.lower }} network requirements](/reference/OS/network/2.x/#network-requirements).
* If you still aren't able to get your device online, reach out to us in the [forums]({{ $names.forums_domain }}).

#### Can't Boot the Kernel.img
If the `ACT` LED blinks with the repeated pattern of 7 quick flashes and a pause (`*_*_*_*_*_*_*____*_*_*_*_*_*_*____`), this means that the raspberry pi boot loader is not able to load the correct kernel.img.
* The first thing to check here is that you are using the right OS image for your board type. If you look small white print near the GPIO pins of the Raspberry pi you should see the type of raspberry pi you have. You need to ensure that this is the same as the device type that you selected when creating the Application on the {{ $names.company.lower }} dashboard. You can check the type of device for an existing Application by looking at the 'How to add devices' help text inside the Application, or the icon for that Application on your dashboard.
* Its important to note that a Raspberry Pi 2 application OS image will not boot on a Raspberry Pi 1 board and vice versa.
* For more in depth info the boot related LED patterns have a look at the [raspberry pi wiki](http://elinux.org/R-Pi_Troubleshooting#Green_LED_blinks_in_a_specific_pattern).

#### Poor Power Supply
If you have a screen attached to your Raspberry Pi and notice that there is a small flashing colorful square in the top right of the screen, it could be the case that your power supply or USB cable is not suitable. Take a look at the [Troubleshooting Power Problems](http://elinux.org/R-Pi_Troubleshooting#Troubleshooting_power_problems) on the Raspberry Pi wiki. Additionally, if the onboard `PWR` LED is flashing intermittently, this too could indicate issues with the power supply.

## NVIDIA Jetson TX2

### Unable to flash a board that was previously running L4T 28.x

With {{ $names.os.lower }} 2.47, the [NVIDIA Tegra Linux Driver Package][l4t] (L4T) was upgraded to version 32.2 from a previous version of 28.x. Trying to flash a board that was previously running L4T 28.x with an SD card containing L4T 32.2 will fail. This failure happens because the new 32.2 kernel is incompatible with the NVIDIA eMMC partitions from L4T 28.x.

To resolve, either:

* Perform a [self-service update][self-service-update] to update {{ $names.os.lower }} to >=2.47.
* Update the Tegra partitions on the eMMC by [downloading the L4T Driver Package][l4t-download] (BSP), unpack it, put the board in recovery mode and execute `sudo ./flash.sh jetson-tx2 mmcblk0p1`. Once this completes, you can reboot the board with the SD card inserted and flash the board as normal. You only need to perform this process once.

## Intel Edison

### Help, I want to restore my Edison to factory Yocto

If you are one of the unfortunate people who feel they want to return to the old Yocto build of the Edison you can have a look over here on our guide to [restore original Edison firmware](/faq/troubleshooting/restore-edison).

### I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows

Make sure you have [Intel Edison drivers](https://software.intel.com/en-us/iot/hardware/edison/downloads) installed in your computer.

[error]:#error-notifications
[l4t]:https://developer.nvidia.com/embedded/linux-tegra
[l4t-download]:https://developer.nvidia.com/embedded/linux-tegra-r322
[self-service-update]:/reference/OS/updates/self-service/
