In order to deploy code on the Edison, you'll first need to flash new firmware ({{ $names.OS.lower }}) onto the device's internal eMMC.

__Note__: This will erase the current yocto OS system on your Edison and any data or configurations you have on it. If you have to revert to the old way of doing things, you can restore your Edison to its factory default firmware by following the instructions in our [restore original Edison firmware guide](/troubleshooting/restore-edison).

#### Install Intel Flash Tool Lite

First you will need the [firmware flashing tool][flash-tool-link] provided by Intel. So head over to this link and get it set up on your computer.

__Warning:__ There is a known issue with the flash tool and OSX 10.11 - El Captitan. In this case, we recommend [using the flashall scripts and dfu-util](/edison/nodejs/getting-started/#alternative-method-of-flashing-edison-firmware-for-mac-osx-10-11-el-capitan).

#### Flash the {{ $names.company.lower }} Firmware onto the Edison

__Note:__ Before you start this step, ensure that your Edison is not plugged into your Computer.

On your computer open the newly installed [Flash Tool Lite][flash-tool-link]. Select the blue browse button in the top right hand corner and browse to the folder where you had previously extracted {{ $names.os.lower }}. This folder should be called something like `{{ $names.company.short }}-myFleet-0.1.0-0.0.14`. In this folder you should be able to find and select a file called `FlashEdison.json`.

![browse to OS folder](/img/edison/browse-select-flash-tool.png)

The flash tool will auto-detect the configurations for flashing, so you do not need to adjust any of the drop down menus. Your flash tool panel should look something like this:

![flash tool configurations](/img/intel-edison/flash-tool-cdc-config.png)

Once you are satisfied you have selected the correct `FlashEdison.json` file from the correct folder, you can click the `Start to Flash` button in the bottom left of the flash tool. The flash tool will now try and detect if the Edison is plugged in.

At this point, plug your Edison into your computer using the micro usb cable.

__Note:__ It is important that your Edison is connected via the **OTG-USB** port on the base board. If you are unsure of which micro usb port this is, have a look at this image.

![Edison Boards with OTG](/img/intel-edison/edison-otg-ports.png)

Once your Edison is connected to the computer, the flash tool should auto-detect it. A device will appear in the central pane of the flash tool and you should see the progress of your Edison Firmware flashing.

![Edison flash progress](/img/intel-edison/flash-edison-progress.png)

__Note:__ If you get stuck at this point or your device never shows up on the {{ $names.company.lower }} dashboard, please let us know over on our [forums][forums-link].

Once your Edison has reached 100% on the progress bar, the flashing process has completed, but the device still needs to reboot. **Let your Edison sit for about 2 minutes**.

After a successful firmware flash, you may get a warning pop-up. You can safely click `ignore`.

![Edison reboot warning](/img/intel-edison/edison-restart-warning.png)

## Alternative method of flashing Edison firmware for Mac OSX 10.11 - El Capitan

To use this method, you will need to have MacPorts installed on your system. Once MacPorts is installed, run the following in your terminal:
```shell
sudo port install dfu-util usbutils coreutils && sudo port activate dfu-util
```

Make sure the Intel Edison is unplugged from your system, then unzip the downloaded {{ $names.os.lower }} image. Navigate to the unzipped directory and run the following:

```shell
sudo chmod +x ./flashall.sh
sudo ./flashall.sh
```
Plug in the Intel Edison, as per the instructions on your terminal. You can check the progress of the flash on your terminal. Once the flashing is complete, your Edison will need to reboot.

[flash-tool-link]:https://01.org/android-ia/downloads/intel-platform-flash-tool-lite
[forums-link]:{{ $names.forums_domain }}
