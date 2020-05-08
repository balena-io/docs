---
title: A {{ $names.company.lower }} primer
excerpt: How {{ $names.company.lower }} gets your code to your device fleet, from end to end
---

# A {{ $names.company.lower }} primer

The {{ $names.company.lower }} platform encompasses device, server, and client software, all designed to get your code securely deployed to a fleet of devices. The broad strokes are easy to grasp: once your device is set up with our [host OS][os-docs], you can push code to the {{ $names.company.lower }} [build servers][build], where it will be packaged into containers and delivered to your fleet. All your devices and their services can be managed, monitored, and updated from your [{{ $names.cloud.lower }} dashboard][dashboard].

If you're eager to learn more about the inner workings, you're in luck! This guide covers the components and workflows involved in a typical {{ $names.company.lower }} deployment, with enough detail to answer the most common questions. If you're ready to dig in deeper, why not [get started][getting-started] with a project of your own?

## On your device

<img src="/img/common/architecture.png" width="60%">

Devices in the {{ $names.company.lower }} ecosystem run [{{ $names.os.lower }}][os], a bare-bones, [Yocto Linux][yocto] based host OS, which comes packaged with [{{ $names.engine.lower }}][engine-link], our lightweight, [Docker][docker]-compatible container engine. The host OS is responsible for kicking off the device supervisor, {{ $names.company.lower }}'s agent on your device, as well as your containerized services. Within each service's container you can specify a base OS, which can come from any existing [Docker base image][docker-images] that is compatible with your device architecture. The base OS shares a kernel with the host OS, but otherwise works independently. If you choose, your containers [can be configured][multicontainer] to run as privileged, access hardware directly, and even inject modules into the kernel. The {{ $names.company.lower }} device supervisor runs in its own container, which allows the device to continue running and pulling new code even if your application crashes.

### Host and kernel updates

{{ $names.company.upper }} is built with the goal of 100% updatability. While the {{ $names.company.lower }} device supervisor and your application containers are easy to update without losing connection to the device, the [process for updating][update-process] the host OS involves a few more steps. To mitigate problems while updating, {{ $names.company.lower }} creates an additional partition of identical size to the boot partition. The supervisor downloads a new OS version and boots the device from the alternative boot partition. This way, we can ensure that the new version of the OS is downloaded and installed correctly before rebooting the device to the new version. Even if the new version fails to boot for some reason, our system is built in such a way that the next boot will bring the device back to the original working version of the host OS, operating and ready to download a correctly installed new version.

It is important to note that all {{ $names.company.lower }} devices, both those in production and development today, have the ability to have their host OS updated. For most devices, this can even be done directly [through the dashboard][self-service].

### Device provisioning

So how are devices added to your {{ $names.company.lower }} applications? A key feature of {{ $names.company.lower }} is that a provisioning key for your application is embedded in the {{ $names.os.lower }} image download. When the device boots up for the first time, it uses the provisioning API to register itself with {{ $names.company.lower }}. A new device entry on the {{ $names.company.lower }} backend is created, and a device API key for this device is generated. Once the provisioning is successful, the provisioning API key is deleted from the device. Unless someone downloads the OS from your dashboard (or via the CLI), a device cannot enter your application. While the details of provisioning differ depending on the device type (does it have an SD card slot? Does it boot from on-board flash?), the following things always happen at first boot:

First, the device connects to the network and performs its early provisioning, which registers it on your dashboard. Then, the container partition is decompressed, and the device supervisor starts. This is the part that takes the most time. As soon as the supervisor starts, it registers onto the VPN and receives its unique {{ $names.company.lower }} API key. At that point, you will see the device as online in your dashboard and can use the device as normal. If the application that the device provisions has already had code pushed to it, the new device downloads the latest version and begins operating as expected.

## Code deployment

`{{ $names.company.lower }} push` is the recommended method for deployment and [development](/learn/develop/local-mode/) on the {{ $names.cloud.lower }} platform. To use `{{ $names.company.lower }} push` you need to first [install the {{ $names.company.lower }} CLI](/reference/cli/#install-the-cli) and ensure you are logged in to your account with `{{ $names.company.lower }} login`.

![How balena push works](/img/common/deployment/balena-push.jpg)

### Building containers

When you run the  `{{ $names.company.lower }} push <APP_NAME>` command from your development machine it will essentially take your project (or repository) folder, compress it and send it to the [{{ $names.cloud.lower }} build server](/learn/deploy/deployment/#the-balenacloud-build-server) where it will be built. Your code is built in an environment that matches the devices in your application. So if you’re pushing an app for BeagleBone Black devices, we’ll build your code in an ARMv7 environment. For Raspberry Pi 1, it's ARMv6. In fact, we provide native ARM builders for ARM images, just as we use x86 servers to build images for x86 devices.

For applications with [multiple containers][multicontainer], a `docker-compose.yml` file will need to be included at the root of your project. This configuration file specifies the services that make up your application, as well as the system resources each service has access to. Applications with a single container will have a default `docker-compose.yml` file generated if none is included.

Most services will need to include a [Dockerfile][dockerfile], which contains a list of commands for the builders. For each service, the builders will pull a base OS, install packages and dependencies, clone git repositories, and run any other steps you define for the setup and initialization of that service.

For Node.js services, you can use a package.json file without a Dockerfile. In this case, the builders create an implicit Dockerfile, which simulates the build process a Node.js/npm project expects. In this way, we are able to transparently run Node.js services on {{ $names.company.lower }}, while also taking advantage of some of Docker’s caching features. A Dockerfile will always give you more power to fine-tune, but you can start fast without and shift to a Dockerfile whenever you like.

### Getting to the devices

Once your Docker images are built, they are stored in our container registry, and the {{ $names.company.lower }} device supervisor is alerted that a new version of your application is ready. If a device is offline at the time, it will be made aware of the new containers when it comes back online. The communication between {{ $names.company.lower }} and your device is encrypted at all times, either through HTTPS or a VPN that we set up for the devices in your fleet.

The device supervisor, using [delta updates][delta-updates], then downloads the binary differences between the old and the new images, stops the old services, and starts the new ones.  You can control the exact sequence by configuring the supervisor to use [different update strategies][update-strategies]. The services themselves can also make use of [update locking][update-locking] to block updates from happening during critical times (e.g. [a drone that is flying][drone-video], or an industrial machine that is in the middle of an operation).

As the downloads proceed, you can watch the progress in the {{ $names.company.lower }} dashboard. You can click on any device to see more detailed information about the services being downloaded:

![Device Summary](/img/common/device/device_summary.png)

## Device management

Once your services are up and running, you can use the dashboard to monitor and interact with them. Messages from the device supervisor, as well as anything written by your services to `stdout` and `stderr`, will appear in the *Logs* window, which can be filtered by service. Our built-in [web terminal][ssh] allows you to SSH into any running services, as well as the underlying host OS.

Much of the device, service, and application information provided by the dashboard is managed through the [{{ $names.company.lower }} API][api], and can also be viewed and modified using the [CLI][cli] or the [Node.js][node] and [Python][python] SDKs. {{ $names.company.upper }} has been designed so users can build rich experiences, combining device-level data provided by {{ $names.company.lower }} with higher-level application-specific data that lives in other data domains.

[os-docs]:/reference/OS/overview/2.x/
[build]:/learn/deploy/deployment
[dashboard]:{{ $links.dashboardUrl }}/
[getting-started]:/learn/getting-started
[os]:{{ $links.osSiteUrl }}
[engine-link]:{{ $links.engineSiteUrl }}
[yocto]:https://www.yoctoproject.org/
[docker]:https://www.docker.com/
[docker-images]:https://hub.docker.com/u/resin/
[multicontainer]:/learn/develop/multicontainer
[update-process]:/reference/OS/updates/update-process
[self-service]:/reference/OS/updates/self-service
[dockerfile]:/learn/develop/dockerfile
[update-strategies]:/learn/deploy/release-strategy/update-strategies
[delta-updates]:/learn/deploy/delta
[update-locking]:/learn/deploy/release-strategy/update-locking
[drone-video]:https://www.youtube.com/watch?time_continue=1569&v=75vm6rRb6K0
[ssh]:/learn/manage/ssh-access
[api]:/reference/api/overview/
[cli]:/reference/cli
[node]:/reference/sdk/node-sdk
[python]:/reference/sdk/python-sdk
