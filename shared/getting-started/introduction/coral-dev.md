
__Note:__ If you want to use the Edge TPU functionality of the **{{ $device.name }}**, you will need to use the [Python getting started guide][python-coral]. Unfortunately there are no **{{ $language.name }}** libraries for the Edge TPU yet.

In this guide, we will build a simple **{{ $language.name }}** web server project on a **{{ $device.name }}**. At its most basic, the process for deploying code to a **{{ $device.name }}** consists of two major steps:

- Setting up your **{{ $device.name }}** with {{ $names.os.lower }}, the [host OS][host-os] that manages communication with {{ $names.cloud.lower }} and runs the core device operations.
- Pushing your **{{ $language.name }}** project to the {{ $names.company.lower }} image builder, which pulls in all necessary dependencies and creates the container image for your application.

Once you complete these steps, your **{{ $device.name }}** will download the container image, start your application, and begin sending logs to your {{ $names.company.lower }} dashboard!

[host-os]:/reference/OS/overview/2.x/
[python-coral]:/learn/getting-started/coral-dev/python/
