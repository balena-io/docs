{{import "getting-started/flashingOsToBootMedia"}}

Put the SD card into your device, and connect either the ethernet cable or WiFi adapter. Make sure the little toggle switch near the HDMI port is set to the `uSD` option.

__Note:__ The C1 can boot from both uSD and eMMC, however currently booting from `eMMC` is not supported. By default the C1 will try first boot from eMMC and then try uSD if that failed. For this reason it is important you do **not** have any eMMC media installed on the board.

Now power up the device by connecting up the power supply.

It can take a few minutes for the device to boot up and appear on the dashboard, so grab some tea while you wait.

While you wait {{ $names.company.lower }} is partitioning your SD card, installing a custom linux environment and establishing a secure connection with our servers.

If you have a class 10 SD card and a fast internet connection your device should appear on the dashboard in around 7 minutes. Note that Class 4 SD cards can take up to 3 times longer so it's well worth investing in the fastest card you
can find.