---
title: Core concepts
excerpt: Definitions for concepts mentioned throughout the resin.io documentation
---

# Core concepts

**Device:** an internet-connected, single-board computer running resinOS and provisioned with the resin.io platform.

**Release:** a specific code commit, built by the resin.io servers into one or more Docker images.

**Application:** a set of releases and a set of devices, encompassing the code and history of the code that applies to a fleet.

**Fleet:** the set of devices belonging to an application.

**Service:** an independently deployable component of an application, packaged into a Docker image and run as a container.

**Device supervisor:** resin.io's agent on the device, responsible for managing application updates and reporting device status.

**resinOS image:** a versioned build of the host OS, specific to an application and device type.

**Base image:** a specific combination of a Linux distribution and additional packages, used as the base operating environment for a service.
