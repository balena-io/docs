# Frequently Asked Questions

* [What NTP servers do resin.io devices use?](/pages/troubleshooting/faq.md#what-ntp-servers-do-resin-io-devices-use-)
* [What Network Ports are required by resin.io?](/pages/troubleshooting/faq.md#what-network-ports-are-required-by-resin-io)
* [Can I access /dev and things like GPIO from the container?](/pages/troubleshooting/faq.md#can-i-access-dev-and-things-like-gpio-from-the-container-)
* [Why is my device showing the incorrect time?](/pages/troubleshooting/faq.md#why-is-my-device-showing-the-incorrect-time-)
* [Can I set a static IP address for my device?](/pages/troubleshooting/faq.md#can-i-set-a-static-ip-address-for-my-device-)
* [Why can't I SSH into or run code in the HostOS?](/pages/troubleshooting/faq.md#why-can-t-i-ssh-into-or-run-code-in-the-hostos-)
* [How can I forward my Container ports?](/pages/troubleshooting/faq.md#how-can-i-forward-my-container-ports-)
* [Which data is persisted on devices across updates/power cycles?](/pages/troubleshooting/faq.md#which-data-is-persisted-on-devices-across-updates-power-cycles-)
* [Is the cache shared between build server for non-native and native ARM builds?](/pages/troubleshooting/faq.md#is-the-cache-shared-between-build-server-for-non-native-and-native-arm-builds-)
* [Why does /data disappear when I move a device between applications?](/pages/troubleshooting/faq.md#why-does-data-disappear-when-i-move-a-device-between-applications-)

##### What NTP servers do resin.io devices use?
Currently the servers used are:
* time1.google.com
* time2.google.com
* time3.google.com
* time4.google.com

There appears to be load balancing going on as to which one is specifically chosen. On the device this is activated via systemd-timesyncd which subsequently triggers ntp as required.

##### What Network Ports are required by resin.io?

In order for a resin.io device to get outside of the local network and connect to the resin.io API, there are a few core network requirements.

Resin.io makes use of the following ports:

* `443` TCP - This is the most fundamental requirement - it is used to connect to the VPN and the web terminal, and many web endpoints using TLS (https://.)
* `123` UDP - For NTP time synchronisation.
* `53` UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings.

Additionally, if the network your device is connecting to works with whitelisting, you should whitelist the following domains on Port `80` and `443`:
* `*.resin.io`
* `*.pubnub.com`
* `*.ngrok.com`
* `*.ngrok.io`

##### Can I access /dev and things like GPIO from the container?

Yes! All resin.io containers run in privileged mode, which means you can access your hardware in the same way as you do in vanilla linux systems.

##### Why is my device showing the incorrect time?

Sometime you may notice the date/time on the device is incorrect, usually via logs.

There seems to be some flakiness with NTP, in theory, it ought to update on connection to the internet (via connman), and then every 2 hours, but appears to fail to do so sometimes altogether.
A potential cause is the NTP port (123 UDP) being blocked on the network the device belongs to, if this is not the case, the send us a message on support@resin.io

##### Can I set a static IP address for my device?

Yes! its actually pretty easy, have a look at the [ethernet network setup](/pages/deployment/wifi.md) section of our documentation. In general most network configurations can be achieved by changing the [Connman][connman-link] configuration file.

##### Why can't I SSH into or run code in the HostOS?

The containers in which resin.io applications run are extremely powerful, nearly any code you run will have no idea it's not being run in the host OS. We map devices, network and persistent storage (located at `/data`) to provide applications with more than a typical container-run application would have access to.

While we provide a lot of power to these applications, we disallow access to the host OS for a number of reasons:-
* A core feature of resin.io is that we keep track of your code and make it updateable. Code in the host OS currently isn't kept inside a container so we are unable to track or update it at all.
* If code run in the host OS inadvertently (or otherwise :) kills our supervisor or overwrites critical data such as data used to identify it, the device could become inaccessible and no longer updateable.
* Configuration of network device drivers, mount points, security provisions, and many other details have been carefully chosen to serve the resin ecosystem and your containers - rogue code running in the host OS might interfere with this leading to issues or degradation of performance which we would likely not be able to help you with.
* When troubleshooting issues we base our assumptions on the host OS behaving as we expect it to - if you have made changes here, there's a good chance we won't be able to reproduce the issues locally and therefore won't be able to help you.
* The whole purpose of a container is to give you complete control over the environment your code operates in and allow you to configure it exactly as you wish - the host OS has to have things configured a certain way and is extremely minimal in what it provides to code running inside of it (enough to allow resin containers to run), why throw all of that away?

If there's something you need to do or inspect that resin.io doesn't provide you within your application container, let us know at support@resin.io and we will do all we can to help. There is a surprisingly little that requires host OS access and very soon we hope to reduce this to virtually zero.

##### How can I forward my Container ports?

It's usually not necessarily to forward ports within the container because the container is bound to the host networking.   However if you do need to do something like `docker run -p [host port]:[container port]`, it can be achieved with `iptables`.

For example, mapping port 80 to 8080 can be achieved with the following:-
```
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

##### Which data is persisted on devices across updates/power cycles?

The only data we guarantee to be persisted across reboot, shutdown and device update/container restart is the contents of the `/data` folder.
However, when a device is restarted or power cycled the container is not recreated, meaning all the data that was present in the container's filesystem before, remains.
It's very important not to rely on this behaviour, as containers are recreated on application updates, when environment variables are changed in the UI or API, or when an application restart is requested.

##### Is the cache shared between build server for non-native and native ARM builds?
Yes :)

##### Why does /data disappear when I move a device between applications?

The `/data` is specific to a given app, so if you move the device back to the other app you'll find `/data` is there for that app again.  The reason for this is that if you move devices between applications running different code then keeping `/data` from the other would potentially cause issues. In future we plan to add the option to purge `/data` on device move (so it will be gone on moving back, without having to purge before moving). We also hope to add the option to transfer the data with the device as it moves between applications.

[connman-link]:http://en.wikipedia.org/wiki/ConnMan
