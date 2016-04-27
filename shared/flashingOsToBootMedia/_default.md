Now we have to flash the downloaded `.img` file onto our {{ $device_details.bootMedia }}. We recommend using [Etcher][etcher-link], a simple, cross platform {{ $device_details.bootMedia }} writer and validator. Head over to [www.etcher.io][etcher-link] and get install it, it only takes a few seconds :)

You can of course use any other {{ $device_details.bootMedia }} writing software you like, some options are:
* [win32diskimager][win32-disk-imager] for Windows.
* [piFiller][pifiller-download] for osx.
* [dd or "Disk Destroyer"][dd-link] for Linux.

__Note:__ Before you flash resinOS to your {{ $device_details.bootMedia }} you may need to formatted it as [FAT32][fat32]. [WikiHow][wikihow] has great [instructions][wikihow_format] on how to do this.

For simplicity this tutorial will assume you are using [Etcher][etcher-link]. Once you have Etcher installed, start it up. You may be asked to allow Etcher administrative privileges. This is just so Etcher can access your {{ $device_details.bootMedia }}.

To create a bootable resinOS {{ $device_details.bootMedia }} follow these 3 easy steps:

1. Click "Select image" button and find your applications resinOS `.img` file.
2. If you haven't already done so, insert your {{ $device_details.bootMedia }} into your computer. Etcher will automatically detect it. If you have more than one {{ $device_details.bootMedia }} inserted, you will need to select the appropriate one.
3. Click the "Flash!" button.

<img src="/img/common/etcher/etcher.gif" width="60%">

Etcher will now prepare a bootable {{ $device_details.bootMedia }} and validate that it was flashed correctly. Right! time for a spot of tea as flashing the {{ $device_details.bootMedia }} can take roughly 3 or more minutes depending on the quality of your {{ $device_details.bootMedia }}.

Etcher will give you a little ping! when it's done, and safely eject the {{ $device_details.bootMedia }} for you.

__Note:__ You can burn several {{ $device_details.bootMedia }}s with the same `.img` file and all the devices will boot and provision into your application's fleet. You can also disable the auto-ejecting or write validation steps from the Etcher settings panel.

[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/
[etcher-link]:http://www.etcher.io/
[dd-link]:http://man7.org/linux/man-pages/man1/dd.1.html
