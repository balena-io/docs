Before you flash resinOS to your SD card make sure it is formatted as [FAT32][fat32]
([WikiHow][wikihow] has [instructions][wikihow_format] on how to do this).

Now we have to flash the downloaded `.img` file onto the SD card. We recommend using [Etcher][etcher-link], a simple, cross platform SD card writer and validator. Head over to [www.etcher.io][etcher-link] and get install it.

You can also use any other SD card writing software, some options are:
* [win32diskimager][win32-disk-imager] for Windows.
* [piFiller][pifiller-download] for osx.
* [dd or Disk Destroyer][dd-link] for Linux.

For simplicity this tutorial will assume you are using [Etcher][etcher-link]. Once you have Etcher installed, start it up. You may be asked to allow Etcher administrative privileges. This is just so Etcher can access your SD card.

To create a bootable resinOS SD card follow these 3 easy steps:

1. Click "Select image" button and find your applications resinOS `.img` file.
2. If you haven't already done so, insert your SD card into your computer. Etcher will automatically detect it. If you have more than one SD card inserted, you will need to select the appropriate one.
3. Click the "Flash!" button.

<img src="/img/common/etcher/etcher.gif" width="60%">

Etcher will now prepare a bootable SD card and validate that it was flashed correctly. Right! time for a spot of tea as flashing the SD card can take ~3 or more minutes depending on the quality of your SD card.

Etcher will give you a little ping! when it's done, and safely eject the SD card for you.

__Note:__ You can burn several SD cards with the same `.img` file and all the devices will boot and provision into your application's fleet. You can also disable the auto-unmounting or write validation steps from the Etcher settings panel.

[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/
[etcher-link]:http://www.etcher.io/
[dd-link]:http://man7.org/linux/man-pages/man1/dd.1.html
