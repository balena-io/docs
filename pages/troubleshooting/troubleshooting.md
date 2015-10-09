# Troubleshooting

## Raspberry Pi

### My Device Doesn't Boot

To determine the cause of this issue, check your ACT led for known [error notifications][error]. If no known errors are shown on the ACT led, attach a screen to your Pi's HDMI port.

One other thing to confirm is that you are not trying to boot a Raspberry Pi 2 with a OS download designed for the Raspberry Pi B+. This will not work. The Raspberry Pi 2 requires a OS download specific to its architecture.

#### Connectivity

If a Resin.io ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

#### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

* You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
* The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be *physically* worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

## Beaglebone Black

### I can't get my beaglebone to reprovision.
In order to reprovison a beaglebone that has already been connected to the resin.io service, you need to remove a file named something like `REMOVE_TO_REPROVISION_54BE-BCEB` from the SD card. You should then be able to pop the SD card back into the beaglebone and power it up again, while holding down the small `s1` button like you did when you did the original provisioning.

## Intel Edison

### Help, I want to restore my Edison to factory Yocto

If you are one of the unfortunate people who feel they want to return to the old Yocto build of the Edison you can have a look over here on our guide to [restore original Edison firmware](/pages/troubleshooting/restore-edison.md).

### I get "dfu-util: Device has DFU interface, but has no DFU functional descriptor" in Windows

Make sure you have [Intel Edison drivers](https://software.intel.com/en-us/iot/hardware/edison/downloads) installed in your computer.

## General

### The 'Start the Terminal Session' Button Doesn't Appear

Ensure you application is online and code is deployed. If either of these criteria are not fulfilled then the button will not appear.

### Clicking 'Open Terminal' in the Session Does Nothing

If no window appears, wait a while or refresh, as sometimes the connection can take a while to be established.

If a terminal window flashes up then disappears, this is usually due to your application exiting before the terminal session is established. Ensure your application continues running long enough after being started to enable a terminal session to be connected.

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.
