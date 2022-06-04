In this guide we will build a simple **{{ $language.name }}** web server project on an **{{ $device.name }}**.

__Note:__ The Intel NUC image provides generic x86 device support. While the instructions below refer specifically to the Intel NUC device, you can follow the same steps to provision other devices with an x86 architecture, such as the VIA AMOS-3005 and the Intel Compute Stick STK1A32SC.

In this guide we'll cover:

- Setting up your **{{ $device.name }}** device and bringing it online on the {{ $names.cloud.lower }} dashboard
- Deploying a **{{ $language.name }}** hello-world project on the device
- Developing the sample project: making changes and testing them on the device in real-time

Once you've completed this guide you'll be equipped with the fundamentals needed to continue developing your application using {{ $names.cloud.lower }} and be on the path to deploying fleets of devices to production.