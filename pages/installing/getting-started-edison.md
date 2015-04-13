# Getting Started with the Intel Edison

![Intel Edison](/img/edison/intel_edison.jpg)

## What you will need

* an Intel Edison
* A base board for the edison that has an USB-OTG port, any of the following boards will do the trick:
    - [The official Intel development board](official-dev-board)
    - [Sparkfun Base Block](sparkfun-base-block)
    - [Intel® Edison and Arduino Breakout Kit](edison-ardiuno-breakout-board) 
* A micro-usb cable
* Some awesome ideas to hack on! If you need inspiration, check out our
  [projects][projects] page.

__NOTE:__ If you're not experienced with [git][git], check out the excellent
[Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with a Beaglebone black then skip ahead to [Creating Your First Application](/#/pages/getting-started-edison#start-a-new-application).

## Signing Up

Enter your details on the [sign up page][signup]. There are a couple of
restrictions:-

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

## SSH Key

![Add SSH Key](/img/screenshots/add_ssh_key.png)

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

## Start a new application

The two key components you will interact with in resin.io are *applications* and *devices* - applications represent the code you want to run on your devices, and devices the actual hardware itself.

You can have as many devices connected to an application as you like - when you
push code it deploys to every device that application owns. 

Okay, lets get started...

First things first, we need to start a new resin.io application. Choose a fancy name for your new Intel Edison project. In this example, we were super creative and called it `myEdisonApp`.

![Creating an Application](/img/edison/create_application_edison.png)

Next make sure you select `Intel Edison (PREVIEW)` from the device type drop down menu and click the big yellow create button. You should now be magically redirected to your new creatively named `myEdisonApp` and will see a couple of tabs notice saying "No devices are connected to this application", that isn't very exciting, so lets change that by adding a new device...

![Empty Application Page](/img/edison/application_empty_edison.png)

To connect a device to our newly created application, we need to first get the resinOS on the device. This involves downloading the new device image, burning it onto the device memory.

## Adding Your First Edison Device
### download image

To get the resin operating system you need to click on the "Download Device OS" button.
Once the download completes, you should have a `.zip` file with a name that looks something like this: `resin-myEdisonApp-0.1.0-0.0.9.zip`. 

### Burn the ResinOS onto the Edison

In order to use resin to deploy code on the Edison it is necessary to flash new firmware (the resinOS) onto the device. 
__Note__: This will erase your current yocto OS system on your Edison and any data or configurations you have on it, but trust us, its for the best ;) If for some terrible reason you have to revert to the old way of doing things, you can restore your Edison to it's factory default firmware by following the instructions over [here](recover-edison-firmware)

#### install dfu-util

In order to put the new resinOS firmware on the Edison we need a special tool called [dfu-util](http://dfu-util.sourceforge.net/). This is basically a utility to download and upload firmware to/from devices connected over USB.

##### dfu-util on Mac OSX

For this step you will need either [Homebrew](homebrew-link) or [MacPorts](macports-link) to install dfu-util, coreutils, and gnu-getopt
**Using Homebrew:** 
`brew install dfu-util gnu-getopt coreutils`
**Using MacPorts:**
`sudo port install dfu-util gnu-getopt coreutils`

if you get errors it may help to run the following:
`brew update && brew tap jlhonora/lsusb && brew install lsusb`

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
`cd resin-myEdisonApp-0.1.0-0.0.9`
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

Unzip the `resin-myEdisonApp-0.1.0-0.0.9.zip` file that you downloaded and open the folder. In the folder, find the `flashall.bat` file and double-click it. 
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
`cd resin-myEdisonApp-0.1.0-0.0.9`
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

#### Check your Resin.io Dashboard
After about 10 minutes your freshly provisoned Edison should show up online on your dashboard. We can now start pushing code to this little chap using git.

So lets get on it!!!

## Running Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

A good little project to get you started is the [tty.js app][example_app] written in node.js. It will allow you to play around with terminal commands on the beaglebone from your web browser.
To clone it, run the following in a terminal:-

```
git clone https://github.com/resin-io/tty.js-resin.git
```

Once the repo is cloned, cd into the newly created tty.js-resin directory and add the resin git endpoint by running the `git remote add` command shown in
the top-right corner of the application page, e.g.:-

```
cd tty.js-resin

git remote add resin git@git.resin.io:joebloggs/skynet.git
```

Now you can simply run `git push resin master` and push code direct to your
device.

You'll know your code has deployed successfully from the appearance of our
friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

After the device has finished updating, you should be able to start playing around in the terminal and have a good base to start building and deploying awesome connected devices.

If node.js isn't your thing, then don't worry, you can use any language you like. Have a look at how to use [dockerfiles][dockerfile] and play around with our python example over [here][python-example].

## Further Reading

* For more details on deploying to your devices, see the [deployment guide][deploy].

* If you need more details on managing your devices and applications, check out
  our [device and application management guide][managing_devices_apps].

## Feedback

If you find any issues with the application, please click the feedback label on
the bottom right-hand side of the page and let us know! We are always open to
feedback and respond to any issues as soon as we can.

[deploy]:/pages/deployment.md
[projects]:/pages/projects.md
[managing_devices_apps]:/pages/managingDevicesApps.md
[wifi]:/pages/wifi.md
[supported]:/pages/devices.md
[dockerfile]:/pages/dockerfile.md

[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:http://resin.io/signup
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
[example_app]:https://github.com/resin-io/tty.js-resin
[try-git]:https://www.codeschool.com/courses/try-git
[code-school]:https://www.codeschool.com/
[python-example]:https://github.com/alexandrosm/hello-python

[sparkfun-base-block]:https://learn.sparkfun.com/tutorials/sparkfun-blocks-for-intel-edison---base-block-?_ga=1.77763604.1671353836.1422802730
[edison-arduino-breakout-board]:https://www.sparkfun.com/products/13097
[official-dev-board]:http://www.makershed.com/products/intel-edison-breakout-board-kit
[recover-edison-firmware]:https://communities.intel.com/thread/55187
[7-zip-link]:http://www.7-zip.org/
[dfu-util-for-windows-link]:https://cdn.sparkfun.com/assets/learn_tutorials/3/3/4/dfu-util-0.8-binaries.tar.xz
[sparkfun-blog-link]:https://learn.sparkfun.com/tutorials/loading-debian-ubilinux-on-the-edison#install-ubilinux
[homebrew-link]:http://brew.sh/
[macports-link]:https://www.macports.org/