## Setting Up Your Device

In order to get the resinOS up and running on our {{ $device.name }} we need to first set it up to boot from our {{ $device.bootMedia }} rather than its internal [eMMC memory][emmc-link]. To do this we need to set the `SW4` dip switch to position `1:off`, `2:off`, `3:off`, `4:on`.

__Note:__ This resinOS will completely write over the existing eMMC.

<!-- <img src="/img/artik5/artik5-dev-kit.png" width="80%"> -->
If you selected wifi as your connectivity type, remember to attach the wifi antenna.

We can now insert the 5VDC power cable and flip the power, switch labelled `SW5`, to the `on` position. We should now have some glowing LEDs indicating a sign of life. Next we need to press and hold the `SW2` push button for 1 or 2 seconds, this starts the boot from the {{ $device.bootMedia }}.

After a few seconds you should see your {{ $device.name }} appear on the resin.io dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right wifi credentials at download time. If you still can't get it online, contact us on support.

Your {{ $device.name }} will now flash resinOS onto the internal eMMC so that you can remove the {{ $device.bootMedia }}. This will take 2 or 3 minutes, so time for more tea!! Once it has finished it will shut itself down and you will see the device on the dashboard in a `Post-Provisioning` state. At this point you need to:
1. Flip `SW5` back to `off` position.
2. Remove the {{ $device.bootMedia }}.
3. Set `SW4` dip switch to position `1:off`, `2:off`, `3:off`, `4:off`.

After all of that we flip the `SW5` back `on` and once again hold down the `SW4` button for a second or so. If all goes according to plan we should now have a freshly provisioned {{ $device.name }} sitting in an `IDLE` state on our dashboard, ready and waiting to receive some code. **So lets deploy some code!!!**

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
