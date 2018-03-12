---
title: Define a container
excerpt: Use Dockerfiles to package your resin.io services and their dependencies
---

# Define a container

Resin.io uses [Docker][docker] containers to manage applications. You can use one or more containers to package your services with whichever environments and tools they need to run.

To ensure a service has everything it needs, you'll want to create a list of instructions for building a [container image][docker-images-containers]. Whether the build process is done [on your device][local-mode], [on your workstation][local-build], or on the [resin.io builders][builders], the end result is a read-only image that ends up on your device. This image is used by the container engine (balena or Docker, depending on the resinOS version) to kick off a running container.

## Dockerfiles

The instructions for building a container image are written in a [Dockerfile][dockerfile] - this is similar to a `Makefile` in that it contains a recipe or set of instructions to build our container.

The syntax of Dockerfiles is fairly simple - at core there are 2 valid entries in a Dockerfile - comments, prepended with `#` as in script files, and instructions of the format `INSTRUCTION arguments`.

Typically you will only need to use 4 instructions - [FROM][from], [RUN][run] and [ADD][add] or [COPY][copy]:-

* [FROM][from] __has__ to be the first instruction in any valid `Dockerfile` and defines the base image to use as the basis for the container you're building.

* [RUN][run] simply executes commands in the container - this can be of the format of a single line to execute, e.g. `RUN apt-get -y update` which will be run via `/bin/sh -c`, or `[ "executable", "param1", "param2", ... ]` which is executed directly.

* [ADD][add] copies files from the current directory into the container, e.g. `ADD <src> <dest>`. Note that if `<dest>` doesn't exist, it will be created for you, e.g. if you specify a folder. It also allows the <src> to be a url, and if the <src> is a recognised compression format, it will unpack it for you.

* [COPY][copy] is very similar to [ADD][add], but without the compression and url functionality. According to [docker best practise][docker-best-practise] you should always use [COPY][copy] unless the auto-extraction capability of [ADD][add] is needed.

* [CMD][cmd] this command provides defaults for an executing container. This command will be run when the container starts up on your device, where as RUN commands will be executed on our build servers. In a resin.io application, this is typically used to execute a start script or entrypoint for the users application. [CMD][cmd] should always be the last command in your Dockerfile. The only processes that will be running inside the container is the [CMD][cmd] command, and all processes that it spawns.

For details on other instructions, consult the official [Dockerfile documentation][dockerfile].

### Using Dockerfiles with resin.io

To deploy a single-container application to resin.io, simply place a `Dockerfile` at the root of your repository. A `docker-compose.yml` file will be automatically generated, ensuring your container has host networking, is privileged, and has `lib/modules`, `/lib/firmware`, and `/run/dbus` bind mounted into the container. The default `docker-compose.yml` will look something like this:

```
version: '2.1'
networks: {}
volumes:
  resin-data: {}
services:
  service1:
    build:
      context: .
    privileged: true
    restart: always
    network_mode: host
    volumes:
      - 'resin-data:/data'
    labels:
      io.resin.features.kernel-modules: '1'
      io.resin.features.firmware: '1'
      io.resin.features.dbus: '1'
      io.resin.features.supervisor-api: '1'
      io.resin.features.resin-api: '1'
      io.resin.update.strategy: download-then-kill
      io.resin.update.handover-timeout: ''
```

Applications with multiple containers should include a `Dockerfile` or `package.json` in each service directory. A `docker-compose.yml` file will need to be defined at the root of the repository, as discussed in our [multicontainer documentation][multicontainer].

You can also include a `.dockerignore` file with your project if you wish the builder to ignore certain files.

__NOTE:__ You *don't* need to worry about ignoring `.git` as the builders already do this by default.  

### Example Dockerfile

Let's take a look at an example `Dockerfile`. This comes from the [Hello Python][hello-python] project and executes a simple Hello World Python project:-

```Dockerfile
FROM resin/rpi-raspbian:wheezy-2015-01-15

# Install Python.
RUN apt-get update && apt-get install -y python

COPY . /app

CMD ["python", "/app/hello.py"]
```

Let's take a look at what's going on here, line-by-line:-

```Dockerfile
FROM resin/rpi-raspbian:wheezy-2015-01-15
```

Here we use the resin.io Raspberry Pi [Raspbian][raspbian] image as our base Docker image.

```Dockerfile
# Install Python.
RUN apt-get update && apt-get install -y python
```

Next we update Raspbian's packages and install Python (using the `-y` switch to prevent any
prompts on the build server.)

__NOTE:__ All the commands in Docker RUN are executed on our build servers in a virtual qemu ARM device, so be careful not to run commands that require user intervention or try to access IO, because these will cause the build to hang and you won't get a lovely container pushed to your devices.

```Dockerfile
COPY . /app
```

Now we need to get the files in our repository. This command *recursively* copies all the files in the local directory (on the build server this will be the files in the repository) into a new directory in the container, `/app`. This could also be done using ADD, but COPY is recommended by the folks over at docker.

```Dockerfile
CMD ["python", "/app/hello.py"]
```

And finally we need to actually make our container do something great, so we do that by telling python to run our awesome hello.py script, which it can find at "/app/hello.py" because it was kindly placed there by the COPY command.

### Dockerfiles for other programming languages

There are a number of example Dockerfiles available for different languages listed on the [projects page][starter-projects].

## Dockerfile templates

One of the goals of resin.io is code portability and ease of use, so you can easily manage and deploy a whole fleet of different devices. This is why Docker containers were such a natural choice. However, there are cases where Dockerfiles fall short and can't easily target multiple different device architectures.

To allow our builders to build containers for multiple architectures from one code repository, we implemented simple Dockerfile templates.

It is now possible to define a `Dockerfile.template` file that looks like this:
```Dockerfile
FROM resin/%%RESIN_MACHINE_NAME%%-node

COPY package.json /package.json
RUN npm install

COPY src/ /usr/src/app
CMD ["node", "/usr/src/app/main.js"]
```
This template will build and deploy a node.js project for any of the devices supported by resin.io, regardless of whether the device architecture is [ARM][ARM-link] or [x86][x86-link].
In this example you can see the build variable `%%RESIN_MACHINE_NAME%%` this will be replaced by the machine name (i.e.: raspberrypi) at build time. See below for a list of machine names.

 The machine name is inferred from what "device type" application you are pushing to. So if the resin remote you are pushing to is associated to an Intel Edison application, the machine name will be `edison` and an `i386` architecture base image will be built.

__Warning:__ One caveat to this is that you need to ensure that your dependencies and node.js modules are also multi-architecture, otherwise you will have a bad time.

Currently our builder supports the following build variables.

| Variable Name        | Description          |
| ------------- |:-------------:|
| RESIN_ARCH    | This is the CPU architecture of the fleet. This is defined when you select a device type in the dashboard while creating an application.|
| RESIN_MACHINE_NAME    | This is the name of the yocto machine this board is base on. It is the name that you will see in most of the resin Docker Hubbase images.  This name helps us identify a specific [BSP](https://en.wikipedia.org/wiki/Board_support_package). |   

If you want to see an example in action, you can have a look at this [basic openssh example](https://github.com/shaunmulligan/resin-openssh).

Each of these build variables can evaluate to specific boards on our build servers, below is a non-exhaustive list some of these.

| Device Name | RESIN_ARCH | RESIN_MACHINE_NAME | Docker Hub | Notes |
|---|:---:|:---:|:---:|:---:|
|Raspberry Pi (A,B, A+, B+)| rpi | raspberrypi | [resin/rpi-raspbian](https://hub.docker.com/r/resin/rpi-raspbian/),  [resin/raspberrypi-python](https://hub.docker.com/r/resin/raspberrypi-python/), [resin/raspberrypi-node](https://hub.docker.com/r/resin/raspberrypi-node/) | There is **NO** `RESIN_ARCH` = armv6. For legacy reasons this is called `rpi` instead.|
|Raspberry Pi 2|armv7hf|raspberrypi2|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/raspberrypi2-debian](https://hub.docker.com/r/resin/raspberrypi2-debian/),  [resin/raspberrypi2-python](https://hub.docker.com/r/resin/raspberrypi2-python/), [resin/raspberrypi2-node](https://hub.docker.com/r/resin/raspberrypi2-node/)|It is also possible to push `rpi` architecture containers to the raspberry pi 2, so all the images from the entry above will also work on fleets of this type.|
|Raspberry Pi 3|armv8hf|raspberrypi3|[resin/raspberrypi3-debian](https://hub.docker.com/r/resin/raspberrypi3-debian/),  [resin/raspberrypi3-python](https://hub.docker.com/r/resin/raspberrypi3-python/), [resin/raspberrypi3-node](https://hub.docker.com/r/resin/raspberrypi3-node/)||
|Beaglebone (Black or Green)|armv7hf|beaglebone|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/beaglebone-debian](https://hub.docker.com/r/resin/beaglebone-debian/), [resin/beaglebone-python](https://hub.docker.com/r/resin/beaglebone-python/), [resin/beaglebone-node](https://hub.docker.com/r/resin/beaglebone-node/)|The pure armv7hf-debian images don't have board specific firmware added into them. |
|Intel Edison|i386|edison|[resin/i386-debian](https://hub.docker.com/r/resin/i386-debian/), [resin/edison-debian](https://hub.docker.com/r/resin/edison-debian/), [resin/edison-python](https://hub.docker.com/r/resin/edison-python/), [resin/edison-node](https://hub.docker.com/r/resin/edison-node/)| All the `resin/edison-*` images have the [libmraa](https://github.com/intel-iot-devkit/mraa) installed.|
|Intel NUC|amd64|nuc|[resin/amd64-debian](https://hub.docker.com/r/resin/amd64-debian/), [resin/nuc-debian](https://hub.docker.com/r/resin/nuc-debian/), [resin/nuc-python](https://hub.docker.com/r/resin/nuc-python/), [resin/nuc-node](https://hub.docker.com/r/resin/nuc-node/)||
|Humming Board|armv7hf|cubox-i|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/cubox-i-debian](https://hub.docker.com/r/resin/cubox-i-debian/), [resin/cubox-i-python](https://hub.docker.com/r/resin/cubox-i-python/), [resin/cubox-i-node](https://hub.docker.com/r/resin/cubox-i-node/)||
|Parallela Board|armv7hf|parallella-hdmi-resin|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/parallella-hdmi-resin-debian](https://hub.docker.com/r/resin/parallella-hdmi-resin-debian/), [resin/parallella-hdmi-resin-python](https://hub.docker.com/r/resin/parallella-hdmi-resin-python/), [resin/parallella-hdmi-resin-node](https://hub.docker.com/r/resin/parallella-hdmi-resin-node/)|| |

## Init system

### Enable the init system

Whatever you define as `CMD` in your `Dockerfile` will be PID 1 of the process tree in your container. It also means that this PID 1 process needs to know how to properly process UNIX signals, reap orphan zombie processes [[1]](https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/) and if it crashes, your whole container crashes, meaning you lose logs and debug info.

For these reasons we have built an [init system][init-system-link] into most of the resin base images listed here: [Resin Base Images Wiki][base-image-wiki-link]. The init system will handle signals, reap zombies and also properly handle [udev][udev-link] hardware events correctly.

There are two ways of enabling the init system in your application. You add can the following environment variable in your Dockerfile:
```Dockerfile
# enable container init system.
ENV INITSYSTEM on
```

You can also enable the init system from the dashboard: navigate to the `Service variables` menu item on the left and add `INITSYSTEM` with a value of `on`.
![Enable init system](/img/common/app/app_initsystem_envvar.png)

Once you have enabled your init system you should see something like this in your device logs:
![init system enabled in logs](/img/common/device/device_logs_initsystem_enabled.png)

You shouldn't need to make any adjustments to your code or `CMD`—it should just work out of the box. Note that if you are using our Debian or Fedora based images, then you should have [systemd][systemd-link] in your containers, whereas if you use one of our Alpine images you will have [OpenRC][openrc-link] as your init system.

### Setting up a systemd service

In some cases its useful to set up a service that starts up when your container starts. To do this with systemd, make sure you have the init system enabled in your container as mentioned above. You can then create a basic service file in your code repository called `my_service.service` and add something like this:
```
[Unit]
Description=My Super Sweet Service

[Service]
EnvironmentFile=/etc/docker.env
Type=OneShot
ExecStart=/etc/init.d/my_super_sweet_service

[Install]
WantedBy=basic.target
```
Then by adding the following to your Dockerfile your service should be added/enabled on startup:
```Dockerfile
ENV INITSYSTEM on
COPY my_service.service /etc/systemd/system/my_service.service
RUN systemctl enable /etc/systemd/system/my_service.service
```
Check out https://www.freedesktop.org/software/systemd/man/systemd.service.html#Options if you need a different service type (OneShot is for services that exit once they're finished starting, e.g. daemons).


## Node applications

Resin.io supports [node.js][node] natively using the [package.json][package]
file located in the root of the repository to determine how to build and execute
node applications.

When you push your code to your application's git endpoint the deploy server
generates a [container][container] for the environment your device operates in,
deploys your code to it and runs `npm install` to resolve [npm][npm]
dependencies, reporting progress to your terminal as it goes.

If the build executes successfully the container is shipped over to your device
where the supervisor runs it in place of any previously running containers,
using `npm start` to execute your code (note that if no start script is
specified, it defaults to running `node server.js`.)

#### Node.js Example

A good example of this is the [text-to-speech][text-to-speech] application -
here's its `package.json` file*:

```JSON
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

```shell
apt-get install -y alsa-utils libasound2-dev
mv sound_start /usr/bin/sound_start
```

These are shell commands that are run within the container on the build server
which are configured such that dependencies are resolved for the target
architecture not the build server's - this can be very useful for deploying
non-javascript code or fulfilling package dependencies that your node code
might require.

We use [Raspbian][raspbian] as our contained operating system, so this scripts
uses [aptitude][aptitude] to install native packages before moving a script for
our node code to use over to `/usr/bin` (the install scripts runs with root
privileges within the container.)

__Note:__ With plain Node.js project, our build server will automatically detect the specified node version in `package.json` file and build the container based on Docker image with satisfied node version installed. The default node version is `0.10.22` and it will be used if a node version is not specified. There will be an error if the specified node version is not in our registry. You can either try another node version or contact us to be supported. More details about Docker node images in our registry can be found [here][resin-base-image].

![terminal-builder-window](/img/terminal-builder-window.PNG)

[container]:https://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[docker]:https://www.docker.com/
[dockerfile]:https://docs.docker.com/reference/builder/
[docker-images-containers]:https://docs.docker.com/engine/understanding-docker/#/inside-docker
[hello-python]:https://github.com/alexandrosm/hello-python
[raspbian]:http://www.raspbian.org/

[from]:https://docs.docker.com/reference/builder/#from
[run]:https://docs.docker.com/reference/builder/#run
[add]:https://docs.docker.com/reference/builder/#add
[copy]:https://docs.docker.com/reference/builder/#copy
[cmd]:https://docs.docker.com/reference/builder/#cmd

[starter-projects]:/examples/projects#Programming_Language_Starter_Projects
[docker-best-practise]:https://docs.docker.com/articles/dockerfile_best-practices/#add-or-copy
[docker-registry]:https://registry.hub.docker.com/u/resin/rpi-raspbian/tags/manage/
[resin-docker-blog]:https://resin.io/blog/docker-on-raspberry-pi/
[dockerhub-link]:https://registry.hub.docker.com/search?q=rpi
[rpi-archlinux-link]:https://registry.hub.docker.com/u/digitallyseamless/archlinux-armv6h/
[docker-custom-base-os-repo]:https://github.com/nghiant2710/base-os-image-example
[docker-create-images-link]:https://docs.docker.com/userguide/dockerimages/#creating-our-own-images
[example-archlinux]:https://github.com/shaunmulligan/resin-archlinux-rpi

[x86-link]:https://en.wikipedia.org/wiki/X86
[ARM-link]:https://en.wikipedia.org/wiki/ARM_architecture

[local-mode]:/learn/develop/local-mode
[builders]:/learn/deploy/deployment
[local-build]:/reference/cli/#build-source-
[multicontainer]:/learn/develop/multicontainer
