## Please read through this guide as it contains information you *will* need.
<br />
<font color="red">**BIG RED ALPHA WARNING: Resin.io is in alpha, and should not
be used for critical workloads. Proceed
ONLY if you are comfortable with the [caveats][caveats].**</font>
<br />

Having said that, welcome! If you're reading this, you're on board ahead of the
crowds! We're currently testing the third Alpha release.

We thank you very much for jumping in, and ask for your patience with the
inevitable roughness.

## What's here

1. [Getting ready to Resin][resin]
1. [Creating an application][app]
1. [Adding devices][devices]
1. [Preparing your code][code]
1. [Pushing to your devices][pushing]
1. [Troubleshooting][troubleshooting]
1. [Feedback & Getting Help][feedback]
1. [Caveats for Alpha releases][caveats]

## 1. Getting ready to Resin

The whole process leading up to running your first code on the device should
take about 30 - 60 minutes (note this is highly variable, depending on download
and SD card speed.)

Before you get started, you'll need these ingredients:-

* A Raspberry Pi (model B, the most common type) and USB cable to power it.
* A 4GB (or larger) SD card. Prefer class 10 if you can.
* An ethernet cable to a router that can get the Pi on the internet.
* (optional) Headphones or speakers to listen to the audio out of the Pi, for
  our demo "hello world" project.

If you've received an invitation, We’ve created an account for you under the
username mentioned in your invitation email. Visit the invitation link to set
your password and SSH key. You can log back into the application at any time by
visiting [alpha.resin.io][resin_home].

## 2. Creating an application

Once you get to your (empty) application list, you can create an application by
entering a name for it (for the moment, the name should contain alphanumeric
characters only.) This will take you to the application page.

## 3. Adding devices

1. Click the ‘download’ button on the application page. The archive is 115mb.

1. Once you download the .zip file, extract its contents into your SD card (we
assume it's FAT32 formatted, the typical factory configuration, however you
should check to ensure that your SD card is indeed formatted this way.)

1. Once you’ve got an SD card with the image, slot it into the pi, connect the
pi to the internet, and power it up. Connect the ethernet cable *first*
before powering up, otherwise the pi may not correctly connect to resin - we're
working on fixing this.

The device will now run through a number of configuration steps, including
configuring the SD card's partitions and its private key, signing
into our VPN and registering with our server. If you have a class 10 SD card and
a decent internet connection, it should appear on your app dashboard within 8
minutes at most. Class 4 SD cards can take up to 3 times longer.

You can add as many Raspberry Pis to the application as you like in the same way
using the same archive you downloaded in step 1, no need to download it again.

## 4. Preparing your code

You’ll now need to either create a new node.js project, or to clone our
**[example application][example_app]**.

#### 4.1 Basics

The apps themselves must be node.js applications, and require a `package.json`
file to be placed in the root folder of the repository.

#### 4.2 Entry point

The **entry point** is by default server.js in the root of the repo or
alternatively anything you specify in the "start" attribute of the
`package.json` file. (Slight exception: the version of nodejs is fixed to 0.10.22
for the moment regardless of what’s specified in `package.json`.)

#### 4.3 Custom OS packages

The example application also shows how to add custom packages to the raspbian
operating system inside the docker container using a preinstall script, should
you need to do that (take a look at `deps.sh` and where it's referenced in
`package.json` in the [example application][example_app] as a guide as to how to
do this.)

Using this approach, you can add any [raspbian package][raspbian_packages] you
need to your application.

## 5. Pushing to your devices

Add the git remote that’s displayed at the top right of the application page to
your local project repository, and you can then push your code to resin.io.

Running `git push resin master` will fetch all your dependencies and
cross-compile your code into a container, with log output tracking progress as
it does it.

Once the container is created, the devices will start pulling the new
image. This may take up to 10 minutes or more, depending on the network and what
you're pushing.

Any subsequent pushes will get to the device(s) in the same way. We plan to be
ship deltas of the containers in the near future, but for the moment we are
sending the entire application every time.

Welcome to resin.io. *Don't forget to have fun!* **And let us know what you
think, and what you made! :)**

## 6. Troubleshooting

If at any point you get into trouble, have a look at our small but growing
[troubleshooting guide][troubleshooting_guide].

## 7. Feedback & Getting Help!

We look forward to (and eagerly solicit) your feedback. No issue is too small,
just ping us on the feedback tab in the bottom right if we're online, or submit
an issue, and one of us will jump in ASAP to get it sorted. And if at any point
you need any help, don't hesitate to get in touch at <support@resin.io>.

## 8. Caveats for Alpha releases

This is an Alpha release, not to be used for any critical use case
whatsoever.

The primary reason we are making this available is to provide early adopters
with a preview while giving us the opportunity to learn from use cases 'in the
wild'.

The Alpha release comes with certain caveats:-

#### 8.0 Raspberry Pi & node.js

For the duration of the Alpha (and likely the Beta) we will be focusing on
node.js and the Raspberry Pi. There is nothing fundamentally limiting Resin.io
to these choices, but there are enough moving parts as it is, we want to get
those right before we try to be everything to everyone.

#### 8.1 Feedback from the device

There is very little feedback from the device when something goes wrong right
now, especially if it can't get online. While we want to implement a simple
error code communicated via an LED, it's not there yet.

Once the device is online, you can read the logs on the device page to try and
determine what's gone wrong. This will get better too.

#### 8.2 OS updates

Whenever we release new operating system versions, you may need to replace the
files on your SD card. For a no-reflashing version, please be patient until we
get to the beta.

#### 8.3 WiFi support

If you need wifi support for your application, we suggest the
[TP-Link nano router][router] that can be configured to receive WiFi signal and
provide Ethernet connectivity to your device. First-class WiFi support by means
of a WiPi or similar will be available during the beta.

#### 8.4 Reliability & Stability

As we mature the infrastructure and rapidly progress with the codebase, periods
of downtime should be expected. While we will work hard to minimise them, and
ensure we never fail for the same reason twice, we can guarantee that there
*will* be outages from time-to-time. Please use Resin.io for non-critical
projects only.

The programming conventions themselves will also change as we learn more from
real-world use cases. While we will not break backwards compatibility lightly,
we highly value a clean experience going forward and will break existing
conventions if needed.

[resin]:#1._Getting_ready_to_Resin
[app]:#2._Creating_an_application
[devices]:#3._Adding_devices
[code]:#4._Preparing_your_code
[pushing]:#5._Pushing_to_your_devices
[troubleshooting]:#6._Troubleshooting
[feedback]:#7._Feedback_&_Getting_Help!
[caveats]:#8._Caveats_for_Alpha_releases

[resin_home]:http://alpha.resin.io
[router]:http://www.amazon.com/TP-LINK-TL-WR702N-Wireless-Repeater-150Mpbs/dp/B007PTCFFW
[example_app]:https://bitbucket.org/rulemotion/resin-text2speech
[raspbian_packages]:http://www.raspberryconnect.com/raspbian-packages-list
[troubleshooting_guide]:http://resin.io/blog/troubleshooting-resin-io-applications/
