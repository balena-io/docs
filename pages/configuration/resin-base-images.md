# Resin Images Wiki

This page contains all the information about the image maintained on the Resin.io docker hub registry. 

## <a name="image-tree"></a>Resin Image Trees

This section describes the Resin image trees (hierarchy of images). These image trees provide an overview of how all the resin base images fit together for each device type supported by Resin.

__Note:__ In the tree diagram, from the bottom to the top, the lower level image is used as the base docker image to build the upper level one.

### ARMv6: Raspberry Pi 1 (version B, A+ and B+)

![ARMv6 Tree Diagram](/img/armv6-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | The base OS image for ARMv6 devices (Raspberry Pi 1 - RPI1) | minbase, sudo | [dockerhub][rpi-dockerhub-link] | latest, jessie, wheezy |
| resin/raspberrypi-systemd | The image with full systemd init system installed for ARMv6 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][rpi-systemd-dockerhub-link] | latest, jessie, wheezy | 
| resin/raspberrypi-buildpack-deps | The buildpack-deps image for RPI1. Details about buildpack-deps can be found [here](#buildpack-deps) | Refer [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | [dockerhub][rpi-systemd-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi-node | The Node.js buildpack image for Node.js apps for RPI1. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][rpi-systemd-node-dockerhub-link] | For available image tags, refer [here][rpi-systemd-node-dockerhub-tag-link] |
| resin/raspberrypi-python | The Python buildpack image for Python apps for RPI1 | python, python-pip, python-dev, python-dbus  | [dockerhub][rpi-systemd-python-dockerhub-link] | latest, jessie, wheezy |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

__Note:__ all the node slim images use resin/raspberrypi-systemd as the base os.

### ARMv7: Raspberry Pi 2 and BeagleBone Black

![ARMv7 Tree Diagram](/img/armv7-diagram.jpg)

![ARMv7 Device Diagram](/img/armv7-devices.jpg "ARMv7 Device Diagram")

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/armv7hf-debian| The base OS image for ARMv7 devices (Raspberry Pi 2 - RPI2 and BeagleBone Black - BBB) | minbase, sudo | [dockerhub][armv7hf-dockerhub-link] | latest, jessie, wheezy, sid |
| resin/armv7hf-systemd | The image with full systemd init system installed for ARMv7 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][armv7-systemd-dockerhub-link] | latest, jessie, wheezy, sid | 
| resin/beaglebone-debian | The bare bones OS image for BBB. Apt sources.list from repositories: [http://repos.rcn-ee.net/debian/](armv7-bbb-sourceslist) and [http://debian.beagleboard.org](armv7-bbb-sourceslist1) added! See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-bbb-dockerhub-link] | latest, jessie, wheezy |
| resin/beaglebone-buildpack-deps | The buildpack-deps image for BBB. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-bbb-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/beaglebone-node | The Node.js buildpack image for Node.js apps for BBB. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-bbb-node-dockerhub-link] | For available image tags, refer [here][armv7-bbb-node-dockerhub-tag-link] |
| resin/beaglebone-python | The Python buildpack image for Python apps for BBB. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-bbb-python-dockerhub-link] | latest, jessie, wheezy |
| resin/raspberrypi2-debian | The bare bones OS image for RPI2. Apt sources.list from raspbian repository: [http://archive.raspbian.org/raspbian/](armv7-rpi2-sourceslist) added! See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libraspberrypi-bin | [dockerhub][armv7-rpi2-dockerhub-link] | latest, jessie, wheezy |
| resin/raspberrypi2-buildpack-deps | The buildpack-deps image for RPI2. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-rpi2-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/raspberrypi2-node | The Node.js buildpack image for Node.js apps for RPI2. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-rpi2-node-dockerhub-link] | For available image tags, refer [here][armv7-rpi2-node-dockerhub-tag-link] |
| resin/raspberrypi2-python | The Python buildpack image for Python apps for RPI2. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-rpi2-python-dockerhub-link] | latest, jessie, wheezy |
| resin/zc702-zynq7-debian | The bare bones OS image for ZYNQ ZC702. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-zc702-zynq7-dockerhub-link] | latest, jessie, wheezy |
| resin/zc702-zynq7-buildpack-deps | The buildpack-deps image for ZYNQ ZC702. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-zc702-zynq7-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/zc702-zynq7-node | The Node.js buildpack image for Node.js apps for ZYNQ ZC702. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-zc702-zynq7-node-dockerhub-link] | For available image tags, refer [here][armv7-zc702-zynq7-node-dockerhub-tag-link] |
| resin/zc702-zynq7-python | The Python buildpack image for Python apps for ZYNQ ZC702. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-zc702-zynq7-python-dockerhub-link] | latest, jessie, wheezy |
| resin/vab820-quad-debian | The bare bones OS image for VIA VAB 820-quad. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-vab820-quad-dockerhub-link] | latest, jessie, wheezy |
| resin/vab820-quad-buildpack-deps | The buildpack-deps image for VIA VAB 820-quad. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-vab820-quad-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/vab820-quad-node | The Node.js buildpack image for Node.js apps for VIA VAB 820-quad. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-vab820-quad-node-dockerhub-link] | For available image tags, refer [here][armv7-vab820-quad-node-dockerhub-tag-link] |
| resin/zvab820-quad-python | The Python buildpack image for Python apps for VIA VAB 820-quad. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-vab820-quad-python-dockerhub-link] | latest, jessie, wheezy |
| resin/odroid-ux3-debian | The bare bones OS image for ODROID-XU4. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-odroid-ux3-dockerhub-link] | latest, jessie, wheezy |
| resin/odroid-ux3-buildpack-deps | The buildpack-deps image for ODROID-XU4. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-odroid-ux3-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-ux3-node | The Node.js buildpack image for Node.js apps for ODROID-XU4. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-odroid-ux3-node-dockerhub-link] | For available image tags, refer [here][armv7-odroid-ux3-node-dockerhub-tag-link] |
| resin/odroid-ux3-python | The Python buildpack image for Python apps for ODROID-XU4. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-odroid-ux3-python-dockerhub-link] | latest, jessie, wheezy |
| resin/odroid-c1-debian | The bare bones OS image for ODROID-C1+. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-odroid-c1-dockerhub-link] | latest, jessie, wheezy |
| resin/odroid-c1-buildpack-deps | The buildpack-deps image for ODROID-C1+. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-odroid-c1-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/odroid-c1-node | The Node.js buildpack image for Node.js apps for ODROID-C1+. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-odroid-c1-node-dockerhub-link] | For available image tags, refer [here][armv7-odroid-c1-node-dockerhub-tag-link] |
| resin/odroid-c1-python | The Python buildpack image for Python apps for ODROID-C1+. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-odroid-c1-python-dockerhub-link] | latest, jessie, wheezy |
| resin/cubox-i-debian | The bare bones OS image for Hummingboard. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-cubox-i-dockerhub-link] | latest, jessie, wheezy |
| resin/cubox-i-buildpack-deps | The buildpack-deps image for Hummingboard. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-cubox-i-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/cubox-i-node | The Node.js buildpack image for Node.js apps for Hummingboard. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-cubox-i-node-dockerhub-link] | For available image tags, refer [here][armv7-cubox-i-node-dockerhub-tag-link] |
| resin/odroid-c1-python | The Python buildpack image for Python apps for Hummingboard. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-cubox-i-python-dockerhub-link] | latest, jessie, wheezy |
| resin/nitrogen6x-debian | The bare bones OS image for Nitrogen 6X. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-nitrogen6x-dockerhub-link] | latest, jessie, wheezy |
| resin/nitrogen6x-buildpack-deps | The buildpack-deps image for Nitrogen 6X. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-nitrogen6x-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nitrogen6x-node | The Node.js buildpack image for Node.js apps for Nitrogen 6X. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-nitrogen6x-node-dockerhub-link] | For available image tags, refer [here][armv7-nitrogen6x-node-dockerhub-tag-link] |
| resin/nitrogen6x-python | The Python buildpack image for Python apps for Nitrogen 6X. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-nitrogen6x-python-dockerhub-link] | latest, jessie, wheezy |
| resin/parallella-hdmi-resin-debian | The bare bones OS image for Parallella. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools | [dockerhub][armv7-parallella-hdmi-resin-dockerhub-link] | latest, jessie, wheezy |
| resin/parallella-hdmi-resin-buildpack-deps | The buildpack-deps image for Parallella. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][armv7-parallella-hdmi-resin-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/parallella-hdmi-resin-node | The Node.js buildpack image for Node.js apps for Parallella. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][armv7-parallella-hdmi-resin-node-dockerhub-link] | For available image tags, refer [here][armv7-parallella-hdmi-resin-node-dockerhub-tag-link] |
| resin/parallella-hdmi-resin-python | The Python buildpack image for Python apps for Parallella. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][armv7-parallella-hdmi-resin-python-dockerhub-link] | latest, jessie, wheezy |


### i386: Intel Edison

![i386 Tree Diagram](/img/i386-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/i386-debian| The base OS image for i386 devices (Intel Edison) | minbase, sudo | [dockerhub][i386-dockerhub-link] | latest, jessie, wheezy |
| resin/i386-systemd | The image with full systemd init system installed for i386 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][i386-systemd-dockerhub-link] | latest, jessie, wheezy | 
| resin/edison-debian | The bare bones OS image for Intel Edison. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][i386-edison-dockerhub-link] | latest, jessie, wheezy |
| resin/edison-buildpack-deps | The buildpack-deps image for Intel Edison. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][i386-edison-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/edison-node | The Node.js buildpack image for Node.js apps for Intel Edison. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][i386-edison-node-dockerhub-link] | For available image tags, refer [here][i386-edison-node-dockerhub-tag-link] |
| resin/edison-python | The Python buildpack image for Python apps for Intel Edison. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][i386-edison-python-dockerhub-link] | latest, jessie, wheezy |

### amd64: Intel NUC

![amd64 Tree Diagram](/img/amd64-diagram.jpg)

| Image | Description | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/amd64-debian| The base OS image for amd64 devices (Intel NUC) | minbase, sudo | [dockerhub][amd64-dockerhub-link] | latest, jessie, wheezy |
| resin/amd64-systemd | The image with full systemd init system installed for amd64 devices. See our [tips](#tips) section on how to enable systemd in your image. | systemd | [dockerhub][amd64-systemd-dockerhub-link] | latest, jessie, wheezy | 
| resin/nuc-debian | The bare bones OS image for Intel NUC. See our [tips](#tips) section on how to enable systemd in your image. | usbutils, net-tools, iputils-ping, module-init-tools, less, nano, i2c-tools, libmraa | [dockerhub][amd64-nuc-dockerhub-link] | latest, jessie, wheezy |
| resin/nuc-buildpack-deps | The buildpack-deps image for Intel NUC. Details about buildpack-deps can be found [here](#buildpack-deps). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#buildpack-deps) | [dockerhub][amd64-nuc-buildpack-deps-dockerhub-link] | latest, jessie, wheezy, sid, jessie-scm, wheezy-scm, jessie-curl, wheezy-curl |
| resin/nuc-node | The Node.js buildpack image for Node.js apps for Intel NUC. Details about the Node.js image can be found [here](#node). See our [tips](#tips) section on how to enable systemd in your image. | Refer [here](#node) | [dockerhub][amd64-nuc-node-dockerhub-link] | For available image tags, refer [here][amd64-nuc-node-dockerhub-tag-link] |
| resin/nuc-python | The Python buildpack image for Python apps for Intel NUC. See our [tips](#tips) section on how to enable systemd in your image. | python, python-pip, python-dev, python-dbus  | [dockerhub][amd64-nuc-python-dockerhub-link] | latest, jessie, wheezy |

#### <a name="tips"></a>Tips

* The `latest` tag points to jessie images. 
* For those images with systemd init system installed, the systemd init system is disabled by default. It can be enabled by adding `ENV INITSYSTEM on` to your Dockerfile below the `FROM <Docker image>` line. This will trigger systemd init system on the Docker image.
* `systemd was included in Debian wheezy as a technology preview. Please make sure that you are using Debian testing or newer to get a recent version of systemd.` from [Systemd Debian Wiki Page][systemd-wiki]. Therefore, we do not install systemd on wheezy images. `ENV INITSYSTEM` will only work on jessie and sid images.

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

[rpi-systemd-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-buildpack-deps/
[rpi-systemd-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/
[rpi-systemd-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi-node/tags/manage/
[rpi-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-systemd/
[rpi-systemd-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi-python/

[armv7-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-systemd/
[armv7-bbb-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-debian/
[armv7-bbb-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-buildpack-deps/
[armv7-bbb-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/
[armv7-bbb-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/beaglebone-node/tags/manage/
[armv7-bbb-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/beaglebone-python/
[armv7-bbb-sourceslist]:http://repos.rcn-ee.net/debian/
[armv7-bbb-sourceslist1]:http://debian.beagleboard.org/
[armv7-rpi2-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-debian/
[armv7-rpi2-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-buildpack-deps/
[armv7-rpi2-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/
[armv7-rpi2-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-node/tags/manage/
[armv7-rpi2-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/raspberrypi2-python/
[armv7-rpi2-sourceslist]:http://archive.raspbian.org/raspbian/
[armv7-zc702-zynq7-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-debian/
[armv7-zc702-zynq7-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-buildpack-deps/
[armv7-zc702-zynq7-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-node/
[armv7-zc702-zynq7-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-node/tags/manage/
[armv7-zc702-zynq7-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/zc702-zynq7-python/
[armv7-vab820-quad-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-debian/
[armv7-vab820-quad-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-buildpack-deps/
[armv7-vab820-quad-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-node/
[armv7-vab820-quad-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/vab820-quad-node/tags/manage/
[armv7-vab820-quad-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/vab820-quad-python/
[armv7-odroid-ux3-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-debian/
[armv7-odroid-ux3-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-buildpack-deps/
[armv7-odroid-ux3-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-node/
[armv7-odroid-ux3-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-node/tags/manage/
[armv7-odroid-ux3-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-ux3-python/
[armv7-odroid-c1-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-debian/
[armv7-odroid-c1-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-buildpack-deps/
[armv7-odroid-c1-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-node/
[armv7-odroid-c1-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/odroid-c1-node/tags/manage/
[armv7-odroid-c1-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/odroid-c1-python/
[armv7-cubox-i-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-debian/
[armv7-cubox-i-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-buildpack-deps/
[armv7-cubox-i-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-node/
[armv7-cubox-i-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/cubox-i-node/tags/manage/
[armv7-cubox-i-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/cubox-i-python/
[armv7-nitrogen6x-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-debian/
[armv7-nitrogen6x-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-buildpack-deps/
[armv7-nitrogen6x-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-node/
[armv7-nitrogen6x-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-node/tags/manage/
[armv7-nitrogen6x-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nitrogen6x-python/
[armv7-parallella-hdmi-resin-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-debian/
[armv7-parallella-hdmi-resin-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-buildpack-deps/
[armv7-parallella-hdmi-resin-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-node/
[armv7-parallella-hdmi-resin-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-node/tags/manage/
[armv7-parallella-hdmi-resin-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/parallella-hdmi-resin-python/

[i386-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-systemd/
[i386-edison-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-debian/
[i386-edison-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-buildpack-deps/
[i386-edison-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-node/
[i386-edison-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/edison-node/tags/manage/
[i386-edison-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/edison-python/

[amd64-systemd-dockerhub-link]:https://registry.hub.docker.com/u/resin/amd64-systemd/
[amd64-nuc-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-debian/
[amd64-nuc-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-buildpack-deps/
[amd64-nuc-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-node/
[amd64-nuc-node-dockerhub-tag-link]:https://registry.hub.docker.com/u/resin/nuc-node/tags/manage/
[amd64-nuc-python-dockerhub-link]:https://registry.hub.docker.com/u/resin/nuc-python/
