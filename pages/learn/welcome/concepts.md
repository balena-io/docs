---
title: Core concepts
excerpt: Definitions for concepts mentioned throughout the {{ $names.company.lower }} documentation
---

# Core concepts

### Device

An internet-connected, single-board computer running {{ $names.os.lower }} and provisioned with the {{ $names.company.lower }} platform.

### Release

A snapshot of code collected into one or more Docker images.

### Fleet

A group of devices sharing the same releases, variables, configuration, settings and members.

### Service

A component of a release, packaged into a Docker image and run as a container.

### Device supervisor

{{ $names.company.upper }}'s agent on the device, responsible for managing fleet updates and reporting device status.

### {{ $names.os.upper }} image

A versioned build of the host OS, specific to a fleet and device type.

### Base image

A specific combination of a Linux distribution and additional packages, used as the base operating environment for a service.
