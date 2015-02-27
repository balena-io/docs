# Projects Built on Resin.io

## Installing a Project

To install a project you will need a [resin.io][resin] account with an
application set up ready to receive code. See the
[getting started][getting-started] and [deployment][deploy] guides for details
on how to do this.

To deploy a project simply clone it and push it to your application's `resin`
endpoint. E.g. for the [Text to Speech Converter project][text2speech]:-

```
git clone https://github.com/resin-io/text2speech.git
git remote add resin [endpoint]
git push resin master
```

## Code Snippets

This is just a small collection of base projects to get you started. The focus on specific functionality and are a nice base to start a project from.

### Node.js Starter Project

[Repository][simple-nodejs]

This is a simple Hello, World project for [node.js][node] designed to act as a
basis for future work. It demonstrates how to install native Linux packages and
configure your application.

### Resin-ssh

[Repository][resin-ssh] by [Shaun Mulligan][shaun-mulligan]
[Repository][resin-ssh-node] by [Craig Mulligan][craig-mulligan]

This basic resin project allows you to have local ssh access to your running container on your device. It does this by starting dropbear, a light weight ssh daemon, in a background process. There is both a node and a python demo of this, so you can get up and running fast. Please note, both of these have small webservers running in the main app, but these could be replaced by an infinite loop. This is needed because in order to ssh into a container, it has to have a long running process in it. That way docker does not close/destroy the container.

### Node.js and the RPI camera module
[Repository][picamera-node]

A basic skeleton application to get you up and running with the raspberry pi camera module using node.js

### Python and the RPI camera module
[Repository][picamera-py]

A basic skeleton application to get you up and running with the raspberry pi camera module using python.

### Analog-to-digital converter

[Repository][ADC_py] by [Shaun Mulligan][shaun-mulligan]

This is a simple project so show to read analog sensor values into the raspberry pi using python. It uses the [ADS1x15][ADC_adafruit] family of I2C analog-to-digital converters to read in analog signals between 0 and 3.3V.

### resin-tether

[Repository][resin-tether] by [petrosagg][petrosagg]

This python project allows you to share your ethernet connection to wifi. It essentially allows the raspberry pi to act as a wifi access point.

### Avahi Daemon on Raspberry Pi

[Repository][avahi-example] by [nghiant2710][nghiant2710]

This simple example demonstrates how to get the avahi daemon running on your resin.io device. From this example you will be able to access your device from `<RESIN_UUID>.local` on your local network. The `<RESIN_UUID>` is the ID shown on the resin.io device dashboard.

### Example GPIO control in node.js

[Repository][example-pi-pins] by [Shaun Mulligan][shaun-mulligan]

A simple application which demonstrates the use of the [Pi Pins][pi-pins]
library to interface with [GPIO][gpio].

### Example GPIO control in python

[Repository][py-gpio] by [nghiant2710][nghiant2710]

A simple application that shows you how to toggle the general purpose I/O pins on the raspberry pi using python.

##Projects

These are some awesome projects built using resin.io and are a lot more fully featured and complete than the code snippets.

### Digital Temperature Logger

[Repository][firebase-dtl] by [Shaun Mulligan][shaun-mulligan]

A [Firebase][firebase]-backed Digital Temperature Logger, written in node.js, allowing you to connect
devices with multiple temperature sensors to a central cloud-based datastore.

### Cloud Synchronised Streaming Radios

[Repository][sonos-clone]

Build your own version of Sonos cloud synchronised speakers using Grooveshark, some raspberry pis, node.js and resin.io. It also has an awesome frontend web app [[link][clonos-frontend]] that allows you to search and queue up songs in a playlist so that all the rooms in your house are in perfect harmony.

### resin-samba

[Repository][resin-samba] by [Aleksis Brezas][aleksis]

Sets up a samba share that you can use to send and receive files to your Raspberry Pi. You can use this project as a template to add file sharing capabilities to your projects.

### Text to Speech Converter

[Repository][text2speech]

A simple application that makes your device speak out loud.

### occupied

[Repository][occupied] by [Craig Mulligan][craig-mulligan]

A toilet queueing app for serious poopers. Uses resin.io, firebase and twilio to notify people when the toilet is open - runs on the RPI.

### Digitiser

[Repository][digitiser] by [Shaun Mulligan][shaun-mulligan]

A node.js project for displaying integer values from a JSON endpoint on a MAX7219 7-segment
display.

### GrovePi Humidity sensor and OLED display

[Repository][grovepi-humidity]

This python project logs humidity and temperature data to a small OLED display and the resin.io dashboard. It uses the GrovePi addon board to interface with the sensors.

### Google Coder

[Repository][coder-fork]

Resin.io-enabled version of Google's excellent [Coder][coder] project which
makes it easy to develop web projects on your device.

### Hoversnap

[Repository][hoversnap]

A tool for controlling a camera using a foot switch in order to capture shots in
which people appear to be flying.

### Web Controlled Desk Lamp

[Repository][webLamp] by [Shaun Mulligan][shaun-mulligan]

Allows you to control a simple desk lamp from your browser anywhere in the world.

Warning!!! This project uses a relay to switch on and off mains power. So some level of familiarity with electronics is required.

### Resin CCTV

[Repository][resin-cctv] by [Aleksis Brezas][aleksis]

A project which allows you to use your devices as a CCTV camera system which
hooks into [Dropbox][dropbox].

### Resin Player

[Repository][resin-player] by [Praneeth Bodduluri][lifeeth]

A project which allows you to play [squeezebox][squeezebox] media through your
devices.

### Salesforce Temperature Probe

[Repository][salesforce-temp] by [Shaun Mulligan][shaun-mulligan]

Example application for interfacing with a temperature probe using
[Salesforce.com][salesforce].

### SMS to Speech

[Repository][sms2speech] by [Alexandros Marinos][alex]

A simple tool which uses [Twillio][twillio] to read out incoming SMS messages.

### Simple Digitiser Kiosk

[Repository][digitiser-kiosk] by [Praneeth Bodduluri][lifeeth]

Displays values from a JSON endpoint on your browser in kiosk mode (based on
[this blogpost][kiosk-post].)

### Deployment guide for DockerHub images

[Repository][dockerHub] by [nghiant2710][nghiant2710]

Resin.io offers you the flexibility to deploy your application from a custom Dockerfile which allows you to define your own development environment.

Freely constructing the environment gives you all the power but sometimes takes a lot of time to create a proper Dockerfile for your application. Why not save your effort by utilising existing Docker images instead of building from scratch, resin.io allows you to use Docker image from Docker Hub which contains many repos of pre-built Docker image.

##Community Built Projects

These are just some of the awesome projects built by resin.io users.

###RPI Humidity and Temperature Logger

[Repository][rpi-sensor-logger-user] by [joscha][joscha]

This is project allows you to log humidity and temperature data from a simple sensor and stores that data in a [firebase][firebase] backend.

###SmartBin

[Repository][rpi-smartBin-user] by [faureh][faurehu]

This is a fairly complex project that uses OpenCV and python to do facial recognition of users of an office rubbish bin. It can then be used to keep track of who is not behaving well and emptying the bins when they should be. It was submitted as part of a IoT hackathon in London, called Seedhack. 

###Zettajs Integration

[Repository][rpi-resin-io-zetta-user] by [zettajs][zettajs]

This is a simple demo of how one can deploy a [zetta.js][zettajs-website] project on a raspberry pi or beaglebone black using resin.io.

### Pi Miner

[Repository][rpiminer] by [Chris Continanza][csquared]

A [bitcoin][bitcoin] miner for the [Raspberry Pi][rpi].

### Cimon
[Repository][cimon] by [efwe][efwe]

A simple tool for reading temperatures from a USB-enabled thermometer. This
project is used as the backend to [efwe][efwe]'s awesome temperature
visualisation at [123k.de](http://123k.de).

## Programming Language Starter Projects

Below is a list of simple 'Hello, World' projects written in a number of
different programming languages, which are designed to form the basis of your
own projects written in each language.

The projects use [Dockerfile][dockerfile]s to install packages and configure the
local environment as needed for each language. This step is performed on the
resin.io build server and the finished product is pushed to your devices.

A link is provided for each project's individual Dockerfile below for easy
customisation:-

### C♯

[Repository][hello-dotnet]

Hello World written in [C#][csharp] using a
[custom Dockerfile][csharp-dockerfile].

__NOTE:__ This project can be adapted to target any [.net][dotnet]
language.

### Java

[Repository][hello-java]

Hello World written in [Java][java] using a
[custom Dockerfile][java-dockerfile].

__NOTE:__ This project can be adapted to target any [JVM][jvm] language.

### Python

[Repository][hello-python]

Hello World written in [Python][python] using a [custom Dockerfile][python-dockerfile].

### Ruby

[Repository][hello-ruby]

Hello World written in [Ruby][ruby] using a [custom Dockerfile][ruby-dockerfile].

<!-- ###Team Project Links -->

[text2speech]:https://github.com/resin-io/text2speech
[coder-fork]:https://github.com/resin-io/coder
[resin-player]:https://bitbucket.org/lifeeth/resin_player/
[digitiser-kiosk]:https://bitbucket.org/lifeeth/resin-kiosk
[sms2speech]:https://github.com/alexandrosm/sms2speech
[hoversnap]:https://github.com/resin-io/hoversnap
[digitiser]:https://github.com/shaunmulligan/digitiser
[firebase-dtl]:https://github.com/shaunmulligan/firebaseDTL
[resin-cctv]:https://github.com/abresas/resin-cctv
[simple-nodejs]:https://github.com/resin-io/basic-resin-node-project
[salesforce-temp]:https://github.com/shaunmulligan/salesforceTemp
[resin-ssh]:https://github.com/shaunmulligan/resin-ssh
[resin-ssh-node]:https://github.com/craig-mulligan/resin-ssh-node
[occupied]:http://www.hackster.io/craig-mulligan/occupied
[dockerHub]:https://github.com/nghiant2710/resin-DockerHubDeploymentGuide
[resin-samba]:https://github.com/abresas/resin-samba
[webLamp]:https://github.com/shaunmulligan/webLamp
[sonos-clone]:https://github.com/resin-io/music-player-device
[clonos-frontend]:https://github.com/resin-io/music-player-web
[grovepi-humidity]:https://github.com/shaunmulligan/grovePi
[avahi-example]:https://github.com/nghiant2710/avahi-example


<!-- ###Community Project Links -->

[rpi-sensor-logger-user]:https://github.com/joscha/rpi-sensor-logger
[rpi-smartBin-user]:https://github.com/faurehu/smartBin
[rpi-resin-io-zetta-user]:https://github.com/zettajs/resin-io-zetta
[rpiminer]:https://github.com/csquared/resin-piminer
[cimon]:https://bitbucket.org/efwe/cimon

<!-- ###Code Snippets Links -->

[py-gpio]:https://github.com/nghiant2710/resin-rpi-gpio-sample-with-python
[picamera-node]:https://github.com/shaunmulligan/resin-rpi-nodejs-picamera
[picamera-py]:https://github.com/shaunmulligan/resin-rpi-python-picamera
[ADC_py]:https://github.com/shaunmulligan/resin-rpi-py-ADC
[resin-tether]:https://github.com/petrosagg/resin-tether
[example-pi-pins]:https://github.com/shaunmulligan/basic-gpio

<!-- ###Language Demo Projects Links  -->

[hello-dotnet]:https://github.com/nghiant2710/hello.NET
[hello-java]:https://github.com/nghiant2710/Hello-Java
[hello-python]:https://github.com/alexandrosm/hello-python
[hello-ruby]:https://github.com/nghiant2710/Hello-Ruby


[csharp-dockerfile]:https://github.com/resin-io/hello.NET/blob/master/Dockerfile
[java-dockerfile]:https://github.com/resin-io/Hello-Java/blob/master/Dockerfile
[python-dockerfile]:https://github.com/alexandrosm/hello-python/blob/master/Dockerfile
[ruby-dockerfile]:https://github.com/resin-io/Hello-Ruby/blob/master/Dockerfile

<!-- ###Team Github name links-->

[shaun-mulligan]:https://github.com/shaunmulligan
[craig-mulligan]:https://github.com/craig-mulligan
[aleksis]:https://github.com/abresas/
[lifeeth]:https://bitbucket.org/lifeeth/
[alex]:https://github.com/alexandrosm
[petrosagg]:https://github.com/petrosagg
[nghiant2710]:https://github.com/nghiant2710

<!-- ###Community Github name links -->

[efwe]:https://bitbucket.org/efwe/
[csquared]:https://github.com/csquared/
[joscha]:https://github.com/joscha/
[faurehu]:https://github.com/faurehu/
[zettajs]:https://github.com/zettajs/

<!-- ###Additional links -->

[resin]:https://resin.io
[dropbox]:https://www.dropbox.com/
[deploy]:/pages/deployment.md
[dockerfile]:/pages/dockerfile.md
[rpi]:http://www.raspberrypi.org/
[firebase]:https://www.firebase.com/
[getting-started]:/pages/gettingStarted.md
[node]:https://nodejs.org/
[bitcoin]:https://bitcoin.org/
[gpio]:http://en.wikipedia.org/wiki/General-purpose_input/output
[pi-pins]:https://github.com/natevw/pi-pins
[salesforce]:https://www.salesforce.com
[csharp]:http://msdn.microsoft.com/en-gb/vstudio/hh341490.aspx
[dotnet]:http://www.microsoft.com/net
[jvm]:http://en.wikipedia.org/wiki/Java_virtual_machine
[java]:https://www.java.com/en/
[python]:https://www.python.org/
[ruby]:https://www.ruby-lang.org/en/
[ADC_adafruit]:http://www.adafruit.com/product/1085
[coder]:https://googlecreativelab.github.io/coder/
[bitcoin]:http://en.wikipedia.org/wiki/Bitcoin
[squeezebox]:http://www.mysqueezebox.com/index/Home
[kiosk-post]:http://blogs.wcode.org/2013/09/howto-boot-your-raspberry-pi-into-a-fullscreen-browser-kiosk/
[twillio]:https://www.twilio.com/
[zettajs-website]:http://www.zettajs.org/