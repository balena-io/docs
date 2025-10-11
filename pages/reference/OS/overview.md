---
title: What is {{ $names.os.lower }}?

---

# What is {{ $names.os.lower }}?

## Introduction

{{ $names.os.upper }} is an operating system optimized for running [Docker][Docker] containers on embedded devices, with an emphasis on reliability over long periods of operation, as well as a productive developer workflow inspired by the lessons learned while building {{ $names.company.lower }}.

The core insight behind {{ $names.os.lower }} is that Linux containers offer, for the first time, a practical path to using virtualization on embedded devices. VMs and hypervisors have lead to huge leaps in productivity and automation for cloud deployments, but their abstraction of hardware, as well as their resource overhead and lack of hardware support, means that they are not suitable for embedded scenarios. With OS-level virtualization, as implemented for Linux containers, both those objections are lifted for Linux devices, of which there are many in the Internet of Things.

{{ $names.os.upper }} is an operating system built for easy portability to multiple device types (via the [Yocto framework][yocto] and optimized for Linux containers, and Docker in particular. There are many decisions, large and small, we have made to enable that vision, which are present throughout our architecture.

The first version of {{ $names.os.lower }} was developed as part of the {{ $names.company.lower }} platform, and has run on thousands of embedded devices on {{ $names.company.lower }}, deployed in many different contexts for several years. {{ $names.os.lower }} v2 represents the combination of the learnings we extracted over those years, as well as our determination to make {{ $names.os.lower }} a first-class open source project, able to run as an independent operating system, for any context where embedded devices and containers intersect.

We look forward to working with the community to grow and mature {{ $names.os.lower }} into an operating system with even broader device support, a broader operating envelope, and as always, taking advantage of the most modern developments in security and reliability.

### Development vs. Production mode

{{ $names.os.lower }} can be downloaded in production or development mode. This can be later changed via [developmentMode][config-json-developmentmode].

Development mode is recommended while getting started with {{ $names.os.lower }} and building an application using the fast [local mode][local-mode] workflow. Development mode enables a number of useful features while developing, namely:

* Passwordless [SSH access][ssh-host] into {{ $names.os.lower }} on port `22222` as the root user, unless custom [ssh keys][config-json-ssh] are provided in which case key-based authentication is used.
* Docker socket exposed on port `2375`, which allows `{{ $names.company.lower }} push` / `build` / `deploy`, that enables remote Docker builds on the target device (see [Deploy to your Fleet][deploy-to-fleet]).
* Getty console attached to tty1 and serial.
* Capable of entering [local mode][local-mode] for rapid development of application containers locally.

__Note:__ Raspberry Pi devices don’t have Getty attached to serial by default, but they can be configured to enable serial in the {{ $names.cloud.lower }} Dashboard via [configuration variables][supervisor-configuration-list].

__Warning:__ Development mode has an exposed Docker socket and enable passwordless root SSH access and should never be used in production.

Production mode disables passwordless root access, and an SSH key must be [added][config-json-ssh] to `config.json` to access a production image using a direct SSH connection. You may still access a production image by tunneling SSH through the cloudlink via the CLI (using `balena ssh <uuid>`) or the {{ $names.cloud.lower }} [web terminal][ssh-host]. To use SSH via cloudlink, you need to have an SSH key configured on your development machine and [added][ssh-key-add] to the {{ $names.cloud.lower }} dashboard.

### Logging

In {{ $names.os.lower }}, logs are written to an 8 MB journald RAM buffer in order to avoid wear on the flash storage used by most of the supported boards.

To persist logs on the device, enable persistent logging via the [configuration][fleet-configuration] tab in the {{ $names.cloud.lower }} dashboard, or prior to device provisioning setting the `"persistentLogging": true` [key][config-json-logging] in `config.json`. The logs can be accessed via the host OS at `/var/log/journal`. For versions of {{ $names.os.lower }} < 2.45.0, persistent logs are limited to 8 MB and stored in the state partition of the device. {{ $names.os.upper }} versions >= 2.45.0 store a maximum of 32 MB of persistent logs in the data partition of the device.

### Hostname

{{ $names.os.lower }} allows the setting of a custom [hostname][config-json-hostname] via `config.json`, by setting `"hostname": "my-new-hostname"`. Your device will then broadcast (via Avahi) on the network as `my-new-hostname.local`. If you don't set a custom hostname, the device hostname will default to `<short-UUID>`. You can also set a custom hostname via the [Supervisor API][supervisor-api] on device.

### Logo

On production mode, nothing is written to tty1, on boot you should only see the {{ $names.company.lower }} logo, and this will persist until your application code takes over the framebuffer. If you would like to replace the {{ $names.company.lower }} logo with your own custom splash logo, then you will need to replace the `splash/balena-logo.png` file that you will find in the [first partition][partition] of the image (boot partition or `resin-boot`) with your own logo.

__Note:__ As it currently stands, plymouth expects the image to be named `balena-logo.png`. This file was called `resin-logo.png` on older releases.

### Provisioning keys

When a {{ $names.os.lower }} image is downloaded from the {{ $names.cloud.lower }} dashboard, it contains a provisioning key that allows devices flashed with the image to be added to a specific fleet, and a device API key generated. As such, you should handle such images downloaded from {{ $names.cloud.lower }} with care as anyone with access to the image can add a device to your fleet. You can find out more about the access restrictions of a device API key [here][security].

### Standalone {{ $names.os.lower }}

Images downloaded via the CLI (using `os download`), via [balena.io/os][balena-io-os], or [manually built via Yocto][yocto-build] are the same {{ $names.os.lower }} images as those downloaded from {{ $names.cloud.lower }} but are unconfigured, and will not connect to the {{ $names.cloud.lower }} servers, but still make use of the Supervisor to keep the containers running. This version of {{ $names.os.lower }} is meant as an excellent way to get started with Docker containers on embedded systems, and you can read more about this at [balena.io/os][balena-io-os].

Should you wish to add an unconfigured device to your {{ $names.cloud.lower }} fleet, you may migrate it using the interactive `balena join` [CLI command][cli-join] or update the `config.json` of an unconfigured device with a configuration file downloaded from the _Add device_ page of the {{ $names.cloud.lower }} dashboard.

## {{ $names.os.upper }} Components

 The {{ $names.os.lower }} userspace packages only provide the bare essentials for running containers, while still offering flexibility. The philosophy is that software and services always default to being in a container unless they are generically useful to all containers, or they absolutely can’t live in a container. The userspace consists of many open source components, but in this section, we will highlight some of the most important services.

![{{ $names.os.upper }} Components](/img/common/balenaos/balenaOS-components.webp)

### systemd

[systemd][systemd] is the init system of {{ $names.os.lower }}, and it is responsible for launching and managing all the other services. {{ $names.os.upper }} leverages many of the great features of systemd, such as adjusting OOM scores for critical services and running services in separate mount namespaces. systemd also allows us to manage service dependencies easily.

### Supervisor

The {{ $names.lower.company }} Supervisor is a lightweight container that runs on devices. Its main roles are to ensure your app is running, and keep communications with the {{ $names.cloud.lower }} API server, downloading new application containers and updates to existing containers as you push them in addition to sending logs to your dashboard. It also provides an [API interface][supervisor], which allows you to query the update status and perform certain actions on the device.

### {{ $names.engine.upper }}

[{{ $names.engine.upper}}][balena-engine] is {{ $names.company.lower }}'s modified Docker daemon fork that allows the management and running of service images, containers, volumes, and networking. {{ $names.engine.upper }} supports container deltas for 10-70x more efficient bandwidth usage, has 3.5x smaller binaries, uses RAM and storage more conservatively, and focuses on atomicity and durability of container pulling.

### NetworkManager and Modem Manager

{{ $names.os.upper }} uses [NetworkManager][network-manager] accompanied by [ModemManager][modem-manager], to deliver a stable and reliable connection to the internet, be it via ethernet, WiFi or cellular modem. Additionally, to make headless configuration of the device’s network easy, there is a `system-connections` folder in the boot partition, which is copied into `/etc/NetworkManager/system-connections`. So any valid NetworkManager connection file can just be dropped into the boot partition before device commissioning.

### Avahi

In order to improve the [development experience][local-mode] of {{ $names.os.lower }}, there is an [Avahi][avahi] daemon that starts advertising the device on boot as `<short-UUID>.local` or `<hostname>.local` if the hostname is set.
Avahi listens on UDP port `5353` for mDNS traffic. It also uses ephemeral (“random”) ports to receive replies to unicast DNS queries.

### Dnsmasq

[Dnsmasq][dnsmasq] manages the nameservers that NetworkManager provides for {{ $names.os.lower }}. NetworkManager discovers the nameservers that can be used, and a binary called `resolvconf` writes them to a tmpfs location, from where Dnsmasq will take over and manage these nameservers to give the user the fastest most responsive DNS resolution.

### chrony

__Note__: {{ $names.os.upper }} versions less than v2.13.0 used systemd-timesyncd for time management.

[chrony][chrony] is used by {{ $names.os.lower }} to keep the system time synchronized.

### OpenVPN

[OpenVPN][open-vpn] is used as the VPN service by {{ $names.os.lower }}, which connects to cloudlink, allowing a device to be connected to remotely and enabling remote SSH access.

### OpenSSH

__Note__: {{ $names.os.upper }} versions < v2.38.0 use [dropbear][dropbear] as the SSH server and client

[OpenSSH][open-ssh] is used in {{ $names.os.lower }} as the SSH server and client allowing remote login using the SSH protocol.

## Image Partition Layout

![Image partition layout](/img/common/balenaos/image-partition-layout.webp)

The first partition, `resin-boot`, holds important boot files according to each board (e.g. kernel image, bootloader image). It also holds the `config.json` file, which is the central point of [configuring {{ $names.os.lower }}][config-json] and defining its behavior. For example using `config.json` you can set your hostname, add SSH keys, allow persistent logging or define custom DNS servers.

`resin-rootA` is the partition that holds the read-only root filesystem; it holds almost everything that {{ $names.os.lower }} is.

`resin-rootB` is an empty partition that is only used when the rootfs is to be updated. We follow the A-B update strategy for  {{ $names.os.lower }} upgrades. Essentially, we have one active partition that is the OS’s current rootfs and one dormant one that is empty. During a {{ $names.os.lower }} [update][hostos-updates] we download the new rootfs to the dormant partition and try to switch them. If the switch is successful the dormant partition becomes the new rootfs, if not, we roll back to the old active partition.

`resin-state` is the partition that holds persistent data, as explained in the [Stateless and Read-only rootfs](#stateless-and-read-only-rootfs) section.

`resin-data` is the storage partition that contains the Supervisor and application containers and volumes.

## Stateless and Read-Only rootFS

{{ $names.os.upper }} comes with a read-only root filesystem, so we can ensure our host OS is stateless, but we still need some data to be persistent over system reboots. We achieve this with a very simple mechanism, i.e. bind mounts.

{{ $names.os.upper }} contains a partition named `resin-state` that is meant to hold all this persistent data. Inside we populate a Linux filesystem hierarchy standard with the rootfs paths that we require to be persistent. After this partition is populated, we are ready to bind mount the respective rootfs paths to this read-write location, thus allowing different components (e.g. `journald`, when persistent logging is enabled) to be able to write data to disk.

A diagram of our read-only rootfs can be seen below:

![Read only rootFS](/img/common/balenaos/read-only-rootfs.webp)

## {{ $names.os.upper }} Yocto Composition

{{ $names.os.upper }} is composed of multiple [Yocto][yocto] layers. The Yocto Project build system uses these layers to compile {{ $names.os.lower }} for the various [supported devices](/reference/hardware/devices/). Below is an example from the [Raspberry Pi family][raspberry-pi-conf].

__Note:__ Instructions for building your own version of {{ $names.os.lower }} are available [here][yocto-build].

| Layer Name                                                                         | Repository                                                                                              | Description                                                                  |
|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| poky/meta                                                                          | https://git.yoctoproject.org/cgit/cgit.cgi/poky/tree/meta                                               | Poky build tools and metadata.                                               |
| poky/meta-poky                                                                     | https://git.yoctoproject.org/cgit/cgit.cgi/poky/tree/meta-poky                                          |                                                                              |
| meta-openembedded/meta-oe                                                          | https://github.com/openembedded/meta-openembedded/tree/master/meta-oe                                   | Base layer for OpenEmbedded build system.                                    |
| meta-openembedded/meta-filesystems                                                 | https://github.com/openembedded/meta-openembedded/tree/master/meta-filesystems                          | OpenEmbedded filesystems layer.                                              |
| meta-openembedded/meta-networking                                                  | https://github.com/openembedded/meta-openembedded/tree/master/meta-networking                           | OpenEmbedded networking-related packages and configuration.                  |
| meta-openembedded/meta-python                                                      | https://github.com/openembedded/meta-openembedded/tree/master/meta-python                               | Layer containing Python modules for OpenEmbedded.                            |
| meta-raspberrypi                                                                   | https://github.com/agherzan/meta-raspberrypi                                                            | General hardware specific BSP overlay for the Raspberry Pi device family.    |
| meta-{{ $names.company.lower }}/meta-{{ $names.company.lower }}-common             | {{ $links.githubOS }}/meta-balena/tree/development/meta-balena-common                                   | Enables building {{ $names.os.lower }} for supported machines.               |
| meta-{{ $names.company.lower }}/meta-{{ $names.company.lower }}-warrior            | {{ $links.githubOS }}/meta-balena/tree/development/meta-balena-warrior                                  | Enables building {{ $names.os.lower }} for Warrior supported BSPs.           |
| {{ $names.company.lower }}-raspberrypi/meta-{{ $names.company.lower }}-raspberrypi | {{ $links.githubOS }}/{{ $names.company.lower }}-raspberrypi/tree/master/layers/meta-balena-raspberrypi | Enables building {{ $names.os.lower }} for chosen meta-raspberrypi machines. |
| meta-rust                                                                          | https://github.com/meta-rust/meta-rust                                                                  | OpenEmbedded/Yocto layer for Rust and Cargo.                                 |

At the base is [Poky][yocto-poky], the Yocto Project's reference distribution. Poky contains the OpenEmbedded Build System (BitBake and OpenEmbedded-Core) as well as a set of metadata.  On top of Poky, we add the collection of packages from meta-openembedded.

The next layer adds the Board Support Package (BSP). This layer provides board-specific configuration and packages (e.g., bootloader and kernel), thus enabling building for physical hardware (not emulators).

The core code of {{ $names.os.lower }} resides in the meta-{{ $names.company.lower }}-common layer. This layer also needs a Poky version-specific layer (e.g., meta-{{ $names.company.lower }}-warrior) based on the requirements of the BSP layer.

Next is the board-specific meta-{{ $names.company.lower }} configuration layer. This layer works in conjunction with a BSP layer. For example, the Raspberry Pi family is supported by the meta-raspberrypi BSP layer and the corresponding meta-{{ $names.company.lower }}-raspberrypi layer configures {{ $names.os.lower }} to the Raspberry Pi's needs

The final meta-rust layer enables support for the rust compiler and the cargo package manager.

__Note:__ Instructions for adding custom board support may be found [here][custom-build].

[avahi]:https://wiki.archlinux.org/index.php/Avahi
[balena-engine]:https://www.balena.io/engine/
[balena-io-os]:{{ $links.osSiteUrl }}
[cli-join]:/reference/cli/#join-deviceip
[config-json]:/reference/OS/configuration
[config-json-hostname]:/reference/OS/configuration/#hostname
[config-json-logging]:/reference/OS/configuration/#persistentlogging
[config-json-ssh]:/reference/OS/configuration/#sshkeys
[containerisation]:https://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[chrony]:https://en.wikipedia.org/wiki/Chrony
[custom-build]:{{ $links.osSiteUrl }}/docs/custom-build/#Supporting-your-Own-Board
[deploy-to-fleet]:/learn/deploy/deployment/
[dnsmasq]:https://wiki.archlinux.org/index.php/Dnsmasq
[Docker]:https://www.docker.com/
[dropbear]:https://matt.ucc.asn.au/dropbear/dropbear.html
[fleet-configuration]:/learn/manage/configuration/#fleet-configuration-variables
[hostos-updates]:/reference/OS/updates/self-service/
[linux]:https://en.wikipedia.org/wiki/Linux
[local-mode]:/learn/develop/local-mode/
[modem-manager]:https://www.freedesktop.org/wiki/Software/ModemManager/
[network-manager]:https://wiki.gnome.org/Projects/NetworkManager
[open-ssh]:https://www.openssh.com/
[open-vpn]:https://community.openvpn.net/openvpn
[partition]:/reference/OS/overview/2.x/#stateless-and-read-only-rootfs
[raspberry-pi-conf]:{{ $links.githubOS }}/balena-raspberrypi/blob/master/layers/meta-balena-raspberrypi/conf/samples/bblayers.conf.sample
[security]:/learn/welcome/security/#device-access
[ssh-host]:/learn/manage/ssh-access/
[ssh-key-add]:/learn/manage/ssh-access/#add-an-ssh-key-to-balenacloud
[supervisor]:/reference/supervisor/supervisor-api/
[supervisor-api]:/reference/supervisor/supervisor-api/#patch-v1devicehost-config
[systemd]:https://www.freedesktop.org/wiki/Software/systemd/
[yocto]:https://www.yoctoproject.org/
[yocto-build]:{{ $links.osSiteUrl }}/docs/custom-build/#Bake-your-own-Image
[yocto-poky]:https://www.yoctoproject.org/software-item/poky/
[yocto-releases]:https://wiki.yoctoproject.org/wiki/Releases
[config-json-developmentmode]:/reference/OS/configuration/#developmentmode
[supervisor-configuration-list]:/reference/supervisor/configuration-list
