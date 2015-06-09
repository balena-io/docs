# Resin Image Trees

This page describes the Resin image trees (hierarchy of images). The image tree provides a good instruction to how the images fit together to serve each device type supported by Resin.

__Note:__ In the tree diagram, from the bottom to the top, the lower level image is used as the base docker image to build the upper level one.

## ARMv6: Raspberry Pi 1 (version B, A+ and B+)

![ARMv6 Tree Diagram](/img/armv6-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | The base OS image for ARMv6 device (Raspberry Pi 1 - RPI1) | minbase, sudo | [dockerhub][rpi-dockerhub-link] | latest, jessie, wheezy |
| resin/raspberry-pi-systemd | The image with full systemd init system installed for ARMv6 | systemd | [dockerhub][rpi-systemd-dockerhub-link] | latest, jessie, wheezy | 
| resin/raspberry-pi-buildpack-deps | The buildpack-deps image for RPI1. Details about buildpack-deps can be found [here][resin-buildpack-deps-link] | Refer [here][resin-buildpack-deps-link] | [dockerhub][rpi-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberry-pi-node | The Node.js buildpack image for Node.js apps for RPI1. Details about the Node.js image can be found [here][resin-node-link] | Refer [here][resin-node-link] | [dockerhub][rpi-node-dockerhub-link] | For available image tags, refer [here][rpi-node-dockerhub-tag-link] |
| resin/raspberry-pi-python | The Python buildpack image for Python apps for RPI1 | python, python-pip, python-dev, python-dbus  | [dockerhub][rpi-python-dockerhub-link] | latest, jessie, wheezy |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

__Note:__ all the node slim images use resin/rpi-systemd as the base os.

## ARMv7: Raspberry Pi 2 and BeagleBone Black

![ARMv7 Tree Diagram](/img/armv7-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/armv7hf-debian| The base OS image for ARMv7 device (Raspberry Pi 2 - RPI2 and BeagleBone Black - BBB) | minbase, sudo | [dockerhub][armv7-dockerhub-link] | latest, jessie, wheezy, sid |
| resin/armv7hf-systemd | The image with full systemd init system installed for ARMv7 device | systemd | [dockerhub][armv7-systemd-dockerhub-link] | latest, jessie, wheezy, sid | 
| resin/beaglebone-black | The bare bones OS image for BBB. Apt sources.list from repositories: [http://repos.rcn-ee.net/debian/](armv7-bbb-sourceslist) and [http://debian.beagleboard.org](armv7-bbb-sourceslist1) added!  | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-bbb-dockerhub-link] | latest, jessie, wheezy, sid |
| resin/beaglebone-black-buildpack-deps | The buildpack-deps image for BBB. Details about buildpack-deps can be found [here][resin-buildpack-deps-link] | Refer [here][resin-buildpack-deps-link] | [dockerhub][armv7-bbb-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl, sid-scm, sid-curl |
| resin/beaglebone-black-node | The Node.js buildpack image for Node.js apps for BBB. Details about the Node.js image can be found [here][resin-node-link] | Refer [here][resin-node-link] | [dockerhub][armv7-bbb-node-dockerhub-link] | For available image tags, refer [here][armv7-bbb-node-dockerhub-tag-link] |
| resin/beaglebone-black-python | The Python buildpack image for Python apps for BBB | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-bbb-python-dockerhub-link] | latest, jessie, wheezy, sid |
| resin/raspberry-pi2 | The bare bones OS image for RPI2. Apt sources.list from raspbian repository: [http://archive.raspbian.org/raspbian/](armv7-rpi2-sourceslist) added! | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libraspberrypi-bin | [dockerhub][armv7-rpi2-dockerhub-link] | latest, jessie, wheezy, sid |
| resin/raspberry-pi2-buildpack-deps | The buildpack-deps image for RPI2. Details about buildpack-deps can be found [here][resin-buildpack-deps-link] | Refer [here][resin-buildpack-deps-link] | [dockerhub][armv7-rpi2-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl, sid-scm, sid-curl |
| resin/raspberry-pi2-node | The Node.js buildpack image for Node.js apps for RPI2. Details about the Node.js image can be found [here][resin-node-link] | Refer [here][resin-node-link] | [dockerhub][armv7-rpi2-node-dockerhub-link] | For available image tags, refer [here][armv7-rpi2-node-dockerhub-tag-link] |
| resin/raspberry-pi2-python | The Python buildpack image for Python apps for RPI2 | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-rpi2-python-dockerhub-link] | latest, jessie, wheezy, sid |

## i386: Intel Edison

![i386 Tree Diagram](/img/i386-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/i386-debian| The base OS image for i386 device (Intel Edison) | minbase, sudo | [dockerhub][i386-dockerhub-link] | latest, jessie, wheezy |
| resin/i386-systemd | The image with full systemd init system installed for i386 device | systemd | [dockerhub][i386-systemd-dockerhub-link] | latest, jessie, wheezy | 
| resin/intel-edison | The bare bones OS image for Intel Edison | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][i386-edison-dockerhub-link] | latest, jessie, wheezy |
| resin/intel-edison-buildpack-deps | The buildpack-deps image for Intel Edison. Details about buildpack-deps can be found [here][resin-buildpack-deps-link] | Refer [here][resin-buildpack-deps-link] | [dockerhub][i386-edison-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/intel-edison-node | The Node.js buildpack image for Node.js apps for Intel Edison. Details about the Node.js image can be found [here][resin-node-link] | Refer [here][resin-node-link] | [dockerhub][i386-edison-node-dockerhub-link] | For available image tags, refer [here][i386-edison-node-dockerhub-tag-link] |
| resin/intel-edison-python | The Python buildpack image for Python apps for Intel Edison | python, python-pip, python-dev, python-dbus  | [dockerhub][i386-edison-python-dockerhub-link] | latest, jessie, wheezy |

## Tips

* For those images with systemd init system installed, the systemd init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger systemd init system on the Docker image.
* `systemd was included in Debian wheezy as a technology preview. Please make sure that you are using Debian testing or newer to get a recent version of systemd.` from [Systemd Debian Wiki Page][systemd-wiki]. Therefore, we highly recommend that user should be careful when using systemd init system on wheezy images.


[resin-buildpack-deps-link]:/pages/configuration/resin-base-images.md#buildpack-deps
[resin-node-link]:/pages/configuration/resin-base-images.md#node
[systemd-wiki]:https://wiki.debian.org/systemd

[rpi-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-raspbian/
[rpi-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-buildpack-deps/
[rpi-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-node/
[rpi-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/rpi-node/tags/manage/
[rpi-systemd-dockerhub-link]:
[rpi-python-dockerhub-link]:

[armv7-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-debian/
[armv7-systemd-dockerhub-link]:
[armv7-bbb-dockerhub-link]:
[armv7-bbb-buildpack-deps-dockerhub-link]:
[armv7-bbb-node-dockerhub-link]:
[armv7-bbb-node-dockerhub-tag-link]:
[armv7-bbb-python-dockerhub-link]:
[armv7-bbb-sourceslist]:http://repos.rcn-ee.net/debian/
[armv7-bbb-sourceslist1]:http://debian.beagleboard.org/
[armv7-rpi2-dockerhub-link]:
[armv7-rpi2-buildpack-deps-dockerhub-link]:
[armv7-rpi2-node-dockerhub-link]:
[armv7-rpi2-node-dockerhub-tag-link]:
[armv7-rpi2-python-dockerhub-link]:
[armv7-rpi2-sourceslist]:http://archive.raspbian.org/raspbian/

[i386-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-debian/
[i386-systemd-dockerhub-link]:
[i386-edison-dockerhub-link]:
[i386-edison-buildpack-deps-dockerhub-link]:
[i386-edison-node-dockerhub-link]:
[i386-edison-node-dockerhub-tag-link]:
[i386-edison-python-dockerhub-link]:
