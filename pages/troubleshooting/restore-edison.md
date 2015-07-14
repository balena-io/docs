# Help, I bricked my Edison!

If your Edison is unresponsive or for some bizarre reason, you want to restore your Edison to its unresinfied state, we've prepared a guide for you:

## Tools

Firstly visit the [Intel Edison Downloads page][edison-dl-page] and download the latest version of the 'Intel Edison® Board Firmware Software Release'. At the time of writing it is the [Release 2.1 Yocto* complete image][dl-link].

While you are on this page, download and install Intel's Flash Tool Lite. The setup guide for this tool can be found [here][flash-tool-setup].

## Re-Flashing the Edison

Once you have the Flash tool setup and your new Edison image is downloaded, unzip and start the Flash Tool Lite with the Edison *disconnected* from your computer.

Select the blue browse button in the top right of the flash tool and find the folder that contains the extracted Edison OS files, select `FlashEdison.json` as the 'Flash file' and click __Start to Flash__ to kick off the process:

![Select FlashEdison.json](/img/edison/flashtool-file-selected.png)

A small warning wipp pop up indicating that no device is connected - fix this by connecting your Edison via micro usb cable:

![Start Flashing](/img/edison/flashtool-device-unconnected.png)

After a short delay your device will be detected and a progress bar will track the process of flashing your device, so sit back and relax:

![Flashing progress](/img/edison/flashtool-flashing.png)

After a few minutes the flashing process will be complete and the flash tool will look something like this:

![Flashing complete](/img/edison/flashtool-complete.png)

At this point your Edison will reboot. Once it's rebooted you might get a warning like this:

<img src="/img/edison/edison-restart-warning.png" alt="eject warning" style="width: 70%" />

If so, simply click __Ignore__ - it means that the file system applied to your Edison is not one your OS is familiar with.

## You're Done!

You should now have a Edison running the factory default Yocto build from Intel.

If you've had to follow this guide due to an issue with resin.io, please let us know so we can improve the experience!

**Drop us a note at [resin.io/contact](https://resin.io/contact/)**

[edison-dl-page]:https://software.intel.com/en-us/iot/hardware/edison/downloads
[dl-link]:http://downloadmirror.intel.com/25028/eng/edison-image-ww25.5-15.zip
[flash-tool-setup]:https://software.intel.com/en-us/articles/flash-tool-lite-user-manual
