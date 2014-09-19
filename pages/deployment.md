# Deployment Guide

## Basics

In order to deploy code to your devices you must first ensure they are correctly
connected to a Resin.io application. See the
[Getting Started Guide][getting-started] for details.

Then simply add your resin endpoint to your [git][git] repository via `git
remote add resin [application endpoint]`.

Whenever you subsequently need to push code to your devices, simply run
`git push resin master`.

## Configuration

### Node Applications

Resin.io supports [node.js][node] natively using the [package.json][package]
file located in the root of the repository to determine how to build and execute
node applications.

When you push your code to your application's git endpoint the deploy server
generates a [linux container][container] specifically for the environment your
device operates in, deploys your code to it and runs `npm install` to resolve
[npm][npm] dependencies, reporting progress to your terminal as it goes.

If the build executes successfully, the container is shipped over to your device
where the supervisor runs it in place of any previously running containers,
using `npm start` to execute your code (note that if no start script is
specified, it defaults to running `node server.js`.)

### Node.js Example

A good example of this is the [text-to-speech][text-to-speech] application -
here's its `package.json` file*:-

```
{
  "name": "resin-text2speech",
  "description": "Simple resin app that uses Google's TTS endpoint",
  "repository": {
    "type": "git",
    "url": "https://github.com/resin-io/text2speech.git"
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

__Note:__ We don't specify a `start` script here which means node will default
to running `server.js`.

We execute a bash script called `deps.sh` before `npm install` tries to satisfy
the code's dependencies. Let's have a look at that:-

```
apt-get install -y alsa-utils libasound2-dev
mv sound_start /usr/bin/sound_start
```

So here we see actual bash commands that are run within the linux container on
the build server (configured such that dependencies are resolved for the target
architecture not the build server's) - this can be very useful in deploying
[non-js][non-js] code.

We use [Raspbian][raspbian] as our contained operating system, so this scripts
uses aptitude to install native packages before moving a script for our node
code to use over to `/usr/bin`. Note that the install scripts runs with root
privileges within the container.

## The Build Server

The build server is an incredibly powerful tool which cross-compiles code for
the target device on our (far more powerful) server. This gives you the ability
to compile a gnarly dependency tree which would take minutes or even hours to
build on your Raspberry Pi in seconds before even hitting the device.

<hr />

\* correct at the time of writing.

[non-js]:/pages/nonjs.md
[getting-started]:/pages/gettingStarted.md

[package]:https://www.npmjs.org/doc/package.json.html
[container]:https://wiki.archlinux.org/index.php/Linux_Containers
[npm]:https://www.npmjs.org/
[text-to-speech]:https://github.com/resin-io/text2speech
[git]:http://git-scm.com/
[node]:http://nodejs.org/
[raspbian]:http://www.raspbian.org/
