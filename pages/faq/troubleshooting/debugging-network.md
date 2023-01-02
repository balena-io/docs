# Network debugging

There are some common networking issues that can stop several major components
(VPN, Supervisor, balenaEngine) from working correctly.

The first thing to check would be confirming if the [networking requirements](https://www.balena.io/docs/reference/OS/network/2.x/#network-requirements) are being met.

Additionally, services running on the device themselves may have networking requirements
which may not be met. For example, a service may need to send data to a server, but the
server is offline and unreachable, and maybe the service isn't designed to handle these failures.

In general, debugging networking issues also gets easier the more you experiment 
with making changes to networking interfaces and routes on a device. The following
sections describe some of the more common network failure modes, as well as how to
track them down. Be aware that several of these problems may also occur at the same
time, with one problem causing others to appear. For example, NTP failure could stop
the date from being correct, which can lead to the VPN failing to connect (as the 
certificate is probably not yet date-valid) as well as the Supervisor failing to
download updates (for the same reason).

#### 6.1 NTP Failure

Service: `chronyd.service`
CLI: `chronyc`

Network Time Protocol is important because it allows devices without RTCs
(Real-Time Clocks) to retrieve the correct date and time from Internet based
servers that run on an extremely fine granularity. At first glance, this may
not seem significant, but devices such as the Raspberry Pi do not include an
RTC and so when balenaOS is first booted, it sets the time when the
release of the OS was built. Clearly, this could be days, weeks, months or
even years behind the current time. Because almost all the balena services
that work with applications work with balenaCloud endpoints, it is extremely
important that the date and time be set correctly, else SSL-based connections
(including HTTPS connections) will be rejected because the certificates
presented will appear to be date invalid when compared to the system clock.

Depending on how skewed the device date is from the real date, this can manifest
as several different issues:

- Refusal to connect to the balenaCloud VPN
- Refusal to download configuration from the API
- Refusal by the Supervisor to download the latest release

Examining the status of the `chronyd` service can show these symptoms, along
with the simple `date` command:

```shell
root@9294512:~# date
Fri Aug 19 09:11:43 UTC 2022
```

If the date reported by the device differs to the current date and time, then
there is most probably a problem with the time service.

Before continuing with this exercise, reboot or power down/power up and wait
for it to come online before SSHing into it.

Ensure you know the local IP address of the debug device (or use `balena scan`
to find the hostname of your device), and SSH into it like this (where
`10.0.0.197` is the IP address of your device, or `<host>.local` name):

```shell
$ balena ssh 10.0.0.197
Last login: Fri Aug 19 09:09:37 2022
root@9294512:~#
```

Your device should be connected, bring up the Dashboard page for the device.
It should be 'Online' and running the pushed release code.

We'll demonstrate an NTP failure by making some manual changes to the date:

```shell
root@9294512:~# date -s "23 MAR 2017 12:00:00"
Thu Mar 23 12:00:00 UTC 2017
root@9294512:~# systemctl restart openvpn
```

Almost immediately, you'll see that the device status moves to 'Online (Heartbeat only)'. So,
why has this happened? Wait until the device comes back online, then ssh back in and take a look in the OpenVPN logs:

```shell
root@9294512:~# journalctl --follow -n 300 -u openvpn.service
-- Journal begins at Thu 2017-03-23 12:00:02 UTC. --
Mar 23 12:00:24 9294512 openvpn[135086]: Thu Mar 23 12:00:24 2017 Attempting to establish TCP connection with [AF_INET]34.226.166.12:443 [nonblock]
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TCP connection established with [AF_INET]34.226.166.12:443
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TCP_CLIENT link local: (not bound)
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TCP_CLIENT link remote: [AF_INET]34.226.166.12:443
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TLS: Initial packet from [AF_INET]34.226.166.12:443, sid=416e63eb ed87172e
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 VERIFY ERROR: depth=1, error=certificate is not yet valid: C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=open-balena-vpn-rootCA
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 OpenSSL: error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TLS_ERROR: BIO read tls_read_plaintext error
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TLS Error: TLS object -> incoming plaintext read error
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 TLS Error: TLS handshake failed
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 Fatal TLS error (check_tls_errors_co), restarting
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 SIGUSR1[soft,tls-error] received, process restarting
Mar 23 12:00:25 9294512 openvpn[135086]: Thu Mar 23 12:00:25 2017 Restart pause, 5 second(s)
Mar 23 12:00:30 9294512 openvpn[135086]: Thu Mar 23 12:00:30 2017 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Mar 23 12:00:30 9294512 openvpn[135086]: Thu Mar 23 12:00:30 2017 TCP/UDP: Preserving recently used remote address: [AF_INET]3.225.166.106:443
Mar 23 12:00:30 9294512 openvpn[135086]: Thu Mar 23 12:00:30 2017 Socket Buffers: R=[131072->131072] S=[16384->16384]
```

There's a bit to wade through here, but the first line shows the OpenVPN
successfully finalizing a connection to the balenaCloud VPN backend. However,
we then see our manual restart of the `openvpn.service` unit file
(`Mar 23 12:00:06 9294512 openvpn[2639]: Thu Mar 23 12:00:06 2017 SIGTERM[hard,] received, process exiting`)
and then it starting up again. But whilst it initializes, you'll note that
whilst trying to connect it found a problem in the verification stage:

```shell
Aug 18 10:51:45 9294512 openvpn[2639]: Thu Aug 18 10:51:45 2022 VERIFY OK: depth=0, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=vpn.balena-cloud.com
Mar 23 12:00:07 9294512 openvpn[135086]: Thu Mar 23 12:00:07 2017 VERIFY ERROR: depth=1, error=certificate is not yet valid: C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=open-balena-vpn-rootCA
Mar 23 12:00:07 9294512 openvpn[135086]: Thu Mar 23 12:00:07 2017 OpenSSL: error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed
```

The certificate that it fetched from the balenaCloud VPN service is not yet
valid. This is because SSL certificates have "valid from" and "valid to"
dates. These ensure that they can only be used in a particular time window, and
if the current time falls outside of that window then any connection using them
is invalid. In this case, because we've set the time back to 2017, the date
doesn't fall within that window and the connection is aborted by the client.

But if the date is incorrect, why has the device reconnected?
Run the following on the device:

```shell
root@9294512:~# date
Fri Aug 19 09:25:45 UTC 2022
```

So the date's actually now correct. This is because the NTP service
(`chronyd.service`) has eventually noticed that there's a mismatch in the
set time on the device, and the time from one of it's sources. Let's look at
the journal for it:

```shell
root@9294512:~# journalctl --no-pager -u chronyd.service
Aug 18 10:51:01 9294512 healthdog[2011]: 2022-08-18T10:51:01Z chronyd version 4.0 starting (+CMDMON +NTP +REFCLOCK +RTC -PRIVDROP -SCFILTER -SIGND +ASYNCDNS -NTS -SECHASH +IPV6 -DEBUG)
Mar 23 12:01:09 9294512 healthdog[2011]: 2017-03-23T12:01:09Z Backward time jump detected!
Mar 23 12:01:09 9294512 healthdog[2011]: 2017-03-23T12:01:09Z Cannot synchronize: no selectable sources
Mar 23 12:01:19 9294512 healthdog[135156]: [chrony-healthcheck][INFO] No online NTP sources - forcing poll
Mar 23 12:01:19 9294512 healthdog[2011]: 2017-03-23T12:01:19Z System clock was stepped by -0.000000 seconds
Mar 23 12:01:25 9294512 healthdog[2011]: 2017-03-23T12:01:25Z Selected source 198.199.14.101 (0.resinio.pool.ntp.org)
Mar 23 12:01:25 9294512 healthdog[2011]: 2017-03-23T12:01:25Z System clock wrong by 170630052.229025 seconds
Aug 19 09:15:37 9294512 healthdog[2011]: 2022-08-19T09:15:37Z System clock was stepped by 170630052.229025 seconds
```

As you can see, it selected a source and set the time back to the correct
current time. This had a knock on effect, in that the openvpn service (VPN/cloudlink)
reattempted to connect to the backend:

```shell
root@9294512:~# journalctl -f -n 100 -u openvpn
Mar 23 12:01:21 9294512 openvpn[135086]: Thu Mar 23 12:01:21 2017 Fatal TLS error (check_tls_errors_co), restarting
Mar 23 12:01:21 9294512 openvpn[135086]: Thu Mar 23 12:01:21 2017 SIGUSR1[soft,tls-error] received, process restarting
Mar 23 12:01:21 9294512 openvpn[135086]: Thu Mar 23 12:01:21 2017 Restart pause, 5 second(s)
Aug 19 09:15:39 9294512 openvpn[135086]: Fri Aug 19 09:15:39 2022 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Aug 19 09:15:39 9294512 openvpn[135086]: Fri Aug 19 09:15:39 2022 TCP/UDP: Preserving recently used remote address: [AF_INET6]2600:1f18:6600:7f02:bda3:7af0:e21:425b:443
Aug 19 09:15:39 9294512 openvpn[135086]: Fri Aug 19 09:15:39 2022 Socket Buffers: R=[131072->131072] S=[16384->16384]
Aug 19 09:15:39 9294512 openvpn[135086]: Fri Aug 19 09:15:39 2022 Attempting to establish TCP connection with [AF_INET6]2600:1f18:6600:7f02:bda3:7af0:e21:425b:443 [nonblock]
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 TCP connection established with [AF_INET6]2600:1f18:6600:7f02:bda3:7af0:e21:425b:443
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 TCP_CLIENT link local: (not bound)
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 TCP_CLIENT link remote: [AF_INET6]2600:1f18:6600:7f02:bda3:7af0:e21:425b:443
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 TLS: Initial packet from [AF_INET6]2600:1f18:6600:7f02:bda3:7af0:e21:425b:443, sid=b355e635 6170b76f
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 VERIFY OK: depth=1, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=open-balena-vpn-rootCA
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 VERIFY KU OK
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 Validating certificate extended key usage
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 VERIFY EKU OK
Aug 19 09:15:40 9294512 openvpn[135086]: Fri Aug 19 09:15:40 2022 VERIFY OK: depth=0, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=vpn.balena-cloud.com
```

This time the connection has been verified and the device has come online. This
shows what might have happened if someone had manually set the date, but what
happens if it doesn't recover? This is a good example of where the NTP port
might have been blocked, so that the device couldn't sync it's time. It might
also be possible that the `chronyd.service` unit may have crashed or stopped
for some reason, and restarting it would solve the issue.

Changes such as this don't just affect the online status of the device. Let's
stop the chrony service completely (so it can't correctly resync the time) and
change the date again:

```shell
root@9294512:~# systemctl stop chronyd.service
root@9294512:~# date -s "23 MAR 2017 12:00:00"
```

Now from your development machine, again push the source code from the
`multicontainer-app` directory:

```shell
$ balena push DebugFleet
```

Once the build has completed, the device should try and download the updated
release. However, you'll notice that the download doesn't start and
no changes are made. The Dashboard stays static. Why is this? Well as you've
probably guessed, it's for the same reasons that the VPN connection doesn't
work. Run the following on your device:

```shell
root@9294512:~# journalctl -n 100 --no-pager -u balena-supervisor
-- Journal begins at Thu 2017-03-23 12:00:00 UTC, ends at Fri 2022-08-19 09:33:22 UTC. --
Aug 19 07:25:20 9294512 balena-supervisor[6890]: [debug]   Attempting container log timestamp flush...
Aug 19 07:25:20 9294512 balena-supervisor[6890]: [debug]   Container log timestamp flush complete
Aug 19 07:27:06 9294512 balena-supervisor[6890]: [api]     GET /v1/healthy 200 - 3.025 ms
Mar 23 12:00:02 9294512 balena-supervisor[6890]: [info]    Retrying current state report in 15 seconds
Mar 23 12:00:02 9294512 balena-supervisor[6890]: [event]   Event: Device state report failure {"error":"certificate is not yet valid"}
Mar 23 12:00:06 9294512 balena-supervisor[6890]: [info]    VPN connection is not active.
```

As you can see, the certificate is again not valid as the current device time
does not fall within the validity window, and so the Supervisor won't pull the
latest release. If we restart chrony, this will be rectified and the
Supervisor will, after a short delay, start the update:

```shell
root@9294512:~# systemctl start chronyd.service
root@9294512:~# journalctl -f -u balena-supervisor
-- Journal begins at Thu 2017-03-23 12:00:20 UTC. --


Mar 23 12:04:08 9294512 balena-supervisor[6890]: [info]    Retrying current state report in 240 seconds
Mar 23 12:04:08 9294512 balena-supervisor[6890]: [event]   Event: Device state report failure {"error":"certificate is not yet valid"}
Aug 19 09:55:20 9294512 balena-supervisor[6890]: [debug]   Attempting container log timestamp flush...
Aug 19 09:55:20 9294512 balena-supervisor[6890]: [debug]   Container log timestamp flush complete
Aug 19 09:55:41 9294512 balena-supervisor[6890]: [api]     GET /v1/device 200 - 24.495 ms
Aug 19 09:55:55 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 19 09:56:48 9294512 balena-supervisor[6890]: [info]    Applying target state
Aug 19 09:56:49 9294512 balena-supervisor[6890]: [event]   Event: Image removal {"image":{"name":"registry2.balena-cloud.com/v2/876c57f4b5dde80de9b0d01e325bcbfe@sha256:6ebc43e800b347004ec6945806b12d4111a2450f63544366c9961fab0caac2cd","appId":1958513,"serviceId":1706634,"serviceName":"backend","imageId":5298767,"releaseId":2265189,"dependent":0,"appUuid":"85e44a78a40a4d78ae1243caca2424dc","commit":"4101191493a1ffc54bec9101e045bacf"}}
Aug 19 09:56:49 9294512 balena-supervisor[6890]: [event]   Event: Image removal {"image":{"name":"registry2.balena-cloud.com/v2/e40d992f529b1567b0f2cc63f9fa877a@sha256:45c002b1bb325c1b93ff333a82ff401c9ba55ca7d00118b31a1c992f6fc5a4a4","appId":1958513,"serviceId":1706633,"serviceName":"frontend","imageId":5298766,"releaseId":2265189,"dependent":0,"appUuid":"85e44a78a40a4d78ae1243caca2424dc","commit":"4101191493a1ffc54bec9101e045bacf"}}
Aug 19 09:56:50 9294512 balena-supervisor[6890]: [debug]   Finished applying target state
Aug 19 09:56:50 9294512 balena-supervisor[6890]: [success] Device state apply success
Aug 19 09:56:58 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 19 09:57:20 9294512 balena-supervisor[6890]: [api]     GET /v1/healthy 200 - 4.198 ms
...
```

This shows the importance of a working service such as timesetting, and how this
can affect the system as a whole. As a note, be aware that not _every_ device
relies completely on NTP. Some devices, such as an Intel NUC, also have battery
backed services including an RTC, which means that even if NTP is not working
the time may look at first glance as though it's correct. However, if NTP is
not operational even an RTC will eventually suffer from clock skew (the slow
movement away from the real time due to drift) which will eventually cause
issues.

`chronyc` is a command-line utility that can be used to interoperate with the
NTP daemon. `chronyc` has many commands, the most useful are:

- `sources` - A list of all the current NTP sources being used by the NTP
  daemon.
- `reselect` - Forces the NTP daemon to reselect the best time synchronization
  source.
- `tracking` - Information about the system clock itself, including skew.
- `ntpdata` - Detailed information on all the current NTP sources.

#### 6.2 DNS Issues

Service: `dnsmasq.service`

DNS (Domain Name Service) functionality allows the IP address of a hostname to
be retrieved for use by anything that uses endpoints on the Internet (that
isn't specified by an IP address). Any executable that uses a hostname to
make a connection to that host always uses DNS to get the IP address to make
that connection.

For this reason, DNS is vital in the reliable operation of a balena device as it
provides the ability to lookup `*.balena-cloud.com` hostnames to allow the
download of releases, reporting the device state, connection to the VPN,
etc.

DNS is provided by the `dnsmasq.service` unit, which uses a default
configuration located at `/etc/dnsmasq.conf` and a list of nameservices
in `/etc/resolv.dnsmasq`. This itself is derived from the
`/var/run/resolvconf/interface/NetworkManager` file.

The DNSMasq service runs at local address `127.0.0.2`. This is used, because
it allows customer services to provide their own DNS if required
and therefore does not clash with them.

By default, the external name servers used are the Google primary and secondary
at `8.8.8.8` and `8.8.4.4`. However, these can be overridden by modifying the
`/mnt/boot/config.json` file and adding a `dnsServers` property, with a comma
separated list of the IP addresses of the nameservers to use (see
[the docs](https://github.com/balena-os/meta-balena#dnsservers) for more
information).

SSH into your device using it's local IP address:

```shell
$ balena ssh 10.0.0.197
```

or using it's UUID:

```shell
$ balena ssh 9294512
```

We're going to modify the DNS servers to point at one that doesn't exist,
just to show what happens. SSH into your device as above, then run the
following:

```shell
root@9294512:~# jq '.dnsServers = "1.2.3.4"' /mnt/boot/config.json > /mnt/data/config.json && mv /mnt/data/config.json /mnt/boot/config.json
root@9294512:~# mount -o remount,rw /
root@9294512:~# mv /etc/resolv.dnsmasq /etc/resolv.dnsmasq.moved
root@9294512:~# sync
root@9294512:~# reboot
```

This will move the default DNSMasq resolver config file, so that it's not
picked up. Additionally, it will modify the configuration to set the nameserver
to use as `1.2.3.4`. As this isn't a valid nameserver, nothing will get the
right address to make connections. Note that usually, remounting the root FS
as writeable is a very risky move, and should not be carried out without good
reason!

After a while, once the device has rebooted, SSH back into the device using the local IP address, and look
at the `dnsmasq.service` unit:

```shell
root@9294512:~# systemctl status dnsmasq
● dnsmasq.service - DNS forwarder and DHCP server
     Loaded: loaded (/lib/systemd/system/dnsmasq.service; enabled; vendor preset: enabled)
    Drop-In: /etc/systemd/system/dnsmasq.service.d
             └─dnsmasq.conf
     Active: active (running) since Fri 2022-08-19 10:11:53 UTC; 35s ago
    Process: 1791 ExecStartPre=/usr/bin/dnsmasq --test (code=exited, status=0/SUCCESS)
   Main PID: 1792 (dnsmasq)
      Tasks: 1 (limit: 1878)
     Memory: 344.0K
     CGroup: /system.slice/dnsmasq.service
             └─1792 /usr/bin/dnsmasq -x /run/dnsmasq.pid -a 127.0.0.2,10.114.102.1 -7 /etc/dnsmasq.d/ -r /etc/resolv.dnsmasq -z --servers-file=/run/dnsmasq.servers -k --lo>

Aug 19 10:11:53 9294512 dnsmasq[1791]: dnsmasq: syntax check OK.
Aug 19 10:11:53 9294512 dnsmasq[1792]: dnsmasq[1792]: started, version 2.84rc2 cachesize 150
Aug 19 10:11:53 9294512 dnsmasq[1792]: dnsmasq[1792]: compile time options: IPv6 GNU-getopt DBus no-UBus no-i18n no-IDN DHCP DHCPv6 no-Lua TFTP no-conntrack ipset auth no->
Aug 19 10:11:53 9294512 dnsmasq[1792]: dnsmasq[1792]: DBus support enabled: connected to system bus
Aug 19 10:11:53 9294512 dnsmasq[1792]: dnsmasq[1792]: read /etc/hosts - 6 addresses
Aug 19 10:11:53 9294512 dnsmasq[1792]: dnsmasq[1792]: using nameserver 1.2.3.4#53
Aug 19 10:12:06 9294512 dnsmasq[1792]: dnsmasq[1792]: failed to access /etc/resolv.dnsmasq: No such file or directory
```

As you can see, it's tried, and failed to get the `/etc/resolv.dnsmasq` file
and has just the one nameserver to use, `1.2.3.4`.

Now let's look at the Supervisor:

```shell
root@9294512:~# systemctl status balena-supervisor
● balena-supervisor.service - Balena supervisor
     Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-08-19 10:12:12 UTC; 1min 5s ago
    Process: 2213 ExecStartPre=/usr/bin/balena stop resin_supervisor (code=exited, status=1/FAILURE)
    Process: 2239 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
    Process: 2258 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
   Main PID: 2259 (start-balena-su)
      Tasks: 11 (limit: 1878)
     Memory: 12.4M
     CGroup: /system.slice/balena-supervisor.service
             ├─2259 /bin/sh /usr/bin/start-balena-supervisor
             ├─2261 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 2259
             └─2405 balena start --attach balena_supervisor

Aug 19 10:12:19 9294512 balena-supervisor[2405]: [info]    Waiting for connectivity...
Aug 19 10:12:19 9294512 balena-supervisor[2405]: [debug]   Starting current state report
Aug 19 10:12:19 9294512 balena-supervisor[2405]: [debug]   Starting target state poll
Aug 19 10:12:19 9294512 balena-supervisor[2405]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a --follow -o json _SYSTEMD_UNIT=balena.service
Aug 19 10:12:20 9294512 balena-supervisor[2405]: [debug]   Finished applying target state
Aug 19 10:12:20 9294512 balena-supervisor[2405]: [success] Device state apply success
Aug 19 10:12:34 9294512 balena-supervisor[2405]: [error]   LogBackend: unexpected error: Error: getaddrinfo EAI_AGAIN api.balena-cloud.com
Aug 19 10:12:34 9294512 balena-supervisor[2405]: [error]         at GetAddrInfoReqWrap.onlookupall [as oncomplete] (dns.js:76:26)
Aug 19 10:12:49 9294512 balena-supervisor[2405]: [info]    Retrying current state report in 15 seconds
Aug 19 10:12:49 9294512 balena-supervisor[2405]: [event]   Event: Device state report failure {"error":"getaddrinfo EAI_AGAIN api.balena-cloud.com"}
```

As you can see, the Supervisor is not at all happy, unable to connect to the API
and failing to get the current target state. This is because it is unable to get
an IP address for `api.balena-cloud.com`.

Worst still, OpenVPN will not be able to resolve the VPN hostname, and so the
device will have dropped 'Offline' (check the Dashboard or use `balena devices`)
to verify this.

Many other services will be in the same state. A good test of whether DNS is
working is to try to get to a known service on the internet, including
balenaCloud and Google:

```shell
root@9294512:~# curl https://google.com
curl: (6) Could not resolve host: google.com
root@9294512:~# curl https://api.balena-cloud.com/ping
curl: (6) Could not resolve host: api.balena-cloud.com
```

Both of these should succeed if DNS is working, but as you can see, both give
a `Could not resolve host` error. This is an extremely good pointer that DNS
is failing.

One thing to be aware of is that sometimes DNS fails not because of an invalid
server, but because the traffic for port 53 (the DNS port) is being firewalled
(see later section).

For now, we're going to put the DNS service back how it should be:

```shell
root@9294512:~# mount -o remount,rw /
root@9294512:~# mv /etc/resolv.dnsmasq.moved /etc/resolv.dnsmasq
root@9294512:~# jq -M 'del(.dnsServers)' /mnt/boot/config.json > /mnt/data/config.json && mv /mnt/data/config.json /mnt/boot/config.json
root@9294512:~# sync
root@9294512:~# reboot
```

This will put the device back into its previously working DNS state, and it
will reconnect to the network.

#### 6.3 OpenVPN

Services: `openvpn.service`, `os-config.service`

Device connections to balenaCloud vary depending on the operation being
carried out, for example registering the device is carried out by the Supervisor
contacting the API endpoint directly.

However, a large part of the cloud-to-device functionality is tunneled by the
balena VPN. This include various data such as the device status, actions,
SSH access, public URLs etc.

Initially, the `os-config.service` unit requests a block of configuration data
from the API, once the device has been registered against the fleet. Let's
have a look at the journal output from a device that's been freshly provisioned
and started for the first time:

```shell
root@f220105:~# journalctl -f -n 300 -u os-config
-- Journal begins at Fri 2021-08-06 14:40:59 UTC. --
Aug 06 14:41:03 localhost os-config[1610]: Fetching service configuration from https://api.balena-cloud.com/os/v1/config...
Aug 06 14:41:03 localhost os-config[1610]: https://api.balena-cloud.com/os/v1/config: error trying to connect: failed to lookup address information: Name or service not known
Aug 06 14:41:09 f220105 os-config[1610]: https://api.balena-cloud.com/os/v1/config: error trying to connect: error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed:../openssl-1.1.1l/ssl/statem/statem_clnt.c:1914: (certificate is not yet valid)
Aug 19 10:24:11 f220105 os-config[1610]: Service configuration retrieved
Aug 19 10:24:11 f220105 os-config[1610]: Stopping balena-supervisor.service...
Aug 19 10:24:11 f220105 os-config[1610]: Awaiting balena-supervisor.service to exit...
Aug 19 10:24:11 f220105 os-config[1610]: Stopping prepare-openvpn.service...
Aug 19 10:24:11 f220105 os-config[1610]: Stopping openvpn.service...
Aug 19 10:24:11 f220105 os-config[1610]: Awaiting prepare-openvpn.service to exit...
Aug 19 10:24:11 f220105 os-config[1610]: Awaiting openvpn.service to exit...
Aug 19 10:24:11 f220105 os-config[1610]: /etc/openvpn/ca.crt updated
Aug 19 10:24:11 f220105 os-config[1610]: /etc/openvpn/openvpn.conf updated
Aug 19 10:24:11 f220105 os-config[1610]: Starting prepare-openvpn.service...
Aug 19 10:24:11 f220105 os-config[1610]: Starting openvpn.service...
Aug 19 10:24:11 f220105 os-config[1610]: /home/root/.ssh/authorized_keys_remote updated
Aug 19 10:24:11 f220105 os-config[1610]: Starting balena-supervisor.service...
...
```

You can see that, once registered, the `os-config` service requested the
configuration for the device from the API, received it, and then used the
returned data to:

1. Stop the Supervisor.
2. Write the new OpenVPN configuration to the state partition.
3. Write the correct root CA for the VPN to the state partition.
4. Restarted the OpenVPN service.
5. Updated the authorized keys.

**Quick Note:** Customers can also specify their own keys to access devices
(both development and production) in a couple of ways. The first is adding
an `os.sshKeys[]` property, which is an array of public keys, to the
`/mnt/boot/config.json` file. There is also upcoming support for user
custom keys being added to the API backend.

As you can see, the OpenVPN configuration and Certificate Authority certificate
is fetched from the API and not baked in. This allows balena to update their
certificates, configurations and keys on the fly, ensuring we can tailor the
VPN for the best possible experience and security. However, this does require
that the API endpoint is available to periodically refresh the config.

So, what happens if the API _isn't_ available? If this occurs on first boot,
then the device wouldn't be able to register, so there wouldn't be a
configuration to fetch for it.

On subsequent boots, the API not being initially available isn't as much of an
issue, because there is already a configuration and certificate for the VPN
which can be used until `os-config` can contact the API to check for new
configurations (and it is unlikely to have changed in the meantime).

Let's now look at the current OpenVPN journal entries on your device. SSH into
the device:

```shell
$ balena ssh 10.0.0.197
root@f220105:~# journalctl -f -n 200 -u openvpn.service
-- Journal begins at Fri 2021-08-06 14:40:59 UTC. --
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 OpenVPN 2.4.7 aarch64-poky-linux-gnu [SSL (OpenSSL)] [LZO] [LZ4] [EPOLL] [MH/PKTINFO] [AEAD] built on Feb 20 2019
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 library versions: OpenSSL 1.1.1l  24 Aug 2021, LZO 2.10
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 TCP/UDP: Preserving recently used remote address: [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 Socket Buffers: R=[131072->131072] S=[16384->16384]
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 Attempting to establish TCP connection with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443 [nonblock]
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP connection established with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP_CLIENT link local: (not bound)
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP_CLIENT link remote: [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 NOTE: UID/GID downgrade will be delayed because of --client, --pull, or --up-delay
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TLS: Initial packet from [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443, sid=f63c5c5a 9d0382c8
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY OK: depth=1, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=open-balena-vpn-rootCA
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY KU OK
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 Validating certificate extended key usage
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY EKU OK
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY OK: depth=0, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=vpn.balena-cloud.com
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 Control Channel: TLSv1.3, cipher TLSv1.3 TLS_AES_256_GCM_SHA384, 2048 bit RSA
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 [vpn.balena-cloud.com] Peer Connection Initiated with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 SENT CONTROL [vpn.balena-cloud.com]: 'PUSH_REQUEST' (status=1)
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 PUSH: Received control message: 'PUSH_REPLY,sndbuf 0,rcvbuf 0,route 52.4.252.97,ping 10,ping-restart 60,socket-flags TCP_NODELAY,ifconfig 10.242.111.185 52.4.252.97,peer-id 0,cipher AES-128-GCM'
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: timers and/or timeouts modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: --sndbuf/--rcvbuf options modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Socket Buffers: R=[131072->131072] S=[87040->87040]
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: --socket-flags option modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Socket flags: TCP_NODELAY=1 succeeded
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: --ifconfig/up options modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: route options modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: peer-id set
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: adjusting link_mtu to 1627
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 OPTIONS IMPORT: data channel crypto options modified
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Data Channel: using negotiated cipher 'AES-128-GCM'
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Outgoing Data Channel: Cipher 'AES-128-GCM' initialized with 128 bit key
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Incoming Data Channel: Cipher 'AES-128-GCM' initialized with 128 bit key
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 ROUTE_GATEWAY 10.0.0.1/255.255.255.0 IFACE=eth0 HWADDR=dc:a6:32:9e:18:dd
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 TUN/TAP device resin-vpn opened
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 TUN/TAP TX queue length set to 100
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 /sbin/ip link set dev resin-vpn up mtu 1500
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 /sbin/ip addr add dev resin-vpn local 10.242.111.185 peer 52.4.252.97
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 /etc/openvpn-misc/upscript.sh resin-vpn 1500 1555 10.242.111.185 52.4.252.97 init
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 /sbin/ip route add 52.4.252.97/32 via 52.4.252.97
Aug 19 10:24:55 f220105 openvpn[2656]: ip: RTNETLINK answers: File exists
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 ERROR: Linux route add command failed: external program exited with error status: 2
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 GID set to openvpn
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 UID set to openvpn
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Initialization Sequence Completed
```

There's a lot to take in here, but there are some key lines here that show
that the VPN has negotiated with the backend and is connected and routing
traffic:

```shell
Aug 19 10:24:53 f220105 openvpn[2632]: Fri Aug 19 10:24:53 2022 Attempting to establish TCP connection with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443 [nonblock]
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP connection established with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP_CLIENT link local: (not bound)
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TCP_CLIENT link remote: [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 TLS: Initial packet from [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443, sid=f63c5c5a 9d0382c8
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY OK: depth=1, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=open-balena-vpn-rootCA
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY KU OK
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 Validating certificate extended key usage
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY EKU OK
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 VERIFY OK: depth=0, C=US, ST=WA, L=Seattle, O=balena.io, OU=balenaCloud, CN=vpn.balena-cloud.com
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 Control Channel: TLSv1.3, cipher TLSv1.3 TLS_AES_256_GCM_SHA384, 2048 bit RSA
Aug 19 10:24:54 f220105 openvpn[2632]: Fri Aug 19 10:24:54 2022 [vpn.balena-cloud.com] Peer Connection Initiated with [AF_INET6]2600:1f18:6600:7f01:dc24:54f2:d95f:abc0:443
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 SENT CONTROL [vpn.balena-cloud.com]: 'PUSH_REQUEST' (status=1)
...
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 GID set to openvpn
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 UID set to openvpn
Aug 19 10:24:55 f220105 openvpn[2632]: Fri Aug 19 10:24:55 2022 Initialization Sequence Completed
```

The first part of the journal shows that the device has initiated contact with
the VPN backend, accepted the certificate passed to it, and then started the
initialisation of the VPN. We've cut some option stuff out, but the final lines
state `Initialization Sequence Completed` which is the sign the VPN is up
and running.

There are some things that can affect the VPN. As we saw when discussing NTP,
an incorrect time might force the VPN to reject the server certificate, as it
wouldn't be in a valid time window.

Additionally, other things that might affect the VPN include the firewalling
of non-HTTPS traffic (the VPN uses port 443 as well), the inability to retrieve
an initial configuration/CA certificate and Deep Packet Inspection routers that
require alternative certificates (we'll go into this later).

Another stumbling block is that if there are VPN issues then this usually means
the VPN isn't working, which means the device is not able to go into
an 'Online' state, and thus SSHing from the balena CLI or the Dashboard is not
possible. In these cases, your best hope is that there is another balena device
that is on the same network, to use as a gateway to the failing device (See:
[4. Accessing a Device using a Gateway Device](#4-accessing-a-device-using-a-gateway-device)).
If every balena device on the network is failing to connect to the VPN, this
usually indicates the network is being overly restrictive, which becomes a
customer issue.

#### 6.4 Firewalled Endpoints

Balena devices work on a variety of networks, but they do require the basic
networking environment as listed in
[6. Determining Networking Issues](#6-determining-networking-issues).

Firewalls are a sensible precaution in any network, be they personal or
corporate. A large number of firewalls are built to provide freedom for devices
to initiate connections to an outgoing connection on the wider Internet (where
a device _in_ the network can create a connection and receive all data from
the Internet based on that connection), but to refuse any incoming connection
from the Internet, unless specifically allowed.

On that note, firewalls can include blocklists and allowlists.
Most industrial routers and firewalls blocklist everything by default,
requiring a set of allowlist IPs and domain names where traffic can be
sent/received from.

However, firewalling on some networks can be very aggressive, where without
any allowlisting all outgoing and incoming traffic is blocked. Usually, what
occurs is that a set list of known ports are allowed to outgoing traffic (and
incoming traffic on those connections), but no other traffic is allowed.
This is usually tailored by SREs/IT professionals to follow the 'normal' use
of nodes on those networks. However, balena devices are sometimes put into
these networks and due to the nature of their network requirements, deviate
from the 'normal' usage.

Sometimes firewalls can be diagnosed very easily. If a customer has a set of
devices on the same network, and they've never come online on that network,
it's a fair assumption that a firewall is blocking a required port or ports,
and that no traffic is able to make its way out of (or into) the network.

However, sometimes things are slightly more subtle. For example, we've
demonstrated what happens when the NTP service is blocked, and the time is
greatly skewed. This is sometimes because the network's firewall might be
blocking any traffic from/to port 123 (NTP's default port). The same is
true for SSL traffic (on port 443).

This can sometimes include traffic to a customer's cloud service. For example,
imagine that all the balena requirements are met, so that the device appears
to be operating normally, but a customer complains that their device seems
to not be able to contact their own cloud servers. It could be that the firewall
lets through all the traffic required by balena, but is blocking other arbitrary
ports, which might include the ports required by a service on the device.

These are all points which a support engineer should be aware of when
investigating a device that is showing abnormal behavior which might be related
to a network.

There are some very simple tests that can be carried out to see if most of the
network requirements are satisfied:

- `curl` to the API (`curl https://api.balena-cloud.com/ping`) and VPN
  (`curl https://cloudlink.balena-cloud.com/ping` or `curl https://vpn.balena-cloud.com/ping`) endpoints to see if a connection
  is attempted (in the latter case, you'll get an error, but shouldn't get
  a 'Not found' or 'Timeout' error)
- Check `chronyd.service` to see when it last updated
- Ensure that DNS is working (again a `curl` to the API endpoint will show if
  name resolution is working or not)
- Ensure that the registry endpoint is not blocked. This will exhibit as the
  Supervisor being unable to instruct balenaEngine to pull a release's
  service images. A manual attempt at `balena pull <imageDetails>` should
  allow you to see whether any connection is made, or whether it timeouts/
  disconnects.

##### 6.4.1 Deep Packet Inspection

Some firewalls and routers implement further restrictions on traffic, namely
that of Deep Packet Inspection (DPI). This is a system where all (or sometimes
select) network packets have their headers and payload inspected to
ensure there is nothing contained which should not be allowed in/out of the
network. This raises several issues of their own. Whilst 'clear' traffic (such
as HTTP, `telnet`, FTP, etc.) is easy to inspect due to their unencrypted
nature, when it comes to SSL based traffic (including HTTPS and VPN), this
becomes impossible without either the keys that were used to initiate
connections or by terminating the traffic at the DPI firewall/router itself.

Because of this, most DPI networks operate by acting as a proxy for traffic.
That is, any node on the network makes connections as normal, but the
connections are actually made to the DPI router, which then inspects the traffic
and then opens the 'real' connection to the originally requested node on the
Internet. Because it is the terminating point for both incoming and outgoing
traffic it is able to inspect all the traffic passing it going both out and
coming in. However, to do this usually means that nodes within the network
need to install a new certificate specifically for the DPI firewall/router,
as all encrypted traffic (such as SSL) ends up as being shown to have come from
the DPI and not from the endpoint requested (as the DPI has repackaged the
traffic).

To determine whether DPI applies to a device, the following commands may be used:

```shell
$ curl https://api.balena-cloud.com/ping
curl: (60) server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none

$ openssl s_client -connect api.balena-cloud.com:443
CONNECTED(00000003)
depth=1 C = IE, ST = Dublin, L = Dublin, O = Royal College Of Surgeons In Ireland, OU = IT, CN = RCSI-TLS-PROTECT
verify error:num=20:unable to get local issuer certificate
verify return:1
depth=0 CN = balena.io
verify return:1
...
```

Compare the output of the `openssl` command on your laptop (where the `curl`
command succeeds) with the output on the device (where the `curl` command fails).
Completely different SSL certificate chains may be printed out, indicating that
DPI is in place.

Balena devices are able to accommodate this if it is known a DPI network is in
use, by adding the `balenaRootCA` property to the `/mnt/boot/config.json` file,
where the value is the DPI's root Certificate Authority (CA) that has been
base64 encoded. This CA certificate should be supplied by the network operator
to the customer who will be operating their devices on the DPI network.