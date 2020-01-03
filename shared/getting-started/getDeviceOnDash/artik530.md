In order to get {{ $names.os.lower }} up and running on your **{{ $device.name }}**, you need to first set it up to boot from your {{ $device.bootMedia }} rather than its internal [eMMC memory][emmc-link]. To do this we need to set the `SW402` dip switches to position `1:off, 2:off, 3:off, 4:on`.

__Note:__ {{ $names.os.lower }} will completely write over the existing eMMC.

You can now insert the 5VDC power cable and flip the power switch labeled `SW700` to the `on` position. You should now have some glowing LEDs indicating the board has power. Next, you need to press and hold the `SW400` push button for 1 or 2 seconds, which starts the boot from the {{ $device.bootMedia }}.

After a few seconds you should see your **{{ $device.name }}** appear on the {{ $names.company.lower }} dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the correct WiFi credentials at download time.

Your **{{ $device.name }}** will now flash {{ $names.os.lower }} onto the internal eMMC so that you can remove the {{ $device.bootMedia }}. This will take about 30 seconds. Once it has finished it will shut itself down and you will see the device on the dashboard in a `Post-Provisioning` state. At this point you need to:
1. Flip `SW700` back to the `off` position.
2. Remove the {{ $device.bootMedia }}.
3. Set the `SW402` dip switches to `1:off, 2:off, 3:off, 4:off`.

Next, flip the `SW700` switch back to `on` and once again hold down the `SW400` button for a second or so. If all goes according to plan, you should now have a freshly provisioned **{{ $device.name }}** sitting in an `IDLE` state on your dashboard, ready and waiting to receive some code.

Now let's deploy some code!

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
