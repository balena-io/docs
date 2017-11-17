Insert the SD card into your **{{ $device.name }}** and, if necessary, connect the ethernet cable or the USB WiFi adapter. Now power up your Pi by inserting the micro USB cable.

![insert SD](/img/gifs/insert-sd.gif)

It will take a minute or two for the **{{ $device.name }}** to appear on your resin.io [dashboard][resinDash]. While you wait, the resinOS is expanding the partitions on your SD card to use all available space, installing a custom Linux environment, and establishing a secure connection with the resin.io servers.

You should now be ready to deploy some code!

__Note:__ Class 4 SD cards can take up to 3 times longer so it's well worth investing in the fastest card you can find.

##### Help! My device won't show up.
If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. First check that you entered the WiFi credentials correctly and ensure that your network meets these [basic requirements][networkRequirements]. It may also be worth checking the [LED error notifications][errorNotifications].

If you still can't get your device online, come on over and chat to us on our [support channel][usingSupport].

__Note:__ If you have an HDMI screen attached, you should see `"Booted - Check your resin.io dashboard."` on the screen when the device boots. If instead you see rainbow colours or a black screen with a raspberry on it, it could mean that the SD card was not burned correctly or is corrupted.

[resinDash]:https://dashboard.resin.io/
[networkRequirements]:/deployment/network/#network-requirements
[usingSupport]:/support/
[errorNotifications]:/troubleshooting/error
