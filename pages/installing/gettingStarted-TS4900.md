---
title: Technologic TS-4900
---

# Getting Started With the TS-4900

## What You'll Need

* A [TS-4900][TS-link].

<img src="/img/ts-4900.gif" width="40%">

* A 4GB or larger SD card.
  The [TS-4900][TS-link] uses a Micro SD card. The [speed class][speed_class] of
  the card also matters - this determines its maximum transfer rate. We strongly
  recommend you get hold of a class 10 card or above.

* An ethernet cable or [WiFi adapter][wifi] to connect your device to the
  internet. The the internal wifi for the TS-4900 is unstable at moment and there is no easy way of changing the wifi `SSID` and `PASSWORD`, so for the time being, it is recommended that you connect via ethernet.

* Some awesome ideas to hack on! If you need inspiration, check out our
  [projects][projects] page.

<!-- ========================== Generic ALL devices =================================   -->

__NOTE:__ If you're not experienced with [git][git], check out the excellent
  [Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with your new device, then skip ahead to [Creating Your First Application](/installing/gettingStarted-TS4900#creating-your-first-application).

## Signing Up

Enter your details on the [sign up page][signup]. There are a couple of restrictions:

  * The username can only contain letters and numbers.
  * The password has to be at least 8 characters long.

<img src="/img/common/sign_up_flow/sign_up_cropped.png" width="80%">

## SSH Key

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure your connection when sending your code to us. In order to secure your [git][git] connection, we need your __public__ [SSH Key][ssh_key] (you must never share your *private* key with anyone.)

Simply paste your public key into the box provided on the UI and click `save`. Alternatively you can import your key from [Github][github]. If you don't have an ssh key or have never used one, we recommend you take a look at [Github][github]'s [excellent documentation][github_ssh] on the subject and how to generate a key pair for your platform.

<img src="/img/common/sign_up_flow/enter_ssh_key_cropped.png" width="80%">

Once generated, SSH keys are easy to use. In fact you generally don't have to think about it at all. Once you're set up just `git push` your code to us and it's taken care of automatically and securely.

If you don't have your ssh key setup yet, but want to explore resin.io, just click `skip`. Note that you will not be able to push code to your devices until you have an ssh key saved. This can be done at anytime from the `Preferences` page on the dashboard.

### Import SSH key From GitHub

For convenience we provide the ability to import your public SSH key from [GitHub][github] - just click on the Octocat icon in the bottom right-hand corner ([we use][github_ssh_blogpost] GitHub's [public APIs][github_apis] to retrieve this data.)

You will then have to enter your github username:

<img src="/img/common/sign_up_flow/enter_github_username_cropped.png" width="60%">


## Creating Your First Application

The two key components you will interact with in resin.io are *applications* and *devices* - applications represent the code you want to run on your devices, and devices are the actual hardware itself.

You can have as many devices connected to an application as you like - when you
push code, resin.io deploys to every device that is part of that application.

To create your first application simply type in a name, select as your device type and click the create button. You should now be taken to the dashboard of your newly created application:

<img src="/img/common/main_dashboard/select_fleet_type.png" width="80%">

<!-- ========================== end section =================================   -->

<!-- ========================== Device Specific =================================   -->

## Adding Your First Device

This is the application dashboard where all of the devices connected to your application will be shown along with their statuses and logs.

<img src="/img/ts-4900/ts-4900-empty-dashboard.png" width="80%">

Click the `Download Device OS` button to get the resin.io operating system image for your application. A dialog will appear prompting you to specify how your device connects to the internet - either via an ethernet cable or wifi, in which case you can specify your Wifi network's SSID and passphrase. Click the `Download Device OS` button to get the resin.io operating system image for your application.

<img src="/img/common/network/network_selection_wifi_cropped.png" width="60%">

__NOTE:__ Internal Wifi on the TS-4900 is not stable, and for the time being it is recommended to use an ethernet connection or use one of the supported Wifi dongles.

<!-- ========================== end section =================================   -->

<!-- ========================== Generic for SD devices =============================   -->

While the file downloads ensure your SD card is formatted in [FAT32][fat32]
([WikiHow][wikihow] has [instructions][wikihow_format] on how to do this).

Once the download is finished you should have a `.img` file with a name like `resin-myFleet-0.1.0-0.0.16-b2854a2c7639.img` where "myFleet" is the name you gave your application on the dashboard.

Now we have to burn the downloaded `.img` file onto the SD card. There are a couple of ways to do this depending on your host computer's operating system. We have listed a few below.

## Burning the OS image onto the SD card

* [Mac and Linux Command Line](/installing/gettingStarted-TS4900#on-mac-and-linux)
* [Windows](/installing/gettingStarted-TS4900#windows)

### On Mac and Linux

####From the command line

First we need to figure out what our SD card is called. To do this open a terminal and execute the following command to see the list of connected storage devices:
`df -h`
Next, insert your microSD card and execute the following command again:
`df -h`
Compare the two outputs and find the newly added device. In my case, the microSD card was '/dev/disk2s1'.
Depending on your OS, this device can take different names, like '/dev/mmcblk0p1' or '/dev/sdb1'.

Once you've got the name of the SD card, you'll want to unmount that disk using the following command, replacing the specifics with your card details:
`sudo diskutil unmount /dev/disk2s1`
Now you'll want to execute the command that actually copies the image onto the SD card.

__Warning:__ You have to be really careful here, and make 100% sure you are entering the correct SD card details. You could end up copying over the wrong drive (such as your master hard disk) and then you're gonna have a bad time. Double check everything!

Also, choose the right file location for your `.img` file in the input file field (if=...).
`sudo dd bs=1m if=~/Downloads/resin-myFleet-0.1.0-0.0.16-b2854a2c7639.img of=/dev/rdisk2`

__NOTE:__ that we subtly changed the device name from "/dev/disk2s1" to "/dev/rdisk2". You'll want to do the same when you execute the above command, with the corresponding device name. If your device name is "/dev/mmcblk0p1", use "/dev/mmcblk0". If it's "/dev/sdb1", use "/dev/sdb". The idea is to use the device name for the whole SD card and not just a partition. If you're not sure, use `ls /dev` before and after inserting the card and note the difference.

__NOTE:__ Linux users will need to run `sudo dd bs=1M if=~/Downloads/resin-myFleet-0.1.0-0.0.16-b2854a2c7639.img of=/dev/sdb` (uppercase M)

This process can take anywhere from 5-30 minutes depending on the speed of your computer and microSD card. Once this is done, skip down to [setting up your device](/installing/gettingStarted-TS4900#setting-up-your-device).

#### From a GUI

Alternatively you can use the GUI program [PiFiller][pifiller-download] to burn the SD card.

Once downloaded, launch Pi Filler, and follow the on-screen prompts. The first thing it will ask is for you to locate your `.img` file.

Locate your resinOS `.img` file in your Downloads folder. It should be named something like `resin-myFleet-0.1.0-0.0.16-b2854a2c7639`. Now click "choose".

You can now insert your microSD card into your host machine and click continue. PiFiller will look for your SD card and tell you when it finds it.

__Warning:__ Make 100% sure that the SD card it finds is in fact the correct card.

Click continue and piFiller will write to the SD card. This can take 5-25 minutes depending on your machine. Once this is done, skip down to [setting up your device](/installing/gettingStarted-TS4900#setting-up-your-device).

### Windows

To burn OS images to SD cards on Windows, you will need to install [Win32 disk imager][win32-disk-imager]. Once you download it, you can launch win32 disk imager by clicking on the "Win32DiskImager" file in the folder that you extracted it to.

Now in Win32DiskImager, click on the folder icon to select which `.img` file you wish to burn. A file browser window will open and you will need to select your resinOS image from the Downloads folder. It should be the extracted version and named something like this `resin-myFleet-0.1.0-0.0.16-b2854a2c7639.img`.

Next insert your SD card into your host computer and in the Win32DiskImager GUI, select your SD card when it appears.

__Warning:__ Be very careful to make sure that you have selected the right SD card. Double check this!! Otherwise you could end up writing over your host machine's hard disk.

Once you have made your selections and are 100% sure you are writing to your SD card and nothing else, you can click write and wait for the SD card to be burned.

Once it is completed, you can carry on setting up your Beaglebone as shown below.

<!-- ========================== end section =================================   -->

<!-- ========================== Device Specific =================================   -->

## Setting Up Your Device

Put the SD card into your device, and connect either the ethernet cable or WiFi adapter. At this point you need to make sure that your device will boot from the SD. This can be achived by enabling the SD-boot jumper present on most of the base boards.
For example we have been using the TS-8550 base board. On this particular base board you can find the SD-boot jumper highlighted in the picture below.

<img src="/img/ts4900/ts-8550-jumper-location.jpg" width="80%">

Please ensure that this jumper is enabled before you provision your device and power-up your device.

While you wait resin.io is partitioning your internal memory, installing a custom linux
environment and establishing a secure connection with our servers.

After roughly 5-7 minutes (depending on you SD card speed) your board will shut down. Disable the SD-boot jumper that we have priorly talked about (optionally you can pull out the SD-card as well or leave it in) and power your board once again.
Now you should see the device in your dashboard waiting to take over the world.

__Note:__ If you have an HDMI screen attached, you should see `"Booted - Check your resin.io dashboard."` on the screen when the device boots. If instead you see rainbow colors or a blank screen, it could mean that the SD card was not burned correctly or is corrupted. Try [burning the SD card](/installing/gettingStarted-TS4900#burning-the-os-image-onto-the-sd-card) again. If the issue persists, click the little yellow ` ? ` on in the bottom right of the resin.io dashboard and speak to our support engineers.

<!-- ========================== end section =================================   -->

## Further Reading

* For more details on deploying to your devices, see the [deployment guide][deploy].

* If you need more details on managing your devices and applications, check out
  our [device and application management guide][managing_devices_apps].

## Feedback

If you find any issues with the application, please click the feedback label on
the bottom right-hand side of the page and let us know! We are always open to
feedback and respond to any issues as soon as we can.

<!-- General Internal (docs) links -->

[deploy]:/deployment/deployment
[projects]:/examples/seed-projects
[managing_devices_apps]:/management/applications
[wifi]:/deployment/network
[supported]:/hardware/devices
[dockerfile]:/deployment/dockerfile

<!-- General External Links -->

[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:https://dashboard.resin.io/signup
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[github]:http://github.com/
[github_apis]:https://developer.github.com/v3/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[try-git]:https://www.codeschool.com/courses/try-git
[code-school]:https://www.codeschool.com/

<!-- SD card specific links -->

[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/

<!-- Device specific links -->

[TS-link]:https://www.embeddedarm.com/products/board-detail.php?product=TS-4900

<!-- Example code links -->

[python-example]:https://github.com/alexandrosm/hello-python
