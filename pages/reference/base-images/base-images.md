---
title: Balena base images
excerpt: Docker images maintained by balena
---

# {{ $names.company.upper }} base images

[`balenalib`](https://hub.docker.com/u/balenalib/) is the central home for 26000+ IoT focused Docker images built specifically for [balenaCloud](https://www.balena.io/cloud/) and [balenaOS](https://www.balena.io/os/). This set of images provide a way to get up and running quickly and easily, while still providing the option to deploy slim secure images to the edge when you go to production.

## Features Overview

- Multiple Architectures:
  - armv5e
  - armv6
  - armv7hf
  - aarch64
  - amd64
  - i386
- Multiple Distributions:
  - [Debian](https://www.debian.org/): buster (10), bullseye (11), bookworm (12) and sid
  - [Alpine](https://alpinelinux.org/): 3.12, 3.13, 3.14, 3.15, 3.16 and edge
  - [Ubuntu](https://www.ubuntu.com/): xenial (16.04), bionic (18.04), focal (20.04), impish (21.10), kinetic (22.10) and jammy (22.04)
  - [Fedora](https://getfedora.org/): 33, 34, 35 and 36
- Multiple language stacks:
  - [Node.js](https://nodejs.org/en/): 18.7.0, 16.17.0, 14.20.0 and 12.22.12
  - [Python](https://www.python.org/):  3.10.5, 3.9.13, 3.8.13, 3.7.13 and 3.6.15
  - [openJDK](https://openjdk.java.net/): 7-jdk/jre, 8-jdk/jre, 11-jdk/jre and 16-jdk
  - [Golang](https://golang.org/): 1.19, 1.18.15 and 1.17.12
  - [Dotnet](https://docs.microsoft.com/en-gb/dotnet/core/): 6.0-sdk/runtime/aspnet, 3.1-sdk/runtime/aspnet and 5.0-sdk/runtime/aspnet
- [`run`](#run-vs-build) and [`build`](#run-vs-build) variants designed for multistage builds.
- [cross-build](#building-arm-containers-on-x86-machines) functionality for building ARM containers on x86.
- Helpful package installer script called `install_packages` inspired by [minideb](https://github.com/bitnami/minideb#why-use-minideb).

## How to Pick a Base Image

<!-- TODO: Add image on how image hierarchy and discuss -->
When starting out a project, it's generally easier to have a "fatter" image, which contains a lot of prebuilt dependencies and tools. These images help you get setup faster and work out the requirements for your project. For this reason, it's recommended to start with `-build` variants, and as your project progresses, switch to a `-run` variant with some [docker multistage build magic][multistage-build-docs] to slim your deploy image down. In most cases, your project can just use a Debian based distribution, which is the default if not specified, but if you know the requirements of your project or prefer specific distros, Ubuntu, Alpine, and Fedora images are available. The set of `balenalib` base images follow a simple naming scheme described below, which will help you select a base image for your specific needs.

### How the Image Naming Scheme Works

With over 26000 `balenalib` base images to choose from, it can be overwhelming to decide which image and tag are correct for your project. To pick the correct image, it helps to understand how the images are named as that indicates what is installed in the image. In general, the naming scheme for the `balenalib` image set follows the pattern below:

```
balenalib/<hw>-<distro>-<lang_stack>:<lang_ver>-<distro_ver>-(build|run)-<yyyymmdd>
```

#### Image Names

- `<hw>` is either architecture or device type and is **mandatory**. If you are using `Dockerfile.template`, you can replace `<hw>` with `%%BALENA_MACHINE_NAME%%` or `%%BALENA_ARCH%%`. Images named with device type are built using base images named with architecture. The `%%BALENA_MACHINE_NAME%%` base images are bigger and include more tools. Check [example]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/device-base/raspberrypi3/debian/bookworm/run/Dockerfile#L7) for reference. Check the list of available base images for [device names and architectures](/reference/base-images/devicetypes/).
- `<distro>` is the Linux distribution. Currently there are 4 distributions, namely Debian, Alpine, Ubuntu and Fedora. This field is optional and will default to Debian if left out.
- `<lang_stack>` is the programming language pack, currently we support Node.js, Python, OpenJDK, .Net, and Go. This field is optional, and if left out, no language pack will be installed, so you will just have the distribution and you can later install and use any language in your image/container.

#### Image Tags

In the tags, all of the fields are optional, and if they are left out, they will default to their `latest` pointer.

- `<lang_ver>` is the version of the language stack, for example, Node.js 10.10, it can also be substituted for `latest`.
- `<distro_ver>` is the version of the Linux distro, for example in the case of Debian, there are 4 valid versions, namely `sid`, `jessie`, `buster` and `stretch`.
- For each combination of distro and stack, we have two variants called `run` and `build`. The build variant is much heavier as it has a number of tools preinstalled to help with building source code. You can see an example of the tools that are included in the Debian Stretch variant [here]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/build/Dockerfile). The `run` variants are stripped down and only include a few useful runtime tools, see an example [here]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile). If no variant is specified, the image defaults to `run`
- The last optional field on tags is the date tag `<yyyymmdd>`. If a date tag is specified, the pinned release will always be pulled from Docker Hub, even if there is a new one available. 


__Note:__ Pinning to a date-frozen base image is highly recommended if you are running a fleet in production. This ensures that all your dependencies have a fixed version and won't get randomly updated until you decide to pin the image to a newer release.


#### Examples

`balenalib/raspberrypi3-node:10.18`

- `<hw>` : raspberrypi3 - The Raspberry Pi 3 device type.
- `<distro>` : omitted, so it defaults to Debian.
- `<lang>` : node - the Node.js runtime and npm will be installed
- `<lang_ver>` : 10.18 - This gives us Node.js version 10.18.x whatever is the latest patch version provided on balenalib
- `<distro_ver>` : omitted, so it defaults to `buster`
- `(build|run)` : omitted, so the image defaults to the slimmed down `run` variant
- `<yyyymmdd>` : omitted, we don't have a date frozen image, so new updates pushed to our 10.18 tag, for example patch versions from Node.js will automatically be inherited when they are available.

`balenalib/i386-ubuntu-python:latest-bionic-build-20191029`

- `<hw>` : i386 - the intel 32 bit architecture that runs on Intel Edison
- `<distro>` : ubuntu
- `<lang>` : python
- `<lang_ver>` : `latest` points to the latest Python 2 version, which currently is 2.7.17
- `<distro_ver>` : bionic is Ubuntu 18.04
- `(build|run)` : `build` - to include things like `build-essential` and `gcc`
- `<yyyymmdd>` : 20191029 is a date frozen image - so this image will never be updated on Docker Hub. 

### run vs. build

For each combination of `<hw>`-`<distro>`-`<lang>` there is both a `run` and a `build` variant. These variants are provided to allow for easier multistage builds.

The `run` variant is designed to be a slim and minimal variant with only runtime essentials packaged into it. An example of the packages installed in can be seen in the [`Dockerfile`]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile#L7) of [`balenalib/armv7hf-debian:run`]({{ $links.githubLibrary }}/base-images/tree/master/balena-base-images/armv7hf/debian/stretch/run).

The `build` variant is a heavier image that includes many of the tools required for building from source such as `build-essential`, `gcc`, etc. As an example, you can see the types of packages installed in the `balenalib/armv7hf-debian:build` variant [here]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/build/Dockerfile#L51).

These variants make building multistage projects easier, take for example, installing an I2C node.js package, which requires a number of build time dependencies to build the native `i2c` node module, but we don't want to send all of those down to our device. This is the perfect time for multistage builds and to use the `build` and `run` variants.

```Dockerfile
FROM balenalib/raspberrypi3-debian-node:10.10-stretch-build as build
RUN npm install --only=production i2c

# The run time container that will go to devices
FROM balenalib/raspberrypi3-debian-node:10.10-stretch-run

# Grab our node modules for the build step
COPY --from=build ./node_modules ./node_modules
COPY main.js main.js

CMD ["node", "main.js"]
```

### Supported Architectures, Distros and Languages

Currently, balenalib supports the following OS distributions and Language stacks, if you would like to see others added, create an issue on the [balena base images repo]({{ $links.githubLibrary }}/base-images/issues).

| Distribution | Default (latest)             | Supported Architectures                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| Debian       | Debian GNU/Linux 11 (bullseye) | armv5e, armv6, armv7hf, aarch64, amd64, i386 |
| Alpine       | Alpine Linux v3.16           | armv6, armv7hf, aarch64, amd64, i386         |
| Ubuntu       | 22.04 LTS (jammy)           | armv7hf, aarch64, amd64, i386                |
| Fedora       | Fedora 35                    | armv7hf, aarch64, amd64, i386                |

| Language | Default (latest) | Supported Architectures                      |
| -------- | ---------------- | -------------------------------------------- |
| Node.js  | 18.7.0           | armv6, armv7hf, aarch64, amd64, i386         |
| Python   | 3.10.5           | armv5e, armv6, armv7hf, aarch64, amd64, i386 |
| OpenJDK  | 11-jdk           | armv7hf, aarch64, amd64, i386, armv6         |
| Go       | 1.19             | armv7hf, aarch64, amd64, i386, armv6         |
| Dotnet   | 6.0-sdk          | armv7hf, aarch64, amd64                      |

#### Notes

Devices with a [device type](/reference/base-images/devicetypes/) of `raspberry-pi` (Raspberry Pi1 and Zero) will be built from `balenalib/rpi-raspbian` and will be [Raspbian]({{ $links.githubLibrary }}/resin-rpi-raspbian) base images. The `raspberry-pi2` and `raspberrypi3` device types Debian base images have the Raspbian package source added, and Raspbian userland pre-installed.

Not all OS distro and language stack versions are compatible with each other. Notice that there are some combinations that are not available in the `balenalib` base images.

- [Node.js dropped 32-bit builds](https://github.com/nodejs/build/issues/885) a while ago so i386-based nodejs images (Debian, Fedora and Ubuntu) v8.x and v6.x are official. New series (v10.x and v12.x) are using unofficial builds.
- armv6 binaries were officially dropped from Node.js v12 and v12 armv6 support is now considered unofficial.
- The Node.js v6.x and v8.x series are not available for i386 Alpine Linux base images v3.9 and edge as node crashes with segfault error, we are investigating the issue and will add them back as soon as the issue is resolved.

## Installing Packages

Installing software packages in balenalib containers is very easy, and in most cases, you can just use the base image operating system package manager. However to make things even easier, every balenalib image includes a small `install_packages` script that abstracts away the specifics of the underlying package managers, and adds the following useful features:

- Install the named packages, skipping prompts etc.
- Clean up the package manager metadata afterward to keep the resulting image small.
- Retries if package install fails. Sometimes a package will fail to download due to a network issue, and retrying may fix this, which is particularly useful in an automated build pipeline.

An example of this in action is as follows:

```Dockerfile
FROM balenalib/raspberrypi3

RUN install_packages wget git

CMD ["bash", "start.sh"]
```

This will run an `apt-get update -qq`, then install `wget` and `git` via apt-get with `-y --no-install-recommends` flags, and it will by default try this 2 times before failing. You can see the source of `install_packages` [here]({{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile#L26-L49).

## How the Images Work at Runtime

Each `balenalib` base image has a default [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint) which is defined as `ENTRYPOINT ["/usr/bin/entry.sh"]`. This ensures that [entry.sh][entry-sh-link] is run before your code defined in `CMD` of your `Dockerfile`.

On container startup, the [entry.sh][entry-sh-link] script first checks if the `UDEV` flag is set to `true` or `false`. In the case where it is `false`, the `CMD` is then executed. In the case it is `true` (or `1`), the entry.sh will check if the container is running privileged, if it is, it will mount `/dev` to a devtmpfs and then start `udevd`. In the case the container is an unprivileged container, no mount will be performed, and `udevd` will be started (although it won't be very much use without the privilege).

At the end of a container's lifecycle, when a request to container restart, reboot or shutdown is sent to the supervisor, the [balenaEngine](https://www.balena.io/engine/) will send a `SIGTERM` (signal 15) to the containers, and 10 seconds later it will issue a `SIGKILL` if the container is still running. This timeout can also be configured via the [stop_grace_period](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_grace_period) in your docker-compose.yml.

## Working with Dynamically Plugged Devices

In many IoT projects, your containers will want to interact with some hardware, often this hardware is plugged in at runtime, in the case of USB or serial devices. In these cases, you will want to enable [`udevd`][udevd-link] in your container. In `balenalib` images this can easily be done either by adding `ENV UDEV=1` in your `Dockerfile` or by setting an environment variable using [variables][variables].

You will also need to run your container `privileged`. By default, any [balenaCloud](https://www.balena.io/cloud/) projects that don't contain a `docker-compose.yml` will run their containers `privileged`. If you are using a multicontainer project, you will need to add `privileged: true` to each of the service definitions for the services that need hardware access.

When a `balenalib` container runs with `UDEV=1` it will first detect if it is running on a `privileged` container. If it is, it will mount the host OS `/dev` to a devtmpfs and then start [`udevd`][udevd-link]. Now anytime a new device is plugged in, the kernel will notify the container [`udevd`][udevd-link] daemon and the relevant device nodes in the container `/dev` will appear.

__Note:__ The new balenalib base images make sure `udevd` runs in its own network namespace, so as to not interfere with cellular modems. These images should not have any of the past udev restrictions of the `resin/` base images.

### Major Changes

When moving from the legacy `resin/...` base images to the `balenalib` ones, there are a number of breaking changes that you should take note of, namely:

- `UDEV` now defaults to `off`, so if you have code that relies on detecting dynamically plugged devices, you will need to enable this in either your Dockerfile or via a device environment variable. See [Working with Dynamically Plugged Devices](#working-with-dynamically-plugged-devices).
- The `INITSYSTEM` functionality has been completely removed, so containers that rely on [systemd](https://www.freedesktop.org/wiki/Software/systemd/) or [openRC](https://github.com/OpenRC/openrc) should install and set up the initsystem in their apps. See [Installing your own Initsystem](#installing-your-own-initsystem).
- Mounting of `/dev` to a devtmpfs will now only occur when `UDEV=on` and the container is running as `privileged`. `1`, `true` and `on` are valid value for `UDEV` and will be evaluated as `UDEV=on`, all other values will turn `UDEV` off.
- Support for Debian Wheezy has been dropped.
- `armel` architecture has been renamed to `armv5e`.

### Installing your own Initsystem

Since the release of multicontainer on the balenaCloud platform, we now recommend the use of multiple containers and no longer recommend the use of an initsystem, particularly systemd, in the container as it tends to cause a myriad of issues, undefined behavior and requires the container to run fully privileged.

However, if your container relies on initsystem features, it is fairly easy to add this functionality to a balenalib base image. We have provided some examples for [systemd]({{ $links.githubLibrary }}/base-images/tree/master/examples/INITSYSTEM/systemd/systemd.v230) and [openRC]({{ $links.githubLibrary }}/base-images/tree/master/examples/INITSYSTEM/openrc). Please note that different systemd versions require different implementation so for Debian Jessie and older, please refer to this [example]({{ $links.githubLibrary }}/base-images/tree/master/examples/INITSYSTEM/systemd/systemd ) and for Debian Stretch and later, please refer to this [example]({{ $links.githubLibrary }}/base-images/tree/master/examples/INITSYSTEM/systemd/systemd.v230).

Generally, for systemd, it just requires installing the systemd package, masking a number of services and defining a new [`entry.sh`]({{ $links.githubLibrary }}/base-images/tree/master/examples/INITSYSTEM/systemd/systemd.v230/entry.sh) and a [`balena.service`]({{ $links.githubLibrary }}/base-images/blob/master/examples/INITSYSTEM/systemd/systemd.v230/resin.service). The `Dockerfile` below demonstrates this:

```Dockerfile
FROM balenalib/amd64-debian:buster

# Install Systemd
RUN apt-get update && apt-get install -y --no-install-recommends \
        systemd \
        systemd-sysv \
    && rm -rf /var/lib/apt/lists/*

ENV container docker

# We never want these to run in a container
# Feel free to edit the list but this is the one we used
RUN systemctl mask \
    dev-hugepages.mount \
    sys-fs-fuse-connections.mount \
    sys-kernel-config.mount \

    display-manager.service \
    getty@.service \
    systemd-logind.service \
    systemd-remount-fs.service \

    getty.target \
    graphical.target \
    kmod-static-nodes.service

COPY entry.sh /usr/bin/entry.sh
COPY balena.service /etc/systemd/system/balena.service

RUN systemctl enable /etc/systemd/system/balena.service

STOPSIGNAL 37
ENTRYPOINT ["/usr/bin/entry.sh"]

##################################
# Your code here...
##################################
```

## Building ARM Containers on x86 Machines

This is a unique feature of balenalib ARM base images that allows you to run them anywhere (running ARM image on x86/x86_64 machines). A tool called `resin-xbuild` and QEMU are installed inside any balenalib ARM base image and can be triggered by `RUN ["cross-build-start"]` and `RUN ["cross-build-end"]`. QEMU will emulate any instructions between `cross-build-start` and `cross-build-end`. So this Dockerfile:

```Dockerfile
FROM balenalib/armv7hf-debian

RUN [ "cross-build-start" ]

RUN apt-get update
RUN apt-get install python-pip
RUN pip install virtualenv

RUN [ "cross-build-end" ]
```

can run on your x86 machine and there will be no `Exec format error`, which is the error when you run an ARM binary on x86. This approach works only if the image is being built on x86 systems. Use the [`--emulated`](https://www.balena.io/docs/learn/deploy/deployment/#--emulated--e) flag in `balena push` to trigger a qemu emulated build targeting the x86 architecture. More details can be found in our [blog post here]({{ $links.mainSiteUrl }}/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/). You can find the full source code for the two cross-build scripts [here]({{ $links.githubPlayground }}/armv7hf-debian-qemu).

[udevd-link]:https://linux.die.net/man/8/udevd
[entry-sh-link]:{{ $links.githubLibrary }}/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/entry.sh
[multistage-build-docs]:https://docs.docker.com/develop/develop-images/multistage-build/
[variables]:/learn/manage/variables/
