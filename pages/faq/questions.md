---
title: FAQs
---

# Frequently Asked Questions

### **Can I use multiple containers?**

Multiple container fleets are supported, beginning with balenaOS v2.12.0. To run multiple containers, you will need to have a [microservices fleet](../learn/accounts/fleet-types.md) and include a `docker-compose.yml` file at the root of your project. You can reference the [multicontainer documentation](../learn/develop/multicontainer.md) for more details on the supported configurations.

If you are running a Docker-in-Docker setup, which builds a single container on the balena servers but has a `docker-compose.yml` file at the root of the project, you'll want to rename the file to something like `dind-compose.yml`. Then when you run Docker Compose in your container, you can use the `-f` flag with the new file name: `docker-compose -f dind-compose.yml up`.

### **Can I mix device types in a fleet?**

It is possible to have devices of [different types](../reference/base-images/devicetypes.md) in the same fleet, as long as they have the same or compatible architectures. For example, you could have a fleet with both Raspberry Pi 3 and BeagleBone Black devices, as they both use an ARMv7 processor. Or you could have both a Raspberry Pi 3 and a Raspberry Pi Zero, each provisioned with its device specific host OS image, but running the same ARMv6 container image. However, you could not have any Intel NUC devices as part of the same fleet, as those devices have x86-64 processors.

Regardless of type, all devices in your fleet will get the same container images. This means that if you have mixed device types you'll need to use an architecture-specific [base image](../reference/base-images/balena-base-images.md) in your [Dockerfile](../learn/develop/dockerfile.md), rather than one based on device type.

### **How do I push a new git repo to a fleet?**

If you have pushed a repository called `project-A` to your fleet and at a later stage you would like to push a new project called `project-B`, you can do this by adding the remote (`git remote add balena <USERNAME>@git.balena-cloud.com:<USERNAME>/<APPNAME>.git`) to `project-B`'s local repository. You can then easily push `project-B` to your fleet by just doing `git push balena master -f`. The extra `-f` on the command forces the push and resets the git history on the git remote on balena's backend. You should now have `project-B` running on all the devices in the fleet. Note that once you have successfully switched to `project-B` you no longer need to add the `-f` on every push, for more info check out the docs on [forced git pushes](https://git-scm.com/docs/git-push#git-push--f).

### **Why does /data report weird usage?**

On the device we have a writable data partition that uses all the free space remaining after reserving the required amount for the host os. This data partition contains the Docker images for the balena device supervisor and the user containers so that they can be updated, along with containing the persistent `/data` for the services to use, this way it avoids reserving a specific amount of space for either images or data and then finding out that we have reserved too much or too little for one. So the space usage in `/data` being used but not accounted for will likely be due to the Docker images. (As a side note if you want the most accurate usage stats you should use `btrfs fi df /data` as `df` is not accurate for btrfs partitions).

### **What NTP servers do the devices use?**

NTP servers used by devices are enumerated on the [time management](../reference/OS/time.md#networking-requirements) documentation page.

### **What network ports are required?**

Please take a look at the [networking requirements](../reference/OS/network.md#network-requirements) section of our documentation.

### **Can I use balenaCloud in countries with restrictive firewalls such as China?**

Deploying devices in heavily restricted networks, such as behind country-level firewalls, may affect the ability of the device to connect to cloudlink and is not guaranteed to work.

### **Can I access /dev and things like GPIO from the container?**

If your fleet uses a single container, it will be run in privileged mode by default and will have access to hardware in the same way as a vanilla Linux system.

For fleets running [multiple containers](../learn/develop/multicontainer.md), you will either need to define services as privileged or use the `cap_add` and `devices` settings in the `docker-compose.yml` file to map in the correct hardware access to the container.

### **Can I set a static IP address for my device?**

Yes! It's actually pretty easy. Have a look at the [network setup](../reference/OS/network.md#setting-a-static-ip) section of our documentation. In general, most network configurations can be achieved by changing the NetworkManager configuration file.

### **Why can't I SSH into or run code in older versions of the host OS?**

While you’ve always been able to SSH into your container, we had previously restricted SSH access to the host OS. We had a number of reasons for doing this:

* Code in the host OS currently isn't kept inside a container, so we are unable to track or update it at all.
* If code run in the host OS inadvertently kills our supervisor or overwrites critical data (such as data used to identify it), the device could become inaccessible and no longer updateable.
* Configuration of network device drivers, mount points, security provisions, and many other details have been carefully chosen to serve the balena ecosystem and your containers. Rogue code running in the host OS might interfere with this, leading to issues or degradation of performance which we would likely not be able to help you with.
* When troubleshooting issues we base our assumptions on the host OS behaving as we expect it to. If you have made changes here, there's a good chance we won't be able to reproduce the issues locally and therefore won't be able to help you.

However, we've heard from users that they would still like to be able to SSH into the host OS on their devices, so we decided to add that capability starting with balenaOS version 2.7.5. This gives you access to logs and tools for services that operate outside the scope of your container, such as NetworkManager, Docker, cloudlink, and the supervisor. For more details, please check out [this documentation](../learn/develop/runtime.md).

### **Which data is persisted on devices across updates/power cycles?**

The only data we [guarantee to be persisted](../learn/develop/runtime.md#persistent-storage) across reboot, shutdown and device update/container restart is the contents of the `/data` folder, or any [named volumes](../learn/develop/multicontainer.md#named-volumes) on devices running balenaOS v2.12.0 and above. However, when a device is restarted or power cycled the container is not recreated, meaning all the data that was present in the container's filesystem before, remains. It's very important not to rely on this behavior, as containers are recreated on release updates, when environment variables are changed in the UI or API, or when a fleet restart is requested.

### **Why does /data disappear when I move a device between fleets?**

Persistent data is specific to a fleet. If you move devices between fleets running different code, then keeping persistent data from the old fleet could potentially cause issues.

On devices running balenaOS versions before 2.12.0, if you move the device back to the old fleet you'll find `/data` remains intact. Newer balenaOS versions automatically purge named volumes when a device is moved to a new fleet.

### **It appears that there is a centralized master running (in cloud) and agents running on devices. Is that accurate?**

Yes. In fact there are multiple services running on the cloud and the devices communicate with some of them. On the device we run our agent in a Docker container, like user-deployed containers.

### **What type of encryption do you use over OpenVPN? SSL/TLS/AES-256? Mutual key authentication? over SSH?**

The VPN connection is TLS with the default ciphersuite negotiation settings which today boil down to DHE-RSA-AES256-SHA. We use certificates to authenticate the server to the client and API keys to authenticate the client to the server.

### **What is the performance impact on the gateway device due to encryption?**

There isn't any. The VPN connection is only used for short messages sent by our servers to the device and for device URL traffic. Internet traffic is routed normally, outside the VPN, therefore doesn't go through the encryption/decryption process.

### **How long does the update process run typically? Do you have any benchmark data? For now it appears to be quick for small updates.**

The update process currently depends on the size of the update and the speed of the Internet connection. The size of the update is currently the size of the Docker layers that differ between the Docker image on the device and the Docker image of the newly pushed code. We currently have a [delta-mechanism](../learn/deploy/delta.md), which calculates binary difference between two images, which will drop the update size significantly, even on cases where no Docker layers are shared. If you are interested in testing this out, check out the [delta updates](../learn/deploy/delta.md) documentation.

### **How does the device registration work over the VPN and how do you ensure the identity of the device on the first-time registration?**

The OS image you download from the UI has embedded credentials that allow the device to join your fleet without user input on boot. You should keep your downloaded images private.

### **If the device is installed behind a proxy/firewall and can’t be reachable on internet via direct connection, what are the pitfalls?**

The balena device supervisor needs to be able to access our cloud services in order for you to be able to manage your device. When the device is disconnected from the internet it still continues to run the last release it obtained.

### **How do you secure your own cloud to prevent malicious attack which may allow attacker to break-in to our systems?**

Generally, we try to follow good OPSEC practices for our systems. We support 2FA for user accounts and force all the connections to be over HTTPS. More details on our approach can be found on our [security page](../learn/welcome/security.md).

### **How long is a balenaOS release maintained for?**

BalenaOS comes in two flavors, a rolling release and an [Extended Support Release (ESR)](../reference/OS/extended-support-release.md). Rolling releases stop being maintained as soon as a new release is out. In other words, only the latest balenaOS release is maintained. ESR releases receive bug and security fixes for 9 months after its release date.

### **When are device types discontinued?**

Device types are [discontinued](questions.md#what-does-it-mean-when-a-device-type-is-discontinued) in balenaOS based on criteria outlined [here](../reference/hardware/versioning.md#discontinued)

### **What does it mean when a device type is discontinued?**

Discontinued devices will continue to work as usual and will be able to use all balenaCloud functionality available at the time of the last balenaOS release. However, discontinued devices will no longer receive new balenaOS releases, except for [Extended Support Releases](../reference/OS/extended-support-release.md) that will continue to receive bug and security fixes for 9 months from the ESR release date. Balena will no longer offer support for discontinued devices on the paid support channels, but support is available in the forums.

Please contact sales@balena.io with any questions regarding continued device support.

### **I have a device that is not on the supported devices list. Can it run on balena?**

There are a few options for devices that do not have an official device type on balena. If your device has an x86 architecture, you can try either the [Intel NUC](../../learn/getting-started/intel-nuc/nodejs/) image (which is built to support generic x86 devices with a minimum set of drivers), or the generic genericx86-64 image (that includes all the standard X86 drivers). For other devices, you can [build your own](https://github.com/balena-os/meta-balena/blob/master/contributing-device-support.md) version of balenaOS using our [open source repos](https://github.com/balena-os). To discuss custom board support, please contact sales@balena.io.

### **What to keep in mind when choosing power supply units?**

Power supply units (PSUs) are a critical component to any widespread production deployment, as mentioned in our [Going to Production](../learn/welcome/production-plan.md) guide. When buying a PSU for your hardware, be sure to inspect and understand the board's power requirements carefully. Current requirements (measured in Amps) are just as important as the voltage requirements (measured in Volts). A PSU that provides a higher voltage than required may damage the board, but a supplied voltage that is too low may cause the board to malfunction or fail to boot. If the PSU isn't capable of providing the maximum current that the board demands, then the board might eventually fail to perform under CPU-intensive loads. As the load increases, more current is drawn than the PSU can supply, which could lead to brown-outs (i.e., the board unexpectedly resetting, causing filesystem corruption). When buying PSUs or using the official power adapters, proper research is recommended to prevent scenarios like these in a production deployment.

### **Does balena have access to my device, source code and images?**

Device access is granted to a subset of balena employees to [enable support and device troubleshooting](../learn/accounts/support-access.md). This access is controlled by ssh key access and only after access is explicitly granted to balena. Release source code and images are stored on balena backend servers with access limited only to administrative/operational staff and are not exposed to anyone outside of balena. It is also possible to bypass the balena builder entirely and push only pre-built artifacts, meaning that balena never has access to the code at any point.

### What are generic architecture images?

BalenaOS is primarily used in embedded devices, that is, devices with a dedicated function and mostly static hardware. However, non-embedded type hardware is increasingly being used and is supported with the generic architecture images. These general purpose images are designed to support the widest possible hardware for the supported architectures. They can also be used to run balenaOS virtualized, for example using [QEMU](https://www.qemu.org), in servers or even consumer motherboards, and they are used as a base for balenaOS AWS images.

BalenaOS currently offers the following choice of generic architecture images:

* **Generic x86\_64 (MBR)**: These are generic architecture images that use the [Master Boot Record (MBR)](https://en.wikipedia.org/wiki/Master_boot_record) partition table. They are only recommended for legacy hardware that uses an MBR bootloader.
* **Generic x86\_64 (GPT)**: These are generic architecture images that use the [GUID Partition Table (GPT)](https://en.wikipedia.org/wiki/GUID_Partition_Table). These are recommended for any new [UEFI](https://en.wikipedia.org/wiki/UEFI) x86\_64 device, including modern Intel NUC devices.
* **Generic AARCH64**: These are generic architecture images recommended for any new UEFI ARM64 device.

### What is the difference between the Intel NUC and the Generic x86\_64 images?

The Intel NUC images are images purposely built to match the Intel NUC hardware. They will probably work on other x86\_64 device but lack support for hardware that is not available on Intel NUCs. Modern Intel NUCs are better supported using the [Generic Architecture Images](questions.md#what-are-generic-architecture-images) described above.
