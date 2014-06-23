# ![logo](img/logo.svg) Resin.io Architecture

The Resin.io platform consists of a number of components which fit together to
provide our overall service.

Our approach throughout is to create infrastructure based on the
[unix philosophy][unix_philosophy] - a number of high-quality services which
each do one thing well interacting together to form something which is more than
the sum of its parts.

We use open source tooling as much we can, taking advantage of the power of both
recent and well-established technologies like [docker][docker],
[pubnub][pubnub], [git][git] and [OpenVPN][openvpn].

We aim throughout to keep the user in as much control of their devices and data
as possible. We want to provide the opposite of a walled garden - to simply
empower you to do what you want to do without having infrastructure and
maintenance get in the way of your creativity.

## Server Infrastructure

* A database server which stores your application and device configurations and
  exposes them via an [OData][odata] API. This server incorporates a
  sophisticated rules engine which we plan to expose to users in the future.

* A [git][git] version control server which acts as a remote repository for
  storing your code. This is the public interface with which you interact when
  you want to get code onto your devices. It forms the gateway through which
  your code is passed through to the rest of the 'stack'.

* A cross-compilation server which creates a [docker][docker]
  [container][container] based on our base [image][image] then builds your code
  including any native dependencies within the container, before shipping it off
  to your device. A significant advantage of this approach is that we perform
  the compilation on a powerful server rather than forcing you to wait for the
  compilation to be done on the device itself, which is a huge win for
  low-powered devices.

* An SD card image generation server. This server generates the compressed file
  you place on the formatted SD card which expands to a distribution of linux
  running the resin supervisor application, automatically links it to your
  account and sends you the file as efficiently as possible.

* And of course, a web server which serves up the front end :)

## Device Infrastructure

* The image written to the device is a customised version of the
  [boot2docker][boot2docker] linux distribution which runs the resin supervisor
  on boot. We plan to use [yocto][yocto] very soon to take advantage of its
  excellent modular design and thus significantly expand our reach across
  devices.

* The resin supervisor controls the docker environment on the device, deploying
  new containers when provided by the cross-compilation server and uses
  [pubnub][pubnub] to very efficiently send logs back to the front end. It
  operates a local [OpenVPN][openvpn] network for secure communication between
  the device and our servers, and in future other devices on your local network.

[unix_philosophy]:http://en.wikipedia.org/wiki/Unix_philosophy
[odata]:http://en.wikipedia.org/wiki/Odata
[git]:http://git-scm.com/
[docker]:http://www.docker.com/
[image]:https://docs.docker.com/terms/image/
[container]:https://docs.docker.com/terms/container/
[boot2docker]:https://github.com/boot2docker/boot2docker
[pubnub]:http://www.pubnub.com/
[openvpn]:https://openvpn.net/
[yocto]:https://www.yoctoproject.org/
