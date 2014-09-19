# Getting Started With Resin.io

__IMPORTANT NOTE__: It's important to point out that Resin.io is at an
[alpha testing][alpha] stage - you should not rely on Resin.io for anything
evenly vaguely critical - we are making the software available early so you can
get hacking as soon as possible :-)

## What You'll Need

* A [supported device][supported].

* A 4GB or larger SD card. The [speed class][speed_class] of the card matters -
  this determines its maximum transfer rate. We strongly recommend you get hold
  of a class 10 card or above.

* An ethernet cable or [WiFi adapter][wifi] to connect your device to the
  internet.

* Some awesome ideas to hack on! If you need inspiration, check out our
  [projects][projects] page.

## Signing Up

![Signup Page](/img/screenshots/signup.png)

Enter your details on the [sign up page][signup]. There are a couple of
restrictions:-

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

## SSH Key

![Add SSH Key Filled In](/img/screenshots/add_ssh_key.png)

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

## Creating Your First Application

![Creating an Application](/img/screenshots/applications_empty.png)

The two key components you will interact with in Resin.io are *applications* and
*devices* - applications represent the code you want to run on your devices, and
devices the actual hardware itself.

You can have as many devices connected to an application as you like - when you
push code it deploys to every device that application owns.

To create your first application simply type in a name and tap create which will
take you to its dashboard:-

## Adding Your First Device

![Empty Devices Page](/img/screenshots/devices_empty.png)

This is the application dashboard where all of the devices connected to your
application will be shown along with their status and logs.

Ensure your SD card is formatted in [FAT32][fat32] ([WikiHow][wikihow] has
[instructions][wikihow_format] on how to do this) and expand the application
zip file onto it.

## Setting Up Your Device

Put the SD card into your device and wait for it to appear on the application
dashboard.

While you wait Resin.io is partitioning your SD card, installing a custom linux
environment and establishing a secure connecting with our servers.

If you have a class 10 SD card and a fast internet connection your device should
appear on the dashboard in around 10 minutes. Note that Class 4 SD cards can
take up to 3 times longer so it's well worth investing in the fastest card you
can find.

## Running Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

A good first project is our [text to speech app][example_app]. To clone it, run
the following in a terminal:-

```
git clone https://github.com/resin-io/text2speech.git
```

Next add the Resin git endpoint by running the `git remote add` command shown in
the top-right corner of the application page, e.g.:-

```
git remote add resin git@git.resin.io:joebloggs/skynet.git
```

Now you can simply run `git push resin master` and push code direct to your
device.

You'll know your code has deployed successfully from the appearance of our
friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

## Further Reading

* For more details on deploying to your devices, see the [deployment guide][deploy].

* If you need more details on managing your devices and applications, check out
  our [device and application management guide][managing_devices_apps].

## Feedback

![Feedback Page](/img/screenshots/feedback.png)

If you find any issues with the application, please click the feedback label on
the right-hand side of the page and let us know! We are always open to feedback
and respond to any issues as soon as we can.

[deploy]:/pages/deployment.md
[projects]:/pages/projects.md
[managing_devices_apps]:/pages/managingDevicesApps.md
[wifi]:/pages/wifi.md
[supported]:/pages/devices.md

[alpha]:http://en.wikipedia.org/wiki/Alpha_software#Alpha
[rpi]:http://www.raspberrypi.org/
[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:http://alpha.resin.io/signup
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[github]:http://github.com/
[github_apis]:https://developer.github.com/v3/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[login]:http://alpha.resin.io/login
[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[example_app]:https://github.com/resin-io/text2speech
