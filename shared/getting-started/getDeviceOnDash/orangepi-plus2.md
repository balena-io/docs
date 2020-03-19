{{import "getting-started/flashingOsToBootMedia"}}

Insert the SD card into your **{{ $device.name }}** and, if necessary, connect the ethernet cable or the USB WiFi adapter. Now power up your **{{ $device.name }}** by inserting the micro USB cable.

It will take a minute or two for the **{{ $device.name }}** to appear on your {{ $names.company.lower }} [dashboard][dashboard]. While you wait, the {{ $names.os.lower }} is expanding the partitions on your SD card to use all available space, installing a custom Linux environment, and establishing a secure connection with the {{ $names.company.lower }} servers.

You should now be ready to deploy some code!

__Note:__ Class 4 SD cards can take up to 3 times longer so it's well worth investing in the fastest card you can find.

[dashboard]:{{ $links.dashboardUrl }}/
