# Projects Built on Resin.io

## Installing a Project

See the [getting started][getting-started] and [deployment][deploy] guides for
details on setting up A Resin.io project.

To deploy a project simply clone it and push it to your application's `resin`
endpoint. E.g. for the [text to speech converter project][text2speech]:-

```
git clone https://github.com/resin-io/text2speech.git .
git remote add resin [endpoint]
git push resin master
```

## Projects

### Cimon

[Repository][cimon]

A simple tool for reading temperatures from a USB-enabled thermometer.

### Digital Temperature Logger

[Repository][firebase-dtl]

A [Firebase][firebase]-backed Digital Temperature Logger allowing you to connect
multiple devices with multiple temperature sensors to a central cloud-based
datastore.

### Digitiser

[Repository][digitiser]

A tool for displaying integer values from a JSON endpoint on a MAX7219 7-segment
display.

### Google Coder

[Repository][coder-fork]

Resin.io-enabled version of Google's excellent [Coder][coder] project which
makes it easy to develop web projects on your device.

### Hello Python

[Repository][hello-python]

A bare-bones project to get you up and running with [Python][python] on your
devices.

### Hoversnap

[Repository][hoversnap]

A tool for controlling a camera using a foot switch in order to capture shots in
which people appear to be flying.

### Pi Miner

[Repository][rpiminer]

A Bitcoin CPU miner for the [Raspberry Pi][rpi].

### Resin CCTV

[Repository][resin-cctv]

A project that lets you use your device as a CCTV camera system.

### Resin Player

[Repository][resin-player]

Lets you play [squeezebox][squeezebox] media through your devices.

### SMS to Speech

[Repository][sms2speech]

A simple tool which uses [Twillio][twillio] to read out incoming SMS messages.

### Simple Digitiser Kiosk

[Repository][digitiser-kiosk]

Displays values from a JSON endpoint on your browser in kiosk mode (based on
[this blogpost][kiosk-post].)

### Text to Speech Converter

[Repository][text2speech]

A simple application that makes your device speak out loud.

[deploy]:/pages/deployment.md

[rpi]:http://www.raspberrypi.org/
[python]:https://www.python.org/
[firebase]:https://www.firebase.com/

[getting-started]:/pages/gettingStarted.md
[text2speech]:https://github.com/resin-io/text2speech
[coder-fork]:https://github.com/resin-io/coder
[coder]:https://googlecreativelab.github.io/coder/
[rpiminer]:https://github.com/csquared/resin-piminer
[bitcoin]:http://en.wikipedia.org/wiki/Bitcoin
[resin-player]:https://bitbucket.org/lifeeth/resin_player/
[squeezebox]:http://www.mysqueezebox.com/index/Home
[cimon]:https://bitbucket.org/efwe/cimon
[digitiser-kiosk]:https://bitbucket.org/lifeeth/resin-kiosk
[kiosk-post]:http://blogs.wcode.org/2013/09/howto-boot-your-raspberry-pi-into-a-fullscreen-browser-kiosk/
[sms2speech]:https://github.com/alexandrosm/sms2speech
[twillio]:https://www.twilio.com/
[hoversnap]:https://github.com/resin-io/hoversnap
[digitiser]:https://github.com/shaunmulligan/digitiser
[firebase-dtl]:https://github.com/shaunmulligan/firebaseDTL
[hello-python]:https://github.com/alexandrosm/hello-python
[resin-cctv]:https://github.com/abresas/resin-cctv
