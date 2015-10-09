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

__NOTE:__ If you're not experienced with [git][git] version control, check out the excellent [Try Git][try-git] course at [Code School][code-school].

If you already have a resin.io account and just want to get started with the Humming Board, then skip ahead to [Creating Your First Application](/#/pages/gettingStarted-Humming#creating-your-first-application).

## Signing Up

Enter your details on the [sign up page][signup]. There are a couple of restrictions:-

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

Or just use one of your social logins to signup with resin.

## SSH Key

![Add SSH Key](/img/screenshots/add_ssh_key.png)

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure
your connection when sending your code to us. In order to secure your [git][git]
connection, we need your __public__ [SSH Key][ssh_key] (you must never share
your *private* key with anyone.)

Once generated, SSH keys are easy to use. In fact you generally don't have to think about it at all, once you're set up just `git push` your code to us and it's taken care of automatically.

In order to generate a key pair for your platform we recommend you take a look at [Github][github]'s [excellent documentation][github_ssh] on the subject.

### Import From GitHub

For convenience we provide the ability to import your public SSH key from
[GitHub][github] - just click on the Octocat icon in the bottom right-hand
corner ([we use][github_ssh_blogpost] GitHub's [public APIs][github_apis] to
retrieve this data.)

## Creating Your First Application

![Creating an Application](/img/Humming/create_application_Humming.png)


The two key components you will interact with in resin.io are *applications* and *devices* - applications represent the code you want to run on your devices, and
devices the actual hardware itself.

You can have as many devices connected to an application as you like - when you push code it deploys to every device that application owns.

To create your first application simply type in a name, select the `HummingBoard` as your device type and tap create which will take you to your new application's dashboard:-

## Adding Your First Device

![Empty Application Page](/img/Humming/application_empty_Humming.png)

This is the application dashboard where all of the devices connected to your application will be shown along with their status and logs.

Click the `Download Device OS` button to get the resin.io operating system image for your
application. A dialog will appear prompting you to specify how your device connects to the internet, if you select wifi, make double sure to that your `SSID` and `passphrase` are correct for the wifi router you intend to connect to. The download can take a little while to get started, so be patient.

While the file downloads, ensure your SD card is formatted in [FAT32][fat32] ([WikiHow][wikihow] has [instructions][wikihow_format] on how to do this).

Once the download is finished you should have a `.img` file with a name like `resin-myApp-0.1.0-0.0.14.img` where myApp is the name you gave your application on the dashboard.

Now we have to burn the downloaded image on to the SD card. There are a couple of ways to do this, depending on your operating system. We have listed a few below.

## Burning the OS image onto the SD

### On Mac and Linux

####From the command line

First we need to figure out what our SD card is called, to do this open a terminal and execute the following command to see the list of connected storage devices:
`df -h`
Next, insert your microSD card, and then execute the following command again:
`df -h`
Compare the two outputs, and find the newly added device. In my case, the microSD card was '/dev/disk2s1'.

Once you've got the name of the SD card, you'll want to unmount that disk using the following command, but replacing the specifics with your card details:
`sudo diskutil unmount /dev/disk2s1`
Now, you'll want to execute the command that actually copies the image onto the SD card.

> You have to be really careful here, and make 100% sure you are entering the correct SD card details. You could end up copying over the wrong drive, such as your master hard disk, and then you're gonna have a bad time. Double check everything!

Also, choose the right file location for your .img file in the input file field (if=...).
`sudo dd bs=1m if=~/Downloads/resin-myApp-0.1.0-0.0.4.img of=/dev/rdisk2`

__NOTE:__ that we subtly changed the device name from "/dev/disk2s1" to "/dev/rdisk2". You'll want to do the same when you execute the below command.

This process can take anywhere from 5-30 minutes depending on the speed of your computer and microSD card. Once this is done, skip down to [setting up your device](/#/pages/installing/gettingStarted-Humming.md#setting-up-your-device)

#### From a GUI

Alternatively you can use the GUI program [PiFiller][pifiller-download] to burn the SD card.

Once downloaded, launch Pi Filler, and follow the on-screen prompts. The first thing it will ask is for you to locate your .img file. It mentions the Raspberry Pi, but you can ignore that, it doesn't make any difference.

Locate the .img file in your Downloads folder. It should be named something like `resin-myApp-0.1.0-0.0.14.img`, now click "choose".

You can now insert your microSD card into your host machine and click continue. PiFiller will look for your SD card and tell you when it finds it.

__NOTE:__ make 100% sure that the SD card it finds is in fact the correct card.

Click continue and piFiller will write the SD card. This can take 5-25 minutes depending on your machine. Once this is done, skip down to [setting up your device](/#/pages/installing/gettingStarted-Humming.md#setting-up-your-device)

### Windows

To burn OS images to SD cards on windows, you will need to install [Win32 disk imager][win32-disk-imager]. Once you download it, you can launch win32 disk imager by clicking on the "Win32DiskImager" file in the folder that you extracted it to.

Now in Win32DiskImager, click on the folder icon to select which `.img` file you wish to burn. A file browser window will open and you will need to select your hummingBoard image from the Downloads folder. It should be the extracted version and named something like this `resin-myApp-0.1.0-0.0.14.img`.

Next insert your SD card into your computer and in the Win32DiskImager GUI, select your SD card when it appears.

__NOTE:__ Be very careful to make sure that you have selected the right SD card. Double check this!! Otherwise you could end up writing over your host machines harddisk.

Once you have made your selections and are 100% sure you are writing to your SD card and nothing else, you can click write and wait for the SD card to be burnt.

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

[deploy]:/pages/deployment/deployment.md
[projects]:/pages/examples/projects.md
[managing_devices_apps]:/pages/management/applications.md
[wifi]:/pages/deployment/wifi.md
[supported]:/pages/hardware/devices.md
[dockerfile]:/pages/deployment/dockerfile.md

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
