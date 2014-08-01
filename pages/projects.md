# Resin.io Projects

## Installing a Project

To set up an existing project, first set up a [Resin.io account](http://alpha.resin.io/signup), create an application and associate your device with the application.

Next, clone the project into a new folder, add the application's git remote to associate the code with your application, and push it.

For a more detailed general guide to setting up see the
[getting started guide][getting-started]. For more detailed instructions on deployment, see the [deployment guide][deploy].

E.g. for the text-to-speech converter:-

```
git clone https://github.com/resin-io/text2speech.git
cd resin-text2speech
git remote add resin [git endpoint]
git push resin master
```

## Resin.io Projects

Below is a list of known Resin.io-enabled projects.

By using the [deployment guide][deploy] it's easy to adapt pretty well any
Raspberry Pi Project to work correctly with Resin.io, so don't feel you can't
hack on a Raspberry Pi project simply because it isn't listed here, these are
simply projects which are *pre-*Resin.io supercharged :)

### Built for Resin.io

* [Text-to-Speech Converter][text2speech] - A simple project for getting the
  Raspberry Pi to say text you give it out loud.
* [Resin.io Pi Miner][rpiminer] - A Bitcoin CPU miner for [Raspberry Pi][rpi].
* [Cimon][cimon] - A simple tool for reading temperatures from a USB-enabled
  thermometer.
* [Simple Digitiser Kiosk][digitiser-kiosk] - Displays values from a JSON
  endpoint on your browser in kiosk mode (based on [this blogpost][kiosk-post].)
* [SMS 2 Speech][sms2speech] - A simple tool which uses [Twillio][twillio] to
  read out incoming SMS messages.
* [Hoversnap][hoversnap] - A tool for controlling a camera via a flood switch in
  order to capture awesome jumping shots where the subjects appear to be flying :)
* [Blink ACT LED][blink-led] and [Simple Demo][simple-demo] - Simple
  demonstrations which blink the ACT[ivity] LED on the Raspberry Pi.
* [Digitiser][digitiser] - A tool for displaying integer values from a JSON
  endpoint on a MAX7219 7-segment display.
* [Facerate][facerate] - An (incomplete :) tool for using a USB webcam connected
  to a Pi to recognise faces and count them.
* [FirebaseDTL][firebase-dtl] - A firebased Digital Temperature Logger, allowing
  you to connect multiple RPis with multiple temperature sensors to a central
  cloudbased datastore.
* [Hello Python!][hello-python] - A bare-bones [Python][python] project to get
  you up and running with a Python project.

### Extended to be Resin.io-Enabled

* [Google Coder][coder-fork] - Resin.io-enabled version of Google's excellent
  [Coder][coder] project which makes it easy to develop web projects on the
  Raspberry Pi.
* [tty.js][ttyjs-fork] - Resin.io-enabled version of [tty.js][ttyjs] - a
  terminal in your browser! Useful for interacting with hardware on your device
  (particularly GPIO) we actually plan to integrate this into the dashboard
  soon.
* [Resin Player][resin-player] - Lets you play [squeezebox][squeezebox] media
  through your Raspberry Pis.

[deploy]:/pages/deployment.md

[rpi]:http://www.raspberrypi.org/
[python]:https://www.python.org/

[getting-started]:/pages/gettingStarted.md
[text2speech]:https://github.com/resin-io/text2speech
[coder-fork]:https://github.com/resin-io/coder
[coder]:http://googlecreativelab.github.io/coder/
[ttyjs-fork]:https://github.com/resin-io/tty.js-resin
[ttyjs]:https://github.com/chjj/tty.js/
[rpiminer]:https://github.com/csquared/resin-piminer
[bitcoin]:http://en.wikipedia.org/wiki/Bitcoin
[resin-player]:https://bitbucket.org/lifeeth/resin_player/
[squeezebox]:http://www.mysqueezebox.com/index/Home
[cimon]:https://bitbucket.org/efwe/cimon
[digitiser-kiosk]:https://bitbucket.org/lifeeth/resin-kiosk
[kiosk-post]:http://blogs.wcode.org/2013/09/howto-boot-your-raspberry-pi-into-a-fullscreen-browser-kiosk/
[sms2speech]:https://github.com/alexandrosm/sms2speech
[twillio]:http://www.twilio.com/
[hoversnap]:https://github.com/resin-io/hoversnap
[blink-led]:https://github.com/csquared/resin-blink-act-led
[simple-demo]:https://github.com/csquared/resin-simple-demo
[digitiser]:http://github.com/lorenzo-stoakes/digitiser
[facerate]:https://github.com/lorenzo-stoakes/facerate
[firebase-dtl]:https://github.com/shaunmulligan/firebaseDTL
[hello-python]:https://github.com/alexandrosm/hello-python
