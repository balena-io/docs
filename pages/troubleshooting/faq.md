---
title: FAQs
---
# Frequently Asked Questions

* [Can I use Multiple containers?](#can-i-use-multiple-containers-)
* [How do I push a new git repo to an Application](#how-do-i-push-a-new-git-repo-to-an-application-)
* [What version of Docker runs on the Devices?](#what-version-of-docker-runs-on-the-devices-)
* [Why does `/data` report weird usage?](#why-does-data-report-weird-usage-)
* [What NTP servers do resin.io devices use?](#what-ntp-servers-do-resin-io-devices-use-)
* [What Network Ports are required by resin.io?](#what-network-ports-are-required-by-resin-io-)
* [Can I access /dev and things like GPIO from the container?](#can-i-access-dev-and-things-like-gpio-from-the-container-)
* [Why is my device showing the incorrect time?](#why-is-my-device-showing-the-incorrect-time-)
* [Can I set a static IP address for my device?](#can-i-set-a-static-ip-address-for-my-device-)
* [Why can't I SSH into or run code in the HostOS?](#why-can-t-i-ssh-into-or-run-code-in-the-hostos-)
* [How can I forward my Container ports?](#how-can-i-forward-my-container-ports-)
* [Which data is persisted on devices across updates/power cycles?](#which-data-is-persisted-on-devices-across-updates-power-cycles-)
* [Why does /data disappear when I move a device between applications?](#why-does-data-disappear-when-i-move-a-device-between-applications-)
* [It appears that there is a centralized Resin Master running (in cloud) and agents running on devices. Is that accurate?](#it-appears-that-there-is-a-centralized-resin-master-running-in-cloud-and-agents-running-on-devices-is-that-accurate-)
* [What type of encryption do you use over OpenVPN? SSL/TLS/AES-256? Mutual key authentication? over SSH?](#what-type-of-encryption-do-you-use-over-openvpn-ssl-tls-aes-256-mutual-key-authentication-over-ssh-)
* [What is the performance impact on the gateway device due to encryption?](#what-is-the-performance-impact-on-the-gateway-device-due-to-encryption-)
* [How long does the update process run typically? For now it appears to be quick for small updates.](#how-long-does-the-update-process-run-typically-do-you-have-any-benchmark-data-for-now-it-appears-to-be-quick-for-small-updates-)
* [How does the device registration work over the VPN and how do you ensure the identity of the device on the first-time registration?](#how-does-the-device-registration-work-over-the-vpn-and-how-do-you-ensure-the-identity-of-the-device-on-the-first-time-registration-)
* [If the device is installed behind a proxy/firewall and can’t be reachable on Internet via direct connection, what are the pitfalls?](#if-the-device-is-installed-behind-a-proxy-firewall-and-can-t-be-reachable-on-internet-via-direct-connection-what-are-the-pitfalls-)
* [How do you secure your own “cloud” to prevent malicious attack which may allow attacker to break-in our systems?](#how-do-you-secure-your-own-cloud-to-prevent-malicious-attack-which-may-allow-attacker-to-break-in-our-systems-)
* [What does it mean when a device type is discontinued?](#what-does-it-mean-when-a-device-type-is-discontinued-)

##### Can I use multiple containers?
We are planning, and committed, to adding support for having multiple apps/containers running on a device. While the work towards multiple apps is in progress, as an interim solution, we do however  have a few users running [multiple containers within an app via docker-compose](https://resin.io/blog/multi-container-with-docker-compose-on-resin-io/) and [have done work with kubernetes](https://resin.io/blog/our-first-experiments-with-multi-container-apps/) in the same fashion.

##### How do I push a new git repo to an Application?
If you have pushed a repository called `project-A` to your application and at a later stage you would like to push a new project called `project-B`, you can do this by adding the application remote (`git remote add resin <USERNAME>@git.resin.io:<USERNAME>/<APPNAME>.git`) to `project-B`'s local repository. You can then easily push `project-B` to your application by just doing `git push resin master -f`. The extra `-f` on the command forces the push and resets the git history on the git remote on resin.io's backend. You should now have `project-B` running on all the devices in the application fleet. Note that once you have successfully switched to `project-B` you no longer need to add the `-f` on every push, for more info check out the docs on [forced git pushes](https://git-scm.com/docs/git-push#git-push--f).

##### What version of Docker runs on the devices?
Currently we're running v1.10.3, but continuously updating it as the versions are tested and verified on resin.io. Keep an eye on the [Announcements in the forums](https://forums.resin.io/c/announcements) for updates.

##### Why does /data report weird usage?
On the device we have a writable data partition that uses all the free space remaining after reserving the required amount for the host os. This data partition contains the Docker images for the resin supervisor and the user applications so that they can be updated, along with containing the persistent `/data` for the application to use, this way it avoids reserving a specific amount of space for either images or data and then finding out that we have reserved too much or too little for one. So the space usage in `/data` being used but not accounted for will likely be due to the Docker images. (As a side note if you want the most accurate usage stats you should use `btrfs fi df /data` as `df` is not accurate for btrfs partitions).

##### What NTP servers do resin.io devices use?
Currently the servers used are:
* time1.google.com
* time2.google.com
* time3.google.com
* time4.google.com

There appears to be load balancing going on as to which one is specifically chosen. On the device this is activated via systemd-timesyncd which subsequently triggers ntp as required.

##### What network ports are required by resin.io?
In order for a resin.io device to get outside of the local network and connect to the resin.io API, there are a few core network requirements.

Resin.io makes use of the following ports:

* `443` TCP - This is the most fundamental requirement - it is used to connect to the VPN and the web terminal, and many web endpoints using TLS (`https://`.)
* `123` UDP - For NTP time synchronisation.
* `53` UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings.

Additionally, if the network your device is connecting to works with whitelisting, you should whitelist the following domains on port `80` and `443`:
* `*.resin.io`
* `*.pubnub.com`

##### Can I access /dev and things like GPIO from the container?
Yes! All resin.io containers run in privileged mode, which means you can access your hardware in the same way as you do in vanilla Linux systems.

##### Why is my device showing the incorrect time?
Sometime you may notice the date/time on the device is incorrect, usually via logs.

There seems to be some flakiness with NTP, in theory, it ought to update on connection to the internet (via connman), and then every 2 hours, but appears to fail to do so sometimes altogether.
A potential cause is the NTP port (123 UDP) being blocked on the network the device belongs to, if this is not the case, the send us a message on the [forums][forums].

##### Can I set a static IP address for my device?
Yes! its actually pretty easy, have a look at the [ethernet network setup](/deployment/network/#set-static-ip) section of our documentation. In general most network configurations can be achieved by changing the [Connman](http://en.wikipedia.org/wiki/ConnMan) configuration file.

##### Why can't I SSH into or run code in older versions of the host OS?
While you’ve always been able to SSH into your container, we had previously restricted SSH access to the host OS. We had a number of reasons for doing this:

- Code in the host OS currently isn't kept inside a container, so we are unable to track or update it at all.
- If code run in the host OS inadvertently kills our supervisor or overwrites critical data (such as data used to identify it), the device could become inaccessible and no longer updateable.
- Configuration of network device drivers, mount points, security provisions, and many other details have been carefully chosen to serve the resin.io ecosystem and your containers. Rogue code running in the host OS might interfere with this, leading to issues or degradation of performance which we would likely not be able to help you with.
- When troubleshooting issues we base our assumptions on the host OS behaving as we expect it to. If you have made changes here, there's a good chance we won't be able to reproduce the issues locally and therefore won't be able to help you.

However,  we've heard from users that they would still like to be able to SSH into the host OS on their devices, so we decided to add that capability starting with resinOS version 2.7.5. This gives you access to logs and tools for services that operate outside the scope of your application container, such as NetworkManager, Docker, the VPN, and the supervisor. For more details, please check out [this documentation](/runtime/runtime/#accessing-the-host-os).

##### How can I forward my container ports?
It's usually not necessary to forward ports within the container because the container is bound to the host networking. However if you do need to do something like `docker run -p [host port]:[container port]`, it can be achieved with `iptables`.

For example, mapping port 80 to 8080 can be achieved with the following:-
```
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

##### Which data is persisted on devices across updates/power cycles?
The only data we guarantee to be persisted across reboot, shutdown and device update/container restart is the contents of the `/data` folder.
However, when a device is restarted or power cycled the container is not recreated, meaning all the data that was present in the container's filesystem before, remains.
It's very important not to rely on this behaviour, as containers are recreated on application updates, when environment variables are changed in the UI or API, or when an application restart is requested.

##### Why does /data disappear when I move a device between applications?
The `/data` is specific to a given app, so if you move the device back to the other app you'll find `/data` is there for that app again.  The reason for this is that if you move devices between applications running different code then keeping `/data` from the other would potentially cause issues. In future we plan to add the option to purge `/data` on device move (so it will be gone on moving back, without having to purge before moving). We also hope to add the option to transfer the data with the device as it moves between applications.

##### It appears that there is a centralized Resin.io Master running (in cloud) and agents running on devices. Is that accurate?
Yes. In fact there are multiple services running on the cloud and the devices communicate with some of them. On the device we run our agent in a Docker container, like a user application.

##### What type of encryption do you use over OpenVPN? SSL/TLS/AES-256? Mutual key authentication? over SSH?
The VPN connection is TLS with the default ciphersuite negotiation settings which today boil down to DHE-RSA-AES256-SHA. We use certificates to authenticate the server to the client and API keys to authenticate the client to the server.

##### What is the performance impact on the gateway device due to encryption?
There isn't any. The VPN connection is only used for short messages sent by our servers to the device and for device URL traffic. Internet traffic is routed normally, outside the VPN, therefore doesn't go through the encryption/decryption process.

##### How long does the update process run typically? Do you have any benchmark data? For now it appears to be quick for small updates.
The update process currently depends on the size of the update and the speed of the Internet connection. The size of the update is currently the size of the Docker layers that differ between the Docker image on the device and the Docker image of the newly pushed code. We currently have a [delta-mechanism](/runtime/delta/), which calculates binary difference between two images, which will drop the update size significantly, even on cases where no Docker layers are shared. If you are interested in testing this out, check out the the [delta updates](/runtime/delta/) documentation.

##### How does the device registration work over the VPN and how do you ensure the identity of the device on the first-time registration?
The OS image you download from the UI has embedded credentials that allow the device to register to your application without user input on boot. You should keep your downloaded images private.

##### If the device is installed behind a proxy/firewall and can’t be reachable on Internet via direct connection, what are the pitfalls?
The resin.io agent needs to be able to access our cloud services in order for you to be able to manage your device. When the device is disconnected from the Internet it still runs the application it has installed.

##### How do you secure your own "cloud" to prevent malicious attack which may allow attacker to break-in our systems?
Generally we try to follow good OPSEC practices for our systems. We support 2FA for user accounts and force all the connections to be over HTTPS.

##### What does it mean when a device type is discontinued?
Discontinued devices will no longer be actively supported by resin.io. This means we will no longer provide prebuilt versions of resinOS for these devices, and we will not be resolving any issues related to these boards. In addition, it will no longer be possible to create applications for these device types, although existing applications and their devices will still function. If you would like to keep your discontinued devices updated with the latest resinOS changes, you can [build your own](https://github.com/resin-os/meta-resin/blob/master/contributing-device-support.md) board-specific versions using our [open source repos](https://github.com/resin-os). Please contact sales@resin.io with any questions regarding continued device support.

[forums]:https://forums.resin.io/c/troubleshooting
