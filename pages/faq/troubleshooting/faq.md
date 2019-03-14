---
title: FAQs
---
# Frequently Asked Questions

* [Can I use multiple containers?](#can-i-use-multiple-containers)
* [Can I mix device types in an application?](#can-i-mix-device-types-in-an-application)
* [How do I push a new git repo to an Application](#how-do-i-push-a-new-git-repo-to-an-application)
* [Why does `/data` report weird usage?](#why-does-data-report-weird-usage)
* [What NTP servers do the devices use?](#what-ntp-servers-do-the-devices-use)
* [What Network Ports are required?](#what-network-ports-are-required)
* [Can I access /dev and things like GPIO from the container?](#can-i-access-dev-and-things-like-gpio-from-the-container)
* [Can I set a static IP address for my device?](#can-i-set-a-static-ip-address-for-my-device)
* [Why can't I SSH into or run code in older versions of the host OS?](#why-can-t-i-ssh-into-or-run-code-in-older-versions-of-the-host-os)
* [How can I forward my container ports?](#how-can-i-forward-my-container-ports)
* [Which data is persisted on devices across updates/power cycles?](#which-data-is-persisted-on-devices-across-updates-power-cycles)
* [Why does /data disappear when I move a device between applications?](#why-does-data-disappear-when-i-move-a-device-between-applications)
* [It appears that there is a centralized master running (in cloud) and agents running on devices. Is that accurate?](#it-appears-that-there-is-a-centralized-master-running-in-cloud-and-agents-running-on-devices-is-that-accurate)
* [What type of encryption do you use over OpenVPN? SSL/TLS/AES-256? Mutual key authentication? over SSH?](#what-type-of-encryption-do-you-use-over-openvpn-ssl-tls-aes-256-mutual-key-authentication-over-ssh)
* [What is the performance impact on the gateway device due to encryption?](#what-is-the-performance-impact-on-the-gateway-device-due-to-encryption)
* [How long does the update process run typically? For now it appears to be quick for small updates.](#how-long-does-the-update-process-run-typically-do-you-have-any-benchmark-data-for-now-it-appears-to-be-quick-for-small-updates)
* [How does the device registration work over the VPN and how do you ensure the identity of the device on the first-time registration?](#how-does-the-device-registration-work-over-the-vpn-and-how-do-you-ensure-the-identity-of-the-device-on-the-first-time-registration)
* [If the device is installed behind a proxy/firewall and can’t be reachable on Internet via direct connection, what are the pitfalls?](#if-the-device-is-installed-behind-a-proxy-firewall-and-can-t-be-reachable-on-internet-via-direct-connection-what-are-the-pitfalls)
* [How do you secure your own “cloud” to prevent malicious attack which may allow attacker to break-in our systems?](#how-do-you-secure-your-own-cloud-to-prevent-malicious-attack-which-may-allow-attacker-to-break-in-our-systems)
* [What does it mean when a device type is discontinued?](#what-does-it-mean-when-a-device-type-is-discontinued)
* [I have a device that is not on the supported devices list. Can it run on {{ $names.company.lower }}?](#i-have-a-device-that-is-not-on-the-supported-devices-list-can-it-run-on-{{ $names.company.lower }})
* [I have an existing fleet of devices, can I remotely move these devices to balenaCloud without needing to reprovision them?](#i-have-an-existing-fleet-of-devices-can-i-remotely-move-these-devices-to-balenacloud-without-needing-to-reprovision-them)
* [My devices operate within a private organizational network, or are completely air-gapped, so using a third-party cloud provider is not feasible. Can balena accommodate these requirements?](#my-devices-operate-within-a-private-organizational-network-or-are-completely-air-gapped-so-using-a-third-party-cloud-provider-is-not-feasible-can-balena-accommodate-these-requirements)
* [I would like to migrate across to Balena but my timeframes are tight and I’m not sure where to start, what services can you offer to help?](#i-would-like-to-migrate-across-to-balena-but-my-timeframes-are-tight-and-im-not-sure-where-to-start-what-services-can-you-offer-to-help)
* [Are discounts available for large volumes of devices or for contract lengths of longer than one year?](#are-discounts-available-for-large-volumes-of-devices-or-for-contract-lengths-of-longer-than-one-year)
* [Are discounts available for educational or non-profit use-cases?](#are-discounts-available-for-educational-or-non-profit-use-cases)
* [Do I have to keep paying the monthly fee for a device that is provisioned but then warehoused, or used intermittently?](#do-i-have-to-keep-paying-the-monthly-fee-for-a-device-that-is-provisioned-but-then-warehoused-or-used-intermittently)


##### Can I use multiple containers?
Multiple container applications are supported, beginning with {{ $names.os.lower }} v2.12.0. To run multiple containers, you will need to create or upgrade to a [starter or microservices type application][app-types] and include a `docker-compose.yml` file at the root of your project. You can reference the [multicontainer documentation][multicontainer] for more details on the supported configurations.

__Note:__ If you do not see an option to choose a starter or microservices application type, a multicontainer compatible OS version has not yet been released for the selected device type.

If you are running a Docker-in-Docker setup, which builds a single application container on the {{ $names.company.lower }} servers but has a `docker-compose.yml` file at the root of the project, you'll want to rename the file to something like `dind-compose.yml`. Then when you run Docker Compose in your container, you can use the `-f` flag with the new file name: `docker-compose -f dind-compose.yml up`.

##### Can I mix device types in an application?

It is possible to have devices of [different types][device-types] in the same application, as long as the devices share the same architecture. For example, you could have an application with both Raspberry Pi 3 and BeagleBone Black devices, as they both use an ARMv7 processor. However, you could not have any Intel NUC devices as part of the same application, as those devices have x86-64 processors.

Regardless of type, all devices in your application will get the same container images. This means that if you have mixed device types you'll need to use an architecture-specific [base image][base-image] in your [Dockerfile][dockerfile], rather than one based on device type.

##### How do I push a new git repo to an application?
If you have pushed a repository called `project-A` to your application and at a later stage you would like to push a new project called `project-B`, you can do this by adding the application remote (`git remote add {{ $names.company.short }} <USERNAME>@git.{{ $names.domain }}:<USERNAME>/<APPNAME>.git`) to `project-B`'s local repository. You can then easily push `project-B` to your application by just doing `git push {{ $names.company.short }} master -f`. The extra `-f` on the command forces the push and resets the git history on the git remote on {{ $names.company.lower }}'s backend. You should now have `project-B` running on all the devices in the application fleet. Note that once you have successfully switched to `project-B` you no longer need to add the `-f` on every push, for more info check out the docs on [forced git pushes](https://git-scm.com/docs/git-push#git-push--f).

##### Why does /data report weird usage?
On the device we have a writable data partition that uses all the free space remaining after reserving the required amount for the host os. This data partition contains the Docker images for the {{ $names.company.lower }} device supervisor and the user applications so that they can be updated, along with containing the persistent `/data` for the application to use, this way it avoids reserving a specific amount of space for either images or data and then finding out that we have reserved too much or too little for one. So the space usage in `/data` being used but not accounted for will likely be due to the Docker images. (As a side note if you want the most accurate usage stats you should use `btrfs fi df /data` as `df` is not accurate for btrfs partitions).

##### What NTP servers do the devices use?
Up to {{ $names.os.lower }} v2.0.6, the NTP service connects to the following time servers:

- pool.ntp.org
- time1.google.com
- time2.google.com
- time3.google.com
- time4.google.com

Starting from {{ $names.os.lower }} v2.0.7, the devices connect to the following NTP servers:

- 0.resinio.pool.ntp.org
- 1.resinio.pool.ntp.org
- 2.resinio.pool.ntp.org
- 3.resinio.pool.ntp.org

##### What network ports are required?
In order for a {{ $names.company.lower }} device to get outside of the local network and connect to the {{ $names.company.lower }} API, there are a few core network requirements.

{{ $names.company.upper }} makes use of the following ports:

* `443` TCP - This is the most fundamental requirement - it is used to connect to the VPN and the web terminal, and many web endpoints using TLS (`https://`.)
* `123` UDP - For NTP time synchronisation.
* `53` UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings.

Additionally, if the network your device is connecting to works with whitelisting, you should whitelist the following domains on port `80` and `443`:
* `*.{{ $names.domain }}`
* `*.pubnub.com`

##### Can I access /dev and things like GPIO from the container?
If you're application uses a single container, it will be run in privileged mode by default and will have access to hardware in the same way as a vanilla Linux system.

For applications running [multiple containers][multicontainer], you will either need to define services as privileged or use the `cap_add` and `devices` settings in the `docker-compose.yml` file to map in the correct hardware access to the container.

##### Can I set a static IP address for my device?
Yes! It's actually pretty easy. Have a look at the [network setup][static-ip] section of our documentation. In general, most network configurations can be achieved by changing the NetworkManager configuration file.

##### Why can't I SSH into or run code in older versions of the host OS?
While you’ve always been able to SSH into your container, we had previously restricted SSH access to the host OS. We had a number of reasons for doing this:

- Code in the host OS currently isn't kept inside a container, so we are unable to track or update it at all.
- If code run in the host OS inadvertently kills our supervisor or overwrites critical data (such as data used to identify it), the device could become inaccessible and no longer updateable.
- Configuration of network device drivers, mount points, security provisions, and many other details have been carefully chosen to serve the {{ $names.company.lower }} ecosystem and your containers. Rogue code running in the host OS might interfere with this, leading to issues or degradation of performance which we would likely not be able to help you with.
- When troubleshooting issues we base our assumptions on the host OS behaving as we expect it to. If you have made changes here, there's a good chance we won't be able to reproduce the issues locally and therefore won't be able to help you.

However,  we've heard from users that they would still like to be able to SSH into the host OS on their devices, so we decided to add that capability starting with {{ $names.os.lower }} version 2.7.5. This gives you access to logs and tools for services that operate outside the scope of your application container, such as NetworkManager, Docker, the VPN, and the supervisor. For more details, please check out [this documentation](/runtime/runtime/#accessing-the-host-os).

##### How can I forward my container ports?
It's usually not necessary to forward ports within the container because the container is bound to the host networking. However if you do need to do something like `docker run -p [host port]:[container port]`, it can be achieved with `iptables`.

For example, mapping port 80 to 8080 can be achieved with the following:-
```
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

##### Which data is persisted on devices across updates/power cycles?
The only data we [guarantee to be persisted][persistent-storage] across reboot, shutdown and device update/container restart is the contents of the `/data` folder, or any [named volumes][named-volumes] on devices running {{ $names.os.lower }} v2.12.0 and above.
However, when a device is restarted or power cycled the container is not recreated, meaning all the data that was present in the container's filesystem before, remains.
It's very important not to rely on this behaviour, as containers are recreated on application updates, when environment variables are changed in the UI or API, or when an application restart is requested.

##### Why does /data disappear when I move a device between applications?
Persistent data is specific to an application. If you move devices between applications running different code, then keeping persistent data from the old application could potentially cause issues.

On devices running {{ $names.os.lower }} versions before 2.12.0, if you move the device back to the old application you'll find `/data` remains intact. Newer {{ $names.os.lower }} versions automatically purge named volumes when a device is moved to a new application.

##### It appears that there is a centralized master running (in cloud) and agents running on devices. Is that accurate?
Yes. In fact there are multiple services running on the cloud and the devices communicate with some of them. On the device we run our agent in a Docker container, like a user application.

##### What type of encryption do you use over OpenVPN? SSL/TLS/AES-256? Mutual key authentication? over SSH?
The VPN connection is TLS with the default ciphersuite negotiation settings which today boil down to DHE-RSA-AES256-SHA. We use certificates to authenticate the server to the client and API keys to authenticate the client to the server.

##### What is the performance impact on the gateway device due to encryption?
There isn't any. The VPN connection is only used for short messages sent by our servers to the device and for device URL traffic. Internet traffic is routed normally, outside the VPN, therefore doesn't go through the encryption/decryption process.

##### How long does the update process run typically? Do you have any benchmark data? For now it appears to be quick for small updates.
The update process currently depends on the size of the update and the speed of the Internet connection. The size of the update is currently the size of the Docker layers that differ between the Docker image on the device and the Docker image of the newly pushed code. We currently have a [delta-mechanism](/runtime/delta/), which calculates binary difference between two images, which will drop the update size significantly, even on cases where no Docker layers are shared. If you are interested in testing this out, check out the the [delta updates](/runtime/delta/) documentation.

##### How does the device registration work over the VPN and how do you ensure the identity of the device on the first-time registration?
The OS image you download from the UI has embedded credentials that allow the device to register to your application without user input on boot. You should keep your downloaded images private.

##### If the device is installed behind a proxy/firewall and can’t be reachable on internet via direct connection, what are the pitfalls?
The {{ $names.company.lower }} device supervisor needs to be able to access our cloud services in order for you to be able to manage your device. When the device is disconnected from the internet it still runs the application it has installed.

##### How do you secure your own cloud to prevent malicious attack which may allow attacker to break-in our systems?
Generally, we try to follow good OPSEC practices for our systems. We support 2FA for user accounts and force all the connections to be over HTTPS. More details on our approach can be found on our [security page][security].

##### What does it mean when a device type is discontinued?

Discontinued devices will no longer be actively supported by {{ $names.company.lower }}. This means we will no longer provide prebuilt versions of {{ $names.os.lower }} for these devices, and we will not be resolving any issues related to these boards. In addition, it will no longer be possible to create applications for these device types, although existing applications and their devices will still function. If you would like to keep your discontinued devices updated with the latest {{ $names.os.lower }} changes, you can [build your own]({{ $links.githubOS }}/meta-balena/blob/master/contributing-device-support.md) board-specific versions using our [open source repos]({{ $links.githubOS }}). Please contact sales@{{ $names.domain }} with any questions regarding continued device support.

##### I have a device that is not on the supported devices list. Can it run on {{ $names.company.lower }}?

There are a few options for devices that do not have an official device type on {{ $names.company.lower }}. If your device has an x86 architecture, you can try the [Intel NUC][nuc] image, which is built to support generic x86 devices. For other devices, you can [build your own][build-your-own] version of {{ $names.os.lower }} using our [open source repos][balenaOS]. To discuss custom board support, please contact sales@{{ $names.domain }}.

[forums]:https://forums.{{ $names.domain }}/c/troubleshooting

[device-types]:/reference/base-images/devicetypes
[base-image]:/reference/base-images/base-images
[dockerfile]:/learn/develop/dockerfile
[multicontainer]:/learn/develop/multicontainer
[app-types]:/learn/manage/app-types
[static-ip]:/reference/OS/network/2.x/#setting-a-static-ip
[security]:/learn/welcome/security
[persistent-storage]:/learn/develop/runtime/#persistent-storage
[named-volumes]:/learn/develop/multicontainer/#named-volumes
[balenaOS]:{{ $links.githubOS }}
[build-your-own]:{{ $links.githubOS }}/meta-balena/blob/master/contributing-device-support.md
[nuc]:/learn/getting-started/intel-nuc/nodejs/


##### I have an existing fleet of devices, can I remotely move these devices to balenaCloud without needing to reprovision them?
Balena offers a brownfield OTA migration service, which is designed to bring devices that are already deployed in the field across to balenaCloud. The brownfield migration service consists of a migration tool that updates the operating system on your devices from their current Linux distribution, such as Debian or Ubuntu, to balenaOS, and starts running your balenaCloud application. We also offer optional services to assist with performing the migration.

The migration tool is customized depending on your device type, operating system, network configuration, and data requirements, and is delivered as an executable that downloads the required components to update the device to balenaOS, connect to the balenaCloud API, and download your application container(s).

Email: solutions@balena.io to discuss your device fleet setup and migration requirements.

##### My devices operate within a private organizational network, or are completely air-gapped, so using a third-party cloud provider is not feasible. Can balena accommodate these requirements?

The entire balenaCloud stack can be delivered on-premise, allowing you to run all of the key balenaCloud services such as builder, registry, VPN, data API and cloud dashboard from within your own private network. On-premise balenaCloud is available in two different forms:

- Dedicated Instance: The balenaCloud stack is delivered on your own internal cloud infrastructure. The setup, updates and ongoing maintenance are delivered by balena engineers and support provided via our SLA support packages.

- Balena Machine: - the balenaCloud stack is delivered as a Virtual Machine to run on a local server, or as an appliance running on an Intel NUC or similar device, which can be configured to provide the balenaCloud services on your local network.

Both on-premise solutions described above allow additional flexibility and control over the standard balenaCloud offering to manage the unique security needs you may have. Contact  solutions@balena.io to discuss your setup in more detail.


##### I would like to migrate across to Balena but my timeframes are tight and I’m not sure where to start, what services can you offer to help?

Balena offers an accelerator program designed to help you transition your fleet across to balenaCloud faster and to help you make the most of Balena’s feature set. This is achieved through a series of remote workshops and hands-on technical account management over a defined period of time, usually around 6 weeks, and ends with you transitioning into our Production Plan for ongoing support

The program covers key topics such as: provisioning user accounts and device registration, migrating your application from native Linux to containers, advice on architecting a product for ease of management in production, more complex production workflows such as phased deployments, best practices for fleet management, and so forth.

Each accelerator program is tailored to the customer's unique requirements and setup, so contact solutions@balena.io to find discuss further.

##### Are discounts available for large volumes of devices or for contract lengths of longer than one year?

We offer two levers for discounting the per-device fees on balenaCloud. We have a discount schedule for device volume, where the marginal cost of devices decreases as your device count increases. We also offer discounts based on term pre-payment for the entire balenaCloud subscription cost. To learn more based on your specific project and device ramp, please contact us at solutions@balena.io

##### Are discounts available for educational or non-profit use-cases?

In order to fit the use-case and budgets of educational institutions and non-profits, we are able to offer conditional discounts for the balenaCloud subscription costs. For more information, please contact us at solutions@balena.io

##### Do I have to keep paying the monthly fee for a device that is provisioned but then warehoused, or used intermittently?

For devices that are provisioned and immediately warehoused, or devices that are used less frequently than once a month, we offer the ability to “deactivate” a device. A deactivated device does not receive software updates, must remain powered off, but is not included in the monthly balenaCloud subscription cost. A charge of one device-month (based on the device’s normal subscription cost at balena.io/pricing) is levied when the device is deactivated. After this, the device is not included in the subscription cost until it is re-activated.
