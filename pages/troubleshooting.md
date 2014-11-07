# Troubleshooting

## Raspberry Pi

### My Device Doesn't Boot

To determine the cause of this issue, check your ACT led for known [error notifications][error]. If no known errors are shown on the ACT led, attach a screen to your Pi's HDMI port.

#### Connectivity

If a Resin.io ASCII logo appears with a prompt to check your dashboard, then you are likely experiencing connectivity issues. Check ethernet cables are connected properly and that provided WiFi credentials are correct and try again, also let us known that the LED notification didn't show for you.

#### SD Card Corruption

If you are presented with a 'recovery login' prompt this usually indicates an issue with the SD card itself or corruption of data on the SD card, and is likely caused by one of the following:-

* You've copied data onto the card but disconnected it from your computer without properly ejecting it - some data may have not finished being copied yet and thus the card is corrupted - reformat your SD card and copy files over to it and try again.
* The SD card itself is faulty - older SD cards, especially ones which have been used a lot and thus may also be *physically* worn at the pins can be unreliable, resulting in data corruption. Try using a new SD card.

[error]:/pages/error.md
