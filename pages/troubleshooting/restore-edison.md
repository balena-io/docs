## Help I bricked my Edison

So your Edison is unresponsive or for some bazaar reason you want to restore your Edison
to its unresinified state.

Its pretty easy to reflash the boring old Intel Yocto image onto the Edison. Just follow these steps.

1. Go to the [Intel Edison Downloads page][edison-dl-page] and download the latest version of Intel Edison® Board Firmware Software Release 2.1. At the time of writing it is [Release 2.1 Yocto* complete image][dl-link].
2. While you are on the downloads page, also download and install Intel's Flash Tool Lite. The setup guide for this tool can be found [here][flash-tool-setup].
3. Once you have the Flash tool setup and your new edison image is downloaded, unzip the file.
4. Now start the Flash Tool Lite with the Edison disconnected from your computer. Select the blue browse button in the top right of the flash tool. In the file navigator, find your downloaded folder that contains the Edison OS and in that folder select the file `FlashEdison.json`.

![Select FlashEdison.json](/img/edison/flashtool-file-selected.png)

5. Once you have selected that file you are ready to flash your Edison, so click the `Start to Flash` button in the bottom left.

![Start Flashing](/img/edison/flashtool-device-unconnected.png)

You will notice that a small warning pops up noting that no device is connected. At this point, connect your Edison to your computer with the micro usb.

6. Sit back and wait for the device to be detected and to start flashing. The tool will show its progress as it goes along.

![Flashing progress](/img/edison/flashtool-flashing.png)

7. After a few minutes you the flashing process should have completed successfully and you flash tool will look something like this:

![Flashing complete](/img/edison/flashtool-complete.png)

8. At this point your Edison will reboot and you may get a warning like this:

![eject warning](/img/edison/edison-restart-warning.png)

You can just click `ignore` and continue.

#### You should now have a Edison running the factory default yocto build from Intel.

If you were one of the unhappy individuals that got to this point with resin.io, please let us know why you decided to reflash your Edison and how we can improve.

**Drop us a note at [resin.io/contact](https://resin.io/contact/)**

[edison-dl-page]:https://software.intel.com/en-us/iot/hardware/edison/downloads
[dl-link]:http://downloadmirror.intel.com/25028/eng/edison-image-ww25.5-15.zip
[flash-tool-setup]:https://software.intel.com/en-us/articles/flash-tool-lite-user-manual
