In this guide, we will build a simple **{{ $language.name }}** project to do image classification using the Edge TPU and then later deploy a new inference model. At its most basic, the process for deploying code to one or a fleet of **{{ $device.name }}s** consists of two major steps:

- Setting up your **{{ $device.name }}** with {{ $names.os.lower }}, the [host OS][host-os] that manages communication with {{ $names.cloud.lower }} and runs the core device operations.
- Pushing your **{{ $language.name }}** project to the {{ $names.company.lower }} build pipeline, which pulls in all necessary dependencies and creates the container images for your application.

Once you complete these steps, your **{{ $device.name }}** will download the container images, start your application, and begin sending logs back to your {{ $names.company.lower }} dashboard!

[host-os]:/reference/OS/overview/2.x/
[python-coral]:https://www.balena.io/docs/learn/getting-started/coral-dev/python/
