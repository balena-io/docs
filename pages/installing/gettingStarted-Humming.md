---
title: Humming Board
---

# Getting Started With the Humming Board

![Humming Board](/img/hummingBoard.png)

## What You'll Need

* A [Humming Board i2][humming-link] from [Solid Run][solid-run]. Currently we only support the `i2` device type.

* A 4GB or larger SD card.
  The [Humming Board i2][humming-link] uses a microSD card. The [speed class][speed_class] of
  the card also matters - this determines its maximum transfer rate. We strongly
  recommend you get hold of a class 10 card or above.

* An ethernet cable or [WiFi adapter][wifi] to connect your device to the internet.

  __Note__: Always run the board from 5VDC 1A minimum supply when using a Wifi Dongle.

* Some awesome ideas to hack on! If you need inspiration, check out our [projects][projects] page.

<!-- ========================== Generic ALL devices =================================   -->

__NOTE:__ If you're not experienced with [git][git], check out the excellent
[Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with your new device, then skip ahead to [Creating Your First Application](/installing/gettingStarted-Humming#creating-your-first-application).

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

The two key components you will interact with in resin.io are *applications* and
*devices* - applications represent the code you want to run on your devices, and
devices are the actual hardware itself.

You can have as many devices connected to an application as you like - when you
push code, resin.io deploys to every device that is part of that application.

To create your first application simply type in a name, select as your device type and click the create button. You should now be taken to the dashboard of your newly created application:

<img src="/img/common/main_dashboard/select_fleet_type.png" width="80%">

<!-- ========================== end section =================================   -->

## Adding Your First Device

This is the application dashboard where all of the devices connected to your
application will be shown, along with their statuses and logs.

<img src="/img/common/app/app_dashboard_empty.png" width="80%">

Click the `Download Device OS` button to get the resin.io operating system image for your
application. A dialog will appear prompting you to specify how your device connects to the internet, if you select wifi, make double sure to that your `SSID` and `passphrase` are correct for the wifi router you intend to connect to. The download can take a little while to get started, so be patient.

While the file downloads, ensure your SD card is formatted in [FAT32][fat32] ([WikiHow][wikihow] has [instructions][wikihow_format] on how to do this).

Once the download is finished you should have a `.img` file with a name like `resin-myFleet-0.1.0-0.0.14.img` where myFleet is the name you gave your application on the dashboard.

Now we have to burn the downloaded image on to the SD card. There are a couple of ways to do this, depending on your operating system. We have listed a few below.

## Burning the OS image onto the SD

Now we have to flash the downloaded `.img` file onto our SD card. We recommend using [Etcher][etcher-link], a simple, cross platform SD card writer and validator. Head over to [etcher.io][etcher-link] and get install it, it only takes a few seconds :)

You can of course use any other SD card writing software you like, some options are:
* [win32diskimager][win32-disk-imager] for Windows.
* [piFiller][pifiller-download] for osx.
* [dd or "Disk Destroyer"][dd-link] for Linux.

__Note:__ Before you flash resinOS to your SD card you may need to formatted it as [FAT32][fat32]. [WikiHow][wikihow] has great [instructions][wikihow_format] on how to do this.

For simplicity this tutorial will assume you are using [Etcher][etcher-link]. Once you have Etcher installed, start it up. You may be asked to allow Etcher administrative privileges. This is just so Etcher can access your SD card.

To create a bootable resinOS SD card follow these 3 easy steps:

1. Click "Select image" button and find your applications resinOS `.img` file.
2. If you haven't already done so, insert your SD card into your computer. Etcher will automatically detect it. If you have more than one SD card inserted, you will need to select the appropriate one.
3. Click the "Flash!" button.

<img src="/img/common/etcher/etcher.gif" width="60%">

Etcher will now prepare a bootable SD card and validate that it was flashed correctly. Right! time for a spot of tea as flashing the SD card can take roughly 3 or more minutes depending on the quality of your SD card.

Etcher will give you a little ping! when it's done, and safely eject the SD card for you.

__Note:__ You can burn several SD cards with the same `.img` file and all the devices will boot and provision into your application's fleet. You can also disable the auto-ejecting or write validation steps from the Etcher settings panel.

Once it is completed, you can carry on setting up your device as shown below.

## Setting Up Your Device

Put the SD card into your device, and connect either the ethernet cable or WiFi adapter. Now power up the device by inserting the micro usb cable.

It can take a few minutes for the device to boot up and appear on the dashboard, so grab some tea while you wait.

<!-- TODO: get insert gif for hummingboard -->
<!-- ![insert SD](/img/BBB/sd_card_BBB.jpg) -->

While you wait resin.io is partitioning your SD card, installing a custom linux environment and establishing a secure connection with our servers.

If you have a class 10 SD card and a fast internet connection your device should appear on the dashboard in around 7 minutes. Note that Class 4 SD cards can take up to 3 times longer so it's well worth investing in the fastest card you
can find.

## Running Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

<!-- TODO: switch example_app link to point to right app. -->
A good little project to get you started is this [simple webserver][example_app_node] written in node.js. It will respond with `Hello, World!` on port `:80`.

To clone it, run the following in a terminal:-
```
git clone https://github.com/resin-projects/simple-server-node.git
```

Once the repo is cloned, change directory into the newly created `simple-server-node` directory and add the resin git remote endpoint by running the `git remote add` command shown in the top-right corner of the application page, e.g.:-

```
cd simple-server-node

git remote add resin joebloggs@git.resin.io:joebloggs/skynet.git
```

Now you can simply run `git push resin master` and push code direct to your device.

You'll know your code has been built on our servers successfully from the appearance of our friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

After the device has finished updating, you should be able to see "Hello World!" printed when you type your device IP address in the browser. You can now start playing around in the web terminal on the dashboard and have a good base to start building and deploying awesome connected devices.

If node.js isn't your thing, then don't worry, you can use any language you like. Have a look at how to use [dockerfiles][dockerfile] and play around with our python example over [here][python-example].

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

[alpha]:http://en.wikipedia.org/wiki/Alpha_software#Alpha
[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:http://alpha.resin.io/signup
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

[python-example]:https://github.com/resin-projects/simple-server-python
[humming-link]:http://www.solid-run.com/product/hummingboard-i2/
[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/
[solid-run]:http://www.solid-run.com/

[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[win32-disk-imager]:http://sourceforge.net/projects/win32diskimager/
[pifiller-download]:http://ivanx.com/raspberrypi/
[etcher-link]:https://etcher.io/
[dd-link]:http://man7.org/linux/man-pages/man1/dd.1.html
