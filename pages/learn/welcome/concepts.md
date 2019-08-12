---
title: Core concepts
excerpt: Definitions for concepts mentioned throughout the {{ $names.company.lower }} documentation
---

# Core concepts

### Device

An internet-connected, single-board computer running {{ $names.os.lower }} and provisioned with the {{ $names.company.lower }} platform.

### Release

A snapshot of code collected into one or more Docker images.

### Application

A set of releases and a set of devices, encompassing the code and history of the code that applies to a fleet.

### Fleet

The set of devices belonging to an application.

### Service

An independently deployable component of an application, packaged into a Docker image and run as a container.

### Device supervisor

{{ $names.company.upper }}'s agent on the device, responsible for managing application updates and reporting device status.

### {{ $names.os.upper }} image

A versioned build of the host OS, specific to an application and device type.

### Base image

A specific combination of a Linux distribution and additional packages, used as the base operating environment for a service.
