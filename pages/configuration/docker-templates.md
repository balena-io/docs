# Dockerfile Templates

One of the goals of resin.io is code portability and ease of use, so you can
easily manage and deploy a whole fleet of different devices. This is why Docker containers
were such a natural choice. However, there are cases where Dockerfiles fall short
and can't easily target multiple different device architectures.

To allow our builders to build containers for multiple architectures from one repo,
we implemented simple dockerfile templates.

It is now possible to define a `Dockerfile.template` file that looks like this:
```
FROM resin/%%RESIN_DEVICE_TYPE%%-node

COPY package.json /package.json
RUN npm install

COPY src/ /usr/src/app
CMD ["node", "/usr/src/app/main.js"]
```
This template will build and deploy a node.js project for any of the devices supported by resin.io, regardless of whether the device architecture is [ARM][ARM-link] or [x86][x86-link].
In this example you can see the build variable `%%RESIN_DEVICE_TYPE%%` this will be replaced by the device-type name (i.e.: raspberry-pi) at build time.

 The device-type is inferred from what "device type" application you are pushing to. So if the resin remote you are pushing to is associated to an Intel Edison application, the device type will be intel-edison and an `i386` base image will be built.

__Note:__ One caveat to this is that you need to ensure that your dependencies and node.js modules are also multi-architecture, otherwise you will have a bad time.

Currently our builder supports the following build variables.

| Name        | Description          | Notes  |
| ------------- |:-------------:| -----:|
| RESIN_ARCH    | Device architecture, example values "armv7hf", "x86", "amd64".| This value depends on the target device type. |
| RESIN_DEVICE_TYPE    | Device type in a slug format, example values "raspberry-pi", "beaglebone-black".     |   This is the format we use for device types across our projects.|


[x86-link]:https://en.wikipedia.org/wiki/X86
[ARM-link]:https://en.wikipedia.org/wiki/ARM_architecture
