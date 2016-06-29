# Resin Images Wiki

This page contains all the information about the images maintained on the Resin.io docker hub registry.

## <a name="image-tree"></a>Resin Image Trees

This section describes the Resin image trees (hierarchy of images). These image trees provide an overview of how all the resin base images fit together for each device type supported by Resin.

Repository for all images: refer [here][base-repository]. Subscribe to changes [here][base-images-changelog].

__Note:__ In the tree diagram, from the bottom to the top, the lower level image is used as the base docker image to build the upper level one.

### ARMv6: Raspberry Pi 1 (v1 or Zero)

![ARMv6 Tree Diagram](/img/armv6-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | The base OS image for ARMv6 devices (Raspberry Pi 1 - RPI1) | minbase, sudo | [dockerhub][rpi-dockerhub-link], [github][rpi-github-link] | latest, jessie, wheezy |
| resin/raspberrypi-systemd | The image with full systemd init system installed for ARMv6 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][rpi-systemd-dockerhub-link], [github][rpi-systemd-github-link] | latest, jessie, wheezy |
| resin/raspberrypi-buildpack-deps | The buildpack-deps image for RPI1. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][rpi-buildpack-deps-dockerhub-link], [github][rpi-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi-node | The Node.js buildpack image for Node.js apps for RPI1. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][rpi-node-dockerhub-link], [github][rpi-node-github-link] | For available image tags, refer [here][rpi-node-dockerhub-tag-link] |
| resin/raspberrypi-python | The Python buildpack image for Python apps for RPI1 | Refer [here](#python) | [dockerhub][rpi-python-dockerhub-link], [github][rpi-python-github-link] | For available image tags, refer [here][rpi-python-dockerhub-tag-link] |
| resin/raspberrypi-golang | The Go buildpack image for Go apps for RPI1. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][rpi-golang-dockerhub-link], [github][rpi-golang-github-link] | For available image tags, refer [here][rpi-golang-dockerhub-tag-link] |
| resin/raspberrypi-alpine | The bare bones Alpine OS image for RPI1. See our [tips](#tips) section on how to enable openrc in your image. | less, nano, net-tools, ifupdown, usbutils, gnupg | [dockerhub][rpi-alpine-dockerhub-link], [github][rpi-alpine-github-link] | latest, 3.3, 3.2 and edge |
| resin/raspberrypi-alpine-buildpack-deps | The buildpack-deps image based on Alpine Linux for RPI1. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][rpi-alpine-buildpack-deps-dockerhub-link], [github][rpi-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/raspberrypi-alpine-node | The Node.js buildpack image based on Alpine Linux for Node.js apps for RPI1. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][rpi-alpine-node-dockerhub-link], [github][rpi-alpine-node-github-link] | For available image tags, refer [here][rpi-alpine-node-dockerhub-tag-link] |
| resin/raspberrypi-alpine-python | The Python buildpack image based on Alpine Linux for Python apps for RPI1 | Refer [here](#python) | [dockerhub][rpi-alpine-python-dockerhub-link], [github][rpi-alpine-python-github-link] | For available image tags, refer [here][rpi-alpine-python-dockerhub-tag-link] |
| resin/raspberrypi-alpine-golang | The Go buildpack image based on Alpine Linux for Go apps for RPI1. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][rpi-alpine-golang-dockerhub-link], [github][rpi-alpine-golang-github-link] | For available image tags, refer [here][rpi-alpine-golang-dockerhub-tag-link] |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

__Note:__ all the node slim images use resin/raspberrypi-systemd as the base os.

### ARMv7

![ARMv7 Tree Diagram](/img/armv7-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag |
|:-----------|:------------|:------------|:------------|:------------|
| resin/armv7hf-debian | The base OS image based on Debian for ARMv7 devices | minbase, sudo | [dockerhub][armv7hf-dockerhub-link], [github][armv7hf-github-link] | latest, jessie, wheezy, sid |
| resin/armv7hf-systemd | The image with full systemd init system installed for ARMv7 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][armv7-systemd-dockerhub-link], [github][armv7-systemd-github-link] | latest, jessie, wheezy, sid |
| resin/`device-name`-debian | The bare bones debian OS image for a supported device. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, ifupdown | | latest, jessie, wheezy |
| resin/`device-name`-buildpack-deps | The buildpack-deps image for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/`device-name`-node | The Node.js buildpack image for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | | |
| resin/`device-name`-python | The Python buildpack image for Python apps for a supported device | Refer [here](#python) | | |
| resin/`device-name`-golang | The Go buildpack image for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | | |
| resin/armhf-alpine| The base OS image based on Alpine Linux for ARMv7 devices | bash, udev, dbus, tar, ca-certificates, openrc | [dockerhub][armhf-alpine-dockerhub-link], [github][armhf-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/`device-name`-alpine | The bare bones Alpine OS image for a supported device. See our [tips](#tips) section on how to enable openrc in your image. | less, nano, net-tools, ifupdown, usbutils, gnupg | | latest, 3.3, 3.2 and edge |
| resin/`device-name`-alpine-buildpack-deps | The buildpack-deps image based on Alpine Linux for a supported device. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/`device-name`-alpine-node | The Node.js buildpack image based on Alpine Linux for Node.js apps for a supported device. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | | |
| resin/`device-name`-alpine-python | The Python buildpack image based on Alpine Linux for Python apps for a supported device | Refer [here](#python) | | |
| resin/`device-name`-alpine-golang | The Go buildpack image based on Alpine Linux for Go apps for a supported device. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | | |

![ARMv7 Device Diagram](/img/armv7-devices.jpg "ARMv7 Device Diagram")

##### Beaglebone
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/beaglebone-debian | [dockerhub][armv7-bbb-dockerhub-link], [github][armv7-bbb-github-link] | latest, jessie, wheezy |
| resin/beaglebone-buildpack-deps | [dockerhub][armv7-bbb-buildpack-deps-dockerhub-link], [github][armv7-bbb-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/beaglebone-node | [dockerhub][armv7-bbb-node-dockerhub-link], [github][armv7-bbb-node-github-link] | For available image tags, refer [here][armv7-bbb-node-dockerhub-tag-link] |
| resin/beaglebone-python | [dockerhub][armv7-bbb-python-dockerhub-link], [github][armv7-bbb-python-github-link] | For available image tags, refer [here][armv7-bbb-python-dockerhub-tag-link] |
| resin/beaglebone-golang | [dockerhub][armv7-bbb-golang-dockerhub-link], [github][armv7-bbb-golang-github-link] | For available image tags, refer [here][armv7-bbb-golang-dockerhub-tag-link] |
| resin/beaglebone-alpine | [dockerhub][armv7-bbb-alpine-dockerhub-link], [github][armv7-bbb-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/beaglebone-alpine-buildpack-deps | [dockerhub][armv7-bbb-alpine-buildpack-deps-dockerhub-link], [github][armv7-bbb-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/beaglebone-alpine-node | [dockerhub][armv7-bbb-alpine-node-dockerhub-link], [github][armv7-bbb-alpine-node-github-link] | For available image tags, refer [here][armv7-bbb-alpine-node-dockerhub-tag-link] |
| resin/beaglebone-alpine-python | [dockerhub][armv7-bbb-alpine-python-dockerhub-link], [github][armv7-bbb-alpine-python-github-link] | For available image tags, refer [here][armv7-bbb-alpine-python-dockerhub-tag-link] |
| resin/beaglebone-alpine-golang | [dockerhub][armv7-bbb-alpine-golang-dockerhub-link], [github][armv7-bbb-alpine-golang-github-link] | For available image tags, refer [here][armv7-bbb-alpine-golang-dockerhub-tag-link] |

##### Raspberry Pi 2
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/raspberrypi2-debian | [dockerhub][armv7-rpi2-dockerhub-link], [github][armv7-rpi2-github-link] | latest, jessie, wheezy |
| resin/raspberrypi2-buildpack-deps | [dockerhub][armv7-rpi2-buildpack-deps-dockerhub-link], [github][armv7-rpi2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi2-node | [dockerhub][armv7-rpi2-node-dockerhub-link], [github][armv7-rpi2-node-github-link] | For available image tags, refer [here][armv7-rpi2-node-dockerhub-tag-link] |
| resin/raspberrypi2-python | [dockerhub][armv7-rpi2-python-dockerhub-link], [github][armv7-rpi2-python-github-link] | For available image tags, refer [here][armv7-rpi2-python-dockerhub-tag-link] |
| resin/raspberrypi2-golang | [dockerhub][armv7-rpi2-golang-dockerhub-link], [github][armv7-rpi2-golang-github-link] | For available image tags, refer [here][armv7-rpi2-golang-dockerhub-tag-link] |
| resin/raspberrypi2-alpine | [dockerhub][armv7-rpi2-alpine-dockerhub-link], [github][armv7-rpi2-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/raspberrypi2-alpine-buildpack-deps | [dockerhub][armv7-rpi2-alpine-buildpack-deps-dockerhub-link], [github][armv7-rpi2-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/raspberrypi2-alpine-node | [dockerhub][armv7-rpi2-alpine-node-dockerhub-link], [github][armv7-rpi2-alpine-node-github-link] | For available image tags, refer [here][armv7-rpi2-alpine-node-dockerhub-tag-link] |
| resin/raspberrypi2-alpine-python | [dockerhub][armv7-rpi2-alpine-python-dockerhub-link], [github][armv7-rpi2-alpine-python-github-link] | For available image tags, refer [here][armv7-rpi2-alpine-python-dockerhub-tag-link] |
| resin/raspberrypi2-alpine-golang | [dockerhub][armv7-rpi2-alpine-golang-dockerhub-link], [github][armv7-rpi2-alpine-golang-github-link] | For available image tags, refer [here][armv7-rpi2-alpine-golang-dockerhub-tag-link] |

##### Raspberry Pi 3
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/raspberrypi3-debian | [dockerhub][armv7-rpi3-dockerhub-link], [github][armv7-rpi3-github-link] | latest, jessie, wheezy |
| resin/raspberrypi3-buildpack-deps | [dockerhub][armv7-rpi3-buildpack-deps-dockerhub-link], [github][armv7-rpi3-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi3-node | [dockerhub][armv7-rpi3-node-dockerhub-link], [github][armv7-rpi3-node-github-link] | For available image tags, refer [here][armv7-rpi3-node-dockerhub-tag-link] |
| resin/raspberrypi3-python | [dockerhub][armv7-rpi3-python-dockerhub-link], [github][armv7-rpi3-python-github-link] | For available image tags, refer [here][armv7-rpi3-python-dockerhub-tag-link] |
| resin/raspberrypi3-golang | [dockerhub][armv7-rpi3-golang-dockerhub-link], [github][armv7-rpi3-golang-github-link] | For available image tags, refer [here][armv7-rpi3-golang-dockerhub-tag-link] |
| resin/raspberrypi3-alpine | [dockerhub][armv7-rpi3-alpine-dockerhub-link], [github][armv7-rpi3-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/raspberrypi3-alpine-buildpack-deps | [dockerhub][armv7-rpi3-alpine-buildpack-deps-dockerhub-link], [github][armv7-rpi3-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/raspberrypi3-alpine-node | [dockerhub][armv7-rpi3-alpine-node-dockerhub-link], [github][armv7-rpi3-alpine-node-github-link] | For available image tags, refer [here][armv7-rpi3-alpine-node-dockerhub-tag-link] |
| resin/raspberrypi3-alpine-python | [dockerhub][armv7-rpi3-alpine-python-dockerhub-link], [github][armv7-rpi3-alpine-python-github-link] | For available image tags, refer [here][armv7-rpi3-alpine-python-dockerhub-tag-link] |
| resin/raspberrypi3-alpine-golang | [dockerhub][armv7-rpi3-alpine-golang-dockerhub-link], [github][armv7-rpi3-alpine-golang-github-link] | For available image tags, refer [here][armv7-rpi3-alpine-golang-dockerhub-tag-link] |

##### ZYNQ ZC702
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/zc702-zynq7-debian | [dockerhub][armv7-zc702-zynq7-dockerhub-link], [github][armv7-zc702-zynq7-github-link] | latest, jessie, wheezy |
| resin/zc702-zynq7-buildpack-deps | [dockerhub][armv7-zc702-zynq7-buildpack-deps-dockerhub-link], [github][armv7-zc702-zynq7-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/zc702-zynq7-node | [dockerhub][armv7-zc702-zynq7-node-dockerhub-link], [github][armv7-zc702-zynq7-node-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-node-dockerhub-tag-link] |
| resin/zc702-zynq7-python | [dockerhub][armv7-zc702-zynq7-python-dockerhub-link], [github][armv7-zc702-zynq7-python-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-python-dockerhub-tag-link] |
| resin/zc702-zynq7-golang | [dockerhub][armv7-zc702-zynq7-golang-dockerhub-link], [github][armv7-zc702-zynq7-golang-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-golang-dockerhub-tag-link] |
| resin/zc702-zynq7-alpine | [dockerhub][armv7-zc702-zynq7-alpine-dockerhub-link], [github][armv7-zc702-zynq7-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/zc702-zynq7-alpine-buildpack-deps | [dockerhub][armv7-zc702-zynq7-alpine-buildpack-deps-dockerhub-link], [github][armv7-zc702-zynq7-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/zc702-zynq7-alpine-node | [dockerhub][armv7-zc702-zynq7-alpine-node-dockerhub-link], [github][armv7-zc702-zynq7-alpine-node-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-alpine-node-dockerhub-tag-link] |
| resin/zc702-zynq7-alpine-python | [dockerhub][armv7-zc702-zynq7-alpine-python-dockerhub-link], [github][armv7-zc702-zynq7-alpine-python-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-alpine-python-dockerhub-tag-link] |
| resin/zc702-zynq7-alpine-golang | [dockerhub][armv7-zc702-zynq7-alpine-golang-dockerhub-link], [github][armv7-zc702-zynq7-alpine-golang-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-alpine-golang-dockerhub-tag-link] |

##### VIA VAB 820-quad
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/vab820-quad-debian | [dockerhub][armv7-vab820-quad-dockerhub-link], [github][armv7-vab820-quad-github-link] | latest, jessie, wheezy |
| resin/vab820-quad-buildpack-deps | [dockerhub][armv7-vab820-quad-buildpack-deps-dockerhub-link], [github][armv7-vab820-quad-buildpack-deps-github-link]  | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/vab820-quad-node | [dockerhub][armv7-vab820-quad-node-dockerhub-link], [github][armv7-vab820-quad-node-github-link]  | For available image tags, refer [here][armv7-vab820-quad-node-dockerhub-tag-link] |
| resin/vab820-quad-python | [dockerhub][armv7-vab820-quad-python-dockerhub-link], [github][armv7-vab820-quad-python-github-link]  | For available image tags, refer [here][armv7-vab820-quad-python-dockerhub-tag-link] |
| resin/vab820-quad-golang | [dockerhub][armv7-vab820-quad-golang-dockerhub-link], [github][armv7-vab820-quad-golang-github-link] | For available image tags, refer [here][armv7-vab820-quad-golang-dockerhub-tag-link] |
| resin/vab820-quad-alpine | [dockerhub][armv7-vab820-quad-alpine-dockerhub-link], [github][armv7-vab820-quad-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/vab820-quad-alpine-buildpack-deps | [dockerhub][armv7-vab820-quad-alpine-buildpack-deps-dockerhub-link], [github][armv7-vab820-quad-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/vab820-quad-alpine-node | [dockerhub][armv7-vab820-quad-alpine-node-dockerhub-link], [github][armv7-vab820-quad-alpine-node-github-link] | For available image tags, refer [here][armv7-vab820-quad-alpine-node-dockerhub-tag-link] |
| resin/vab820-quad-alpine-python | [dockerhub][armv7-vab820-quad-alpine-python-dockerhub-link], [github][armv7-vab820-quad-alpine-python-github-link] | For available image tags, refer [here][armv7-vab820-quad-alpine-python-dockerhub-tag-link] |
| resin/vab820-quad-alpine-golang | [dockerhub][armv7-vab820-quad-alpine-golang-dockerhub-link], [github][armv7-vab820-quad-alpine-golang-github-link] | For available image tags, refer [here][armv7-vab820-quad-alpine-golang-dockerhub-tag-link] |

##### ODROID-XU4
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/odroid-ux3-debian | [dockerhub][armv7-odroid-ux3-dockerhub-link], [github][armv7-odroid-ux3-github-link]  | latest, jessie, wheezy |
| resin/odroid-ux3-buildpack-deps | [dockerhub][armv7-odroid-ux3-buildpack-deps-dockerhub-link], [github][armv7-odroid-ux3-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-ux3-node | [dockerhub][armv7-odroid-ux3-node-dockerhub-link], [github][armv7-odroid-ux3-node-github-link] | For available image tags, refer [here][armv7-odroid-ux3-node-dockerhub-tag-link] |
| resin/odroid-ux3-python | [dockerhub][armv7-odroid-ux3-python-dockerhub-link], [github][armv7-odroid-ux3-python-github-link] | For available image tags, refer [here][armv7-odroid-ux3-python-dockerhub-tag-link] |
| resin/odroid-ux3-golang | [dockerhub][armv7-odroid-ux3-golang-dockerhub-link], [github][armv7-odroid-ux3-golang-github-link] | For available image tags, refer [here][armv7-odroid-ux3-golang-dockerhub-tag-link] |
| resin/odroid-ux3-alpine | [dockerhub][armv7-odroid-c1-alpine-dockerhub-link], [github][armv7-odroid-c1-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/odroid-ux3-alpine-buildpack-deps | [dockerhub][armv7-odroid-c1-alpine-buildpack-deps-dockerhub-link], [github][armv7-odroid-c1-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/odroid-ux3-alpine-node | [dockerhub][armv7-odroid-c1-alpine-node-dockerhub-link], [github][armv7-odroid-c1-alpine-node-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-node-dockerhub-tag-link] |
| resin/odroid-ux3-alpine-python | [dockerhub][armv7-odroid-c1-alpine-python-dockerhub-link], [github][armv7-odroid-c1-alpine-python-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-python-dockerhub-tag-link] |
| resin/odroid-ux3-alpine-golang | [dockerhub][armv7-odroid-c1-alpine-golang-dockerhub-link], [github][armv7-odroid-c1-alpine-golang-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-golang-dockerhub-tag-link] |

##### ODROID-C1+
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/odroid-c1-debian | [dockerhub][armv7-odroid-c1-dockerhub-link], [github][armv7-odroid-c1-github-link] | latest, jessie, wheezy |
| resin/odroid-c1-buildpack-deps | [dockerhub][armv7-odroid-c1-buildpack-deps-dockerhub-link], [github][armv7-odroid-c1-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-c1-node | [dockerhub][armv7-odroid-c1-node-dockerhub-link], [github][armv7-odroid-c1-node-github-link] | For available image tags, refer [here][armv7-odroid-c1-node-dockerhub-tag-link] |
| resin/odroid-c1-python | [dockerhub][armv7-odroid-c1-python-dockerhub-link], [github][armv7-odroid-c1-python-github-link] | For available image tags, refer [here][armv7-odroid-c1-python-dockerhub-tag-link] |
| resin/odroid-c1-golang | [dockerhub][armv7-odroid-c1-golang-dockerhub-link], [github][armv7-odroid-c1-golang-github-link] | For available image tags, refer [here][armv7-odroid-c1-golang-dockerhub-tag-link] |
| resin/odroid-c1-alpine | [dockerhub][armv7-odroid-c1-alpine-dockerhub-link], [github][armv7-odroid-c1-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/odroid-c1-alpine-buildpack-deps | [dockerhub][armv7-odroid-c1-alpine-buildpack-deps-dockerhub-link], [github][armv7-odroid-c1-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/odroid-c1-alpine-node | [dockerhub][armv7-odroid-c1-alpine-node-dockerhub-link], [github][armv7-odroid-c1-alpine-node-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-node-dockerhub-tag-link] |
| resin/odroid-c1-alpine-python | [dockerhub][armv7-odroid-c1-alpine-python-dockerhub-link], [github][armv7-odroid-c1-alpine-python-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-python-dockerhub-tag-link] |
| resin/odroid-c1-alpine-golang | [dockerhub][armv7-odroid-c1-alpine-golang-dockerhub-link], [github][armv7-odroid-c1-alpine-golang-github-link] | For available image tags, refer [here][armv7-odroid-c1-alpine-golang-dockerhub-tag-link] |

##### Hummingboard
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/cubox-i-debian | [dockerhub][armv7-cubox-i-dockerhub-link], [github][armv7-cubox-i-github-link] | latest, jessie, wheezy |
| resin/cubox-i-buildpack-deps | [dockerhub][armv7-cubox-i-buildpack-deps-dockerhub-link], [github][armv7-cubox-i-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/cubox-i-node | [dockerhub][armv7-cubox-i-node-dockerhub-link], [github][armv7-cubox-i-node-github-link] | For available image tags, refer [here][armv7-cubox-i-node-dockerhub-tag-link] |
| resin/cubox-i-python | [dockerhub][armv7-cubox-i-python-dockerhub-link], [github][armv7-cubox-i-python-github-link] | For available image tags, refer [here][armv7-cubox-i-python-dockerhub-tag-link] |
| resin/cubox-i-golang | [dockerhub][armv7-cubox-i-golang-dockerhub-link], [github][armv7-cubox-i-golang-github-link] | For available image tags, refer [here][armv7-cubox-i-golang-dockerhub-tag-link] |
| resin/cubox-i-alpine | [dockerhub][armv7-cubox-i-alpine-dockerhub-link], [github][armv7-cubox-i-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/cubox-i-alpine-buildpack-deps | [dockerhub][armv7-cubox-i-alpine-buildpack-deps-dockerhub-link], [github][armv7-cubox-i-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/cubox-i-alpine-node | [dockerhub][armv7-cubox-i-alpine-node-dockerhub-link], [github][armv7-cubox-i-alpine-node-github-link] | For available image tags, refer [here][armv7-cubox-i-alpine-node-dockerhub-tag-link] |
| resin/cubox-i-alpine-python | [dockerhub][armv7-cubox-i-alpine-python-dockerhub-link], [github][armv7-cubox-i-alpine-python-github-link] | For available image tags, refer [here][armv7-cubox-i-alpine-python-dockerhub-tag-link] |
| resin/cubox-i-alpine-golang | [dockerhub][armv7-cubox-i-alpine-golang-dockerhub-link], [github][armv7-cubox-i-alpine-golang-github-link] | For available image tags, refer [here][armv7-cubox-i-alpine-golang-dockerhub-tag-link] |


##### Nitrogen 6X
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/nitrogen6x-debian | [dockerhub][armv7-nitrogen6x-dockerhub-link], [github][armv7-nitrogen6x-github-link] | latest, jessie, wheezy |
| resin/nitrogen6x-buildpack-deps | [dockerhub][armv7-nitrogen6x-buildpack-deps-dockerhub-link], [github][armv7-nitrogen6x-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nitrogen6x-node | [dockerhub][armv7-nitrogen6x-node-dockerhub-link], [github][armv7-nitrogen6x-node-github-link] | For available image tags, refer [here][armv7-nitrogen6x-node-dockerhub-tag-link] |
| resin/nitrogen6x-python | [dockerhub][armv7-nitrogen6x-python-dockerhub-link], [github][armv7-nitrogen6x-python-github-link] | For available image tags, refer [here][armv7-nitrogen6x-python-dockerhub-tag-link] |
| resin/nitrogen6x-golang | [dockerhub][armv7-nitrogen6x-golang-dockerhub-link], [github][armv7-nitrogen6x-golang-github-link] | For available image tags, refer [here][armv7-nitrogen6x-golang-dockerhub-tag-link] |
| resin/nitrogen6x-alpine | [dockerhub][armv7-nitrogen6x-alpine-dockerhub-link], [github][armv7-nitrogen6x-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/nitrogen6x-alpine-buildpack-deps | [dockerhub][armv7-nitrogen6x-alpine-buildpack-deps-dockerhub-link], [github][armv7-nitrogen6x-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/nitrogen6x-alpine-node | [dockerhub][armv7-nitrogen6x-alpine-node-dockerhub-link], [github][armv7-nitrogen6x-alpine-node-github-link] | For available image tags, refer [here][armv7-nitrogen6x-alpine-node-dockerhub-tag-link] |
| resin/nitrogen6x-alpine-python | [dockerhub][armv7-nitrogen6x-alpine-python-dockerhub-link], [github][armv7-nitrogen6x-alpine-python-github-link] | For available image tags, refer [here][armv7-nitrogen6x-alpine-python-dockerhub-tag-link] |
| resin/nitrogen6x-alpine-golang | [dockerhub][armv7-nitrogen6x-alpine-golang-dockerhub-link], [github][armv7-nitrogen6x-alpine-golang-github-link] | For available image tags, refer [here][armv7-nitrogen6x-alpine-golang-dockerhub-tag-link] |

##### Parallella
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/parallella-hdmi-resin-debian | [dockerhub][armv7-parallella-hdmi-resin-dockerhub-link], [github][armv7-parallella-hdmi-resin-github-link] | latest, jessie, wheezy |
| resin/parallella-hdmi-resin-buildpack-deps | [dockerhub][armv7-parallella-hdmi-resin-buildpack-deps-dockerhub-link], [github][armv7-parallella-hdmi-resin-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/parallella-hdmi-resin-node | [dockerhub][armv7-parallella-hdmi-resin-node-dockerhub-link], [github][armv7-parallella-hdmi-resin-node-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-node-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-python | [dockerhub][armv7-parallella-hdmi-resin-python-dockerhub-link], [github][armv7-parallella-hdmi-resin-python-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-python-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-golang | [dockerhub][armv7-parallella-hdmi-resin-golang-dockerhub-link], [github][armv7-parallella-hdmi-resin-golang-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-golang-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-alpine | [dockerhub][armv7-parallella-hdmi-resin-alpine-dockerhub-link], [github][armv7-parallella-hdmi-resin-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/parallella-hdmi-resin-alpine-buildpack-deps | [dockerhub][armv7-parallella-hdmi-resin-alpine-buildpack-deps-dockerhub-link], [github][armv7-parallella-hdmi-resin-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/parallella-hdmi-resin-alpine-node | [dockerhub][armv7-parallella-hdmi-resin-alpine-node-dockerhub-link], [github][armv7-parallella-hdmi-resin-alpine-node-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-alpine-node-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-alpine-python | [dockerhub][armv7-parallella-hdmi-resin-alpine-python-dockerhub-link], [github][armv7-parallella-hdmi-resin-alpine-python-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-alpine-python-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-alpine-golang | [dockerhub][armv7-parallella-hdmi-resin-alpine-golang-dockerhub-link], [github][armv7-parallella-hdmi-resin-alpine-golang-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-alpine-golang-dockerhub-tag-link] |

##### Technologic TS-4900
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/ts4900-debian | [dockerhub][armv7-ts4900-dockerhub-link], [github][armv7-ts4900-github-link] | latest, jessie, wheezy |
| resin/ts4900-buildpack-deps | [dockerhub][armv7-ts4900-buildpack-deps-dockerhub-link], [github][armv7-ts4900-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/ts4900-node | [dockerhub][armv7-ts4900-node-dockerhub-link], [github][armv7-ts4900-node-github-link] | For available image tags, refer [here][armv7-ts4900-node-dockerhub-tag-link] |
| resin/ts4900-python | [dockerhub][armv7-ts4900-python-dockerhub-link], [github][armv7-ts4900-python-github-link] | For available image tags, refer [here][armv7-ts4900-python-dockerhub-tag-link] |
| resin/ts4900-golang | [dockerhub][armv7-ts4900-golang-dockerhub-link], [github][armv7-ts4900-golang-github-link] | For available image tags, refer [here][armv7-ts4900-golang-dockerhub-tag-link] |
| resin/ts4900-alpine | [dockerhub][armv7-ts4900-alpine-dockerhub-link], [github][armv7-ts4900-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/ts4900-alpine-buildpack-deps | [dockerhub][armv7-ts4900-alpine-buildpack-deps-dockerhub-link], [github][armv7-ts4900-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/ts4900-alpine-node | [dockerhub][armv7-ts4900-alpine-node-dockerhub-link], [github][armv7-ts4900-alpine-node-github-link] | For available image tags, refer [here][armv7-ts4900-alpine-node-dockerhub-tag-link] |
| resin/ts4900-alpine-python | [dockerhub][armv7-ts4900-alpine-python-dockerhub-link], [github][armv7-ts4900-alpine-python-github-link] | For available image tags, refer [here][armv7-ts4900-alpine-python-dockerhub-tag-link] |
| resin/ts4900-alpine-golang | [dockerhub][armv7-ts4900-alpine-golang-dockerhub-link], [github][armv7-ts4900-alpine-golang-github-link] | For available image tags, refer [here][armv7-ts4900-alpine-golang-dockerhub-tag-link] |

##### Apalis iMX6q
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/apalis-imx6-debian | [dockerhub][armv7-apalis-imx6-dockerhub-link], [github][armv7-apalis-imx6-github-link] | latest, jessie, wheezy |
| resin/apalis-imx6-buildpack-deps | [dockerhub][armv7-apalis-imx6-buildpack-deps-dockerhub-link], [github][armv7-apalis-imx6-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/apalis-imx6-node | [dockerhub][armv7-apalis-imx6-node-dockerhub-link], [github][armv7-apalis-imx6-node-github-link] | For available image tags, refer [here][armv7-apalis-imx6-node-dockerhub-tag-link] |
| resin/apalis-imx6-python | [dockerhub][armv7-apalis-imx6-python-dockerhub-link], [github][armv7-apalis-imx6-python-github-link] | For available image tags, refer [here][armv7-apalis-imx6-python-dockerhub-tag-link] |
| resin/apalis-imx6-golang | [dockerhub][armv7-apalis-imx6-golang-dockerhub-link], [github][armv7-apalis-imx6-golang-github-link] | For available image tags, refer [here][armv7-apalis-imx6-golang-dockerhub-tag-link] |
| resin/apalis-imx6-alpine | [dockerhub][armv7-apalis-imx6-alpine-dockerhub-link], [github][armv7-apalis-imx6-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/apalis-imx6-alpine-buildpack-deps | [dockerhub][armv7-apalis-imx6-alpine-buildpack-deps-dockerhub-link], [github][armv7-apalis-imx6-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/apalis-imx6-alpine-node | [dockerhub][armv7-apalis-imx6-alpine-node-dockerhub-link], [github][armv7-apalis-imx6-alpine-node-github-link] | For available image tags, refer [here][armv7-apalis-imx6-alpine-node-dockerhub-tag-link] |
| resin/apalis-imx6-alpine-python | [dockerhub][armv7-apalis-imx6-alpine-python-dockerhub-link], [github][armv7-apalis-imx6-alpine-python-github-link] | For available image tags, refer [here][armv7-apalis-imx6-alpine-python-dockerhub-tag-link] |
| resin/apalis-imx6-alpine-golang | [dockerhub][armv7-apalis-imx6-alpine-golang-dockerhub-link], [github][armv7-apalis-imx6-alpine-golang-github-link] | For available image tags, refer [here][armv7-apalis-imx6-alpine-golang-dockerhub-tag-link] |

##### Colibri iMX6dl
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/colibri-imx6-debian | [dockerhub][armv7-colibri-imx6-dockerhub-link], [github][armv7-colibri-imx6-github-link] | latest, jessie, wheezy |
| resin/colibri-imx6-buildpack-deps | [dockerhub][armv7-colibri-imx6-buildpack-deps-dockerhub-link], [github][armv7-colibri-imx6-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/colibri-imx6-node | [dockerhub][armv7-colibri-imx6-node-dockerhub-link], [github][armv7-colibri-imx6-node-github-link] | For available image tags, refer [here][armv7-colibri-imx6-node-dockerhub-tag-link] |
| resin/colibri-imx6-python | [dockerhub][armv7-colibri-imx6-python-dockerhub-link], [github][armv7-colibri-imx6-python-github-link] | For available image tags, refer [here][armv7-colibri-imx6-golang-dockerhub-tag-link] |
| resin/colibri-imx6-golang | [dockerhub][armv7-colibri-imx6-golang-dockerhub-link], [github][armv7-colibri-imx6-golang-github-link] | For available image tags, refer [here][armv7-colibri-imx6-golang-dockerhub-tag-link] |
| resin/colibri-imx6-alpine | [dockerhub][armv7-colibri-imx6-alpine-dockerhub-link], [github][armv7-colibri-imx6-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/colibri-imx6-alpine-buildpack-deps | [dockerhub][armv7-colibri-imx6-alpine-buildpack-deps-dockerhub-link], [github][armv7-colibri-imx6-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/colibri-imx6-alpine-node | [dockerhub][armv7-colibri-imx6-alpine-node-dockerhub-link], [github][armv7-colibri-imx6-alpine-node-github-link] | For available image tags, refer [here][armv7-colibri-imx6-alpine-node-dockerhub-tag-link] |
| resin/colibri-imx6-alpine-python | [dockerhub][armv7-colibri-imx6-alpine-python-dockerhub-link], [github][armv7-colibri-imx6-alpine-python-github-link] | For available image tags, refer [here][armv7-colibri-imx6-alpine-python-dockerhub-tag-link] |
| resin/colibri-imx6-alpine-golang | [dockerhub][armv7-colibri-imx6-alpine-golang-dockerhub-link], [github][armv7-colibri-imx6-alpine-golang-github-link] | For available image tags, refer [here][armv7-colibri-imx6-alpine-golang-dockerhub-tag-link] |

##### Samsung Artik 5
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/artik5-debian | [dockerhub][armv7-artik5-dockerhub-link], [github][armv7-artik5-github-link] | latest, jessie, wheezy |
| resin/artik5-buildpack-deps | [dockerhub][armv7-artik5-buildpack-deps-dockerhub-link], [github][armv7-artik5-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/artik5-node | [dockerhub][armv7-artik5-node-dockerhub-link], [github][armv7-artik5-node-github-link] | For available image tags, refer [here][armv7-artik5-node-dockerhub-tag-link] |
| resin/artik5-python | [dockerhub][armv7-artik5-python-dockerhub-link], [github][armv7-artik5-python-github-link] | For available image tags, refer [here][armv7-artik5-python-dockerhub-tag-link] |
| resin/artik5-golang | [dockerhub][armv7-artik5-golang-dockerhub-link], [github][armv7-artik5-golang-github-link] | For available image tags, refer [here][armv7-artik5-golang-dockerhub-tag-link] |
| resin/artik5-alpine | [dockerhub][armv7-artik5-alpine-dockerhub-link], [github][armv7-artik5-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/artik5-alpine-buildpack-deps | [dockerhub][armv7-artik5-alpine-buildpack-deps-dockerhub-link], [github][armv7-artik5-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/artik5-alpine-node | [dockerhub][armv7-artik5-alpine-node-dockerhub-link], [github][armv7-artik5-alpine-node-github-link] | For available image tags, refer [here][armv7-artik5-alpine-node-dockerhub-tag-link] |
| resin/artik5-alpine-python | [dockerhub][armv7-artik5-alpine-python-dockerhub-link], [github][armv7-artik5-alpine-python-github-link] | For available image tags, refer [here][armv7-artik5-alpine-python-dockerhub-tag-link] |
| resin/artik5-alpine-golang | [dockerhub][armv7-artik5-alpine-golang-dockerhub-link], [github][armv7-artik5-alpine-golang-github-link] | For available image tags, refer [here][armv7-artik5-alpine-golang-dockerhub-tag-link] |

##### Samsung Artik 10
| Image | Links | Available Tag |
|:-----------|:------------|:------------|
| resin/artik10-debian | [dockerhub][armv7-artik10-dockerhub-link], [github][armv7-artik10-github-link] | latest, jessie, wheezy |
| resin/artik10-buildpack-deps | [dockerhub][armv7-artik10-buildpack-deps-dockerhub-link], [github][armv7-artik10-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/artik10-node | [dockerhub][armv7-artik10-node-dockerhub-link], [github][armv7-artik10-node-github-link] | For available image tags, refer [here][armv7-artik10-node-dockerhub-tag-link] |
| resin/artik10-python | [dockerhub][armv7-artik10-python-dockerhub-link], [github][armv7-artik10-python-github-link] | For available image tags, refer [here][armv7-artik10-python-dockerhub-tag-link] |
| resin/artik10-golang | [dockerhub][armv7-artik10-golang-dockerhub-link], [github][armv7-artik10-golang-github-link] | For available image tags, refer [here][armv7-artik10-golang-dockerhub-tag-link] |
| resin/artik10-alpine | [dockerhub][armv7-artik10-alpine-dockerhub-link], [github][armv7-artik10-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/artik10-alpine-buildpack-deps | [dockerhub][armv7-artik10-alpine-buildpack-deps-dockerhub-link], [github][armv7-artik10-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/artik10-alpine-node | [dockerhub][armv7-artik10-alpine-node-dockerhub-link], [github][armv7-artik10-alpine-node-github-link] | For available image tags, refer [here][armv7-artik10-alpine-node-dockerhub-tag-link] |
| resin/artik10-alpine-python | [dockerhub][armv7-artik10-alpine-python-dockerhub-link], [github][armv7-artik10-alpine-python-github-link] | For available image tags, refer [here][armv7-artik10-alpine-python-dockerhub-tag-link] |
| resin/artik10-alpine-golang | [dockerhub][armv7-artik10-alpine-golang-dockerhub-link], [github][armv7-artik10-alpine-golang-github-link] | For available image tags, refer [here][armv7-artik10-alpine-golang-dockerhub-tag-link] |

### i386

![i386 Tree Diagram](/img/i386-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/i386-debian | The base OS image for i386 devices | minbase, sudo | [dockerhub][i386-dockerhub-link], [github][i386-github-link] | latest, jessie, wheezy |
| resin/i386-systemd | The image with full systemd init system installed for i386 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][i386-systemd-dockerhub-link], [github][i386-systemd-github-link] | latest, jessie, wheezy |
| resin/edison-debian | The bare bones OS image based on Debian for Intel Edison | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][i386-edison-dockerhub-link], [github][i386-edison-github-link] | latest, jessie, wheezy |
| resin/edison-buildpack-deps | The buildpack-deps image for Intel Edison. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][i386-edison-buildpack-deps-dockerhub-link], [github][i386-edison-buildpack-deps-github-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/edison-node | The Node.js buildpack image for Node.js apps for Intel Edison. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][i386-edison-node-dockerhub-link], [github][i386-edison-node-github-link] | For available image tags, refer [here][i386-edison-node-dockerhub-tag-link] |
| resin/edison-python | The Python buildpack image for Python apps for Intel Edison | Refer [here](#python)  | [dockerhub][i386-edison-python-dockerhub-link], [github][i386-edison-python-github-link] | For available image tags, refer [here][i386-edison-python-dockerhub-tag-link] |
| resin/edison-golang | The Go buildpack image for Go apps for Intel Edison. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][i386-edison-golang-dockerhub-link], [github][i386-edison-golang-github-link] | For available image tags, refer [here][i386-edison-golang-dockerhub-tag-link] |
| resin/i386-alpine | The base OS image based on Alpine Linux for i386 devices | bash, udev, dbus, tar, ca-certificates, openrc | [dockerhub][i386-alpine-dockerhub-link], [github][i386-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/edison-alpine | The bare bones Alpine OS image for Intel Edison. See our [tips](#tips) section on how to enable openrc in your image. | less, nano, net-tools, ifupdown, usbutils, gnupg | [dockerhub][i386-edison-alpine-dockerhub-link], [github][i386-edison-alpine-github-link] | latest, 3.3, 3.2 and edge |
| resin/edison-alpine-buildpack-deps | The buildpack-deps image based on Alpine Linux for Intel Edison. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][i386-edison-alpine-buildpack-deps-dockerhub-link], [github][i386-edison-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/edison-alpine-node | The Node.js buildpack image based on Alpine Linux for Node.js apps for Intel Edison. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][i386-edison-alpine-node-dockerhub-link], [github][i386-edison-alpine-node-github-link] | For available image tags, refer [here][i386-edison-alpine-node-dockerhub-tag-link] |
| resin/edison-alpine-python | The Python buildpack image based on Alpine Linux for Python apps for Intel Edison | Refer [here](#python) | [dockerhub][i386-edison-alpine-python-dockerhub-link], [github][i386-edison-alpine-python-github-link] | For available image tags, refer [here][i386-edison-alpine-python-dockerhub-tag-link] |
| resin/edison-alpine-golang | The Go buildpack image based on Alpine Linux for Go apps for Intel Edison. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][i386-edison-alpine-golang-dockerhub-link], [github][i386-edison-alpine-golang-github-link] | For available image tags, refer [here][i386-edison-alpine-golang-dockerhub-tag-link] |


### amd64

![amd64 Tree Diagram](/img/amd64-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/amd64-debian | The base OS image for amd64 devices | minbase, sudo | [dockerhub][amd64-dockerhub-link], [github][amd64-github-link] | latest, jessie, wheezy |
| resin/amd64-systemd | The image with full systemd init system installed for amd64 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][amd64-systemd-dockerhub-link], [github][amd64-systemd-github-link] | latest, jessie, wheezy |
| resin/nuc-debian | The bare bones OS image for Intel NUC | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][amd64-nuc-dockerhub-link], [github][amd64-nuc-github-link] | latest, jessie, wheezy |
| resin/nuc-buildpack-deps | The buildpack-deps image for Intel NUC. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][amd64-nuc-buildpack-deps-dockerhub-link], [github][amd64-nuc-buildpack-deps-github-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nuc-node | The Node.js buildpack image for Node.js apps for Intel NUC. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][amd64-nuc-node-dockerhub-link], [github][amd64-nuc-node-github-link] | For available image tags, refer [here][amd64-nuc-node-dockerhub-tag-link] |
| resin/nuc-python | The Python buildpack image for Python apps for Intel NUC | Refer [here](#python) | [dockerhub][amd64-nuc-python-dockerhub-link], [github][amd64-nuc-python-github-link] | For available image tags, refer [here][amd64-nuc-python-dockerhub-tag-link] |
| resin/nuc-golang | The Go buildpack image for Go apps for Intel NUC. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][amd64-nuc-golang-dockerhub-link], [github][amd64-nuc-golang-github-link] | For available image tags, refer [here][amd64-nuc-golang-dockerhub-tag-link] |
| resin/amd64-alpine | The base OS image based on Alpine Linux for amd64 devices | bash, udev, dbus, tar, ca-certificates, openrc | [dockerhub][amd64-alpine-dockerhub-link], [github][amd64-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/nuc-alpine | The bare bones Alpine OS image for Intel NUC. See our [tips](#tips) section on how to enable openrc in your image. | less, nano, net-tools, ifupdown, usbutils, gnupg | [dockerhub][amd64-nuc-alpine-dockerhub-link], [github][amd64-nuc-alpine-github-link] | latest, 3.3, 3.2 and edge |
| resin/nuc-alpine-buildpack-deps | The buildpack-deps image based on Alpine Linux for Intel NUC. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps) | [dockerhub][amd64-nuc-alpine-buildpack-deps-dockerhub-link], [github][amd64-nuc-alpine-buildpack-deps-github-link] | latest, 3.3, edge, 3.3-scm, edge-scm, 3.3-curl, edge-curl |
| resin/nuc-alpine-node | The Node.js buildpack image based on Alpine Linux for Node.js apps for Intel NUC. Details about the Node.js image can be found [here](#node) | Refer [here](#node) | [dockerhub][amd64-nuc-alpine-node-dockerhub-link], [github][amd64-nuc-alpine-node-github-link] | For available image tags, refer [here][amd64-nuc-alpine-node-dockerhub-tag-link] |
| resin/nuc-alpine-python | The Python buildpack image based on Alpine Linux for Python apps for Intel NUC | Refer [here](#python) | [dockerhub][amd64-nuc-alpine-python-dockerhub-link], [github][amd64-nuc-alpine-python-github-link] | For available image tags, refer [here][amd64-nuc-alpine-python-dockerhub-tag-link] |
| resin/nuc-alpine-golang | The Go buildpack image based on Alpine Linux for Go apps for Intel NUC. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][amd64-nuc-alpine-golang-dockerhub-link], [github][amd64-nuc-alpine-golang-github-link] | For available image tags, refer [here][amd64-nuc-alpine-golang-dockerhub-tag-link] |

### ARMv5

![ARMv5 Tree Diagram](/img/armel-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/armel-debian| The base OS image for ARMv5 devices | minbase, sudo | [dockerhub][armel-dockerhub-link], [github][armel-github-link] | latest, jessie, wheezy |
| resin/armel-systemd | The image with full systemd init system installed for ARMv5 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][armel-systemd-dockerhub-link], [github][armel-systemd-github-link] | latest, jessie, wheezy |
| resin/ts7700-debian | The bare bones OS image for Technologic TS-7700. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armel-ts7700-dockerhub-link], [github][armel-ts7700-github-link] | latest, jessie, wheezy |
| resin/ts7700-buildpack-deps | The buildpack-deps image for Technologic TS-7700. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armel-ts7700-buildpack-deps-dockerhub-link], [github][armel-ts7700-buildpack-deps-github-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/ts7700-node | The Node.js buildpack image for Node.js apps for Technologic TS-7700. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armel-ts7700-node-dockerhub-link], [github][armel-ts7700-node-github-link] | For available image tags, refer [here][armel-ts7700-node-dockerhub-tag-link] |
| resin/ts7700-python | The Python buildpack image for Python apps for Technologic TS-7700. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armel-ts7700-python-dockerhub-link], [github][armel-ts7700-python-github-link] | latest, jessie, wheezy |
| resin/ts7700-golang | The Go buildpack image for Go apps for Technologic TS-7700. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armel-ts7700-golang-dockerhub-link], [github][armel-ts7700-golang-github-link] | For available image tags, refer [here][armel-ts7700-golang-dockerhub-tag-link] |

__Note:__ Alpine linux base images are currently not available for armel (ARMv5) devices.

#### <a name="tips"></a>Tips

* The `latest` tag points to jessie images.
* For those images with Systemd init system installed (Debian based base images), the systemd init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger systemd init system on the Docker image.
* For those images with OpenRC init system installed (Alpine Linux based base images), the OpenRC init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger OpenRC init system on the Docker image.
* `systemd was included in Debian wheezy as a technology preview. Please make sure that you are using Debian testing or newer to get a recent version of systemd.` from [Systemd Debian Wiki Page][systemd-wiki]. Therefore, we do not install systemd on wheezy images. `ENV INITSYSTEM` will only work on jessie and sid images.
* In case, you have your own systemd service and you want your systemd service to use the environment variables you set in the dashboard. You need to add `EnvironmentFile=/etc/docker.env` to your systemd service unit file.
* We have native ARM builders available to build your application. This is the way we fix all the issues of cross-compilation (ie Go with QEMU). In order to build your application on native ARM servers, you do `git push resin master:master-arm` instead of `git push resin master`. If the build has issue with QEMU, we recommend switching to ARM builders. Just notice this feature is currently experimental.

## <a name="base-images"></a>Base Images:

These are base images for different arch: armhf (armv6 and armv7), i386, amd64 and armv5 (armel).

| Image | Arch | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | armv6 | [wheezy][installed-pkg-rpi-wheezy], [jessie][installed-pkg-rpi-jessie] | [dockerhub][rpi-dockerhub-link], [github][rpi-github-link] | latest, jessie, wheezy |
| resin/armv7hf-debian | armv7 | [wheezy][installed-pkg-armv7-wheezy], [jessie][installed-pkg-armv7-jessie], [sid][installed-pkg-armv7-sid] | [dockerhub][armv7hf-dockerhub-link], [github][armv7hf-github-link] | latest, jessie, wheezy, sid |
| resin/i386-debian | i386 | [wheezy][installed-pkg-i386-wheezy], [jessie][installed-pkg-i386-jessie] | [dockerhub][i386-dockerhub-link], [github][i386-github-link] | latest, jessie, wheezy |
| resin/amd64-debian | amd64 | [wheezy][installed-pkg-amd64-wheezy], [jessie][installed-pkg-amd64-jessie] | [dockerhub][amd64-dockerhub-link], [github][amd64-github-link] | latest, jessie, wheezy |
| resin/armel-debian | armel | [wheezy][installed-pkg-armel-wheezy], [jessie][installed-pkg-armel-jessie] | [dockerhub][armel-dockerhub-link], [github][armel-github-link] | latest, jessie, wheezy |
| resin/armhf-alpine | armhf | | [dockerhub][armhf-alpine-dockerhub-link], [github][armhf-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/amd64-alpine | amd64 | | [dockerhub][amd64-alpine-dockerhub-link], [github][amd64-alpine-github-link] | latest, 3.3, 3.2, edge |
| resin/i386-alpine | i386 | | [dockerhub][i386-alpine-dockerhub-link], [github][i386-alpine-github-link] | latest, 3.3, 3.2, edge |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

## Resin-io-library Images:

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

* **node:<version>**: This is the defacto image. If you are unsure about what your needs are, you probably want to use this one. It is designed to be used both as a throw away container (mount your source code and start the container to start your app), as well as the base to build other images off of. **This tag is based off of buildpack-deps image**. buildpack-deps is designed for the average user of docker who has many images on their system. It, by design, has a large number of extremely common Debian packages. This reduces the number of packages that images that derive from it need to install, thus reducing the overall size of all images on your system.
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

This is the defacto image. If you are unsure about what your needs are, you probably want to use this one. It is designed to be used both as a throw away container (mount your source code and start the container to start your app), as well as the base to build other images off of. This tag is based off of `buildpack-deps`. `buildpack-deps` is designed for the average user of docker who has many images on their system. It, by design, has a large number of extremely common Debian packages. This reduces the number of packages that images that derive from it need to install, thus reducing the overall size of all images on your system.

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


[base-repository]:https://github.com/resin-io-library/base-images
[base-images-changelog]:https://github.com/resin-io-library/base-images/blob/master/CHANGELOG.md
[rpi-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-raspbian/
[armv7hf-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-debian/
[i386-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-debian/
[rpi-github-link]:https://github.com/resin-io-library/resin-rpi-raspbian/
[armv7hf-github-link]:https://github.com/resin-io-library/resin-armhfv7-debian/
[i386-github-link]:https://github.com/resin-io-library/resin-i386-debian/
[amd64-github-link]:https://github.com/resin-io-library/resin-amd64-debian/
[amd64-dockerhub-link]:https://registry.hub.docker.com/u/resin/amd64-debian/#
[armel-github-link]:https://github.com/resin-io-library/resin-armel-debian/
[armel-dockerhub-link]:https://registry.hub.docker.com/u/resin/armel-debian/
[armhf-alpine-github-link]:https://github.com/resin-io-library/base-images/alpine/armhf
[armhf-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/armhf-alpine/
[i386-alpine-github-link]:https://github.com/resin-io-library/base-images/alpine/i386
[i386-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-alpine/
[amd64-alpine-github-link]:https://github.com/resin-io-library/base-images/alpine/amd64
[amd64-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/amd64-alpine/

[installed-pkg-rpi-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/rpi-raspbian/wheezy/wheezy
[installed-pkg-rpi-jessie]:https://resin-packages.s3.amazonaws.com/image_info/rpi-raspbian/jessie/jessie
[installed-pkg-armv7-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/wheezy/wheezy
[installed-pkg-armv7-jessie]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/jessie/jessie
[installed-pkg-armv7-sid]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/sid/sid
[installed-pkg-i386-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/i386-debian/wheezy/wheezy
[installed-pkg-i386-jessie]:https://resin-packages.s3.amazonaws.com/image_info/i386-debian/jessie/jessie
[installed-pkg-amd64-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/wheezy/wheezy
[installed-pkg-amd64-jessie]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/jessie/jessie
[installed-pkg-armel-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/wheezy/wheezy
[installed-pkg-armel-jessie]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/jessie/jessie

[systemd-wiki]:https://wiki.debian.org/systemd
[golang-wiki]:https://en.wikipedia.org/wiki/Go_%28programming_language%29
[python-wiki]:https://en.wikipedia.org/wiki/Python_%28programming_language%29

[rpi-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-buildpack-deps/
[rpi-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/
[rpi-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/tags/manage/
[rpi-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-systemd/
[rpi-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-python/
[rpi-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-python/tags/manage/
[rpi-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/rpi
[rpi-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi
[rpi-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi
[rpi-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi
[rpi-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-golang/
[rpi-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-golang/tags/manage/
[rpi-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi
[rpi-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine/
[rpi-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi
[rpi-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-buildpack-deps/
[rpi-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-node/
[rpi-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-node/tags/manage/
[rpi-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-python/
[rpi-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-python/tags/manage/
[rpi-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi
[rpi-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi
[rpi-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi
[rpi-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-golang/
[rpi-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-alpine-golang/tags/manage/
[rpi-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi

[armv7-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-systemd/
[armv7-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/armv7hf
[armv7-bbb-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-debian/
[armv7-bbb-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-buildpack-deps/
[armv7-bbb-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/
[armv7-bbb-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/tags/manage/
[armv7-bbb-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-python/
[armv7-bbb-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-python/tags/manage/
[armv7-bbb-sourceslist]:http://repos.rcn-ee.net/debian/
[armv7-bbb-sourceslist1]:http://debian.beagleboard.org/
[armv7-bbb-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/beaglebone
[armv7-bbb-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/beaglebone
[armv7-bbb-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/beaglebone
[armv7-bbb-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/beaglebone
[armv7-bbb-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-golang/
[armv7-bbb-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-golang/tags/manage/
[armv7-bbb-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/beaglebone
[armv7-bbb-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine/
[armv7-bbb-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-buildpack-deps/
[armv7-bbb-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-node/
[armv7-bbb-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-node/tags/manage/
[armv7-bbb-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-python/
[armv7-bbb-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-python/tags/manage/
[armv7-bbb-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/beaglebone
[armv7-bbb-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/beaglebone
[armv7-bbb-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/beaglebone
[armv7-bbb-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/beaglebone
[armv7-bbb-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-golang/
[armv7-bbb-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-alpine-golang/tags/manage/
[armv7-bbb-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/beaglebone
[armv7-rpi2-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-debian/
[armv7-rpi2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-buildpack-deps/
[armv7-rpi2-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/
[armv7-rpi2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/tags/manage/
[armv7-rpi2-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-python/
[armv7-rpi2-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-python/tags/manage/
[armv7-rpi2-sourceslist]:http://archive.raspbian.org/raspbian/
[armv7-rpi2-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi2
[armv7-rpi2-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi2
[armv7-rpi2-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi2
[armv7-rpi2-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi2
[armv7-rpi2-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-golang/
[armv7-rpi2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-golang/tags/manage/
[armv7-rpi2-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi2
[armv7-rpi2-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine/
[armv7-rpi2-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-buildpack-deps/
[armv7-rpi2-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-node/
[armv7-rpi2-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-node/tags/manage/
[armv7-rpi2-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-python/
[armv7-rpi2-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-python/tags/manage/
[armv7-rpi2-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi2
[armv7-rpi2-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi2
[armv7-rpi2-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi2
[armv7-rpi2-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi2
[armv7-rpi2-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-golang/
[armv7-rpi2-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-alpine-golang/tags/manage/
[armv7-rpi2-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi2
[armv7-zc702-zynq7-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-debian/
[armv7-zc702-zynq7-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-buildpack-deps/
[armv7-zc702-zynq7-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-node/
[armv7-zc702-zynq7-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-node/tags/manage/
[armv7-zc702-zynq7-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-python/
[armv7-zc702-zynq7-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/zc702-zynq7
[armv7-zc702-zynq7-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/zc702-zynq7
[armv7-zc702-zynq7-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/zc702-zynq7
[armv7-zc702-zynq7-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/zc702-zynq7
[armv7-zc702-zynq7-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-golang/
[armv7-zc702-zynq7-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-golang/tags/manage/
[armv7-zc702-zynq7-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/zc702-zynq7
[armv7-zc702-zynq7-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-python/tags/manage/
[armv7-zc702-zynq7-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine/
[armv7-zc702-zynq7-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-buildpack-deps/
[armv7-zc702-zynq7-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-node/
[armv7-zc702-zynq7-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-node/tags/manage/
[armv7-zc702-zynq7-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-python/
[armv7-zc702-zynq7-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-python/tags/manage/
[armv7-zc702-zynq7-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/zc702-zynq7
[armv7-zc702-zynq7-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/zc702-zynq7
[armv7-zc702-zynq7-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/zc702-zynq7
[armv7-zc702-zynq7-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/zc702-zynq7
[armv7-zc702-zynq7-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-golang/
[armv7-zc702-zynq7-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-alpine-golang/tags/manage/
[armv7-zc702-zynq7-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/zc702-zynq7
[armv7-vab820-quad-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-debian/
[armv7-vab820-quad-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-buildpack-deps/
[armv7-vab820-quad-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-node/
[armv7-vab820-quad-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-node/tags/manage/
[armv7-vab820-quad-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-python/
[armv7-vab820-quad-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/vab820-quad
[armv7-vab820-quad-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/vab820-quad
[armv7-vab820-quad-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/vab820-quad
[armv7-vab820-quad-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/vab820-quad
[armv7-vab820-quad-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-golang/
[armv7-vab820-quad-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-golang/tags/manage/
[armv7-vab820-quad-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/vab820-quad
[armv7-vab820-quad-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-python/tags/manage/
[armv7-vab820-quad-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine/
[armv7-vab820-quad-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-buildpack-deps/
[armv7-vab820-quad-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-node/
[armv7-vab820-quad-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-node/tags/manage/
[armv7-vab820-quad-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-python/
[armv7-vab820-quad-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-python/tags/manage/
[armv7-vab820-quad-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/vab820-quad
[armv7-vab820-quad-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/vab820-quad
[armv7-vab820-quad-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/vab820-quad
[armv7-vab820-quad-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/vab820-quad
[armv7-vab820-quad-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-golang/
[armv7-vab820-quad-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-alpine-golang/tags/manage/
[armv7-vab820-quad-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/vab820-quad
[armv7-odroid-ux3-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-debian/
[armv7-odroid-ux3-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-buildpack-deps/
[armv7-odroid-ux3-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-node/
[armv7-odroid-ux3-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-node/tags/manage/
[armv7-odroid-ux3-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-python/
[armv7-odroid-ux3-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/odroid-ux3
[armv7-odroid-ux3-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/odroid-ux3
[armv7-odroid-ux3-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/odroid-ux3
[armv7-odroid-ux3-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/odroid-ux3
[armv7-odroid-ux3-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-golang/
[armv7-odroid-ux3-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-golang/tags/manage/
[armv7-odroid-ux3-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/odroid-ux3
[armv7-odroid-ux3-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-python/tags/manage/
[armv7-odroid-ux3-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine/
[armv7-odroid-ux3-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-buildpack-deps/
[armv7-odroid-ux3-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-node/
[armv7-odroid-ux3-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-node/tags/manage/
[armv7-odroid-ux3-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-python/
[armv7-odroid-ux3-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-python/tags/manage/
[armv7-odroid-ux3-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/odroid-ux3
[armv7-odroid-ux3-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/odroid-ux3
[armv7-odroid-ux3-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/odroid-ux3
[armv7-odroid-ux3-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/odroid-ux3
[armv7-odroid-ux3-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-golang/
[armv7-odroid-ux3-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-alpine-golang/tags/manage/
[armv7-odroid-ux3-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/odroid-ux3
[armv7-odroid-c1-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-debian/
[armv7-odroid-c1-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-buildpack-deps/
[armv7-odroid-c1-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-node/
[armv7-odroid-c1-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-node/tags/manage/
[armv7-odroid-c1-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-python/
[armv7-odroid-c1-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/odroid-c1
[armv7-odroid-c1-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7-odroid-c1-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/odroid-c1
[armv7-odroid-c1-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/odroid-c1
[armv7-odroid-c1-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-golang/
[armv7-odroid-c1-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-golang/tags/manage/
[armv7-odroid-c1-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/odroid-c1
[armv7-odroid-c1-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-python/tags/manage/
[armv7-odroid-c1-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine/
[armv7-odroid-c1-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-buildpack-deps/
[armv7-odroid-c1-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-node/
[armv7-odroid-c1-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-node/tags/manage/
[armv7-odroid-c1-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-python/
[armv7-odroid-c1-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-python/tags/manage/
[armv7-odroid-c1-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/odroid-c1
[armv7-odroid-c1-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/odroid-c1
[armv7-odroid-c1-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/odroid-c1
[armv7-odroid-c1-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/odroid-c1
[armv7-odroid-c1-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-golang/
[armv7-odroid-c1-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-alpine-golang/tags/manage/
[armv7-odroid-c1-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/odroid-c1
[armv7-cubox-i-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-debian/
[armv7-cubox-i-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-buildpack-deps/
[armv7-cubox-i-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-node/
[armv7-cubox-i-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-node/tags/manage/
[armv7-cubox-i-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-python/
[armv7-cubox-i-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/cubox-i
[armv7-cubox-i-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/cubox-i
[armv7-cubox-i-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/cubox-i
[armv7-cubox-i-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/cubox-i
[armv7-cubox-i-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-golang/
[armv7-cubox-i-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-golang/tags/manage/
[armv7-cubox-i-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/cubox-i
[armv7-cubox-i-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-python/tags/manage/
[armv7-cubox-i-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine/
[armv7-cubox-i-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-buildpack-deps/
[armv7-cubox-i-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-node/
[armv7-cubox-i-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-node/tags/manage/
[armv7-cubox-i-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-python/
[armv7-cubox-i-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-python/tags/manage/
[armv7-cubox-i-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/cubox-i
[armv7-cubox-i-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/cubox-i
[armv7-cubox-i-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/cubox-i
[armv7-cubox-i-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/cubox-i
[armv7-cubox-i-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-golang/
[armv7-cubox-i-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-alpine-golang/tags/manage/
[armv7-cubox-i-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/cubox-i
[armv7-nitrogen6x-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-debian/
[armv7-nitrogen6x-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-buildpack-deps/
[armv7-nitrogen6x-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-node/
[armv7-nitrogen6x-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-node/tags/manage/
[armv7-nitrogen6x-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-python/
[armv7-nitrogen6x-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/nitrogen6x
[armv7-nitrogen6x-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7-nitrogen6x-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/nitrogen6x
[armv7-nitrogen6x-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/nitrogen6x
[armv7-nitrogen6x-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-golang/
[armv7-nitrogen6x-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-golang/tags/manage/
[armv7-nitrogen6x-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/nitrogen6x
[armv7-nitrogen6x-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-python/tags/manage/
[armv7-nitrogen6x-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine/
[armv7-nitrogen6x-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-buildpack-deps/
[armv7-nitrogen6x-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-node/
[armv7-nitrogen6x-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-node/tags/manage/
[armv7-nitrogen6x-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-python/
[armv7-nitrogen6x-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-python/tags/manage/
[armv7-nitrogen6x-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/nitrogen6x
[armv7-nitrogen6x-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/nitrogen6x
[armv7-nitrogen6x-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/nitrogen6x
[armv7-nitrogen6x-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/nitrogen6x
[armv7-nitrogen6x-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-golang/
[armv7-nitrogen6x-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-alpine-golang/tags/manage/
[armv7-nitrogen6x-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/nitrogen6x
[armv7-parallella-hdmi-resin-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-debian/
[armv7-parallella-hdmi-resin-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-buildpack-deps/
[armv7-parallella-hdmi-resin-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-node/
[armv7-parallella-hdmi-resin-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-node/tags/manage/
[armv7-parallella-hdmi-resin-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-python/
[armv7-parallella-hdmi-resin-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-golang/
[armv7-parallella-hdmi-resin-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-golang/tags/manage/
[armv7-parallella-hdmi-resin-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-python/tags/manage/
[armv7-parallella-hdmi-resin-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine/
[armv7-parallella-hdmi-resin-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-buildpack-deps/
[armv7-parallella-hdmi-resin-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-node/
[armv7-parallella-hdmi-resin-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-node/tags/manage/
[armv7-parallella-hdmi-resin-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-python/
[armv7-parallella-hdmi-resin-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-python/tags/manage/
[armv7-parallella-hdmi-resin-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/parallella-hdmi-resin
[armv7-parallella-hdmi-resin-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-golang/
[armv7-parallella-hdmi-resin-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-alpine-golang/tags/manage/
[armv7-parallella-hdmi-resin-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/parallella-hdmi-resin
[armv7-ts4900-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-debian/
[armv7-ts4900-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-buildpack-deps/
[armv7-ts4900-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-node/
[armv7-ts4900-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-node/tags/manage/
[armv7-ts4900-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-python/
[armv7-ts4900-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/ts4900
[armv7-ts4900-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/ts4900
[armv7-ts4900-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/ts4900
[armv7-ts4900-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/ts4900
[armv7-ts4900-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-golang/
[armv7-ts4900-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-golang/tags/manage/
[armv7-ts4900-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/ts4900
[armv7-ts4900-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-python/tags/manage/
[armv7-ts4900-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine/
[armv7-ts4900-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-buildpack-deps/
[armv7-ts4900-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-node/
[armv7-ts4900-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-node/tags/manage/
[armv7-ts4900-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-python/
[armv7-ts4900-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-python/tags/manage/
[armv7-ts4900-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/ts4900
[armv7-ts4900-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/ts4900
[armv7-ts4900-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/ts4900
[armv7-ts4900-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/ts4900
[armv7-ts4900-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-golang/
[armv7-ts4900-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts4900-alpine-golang/tags/manage/
[armv7-ts4900-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/ts4900
[armv7-colibri-imx6-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-debian/
[armv7-colibri-imx6-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-buildpack-deps/
[armv7-colibri-imx6-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-node/
[armv7-colibri-imx6-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-node/tags/manage/
[armv7-colibri-imx6-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-python/
[armv7-colibri-imx6-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/colibri-imx6
[armv7-colibri-imx6-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/colibri-imx6
[armv7-colibri-imx6-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/colibri-imx6
[armv7-colibri-imx6-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/colibri-imx6
[armv7-colibri-imx6-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-golang/
[armv7-colibri-imx6-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-golang/tags/manage/
[armv7-colibri-imx6-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/colibri-imx6
[armv7-colibri-imx6-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-python/tags/manage/
[armv7-colibri-imx6-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine/
[armv7-colibri-imx6-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-buildpack-deps/
[armv7-colibri-imx6-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-node/
[armv7-colibri-imx6-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-node/tags/manage/
[armv7-colibri-imx6-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-python/
[armv7-colibri-imx6-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-python/tags/manage/
[armv7-colibri-imx6-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/colibri-imx6
[armv7-colibri-imx6-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/colibri-imx6
[armv7-colibri-imx6-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/colibri-imx6
[armv7-colibri-imx6-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/colibri-imx6
[armv7-colibri-imx6-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-golang/
[armv7-colibri-imx6-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/colibri-imx6-alpine-golang/tags/manage/
[armv7-colibri-imx6-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/colibri-imx6
[armv7-apalis-imx6-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-debian/
[armv7-apalis-imx6-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-buildpack-deps/
[armv7-apalis-imx6-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-node/
[armv7-apalis-imx6-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-node/tags/manage/
[armv7-apalis-imx6-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-python/
[armv7-apalis-imx6-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/apalis-imx6
[armv7-apalis-imx6-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/apalis-imx6
[armv7-apalis-imx6-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/apalis-imx6
[armv7-apalis-imx6-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/apalis-imx6
[armv7-apalis-imx6-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-golang/
[armv7-apalis-imx6-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-golang/tags/manage/
[armv7-apalis-imx6-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/apalis-imx6
[armv7-apalis-imx6-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-python/tags/manage/
[armv7-apalis-imx6-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine/
[armv7-apalis-imx6-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-buildpack-deps/
[armv7-apalis-imx6-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-node/
[armv7-apalis-imx6-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-node/tags/manage/
[armv7-apalis-imx6-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-python/
[armv7-apalis-imx6-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-python/tags/manage/
[armv7-apalis-imx6-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/apalis-imx6
[armv7-apalis-imx6-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/apalis-imx6
[armv7-apalis-imx6-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/apalis-imx6
[armv7-apalis-imx6-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/apalis-imx6
[armv7-apalis-imx6-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-golang/
[armv7-apalis-imx6-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/apalis-imx6-alpine-golang/tags/manage/
[armv7-apalis-imx6-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/apalis-imx6
[armv7-rpi3-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-debian/
[armv7-rpi3-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-buildpack-deps/
[armv7-rpi3-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-node/
[armv7-rpi3-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-node/tags/manage/
[armv7-rpi3-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-python/
[armv7-rpi3-sourceslist]:http://archive.raspbian.org/raspbian/
[armv7-rpi3-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi3
[armv7-rpi3-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7-rpi3-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi3
[armv7-rpi3-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi3
[armv7-rpi3-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-golang/
[armv7-rpi3-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-golang/tags/manage/
[armv7-rpi3-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi3
[armv7-rpi3-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-python/tags/manage/
[armv7-rpi3-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine/
[armv7-rpi3-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-buildpack-deps/
[armv7-rpi3-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-node/
[armv7-rpi3-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-node/tags/manage/
[armv7-rpi3-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-python/
[armv7-rpi3-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-python/tags/manage/
[armv7-rpi3-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi3
[armv7-rpi3-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi3
[armv7-rpi3-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi3
[armv7-rpi3-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi3
[armv7-rpi3-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-golang/
[armv7-rpi3-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi3-alpine-golang/tags/manage/
[armv7-rpi3-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi3
[armv7-artik5-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-debian/
[armv7-artik5-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-buildpack-deps/
[armv7-artik5-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-node/
[armv7-artik5-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-node/tags/manage/
[armv7-artik5-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-python/
[armv7-artik5-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/artik5
[armv7-artik5-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/artik5
[armv7-artik5-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/artik5
[armv7-artik5-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/artik5
[armv7-artik5-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-golang/
[armv7-artik5-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-golang/tags/manage/
[armv7-artik5-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/artik5
[armv7-artik5-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-python/tags/manage/
[armv7-artik5-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-alpine/
[armv7-artik5-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-buildpack-deps/
[armv7-artik5-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-node/
[armv7-artik5-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-node/tags/manage/
[armv7-artik5-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-python/
[armv7-artik5-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-python/tags/manage/
[armv7-artik5-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/artik5
[armv7-artik5-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/artik5
[armv7-artik5-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/artik5
[armv7-artik5-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/artik5
[armv7-artik5-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-golang/
[armv7-artik5-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik5-alpine-golang/tags/manage/
[armv7-artik5-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/artik5
[armv7-artik10-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-debian/
[armv7-artik10-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-buildpack-deps/
[armv7-artik10-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-node/
[armv7-artik10-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-node/tags/manage/
[armv7-artik10-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-python/
[armv7-artik10-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/artik10
[armv7-artik10-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/artik10
[armv7-artik10-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/artik10
[armv7-artik10-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/artik10
[armv7-artik10-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-golang/
[armv7-artik10-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-golang/tags/manage/
[armv7-artik10-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/artik10
[armv7-artik10-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-python/tags/manage/
[armv7-artik10-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-alpine/
[armv7-artik10-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-buildpack-deps/
[armv7-artik10-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-node/
[armv7-artik10-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-node/tags/manage/
[armv7-artik10-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-python/
[armv7-artik10-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-python/tags/manage/
[armv7-artik10-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/artik10
[armv7-artik10-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/artik10
[armv7-artik10-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/artik10
[armv7-artik10-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/artik10
[armv7-artik10-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-golang/
[armv7-artik10-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/artik10-alpine-golang/tags/manage/
[armv7-artik10-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/artik10

[i386-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-systemd/
[i386-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/i386
[i386-edison-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-debian/
[i386-edison-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-buildpack-deps/
[i386-edison-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-node/
[i386-edison-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-node/tags/manage/
[i386-edison-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-python/
[i386-edison-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/edison
[i386-edison-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/edison
[i386-edison-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/edison
[i386-edison-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/edison
[i386-edison-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-golang/
[i386-edison-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-golang/tags/manage/
[i386-edison-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/edison
[i386-edison-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-python/tags/manage/
[i386-edison-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-alpine/
[i386-edison-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-alpine-buildpack-deps/
[i386-edison-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-alpine-node/
[i386-edison-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-alpine-node/tags/manage/
[i386-edison-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-alpine-python/
[i386-edison-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-alpine-python/tags/manage/
[i386-edison-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/edison
[i386-edison-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/edison
[i386-edison-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/edison
[i386-edison-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/edison
[i386-edison-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-alpine-golang/
[i386-edison-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-alpine-golang/tags/manage/
[i386-edison-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/edison

[amd64-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/amd64-systemd/
[amd64-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/amd64
[amd64-nuc-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-debian/
[amd64-nuc-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-buildpack-deps/
[amd64-nuc-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-node/
[amd64-nuc-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-node/tags/manage/
[amd64-nuc-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-python/
[amd64-nuc-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/nuc
[amd64-nuc-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/nuc
[amd64-nuc-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/nuc
[amd64-nuc-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/nuc
[amd64-nuc-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-golang/
[amd64-nuc-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-golang/tags/manage/
[amd64-nuc-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/nuc
[amd64-nuc-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-python/tags/manage/
[amd64-nuc-alpine-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-alpine/
[amd64-nuc-alpine-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-buildpack-deps/
[amd64-nuc-alpine-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-node/
[amd64-nuc-alpine-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-node/tags/manage/
[amd64-nuc-alpine-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-python/
[amd64-nuc-alpine-python-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-python/tags/manage/
[amd64-nuc-alpine-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/nuc
[amd64-nuc-alpine-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/nuc
[amd64-nuc-alpine-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/nuc
[amd64-nuc-alpine-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/nuc
[amd64-nuc-alpine-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-golang/
[amd64-nuc-alpine-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-alpine-golang/tags/manage/
[amd64-nuc-alpine-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/nuc

[armel-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/armel-systemd/
[armel-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/armel
[armel-ts7700-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts7700-debian/
[armel-ts7700-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts7700-buildpack-deps/
[armel-ts7700-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts7700-node/
[armel-ts7700-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts7700-node/tags/manage/
[armel-ts7700-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts7700-python/
[armel-ts7700-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/ts7700
[armel-ts7700-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/ts7700
[armel-ts7700-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/ts7700
[armel-ts7700-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/ts7700
[armel-ts7700-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/ts7700-golang/
[armel-ts7700-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/ts7700-golang/tags/manage/
[armel-ts7700-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/ts7700
