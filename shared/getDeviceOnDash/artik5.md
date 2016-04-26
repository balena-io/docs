## Setting Up Your Device

In order to get the resinOS up and running on our {{ $device_details.name }} we need to first set it up to boot from our {{ $device_details.bootMedia }} rather than its internal [eMMC memory][emmc-link]. To do this we need to set the tiny `SW2` dip switch to position `1:off` and `2:off`, as shown below.

<img src="/img/artik5/untitled.png" width="80%">

We can now insert the 5VDC power cable and flip the power, switch labelled `PWR SW`, to the `on` position. We should now have some glowing LEDs indicating a sign of life. Next we need to press and hold the `SW3 POWER` push button for 1 or 2 seconds, this starts the boot from the {{ $device_details.bootMedia }}.

After a few seconds you should see your {{ $device_details.name }} appear on the resin.io dashboard. If it still hasn't appeared after 1 or 2 minutes, double check your ethernet connection or that you entered the right wifi credentials at download time. If you still can't get it online, contact us on support.

Your {{ $device_details.name }} will now flash resinOS onto the internal eMMC so that you can remove the {{ $device_details.bootMedia }}. This will take 2 or 3 minutes, so time for more tea!! Once it has finished it will shut itself down and you will see the device on the dashboard in a `Post-Provisioning` state. At this point you need to:
1. Flip `PWR SW` back to `off` position.
2. Remove the {{ $device_details.bootMedia }}.
3. set the  `SW2` dip switches to `1:on` and `2:on`.

After all of that we flip the `PWR SW` back `on` and once again hold down the `SW3 POWER` button for a second or so. If all goes according to plan we should now have a freshly provisioned {{ $device_details.name }} sitting in an `IDLE` state on our dashboard, ready and waiting to receive some code. **So lets deploy some code!!!**

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
