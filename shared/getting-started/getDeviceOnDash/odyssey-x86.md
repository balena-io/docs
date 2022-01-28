{{import "getting-started/flashingOsToBootMedia"}}

Put the USB drive into your device and connect either the ethernet cable or WiFi adapter. Ensure that the HDMI screen and keyboard are connected up.

__Warning:__ {{ $names.os.upper }} will completely overwrite the internal media of your board, so if you have important data on the device, we recommend that you make a backup before you attempt provisioning the board on {{ $names.company.lower }}.

Now connect up the power supply and turn the device on. The power button may be a small round button on the top of the device or a square button on the front.

Press the F10 key while the **BIOS** is loading in order to enter the boot menu. Next, select the `UEFI : USB` (or `resinOS`) option from the boot menu so that the device will boot from your USB drive.

Once the device boots, you should see it pop up on your {{ $names.company.lower }} dashboard. It will immediately go into a `flashing internal media` state. This means that the device is flashing the {{ $names.os.lower }} onto your internal flash media.

__Note:__ You might encounter an error message when the device boots with the text, "Image Authorization Fail". This message appears when Secure Boot is enabled. Follow the steps present in the [Intel support document](https://www.intel.com/content/www/us/en/support/articles/000038401/intel-nuc/intel-nuc-kits.html) to access the BIOS setup screen and disable secure boot. After saving, press the F10 key once again when the NUC reboots to enter the boot menu and select to boot from USB/resinOS.

After a few minutes, the OS will be fully flashed to the internal media and the device will shut itself down. At this point, you will see on the dashboard that the device is in a `Post-provisioning` state. You can now remove the USB drive and press the power button once again.

Your board should now automatically boot into the {{ $names.company.lower }} OS and you should see the device online and in an `Idle` state on your dashboard, ready and waiting for some code to be deployed.

__Note:__ If for some reason your device does not boot into {{ $names.os.lower }}, you may need to go back into the **BIOS** and make sure the boot order correctly selects to boot from the internal SATA drive and not from USB.
