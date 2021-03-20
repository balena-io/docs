{{import "getting-started/flashingOsToBootMedia"}}

Insert the SD card into your **{{ $device.name }}** and connect the ethernet cable. Now power up the **{{ $device.name }}** by connecting your power supply to the barrel jack, or by using a micro USB cable. **Note:** if using the barrel jack for power you're required to fit a jumper to the board at **J48**.

![insert SD](/img/gifs/jetson-insert-sd.gif)

It will take a minute or two for the **{{ $device.name }}** to appear on your {{ $names.company.lower }} [dashboard][dashboard]. While you wait, the {{ $names.os.lower }} is expanding the partitions on your SD card to use all available space, installing a custom Linux environment, and establishing a secure connection with the {{ $names.company.lower }} servers.

You should now be ready to deploy some code!

{{>"getting-started/sd-card-recommendations"}}

##### Help! My device won't show up.
If your device still hasn't shown up on your dashboard after a few minutes, something is definitely wrong. First, ensure that your network meets these [basic requirements][networkRequirements]. Also check to make sure the Ethernet cable you're using is connected properly. If you're using a WiFi dongle, please ensure it's plugged in properly (if you need help fixing your credentials, see [WiFi Help][wifiHelp]).

If you still can't get your device online, come on over and talk to us on our [support channel][usingSupport].

[dashboard]:{{ $links.dashboardUrl }}/
[networkRequirements]:/reference/OS/network/2.x/#network-requirements
[usingSupport]:/support/
[errorNotifications]:/troubleshooting/error
[wifiHelp]:/reference/OS/network/2.x/#wifi-setup
