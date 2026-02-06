# Troubleshooting information for Asus Tinker Board

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



If you still can't get your device online, come on over and talk to us on our [support channel](/support/).

### This is the wrong balena device.

If you see this error, there are several potential causes, including:

- The config.json file is missing or corrupted
- The UUID in the config.json file does not match the device's UUID
    - This could be caused by config.json corruption or storage corruption
- You are attempting to SSH into a device using the wrong IP address

Please contact [balena support](/support/) if you encounter this issue so that we can investigate the root cause.
