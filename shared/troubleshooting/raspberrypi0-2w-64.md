### My Device Doesn't Boot

To determine the cause of this issue, check your ACT LED for known [error notifications][error]. If no known errors are shown on the ACT LED, attach a screen to your Pi's HDMI port.

One other thing to confirm is that you are not trying to boot a Raspberry Pi 2 with an OS download designed for the Raspberry Pi B+. This will not work. The Raspberry Pi 2 requires an OS download specific to its architecture.

### Connectivity

If a Balena ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

- You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
- The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be _physically_ worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

### Error Notifications

#### Unable to Connect to the Internet

If the Raspberry Pi is unable to connect to the balena servers, the `ACT` LED will flash a repeated pattern of 4 short flashes followed by a pause (`*_*_*_*____*_*_*_*____`).

This is either because it is not connected to the network or because the network ports which balena relies on are blocked in some way.

- The first things to check in this case is that your device is correctly connected to ethernet or that you correctly entered the wifi credentials. To check wifi credentials, power your device down, remove the SD card, and mount the SD card on your personal computer. If your device is running {{ $names.os.lower }} version 2.0 or greater, wifi credentials are listed in `system-connections/resin-wifi`, found in the `resin-boot` partition of the SD card. Otherwise, check the `config.json` file (in the `resin-boot` partition for versions 1.2 and greater, or `resin-conf` for earlier versions).
- Secondly check that your network is not restricting or blocking the ports specified in the [balena network requirements](/reference/OS/network/2.x/#network-requirements).
- If you still aren't able to get your device online, reach out to us in the [forums]({{ $names.forums_domain }}).

#### Can't Boot the Kernel.img

If the `ACT` LED blinks with the repeated pattern of 7 quick flashes and a pause (`*_*_*_*_*_*_*____*_*_*_*_*_*_*____`), this means that the Raspberry Pi boot loader is not able to load the correct kernel.img.

- The first thing to check here is that you are using the right OS image for your board type. If you look at the small white print near the GPIO pins of the Raspberry Pi you should see the type of Raspberry Pi you have. You need to ensure that this is the same as the device type that you selected when creating the fleet on the balena dashboard. You can check the type of device for an existing fleet by looking at the 'How to add devices' help text inside the fleet or the icon for that fleet on your dashboard.
- It's important to note that a Raspberry Pi 2 fleet's balenaOS image will not boot on a Raspberry Pi 1 board and vice versa.
- For more in-depth info the boot related LED patterns have a look at the [Raspberry Pi wiki](https://elinux.org/R-Pi_Troubleshooting#Green_LED_blinks_in_a_specific_pattern).

#### Poor Power Supply

If you have a screen attached to your Raspberry Pi and notice that there is a small flashing colorful square in the top right of the screen, it could be the case that your power supply or USB cable is not suitable. Take a look at the [Troubleshooting Power Problems](http://elinux.org/R-Pi_Troubleshooting#Troubleshooting_power_problems) page on the Raspberry Pi wiki. Additionally, if the onboard `PWR` LED is flashing intermittently, this too could indicate issues with the power supply.
