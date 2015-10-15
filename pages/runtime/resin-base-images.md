# Resin Images Wiki

This page contains all the information about the image maintained on the Resin.io docker hub registry. 

## <a name="image-tree"></a>Resin Image Trees

This section describes the Resin image trees (hierarchy of images). These image trees provide an overview of how all the resin base images fit together for each device type supported by Resin.

Repository for all images: refer [here][base-repository].

__Note:__ In the tree diagram, from the bottom to the top, the lower level image is used as the base docker image to build the upper level one.

### ARMv6: Raspberry Pi 1 (version B, A+ and B+)

![ARMv6 Tree Diagram](/img/armv6-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | The base OS image for ARMv6 devices (Raspberry Pi 1 - RPI1) | minbase, sudo | [dockerhub][rpi-dockerhub-link], [github][rpi-github-link] | latest, jessie, wheezy |
| resin/raspberrypi-systemd | The image with full systemd init system installed for ARMv6 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][rpi-systemd-dockerhub-link], [github][rpi-systemd-github-link] | latest, jessie, wheezy | 
| resin/raspberrypi-buildpack-deps | The buildpack-deps image for RPI1. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | [dockerhub][rpi-systemd-buildpack-deps-dockerhub-link], [github][rpi-systemd-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi-node | The Node.js buildpack image for Node.js apps for RPI1. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][rpi-systemd-node-dockerhub-link], [github][rpi-systemd-node-github-link] | For available image tags, refer [here][rpi-systemd-node-dockerhub-tag-link] |
| resin/raspberrypi-python | The Python buildpack image for Python apps for RPI1 | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][rpi-systemd-python-dockerhub-link], [github][rpi-systemd-python-github-link] | latest, jessie, wheezy |
| resin/raspberrypi-golang | The Go buildpack image for Go apps for RPI1. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][rpi-systemd-golang-dockerhub-link], [github][rpi-systemd-golang-github-link] | For available image tags, refer [here][rpi-systemd-golang-dockerhub-tag-link] |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

__Note:__ all the node slim images use resin/raspberrypi-systemd as the base os.

### ARMv7: Raspberry Pi 2 and BeagleBone Black

![ARMv7 Tree Diagram](/img/armv7-diagram.jpg)

![ARMv7 Device Diagram](/img/armv7-devices.jpg "ARMv7 Device Diagram")

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/armv7hf-debian| The base OS image for ARMv7 devices (Raspberry Pi 2 - RPI2 and BeagleBone Black - BBB) | minbase, sudo | [dockerhub][armv7hf-dockerhub-link], [github][armv7hf-github-link] | latest, jessie, wheezy, sid |
| resin/armv7hf-systemd | The image with full systemd init system installed for ARMv7 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][armv7-systemd-dockerhub-link], [github][armv7-systemd-github-link] | latest, jessie, wheezy, sid | 
| resin/beaglebone-debian | The bare bones OS image for BBB. Apt sources.list from repositories: [http://repos.rcn-ee.net/debian/](armv7-bbb-sourceslist) and [http://debian.beagleboard.org](armv7-bbb-sourceslist1) added! See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-bbb-dockerhub-link], [github][armv7-bbb-github-link] | latest, jessie, wheezy |
| resin/beaglebone-buildpack-deps | The buildpack-deps image for BBB. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-bbb-buildpack-deps-dockerhub-link], [github][armv7-bbb-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/beaglebone-node | The Node.js buildpack image for Node.js apps for BBB. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-bbb-node-dockerhub-link], [github][armv7-bbb-node-github-link] | For available image tags, refer [here][armv7-bbb-node-dockerhub-tag-link] |
| resin/beaglebone-python | The Python buildpack image for Python apps for BBB. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-bbb-python-dockerhub-link], [github][armv7-bbb-python-github-link] | latest, jessie, wheezy |
| resin/beaglebone-golang | The Go buildpack image for Go apps for BBB. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-bbb-golang-dockerhub-link], [github][armv7-bbb-golang-github-link] | For available image tags, refer [here][armv7-bbb-golang-dockerhub-tag-link] |
| resin/raspberrypi2-debian | The bare bones OS image for RPI2. Apt sources.list from raspbian repository: [http://archive.raspbian.org/raspbian/](armv7-rpi2-sourceslist) added! See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libraspberrypi-bin | [dockerhub][armv7-rpi2-dockerhub-link], [github][armv7-rpi2-github-link] | latest, jessie, wheezy |
| resin/raspberrypi2-buildpack-deps | The buildpack-deps image for RPI2. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-rpi2-buildpack-deps-dockerhub-link], [github][armv7-rpi2-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi2-node | The Node.js buildpack image for Node.js apps for RPI2. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-rpi2-node-dockerhub-link], [github][armv7-rpi2-node-github-link] | For available image tags, refer [here][armv7-rpi2-node-dockerhub-tag-link] |
| resin/raspberrypi2-python | The Python buildpack image for Python apps for RPI2. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-rpi2-python-dockerhub-link], [github][armv7-rpi2-python-github-link] | latest, jessie, wheezy |
| resin/raspberrypi2-golang | The Go buildpack image for Go apps for RPI2. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-rpi2-golang-dockerhub-link], [github][armv7-rpi2-golang-github-link] | For available image tags, refer [here][armv7-rpi2-golang-dockerhub-tag-link] |
| resin/zc702-zynq7-debian | The bare bones OS image for ZYNQ ZC702. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-zc702-zynq7-dockerhub-link], [github][armv7-zc702-zynq7-github-link] | latest, jessie, wheezy |
| resin/zc702-zynq7-buildpack-deps | The buildpack-deps image for ZYNQ ZC702. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-zc702-zynq7-buildpack-deps-dockerhub-link], [github][armv7-zc702-zynq7-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/zc702-zynq7-node | The Node.js buildpack image for Node.js apps for ZYNQ ZC702. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-zc702-zynq7-node-dockerhub-link], [github][armv7-zc702-zynq7-node-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-node-dockerhub-tag-link] |
| resin/zc702-zynq7-python | The Python buildpack image for Python apps for ZYNQ ZC702. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-zc702-zynq7-python-dockerhub-link], [github][armv7-zc702-zynq7-python-github-link] | latest, jessie, wheezy |
| resin/zc702-zynq7-golang | The Go buildpack image for Go apps for ZYNQ ZC702. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-zc702-zynq7-golang-dockerhub-link], [github][armv7-zc702-zynq7-golang-github-link] | For available image tags, refer [here][armv7-zc702-zynq7-golang-dockerhub-tag-link] |
| resin/vab820-quad-debian | The bare bones OS image for VIA VAB 820-quad. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-vab820-quad-dockerhub-link], [github][armv7-vab820-quad-github-link] | latest, jessie, wheezy |
| resin/vab820-quad-buildpack-deps | The buildpack-deps image for VIA VAB 820-quad. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-vab820-quad-buildpack-deps-dockerhub-link], [github][armv7-vab820-quad-buildpack-deps-github-link]  | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/vab820-quad-node | The Node.js buildpack image for Node.js apps for VIA VAB 820-quad. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-vab820-quad-node-dockerhub-link], [github][armv7-vab820-quad-node-github-link]  | For available image tags, refer [here][armv7-vab820-quad-node-dockerhub-tag-link] |
| resin/vab820-quad-python | The Python buildpack image for Python apps for VIA VAB 820-quad. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-vab820-quad-python-dockerhub-link], [github][armv7-vab820-quad-python-github-link]  | latest, jessie, wheezy |
| resin/vab820-quad-golang | The Go buildpack image for Go apps for VIA VAB 820-quad. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-vab820-quad-golang-dockerhub-link], [github][armv7-vab820-quad-golang-github-link] | For available image tags, refer [here][armv7-vab820-quad-golang-dockerhub-tag-link] |
| resin/odroid-ux3-debian | The bare bones OS image for ODROID-XU4. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-odroid-ux3-dockerhub-link], [github][armv7-odroid-ux3-github-link]  | latest, jessie, wheezy |
| resin/odroid-ux3-buildpack-deps | The buildpack-deps image for ODROID-XU4. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-odroid-ux3-buildpack-deps-dockerhub-link], [github][armv7-odroid-ux3-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-ux3-node | The Node.js buildpack image for Node.js apps for ODROID-XU4. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-odroid-ux3-node-dockerhub-link], [github][armv7-odroid-ux3-node-github-link] | For available image tags, refer [here][armv7-odroid-ux3-node-dockerhub-tag-link] |
| resin/odroid-ux3-python | The Python buildpack image for Python apps for ODROID-XU4. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-odroid-ux3-python-dockerhub-link], [github][armv7-odroid-ux3-python-github-link] | latest, jessie, wheezy |
| resin/odroid-ux3-golang | The Go buildpack image for Go apps for ODROID-XU4. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-odroid-ux3-golang-dockerhub-link], [github][armv7-odroid-ux3-golang-github-link] | For available image tags, refer [here][armv7-odroid-ux3-golang-dockerhub-tag-link] |
| resin/odroid-c1-debian | The bare bones OS image for ODROID-C1+. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-odroid-c1-dockerhub-link], [github][armv7-odroid-c1-github-link] | latest, jessie, wheezy |
| resin/odroid-c1-buildpack-deps | The buildpack-deps image for ODROID-C1+. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-odroid-c1-buildpack-deps-dockerhub-link], [github][armv7-odroid-c1-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-c1-node | The Node.js buildpack image for Node.js apps for ODROID-C1+. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-odroid-c1-node-dockerhub-link], [github][armv7-odroid-c1-node-github-link] | For available image tags, refer [here][armv7-odroid-c1-node-dockerhub-tag-link] |
| resin/odroid-c1-python | The Python buildpack image for Python apps for ODROID-C1+. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-odroid-c1-python-dockerhub-link], [github][armv7-odroid-c1-python-github-link] | latest, jessie, wheezy |
| resin/odroid-c1-golang | The Go buildpack image for Go apps for ODROID-C1+. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-odroid-c1-golang-dockerhub-link], [github][armv7-odroid-c1-golang-github-link] | For available image tags, refer [here][armv7-odroid-c1-golang-dockerhub-tag-link] |
| resin/cubox-i-debian | The bare bones OS image for Hummingboard. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-cubox-i-dockerhub-link], [github][armv7-cubox-i-github-link] | latest, jessie, wheezy |
| resin/cubox-i-buildpack-deps | The buildpack-deps image for Hummingboard. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-cubox-i-buildpack-deps-dockerhub-link], [github][armv7-cubox-i-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/cubox-i-node | The Node.js buildpack image for Node.js apps for Hummingboard. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-cubox-i-node-dockerhub-link], [github][armv7-cubox-i-node-github-link] | For available image tags, refer [here][armv7-cubox-i-node-dockerhub-tag-link] |
| resin/cubox-i-python | The Python buildpack image for Python apps for Hummingboard. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-cubox-i-python-dockerhub-link], [github][armv7-cubox-i-python-github-link] | latest, jessie, wheezy |
| resin/cubox-i-golang | The Go buildpack image for Go apps for Hummingboard. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-cubox-i-golang-dockerhub-link], [github][armv7-cubox-i-golang-github-link] | For available image tags, refer [here][armv7-cubox-i-golang-dockerhub-tag-link] |
| resin/nitrogen6x-debian | The bare bones OS image for Nitrogen 6X. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-nitrogen6x-dockerhub-link], [github][armv7-nitrogen6x-github-link] | latest, jessie, wheezy |
| resin/nitrogen6x-buildpack-deps | The buildpack-deps image for Nitrogen 6X. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-nitrogen6x-buildpack-deps-dockerhub-link], [github][armv7-nitrogen6x-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nitrogen6x-node | The Node.js buildpack image for Node.js apps for Nitrogen 6X. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-nitrogen6x-node-dockerhub-link], [github][armv7-nitrogen6x-node-github-link] | For available image tags, refer [here][armv7-nitrogen6x-node-dockerhub-tag-link] |
| resin/nitrogen6x-python | The Python buildpack image for Python apps for Nitrogen 6X. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-nitrogen6x-python-dockerhub-link], [github][armv7-nitrogen6x-python-github-link] | latest, jessie, wheezy |
| resin/nitrogen6x-golang | The Go buildpack image for Go apps for Nitrogen 6X. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-nitrogen6x-golang-dockerhub-link], [github][armv7-nitrogen6x-golang-github-link] | For available image tags, refer [here][armv7-nitrogen6x-golang-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-debian | The bare bones OS image for Parallella. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-parallella-hdmi-resin-dockerhub-link], [github][armv7-parallella-hdmi-resin-github-link] | latest, jessie, wheezy |
| resin/parallella-hdmi-resin-buildpack-deps | The buildpack-deps image for Parallella. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-parallella-hdmi-resin-buildpack-deps-dockerhub-link], [github][armv7-parallella-hdmi-resin-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/parallella-hdmi-resin-node | The Node.js buildpack image for Node.js apps for Parallella. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-parallella-hdmi-resin-node-dockerhub-link], [github][armv7-parallella-hdmi-resin-node-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-node-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-python | The Python buildpack image for Python apps for Parallella. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-parallella-hdmi-resin-python-dockerhub-link], [github][armv7-parallella-hdmi-resin-python-github-link] | latest, jessie, wheezy |
| resin/parallella-hdmi-resin-golang | The Go buildpack image for Go apps for Parallella. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-parallella-hdmi-resin-golang-dockerhub-link], [github][armv7-parallella-hdmi-resin-golang-github-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-golang-dockerhub-tag-link] |
| resin/ts4900-debian | The bare bones OS image for Technologic TS-4900. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-ts4900-dockerhub-link], [github][armv7-ts4900-github-link] | latest, jessie, wheezy |
| resin/ts4900-buildpack-deps | The buildpack-deps image for Technologic TS-4900. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-ts4900-buildpack-deps-dockerhub-link], [github][armv7-ts4900-buildpack-deps-github-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/ts4900-node | The Node.js buildpack image for Node.js apps for Technologic TS-4900. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-ts4900-node-dockerhub-link], [github][armv7-ts4900-node-github-link] | For available image tags, refer [here][armv7-ts4900-node-dockerhub-tag-link] |
| resin/ts4900-python | The Python buildpack image for Python apps for Technologic TS-4900. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][armv7-ts4900-python-dockerhub-link], [github][armv7-ts4900-python-github-link] | latest, jessie, wheezy |
| resin/ts4900-golang | The Go buildpack image for Go apps for Technologic TS-4900. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][armv7-ts4900-golang-dockerhub-link], [github][armv7-ts4900-golang-github-link] | For available image tags, refer [here][armv7-ts4900-golang-dockerhub-tag-link] |

### i386: Intel Edison

![i386 Tree Diagram](/img/i386-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/i386-debian| The base OS image for i386 devices (Intel Edison) | minbase, sudo | [dockerhub][i386-dockerhub-link], [github][i386-github-link] | latest, jessie, wheezy |
| resin/i386-systemd | The image with full systemd init system installed for i386 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][i386-systemd-dockerhub-link], [github][i386-systemd-github-link] | latest, jessie, wheezy | 
| resin/edison-debian | The bare bones OS image for Intel Edison. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][i386-edison-dockerhub-link], [github][i386-edison-github-link] | latest, jessie, wheezy |
| resin/edison-buildpack-deps | The buildpack-deps image for Intel Edison. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][i386-edison-buildpack-deps-dockerhub-link], [github][i386-edison-buildpack-deps-github-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/edison-node | The Node.js buildpack image for Node.js apps for Intel Edison. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][i386-edison-node-dockerhub-link], [github][i386-edison-node-github-link] | For available image tags, refer [here][i386-edison-node-dockerhub-tag-link] |
| resin/edison-python | The Python buildpack image for Python apps for Intel Edison. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][i386-edison-python-dockerhub-link], [github][i386-edison-python-github-link] | latest, jessie, wheezy |
| resin/edison-golang | The Go buildpack image for Go apps for Intel Edison. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][i386-edison-golang-dockerhub-link], [github][i386-edison-golang-github-link] | For available image tags, refer [here][i386-edison-golang-dockerhub-tag-link] |

### amd64: Intel NUC

![amd64 Tree Diagram](/img/amd64-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/amd64-debian| The base OS image for amd64 devices (Intel NUC) | minbase, sudo | [dockerhub][amd64-dockerhub-link], [github][amd64-github-link] | latest, jessie, wheezy |
| resin/amd64-systemd | The image with full systemd init system installed for amd64 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][amd64-systemd-dockerhub-link], [github][amd64-systemd-github-link] | latest, jessie, wheezy | 
| resin/nuc-debian | The bare bones OS image for Intel NUC. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][amd64-nuc-dockerhub-link], [github][amd64-nuc-github-link] | latest, jessie, wheezy |
| resin/nuc-buildpack-deps | The buildpack-deps image for Intel NUC. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][amd64-nuc-buildpack-deps-dockerhub-link], [github][amd64-nuc-buildpack-deps-github-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nuc-node | The Node.js buildpack image for Node.js apps for Intel NUC. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][amd64-nuc-node-dockerhub-link], [github][amd64-nuc-node-github-link] | For available image tags, refer [here][amd64-nuc-node-dockerhub-tag-link] |
| resin/nuc-python | The Python buildpack image for Python apps for Intel NUC. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus, python-virtualenv, python-setuptools  | [dockerhub][amd64-nuc-python-dockerhub-link], [github][amd64-nuc-python-github-link] | latest, jessie, wheezy |
| resin/nuc-golang | The Go buildpack image for Go apps for Intel NUC. Details about the Go image can be found [here](#golang) | Refer [here](#golang) | [dockerhub][amd64-nuc-golang-dockerhub-link], [github][amd64-nuc-golang-github-link] | For available image tags, refer [here][amd64-nuc-golang-dockerhub-tag-link] |

#### <a name="tips"></a>Tips

* The `latest` tag points to jessie images. 
* For those images with systemd init system installed, the systemd init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger systemd init system on the Docker image.
* `systemd was included in Debian wheezy as a technology preview. Please make sure that you are using Debian testing or newer to get a recent version of systemd.` from [Systemd Debian Wiki Page][systemd-wiki]. Therefore, we do not install systemd on wheezy images. `ENV INITSYSTEM` will only work on jessie and sid images.
* In case, you have your own systemd service and you want your systemd service to use the environment variables you set in the dashboard. You need to add `EnvironmentFile=/etc/docker.env` to your systemd service unit file.
* We have native ARM builders available to build your application. This is the way we fix all the issues of cross-compilation (ie Go with QEMU). In order to build your application on native ARM servers, you do `git push resin master:master-arm` instead of `git push resin master`. If the build has issue with QEMU, we recommend switching to ARM builders. Just notice this feature is currently experimental.

## <a name="base-images"></a>Base Images:

These are base images for different arch: armv6, armv7, i386, amd64.

| Image | Arch | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | armv6 | [wheezy][installed-pkg-rpi-wheezy], [jessie][installed-pkg-rpi-jessie] | [dockerhub][rpi-dockerhub-link], [github][rpi-github-link] | latest, jessie, wheezy |
| resin/armv7hf-debian | armv7 | [wheezy][installed-pkg-armv7-wheezy], [jessie][installed-pkg-armv7-jessie], [sid][installed-pkg-armv7-sid] | [dockerhub][armv7hf-dockerhub-link], [github][armv7hf-github-link] | latest, jessie, wheezy, sid | 
| resin/i386-debian | i386 | [wheezy][installed-pkg-i386-wheezy], [jessie][installed-pkg-i386-jessie] | [dockerhub][i386-dockerhub-link], [github][i386-github-link] | latest, jessie, wheezy |
| resin/amd64-debian | amd64 | [wheezy][installed-pkg-amd64-wheezy], [jessie][installed-pkg-amd64-jessie] | [dockerhub][amd64-dockerhub-link], [github][amd64-github-link] | latest, jessie, wheezy |

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
[rpi-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-raspbian/
[armv7hf-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-debian/
[i386-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-debian/
[rpi-github-link]:https://github.com/resin-io-library/resin-rpi-raspbian/
[armv7hf-github-link]:https://github.com/resin-io-library/resin-armhfv7-debian/
[i386-github-link]:https://github.com/resin-io-library/resin-i386-debian/
[amd64-github-link]:https://github.com/resin-io-library/resin-amd64-debian/
[amd64-dockerhub-link]:https://registry.hub.docker.com/u/resin/amd64-debian/

[installed-pkg-rpi-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/rpi-raspbian/wheezy/wheezy
[installed-pkg-rpi-jessie]:https://resin-packages.s3.amazonaws.com/image_info/rpi-raspbian/jessie/jessie
[installed-pkg-armv7-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/wheezy/wheezy
[installed-pkg-armv7-jessie]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/jessie/jessie
[installed-pkg-armv7-sid]:https://resin-packages.s3.amazonaws.com/image_info/armv7hf-debian/sid/sid
[installed-pkg-i386-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/i386-debian/wheezy/wheezy
[installed-pkg-i386-jessie]:https://resin-packages.s3.amazonaws.com/image_info/i386-debian/jessie/jessie
[installed-pkg-amd64-wheezy]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/wheezy/wheezy
[installed-pkg-amd64-jessie]:https://resin-packages.s3.amazonaws.com/image_info/amd64-debian/jessie/jessie

[systemd-wiki]:https://wiki.debian.org/systemd
[golang-wiki]:https://en.wikipedia.org/wiki/Go_%28programming_language%29

[rpi-systemd-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-buildpack-deps/
[rpi-systemd-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/
[rpi-systemd-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/tags/manage/
[rpi-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-systemd/
[rpi-systemd-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-python/
[rpi-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/rpi
[rpi-systemd-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi
[rpi-systemd-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi
[rpi-systemd-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi
[rpi-systemd-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-golang/
[rpi-systemd-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-golang/tags/manage/
[rpi-systemd-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi

[armv7-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-systemd/
[armv7-systemd-github-link]:https://github.com/resin-io-library/base-images/tree/master/systemd/armv7hf
[armv7-bbb-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-debian/
[armv7-bbb-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-buildpack-deps/
[armv7-bbb-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/
[armv7-bbb-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/tags/manage/
[armv7-bbb-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-python/
[armv7-bbb-sourceslist]:http://repos.rcn-ee.net/debian/
[armv7-bbb-sourceslist1]:http://debian.beagleboard.org/
[armv7-bbb-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/beaglebone
[armv7-bbb-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/beaglebone
[armv7-bbb-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/beaglebone
[armv7-bbb-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/beaglebone
[armv7-bbb-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-golang/
[armv7-bbb-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-golang/tags/manage/
[armv7-bbb-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/beaglebone
[armv7-rpi2-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-debian/
[armv7-rpi2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-buildpack-deps/
[armv7-rpi2-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/
[armv7-rpi2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/tags/manage/
[armv7-rpi2-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-python/
[armv7-rpi2-sourceslist]:http://archive.raspbian.org/raspbian/
[armv7-rpi2-github-link]:https://github.com/resin-io-library/base-images/tree/master/device-base/raspberrypi2
[armv7-rpi2-buildpack-deps-github-link]:https://github.com/resin-io-library/base-images/tree/master/buildpack-deps/raspberrypi2
[armv7-rpi2-node-github-link]:https://github.com/resin-io-library/base-images/tree/master/node/raspberrypi2
[armv7-rpi2-python-github-link]:https://github.com/resin-io-library/base-images/tree/master/python/raspberrypi2
[armv7-rpi2-golang-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-golang/
[armv7-rpi2-golang-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-golang/tags/manage/
[armv7-rpi2-golang-github-link]:https://github.com/resin-io-library/base-images/tree/master/golang/raspberrypi2
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
