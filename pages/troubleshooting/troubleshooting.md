---
title: Troubleshooting
---

# Troubleshooting

* [General](/troubleshooting/troubleshooting#general)
  * [Terminal Closes On Update](/troubleshooting/troubleshooting#terminal-closes-on-update)
  * [Can't Login to dashboard.resin.io](/troubleshooting/troubleshooting#can-t-login-to-dashboard-resin-io)
  * [I get `$'\r': command not found` when my device tries to run scripts](/troubleshooting/troubleshooting#i-get-r-command-not-found-when-my-device-tries-to-run-scripts)
  * [Device keeps dropping off wifi](#device-keeps-dropping-off-wifi)
* [Raspberry Pi](/troubleshooting/troubleshooting#raspberry-pi)
  * [My Device Doesn't Boot](/troubleshooting/troubleshooting#my-device-doesn-t-boot)
  * [Connectivity](/troubleshooting/troubleshooting#connectivity)
  * [SD Card Corruption](/troubleshooting/troubleshooting#sd-card-corruption)
  * [Wifi doesn't connect on RPI3](#wifi-connection-problems-on-rpi3)
* [Intel Edison](/troubleshooting/troubleshooting#intel-edison)
  * [Help!!! I want to restore my Edison to factory Yocto](/troubleshooting/troubleshooting#help-i-want-to-restore-my-edison-to-factory-yocto)
  * [I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows](/troubleshooting/troubleshooting#i-get-dfu-util-device-has-dfu-interface-but-has-no-dfu-functional-descriptor-in-windows)

## General

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to dashboard.resin.io

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.resin.io` domains.

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

One other thing to confirm is that you are not trying to boot a Raspberry Pi 2 with a OS download designed for the Raspberry Pi B+. This will not work. The Raspberry Pi 2 requires a OS download specific to its architecture.

### Connectivity

If a Resin.io ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

* You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
* The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be *physically* worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

### Wifi connection problems on RPI3
If you are having issues with your RPI3 connecting to your wifi, make sure
to check that the 2.4 GHz channel on your wifi router is set to something less than 11, since
the firmware on the Raspberry Pi doesn't support channel 12 and 13.

## Intel Edison

### Help, I want to restore my Edison to factory Yocto

If you are one of the unfortunate people who feel they want to return to the old Yocto build of the Edison you can have a look over here on our guide to [restore original Edison firmware](/troubleshooting/restore-edison).

### I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows

Make sure you have [Intel Edison drivers](https://software.intel.com/en-us/iot/hardware/edison/downloads) installed in your computer.

[error]:/troubleshooting/error
