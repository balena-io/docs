# Getting Started With Resin.io

__IMPORTANT NOTE__: It's important to point out that Resin.io is at an
[alpha testing][alpha] stage - you should not rely on Resin.io for anything
important in any way, shape or form - we are making the software available for
your testing so you can get hacking as soon as possible :)

## What You'll Need

* A [Raspberry Pi][rpi], we assume you have the most recent model B, if you
  bought one even somewhat recently, this is the model you'll own.

* A 4GB or larger SD card. The *class* of the card matters - this determines how
  fast it is and we strongly recommend you get hold of a card in
  [speed class][speed_class] 10 or above. You will also need some means of
  writing to the card on your computer, most modern laptops have SD card readers
  built-in, otherwise you can buy an SD card reader very cheaply.

* An ethernet cable to connect your Raspberry Pi to the internet.

* Some awesome ideas to hack on (this component is key :)

## Signing Up

![Signup Page](/img/screenshots/signup.png)

If you've received an invite, click the link, enter your password and skip down
to the [SSH key section](#SSH_Key) below. If not, you'll need to enter your
details on the [sign up page][signup].

Note a couple of restrictions:-

* The username can only contain letters and numbers.
* The password has to be at least 8 characters long.

## SSH Key

![Add SSH Key Filled In](/img/screenshots/add_ssh_key.png)

In order to secure your [git][git] connection to Resin.io, we need your *public*
[SSH Key][ssh_key].

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure
your connection when pushing your code to us.

Once generated it's very convenient to use these in fact you generally don't
have to think about it, just `git push` your code to us and it's taken care of
automatically.

We recommend you take a look at [Github][github]'s
[excellent documentation][github_ssh] on generating an SSH key pair for your
platform.

Additionally we provide an awesome tool for importing your public SSH key from
github should you already have one set up over there - just click on the octocat
in the bottom right-hand corner to do this ([we blogged][github_ssh_blogpost]
about *how* we can do this, in case you were wondering :)

## Creating Your First Application

![Creating an Application](/img/screenshots/applications_empty.png)

The two key components of your Resin.io account are applications and
of course, devices.

Applications represent the code you want to run on your devices, and each
application can have as many devices connected to it as you like - this means
you can push code to your application and it will deploy to every device that
application owns, in a single step.

To create your first application simply type in a name and tap create which will
take you to your application's dashboard:-

## Adding Your First Device

![Empty Devices Page](/img/screenshots/devices_empty.png)

This is the application dashboard, where all devices connected to your
application will be listed.

Let's connect our first device - get your SD card ready, and click 'Download Zip
File'.

While it's downloading, pop the SD card into your computer and make sure it's
formatted to [FAT32][fat32] - there are good [instructions][wikihow_format] on
how to do this on whatever platform you happen to use over at [wikihow][wikihow].

## Setting Up Your Raspberry Pi

![raspberry pi](/img/rpi.png)

Once the zip file is downloaded, simply unzip it onto your SD card (no dd-ing or
partitioning required.)

Now - very importantly - plug the ethernet cable into your Pi *before* inserting
the SD card. This is a rough edge we hope to fix soon, but we know that
sometimes you can have issues connecting to the internet if you don't do things
in this order.

Next power up your device and wait for it to appear on the application dashboard
automagically.

While your wait, Resin.io is partitioning the SD card, installing our customised
linux distribution and securely connecting to our servers.

 If you have a class 10 SD card and a decent internet connection, it should
appear on your app dashboard within 8 minutes at most. Class 4 SD cards can take
up to 3 times longer, again it's worth investing in the fastest cards you can
find!

## Putting Code On Your Device

![git pushing](/img/screenshots/git_pushing.png)

A good first project to test out your device with is our demo
[text to speech app][example_app].

To clone it, run the following in a terminal:-

```
git clone https://bitbucket.org/rulemotion/resin-text2speech.git
```

Next copy the git endpoint address from the top right-hand corner of the
application page (the button to the right of this will do this for you
automatically) into a terminal and add the 'resin' remote endpoint (i.e. make it
available to push code to.)

Once you've done this, you can push code to your device and it will run on your
device. Yes, it really is as easy as that! E.g.:-

```
git remote add resin git@git.resin.io:joebloggs/skynet.git
git push resin master
```

You will know your code has deployed successfully from the appearance of our
friendly unicorn mascot:-

![git pushing](/img/screenshots/git_pushed.png)

You can get an idea of how you need to configure your own code for deployment by
examining this example project's `package.json` file, especially the pre-install
script which runs `deps.sh` to install any native dependencies. We are working
on more detailed documentation for this process.

At this point you know all you need to know to get hacking! __Have Fun :)__

If you want more details on managing your devices and applications, check out
our [documentation on this][managing_devices_apps].

## Feedback

![Feedback Page](/img/screenshots/feedback.png)

If you find any issues with the application, please click the feedback label on
the right-hand side of the page and let us know! We are always open to feedback
and endeavour to respond to any issues as soon as we can.

## Please Come Again

![Login Page](/img/screenshots/login.png)

[Log back in again][login] to gain access to your account from anywhere. We hope
to see you soon :)

[alpha]:http://en.wikipedia.org/wiki/Alpha_software#Alpha
[rpi]:http://www.raspberrypi.org/
[speed_class]:http://en.wikipedia.org/wiki/Sd_card#Speed_class_rating
[signup]:http://alpha.resin.io/signup
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[github]:http://github.com/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[login]:http://alpha.resin.io/login
[wikihow_format]:http://www.wikihow.com/Format-an-SD-Card
[wikihow]:http://www.wikihow.com/Main-Page
[fat32]:http://en.wikipedia.org/wiki/Fat32#FAT32
[example_app]:https://bitbucket.org/rulemotion/resin-text2speech
[managing_devices_apps]:/pages/managingDevicesApps.md
