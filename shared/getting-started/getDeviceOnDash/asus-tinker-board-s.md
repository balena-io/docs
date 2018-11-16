Insert the SD card into your **{{ $device.name }}** and connect the ethernet cable if necessary. Before powering up the Asus Tinker Board S, make sure that the jumper between the 5V power supply and the HDMI connector is in the `MASKROM` mode, as illustrated in this link https://tinkerboarding.co.uk/wiki/index.php/Setup .Now power up the **{{ $device.name }}** by inserting the micro USB cable.

It will take a minute or so for the **{{ $device.name }}** to appear on your {{ $names.company.lower }} [dashboard][dashboard]. While you wait, the {{ $names.os.lower }} is  establishing a secure connection with the {{ $names.company.lower }} servers and flashing the OS onto the device's internal eMMC, it then expands the partitions to use all the available space.

Once the OS is fully flashed onto the devices eMMC, the device will perform a shutdown and all the LEDs on the device will turn off. Now make sure that the jumper between the 5V power supply and the HDMI connector is in the "parking (no function)" mode.

You can now power the board back up and you should see it's status indicate "online" and you should now be ready to deploy some code!

__Note:__ Class 4 SD cards can take up to 3 times longer so it's well worth investing in the fastest card you can find.

##### Help! My device won't show up.
If your device still hasn't shown up on your dashboard after a few minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly and ensure that your network meets these [basic requirements][networkRequirements]. It may also be worth checking the [LED error notifications][errorNotifications]

If you still can't get your device online, come on over and talk to us on our [support channel][usingSupport].

[dashboard]:{{ $links.dashboardUrl }}/
[networkRequirements]:/reference/OS/network/2.x/#network-requirements
[usingSupport]:/support/
[errorNotifications]:/troubleshooting/error
