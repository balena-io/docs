# Troubleshooting information for Raspberry Pi 4 (using 64bit OS)

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to the Dashboard

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.balena-cloud.com` domains.

### I get `$'\r': command not found` when my device tries to run scripts

Line endings differ between Windows and the Unix-y world (they used to be different again for Mac but not for many years), which can result in issues. E.g. a user seeing something like: /usr/src/app/run.sh: line 2: $'\r': command not found

To resolve this, you will need to configure git to automatically convert line endings. In order to configure this for Windows have a look [at this Github article](https://help.github.com/articles/dealing-with-line-endings/#platform-windows).

### Device keeps dropping off wifi

If your device keeps dropping offline, it may be worth switching to a 5GHz band wifi dongle, as we have seen cases where 2.4GHz gets badly affected by surrounding noise.

### Unsupported Syscall: 384 from qemu on builder

The qemu: Unsupported syscall: 384 is a warning that the getrandom(2) system call is not implemented by our emulation layer, qemu. It can be safely ignored. Since it's a fairly new system call (introduced in kernel 3.17), `apt` and almost all programs automatically fall back to reading from `/dev/urandom` when this syscall fails.

### Help! My device won't show up.

If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly (if you need help fixing your credentials, see [WiFi Help](../pages/reference/OS/network.md#wifi-setup)) and ensure that your network meets these [basic requirements](../pages/reference/OS/network.md#network-requirements). If the device has a LED indicator, it may also be worth checking it for any known error codes or signals.

If you have an HDMI screen attached, you should see balena logo on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted.

### My Device Doesn't Boot

To determine the cause of this issue, check your ACT LED for known \[error notifications]\[error]. If no known errors are shown on the ACT LED, attach a screen to your Pi's HDMI port.

One other thing to confirm is that you are not trying to boot a Raspberry Pi 2 with an OS download designed for the Raspberry Pi B+. This will not work. The Raspberry Pi 2 requires an OS download specific to its architecture.

### Connectivity

If a Balena ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

* You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
* The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be _physically_ worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

### Error Notifications

#### Unable to Connect to the Internet

If the Raspberry Pi is unable to connect to the balena servers, the `ACT` LED will flash a repeated pattern of 4 short flashes followed by a pause (`*_*_*_*____*_*_*_*____`).

This is either because it is not connected to the network or because the network ports which balena relies on are blocked in some way.

* The first things to check in this case is that your device is correctly connected to ethernet or that you correctly entered the wifi credentials. To check wifi credentials, power your device down, remove the SD card, and mount the SD card on your personal computer. If your device is running balenaOS version 2.0 or greater, wifi credentials are listed in `system-connections/resin-wifi`, found in the `resin-boot` partition of the SD card. Otherwise, check the `config.json` file (in the `resin-boot` partition for versions 1.2 and greater, or `resin-conf` for earlier versions).
* Secondly check that your network is not restricting or blocking the ports specified in the [balena network requirements](../pages/reference/OS/network.md#network-requirements).
* If you still aren't able to get your device online, reach out to us in the [forums](https://forums.balena.io).

#### Can't Boot the Kernel.img

If the `ACT` LED blinks with the repeated pattern of 7 quick flashes and a pause (`*_*_*_*_*_*_*____*_*_*_*_*_*_*____`), this means that the Raspberry Pi boot loader is not able to load the correct kernel.img.

* The first thing to check here is that you are using the right OS image for your board type. If you look at the small white print near the GPIO pins of the Raspberry Pi you should see the type of Raspberry Pi you have. You need to ensure that this is the same as the device type that you selected when creating the fleet on the balena dashboard. You can check the type of device for an existing fleet by looking at the 'How to add devices' help text inside the fleet or the icon for that fleet on your dashboard.
* It's important to note that a Raspberry Pi 2 fleet's balenaOS image will not boot on a Raspberry Pi 1 board and vice versa.
* For more in-depth info the boot related LED patterns have a look at the [Raspberry Pi wiki](https://elinux.org/R-Pi_Troubleshooting#Green_LED_blinks_in_a_specific_pattern).

#### Poor Power Supply

If you have a screen attached to your Raspberry Pi and notice that there is a small flashing colorful square in the top right of the screen, it could be the case that your power supply or USB cable is not suitable. Take a look at the [Troubleshooting Power Problems](http://elinux.org/R-Pi_Troubleshooting#Troubleshooting_power_problems) page on the Raspberry Pi wiki. Additionally, if the onboard `PWR` LED is flashing intermittently, this too could indicate issues with the power supply.

### balenaOS boot issues with new hardware revision of RPi4

[Raspberry Pi](https://www.raspberrypi.com/) recently released [hardware Rev 1.5](https://forums.raspberrypi.com/viewtopic.php?t=329299) of the Raspberry Pi 4 Model B. This revision of the board requires a relatively recent version of [balenaOS](https://balena.io/os). We recommend using balenaOS v2.88.5+rev1 or later that contains the updated firmware version. BalenaOS v2.75.0+rev1 and earlier versions aren't tested and possibly won't boot on this revision of the board.

To determine if you have hardware Rev 1.5 of the Raspberry Pi 4 Model B, follow the steps below:

1. Run the following command in balenaOS v2.88.5+rev1 or later. The output should confirm the hardware revision.

```
$ cat /proc/cpuinfo | grep Model
Raspberry Pi 4 Model B Rev 1.5
```

2. Look for the Dialog DA9090 power management controller next to the USB-C port. Check the picture below for reference.



For more information about Raspberry Pi 4 Model B Rev 1.5, please refer to "PCN Raspberry Pi 4B Rev 9" in the [Product Information Portal](https://pip.raspberrypi.com) by Raspberry Pi.

If you still can't get your device online, come on over and talk to us on our [support channel](../pages/learn/accounts/support-access.md).

### This is the wrong balena device.

If you see this error, there are several potential causes, including:

* The config.json file is missing or corrupted
* The UUID in the config.json file does not match the device's UUID
  * This could be caused by config.json corruption or storage corruption
* You are attempting to SSH into a device using the wrong IP address

Please contact [balena support](../pages/learn/accounts/support-access.md) if you encounter this issue so that we can investigate the root cause.
