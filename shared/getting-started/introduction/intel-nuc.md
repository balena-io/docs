In this guide we will build a simple **{{ $language.name }}** web server project on an **{{ $device.name }}**.

__Note:__ The Intel NUC image provides generic x86 device support. While the instructions below refer specifically to the Intel NUC device, you can follow the same steps to provision other devices with an x86 architecture, such as the VIA AMOS-3005 and the Intel Compute Stick STK1A32SC.

At its most basic, the process for deploying code to an **{{ $device.name }}** consists of two major steps:

- Setting up your **{{ $device.name }}** with {{ $names.os.lower }}, the [host OS][host-os] that manages communication with {{ $names.company.lower }} and runs the core device operations.
- Pushing your **{{ $language.name }}** project to the {{ $names.company.lower }} image builder, which pulls in all necessary dependencies and creates the container image for your application.

Once these steps are finished, your **{{ $device.name }}** will download the container image, kick off your application, and begin sending logs to your {{ $names.company.lower }} dashboard!

[host-os]:/reference/OS/overview/2.x/
