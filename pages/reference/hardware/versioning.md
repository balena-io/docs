---
title: Device Types and Versioning
excerpt: Explanation of device types and their version scheme
---

## Device Types
A device type in balena describes a [SoC](https://en.wikipedia.org/wiki/System_on_a_chip) or group of SoCs that have the same boot configuration and are capable of booting the same Operating system. When a new device type is created, it is usually because the SoC or configuration is distinctly different from others that exist.

As an example the [Raspberry Pi 1 model B+](https://www.raspberrypi.org/products/raspberry-pi-1-model-b-plus/) and [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) are part of the same device type since they are both `armv6l` architecture SoCs and the boot loader is capable of booting both boards. However, the [Raspberry Pi 3 model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) is by default a `armv7l` CPU and we therefore separate it into a new device type.

In balenaCloud the device type is also used to define what architecture containers are built for. So in the above example, Raspberry Pi Zero deployments are built for the `armv6l` architecture whereas Raspberry Pi 3 fleets will target the `armv7l` architecture, and the Intel NUC device type will target `x86_64` architecture.

### Designations

Device types may have one of several designations, detailed below:

#### Official
These are officially supported boards. If not discontinued, or not a private device type only accessible to customers paying for custom device type support.

Official device types are:
- Run through a full suite of testing on real hardware each time an OS version is released for the device type.
- This test suite verifies balenaOS specific functionality, including compatibility with balenaCloud and hostOS updates and rollbacks.
- Continually updated to new versions of the OS, usually within 2 or 3 minor versions of meta-balena master version.
- Official devices are recommended for production deployments.


#### Private
Private device types have exactly the same guarantees and testing process as official device types but they are only visible to specific customers that have paid for this device support. If you are interested in finding out more about private device support email solutions@balena.io.


#### Discontinued
Discontinued device types are those that are no longer actively maintained by the balena team.

This means that:

- No new OS releases will be published for that device type.
- The device type will stop showing in the dashboard as options for new fleets. Devices of a discontinued device type can still be added to existing fleets.
- Any already provisioned devices of this type will continue to function as they did, but there will be no further versions of the OS to update to.

While devices will still function when the device type is discontinued, it presents a risk. As no new OS updates will be available, eventually the minimum compatible OS version with balenaCloud will not be available for that device type, after which continued compatibility between the devices and balenaCloud cannot be guaranteed. 

Additionally, discontinued device types present a risk of not having security patches available, and reduced support from the balena support agents. 

##### Why do we discontinue device types

Our aim is to provide the most reliable and secure experience possible across the devices we support. Each device type requires ongoing engineering effort — from continuous integration and testing, to ensuring compatibility with the latest versions of `meta-balena`.

To maintain a high standard of quality, security, and performance, we periodically review the devices we support. When a device type is no longer actively supported by its hardware vendor or when usage of a device type becomes very limited ( see the section below for more information regarding the criteria for discontinuation), we may decide to discontinue it so that our engineering efforts can have the greatest impact across the devices most actively used by our community.

We make these decisions carefully, and always with the goal of protecting our users from relying on outdated, unsupported, or unavailable hardware.

##### Criteria for discontinuation

A device type will be discontinued based on a set of criteria detailed below, in combination with the judgement of our team:
- The device manufacturer ends support and sale of the device. This includes discontinuation of sales, as well as BSP support. This would be grounds for immediate discontinuation. 
- The device type has been on the platform for at least 2 years, with little to no usage. Roughly around 500 devices is the current minimum requirement
- In combination with the above, the device type is not part of any strategic goals at balena.
- If it is a private device type and the customer has stopped paying for the device to be supported.


##### List of discontinued device types

- `Aetina N510 TX2`
- `Asus Tinker Board S`
- `Auvidea CNX100 Xavier NX`
- `BananaPi-M1+`
- `BeagleBone Green`
- `BeagleBone Green Gateway`
- `BeagleBone Green Wireless`
- `CTI Astro TX2 G+`
- `CTI Orbitty TX2`
- `CTI Spacely TX2`
- `Digi ConnectCore 8X SBC Pro`
- `Eurotec Lowpad (lcbzu9)`
- `I-Pi SMARC PX30 SD-CARD`
- `Microsoft Surface 6`
- `Microsoft Surface Go`
- `NanoPC-T4`
- `Nanopi Neo Air`
- `NanoPi R2C`
- `NPE X500 M3`
- `Nvidia Jetson Xavier NX Devkit SD Seeed ReSpeaker-2Mic`
- `Orange Pi One`
- `Orange Pi Plus2`
- `Orange Pi Zero`
- `ROCKPro64`
- `Seeed ODYSSEY-X86`
- `Topic Florida Plus (tdpzu9)`
- `Balena Fin`

##### List of devices pending discontinuation

The following device types will be discontinued on March 1st 2026, given no change to circumstances:

- `Advantech ECU1370`
- `Asus Tinker Board`
- `BeaglePlay`
- `Blue Chip Technology DB1`
- `Blue Chip Technology TM3`
- `CTI Photon Nano`
- `CTI Photon TX2 NX`
- `CTI Photon Xavier NX`
- `PocketBeagle`
- `Raspberry Pi 400`
- `Revolution Pi Connect`
- `Revolution Pi Core 3`
- `Rocktech ISG 503`
- `Variscite VAR-SOM-MX7`
- `Variscite DART-6UL`


## Versioning

The version string for a particular device type is a combination of the [meta-balena]({{ $links.githubOS }}/meta-balena) version and the device specific repo revisions.

* The version of `meta-balena` is in the format of 3 numbers separated by a dot e.g. `1.2.3`.
* The version of the specific device type is constructed by appending to the `meta-balena` version a `rev` label. This will have the semantics of a board revision which adapts a specific `meta-balena` version for a targeted board. For example a `meta-balena` 1.2.3 can go through 3 board revisions at the end of which the final version will be `1.2.3+rev3` . 
* When updating `meta-balena` version in a specific device type repo, the revision will reset to 0. Ex: `1.2.3+rev4` will be updated to `1.2.4` . Further board level updates will present as `1.2.4+rev1` , `1.2.4+rev2` ... and so on, until the next `meta-balena` update. 
* Note that the final OS version is NOT based on the semver specification so parsing of such a version needs to be handled in a custom way. If you are interested in how to parse the version scheme, have a look at our balenaOS version parser [balena-semver](https://github.com/balena-io-modules/resin-semver).
