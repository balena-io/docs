---
title: Intel Edison
---

# Getting Started with the Intel Edison

<!-- ![Intel Edison](/img/edison.jpg) -->

## What you will need

* an Intel Edison
* A base board for the edison that has an USB-OTG port, any of the following boards will do the trick:
    - [Intel® Edison and Mini Breakout Kit](https://www.sparkfun.com/products/13025)
    - [Intel® Edison and Arduino Breakout Kit](https://www.sparkfun.com/products/13097)
    - [SparkFun Block for Intel® Edison](https://www.sparkfun.com/products/13045)
![Edison Boards with OTG](/img/edison/edison-otg-ports.png)
* A micro-usb cable
* The [Intel Flash tool Lite][flash-tool-link] installed on your computer.
* Some awesome ideas to hack on! If you need inspiration, check out our
  [projects][projects] page.

__Note:__ If you're not experienced with [git][git], check out the excellent
[Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with an Edison then skip ahead to [Creating Your First Application](/gettingStarted-Edison#start-a-new-application).

## Signing Up

Enter your details on the [sign up page][signup]. There are a couple of
restrictions:-

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

## SSH Key

<img src="/img/common/sign_up_flow/enter_ssh_key_cropped.png" width="80%">

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure
your connection when sending your code to us. In order to secure your [git][git]
connection, we need your __public__ [SSH Key][ssh_key] (you must never share
your *private* key with anyone.)

Once generated, SSH keys are easy to use. In fact you generally don't have to
think about it at all, once you're set up just `git push` your code to us and
it's taken care of automatically.

In order to generate a key pair for your platform we recommend you take a look
at [Github][github]'s [excellent documentation][github_ssh] on the subject.

### Import From GitHub

For convenience we provide the ability to import your public SSH key from
[GitHub][github] - just click on the Octocat icon in the bottom right-hand
corner ([we use][github_ssh_blogpost] GitHub's [public APIs][github_apis] to
retrieve this data.)

You will then have to enter your github username:

<img src="/img/common/sign_up_flow/enter_github_username_cropped.png" width="60%">

## Start a new application

The two key components you will interact with in resin.io are *applications* and *devices* - applications represent the code you want to run on your devices, and devices the actual hardware itself.

You can have as many devices connected to an application as you like - when you
push code it deploys to every device that application owns.

Okay, lets get started...

First things first, we need to start a new resin.io application. Choose a fancy name for your new Intel Edison project. In this example, we were super creative and called it `myFleet`.

<img src="/img/common/main_dashboard/select_fleet_type.png" width="80%">

Next make sure you select `Intel Edison` from the device type drop down menu and click the big yellow create button. You should now be magically redirected to your new creatively named `myFleet` and will see a couple of tabs and a notice saying "No devices are connected to this application", that isn't very exciting, so lets change that by adding a new device...

<img src="/img/common/app/app_dashboard_empty.png" width="80%">

To connect a device to our newly created application, we need to first get the resinOS on the device. This involves downloading the new device image, burning it onto the device memory.

## Adding Your First Edison Device
### Download Resin OS Image

To get the resin operating system (resinOS) you need to click on the "Download Device OS" button. You should then be directed to add your wifi network name (aka `SSID`) and your networks password (aka `passphrase`) .

__Note__: It is not possible to provision an Edison without adding your wifi credentials as the device needs this to connect to the internet.

<img src="/img/common/network/network_selection_wifi_cropped.png" width="60%">

Once the download completes, you should have a `.zip` file in your downloads folder with a name that looks something like this: `resin-myFleet-0.1.0-0.0.14.zip`. Use an unzipping utility like [7-zip](http://www.7-zip.org/) to extract the download to a folder.

### Burn the Resin OS onto the Edison

In order to use resin to deploy code on the Edison it is necessary to flash new firmware (the resin OS) onto the device.

__Note__: This will erase your current yocto OS system on your Edison and any data or configurations you have on it, but trust us, it's for the best ;) If for some terrible reason you have to revert to the old way of doing things, you can restore your Edison to it's factory default firmware by following the instructions in our [restore original Edison firmware guide](/troubleshooting/restore-edison).

There are two ways of burning the firmware to the Edison.

 * [Use Intel Flash Tool Lite (Recommended)](/installing/gettingStarted-Edison#install-intel-flash-tool-lite)
 * [Using the flashall scripts and dfu-util](/installing/gettingStarted-Edison#alternative-method-of-flashing-edison-firmware)

#### Install Intel Flash Tool Lite

First you will need the [firmware flashing tool][flash-tool-link] provided by Intel. So head over to this link and get it set up on your computer.

__Warning:__ There is a known issue with the flash tool and OSX 10.11 - El Captitan, so we recommend [using the flashall scripts and dfu-util](/installing/gettingStarted-Edison#alternative-method-of-flashing-edison-firmware) to flash the OS in this case.

#### Flash the Resin Firmware onto the Edison

__Note:__ Before you start this step, ensure that your Edison is not plugged into your Computer.

On your computer open the newly installed [Flash Tool Lite][flash-tool-link]. Select the blue browse button in the top right hand corner and browse to the folder where you had previously extracted the resin OS. This folder should be called something like `resin-myFleet-0.1.0-0.0.14`. In this folder you should be able to find and select a file called `FlashEdison.json`.

![browse to resin OS folder](/img/edison/browse-select-flash-tool.png)

The flash tool will auto-detect the configurations for flashing, so you do not need to adjust any of the drop down menus. Your flash tool panel should look something like this:

![flash tool configurations](/img/edison/flash-tool-cdc-config.png)

Once you are satisfied you have selected the correct `FlashEdison.json` file from the correct folder, you can click the `Start to Flash` button in the bottom left of the flash tool. The flash tool will now try and detect if the Edison is plugged in.

At this point, plug your Edison into your computer using the micro usb cable.

__Note:__ It is important that your Edison is connected via the **OTG-USB** port on the base board. If you are unsure of which micro usb port this is, have a look at this image.

![Edison Boards with OTG](/img/edison/edison-otg-ports.png)

Once your Edison is connected to the computer, the flash tool should auto-detect it. A device will appear in the central pane of the flash tool and you should see the progress of your Edison Firmware flashing.

![Edison flash progress](/img/edison/flash-edison-progress.png)

__Note:__ If you get stuck at this point or your device never shows up on the resin dashboard, please let us know over [here][resin-support-help] or over at [talk.resin.io][resin-talk-link].

Once your Edison has reached 100% on the progress bar, the flashing process has completed, but the device still needs to reboot. **Let your Edison sit for about 2 minutes**.

After a successful firmware flash, you may get a warning pop-up. You can safely click `ignore`.

![Edison reboot warning](/img/edison/edison-restart-warning.png)

#### Check your Resin.io Dashboard
After about a couple of minutes your freshly provisioned Edison should show up online on your dashboard. We can now start pushing code to this little chap using git.

So lets get on it!!!

## Running Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

A good little project to get you started is the [led blink example][example_app] written in node.js. It will allow you to blink the onboard led on the Intel Edison Arduino base board.
To clone it, run the following in a terminal:-

```
git clone https://github.com/shaunmulligan/edison-blink-node.git
```

Once the repo is cloned, change directory into the newly created edison-blink-node directory and add the resin git endpoint by running the `git remote add` command shown in
the top-right corner of the application page, e.g.:-

```
cd edison-blink-node

git remote add resin git@git.resin.io:joebloggs/skynet.git
```

Now you can simply run `git push resin master` and push code to that remote, where it will get built and packaged. Then the final packaged up container will get downloaded to the Edison.

You'll know your code has been successfully built and uploaded to our build server when you see  our friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

Once the code has built and uploaded, you should see the status of your Edison on the resin dashboard change from `Idle` to `Downloading`. It should take a few minutes for the first update to download. Don't worry the first push is always the hardest. After the device has finished updating, you should see a happily blinking green led on your board.

__Note:__ Only the Intel Edison Arduino base board has a built in Led, for other boards you will need to connect up an external Led to mraa pin 13.

At this point you should have an Edison that you can remotely update.. Woohoo!!

If node.js isn't your thing, then don't worry, you can use any language you like. Have a look at how to use [dockerfiles][dockerfile] and play around with our python example over [here][python-example] to get your feet wet.

## Further Reading

* For more details on deploying to your devices, see the [deployment guide][deploy].

* If you need more details on managing your devices and applications, check out
  our [device and application management guide][managing_devices_apps].

## Feedback

If you find any issues with the application, please let us know over [here][resin-support-help] or over at [talk.resin.io][resin-talk-link]. We are always open to
feedback and respond to any issues as soon as we can.

## Alternative Method of Flashing Edison firmware

__Note:__ These methods are not recommended as there are peculiarities and instances where they are unreliable. We strongly recommend using the [Intel Flash Tool Lite][flash-tool-link].

#### install dfu-util

In order to put the new resinOS firmware on the Edison we need a special tool called [dfu-util](http://dfu-util.sourceforge.net/). This is basically a utility to download and upload firmware to/from devices connected over USB.

##### dfu-util on Mac OSX

For this step you will need [MacPorts](macports-link) to install dfu-util, coreutils, and gnu-getopt

`sudo port install dfu-util gnu-getopt coreutils`

__Note:__ **DO NOT** install DFU-util with [Homebrew][homebrew-link] as there is a known issue with the DFU-util version which Homebrew installs.

##### dfu-util on Windows

__Note__: the dfu-util is bundled with the resinOS download, but you will still need to install the drivers for the Edison.

If you have not previously installed Intel’s Edison drivers for Windows, you will need to do that first.

* Navigate to https://communities.intel.com/docs/DOC-23242
* Scroll down and download the “Windows Driver setup” file
* Double-click on the downloaded .exe and follow the command prompts (accepting all defaults) to install the drivers

##### dfu-util on Linux

Simply install using apt-get:
`sudo apt-get install dfu-util`

#### Flashing the OS to the device

**Before starting the flashing process, make sure you unplug the Edison from your computer.**

##### Using Mac OSX

Extract the `.zip` and from your terminal cd into the into the newly extracted folder
`cd resin-myFleet-0.1.0-0.0.9`
Run the flashall script.
`sudo ./flashall.sh`
You should see an output like this:
```
Using U-Boot target: edison-defaultcdc
Now waiting for dfu device 8087:0a99
Please plug and reboot the board
```
At this point you can connect your Edison to your computer.

__Note__: Make sure you connect it to the USB-OTG port and **NOT** the USB-CONSOLE port.

You should now see the flashing process happen and output something like this:
```
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Flashing IFWI
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Download    [=========================] 100%      4194304 bytes
Flashing U-Boot
Download    [=========================] 100%       245760 bytes
Flashing U-Boot Environment
Download    [=========================] 100%        65536 bytes
Flashing U-Boot Environment Backup
Download    [=========================] 100%        65536 bytes
Rebooting to apply partition changes
Now waiting for dfu device 8087:0a99
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Flashing boot partition (kernel)
Flashing data_disk, (it can take up to 5 minutes... Please be patient)
Flashing rootfs, (it can take up to 5 minutes... Please be patient)
Rebooting
U-boot & Kernel System Flash Success...
```

##### Using Windows

**Before starting the flashing process, make sure you unplug the Edison from your computer.**

Unzip the `resin-myFleet-0.1.0-0.0.9.zip` file that you downloaded and open the folder. In the folder, find the `flashall.bat` file and double-click it.

__Note__: You need administrative privileges to successfully execute `flashall.bat`.

You should now see the following:
```
Using U-Boot target: edison-defaultcdc
Now waiting for dfu device 8087:0a99
Please plug and reboot the board
```

At this point you can connect your Edison to your computer.

__Note__: Make sure you connect it to the USB-OTG port and **NOT** the USB-CONSOLE port.

You should now see the flashing process happen and outout something like this:
```
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Flashing IFWI
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Download    [=========================] 100%      4194304 bytes
Flashing U-Boot
Download    [=========================] 100%       245760 bytes
Flashing U-Boot Environment
Download    [=========================] 100%        65536 bytes
Flashing U-Boot Environment Backup
Download    [=========================] 100%        65536 bytes
Rebooting to apply partition changes
Now waiting for dfu device 8087:0a99
dfu-util: Device has DFU interface, but has no DFU functional descriptor
Flashing boot partition (kernel)
Flashing data_disk, (it can take up to 5 minutes... Please be patient)
Flashing rootfs, (it can take up to 5 minutes... Please be patient)
Rebooting
U-boot & Kernel System Flash Success...
```

##### Using Linux

**Before starting the flashing process, make sure you unplug the Edison from your computer.**

Extract the previously downloaded `.zip` file , open a terminal and cd into the newly created folder.
`cd resin-myFleet-0.1.0-0.0.9`
From there execute the flashall script buy running
`sudo ./flashall.sh`
You should now see the following output in your terminal:
```
Using U-Boot target: edison-defaultcdc
Now waiting for dfu device 8087:0a99
Please plug and reboot the board
```

At this point plug your Edison into the USB port of your computer.

__Note__: Make sure you connect it to the USB-OTG port and **NOT** the USB-CONSOLE port.

Once your computer detects the Edison you should see the flashing process happen and the following output:
```
Using U-Boot target: edison-default
Now waiting for dfu device 8087:0a99
Please plug and reboot the board
Flashing IFWI
##################################################] finished!
##################################################] finished!
Flashing U-Boot
##################################################] finished!
Flashing U-Boot Environment
##################################################] finished!
Flashing U-Boot Environment Backup
#########################################] finished!
Flashing boot partition (kernel)
##################################################] finished!
Flashing rootfs, (it can take up to 5 minutes... Please be patient)
##################################################] finished!
Rebooting
U-boot & Kernel System Flash Success...
```
Leave your Edison plug in to your computer. It can take a while to completely flash the OS and dfu-util gives very little feedback.

Once you have burned the new firmware with this method you can carry on from the [Check your dashboard step](/installing/gettingStarted-Edison#check-your-resin-io-dashboard).

[deploy]:/deployment/deployment
[projects]:/examples/projects
[managing_devices_apps]:/management/applications
[wifi]:/deployment/network
[supported]:/hardware/devices
[dockerfile]:/deployment/dockerfile
[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:https://dashboard.resin.io/signup
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[github]:http://github.com/
[github_apis]:https://developer.github.com/v3/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[login]:http://resin.io/login
[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[example_app]:https://github.com/shaunmulligan/edison-blink-node
[try-git]:https://www.codeschool.com/courses/try-git
[code-school]:https://www.codeschool.com/
[python-example]:https://github.com/shaunmulligan/hello-python-edison

[7-zip-link]:http://www.7-zip.org/
[dfu-util-for-windows-link]:https://cdn.sparkfun.com/assets/learn_tutorials/3/3/4/dfu-util-0.8-binaries.tar.xz
[sparkfun-blog-link]:https://learn.sparkfun.com/tutorials/loading-debian-ubilinux-on-the-edison#install-ubilinux
[homebrew-link]:http://brew.sh/
[macports-link]:https://www.macports.org/
[flash-tool-link]:https://software.intel.com/en-us/articles/flash-tool-lite-user-manual
[resin-support-help]:https://resin.io/contact/#contact-form
[resin-talk-link]:http://talk.resin.io/
[edison-ardiuno-breakout-board]:https://www.arduino.cc/en/ArduinoCertified/IntelEdison
