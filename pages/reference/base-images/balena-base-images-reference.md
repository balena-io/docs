---
title: Deprecated - balenalib base images reference
excerpt: Guide to deprecated Docker images published by balena
hidden: true
---

# \[Deprecated] balenalib base images

Balenalib was the central home for 26,000+ IoT-focused Docker images built specifically for balenaCloud and balenaOS. Balena ceased publishing updates to balenalib in 2025, however all of the previously published images are still available and still work.

**They should not be used in any new projects as they will receive no further updates.**

This page provides historical reference to the previously published base images, as well as crucial information for those looking to replicate one of these images using an up-to-date, officially published image. We recommend our [base images documentation](./) to choose an alternative base image.

## Supported Architectures, Distros and Languages

Balenalib supported the following OS distributions and language stacks: (Refer to the [balena base images](https://github.com/balena-io-library/base-images/tree/master/balena-base-images) repository to find the Dockerfiles and installer scripts for any of the deprecated balenalib base images.)

* Multiple Architectures:
  * amd64
  * aarch64
  * armv7hf
  * i386
  * rpi
* Multiple Distributions
  * Debian: bookworm (latest), bullseye, buster, sid
  * Fedora: 37 (latest), 38
  * Ubuntu: noble (latest), jammy
  * Alpine: 3.21 (latest), 3.20, 3.19, 3.18, 3.17, 3.16, 3.15, 3.14, 3.13, 3.12, edge
* Multiple language stacks:
  * Node: 20.12.0, 19.6.1 (latest), 18.14.1
  * Python: 3.11.2 (latest), 3.10.10, 3.9.16, 3.8.16
  * Openjdk: 11-jdk, 11-jre, 17-jdk, 16-jdk
  * Golang: 1.20.1 (latest), 1.19.6, 1.18.10
  * Dotnet: 7.0-sdk, 7.0-runtime, 7.0-aspnet, 6.0-sdk, 6.0-runtime, 6.0-aspnet

## Features Overview

* [`run`](balena-base-images-reference.md#run-vs.-build) and [`build`](balena-base-images-reference.md#run-vs.-build) variants designed for multistage builds.
* cross-build functionality for building ARM containers on x86.
* Provide access to [dynamically plugged devices](balena-base-images-reference.md#working-with-dynamically-plugged-devices) in your container by enabling [`udevd`](https://linux.die.net/man/8/udevd).
* Helpful package installer script called `install_packages` inspired by [minideb](https://github.com/bitnami/minideb#why-use-minideb).

### How the Image Naming Scheme Worked

In general, the naming scheme for the `balenalib` image set followed the pattern below:

```
balenalib/<hw>-<distro>-<lang_stack>:<lang_ver>-<distro_ver>-(build|run)-<yyyymmdd>
```

#### Image Names

* `<hw>` is either architecture or device type and is **mandatory**. If you are using `Dockerfile.template`, you can replace `<hw>` with `%%BALENA_MACHINE_NAME%%` or `%%BALENA_ARCH%%`. Images named with device type are built using base images named with architecture. The `%%BALENA_MACHINE_NAME%%` base images are bigger and include more tools.
* `<distro>` is the Linux distribution. There were four distributions, namely Debian, Alpine, Ubuntu and Fedora. **This field was optional and will default to Debian if left out**.
* `<lang_stack>` is the programming language pack, which included Node.js, Python, OpenJDK, .Net, and Go. This field was optional, and if left out, no language pack was installed.

#### Image Tags

In the tags, all of the fields were optional, and if they were left out, they defaulted to their `latest` pointer.

* `<lang_ver>` was the version of the language stack, for example, Node.js 20.12.0, it can also be substituted for `latest`.
* `<distro_ver>` was the version of the Linux distro, for example Debian and its valid version as mentioned above in the list.
* For each combination of distro and stack, there were two variants called `run` and `build`. The build variant was much heavier as it had a number of tools preinstalled to help with building source code. You can see an example of the tools that were included in the Debian variants. Navigate to the Distro version you are looking for and find the `build` and `run` variants of the image. The `run` variants are stripped down and only include a few useful runtime tools. **If no variant is specified, the image defaults to `run`. This is often referred to as slim on official Dockerhub images.**
* The last optional field on tags was the date tag `<yyyymmdd>`. If a date tag is specified, the pinned release will always be pulled from Docker Hub, even if there is a new one available.

#### Examples

`balenalib/raspberrypi3-node:10.18`

* `<hw>` : raspberrypi3 - The Raspberry Pi 3 device type.
* `<distro>` : omitted, so it defaults to Debian.
* `<lang>` : node - the Node.js runtime and npm will be installed
* `<lang_ver>` : 10.18 - This gives us Node.js version 10.18.x whatever is the latest patch version provided on balenalib
* `<distro_ver>` : omitted, so it defaults to `buster`
* `(build|run)` : omitted, so the image defaults to the slimmed down `run` variant
* `<yyyymmdd>` : omitted, we don't have a date frozen image, so new updates pushed to our 10.18 tag, for example patch versions from Node.js will automatically be inherited when they are available.

`balenalib/i386-ubuntu-python:latest-bionic-build-20191029`

* `<hw>` : i386 - the intel 32 bit architecture that runs on Intel Edison
* `<distro>` : ubuntu
* `<lang>` : python
* `<lang_ver>` : `latest` points to the latest Python 2 version, which currently is 2.7.17
* `<distro_ver>` : bionic is Ubuntu 18.04
* `(build|run)` : `build` - to include things like `build-essential` and `gcc`
* `<yyyymmdd>` : 20191029 is a date frozen image - so this image will never be updated on Docker Hub.

### run vs. build

For each combination of `<hw>`-`<distro>`-`<lang>` there was both a `run` and a `build` variant. These variants were provided to allow for easier multistage builds.

The `run` variant was designed to be a slim and minimal variant with only runtime essentials packaged into it. To find what packages exactly, navigate to the [Debian version](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/) and check the Dockerfile inside the `run` folder.

The `build` variant was a heavier image that included many of the tools required for building from source such as `build-essential`, `gcc`, etc. As an example, you can see the types of packages installed in the `balenalib/armv7hf-debian:build` variant on the [balena-io-library/base-images](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/) repository.

These variants made building multistage projects easier. For example, installing an I2C node.js package requires a number of build time dependencies to build the native `i2c` node module. However we don't want to send all of those dependencies down to our device.

```dockerfile
FROM balenalib/raspberrypi3-debian-node:latest-bookworm-build as build
RUN npm install --only=production i2c

# The run time container that will go to devices
FROM balenalib/raspberrypi3-debian-node:latest-bookworm-run

# Grab our node modules for the build step
COPY --from=build ./node_modules ./node_modules
COPY main.js main.js

CMD ["node", "main.js"]
```

#### Notes

Devices with a [device type](devicetypes.md) of `raspberry-pi` (Raspberry Pi1 and Zero) were built from `balenalib/rpi-raspbian` and were [Raspbian](https://github.com/balena-io-library/resin-rpi-raspbian) base images. The `raspberry-pi2` and `raspberrypi3` device types Debian base images have the Raspbian package source added, and Raspbian userland pre-installed.

Not all OS distro and language stack versions are compatible with each other. Notice that there are some combinations that were not available in the `balenalib` base images.

* [Node.js dropped 32-bit builds](https://github.com/nodejs/build/issues/885) a while ago so i386-based nodejs images (Debian, Fedora and Ubuntu) v8.x and v6.x are official. New series (v10.x and v12.x) used unofficial builds.
* armv6 binaries were officially dropped from Node.js v12 and v12 armv6 support is now considered unofficial.
* The Node.js v6.x and v8.x series are not available for i386 Alpine Linux base images v3.9 and edge as node crashes with segfault error.

## Installing Packages

Every balenalib image included a small `install_packages` script that abstracted away the specifics of the underlying package managers, and added the following useful features:

* Install the named packages, skipping prompts etc.
* Clean up the package manager metadata afterward to keep the resulting image small.
* Retries if package install fails. Sometimes a package will fail to download due to a network issue, and retrying may fix this, which is particularly useful in an automated build pipeline.

An example of this in action is as follows:

```dockerfile
FROM balenalib/raspberrypi3

RUN install_packages wget git

CMD ["bash", "start.sh"]
```

This will run an `apt-get update -qq`, then install `wget` and `git` via apt-get with `-y --no-install-recommends` flags, and it will by default try this 2 times before failing.

To see the source for `install_packages` navigate to the [Debian version](https://github.com/balena-io-library/base-images/tree/master/balena-base-images/armv7hf/debian) you want, selecting `run` or `build` folder and click `Dockerfile`

## How the Images Worked at Runtime

Each `balenalib` base image has a default [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint) which is defined as `ENTRYPOINT ["/usr/bin/entry.sh"]`. This ensures that [entry.sh](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/bookworm/run/entry.sh) is run before your code defined in `CMD` of your `Dockerfile`.

On container startup, the [entry.sh](https://github.com/balena-io-library/base-images/blob/master/balena-base-images/armv7hf/debian/bookworm/run/entry.sh) script first checks if the `UDEV` flag is set to `true` or `false`. In the case where it is `false`, the `CMD` is then executed. In the case it is `true` (or `1`), the entry.sh will check if the container is running privileged, if it is, it will mount `/dev` to a devtmpfs and then start `udevd`. In the case the container is an unprivileged container, no mount will be performed, and `udevd` will be started (although it won't be very much use without the privilege).

At the end of a container's lifecycle, when a request to container restart, reboot or shutdown is sent to the supervisor, the [balenaEngine](https://www.balena.io/engine/) will send a `SIGTERM` (signal 15) to the containers, and 10 seconds later it will issue a `SIGKILL` if the container is still running. This timeout can also be configured via the [stop\_grace\_period](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_grace_period) in your docker-compose.yml.

## Working with Dynamically Plugged Devices

To interact with hardware that is plugged in at runtime, such as USB or serial devices, you will want to enable [`udevd`](https://linux.die.net/man/8/udevd) in your container. In `balenalib` images this was done by either adding `ENV UDEV=1` in your `Dockerfile` or by setting an environment variable using [variables](../../learn/manage/variables.md).

This also required you to run your container `privileged`.

When a `balenalib` container runs with `UDEV=1` it will first detect if it is running on a `privileged` container. If it is, it will mount the host OS `/dev` to a devtmpfs and then start [`udevd`](https://linux.die.net/man/8/udevd). Now anytime a new device is plugged in, the kernel will notify the container [`udevd`](https://linux.die.net/man/8/udevd) daemon and the relevant device nodes in the container `/dev` will appear.

{% hint style="warning" %}
Newer balenalib base images made sure `udevd` ran in its own network namespace, so as to not interfere with cellular modems.
{% endhint %}

### Balenalib Image Notes

* `UDEV` defaults to off. See [Working with Dynamically Plugged Devices](balena-base-images-reference.md#working-with-dynamically-plugged-devices).
* The `INITSYSTEM` functionality has been completely removed, so containers that rely on [systemd](https://www.freedesktop.org/wiki/Software/systemd/) or [openRC](https://github.com/OpenRC/openrc) should install and set up the initsystem in their apps. See [Installing your own Initsystem](balena-base-images.md#installing-your-own-initsystem).
* Mounting of `/dev` to a devtmpfs will only occurs when `UDEV=on` and the container is running as `privileged`. `1`, `true` and `on` are valid value for `UDEV` and will be evaluated as `UDEV=on`, all other values will turn `UDEV` off.
