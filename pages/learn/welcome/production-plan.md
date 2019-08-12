---
title: Going to production
excerpt: A project plan for IoT deployments with {{ $names.company.lower }}
---

# Going to production

Deploying a fleet of remote, connected devices requires some careful planning. A proper solution needs to take into account where the devices will be deployed, what the devices need to do, how the devices will be maintained, and of course, the available budget. To help you get started we've outlined a basic project plan, covering recommended steps for preparing a production fleet as well as the questions you'll want to consider along the way.

## Phase 1: Design

The first step in designing a solution is to determine how and where your devices will run. Your use case will drive the selection of the *hardware* and the *operating environment* required to successfully deploy your application.

### Hardware

There are a number of single-board computers capable of supporting Linux and running applications on the edge. The options vary widely in terms of capability and price, so it's important to pay close attention to the features that will meet your application's needs. Regardless of the hardware platform you choose, you'll want to consider the following:

* CPU: Do you have software components that require the x86 architecture? ARM chips are often cheaper and consume less power, but x86 can often provide more processing capability.
* RAM: You should ensure that you have a comfortable buffer of memory. Software must be able to evolve with changing business needs and you may find yourself deploying new features beyond what you originally scoped. Having plenty of available memory will save you time and effort (and possibly an expensive upgrade cycle) later.
* Peripherals: Are there special hardware devices that will need custom drivers?
* Storage: SD cards are common in embedded devices, but are slower and *much* less reliable than onboard flash storage. Especially if your application will be performing many read/write cycles, avoiding SD storage will reduce the risk of data corruption.

Of course, the single biggest choice you have to make is whether to use off-the-shelf hardware or a custom device. An off-the-shelf device has many advantages, including lower price, faster availability, and broader industry support. But it's possible that no existing device fully meets your needs. In this case it's crucial to think about your operating environment—you need to be sure that it will work with your hardware and that it can be kept up to date with the latest security patches.


### Operating environment

One of the challenges in building applications for distributed fleets is aligning your development environment with the operating environment running on your devices. You'll need a way to make sure your application and its dependencies work with your device's architecture, as well as a plan for pushing updates to your application without losing access to your devices.

{{ $names.company.upper }} solves for these concerns by running {{ $names.os.lower }}, a bare-bones host OS with a lightweight, Docker-compatible container engine, [{{ $names.engine.lower }}][engine-link]. With containers, you can develop your application in the way you are most comfortable, and then run that environment on your device without worrying about the underlying hardware support. Any dependencies, such as libraries and runtime environments, will already be packaged in the container.

Containers also make remote application updates a straightforward process. A new application image can be downloaded, verified, and started while the host OS maintains a network connection and handles any issues.

One thing to consider is whether you'll want to use one container or many. Each approach has its advantages. A single container is the simplest to manage—there's no inter-container communication or resource contention to worry about. But it does mean that you will need to manage all the components of your application in one place.

Using multiple containers allows you to separate components and even development teams. Splitting your application into containerized services could, for example, allow one team to work on the frontend of your application while another is working on the backend, with each team sending updates independently. The different teams could even use completely different operating environments: one team could use Debian and another Fedora. This does require some coordination, as you will need to assign the resources needed by each container via something like a [Docker Compose][docker-compose] file.


## Phase 2: Prototype

During the prototyping phase, it's important to develop your application on the same device you'll be using in your production fleet. It may be tempting to use a virtual device, but there are a number of drawbacks to this approach. Virtual devices tend to be more difficult to work with than physical devices and are often much slower. By sticking with the same device through prototype, pilot, and production phases, you'll reduce the risk of any unexpected failures along the way.

You'll want to make sure you have easy access to your device, especially in the case that something goes wrong. It's best to prototype in a local lab under your control. At this stage of development, your application is incomplete and not fully tested, so you want a safe environment where you can quickly develop without risk of exposing data externally.

The prototyping phase is where some of the developer-focused features of {{ $names.company.lower }} start to come into play, offering a number of ways to access the host OS and application containers running on your device:

### Development images

When developing an application, you should consider using a [development image][dev-vs-prod] of {{ $names.os.lower }}. These images have a number of features that, for security reasons, are not present in the production releases of {{ $names.os.lower }}. These include:

* Passwordless SSH access to the host OS
* Access to the Docker socket
* Serial and console logging and interactive login
* Local mode functionality

### Local mode

{{ $names.os.upper }} [local mode][local-mode] gives you the ability to build and deploy to a device on the local network without involving the {{ $names.company.lower }} cloud builder. This allows you to very quickly iterate and test functionality—in many cases, such as configuration changes or changes made to code in an interpreted language, updates can be deployed without requiring a build at all. A local deployment lets you directly mirror your development environment on a test device.

### Connectivity

While prototyping, you should start thinking about how your devices will be connected when deployed in the real world.  If it's possible to have network settings preconfigured, or to have everything done by DHCP, this is easy. But most devices will need onsite configuration.

{{ $names.company.upper }} provides the ability to configure networking from inside your application containers and exposes a great deal of functionality to make this easier. One example is the [wifi-connect][wifi-connect] project, which allows the device to create its own WiFi access point that users can connect with to configure proper credentials. The {{ $names.company.lower }} [supervisor API][supervisor-api] also makes it possible to configure more advanced networking parameters, including hostname and proxy configuration.

### Multiple developers

During the prototyping phase, you may want to allow multiple developers to share resources. With {{ $names.company.lower }}, you can add multiple developers as [collaborators][collaborators] to an application, giving them the ability to manage the application's devices and push code updates.

## Phase 3: Pilot

After your application development is mostly complete, it's important to do some more real world testing. {{ $names.company.upper }} exposes functionality to make this easy as well, providing tools that help you move from the prototype phase toward a full production environment:

### Production images

At this point it makes sense to move from development {{ $names.os.lower }} images to full production images, ensuring that your application still runs properly without full local console access. You can still [access][ssh] the host OS and application containers via the {{ $names.company.lower }} dashboard and CLI, but the production {{ $names.os.lower }} image will close all open inbound ports.

### Test outside the lab

Testing outside the lab helps you see how your application behaves in networks that are not fully under your control. Ideally, this should be done in an environment that mimics where your devices will be when they are in production, but is still at least somewhat accessible. For example, if you are building a consumer device, you could have your employees and their families test in their homes. You might also look for customers who are willing to be alpha testers, who might provide feedback about your application while understanding that it's not quite done yet.

### Log collection

It's crucial that you are able to get logs and telemetry from your devices once they're out of the lab. If your application is fairly quiet and generates few enough messages that you can read them all, you can just use the console logging functionality exposed in the {{ $names.company.lower }} dashboard.

If your application generates enough log data that you need an analytics platform to make sense of it all, consider [adding a log collection agent][custom-logging] to your application containers, just as you would in any other environment.

### Update testing

Make sure to test all the update functionality you can before your devices are out in the wild and inaccessible. For both application and host OS updates, {{ $names.company.lower }} includes a number of features to make sure the update process doesn't affect your ability to connect to your devices and restore functionality, but you'll still want to understand the factors that can affect the update process.

Specifically, think about testing:

* loss of power during an update
* loss of network during an update
* pushing a new update while another is in progress

Understanding how your devices handle adverse conditions allows you to be confident in your fleet's ability to receive timely updates.

## Phase 4: Production

Now that your testing is wrapping up, it's time to get your devices out into the world and have them do their job!  At this point you'll be moving from a primarily development-focused perspective to a primarily operations-focused perspective, at least for the current release of your application.  Of course, you may want to continue development on the next version, knowing that you can safely roll out updates to your fleet at any point with {{ $names.company.lower }}!

### Preloading images

While a device will provision itself and download your application as soon as it's turned on and connected to the Internet, this might not be the experience you want your users to have.  It would be nice to have something that works right away, rather than having to wait for a potentially slow download to finish.

Happily, you can preload your application into a {{ $names.os.lower }} image with a one-time process. Then, when that image is flashed onto your devices in the factory, it will have the application already installed and ready. Any updates made to the application after the preloading process will be downloaded and applied when the device is brought online, so there's no need to worry about devices that have been sitting in a warehouse or on store shelves. More information about preloading applications with the {{ $names.company.lower }} CLI can be found in the [preload section of the CLI manual][preload].

### Canary deployments

When updating software on production devices, it makes sense to be cautious and start with a few devices to make sure nothing goes wrong. A common practice is to start with a few "canary" devices and then slowly roll the update out to larger and larger numbers of devices.

The {{ $names.company.lower }} API includes functionality that allows for [fine-grained control of updates][staged-releases]. With these endpoints, you can turn off automatic release updates, set a target release for the whole fleet, or set target releases for a specific subset of devices. The [device tag][tags] and [filter][filters] functionality makes it easy to assign groups of devices to certain phases of your deployment.

[engine-link]:{{ $links.engineSiteUrl }}
[docker-compose]:https://docs.docker.com/compose/overview/
[dev-vs-prod]:/reference/OS/overview/2.x/#dev-vs-prod-images
[local-mode]:/learn/develop/local-mode
[wifi-connect]:{{ $links.githubMain }}/wifi-connect
[supervisor-api]:/reference/supervisor/supervisor-api/#patch-v1-device-host-config
[collaborators]:/learn/manage/account/#application-members
[ssh]:/learn/manage/ssh-access
[custom-logging]:{{ $links.blogSiteUrl }}/how-to-create-a-custom-logging-system-for-longer-log-retention/
[preload]:/reference/cli/#preload-image-
[staged-releases]:{{ $links.githubProjects }}/staged-releases
[tags]:/learn/manage/filters-tags/#device-tags
[filters]:/learn/manage/filters-tags/#device-filters



