# Devices

So there is now a Docker image with all the dependencies to suceessfully run your project. This container is stored in our container index and our agent on your devices is alerted that a new version of your app is ready. If a device is offline at the time, it will become aware of this when it gets back online. Having a device behind a NAT is not a problem as we set up a VPN for the devices in your app. This is a good point to note that all communication between resin.io and your device is encrypted, either via the VPN or through HTTPS.

The resin agent then downloads the changed layers of your application container image, stops the old version of your application, and starts the new one. This is a part of the workflow that will soon have additional features added. One is that we will be downloading only the differences between the container images, not whole layers, as we’re aware many devices are on very limited connections. Another is that the application itself will have control of when it’s updated, as certain use cases are sensitive to updates without warning.

As the process is ongoing, you can see the overall progress of the download in your resin.io dashboard. You can click on any specific device to see more detailed information about the device, such as logs.

At every step of the process, each part of the resin.io back-end reports back to our API server which makes the information available to our user interface. But the resin.io UI is just another API client. Soon, our CLI and node.js SDK will be available, and shortly after that, we will be releasing the full API documentation so that users can build rich experiences, combining device-level information provided by resin.io, with higher-level application-specific information that lives in other data silos.

And this is how we go from “git push” to “new version running on your devices”.

## Device Provisioning

But how are the devices added in the first place? Glad you asked! The details of the provisioning differ depending on the device type (does it have an SD card slot? Does it boot from on-board flash?). However you get the software onto your device, at first boot, the following things happen.

First, the device connects to the internet and performs its early provisioning, which registers it on your dashboard, but still appearing offline. Then, the container partition is de-compressed, and the resin agent starts. This is the part that takes the most time. As soon as the container of the resin agent starts, it registers onto the VPN and receives its unique resin.io API key. At that point you see the device as online in your dashboard and can use the device as normal. If the application the device provisions into has had code pushed to it, the device downloads the latest version and begins operating as expected.

## On-device Software Architecture

We’ve hinted at what goes on in the device, but let’s take a closer look. It’s important to separate the host OS which is a fairly bare system with just enough to start the resin agent, and the OS inside your container, which is by default some flavour of Debian, or whatever you specify in your Dockerfile. We currently use Yocto Linux as the host OS but will offer more options soon, depending on which host OS works best on the devices we want to support. However the host OS should be reasonably transparent for the users. What really matters is the OS within the container, called the “Base OS”. This OS shares the kernel of the Host, but otherwise has its own way of working and with Resin the users can specify what Base OS their applications use by pointing to an existing Docker image, as long as that image is compatible with their target architecture, of course. Resin’s agent runs in a separate container, which allows us to continue running even if your application crashes, and in this way we can continue to pull new code.

![software anatomy](https://resin.io/pages/how-it-works/on-device-software-anatomy.png)

