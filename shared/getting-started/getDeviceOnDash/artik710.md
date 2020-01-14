In order to get {{ $names.os.lower }} up and running on your **{{ $device.name }}**, you need to first set it up to boot from your {{ $device.bootMedia }} rather than its
internal [eMMC memory][emmc-link]. To do this, you need to set the `SW402` dip switch to position `1:off`, `2:off`, `3:off`, `4:on`, and insert your {{ $device.bootMedia }}
into the board, **hint:** The SD card slot can be found on the underside of the board near the Audio Jack.

__Note:__ {{ $names.os.upper }} will completely write over the existing eMMC.

<!-- <img src="/img/artik5/artik5-dev-kit.png" width="80%"> -->
If you selected WiFi as your connectivity type, remember to attach the WiFi antennas before booting the board.

We can now insert the 5VDC power cable and flip the power switch labeled `SW700`, to the `on` position.
We should now have some glowing LEDs on the underside of the board indicating a sign of life. Next we need to press and hold the `SW400 POWER` push button for 1 or 2 seconds,
this starts the boot from the {{ $device.bootMedia }}. You should see the red `POWER ON` LED light up when it starts booting.

After a few seconds you should see your **{{ $device.name }}** appear on the {{ $names.company.lower }} dashboard in a configuring state.
If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right WiFi credentials at download time.
If you still can't get it online, [contact us on support](/support/).

Your **{{ $device.name }}** will now flash {{ $names.os.lower }} onto the internal eMMC so that you can remove the {{ $device.bootMedia }}. This will take 2 or 3 minutes. Once it has finished it will shut itself down and you will see the device on the dashboard in a `Post-Provisioning` state.
At this point you need to:

1. Flip `SW700` back to `off` position.
2. Remove the {{ $device.bootMedia }}.
3. Set `SW402` dip switch to position `1:off`, `2:off`, `3:off`, `4:off`.

After all of that, we flip the `SW700` back `on` and once again hold down the `SW400 POWER` button for a second or so. If all goes according to plan we should
now have a freshly provisioned **{{ $device.name }}** sitting in an `IDLE` state on our dashboard, ready and waiting to receive some code.

Now it's time to deploy some code!

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
