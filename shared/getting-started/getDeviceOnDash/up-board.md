{{import "getting-started/flashingOsToBootMedia"}}

In order to get {{ $names.os.lower }} up and running on your **{{ $device.name }}**, you need to first set it up to boot from your {{ $device.bootMedia }} rather than its
internal [eMMC memory][emmc-link]. To do this, you will need to interrupt the boot process and direct the device to boot from your {{ $device.bootMedia }}.

__Note:__ {{ $names.os.upper }} will completely write over the existing eMMC.

First, make sure the device is setup correctly:
- Ensure you have a HDMI screen attached and powered up.
- Make sure the {{ $device.bootMedia }} is plugged into one of the 4 available USB ports.
- Attach a USB keyboard to one of the other available USB ports.
- Attach a USB WiFi dongle or an ethernet cable to give the device access to the internet.

Now that you have your board setup, apply power to it using the supplied 5 Vdc barrel jack. Tap the `F7` key while the BIOS is loading in order to enter the device's boot menu. If all goes according to plan, you should see the boot menu as pictured below:

<img src="/img/up-board/up-board-uefi-selection.jpg" width="60%">

Using the keyboard arrow keys, select the `UEFI : USB` option and hit enter. Your **{{ $device.name }}** will now boot from the {{ $device.bootMedia }} and flash {{ $names.os.lower }} onto the internal [eMMC memory][emmc-link]. If your device is correctly connected to the internet, you should see progress of the flashing on your {{ $names.company.lower }} dashboard. Once {{ $names.os.lower }} is safely flashed onto the internal [eMMC memory][emmc-link], the device will shut itself down and you should see all the user LEDs on the board switch off.

__Note:__ The blue power LED will stay illuminated even once the device has shutdown. You can find the user LEDs on the underside of the board near the USB ports.

You can now remove the {{ $device.bootMedia }} and power up the board again. Your **{{ $device.name }}** should now be sitting happily waiting on the {{ $names.company.lower }} dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right WiFi credentials at download time. If you still can't get it online, [contact us on support](/support/).

Now it's time to deploy some code!

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
