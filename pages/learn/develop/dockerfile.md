---
title: Define a container
excerpt: Use Dockerfiles to package your {{ $names.company.lower }} services and their dependencies
---

# Define a container

{{ $names.company.upper }} uses [Docker][docker] containers to manage applications. You can use one or more containers to package your services with whichever environments and tools they need to run.

To ensure a service has everything it needs, you'll want to create a list of instructions for building a [container image][docker-images-containers]. Whether the build process is done [on your device][local-mode], [on your workstation][local-build], or on the [{{ $names.company.lower }} builders][builders], the end result is a read-only image that ends up on your device. This image is used by the container engine (balena or Docker, depending on the {{ $names.os.lower }} version) to kick off a running container.

## Dockerfiles

The instructions for building a container image are written in a [Dockerfile][dockerfile] - this is similar to a `Makefile` in that it contains a recipe or set of instructions to build our container.

The syntax of Dockerfiles is fairly simple - at core there are 2 valid entries in a Dockerfile - comments, prepended with `#` as in script files, and instructions of the format `INSTRUCTION arguments`.

Typically you will only need to use 4 instructions - [FROM][from], [RUN][run] and [ADD][add] or [COPY][copy]:-

* [FROM][from] __has__ to be the first instruction in any valid `Dockerfile` and defines the base image to use as the basis for the container you're building.

* [RUN][run] simply executes commands in the container - this can be of the format of a single line to execute, e.g. `RUN apt-get -y update` which will be run via `/bin/sh -c`, or `[ "executable", "param1", "param2", ... ]` which is executed directly.

* [ADD][add] copies files from the current directory into the container, e.g. `ADD <src> <dest>`. Note that if `<dest>` doesn't exist, it will be created for you, e.g. if you specify a folder. If the `<src>` is a *local* tar archive it will unpack it for you. It also allows the `<src>` to be a url but will **not** unpack *remote* urls.

* [COPY][copy] is very similar to [ADD][add], but without the compression and url functionality. According to [the Dockerfile best practices][dockerfile-best-practices], you should always use [COPY][copy] unless the auto-extraction capability of [ADD][add] is needed.

* [CMD][cmd] this command provides defaults for an executing container. This command will be run when the container starts up on your device, whereas RUN commands will be executed on our build servers. In a {{ $names.company.lower }} application, this is typically used to execute a start script or entrypoint for the users application. [CMD][cmd] should always be the last command in your Dockerfile. The only processes that will run inside the container are the [CMD][cmd] command and all processes that it spawns.

For details on other instructions, consult the official [Dockerfile documentation][dockerfile].

### Using Dockerfiles with {{ $names.company.lower }}

To deploy a single-container application to {{ $names.company.lower }}, simply place a `Dockerfile` at the root of your repository. A `docker-compose.yml` file will be automatically generated, ensuring your container has host networking, is privileged, and has `lib/modules`, `/lib/firmware`, and `/run/dbus` bind mounted into the container. The default `docker-compose.yml` will look something like this:

```
version: '2.1'
networks: {}
volumes:
  resin-data: {}
services:
  main:
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
```

Applications with multiple containers should include a `Dockerfile` or `package.json` in each service directory. A `docker-compose.yml` file will need to be defined at the root of the repository, as discussed in our [multicontainer documentation][multicontainer].

You can also include a `.dockerignore` file with your project if you wish the builder to ignore certain files.

__NOTE:__ You *don't* need to worry about ignoring `.git` as the builders already do this by default.

## Dockerfile templates

One of the goals of {{ $names.company.lower }} is code portability and ease of use, so you can easily manage and deploy a whole fleet of different devices. This is why Docker containers were such a natural choice. However, there are cases where Dockerfiles fall short and can't easily target multiple different device architectures.

To allow our builders to build containers for multiple architectures from one code repository, we implemented simple Dockerfile templates.

It is now possible to define a `Dockerfile.template` file that looks like this:
```Dockerfile
FROM {{ $names.base_images.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-node

COPY package.json /package.json
RUN npm install

COPY src/ /usr/src/app
CMD ["node", "/usr/src/app/main.js"]
```
This template will build and deploy a Node.js project for any of the devices supported by {{ $names.company.lower }}, regardless of whether the device architecture is [ARM][ARM-link] or [x86][x86-link].
In this example, you can see the build variable `%%{{ $names.company.allCaps }}_MACHINE_NAME%%`. This will be replaced by the machine name (i.e.: `raspberry-pi`) at build time. See below for a list of machine names.

The machine name is inferred from the device type of the application you are pushing to. So if you have an Intel Edison application, the machine name will be `intel-edison` and an `i386` architecture base image will be built.

__Note:__ You need to ensure that your dependencies and Node.js modules are also multi-architecture, otherwise you will have a bad time.

Currently our builder supports the following build variables:

| Variable Name        | Description          |
| ------------- |-------------|
| {{ $names.company.allCaps }}_MACHINE_NAME    | The name of the yocto machine this board is base on. It is the name that you will see in most of the {{ $names.company.lower }} [Docker base images][base-images].  This name helps us identify a specific [BSP](https://en.wikipedia.org/wiki/Board_support_package). |
| {{ $names.company.allCaps }}_ARCH    | The instruction set architecture for the base images associated with this device.|

__Note:__ If your application contains devices of different types, the `%%{{ $names.company.allCaps }}_MACHINE_NAME%%` build variable **will not** evaluate correctly for all devices. Your application containers are built once for all devices, and the `%%{{ $names.company.allCaps }}_MACHINE_NAME%%` variable will pull from the device type associated with the application, rather than the target device. In this scenario, you can use `%%{{ $names.company.allCaps }}_ARCH%%` to pull a base image that matches the shared architecture of the devices in your application.

If you want to see an example of build variables in action, have a look at this [basic openssh example](https://github.com/balena-io-playground/balena-openssh).

Here are the supported machine names and architectures:

{{> "general/deviceTypeNames"}}

## Multiple Dockerfiles

There are cases when you would need a higher granularity of control when specifying build instructions for different devices and architectures than a single Dockerfile template can provide. An example of this would be when different configuration or installation files are required for each architecture or device.

When deploying an application, the balenaCloud build servers or the balena CLI tool (depending on the deployment method used) look at all available Dockerfiles and build the appropriate image using the following order of preference:

* Dockerfile.<device-type>
* Dockerfile.<arch>
* Dockerfile.template

As an example, let's say you have two Dockerfiles available, `Dockerfile.raspberrypi3` and `Dockerfile.template`. Whenever you publish the application to balenaCloud, if the `device-type` is a Raspberry Pi 3, `Dockerfile.raspberrypi3` will be selected as an exact match and for all other devices the builder will automatically select `Dockerfile.template`.

Note that this feature works with the following commands: `git push`, `balena push`, `balena build`, and `balena deploy`.

## Init system

### Enable the init system

Whatever you define as `CMD` in your `Dockerfile` will be PID 1 of the process tree in your container. It also means that this PID 1 process needs to know how to properly process UNIX signals, reap orphan zombie processes [[1]](https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/) and if it crashes, your whole container crashes, meaning you lose logs and debug info.

For these reasons we have built an [init system][init-system-link] into most of the {{ $names.company.lower }} base images listed here: [{{ $names.company.upper }} Base Images Wiki][base-images]. The init system will handle signals, reap zombies and also properly handle [udev][udev-link] hardware events correctly.

There are two ways of enabling the init system in your application. You can add the following environment variable in your Dockerfile:
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

{{ $names.company.upper }} supports [Node.js][node] natively using the [package.json][package]
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
  "name": "text2speech",
  "description": "Simple balena app that uses Google's TTS endpoint",
  "repository": {
    "type": "git",
    "url": "{{ $links.githubMain }}/text2speech.git"
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

__Note:__ With plain Node.js project, our build server will automatically detect the specified node version in `package.json` file and build the container based on Docker image with satisfied node version installed. The default node version is `0.10.22` and it will be used if a node version is not specified. There will be an error if the specified node version is not in our registry. You can either try another node version or contact us to be supported. More details about Docker node images in our registry can be found [here][base-images].

![terminal-builder-window](/img/terminal-builder-window.PNG)

[container]:https://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[docker]:https://www.docker.com/
[dockerfile]:https://docs.docker.com/reference/builder/
[docker-images-containers]:https://docs.docker.com/engine/understanding-docker/#/inside-docker
[hello-python]:https://github.com/alexandrosm/hello-python
[raspbian]:http://www.raspbian.org/

[from]:https://docs.docker.com/engine/reference/builder/#from
[run]:https://docs.docker.com/engine/reference/builder/#run
[add]:https://docs.docker.com/engine/reference/builder/#add
[copy]:https://docs.docker.com/engine/reference/builder/#copy
[cmd]:https://docs.docker.com/engine/reference/builder/#cmd

[starter-projects]:/examples/projects#Programming_Language_Starter_Projects
[dockerfile-best-practices]:https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
[docker-registry]:https://registry.hub.docker.com/u/resin/rpi-raspbian/tags/manage/
[resin-docker-blog]:{{ $links.mainSiteUrl }}/blog/docker-on-raspberry-pi/
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
[base-images]:/reference/base-images/base-images

[init-system-link]:https://en.wikipedia.org/wiki/Init
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[openrc-link]:https://en.wikipedia.org/wiki/OpenRC
[udev-link]:https://www.freedesktop.org/software/systemd/man/udev.html

[package]:https://docs.npmjs.com/files/package.json
[container]:https://wiki.archlinux.org/index.php/Linux_Containers
[npm]:https://www.npmjs.org/
[text-to-speech]:{{ $links.githubMain }}/text2speech
[node]:http://nodejs.org/
[raspbian]:http://www.raspbian.org/
[aptitude]:https://wiki.debian.org/Aptitude
