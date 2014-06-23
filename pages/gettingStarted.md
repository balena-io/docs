####Please read through this guide as it contains information you *will* need.

<font color="red">**BIG RED ALPHA WARNING: Resin.io is in alpha, and should not be used for critical workloads. <a href="#alpha">Proceed ONLY if you are comfortable with the caveats.</a>**</font>

Having said that, welcome! If you're reading this, you're on board ahead of the crowds! We're currently testing the third Alpha release.

We thank you very much for jumping in, and ask for your patience with the inevitable rroughness.

##What's here

1. <a href="#1._Getting_ready_to_Resin">Getting ready to Resin</a>
1. <a href="#2._Creating_an_application">Creating an application</a>
1. <a href="#3._Adding_devices">Adding devices</a>
1. <a href="#4._Preparing_your_code">Preparing your code</a>
1. <a href="#5._Pushing_to_your_devices">Pushing to your devices</a>
1. <a href="#6._Troubleshooting">Troubleshooting</a>
1. <a href="#7._Feedback_&_Getting_Help!">Feedback & Getting Help</a>
1. <a href="#8._Caveats_for_Alpha_releases">Caveats for Alpha releases</a>


##1. Getting ready to Resin

The whole process up to first code running on the device should take about 30 - 60 minutes (but is highly variable on download and SD card speed).

Before you get started, you'll need these ingredients:

* A Raspberry Pi (model B, the most common type) and USB cable to power it.
* A 4GB (or larger) SD card. Prefer class 10 if you can.
* An ethernet cable to a router that can get the Pi on the internet.
* (optional) Headphones or speakers to listen to the audio out of the Pi, for our demo "hello world" project.

We’ve created an account for you under the username mentioned in your invitation email, visit the invitation link to set a password and then your ssh key. You can log back into the application at any time by visiting [alpha.resin.io](alpha.resin.io)

##2. Creating an application

Once you get to your (empty) application list, you can create an application by entering a name for it. For the moment the name should be alphanumeric characters only. This will take into the application page.

##3. Adding devices

1. Press the ‘download’ button on the application page. The archive is 115mb.

1. Once you download the .zip file, extract its contents into your SD card (which we assume is FAT32 formatted, like SD cards are when they come out of the factory).

1. Once you’ve got an SD card with the image, slot it into the pi, connect the pi to the internet, and power it up. (first connect the ethernet cable, then power up, otherwise bad things may happen).

The device will now run through a number of configuration steps, including shaping the partitions on the SD card, generating its own private key, signing into our VPN and registering with our server. If you have a class 10 SD card and a decent internet connection, it should appear on your app dashboard within 8 minutes at most. class 4 SD cards can take upto 3 times longer.

You can add as many Raspberry Pi to the application as you like in the same way, using the same archive you downloaded in step 1, no need to download again.

##4. Preparing your code

You’ll now need to either create a new node.js project, or to clone our **[example application](https://bitbucket.org/rulemotion/resin-text2speech)**.

####4.1 Basics
The apps themselves must be node.js applications, and require a package.json file to exist.

####4.2 Entry point

The **entry point** is by default server.js in the root, or alternatively, anything you specify in the "start" attribute of the package.json file. Slight exception: the version of nodejs is fixed to 0.10.22 for the moment regardless of what’s specified in package.json.

####4.3 Custom OS packages

The example application also shows how to **add custom packages** to the raspbian operating system inside the docker container, currently using a preinstall script, should you need to do that. (hint: look in the deps.sh file). You can add any **[raspbian package](http://www.raspberryconnect.com/raspbian-packages-list)** you need to your application.

##5. Pushing to your devices

Add the git remote that’s displayed at the top right of the application page to your local project repository, and you can then push your code to resin.io.

Running `git push resin master` will fetch all your dependencies and cross-compile your code into a container, showing you logs while doing it. Once the container is created, the devices will start pulling the new image. This may take up to 10 minutes, or more, depending on the network and what you're pushing.

Any subsequent pushes will get to the device(s) in the same way. We plan to be shipping deltas of the containers in the near future, but for the moment we are sending the entire application every time.

Welcome to resin.io. *Don't forget to have fun!* **And let us know what you think, and what you made!**

##6. Troubleshooting

If at any point you get into trouble, have a look at our small but growing [troubleshooting guide](http://resin.io/blog/troubleshooting-resin-io-applications/).

##7. Feedback & Getting Help!

We look forward to (and eagerly solicit) your feedback. No issue is too small, just ping us on the feedback tab in the bottom right if we're online, or submit an issue, and one of us will jump in ASAP to get it sorted. And if at any point you need any help, don't hesitate to get in touch at support@resin.io

##8. Caveats for Alpha releases

This is an Alpha release, not to be applied to any critical use case whatsoever. The sole purpose of making this available is giving early adopters a preview, and learning from use in the wild. The Alpha release comes with certain caveats:

####8.0 Raspberry Pi & node.js

For the duration of the Alpha (and likely the Beta) we will be focusing on node.js and the Raspberry Pi. There is nothing fundamentally limiting Resin.io to these choices, but there are enough moving parts as it is, we want to get those right before we try to be everything to everyone.

####8.1 Feedback from the device

There is very little feedback from the device when something goes wrong right now, especially if it can't get online. While we want to implement a simple error code communicated via an LED, it's not there yet. Once the device is online, you can read the logs on the device page to try and determine what's going wrong. That will get better too.

####8.2 OS updates

Whenever we release new operating system versions, you may need to replace the files on your SD card. For a no-reflashing version, please be patient until we get to the beta.

####8.3 WiFi support

If you need wifi support for your application, we suggest the [TP-Link nano router](http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW) that can be configured to receive WiFi signal and provide Ethernet connectivity to your device. First-class WiFi support by means of a WiPi or similar, will be released during the beta.

####8.4 Reliability & Stability

As we mature the infrastructure and rapidly progress with the codebase, periods of downtime should be expected. While we will work hard to minimise them, and ensure we never fail for the same reason twice, we can guarantee that there will be outages. Please use Resin.io for non-critical projects only.

The programming conventions themselves will also change as we learn more from real-world use cases. While we will not break backwards compatibility lightly, we highly value a clean experience going forward and will break existing conventions if needed.
