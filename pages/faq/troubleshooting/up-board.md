# Troubleshooting information for UP Board

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

### Can't Login to the Dashboard

In some cases social logins can be disrupted or completely borked by Adblocker or browser extensions such as [BrowserShark](https://chrome.google.com/webstore/detail/browsershark/jhbjnipjccjloncefdoknhicbnbjaefh?hl=en). Make sure to disable these extensions or whitelist the `*.balena-cloud.com` domains.

### I get `$'\r': command not found` when my device tries to run scripts

Line endings differ between Windows and the Unix-y world (they used to be different again for Mac but not for many years), which can result in issues. E.g. a user seeing something like:
/usr/src/app/run.sh: line 2: $'\r': command not found

To resolve this, you will need to configure git to automatically convert line endings. In order to configure this for Windows have a look [at this Github article](https://help.github.com/articles/dealing-with-line-endings/#platform-windows).

### Device keeps dropping off wifi

If your device keeps dropping offline, it may be worth switching to a 5GHz band wifi dongle, as we have seen cases where 2.4GHz gets badly affected by surrounding noise.

### Unsupported Syscall: 384 from qemu on builder

The qemu: Unsupported syscall: 384 is a warning that the getrandom(2) system call is not implemented by our emulation layer, qemu. It can be safely ignored. Since it's a fairly new system call (introduced in kernel 3.17), `apt` and almost all programs automatically fall back to reading from `/dev/urandom` when this syscall fails.

### Help! My device won't show up.

If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly (if you need help fixing your credentials, see [WiFi Help](../../reference/os/network.md#wifi-setup)) and ensure that your network meets these [basic requirements](../../reference/os/network.md#network-requirements). If the device has a LED indicator, it may also be worth checking it for any known error codes or signals.

If you have an HDMI screen attached, you should see balena logo on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted.

## Detailed provisioning instructions

In order to get balenaOS up and running on your **UP Board**, you need to first set it up to boot from your  rather than its
internal [eMMC memory](https://www.jedec.org/standards-documents/technology-focus-areas/flash-memory-ssds-ufs-emmc/e-mmc). To do this, you will need to interrupt the boot process and direct the device to boot from your .

**Note:** BalenaOS will completely write over the existing eMMC.

First, make sure the device is setup correctly:

- Ensure you have a HDMI screen attached and powered up.
- Make sure the  is plugged into one of the 4 available USB ports.
- Attach a USB keyboard to one of the other available USB ports.
- Attach a USB WiFi dongle or an ethernet cable to give the device access to the internet.

Now that you have your board setup, apply power to it using the supplied 5 Vdc barrel jack. Tap the `F7` key while the BIOS is loading in order to enter the device's boot menu. If all goes according to plan, you should see the boot menu as pictured below:

<img src="/img/up-board/up-board-uefi-selection.webp" width="60%">

Using the keyboard arrow keys, select the `UEFI : USB` option and hit enter. Your **UP Board** will now boot from the  and flash balenaOS onto the internal [eMMC memory](https://www.jedec.org/standards-documents/technology-focus-areas/flash-memory-ssds-ufs-emmc/e-mmc). If your device is correctly connected to the internet, you should see progress of the flashing on your balena dashboard. Once balenaOS is safely flashed onto the internal eMMC memory, the device will shut itself down and you should see all the user LEDs on the board switch off.

**Note:** The blue power LED will stay illuminated even once the device has shutdown. You can find the user LEDs on the underside of the board near the USB ports.

You can now remove the  and power up the board again. Your **UP Board** should now be sitting happily waiting on the balena dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right WiFi credentials at download time. If you still can't get it online, [contact us on support](../pages/learn/accounts/support-access.md).

Now it's time to deploy some code!


If you still can't get your device online, come on over and talk to us on our [support channel](../../learn/accounts/support-access.md).

### This is the wrong balena device.

If you see this error, there are several potential causes, including:

- The config.json file is missing or corrupted
- The UUID in the config.json file does not match the device's UUID
    - This could be caused by config.json corruption or storage corruption
- You are attempting to SSH into a device using the wrong IP address

Please contact [balena support](../../learn/accounts/support-access.md) if you encounter this issue so that we can investigate the root cause.
