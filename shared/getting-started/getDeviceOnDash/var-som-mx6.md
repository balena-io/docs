{{import "getting-started/flashingOsToBootMedia"}}

Currently {{ $names.os.lower }} on the {{ $device.name }} is only capable of booting from SD card, but in the future [eMMC booting will be supported]({{ $links.githubOS }}/resin-imx6ul-var-dart/issues/64). To provision the device, do the following:
1. Verify Switch SW5 is OFF (downwards).
2. Set Boot select switch (SW6) right to boot from microSD Card.
3. Push microSD card into the microSD card slot (J102) of the
VAR-SOLOCustomBoard.
4. Ensure the device has a connection to the internet.
5. Switch ON (upwards) the SW5 switch

While you wait, {{ $names.os.lower }} is partitioning your SD card, installing a custom Linux environment, and establishing a secure connection with our servers.

If you have a class 10 SD card and a fast internet connection your device should appear on the dashboard in a minute or so.