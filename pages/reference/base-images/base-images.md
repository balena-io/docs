---
title: {{ $names.company.upper }} base images
excerpt: Docker images maintained by {{ $names.company.lower }}
---

# {{ $names.company.upper }} base images 

This page contains all the information about the images maintained on the {{ $names.company.lower }} Docker Hub registry.

## <a name="image-tree"></a>{{ $names.company.upper }} Image Trees

This section describes the {{ $names.company.lower }} image trees (hierarchy of images). These image trees provide an overview of how all the {{ $names.company.lower }} base images fit together for each device type supported by {{ $names.company.lower }}.

Repository for all images: refer [here][base-repository]. Subscribe to changes [here][base-images-changelog].

### Introduction

For each architecture supported by {{ $names.company.upper }}, there are bare bones base images, which are minimal variants of Linux distributions (currently we support Debian, Alpine Linux and Fedora). On top of the architecture-based images, we build specific base images for each supported device. The below table will describe full description with details about pre-installed packages on each base images.

| Image | Description | Installed Packages | Available Tag |
|:-----------|:------------|:------------|:------------|
| {{ $names.company.short }}/`arch`-debian | The base OS image based on Debian for a specific architecture. Systemd init system is installed in this base image, see our [tips](#tips) section on how to enable systemd in your image. | minbase, sudo, systemd | latest, jessie, buster, stretch, wheezy, sid |
| {{ $names.company.short }}/`arch`-alpine | The base OS image based on Alpine Linux for a specific architecture. OpenRC init system is installed in this base image, see our [tips](#tips) section on how to enable OpenRC in your image. | minbase, bash, udev, dbus, tar, ca-certificates, openrc | latest, 3.8, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/`arch`-fedora | The base OS image based on Fedora for a specific architecture. Systemd init system is installed in this base image, see our [tips](#tips) section on how to enable systemd in your image. | minbase, systemd | latest, 26, 25, 24 |
| {{ $names.company.short }}/`arch`-ubuntu | The base OS image based on Ubuntu for a specific architecture. Systemd init system is installed in this base image, see our [tips](#tips) section on how to enable systemd in your image. | minbase, systemd | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/`device-name`-debian | The bare bones Debian OS image for a supported device. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, ifupdown | latest, jessie, buster, stretch, wheezy |
| {{ $names.company.short }}/`device-name`-buildpack-deps | The Debian buildpack-deps image for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | latest, jessie, wheezy, jessie-scm, jessie-curl |
| {{ $names.company.short }}/`device-name`-node | The Debian Node.js buildpack image for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | |
| {{ $names.company.short }}/`device-name`-python | The Debian Python buildpack image for Python apps for a supported device | Refer [here](#python) | |
| {{ $names.company.short }}/`device-name`-golang | The Debian Go buildpack image for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | |
| {{ $names.company.short }}/`device-name`-openjdk | The Debian OpenJDK image is an open-source implementation of the Java Platform, Standard Edition for a supported device. Details about the OpenJDK image can be found [here](#OpenJDK) | Refer [here](#OpenJDK) | |
| {{ $names.company.short }}/`device-name`-alpine | The bare-bones Alpine Linux OS image for a supported device. | less, nano, net-tools, ifupdown, usbutils, gnupg | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/`device-name`-alpine-buildpack-deps | The buildpack-deps image based on Alpine Linux for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/`device-name`-alpine-node | The Node.js buildpack image based on Alpine Linux for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | |
| {{ $names.company.short }}/`device-name`-alpine-python | The Python buildpack image based on Alpine Linux for Python apps for a supported device | Refer [here](#python) | |
| {{ $names.company.short }}/`device-name`-alpine-golang | The Go buildpack image based on Alpine Linux for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | |
| {{ $names.company.short }}/`device-name`-alpine-openjdk | The Alpine Linux OpenJDK image is an open-source implementation of the Java Platform, Standard Edition for a supported device. Details about the OpenJDK image can be found [here](#OpenJDK) | Refer [here](#OpenJDK) | |
| {{ $names.company.short }}/`device-name`-fedora | The bare-bones Fedora OS image for a supported device. | less, nano, net-tools, ifupdown, usbutils, gnupg | latest, 26, 25, 24 |
| {{ $names.company.short }}/`device-name`-fedora-buildpack-deps | The buildpack-deps image based on Fedora for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/`device-name`-fedora-node | The Node.js buildpack image based on Fedora for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | |
| {{ $names.company.short }}/`device-name`-fedora-python | The Python buildpack image based on Fedora for Python apps for a supported device | Refer [here](#python) | |
| {{ $names.company.short }}/`device-name`-fedora-golang | The Go buildpack image based on Fedora for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | |
| {{ $names.company.short }}/`device-name`-fedora-openjdk | The Fedora OpenJDK image is an open-source implementation of the Java Platform, Standard Edition for a supported device. Details about the OpenJDK image can be found [here](#OpenJDK) | Refer [here](#OpenJDK) | |
| {{ $names.company.short }}/`device-name`-ubuntu | The bare bones Ubuntu OS image for a supported device. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, ifupdown | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/`device-name`-ubuntu-buildpack-deps | The Ubuntu buildpack-deps image for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/`device-name`-ubuntu-node | The Ubuntu Node.js buildpack image for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | |
| {{ $names.company.short }}/`device-name`-ubuntu-python | The Ubuntu Python buildpack image for Python apps for a supported device | Refer [here](#python) | |
| {{ $names.company.short }}/`device-name`-ubuntu-golang | The Ubuntu Go buildpack image for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | |

#### <a name="what-is-inside"></a>What's inside a {{ $names.company.lower }} base image

Based on the official Docker images, the {{ $names.company.lower }} base images offer a number of unique features:

##### Init system

[Tini](https://github.com/krallin/tini) is integrated as the default init system. This cleans up zombie processes which can consume excess resources and performs signal forwarding to make sure the correct stop signal is sent to your application on exit. We also pre-install another init system which can be triggered using the `INITSYSTEM` environment variable.

* For those images with the systemd init system installed (Debian and Fedora based base images), the systemd init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line.
	- This is the default configuration for systemd service: `{{ $links.githubMain }}-library/base-images/blob/master/debian/launch.service` (`Restart=on-failure` is set as default. It will automatically restart the service if it exits with non-zero exit code, so please remove this option if you do not want this behavior). If you want to change any configurations, update this file: `/etc/systemd/system/launch.service`.
* For those images with OpenRC init system installed (Alpine Linux based base images), the OpenRC init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger OpenRC init system on the Docker image.
* `systemd was included in Debian wheezy as a technology preview. Please make sure that you are using Debian testing or newer to get a recent version of systemd.` from [Systemd Debian Wiki Page][systemd-wiki]. Therefore, we do not install systemd on wheezy images. `ENV INITSYSTEM` will only work on other variant images.

##### {{ $names.company.short }}-xbuild & QEMU

This is an unique feature of {{ $names.company.lower }} ARM base images that allows you to run them anywhere (running ARM image on x86/x86_64 machines). A tool called `{{ $names.company.short }}-xbuild` and QEMU are installed inside any {{ $names.company.lower }} ARM base images and can be triggered by `RUN [ "cross-build-start" ]` and `RUN [ "cross-build-end" ]`. QEMU will emulate any instructions between `cross-build-start` and `cross-build-end`. So this Dockerfile:

```
FROM {{ $names.company.short }}/armv7hf-debian

RUN [ "cross-build-start" ]

RUN apt-get update  
RUN apt-get install python  
RUN pip install virtualenv

RUN [ "cross-build-end" ]
```

can be run on your machine and there will be no `Exec format error`, which is the error when you run an ARM binary on x86. More details can be found in our [blog post here]({{ $links.mainSiteUrl }}/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/).

##### Entry script

There is an entry script (`/usr/bin/entry.sh`) as the ENTRYPOINT in every {{ $names.company.lower }} base images. It will perform tasks such as: start udev, set the hostname ({{ $names.os.upper }} 1.x devices only), mount `/dev/` and trigger the init system before starting your application. Here is an example of [the entry script]({{ $links.githubMain }}-library/base-images/blob/master/debian/entry.sh). You can specify your own entrypoint if needed by adding `ENTRYPOINT` to the Dockerfile.

##### Notice:

* Currently, we support 6 architectures: amd64, i386, aarch64, armv7hf, armv6hf and armel; however, not all supported Linux distros support these architectures, only Debian does. We don't have {{ $names.company.lower }} Alpine Linux base images for aarch64 and armel and only armv7hf Fedora base images supported at the moment.
* The `latest` tag points to Jessie (Debian), 25 (Fedora) and 3.6 (Alpine Linux).
* If you have your own systemd service and you want your systemd service to use the environment variables you set in the dashboard, you need to add `EnvironmentFile=/etc/docker.env` to your systemd service unit file.
* To keep {{ $names.company.lower }} base images fresh, we re-build all base images every week and update version of language specific base images with the latest version in official repository. There are times when the newly built base images could accidentally break your build. To prevent this, we've introduced the date fixed tag, e.g. `jessie-20160510`. The date fixed tag images will never change, so they can be used for a stable build.
* Depending on the Linux distribution, specific packages for each device are pre-installed in `device-distro` combination base images, e.g. `libraspberrypi-bin` preinstalled in Debian based images for Raspberry Pi family or `http://repos.rcn-ee.net/debian/`, a Debian package repository for the Beaglebone family.

### <a name="base-images"></a>Base Images:

These are base images for different architectures:

| Image | Arch | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|
| `{{ $names.company.short }}/rpi-raspbian` (alias `{{ $names.company.short }}/raspberry-pi-debian`) | armv6hf | [Docker Hub][rpi-dockerhub-link], [github][rpi-github-link] | latest, jessie, stretch, buster, wheezy |
| `{{ $names.company.short }}/armv7hf-debian` | armv7hf | [Docker Hub][armv7hf-dockerhub-link], [github][armv7hf-github-link] | latest, jessie, stretch, buster, wheezy, sid |
| `{{ $names.company.short }}/i386-debian` | i386 | [Docker Hub][i386-dockerhub-link], [github][i386-github-link] | latest, jessie, stretch, buster, wheezy |
| `{{ $names.company.short }}/amd64-debian` | amd64 | [Docker Hub][amd64-dockerhub-link], [github][amd64-github-link] | latest, jessie, stretch, buster, wheezy |
| `{{ $names.company.short }}/armel-debian` | armel | [Docker Hub][armel-dockerhub-link], [github][armel-github-link] | latest, jessie, stretch, buster, wheezy |
| `{{ $names.company.short }}/aarch64-debian` | aarch64 | [Docker Hub][aarch64-dockerhub-link], [github][aarch64-github-link] | latest, jessie, stretch, buster |
| `{{ $names.company.short }}/rpi-alpine` | rpi | [Docker Hub][rpi-alpine-dockerhub-link], [github][rpi-alpine-github-link] | latest, 3.8, 3.7, 3.6, 3.5, edge |
| `{{ $names.company.short }}/armv7hf-alpine` | armv7hf | [Docker Hub][armv7hf-alpine-dockerhub-link], [github][armv7hf-alpine-github-link] | latest, 3.8, 3.7, 3.6, 3.5, edge |
| `{{ $names.company.short }}/aarch64-alpine` | aarch64 | [Docker Hub][aarch64-alpine-dockerhub-link], [github][aarch64-alpine-github-link] | latest, 3.8, 3.7, 3.6, 3.5, edge |
| `{{ $names.company.short }}/amd64-alpine` | amd64 | [Docker Hub][amd64-alpine-dockerhub-link], [github][amd64-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| `{{ $names.company.short }}/i386-alpine` | i386 | [Docker Hub][i386-alpine-dockerhub-link], [github][i386-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| `{{ $names.company.short }}/armv7hf-fedora` | armv7hf | [Docker Hub][armv7hf-fedora-dockerhub-link], [github][armv7hf-fedora-github-link] | latest, 26, 25, 24 |
| `{{ $names.company.short }}/amd64-fedora` | amd64 | [Docker Hub][amd64-fedora-dockerhub-link], [github][amd64-fedora-github-link] | latest, 26, 25, 24 |
| `{{ $names.company.short }}/aarch64-fedora` | aarch64 | [Docker Hub][aarch64-fedora-dockerhub-link], [github][aarch64-fedora-github-link] | latest, 26, 25, 24 |
| `{{ $names.company.short }}/armv7hf-ubuntu` | armv7hf | [Docker Hub][armv7hf-ubuntu-dockerhub-link], [github][armv7hf-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| `{{ $names.company.short }}/i386-ubuntu` | i386 | [Docker Hub][i386-ubuntu-dockerhub-link], [github][i386-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| `{{ $names.company.short }}/i386-nlp-ubuntu` | i386-nlp | [Docker Hub][i386-ubuntu-dockerhub-link], [github][i386-nlp-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| `{{ $names.company.short }}/amd64-ubuntu` | amd64 | [Docker Hub][amd64-ubuntu-dockerhub-link], [github][amd64-ubuntu-github-link] | latest, latest, trusty, xenial, artful, bionic, cosmic |
| `{{ $names.company.short }}/aarch64-ubuntu` | aarch64 | [Docker Hub][aarch64-ubuntu-dockerhub-link], [github][aarch64-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |

![Hierarchy Diagram](/img/hierarchy-diagram.jpg)

__Note:__ In the tree diagram, from the bottom to the top, the lower level image is used as the base Docker image to build the upper level one.

### ARMv6hf:



##### Raspberry Pi v1 & ZERO

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/raspberry-pi-debian | [Docker Hub][armv6hf-raspberry-pi-dockerhub-link], [github][armv6hf-raspberry-pi-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/raspberry-pi-buildpack-deps | [Docker Hub][armv6hf-raspberry-pi-buildpack-deps-dockerhub-link], [github][armv6hf-raspberry-pi-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/raspberry-pi-node | [Docker Hub][armv6hf-raspberry-pi-node-dockerhub-link], [github][armv6hf-raspberry-pi-node-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-python | [Docker Hub][armv6hf-raspberry-pi-python-dockerhub-link], [github][armv6hf-raspberry-pi-python-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-golang | [Docker Hub][armv6hf-raspberry-pi-golang-dockerhub-link], [github][armv6hf-raspberry-pi-golang-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-openjdk | [Docker Hub][armv6hf-raspberry-pi-openjdk-dockerhub-link], [github][armv6hf-raspberry-pi-openjdk-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-alpine | [Docker Hub][armv6hf-raspberry-pi-alpine-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/raspberry-pi-alpine-buildpack-deps | [Docker Hub][armv6hf-raspberry-pi-alpine-buildpack-deps-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/raspberry-pi-alpine-node | [Docker Hub][armv6hf-raspberry-pi-alpine-node-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-node-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-alpine-python | [Docker Hub][armv6hf-raspberry-pi-alpine-python-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-python-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-alpine-golang | [Docker Hub][armv6hf-raspberry-pi-alpine-golang-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-golang-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi-alpine-openjdk | [Docker Hub][armv6hf-raspberry-pi-alpine-openjdk-dockerhub-link], [github][armv6hf-raspberry-pi-alpine-openjdk-github-link] | For available image tags, refer [here][armv6hf-raspberry-pi-alpine-openjdk-dockerhub-tag-link] |


### ARMv7hf:



##### Raspberry Pi 2

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/raspberry-pi2-debian | [Docker Hub][armv7hf-raspberry-pi2-dockerhub-link], [github][armv7hf-raspberry-pi2-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/raspberry-pi2-buildpack-deps | [Docker Hub][armv7hf-raspberry-pi2-buildpack-deps-dockerhub-link], [github][armv7hf-raspberry-pi2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/raspberry-pi2-node | [Docker Hub][armv7hf-raspberry-pi2-node-dockerhub-link], [github][armv7hf-raspberry-pi2-node-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-python | [Docker Hub][armv7hf-raspberry-pi2-python-dockerhub-link], [github][armv7hf-raspberry-pi2-python-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-golang | [Docker Hub][armv7hf-raspberry-pi2-golang-dockerhub-link], [github][armv7hf-raspberry-pi2-golang-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-openjdk | [Docker Hub][armv7hf-raspberry-pi2-openjdk-dockerhub-link], [github][armv7hf-raspberry-pi2-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-alpine | [Docker Hub][armv7hf-raspberry-pi2-alpine-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/raspberry-pi2-alpine-buildpack-deps | [Docker Hub][armv7hf-raspberry-pi2-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/raspberry-pi2-alpine-node | [Docker Hub][armv7hf-raspberry-pi2-alpine-node-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-node-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-alpine-python | [Docker Hub][armv7hf-raspberry-pi2-alpine-python-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-python-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-alpine-golang | [Docker Hub][armv7hf-raspberry-pi2-alpine-golang-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-alpine-openjdk | [Docker Hub][armv7hf-raspberry-pi2-alpine-openjdk-dockerhub-link], [github][armv7hf-raspberry-pi2-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-fedora | [Docker Hub][armv7hf-raspberry-pi2-fedora-node-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/raspberry-pi2-fedora-buildpack-deps | [Docker Hub][armv7hf-raspberry-pi2-fedora-node-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/raspberry-pi2-fedora-node | [Docker Hub][armv7hf-raspberry-pi2-fedora-node-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-node-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-fedora-python | [Docker Hub][armv7hf-raspberry-pi2-fedora-python-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-python-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-fedora-golang | [Docker Hub][armv7hf-raspberry-pi2-fedora-golang-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-fedora-openjdk | [Docker Hub][armv7hf-raspberry-pi2-fedora-openjdk-dockerhub-link], [github][armv7hf-raspberry-pi2-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-ubuntu | [Docker Hub][armv7hf-raspberry-pi2-ubuntu-dockerhub-link], [github][armv7hf-raspberry-pi2-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/raspberry-pi2-ubuntu-buildpack-deps | [Docker Hub][armv7hf-raspberry-pi2-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-raspberry-pi2-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/raspberry-pi2-ubuntu-node | [Docker Hub][armv7hf-raspberry-pi2-ubuntu-node-dockerhub-link], [github][armv7hf-raspberry-pi2-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-ubuntu-python | [Docker Hub][armv7hf-raspberry-pi2-ubuntu-python-dockerhub-link], [github][armv7hf-raspberry-pi2-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberry-pi2-ubuntu-golang | [Docker Hub][armv7hf-raspberry-pi2-ubuntu-golang-dockerhub-link], [github][armv7hf-raspberry-pi2-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-raspberry-pi2-ubuntu-golang-dockerhub-tag-link] |


##### Raspberry Pi 3

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/raspberrypi3-debian | [Docker Hub][armv7hf-raspberrypi3-dockerhub-link], [github][armv7hf-raspberrypi3-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/raspberrypi3-buildpack-deps | [Docker Hub][armv7hf-raspberrypi3-buildpack-deps-dockerhub-link], [github][armv7hf-raspberrypi3-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/raspberrypi3-node | [Docker Hub][armv7hf-raspberrypi3-node-dockerhub-link], [github][armv7hf-raspberrypi3-node-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-python | [Docker Hub][armv7hf-raspberrypi3-python-dockerhub-link], [github][armv7hf-raspberrypi3-python-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-golang | [Docker Hub][armv7hf-raspberrypi3-golang-dockerhub-link], [github][armv7hf-raspberrypi3-golang-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-openjdk | [Docker Hub][armv7hf-raspberrypi3-openjdk-dockerhub-link], [github][armv7hf-raspberrypi3-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-alpine | [Docker Hub][armv7hf-raspberrypi3-alpine-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/raspberrypi3-alpine-buildpack-deps | [Docker Hub][armv7hf-raspberrypi3-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/raspberrypi3-alpine-node | [Docker Hub][armv7hf-raspberrypi3-alpine-node-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-node-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-alpine-python | [Docker Hub][armv7hf-raspberrypi3-alpine-python-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-python-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-alpine-golang | [Docker Hub][armv7hf-raspberrypi3-alpine-golang-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-alpine-openjdk | [Docker Hub][armv7hf-raspberrypi3-alpine-openjdk-dockerhub-link], [github][armv7hf-raspberrypi3-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-fedora | [Docker Hub][armv7hf-raspberrypi3-fedora-node-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/raspberrypi3-fedora-buildpack-deps | [Docker Hub][armv7hf-raspberrypi3-fedora-node-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/raspberrypi3-fedora-node | [Docker Hub][armv7hf-raspberrypi3-fedora-node-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-node-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-fedora-python | [Docker Hub][armv7hf-raspberrypi3-fedora-python-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-python-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-fedora-golang | [Docker Hub][armv7hf-raspberrypi3-fedora-golang-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-fedora-openjdk | [Docker Hub][armv7hf-raspberrypi3-fedora-openjdk-dockerhub-link], [github][armv7hf-raspberrypi3-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-ubuntu | [Docker Hub][armv7hf-raspberrypi3-ubuntu-dockerhub-link], [github][armv7hf-raspberrypi3-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/raspberrypi3-ubuntu-buildpack-deps | [Docker Hub][armv7hf-raspberrypi3-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-raspberrypi3-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/raspberrypi3-ubuntu-node | [Docker Hub][armv7hf-raspberrypi3-ubuntu-node-dockerhub-link], [github][armv7hf-raspberrypi3-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-ubuntu-python | [Docker Hub][armv7hf-raspberrypi3-ubuntu-python-dockerhub-link], [github][armv7hf-raspberrypi3-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/raspberrypi3-ubuntu-golang | [Docker Hub][armv7hf-raspberrypi3-ubuntu-golang-dockerhub-link], [github][armv7hf-raspberrypi3-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-raspberrypi3-ubuntu-golang-dockerhub-tag-link] |


##### Beaglebone Black

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/beaglebone-black-debian | [Docker Hub][armv7hf-beaglebone-black-dockerhub-link], [github][armv7hf-beaglebone-black-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/beaglebone-black-buildpack-deps | [Docker Hub][armv7hf-beaglebone-black-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-black-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/beaglebone-black-node | [Docker Hub][armv7hf-beaglebone-black-node-dockerhub-link], [github][armv7hf-beaglebone-black-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-python | [Docker Hub][armv7hf-beaglebone-black-python-dockerhub-link], [github][armv7hf-beaglebone-black-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-golang | [Docker Hub][armv7hf-beaglebone-black-golang-dockerhub-link], [github][armv7hf-beaglebone-black-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-openjdk | [Docker Hub][armv7hf-beaglebone-black-openjdk-dockerhub-link], [github][armv7hf-beaglebone-black-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-alpine | [Docker Hub][armv7hf-beaglebone-black-alpine-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/beaglebone-black-alpine-buildpack-deps | [Docker Hub][armv7hf-beaglebone-black-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/beaglebone-black-alpine-node | [Docker Hub][armv7hf-beaglebone-black-alpine-node-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-alpine-python | [Docker Hub][armv7hf-beaglebone-black-alpine-python-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-alpine-golang | [Docker Hub][armv7hf-beaglebone-black-alpine-golang-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-alpine-openjdk | [Docker Hub][armv7hf-beaglebone-black-alpine-openjdk-dockerhub-link], [github][armv7hf-beaglebone-black-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-fedora | [Docker Hub][armv7hf-beaglebone-black-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/beaglebone-black-fedora-buildpack-deps | [Docker Hub][armv7hf-beaglebone-black-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/beaglebone-black-fedora-node | [Docker Hub][armv7hf-beaglebone-black-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-fedora-python | [Docker Hub][armv7hf-beaglebone-black-fedora-python-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-fedora-golang | [Docker Hub][armv7hf-beaglebone-black-fedora-golang-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-fedora-openjdk | [Docker Hub][armv7hf-beaglebone-black-fedora-openjdk-dockerhub-link], [github][armv7hf-beaglebone-black-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-ubuntu | [Docker Hub][armv7hf-beaglebone-black-ubuntu-dockerhub-link], [github][armv7hf-beaglebone-black-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/beaglebone-black-ubuntu-buildpack-deps | [Docker Hub][armv7hf-beaglebone-black-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-black-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/beaglebone-black-ubuntu-node | [Docker Hub][armv7hf-beaglebone-black-ubuntu-node-dockerhub-link], [github][armv7hf-beaglebone-black-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-ubuntu-python | [Docker Hub][armv7hf-beaglebone-black-ubuntu-python-dockerhub-link], [github][armv7hf-beaglebone-black-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-black-ubuntu-golang | [Docker Hub][armv7hf-beaglebone-black-ubuntu-golang-dockerhub-link], [github][armv7hf-beaglebone-black-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-black-ubuntu-golang-dockerhub-tag-link] |


##### Beaglebone Green

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/beaglebone-green-debian | [Docker Hub][armv7hf-beaglebone-green-dockerhub-link], [github][armv7hf-beaglebone-green-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/beaglebone-green-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/beaglebone-green-node | [Docker Hub][armv7hf-beaglebone-green-node-dockerhub-link], [github][armv7hf-beaglebone-green-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-python | [Docker Hub][armv7hf-beaglebone-green-python-dockerhub-link], [github][armv7hf-beaglebone-green-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-golang | [Docker Hub][armv7hf-beaglebone-green-golang-dockerhub-link], [github][armv7hf-beaglebone-green-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-openjdk | [Docker Hub][armv7hf-beaglebone-green-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-alpine | [Docker Hub][armv7hf-beaglebone-green-alpine-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/beaglebone-green-alpine-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/beaglebone-green-alpine-node | [Docker Hub][armv7hf-beaglebone-green-alpine-node-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-alpine-python | [Docker Hub][armv7hf-beaglebone-green-alpine-python-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-alpine-golang | [Docker Hub][armv7hf-beaglebone-green-alpine-golang-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-alpine-openjdk | [Docker Hub][armv7hf-beaglebone-green-alpine-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-fedora | [Docker Hub][armv7hf-beaglebone-green-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/beaglebone-green-fedora-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/beaglebone-green-fedora-node | [Docker Hub][armv7hf-beaglebone-green-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-fedora-python | [Docker Hub][armv7hf-beaglebone-green-fedora-python-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-fedora-golang | [Docker Hub][armv7hf-beaglebone-green-fedora-golang-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-fedora-openjdk | [Docker Hub][armv7hf-beaglebone-green-fedora-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-ubuntu | [Docker Hub][armv7hf-beaglebone-green-ubuntu-dockerhub-link], [github][armv7hf-beaglebone-green-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/beaglebone-green-ubuntu-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/beaglebone-green-ubuntu-node | [Docker Hub][armv7hf-beaglebone-green-ubuntu-node-dockerhub-link], [github][armv7hf-beaglebone-green-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-ubuntu-python | [Docker Hub][armv7hf-beaglebone-green-ubuntu-python-dockerhub-link], [github][armv7hf-beaglebone-green-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-ubuntu-golang | [Docker Hub][armv7hf-beaglebone-green-ubuntu-golang-dockerhub-link], [github][armv7hf-beaglebone-green-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-ubuntu-golang-dockerhub-tag-link] |


##### Beaglebone Green Wireless

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/beaglebone-green-wifi-debian | [Docker Hub][armv7hf-beaglebone-green-wifi-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/beaglebone-green-wifi-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-wifi-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/beaglebone-green-wifi-node | [Docker Hub][armv7hf-beaglebone-green-wifi-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-python | [Docker Hub][armv7hf-beaglebone-green-wifi-python-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-golang | [Docker Hub][armv7hf-beaglebone-green-wifi-golang-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-openjdk | [Docker Hub][armv7hf-beaglebone-green-wifi-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine-node | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine-python | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-python-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine-golang | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-golang-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-alpine-openjdk | [Docker Hub][armv7hf-beaglebone-green-wifi-alpine-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora-node | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora-python | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-python-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora-golang | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-golang-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-fedora-openjdk | [Docker Hub][armv7hf-beaglebone-green-wifi-fedora-openjdk-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-ubuntu | [Docker Hub][armv7hf-beaglebone-green-wifi-ubuntu-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/beaglebone-green-wifi-ubuntu-buildpack-deps | [Docker Hub][armv7hf-beaglebone-green-wifi-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/beaglebone-green-wifi-ubuntu-node | [Docker Hub][armv7hf-beaglebone-green-wifi-ubuntu-node-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-ubuntu-python | [Docker Hub][armv7hf-beaglebone-green-wifi-ubuntu-python-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/beaglebone-green-wifi-ubuntu-golang | [Docker Hub][armv7hf-beaglebone-green-wifi-ubuntu-golang-dockerhub-link], [github][armv7hf-beaglebone-green-wifi-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-beaglebone-green-wifi-ubuntu-golang-dockerhub-tag-link] |


##### VIA VAB 820-quad

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/via-vab820-quad-debian | [Docker Hub][armv7hf-via-vab820-quad-dockerhub-link], [github][armv7hf-via-vab820-quad-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/via-vab820-quad-buildpack-deps | [Docker Hub][armv7hf-via-vab820-quad-buildpack-deps-dockerhub-link], [github][armv7hf-via-vab820-quad-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/via-vab820-quad-node | [Docker Hub][armv7hf-via-vab820-quad-node-dockerhub-link], [github][armv7hf-via-vab820-quad-node-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-node-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-python | [Docker Hub][armv7hf-via-vab820-quad-python-dockerhub-link], [github][armv7hf-via-vab820-quad-python-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-python-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-golang | [Docker Hub][armv7hf-via-vab820-quad-golang-dockerhub-link], [github][armv7hf-via-vab820-quad-golang-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-openjdk | [Docker Hub][armv7hf-via-vab820-quad-openjdk-dockerhub-link], [github][armv7hf-via-vab820-quad-openjdk-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-alpine | [Docker Hub][armv7hf-via-vab820-quad-alpine-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/via-vab820-quad-alpine-buildpack-deps | [Docker Hub][armv7hf-via-vab820-quad-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/via-vab820-quad-alpine-node | [Docker Hub][armv7hf-via-vab820-quad-alpine-node-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-node-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-alpine-python | [Docker Hub][armv7hf-via-vab820-quad-alpine-python-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-python-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-alpine-golang | [Docker Hub][armv7hf-via-vab820-quad-alpine-golang-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-alpine-openjdk | [Docker Hub][armv7hf-via-vab820-quad-alpine-openjdk-dockerhub-link], [github][armv7hf-via-vab820-quad-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-fedora | [Docker Hub][armv7hf-via-vab820-quad-fedora-node-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/via-vab820-quad-fedora-buildpack-deps | [Docker Hub][armv7hf-via-vab820-quad-fedora-node-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/via-vab820-quad-fedora-node | [Docker Hub][armv7hf-via-vab820-quad-fedora-node-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-node-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-fedora-python | [Docker Hub][armv7hf-via-vab820-quad-fedora-python-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-python-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-fedora-golang | [Docker Hub][armv7hf-via-vab820-quad-fedora-golang-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-fedora-openjdk | [Docker Hub][armv7hf-via-vab820-quad-fedora-openjdk-dockerhub-link], [github][armv7hf-via-vab820-quad-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-ubuntu | [Docker Hub][armv7hf-via-vab820-quad-ubuntu-dockerhub-link], [github][armv7hf-via-vab820-quad-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/via-vab820-quad-ubuntu-buildpack-deps | [Docker Hub][armv7hf-via-vab820-quad-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-via-vab820-quad-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/via-vab820-quad-ubuntu-node | [Docker Hub][armv7hf-via-vab820-quad-ubuntu-node-dockerhub-link], [github][armv7hf-via-vab820-quad-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-ubuntu-python | [Docker Hub][armv7hf-via-vab820-quad-ubuntu-python-dockerhub-link], [github][armv7hf-via-vab820-quad-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/via-vab820-quad-ubuntu-golang | [Docker Hub][armv7hf-via-vab820-quad-ubuntu-golang-dockerhub-link], [github][armv7hf-via-vab820-quad-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-via-vab820-quad-ubuntu-golang-dockerhub-tag-link] |


##### Zynq ZC702

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/zynq-xz702-debian | [Docker Hub][armv7hf-zynq-xz702-dockerhub-link], [github][armv7hf-zynq-xz702-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/zynq-xz702-buildpack-deps | [Docker Hub][armv7hf-zynq-xz702-buildpack-deps-dockerhub-link], [github][armv7hf-zynq-xz702-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/zynq-xz702-node | [Docker Hub][armv7hf-zynq-xz702-node-dockerhub-link], [github][armv7hf-zynq-xz702-node-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-node-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-python | [Docker Hub][armv7hf-zynq-xz702-python-dockerhub-link], [github][armv7hf-zynq-xz702-python-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-python-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-golang | [Docker Hub][armv7hf-zynq-xz702-golang-dockerhub-link], [github][armv7hf-zynq-xz702-golang-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-openjdk | [Docker Hub][armv7hf-zynq-xz702-openjdk-dockerhub-link], [github][armv7hf-zynq-xz702-openjdk-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-alpine | [Docker Hub][armv7hf-zynq-xz702-alpine-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/zynq-xz702-alpine-buildpack-deps | [Docker Hub][armv7hf-zynq-xz702-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/zynq-xz702-alpine-node | [Docker Hub][armv7hf-zynq-xz702-alpine-node-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-node-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-alpine-python | [Docker Hub][armv7hf-zynq-xz702-alpine-python-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-python-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-alpine-golang | [Docker Hub][armv7hf-zynq-xz702-alpine-golang-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-alpine-openjdk | [Docker Hub][armv7hf-zynq-xz702-alpine-openjdk-dockerhub-link], [github][armv7hf-zynq-xz702-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-fedora | [Docker Hub][armv7hf-zynq-xz702-fedora-node-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/zynq-xz702-fedora-buildpack-deps | [Docker Hub][armv7hf-zynq-xz702-fedora-node-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/zynq-xz702-fedora-node | [Docker Hub][armv7hf-zynq-xz702-fedora-node-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-node-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-fedora-python | [Docker Hub][armv7hf-zynq-xz702-fedora-python-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-python-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-fedora-golang | [Docker Hub][armv7hf-zynq-xz702-fedora-golang-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-fedora-openjdk | [Docker Hub][armv7hf-zynq-xz702-fedora-openjdk-dockerhub-link], [github][armv7hf-zynq-xz702-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-ubuntu | [Docker Hub][armv7hf-zynq-xz702-ubuntu-dockerhub-link], [github][armv7hf-zynq-xz702-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/zynq-xz702-ubuntu-buildpack-deps | [Docker Hub][armv7hf-zynq-xz702-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-zynq-xz702-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/zynq-xz702-ubuntu-node | [Docker Hub][armv7hf-zynq-xz702-ubuntu-node-dockerhub-link], [github][armv7hf-zynq-xz702-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-ubuntu-python | [Docker Hub][armv7hf-zynq-xz702-ubuntu-python-dockerhub-link], [github][armv7hf-zynq-xz702-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/zynq-xz702-ubuntu-golang | [Docker Hub][armv7hf-zynq-xz702-ubuntu-golang-dockerhub-link], [github][armv7hf-zynq-xz702-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-zynq-xz702-ubuntu-golang-dockerhub-tag-link] |


##### ODROID-C1+

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/odroid-c1-debian | [Docker Hub][armv7hf-odroid-c1-dockerhub-link], [github][armv7hf-odroid-c1-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/odroid-c1-buildpack-deps | [Docker Hub][armv7hf-odroid-c1-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-c1-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/odroid-c1-node | [Docker Hub][armv7hf-odroid-c1-node-dockerhub-link], [github][armv7hf-odroid-c1-node-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-python | [Docker Hub][armv7hf-odroid-c1-python-dockerhub-link], [github][armv7hf-odroid-c1-python-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-golang | [Docker Hub][armv7hf-odroid-c1-golang-dockerhub-link], [github][armv7hf-odroid-c1-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-openjdk | [Docker Hub][armv7hf-odroid-c1-openjdk-dockerhub-link], [github][armv7hf-odroid-c1-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-alpine | [Docker Hub][armv7hf-odroid-c1-alpine-dockerhub-link], [github][armv7hf-odroid-c1-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/odroid-c1-alpine-buildpack-deps | [Docker Hub][armv7hf-odroid-c1-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-c1-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/odroid-c1-alpine-node | [Docker Hub][armv7hf-odroid-c1-alpine-node-dockerhub-link], [github][armv7hf-odroid-c1-alpine-node-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-alpine-python | [Docker Hub][armv7hf-odroid-c1-alpine-python-dockerhub-link], [github][armv7hf-odroid-c1-alpine-python-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-alpine-golang | [Docker Hub][armv7hf-odroid-c1-alpine-golang-dockerhub-link], [github][armv7hf-odroid-c1-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-alpine-openjdk | [Docker Hub][armv7hf-odroid-c1-alpine-openjdk-dockerhub-link], [github][armv7hf-odroid-c1-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-fedora | [Docker Hub][armv7hf-odroid-c1-fedora-node-dockerhub-link], [github][armv7hf-odroid-c1-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/odroid-c1-fedora-buildpack-deps | [Docker Hub][armv7hf-odroid-c1-fedora-node-dockerhub-link], [github][armv7hf-odroid-c1-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/odroid-c1-fedora-node | [Docker Hub][armv7hf-odroid-c1-fedora-node-dockerhub-link], [github][armv7hf-odroid-c1-fedora-node-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-fedora-python | [Docker Hub][armv7hf-odroid-c1-fedora-python-dockerhub-link], [github][armv7hf-odroid-c1-fedora-python-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-fedora-golang | [Docker Hub][armv7hf-odroid-c1-fedora-golang-dockerhub-link], [github][armv7hf-odroid-c1-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-fedora-openjdk | [Docker Hub][armv7hf-odroid-c1-fedora-openjdk-dockerhub-link], [github][armv7hf-odroid-c1-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-ubuntu | [Docker Hub][armv7hf-odroid-c1-ubuntu-dockerhub-link], [github][armv7hf-odroid-c1-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/odroid-c1-ubuntu-buildpack-deps | [Docker Hub][armv7hf-odroid-c1-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-c1-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/odroid-c1-ubuntu-node | [Docker Hub][armv7hf-odroid-c1-ubuntu-node-dockerhub-link], [github][armv7hf-odroid-c1-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-ubuntu-python | [Docker Hub][armv7hf-odroid-c1-ubuntu-python-dockerhub-link], [github][armv7hf-odroid-c1-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-c1-ubuntu-golang | [Docker Hub][armv7hf-odroid-c1-ubuntu-golang-dockerhub-link], [github][armv7hf-odroid-c1-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-c1-ubuntu-golang-dockerhub-tag-link] |


##### ODROID-XU4

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/odroid-xu4-debian | [Docker Hub][armv7hf-odroid-xu4-dockerhub-link], [github][armv7hf-odroid-xu4-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/odroid-xu4-buildpack-deps | [Docker Hub][armv7hf-odroid-xu4-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-xu4-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/odroid-xu4-node | [Docker Hub][armv7hf-odroid-xu4-node-dockerhub-link], [github][armv7hf-odroid-xu4-node-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-python | [Docker Hub][armv7hf-odroid-xu4-python-dockerhub-link], [github][armv7hf-odroid-xu4-python-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-golang | [Docker Hub][armv7hf-odroid-xu4-golang-dockerhub-link], [github][armv7hf-odroid-xu4-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-openjdk | [Docker Hub][armv7hf-odroid-xu4-openjdk-dockerhub-link], [github][armv7hf-odroid-xu4-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-alpine | [Docker Hub][armv7hf-odroid-xu4-alpine-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/odroid-xu4-alpine-buildpack-deps | [Docker Hub][armv7hf-odroid-xu4-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/odroid-xu4-alpine-node | [Docker Hub][armv7hf-odroid-xu4-alpine-node-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-node-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-alpine-python | [Docker Hub][armv7hf-odroid-xu4-alpine-python-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-python-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-alpine-golang | [Docker Hub][armv7hf-odroid-xu4-alpine-golang-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-alpine-openjdk | [Docker Hub][armv7hf-odroid-xu4-alpine-openjdk-dockerhub-link], [github][armv7hf-odroid-xu4-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-fedora | [Docker Hub][armv7hf-odroid-xu4-fedora-node-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/odroid-xu4-fedora-buildpack-deps | [Docker Hub][armv7hf-odroid-xu4-fedora-node-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/odroid-xu4-fedora-node | [Docker Hub][armv7hf-odroid-xu4-fedora-node-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-node-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-fedora-python | [Docker Hub][armv7hf-odroid-xu4-fedora-python-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-python-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-fedora-golang | [Docker Hub][armv7hf-odroid-xu4-fedora-golang-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-fedora-openjdk | [Docker Hub][armv7hf-odroid-xu4-fedora-openjdk-dockerhub-link], [github][armv7hf-odroid-xu4-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-ubuntu | [Docker Hub][armv7hf-odroid-xu4-ubuntu-dockerhub-link], [github][armv7hf-odroid-xu4-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/odroid-xu4-ubuntu-buildpack-deps | [Docker Hub][armv7hf-odroid-xu4-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-odroid-xu4-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/odroid-xu4-ubuntu-node | [Docker Hub][armv7hf-odroid-xu4-ubuntu-node-dockerhub-link], [github][armv7hf-odroid-xu4-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-ubuntu-python | [Docker Hub][armv7hf-odroid-xu4-ubuntu-python-dockerhub-link], [github][armv7hf-odroid-xu4-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/odroid-xu4-ubuntu-golang | [Docker Hub][armv7hf-odroid-xu4-ubuntu-golang-dockerhub-link], [github][armv7hf-odroid-xu4-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-odroid-xu4-ubuntu-golang-dockerhub-tag-link] |


##### Parallella

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/parallella-debian | [Docker Hub][armv7hf-parallella-dockerhub-link], [github][armv7hf-parallella-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/parallella-buildpack-deps | [Docker Hub][armv7hf-parallella-buildpack-deps-dockerhub-link], [github][armv7hf-parallella-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/parallella-node | [Docker Hub][armv7hf-parallella-node-dockerhub-link], [github][armv7hf-parallella-node-github-link] | For available image tags, refer [here][armv7hf-parallella-node-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-python | [Docker Hub][armv7hf-parallella-python-dockerhub-link], [github][armv7hf-parallella-python-github-link] | For available image tags, refer [here][armv7hf-parallella-python-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-golang | [Docker Hub][armv7hf-parallella-golang-dockerhub-link], [github][armv7hf-parallella-golang-github-link] | For available image tags, refer [here][armv7hf-parallella-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-openjdk | [Docker Hub][armv7hf-parallella-openjdk-dockerhub-link], [github][armv7hf-parallella-openjdk-github-link] | For available image tags, refer [here][armv7hf-parallella-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-alpine | [Docker Hub][armv7hf-parallella-alpine-dockerhub-link], [github][armv7hf-parallella-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/parallella-alpine-buildpack-deps | [Docker Hub][armv7hf-parallella-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-parallella-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/parallella-alpine-node | [Docker Hub][armv7hf-parallella-alpine-node-dockerhub-link], [github][armv7hf-parallella-alpine-node-github-link] | For available image tags, refer [here][armv7hf-parallella-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-alpine-python | [Docker Hub][armv7hf-parallella-alpine-python-dockerhub-link], [github][armv7hf-parallella-alpine-python-github-link] | For available image tags, refer [here][armv7hf-parallella-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-alpine-golang | [Docker Hub][armv7hf-parallella-alpine-golang-dockerhub-link], [github][armv7hf-parallella-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-parallella-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-alpine-openjdk | [Docker Hub][armv7hf-parallella-alpine-openjdk-dockerhub-link], [github][armv7hf-parallella-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-parallella-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-fedora | [Docker Hub][armv7hf-parallella-fedora-node-dockerhub-link], [github][armv7hf-parallella-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/parallella-fedora-buildpack-deps | [Docker Hub][armv7hf-parallella-fedora-node-dockerhub-link], [github][armv7hf-parallella-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/parallella-fedora-node | [Docker Hub][armv7hf-parallella-fedora-node-dockerhub-link], [github][armv7hf-parallella-fedora-node-github-link] | For available image tags, refer [here][armv7hf-parallella-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-fedora-python | [Docker Hub][armv7hf-parallella-fedora-python-dockerhub-link], [github][armv7hf-parallella-fedora-python-github-link] | For available image tags, refer [here][armv7hf-parallella-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-fedora-golang | [Docker Hub][armv7hf-parallella-fedora-golang-dockerhub-link], [github][armv7hf-parallella-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-parallella-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-fedora-openjdk | [Docker Hub][armv7hf-parallella-fedora-openjdk-dockerhub-link], [github][armv7hf-parallella-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-parallella-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-ubuntu | [Docker Hub][armv7hf-parallella-ubuntu-dockerhub-link], [github][armv7hf-parallella-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/parallella-ubuntu-buildpack-deps | [Docker Hub][armv7hf-parallella-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-parallella-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/parallella-ubuntu-node | [Docker Hub][armv7hf-parallella-ubuntu-node-dockerhub-link], [github][armv7hf-parallella-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-parallella-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-ubuntu-python | [Docker Hub][armv7hf-parallella-ubuntu-python-dockerhub-link], [github][armv7hf-parallella-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-parallella-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/parallella-ubuntu-golang | [Docker Hub][armv7hf-parallella-ubuntu-golang-dockerhub-link], [github][armv7hf-parallella-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-parallella-ubuntu-golang-dockerhub-tag-link] |


##### Nitrogen 6X

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/nitrogen6x-debian | [Docker Hub][armv7hf-nitrogen6x-dockerhub-link], [github][armv7hf-nitrogen6x-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/nitrogen6x-buildpack-deps | [Docker Hub][armv7hf-nitrogen6x-buildpack-deps-dockerhub-link], [github][armv7hf-nitrogen6x-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/nitrogen6x-node | [Docker Hub][armv7hf-nitrogen6x-node-dockerhub-link], [github][armv7hf-nitrogen6x-node-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-node-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-python | [Docker Hub][armv7hf-nitrogen6x-python-dockerhub-link], [github][armv7hf-nitrogen6x-python-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-python-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-golang | [Docker Hub][armv7hf-nitrogen6x-golang-dockerhub-link], [github][armv7hf-nitrogen6x-golang-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-openjdk | [Docker Hub][armv7hf-nitrogen6x-openjdk-dockerhub-link], [github][armv7hf-nitrogen6x-openjdk-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-alpine | [Docker Hub][armv7hf-nitrogen6x-alpine-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/nitrogen6x-alpine-buildpack-deps | [Docker Hub][armv7hf-nitrogen6x-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/nitrogen6x-alpine-node | [Docker Hub][armv7hf-nitrogen6x-alpine-node-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-node-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-alpine-python | [Docker Hub][armv7hf-nitrogen6x-alpine-python-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-python-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-alpine-golang | [Docker Hub][armv7hf-nitrogen6x-alpine-golang-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-alpine-openjdk | [Docker Hub][armv7hf-nitrogen6x-alpine-openjdk-dockerhub-link], [github][armv7hf-nitrogen6x-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-fedora | [Docker Hub][armv7hf-nitrogen6x-fedora-node-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/nitrogen6x-fedora-buildpack-deps | [Docker Hub][armv7hf-nitrogen6x-fedora-node-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/nitrogen6x-fedora-node | [Docker Hub][armv7hf-nitrogen6x-fedora-node-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-node-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-fedora-python | [Docker Hub][armv7hf-nitrogen6x-fedora-python-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-python-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-fedora-golang | [Docker Hub][armv7hf-nitrogen6x-fedora-golang-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-fedora-openjdk | [Docker Hub][armv7hf-nitrogen6x-fedora-openjdk-dockerhub-link], [github][armv7hf-nitrogen6x-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-ubuntu | [Docker Hub][armv7hf-nitrogen6x-ubuntu-dockerhub-link], [github][armv7hf-nitrogen6x-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/nitrogen6x-ubuntu-buildpack-deps | [Docker Hub][armv7hf-nitrogen6x-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-nitrogen6x-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/nitrogen6x-ubuntu-node | [Docker Hub][armv7hf-nitrogen6x-ubuntu-node-dockerhub-link], [github][armv7hf-nitrogen6x-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-ubuntu-python | [Docker Hub][armv7hf-nitrogen6x-ubuntu-python-dockerhub-link], [github][armv7hf-nitrogen6x-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/nitrogen6x-ubuntu-golang | [Docker Hub][armv7hf-nitrogen6x-ubuntu-golang-dockerhub-link], [github][armv7hf-nitrogen6x-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-nitrogen6x-ubuntu-golang-dockerhub-tag-link] |


##### Hummingboard

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/hummingboard-debian | [Docker Hub][armv7hf-hummingboard-dockerhub-link], [github][armv7hf-hummingboard-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/hummingboard-buildpack-deps | [Docker Hub][armv7hf-hummingboard-buildpack-deps-dockerhub-link], [github][armv7hf-hummingboard-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/hummingboard-node | [Docker Hub][armv7hf-hummingboard-node-dockerhub-link], [github][armv7hf-hummingboard-node-github-link] | For available image tags, refer [here][armv7hf-hummingboard-node-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-python | [Docker Hub][armv7hf-hummingboard-python-dockerhub-link], [github][armv7hf-hummingboard-python-github-link] | For available image tags, refer [here][armv7hf-hummingboard-python-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-golang | [Docker Hub][armv7hf-hummingboard-golang-dockerhub-link], [github][armv7hf-hummingboard-golang-github-link] | For available image tags, refer [here][armv7hf-hummingboard-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-openjdk | [Docker Hub][armv7hf-hummingboard-openjdk-dockerhub-link], [github][armv7hf-hummingboard-openjdk-github-link] | For available image tags, refer [here][armv7hf-hummingboard-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-alpine | [Docker Hub][armv7hf-hummingboard-alpine-dockerhub-link], [github][armv7hf-hummingboard-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/hummingboard-alpine-buildpack-deps | [Docker Hub][armv7hf-hummingboard-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-hummingboard-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/hummingboard-alpine-node | [Docker Hub][armv7hf-hummingboard-alpine-node-dockerhub-link], [github][armv7hf-hummingboard-alpine-node-github-link] | For available image tags, refer [here][armv7hf-hummingboard-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-alpine-python | [Docker Hub][armv7hf-hummingboard-alpine-python-dockerhub-link], [github][armv7hf-hummingboard-alpine-python-github-link] | For available image tags, refer [here][armv7hf-hummingboard-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-alpine-golang | [Docker Hub][armv7hf-hummingboard-alpine-golang-dockerhub-link], [github][armv7hf-hummingboard-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-hummingboard-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-alpine-openjdk | [Docker Hub][armv7hf-hummingboard-alpine-openjdk-dockerhub-link], [github][armv7hf-hummingboard-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-hummingboard-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-fedora | [Docker Hub][armv7hf-hummingboard-fedora-node-dockerhub-link], [github][armv7hf-hummingboard-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/hummingboard-fedora-buildpack-deps | [Docker Hub][armv7hf-hummingboard-fedora-node-dockerhub-link], [github][armv7hf-hummingboard-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/hummingboard-fedora-node | [Docker Hub][armv7hf-hummingboard-fedora-node-dockerhub-link], [github][armv7hf-hummingboard-fedora-node-github-link] | For available image tags, refer [here][armv7hf-hummingboard-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-fedora-python | [Docker Hub][armv7hf-hummingboard-fedora-python-dockerhub-link], [github][armv7hf-hummingboard-fedora-python-github-link] | For available image tags, refer [here][armv7hf-hummingboard-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-fedora-golang | [Docker Hub][armv7hf-hummingboard-fedora-golang-dockerhub-link], [github][armv7hf-hummingboard-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-hummingboard-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-fedora-openjdk | [Docker Hub][armv7hf-hummingboard-fedora-openjdk-dockerhub-link], [github][armv7hf-hummingboard-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-hummingboard-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-ubuntu | [Docker Hub][armv7hf-hummingboard-ubuntu-dockerhub-link], [github][armv7hf-hummingboard-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/hummingboard-ubuntu-buildpack-deps | [Docker Hub][armv7hf-hummingboard-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-hummingboard-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/hummingboard-ubuntu-node | [Docker Hub][armv7hf-hummingboard-ubuntu-node-dockerhub-link], [github][armv7hf-hummingboard-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-hummingboard-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-ubuntu-python | [Docker Hub][armv7hf-hummingboard-ubuntu-python-dockerhub-link], [github][armv7hf-hummingboard-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-hummingboard-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/hummingboard-ubuntu-golang | [Docker Hub][armv7hf-hummingboard-ubuntu-golang-dockerhub-link], [github][armv7hf-hummingboard-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-hummingboard-ubuntu-golang-dockerhub-tag-link] |


##### Colibri iMX6dl

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/colibri-imx6dl-debian | [Docker Hub][armv7hf-colibri-imx6dl-dockerhub-link], [github][armv7hf-colibri-imx6dl-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/colibri-imx6dl-buildpack-deps | [Docker Hub][armv7hf-colibri-imx6dl-buildpack-deps-dockerhub-link], [github][armv7hf-colibri-imx6dl-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/colibri-imx6dl-node | [Docker Hub][armv7hf-colibri-imx6dl-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-node-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-node-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-python | [Docker Hub][armv7hf-colibri-imx6dl-python-dockerhub-link], [github][armv7hf-colibri-imx6dl-python-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-python-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-golang | [Docker Hub][armv7hf-colibri-imx6dl-golang-dockerhub-link], [github][armv7hf-colibri-imx6dl-golang-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-openjdk | [Docker Hub][armv7hf-colibri-imx6dl-openjdk-dockerhub-link], [github][armv7hf-colibri-imx6dl-openjdk-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-alpine | [Docker Hub][armv7hf-colibri-imx6dl-alpine-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/colibri-imx6dl-alpine-buildpack-deps | [Docker Hub][armv7hf-colibri-imx6dl-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/colibri-imx6dl-alpine-node | [Docker Hub][armv7hf-colibri-imx6dl-alpine-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-node-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-alpine-python | [Docker Hub][armv7hf-colibri-imx6dl-alpine-python-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-python-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-alpine-golang | [Docker Hub][armv7hf-colibri-imx6dl-alpine-golang-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-alpine-openjdk | [Docker Hub][armv7hf-colibri-imx6dl-alpine-openjdk-dockerhub-link], [github][armv7hf-colibri-imx6dl-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-fedora | [Docker Hub][armv7hf-colibri-imx6dl-fedora-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/colibri-imx6dl-fedora-buildpack-deps | [Docker Hub][armv7hf-colibri-imx6dl-fedora-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/colibri-imx6dl-fedora-node | [Docker Hub][armv7hf-colibri-imx6dl-fedora-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-node-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-fedora-python | [Docker Hub][armv7hf-colibri-imx6dl-fedora-python-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-python-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-fedora-golang | [Docker Hub][armv7hf-colibri-imx6dl-fedora-golang-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-fedora-openjdk | [Docker Hub][armv7hf-colibri-imx6dl-fedora-openjdk-dockerhub-link], [github][armv7hf-colibri-imx6dl-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-ubuntu | [Docker Hub][armv7hf-colibri-imx6dl-ubuntu-dockerhub-link], [github][armv7hf-colibri-imx6dl-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/colibri-imx6dl-ubuntu-buildpack-deps | [Docker Hub][armv7hf-colibri-imx6dl-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-colibri-imx6dl-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/colibri-imx6dl-ubuntu-node | [Docker Hub][armv7hf-colibri-imx6dl-ubuntu-node-dockerhub-link], [github][armv7hf-colibri-imx6dl-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-ubuntu-python | [Docker Hub][armv7hf-colibri-imx6dl-ubuntu-python-dockerhub-link], [github][armv7hf-colibri-imx6dl-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/colibri-imx6dl-ubuntu-golang | [Docker Hub][armv7hf-colibri-imx6dl-ubuntu-golang-dockerhub-link], [github][armv7hf-colibri-imx6dl-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-colibri-imx6dl-ubuntu-golang-dockerhub-tag-link] |


##### Apslis iMX6q

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/apalis-imx6q-debian | [Docker Hub][armv7hf-apalis-imx6q-dockerhub-link], [github][armv7hf-apalis-imx6q-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/apalis-imx6q-buildpack-deps | [Docker Hub][armv7hf-apalis-imx6q-buildpack-deps-dockerhub-link], [github][armv7hf-apalis-imx6q-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/apalis-imx6q-node | [Docker Hub][armv7hf-apalis-imx6q-node-dockerhub-link], [github][armv7hf-apalis-imx6q-node-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-node-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-python | [Docker Hub][armv7hf-apalis-imx6q-python-dockerhub-link], [github][armv7hf-apalis-imx6q-python-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-python-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-golang | [Docker Hub][armv7hf-apalis-imx6q-golang-dockerhub-link], [github][armv7hf-apalis-imx6q-golang-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-openjdk | [Docker Hub][armv7hf-apalis-imx6q-openjdk-dockerhub-link], [github][armv7hf-apalis-imx6q-openjdk-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-alpine | [Docker Hub][armv7hf-apalis-imx6q-alpine-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/apalis-imx6q-alpine-buildpack-deps | [Docker Hub][armv7hf-apalis-imx6q-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/apalis-imx6q-alpine-node | [Docker Hub][armv7hf-apalis-imx6q-alpine-node-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-node-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-alpine-python | [Docker Hub][armv7hf-apalis-imx6q-alpine-python-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-python-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-alpine-golang | [Docker Hub][armv7hf-apalis-imx6q-alpine-golang-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-alpine-openjdk | [Docker Hub][armv7hf-apalis-imx6q-alpine-openjdk-dockerhub-link], [github][armv7hf-apalis-imx6q-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-fedora | [Docker Hub][armv7hf-apalis-imx6q-fedora-node-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/apalis-imx6q-fedora-buildpack-deps | [Docker Hub][armv7hf-apalis-imx6q-fedora-node-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/apalis-imx6q-fedora-node | [Docker Hub][armv7hf-apalis-imx6q-fedora-node-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-node-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-fedora-python | [Docker Hub][armv7hf-apalis-imx6q-fedora-python-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-python-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-fedora-golang | [Docker Hub][armv7hf-apalis-imx6q-fedora-golang-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-fedora-openjdk | [Docker Hub][armv7hf-apalis-imx6q-fedora-openjdk-dockerhub-link], [github][armv7hf-apalis-imx6q-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-ubuntu | [Docker Hub][armv7hf-apalis-imx6q-ubuntu-dockerhub-link], [github][armv7hf-apalis-imx6q-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/apalis-imx6q-ubuntu-buildpack-deps | [Docker Hub][armv7hf-apalis-imx6q-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-apalis-imx6q-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/apalis-imx6q-ubuntu-node | [Docker Hub][armv7hf-apalis-imx6q-ubuntu-node-dockerhub-link], [github][armv7hf-apalis-imx6q-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-ubuntu-python | [Docker Hub][armv7hf-apalis-imx6q-ubuntu-python-dockerhub-link], [github][armv7hf-apalis-imx6q-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/apalis-imx6q-ubuntu-golang | [Docker Hub][armv7hf-apalis-imx6q-ubuntu-golang-dockerhub-link], [github][armv7hf-apalis-imx6q-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-apalis-imx6q-ubuntu-golang-dockerhub-tag-link] |


##### TS-4900

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/ts4900-debian | [Docker Hub][armv7hf-ts4900-dockerhub-link], [github][armv7hf-ts4900-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/ts4900-buildpack-deps | [Docker Hub][armv7hf-ts4900-buildpack-deps-dockerhub-link], [github][armv7hf-ts4900-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/ts4900-node | [Docker Hub][armv7hf-ts4900-node-dockerhub-link], [github][armv7hf-ts4900-node-github-link] | For available image tags, refer [here][armv7hf-ts4900-node-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-python | [Docker Hub][armv7hf-ts4900-python-dockerhub-link], [github][armv7hf-ts4900-python-github-link] | For available image tags, refer [here][armv7hf-ts4900-python-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-golang | [Docker Hub][armv7hf-ts4900-golang-dockerhub-link], [github][armv7hf-ts4900-golang-github-link] | For available image tags, refer [here][armv7hf-ts4900-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-openjdk | [Docker Hub][armv7hf-ts4900-openjdk-dockerhub-link], [github][armv7hf-ts4900-openjdk-github-link] | For available image tags, refer [here][armv7hf-ts4900-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-alpine | [Docker Hub][armv7hf-ts4900-alpine-dockerhub-link], [github][armv7hf-ts4900-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/ts4900-alpine-buildpack-deps | [Docker Hub][armv7hf-ts4900-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-ts4900-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/ts4900-alpine-node | [Docker Hub][armv7hf-ts4900-alpine-node-dockerhub-link], [github][armv7hf-ts4900-alpine-node-github-link] | For available image tags, refer [here][armv7hf-ts4900-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-alpine-python | [Docker Hub][armv7hf-ts4900-alpine-python-dockerhub-link], [github][armv7hf-ts4900-alpine-python-github-link] | For available image tags, refer [here][armv7hf-ts4900-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-alpine-golang | [Docker Hub][armv7hf-ts4900-alpine-golang-dockerhub-link], [github][armv7hf-ts4900-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-ts4900-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-alpine-openjdk | [Docker Hub][armv7hf-ts4900-alpine-openjdk-dockerhub-link], [github][armv7hf-ts4900-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-ts4900-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-fedora | [Docker Hub][armv7hf-ts4900-fedora-node-dockerhub-link], [github][armv7hf-ts4900-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/ts4900-fedora-buildpack-deps | [Docker Hub][armv7hf-ts4900-fedora-node-dockerhub-link], [github][armv7hf-ts4900-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/ts4900-fedora-node | [Docker Hub][armv7hf-ts4900-fedora-node-dockerhub-link], [github][armv7hf-ts4900-fedora-node-github-link] | For available image tags, refer [here][armv7hf-ts4900-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-fedora-python | [Docker Hub][armv7hf-ts4900-fedora-python-dockerhub-link], [github][armv7hf-ts4900-fedora-python-github-link] | For available image tags, refer [here][armv7hf-ts4900-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-fedora-golang | [Docker Hub][armv7hf-ts4900-fedora-golang-dockerhub-link], [github][armv7hf-ts4900-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-ts4900-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-fedora-openjdk | [Docker Hub][armv7hf-ts4900-fedora-openjdk-dockerhub-link], [github][armv7hf-ts4900-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-ts4900-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-ubuntu | [Docker Hub][armv7hf-ts4900-ubuntu-dockerhub-link], [github][armv7hf-ts4900-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/ts4900-ubuntu-buildpack-deps | [Docker Hub][armv7hf-ts4900-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-ts4900-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/ts4900-ubuntu-node | [Docker Hub][armv7hf-ts4900-ubuntu-node-dockerhub-link], [github][armv7hf-ts4900-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-ts4900-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-ubuntu-python | [Docker Hub][armv7hf-ts4900-ubuntu-python-dockerhub-link], [github][armv7hf-ts4900-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-ts4900-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/ts4900-ubuntu-golang | [Docker Hub][armv7hf-ts4900-ubuntu-golang-dockerhub-link], [github][armv7hf-ts4900-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-ts4900-ubuntu-golang-dockerhub-tag-link] |


##### Samsung Artik 520

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/artik5-debian | [Docker Hub][armv7hf-artik5-dockerhub-link], [github][armv7hf-artik5-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/artik5-buildpack-deps | [Docker Hub][armv7hf-artik5-buildpack-deps-dockerhub-link], [github][armv7hf-artik5-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/artik5-node | [Docker Hub][armv7hf-artik5-node-dockerhub-link], [github][armv7hf-artik5-node-github-link] | For available image tags, refer [here][armv7hf-artik5-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-python | [Docker Hub][armv7hf-artik5-python-dockerhub-link], [github][armv7hf-artik5-python-github-link] | For available image tags, refer [here][armv7hf-artik5-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-golang | [Docker Hub][armv7hf-artik5-golang-dockerhub-link], [github][armv7hf-artik5-golang-github-link] | For available image tags, refer [here][armv7hf-artik5-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-openjdk | [Docker Hub][armv7hf-artik5-openjdk-dockerhub-link], [github][armv7hf-artik5-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik5-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-alpine | [Docker Hub][armv7hf-artik5-alpine-dockerhub-link], [github][armv7hf-artik5-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/artik5-alpine-buildpack-deps | [Docker Hub][armv7hf-artik5-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-artik5-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/artik5-alpine-node | [Docker Hub][armv7hf-artik5-alpine-node-dockerhub-link], [github][armv7hf-artik5-alpine-node-github-link] | For available image tags, refer [here][armv7hf-artik5-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-alpine-python | [Docker Hub][armv7hf-artik5-alpine-python-dockerhub-link], [github][armv7hf-artik5-alpine-python-github-link] | For available image tags, refer [here][armv7hf-artik5-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-alpine-golang | [Docker Hub][armv7hf-artik5-alpine-golang-dockerhub-link], [github][armv7hf-artik5-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-artik5-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-alpine-openjdk | [Docker Hub][armv7hf-artik5-alpine-openjdk-dockerhub-link], [github][armv7hf-artik5-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik5-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-fedora | [Docker Hub][armv7hf-artik5-fedora-node-dockerhub-link], [github][armv7hf-artik5-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/artik5-fedora-buildpack-deps | [Docker Hub][armv7hf-artik5-fedora-node-dockerhub-link], [github][armv7hf-artik5-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/artik5-fedora-node | [Docker Hub][armv7hf-artik5-fedora-node-dockerhub-link], [github][armv7hf-artik5-fedora-node-github-link] | For available image tags, refer [here][armv7hf-artik5-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-fedora-python | [Docker Hub][armv7hf-artik5-fedora-python-dockerhub-link], [github][armv7hf-artik5-fedora-python-github-link] | For available image tags, refer [here][armv7hf-artik5-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-fedora-golang | [Docker Hub][armv7hf-artik5-fedora-golang-dockerhub-link], [github][armv7hf-artik5-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-artik5-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-fedora-openjdk | [Docker Hub][armv7hf-artik5-fedora-openjdk-dockerhub-link], [github][armv7hf-artik5-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik5-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-ubuntu | [Docker Hub][armv7hf-artik5-ubuntu-dockerhub-link], [github][armv7hf-artik5-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/artik5-ubuntu-buildpack-deps | [Docker Hub][armv7hf-artik5-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-artik5-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/artik5-ubuntu-node | [Docker Hub][armv7hf-artik5-ubuntu-node-dockerhub-link], [github][armv7hf-artik5-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-artik5-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-ubuntu-python | [Docker Hub][armv7hf-artik5-ubuntu-python-dockerhub-link], [github][armv7hf-artik5-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-artik5-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik5-ubuntu-golang | [Docker Hub][armv7hf-artik5-ubuntu-golang-dockerhub-link], [github][armv7hf-artik5-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-artik5-ubuntu-golang-dockerhub-tag-link] |


>>>>>>> a5c4876... base-images: Latest updates for base images documentation
##### Samsung Artik 1020

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/artik10-debian | [Docker Hub][armv7hf-artik10-dockerhub-link], [github][armv7hf-artik10-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/artik10-buildpack-deps | [Docker Hub][armv7hf-artik10-buildpack-deps-dockerhub-link], [github][armv7hf-artik10-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/artik10-node | [Docker Hub][armv7hf-artik10-node-dockerhub-link], [github][armv7hf-artik10-node-github-link] | For available image tags, refer [here][armv7hf-artik10-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-python | [Docker Hub][armv7hf-artik10-python-dockerhub-link], [github][armv7hf-artik10-python-github-link] | For available image tags, refer [here][armv7hf-artik10-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-golang | [Docker Hub][armv7hf-artik10-golang-dockerhub-link], [github][armv7hf-artik10-golang-github-link] | For available image tags, refer [here][armv7hf-artik10-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-openjdk | [Docker Hub][armv7hf-artik10-openjdk-dockerhub-link], [github][armv7hf-artik10-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik10-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-alpine | [Docker Hub][armv7hf-artik10-alpine-dockerhub-link], [github][armv7hf-artik10-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/artik10-alpine-buildpack-deps | [Docker Hub][armv7hf-artik10-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-artik10-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/artik10-alpine-node | [Docker Hub][armv7hf-artik10-alpine-node-dockerhub-link], [github][armv7hf-artik10-alpine-node-github-link] | For available image tags, refer [here][armv7hf-artik10-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-alpine-python | [Docker Hub][armv7hf-artik10-alpine-python-dockerhub-link], [github][armv7hf-artik10-alpine-python-github-link] | For available image tags, refer [here][armv7hf-artik10-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-alpine-golang | [Docker Hub][armv7hf-artik10-alpine-golang-dockerhub-link], [github][armv7hf-artik10-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-artik10-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-alpine-openjdk | [Docker Hub][armv7hf-artik10-alpine-openjdk-dockerhub-link], [github][armv7hf-artik10-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik10-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-fedora | [Docker Hub][armv7hf-artik10-fedora-node-dockerhub-link], [github][armv7hf-artik10-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/artik10-fedora-buildpack-deps | [Docker Hub][armv7hf-artik10-fedora-node-dockerhub-link], [github][armv7hf-artik10-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/artik10-fedora-node | [Docker Hub][armv7hf-artik10-fedora-node-dockerhub-link], [github][armv7hf-artik10-fedora-node-github-link] | For available image tags, refer [here][armv7hf-artik10-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-fedora-python | [Docker Hub][armv7hf-artik10-fedora-python-dockerhub-link], [github][armv7hf-artik10-fedora-python-github-link] | For available image tags, refer [here][armv7hf-artik10-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-fedora-golang | [Docker Hub][armv7hf-artik10-fedora-golang-dockerhub-link], [github][armv7hf-artik10-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-artik10-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-fedora-openjdk | [Docker Hub][armv7hf-artik10-fedora-openjdk-dockerhub-link], [github][armv7hf-artik10-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik10-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-ubuntu | [Docker Hub][armv7hf-artik10-ubuntu-dockerhub-link], [github][armv7hf-artik10-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/artik10-ubuntu-buildpack-deps | [Docker Hub][armv7hf-artik10-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-artik10-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/artik10-ubuntu-node | [Docker Hub][armv7hf-artik10-ubuntu-node-dockerhub-link], [github][armv7hf-artik10-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-artik10-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-ubuntu-python | [Docker Hub][armv7hf-artik10-ubuntu-python-dockerhub-link], [github][armv7hf-artik10-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-artik10-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik10-ubuntu-golang | [Docker Hub][armv7hf-artik10-ubuntu-golang-dockerhub-link], [github][armv7hf-artik10-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-artik10-ubuntu-golang-dockerhub-tag-link] |


##### Variscite DART-6UL

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/imx6ul-var-dart-debian | [Docker Hub][armv7hf-imx6ul-var-dart-dockerhub-link], [github][armv7hf-imx6ul-var-dart-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/imx6ul-var-dart-buildpack-deps | [Docker Hub][armv7hf-imx6ul-var-dart-buildpack-deps-dockerhub-link], [github][armv7hf-imx6ul-var-dart-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/imx6ul-var-dart-node | [Docker Hub][armv7hf-imx6ul-var-dart-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-node-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-node-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-python | [Docker Hub][armv7hf-imx6ul-var-dart-python-dockerhub-link], [github][armv7hf-imx6ul-var-dart-python-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-python-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-golang | [Docker Hub][armv7hf-imx6ul-var-dart-golang-dockerhub-link], [github][armv7hf-imx6ul-var-dart-golang-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-openjdk | [Docker Hub][armv7hf-imx6ul-var-dart-openjdk-dockerhub-link], [github][armv7hf-imx6ul-var-dart-openjdk-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-alpine | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/imx6ul-var-dart-alpine-buildpack-deps | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/imx6ul-var-dart-alpine-node | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-node-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-alpine-python | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-python-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-python-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-alpine-golang | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-golang-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-alpine-openjdk | [Docker Hub][armv7hf-imx6ul-var-dart-alpine-openjdk-dockerhub-link], [github][armv7hf-imx6ul-var-dart-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-fedora | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/imx6ul-var-dart-fedora-buildpack-deps | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/imx6ul-var-dart-fedora-node | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-node-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-fedora-python | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-python-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-python-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-fedora-golang | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-golang-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-fedora-openjdk | [Docker Hub][armv7hf-imx6ul-var-dart-fedora-openjdk-dockerhub-link], [github][armv7hf-imx6ul-var-dart-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-ubuntu | [Docker Hub][armv7hf-imx6ul-var-dart-ubuntu-dockerhub-link], [github][armv7hf-imx6ul-var-dart-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/imx6ul-var-dart-ubuntu-buildpack-deps | [Docker Hub][armv7hf-imx6ul-var-dart-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-imx6ul-var-dart-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/imx6ul-var-dart-ubuntu-node | [Docker Hub][armv7hf-imx6ul-var-dart-ubuntu-node-dockerhub-link], [github][armv7hf-imx6ul-var-dart-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-ubuntu-python | [Docker Hub][armv7hf-imx6ul-var-dart-ubuntu-python-dockerhub-link], [github][armv7hf-imx6ul-var-dart-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/imx6ul-var-dart-ubuntu-golang | [Docker Hub][armv7hf-imx6ul-var-dart-ubuntu-golang-dockerhub-link], [github][armv7hf-imx6ul-var-dart-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-imx6ul-var-dart-ubuntu-golang-dockerhub-tag-link] |


##### AM571X EVM

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/am571x-evm-debian | [Docker Hub][armv7hf-am571x-evm-dockerhub-link], [github][armv7hf-am571x-evm-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/am571x-evm-buildpack-deps | [Docker Hub][armv7hf-am571x-evm-buildpack-deps-dockerhub-link], [github][armv7hf-am571x-evm-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/am571x-evm-node | [Docker Hub][armv7hf-am571x-evm-node-dockerhub-link], [github][armv7hf-am571x-evm-node-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-node-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-python | [Docker Hub][armv7hf-am571x-evm-python-dockerhub-link], [github][armv7hf-am571x-evm-python-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-python-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-golang | [Docker Hub][armv7hf-am571x-evm-golang-dockerhub-link], [github][armv7hf-am571x-evm-golang-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-openjdk | [Docker Hub][armv7hf-am571x-evm-openjdk-dockerhub-link], [github][armv7hf-am571x-evm-openjdk-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-alpine | [Docker Hub][armv7hf-am571x-evm-alpine-dockerhub-link], [github][armv7hf-am571x-evm-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/am571x-evm-alpine-buildpack-deps | [Docker Hub][armv7hf-am571x-evm-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-am571x-evm-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/am571x-evm-alpine-node | [Docker Hub][armv7hf-am571x-evm-alpine-node-dockerhub-link], [github][armv7hf-am571x-evm-alpine-node-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-alpine-python | [Docker Hub][armv7hf-am571x-evm-alpine-python-dockerhub-link], [github][armv7hf-am571x-evm-alpine-python-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-alpine-golang | [Docker Hub][armv7hf-am571x-evm-alpine-golang-dockerhub-link], [github][armv7hf-am571x-evm-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-alpine-openjdk | [Docker Hub][armv7hf-am571x-evm-alpine-openjdk-dockerhub-link], [github][armv7hf-am571x-evm-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-fedora | [Docker Hub][armv7hf-am571x-evm-fedora-node-dockerhub-link], [github][armv7hf-am571x-evm-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/am571x-evm-fedora-buildpack-deps | [Docker Hub][armv7hf-am571x-evm-fedora-node-dockerhub-link], [github][armv7hf-am571x-evm-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/am571x-evm-fedora-node | [Docker Hub][armv7hf-am571x-evm-fedora-node-dockerhub-link], [github][armv7hf-am571x-evm-fedora-node-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-fedora-python | [Docker Hub][armv7hf-am571x-evm-fedora-python-dockerhub-link], [github][armv7hf-am571x-evm-fedora-python-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-fedora-golang | [Docker Hub][armv7hf-am571x-evm-fedora-golang-dockerhub-link], [github][armv7hf-am571x-evm-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-fedora-openjdk | [Docker Hub][armv7hf-am571x-evm-fedora-openjdk-dockerhub-link], [github][armv7hf-am571x-evm-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-ubuntu | [Docker Hub][armv7hf-am571x-evm-ubuntu-dockerhub-link], [github][armv7hf-am571x-evm-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/am571x-evm-ubuntu-buildpack-deps | [Docker Hub][armv7hf-am571x-evm-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-am571x-evm-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/am571x-evm-ubuntu-node | [Docker Hub][armv7hf-am571x-evm-ubuntu-node-dockerhub-link], [github][armv7hf-am571x-evm-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-ubuntu-python | [Docker Hub][armv7hf-am571x-evm-ubuntu-python-dockerhub-link], [github][armv7hf-am571x-evm-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/am571x-evm-ubuntu-golang | [Docker Hub][armv7hf-am571x-evm-ubuntu-golang-dockerhub-link], [github][armv7hf-am571x-evm-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-am571x-evm-ubuntu-golang-dockerhub-tag-link] |


##### RushUp Kitra 520

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/kitra520-debian | [Docker Hub][armv7hf-kitra520-dockerhub-link], [github][armv7hf-kitra520-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/kitra520-buildpack-deps | [Docker Hub][armv7hf-kitra520-buildpack-deps-dockerhub-link], [github][armv7hf-kitra520-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/kitra520-node | [Docker Hub][armv7hf-kitra520-node-dockerhub-link], [github][armv7hf-kitra520-node-github-link] | For available image tags, refer [here][armv7hf-kitra520-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-python | [Docker Hub][armv7hf-kitra520-python-dockerhub-link], [github][armv7hf-kitra520-python-github-link] | For available image tags, refer [here][armv7hf-kitra520-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-golang | [Docker Hub][armv7hf-kitra520-golang-dockerhub-link], [github][armv7hf-kitra520-golang-github-link] | For available image tags, refer [here][armv7hf-kitra520-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-openjdk | [Docker Hub][armv7hf-kitra520-openjdk-dockerhub-link], [github][armv7hf-kitra520-openjdk-github-link] | For available image tags, refer [here][armv7hf-kitra520-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-alpine | [Docker Hub][armv7hf-kitra520-alpine-dockerhub-link], [github][armv7hf-kitra520-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/kitra520-alpine-buildpack-deps | [Docker Hub][armv7hf-kitra520-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-kitra520-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/kitra520-alpine-node | [Docker Hub][armv7hf-kitra520-alpine-node-dockerhub-link], [github][armv7hf-kitra520-alpine-node-github-link] | For available image tags, refer [here][armv7hf-kitra520-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-alpine-python | [Docker Hub][armv7hf-kitra520-alpine-python-dockerhub-link], [github][armv7hf-kitra520-alpine-python-github-link] | For available image tags, refer [here][armv7hf-kitra520-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-alpine-golang | [Docker Hub][armv7hf-kitra520-alpine-golang-dockerhub-link], [github][armv7hf-kitra520-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-kitra520-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-alpine-openjdk | [Docker Hub][armv7hf-kitra520-alpine-openjdk-dockerhub-link], [github][armv7hf-kitra520-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-kitra520-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-fedora | [Docker Hub][armv7hf-kitra520-fedora-node-dockerhub-link], [github][armv7hf-kitra520-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/kitra520-fedora-buildpack-deps | [Docker Hub][armv7hf-kitra520-fedora-node-dockerhub-link], [github][armv7hf-kitra520-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/kitra520-fedora-node | [Docker Hub][armv7hf-kitra520-fedora-node-dockerhub-link], [github][armv7hf-kitra520-fedora-node-github-link] | For available image tags, refer [here][armv7hf-kitra520-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-fedora-python | [Docker Hub][armv7hf-kitra520-fedora-python-dockerhub-link], [github][armv7hf-kitra520-fedora-python-github-link] | For available image tags, refer [here][armv7hf-kitra520-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-fedora-golang | [Docker Hub][armv7hf-kitra520-fedora-golang-dockerhub-link], [github][armv7hf-kitra520-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-kitra520-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-fedora-openjdk | [Docker Hub][armv7hf-kitra520-fedora-openjdk-dockerhub-link], [github][armv7hf-kitra520-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-kitra520-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-ubuntu | [Docker Hub][armv7hf-kitra520-ubuntu-dockerhub-link], [github][armv7hf-kitra520-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/kitra520-ubuntu-buildpack-deps | [Docker Hub][armv7hf-kitra520-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-kitra520-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/kitra520-ubuntu-node | [Docker Hub][armv7hf-kitra520-ubuntu-node-dockerhub-link], [github][armv7hf-kitra520-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-kitra520-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-ubuntu-python | [Docker Hub][armv7hf-kitra520-ubuntu-python-dockerhub-link], [github][armv7hf-kitra520-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-kitra520-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra520-ubuntu-golang | [Docker Hub][armv7hf-kitra520-ubuntu-golang-dockerhub-link], [github][armv7hf-kitra520-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-kitra520-ubuntu-golang-dockerhub-tag-link] |


##### BananaPi-M1+
>>>>>>> a5c4876... base-images: Latest updates for base images documentation

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/bananapi-m1-plus-debian | [Docker Hub][armv7hf-bananapi-m1-plus-dockerhub-link], [github][armv7hf-bananapi-m1-plus-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/bananapi-m1-plus-buildpack-deps | [Docker Hub][armv7hf-bananapi-m1-plus-buildpack-deps-dockerhub-link], [github][armv7hf-bananapi-m1-plus-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/bananapi-m1-plus-node | [Docker Hub][armv7hf-bananapi-m1-plus-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-node-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-node-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-python | [Docker Hub][armv7hf-bananapi-m1-plus-python-dockerhub-link], [github][armv7hf-bananapi-m1-plus-python-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-python-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-golang | [Docker Hub][armv7hf-bananapi-m1-plus-golang-dockerhub-link], [github][armv7hf-bananapi-m1-plus-golang-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-openjdk | [Docker Hub][armv7hf-bananapi-m1-plus-openjdk-dockerhub-link], [github][armv7hf-bananapi-m1-plus-openjdk-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-alpine | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/bananapi-m1-plus-alpine-buildpack-deps | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/bananapi-m1-plus-alpine-node | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-node-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-alpine-python | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-python-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-python-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-alpine-golang | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-golang-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-alpine-openjdk | [Docker Hub][armv7hf-bananapi-m1-plus-alpine-openjdk-dockerhub-link], [github][armv7hf-bananapi-m1-plus-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-fedora | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/bananapi-m1-plus-fedora-buildpack-deps | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/bananapi-m1-plus-fedora-node | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-node-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-fedora-python | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-python-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-python-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-fedora-golang | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-golang-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-fedora-openjdk | [Docker Hub][armv7hf-bananapi-m1-plus-fedora-openjdk-dockerhub-link], [github][armv7hf-bananapi-m1-plus-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-ubuntu | [Docker Hub][armv7hf-bananapi-m1-plus-ubuntu-dockerhub-link], [github][armv7hf-bananapi-m1-plus-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/bananapi-m1-plus-ubuntu-buildpack-deps | [Docker Hub][armv7hf-bananapi-m1-plus-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-bananapi-m1-plus-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/bananapi-m1-plus-ubuntu-node | [Docker Hub][armv7hf-bananapi-m1-plus-ubuntu-node-dockerhub-link], [github][armv7hf-bananapi-m1-plus-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-ubuntu-python | [Docker Hub][armv7hf-bananapi-m1-plus-ubuntu-python-dockerhub-link], [github][armv7hf-bananapi-m1-plus-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/bananapi-m1-plus-ubuntu-golang | [Docker Hub][armv7hf-bananapi-m1-plus-ubuntu-golang-dockerhub-link], [github][armv7hf-bananapi-m1-plus-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-bananapi-m1-plus-ubuntu-golang-dockerhub-tag-link] |


##### Generic ARMv7-a HF

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/generic-armv7ahf-debian | [Docker Hub][armv7hf-generic-armv7ahf-dockerhub-link], [github][armv7hf-generic-armv7ahf-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/generic-armv7ahf-buildpack-deps | [Docker Hub][armv7hf-generic-armv7ahf-buildpack-deps-dockerhub-link], [github][armv7hf-generic-armv7ahf-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/generic-armv7ahf-node | [Docker Hub][armv7hf-generic-armv7ahf-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-node-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-python | [Docker Hub][armv7hf-generic-armv7ahf-python-dockerhub-link], [github][armv7hf-generic-armv7ahf-python-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-golang | [Docker Hub][armv7hf-generic-armv7ahf-golang-dockerhub-link], [github][armv7hf-generic-armv7ahf-golang-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-openjdk | [Docker Hub][armv7hf-generic-armv7ahf-openjdk-dockerhub-link], [github][armv7hf-generic-armv7ahf-openjdk-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-alpine | [Docker Hub][armv7hf-generic-armv7ahf-alpine-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/generic-armv7ahf-alpine-buildpack-deps | [Docker Hub][armv7hf-generic-armv7ahf-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/generic-armv7ahf-alpine-node | [Docker Hub][armv7hf-generic-armv7ahf-alpine-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-node-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-alpine-python | [Docker Hub][armv7hf-generic-armv7ahf-alpine-python-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-python-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-alpine-golang | [Docker Hub][armv7hf-generic-armv7ahf-alpine-golang-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-alpine-openjdk | [Docker Hub][armv7hf-generic-armv7ahf-alpine-openjdk-dockerhub-link], [github][armv7hf-generic-armv7ahf-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-fedora | [Docker Hub][armv7hf-generic-armv7ahf-fedora-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/generic-armv7ahf-fedora-buildpack-deps | [Docker Hub][armv7hf-generic-armv7ahf-fedora-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/generic-armv7ahf-fedora-node | [Docker Hub][armv7hf-generic-armv7ahf-fedora-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-node-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-fedora-python | [Docker Hub][armv7hf-generic-armv7ahf-fedora-python-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-python-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-fedora-golang | [Docker Hub][armv7hf-generic-armv7ahf-fedora-golang-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-fedora-openjdk | [Docker Hub][armv7hf-generic-armv7ahf-fedora-openjdk-dockerhub-link], [github][armv7hf-generic-armv7ahf-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-ubuntu | [Docker Hub][armv7hf-generic-armv7ahf-ubuntu-dockerhub-link], [github][armv7hf-generic-armv7ahf-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/generic-armv7ahf-ubuntu-buildpack-deps | [Docker Hub][armv7hf-generic-armv7ahf-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-generic-armv7ahf-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/generic-armv7ahf-ubuntu-node | [Docker Hub][armv7hf-generic-armv7ahf-ubuntu-node-dockerhub-link], [github][armv7hf-generic-armv7ahf-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-ubuntu-python | [Docker Hub][armv7hf-generic-armv7ahf-ubuntu-python-dockerhub-link], [github][armv7hf-generic-armv7ahf-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-armv7ahf-ubuntu-golang | [Docker Hub][armv7hf-generic-armv7ahf-ubuntu-golang-dockerhub-link], [github][armv7hf-generic-armv7ahf-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-generic-armv7ahf-ubuntu-golang-dockerhub-tag-link] |


##### Orange Pi Plus2

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/orangepi-plus2-debian | [Docker Hub][armv7hf-orangepi-plus2-dockerhub-link], [github][armv7hf-orangepi-plus2-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/orangepi-plus2-buildpack-deps | [Docker Hub][armv7hf-orangepi-plus2-buildpack-deps-dockerhub-link], [github][armv7hf-orangepi-plus2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/orangepi-plus2-node | [Docker Hub][armv7hf-orangepi-plus2-node-dockerhub-link], [github][armv7hf-orangepi-plus2-node-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-python | [Docker Hub][armv7hf-orangepi-plus2-python-dockerhub-link], [github][armv7hf-orangepi-plus2-python-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-golang | [Docker Hub][armv7hf-orangepi-plus2-golang-dockerhub-link], [github][armv7hf-orangepi-plus2-golang-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-openjdk | [Docker Hub][armv7hf-orangepi-plus2-openjdk-dockerhub-link], [github][armv7hf-orangepi-plus2-openjdk-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-alpine | [Docker Hub][armv7hf-orangepi-plus2-alpine-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/orangepi-plus2-alpine-buildpack-deps | [Docker Hub][armv7hf-orangepi-plus2-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/orangepi-plus2-alpine-node | [Docker Hub][armv7hf-orangepi-plus2-alpine-node-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-node-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-alpine-python | [Docker Hub][armv7hf-orangepi-plus2-alpine-python-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-python-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-alpine-golang | [Docker Hub][armv7hf-orangepi-plus2-alpine-golang-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-alpine-openjdk | [Docker Hub][armv7hf-orangepi-plus2-alpine-openjdk-dockerhub-link], [github][armv7hf-orangepi-plus2-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-fedora | [Docker Hub][armv7hf-orangepi-plus2-fedora-node-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/orangepi-plus2-fedora-buildpack-deps | [Docker Hub][armv7hf-orangepi-plus2-fedora-node-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/orangepi-plus2-fedora-node | [Docker Hub][armv7hf-orangepi-plus2-fedora-node-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-node-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-fedora-python | [Docker Hub][armv7hf-orangepi-plus2-fedora-python-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-python-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-fedora-golang | [Docker Hub][armv7hf-orangepi-plus2-fedora-golang-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-fedora-openjdk | [Docker Hub][armv7hf-orangepi-plus2-fedora-openjdk-dockerhub-link], [github][armv7hf-orangepi-plus2-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-ubuntu | [Docker Hub][armv7hf-orangepi-plus2-ubuntu-dockerhub-link], [github][armv7hf-orangepi-plus2-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/orangepi-plus2-ubuntu-buildpack-deps | [Docker Hub][armv7hf-orangepi-plus2-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-orangepi-plus2-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/orangepi-plus2-ubuntu-node | [Docker Hub][armv7hf-orangepi-plus2-ubuntu-node-dockerhub-link], [github][armv7hf-orangepi-plus2-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-ubuntu-python | [Docker Hub][armv7hf-orangepi-plus2-ubuntu-python-dockerhub-link], [github][armv7hf-orangepi-plus2-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orangepi-plus2-ubuntu-golang | [Docker Hub][armv7hf-orangepi-plus2-ubuntu-golang-dockerhub-link], [github][armv7hf-orangepi-plus2-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-orangepi-plus2-ubuntu-golang-dockerhub-tag-link] |


##### Balena Fin

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/fincm3-debian | [Docker Hub][armv7hf-fincm3-dockerhub-link], [github][armv7hf-fincm3-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/fincm3-buildpack-deps | [Docker Hub][armv7hf-fincm3-buildpack-deps-dockerhub-link], [github][armv7hf-fincm3-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/fincm3-node | [Docker Hub][armv7hf-fincm3-node-dockerhub-link], [github][armv7hf-fincm3-node-github-link] | For available image tags, refer [here][armv7hf-fincm3-node-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-python | [Docker Hub][armv7hf-fincm3-python-dockerhub-link], [github][armv7hf-fincm3-python-github-link] | For available image tags, refer [here][armv7hf-fincm3-python-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-golang | [Docker Hub][armv7hf-fincm3-golang-dockerhub-link], [github][armv7hf-fincm3-golang-github-link] | For available image tags, refer [here][armv7hf-fincm3-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-openjdk | [Docker Hub][armv7hf-fincm3-openjdk-dockerhub-link], [github][armv7hf-fincm3-openjdk-github-link] | For available image tags, refer [here][armv7hf-fincm3-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-alpine | [Docker Hub][armv7hf-fincm3-alpine-dockerhub-link], [github][armv7hf-fincm3-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/fincm3-alpine-buildpack-deps | [Docker Hub][armv7hf-fincm3-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-fincm3-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/fincm3-alpine-node | [Docker Hub][armv7hf-fincm3-alpine-node-dockerhub-link], [github][armv7hf-fincm3-alpine-node-github-link] | For available image tags, refer [here][armv7hf-fincm3-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-alpine-python | [Docker Hub][armv7hf-fincm3-alpine-python-dockerhub-link], [github][armv7hf-fincm3-alpine-python-github-link] | For available image tags, refer [here][armv7hf-fincm3-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-alpine-golang | [Docker Hub][armv7hf-fincm3-alpine-golang-dockerhub-link], [github][armv7hf-fincm3-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-fincm3-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-alpine-openjdk | [Docker Hub][armv7hf-fincm3-alpine-openjdk-dockerhub-link], [github][armv7hf-fincm3-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-fincm3-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-fedora | [Docker Hub][armv7hf-fincm3-fedora-node-dockerhub-link], [github][armv7hf-fincm3-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/fincm3-fedora-buildpack-deps | [Docker Hub][armv7hf-fincm3-fedora-node-dockerhub-link], [github][armv7hf-fincm3-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/fincm3-fedora-node | [Docker Hub][armv7hf-fincm3-fedora-node-dockerhub-link], [github][armv7hf-fincm3-fedora-node-github-link] | For available image tags, refer [here][armv7hf-fincm3-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-fedora-python | [Docker Hub][armv7hf-fincm3-fedora-python-dockerhub-link], [github][armv7hf-fincm3-fedora-python-github-link] | For available image tags, refer [here][armv7hf-fincm3-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-fedora-golang | [Docker Hub][armv7hf-fincm3-fedora-golang-dockerhub-link], [github][armv7hf-fincm3-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-fincm3-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-fedora-openjdk | [Docker Hub][armv7hf-fincm3-fedora-openjdk-dockerhub-link], [github][armv7hf-fincm3-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-fincm3-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-ubuntu | [Docker Hub][armv7hf-fincm3-ubuntu-dockerhub-link], [github][armv7hf-fincm3-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/fincm3-ubuntu-buildpack-deps | [Docker Hub][armv7hf-fincm3-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-fincm3-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/fincm3-ubuntu-node | [Docker Hub][armv7hf-fincm3-ubuntu-node-dockerhub-link], [github][armv7hf-fincm3-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-fincm3-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-ubuntu-python | [Docker Hub][armv7hf-fincm3-ubuntu-python-dockerhub-link], [github][armv7hf-fincm3-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-fincm3-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/fincm3-ubuntu-golang | [Docker Hub][armv7hf-fincm3-ubuntu-golang-dockerhub-link], [github][armv7hf-fincm3-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-fincm3-ubuntu-golang-dockerhub-tag-link] |


##### Samsung Artik 530s 1G

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/artik533s-debian | [Docker Hub][armv7hf-artik533s-dockerhub-link], [github][armv7hf-artik533s-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/artik533s-buildpack-deps | [Docker Hub][armv7hf-artik533s-buildpack-deps-dockerhub-link], [github][armv7hf-artik533s-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/artik533s-node | [Docker Hub][armv7hf-artik533s-node-dockerhub-link], [github][armv7hf-artik533s-node-github-link] | For available image tags, refer [here][armv7hf-artik533s-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-python | [Docker Hub][armv7hf-artik533s-python-dockerhub-link], [github][armv7hf-artik533s-python-github-link] | For available image tags, refer [here][armv7hf-artik533s-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-golang | [Docker Hub][armv7hf-artik533s-golang-dockerhub-link], [github][armv7hf-artik533s-golang-github-link] | For available image tags, refer [here][armv7hf-artik533s-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-openjdk | [Docker Hub][armv7hf-artik533s-openjdk-dockerhub-link], [github][armv7hf-artik533s-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik533s-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-alpine | [Docker Hub][armv7hf-artik533s-alpine-dockerhub-link], [github][armv7hf-artik533s-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/artik533s-alpine-buildpack-deps | [Docker Hub][armv7hf-artik533s-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-artik533s-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/artik533s-alpine-node | [Docker Hub][armv7hf-artik533s-alpine-node-dockerhub-link], [github][armv7hf-artik533s-alpine-node-github-link] | For available image tags, refer [here][armv7hf-artik533s-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-alpine-python | [Docker Hub][armv7hf-artik533s-alpine-python-dockerhub-link], [github][armv7hf-artik533s-alpine-python-github-link] | For available image tags, refer [here][armv7hf-artik533s-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-alpine-golang | [Docker Hub][armv7hf-artik533s-alpine-golang-dockerhub-link], [github][armv7hf-artik533s-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-artik533s-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-alpine-openjdk | [Docker Hub][armv7hf-artik533s-alpine-openjdk-dockerhub-link], [github][armv7hf-artik533s-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik533s-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-fedora | [Docker Hub][armv7hf-artik533s-fedora-node-dockerhub-link], [github][armv7hf-artik533s-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/artik533s-fedora-buildpack-deps | [Docker Hub][armv7hf-artik533s-fedora-node-dockerhub-link], [github][armv7hf-artik533s-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/artik533s-fedora-node | [Docker Hub][armv7hf-artik533s-fedora-node-dockerhub-link], [github][armv7hf-artik533s-fedora-node-github-link] | For available image tags, refer [here][armv7hf-artik533s-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-fedora-python | [Docker Hub][armv7hf-artik533s-fedora-python-dockerhub-link], [github][armv7hf-artik533s-fedora-python-github-link] | For available image tags, refer [here][armv7hf-artik533s-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-fedora-golang | [Docker Hub][armv7hf-artik533s-fedora-golang-dockerhub-link], [github][armv7hf-artik533s-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-artik533s-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-fedora-openjdk | [Docker Hub][armv7hf-artik533s-fedora-openjdk-dockerhub-link], [github][armv7hf-artik533s-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik533s-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-ubuntu | [Docker Hub][armv7hf-artik533s-ubuntu-dockerhub-link], [github][armv7hf-artik533s-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/artik533s-ubuntu-buildpack-deps | [Docker Hub][armv7hf-artik533s-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-artik533s-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/artik533s-ubuntu-node | [Docker Hub][armv7hf-artik533s-ubuntu-node-dockerhub-link], [github][armv7hf-artik533s-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-artik533s-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-ubuntu-python | [Docker Hub][armv7hf-artik533s-ubuntu-python-dockerhub-link], [github][armv7hf-artik533s-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-artik533s-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik533s-ubuntu-golang | [Docker Hub][armv7hf-artik533s-ubuntu-golang-dockerhub-link], [github][armv7hf-artik533s-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-artik533s-ubuntu-golang-dockerhub-tag-link] |


##### Samsung Artik 530

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/artik530-debian | [Docker Hub][armv7hf-artik530-dockerhub-link], [github][armv7hf-artik530-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/artik530-buildpack-deps | [Docker Hub][armv7hf-artik530-buildpack-deps-dockerhub-link], [github][armv7hf-artik530-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/artik530-node | [Docker Hub][armv7hf-artik530-node-dockerhub-link], [github][armv7hf-artik530-node-github-link] | For available image tags, refer [here][armv7hf-artik530-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-python | [Docker Hub][armv7hf-artik530-python-dockerhub-link], [github][armv7hf-artik530-python-github-link] | For available image tags, refer [here][armv7hf-artik530-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-golang | [Docker Hub][armv7hf-artik530-golang-dockerhub-link], [github][armv7hf-artik530-golang-github-link] | For available image tags, refer [here][armv7hf-artik530-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-openjdk | [Docker Hub][armv7hf-artik530-openjdk-dockerhub-link], [github][armv7hf-artik530-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik530-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-alpine | [Docker Hub][armv7hf-artik530-alpine-dockerhub-link], [github][armv7hf-artik530-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/artik530-alpine-buildpack-deps | [Docker Hub][armv7hf-artik530-alpine-buildpack-deps-dockerhub-link], [github][armv7hf-artik530-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/artik530-alpine-node | [Docker Hub][armv7hf-artik530-alpine-node-dockerhub-link], [github][armv7hf-artik530-alpine-node-github-link] | For available image tags, refer [here][armv7hf-artik530-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-alpine-python | [Docker Hub][armv7hf-artik530-alpine-python-dockerhub-link], [github][armv7hf-artik530-alpine-python-github-link] | For available image tags, refer [here][armv7hf-artik530-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-alpine-golang | [Docker Hub][armv7hf-artik530-alpine-golang-dockerhub-link], [github][armv7hf-artik530-alpine-golang-github-link] | For available image tags, refer [here][armv7hf-artik530-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-alpine-openjdk | [Docker Hub][armv7hf-artik530-alpine-openjdk-dockerhub-link], [github][armv7hf-artik530-alpine-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik530-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-fedora | [Docker Hub][armv7hf-artik530-fedora-node-dockerhub-link], [github][armv7hf-artik530-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/artik530-fedora-buildpack-deps | [Docker Hub][armv7hf-artik530-fedora-node-dockerhub-link], [github][armv7hf-artik530-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/artik530-fedora-node | [Docker Hub][armv7hf-artik530-fedora-node-dockerhub-link], [github][armv7hf-artik530-fedora-node-github-link] | For available image tags, refer [here][armv7hf-artik530-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-fedora-python | [Docker Hub][armv7hf-artik530-fedora-python-dockerhub-link], [github][armv7hf-artik530-fedora-python-github-link] | For available image tags, refer [here][armv7hf-artik530-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-fedora-golang | [Docker Hub][armv7hf-artik530-fedora-golang-dockerhub-link], [github][armv7hf-artik530-fedora-golang-github-link] | For available image tags, refer [here][armv7hf-artik530-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-fedora-openjdk | [Docker Hub][armv7hf-artik530-fedora-openjdk-dockerhub-link], [github][armv7hf-artik530-fedora-openjdk-github-link] | For available image tags, refer [here][armv7hf-artik530-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-ubuntu | [Docker Hub][armv7hf-artik530-ubuntu-dockerhub-link], [github][armv7hf-artik530-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/artik530-ubuntu-buildpack-deps | [Docker Hub][armv7hf-artik530-ubuntu-buildpack-deps-dockerhub-link], [github][armv7hf-artik530-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/artik530-ubuntu-node | [Docker Hub][armv7hf-artik530-ubuntu-node-dockerhub-link], [github][armv7hf-artik530-ubuntu-node-github-link] | For available image tags, refer [here][armv7hf-artik530-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-ubuntu-python | [Docker Hub][armv7hf-artik530-ubuntu-python-dockerhub-link], [github][armv7hf-artik530-ubuntu-python-github-link] | For available image tags, refer [here][armv7hf-artik530-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik530-ubuntu-golang | [Docker Hub][armv7hf-artik530-ubuntu-golang-dockerhub-link], [github][armv7hf-artik530-ubuntu-golang-github-link] | For available image tags, refer [here][armv7hf-artik530-ubuntu-golang-dockerhub-tag-link] |


### i386



##### Intel Edison

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/intel-edison-debian | [Docker Hub][i386-intel-edison-dockerhub-link], [github][i386-intel-edison-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/intel-edison-buildpack-deps | [Docker Hub][i386-intel-edison-buildpack-deps-dockerhub-link], [github][i386-intel-edison-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/intel-edison-node | [Docker Hub][i386-intel-edison-node-dockerhub-link], [github][i386-intel-edison-node-github-link] | For available image tags, refer [here][i386-intel-edison-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-python | [Docker Hub][i386-intel-edison-python-dockerhub-link], [github][i386-intel-edison-python-github-link] | For available image tags, refer [here][i386-intel-edison-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-golang | [Docker Hub][i386-intel-edison-golang-dockerhub-link], [github][i386-intel-edison-golang-github-link] | For available image tags, refer [here][i386-intel-edison-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-openjdk | [Docker Hub][i386-intel-edison-openjdk-dockerhub-link], [github][i386-intel-edison-openjdk-github-link] | For available image tags, refer [here][i386-intel-edison-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-alpine | [Docker Hub][i386-intel-edison-alpine-dockerhub-link], [github][i386-intel-edison-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/intel-edison-alpine-buildpack-deps | [Docker Hub][i386-intel-edison-alpine-buildpack-deps-dockerhub-link], [github][i386-intel-edison-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/intel-edison-alpine-node | [Docker Hub][i386-intel-edison-alpine-node-dockerhub-link], [github][i386-intel-edison-alpine-node-github-link] | For available image tags, refer [here][i386-intel-edison-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-alpine-python | [Docker Hub][i386-intel-edison-alpine-python-dockerhub-link], [github][i386-intel-edison-alpine-python-github-link] | For available image tags, refer [here][i386-intel-edison-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-alpine-golang | [Docker Hub][i386-intel-edison-alpine-golang-dockerhub-link], [github][i386-intel-edison-alpine-golang-github-link] | For available image tags, refer [here][i386-intel-edison-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-alpine-openjdk | [Docker Hub][i386-intel-edison-alpine-openjdk-dockerhub-link], [github][i386-intel-edison-alpine-openjdk-github-link] | For available image tags, refer [here][i386-intel-edison-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-ubuntu | [Docker Hub][i386-intel-edison-ubuntu-dockerhub-link], [github][i386-intel-edison-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/intel-edison-ubuntu-buildpack-deps | [Docker Hub][i386-intel-edison-ubuntu-buildpack-deps-dockerhub-link], [github][i386-intel-edison-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/intel-edison-ubuntu-node | [Docker Hub][i386-intel-edison-ubuntu-node-dockerhub-link], [github][i386-intel-edison-ubuntu-node-github-link] | For available image tags, refer [here][i386-intel-edison-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-ubuntu-python | [Docker Hub][i386-intel-edison-ubuntu-python-dockerhub-link], [github][i386-intel-edison-ubuntu-python-github-link] | For available image tags, refer [here][i386-intel-edison-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-edison-ubuntu-golang | [Docker Hub][i386-intel-edison-ubuntu-golang-dockerhub-link], [github][i386-intel-edison-ubuntu-golang-github-link] | For available image tags, refer [here][i386-intel-edison-ubuntu-golang-dockerhub-tag-link] |


##### QEMU x86

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/qemux86-debian | [Docker Hub][i386-qemux86-dockerhub-link], [github][i386-qemux86-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/qemux86-buildpack-deps | [Docker Hub][i386-qemux86-buildpack-deps-dockerhub-link], [github][i386-qemux86-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/qemux86-node | [Docker Hub][i386-qemux86-node-dockerhub-link], [github][i386-qemux86-node-github-link] | For available image tags, refer [here][i386-qemux86-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-python | [Docker Hub][i386-qemux86-python-dockerhub-link], [github][i386-qemux86-python-github-link] | For available image tags, refer [here][i386-qemux86-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-golang | [Docker Hub][i386-qemux86-golang-dockerhub-link], [github][i386-qemux86-golang-github-link] | For available image tags, refer [here][i386-qemux86-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-openjdk | [Docker Hub][i386-qemux86-openjdk-dockerhub-link], [github][i386-qemux86-openjdk-github-link] | For available image tags, refer [here][i386-qemux86-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-alpine | [Docker Hub][i386-qemux86-alpine-dockerhub-link], [github][i386-qemux86-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/qemux86-alpine-buildpack-deps | [Docker Hub][i386-qemux86-alpine-buildpack-deps-dockerhub-link], [github][i386-qemux86-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/qemux86-alpine-node | [Docker Hub][i386-qemux86-alpine-node-dockerhub-link], [github][i386-qemux86-alpine-node-github-link] | For available image tags, refer [here][i386-qemux86-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-alpine-python | [Docker Hub][i386-qemux86-alpine-python-dockerhub-link], [github][i386-qemux86-alpine-python-github-link] | For available image tags, refer [here][i386-qemux86-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-alpine-golang | [Docker Hub][i386-qemux86-alpine-golang-dockerhub-link], [github][i386-qemux86-alpine-golang-github-link] | For available image tags, refer [here][i386-qemux86-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-alpine-openjdk | [Docker Hub][i386-qemux86-alpine-openjdk-dockerhub-link], [github][i386-qemux86-alpine-openjdk-github-link] | For available image tags, refer [here][i386-qemux86-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-ubuntu | [Docker Hub][i386-qemux86-ubuntu-dockerhub-link], [github][i386-qemux86-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/qemux86-ubuntu-buildpack-deps | [Docker Hub][i386-qemux86-ubuntu-buildpack-deps-dockerhub-link], [github][i386-qemux86-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/qemux86-ubuntu-node | [Docker Hub][i386-qemux86-ubuntu-node-dockerhub-link], [github][i386-qemux86-ubuntu-node-github-link] | For available image tags, refer [here][i386-qemux86-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-ubuntu-python | [Docker Hub][i386-qemux86-ubuntu-python-dockerhub-link], [github][i386-qemux86-ubuntu-python-github-link] | For available image tags, refer [here][i386-qemux86-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-ubuntu-golang | [Docker Hub][i386-qemux86-ubuntu-golang-dockerhub-link], [github][i386-qemux86-ubuntu-golang-github-link] | For available image tags, refer [here][i386-qemux86-ubuntu-golang-dockerhub-tag-link] |


##### Intel Quark

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/cybertan-ze250-debian | [Docker Hub][i386-cybertan-ze250-dockerhub-link], [github][i386-cybertan-ze250-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/cybertan-ze250-buildpack-deps | [Docker Hub][i386-cybertan-ze250-buildpack-deps-dockerhub-link], [github][i386-cybertan-ze250-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/cybertan-ze250-node | [Docker Hub][i386-cybertan-ze250-node-dockerhub-link], [github][i386-cybertan-ze250-node-github-link] | For available image tags, refer [here][i386-cybertan-ze250-node-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-python | [Docker Hub][i386-cybertan-ze250-python-dockerhub-link], [github][i386-cybertan-ze250-python-github-link] | For available image tags, refer [here][i386-cybertan-ze250-python-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-golang | [Docker Hub][i386-cybertan-ze250-golang-dockerhub-link], [github][i386-cybertan-ze250-golang-github-link] | For available image tags, refer [here][i386-cybertan-ze250-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-openjdk | [Docker Hub][i386-cybertan-ze250-openjdk-dockerhub-link], [github][i386-cybertan-ze250-openjdk-github-link] | For available image tags, refer [here][i386-cybertan-ze250-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-alpine | [Docker Hub][i386-cybertan-ze250-alpine-dockerhub-link], [github][i386-cybertan-ze250-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/cybertan-ze250-alpine-buildpack-deps | [Docker Hub][i386-cybertan-ze250-alpine-buildpack-deps-dockerhub-link], [github][i386-cybertan-ze250-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/cybertan-ze250-alpine-node | [Docker Hub][i386-cybertan-ze250-alpine-node-dockerhub-link], [github][i386-cybertan-ze250-alpine-node-github-link] | For available image tags, refer [here][i386-cybertan-ze250-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-alpine-python | [Docker Hub][i386-cybertan-ze250-alpine-python-dockerhub-link], [github][i386-cybertan-ze250-alpine-python-github-link] | For available image tags, refer [here][i386-cybertan-ze250-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-alpine-golang | [Docker Hub][i386-cybertan-ze250-alpine-golang-dockerhub-link], [github][i386-cybertan-ze250-alpine-golang-github-link] | For available image tags, refer [here][i386-cybertan-ze250-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-alpine-openjdk | [Docker Hub][i386-cybertan-ze250-alpine-openjdk-dockerhub-link], [github][i386-cybertan-ze250-alpine-openjdk-github-link] | For available image tags, refer [here][i386-cybertan-ze250-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-ubuntu | [Docker Hub][i386-cybertan-ze250-ubuntu-dockerhub-link], [github][i386-cybertan-ze250-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/cybertan-ze250-ubuntu-buildpack-deps | [Docker Hub][i386-cybertan-ze250-ubuntu-buildpack-deps-dockerhub-link], [github][i386-cybertan-ze250-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/cybertan-ze250-ubuntu-node | [Docker Hub][i386-cybertan-ze250-ubuntu-node-dockerhub-link], [github][i386-cybertan-ze250-ubuntu-node-github-link] | For available image tags, refer [here][i386-cybertan-ze250-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-ubuntu-python | [Docker Hub][i386-cybertan-ze250-ubuntu-python-dockerhub-link], [github][i386-cybertan-ze250-ubuntu-python-github-link] | For available image tags, refer [here][i386-cybertan-ze250-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/cybertan-ze250-ubuntu-golang | [Docker Hub][i386-cybertan-ze250-ubuntu-golang-dockerhub-link], [github][i386-cybertan-ze250-ubuntu-golang-github-link] | For available image tags, refer [here][i386-cybertan-ze250-ubuntu-golang-dockerhub-tag-link] |


##### Siemens IOT2000

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/iot2000-debian | [Docker Hub][i386-iot2000-dockerhub-link], [github][i386-iot2000-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/iot2000-buildpack-deps | [Docker Hub][i386-iot2000-buildpack-deps-dockerhub-link], [github][i386-iot2000-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/iot2000-node | [Docker Hub][i386-iot2000-node-dockerhub-link], [github][i386-iot2000-node-github-link] | For available image tags, refer [here][i386-iot2000-node-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-python | [Docker Hub][i386-iot2000-python-dockerhub-link], [github][i386-iot2000-python-github-link] | For available image tags, refer [here][i386-iot2000-python-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-golang | [Docker Hub][i386-iot2000-golang-dockerhub-link], [github][i386-iot2000-golang-github-link] | For available image tags, refer [here][i386-iot2000-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-openjdk | [Docker Hub][i386-iot2000-openjdk-dockerhub-link], [github][i386-iot2000-openjdk-github-link] | For available image tags, refer [here][i386-iot2000-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-alpine | [Docker Hub][i386-iot2000-alpine-dockerhub-link], [github][i386-iot2000-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/iot2000-alpine-buildpack-deps | [Docker Hub][i386-iot2000-alpine-buildpack-deps-dockerhub-link], [github][i386-iot2000-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/iot2000-alpine-node | [Docker Hub][i386-iot2000-alpine-node-dockerhub-link], [github][i386-iot2000-alpine-node-github-link] | For available image tags, refer [here][i386-iot2000-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-alpine-python | [Docker Hub][i386-iot2000-alpine-python-dockerhub-link], [github][i386-iot2000-alpine-python-github-link] | For available image tags, refer [here][i386-iot2000-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-alpine-golang | [Docker Hub][i386-iot2000-alpine-golang-dockerhub-link], [github][i386-iot2000-alpine-golang-github-link] | For available image tags, refer [here][i386-iot2000-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-alpine-openjdk | [Docker Hub][i386-iot2000-alpine-openjdk-dockerhub-link], [github][i386-iot2000-alpine-openjdk-github-link] | For available image tags, refer [here][i386-iot2000-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-ubuntu | [Docker Hub][i386-iot2000-ubuntu-dockerhub-link], [github][i386-iot2000-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/iot2000-ubuntu-buildpack-deps | [Docker Hub][i386-iot2000-ubuntu-buildpack-deps-dockerhub-link], [github][i386-iot2000-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/iot2000-ubuntu-node | [Docker Hub][i386-iot2000-ubuntu-node-dockerhub-link], [github][i386-iot2000-ubuntu-node-github-link] | For available image tags, refer [here][i386-iot2000-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-ubuntu-python | [Docker Hub][i386-iot2000-ubuntu-python-dockerhub-link], [github][i386-iot2000-ubuntu-python-github-link] | For available image tags, refer [here][i386-iot2000-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/iot2000-ubuntu-golang | [Docker Hub][i386-iot2000-ubuntu-golang-dockerhub-link], [github][i386-iot2000-ubuntu-golang-github-link] | For available image tags, refer [here][i386-iot2000-ubuntu-golang-dockerhub-tag-link] |


### amd64



##### Intel NUC

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/intel-nuc-debian | [Docker Hub][amd64-intel-nuc-dockerhub-link], [github][amd64-intel-nuc-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/intel-nuc-buildpack-deps | [Docker Hub][amd64-intel-nuc-buildpack-deps-dockerhub-link], [github][amd64-intel-nuc-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/intel-nuc-node | [Docker Hub][amd64-intel-nuc-node-dockerhub-link], [github][amd64-intel-nuc-node-github-link] | For available image tags, refer [here][amd64-intel-nuc-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-python | [Docker Hub][amd64-intel-nuc-python-dockerhub-link], [github][amd64-intel-nuc-python-github-link] | For available image tags, refer [here][amd64-intel-nuc-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-golang | [Docker Hub][amd64-intel-nuc-golang-dockerhub-link], [github][amd64-intel-nuc-golang-github-link] | For available image tags, refer [here][amd64-intel-nuc-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-openjdk | [Docker Hub][amd64-intel-nuc-openjdk-dockerhub-link], [github][amd64-intel-nuc-openjdk-github-link] | For available image tags, refer [here][amd64-intel-nuc-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-alpine | [Docker Hub][amd64-intel-nuc-alpine-dockerhub-link], [github][amd64-intel-nuc-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/intel-nuc-alpine-buildpack-deps | [Docker Hub][amd64-intel-nuc-alpine-buildpack-deps-dockerhub-link], [github][amd64-intel-nuc-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/intel-nuc-alpine-node | [Docker Hub][amd64-intel-nuc-alpine-node-dockerhub-link], [github][amd64-intel-nuc-alpine-node-github-link] | For available image tags, refer [here][amd64-intel-nuc-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-alpine-python | [Docker Hub][amd64-intel-nuc-alpine-python-dockerhub-link], [github][amd64-intel-nuc-alpine-python-github-link] | For available image tags, refer [here][amd64-intel-nuc-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-alpine-golang | [Docker Hub][amd64-intel-nuc-alpine-golang-dockerhub-link], [github][amd64-intel-nuc-alpine-golang-github-link] | For available image tags, refer [here][amd64-intel-nuc-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-alpine-openjdk | [Docker Hub][amd64-intel-nuc-alpine-openjdk-dockerhub-link], [github][amd64-intel-nuc-alpine-openjdk-github-link] | For available image tags, refer [here][amd64-intel-nuc-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-fedora | [Docker Hub][amd64-intel-nuc-fedora-node-dockerhub-link], [github][amd64-intel-nuc-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/intel-nuc-fedora-buildpack-deps | [Docker Hub][amd64-intel-nuc-fedora-node-dockerhub-link], [github][amd64-intel-nuc-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/intel-nuc-fedora-node | [Docker Hub][amd64-intel-nuc-fedora-node-dockerhub-link], [github][amd64-intel-nuc-fedora-node-github-link] | For available image tags, refer [here][amd64-intel-nuc-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-fedora-python | [Docker Hub][amd64-intel-nuc-fedora-python-dockerhub-link], [github][amd64-intel-nuc-fedora-python-github-link] | For available image tags, refer [here][amd64-intel-nuc-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-fedora-golang | [Docker Hub][amd64-intel-nuc-fedora-golang-dockerhub-link], [github][amd64-intel-nuc-fedora-golang-github-link] | For available image tags, refer [here][amd64-intel-nuc-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-fedora-openjdk | [Docker Hub][amd64-intel-nuc-fedora-openjdk-dockerhub-link], [github][amd64-intel-nuc-fedora-openjdk-github-link] | For available image tags, refer [here][amd64-intel-nuc-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-ubuntu | [Docker Hub][amd64-intel-nuc-ubuntu-dockerhub-link], [github][amd64-intel-nuc-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/intel-nuc-ubuntu-buildpack-deps | [Docker Hub][amd64-intel-nuc-ubuntu-buildpack-deps-dockerhub-link], [github][amd64-intel-nuc-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/intel-nuc-ubuntu-node | [Docker Hub][amd64-intel-nuc-ubuntu-node-dockerhub-link], [github][amd64-intel-nuc-ubuntu-node-github-link] | For available image tags, refer [here][amd64-intel-nuc-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-ubuntu-python | [Docker Hub][amd64-intel-nuc-ubuntu-python-dockerhub-link], [github][amd64-intel-nuc-ubuntu-python-github-link] | For available image tags, refer [here][amd64-intel-nuc-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/intel-nuc-ubuntu-golang | [Docker Hub][amd64-intel-nuc-ubuntu-golang-dockerhub-link], [github][amd64-intel-nuc-ubuntu-golang-github-link] | For available image tags, refer [here][amd64-intel-nuc-ubuntu-golang-dockerhub-tag-link] |


##### QEMU x86-64

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/qemux86-64-debian | [Docker Hub][amd64-qemux86-64-dockerhub-link], [github][amd64-qemux86-64-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/qemux86-64-buildpack-deps | [Docker Hub][amd64-qemux86-64-buildpack-deps-dockerhub-link], [github][amd64-qemux86-64-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/qemux86-64-node | [Docker Hub][amd64-qemux86-64-node-dockerhub-link], [github][amd64-qemux86-64-node-github-link] | For available image tags, refer [here][amd64-qemux86-64-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-python | [Docker Hub][amd64-qemux86-64-python-dockerhub-link], [github][amd64-qemux86-64-python-github-link] | For available image tags, refer [here][amd64-qemux86-64-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-golang | [Docker Hub][amd64-qemux86-64-golang-dockerhub-link], [github][amd64-qemux86-64-golang-github-link] | For available image tags, refer [here][amd64-qemux86-64-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-openjdk | [Docker Hub][amd64-qemux86-64-openjdk-dockerhub-link], [github][amd64-qemux86-64-openjdk-github-link] | For available image tags, refer [here][amd64-qemux86-64-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-alpine | [Docker Hub][amd64-qemux86-64-alpine-dockerhub-link], [github][amd64-qemux86-64-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/qemux86-64-alpine-buildpack-deps | [Docker Hub][amd64-qemux86-64-alpine-buildpack-deps-dockerhub-link], [github][amd64-qemux86-64-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/qemux86-64-alpine-node | [Docker Hub][amd64-qemux86-64-alpine-node-dockerhub-link], [github][amd64-qemux86-64-alpine-node-github-link] | For available image tags, refer [here][amd64-qemux86-64-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-alpine-python | [Docker Hub][amd64-qemux86-64-alpine-python-dockerhub-link], [github][amd64-qemux86-64-alpine-python-github-link] | For available image tags, refer [here][amd64-qemux86-64-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-alpine-golang | [Docker Hub][amd64-qemux86-64-alpine-golang-dockerhub-link], [github][amd64-qemux86-64-alpine-golang-github-link] | For available image tags, refer [here][amd64-qemux86-64-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-alpine-openjdk | [Docker Hub][amd64-qemux86-64-alpine-openjdk-dockerhub-link], [github][amd64-qemux86-64-alpine-openjdk-github-link] | For available image tags, refer [here][amd64-qemux86-64-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-fedora | [Docker Hub][amd64-qemux86-64-fedora-node-dockerhub-link], [github][amd64-qemux86-64-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/qemux86-64-fedora-buildpack-deps | [Docker Hub][amd64-qemux86-64-fedora-node-dockerhub-link], [github][amd64-qemux86-64-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/qemux86-64-fedora-node | [Docker Hub][amd64-qemux86-64-fedora-node-dockerhub-link], [github][amd64-qemux86-64-fedora-node-github-link] | For available image tags, refer [here][amd64-qemux86-64-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-fedora-python | [Docker Hub][amd64-qemux86-64-fedora-python-dockerhub-link], [github][amd64-qemux86-64-fedora-python-github-link] | For available image tags, refer [here][amd64-qemux86-64-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-fedora-golang | [Docker Hub][amd64-qemux86-64-fedora-golang-dockerhub-link], [github][amd64-qemux86-64-fedora-golang-github-link] | For available image tags, refer [here][amd64-qemux86-64-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-fedora-openjdk | [Docker Hub][amd64-qemux86-64-fedora-openjdk-dockerhub-link], [github][amd64-qemux86-64-fedora-openjdk-github-link] | For available image tags, refer [here][amd64-qemux86-64-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-ubuntu | [Docker Hub][amd64-qemux86-64-ubuntu-dockerhub-link], [github][amd64-qemux86-64-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/qemux86-64-ubuntu-buildpack-deps | [Docker Hub][amd64-qemux86-64-ubuntu-buildpack-deps-dockerhub-link], [github][amd64-qemux86-64-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/qemux86-64-ubuntu-node | [Docker Hub][amd64-qemux86-64-ubuntu-node-dockerhub-link], [github][amd64-qemux86-64-ubuntu-node-github-link] | For available image tags, refer [here][amd64-qemux86-64-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-ubuntu-python | [Docker Hub][amd64-qemux86-64-ubuntu-python-dockerhub-link], [github][amd64-qemux86-64-ubuntu-python-github-link] | For available image tags, refer [here][amd64-qemux86-64-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/qemux86-64-ubuntu-golang | [Docker Hub][amd64-qemux86-64-ubuntu-golang-dockerhub-link], [github][amd64-qemux86-64-ubuntu-golang-github-link] | For available image tags, refer [here][amd64-qemux86-64-ubuntu-golang-dockerhub-tag-link] |


##### UP board

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/up-board-debian | [Docker Hub][amd64-up-board-dockerhub-link], [github][amd64-up-board-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/up-board-buildpack-deps | [Docker Hub][amd64-up-board-buildpack-deps-dockerhub-link], [github][amd64-up-board-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/up-board-node | [Docker Hub][amd64-up-board-node-dockerhub-link], [github][amd64-up-board-node-github-link] | For available image tags, refer [here][amd64-up-board-node-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-python | [Docker Hub][amd64-up-board-python-dockerhub-link], [github][amd64-up-board-python-github-link] | For available image tags, refer [here][amd64-up-board-python-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-golang | [Docker Hub][amd64-up-board-golang-dockerhub-link], [github][amd64-up-board-golang-github-link] | For available image tags, refer [here][amd64-up-board-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-openjdk | [Docker Hub][amd64-up-board-openjdk-dockerhub-link], [github][amd64-up-board-openjdk-github-link] | For available image tags, refer [here][amd64-up-board-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-alpine | [Docker Hub][amd64-up-board-alpine-dockerhub-link], [github][amd64-up-board-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/up-board-alpine-buildpack-deps | [Docker Hub][amd64-up-board-alpine-buildpack-deps-dockerhub-link], [github][amd64-up-board-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/up-board-alpine-node | [Docker Hub][amd64-up-board-alpine-node-dockerhub-link], [github][amd64-up-board-alpine-node-github-link] | For available image tags, refer [here][amd64-up-board-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-alpine-python | [Docker Hub][amd64-up-board-alpine-python-dockerhub-link], [github][amd64-up-board-alpine-python-github-link] | For available image tags, refer [here][amd64-up-board-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-alpine-golang | [Docker Hub][amd64-up-board-alpine-golang-dockerhub-link], [github][amd64-up-board-alpine-golang-github-link] | For available image tags, refer [here][amd64-up-board-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-alpine-openjdk | [Docker Hub][amd64-up-board-alpine-openjdk-dockerhub-link], [github][amd64-up-board-alpine-openjdk-github-link] | For available image tags, refer [here][amd64-up-board-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-fedora | [Docker Hub][amd64-up-board-fedora-node-dockerhub-link], [github][amd64-up-board-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/up-board-fedora-buildpack-deps | [Docker Hub][amd64-up-board-fedora-node-dockerhub-link], [github][amd64-up-board-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/up-board-fedora-node | [Docker Hub][amd64-up-board-fedora-node-dockerhub-link], [github][amd64-up-board-fedora-node-github-link] | For available image tags, refer [here][amd64-up-board-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-fedora-python | [Docker Hub][amd64-up-board-fedora-python-dockerhub-link], [github][amd64-up-board-fedora-python-github-link] | For available image tags, refer [here][amd64-up-board-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-fedora-golang | [Docker Hub][amd64-up-board-fedora-golang-dockerhub-link], [github][amd64-up-board-fedora-golang-github-link] | For available image tags, refer [here][amd64-up-board-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-fedora-openjdk | [Docker Hub][amd64-up-board-fedora-openjdk-dockerhub-link], [github][amd64-up-board-fedora-openjdk-github-link] | For available image tags, refer [here][amd64-up-board-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-ubuntu | [Docker Hub][amd64-up-board-ubuntu-dockerhub-link], [github][amd64-up-board-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/up-board-ubuntu-buildpack-deps | [Docker Hub][amd64-up-board-ubuntu-buildpack-deps-dockerhub-link], [github][amd64-up-board-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/up-board-ubuntu-node | [Docker Hub][amd64-up-board-ubuntu-node-dockerhub-link], [github][amd64-up-board-ubuntu-node-github-link] | For available image tags, refer [here][amd64-up-board-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-ubuntu-python | [Docker Hub][amd64-up-board-ubuntu-python-dockerhub-link], [github][amd64-up-board-ubuntu-python-github-link] | For available image tags, refer [here][amd64-up-board-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/up-board-ubuntu-golang | [Docker Hub][amd64-up-board-ubuntu-golang-dockerhub-link], [github][amd64-up-board-ubuntu-golang-github-link] | For available image tags, refer [here][amd64-up-board-ubuntu-golang-dockerhub-tag-link] |


### aarch64



##### Samsung Artik 710

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/artik710-debian | [Docker Hub][aarch64-artik710-dockerhub-link], [github][aarch64-artik710-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/artik710-buildpack-deps | [Docker Hub][aarch64-artik710-buildpack-deps-dockerhub-link], [github][aarch64-artik710-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/artik710-node | [Docker Hub][aarch64-artik710-node-dockerhub-link], [github][aarch64-artik710-node-github-link] | For available image tags, refer [here][aarch64-artik710-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-python | [Docker Hub][aarch64-artik710-python-dockerhub-link], [github][aarch64-artik710-python-github-link] | For available image tags, refer [here][aarch64-artik710-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-golang | [Docker Hub][aarch64-artik710-golang-dockerhub-link], [github][aarch64-artik710-golang-github-link] | For available image tags, refer [here][aarch64-artik710-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-openjdk | [Docker Hub][aarch64-artik710-openjdk-dockerhub-link], [github][aarch64-artik710-openjdk-github-link] | For available image tags, refer [here][aarch64-artik710-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-alpine | [Docker Hub][aarch64-artik710-alpine-dockerhub-link], [github][aarch64-artik710-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/artik710-alpine-buildpack-deps | [Docker Hub][aarch64-artik710-alpine-buildpack-deps-dockerhub-link], [github][aarch64-artik710-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/artik710-alpine-node | [Docker Hub][aarch64-artik710-alpine-node-dockerhub-link], [github][aarch64-artik710-alpine-node-github-link] | For available image tags, refer [here][aarch64-artik710-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-alpine-python | [Docker Hub][aarch64-artik710-alpine-python-dockerhub-link], [github][aarch64-artik710-alpine-python-github-link] | For available image tags, refer [here][aarch64-artik710-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-alpine-golang | [Docker Hub][aarch64-artik710-alpine-golang-dockerhub-link], [github][aarch64-artik710-alpine-golang-github-link] | For available image tags, refer [here][aarch64-artik710-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-alpine-openjdk | [Docker Hub][aarch64-artik710-alpine-openjdk-dockerhub-link], [github][aarch64-artik710-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-artik710-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-fedora | [Docker Hub][aarch64-artik710-fedora-node-dockerhub-link], [github][aarch64-artik710-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/artik710-fedora-buildpack-deps | [Docker Hub][aarch64-artik710-fedora-node-dockerhub-link], [github][aarch64-artik710-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/artik710-fedora-node | [Docker Hub][aarch64-artik710-fedora-node-dockerhub-link], [github][aarch64-artik710-fedora-node-github-link] | For available image tags, refer [here][aarch64-artik710-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-fedora-python | [Docker Hub][aarch64-artik710-fedora-python-dockerhub-link], [github][aarch64-artik710-fedora-python-github-link] | For available image tags, refer [here][aarch64-artik710-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-fedora-golang | [Docker Hub][aarch64-artik710-fedora-golang-dockerhub-link], [github][aarch64-artik710-fedora-golang-github-link] | For available image tags, refer [here][aarch64-artik710-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-fedora-openjdk | [Docker Hub][aarch64-artik710-fedora-openjdk-dockerhub-link], [github][aarch64-artik710-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-artik710-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-ubuntu | [Docker Hub][aarch64-artik710-ubuntu-dockerhub-link], [github][aarch64-artik710-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/artik710-ubuntu-buildpack-deps | [Docker Hub][aarch64-artik710-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-artik710-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/artik710-ubuntu-node | [Docker Hub][aarch64-artik710-ubuntu-node-dockerhub-link], [github][aarch64-artik710-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-artik710-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-ubuntu-python | [Docker Hub][aarch64-artik710-ubuntu-python-dockerhub-link], [github][aarch64-artik710-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-artik710-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/artik710-ubuntu-golang | [Docker Hub][aarch64-artik710-ubuntu-golang-dockerhub-link], [github][aarch64-artik710-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-artik710-ubuntu-golang-dockerhub-tag-link] |


##### RushUp Kitra 710

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/kitra710-debian | [Docker Hub][aarch64-kitra710-dockerhub-link], [github][aarch64-kitra710-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/kitra710-buildpack-deps | [Docker Hub][aarch64-kitra710-buildpack-deps-dockerhub-link], [github][aarch64-kitra710-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/kitra710-node | [Docker Hub][aarch64-kitra710-node-dockerhub-link], [github][aarch64-kitra710-node-github-link] | For available image tags, refer [here][aarch64-kitra710-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-python | [Docker Hub][aarch64-kitra710-python-dockerhub-link], [github][aarch64-kitra710-python-github-link] | For available image tags, refer [here][aarch64-kitra710-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-golang | [Docker Hub][aarch64-kitra710-golang-dockerhub-link], [github][aarch64-kitra710-golang-github-link] | For available image tags, refer [here][aarch64-kitra710-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-openjdk | [Docker Hub][aarch64-kitra710-openjdk-dockerhub-link], [github][aarch64-kitra710-openjdk-github-link] | For available image tags, refer [here][aarch64-kitra710-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-alpine | [Docker Hub][aarch64-kitra710-alpine-dockerhub-link], [github][aarch64-kitra710-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/kitra710-alpine-buildpack-deps | [Docker Hub][aarch64-kitra710-alpine-buildpack-deps-dockerhub-link], [github][aarch64-kitra710-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/kitra710-alpine-node | [Docker Hub][aarch64-kitra710-alpine-node-dockerhub-link], [github][aarch64-kitra710-alpine-node-github-link] | For available image tags, refer [here][aarch64-kitra710-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-alpine-python | [Docker Hub][aarch64-kitra710-alpine-python-dockerhub-link], [github][aarch64-kitra710-alpine-python-github-link] | For available image tags, refer [here][aarch64-kitra710-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-alpine-golang | [Docker Hub][aarch64-kitra710-alpine-golang-dockerhub-link], [github][aarch64-kitra710-alpine-golang-github-link] | For available image tags, refer [here][aarch64-kitra710-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-alpine-openjdk | [Docker Hub][aarch64-kitra710-alpine-openjdk-dockerhub-link], [github][aarch64-kitra710-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-kitra710-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-fedora | [Docker Hub][aarch64-kitra710-fedora-node-dockerhub-link], [github][aarch64-kitra710-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/kitra710-fedora-buildpack-deps | [Docker Hub][aarch64-kitra710-fedora-node-dockerhub-link], [github][aarch64-kitra710-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/kitra710-fedora-node | [Docker Hub][aarch64-kitra710-fedora-node-dockerhub-link], [github][aarch64-kitra710-fedora-node-github-link] | For available image tags, refer [here][aarch64-kitra710-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-fedora-python | [Docker Hub][aarch64-kitra710-fedora-python-dockerhub-link], [github][aarch64-kitra710-fedora-python-github-link] | For available image tags, refer [here][aarch64-kitra710-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-fedora-golang | [Docker Hub][aarch64-kitra710-fedora-golang-dockerhub-link], [github][aarch64-kitra710-fedora-golang-github-link] | For available image tags, refer [here][aarch64-kitra710-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-fedora-openjdk | [Docker Hub][aarch64-kitra710-fedora-openjdk-dockerhub-link], [github][aarch64-kitra710-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-kitra710-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-ubuntu | [Docker Hub][aarch64-kitra710-ubuntu-dockerhub-link], [github][aarch64-kitra710-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/kitra710-ubuntu-buildpack-deps | [Docker Hub][aarch64-kitra710-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-kitra710-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/kitra710-ubuntu-node | [Docker Hub][aarch64-kitra710-ubuntu-node-dockerhub-link], [github][aarch64-kitra710-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-kitra710-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-ubuntu-python | [Docker Hub][aarch64-kitra710-ubuntu-python-dockerhub-link], [github][aarch64-kitra710-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-kitra710-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/kitra710-ubuntu-golang | [Docker Hub][aarch64-kitra710-ubuntu-golang-dockerhub-link], [github][aarch64-kitra710-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-kitra710-ubuntu-golang-dockerhub-tag-link] |


##### Nvidia Jetson Tx2

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/jetson-tx2-debian | [Docker Hub][aarch64-jetson-tx2-dockerhub-link], [github][aarch64-jetson-tx2-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/jetson-tx2-buildpack-deps | [Docker Hub][aarch64-jetson-tx2-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/jetson-tx2-node | [Docker Hub][aarch64-jetson-tx2-node-dockerhub-link], [github][aarch64-jetson-tx2-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-python | [Docker Hub][aarch64-jetson-tx2-python-dockerhub-link], [github][aarch64-jetson-tx2-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-golang | [Docker Hub][aarch64-jetson-tx2-golang-dockerhub-link], [github][aarch64-jetson-tx2-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-openjdk | [Docker Hub][aarch64-jetson-tx2-openjdk-dockerhub-link], [github][aarch64-jetson-tx2-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-alpine | [Docker Hub][aarch64-jetson-tx2-alpine-dockerhub-link], [github][aarch64-jetson-tx2-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/jetson-tx2-alpine-buildpack-deps | [Docker Hub][aarch64-jetson-tx2-alpine-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx2-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/jetson-tx2-alpine-node | [Docker Hub][aarch64-jetson-tx2-alpine-node-dockerhub-link], [github][aarch64-jetson-tx2-alpine-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-alpine-python | [Docker Hub][aarch64-jetson-tx2-alpine-python-dockerhub-link], [github][aarch64-jetson-tx2-alpine-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-alpine-golang | [Docker Hub][aarch64-jetson-tx2-alpine-golang-dockerhub-link], [github][aarch64-jetson-tx2-alpine-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-alpine-openjdk | [Docker Hub][aarch64-jetson-tx2-alpine-openjdk-dockerhub-link], [github][aarch64-jetson-tx2-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-fedora | [Docker Hub][aarch64-jetson-tx2-fedora-node-dockerhub-link], [github][aarch64-jetson-tx2-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/jetson-tx2-fedora-buildpack-deps | [Docker Hub][aarch64-jetson-tx2-fedora-node-dockerhub-link], [github][aarch64-jetson-tx2-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/jetson-tx2-fedora-node | [Docker Hub][aarch64-jetson-tx2-fedora-node-dockerhub-link], [github][aarch64-jetson-tx2-fedora-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-fedora-python | [Docker Hub][aarch64-jetson-tx2-fedora-python-dockerhub-link], [github][aarch64-jetson-tx2-fedora-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-fedora-golang | [Docker Hub][aarch64-jetson-tx2-fedora-golang-dockerhub-link], [github][aarch64-jetson-tx2-fedora-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-fedora-openjdk | [Docker Hub][aarch64-jetson-tx2-fedora-openjdk-dockerhub-link], [github][aarch64-jetson-tx2-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-ubuntu | [Docker Hub][aarch64-jetson-tx2-ubuntu-dockerhub-link], [github][aarch64-jetson-tx2-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/jetson-tx2-ubuntu-buildpack-deps | [Docker Hub][aarch64-jetson-tx2-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx2-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/jetson-tx2-ubuntu-node | [Docker Hub][aarch64-jetson-tx2-ubuntu-node-dockerhub-link], [github][aarch64-jetson-tx2-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-ubuntu-python | [Docker Hub][aarch64-jetson-tx2-ubuntu-python-dockerhub-link], [github][aarch64-jetson-tx2-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx2-ubuntu-golang | [Docker Hub][aarch64-jetson-tx2-ubuntu-golang-dockerhub-link], [github][aarch64-jetson-tx2-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx2-ubuntu-golang-dockerhub-tag-link] |


##### Nvidia Jetson Tx1

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/jetson-tx1-debian | [Docker Hub][aarch64-jetson-tx1-dockerhub-link], [github][aarch64-jetson-tx1-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/jetson-tx1-buildpack-deps | [Docker Hub][aarch64-jetson-tx1-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx1-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/jetson-tx1-node | [Docker Hub][aarch64-jetson-tx1-node-dockerhub-link], [github][aarch64-jetson-tx1-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-python | [Docker Hub][aarch64-jetson-tx1-python-dockerhub-link], [github][aarch64-jetson-tx1-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-golang | [Docker Hub][aarch64-jetson-tx1-golang-dockerhub-link], [github][aarch64-jetson-tx1-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-openjdk | [Docker Hub][aarch64-jetson-tx1-openjdk-dockerhub-link], [github][aarch64-jetson-tx1-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-alpine | [Docker Hub][aarch64-jetson-tx1-alpine-dockerhub-link], [github][aarch64-jetson-tx1-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/jetson-tx1-alpine-buildpack-deps | [Docker Hub][aarch64-jetson-tx1-alpine-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx1-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/jetson-tx1-alpine-node | [Docker Hub][aarch64-jetson-tx1-alpine-node-dockerhub-link], [github][aarch64-jetson-tx1-alpine-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-alpine-python | [Docker Hub][aarch64-jetson-tx1-alpine-python-dockerhub-link], [github][aarch64-jetson-tx1-alpine-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-alpine-golang | [Docker Hub][aarch64-jetson-tx1-alpine-golang-dockerhub-link], [github][aarch64-jetson-tx1-alpine-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-alpine-openjdk | [Docker Hub][aarch64-jetson-tx1-alpine-openjdk-dockerhub-link], [github][aarch64-jetson-tx1-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-fedora | [Docker Hub][aarch64-jetson-tx1-fedora-node-dockerhub-link], [github][aarch64-jetson-tx1-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/jetson-tx1-fedora-buildpack-deps | [Docker Hub][aarch64-jetson-tx1-fedora-node-dockerhub-link], [github][aarch64-jetson-tx1-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/jetson-tx1-fedora-node | [Docker Hub][aarch64-jetson-tx1-fedora-node-dockerhub-link], [github][aarch64-jetson-tx1-fedora-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-fedora-python | [Docker Hub][aarch64-jetson-tx1-fedora-python-dockerhub-link], [github][aarch64-jetson-tx1-fedora-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-fedora-golang | [Docker Hub][aarch64-jetson-tx1-fedora-golang-dockerhub-link], [github][aarch64-jetson-tx1-fedora-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-fedora-openjdk | [Docker Hub][aarch64-jetson-tx1-fedora-openjdk-dockerhub-link], [github][aarch64-jetson-tx1-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-ubuntu | [Docker Hub][aarch64-jetson-tx1-ubuntu-dockerhub-link], [github][aarch64-jetson-tx1-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/jetson-tx1-ubuntu-buildpack-deps | [Docker Hub][aarch64-jetson-tx1-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-jetson-tx1-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/jetson-tx1-ubuntu-node | [Docker Hub][aarch64-jetson-tx1-ubuntu-node-dockerhub-link], [github][aarch64-jetson-tx1-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-ubuntu-python | [Docker Hub][aarch64-jetson-tx1-ubuntu-python-dockerhub-link], [github][aarch64-jetson-tx1-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/jetson-tx1-ubuntu-golang | [Docker Hub][aarch64-jetson-tx1-ubuntu-golang-dockerhub-link], [github][aarch64-jetson-tx1-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-jetson-tx1-ubuntu-golang-dockerhub-tag-link] |


##### Generic AARCH64 (ARMv8)

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/generic-aarch64-debian | [Docker Hub][aarch64-generic-aarch64-dockerhub-link], [github][aarch64-generic-aarch64-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/generic-aarch64-buildpack-deps | [Docker Hub][aarch64-generic-aarch64-buildpack-deps-dockerhub-link], [github][aarch64-generic-aarch64-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/generic-aarch64-node | [Docker Hub][aarch64-generic-aarch64-node-dockerhub-link], [github][aarch64-generic-aarch64-node-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-python | [Docker Hub][aarch64-generic-aarch64-python-dockerhub-link], [github][aarch64-generic-aarch64-python-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-golang | [Docker Hub][aarch64-generic-aarch64-golang-dockerhub-link], [github][aarch64-generic-aarch64-golang-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-openjdk | [Docker Hub][aarch64-generic-aarch64-openjdk-dockerhub-link], [github][aarch64-generic-aarch64-openjdk-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-alpine | [Docker Hub][aarch64-generic-aarch64-alpine-dockerhub-link], [github][aarch64-generic-aarch64-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/generic-aarch64-alpine-buildpack-deps | [Docker Hub][aarch64-generic-aarch64-alpine-buildpack-deps-dockerhub-link], [github][aarch64-generic-aarch64-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/generic-aarch64-alpine-node | [Docker Hub][aarch64-generic-aarch64-alpine-node-dockerhub-link], [github][aarch64-generic-aarch64-alpine-node-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-alpine-python | [Docker Hub][aarch64-generic-aarch64-alpine-python-dockerhub-link], [github][aarch64-generic-aarch64-alpine-python-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-alpine-golang | [Docker Hub][aarch64-generic-aarch64-alpine-golang-dockerhub-link], [github][aarch64-generic-aarch64-alpine-golang-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-alpine-openjdk | [Docker Hub][aarch64-generic-aarch64-alpine-openjdk-dockerhub-link], [github][aarch64-generic-aarch64-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-fedora | [Docker Hub][aarch64-generic-aarch64-fedora-node-dockerhub-link], [github][aarch64-generic-aarch64-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/generic-aarch64-fedora-buildpack-deps | [Docker Hub][aarch64-generic-aarch64-fedora-node-dockerhub-link], [github][aarch64-generic-aarch64-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/generic-aarch64-fedora-node | [Docker Hub][aarch64-generic-aarch64-fedora-node-dockerhub-link], [github][aarch64-generic-aarch64-fedora-node-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-fedora-python | [Docker Hub][aarch64-generic-aarch64-fedora-python-dockerhub-link], [github][aarch64-generic-aarch64-fedora-python-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-fedora-golang | [Docker Hub][aarch64-generic-aarch64-fedora-golang-dockerhub-link], [github][aarch64-generic-aarch64-fedora-golang-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-fedora-openjdk | [Docker Hub][aarch64-generic-aarch64-fedora-openjdk-dockerhub-link], [github][aarch64-generic-aarch64-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-ubuntu | [Docker Hub][aarch64-generic-aarch64-ubuntu-dockerhub-link], [github][aarch64-generic-aarch64-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/generic-aarch64-ubuntu-buildpack-deps | [Docker Hub][aarch64-generic-aarch64-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-generic-aarch64-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/generic-aarch64-ubuntu-node | [Docker Hub][aarch64-generic-aarch64-ubuntu-node-dockerhub-link], [github][aarch64-generic-aarch64-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-ubuntu-python | [Docker Hub][aarch64-generic-aarch64-ubuntu-python-dockerhub-link], [github][aarch64-generic-aarch64-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/generic-aarch64-ubuntu-golang | [Docker Hub][aarch64-generic-aarch64-ubuntu-golang-dockerhub-link], [github][aarch64-generic-aarch64-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-generic-aarch64-ubuntu-golang-dockerhub-tag-link] |


##### CTI Orbitty TX2

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/orbitty-tx2-debian | [Docker Hub][aarch64-orbitty-tx2-dockerhub-link], [github][aarch64-orbitty-tx2-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/orbitty-tx2-buildpack-deps | [Docker Hub][aarch64-orbitty-tx2-buildpack-deps-dockerhub-link], [github][aarch64-orbitty-tx2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/orbitty-tx2-node | [Docker Hub][aarch64-orbitty-tx2-node-dockerhub-link], [github][aarch64-orbitty-tx2-node-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-python | [Docker Hub][aarch64-orbitty-tx2-python-dockerhub-link], [github][aarch64-orbitty-tx2-python-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-golang | [Docker Hub][aarch64-orbitty-tx2-golang-dockerhub-link], [github][aarch64-orbitty-tx2-golang-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-openjdk | [Docker Hub][aarch64-orbitty-tx2-openjdk-dockerhub-link], [github][aarch64-orbitty-tx2-openjdk-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-alpine | [Docker Hub][aarch64-orbitty-tx2-alpine-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/orbitty-tx2-alpine-buildpack-deps | [Docker Hub][aarch64-orbitty-tx2-alpine-buildpack-deps-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/orbitty-tx2-alpine-node | [Docker Hub][aarch64-orbitty-tx2-alpine-node-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-node-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-alpine-python | [Docker Hub][aarch64-orbitty-tx2-alpine-python-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-python-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-alpine-golang | [Docker Hub][aarch64-orbitty-tx2-alpine-golang-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-golang-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-alpine-openjdk | [Docker Hub][aarch64-orbitty-tx2-alpine-openjdk-dockerhub-link], [github][aarch64-orbitty-tx2-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-fedora | [Docker Hub][aarch64-orbitty-tx2-fedora-node-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/orbitty-tx2-fedora-buildpack-deps | [Docker Hub][aarch64-orbitty-tx2-fedora-node-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/orbitty-tx2-fedora-node | [Docker Hub][aarch64-orbitty-tx2-fedora-node-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-node-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-fedora-python | [Docker Hub][aarch64-orbitty-tx2-fedora-python-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-python-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-fedora-golang | [Docker Hub][aarch64-orbitty-tx2-fedora-golang-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-golang-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-fedora-openjdk | [Docker Hub][aarch64-orbitty-tx2-fedora-openjdk-dockerhub-link], [github][aarch64-orbitty-tx2-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-ubuntu | [Docker Hub][aarch64-orbitty-tx2-ubuntu-dockerhub-link], [github][aarch64-orbitty-tx2-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/orbitty-tx2-ubuntu-buildpack-deps | [Docker Hub][aarch64-orbitty-tx2-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-orbitty-tx2-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/orbitty-tx2-ubuntu-node | [Docker Hub][aarch64-orbitty-tx2-ubuntu-node-dockerhub-link], [github][aarch64-orbitty-tx2-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-ubuntu-python | [Docker Hub][aarch64-orbitty-tx2-ubuntu-python-dockerhub-link], [github][aarch64-orbitty-tx2-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/orbitty-tx2-ubuntu-golang | [Docker Hub][aarch64-orbitty-tx2-ubuntu-golang-dockerhub-link], [github][aarch64-orbitty-tx2-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-orbitty-tx2-ubuntu-golang-dockerhub-tag-link] |


##### CTI Spacely TX2

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/spacely-tx2-debian | [Docker Hub][aarch64-spacely-tx2-dockerhub-link], [github][aarch64-spacely-tx2-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/spacely-tx2-buildpack-deps | [Docker Hub][aarch64-spacely-tx2-buildpack-deps-dockerhub-link], [github][aarch64-spacely-tx2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/spacely-tx2-node | [Docker Hub][aarch64-spacely-tx2-node-dockerhub-link], [github][aarch64-spacely-tx2-node-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-node-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-python | [Docker Hub][aarch64-spacely-tx2-python-dockerhub-link], [github][aarch64-spacely-tx2-python-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-python-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-golang | [Docker Hub][aarch64-spacely-tx2-golang-dockerhub-link], [github][aarch64-spacely-tx2-golang-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-openjdk | [Docker Hub][aarch64-spacely-tx2-openjdk-dockerhub-link], [github][aarch64-spacely-tx2-openjdk-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-alpine | [Docker Hub][aarch64-spacely-tx2-alpine-dockerhub-link], [github][aarch64-spacely-tx2-alpine-github-link] | latest, 3.7, 3.6, 3.5, edge |
| {{ $names.company.short }}/spacely-tx2-alpine-buildpack-deps | [Docker Hub][aarch64-spacely-tx2-alpine-buildpack-deps-dockerhub-link], [github][aarch64-spacely-tx2-alpine-buildpack-deps-github-link] | latest, 3.7, edge, 3.7-scm, edge-scm, 3.7-curl, edge-curl |
| {{ $names.company.short }}/spacely-tx2-alpine-node | [Docker Hub][aarch64-spacely-tx2-alpine-node-dockerhub-link], [github][aarch64-spacely-tx2-alpine-node-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-alpine-node-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-alpine-python | [Docker Hub][aarch64-spacely-tx2-alpine-python-dockerhub-link], [github][aarch64-spacely-tx2-alpine-python-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-alpine-python-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-alpine-golang | [Docker Hub][aarch64-spacely-tx2-alpine-golang-dockerhub-link], [github][aarch64-spacely-tx2-alpine-golang-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-alpine-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-alpine-openjdk | [Docker Hub][aarch64-spacely-tx2-alpine-openjdk-dockerhub-link], [github][aarch64-spacely-tx2-alpine-openjdk-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-alpine-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-fedora | [Docker Hub][aarch64-spacely-tx2-fedora-node-dockerhub-link], [github][aarch64-spacely-tx2-fedora-node-github-link] | latest, 26, 25, 24 |
| {{ $names.company.short }}/spacely-tx2-fedora-buildpack-deps | [Docker Hub][aarch64-spacely-tx2-fedora-node-dockerhub-link], [github][aarch64-spacely-tx2-fedora-node-github-link] | latest, 25, 25-scm, 25-curl |
| {{ $names.company.short }}/spacely-tx2-fedora-node | [Docker Hub][aarch64-spacely-tx2-fedora-node-dockerhub-link], [github][aarch64-spacely-tx2-fedora-node-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-fedora-node-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-fedora-python | [Docker Hub][aarch64-spacely-tx2-fedora-python-dockerhub-link], [github][aarch64-spacely-tx2-fedora-python-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-fedora-python-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-fedora-golang | [Docker Hub][aarch64-spacely-tx2-fedora-golang-dockerhub-link], [github][aarch64-spacely-tx2-fedora-golang-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-fedora-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-fedora-openjdk | [Docker Hub][aarch64-spacely-tx2-fedora-openjdk-dockerhub-link], [github][aarch64-spacely-tx2-fedora-openjdk-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-fedora-openjdk-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-ubuntu | [Docker Hub][aarch64-spacely-tx2-ubuntu-dockerhub-link], [github][aarch64-spacely-tx2-ubuntu-github-link] | latest, trusty, xenial, artful, bionic, cosmic |
| {{ $names.company.short }}/spacely-tx2-ubuntu-buildpack-deps | [Docker Hub][aarch64-spacely-tx2-ubuntu-buildpack-deps-dockerhub-link], [github][aarch64-spacely-tx2-ubuntu-buildpack-deps-github-link] | latest, jessie, bionic-scm, bionic-curl, xenial, xenial-scm, xenial-curl |
| {{ $names.company.short }}/spacely-tx2-ubuntu-node | [Docker Hub][aarch64-spacely-tx2-ubuntu-node-dockerhub-link], [github][aarch64-spacely-tx2-ubuntu-node-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-ubuntu-node-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-ubuntu-python | [Docker Hub][aarch64-spacely-tx2-ubuntu-python-dockerhub-link], [github][aarch64-spacely-tx2-ubuntu-python-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-ubuntu-python-dockerhub-tag-link] |
| {{ $names.company.short }}/spacely-tx2-ubuntu-golang | [Docker Hub][aarch64-spacely-tx2-ubuntu-golang-dockerhub-link], [github][aarch64-spacely-tx2-ubuntu-golang-github-link] | For available image tags, refer [here][aarch64-spacely-tx2-ubuntu-golang-dockerhub-tag-link] |


### armel



##### TS-7700

| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| {{ $names.company.short }}/ts7700-debian | [Docker Hub][armel-ts7700-dockerhub-link], [github][armel-ts7700-github-link] | latest, buster, stretch, jessie, wheezy |
| {{ $names.company.short }}/ts7700-buildpack-deps | [Docker Hub][armel-ts7700-buildpack-deps-dockerhub-link], [github][armel-ts7700-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| {{ $names.company.short }}/ts7700-node | [Docker Hub][armel-ts7700-node-dockerhub-link], [github][armel-ts7700-node-github-link] | For available image tags, refer [here][armel-ts7700-node-dockerhub-tag-link] |
| {{ $names.company.short }}/ts7700-python | [Docker Hub][armel-ts7700-python-dockerhub-link], [github][armel-ts7700-python-github-link] | For available image tags, refer [here][armel-ts7700-python-dockerhub-tag-link] |
| {{ $names.company.short }}/ts7700-golang | [Docker Hub][armel-ts7700-golang-dockerhub-link], [github][armel-ts7700-golang-github-link] | For available image tags, refer [here][armel-ts7700-golang-dockerhub-tag-link] |
| {{ $names.company.short }}/ts7700-openjdk | [Docker Hub][armel-ts7700-openjdk-dockerhub-link], [github][armel-ts7700-openjdk-github-link] | For available image tags, refer [here][armel-ts7700-openjdk-dockerhub-tag-link] |



## {{ $names.company.short }}-io-library Images:

### <a name="buildpack-deps"></a>buildpack-deps

A collection of common build dependencies used for installing various modules, e.g., gems. it has 2 variants which are:

* **curl**: This variant includes just the curl, wget, and ca-certificates packages. This is perfect for cases like the Java JRE, where downloading JARs is very common and necessary, but checking out code isn't.
* **scm**: This variant is based on curl, but also adds various source control management tools. As of this writing, the current list of included tools is bzr, git, hg, and svn. Intentionally missing is cvs due to the dwindling relevance it has (sorry CVS). This image is perfect for cases like the Java JDK, where downloading JARs is very common (hence the curl base still), but checking out code also becomes more common as well (compared to the JRE).

| Variant | Base Image | Installed Packages | Available Tag |
|:-----------|:------------|:------------|:------------|
| curl | respective arch based images | ca-certificates, curl, wget | curl, jessie-curl, wheezy-curl, sid-curl (only for armv7) |
| scm | respective curl images | bzr, git, mercurial, openssh-client, subversion | scm, jessie-scm, wheezy-scm, sid-scm (only for armv7) |
| buildpack-deps | respective scm images | autoconf, build-essential, imagemagick, libbz2-dev, libcurl4-openssl-dev, libevent-dev, libffi-dev, libglib2.0-dev, libjpeg-dev, libmagickcore-dev, libmagickwand-dev, libmysqlclient-dev, libncurses-dev, libpq-dev, libreadline-dev, libsqlite3-dev, libssl-dev, libxml2-dev, libxslt-dev, libyaml-dev, zlib1g-dev | latest, jessie, wheezy, sid (only for armv7) |

### <a name="node"></a>docker-node

This is a set of images with node.js binary installed. The node images come in many flavors, each designed for a specific use case.

#### Variants:

* **node:<version>**: This is the defacto image. If you are unsure about what your needs are, you probably want to use this one. It is designed to be used both as a throw away container (mount your source code and start the container to start your app), as well as the base to build other images off of. **This tag is based off of buildpack-deps image**. buildpack-deps is designed for the average user of Docker who has many images on their system. It, by design, has a large number of extremely common Debian packages. This reduces the number of packages that images that derive from it need to install, thus reducing the overall size of all images on your system.
* **node:<version>-onbuild**: This image makes building derivative images easier. For most use cases, creating a Dockerfile in the base of your project directory with the line FROM node:onbuild will be enough to create a stand-alone image for your project.
* **node:<version>-slim**: This image does not contain the common packages contained in the default tag and only contains the minimal packages needed to run node. Unless you are working in an environment where only the node image will be deployed and you have space constraints, we highly recommend using the default image of this repository.

### <a name="python"></a>Python

#### What is Python?

Python is an interpreted, interactive, object-oriented, open-source programming language. It incorporates modules, exceptions, dynamic typing, very high level dynamic data types, and classes. Python combines remarkable power with very clear syntax. It has interfaces to many system calls and libraries, as well as to various window systems, and is extensible in C or C++. It is also usable as an extension language for applications that need a programmable interface. Finally, Python is portable: it runs on many Unix variants, on the Mac, and on Windows 2000 and later.
[wikipedia.org/wiki/Python_(programming_language)][python-wiki]

__Note:__ `pip, python-dbus, virtualenv, setuptools` are preinstalled in all python images.

#### Variants:

The `python` images come in many flavors, each designed for a specific use case.

* `python:<version>`

This is the defacto image. If you are unsure about what your needs are, you probably want to use this one. It is designed to be used both as a throw away container (mount your source code and start the container to start your app), as well as the base to build other images off of. This tag is based off of `buildpack-deps`. `buildpack-deps` is designed for the average user of Docker who has many images on their system. It, by design, has a large number of extremely common Debian packages. This reduces the number of packages that images that derive from it need to install, thus reducing the overall size of all images on your system.

* `python:<version>-slim`

This image does not contain the common packages contained in the default tag and only contains the minimal packages needed to run python. Unless you are working in an environment where only the python image will be deployed and you have space constraints, we highly recommend using the default image of this repository.

* `python:<version>-onbuild`

This image feeds your `requirements.txt` file automatically to `pip` in order to make building derivative images easier. For most use cases, creating a Dockerfile in the base of your project directory with the line `FROM python:onbuild` will be enough to create a stand-alone image for your project.

While the onbuild variant is really useful for "getting off the ground running" (zero to Dockerized in a short period of time), it's not recommended for long-term usage within a project due to the lack of control over when the ONBUILD triggers fire (see also docker/docker#5714, docker/docker#8240, docker/docker#11917).

Once you've got a handle on how your project functions within Docker, you'll probably want to adjust your Dockerfile to inherit from a non-onbuild variant and copy the commands from the onbuild variant Dockerfile (moving the ONBUILD lines to the end and removing the ONBUILD keywords) into your own file so that you have tighter control over them and more transparency for yourself and others looking at your Dockerfile as to what it does. This also makes it easier to add additional requirements as time goes on (such as installing more packages before performing the previously-ONBUILD steps).

### <a name="golang"></a>Golang

#### What is Go?

Go (a.k.a., Golang) is a programming language first developed at Google. It is a statically-typed language with syntax loosely derived from C, but with additional features such as garbage collection, type safety, some dynamic-typing capabilities, additional built-in types (e.g., variable-length arrays and key-value maps), and a large standard library.
[wikipedia.org/wiki/Go_(programming_language)][golang-wiki]

#### Variants:

The `golang` images come in many flavors, each designed for a specific use case.

* `golang:<version>`

This is the defacto image. If you are unsure about what your needs are, you probably want to use this one. It is designed to be used both as a throw away container (mount your source code and start the container to start your app), as well as the base to build other images off of. This tag is based off of [buildpack-deps](#buildpack-deps). `buildpack-deps` is designed for the average user of docker who has many images on their system. It, by design, has a large number of extremely common Debian packages. This reduces the number of packages that images that derive from it need to install, thus reducing the overall size of all images on your system.

* `golang:<version>-slim`

This image does not contain the common packages contained in the default tag and only contains the minimal packages needed to run Go. Unless you are working in an environment where only the Go image will be deployed and you have space constraints, we highly recommend using the default image of this repository.

#### Notes:

* Default working directory (WORKDIR) and `$GOPATH` is `/go`, Go projects should be copied there. If you want to copy your projects to different place, you need to set `$GOPATH` by yourself.

* ARM Qemu and Go don't work together properly, so we highly recommend our users to build your Go projects on the device (only ARM devices, you do not need to do this for other platforms), not during build time. Otherwise, the build will potentially fail. You can have a script to build and run Go projects and use Docker CMD command to run it.

### <a name="OpenJDK"></a>OpenJDK

#### What is OpenJDK?

OpenJDK (Open Java Development Kit) is a free and open source implementation of the Java Platform, Standard Edition (Java SE). OpenJDK is the official reference implementation of Java SE since version 7.

> [wikipedia.org/wiki/OpenJDK](http://en.wikipedia.org/wiki/OpenJDK)

Java is a registered trademark of Oracle and/or its affiliates.

![logo](https://raw.githubusercontent.com/docker-library/docs/a3439b66b7980d1811f6b3835a3c541747172970/openjdk/logo.png)

#### Notes:

* There are two variants (jdk and jre) for each Java version.

* Debian OpenJDK images support both version 7 and 8 while Alpine Linux OpenJDK images only support version 7 and Fedora OpenJDK images only support version 8.

[base-repository]:{{ $links.githubMain }}-library/base-images
[base-images-changelog]:{{ $links.githubMain }}-library/base-images/blob/master/CHANGELOG.md
[rpi-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/rpi-raspbian/
[rpi-github-link]:{{ $links.githubMain }}-library/{{ $names.company.short }}-rpi-raspbian/
[armv7hf-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/armv7hf-debian/
[armv7hf-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/armv7hf
[i386-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/i386-debian/
[i386-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/i386
[i386-nlp-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/i386-nlp-debian/
[i386-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/i386-nlp
[amd64-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/amd64
[amd64-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/amd64-debian/
[armel-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/armel
[armel-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/armel-debian/
[aarch64-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/debian/aarch64
[aarch64-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/aarch64-debian
[rpi-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/alpine/rpi
[rpi-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/rpi-alpine/
[armv7hf-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/alpine/armv7hf
[armv7hf-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/armv7hf-alpine/
[i386-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/alpine/i386
[i386-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/i386-alpine/
[amd64-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/alpine/amd64
[amd64-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/amd64-alpine/
[aarch64-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/alpine/aarch64
[aarch64-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/aarch64-alpine/
[armv7hf-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/fedora/armv7hf
[armv7hf-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/armv7hf-fedora/
[aarch64-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/fedora/aarch64
[aarch64-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/aarch64-fedora/
[amd64-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/fedora/amd64
[amd64-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/amd64-fedora/
[armv7hf-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/armv7hf-ubuntu/
[armv7hf-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/ubuntu/armv7hf
[aarch64-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/aarch64-ubuntu/
[aarch64-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/ubuntu/aarch64
[i386-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/i386-ubuntu/
[i386-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/ubuntu/i386
[i386-nlp-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/i386-nlp-ubuntu/
[i386-nlp-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/ubuntu/i386-nlp
[amd64-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/amd64-ubuntu/
[amd64-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/{{ $names.company.short }}-base-images/ubuntu/amd64

[systemd-wiki]:https://wiki.debian.org/systemd
[golang-wiki]:https://en.wikipedia.org/wiki/Go_%28programming_language%29
[python-wiki]:https://en.wikipedia.org/wiki/Python_%28programming_language%29



[armv6hf-raspberry-pi-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-debian/
[armv6hf-raspberry-pi-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-buildpack-deps/
[armv6hf-raspberry-pi-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-node/
[armv6hf-raspberry-pi-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-node/tags/manage/
[armv6hf-raspberry-pi-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-python/
[armv6hf-raspberry-pi-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-python/tags/manage/
[armv6hf-raspberry-pi-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi
[armv6hf-raspberry-pi-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi
[armv6hf-raspberry-pi-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi
[armv6hf-raspberry-pi-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi
[armv6hf-raspberry-pi-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-golang/
[armv6hf-raspberry-pi-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-golang/tags/manage/
[armv6hf-raspberry-pi-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi
[armv6hf-raspberry-pi-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-openjdk/
[armv6hf-raspberry-pi-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-openjdk/tags/manage/
[armv6hf-raspberry-pi-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberry-pi

[armv6hf-raspberry-pi-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine/
[armv6hf-raspberry-pi-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-buildpack-deps/
[armv6hf-raspberry-pi-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-node/
[armv6hf-raspberry-pi-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-node/tags/manage/
[armv6hf-raspberry-pi-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-python/
[armv6hf-raspberry-pi-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-python/tags/manage/
[armv6hf-raspberry-pi-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi
[armv6hf-raspberry-pi-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi
[armv6hf-raspberry-pi-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi
[armv6hf-raspberry-pi-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi
[armv6hf-raspberry-pi-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-golang/
[armv6hf-raspberry-pi-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-golang/tags/manage/
[armv6hf-raspberry-pi-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi
[armv6hf-raspberry-pi-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-openjdk/
[armv6hf-raspberry-pi-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi-alpine-openjdk/tags/manage/
[armv6hf-raspberry-pi-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberry-pi


[armv7hf-raspberry-pi2-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-debian/
[armv7hf-raspberry-pi2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-buildpack-deps/
[armv7hf-raspberry-pi2-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-node/
[armv7hf-raspberry-pi2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-node/tags/manage/
[armv7hf-raspberry-pi2-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-python/
[armv7hf-raspberry-pi2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-python/tags/manage/
[armv7hf-raspberry-pi2-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi2
[armv7hf-raspberry-pi2-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi2
[armv7hf-raspberry-pi2-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi2
[armv7hf-raspberry-pi2-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi2
[armv7hf-raspberry-pi2-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-golang/
[armv7hf-raspberry-pi2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-golang/tags/manage/
[armv7hf-raspberry-pi2-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi2
[armv7hf-raspberry-pi2-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-openjdk/
[armv7hf-raspberry-pi2-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-openjdk/tags/manage/
[armv7hf-raspberry-pi2-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberry-pi2

[armv7hf-raspberry-pi2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine/
[armv7hf-raspberry-pi2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-buildpack-deps/
[armv7hf-raspberry-pi2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-node/
[armv7hf-raspberry-pi2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-node/tags/manage/
[armv7hf-raspberry-pi2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-python/
[armv7hf-raspberry-pi2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-python/tags/manage/
[armv7hf-raspberry-pi2-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi2
[armv7hf-raspberry-pi2-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi2
[armv7hf-raspberry-pi2-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi2
[armv7hf-raspberry-pi2-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi2
[armv7hf-raspberry-pi2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-golang/
[armv7hf-raspberry-pi2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-golang/tags/manage/
[armv7hf-raspberry-pi2-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi2
[armv7hf-raspberry-pi2-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-openjdk/
[armv7hf-raspberry-pi2-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-alpine-openjdk/tags/manage/
[armv7hf-raspberry-pi2-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberry-pi2

[armv7hf-raspberry-pi2-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora/
[armv7hf-raspberry-pi2-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-buildpack-deps/
[armv7hf-raspberry-pi2-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-node/
[armv7hf-raspberry-pi2-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-node/tags/manage/
[armv7hf-raspberry-pi2-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-python/
[armv7hf-raspberry-pi2-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-python/tags/manage/
[armv7hf-raspberry-pi2-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi2
[armv7hf-raspberry-pi2-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi2
[armv7hf-raspberry-pi2-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi2
[armv7hf-raspberry-pi2-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi2
[armv7hf-raspberry-pi2-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-golang/
[armv7hf-raspberry-pi2-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-golang/tags/manage/
[armv7hf-raspberry-pi2-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi2
[armv7hf-raspberry-pi2-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-openjdk/
[armv7hf-raspberry-pi2-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-fedora-openjdk/tags/manage/
[armv7hf-raspberry-pi2-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberry-pi2

[armv7hf-raspberry-pi2-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu/
[armv7hf-raspberry-pi2-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-buildpack-deps/
[armv7hf-raspberry-pi2-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-node/
[armv7hf-raspberry-pi2-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-node/tags/manage/
[armv7hf-raspberry-pi2-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-python/
[armv7hf-raspberry-pi2-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-python/tags/manage/
[armv7hf-raspberry-pi2-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberry-pi2
[armv7hf-raspberry-pi2-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberry-pi2
[armv7hf-raspberry-pi2-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberry-pi2
[armv7hf-raspberry-pi2-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberry-pi2
[armv7hf-raspberry-pi2-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-golang/
[armv7hf-raspberry-pi2-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberry-pi2-ubuntu-golang/tags/manage/
[armv7hf-raspberry-pi2-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberry-pi2


[armv7hf-raspberrypi3-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-debian/
[armv7hf-raspberrypi3-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-buildpack-deps/
[armv7hf-raspberrypi3-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-node/
[armv7hf-raspberrypi3-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-node/tags/manage/
[armv7hf-raspberrypi3-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-python/
[armv7hf-raspberrypi3-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-python/tags/manage/
[armv7hf-raspberrypi3-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberrypi3
[armv7hf-raspberrypi3-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7hf-raspberrypi3-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberrypi3
[armv7hf-raspberrypi3-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberrypi3
[armv7hf-raspberrypi3-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-golang/
[armv7hf-raspberrypi3-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-golang/tags/manage/
[armv7hf-raspberrypi3-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberrypi3
[armv7hf-raspberrypi3-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-openjdk/
[armv7hf-raspberrypi3-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-openjdk/tags/manage/
[armv7hf-raspberrypi3-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberrypi3

[armv7hf-raspberrypi3-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine/
[armv7hf-raspberrypi3-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-buildpack-deps/
[armv7hf-raspberrypi3-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-node/
[armv7hf-raspberrypi3-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-node/tags/manage/
[armv7hf-raspberrypi3-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-python/
[armv7hf-raspberrypi3-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-python/tags/manage/
[armv7hf-raspberrypi3-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberrypi3
[armv7hf-raspberrypi3-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7hf-raspberrypi3-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberrypi3
[armv7hf-raspberrypi3-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberrypi3
[armv7hf-raspberrypi3-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-golang/
[armv7hf-raspberrypi3-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-golang/tags/manage/
[armv7hf-raspberrypi3-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberrypi3
[armv7hf-raspberrypi3-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-openjdk/
[armv7hf-raspberrypi3-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-alpine-openjdk/tags/manage/
[armv7hf-raspberrypi3-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberrypi3

[armv7hf-raspberrypi3-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora/
[armv7hf-raspberrypi3-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-buildpack-deps/
[armv7hf-raspberrypi3-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-node/
[armv7hf-raspberrypi3-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-node/tags/manage/
[armv7hf-raspberrypi3-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-python/
[armv7hf-raspberrypi3-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-python/tags/manage/
[armv7hf-raspberrypi3-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberrypi3
[armv7hf-raspberrypi3-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7hf-raspberrypi3-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberrypi3
[armv7hf-raspberrypi3-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberrypi3
[armv7hf-raspberrypi3-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-golang/
[armv7hf-raspberrypi3-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-golang/tags/manage/
[armv7hf-raspberrypi3-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberrypi3
[armv7hf-raspberrypi3-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-openjdk/
[armv7hf-raspberrypi3-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-fedora-openjdk/tags/manage/
[armv7hf-raspberrypi3-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/raspberrypi3

[armv7hf-raspberrypi3-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu/
[armv7hf-raspberrypi3-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-buildpack-deps/
[armv7hf-raspberrypi3-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-node/
[armv7hf-raspberrypi3-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-node/tags/manage/
[armv7hf-raspberrypi3-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-python/
[armv7hf-raspberrypi3-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-python/tags/manage/
[armv7hf-raspberrypi3-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/raspberrypi3
[armv7hf-raspberrypi3-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7hf-raspberrypi3-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/raspberrypi3
[armv7hf-raspberrypi3-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/raspberrypi3
[armv7hf-raspberrypi3-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-golang/
[armv7hf-raspberrypi3-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/raspberrypi3-ubuntu-golang/tags/manage/
[armv7hf-raspberrypi3-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/raspberrypi3


[armv7hf-beaglebone-black-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-debian/
[armv7hf-beaglebone-black-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-buildpack-deps/
[armv7hf-beaglebone-black-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-node/
[armv7hf-beaglebone-black-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-node/tags/manage/
[armv7hf-beaglebone-black-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-python/
[armv7hf-beaglebone-black-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-python/tags/manage/
[armv7hf-beaglebone-black-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-black
[armv7hf-beaglebone-black-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-black
[armv7hf-beaglebone-black-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-black
[armv7hf-beaglebone-black-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-black
[armv7hf-beaglebone-black-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-golang/
[armv7hf-beaglebone-black-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-golang/tags/manage/
[armv7hf-beaglebone-black-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-black
[armv7hf-beaglebone-black-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-openjdk/
[armv7hf-beaglebone-black-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-openjdk/tags/manage/
[armv7hf-beaglebone-black-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-black

[armv7hf-beaglebone-black-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine/
[armv7hf-beaglebone-black-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-buildpack-deps/
[armv7hf-beaglebone-black-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-node/
[armv7hf-beaglebone-black-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-node/tags/manage/
[armv7hf-beaglebone-black-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-python/
[armv7hf-beaglebone-black-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-python/tags/manage/
[armv7hf-beaglebone-black-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-black
[armv7hf-beaglebone-black-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-black
[armv7hf-beaglebone-black-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-black
[armv7hf-beaglebone-black-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-black
[armv7hf-beaglebone-black-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-golang/
[armv7hf-beaglebone-black-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-golang/tags/manage/
[armv7hf-beaglebone-black-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-black
[armv7hf-beaglebone-black-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-openjdk/
[armv7hf-beaglebone-black-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-alpine-openjdk/tags/manage/
[armv7hf-beaglebone-black-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-black

[armv7hf-beaglebone-black-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora/
[armv7hf-beaglebone-black-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-buildpack-deps/
[armv7hf-beaglebone-black-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-node/
[armv7hf-beaglebone-black-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-node/tags/manage/
[armv7hf-beaglebone-black-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-python/
[armv7hf-beaglebone-black-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-python/tags/manage/
[armv7hf-beaglebone-black-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-black
[armv7hf-beaglebone-black-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-black
[armv7hf-beaglebone-black-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-black
[armv7hf-beaglebone-black-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-black
[armv7hf-beaglebone-black-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-golang/
[armv7hf-beaglebone-black-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-golang/tags/manage/
[armv7hf-beaglebone-black-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-black
[armv7hf-beaglebone-black-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-openjdk/
[armv7hf-beaglebone-black-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-fedora-openjdk/tags/manage/
[armv7hf-beaglebone-black-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-black

[armv7hf-beaglebone-black-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu/
[armv7hf-beaglebone-black-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-buildpack-deps/
[armv7hf-beaglebone-black-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-node/
[armv7hf-beaglebone-black-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-node/tags/manage/
[armv7hf-beaglebone-black-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-python/
[armv7hf-beaglebone-black-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-python/tags/manage/
[armv7hf-beaglebone-black-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-black
[armv7hf-beaglebone-black-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-black
[armv7hf-beaglebone-black-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-black
[armv7hf-beaglebone-black-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-black
[armv7hf-beaglebone-black-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-golang/
[armv7hf-beaglebone-black-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-black-ubuntu-golang/tags/manage/
[armv7hf-beaglebone-black-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-black


[armv7hf-beaglebone-green-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-debian/
[armv7hf-beaglebone-green-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-buildpack-deps/
[armv7hf-beaglebone-green-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-node/
[armv7hf-beaglebone-green-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-node/tags/manage/
[armv7hf-beaglebone-green-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-python/
[armv7hf-beaglebone-green-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-python/tags/manage/
[armv7hf-beaglebone-green-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green
[armv7hf-beaglebone-green-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green
[armv7hf-beaglebone-green-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green
[armv7hf-beaglebone-green-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green
[armv7hf-beaglebone-green-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-golang/
[armv7hf-beaglebone-green-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-golang/tags/manage/
[armv7hf-beaglebone-green-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green
[armv7hf-beaglebone-green-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-openjdk/
[armv7hf-beaglebone-green-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-openjdk/tags/manage/
[armv7hf-beaglebone-green-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green

[armv7hf-beaglebone-green-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine/
[armv7hf-beaglebone-green-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-buildpack-deps/
[armv7hf-beaglebone-green-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-node/
[armv7hf-beaglebone-green-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-node/tags/manage/
[armv7hf-beaglebone-green-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-python/
[armv7hf-beaglebone-green-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-python/tags/manage/
[armv7hf-beaglebone-green-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green
[armv7hf-beaglebone-green-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green
[armv7hf-beaglebone-green-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green
[armv7hf-beaglebone-green-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green
[armv7hf-beaglebone-green-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-golang/
[armv7hf-beaglebone-green-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-golang/tags/manage/
[armv7hf-beaglebone-green-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green
[armv7hf-beaglebone-green-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-openjdk/
[armv7hf-beaglebone-green-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-alpine-openjdk/tags/manage/
[armv7hf-beaglebone-green-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green

[armv7hf-beaglebone-green-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora/
[armv7hf-beaglebone-green-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-buildpack-deps/
[armv7hf-beaglebone-green-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-node/
[armv7hf-beaglebone-green-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-node/tags/manage/
[armv7hf-beaglebone-green-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-python/
[armv7hf-beaglebone-green-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-python/tags/manage/
[armv7hf-beaglebone-green-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green
[armv7hf-beaglebone-green-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green
[armv7hf-beaglebone-green-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green
[armv7hf-beaglebone-green-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green
[armv7hf-beaglebone-green-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-golang/
[armv7hf-beaglebone-green-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-golang/tags/manage/
[armv7hf-beaglebone-green-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green
[armv7hf-beaglebone-green-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-openjdk/
[armv7hf-beaglebone-green-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-fedora-openjdk/tags/manage/
[armv7hf-beaglebone-green-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green

[armv7hf-beaglebone-green-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu/
[armv7hf-beaglebone-green-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-buildpack-deps/
[armv7hf-beaglebone-green-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-node/
[armv7hf-beaglebone-green-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-node/tags/manage/
[armv7hf-beaglebone-green-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-python/
[armv7hf-beaglebone-green-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-python/tags/manage/
[armv7hf-beaglebone-green-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green
[armv7hf-beaglebone-green-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green
[armv7hf-beaglebone-green-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green
[armv7hf-beaglebone-green-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green
[armv7hf-beaglebone-green-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-golang/
[armv7hf-beaglebone-green-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-ubuntu-golang/tags/manage/
[armv7hf-beaglebone-green-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green


[armv7hf-beaglebone-green-wifi-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-debian/
[armv7hf-beaglebone-green-wifi-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-buildpack-deps/
[armv7hf-beaglebone-green-wifi-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-node/
[armv7hf-beaglebone-green-wifi-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-node/tags/manage/
[armv7hf-beaglebone-green-wifi-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-python/
[armv7hf-beaglebone-green-wifi-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-python/tags/manage/
[armv7hf-beaglebone-green-wifi-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-golang/
[armv7hf-beaglebone-green-wifi-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-golang/tags/manage/
[armv7hf-beaglebone-green-wifi-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-openjdk/
[armv7hf-beaglebone-green-wifi-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-openjdk/tags/manage/
[armv7hf-beaglebone-green-wifi-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green-wifi

[armv7hf-beaglebone-green-wifi-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine/
[armv7hf-beaglebone-green-wifi-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-buildpack-deps/
[armv7hf-beaglebone-green-wifi-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-node/
[armv7hf-beaglebone-green-wifi-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-node/tags/manage/
[armv7hf-beaglebone-green-wifi-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-python/
[armv7hf-beaglebone-green-wifi-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-python/tags/manage/
[armv7hf-beaglebone-green-wifi-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-golang/
[armv7hf-beaglebone-green-wifi-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-golang/tags/manage/
[armv7hf-beaglebone-green-wifi-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-openjdk/
[armv7hf-beaglebone-green-wifi-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-alpine-openjdk/tags/manage/
[armv7hf-beaglebone-green-wifi-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green-wifi

[armv7hf-beaglebone-green-wifi-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora/
[armv7hf-beaglebone-green-wifi-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-buildpack-deps/
[armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-node/
[armv7hf-beaglebone-green-wifi-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-node/tags/manage/
[armv7hf-beaglebone-green-wifi-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-python/
[armv7hf-beaglebone-green-wifi-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-python/tags/manage/
[armv7hf-beaglebone-green-wifi-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-golang/
[armv7hf-beaglebone-green-wifi-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-golang/tags/manage/
[armv7hf-beaglebone-green-wifi-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-openjdk/
[armv7hf-beaglebone-green-wifi-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-fedora-openjdk/tags/manage/
[armv7hf-beaglebone-green-wifi-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/beaglebone-green-wifi

[armv7hf-beaglebone-green-wifi-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu/
[armv7hf-beaglebone-green-wifi-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-buildpack-deps/
[armv7hf-beaglebone-green-wifi-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-node/
[armv7hf-beaglebone-green-wifi-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-node/tags/manage/
[armv7hf-beaglebone-green-wifi-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-python/
[armv7hf-beaglebone-green-wifi-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-python/tags/manage/
[armv7hf-beaglebone-green-wifi-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/beaglebone-green-wifi
[armv7hf-beaglebone-green-wifi-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-golang/
[armv7hf-beaglebone-green-wifi-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/beaglebone-green-wifi-ubuntu-golang/tags/manage/
[armv7hf-beaglebone-green-wifi-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/beaglebone-green-wifi


[armv7hf-via-vab820-quad-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-debian/
[armv7hf-via-vab820-quad-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-buildpack-deps/
[armv7hf-via-vab820-quad-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-node/
[armv7hf-via-vab820-quad-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-node/tags/manage/
[armv7hf-via-vab820-quad-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-python/
[armv7hf-via-vab820-quad-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-python/tags/manage/
[armv7hf-via-vab820-quad-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/via-vab820-quad
[armv7hf-via-vab820-quad-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/via-vab820-quad
[armv7hf-via-vab820-quad-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/via-vab820-quad
[armv7hf-via-vab820-quad-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/via-vab820-quad
[armv7hf-via-vab820-quad-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-golang/
[armv7hf-via-vab820-quad-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-golang/tags/manage/
[armv7hf-via-vab820-quad-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/via-vab820-quad
[armv7hf-via-vab820-quad-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-openjdk/
[armv7hf-via-vab820-quad-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-openjdk/tags/manage/
[armv7hf-via-vab820-quad-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/via-vab820-quad

[armv7hf-via-vab820-quad-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine/
[armv7hf-via-vab820-quad-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-buildpack-deps/
[armv7hf-via-vab820-quad-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-node/
[armv7hf-via-vab820-quad-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-node/tags/manage/
[armv7hf-via-vab820-quad-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-python/
[armv7hf-via-vab820-quad-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-python/tags/manage/
[armv7hf-via-vab820-quad-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/via-vab820-quad
[armv7hf-via-vab820-quad-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/via-vab820-quad
[armv7hf-via-vab820-quad-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/via-vab820-quad
[armv7hf-via-vab820-quad-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/via-vab820-quad
[armv7hf-via-vab820-quad-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-golang/
[armv7hf-via-vab820-quad-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-golang/tags/manage/
[armv7hf-via-vab820-quad-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/via-vab820-quad
[armv7hf-via-vab820-quad-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-openjdk/
[armv7hf-via-vab820-quad-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-alpine-openjdk/tags/manage/
[armv7hf-via-vab820-quad-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/via-vab820-quad

[armv7hf-via-vab820-quad-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora/
[armv7hf-via-vab820-quad-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-buildpack-deps/
[armv7hf-via-vab820-quad-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-node/
[armv7hf-via-vab820-quad-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-node/tags/manage/
[armv7hf-via-vab820-quad-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-python/
[armv7hf-via-vab820-quad-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-python/tags/manage/
[armv7hf-via-vab820-quad-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/via-vab820-quad
[armv7hf-via-vab820-quad-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/via-vab820-quad
[armv7hf-via-vab820-quad-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/via-vab820-quad
[armv7hf-via-vab820-quad-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/via-vab820-quad
[armv7hf-via-vab820-quad-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-golang/
[armv7hf-via-vab820-quad-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-golang/tags/manage/
[armv7hf-via-vab820-quad-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/via-vab820-quad
[armv7hf-via-vab820-quad-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-openjdk/
[armv7hf-via-vab820-quad-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-fedora-openjdk/tags/manage/
[armv7hf-via-vab820-quad-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/via-vab820-quad

[armv7hf-via-vab820-quad-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu/
[armv7hf-via-vab820-quad-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-buildpack-deps/
[armv7hf-via-vab820-quad-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-node/
[armv7hf-via-vab820-quad-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-node/tags/manage/
[armv7hf-via-vab820-quad-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-python/
[armv7hf-via-vab820-quad-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-python/tags/manage/
[armv7hf-via-vab820-quad-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/via-vab820-quad
[armv7hf-via-vab820-quad-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/via-vab820-quad
[armv7hf-via-vab820-quad-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/via-vab820-quad
[armv7hf-via-vab820-quad-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/via-vab820-quad
[armv7hf-via-vab820-quad-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-golang/
[armv7hf-via-vab820-quad-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/via-vab820-quad-ubuntu-golang/tags/manage/
[armv7hf-via-vab820-quad-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/via-vab820-quad


[armv7hf-zynq-xz702-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-debian/
[armv7hf-zynq-xz702-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-buildpack-deps/
[armv7hf-zynq-xz702-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-node/
[armv7hf-zynq-xz702-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-node/tags/manage/
[armv7hf-zynq-xz702-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-python/
[armv7hf-zynq-xz702-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-python/tags/manage/
[armv7hf-zynq-xz702-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/zynq-xz702
[armv7hf-zynq-xz702-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/zynq-xz702
[armv7hf-zynq-xz702-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/zynq-xz702
[armv7hf-zynq-xz702-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/zynq-xz702
[armv7hf-zynq-xz702-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-golang/
[armv7hf-zynq-xz702-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-golang/tags/manage/
[armv7hf-zynq-xz702-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/zynq-xz702
[armv7hf-zynq-xz702-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-openjdk/
[armv7hf-zynq-xz702-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-openjdk/tags/manage/
[armv7hf-zynq-xz702-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/zynq-xz702

[armv7hf-zynq-xz702-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine/
[armv7hf-zynq-xz702-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-buildpack-deps/
[armv7hf-zynq-xz702-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-node/
[armv7hf-zynq-xz702-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-node/tags/manage/
[armv7hf-zynq-xz702-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-python/
[armv7hf-zynq-xz702-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-python/tags/manage/
[armv7hf-zynq-xz702-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/zynq-xz702
[armv7hf-zynq-xz702-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/zynq-xz702
[armv7hf-zynq-xz702-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/zynq-xz702
[armv7hf-zynq-xz702-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/zynq-xz702
[armv7hf-zynq-xz702-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-golang/
[armv7hf-zynq-xz702-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-golang/tags/manage/
[armv7hf-zynq-xz702-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/zynq-xz702
[armv7hf-zynq-xz702-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-openjdk/
[armv7hf-zynq-xz702-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-alpine-openjdk/tags/manage/
[armv7hf-zynq-xz702-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/zynq-xz702

[armv7hf-zynq-xz702-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora/
[armv7hf-zynq-xz702-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-buildpack-deps/
[armv7hf-zynq-xz702-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-node/
[armv7hf-zynq-xz702-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-node/tags/manage/
[armv7hf-zynq-xz702-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-python/
[armv7hf-zynq-xz702-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-python/tags/manage/
[armv7hf-zynq-xz702-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/zynq-xz702
[armv7hf-zynq-xz702-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/zynq-xz702
[armv7hf-zynq-xz702-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/zynq-xz702
[armv7hf-zynq-xz702-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/zynq-xz702
[armv7hf-zynq-xz702-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-golang/
[armv7hf-zynq-xz702-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-golang/tags/manage/
[armv7hf-zynq-xz702-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/zynq-xz702
[armv7hf-zynq-xz702-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-openjdk/
[armv7hf-zynq-xz702-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-fedora-openjdk/tags/manage/
[armv7hf-zynq-xz702-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/zynq-xz702

[armv7hf-zynq-xz702-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu/
[armv7hf-zynq-xz702-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-buildpack-deps/
[armv7hf-zynq-xz702-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-node/
[armv7hf-zynq-xz702-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-node/tags/manage/
[armv7hf-zynq-xz702-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-python/
[armv7hf-zynq-xz702-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-python/tags/manage/
[armv7hf-zynq-xz702-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/zynq-xz702
[armv7hf-zynq-xz702-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/zynq-xz702
[armv7hf-zynq-xz702-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/zynq-xz702
[armv7hf-zynq-xz702-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/zynq-xz702
[armv7hf-zynq-xz702-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-golang/
[armv7hf-zynq-xz702-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/zynq-xz702-ubuntu-golang/tags/manage/
[armv7hf-zynq-xz702-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/zynq-xz702


[armv7hf-odroid-c1-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-debian/
[armv7hf-odroid-c1-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-buildpack-deps/
[armv7hf-odroid-c1-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-node/
[armv7hf-odroid-c1-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-node/tags/manage/
[armv7hf-odroid-c1-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-python/
[armv7hf-odroid-c1-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-python/tags/manage/
[armv7hf-odroid-c1-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-c1
[armv7hf-odroid-c1-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7hf-odroid-c1-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-c1
[armv7hf-odroid-c1-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-c1
[armv7hf-odroid-c1-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-golang/
[armv7hf-odroid-c1-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-golang/tags/manage/
[armv7hf-odroid-c1-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-c1
[armv7hf-odroid-c1-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-openjdk/
[armv7hf-odroid-c1-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-openjdk/tags/manage/
[armv7hf-odroid-c1-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-c1

[armv7hf-odroid-c1-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine/
[armv7hf-odroid-c1-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-buildpack-deps/
[armv7hf-odroid-c1-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-node/
[armv7hf-odroid-c1-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-node/tags/manage/
[armv7hf-odroid-c1-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-python/
[armv7hf-odroid-c1-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-python/tags/manage/
[armv7hf-odroid-c1-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-c1
[armv7hf-odroid-c1-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7hf-odroid-c1-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-c1
[armv7hf-odroid-c1-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-c1
[armv7hf-odroid-c1-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-golang/
[armv7hf-odroid-c1-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-golang/tags/manage/
[armv7hf-odroid-c1-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-c1
[armv7hf-odroid-c1-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-openjdk/
[armv7hf-odroid-c1-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-alpine-openjdk/tags/manage/
[armv7hf-odroid-c1-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-c1

[armv7hf-odroid-c1-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora/
[armv7hf-odroid-c1-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-buildpack-deps/
[armv7hf-odroid-c1-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-node/
[armv7hf-odroid-c1-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-node/tags/manage/
[armv7hf-odroid-c1-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-python/
[armv7hf-odroid-c1-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-python/tags/manage/
[armv7hf-odroid-c1-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-c1
[armv7hf-odroid-c1-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7hf-odroid-c1-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-c1
[armv7hf-odroid-c1-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-c1
[armv7hf-odroid-c1-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-golang/
[armv7hf-odroid-c1-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-golang/tags/manage/
[armv7hf-odroid-c1-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-c1
[armv7hf-odroid-c1-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-openjdk/
[armv7hf-odroid-c1-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-fedora-openjdk/tags/manage/
[armv7hf-odroid-c1-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-c1

[armv7hf-odroid-c1-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu/
[armv7hf-odroid-c1-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-buildpack-deps/
[armv7hf-odroid-c1-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-node/
[armv7hf-odroid-c1-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-node/tags/manage/
[armv7hf-odroid-c1-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-python/
[armv7hf-odroid-c1-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-python/tags/manage/
[armv7hf-odroid-c1-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-c1
[armv7hf-odroid-c1-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7hf-odroid-c1-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-c1
[armv7hf-odroid-c1-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-c1
[armv7hf-odroid-c1-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-golang/
[armv7hf-odroid-c1-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-c1-ubuntu-golang/tags/manage/
[armv7hf-odroid-c1-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-c1


[armv7hf-odroid-xu4-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-debian/
[armv7hf-odroid-xu4-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-buildpack-deps/
[armv7hf-odroid-xu4-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-node/
[armv7hf-odroid-xu4-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-node/tags/manage/
[armv7hf-odroid-xu4-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-python/
[armv7hf-odroid-xu4-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-python/tags/manage/
[armv7hf-odroid-xu4-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-xu4
[armv7hf-odroid-xu4-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-xu4
[armv7hf-odroid-xu4-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-xu4
[armv7hf-odroid-xu4-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-xu4
[armv7hf-odroid-xu4-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-golang/
[armv7hf-odroid-xu4-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-golang/tags/manage/
[armv7hf-odroid-xu4-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-xu4
[armv7hf-odroid-xu4-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-openjdk/
[armv7hf-odroid-xu4-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-openjdk/tags/manage/
[armv7hf-odroid-xu4-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-xu4

[armv7hf-odroid-xu4-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine/
[armv7hf-odroid-xu4-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-buildpack-deps/
[armv7hf-odroid-xu4-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-node/
[armv7hf-odroid-xu4-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-node/tags/manage/
[armv7hf-odroid-xu4-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-python/
[armv7hf-odroid-xu4-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-python/tags/manage/
[armv7hf-odroid-xu4-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-xu4
[armv7hf-odroid-xu4-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-xu4
[armv7hf-odroid-xu4-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-xu4
[armv7hf-odroid-xu4-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-xu4
[armv7hf-odroid-xu4-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-golang/
[armv7hf-odroid-xu4-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-golang/tags/manage/
[armv7hf-odroid-xu4-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-xu4
[armv7hf-odroid-xu4-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-openjdk/
[armv7hf-odroid-xu4-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-alpine-openjdk/tags/manage/
[armv7hf-odroid-xu4-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-xu4

[armv7hf-odroid-xu4-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora/
[armv7hf-odroid-xu4-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-buildpack-deps/
[armv7hf-odroid-xu4-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-node/
[armv7hf-odroid-xu4-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-node/tags/manage/
[armv7hf-odroid-xu4-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-python/
[armv7hf-odroid-xu4-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-python/tags/manage/
[armv7hf-odroid-xu4-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-xu4
[armv7hf-odroid-xu4-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-xu4
[armv7hf-odroid-xu4-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-xu4
[armv7hf-odroid-xu4-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-xu4
[armv7hf-odroid-xu4-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-golang/
[armv7hf-odroid-xu4-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-golang/tags/manage/
[armv7hf-odroid-xu4-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-xu4
[armv7hf-odroid-xu4-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-openjdk/
[armv7hf-odroid-xu4-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-fedora-openjdk/tags/manage/
[armv7hf-odroid-xu4-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/odroid-xu4

[armv7hf-odroid-xu4-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu/
[armv7hf-odroid-xu4-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-buildpack-deps/
[armv7hf-odroid-xu4-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-node/
[armv7hf-odroid-xu4-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-node/tags/manage/
[armv7hf-odroid-xu4-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-python/
[armv7hf-odroid-xu4-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-python/tags/manage/
[armv7hf-odroid-xu4-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/odroid-xu4
[armv7hf-odroid-xu4-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/odroid-xu4
[armv7hf-odroid-xu4-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/odroid-xu4
[armv7hf-odroid-xu4-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/odroid-xu4
[armv7hf-odroid-xu4-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-golang/
[armv7hf-odroid-xu4-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/odroid-xu4-ubuntu-golang/tags/manage/
[armv7hf-odroid-xu4-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/odroid-xu4


[armv7hf-parallella-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-debian/
[armv7hf-parallella-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-buildpack-deps/
[armv7hf-parallella-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-node/
[armv7hf-parallella-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-node/tags/manage/
[armv7hf-parallella-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-python/
[armv7hf-parallella-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-python/tags/manage/
[armv7hf-parallella-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/parallella
[armv7hf-parallella-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/parallella
[armv7hf-parallella-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/parallella
[armv7hf-parallella-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/parallella
[armv7hf-parallella-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-golang/
[armv7hf-parallella-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-golang/tags/manage/
[armv7hf-parallella-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/parallella
[armv7hf-parallella-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-openjdk/
[armv7hf-parallella-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-openjdk/tags/manage/
[armv7hf-parallella-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/parallella

[armv7hf-parallella-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine/
[armv7hf-parallella-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-buildpack-deps/
[armv7hf-parallella-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-node/
[armv7hf-parallella-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-node/tags/manage/
[armv7hf-parallella-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-python/
[armv7hf-parallella-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-python/tags/manage/
[armv7hf-parallella-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/parallella
[armv7hf-parallella-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/parallella
[armv7hf-parallella-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/parallella
[armv7hf-parallella-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/parallella
[armv7hf-parallella-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-golang/
[armv7hf-parallella-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-golang/tags/manage/
[armv7hf-parallella-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/parallella
[armv7hf-parallella-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-openjdk/
[armv7hf-parallella-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-alpine-openjdk/tags/manage/
[armv7hf-parallella-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/parallella

[armv7hf-parallella-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora/
[armv7hf-parallella-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-buildpack-deps/
[armv7hf-parallella-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-node/
[armv7hf-parallella-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-node/tags/manage/
[armv7hf-parallella-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-python/
[armv7hf-parallella-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-python/tags/manage/
[armv7hf-parallella-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/parallella
[armv7hf-parallella-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/parallella
[armv7hf-parallella-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/parallella
[armv7hf-parallella-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/parallella
[armv7hf-parallella-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-golang/
[armv7hf-parallella-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-golang/tags/manage/
[armv7hf-parallella-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/parallella
[armv7hf-parallella-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-openjdk/
[armv7hf-parallella-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-fedora-openjdk/tags/manage/
[armv7hf-parallella-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/parallella

[armv7hf-parallella-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu/
[armv7hf-parallella-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-buildpack-deps/
[armv7hf-parallella-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-node/
[armv7hf-parallella-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-node/tags/manage/
[armv7hf-parallella-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-python/
[armv7hf-parallella-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-python/tags/manage/
[armv7hf-parallella-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/parallella
[armv7hf-parallella-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/parallella
[armv7hf-parallella-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/parallella
[armv7hf-parallella-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/parallella
[armv7hf-parallella-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-golang/
[armv7hf-parallella-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/parallella-ubuntu-golang/tags/manage/
[armv7hf-parallella-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/parallella


[armv7hf-nitrogen6x-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-debian/
[armv7hf-nitrogen6x-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-buildpack-deps/
[armv7hf-nitrogen6x-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-node/
[armv7hf-nitrogen6x-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-node/tags/manage/
[armv7hf-nitrogen6x-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-python/
[armv7hf-nitrogen6x-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-python/tags/manage/
[armv7hf-nitrogen6x-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/nitrogen6x
[armv7hf-nitrogen6x-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7hf-nitrogen6x-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/nitrogen6x
[armv7hf-nitrogen6x-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/nitrogen6x
[armv7hf-nitrogen6x-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-golang/
[armv7hf-nitrogen6x-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-golang/tags/manage/
[armv7hf-nitrogen6x-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/nitrogen6x
[armv7hf-nitrogen6x-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-openjdk/
[armv7hf-nitrogen6x-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-openjdk/tags/manage/
[armv7hf-nitrogen6x-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/nitrogen6x

[armv7hf-nitrogen6x-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine/
[armv7hf-nitrogen6x-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-buildpack-deps/
[armv7hf-nitrogen6x-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-node/
[armv7hf-nitrogen6x-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-node/tags/manage/
[armv7hf-nitrogen6x-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-python/
[armv7hf-nitrogen6x-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-python/tags/manage/
[armv7hf-nitrogen6x-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/nitrogen6x
[armv7hf-nitrogen6x-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7hf-nitrogen6x-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/nitrogen6x
[armv7hf-nitrogen6x-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/nitrogen6x
[armv7hf-nitrogen6x-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-golang/
[armv7hf-nitrogen6x-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-golang/tags/manage/
[armv7hf-nitrogen6x-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/nitrogen6x
[armv7hf-nitrogen6x-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-openjdk/
[armv7hf-nitrogen6x-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-alpine-openjdk/tags/manage/
[armv7hf-nitrogen6x-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/nitrogen6x

[armv7hf-nitrogen6x-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora/
[armv7hf-nitrogen6x-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-buildpack-deps/
[armv7hf-nitrogen6x-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-node/
[armv7hf-nitrogen6x-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-node/tags/manage/
[armv7hf-nitrogen6x-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-python/
[armv7hf-nitrogen6x-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-python/tags/manage/
[armv7hf-nitrogen6x-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/nitrogen6x
[armv7hf-nitrogen6x-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7hf-nitrogen6x-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/nitrogen6x
[armv7hf-nitrogen6x-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/nitrogen6x
[armv7hf-nitrogen6x-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-golang/
[armv7hf-nitrogen6x-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-golang/tags/manage/
[armv7hf-nitrogen6x-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/nitrogen6x
[armv7hf-nitrogen6x-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-openjdk/
[armv7hf-nitrogen6x-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-fedora-openjdk/tags/manage/
[armv7hf-nitrogen6x-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/nitrogen6x

[armv7hf-nitrogen6x-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu/
[armv7hf-nitrogen6x-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-buildpack-deps/
[armv7hf-nitrogen6x-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-node/
[armv7hf-nitrogen6x-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-node/tags/manage/
[armv7hf-nitrogen6x-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-python/
[armv7hf-nitrogen6x-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-python/tags/manage/
[armv7hf-nitrogen6x-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/nitrogen6x
[armv7hf-nitrogen6x-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7hf-nitrogen6x-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/nitrogen6x
[armv7hf-nitrogen6x-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/nitrogen6x
[armv7hf-nitrogen6x-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-golang/
[armv7hf-nitrogen6x-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/nitrogen6x-ubuntu-golang/tags/manage/
[armv7hf-nitrogen6x-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/nitrogen6x


[armv7hf-hummingboard-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-debian/
[armv7hf-hummingboard-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-buildpack-deps/
[armv7hf-hummingboard-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-node/
[armv7hf-hummingboard-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-node/tags/manage/
[armv7hf-hummingboard-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-python/
[armv7hf-hummingboard-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-python/tags/manage/
[armv7hf-hummingboard-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/hummingboard
[armv7hf-hummingboard-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/hummingboard
[armv7hf-hummingboard-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/hummingboard
[armv7hf-hummingboard-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/hummingboard
[armv7hf-hummingboard-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-golang/
[armv7hf-hummingboard-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-golang/tags/manage/
[armv7hf-hummingboard-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/hummingboard
[armv7hf-hummingboard-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-openjdk/
[armv7hf-hummingboard-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-openjdk/tags/manage/
[armv7hf-hummingboard-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/hummingboard

[armv7hf-hummingboard-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine/
[armv7hf-hummingboard-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-buildpack-deps/
[armv7hf-hummingboard-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-node/
[armv7hf-hummingboard-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-node/tags/manage/
[armv7hf-hummingboard-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-python/
[armv7hf-hummingboard-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-python/tags/manage/
[armv7hf-hummingboard-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/hummingboard
[armv7hf-hummingboard-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/hummingboard
[armv7hf-hummingboard-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/hummingboard
[armv7hf-hummingboard-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/hummingboard
[armv7hf-hummingboard-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-golang/
[armv7hf-hummingboard-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-golang/tags/manage/
[armv7hf-hummingboard-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/hummingboard
[armv7hf-hummingboard-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-openjdk/
[armv7hf-hummingboard-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-alpine-openjdk/tags/manage/
[armv7hf-hummingboard-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/hummingboard

[armv7hf-hummingboard-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora/
[armv7hf-hummingboard-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-buildpack-deps/
[armv7hf-hummingboard-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-node/
[armv7hf-hummingboard-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-node/tags/manage/
[armv7hf-hummingboard-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-python/
[armv7hf-hummingboard-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-python/tags/manage/
[armv7hf-hummingboard-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/hummingboard
[armv7hf-hummingboard-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/hummingboard
[armv7hf-hummingboard-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/hummingboard
[armv7hf-hummingboard-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/hummingboard
[armv7hf-hummingboard-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-golang/
[armv7hf-hummingboard-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-golang/tags/manage/
[armv7hf-hummingboard-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/hummingboard
[armv7hf-hummingboard-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-openjdk/
[armv7hf-hummingboard-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-fedora-openjdk/tags/manage/
[armv7hf-hummingboard-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/hummingboard

[armv7hf-hummingboard-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu/
[armv7hf-hummingboard-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-buildpack-deps/
[armv7hf-hummingboard-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-node/
[armv7hf-hummingboard-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-node/tags/manage/
[armv7hf-hummingboard-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-python/
[armv7hf-hummingboard-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-python/tags/manage/
[armv7hf-hummingboard-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/hummingboard
[armv7hf-hummingboard-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/hummingboard
[armv7hf-hummingboard-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/hummingboard
[armv7hf-hummingboard-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/hummingboard
[armv7hf-hummingboard-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-golang/
[armv7hf-hummingboard-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/hummingboard-ubuntu-golang/tags/manage/
[armv7hf-hummingboard-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/hummingboard


[armv7hf-colibri-imx6dl-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-debian/
[armv7hf-colibri-imx6dl-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-buildpack-deps/
[armv7hf-colibri-imx6dl-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-node/
[armv7hf-colibri-imx6dl-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-node/tags/manage/
[armv7hf-colibri-imx6dl-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-python/
[armv7hf-colibri-imx6dl-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-python/tags/manage/
[armv7hf-colibri-imx6dl-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/colibri-imx6dl
[armv7hf-colibri-imx6dl-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/colibri-imx6dl
[armv7hf-colibri-imx6dl-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/colibri-imx6dl
[armv7hf-colibri-imx6dl-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/colibri-imx6dl
[armv7hf-colibri-imx6dl-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-golang/
[armv7hf-colibri-imx6dl-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-golang/tags/manage/
[armv7hf-colibri-imx6dl-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/colibri-imx6dl
[armv7hf-colibri-imx6dl-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-openjdk/
[armv7hf-colibri-imx6dl-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-openjdk/tags/manage/
[armv7hf-colibri-imx6dl-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/colibri-imx6dl

[armv7hf-colibri-imx6dl-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine/
[armv7hf-colibri-imx6dl-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-buildpack-deps/
[armv7hf-colibri-imx6dl-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-node/
[armv7hf-colibri-imx6dl-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-node/tags/manage/
[armv7hf-colibri-imx6dl-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-python/
[armv7hf-colibri-imx6dl-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-python/tags/manage/
[armv7hf-colibri-imx6dl-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/colibri-imx6dl
[armv7hf-colibri-imx6dl-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/colibri-imx6dl
[armv7hf-colibri-imx6dl-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/colibri-imx6dl
[armv7hf-colibri-imx6dl-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/colibri-imx6dl
[armv7hf-colibri-imx6dl-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-golang/
[armv7hf-colibri-imx6dl-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-golang/tags/manage/
[armv7hf-colibri-imx6dl-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/colibri-imx6dl
[armv7hf-colibri-imx6dl-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-openjdk/
[armv7hf-colibri-imx6dl-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-alpine-openjdk/tags/manage/
[armv7hf-colibri-imx6dl-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/colibri-imx6dl

[armv7hf-colibri-imx6dl-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora/
[armv7hf-colibri-imx6dl-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-buildpack-deps/
[armv7hf-colibri-imx6dl-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-node/
[armv7hf-colibri-imx6dl-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-node/tags/manage/
[armv7hf-colibri-imx6dl-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-python/
[armv7hf-colibri-imx6dl-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-python/tags/manage/
[armv7hf-colibri-imx6dl-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/colibri-imx6dl
[armv7hf-colibri-imx6dl-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/colibri-imx6dl
[armv7hf-colibri-imx6dl-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/colibri-imx6dl
[armv7hf-colibri-imx6dl-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/colibri-imx6dl
[armv7hf-colibri-imx6dl-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-golang/
[armv7hf-colibri-imx6dl-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-golang/tags/manage/
[armv7hf-colibri-imx6dl-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/colibri-imx6dl
[armv7hf-colibri-imx6dl-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-openjdk/
[armv7hf-colibri-imx6dl-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-fedora-openjdk/tags/manage/
[armv7hf-colibri-imx6dl-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/colibri-imx6dl

[armv7hf-colibri-imx6dl-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu/
[armv7hf-colibri-imx6dl-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-buildpack-deps/
[armv7hf-colibri-imx6dl-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-node/
[armv7hf-colibri-imx6dl-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-node/tags/manage/
[armv7hf-colibri-imx6dl-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-python/
[armv7hf-colibri-imx6dl-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-python/tags/manage/
[armv7hf-colibri-imx6dl-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/colibri-imx6dl
[armv7hf-colibri-imx6dl-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/colibri-imx6dl
[armv7hf-colibri-imx6dl-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/colibri-imx6dl
[armv7hf-colibri-imx6dl-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/colibri-imx6dl
[armv7hf-colibri-imx6dl-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-golang/
[armv7hf-colibri-imx6dl-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/colibri-imx6dl-ubuntu-golang/tags/manage/
[armv7hf-colibri-imx6dl-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/colibri-imx6dl


[armv7hf-apalis-imx6q-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-debian/
[armv7hf-apalis-imx6q-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-buildpack-deps/
[armv7hf-apalis-imx6q-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-node/
[armv7hf-apalis-imx6q-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-node/tags/manage/
[armv7hf-apalis-imx6q-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-python/
[armv7hf-apalis-imx6q-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-python/tags/manage/
[armv7hf-apalis-imx6q-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/apalis-imx6q
[armv7hf-apalis-imx6q-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/apalis-imx6q
[armv7hf-apalis-imx6q-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/apalis-imx6q
[armv7hf-apalis-imx6q-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/apalis-imx6q
[armv7hf-apalis-imx6q-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-golang/
[armv7hf-apalis-imx6q-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-golang/tags/manage/
[armv7hf-apalis-imx6q-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/apalis-imx6q
[armv7hf-apalis-imx6q-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-openjdk/
[armv7hf-apalis-imx6q-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-openjdk/tags/manage/
[armv7hf-apalis-imx6q-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/apalis-imx6q

[armv7hf-apalis-imx6q-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine/
[armv7hf-apalis-imx6q-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-buildpack-deps/
[armv7hf-apalis-imx6q-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-node/
[armv7hf-apalis-imx6q-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-node/tags/manage/
[armv7hf-apalis-imx6q-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-python/
[armv7hf-apalis-imx6q-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-python/tags/manage/
[armv7hf-apalis-imx6q-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/apalis-imx6q
[armv7hf-apalis-imx6q-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/apalis-imx6q
[armv7hf-apalis-imx6q-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/apalis-imx6q
[armv7hf-apalis-imx6q-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/apalis-imx6q
[armv7hf-apalis-imx6q-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-golang/
[armv7hf-apalis-imx6q-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-golang/tags/manage/
[armv7hf-apalis-imx6q-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/apalis-imx6q
[armv7hf-apalis-imx6q-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-openjdk/
[armv7hf-apalis-imx6q-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-alpine-openjdk/tags/manage/
[armv7hf-apalis-imx6q-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/apalis-imx6q

[armv7hf-apalis-imx6q-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora/
[armv7hf-apalis-imx6q-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-buildpack-deps/
[armv7hf-apalis-imx6q-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-node/
[armv7hf-apalis-imx6q-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-node/tags/manage/
[armv7hf-apalis-imx6q-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-python/
[armv7hf-apalis-imx6q-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-python/tags/manage/
[armv7hf-apalis-imx6q-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/apalis-imx6q
[armv7hf-apalis-imx6q-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/apalis-imx6q
[armv7hf-apalis-imx6q-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/apalis-imx6q
[armv7hf-apalis-imx6q-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/apalis-imx6q
[armv7hf-apalis-imx6q-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-golang/
[armv7hf-apalis-imx6q-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-golang/tags/manage/
[armv7hf-apalis-imx6q-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/apalis-imx6q
[armv7hf-apalis-imx6q-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-openjdk/
[armv7hf-apalis-imx6q-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-fedora-openjdk/tags/manage/
[armv7hf-apalis-imx6q-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/apalis-imx6q

[armv7hf-apalis-imx6q-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu/
[armv7hf-apalis-imx6q-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-buildpack-deps/
[armv7hf-apalis-imx6q-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-node/
[armv7hf-apalis-imx6q-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-node/tags/manage/
[armv7hf-apalis-imx6q-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-python/
[armv7hf-apalis-imx6q-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-python/tags/manage/
[armv7hf-apalis-imx6q-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/apalis-imx6q
[armv7hf-apalis-imx6q-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/apalis-imx6q
[armv7hf-apalis-imx6q-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/apalis-imx6q
[armv7hf-apalis-imx6q-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/apalis-imx6q
[armv7hf-apalis-imx6q-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-golang/
[armv7hf-apalis-imx6q-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/apalis-imx6q-ubuntu-golang/tags/manage/
[armv7hf-apalis-imx6q-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/apalis-imx6q


[i386-intel-edison-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-debian/
[i386-intel-edison-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-buildpack-deps/
[i386-intel-edison-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-node/
[i386-intel-edison-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-node/tags/manage/
[i386-intel-edison-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-python/
[i386-intel-edison-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-python/tags/manage/
[i386-intel-edison-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-edison
[i386-intel-edison-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-edison
[i386-intel-edison-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-edison
[i386-intel-edison-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-edison
[i386-intel-edison-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-golang/
[i386-intel-edison-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-golang/tags/manage/
[i386-intel-edison-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-edison
[i386-intel-edison-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-openjdk/
[i386-intel-edison-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-openjdk/tags/manage/
[i386-intel-edison-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/intel-edison

[i386-intel-edison-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine/
[i386-intel-edison-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-buildpack-deps/
[i386-intel-edison-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-node/
[i386-intel-edison-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-node/tags/manage/
[i386-intel-edison-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-python/
[i386-intel-edison-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-python/tags/manage/
[i386-intel-edison-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-edison
[i386-intel-edison-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-edison
[i386-intel-edison-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-edison
[i386-intel-edison-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-edison
[i386-intel-edison-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-golang/
[i386-intel-edison-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-golang/tags/manage/
[i386-intel-edison-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-edison
[i386-intel-edison-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-openjdk/
[i386-intel-edison-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-alpine-openjdk/tags/manage/
[i386-intel-edison-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/intel-edison

[i386-intel-edison-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu/
[i386-intel-edison-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-buildpack-deps/
[i386-intel-edison-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-node/
[i386-intel-edison-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-node/tags/manage/
[i386-intel-edison-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-python/
[i386-intel-edison-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-python/tags/manage/
[i386-intel-edison-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-edison
[i386-intel-edison-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-edison
[i386-intel-edison-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-edison
[i386-intel-edison-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-edison
[i386-intel-edison-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-golang/
[i386-intel-edison-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-edison-ubuntu-golang/tags/manage/
[i386-intel-edison-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-edison


[i386-qemux86-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-debian/
[i386-qemux86-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-buildpack-deps/
[i386-qemux86-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-node/
[i386-qemux86-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-node/tags/manage/
[i386-qemux86-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-python/
[i386-qemux86-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-python/tags/manage/
[i386-qemux86-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86
[i386-qemux86-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86
[i386-qemux86-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86
[i386-qemux86-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86
[i386-qemux86-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-golang/
[i386-qemux86-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-golang/tags/manage/
[i386-qemux86-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86
[i386-qemux86-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-openjdk/
[i386-qemux86-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-openjdk/tags/manage/
[i386-qemux86-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/qemux86

[i386-qemux86-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine/
[i386-qemux86-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-buildpack-deps/
[i386-qemux86-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-node/
[i386-qemux86-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-node/tags/manage/
[i386-qemux86-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-python/
[i386-qemux86-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-python/tags/manage/
[i386-qemux86-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86
[i386-qemux86-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86
[i386-qemux86-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86
[i386-qemux86-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86
[i386-qemux86-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-golang/
[i386-qemux86-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-golang/tags/manage/
[i386-qemux86-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86
[i386-qemux86-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-openjdk/
[i386-qemux86-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-alpine-openjdk/tags/manage/
[i386-qemux86-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/qemux86

[i386-qemux86-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu/
[i386-qemux86-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-buildpack-deps/
[i386-qemux86-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-node/
[i386-qemux86-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-node/tags/manage/
[i386-qemux86-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-python/
[i386-qemux86-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-python/tags/manage/
[i386-qemux86-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86
[i386-qemux86-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86
[i386-qemux86-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86
[i386-qemux86-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86
[i386-qemux86-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-golang/
[i386-qemux86-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-ubuntu-golang/tags/manage/
[i386-qemux86-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86


[i386-cybertan-ze250-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-debian/
[i386-cybertan-ze250-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-buildpack-deps/
[i386-cybertan-ze250-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-node/
[i386-cybertan-ze250-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-node/tags/manage/
[i386-cybertan-ze250-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-python/
[i386-cybertan-ze250-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-python/tags/manage/
[i386-cybertan-ze250-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/cybertan-ze250
[i386-cybertan-ze250-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/cybertan-ze250
[i386-cybertan-ze250-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/cybertan-ze250
[i386-cybertan-ze250-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/cybertan-ze250
[i386-cybertan-ze250-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-golang/
[i386-cybertan-ze250-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-golang/tags/manage/
[i386-cybertan-ze250-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/cybertan-ze250
[i386-cybertan-ze250-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-openjdk/
[i386-cybertan-ze250-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-openjdk/tags/manage/
[i386-cybertan-ze250-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/cybertan-ze250

[i386-cybertan-ze250-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine/
[i386-cybertan-ze250-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-buildpack-deps/
[i386-cybertan-ze250-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-node/
[i386-cybertan-ze250-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-node/tags/manage/
[i386-cybertan-ze250-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-python/
[i386-cybertan-ze250-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-python/tags/manage/
[i386-cybertan-ze250-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/cybertan-ze250
[i386-cybertan-ze250-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/cybertan-ze250
[i386-cybertan-ze250-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/cybertan-ze250
[i386-cybertan-ze250-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/cybertan-ze250
[i386-cybertan-ze250-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-golang/
[i386-cybertan-ze250-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-golang/tags/manage/
[i386-cybertan-ze250-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/cybertan-ze250
[i386-cybertan-ze250-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-openjdk/
[i386-cybertan-ze250-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-alpine-openjdk/tags/manage/
[i386-cybertan-ze250-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/cybertan-ze250

[i386-cybertan-ze250-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu/
[i386-cybertan-ze250-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-buildpack-deps/
[i386-cybertan-ze250-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-node/
[i386-cybertan-ze250-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-node/tags/manage/
[i386-cybertan-ze250-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-python/
[i386-cybertan-ze250-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-python/tags/manage/
[i386-cybertan-ze250-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/cybertan-ze250
[i386-cybertan-ze250-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/cybertan-ze250
[i386-cybertan-ze250-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/cybertan-ze250
[i386-cybertan-ze250-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/cybertan-ze250
[i386-cybertan-ze250-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-golang/
[i386-cybertan-ze250-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/cybertan-ze250-ubuntu-golang/tags/manage/
[i386-cybertan-ze250-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/cybertan-ze250


[amd64-intel-nuc-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-debian/
[amd64-intel-nuc-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-buildpack-deps/
[amd64-intel-nuc-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-node/
[amd64-intel-nuc-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-node/tags/manage/
[amd64-intel-nuc-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-python/
[amd64-intel-nuc-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-python/tags/manage/
[amd64-intel-nuc-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-nuc
[amd64-intel-nuc-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-nuc
[amd64-intel-nuc-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-nuc
[amd64-intel-nuc-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-nuc
[amd64-intel-nuc-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-golang/
[amd64-intel-nuc-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-golang/tags/manage/
[amd64-intel-nuc-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-nuc
[amd64-intel-nuc-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-openjdk/
[amd64-intel-nuc-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-openjdk/tags/manage/
[amd64-intel-nuc-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/intel-nuc

[amd64-intel-nuc-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine/
[amd64-intel-nuc-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-buildpack-deps/
[amd64-intel-nuc-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-node/
[amd64-intel-nuc-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-node/tags/manage/
[amd64-intel-nuc-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-python/
[amd64-intel-nuc-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-python/tags/manage/
[amd64-intel-nuc-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-nuc
[amd64-intel-nuc-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-nuc
[amd64-intel-nuc-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-nuc
[amd64-intel-nuc-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-nuc
[amd64-intel-nuc-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-golang/
[amd64-intel-nuc-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-golang/tags/manage/
[amd64-intel-nuc-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-nuc
[amd64-intel-nuc-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-openjdk/
[amd64-intel-nuc-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-alpine-openjdk/tags/manage/
[amd64-intel-nuc-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/intel-nuc

[amd64-intel-nuc-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora/
[amd64-intel-nuc-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-buildpack-deps/
[amd64-intel-nuc-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-node/
[amd64-intel-nuc-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-node/tags/manage/
[amd64-intel-nuc-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-python/
[amd64-intel-nuc-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-python/tags/manage/
[amd64-intel-nuc-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-nuc
[amd64-intel-nuc-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-nuc
[amd64-intel-nuc-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-nuc
[amd64-intel-nuc-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-nuc
[amd64-intel-nuc-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-golang/
[amd64-intel-nuc-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-golang/tags/manage/
[amd64-intel-nuc-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-nuc
[amd64-intel-nuc-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-openjdk/
[amd64-intel-nuc-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-fedora-openjdk/tags/manage/
[amd64-intel-nuc-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/intel-nuc

[amd64-intel-nuc-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu/
[amd64-intel-nuc-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-buildpack-deps/
[amd64-intel-nuc-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-node/
[amd64-intel-nuc-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-node/tags/manage/
[amd64-intel-nuc-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-python/
[amd64-intel-nuc-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-python/tags/manage/
[amd64-intel-nuc-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/intel-nuc
[amd64-intel-nuc-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/intel-nuc
[amd64-intel-nuc-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/intel-nuc
[amd64-intel-nuc-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/intel-nuc
[amd64-intel-nuc-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-golang/
[amd64-intel-nuc-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/intel-nuc-ubuntu-golang/tags/manage/
[amd64-intel-nuc-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/intel-nuc


[amd64-qemux86-64-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-debian/
[amd64-qemux86-64-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-buildpack-deps/
[amd64-qemux86-64-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-node/
[amd64-qemux86-64-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-node/tags/manage/
[amd64-qemux86-64-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-python/
[amd64-qemux86-64-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-python/tags/manage/
[amd64-qemux86-64-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86-64
[amd64-qemux86-64-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86-64
[amd64-qemux86-64-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86-64
[amd64-qemux86-64-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86-64
[amd64-qemux86-64-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-golang/
[amd64-qemux86-64-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-golang/tags/manage/
[amd64-qemux86-64-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86-64
[amd64-qemux86-64-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-openjdk/
[amd64-qemux86-64-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-openjdk/tags/manage/
[amd64-qemux86-64-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/qemux86-64

[amd64-qemux86-64-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine/
[amd64-qemux86-64-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-buildpack-deps/
[amd64-qemux86-64-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-node/
[amd64-qemux86-64-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-node/tags/manage/
[amd64-qemux86-64-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-python/
[amd64-qemux86-64-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-python/tags/manage/
[amd64-qemux86-64-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86-64
[amd64-qemux86-64-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86-64
[amd64-qemux86-64-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86-64
[amd64-qemux86-64-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86-64
[amd64-qemux86-64-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-golang/
[amd64-qemux86-64-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-golang/tags/manage/
[amd64-qemux86-64-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86-64
[amd64-qemux86-64-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-openjdk/
[amd64-qemux86-64-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-alpine-openjdk/tags/manage/
[amd64-qemux86-64-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/qemux86-64

[amd64-qemux86-64-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora/
[amd64-qemux86-64-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-buildpack-deps/
[amd64-qemux86-64-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-node/
[amd64-qemux86-64-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-node/tags/manage/
[amd64-qemux86-64-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-python/
[amd64-qemux86-64-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-python/tags/manage/
[amd64-qemux86-64-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86-64
[amd64-qemux86-64-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86-64
[amd64-qemux86-64-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86-64
[amd64-qemux86-64-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86-64
[amd64-qemux86-64-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-golang/
[amd64-qemux86-64-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-golang/tags/manage/
[amd64-qemux86-64-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86-64
[amd64-qemux86-64-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-openjdk/
[amd64-qemux86-64-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-fedora-openjdk/tags/manage/
[amd64-qemux86-64-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/qemux86-64

[amd64-qemux86-64-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu/
[amd64-qemux86-64-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-buildpack-deps/
[amd64-qemux86-64-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-node/
[amd64-qemux86-64-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-node/tags/manage/
[amd64-qemux86-64-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-python/
[amd64-qemux86-64-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-python/tags/manage/
[amd64-qemux86-64-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/qemux86-64
[amd64-qemux86-64-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/qemux86-64
[amd64-qemux86-64-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/qemux86-64
[amd64-qemux86-64-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/qemux86-64
[amd64-qemux86-64-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-golang/
[amd64-qemux86-64-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/qemux86-64-ubuntu-golang/tags/manage/
[amd64-qemux86-64-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/qemux86-64


[armv7hf-ts4900-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-debian/
[armv7hf-ts4900-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-buildpack-deps/
[armv7hf-ts4900-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-node/
[armv7hf-ts4900-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-node/tags/manage/
[armv7hf-ts4900-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-python/
[armv7hf-ts4900-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-python/tags/manage/
[armv7hf-ts4900-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/ts4900
[armv7hf-ts4900-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/ts4900
[armv7hf-ts4900-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/ts4900
[armv7hf-ts4900-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/ts4900
[armv7hf-ts4900-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-golang/
[armv7hf-ts4900-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-golang/tags/manage/
[armv7hf-ts4900-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/ts4900
[armv7hf-ts4900-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-openjdk/
[armv7hf-ts4900-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-openjdk/tags/manage/
[armv7hf-ts4900-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/ts4900

[armv7hf-ts4900-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine/
[armv7hf-ts4900-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-buildpack-deps/
[armv7hf-ts4900-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-node/
[armv7hf-ts4900-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-node/tags/manage/
[armv7hf-ts4900-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-python/
[armv7hf-ts4900-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-python/tags/manage/
[armv7hf-ts4900-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/ts4900
[armv7hf-ts4900-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/ts4900
[armv7hf-ts4900-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/ts4900
[armv7hf-ts4900-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/ts4900
[armv7hf-ts4900-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-golang/
[armv7hf-ts4900-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-golang/tags/manage/
[armv7hf-ts4900-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/ts4900
[armv7hf-ts4900-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-openjdk/
[armv7hf-ts4900-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-alpine-openjdk/tags/manage/
[armv7hf-ts4900-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/ts4900

[armv7hf-ts4900-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora/
[armv7hf-ts4900-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-buildpack-deps/
[armv7hf-ts4900-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-node/
[armv7hf-ts4900-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-node/tags/manage/
[armv7hf-ts4900-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-python/
[armv7hf-ts4900-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-python/tags/manage/
[armv7hf-ts4900-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/ts4900
[armv7hf-ts4900-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/ts4900
[armv7hf-ts4900-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/ts4900
[armv7hf-ts4900-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/ts4900
[armv7hf-ts4900-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-golang/
[armv7hf-ts4900-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-golang/tags/manage/
[armv7hf-ts4900-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/ts4900
[armv7hf-ts4900-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-openjdk/
[armv7hf-ts4900-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-fedora-openjdk/tags/manage/
[armv7hf-ts4900-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/ts4900

[armv7hf-ts4900-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu/
[armv7hf-ts4900-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-buildpack-deps/
[armv7hf-ts4900-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-node/
[armv7hf-ts4900-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-node/tags/manage/
[armv7hf-ts4900-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-python/
[armv7hf-ts4900-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-python/tags/manage/
[armv7hf-ts4900-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/ts4900
[armv7hf-ts4900-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/ts4900
[armv7hf-ts4900-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/ts4900
[armv7hf-ts4900-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/ts4900
[armv7hf-ts4900-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-golang/
[armv7hf-ts4900-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts4900-ubuntu-golang/tags/manage/
[armv7hf-ts4900-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/ts4900


[armel-ts7700-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-debian/
[armel-ts7700-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-buildpack-deps/
[armel-ts7700-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-node/
[armel-ts7700-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-node/tags/manage/
[armel-ts7700-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-python/
[armel-ts7700-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-python/tags/manage/
[armel-ts7700-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/ts7700
[armel-ts7700-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/ts7700
[armel-ts7700-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/ts7700
[armel-ts7700-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/ts7700
[armel-ts7700-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-golang/
[armel-ts7700-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-golang/tags/manage/
[armel-ts7700-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/ts7700
[armel-ts7700-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-openjdk/
[armel-ts7700-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/ts7700-openjdk/tags/manage/
[armel-ts7700-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/ts7700

[armv7hf-artik5-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-debian/
[armv7hf-artik5-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-buildpack-deps/
[armv7hf-artik5-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-node/
[armv7hf-artik5-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-node/tags/manage/
[armv7hf-artik5-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-python/
[armv7hf-artik5-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-python/tags/manage/
[armv7hf-artik5-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik5
[armv7hf-artik5-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik5
[armv7hf-artik5-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik5
[armv7hf-artik5-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik5
[armv7hf-artik5-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-golang/
[armv7hf-artik5-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-golang/tags/manage/
[armv7hf-artik5-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik5
[armv7hf-artik5-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-openjdk/
[armv7hf-artik5-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-openjdk/tags/manage/
[armv7hf-artik5-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik5

[armv7hf-artik5-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine/
[armv7hf-artik5-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-buildpack-deps/
[armv7hf-artik5-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-node/
[armv7hf-artik5-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-node/tags/manage/
[armv7hf-artik5-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-python/
[armv7hf-artik5-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-python/tags/manage/
[armv7hf-artik5-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik5
[armv7hf-artik5-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik5
[armv7hf-artik5-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik5
[armv7hf-artik5-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik5
[armv7hf-artik5-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-golang/
[armv7hf-artik5-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-golang/tags/manage/
[armv7hf-artik5-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik5
[armv7hf-artik5-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-openjdk/
[armv7hf-artik5-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-alpine-openjdk/tags/manage/
[armv7hf-artik5-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik5

[armv7hf-artik5-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora/
[armv7hf-artik5-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-buildpack-deps/
[armv7hf-artik5-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-node/
[armv7hf-artik5-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-node/tags/manage/
[armv7hf-artik5-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-python/
[armv7hf-artik5-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-python/tags/manage/
[armv7hf-artik5-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik5
[armv7hf-artik5-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik5
[armv7hf-artik5-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik5
[armv7hf-artik5-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik5
[armv7hf-artik5-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-golang/
[armv7hf-artik5-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-golang/tags/manage/
[armv7hf-artik5-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik5
[armv7hf-artik5-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-openjdk/
[armv7hf-artik5-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-fedora-openjdk/tags/manage/
[armv7hf-artik5-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik5
>>>>>>> a5c4876... base-images: Latest updates for base images documentation

[armv7hf-artik5-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu/
[armv7hf-artik5-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-buildpack-deps/
[armv7hf-artik5-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-node/
[armv7hf-artik5-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-node/tags/manage/
[armv7hf-artik5-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-python/
[armv7hf-artik5-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-python/tags/manage/
[armv7hf-artik5-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik5
[armv7hf-artik5-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik5
[armv7hf-artik5-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik5
[armv7hf-artik5-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik5
[armv7hf-artik5-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-golang/
[armv7hf-artik5-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik5-ubuntu-golang/tags/manage/
[armv7hf-artik5-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik5


[armv7hf-artik10-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-debian/
[armv7hf-artik10-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-buildpack-deps/
[armv7hf-artik10-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-node/
[armv7hf-artik10-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-node/tags/manage/
[armv7hf-artik10-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-python/
[armv7hf-artik10-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-python/tags/manage/
[armv7hf-artik10-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik10
[armv7hf-artik10-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik10
[armv7hf-artik10-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik10
[armv7hf-artik10-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik10
[armv7hf-artik10-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-golang/
[armv7hf-artik10-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-golang/tags/manage/
[armv7hf-artik10-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik10
[armv7hf-artik10-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-openjdk/
[armv7hf-artik10-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-openjdk/tags/manage/
[armv7hf-artik10-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik10

[armv7hf-artik10-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine/
[armv7hf-artik10-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-buildpack-deps/
[armv7hf-artik10-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-node/
[armv7hf-artik10-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-node/tags/manage/
[armv7hf-artik10-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-python/
[armv7hf-artik10-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-python/tags/manage/
[armv7hf-artik10-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik10
[armv7hf-artik10-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik10
[armv7hf-artik10-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik10
[armv7hf-artik10-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik10
[armv7hf-artik10-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-golang/
[armv7hf-artik10-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-golang/tags/manage/
[armv7hf-artik10-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik10
[armv7hf-artik10-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-openjdk/
[armv7hf-artik10-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-alpine-openjdk/tags/manage/
[armv7hf-artik10-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik10

[armv7hf-artik10-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora/
[armv7hf-artik10-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-buildpack-deps/
[armv7hf-artik10-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-node/
[armv7hf-artik10-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-node/tags/manage/
[armv7hf-artik10-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-python/
[armv7hf-artik10-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-python/tags/manage/
[armv7hf-artik10-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik10
[armv7hf-artik10-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik10
[armv7hf-artik10-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik10
[armv7hf-artik10-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik10
[armv7hf-artik10-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-golang/
[armv7hf-artik10-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-golang/tags/manage/
[armv7hf-artik10-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik10
[armv7hf-artik10-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-openjdk/
[armv7hf-artik10-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-fedora-openjdk/tags/manage/
[armv7hf-artik10-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik10

[armv7hf-artik10-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu/
[armv7hf-artik10-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-buildpack-deps/
[armv7hf-artik10-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-node/
[armv7hf-artik10-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-node/tags/manage/
[armv7hf-artik10-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-python/
[armv7hf-artik10-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-python/tags/manage/
[armv7hf-artik10-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik10
[armv7hf-artik10-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik10
[armv7hf-artik10-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik10
[armv7hf-artik10-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik10
[armv7hf-artik10-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-golang/
[armv7hf-artik10-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik10-ubuntu-golang/tags/manage/
[armv7hf-artik10-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik10


[aarch64-artik710-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-debian/
[aarch64-artik710-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-buildpack-deps/
[aarch64-artik710-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-node/
[aarch64-artik710-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-node/tags/manage/
[aarch64-artik710-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-python/
[aarch64-artik710-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-python/tags/manage/
[aarch64-artik710-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik710
[aarch64-artik710-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik710
[aarch64-artik710-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik710
[aarch64-artik710-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik710
[aarch64-artik710-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-golang/
[aarch64-artik710-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-golang/tags/manage/
[aarch64-artik710-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik710
[aarch64-artik710-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-openjdk/
[aarch64-artik710-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-openjdk/tags/manage/
[aarch64-artik710-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik710

[aarch64-artik710-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine/
[aarch64-artik710-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-buildpack-deps/
[aarch64-artik710-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-node/
[aarch64-artik710-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-node/tags/manage/
[aarch64-artik710-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-python/
[aarch64-artik710-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-python/tags/manage/
[aarch64-artik710-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik710
[aarch64-artik710-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik710
[aarch64-artik710-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik710
[aarch64-artik710-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik710
[aarch64-artik710-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-golang/
[aarch64-artik710-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-golang/tags/manage/
[aarch64-artik710-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik710
[aarch64-artik710-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-openjdk/
[aarch64-artik710-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-alpine-openjdk/tags/manage/
[aarch64-artik710-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik710

[aarch64-artik710-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora/
[aarch64-artik710-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-buildpack-deps/
[aarch64-artik710-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-node/
[aarch64-artik710-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-node/tags/manage/
[aarch64-artik710-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-python/
[aarch64-artik710-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-python/tags/manage/
[aarch64-artik710-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik710
[aarch64-artik710-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik710
[aarch64-artik710-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik710
[aarch64-artik710-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik710
[aarch64-artik710-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-golang/
[aarch64-artik710-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-golang/tags/manage/
[aarch64-artik710-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik710
[aarch64-artik710-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-openjdk/
[aarch64-artik710-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-fedora-openjdk/tags/manage/
[aarch64-artik710-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik710

[aarch64-artik710-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu/
[aarch64-artik710-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-buildpack-deps/
[aarch64-artik710-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-node/
[aarch64-artik710-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-node/tags/manage/
[aarch64-artik710-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-python/
[aarch64-artik710-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-python/tags/manage/
[aarch64-artik710-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik710
[aarch64-artik710-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik710
[aarch64-artik710-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik710
[aarch64-artik710-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik710
[aarch64-artik710-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-golang/
[aarch64-artik710-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik710-ubuntu-golang/tags/manage/
[aarch64-artik710-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik710


[aarch64-kitra710-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-debian/
[aarch64-kitra710-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-buildpack-deps/
[aarch64-kitra710-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-node/
[aarch64-kitra710-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-node/tags/manage/
[aarch64-kitra710-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-python/
[aarch64-kitra710-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-python/tags/manage/
[aarch64-kitra710-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra710
[aarch64-kitra710-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra710
[aarch64-kitra710-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra710
[aarch64-kitra710-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra710
[aarch64-kitra710-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-golang/
[aarch64-kitra710-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-golang/tags/manage/
[aarch64-kitra710-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra710
[aarch64-kitra710-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-openjdk/
[aarch64-kitra710-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-openjdk/tags/manage/
[aarch64-kitra710-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra710

[aarch64-kitra710-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine/
[aarch64-kitra710-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-buildpack-deps/
[aarch64-kitra710-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-node/
[aarch64-kitra710-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-node/tags/manage/
[aarch64-kitra710-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-python/
[aarch64-kitra710-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-python/tags/manage/
[aarch64-kitra710-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra710
[aarch64-kitra710-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra710
[aarch64-kitra710-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra710
[aarch64-kitra710-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra710
[aarch64-kitra710-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-golang/
[aarch64-kitra710-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-golang/tags/manage/
[aarch64-kitra710-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra710
[aarch64-kitra710-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-openjdk/
[aarch64-kitra710-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-alpine-openjdk/tags/manage/
[aarch64-kitra710-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra710

[aarch64-kitra710-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora/
[aarch64-kitra710-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-buildpack-deps/
[aarch64-kitra710-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-node/
[aarch64-kitra710-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-node/tags/manage/
[aarch64-kitra710-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-python/
[aarch64-kitra710-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-python/tags/manage/
[aarch64-kitra710-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra710
[aarch64-kitra710-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra710
[aarch64-kitra710-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra710
[aarch64-kitra710-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra710
[aarch64-kitra710-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-golang/
[aarch64-kitra710-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-golang/tags/manage/
[aarch64-kitra710-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra710
[aarch64-kitra710-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-openjdk/
[aarch64-kitra710-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-fedora-openjdk/tags/manage/
[aarch64-kitra710-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra710

[aarch64-kitra710-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu/
[aarch64-kitra710-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-buildpack-deps/
[aarch64-kitra710-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-node/
[aarch64-kitra710-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-node/tags/manage/
[aarch64-kitra710-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-python/
[aarch64-kitra710-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-python/tags/manage/
[aarch64-kitra710-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra710
[aarch64-kitra710-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra710
[aarch64-kitra710-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra710
[aarch64-kitra710-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra710
[aarch64-kitra710-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-golang/
[aarch64-kitra710-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra710-ubuntu-golang/tags/manage/
[aarch64-kitra710-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra710


[amd64-up-board-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-debian/
[amd64-up-board-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-buildpack-deps/
[amd64-up-board-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-node/
[amd64-up-board-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-node/tags/manage/
[amd64-up-board-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-python/
[amd64-up-board-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-python/tags/manage/
[amd64-up-board-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/up-board
[amd64-up-board-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/up-board
[amd64-up-board-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/up-board
[amd64-up-board-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/up-board
[amd64-up-board-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-golang/
[amd64-up-board-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-golang/tags/manage/
[amd64-up-board-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/up-board
[amd64-up-board-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-openjdk/
[amd64-up-board-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-openjdk/tags/manage/
[amd64-up-board-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/up-board

[amd64-up-board-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine/
[amd64-up-board-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-buildpack-deps/
[amd64-up-board-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-node/
[amd64-up-board-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-node/tags/manage/
[amd64-up-board-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-python/
[amd64-up-board-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-python/tags/manage/
[amd64-up-board-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/up-board
[amd64-up-board-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/up-board
[amd64-up-board-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/up-board
[amd64-up-board-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/up-board
[amd64-up-board-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-golang/
[amd64-up-board-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-golang/tags/manage/
[amd64-up-board-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/up-board
[amd64-up-board-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-openjdk/
[amd64-up-board-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-alpine-openjdk/tags/manage/
[amd64-up-board-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/up-board

[amd64-up-board-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora/
[amd64-up-board-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-buildpack-deps/
[amd64-up-board-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-node/
[amd64-up-board-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-node/tags/manage/
[amd64-up-board-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-python/
[amd64-up-board-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-python/tags/manage/
[amd64-up-board-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/up-board
[amd64-up-board-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/up-board
[amd64-up-board-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/up-board
[amd64-up-board-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/up-board
[amd64-up-board-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-golang/
[amd64-up-board-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-golang/tags/manage/
[amd64-up-board-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/up-board
[amd64-up-board-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-openjdk/
[amd64-up-board-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-fedora-openjdk/tags/manage/
[amd64-up-board-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/up-board

[amd64-up-board-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu/
[amd64-up-board-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-buildpack-deps/
[amd64-up-board-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-node/
[amd64-up-board-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-node/tags/manage/
[amd64-up-board-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-python/
[amd64-up-board-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-python/tags/manage/
[amd64-up-board-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/up-board
[amd64-up-board-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/up-board
[amd64-up-board-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/up-board
[amd64-up-board-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/up-board
[amd64-up-board-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-golang/
[amd64-up-board-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/up-board-ubuntu-golang/tags/manage/
[amd64-up-board-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/up-board


[armv7hf-imx6ul-var-dart-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-debian/
[armv7hf-imx6ul-var-dart-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-buildpack-deps/
[armv7hf-imx6ul-var-dart-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-node/
[armv7hf-imx6ul-var-dart-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-node/tags/manage/
[armv7hf-imx6ul-var-dart-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-python/
[armv7hf-imx6ul-var-dart-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-python/tags/manage/
[armv7hf-imx6ul-var-dart-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-golang/
[armv7hf-imx6ul-var-dart-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-golang/tags/manage/
[armv7hf-imx6ul-var-dart-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-openjdk/
[armv7hf-imx6ul-var-dart-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-openjdk/tags/manage/
[armv7hf-imx6ul-var-dart-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/imx6ul-var-dart

[armv7hf-imx6ul-var-dart-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine/
[armv7hf-imx6ul-var-dart-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-buildpack-deps/
[armv7hf-imx6ul-var-dart-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-node/
[armv7hf-imx6ul-var-dart-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-node/tags/manage/
[armv7hf-imx6ul-var-dart-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-python/
[armv7hf-imx6ul-var-dart-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-python/tags/manage/
[armv7hf-imx6ul-var-dart-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-golang/
[armv7hf-imx6ul-var-dart-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-golang/tags/manage/
[armv7hf-imx6ul-var-dart-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-openjdk/
[armv7hf-imx6ul-var-dart-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-alpine-openjdk/tags/manage/
[armv7hf-imx6ul-var-dart-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/imx6ul-var-dart

[armv7hf-imx6ul-var-dart-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora/
[armv7hf-imx6ul-var-dart-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-buildpack-deps/
[armv7hf-imx6ul-var-dart-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-node/
[armv7hf-imx6ul-var-dart-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-node/tags/manage/
[armv7hf-imx6ul-var-dart-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-python/
[armv7hf-imx6ul-var-dart-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-python/tags/manage/
[armv7hf-imx6ul-var-dart-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-golang/
[armv7hf-imx6ul-var-dart-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-golang/tags/manage/
[armv7hf-imx6ul-var-dart-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-openjdk/
[armv7hf-imx6ul-var-dart-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-fedora-openjdk/tags/manage/
[armv7hf-imx6ul-var-dart-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/imx6ul-var-dart

[armv7hf-imx6ul-var-dart-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu/
[armv7hf-imx6ul-var-dart-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-buildpack-deps/
[armv7hf-imx6ul-var-dart-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-node/
[armv7hf-imx6ul-var-dart-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-node/tags/manage/
[armv7hf-imx6ul-var-dart-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-python/
[armv7hf-imx6ul-var-dart-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-python/tags/manage/
[armv7hf-imx6ul-var-dart-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/imx6ul-var-dart
[armv7hf-imx6ul-var-dart-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-golang/
[armv7hf-imx6ul-var-dart-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/imx6ul-var-dart-ubuntu-golang/tags/manage/
[armv7hf-imx6ul-var-dart-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/imx6ul-var-dart


[armv7hf-am571x-evm-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-debian/
[armv7hf-am571x-evm-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-buildpack-deps/
[armv7hf-am571x-evm-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-node/
[armv7hf-am571x-evm-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-node/tags/manage/
[armv7hf-am571x-evm-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-python/
[armv7hf-am571x-evm-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-python/tags/manage/
[armv7hf-am571x-evm-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/am571x-evm
[armv7hf-am571x-evm-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/am571x-evm
[armv7hf-am571x-evm-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/am571x-evm
[armv7hf-am571x-evm-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/am571x-evm
[armv7hf-am571x-evm-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-golang/
[armv7hf-am571x-evm-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-golang/tags/manage/
[armv7hf-am571x-evm-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/am571x-evm
[armv7hf-am571x-evm-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-openjdk/
[armv7hf-am571x-evm-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-openjdk/tags/manage/
[armv7hf-am571x-evm-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/am571x-evm

[armv7hf-am571x-evm-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine/
[armv7hf-am571x-evm-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-buildpack-deps/
[armv7hf-am571x-evm-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-node/
[armv7hf-am571x-evm-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-node/tags/manage/
[armv7hf-am571x-evm-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-python/
[armv7hf-am571x-evm-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-python/tags/manage/
[armv7hf-am571x-evm-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/am571x-evm
[armv7hf-am571x-evm-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/am571x-evm
[armv7hf-am571x-evm-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/am571x-evm
[armv7hf-am571x-evm-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/am571x-evm
[armv7hf-am571x-evm-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-golang/
[armv7hf-am571x-evm-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-golang/tags/manage/
[armv7hf-am571x-evm-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/am571x-evm
[armv7hf-am571x-evm-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-openjdk/
[armv7hf-am571x-evm-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-alpine-openjdk/tags/manage/
[armv7hf-am571x-evm-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/am571x-evm

[armv7hf-am571x-evm-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora/
[armv7hf-am571x-evm-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-buildpack-deps/
[armv7hf-am571x-evm-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-node/
[armv7hf-am571x-evm-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-node/tags/manage/
[armv7hf-am571x-evm-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-python/
[armv7hf-am571x-evm-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-python/tags/manage/
[armv7hf-am571x-evm-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/am571x-evm
[armv7hf-am571x-evm-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/am571x-evm
[armv7hf-am571x-evm-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/am571x-evm
[armv7hf-am571x-evm-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/am571x-evm
[armv7hf-am571x-evm-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-golang/
[armv7hf-am571x-evm-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-golang/tags/manage/
[armv7hf-am571x-evm-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/am571x-evm
[armv7hf-am571x-evm-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-openjdk/
[armv7hf-am571x-evm-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-fedora-openjdk/tags/manage/
[armv7hf-am571x-evm-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/am571x-evm

[armv7hf-am571x-evm-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu/
[armv7hf-am571x-evm-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-buildpack-deps/
[armv7hf-am571x-evm-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-node/
[armv7hf-am571x-evm-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-node/tags/manage/
[armv7hf-am571x-evm-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-python/
[armv7hf-am571x-evm-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-python/tags/manage/
[armv7hf-am571x-evm-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/am571x-evm
[armv7hf-am571x-evm-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/am571x-evm
[armv7hf-am571x-evm-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/am571x-evm
[armv7hf-am571x-evm-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/am571x-evm
[armv7hf-am571x-evm-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-golang/
[armv7hf-am571x-evm-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/am571x-evm-ubuntu-golang/tags/manage/
[armv7hf-am571x-evm-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/am571x-evm


[armv7hf-kitra520-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-debian/
[armv7hf-kitra520-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-buildpack-deps/
[armv7hf-kitra520-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-node/
[armv7hf-kitra520-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-node/tags/manage/
[armv7hf-kitra520-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-python/
[armv7hf-kitra520-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-python/tags/manage/
[armv7hf-kitra520-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra520
[armv7hf-kitra520-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra520
[armv7hf-kitra520-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra520
[armv7hf-kitra520-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra520
[armv7hf-kitra520-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-golang/
[armv7hf-kitra520-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-golang/tags/manage/
[armv7hf-kitra520-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra520
[armv7hf-kitra520-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-openjdk/
[armv7hf-kitra520-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-openjdk/tags/manage/
[armv7hf-kitra520-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra520

[armv7hf-kitra520-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine/
[armv7hf-kitra520-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-buildpack-deps/
[armv7hf-kitra520-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-node/
[armv7hf-kitra520-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-node/tags/manage/
[armv7hf-kitra520-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-python/
[armv7hf-kitra520-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-python/tags/manage/
[armv7hf-kitra520-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra520
[armv7hf-kitra520-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra520
[armv7hf-kitra520-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra520
[armv7hf-kitra520-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra520
[armv7hf-kitra520-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-golang/
[armv7hf-kitra520-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-golang/tags/manage/
[armv7hf-kitra520-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra520
[armv7hf-kitra520-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-openjdk/
[armv7hf-kitra520-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-alpine-openjdk/tags/manage/
[armv7hf-kitra520-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra520

[armv7hf-kitra520-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora/
[armv7hf-kitra520-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-buildpack-deps/
[armv7hf-kitra520-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-node/
[armv7hf-kitra520-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-node/tags/manage/
[armv7hf-kitra520-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-python/
[armv7hf-kitra520-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-python/tags/manage/
[armv7hf-kitra520-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra520
[armv7hf-kitra520-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra520
[armv7hf-kitra520-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra520
[armv7hf-kitra520-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra520
[armv7hf-kitra520-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-golang/
[armv7hf-kitra520-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-golang/tags/manage/
[armv7hf-kitra520-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra520
[armv7hf-kitra520-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-openjdk/
[armv7hf-kitra520-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-fedora-openjdk/tags/manage/
[armv7hf-kitra520-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/kitra520
>>>>>>> a5c4876... base-images: Latest updates for base images documentation

[armv7hf-kitra520-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu/
[armv7hf-kitra520-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-buildpack-deps/
[armv7hf-kitra520-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-node/
[armv7hf-kitra520-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-node/tags/manage/
[armv7hf-kitra520-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-python/
[armv7hf-kitra520-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-python/tags/manage/
[armv7hf-kitra520-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/kitra520
[armv7hf-kitra520-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/kitra520
[armv7hf-kitra520-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/kitra520
[armv7hf-kitra520-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/kitra520
[armv7hf-kitra520-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-golang/
[armv7hf-kitra520-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/kitra520-ubuntu-golang/tags/manage/
[armv7hf-kitra520-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/kitra520


[aarch64-jetson-tx2-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-debian/
[aarch64-jetson-tx2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-buildpack-deps/
[aarch64-jetson-tx2-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-node/
[aarch64-jetson-tx2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-node/tags/manage/
[aarch64-jetson-tx2-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-python/
[aarch64-jetson-tx2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-python/tags/manage/
[aarch64-jetson-tx2-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx2
[aarch64-jetson-tx2-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx2
[aarch64-jetson-tx2-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx2
[aarch64-jetson-tx2-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx2
[aarch64-jetson-tx2-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-golang/
[aarch64-jetson-tx2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-golang/tags/manage/
[aarch64-jetson-tx2-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx2
[aarch64-jetson-tx2-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-openjdk/
[aarch64-jetson-tx2-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-openjdk/tags/manage/
[aarch64-jetson-tx2-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx2

[aarch64-jetson-tx2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine/
[aarch64-jetson-tx2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-buildpack-deps/
[aarch64-jetson-tx2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-node/
[aarch64-jetson-tx2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-node/tags/manage/
[aarch64-jetson-tx2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-python/
[aarch64-jetson-tx2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-python/tags/manage/
[aarch64-jetson-tx2-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx2
[aarch64-jetson-tx2-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx2
[aarch64-jetson-tx2-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx2
[aarch64-jetson-tx2-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx2
[aarch64-jetson-tx2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-golang/
[aarch64-jetson-tx2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-golang/tags/manage/
[aarch64-jetson-tx2-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx2
[aarch64-jetson-tx2-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-openjdk/
[aarch64-jetson-tx2-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-alpine-openjdk/tags/manage/
[aarch64-jetson-tx2-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx2

[aarch64-jetson-tx2-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora/
[aarch64-jetson-tx2-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-buildpack-deps/
[aarch64-jetson-tx2-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-node/
[aarch64-jetson-tx2-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-node/tags/manage/
[aarch64-jetson-tx2-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-python/
[aarch64-jetson-tx2-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-python/tags/manage/
[aarch64-jetson-tx2-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx2
[aarch64-jetson-tx2-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx2
[aarch64-jetson-tx2-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx2
[aarch64-jetson-tx2-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx2
[aarch64-jetson-tx2-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-golang/
[aarch64-jetson-tx2-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-golang/tags/manage/
[aarch64-jetson-tx2-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx2
[aarch64-jetson-tx2-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-openjdk/
[aarch64-jetson-tx2-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-fedora-openjdk/tags/manage/
[aarch64-jetson-tx2-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx2

[aarch64-jetson-tx2-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu/
[aarch64-jetson-tx2-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-buildpack-deps/
[aarch64-jetson-tx2-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-node/
[aarch64-jetson-tx2-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-node/tags/manage/
[aarch64-jetson-tx2-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-python/
[aarch64-jetson-tx2-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-python/tags/manage/
[aarch64-jetson-tx2-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx2
[aarch64-jetson-tx2-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx2
[aarch64-jetson-tx2-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx2
[aarch64-jetson-tx2-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx2
[aarch64-jetson-tx2-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-golang/
[aarch64-jetson-tx2-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx2-ubuntu-golang/tags/manage/
[aarch64-jetson-tx2-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx2


[aarch64-jetson-tx1-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-debian/
[aarch64-jetson-tx1-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-buildpack-deps/
[aarch64-jetson-tx1-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-node/
[aarch64-jetson-tx1-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-node/tags/manage/
[aarch64-jetson-tx1-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-python/
[aarch64-jetson-tx1-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-python/tags/manage/
[aarch64-jetson-tx1-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx1
[aarch64-jetson-tx1-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx1
[aarch64-jetson-tx1-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx1
[aarch64-jetson-tx1-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx1
[aarch64-jetson-tx1-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-golang/
[aarch64-jetson-tx1-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-golang/tags/manage/
[aarch64-jetson-tx1-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx1
[aarch64-jetson-tx1-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-openjdk/
[aarch64-jetson-tx1-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-openjdk/tags/manage/
[aarch64-jetson-tx1-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx1

[aarch64-jetson-tx1-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine/
[aarch64-jetson-tx1-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-buildpack-deps/
[aarch64-jetson-tx1-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-node/
[aarch64-jetson-tx1-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-node/tags/manage/
[aarch64-jetson-tx1-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-python/
[aarch64-jetson-tx1-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-python/tags/manage/
[aarch64-jetson-tx1-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx1
[aarch64-jetson-tx1-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx1
[aarch64-jetson-tx1-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx1
[aarch64-jetson-tx1-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx1
[aarch64-jetson-tx1-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-golang/
[aarch64-jetson-tx1-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-golang/tags/manage/
[aarch64-jetson-tx1-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx1
[aarch64-jetson-tx1-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-openjdk/
[aarch64-jetson-tx1-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-alpine-openjdk/tags/manage/
[aarch64-jetson-tx1-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx1

[aarch64-jetson-tx1-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora/
[aarch64-jetson-tx1-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-buildpack-deps/
[aarch64-jetson-tx1-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-node/
[aarch64-jetson-tx1-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-node/tags/manage/
[aarch64-jetson-tx1-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-python/
[aarch64-jetson-tx1-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-python/tags/manage/
[aarch64-jetson-tx1-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx1
[aarch64-jetson-tx1-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx1
[aarch64-jetson-tx1-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx1
[aarch64-jetson-tx1-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx1
[aarch64-jetson-tx1-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-golang/
[aarch64-jetson-tx1-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-golang/tags/manage/
[aarch64-jetson-tx1-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx1
[aarch64-jetson-tx1-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-openjdk/
[aarch64-jetson-tx1-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-fedora-openjdk/tags/manage/
[aarch64-jetson-tx1-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/jetson-tx1

[aarch64-jetson-tx1-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu/
[aarch64-jetson-tx1-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-buildpack-deps/
[aarch64-jetson-tx1-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-node/
[aarch64-jetson-tx1-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-node/tags/manage/
[aarch64-jetson-tx1-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-python/
[aarch64-jetson-tx1-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-python/tags/manage/
[aarch64-jetson-tx1-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/jetson-tx1
[aarch64-jetson-tx1-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/jetson-tx1
[aarch64-jetson-tx1-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/jetson-tx1
[aarch64-jetson-tx1-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/jetson-tx1
[aarch64-jetson-tx1-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-golang/
[aarch64-jetson-tx1-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/jetson-tx1-ubuntu-golang/tags/manage/
[aarch64-jetson-tx1-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/jetson-tx1


[i386-iot2000-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-debian/
[i386-iot2000-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-buildpack-deps/
[i386-iot2000-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-node/
[i386-iot2000-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-node/tags/manage/
[i386-iot2000-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-python/
[i386-iot2000-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-python/tags/manage/
[i386-iot2000-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/iot2000
[i386-iot2000-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/iot2000
[i386-iot2000-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/iot2000
[i386-iot2000-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/iot2000
[i386-iot2000-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-golang/
[i386-iot2000-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-golang/tags/manage/
[i386-iot2000-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/iot2000
[i386-iot2000-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-openjdk/
[i386-iot2000-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-openjdk/tags/manage/
[i386-iot2000-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/iot2000

[i386-iot2000-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine/
[i386-iot2000-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-buildpack-deps/
[i386-iot2000-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-node/
[i386-iot2000-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-node/tags/manage/
[i386-iot2000-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-python/
[i386-iot2000-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-python/tags/manage/
[i386-iot2000-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/iot2000
[i386-iot2000-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/iot2000
[i386-iot2000-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/iot2000
[i386-iot2000-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/iot2000
[i386-iot2000-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-golang/
[i386-iot2000-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-golang/tags/manage/
[i386-iot2000-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/iot2000
[i386-iot2000-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-openjdk/
[i386-iot2000-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-alpine-openjdk/tags/manage/
[i386-iot2000-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/iot2000

[i386-iot2000-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu/
[i386-iot2000-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-buildpack-deps/
[i386-iot2000-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-node/
[i386-iot2000-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-node/tags/manage/
[i386-iot2000-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-python/
[i386-iot2000-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-python/tags/manage/
[i386-iot2000-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/iot2000
[i386-iot2000-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/iot2000
[i386-iot2000-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/iot2000
[i386-iot2000-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/iot2000
[i386-iot2000-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-golang/
[i386-iot2000-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/iot2000-ubuntu-golang/tags/manage/
[i386-iot2000-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/iot2000


[armv7hf-bananapi-m1-plus-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-debian/
[armv7hf-bananapi-m1-plus-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-buildpack-deps/
[armv7hf-bananapi-m1-plus-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-node/
[armv7hf-bananapi-m1-plus-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-node/tags/manage/
[armv7hf-bananapi-m1-plus-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-python/
[armv7hf-bananapi-m1-plus-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-python/tags/manage/
[armv7hf-bananapi-m1-plus-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-golang/
[armv7hf-bananapi-m1-plus-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-golang/tags/manage/
[armv7hf-bananapi-m1-plus-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-openjdk/
[armv7hf-bananapi-m1-plus-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-openjdk/tags/manage/
[armv7hf-bananapi-m1-plus-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/bananapi-m1-plus

[armv7hf-bananapi-m1-plus-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine/
[armv7hf-bananapi-m1-plus-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-buildpack-deps/
[armv7hf-bananapi-m1-plus-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-node/
[armv7hf-bananapi-m1-plus-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-node/tags/manage/
[armv7hf-bananapi-m1-plus-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-python/
[armv7hf-bananapi-m1-plus-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-python/tags/manage/
[armv7hf-bananapi-m1-plus-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-golang/
[armv7hf-bananapi-m1-plus-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-golang/tags/manage/
[armv7hf-bananapi-m1-plus-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-openjdk/
[armv7hf-bananapi-m1-plus-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-alpine-openjdk/tags/manage/
[armv7hf-bananapi-m1-plus-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/bananapi-m1-plus

[armv7hf-bananapi-m1-plus-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora/
[armv7hf-bananapi-m1-plus-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-buildpack-deps/
[armv7hf-bananapi-m1-plus-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-node/
[armv7hf-bananapi-m1-plus-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-node/tags/manage/
[armv7hf-bananapi-m1-plus-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-python/
[armv7hf-bananapi-m1-plus-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-python/tags/manage/
[armv7hf-bananapi-m1-plus-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-golang/
[armv7hf-bananapi-m1-plus-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-golang/tags/manage/
[armv7hf-bananapi-m1-plus-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-openjdk/
[armv7hf-bananapi-m1-plus-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-fedora-openjdk/tags/manage/
[armv7hf-bananapi-m1-plus-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/bananapi-m1-plus

[armv7hf-bananapi-m1-plus-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu/
[armv7hf-bananapi-m1-plus-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-buildpack-deps/
[armv7hf-bananapi-m1-plus-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-node/
[armv7hf-bananapi-m1-plus-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-node/tags/manage/
[armv7hf-bananapi-m1-plus-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-python/
[armv7hf-bananapi-m1-plus-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-python/tags/manage/
[armv7hf-bananapi-m1-plus-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/bananapi-m1-plus
[armv7hf-bananapi-m1-plus-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-golang/
[armv7hf-bananapi-m1-plus-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/bananapi-m1-plus-ubuntu-golang/tags/manage/
[armv7hf-bananapi-m1-plus-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/bananapi-m1-plus


[aarch64-generic-aarch64-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-debian/
[aarch64-generic-aarch64-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-buildpack-deps/
[aarch64-generic-aarch64-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-node/
[aarch64-generic-aarch64-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-node/tags/manage/
[aarch64-generic-aarch64-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-python/
[aarch64-generic-aarch64-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-python/tags/manage/
[aarch64-generic-aarch64-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-aarch64
[aarch64-generic-aarch64-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-aarch64
[aarch64-generic-aarch64-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-aarch64
[aarch64-generic-aarch64-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-aarch64
[aarch64-generic-aarch64-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-golang/
[aarch64-generic-aarch64-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-golang/tags/manage/
[aarch64-generic-aarch64-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-aarch64
[aarch64-generic-aarch64-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-openjdk/
[aarch64-generic-aarch64-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-openjdk/tags/manage/
[aarch64-generic-aarch64-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-aarch64

[aarch64-generic-aarch64-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine/
[aarch64-generic-aarch64-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-buildpack-deps/
[aarch64-generic-aarch64-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-node/
[aarch64-generic-aarch64-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-node/tags/manage/
[aarch64-generic-aarch64-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-python/
[aarch64-generic-aarch64-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-python/tags/manage/
[aarch64-generic-aarch64-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-aarch64
[aarch64-generic-aarch64-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-aarch64
[aarch64-generic-aarch64-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-aarch64
[aarch64-generic-aarch64-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-aarch64
[aarch64-generic-aarch64-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-golang/
[aarch64-generic-aarch64-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-golang/tags/manage/
[aarch64-generic-aarch64-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-aarch64
[aarch64-generic-aarch64-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-openjdk/
[aarch64-generic-aarch64-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-alpine-openjdk/tags/manage/
[aarch64-generic-aarch64-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-aarch64

[aarch64-generic-aarch64-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora/
[aarch64-generic-aarch64-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-buildpack-deps/
[aarch64-generic-aarch64-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-node/
[aarch64-generic-aarch64-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-node/tags/manage/
[aarch64-generic-aarch64-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-python/
[aarch64-generic-aarch64-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-python/tags/manage/
[aarch64-generic-aarch64-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-aarch64
[aarch64-generic-aarch64-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-aarch64
[aarch64-generic-aarch64-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-aarch64
[aarch64-generic-aarch64-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-aarch64
[aarch64-generic-aarch64-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-golang/
[aarch64-generic-aarch64-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-golang/tags/manage/
[aarch64-generic-aarch64-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-aarch64
[aarch64-generic-aarch64-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-openjdk/
[aarch64-generic-aarch64-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-fedora-openjdk/tags/manage/
[aarch64-generic-aarch64-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-aarch64

[aarch64-generic-aarch64-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu/
[aarch64-generic-aarch64-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-buildpack-deps/
[aarch64-generic-aarch64-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-node/
[aarch64-generic-aarch64-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-node/tags/manage/
[aarch64-generic-aarch64-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-python/
[aarch64-generic-aarch64-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-python/tags/manage/
[aarch64-generic-aarch64-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-aarch64
[aarch64-generic-aarch64-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-aarch64
[aarch64-generic-aarch64-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-aarch64
[aarch64-generic-aarch64-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-aarch64
[aarch64-generic-aarch64-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-golang/
[aarch64-generic-aarch64-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-aarch64-ubuntu-golang/tags/manage/
[aarch64-generic-aarch64-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-aarch64


[armv7hf-generic-armv7ahf-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-debian/
[armv7hf-generic-armv7ahf-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-buildpack-deps/
[armv7hf-generic-armv7ahf-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-node/
[armv7hf-generic-armv7ahf-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-node/tags/manage/
[armv7hf-generic-armv7ahf-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-python/
[armv7hf-generic-armv7ahf-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-python/tags/manage/
[armv7hf-generic-armv7ahf-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-armv7ahf
[armv7hf-generic-armv7ahf-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-armv7ahf
[armv7hf-generic-armv7ahf-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-armv7ahf
[armv7hf-generic-armv7ahf-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-armv7ahf
[armv7hf-generic-armv7ahf-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-golang/
[armv7hf-generic-armv7ahf-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-golang/tags/manage/
[armv7hf-generic-armv7ahf-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-armv7ahf
[armv7hf-generic-armv7ahf-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-openjdk/
[armv7hf-generic-armv7ahf-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-openjdk/tags/manage/
[armv7hf-generic-armv7ahf-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-armv7ahf

[armv7hf-generic-armv7ahf-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine/
[armv7hf-generic-armv7ahf-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-buildpack-deps/
[armv7hf-generic-armv7ahf-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-node/
[armv7hf-generic-armv7ahf-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-node/tags/manage/
[armv7hf-generic-armv7ahf-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-python/
[armv7hf-generic-armv7ahf-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-python/tags/manage/
[armv7hf-generic-armv7ahf-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-armv7ahf
[armv7hf-generic-armv7ahf-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-armv7ahf
[armv7hf-generic-armv7ahf-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-armv7ahf
[armv7hf-generic-armv7ahf-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-armv7ahf
[armv7hf-generic-armv7ahf-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-golang/
[armv7hf-generic-armv7ahf-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-golang/tags/manage/
[armv7hf-generic-armv7ahf-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-armv7ahf
[armv7hf-generic-armv7ahf-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-openjdk/
[armv7hf-generic-armv7ahf-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-alpine-openjdk/tags/manage/
[armv7hf-generic-armv7ahf-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-armv7ahf

[armv7hf-generic-armv7ahf-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora/
[armv7hf-generic-armv7ahf-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-buildpack-deps/
[armv7hf-generic-armv7ahf-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-node/
[armv7hf-generic-armv7ahf-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-node/tags/manage/
[armv7hf-generic-armv7ahf-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-python/
[armv7hf-generic-armv7ahf-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-python/tags/manage/
[armv7hf-generic-armv7ahf-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-armv7ahf
[armv7hf-generic-armv7ahf-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-armv7ahf
[armv7hf-generic-armv7ahf-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-armv7ahf
[armv7hf-generic-armv7ahf-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-armv7ahf
[armv7hf-generic-armv7ahf-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-golang/
[armv7hf-generic-armv7ahf-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-golang/tags/manage/
[armv7hf-generic-armv7ahf-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-armv7ahf
[armv7hf-generic-armv7ahf-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-openjdk/
[armv7hf-generic-armv7ahf-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-fedora-openjdk/tags/manage/
[armv7hf-generic-armv7ahf-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/generic-armv7ahf

[armv7hf-generic-armv7ahf-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu/
[armv7hf-generic-armv7ahf-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-buildpack-deps/
[armv7hf-generic-armv7ahf-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-node/
[armv7hf-generic-armv7ahf-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-node/tags/manage/
[armv7hf-generic-armv7ahf-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-python/
[armv7hf-generic-armv7ahf-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-python/tags/manage/
[armv7hf-generic-armv7ahf-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/generic-armv7ahf
[armv7hf-generic-armv7ahf-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/generic-armv7ahf
[armv7hf-generic-armv7ahf-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/generic-armv7ahf
[armv7hf-generic-armv7ahf-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/generic-armv7ahf
[armv7hf-generic-armv7ahf-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-golang/
[armv7hf-generic-armv7ahf-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/generic-armv7ahf-ubuntu-golang/tags/manage/
[armv7hf-generic-armv7ahf-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/generic-armv7ahf


[armv7hf-orangepi-plus2-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-debian/
[armv7hf-orangepi-plus2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-buildpack-deps/
[armv7hf-orangepi-plus2-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-node/
[armv7hf-orangepi-plus2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-node/tags/manage/
[armv7hf-orangepi-plus2-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-python/
[armv7hf-orangepi-plus2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-python/tags/manage/
[armv7hf-orangepi-plus2-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orangepi-plus2
[armv7hf-orangepi-plus2-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orangepi-plus2
[armv7hf-orangepi-plus2-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orangepi-plus2
[armv7hf-orangepi-plus2-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orangepi-plus2
[armv7hf-orangepi-plus2-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-golang/
[armv7hf-orangepi-plus2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-golang/tags/manage/
[armv7hf-orangepi-plus2-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orangepi-plus2
[armv7hf-orangepi-plus2-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-openjdk/
[armv7hf-orangepi-plus2-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-openjdk/tags/manage/
[armv7hf-orangepi-plus2-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orangepi-plus2

[armv7hf-orangepi-plus2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine/
[armv7hf-orangepi-plus2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-buildpack-deps/
[armv7hf-orangepi-plus2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-node/
[armv7hf-orangepi-plus2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-node/tags/manage/
[armv7hf-orangepi-plus2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-python/
[armv7hf-orangepi-plus2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-python/tags/manage/
[armv7hf-orangepi-plus2-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orangepi-plus2
[armv7hf-orangepi-plus2-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orangepi-plus2
[armv7hf-orangepi-plus2-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orangepi-plus2
[armv7hf-orangepi-plus2-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orangepi-plus2
[armv7hf-orangepi-plus2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-golang/
[armv7hf-orangepi-plus2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-golang/tags/manage/
[armv7hf-orangepi-plus2-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orangepi-plus2
[armv7hf-orangepi-plus2-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-openjdk/
[armv7hf-orangepi-plus2-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-alpine-openjdk/tags/manage/
[armv7hf-orangepi-plus2-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orangepi-plus2

[armv7hf-orangepi-plus2-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora/
[armv7hf-orangepi-plus2-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-buildpack-deps/
[armv7hf-orangepi-plus2-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-node/
[armv7hf-orangepi-plus2-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-node/tags/manage/
[armv7hf-orangepi-plus2-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-python/
[armv7hf-orangepi-plus2-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-python/tags/manage/
[armv7hf-orangepi-plus2-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orangepi-plus2
[armv7hf-orangepi-plus2-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orangepi-plus2
[armv7hf-orangepi-plus2-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orangepi-plus2
[armv7hf-orangepi-plus2-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orangepi-plus2
[armv7hf-orangepi-plus2-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-golang/
[armv7hf-orangepi-plus2-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-golang/tags/manage/
[armv7hf-orangepi-plus2-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orangepi-plus2
[armv7hf-orangepi-plus2-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-openjdk/
[armv7hf-orangepi-plus2-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-fedora-openjdk/tags/manage/
[armv7hf-orangepi-plus2-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orangepi-plus2

[armv7hf-orangepi-plus2-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu/
[armv7hf-orangepi-plus2-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-buildpack-deps/
[armv7hf-orangepi-plus2-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-node/
[armv7hf-orangepi-plus2-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-node/tags/manage/
[armv7hf-orangepi-plus2-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-python/
[armv7hf-orangepi-plus2-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-python/tags/manage/
[armv7hf-orangepi-plus2-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orangepi-plus2
[armv7hf-orangepi-plus2-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orangepi-plus2
[armv7hf-orangepi-plus2-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orangepi-plus2
[armv7hf-orangepi-plus2-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orangepi-plus2
[armv7hf-orangepi-plus2-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-golang/
[armv7hf-orangepi-plus2-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orangepi-plus2-ubuntu-golang/tags/manage/
[armv7hf-orangepi-plus2-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orangepi-plus2


[armv7hf-fincm3-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-debian/
[armv7hf-fincm3-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-buildpack-deps/
[armv7hf-fincm3-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-node/
[armv7hf-fincm3-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-node/tags/manage/
[armv7hf-fincm3-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-python/
[armv7hf-fincm3-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-python/tags/manage/
[armv7hf-fincm3-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/fincm3
[armv7hf-fincm3-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/fincm3
[armv7hf-fincm3-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/fincm3
[armv7hf-fincm3-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/fincm3
[armv7hf-fincm3-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-golang/
[armv7hf-fincm3-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-golang/tags/manage/
[armv7hf-fincm3-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/fincm3
[armv7hf-fincm3-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-openjdk/
[armv7hf-fincm3-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-openjdk/tags/manage/
[armv7hf-fincm3-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/fincm3

[armv7hf-fincm3-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine/
[armv7hf-fincm3-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-buildpack-deps/
[armv7hf-fincm3-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-node/
[armv7hf-fincm3-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-node/tags/manage/
[armv7hf-fincm3-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-python/
[armv7hf-fincm3-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-python/tags/manage/
[armv7hf-fincm3-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/fincm3
[armv7hf-fincm3-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/fincm3
[armv7hf-fincm3-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/fincm3
[armv7hf-fincm3-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/fincm3
[armv7hf-fincm3-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-golang/
[armv7hf-fincm3-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-golang/tags/manage/
[armv7hf-fincm3-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/fincm3
[armv7hf-fincm3-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-openjdk/
[armv7hf-fincm3-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-alpine-openjdk/tags/manage/
[armv7hf-fincm3-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/fincm3

[armv7hf-fincm3-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora/
[armv7hf-fincm3-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-buildpack-deps/
[armv7hf-fincm3-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-node/
[armv7hf-fincm3-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-node/tags/manage/
[armv7hf-fincm3-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-python/
[armv7hf-fincm3-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-python/tags/manage/
[armv7hf-fincm3-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/fincm3
[armv7hf-fincm3-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/fincm3
[armv7hf-fincm3-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/fincm3
[armv7hf-fincm3-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/fincm3
[armv7hf-fincm3-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-golang/
[armv7hf-fincm3-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-golang/tags/manage/
[armv7hf-fincm3-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/fincm3
[armv7hf-fincm3-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-openjdk/
[armv7hf-fincm3-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-fedora-openjdk/tags/manage/
[armv7hf-fincm3-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/fincm3

[armv7hf-fincm3-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu/
[armv7hf-fincm3-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-buildpack-deps/
[armv7hf-fincm3-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-node/
[armv7hf-fincm3-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-node/tags/manage/
[armv7hf-fincm3-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-python/
[armv7hf-fincm3-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-python/tags/manage/
[armv7hf-fincm3-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/fincm3
[armv7hf-fincm3-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/fincm3
[armv7hf-fincm3-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/fincm3
[armv7hf-fincm3-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/fincm3
[armv7hf-fincm3-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-golang/
[armv7hf-fincm3-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/fincm3-ubuntu-golang/tags/manage/
[armv7hf-fincm3-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/fincm3


[armv7hf-artik533s-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-debian/
[armv7hf-artik533s-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-buildpack-deps/
[armv7hf-artik533s-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-node/
[armv7hf-artik533s-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-node/tags/manage/
[armv7hf-artik533s-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-python/
[armv7hf-artik533s-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-python/tags/manage/
[armv7hf-artik533s-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik533s
[armv7hf-artik533s-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik533s
[armv7hf-artik533s-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik533s
[armv7hf-artik533s-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik533s
[armv7hf-artik533s-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-golang/
[armv7hf-artik533s-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-golang/tags/manage/
[armv7hf-artik533s-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik533s
[armv7hf-artik533s-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-openjdk/
[armv7hf-artik533s-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-openjdk/tags/manage/
[armv7hf-artik533s-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik533s

[armv7hf-artik533s-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine/
[armv7hf-artik533s-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-buildpack-deps/
[armv7hf-artik533s-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-node/
[armv7hf-artik533s-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-node/tags/manage/
[armv7hf-artik533s-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-python/
[armv7hf-artik533s-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-python/tags/manage/
[armv7hf-artik533s-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik533s
[armv7hf-artik533s-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik533s
[armv7hf-artik533s-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik533s
[armv7hf-artik533s-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik533s
[armv7hf-artik533s-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-golang/
[armv7hf-artik533s-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-golang/tags/manage/
[armv7hf-artik533s-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik533s
[armv7hf-artik533s-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-openjdk/
[armv7hf-artik533s-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-alpine-openjdk/tags/manage/
[armv7hf-artik533s-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik533s

[armv7hf-artik533s-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora/
[armv7hf-artik533s-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-buildpack-deps/
[armv7hf-artik533s-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-node/
[armv7hf-artik533s-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-node/tags/manage/
[armv7hf-artik533s-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-python/
[armv7hf-artik533s-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-python/tags/manage/
[armv7hf-artik533s-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik533s
[armv7hf-artik533s-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik533s
[armv7hf-artik533s-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik533s
[armv7hf-artik533s-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik533s
[armv7hf-artik533s-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-golang/
[armv7hf-artik533s-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-golang/tags/manage/
[armv7hf-artik533s-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik533s
[armv7hf-artik533s-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-openjdk/
[armv7hf-artik533s-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-fedora-openjdk/tags/manage/
[armv7hf-artik533s-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik533s

[armv7hf-artik533s-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu/
[armv7hf-artik533s-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-buildpack-deps/
[armv7hf-artik533s-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-node/
[armv7hf-artik533s-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-node/tags/manage/
[armv7hf-artik533s-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-python/
[armv7hf-artik533s-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-python/tags/manage/
[armv7hf-artik533s-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik533s
[armv7hf-artik533s-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik533s
[armv7hf-artik533s-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik533s
[armv7hf-artik533s-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik533s
[armv7hf-artik533s-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-golang/
[armv7hf-artik533s-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik533s-ubuntu-golang/tags/manage/
[armv7hf-artik533s-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik533s


[armv7hf-artik530-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-debian/
[armv7hf-artik530-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-buildpack-deps/
[armv7hf-artik530-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-node/
[armv7hf-artik530-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-node/tags/manage/
[armv7hf-artik530-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-python/
[armv7hf-artik530-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-python/tags/manage/
[armv7hf-artik530-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik530
[armv7hf-artik530-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik530
[armv7hf-artik530-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik530
[armv7hf-artik530-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik530
[armv7hf-artik530-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-golang/
[armv7hf-artik530-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-golang/tags/manage/
[armv7hf-artik530-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik530
[armv7hf-artik530-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-openjdk/
[armv7hf-artik530-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-openjdk/tags/manage/
[armv7hf-artik530-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik530

[armv7hf-artik530-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine/
[armv7hf-artik530-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-buildpack-deps/
[armv7hf-artik530-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-node/
[armv7hf-artik530-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-node/tags/manage/
[armv7hf-artik530-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-python/
[armv7hf-artik530-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-python/tags/manage/
[armv7hf-artik530-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik530
[armv7hf-artik530-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik530
[armv7hf-artik530-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik530
[armv7hf-artik530-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik530
[armv7hf-artik530-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-golang/
[armv7hf-artik530-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-golang/tags/manage/
[armv7hf-artik530-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik530
[armv7hf-artik530-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-openjdk/
[armv7hf-artik530-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-alpine-openjdk/tags/manage/
[armv7hf-artik530-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik530

[armv7hf-artik530-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora/
[armv7hf-artik530-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-buildpack-deps/
[armv7hf-artik530-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-node/
[armv7hf-artik530-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-node/tags/manage/
[armv7hf-artik530-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-python/
[armv7hf-artik530-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-python/tags/manage/
[armv7hf-artik530-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik530
[armv7hf-artik530-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik530
[armv7hf-artik530-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik530
[armv7hf-artik530-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik530
[armv7hf-artik530-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-golang/
[armv7hf-artik530-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-golang/tags/manage/
[armv7hf-artik530-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik530
[armv7hf-artik530-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-openjdk/
[armv7hf-artik530-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-fedora-openjdk/tags/manage/
[armv7hf-artik530-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/artik530

[armv7hf-artik530-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu/
[armv7hf-artik530-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-buildpack-deps/
[armv7hf-artik530-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-node/
[armv7hf-artik530-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-node/tags/manage/
[armv7hf-artik530-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-python/
[armv7hf-artik530-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-python/tags/manage/
[armv7hf-artik530-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/artik530
[armv7hf-artik530-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/artik530
[armv7hf-artik530-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/artik530
[armv7hf-artik530-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/artik530
[armv7hf-artik530-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-golang/
[armv7hf-artik530-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/artik530-ubuntu-golang/tags/manage/
[armv7hf-artik530-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/artik530


[aarch64-orbitty-tx2-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-debian/
[aarch64-orbitty-tx2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-buildpack-deps/
[aarch64-orbitty-tx2-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-node/
[aarch64-orbitty-tx2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-node/tags/manage/
[aarch64-orbitty-tx2-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-python/
[aarch64-orbitty-tx2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-python/tags/manage/
[aarch64-orbitty-tx2-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orbitty-tx2
[aarch64-orbitty-tx2-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orbitty-tx2
[aarch64-orbitty-tx2-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orbitty-tx2
[aarch64-orbitty-tx2-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orbitty-tx2
[aarch64-orbitty-tx2-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-golang/
[aarch64-orbitty-tx2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-golang/tags/manage/
[aarch64-orbitty-tx2-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orbitty-tx2
[aarch64-orbitty-tx2-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-openjdk/
[aarch64-orbitty-tx2-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-openjdk/tags/manage/
[aarch64-orbitty-tx2-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orbitty-tx2

[aarch64-orbitty-tx2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine/
[aarch64-orbitty-tx2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-buildpack-deps/
[aarch64-orbitty-tx2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-node/
[aarch64-orbitty-tx2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-node/tags/manage/
[aarch64-orbitty-tx2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-python/
[aarch64-orbitty-tx2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-python/tags/manage/
[aarch64-orbitty-tx2-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orbitty-tx2
[aarch64-orbitty-tx2-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orbitty-tx2
[aarch64-orbitty-tx2-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orbitty-tx2
[aarch64-orbitty-tx2-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orbitty-tx2
[aarch64-orbitty-tx2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-golang/
[aarch64-orbitty-tx2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-golang/tags/manage/
[aarch64-orbitty-tx2-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orbitty-tx2
[aarch64-orbitty-tx2-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-openjdk/
[aarch64-orbitty-tx2-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-alpine-openjdk/tags/manage/
[aarch64-orbitty-tx2-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orbitty-tx2

[aarch64-orbitty-tx2-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora/
[aarch64-orbitty-tx2-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-buildpack-deps/
[aarch64-orbitty-tx2-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-node/
[aarch64-orbitty-tx2-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-node/tags/manage/
[aarch64-orbitty-tx2-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-python/
[aarch64-orbitty-tx2-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-python/tags/manage/
[aarch64-orbitty-tx2-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orbitty-tx2
[aarch64-orbitty-tx2-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orbitty-tx2
[aarch64-orbitty-tx2-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orbitty-tx2
[aarch64-orbitty-tx2-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orbitty-tx2
[aarch64-orbitty-tx2-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-golang/
[aarch64-orbitty-tx2-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-golang/tags/manage/
[aarch64-orbitty-tx2-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orbitty-tx2
[aarch64-orbitty-tx2-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-openjdk/
[aarch64-orbitty-tx2-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-fedora-openjdk/tags/manage/
[aarch64-orbitty-tx2-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/orbitty-tx2

[aarch64-orbitty-tx2-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu/
[aarch64-orbitty-tx2-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-buildpack-deps/
[aarch64-orbitty-tx2-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-node/
[aarch64-orbitty-tx2-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-node/tags/manage/
[aarch64-orbitty-tx2-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-python/
[aarch64-orbitty-tx2-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-python/tags/manage/
[aarch64-orbitty-tx2-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/orbitty-tx2
[aarch64-orbitty-tx2-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/orbitty-tx2
[aarch64-orbitty-tx2-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/orbitty-tx2
[aarch64-orbitty-tx2-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/orbitty-tx2
[aarch64-orbitty-tx2-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-golang/
[aarch64-orbitty-tx2-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/orbitty-tx2-ubuntu-golang/tags/manage/
[aarch64-orbitty-tx2-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/orbitty-tx2


[aarch64-spacely-tx2-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-debian/
[aarch64-spacely-tx2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-buildpack-deps/
[aarch64-spacely-tx2-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-node/
[aarch64-spacely-tx2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-node/tags/manage/
[aarch64-spacely-tx2-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-python/
[aarch64-spacely-tx2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-python/tags/manage/
[aarch64-spacely-tx2-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/spacely-tx2
[aarch64-spacely-tx2-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/spacely-tx2
[aarch64-spacely-tx2-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/spacely-tx2
[aarch64-spacely-tx2-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/spacely-tx2
[aarch64-spacely-tx2-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-golang/
[aarch64-spacely-tx2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-golang/tags/manage/
[aarch64-spacely-tx2-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/spacely-tx2
[aarch64-spacely-tx2-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-openjdk/
[aarch64-spacely-tx2-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-openjdk/tags/manage/
[aarch64-spacely-tx2-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/spacely-tx2

[aarch64-spacely-tx2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine/
[aarch64-spacely-tx2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-buildpack-deps/
[aarch64-spacely-tx2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-node/
[aarch64-spacely-tx2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-node/tags/manage/
[aarch64-spacely-tx2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-python/
[aarch64-spacely-tx2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-python/tags/manage/
[aarch64-spacely-tx2-alpine-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/spacely-tx2
[aarch64-spacely-tx2-alpine-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/spacely-tx2
[aarch64-spacely-tx2-alpine-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/spacely-tx2
[aarch64-spacely-tx2-alpine-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/spacely-tx2
[aarch64-spacely-tx2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-golang/
[aarch64-spacely-tx2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-golang/tags/manage/
[aarch64-spacely-tx2-alpine-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/spacely-tx2
[aarch64-spacely-tx2-alpine-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-openjdk/
[aarch64-spacely-tx2-alpine-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-alpine-openjdk/tags/manage/
[aarch64-spacely-tx2-alpine-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/spacely-tx2

[aarch64-spacely-tx2-fedora-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora/
[aarch64-spacely-tx2-fedora-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-buildpack-deps/
[aarch64-spacely-tx2-fedora-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-node/
[aarch64-spacely-tx2-fedora-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-node/tags/manage/
[aarch64-spacely-tx2-fedora-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-python/
[aarch64-spacely-tx2-fedora-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-python/tags/manage/
[aarch64-spacely-tx2-fedora-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/spacely-tx2
[aarch64-spacely-tx2-fedora-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/spacely-tx2
[aarch64-spacely-tx2-fedora-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/spacely-tx2
[aarch64-spacely-tx2-fedora-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/spacely-tx2
[aarch64-spacely-tx2-fedora-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-golang/
[aarch64-spacely-tx2-fedora-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-golang/tags/manage/
[aarch64-spacely-tx2-fedora-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/spacely-tx2
[aarch64-spacely-tx2-fedora-openjdk-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-openjdk/
[aarch64-spacely-tx2-fedora-openjdk-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-fedora-openjdk/tags/manage/
[aarch64-spacely-tx2-fedora-openjdk-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/openjdk/spacely-tx2

[aarch64-spacely-tx2-ubuntu-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu/
[aarch64-spacely-tx2-ubuntu-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-buildpack-deps/
[aarch64-spacely-tx2-ubuntu-node-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-node/
[aarch64-spacely-tx2-ubuntu-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-node/tags/manage/
[aarch64-spacely-tx2-ubuntu-python-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-python/
[aarch64-spacely-tx2-ubuntu-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-python/tags/manage/
[aarch64-spacely-tx2-ubuntu-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/device-base/spacely-tx2
[aarch64-spacely-tx2-ubuntu-buildpack-deps-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/buildpack-deps/spacely-tx2
[aarch64-spacely-tx2-ubuntu-node-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/node/spacely-tx2
[aarch64-spacely-tx2-ubuntu-python-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/python/spacely-tx2
[aarch64-spacely-tx2-ubuntu-golang-dockerhub-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-golang/
[aarch64-spacely-tx2-ubuntu-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/{{ $names.company.short }}/spacely-tx2-ubuntu-golang/tags/manage/
[aarch64-spacely-tx2-ubuntu-golang-github-link]:{{ $links.githubMain }}-library/base-images/tree/master/golang/spacely-tx2
