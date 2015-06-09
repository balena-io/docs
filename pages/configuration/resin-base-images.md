# Resin Images Wiki

This wiki page contains all information about images on Resin registry.

## <a name="base-images"></a>Base Images:

These are base images for different arch: armv6, armv7, i386.

| Image | Arch | Installed Packages | Repository | Available Tag|
|:-----------|:------------|:------------|:------------|:------------|
| resin/rpi-raspbian | armv6 | minbase, sudo | [dockerhub][rpi-dockerhub-link] | latest, jessie, wheezy |
| resin/armv7hf-debian | armv7 | minbase, sudo | [dockerhub][armv7hf-dockerhub-link] | latest, jessie, wheezy, sid | 
| resin/i386-debian | i386 | minbase, sudo | [dockerhub][i386-dockerhub-link] | latest, jessie, wheezy |

__Note:__ minbase is a variant of image built by debootstrap which means only essential packages and apt installed.

Detail of installed packages on each image are listed at the end.

## Resin-io-library Images:

### <a name="buildpack-deps"></a>buildpack-deps

A collection of common build dependencies used for installing various modules, e.g., gems. it has 2 variants which are:

* **curl**: This variant includes just the curl, wget, and ca-certificates packages. This is perfect for cases like the Java JRE, where downloading JARs is very common and necessary, but checking out code isn't.
* **scm**: This variant is based on curl, but also adds various source control management tools. As of this writing, the current list of included tools is bzr, git, hg, and svn. Intentionally missing is cvs due to the dwindling relevance it has (sorry CVS). This image is perfect for cases like the Java JDK, where downloading JARs is very common (hence the curl base still), but checking out code also becomes more common as well (compared to the JRE).

There are specific buildpack-deps images for each arch:

* armv6: [resin/rpi-buildpack-deps][rpi-buildpack-deps-dockerhub-link]
* armv7: [resin/armv7hf-buildpack-deps][armv7hf-buildpack-deps-dockerhub-link]
* i386: [resin/i386-buildpack-deps][i386-buildpack-deps-dockerhub-link]

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

There are specific docker-node images for each arch. Available node versions can be found in the repository below

* armv6: [resin/rpi-node][rpi-node-dockerhub-link]
* armv7: [resin/armv7hf-node][armv7hf-node-dockerhub-link]
* i386: [resin/i386-node][i386-node-dockerhub-link]

## Installed Packages in Base Images

| Image | rpi-raspbian | armv7hf-debian | i386-debian |
|:-----------|:------------|:------------|:------------|
| Installed Packages | acl, adduser, apt, base-files, base-passwd, bash, bsdutils, coreutils, cpio, dash, debconf, debconf-i18n, debianutils, diffutils, dmsetup, dpkg, e2fslibs:armhf, e2fsprogs, findutils, gcc-4.6-base:armhf, gcc-4.7-base:armhf, gcc-4.8-base:armhf, gcc-4.9-base:armhf, gnupg, gpgv, grep, gzip, hostname, init, init-system-helpers, initramfs-tools, initscripts, insserv, klibc-utils, kmod, libacl1:armhf, libapt-pkg4.12:armhf, libattr1:armhf, libaudit-common, libaudit1:armhf, libblkid1:armhf, libbz2-1.0:armhf, libc-bin, libc6:armhf, libcap2:armhf, libcap2-bin, libcomerr2:armhf, libcryptsetup4:armhf, libdb5.3:armhf, libdbus-1-3:armhf, libdebconfclient0:armhf, libdevmapper1.02.1:armhf, libdrm2:armhf, libgcc1:armhf, libgcrypt20:armhf, libgpg-error0:armhf, libklibc, libkmod2:armhf, liblocale-gettext-perl, liblzma5:armhf, libmount1:armhf, libncurses5:armhf, libncursesw5:armhf, libnih-dbus1, libnih1, libpam-modules:armhf, libpam-modules-bin, libpam-runtime, libpam0g:armhf, libpcre3:armhf, libpng12-0:armhf, libprocps3:armhf, libreadline6:armhf, libselinux1:armhf, libsemanage-common, libsemanage1:armhf, libsepol1:armhf, libslang2:armhf, libsmartcols1:armhf, libss2:armhf, libstdc++6:armhf, libsystemd0:armhf, libtext-charwidth-perl, libtext-iconv-perl, libtext-wrapi18n-perl, libtinfo5:armhf, libudev1:armhf, libusb-0.1-4:armhf, libustr-1.0-1:armhf, libuuid1:armhf, login, lsb-base, makedev, mawk, mount, mountall, multiarch-support, ncurses-base, ncurses-bin, passwd, perl-base, plymouth, procps, raspbian-archive-keyring, readline-common, sed, sensible-utils, startpar, sudo, systemd, systemd-sysv, sysv-rc, sysvinit-utils, tar, tzdata, udev, util-linux, xz-utils, zlib1g:armhf | acl, adduser, apt, base-files, base-passwd, bash, bsdutils, coreutils, dash, debconf, debconf-i18n, debian-archive-keyring, debianutils, diffutils, dmsetup, dpkg, e2fslibs:armhf, e2fsprogs, findutils, gcc-4.8-base:armhf, gcc-4.9-base:armhf, gnupg, gpgv, grep, gzip, hostname, init, initscripts, insserv, libacl1:armhf, libapt-pkg4.12:armhf, libattr1:armhf, libaudit-common, libaudit1:armhf, libblkid1:armhf, libbz2-1.0:armhf, libc-bin, libc6:armhf, libcap2:armhf, libcap2-bin, libcomerr2:armhf, libcryptsetup4:armhf, libdb5.3:armhf, libdebconfclient0:armhf, libdevmapper1.02.1:armhf, libgcc1:armhf, libgcrypt20:armhf, libgpg-error0:armhf, libkmod2:armhf, liblocale-gettext-perl, liblzma5:armhf, libmount1:armhf, libncurses5:armhf, libncursesw5:armhf, libpam-modules:armhf, libpam-modules-bin, libpam-runtime, libpam0g:armhf, libpcre3:armhf, libprocps3:armhf, libreadline6:armhf, libselinux1:armhf, libsemanage-common, libsemanage1:armhf, libsepol1:armhf, libslang2:armhf, libsmartcols1:armhf, libss2:armhf, libstdc++6:armhf, libsystemd0:armhf, libtext-charwidth-perl, libtext-iconv-perl, libtext-wrapi18n-perl, libtinfo5:armhf, libudev1:armhf, libusb-0.1-4:armhf, libustr-1.0-1:armhf, libuuid1:armhf, login, lsb-base, mawk, mount, multiarch-support, ncurses-base, ncurses-bin, passwd, perl-base, procps, readline-common, sed, sensible-utils, startpar, sudo, systemd, systemd-sysv, sysv-rc, sysvinit-utils, tar, tzdata, udev, util-linux, zlib1g:armhf | acl, adduser, apt, base-files, base-passwd, bash, bsdutils, coreutils, dash, debconf, debconf-i18n, debian-archive-keyring, debianutils, diffutils, dmsetup, dpkg, e2fslibs:i386, e2fsprogs, findutils, gcc-4.8-base:i386, gcc-4.9-base:i386, gnupg, gpgv, grep, gzip, hostname, init, initscripts, insserv, libacl1:i386, libapt-pkg4.12:i386, libattr1:i386, libaudit-common, libaudit1:i386, libblkid1:i386, libbz2-1.0:i386, libc-bin, libc6:i386, libcap2:i386, libcap2-bin, libcomerr2:i386, libcryptsetup4:i386, libdb5.3:i386, libdebconfclient0:i386, libdevmapper1.02.1:i386, libgcc1:i386, libgcrypt20:i386, libgpg-error0:i386, libkmod2:i386, liblocale-gettext-perl, liblzma5:i386, libmount1:i386, libncurses5:i386, libncursesw5:i386, libpam-modules:i386, libpam-modules-bin, libpam-runtime, libpam0g:i386, libpcre3:i386, libprocps3:i386, libreadline6:i386, libselinux1:i386, libsemanage-common, libsemanage1:i386, libsepol1:i386, libslang2:i386, libsmartcols1:i386, libss2:i386, libstdc++6:i386, libsystemd0:i386, libtext-charwidth-perl, libtext-iconv-perl, libtext-wrapi18n-perl, libtinfo5:i386, libudev1:i386, libusb-0.1-4:i386, libustr-1.0-1:i386, libuuid1:i386, login, lsb-base, mawk, mount, multiarch-support, ncurses-base, ncurses-bin, passwd, perl-base, procps, readline-common, sed, sensible-utils, startpar, sudo, systemd, systemd-sysv, sysv-rc, sysvinit-utils, tar, tzdata, udev, util-linux, zlib1g:i386 |

[rpi-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-raspbian/
[armv7hf-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-debian/
[i386-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-debian/
[rpi-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-buildpack-deps/
[armv7hf-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-buildpack-deps/
[i386-buildpack-deps-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-buildpack-deps/
[rpi-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/rpi-node/
[armv7hf-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/armv7hf-node/
[i386-node-dockerhub-link]:https://registry.hub.docker.com/u/resin/i386-node/
