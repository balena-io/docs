---
title: {{ $names.company.upper }} base images
excerpt: Docker images maintained by {{ $names.company.lower }}
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
	- [Debian](https://www.debian.org/): jessie, sid, stretch and buster
	- [Alpine](https://alpinelinux.org/): 3.5, 3.6, 3.7, 3.8, 3.9, 3.10 and edge
	- [Ubuntu](https://www.ubuntu.com/): trusty (14.04), xenial (16.04), artful (17.10), bionic (18.04), and cosmic (18.10)
	- [Fedora](https://getfedora.org/): 26, 28, 29 and 30
- Multiple language stacks:
	- [Node.js](https://nodejs.org/en/): 12.7.0, 11.15.0, 10.16.1, 8.16.1 and 6.17.1
	- [Python](https://www.python.org/): 2.7.16, 3.5.7, 3.6.9 and 3.7.4
	- [openJDK](https://openjdk.java.net/): 7-jdk/jre, 8-jdk/jre, 10-jdk/jre and 11-jdk/jre
	- [Golang](https://golang.org/): 1.12.7, 1.11.12 and 1.10.8
	- [Dotnet](https://docs.microsoft.com/en-gb/dotnet/core/): 2.2-sdk/runtime/aspnet,3.0-sdk/runtime/aspnet,2.1-sdk/runtime/aspnet
- [`run`](#run-vs-build) and [`build`](#run-vs-build) variants designed for multistage builds.
- [cross-build](#building-arm-containers-on-x86-machines) functionality for building ARM containers on x86.
- Helpful package installer script called `install_packages` inspired by [minideb](https://github.com/bitnami/minideb#why-use-minideb).


## How to Pick a Base Image

<!-- TODO: Add image on how image hierarchy and discuss  -->
When starting out a project its generally easier to have a "fatter" image which contains a lot of prebuilt dependencies and tools. These images help you get setup faster and work out the requirements for your project. For this reason its recommended to start with `-build` variants and as your project progresses switch to a `-run` variant with some [docker multistage build magic][multistage-build-docs] to slim your deploy image down. In most cases your project can just use a Debian based distribution, which is the default if not specified, but if you know the requirements of your project or prefer specific distros, Ubuntu, Alpine and Fedora images are available. The set of `balenalib` base images follow a simple naming scheme described below, which will help you select a base image for your specific needs.

### How the Image Naming Scheme Works

With over 26000 `balenalib` base images to choose from it can be overwhelming to decide which image and tag is correct for your project. To pick the correct image, it helps to understand how the images are named as that indicates what is installed in the image. In general the naming scheme for the `balenalib` image set follows the pattern below:
```
balenalib/<hw>-<distro>-<lang_stack>:<lang_ver>-<distro_ver>-(build|run)-<yyyymmdd>
```

#### Image Names:

- `<hw>` is either architecture or device type and is **mandatory**. If using Dockerfile.templates you can replace this with `%%BALENA_MACHINE_NAME%%` or `%%BALENA_ARCH%%`. For a list of available device names and architectures see the [Device types](/reference/base-images/devicetypes/).
- `<distro>`  is the linux distribution, currently there are 4 distributions, namely Debian, Alpine, Ubuntu and Fedora. This field is optional, and will default to Debian if left out.
- `<lang_stack>` is the programming language pack, currently we support Node.js, Python, OpenJDK and Go. This field is optional and if left out, no language pack will be installed, so you will just have the distribution.

#### Image Tags:

In the tags, all of the fields are optional and if they are left out, they will default to their `latest` pointer.

- `<lang_ver>` is the version of the language stack, for example node.js 10.10, it can also be substituted for `latest`.
- `<distro_ver>` is the version of the linux distro, for example in the case of Debian there are 4 valid versions, namely `sid`, `jessie`, `buster` and `stretch`.
- For each combination of distro and stack we have two variants called `run` and `build`. The build variant is much heavier as it has a number of tools preinstalled to help with building source code. You can see an example of the tools that are included in the Debian Stretch variant [here](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/build/Dockerfile). The `run` variants are stripped down and only include a few useful runtime tools, see an example [here](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile).
If no variant is specified, the image defaults to `run`
- <yyyymmdd> the last optional field on tags is the date tag. This is useful for production deployments as these base images are non-moving tags, so no packages in these will update ever.

#### Examples

`balenalib/raspberrypi3-node:10.10`

- `<hw>` : raspberrypi3 - The raspberry pi 3 device type.
- `<distro>` : omitted, so it defaults to Debian.
- `<lang>` : node - the Node.js runtime and npm will be installed
- `<lang_ver>` : 10.10 - This gives us node.js version 10.10.x whatever is the latest patch version provided on balenalib
- `<distro_ver>` : omitted, so it defaults to `stretch`
- `(build|run)` : omitted, so the image defaults to the slimmed down `run` variant
- `<yyyymmdd>` : omitted, we don’t have a date frozen image, so new updates pushed to our 10.10 tag, for example patch versions from node.js will automatically be inherited when they are available.

`balenalib/i386-ubuntu-python:latest-trusty-build-20181029`

- `<hw>` : i386 - the intel 32 bit architecture that runs on Intel Edison
- `<distro>` : ubuntu
- `<lang>` : python
- `<lang_ver>` : `latest` points to the latest python 2 version, which currently is 2.7.15
- `<distro_ver>` : trusty is Ubuntu 14.04
- `(build|run)` : `build` - to include things like `build-essential` and `gcc`
- `<yyyymmdd>` : 20181029 is a date frozen image - so this image will never be updated on dockerhub. Pinning to a date frozen base image is a good idea if you are running a fleet in production and are sensitive to dependencies updating and/or bandwidth constrained.

### run vs. build

For each combination of `<hw>`-`<distro>`-`<lang>` there is both a `run` and a `build` variant. These variants are provided to allow for easier multistage builds.

The `run` variant is designed to be a slim and minimal variant with only runtime essentials packaged into it. An example of the packages installed in can be seen in the [`Dockerfile`](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile#L7) of [`balenalib/armv7hf-debian:run`](https://github.com/balena-io-library/base-images/tree/master/balena-base-images/armv7hf/debian/stretch/run).

The `build` variant is a heavier image that includes many of the tools required for building from source such as `build-essential`, `gcc`, etc. As an example you can see the types of packages installed in the `balenalib/armv7hf-debian:build` variant [here](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/build/Dockerfile#L51).

These variants make building multistage projects easier, take for example installing an I2C node.js package which requires a number of build time dependencies to build the native `i2c` node module, but we don't want to send all of those down to our device. This is the perfect time for multistage builds and to use the `build` and `run` variants.

```Dockerfile
FROM balenalib/raspberrypi3-debian-node:10.10-stretch-build as build
RUN npm install --only=production  i2c

# The run time container that will go to devices
FROM balenalib/raspberrypi3-debian-node:10.10-stretch-run

# Grab our node modules for the build step
COPY --from=build ./node_modules ./node_modules
COPY main.js main.js

CMD ["node", "main.js"]
```

### Supported Architectures, Distros and Languages

Currently balenalib supports the following OS distributions and Language stacks, if you would like to see others added, create an issue on the [balena base images repo](https://github.com/balena-io-library/base-images/issues).

| Distribution | Default                | Supported Architectures                      |
|---------|------------------------------|----------------------------------------------|
| Debian  | Debian GNU/Linux 9 (stretch) | armv5e, armv6, armv7hf, aarch64, amd64, i386 |
| Alpine  | Alpine Linux v3.10            | armv6, armv7hf, aarch64, amd64, i386 		|
| Ubuntu  | 18.04 LTS (Bionic Beaver)    | armv7hf, aarch64, amd64, i386                |
| Fedora  | Fedora 29 (Twenty Nine)      | armv7hf, aarch64, amd64, i386                |

| Language | Default  	                  | Supported Architectures                      |
|---------|------------------------------|----------------------------------------------|
| Node.js | v12.7.0                      | armv6, armv7hf, aarch64, amd64, i386         |
| Python  | v2.7.16                       | armv5e, armv6, armv7hf, aarch64, amd64, i386 |
| OpenJDK | v1.8.0_181                    | armv7hf, aarch64, amd64, i386, armv6         |
| Go      | 1.12.7                        | armv7hf, aarch64, amd64, i386, armv6         |
| Dotnet  | 2.2-sdk                       | armv7hf, aarch64, amd64                |

#### Notices

Not all OS distro and language stack versions are compatible with each other, pleace notice that there are some combinations which are not available in the `balenalib` base images.
- [Nodejs dropped 32-bit builds](https://github.com/nodejs/build/issues/885) a while ago so i386-based nodejs images (Debian, Fedora and Ubuntu) v8.x and v6.x are official. New series (v10.x and v12.x) are using unofficial builds so please notice when using these images.
- armv6 binaries were officially dropped from v12 and v12 armv6 support is now considered unofficial.
- The Nodejs v6.x and v8.x series are not available for i386 Alpine Linux base images v3.9 and edge as node crashes with segfault error, we are investigating the issue and will add them back as soon as the issue is resolved.

## Installing Packages

Installing software packages in balenalib containers is very easy and in most cases you can just use base image operating system package manager, however to make things even easier, every balenalib image includes a small `install_packages` script that abstracts away the specifics of the underlying package managers, and adds the following useful features:
- Install the named packages, skipping prompts etc.
- Clean up the package manager metadata afterwards to keep the resulting image small.
- Retries if package install fails. Sometimes a package will fail to download due to a network issue, and this may fix that, which is particularly useful in an automated build pipeline.

An example of this in action is as follows:
```
FROM balenalib/raspberrypi3

RUN install_packages wget git

CMD ["bash", "start.sh"]
```

This will run an `apt-get update -qq`, then install `wget` and `git` via apt-get with `-y --no-install-recommends` flags and it will by default try this 2 times before failing. You can see the source of `install_packages` [here](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/Dockerfile#L25-L49).

## How the Images Work at Runtime

Each `balenalib` base image has a default [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint) which is defined as `ENTRYPOINT ["/usr/bin/entry.sh"]`. This ensures that [entry.sh][entry-sh-link] is run before your code defined in `CMD` of your `Dockerfile`.

On container start up, the [entry.sh][entry-sh-link] script first checks if the `UDEV` flag is set to `true` or `false`. In the case where it is `false`, the `CMD` is then executed. In the case it is `true` (or `1`), the entry.sh will check if the container is running privileged, if it is, it will mount `/dev` to a devtmpfs and then start `udevd`. In the case the container is an unprivileged container, no mount will be performed and `udevd` will be started (although it won't be very much use without the privilege).

At the end of a container's lifecycle, when a request to container restart, reboot or shutdown is sent to the supervisor, the [balenaEngine](https://www.balena.io/engine/) will send a `SIGTERM` (signal 15) to the containers, and 10 seconds later it will issue a `SIGKILL` if the container is still running. This timeout can also be configured via the [stop_grace_period](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_grace_period) in your docker-compose.yml.

## Working with Dynamically Plugged Devices

In many IoT projects your containers will want to interact with some hardware, often this hardware is plugged in at runtime, in the case of USB or serial devices. In these cases you will want to enable [`udevd`][udevd-link] in your container. In `balenalib` images this can easily be done either by adding `ENV UDEV=1` in your `Dockerfile` or by setting an [environment variable](https://www.balena.io/docs/learn/manage/serv-vars/).

You will also need to run your container `privileged`, by default any [balenaCloud](https://www.balena.io/cloud/) projects that don't contain a `docker-compose.yml` will run their containers `privileged`. If you are using a multicontainer project you will need to add `privileged: true` to each of the service definitions for the services that need hardware access.

When a `balenalib` container runs with `UDEV=1` it will first detect if it is running on a `privileged` container, if it is, it will mount the host OS `/dev` to a devtmpfs and then start [`udevd`][udevd-link]. Now anytime a new device is plugged in, the kernel will notify the container [`udevd`][udevd-link] daemon and the relevant device nodes in the container `/dev` will appear.

__Note:__ The new balenalib base images make sure `udevd` runs in its own network namespace, so as to not interfere with cellular modems. These images should not have any of the past udev restrictions of the `resin/` base images.

### Major Changes

When moving from the legacy `resin/...` base images to the `balenalib` ones, there are a number of breaking changes that you should take note of, namely:

- `UDEV` now defaults to `off`, so if you have code that relies on detecting dynamically plugged devices you will need to enable this in either your Dockerfile or via a device environment variable. See [Working with Dynamically Plugged Devices](#working-with-dynamically-plugged-devices).
- The `INITSYSTEM` functionality has been completely removed, so applications that rely on [systemd](https://www.freedesktop.org/wiki/Software/systemd/) or [openRC](https://github.com/OpenRC/openrc) should install and set up the initsystem in their apps. See [Installing your own Initsystem](#installing-your-own-initsystem).
- Mounting of `/dev` to a devtmpfs will now only occur when `UDEV=on` and the container is running as `privileged`. `1`, `true` and `on` are valid value for `UDEV` and will be evaluated as `UDEV=on`, all other values will turn `UDEV` off.
- Support for Debian Wheezy has been dropped.
- `armel` architecture has been renamed to `armv5e`.

### Installing your own Initsystem

Since the release of multicontainer on the balenaCloud platform, we now recommend the use of multiple containers and no longer recommend the use of an initsystem, particularly systemd, in the container as it tends to cause a myriad of issues, undefined behaviour and requires the container to run fully privileged.

However if your application relies on initsystem features, it is fairly easy to add this functionality to a balenalib base image. We have provided some examples for [systemd](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/systemd/systemd) and [openRC](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/openrc). Please notice that different systemd versions require different implementation so for Debian Jessie and older, please refer to this [example](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/systemd/systemd ) and for Debian Stretch and later, please refer to this [example](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/systemd/systemd.v230).

Generally for systemd, it just requires installing the systemd package, masking a number of services and defining a new [`entry.sh`](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/systemd/systemd/entry.sh) and a [`balena.service`](https://github.com/balena-io-library/base-images/tree/master/examples/INITSYSTEM/systemd/systemd/balena.service). The `Dockerfile` below demonstates this:

```Dockerfile
FROM balenalib/amd64-debian:jessie

# Install Systemd
ENV container docker
RUN apt-get update && apt-get install -y --no-install-recommends \
		systemd \
	&& rm -rf /var/lib/apt/lists/*

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
    graphical.target

COPY entry.sh /usr/bin/entry.sh
COPY balena.service /etc/systemd/system/balena.service

RUN systemctl enable /etc/systemd/system/balena.service

STOPSIGNAL 37
VOLUME ["/sys/fs/cgroup"]
ENTRYPOINT ["/usr/bin/entry.sh"]

##################################
# Your code here...
##################################
```

## Building ARM Containers on x86 Machines

This is a unique feature of balenalib ARM base images that allows you to run them anywhere (running ARM image on x86/x86_64 machines). A tool called `resin-xbuild` and QEMU are installed inside any balenalib ARM base images and can be triggered by `RUN [ "cross-build-start" ]` and `RUN [ "cross-build-end" ]`. QEMU will emulate any instructions between `cross-build-start` and `cross-build-end`. So this Dockerfile:

```Dockerfile
FROM balenalib/armv7hf-debian

RUN [ "cross-build-start" ]

RUN apt-get update
RUN apt-get install python-pip
RUN pip install virtualenv

RUN [ "cross-build-end" ]
```

can be run on your x86 machine and there will be no `Exec format error`, which is the error when you run an ARM binary on x86. More details can be found in our [blog post here]({{ $links.mainSiteUrl }}/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/). You can find the full source code for the two cross-build scripts [here]({{ $links.githubPlayground }}/armv7hf-debian-qemu).

[udevd-link]:https://linux.die.net/man/8/udevd
[entry-sh-link]:https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/stretch/run/entry.sh
[multistage-build-docs]:https://docs.docker.com/develop/develop-images/multistage-build/
