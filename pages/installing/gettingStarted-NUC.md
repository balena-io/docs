---
title: Intel NUC
---

# Getting Started with the Intel NUC

## What You'll Need

* An [Intel NUC][nuc-link] mini PC from Intel.
<img src="/img/nuc.jpg" width="40%">
* A 4GB or larger USB thumb drive.
* A [HDMI][hdmi-link] enabled LCD screen and HDMI cable.
* A simple USB keyboard.
* A power supply unit for the NUC.
* An ethernet cable or [WiFi adapter][wifi] to connect your device to the internet.
* And finally you need some awesome ideas to hack on! If you need some inspiration, go over and check out our [projects][projects] page.

Okay, so now that we have our hardware, lets get to the code. Resin.io uses the [git][git] version control system to push your code updates. The code is then built once on the resin.io build servers and bundled into a container. This container is then delivered to all devices in your fleet.

__NOTE:__ If you're not experienced with [git][git] version control, check out the excellent [Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with the NUC, then skip ahead to [Creating Your First Application](/gettingStarted-NUC#creating-your-first-application).

## Signing Up

Enter your details on the [sign up page][signup]. There are a couple of
restrictions:

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

<img src="/img/common/sign_up_flow/sign_up_cropped.png" width="80%">

## SSH Key

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure
your connection when sending your code to us. In order to secure your [git][git]
connection, we need your __public__ [SSH Key][ssh_key] (you must never share
your *private* key with anyone.)

Simply paste your public key into the box provided on the UI and click `save`. Alternatively you can import your key from [Github][github]. If you don't have an ssh key or have never used one, we recommend you take a look at [Github][github]'s [excellent documentation][github_ssh] on the subject and how to generate a key pair for your platform.

<img src="/img/common/sign_up_flow/enter_ssh_key_cropped.png" width="80%">

Once generated, SSH keys are easy to use. In fact you generally don't have to
think about it at all. Once you're set up just `git push` your code to us and
it's taken care of automatically and securely.

If you don't have your ssh key setup yet, but want to explore resin.io, just click `skip`. Note that you will not be able to push code to your devices until you have an ssh key saved. This can be done at anytime from the `Preferences` page on the dashboard.

### Import SSH key From GitHub

For convenience we provide the ability to import your public SSH key from
[GitHub][github] - just click on the Octocat icon in the bottom right-hand
corner ([we use][github_ssh_blogpost] GitHub's [public APIs][github_apis] to
retrieve this data.)

You will then have to enter your github username:

<img src="/img/common/sign_up_flow/enter_github_username_cropped.png" width="60%">

## Creating Your First Application

<img src="/img/NUC/create_application_NUC.png" width="80%">

The two key components you will interact with in resin.io are *applications* and *devices* - applications represent the code you want to run on your devices, and devices the actual hardware itself.

You can have as many devices connected to an application as you like - when you push code it deploys to every device that application owns.

To create your first application simply type in a name, select the `Intel NUC` as your device type in the drop down and tap create which will take you to your new application's dashboard:-

## Adding Your First Device
<img src="/img/NUC/application_empty_NUC.png" width="80%">

This is the application dashboard where all of the devices connected to your application will be shown along with their status and logs.

Click the `Download Device OS` button to get the resin.io operating system image for your
application. A dialog will appear prompting you to specify how your device connects to the internet, if you select wifi, make double sure to that your `SSID` and `passphrase` are correct for the wifi router you intend to connect to. The download can take a little while to get started, so be patient.

While the file downloads, ensure your USB key is formatted in [FAT32][fat32] ([WikiHow][wikihow] has [instructions][wikihow_format] on how to do this).

Once the download is finished you should have a `.img` file with a name like `resin-myApp-0.1.0-0.0.14.img` where myApp is the name you gave your application on the dashboard.

Now we have to burn the downloaded image on to the USB key. There are a couple of ways to do this, depending on your operating system. We have listed a few below.

## Burning the OS image

### On Mac and Linux

####From the command line

First we need to figure out what our USB key is called, to do this open a terminal and execute the following command to see the list of connected storage devices:
`df -h`
Next, insert your USB key, and then execute the following command again:
`df -h`
Compare the two outputs, and find the newly added device. In my case, the USB key was '/dev/disk2s1'.

Once you've got the name of the USB key, you'll want to unmount that disk using the following command, but replacing the specifics with your card details:
`sudo diskutil unmount /dev/disk2s1`
Now, you'll want to execute the command that actually copies the image onto the USB key.

> You have to be really careful here, and make 100% sure you are entering the correct USB key details. You could end up copying over the wrong drive, such as your master hard disk, and then you're gonna have a bad time. Double check everything!

Also, be sure to choose the right file location for your `.img` file in the input file field (if=...).
`sudo dd bs=1m if=~/Downloads/resin-myApp-0.1.0-0.0.4.img of=/dev/rdisk2`

__NOTE:__ that we subtly changed the device name from "/dev/disk2s1" to "/dev/rdisk2". You'll want to do the same when you execute the below command.

This process can take anywhere from 5-30 minutes depending on the speed of your computer and USB key. Once this is done, skip down to [setting up your device](/installing/gettingStarted-NUC#setting-up-your-device)

#### From a GUI

Alternatively you can use the GUI program [PiFiller][pifiller-download] to burn the USB key.

Once downloaded, launch Pi Filler, and follow the on-screen prompts. The first thing it will ask is for you to locate your .img file. It mentions the Raspberry Pi, but you can ignore that, it doesn't make any difference.

Locate the .img file in your Downloads folder. It should be named something like `resin-myApp-0.1.0-0.0.14.img`, now click "choose".

You can now insert your USB key into your host machine and click continue. PiFiller will look for your USB key and tell you when it finds it.

__NOTE:__ make 100% sure that the USB key it finds is in fact the correct card.

Click continue and piFiller will write the USB key. This can take 5-25 minutes depending on your machine. Once this is done, skip down to [setting up your device](/installing/gettingStarted-NUC#setting-up-your-device)

### Windows

To burn OS images to USB keys on windows, you will need to install [Win32 disk imager][win32-disk-imager]. Once you download it, you can launch win32 disk imager by clicking on the "Win32DiskImager" file in the folder that you extracted it to.

Now in Win32DiskImager, click on the folder icon to select which `.img` file you wish to burn. A file browser window will open and you will need to select your OS image from the Downloads folder. It should be the extracted version and named something like this `resin-myApp-0.1.0-0.0.14.img`.

Next insert your USB key into your computer and in the Win32DiskImager GUI, select your USB key when it appears.

__NOTE:__ Be very careful to make sure that you have selected the right USB key. Double check this!! Otherwise you could end up writing over your host machines harddisk.

Once you have made your selections and are 100% sure you are writing to your USB key and nothing else, you can click write and wait for the USB key to be burnt.

Once it is completed, you can carry on setting up your device as shown below.

## Setting Up Your Device

Put the USB drive into your device and connect either the ethernet cable or WiFi adapter. Ensure that the HDMI screen and keyboard are connected up.

Now connect up the power supply and turn the device on by pushing the small round button on the top of the device.

Press the F10 key while the **BIOS** is loading in order to enter the boot menu. Next, select the `UEFI : USB` option from the boot menu so that the device will boot from your USB drive.

Once the device boots, you should see it pop up on you resin.io dashboard. It will immediately go into a "flashing internal media" state. This means that the device is flashing the resinOS onto your internal flash media.

__Warning:__ The resinOS will completely overwrite the internal media of your NUC, so if you have important data on the device, we recommend that you make a backup before you attempt provisioning the NUC on resin.io.

After a few minutes, the OS will be fully flashed to the internal media and the device will shut itself down. At this point, you will see on the dashboard that the device is in a "Post-provisioning" state. You can now remove the USB drive and press the power button once again.

Your NUC should now automatically boot into the resin.io OS and you should see the device online and in an "Idle" state on your dashboard, ready and waiting for some code to be deployed.

__Note:__ If for some reason your device does not boot into resinOS, you may need to go back into the **BIOS** and make sure the boot order correctly selects to boot from the internal SATA drive and not from USB.

## Running Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

<!-- TODO: switch example_app link to point to right app. -->
A good little project to get you started is this [simple webserver][python-example] written in python. It will respond with `Hello, World!` on port `:80`.

To clone it, run the following in a terminal:-
```
git clone https://github.com/shaunmulligan/x86-64-example.git
```

Once the repo is cloned, change directory into the newly created `x86-64-example` directory and add the resin git remote endpoint by running the `git remote add` command shown in the top-right corner of the application page, e.g.:-

```
cd x86-64-example

git remote add resin joebloggs@git.resin.io:joebloggs/skynet.git
```

Now you can simply run `git push resin master` and push code direct to your device.

You'll know your code has been built on our servers successfully from the appearance of our friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

After the device has finished updating, you should be able to see "Hello World!" printed when you type your device IP address in the browser. You can now start playing around in the web terminal on the dashboard and have a good base to start building and deploying awesome connected devices.

## Further Reading

* For more details on deploying to your devices, see the [deployment guide][deploy].

* If you need more details on managing your devices and applications, check out
  our [device and application management guide][managing_devices_apps].

## Feedback

If you find any issues with the application, please click the feedback label on the bottom right-hand side of the page and let us know! We are always open to feedback and respond to any issues as soon as we can.

[deploy]:/deployment/deployment
[projects]:/examples/projects
[managing_devices_apps]:/management/applications
[wifi]:/deployment/network
[supported]:/hardware/devices
[dockerfile]:/deployment/dockerfile

[signup]:https://dashboard.resin.io/signup
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[github]:http://github.com/
[github_apis]:https://developer.github.com/v3/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[login]:https://dashboard.resin.io/login
[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[example_app_node]:https://github.com/resin-projects/simple-server-node
[try-git]:https://www.codeschool.com/courses/try-git
[code-school]:https://www.codeschool.com/

[python-example]:https://github.com/shaunmulligan/x86-64-example.git

[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/

[nuc-link]:http://www.intel.co.uk/content/www/uk/en/nuc/products-overview.html
[hdmi-link]:https://en.wikipedia.org/wiki/HDMI
