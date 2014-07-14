# Deployment Guide

## Basics

In order to deploy code to your devices you must first ensure they are correctly connected to a Resin.io application. See the [getting started guide](/pages/gettingStarted.md) for details.

Then either create a git repository for your code via:-

```
git init
git remote add resin [application endpoint]
```

Or if the code is in an existing repository:-

```
git remote add resin [application endpoint]
git push resin master
```

Whenever you subsequently need to push code to your devices, simply run
`git push resin master`.

## Configuring the Build and Deploy

Resin.io defaults to assuming you will be using node.js, and uses [package.json](https://www.npmjs.org/doc/package.json.html) to determine how to build and execute the code.

When you push your code to your application's git endpoint the deploy server generates a [linux container](https://wiki.archlinux.org/index.php/Linux_Containers) specifically for the environment your device operates in, pulls your code into it, runs `npm install` which runs any specified pre-install scripts in this environment followed by any specified [npm](https://www.npmjs.org/) dependencies, reporting progress to your terminal as it goes.

If the build executes successfully, the container is shipped over to your device where the supervisor runs it in place of any previously running containers, using `npm start` to execute your code (note that if no start script is specified, it defaults to running `node server.js`.)

## An Instructive Example

A good example application to see this in action is our [text-to-speech example app](https://bitbucket.org/rulemotion/resin-text2speech/src).

Let's take a look at its `package.json` file (correct at the time of writing):-

```
{
  "name": "resin-text2speech",
  "description": "Simple resin app that uses Google's TTS endpoint",
  "repository": {
    "type": "git",
    "url": "https://petrosagg@bitbucket.org/rulemotion/resin-text2speech.git"
  },
  "scripts": {
    "preinstall": "bash deps.sh"
  },
  "version": "0.0.3",
  "dependencies": {
    "speaker": "~0.0.10",
    "request": "~2.22.0",
    "lame": "~1.0.2"
  },
  "engines": {
      "node": "0.10.22"
  }
}
```

Note that here we don't specify a start script, meaning we want `server.js` to run. Usually you will want to specifically add this to make it clear that you want particular code to run on startup.

The next thing to note is that we execute a bash script called `deps.sh` before `npm install` tries to satisfy the code's dependencies. Let's have a look at that:-

```
apt-get install -y alsa-utils libasound2-dev
mv sound_start /usr/bin/sound_start
```

So here we see actual bash commands that are run within the linux container on the build server (configured such that dependencies are resolved for the target architecture not the build server's.)

At the time of writing we use Raspbian as our contained operating system so we use aptitude to install required native packages, and copy a script our node code uses to `/usr/bin` (the install scripts runs with root privileges - in the container ;)

## The Build Server

A quick word on the build server - it's an incredibly powerful tool, configured for your convenience to cross-compile code for the target device on our far more powerful server. This means that if you need to compile some gnarly dependency that could take minutes to hours to build on your Raspberry Pi, it can instead be built in seconds on our server before even hitting the device.

The server is entirely transparent to you other than the feedback you receive from `git push`. We simply accelerate the building of your applications without you having to think about it at all!

## Native Code

__NOTE:__ We plan to improve the means by which we expose this functionality,
however while we are in alpha you will need to use the node.js `package.json`
configuration file to specify how your native code installs and executes.

It is possible to deploy native code by simply adapting the `package.json` file
in your repo to build and execute a native program on pre-install and startup,
respectively, e.g.:-

```
{
  "name": "some-native-app",
  "scripts": {
    "preinstall": "bash deps.sh",
    "start": "./native_code"
  }
}
```

Where you can run arbitrary commands in `deps.sh` (or run whatever you like.)

The default base image we use is [raspbian][raspbian], so see their
documentation to determine available packages, default paths for things, etc.

### Kernel Modules

A nice consequence of this flexibility is the capacity to load kernel modules
into your device - once you have either built code into a kernel module or
installed via a package that doesn't [insmod/modprobe][modprobe] automatically,
you can install a module by simply executing the appropriate command prior to
starting your application, e.g. in `package.json`:-

```
...
"start": "insmod kernel_module.ko && ./start_app"
...
```

[raspbian]:http://www.raspbian.org/
[modprobe]:http://en.wikipedia.org/wiki/Modprobe
