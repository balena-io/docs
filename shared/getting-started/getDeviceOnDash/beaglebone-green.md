{{import "getting-started/flashingOsToBootMedia"}}

Put the SD card into your device, and connect either the ethernet cable or WiFi adapter. Now hold down the small black button marked `s2` (located near the SD card slot) and power up the device by inserting the power or USB cable.

You should only need to hold the button down for about 5 seconds until the blue LEDs start flashing like crazy. Basically, by holding down the button, we are telling the Beaglebone that we want to boot from the SD card instead of the onboard flash. From there, the OS which is on the SD card is flashed onto the internal eMMC memory.

__Warning:__ This will completely overwrite any data on your devices' internal eMMC, so make sure to make a backup of any important data.

<img src="/img/beaglebone-black/sd_card_BBB.jpg" width="40%">

After a short while you should see your device pop up in the dashboard. It will appear in a configuring state as it flashes {{ $names.os.lower }} to the internal media. This step can take a little time.

After the internal media has been flashed, your device will shut itself down. At this point you will see the device in a `Post-Provisioning` state and all its LEDs should be off. Before booting the device again, *make sure to remove the SD card*. You may then simply press the power button situated nearest to the ethernet port or pull out and replug the power cable.

<img src="/img/beaglebone-black/beaglebone_device_dash_post_provisioning.png" width="80%">

Your device should now start booting from internal eMMC and in a minute or so you should have a happy Beaglebone device in the `Idle` state on your dashboard. From here on you can deploy code to your device with ease.

__Note:__ If you have an HDMI screen attached (Beaglebone Black only), you should see `"Booted - Check your {{ $names.company.lower }} dashboard."` on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted. Try [burning the SD card](#create-a-bootable-sd-card) again. If the issue persists, come and get [help from our support team](/support/).
