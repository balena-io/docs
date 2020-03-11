{{import "getting-started/flashingOsToBootMedia"}}

Put the USB drive into your device and connect either the ethernet cable or WiFi adapter. Ensure that the HDMI screen and keyboard are connected up.

__Warning:__ {{ $names.os.upper }} will completely overwrite the internal media of your NUC, so if you have important data on the device, we recommend that you make a backup before you attempt provisioning the NUC on {{ $names.company.lower }}.

Now connect up the power supply and turn the device on by pushing the small round button on the top of the device.

Press the F10 key while the **BIOS** is loading in order to enter the boot menu. Next, select the `UEFI : USB` option from the boot menu so that the device will boot from your USB drive.

Once the device boots, you should see it pop up on your {{ $names.company.lower }} dashboard. It will immediately go into a `flashing internal media` state. This means that the device is flashing the {{ $names.os.lower }} onto your internal flash media.

After a few minutes, the OS will be fully flashed to the internal media and the device will shut itself down. At this point, you will see on the dashboard that the device is in a `Post-provisioning` state. You can now remove the USB drive and press the power button once again.

Your NUC should now automatically boot into the {{ $names.company.lower }} OS and you should see the device online and in an `Idle` state on your dashboard, ready and waiting for some code to be deployed.

__Note:__ If for some reason your device does not boot into {{ $names.os.lower }}, you may need to go back into the **BIOS** and make sure the boot order correctly selects to boot from the internal SATA drive and not from USB.