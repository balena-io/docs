In order to get {{ $names.os.lower }} up and running on your **{{ $device.name }}**, you need to first set it up to boot from your {{ $device.bootMedia }} rather than its internal [eMMC memory][emmc-link]. To do this, you need to set the tiny `SW2` dip switch to position `1:on` and `2:on`, as shown below.

__Note:__ {{ $names.os.upper }} will completely write over the existing eMMC.

<img src="/img/artik10/artik10-dev-kit.png" width="80%">

You can now insert the 5VDC power cable and flip the power, switch labeled `PSW1`, to the `on` position. You should now have some glowing LEDs indicating a sign of life. Next, you need to press and hold the `SW3 POWER` push button for 1 or 2 seconds, this starts the boot from the {{ $device.bootMedia }}.

After a few seconds you should see your **{{ $device.name }}** appear on the {{ $names.company.lower }} dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right WiFi credentials at download time.

__Note:__ In order for the WiFi to work correctly, you need to set jumpers `J20` and `J36` towards the edge of the board.

Your **{{ $device.name }}** will now flash {{ $names.os.lower }} onto the internal eMMC so that you can remove the {{ $device.bootMedia }}. This will take 2 or 3 minutes. Once it has finished it will shut itself down and you will see the device on the dashboard in a `Post-Provisioning` state. At this point you need to:
1. Flip `PSW1` back to `off` position.
2. Remove the {{ $device.bootMedia }}.
3. Set the  `SW2` dip switches to `1:off` and `2:off`.

Next, flip the `PSW1` back `on` and once again hold down the `SW3 POWER` button for a second or so. If all goes according to plan, you should now have a freshly provisioned **{{ $device.name }}** sitting in an `IDLE` state on your dashboard, ready and waiting to receive some code.

Now let's deploy some code!

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
