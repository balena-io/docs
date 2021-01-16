---
title: {{ $names.company.upper }} Projects
---

# Projects Built on {{ $names.company.upper }}

## Installing a Project

To install a project you will need a [{{ $names.company.lower }}][resin] account with an
application set up ready to receive code. See the
[getting started][getting-started] and [deployment][deploy] guides for details
on how to do this.

To deploy a project simply clone it and push it to your application's {{ $names.company.lower }}
endpoint. E.g. for the [Text to Speech Converter project][text2speech]:

```
git clone {{ $links.githubMain }}/text2speech.git
git remote add {{ $names.company.short }} [endpoint]
git push {{ $names.company.short }} master
```

## Projects

These are some awesome projects built using {{ $names.company.lower }} and are a lot more fully featured and complete than the code snippets.

### Digital Temperature Logger

[Repository][firebase-dtl] by [Shaun Mulligan][shaun-mulligan]

A [Firebase][firebase]-backed Digital Temperature Logger, written in Node.js, allowing you to connect
devices with multiple temperature sensors to a central cloud-based datastore.

### Audio Stock Ticker

[Repository][audio-stock-ticker-link]

This is a simple Node.js project built on {{ $names.company.lower }}. It should work on all versions of the Raspberry Pi.

The audio stock ticker will verbally announce a list of your favorite stocks every couple of minutes or hours, depending on how you configure it.

### Process and Device Health Monitor

[Repository][pm2-repo-link]

This is a simple example project for {{ $names.company.lower }} which demonstrates how to use pm2 on your device to keep a process running forever and monitor your devices health. For the full story check our [blog post][pm2-blog-link] about it.

### Cloud Synchronized Streaming Radios

[Repository][sonos-clone]

Build your own version of Sonos cloud synchronized speakers using Grooveshark, some Raspberry Pis, Node.js and {{ $names.company.lower }}. It also has an awesome frontend web app [[link][clonos-frontend]] that allows you to search and queue up songs in a playlist so that all the rooms in your house are in perfect harmony.

### resin-samba

[Repository][resin-samba] by [Aleksis Brezas][aleksis]

Sets up a samba share that you can use to send and receive files to your Raspberry Pi. You can use this project as a template to add file sharing capabilities to your projects.

### Text to Speech Converter

[Repository][text2speech]

A simple application that makes your device speak out loud.

### Occupied

[Repository][occupied] by [Craig Mulligan][craig-mulligan]

A toilet queueing app for serious poopers. Uses {{ $names.company.lower }}, firebase and twilio to notify people when the toilet is open - runs on the RPI.

### Digitiser

[Repository][digitiser] by [Shaun Mulligan][shaun-mulligan]

A Node.js project for displaying integer values from a JSON endpoint on a MAX7219 7-segment
display.

### GrovePi Humidity sensor and OLED display

[Repository][grovepi-humidity]

This python project logs humidity and temperature data to a small OLED display and the {{ $names.company.lower }} dashboard. It uses the GrovePi addon board to interface with the sensors.

### Google Coder

[Repository][coder-fork]

{{ $names.company.upper }}-enabled version of Google's excellent [Coder][coder] project which
makes it easy to develop web projects on your device.

### Hoversnap

[Repository][hoversnap]

A tool for controlling a camera using a foot switch in order to capture shots in
which people appear to be flying.

### Web Controlled Desk Lamp

[Repository][webLamp] by [Shaun Mulligan][shaun-mulligan]

Allows you to control a simple desk lamp from your browser anywhere in the world.

Warning!!! This project uses a relay to switch on and off mains power. So some level of familiarity with electronics is required.

### CCTV

[Repository][resin-cctv] by [Aleksis Brezas][aleksis]

A project which allows you to use your devices as a CCTV camera system which
hooks into [Dropbox][dropbox].

### Squeezebox Player

[Repository][resin-player] by [Praneeth Bodduluri][lifeeth]

A project which allows you to play [squeezebox][squeezebox] media through your
devices.

### Salesforce Temperature Probe

[Repository][salesforce-temp] by [Shaun Mulligan][shaun-mulligan]

Example application for interfacing with a temperature probe using
[Salesforce.com][salesforce].

### SMS to Speech

Node.js: [Repository][sms2speech] by [Alexandros Marinos][alex]
Python: [Repository][sms2speech_python] by [Nikitas Chronas][nchronas]

A simple tool which uses [Twillio][twillio] to read out incoming SMS messages. More information on [this blog post][sms2speech-blog].

### Simple Digitiser Kiosk

[Repository][digitiser-kiosk] by [Praneeth Bodduluri][lifeeth]

Displays values from a JSON endpoint on your browser in kiosk mode (based on
[this blogpost][kiosk-post].)

### Deployment guide for DockerHub images

[Repository][dockerHub] by [nghiant2710][nghiant2710]

{{ $names.company.upper }} offers you the flexibility to deploy your application from a custom Dockerfile which allows you to define your own development environment.

Freely constructing the environment gives you all the power but sometimes takes a lot of time to create a proper Dockerfile for your application. Why not save your effort by utilizing existing Docker images instead of building from scratch, {{ $names.company.lower }} allows you to use Docker image from Docker Hub which contains many repos of pre-built Docker image.

### Safe-deposit box with Two-Factor Authentication

[Repository][safebox]

A safe-deposit box that requires 2FA to open (inputting a passcode and an SMS code). Powered by a {{ $names.company.lower }} Raspberry Pi 2, and using [Authy][authy] for 2FA. More information on [this blog post][safebox-blog].

### Slack Lunchbot
[Repository][lunch-mutn] by [thibmaek][thibmaek]

A Slack bot that picks a lunch place for a team.
Written in Node.js using ES6 and Botkit to quickly assemble the bot and its responses.
Read the writeup on [our blog]({{ $links.mainSiteUrl }}/blog/planning-lunch-with-a-slackbot-on-resin-io/)

## Community Built Projects

These are just some of the awesome projects built by {{ $names.company.lower }} users.

### RPI Humidity and Temperature Logger

[Repository][rpi-sensor-logger-user] by [joscha][joscha]

This is project allows you to log humidity and temperature data from a simple sensor and stores that data in a [firebase][firebase] backend.

### SmartBin

[Repository][rpi-smartBin-user] by [faureh][faurehu]

This is a fairly complex project that uses OpenCV and python to do facial recognition of users of an office rubbish bin. It can then be used to keep track of who is not behaving well and emptying the bins when they should be. It was submitted as part of a IoT hackathon in London, called Seedhack.

### Zettajs Integration

[Repository][rpi-resin-io-zetta-user] by [zettajs][zettajs]

This is a simple demo of how one can deploy a [zetta.js][zettajs-website] project on a raspberry pi or beaglebone black using {{ $names.company.lower }}.

### Pi Miner

[Repository][rpiminer] by [Chris Continanza][csquared]

A [bitcoin][bitcoin] miner for the [Raspberry Pi][rpi].

### Cimon
[Repository][cimon] by [efwe][efwe]

A simple tool for reading temperatures from a USB-enabled thermometer. This
project is used as the backend to [efwe][efwe]'s awesome temperature
visualization at [123k.de](http://123k.de).

### Uptime Robot Dashboard
[Repository][uptime-robot-dashboard] by [secanis][secanis]

A dashboard which is visualizing the [Uptime Robot API](https://uptimerobot.com/) on a Raspberry Pi, deployed via balenaCloud.
This dashboard can be used on TVs or on monitors.

### Balena ADS-B Multi-Service Flight Tracker

[Repository][balena-ads-b] by [ketilmo][ketilmo]

Track the planes flying over your home with the help of balena, ADS-B data, a Raspberry Pi, and an affordable RTL-SDR USB dongle. You can even share your data with the community by feeding third-party flight tracking services such as FlightAware, Flightradar24, and Plane Finder. If you do, these services will reward you with free premium accounts – worth several hundred dollars/year!

<!-- ###Team Project Links -->

[text2speech]:{{ $links.githubMain }}/text2speech
[coder-fork]:{{ $links.githubMain }}/coder
[resin-player]:https://bitbucket.org/lifeeth/resin_player/
[digitiser-kiosk]:https://bitbucket.org/lifeeth/resin-kiosk
[sms2speech]:https://github.com/alexandrosm/sms2speech
[hoversnap]:{{ $links.githubMain }}/hoversnap
[digitiser]:https://github.com/shaunmulligan/digitiser
[firebase-dtl]:https://github.com/shaunmulligan/firebaseDTL
[resin-cctv]:https://github.com/abresas/resin-cctv
[salesforce-temp]:https://github.com/shaunmulligan/salesforceTemp
[occupied]:https://www.hackster.io/hobochild/occupied-507dc6
[dockerHub]:https://github.com/nghiant2710/resin-DockerHubDeploymentGuide
[resin-samba]:https://github.com/abresas/resin-samba
[webLamp]:https://github.com/shaunmulligan/webLamp
[sonos-clone]:{{ $links.githubMain }}/music-player-device
[clonos-frontend]:{{ $links.githubMain }}/music-player-web
[grovepi-humidity]:https://github.com/shaunmulligan/grovePi
[safebox]:{{ $links.githubMain }}/resin-safebox
[sms2speech_python]:{{ $links.githubPlayground }}/sms2speech_python

<!-- ###Community Project Links -->

[rpi-sensor-logger-user]:https://github.com/joscha/rpi-sensor-logger
[rpi-smartBin-user]:https://github.com/faurehu/smartBin
[rpi-resin-io-zetta-user]:https://github.com/zettajs/resin-io-zetta
[rpiminer]:https://github.com/csquared/resin-piminer
[cimon]:https://bitbucket.org/efwe/cimon
[lunch-mutn]:https://github.com/thibmaek/lunch-mutn
[uptime-robot-dashboard]:https://github.com/secanis/uptime-robot-dashboard
[balena-ads-b]:https://github.com/ketilmo/balena-ads-b

<!-- ###Code Snippets Links -->

[py-gpio]:https://github.com/nghiant2710/resin-rpi-gpio-sample-with-python
[picamera-node]:https://github.com/shaunmulligan/resin-rpi-nodejs-picamera
[picamera-py]:{{ $links.githubLabs }}/balena-rpi-python-picamera
[ADC_py]:https://github.com/shaunmulligan/resin-rpi-py-ADC
[resin-tether]:https://github.com/petrosagg/resin-tether
[example-pi-pins]:https://github.com/shaunmulligan/basic-gpio

<!-- ###Team Github name links-->

[shaun-mulligan]:https://github.com/shaunmulligan
[craig-mulligan]:https://github.com/hobochild
[aleksis]:https://github.com/abresas/
[lifeeth]:https://bitbucket.org/lifeeth/
[alex]:https://github.com/alexandrosm
[petrosagg]:https://github.com/petrosagg
[nghiant2710]:https://github.com/nghiant2710
[nchronas]:https://github.com/nchronas
[thibmaek]:https://github.com/thibmaek
[secanis]:https://github.com/secanis
[ketilmo]:https://github.com/ketilmo

<!-- ###Community Github name links -->

[efwe]:https://bitbucket.org/efwe/
[csquared]:https://github.com/csquared/
[joscha]:https://github.com/joscha/
[faurehu]:https://github.com/faurehu/
[zettajs]:https://github.com/zettajs/
[martincalsyn]: https://github.com/martincalsyn

<!-- ###Additional links -->

[resin]:{{ $links.mainSiteUrl }}/
[dropbox]:https://www.dropbox.com/
[deploy]:/deployment/deployment
[dockerfile]:/deployment/dockerfile
[rpi]:http://www.raspberrypi.org/
[firebase]:https://www.firebase.com/
[getting-started]:/installing/gettingStarted
[node]:https://nodejs.org/
[bitcoin]:https://bitcoin.org/
[gpio]:http://en.wikipedia.org/wiki/General-purpose_input/output
[pi-pins]:https://github.com/natevw/pi-pins
[salesforce]:https://www.salesforce.com
[ADC_adafruit]:http://www.adafruit.com/product/1085
[coder]:https://googlecreativelab.github.io/coder/
[bitcoin]:http://en.wikipedia.org/wiki/Bitcoin
[squeezebox]:http://www.mysqueezebox.com/index/Home
[kiosk-post]:http://blogs.wcode.org/2013/09/howto-boot-your-raspberry-pi-into-a-fullscreen-browser-kiosk/
[twillio]:https://www.twilio.com/
[zettajs-website]:http://www.zettajs.org/
[authy]:http://authy.com
[safebox-blog]:{{ $links.mainSiteUrl }}/blog/two-factor-authentication-in-the-real-world/
[sms2speech-blog]:{{ $links.blogSiteUrl }}/sms-to-speech/
[audio-stock-ticker-link]:{{ $links.githubPlayground }}/audio-stock-ticker
[pm2-blog-link]:{{ $links.blogSiteUrl }}/eternal-applications-with-pm2-and-resin-io/
[pm2-repo-link]:{{ $links.githubPlayground }}/balena-pm2-monitor
