---
title: Device Types and Versioning
excerpt: Explanation of device types and their version scheme
---

## Device Types
A device type in balena describes a [SoC](https://en.wikipedia.org/wiki/System_on_a_chip) or group of SoCs that have the same boot configuration and are capable of booting the same Operating system. When a new device type is created, it is usually because the SoC or configuration is distinctly different from others that exist.

As an example the [Raspberry Pi 1 model B+](https://www.raspberrypi.org/products/raspberry-pi-1-model-b-plus/) and [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) are part of the same device type since they are both `armv6l` architecture SoCs and the boot loader is capable of booting both boards. However, the [Raspberry Pi 3 model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) is by default a `armv7l` CPU and we therefore separate it into a new device type.

In balenaCloud the device type is also used to define what architecture containers are built for. So in the above example, Raspberry Pi Zero deployments are built for the `armv6l` architecture whereas Raspberry Pi 3 fleets will target the `armv7l` architecture, and the Intel NUC device type will target `x86_64` architecture.

### Designations

When looking at all the supported device types in balenaCloud, you will notice that there are a number of different designations. Here we will discuss a few of these designations in more detail.

#### Official
All device types that are not designated with `COMMUNITY` or `PRIVATE` are considered officially supported boards.

Official device types are:
- Run through a full suite of testing on real hardware each time an OS version is released for the device type.
- We endevour to ensure that all the hardware peripherals on the device type are functional and accessible. This includes things like i2c, SPI, audio, etc.
- Continually updated to new versions of the OS, usually within 2 or 3 minor versions of meta-balena master version.
- Official devices are recommended for production deployments.

On some official device types you will see the `(BETA)` designation. This does not mean the OS itself is `beta` level software, but rather that this device type not yet used by enough people or has not been in production for a long enough time. In balenaCloud all official device types start out as `BETA` and when the team decides the device type has enough production usage, it is graduated out of `BETA`.

#### Private
Private device types have exactly the same guarantees and testing process as official device types but they are only visible to specific customers that have paid for this device support. If you are interested in finding out more about private device support email solutions@balena.io .

#### Community
Device types that are marked as `COMMUNITY` are device types that have been contributed by an external community member rather than the balena team. An example of a community device type is the Orange Pi Zero which was contributed into the {{ $links.githubOS }}/balena-allwinner repo.

The community devices types are:
- Maintained by the community member and feature/support requests are handled in the forums or on the device-types github repository.
- The balena team does **not** test and verify each release of the OS, instead we rely on the community members to conduct testing.
- Updated to newer versions as the community drives it, we do not guarantee the device type will keep up with OS versions.
- Community boards can be promoted to an official balena supported board if a customer is interested in sponsoring the device support. If you are interested in sponsoring a community board, email solutions@balena.io .

#### Device Type support policy
At balena, we’re here to make sure balenaOS runs smoothly on actively maintained hardware models. This policy lays out what we support, what you can expect, and how we handle devices when they reach the end of their lifecycle.

#### Our offerings for vendor-supported hardware models**
- BalenaOS Image: A tested and ready-to-use version of balenaOS [available generally](https://balena.io/os).
- Incident and Bug Support: Troubleshoot incidents, bugs, or performance issues with balenaOS — whenever possible.
- Regular Updates: You’ll get ongoing updates and patches to keep your devices secure, compatible, and running efficiently.

**What Happens When a Device is Discontinued?**
Sometimes, a device type reaches the end of the road. When this happens:
- The device type will stop appearing as an option for creating new fleets or adding new devices in the dashboard.
- Any devices already provisioned will keep working, but they won’t get any more OS updates.

**When Does a Device Get Discontinued?**
We’ll discontinue a device type if:
- If the manufacturer stops supporting or selling the device.
- It’s No Longer Used: No new devices of this type have been added to balenaCloud in the past 6 months.
- In case the device is a community device and there's no maintenance activity from the community in the last 6 months.
- In case the device is a private device type and if the customer stops paying for the device type support.

**What happens to discontinued devices on balenaCloud?**
Here’s what you can expect:
- Support Wrap-Up: Updates, patches, and bug fixes will no longer be provided. We’ll still do our best to help with workarounds or recommend alternative devices.
- Custom Support Options: Need continued support? We can explore custom options on a case-by-case basis, which may involve additional fees.

## Versioning

The version string for a particular device type is a combination of the [meta-balena]({{ $links.githubOS }}/meta-balena) version and the device specific repo revisions.

* The version of `meta-balena` is in the format of 3 numbers separated by a dot. The patch number can have a `beta` label. e.g. 1.2.3, 1.2.3-beta1, 2.0.0-beta1.
* The version of the specific device type is constructed by appending to the `meta-balena` version a `rev` label. This will have the semantics of a board revision which adapts a specific `meta-balena` version for a targeted board. For example a `meta-balena` 1.2.3 can go through 3 board revisions at the end of which the final version will be 1.2.3+rev3 .
* When updating `meta-balena` version in a specific device type repo, the revision will reset to 1. Ex: 1.2.3+rev4 will be updated to 1.2.4+rev1 .
* Note that the final OS version is NOT based on the semver specification so parsing of such a version needs to be handled in a custom way. If you are interested in how to parse the version scheme, have a look at our balenaOS version parser [balena-semver](https://github.com/balena-io-modules/resin-semver).

Look at our [balenaOS support policy](/reference/OS/updates/self-service.md) for information about how we support and maintain the different versions.
