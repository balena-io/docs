# Dockerfile Templates

One of the goals of resin.io is code portability and ease of use, so you can
easily manage and deploy a whole fleet of different devices. This is why Docker containers
were such a natural choice. However, there are cases where dockerfiles fall short
and can't easily target multiple different device architectures.

To allow our builders to build containers for multiple architectures from one code repository,
we implemented simple dockerfile templates.

It is now possible to define a `Dockerfile.template` file that looks like this:
```
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
| RESIN_MACHINE_NAME    | This is the name of the yocto machine this board is base on. It is the name that you will see in most of the resin dockerhub base images.  This name helps us identify a specific [BSP](https://en.wikipedia.org/wiki/Board_support_package). |   

If you want to see an example in action, you can have a look at this [basic openssh example](https://github.com/shaunmulligan/resin-openssh).

Each of these build variables can evaluate to specific boards on our build servers, below is a non-exhaustive list some of these.

| Device Name | RESIN_ARCH | RESIN_MACHINE_NAME | Dockerhub | Notes |
|---|:---:|:---:|:---:|:---:|
|Raspberry Pi (A,B, A+, B+)| rpi | raspberrypi | [resin/rpi-rasbian](https://hub.docker.com/r/resin/rpi-raspbian/),  [resin/raspberrypi-python](https://hub.docker.com/r/resin/raspberrypi-python/), [resin/raspberrypi-node](https://hub.docker.com/r/resin/raspberrypi-node/) | There is **NO** `RESIN_ARCH` = armv6. For legacy reasons this is called `rpi` instead.|
|Raspberry Pi 2|armv7hf|raspberrypi2|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/raspberrypi2-debian](https://hub.docker.com/r/resin/raspberrypi2-debian/),  [resin/raspberrypi2-python](https://hub.docker.com/r/resin/raspberrypi2-python/), [resin/raspberrypi2-node](https://hub.docker.com/r/resin/raspberrypi2-node/)|It is also possible to push `rpi` architecture containers to the raspberry pi 2, so all the images from the entry above will also work on fleets of this type.|
|Beaglebone (Black or Green)|armv7hf|beaglebone|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/beaglebone-debian](https://hub.docker.com/r/resin/beaglebone-debian/), [resin/beaglebone-python](https://hub.docker.com/r/resin/beaglebone-python/), [resin/beaglebone-node](https://hub.docker.com/r/resin/beaglebone-node/)|The pure armv7hf-debian images don't have board specific firmware added into them. |
|Intel Edison|i386|edison|[resin/i386-debian](https://hub.docker.com/r/resin/i386-debian/), [resin/edison-debian](https://hub.docker.com/r/resin/edison-debian/), [resin/edison-python](https://hub.docker.com/r/resin/edison-python/), [resin/edison-node](https://hub.docker.com/r/resin/edison-node/)| All the `resin/edison-*` images have the [libmraa](https://github.com/intel-iot-devkit/mraa) installed.|
|Intel NUC|amd64|nuc|[resin/amd64-debian](https://hub.docker.com/r/resin/amd64-debian/), [resin/nuc-debian](https://hub.docker.com/r/resin/nuc-debian/), [resin/nuc-python](https://hub.docker.com/r/resin/nuc-python/), [resin/nuc-node](https://hub.docker.com/r/resin/nuc-node/)||
|Humming Board|armv7hf|cubox-i|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/cubox-i-debian](https://hub.docker.com/r/resin/cubox-i-debian/), [resin/cubox-i-python](https://hub.docker.com/r/resin/cubox-i-python/), [resin/cubox-i-node](https://hub.docker.com/r/resin/cubox-i-node/)||
|Parallela Board|armv7hf|parallella-hdmi-resin|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/parallella-hdmi-resin-debian](https://hub.docker.com/r/resin/parallella-hdmi-resin-debian/), [resin/parallella-hdmi-resin-python](https://hub.docker.com/r/resin/parallella-hdmi-resin-python/), [resin/parallella-hdmi-resin-node](https://hub.docker.com/r/resin/parallella-hdmi-resin-node/)|| |

<!-- |Odroid C1|armv7hf|odroid-c1||Will also work with C1+ boards|
|VIA VAB-820|armv7hf|vab820-quad|||
|Nitrogen 6X|armv7hf|nitrogen6x|||
|Odroid XU4/XU3|armv7hf|odroid-ux3|[resin/armv7hf-debian](https://hub.docker.com/r/resin/armv7hf-debian/), [resin/odroid-ux3-debian](https://hub.docker.com/r/resin/odroid-ux3-debian/), [resin/odroid-ux3-python](https://hub.docker.com/r/resin/odroid-ux3-python/), [resin/odroid-ux3-node](https://hub.docker.com/r/resin/odroid-ux3-node/)|**Important!**, the machine name is non-intuitive in this case.| -->


[x86-link]:https://en.wikipedia.org/wiki/X86
[ARM-link]:https://en.wikipedia.org/wiki/ARM_architecture
