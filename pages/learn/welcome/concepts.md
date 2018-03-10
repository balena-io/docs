---
title: Core concepts
excerpt: Definitions for concepts mentioned throughout the resin.io documentation
---

# Core concepts

### Device 

An internet-connected, single-board computer running resinOS and provisioned with the resin.io platform.

### Release 

A snapshot of code collected into one or more Docker images.

### Application 

A set of releases and a set of devices, encompassing the code and history of the code that applies to a fleet.

### Fleet 

The set of devices belonging to an application.

### Service 

An independently deployable component of an application, packaged into a Docker image and run as a container.

### Device supervisor

Resin.io's agent on the device, responsible for managing application updates and reporting device status.

### ResinOS image

A versioned build of the host OS, specific to an application and device type.

### Base image

A specific combination of a Linux distribution and additional packages, used as the base operating environment for a service.
