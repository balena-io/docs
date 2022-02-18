# Balena Device Debugging Masterclass

* **Masterclass Type:** Core
* **Maximum Expected Time To Complete:** 3 hours

## Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes.
To gain the most from this masterclass, we recommend that you first undertake
the following masterclasses:

* [Balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)
* [BalenaOS Masterclass](https://github.com/balena-io/balenaos-masterclass/)
* [Balena Networking Masterclass](https://github.com/balena-io/networking-masterclass/) *NOT YET AVAILABLE*

## Introduction

At balena, we believe the best people to support a customer are the engineers
who build the product. They have the depth and breadth of knowledge that can
quickly identify and track down issues that traditional support agents usually
do not. Not only does this help a customer quickly and efficiently solve most
issues, but it also immerses balena engineers in sections of the product they
might not otherwise encounter in their usual working life, which further
improves the support each engineer can offer. This masterclass has been written
as an initial guide for new engineers about to start support duties.

Whilst the majority of devices never see an issue, occasionally a customer will
contact balena support with a query where one of their devices is exhibiting
anomalous behavior.

Obviously, no guide can cover the range of queries that may occur, but it can
give an insight into how to tackle problems and the most common problems that
a balena support agent sees, as well as some potential solutions to these
problems. In compiling this document, a group of highly seasoned balena
engineers discussed their techniques for discovering and resolving on-device
issues, as well as techniques for determining how best to mitigate an issue
being exhibited.

In this masterclass, you will learn how to:

* Gain access to a customer device, when permission has been granted
* Retrieve initial diagnostics for the device
* Identify and solve common networking problems
* Work with the Supervisor
* Work with balenaEngine
* Examine the Kernel logs
* Understand media-based issues (such as SD card corruption)
* Understand how Heartbeat/VPN Only status affects your application and device

**Note:** Whilst this masterclass is intended for new engineers about to start
    support duties at balena, it is also intended to act as an item of interest
    to customers who wish to know more about how we initially go about debugging
    a device (and includes information that customers themselves could use
    to give a support agent more information). We recommend, however, ensuring
    balena support is *always* contacted should you have an issue with a device
    that is not working correctly.

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

* A local copy of this repository [Balena Device Debugging Masterclass](https://github.com/balena-io-projects/debugging-masterclass). This copy can be obtained by either method:
    * `git clone https://github.com/balena-io-projects/debugging-masterclass.git`
    * Download ZIP file (from 'Clone or download'->'Download ZIP') and then unzip it to a suitable directory
* A balena supported device, such as a [balenaFin
  1.1](https://store.balena.io/products/balenafin-developer-kit-v1-1-cm3-l), [Raspberry Pi
  3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Intel
  NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by
  installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/)
* A suitable shell environment for command execution (such as `bash`)
* A [balenaCloud](https://www.balena.io/) account
* A familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
* An installed instance of the [balena CLI](https://github.com/balena-io/balena-cli/)

## Exercises

The following exercises assume access to a device that has been provisioned.
As per the other masterclasses in this series we're going to assume that's a
balenaFin, however you can simply alter the device type as appropriate in the
following instructions. The balena CLI is going to be used instead of the
WebTerminal in the balenaCloud Dashboard for accessing the device, but all of
the exercises could be completed using the WebTerminal if preferred.

First login to your balena account via `balena login`, and then create a new
application:

```shell
$ balena app create --type fincm3 DebugApp
Application created: DebugApp (fincm3, id 1544229)
```

Now provision a device, either by downloading a *development* image from the
Dashboard, or by flashing via the command line (note that currently,
balenaEtcher must be running to enable discovery of the balenaFin from balena
CLI):

```shell
$ balena os download fincm3 --version 2.44.0+rev1.dev --output balena-debug.img
Getting device operating system for fincm3
The image was downloaded successfully
```

Carry out any configuration generation required, should you be using a Wifi
AP and inject the configuration into the image (see
[balena CLI Advanced Masterclass](https://github.com/balena-io-projects/balena-cli-advanced-masterclass#32-configuring-a-provisioning-image)
for more details), or use a configuration for an ethernet connection:

```shell
$ balena os configure balena-debug.img --app DebugApp --config-network=ethernet
Configuring operating system image
$ balena util available-drives
DEVICE     SIZE      DESCRIPTION
/dev/disk4 63.6 GB   Compute Module
$ balena os initialize balena-debug.img --type fincm3 --drive /dev/disk4 --yes
Initializing device

Note: Initializing the device may ask for administrative permissions
because we need to access the raw devices directly.
Going to erase /dev/disk4.
Admin privileges required: you may be asked for your computer password to continue.
Writing Device OS [========================] 100% eta 0s
Validating Device OS [========================] 100% eta 0s
You can safely remove /dev/disk4 now
```

You should now have a device that will appear as part of the DebugApp fleet:

```shell
$ balena devices | grep DebugApp
1744728 7db55ce black-mountain    fincm3       DebugApp         Idle   true      10.3.7             balenaOS 2.44.0+rev1 https://dashboard.balena-cloud.com/devices/7db55ce99e9c135dbc69974a7abbe511/summary
```

For convenience, export a variable to point to the root of this masterclass
repository, as we'll use this for the rest of the exercises, eg:

```shell
$ export BALENA_DEBUGGING_MASTERCLASS=~/debugging-masterclass
```

Finally, push the code in the `multicontainer-app` directory to the application:

```shell
$ cd $BALENA_DEBUGGING_MASTERCLASS/multicontainer-app
$ balena push DebugApp
```

### 1. Accessing a User Device

Any device owned by a customer automatically allows access by that user via
either the WebTerminal (in the device's Dashboard page), or the balena CLI
via `balena ssh <uuid>`. However, for a support agent to gain access to a device
that isn't owned by them, a user or collaborator that does have access must
grant it explicitly.

#### 1.1 Granting Support Access to a Support Agent

A user can grant access to support agents by selecting the device from the
Dashboard, and then selecting the 'Actions' tab in the left-hand sidepanel.
Scrolling down the Actions page will show a list of actions, with the 'Grant
Support Access' option being the one required here. A user can select this, then
determine the amount of time that support agents are allowed access for. Once
support has been granted, the Dashboard will look something like this:

![Granted Support Access](https://github.com/balena-io/debugging-masterclass/blob/master/resources/black-mountain-granted.png?raw=true)

**Note:** It's also possible for a user to grant support for an entire
application by selecting the application's Dashboard page and going through
the same process (selecting 'Actions' and then 'Grant Support Access'). Granting
access to an application automatically grants access to all of its associated
devices.

Once support access has been granted, an agent will be able to use the UUID of
a device to gain access to it, using a URL of the form:
https://dashboard.balena-cloud.com/devices/&lt;deviceUUID&gt;/summary

The Dashboard will function in almost exactly the same way as it would were
the device owned by the support agent viewing it. They may view logs and
use the WebTerminal to access either the Host balenaOS or any service currently
running.

They may also use balena CLI to SSH into either the balenaOS host or any service
using `balena ssh <uuid> [serviceName]`.

#### 1.2 Access Restrictions

There are limits on what a support agent may do with a device they have
been granted access to. This includes the alteration of service and environment
variables and configurations (both application and device).

Whilst this sounds like a limitation, it ensures that a device being
investigated for an issue cannot be unnecessarily altered or modified. Support
investigations are intended as an avenue of exploration and research for
ensuring that issues are categorized to allow improvements to the product
surface such that these issues are eliminated.

### 2. Initial Diagnosis

The balenaCloud Dashboard includes the ability to run a set of diagnostics on
a device, to determine its current condition. This should, in most cases,
be the first step in attempting to diagnose an issue without having to
actually access the device via SSH. Ensuring diagnostics and health checks
are examined first ensures that a support agent has a good idea of the state a
device is in before SSHing into it, as well as ensuring that the information can
be accessed later if required (should a device be in a catastrophic state). This
helps greatly in a support post-mortem should one be required.

Currently, diagnosis is only available via the Dashboard.

Let's take a look at the device provisioned earlier that should now be
running the code pushed to the DebugApp. Bring up the balenaCloud Dashboard
page and select 'Diagnostics (Experimental)' from the left-hand panel.

Diagnostics are split into three separate sections: health checks, diagnostics
and Supervisor state.

#### 2.1 Device Health Checks

Select the 'Device Health Checks' tab in the Diagnostics page, and then click
'Run checks'. A set of [health checks](https://github.com/balena-io-modules/device-diagnostics/blob/master/diagnostics.md)
will be run on the device, and you should see the following conditions:

| Check | Status | Notes |
| --- | --- | --- |
| check_balenaOS | Succeeded | Supported balenaOS 2.x detected |
| check_under_voltage | Succeeded | No under-voltage events detected |
| check_memory | Succeeded | 75% memory available |
| check_temperature | Succeeded | No abnormal temperature detected |
| check_container_engine | Succeeded | Container engine balena is running and has not restarted uncleanly
| check_supervisor | Succeeded | Supervisor is running & healthy |
| check_dns | Succeeded | First DNS server is 127.0.0.2 |
| check_networking | Succeeded | No networking issues detected |
| check_diskspace | Succeeded | df reports 99% free |
| check_write_latency | Succeeded | No slow disk writes detected |
| check_service_restarts | Succeeded | No services are restarting unexpectedly |
| check_timesync | Succeeded | Time is synchronized |
| check_os_rollback | Succeeded | No OS rollbacks detected

This shows a healthy device, where there are no obvious faults. That's no fun,
let's create one!

SSH into your device, via `balena ssh`, using the appropriate UUID. We want to
SSH into the host OS, as that's where we'll wreak havoc:

```shell
$ balena ssh 7db55ce99e9c135dbc69974a7abbe511
=============================================================
    Welcome to balenaOS
=============================================================
root@7db55ce:~#
```

We're going to do a couple of things that will show up as problems. Something
you'll often check, and that we'll discuss later, is the state of the balena
Supervisor and balenaEngine.

First of all, we're going to kill the balenaEngine maliciously without letting
it shut down properly:

```shell
root@7db55ce:~# ps | awk '!/awk/ && /balenad/ {print $1}' | xargs kill -9
```

What this does is list the processes running, look for the `balenad` executable
(the balenaEngine itself) and then stop the engine with a `SIGKILL` signal,
which will make it immediately terminate instead of shutting down correctly.
In fact, we'll do it twice. Once you've waited about 30 seconds, run the command
again.

Now we'll look at the health checks again. Click 'Run checks' again in the
Dashboard. After a few seconds, you'll see the 'check_container_engine`
section has changed:

| Check | Status | Notes |
| --- | --- | --- |
| check_container_engine | Failed |Container engine balena is up, but has 2 unclean restarts and may be crashlooping (most recent start time: Thu 2019-11-14 17:38:24 UTC) |

Unclean restarts usually mean that the engine crashed abnormally with an issue.
This usually happens when something catastrophic occurs between the Supervisor
and balenaEngine or corruption occurs in the image/container/volume store.
Let's take a look at the journal for balenaEngine (`balena.service`) on the
device:

```shell
root@7db55ce:~# journalctl --no-pager -n 400 -u balena.service
```

You'll see a *lot* of output, as the logs don't just show the balenaEngine
output but the output from the Supervisor as well. However, if you search
through the output, you'll find several lines like the following:

```shell
Nov 15 10:33:04 7db55ce 36025a63fdf2[779]: [api]     GET /v1/healthy 200 - 12.070 ms
Nov 15 10:35:17 7db55ce systemd[1]: balena.service: Main process exited, code=killed, status=9/KILL
Nov 15 10:35:17 7db55ce systemd[1]: balena.service: Failed with result 'signal'.
Nov 15 10:35:18 7db55ce balenad[2873]: time="2019-11-15T10:35:18.148843059Z" level=warning msg="Running experimental build"
Nov 15 10:35:18 7db55ce balenad[2873]: time="2019-11-15T10:35:18.157035456Z" level=info msg="libcontainerd: started new balena-engine-containerd process" pid=2891
```

As you can see, the `balena.service` was killed with a `SIGKILL` instruction.
The next lines show the service restarting, as the service is configured to
restart whenever it exits. If you continue searching, you'll see another similar
set of logs where we killed it a second time.

You might also notice some lines that look like:

```shell
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: [1B blob data]
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: [36B blob data]
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: [16B blob data]
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: [1B blob data]
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: [1B blob data]
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: [35B blob data]
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: [16B blob data]
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: [1B blob data]
```

This `blob data` is in fact logs from running service containers that are not
the Supervisor (as the Supervisor is always logged in the clear). You can
read this data by using the `-a` switch when viewing the logs for balenaEngine:

```shell
root@7db55ce:~# journalctl --no-pager -a -n 400 -u balena.service
...
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]:
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: > frontend@1.0.0 start /usr/src/app
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]: > node index.js
Nov 15 10:35:27 7db55ce ecb3a4b3a079[2873]:
Nov 15 10:35:28 7db55ce 8794d382f463[2873]:
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: > backend@1.0.0 start /usr/src/app
Nov 15 10:35:28 7db55ce 8794d382f463[2873]: > node index.js
Nov 15 10:35:28 7db55ce 8794d382f463[2873]:
```

As you can see, these have now been specifically output for the two running
service containers.

If you *only* want to see balenaEngine output and not from any of the service
containers it is running, use `journalctl -u balena.service -t balenad`. The
`-t` is the shortened form of `--identifier=<id>`, which in this case ensures
that only messages from the `balenad` syslog identifier are shown.

We'll discuss balenaEngine/Supervisor crashes and restarts later in the
masterclass.

There are many other health checks that can immediately expose a problem.
For example, warnings on low free memory or disk space can expose problems which
will exhibit themselves as application updates failing to download, or service
containers restarting abnormally (especially if an application service runs
unchecked and consumes memory until none is left). We'll also go through some
of these scenarios later.

#### 2.2 Device Diagnostics

Move to the 'Device Diagnostics' tab on the 'Diagnostics' page and click the
'Run diagnostics' button.

Device diagnostics can be considered a more detailed snapshot of a running
system as opposed to the healthchecks, which give the current status of a few
of the core components of the OS.

Once the diagnostic run has completed, you'll see a lot of logs from commands
that have been run. The section `--- COMMANDS ---` shows a list of all of the
commands that are run to produce the diagnostics report. These commands cover
a wide range of functionality, but are comprised of 5 main areas:

* BALENA - The balenaEngine and latest journals
* HARDWARE - All aspects of HW, including CPU, memory and device tree info
    as well as statistics on device nodes, USB devices and disk space
* NETWORK - Covering everything from the current interface configurations
    to test pings/curls of remote hosts, the state of DNSmasq, OpenVPN and
    the current iptables configuration
* OS - This includes the current device configuration, the kernel log,
    the boot journal and the state of any HUP that may have been attempted
* SUPERVISOR - The current state and logs for the Supervisor
* TIME - The current date, state of the time and uptime for the device

Examination of this output will help to determine if something is not working
correctly. Whilst we won't go into this here, the following exercises will all
deal with issues where the diagnostics will show abnormalities when examined.

#### 2.3 Supervisor State

Now click the 'Supervisor State' tab on the 'Diagnostics' page.

This does not require execution, and immediately queries the Supervisor to
determine its current configuration. This output is shown in two panels:

* Current Supervisor State - This is the current status of the Supervisor,
    including the address and port it can be reached on, the versions pertaining
    to it and the current application status (note that this only works should
    the VPN be operational and connected to the balenaCloud backend).
* Target Supervisor State - This is the target state for the Supervisor, based
    upon the release of the application the device is associated with (usually
    this is the latest application release, unless otherwise pinned). This
    includes all of the services, and any configuration set for each service,
    for the application, as well as configuration (such as boot and device tree
    settings).

The Supervisor state should always be available; if it isn't, this
is an initial indication that something is wrong (including the Supervisor
itself failing to run).

The Current State is useful for ensuring that versions of the Supervisor/OS
and access to the API is as-expected (or has been changed, should access
be required).

The Target State is extremely useful for ensuring that a release is running
correctly upon a device (as the `docker-compose` manifest for the release
can be read from the application's 'Release' page in the Dashboard), as well
as ensuring it's the commit that's expected.

### 3. Device Access Responsibilities

When accessing a customer's device you have a number  of responsibilities, both
technically and ethically. A customer assumes that the support agent has a level
of understanding and competence, and as such support agents should ensure that
these levels are met successfully.

There are some key points which should be followed to ensure that we are never
destructive when supporting a customer:

* Always ask permission before carrying out non-read actions. This includes
    situations such as stopping/restarting/starting services which are otherwise
    functional (such as the Supervisor). This is *especially* important in cases
    where this would stop otherwise functioning applications (such as stopping
    balenaEngine).
* Ensure that the customer is appraised of any non-trivial non-read actions that
    you are going to take before you carry those actions out on-device. If they
    have given you permission to do 'whatever it takes' to get the device
    running again, you should still pre-empt your actions by communicating this
    clearly.
* During the course of carrying out non-read actions on a device, should the
    customer be required to answer a query before being able to proceed, make it
    clear to them what you have already carried out, and that you need a
    response before continuing. Additionally ensure that any incoming agents
    that may need to access the device have all of your notes and actions up
    to this point, so they can take over in your stead.
* *Never* reboot a device without permission, especially in cases where it
    appears that there is a chance that the device will not recover (which may
    be the case in situations where the networking is a non-optimal state). It
    is imperative in these cases that the customer is made aware that this could
    be an outcome in advance, and that they must explicitly give permission for
    a reboot to be carried out.

Occasionally it becomes very useful to copy files off from a device, so that
they can be shared with the team. This might be logfiles, or the Supervisor
database, etc.

A quick way of copying data from a device with a known UUID onto a local machine
is to use SSH with your balena support username:
```shell
ssh -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 22 ${USER}@ssh.balena-devices.com host -s ${UUID} 'cat ${PATH_TO_FILE}' > ${LOCAL_PATH}
```
You can copy data from your local machine onto a device by piping the file in
instead:
```shell
ssh -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 22 ${USER}@ssh.balena-devices.com host -s ${UUID} 'cat > ${PATH_TO_FILE}' < ${LOCAL_PATH}
```

#### 4. Accessing a Device using a Gateway Device

It may not always be possible to access the device directly, especially if the
VPN component isn't working.

In the examples, we're able to stay connected to the device when the OpenVPN
service isn't running because we're using a development image, and development
images allow passwordless root connections via SSH. Had we been running a
production image, then the device would have been in the 'Offline' state, but
it would still potentially have had network access and be otherwise running
correctly. This brings up an issue though, how can we connect to a faulty
production device in the field?

The answer comes from the mechanism behind how SSH is tunneled through the VPN,
and we can actually use another device (in the 'Online' state) on the same
local network as an 'Offline' device to do this.

Doing so is pretty simple, you need the UUIDs of both the gateway
('Online') and target ('Offline') devices, as well as your username and, if
possible, the IP address of the target device (by default, the last seen
'Online' state IP address will be used if the IP is not passed). Once you
have these details, you can carry this out by executing the following on your
host machine:

```shell
$ ssh -t \
   -o LogLevel=ERROR \
   -p 22 $USERNAME@ssh.balena-devices.com hostvia $UUID_GATEWAY $UUID_TARGET [$IPADDR]
```

Should this not work, it's possible that the IP address has changed (and if it
has, you *will* need to specify the correct address). The easiest way to find
the potentially correct IP address is to SSH into the gateway device and run the
following script (which should work for both legacy DropBear SSH daemons and
those running on more recent balenaOS installations):

```shell
( prefix=192.168.1; \
    for i in {2..254}; \
    do \
        addr=$prefix.$i; \
        curl -s -m 1 $addr:22222 --http0.9 | grep -q "SSH-2.0" && echo $addr BALENA DEVICE || echo $addr; \
     done \
)
```

Ensure you change the `prefix` variable to the correct prefix for the local
network before starting. This script will then go through the range `$prefix.2`
to `$prefix.254`, and flag those devices it believes are potential balena
devices. This should help you narrow down the address range to try connections
to balena devices, substituting the IP address appropriately in the SSH
connection command. All IP addresses will be printed by the script, but those
that are potentially balena devices will show up with `BALENA DEVICE` next to
them. If you have multiple potential UUIDs, you'll need to mix and match UUIDs
and IP addresses until you find a matching combination.

You may also try using mDNS from the gateway device to locate the IP of the
target based on its hostname. Simply ping the `.local` address and grab the IP
that way:

```shell
root@8f45015:~# ping -c1 e655ba7.local
PING e655ba7.local (192.168.1.19): 56 data bytes
64 bytes from 192.168.1.19: seq=0 ttl=64 time=7.905 ms
...
```

### 5. Component Checklist

The key to any support is context. As a support agent, you should have enough
context from a customer to start an investigation. If you do not, then you
should ask for as much context and detail about the device as you can before
starting an investigation on the device.

When accessing a device, there are usually some things you can check to see why
a device may be in a broken state. Obviously, this depends on the
symptoms a customer has reported, as well as those a support agent may have
found when running the device diagnostics. However, there are some common
issues that can occur to put a device into a broken state that can be
quickly fixed.

The following sections discuss some of the first components to check when
carrying out on-device support. The components that should be checked
and in what order comes down to the context of support, and the symptoms seen.

#### 5.1 Service Status and Journal Logs

balenaOS uses [systemd](https://www.freedesktop.org/wiki/Software/systemd/) as
its [init system](https://en.wikipedia.org/wiki/Init), and as such almost all
the fundamental components in balenaOS run as systemd services. systemd builds
a dependency graph of all of its unit files (in which services are defined) to
determine the order that these should be started/shutdown in. This is
generated when systemd is run, although there are ways to rebuild this after
startup and during normal system execution.

Possibly the most important command is `journalctl`, which allows you to read
the service's journal entries. This takes a variety of switches, the most
useful being:

* `--follow`/`-f` - Continues displaying journal entries until the command is halted
    (eg. with Ctrl-C)
* `--unit=<unitFile>`/`-u <unitFile>` - Specifies the unit file to read journal
    entries for. Without this, all units entries are read.
* `--pager-end`/`-e` - Jump straight to the final entries for a unit.
* `--all`/`-a` - Show all entries, even if long or with unprintable
    characters. This is especially useful for displaying the service container
    logs from applications when applied to `balena.service`.

A typical example of using `journalctl` might be following a service to see
what's occuring. Here's it for the Supervisor, following journal entries in
real time:

```shell
root@11a12ec:~# journalctl --follow --unit=balena-supervisor --unit=resin-supervisor
-- Logs begin at Thu 2019-06-13 13:21:34 UTC. --
Dec 03 15:36:06 11a12ec balena-supervisor[1184]: Container log timestamp flush complete
Dec 03 15:36:40 11a12ec balena-supervisor[1184]: Supervisor API: GET /v1/healthy 200 - 6.900 ms
Dec 03 15:41:41 11a12ec balena-supervisor[1184]: Supervisor API: GET /v1/healthy 200 - 7.939 ms
Dec 03 15:46:06 11a12ec balena-supervisor[1184]: Attempting container log timestamp flush...
Dec 03 15:46:06 11a12ec balena-supervisor[1184]: Container log timestamp flush complete
Dec 03 15:46:42 11a12ec balena-supervisor[1184]: Supervisor API: GET /v1/healthy 200 - 15.989 ms
Dec 03 15:51:42 11a12ec balena-supervisor[1184]: Supervisor API: GET /v1/healthy 200 - 8.643 ms
Dec 03 15:56:06 11a12ec balena-supervisor[1184]: Attempting container log timestamp flush...
Dec 03 15:56:06 11a12ec balena-supervisor[1184]: Container log timestamp flush complete
Dec 03 15:56:43 11a12ec balena-supervisor[1184]: Supervisor API: GET /v1/healthy 200 - 7.830 ms
```

Any systemd service can be referenced in the same way, and there are some common
commands that can be used with services:

* `systemctl status <serviceName>` - Will show the status of a service. This
    includes whether it is currently loaded and/or enabled, if it is currently
    active (running) and when it was started, its PID, how much memory it is
    notionally (and beware here, this isn't always the amount of physical
    memory) using, the command used to run it and finally the last set of
    entries in its journal log. Here's example output from the OpenVPN service:

    ```shell
    root@11a12ec:~# systemctl status openvpn.service
    ● openvpn.service - OpenVPN
    Loaded: loaded (/lib/systemd/system/openvpn.service; enabled; vendor preset: enabled)
    Active: active (running) since Tue 2019-12-03 11:46:10 UTC; 12min ago
    Main PID: 1448 (openvpn)
    Memory: 1.3M
    CGroup: /system.slice/openvpn.service
            └─1448 /usr/sbin/openvpn --writepid /var/run/openvpn/openvpn.pid --cd /etc/openvpn/ --config /etc/openvpn/openvpn.conf --connect-retry 5 120

    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 /sbin/ip link set dev resin-vpn up mtu 1500
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 /sbin/ip addr add dev resin-vpn local 10.240.53.172 peer 52.4.252.97
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 /etc/openvpn-misc/upscript.sh resin-vpn 1500 1555 10.240.53.172 52.4.252.97 init
    Dec 03 11:46:13 11a12ec openvpn[1448]: resin-ntp-config: Found config.json in /mnt/boot/config.json .
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 /sbin/ip route add 52.4.252.97/32 via 52.4.252.97
    Dec 03 11:46:13 11a12ec openvpn[1448]: ip: RTNETLINK answers: File exists
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 ERROR: Linux route add command failed: external program exited with error status: 2
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 GID set to openvpn
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 UID set to openvpn
    Dec 03 11:46:13 11a12ec openvpn[1448]: Tue Dec  3 11:46:13 2019 Initialization Sequence Completed
    ```

* `systemctl start <serviceName>` - Will start a non-running service. Note that
    this will *not* restart a service that is already running.
* `systemctl stop <serviceName>` - Will stop a running service. If the service
    is not running, this command will not do anything.
* `systemctl restart <serviceName>` - Will restart a running service. If the
    service is not running, this will start it.
* `systemctl daemon-reload` - Will essentially run through the startup process
    systemd carries out at initialisation, but without restarting services or
    units. This allows the rebuild of the system dependency graph, and should be
    carried out if any of the unit files are changed whilst the system is
    running.

This last command may sound a bit confusing but consider the following. Imagine
that you need to dynamically change the `balena-supervisor.service` unit file
to increase the healthcheck timeout on a very slow system. Once that change has
been made, you'll want to restart the service. However, first, you need to
reload the unit file as this has changed from the loaded version. To do this,
you'll run `systemctl daemon-reload` and then
`systemctl restart balena-supervisor.service` to restart the Supervisor.

In general, there are some core services that need to execute for a device to
come online, connect to the balenaCloud VPN, download applications and then run
them:

* `chronyd.service` - Responsible for NTP duties and syncing 'real' network
    time to the device. Note that balenaOS versions less than v2.13.0 used
    `systemd-timesyncd.service` as their NTP service, although inspecting it is
    very similar to that of `chronyd.service`.
* `dnsmasq.service` - The local DNS service which is used for all host OS
    lookups (and is the repeater for application service containers by default).
* `NetworkManager.service` - The underlying Network Manager service, ensuring
    that configured connections are used for networking.
* `os-config.service` - Retrieves settings and configs from the API endpoint,
    including certificates, authorized keys, the VPN config, etc.
* `openvpn.service` - The VPN service itself, which connects to the balenaCloud
    VPN, allowing a device to come online (and to be SSHd to and have actions
    performed on it). Note that in balenaOS versions less than v2.10.0 this
    was called `openvpn-resin.service`, but the method for inspecting and
    dealing with the service is the same.
* `balena.service` - The balenaEngine service, the modified Docker daemon fork
    that allows the management and running of application service images,
    containers, volumes and networking.
* `balena-supervisor.service` - The balena Supervisor service, responsible for
    the management of applications, including downloading updates for and
    self-healing (via monitoring) of those applications, variables (application/
    device/fleet) and exposure of these services to applications via an
    endpoint.
* `dbus.service` - The DBus daemon socket can be used by applications by
    applying the `io.balena.features.dbus` label, which exposes it in-container.
    This allows applications to control several host OS features, including the
    Network Manager.

Additionally, there are some utility services that, whilst not required
for a barebones operation, are also useful:

* `ModemManager.service` - Deals with non-Ethernet or Wifi devices, such as
    LTE/GSM modems.
* `avahi-daemon.service` - Used to broadcast the device's local hostname
    (useful in development mode, responds to `balena scan`).

We'll go into several of these services in the following sections, but generally
these are the first points to examine if a system is not behaving as it should,
as most issues will be associated with these services.

Additionally there are a large number of utility services that facilitate the
services above, such as those to mount the correct partitions for data storage,
configuring the Supervisor and running it should it crash, etc.

#### 5.2 Persistent Logs

As described in the previous section, the ability to read journals from the
different services that make up balenaOS is vital in helping to track down
issues that arise. However, on reboot these journals will be cleared and so
examining them will not, for example, give any insight as to why the reboot
may have occurred (or which services may have failed causing a reboot).

To alleviate this, balenaOS allows persistent journals (logs) to be enabled by
customers. The easiest way to achieve this is to go the the Dashboard URL for
the application or device in question, select 'Fleet Configuration' or 'Device
Configuration' respectively, and then select 'Activate' on 'Enable persistent
logging'. If selected on an application, all devices associated with that
application will have persistent journals enabled, else it will be enabled only
for the device selected. Because the enabling/disabling of persistent journals
affects where they are stored, the device will reboot once selected to ensure
that the settings are applied.

Once persistent journals are enabled, they end up stored as part of the data
partition on the device (either on SD card, eMMC, harddisk, etc.). This is
located on-device at `/var/log/journal/<uuid>` where the UUID is variable.

Journals can be read like those for any unit file, using `journalctl`, although
the switches passed to the command are slightly different. Here's an example
of how to read persistent journals:

```shell
root@dee2945:~# cd /var/log/journal/b9ccd869194e4f1381c06967f99b0265/
root@dee2945:/var/log/journal/b9ccd869194e4f1381c06967f99b0265# ls -l
total 2051
-rw-r----- 1 root root 1048576 Jan 13 11:05 system.journal
-rw-r----- 1 root root 1048576 Jan 13 11:05 system@2ad94f188fb64c2da9803557662b57b2-0000000000000001-00058b3468ac9625.journal
root@dee2945:/var/log/journal/b9ccd869194e4f1381c06967f99b0265# journalctl -a --file system.journal
-- Logs begin at Mon 2020-01-13 11:05:06 UTC, end at Mon 2020-01-13 11:05:37 UTC. --
Jan 13 11:05:06 dee2945 systemd-journald[490]: Time spent on flushing to /var is 65.151ms for 795 entries.
Jan 13 11:05:06 dee2945 systemd-journald[490]: System journal (/var/log/journal/b9ccd869194e4f1381c06967f99b0265) is 2.0M, max 8.0M, 5.9M free.
Jan 13 11:05:07 dee2945 systemd[1]: Started Resin persistent logs.
Jan 13 11:05:07 dee2945 resin-persistent-logs[670]: resin-persistent-logs: Persistent logging activated.
Jan 13 11:05:06 dee2945 kernel[664]: [   14.553592] systemd-journald[490]: Received request to flush runtime journal from PID 1
Jan 13 11:05:07 dee2945 systemd[1]: Started Modem Manager.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2694] NetworkManager (version 1.18.0) is starting... (for the first time)
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2698] Read config: /etc/NetworkManager/NetworkManager.conf (etc: os-networkmanager.conf)
Jan 13 11:05:07 dee2945 systemd[1]: Started Network Manager.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.2862] bus-manager: acquired D-Bus service "org.freedesktop.NetworkManager"
Jan 13 11:05:07 dee2945 systemd[1]: Reached target Network.
Jan 13 11:05:07 dee2945 systemd[1]: Started OpenVPN.
Jan 13 11:05:07 dee2945 systemd[1]: Starting Resin init service...
Jan 13 11:05:07 dee2945 systemd[1]: Starting DNS forwarder and DHCP server...
Jan 13 11:05:07 dee2945 systemd[1]: Started OS configuration update service.
Jan 13 11:05:07 dee2945 NetworkManager[740]: <info>  [1578913507.3047] manager[0x12ec000]: monitoring kernel firmware directory '/lib/firmware'.
Jan 13 11:05:07 dee2945 bash[758]: Board specific initialization...
Jan 13 11:05:07 dee2945 dnsmasq[759]: dnsmasq: syntax check OK.
Jan 13 11:05:07 dee2945 systemd[1]: Started DNS forwarder and DHCP server.
Jan 13 11:05:07 dee2945 systemd[1]: Starting Balena Application Container Engine...
Jan 13 11:05:07 dee2945 systemd[1]: Starting Resin proxy configuration service...
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: started, version 2.78 cachesize 150
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: compile time options: IPv6 GNU-getopt DBus no-i18n no-IDN DHCP DHCPv6 no-Lua TFTP no-conntrack ipset auth no-DNSSEC >
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: DBus support enabled: connected to system bus
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: reading /etc/resolv.dnsmasq
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: using nameserver 8.8.8.8#53
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: read /etc/hosts - 6 addresses
Jan 13 11:05:07 dee2945 dnsmasq[763]: dnsmasq[763]: using nameserver 8.8.8.8#53
Jan 13 11:05:07 dee2945 kernel: i2c /dev entries driver
Jan 13 11:05:07 dee2945 kernel[664]: [   14.974497] i2c /dev entries driver
...
```

The rest of the journal has been truncated for brevity. Note that the `-a`
(short for `--all`) has been used, so that the logs from the service containers
themselves are also visible. Without this switch, the service container output
from `balena.service` (the balenaEngine) would be output like this:

```shell
Jan 13 11:05:20 dee2945 69dc1cee03e4[765]: [1B blob data]
Jan 13 11:05:20 dee2945 69dc1cee03e4[765]: [36B blob data]
Jan 13 11:05:20 dee2945 69dc1cee03e4[765]: [16B blob data]
Jan 13 11:05:20 dee2945 69dc1cee03e4[765]: [1B blob data]
Jan 13 11:05:20 dee2945 e374bbb9ddd4[765]: [1B blob data]
Jan 13 11:05:20 dee2945 e374bbb9ddd4[765]: [35B blob data]
Jan 13 11:05:20 dee2945 e374bbb9ddd4[765]: [16B blob data]
Jan 13 11:05:20 dee2945 e374bbb9ddd4[765]: [1B blob data]
```

If you're not examining the application's services then this output is fine, but
usually enabling persistent logs allows us to examine what also might be
happening in a service container that could cause an issue (for example, maybe
the container is privileged and causing a reboot because it talks to the host
DBus and issues a restart).

The maximum size for persistent journals is currently 32MB, and the logs are
stored on the data partition (in balenaOS versions less than v2.45.0, the
maximum size for journals was 8MB, and the data was held on the state partition,
the total size of which is 20MB). This has some impact on what can be captured,
and if an application is quite verbose, this can mean that there isn't enough
space to store logs that might be useful. It's worth noting this, and informing
customers of this fact so they can cut down the logging output if persistent
logs are deemed important for issue finding.

### 6. Determining Networking Issues

There are some common networking issues that can stop several major components
(the VPN, Supervisor, balenaEngine) from working correctly.

The current list of core networking requirements are
[here](https://www.balena.io/docs/reference/OS/network/2.x/#network-requirements)
and in brief, include:

* Access to TCP port 443 (for VPN, API, etc.), and UDP ports 123 and 53 for
    NTP and DNS respectively.
* Access to the `*.balena-cloud.com`, `*.docker.com` and `*.docker.io`
    wildcarded domains.
* Access to the `*.resinio.pool.ntp.org` NTP pools.
* Access to 8.8.8.8 and 8.8.4.4 for DNS resolution (although this is
    configurable via the `dnsServers` setting in `config.json`).

Additionally, customer applications themselves may have networking requirements
which may not be met. For example, a customer's application may need to send
data to a server, but the server is offline and unreachable, and maybe the
application isn't designed to handle these failures.

In general,
[debugging networking](https://github.com/balena-io/networking-masterclass/)
symptoms also gets easier the more you experiment with making changes to
networking interfaces and routes on a device. As such, it is well worth taking
the balena Networking Masterclass to familiarize yourself with balena device
networking.

The following sections describe some of the more common network failure
modes, as well as how to track them down. Be aware that several of these
problems may also occur at the same time, with one problem causing others to
appear. For example, NTP failure could stop the date from being correct, which
can lead to the VPN failing to connect (as the certificate is probably not yet
date-valid) as well as the Supervisor failing to download updates (for the same
reason).

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

* Refusal to connect to the balenaCloud VPN
* Refusal to download configuration from the API
* Refusal by the Supervisor to download the latest application updates

Examining the status of the `chrony` service can show these symptoms, along
with the simple `date` command:

```shell
root@11a12ec:/# date
Tue Dec  3 17:27:33 UTC 2019
```

If the date reported by the device differs to the current date and time, then
there is most probably a problem with the time service.

Before continuing with this exercise, reboot or power down/power up and wait
for it to come online before SSHing into it.

Ensure you know the local IP address of the debug device (or use `balena scan`
to find the hostname of your device), and SSH into it like this (where
`192.168.1.173` is the IP address of your device, or `<host>.local` name):

```shell
$ balena ssh 192.168.1.173
root@f34c2e9:~#
```

Your device should be connected, bring up the Dashboard page for the device.
It should be 'Online' and running the pushed application code.

We'll demonstrate an NTP failure by making some manual changes to the date:

```shell
root@f34c2e9:~# date -s "23 MAR 2017 12:00:00"
Thu Mar 23 12:00:00 UTC 2017
root@f34c2e9:~# systemctl restart openvpn
```

Almost immediately, you'll see that the device status moves to 'Offline'. So,
why has this happened? Let's take a look in the OpenVPN logs:

```shell
root@f34c2e9:~# journalctl -f -n 200 -u openvpn.service
Nov 22 11:17:28 f34c2e9 openvpn[786]: Fri Nov 22 11:17:28 2019 Initialization Sequence Completed
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 event_wait : Interrupted system call (code=4)
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 Closing TUN/TAP interface
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 /sbin/ip addr del dev resin-vpn local 10.240.54.178 peer 52.4.252.97
Mar 23 12:00:08 f34c2e9 openvpn[786]: ip: RTNETLINK answers: Operation not permitted
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 Linux ip addr del failed: external program exited with error status: 2
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 /etc/openvpn-misc/downscript.sh resin-vpn 1500 1555 10.240.54.178 52.4.252.97 init
Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 SIGTERM[hard,] received, process exiting
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 WARNING: file '/var/volatile/vpn-auth' is group or others accessible
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 OpenVPN 2.4.3 arm-poky-linux-gnueabi [SSL (OpenSSL)] [LZO] [LZ4] [EPOLL] [MH/PKTINFO] [AEAD] built on Aug 29 2019
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 library versions: OpenSSL 1.1.1b  26 Feb 2019, LZO 2.10
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 TCP/UDP: Preserving recently used remote address: [AF_INET]18.232.192.190:443
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 Socket Buffers: R=[87380->87380] S=[16384->16384]
Mar 23 12:00:08 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:08 2017 Attempting to establish TCP connection with [AF_INET]18.232.192.190:443 [nonblock]
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TCP connection established with [AF_INET]18.232.192.190:443
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TCP_CLIENT link local: (not bound)
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TCP_CLIENT link remote: [AF_INET]18.232.192.190:443
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 NOTE: UID/GID downgrade will be delayed because of --client, --pull, or --up-delay
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TLS: Initial packet from [AF_INET]18.232.192.190:443, sid=b6c2ec0b c8148cab
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 VERIFY OK: depth=1, C=AU, ST=Some-State, O=Internet Widgits Pty Ltd
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 VERIFY ERROR: depth=0, error=certificate is not yet valid: CN=vpn.balena-cloud.com
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 OpenSSL: error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TLS_ERROR: BIO read tls_read_plaintext error
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TLS Error: TLS object -> incoming plaintext read error
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 TLS Error: TLS handshake failed
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 Fatal TLS error (check_tls_errors_co), restarting
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 SIGUSR1[soft,tls-error] received, process restarting
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 Restart pause, 5 second(s)
Mar 23 12:00:14 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:14 2017 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Mar 23 12:00:14 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:14 2017 TCP/UDP: Preserving recently used remote address: [AF_INET]34.237.229.125:443
Mar 23 12:00:14 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:14 2017 Socket Buffers: R=[87380->87380] S=[16384->16384]
```

There's a bit to wade through here, but the first line shows the OpenVPN
successfully finalizing a connection to the balenaCloud VPN backend. However,
we then see our manual restart of the `openvpn.service` unit file
(`Mar 23 12:00:08 f34c2e9 openvpn[786]: Thu Mar 23 12:00:08 2017 SIGTERM[hard,] received, process exiting`)
and then it starting up again. But whilst it initializes, you'll note that
whilst trying to connect it found a problem in the verification stage:

```shell
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 VERIFY OK: depth=1, C=AU, ST=Some-State, O=Internet Widgits Pty Ltd
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 VERIFY ERROR: depth=0, error=certificate is not yet valid: CN=vpn.balena-cloud.com
Mar 23 12:00:09 f34c2e9 openvpn[2787]: Thu Mar 23 12:00:09 2017 OpenSSL: error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed
```

The certificate that it fetched from the balenaCloud VPN service is not yet
valid. This is because SSL certificates have "valid from" and "valid to"
dates. These ensure that they can only be used in a particular time window, and
if the current time falls outside of that window then any connection using them
is invalid. In this case, because we've set the time back to 2017, the date
doesn't fall within that window and the connection is aborted by the client.

However, after reading the above, if you look at the Dashboard, you'll now
see that the device has actually reconnected to the network again and its status
is 'Online'. But if the date is incorrect, why has the device reconnected?
Run the following on the device:

```shell
root@f34c2e9:~# date
Fri Nov 22 11:41:54 UTC 2019
```

So the date's actually now correct. This is because the NTP service
(`chronyd.service`) has eventually noticed that there's a mismatch in the
set time on the device, and the time from one of it's sources. Let's look at
the journal for it:

```shell
root@f34c2e9:~# journalctl -f -u chronyd.service
-- Logs begin at Thu 2017-03-23 12:00:04 UTC. --
Nov 22 11:17:17 localhost chronyd[737]: 2019-11-22T11:17:17Z chronyd version 3.4 starting (+CMDMON +NTP +REFCLOCK +RTC -PRIVDROP -SCFILTER -SIGND +ASYNCDNS -SECHASH +IPV6 -DEBUG)
Nov 22 11:17:28 f34c2e9 chronyd[737]: 2019-11-22T11:17:28Z Selected source 85.199.214.100
Mar 23 12:00:04 f34c2e9 chronyd[737]: 2017-03-23T12:00:04Z Backward time jump detected!
Mar 23 12:00:04 f34c2e9 chronyd[737]: 2017-03-23T12:00:04Z Can't synchronize: no selectable sources
Nov 22 11:34:43 f34c2e9 chronyd[737]: 2017-03-23T12:02:14Z Selected source 178.62.250.107
Nov 22 11:34:43 f34c2e9 chronyd[737]: 2017-03-23T12:02:14Z System clock wrong by 84151949.073647 seconds, adjustment started
Nov 22 11:34:43 f34c2e9 chronyd[737]: 2019-11-22T11:34:43Z System clock was stepped by 84151949.073647 seconds
Nov 22 11:35:50 f34c2e9 chronyd[737]: 2019-11-22T11:35:50Z Selected source 85.199.214.100
```

As you can see, it selected a source and set the time back to the correct
current time. This had a knock on effect, in that the OpenVPN service
reattempted to connect to the backend:

```shell
root@f34c2e9:~# journalctl -f -n 100 -u openvpn
Mar 23 12:02:06 f34c2e9 openvpn[2787]: Thu Mar 23 12:02:06 2017 Fatal TLS error (check_tls_errors_co), restarting
Mar 23 12:02:06 f34c2e9 openvpn[2787]: Thu Mar 23 12:02:06 2017 SIGUSR1[soft,tls-error] received, process restarting
Mar 23 12:02:06 f34c2e9 openvpn[2787]: Thu Mar 23 12:02:06 2017 Restart pause, 40 second(s)
Nov 22 11:35:15 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:15 2019 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Nov 22 11:35:15 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:15 2019 TCP/UDP: Preserving recently used remote address: [AF_INET]34.237.229.125:443
Nov 22 11:35:15 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:15 2019 Socket Buffers: R=[87380->87380] S=[16384->16384]
Nov 22 11:35:15 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:15 2019 Attempting to establish TCP connection with [AF_INET]34.237.229.125:443 [nonblock]
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 TCP connection established with [AF_INET]34.237.229.125:443
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 TCP_CLIENT link local: (not bound)
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 TCP_CLIENT link remote: [AF_INET]34.237.229.125:443
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 TLS: Initial packet from [AF_INET]34.237.229.125:443, sid=d9a5be84 d8e04a9e
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 VERIFY OK: depth=1, C=AU, ST=Some-State, O=Internet Widgits Pty Ltd
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 VERIFY KU OK
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 Validating certificate extended key usage
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 VERIFY EKU OK
Nov 22 11:35:16 f34c2e9 openvpn[2787]: Fri Nov 22 11:35:16 2019 VERIFY OK: depth=0, CN=vpn.balena-cloud.com
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
root@f34c2e9:~# systemctl stop chronyd.service
root@f34c2e9:~# date -s "23 MAR 2017 12:00:00"
```

Now from your development machine, repush the application from the
`multicontainer-app` directory:

```shell
$ balena push DebugApp
```

Once the build has completed, the device should try and download the updated
application. However, you'll notice that the download doesn't start and
no changes are made. The Dashboard stays static. Why is this? Well as you've
probably guessed, it's for the same reasons that the VPN connection doesn't
work. Run the following on your device:

```shell
journalctl -f -u balena-supervisor -u resin-supervisor
-- Logs begin at Thu 2017-03-23 12:00:04 UTC. --
Nov 22 11:48:09 f34c2e9 balena-supervisor[1830]: [debug]   Container log timestamp flush complete
Nov 22 11:48:10 f34c2e9 balena-supervisor[1830]: [api]     GET /v1/healthy 200 - 9.561 ms
Nov 22 11:53:11 f34c2e9 balena-supervisor[1830]: [api]     GET /v1/healthy 200 - 18.136 ms
Mar 23 12:00:44 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:01:00 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:01:30 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:02:30 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:03:30 f34c2e9 balena-supervisor[1830]: [event]   Event: Update notification {}
Mar 23 12:03:30 f34c2e9 balena-supervisor[1830]: [api]     POST /v1/update 204 - 26.804 ms
Mar 23 12:03:31 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:04:23 f34c2e9 balena-supervisor[1830]: [debug]   Attempting container log timestamp flush...
Mar 23 12:04:23 f34c2e9 balena-supervisor[1830]: [debug]   Container log timestamp flush complete
Mar 23 12:04:26 f34c2e9 balena-supervisor[1830]: [api]     GET /v1/healthy 200 - 10.975 ms
Mar 23 12:04:31 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
```

As you can see, the certificate is again not valid as the current device time
does not fall within the validity window, and so the Supervisor won't pull the
updated application. If we restart chrony, this will be rectified and the
Supervisor will, after a short delay, update the application:

```shell
root@f34c2e9:~# systemctl start chronyd.service
root@f34c2e9:~# journalctl -f -u balena-supervisor -u resin-supervisor
-- Logs begin at Thu 2017-03-23 12:00:04 UTC. --
Mar 23 12:01:00 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:01:30 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:02:30 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:03:30 f34c2e9 balena-supervisor[1830]: [event]   Event: Update notification {}
Mar 23 12:03:30 f34c2e9 balena-supervisor[1830]: [api]     POST /v1/update 204 - 26.804 ms
Mar 23 12:03:31 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Mar 23 12:04:23 f34c2e9 balena-supervisor[1830]: [debug]   Attempting container log timestamp flush...
Mar 23 12:04:23 f34c2e9 balena-supervisor[1830]: [debug]   Container log timestamp flush complete
Mar 23 12:04:26 f34c2e9 balena-supervisor[1830]: [api]     GET /v1/healthy 200 - 10.975 ms
Mar 23 12:04:31 f34c2e9 balena-supervisor[1830]: [error]   Failed to get target state for device: Error: certificate is not yet valid
Nov 22 11:59:30 f34c2e9 balena-supervisor[1830]: [info]    Waiting for connectivity...
Nov 22 11:59:50 f34c2e9 balena-supervisor[1830]: [info]    Internet Connectivity: OK
Nov 22 12:02:17 f34c2e9 balena-supervisor[1830]: [info]    Applying target state
Nov 22 12:02:18 f34c2e9 balena-supervisor[1830]: [debug]   Replacing container for service frontend because of config changes:
Nov 22 12:02:18 f34c2e9 balena-supervisor[1830]: [debug]     Non-array fields:  {"added":{},"deleted":{"command":{},"entrypoint":{},"environment":{},"labels":{}},"updated":{"image":"registry2.balena-cloud.com/v2/83732ad30648d5f3e68188ed154ffdc2@sha256:8ec0ba1f96a51d936a83d8aa0ac1db2827a0458c2b6f7e3a5f814d6ad26b6d1f","workingDir":""}}
...
```

This shows the importance of a working service such as timesetting, and how this
can affect the system as a whole. As a note, be aware that not *every* device
relies completely on NTP. Some devices, such as an Intel NUC, also have battery
backed services including an RTC, which means that even if NTP is not working
the time may look at first glance as though it's correct. However, if NTP is
not operational even an RTC will eventually suffer from clock skew (the slow
movement away from the real time due to drift) which will eventually cause
issues.

`chronyc` is a command-line utility that can be used to interoperate with the
NTP daemon. `chronyc` has many commands, the most useful are:

* `sources` - A list of all the current NTP sources being used by the NTP
    daemon.
* `reselect` - Forces the NTP daemon to reselect the best time synchronization
    source.
* `tracking` - Information about the system clock itself, including skew.
* `ntpdata` - Detailed information on all the current NTP sources.

#### 6.2 DNS Issues

Service: `dnsmasq.service`

DNS (Domain Name Service) functionality allows the IP address of a hostname to
be retrieved for use by anything that uses endpoints on the Internet (that
isn't specified by an IP address). Any executable that uses a hostname to
make a connection to that host always uses DNS to get the IP address to make
that connection.

For this reason, DNS is vital in the reliable operation of a balena device as it
provides the ability to lookup `*.balena-cloud.com` hostnames to allow the
download of applications, reporting the device state, connection to the VPN,
etc.

DNS is provided by the `dnsmasq.service` unit, which uses a default
configuration located at `/etc/dnsmasq.conf` and a list of nameservices
in `/etc/resolv.dnsmasq`. This itself is derived from the
`/var/run/resolvconf/interface/NetworkManager` file.

The DNSMasq service runs at local address `127.0.0.2`. This is used, because
it allows customer application services to provide their own DNS if required
and therefore does not clash with them.

By default, the external name servers used are the Google primary and secondary
at `8.8.8.8` and  `8.8.4.4`. However, these can be overridden by modifying the
`/mnt/boot/config.json` file and adding a `dnsServers` property, with a comma
separated list of the IP addresses of the nameservers to use (see
[the docs](https://github.com/balena-os/meta-balena#dnsservers) for more
information).

SSH into your device:

```shell
$ balena ssh 192.168.1.173
The authenticity of host '[192.168.1.173]:22222 ([192.168.1.173]:22222)' can't be established.
ECDSA key fingerprint is SHA256:xr1DjpoK8Ga6J318INrxP7bQbtALX8+//QlzoASbgWY.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[192.168.1.173]:22222' (ECDSA) to the list of known hosts.
root@f34c2e9:~#
```

We're going to modify the DNS servers to point at one that doesn't exist,
just to show what happens. SSH into your device as above, then run the
following:

```shell
root@51cc514:~# jq '.dnsServers = "1.2.3.4"' /mnt/boot/config.json > /mnt/data/config.json && mv /mnt/data/config.json /mnt/boot/config.json
root@51cc514:~# mount -o remount,rw /
root@51cc514:~# mv /etc/resolv.dnsmasq /etc/resolv.dnsmasq.moved
root@51cc514:~# sync
root@51cc514:~# reboot
```

This will move the default DNSMasq resolver config file, so that it's not
picked up. Additionally, it will modify the configuration to set the nameserver
to use as `1.2.3.4`. As this isn't a valid nameserver, nothing will get the
right address to make connections. Note that usually, remounting the root FS
as writeable is a very risky move, and should not be carried out without good
reason!

After a while, once the device has rebooted, SSH back into the device, and look
at the `dnsmasq.service` unit:

```shell
root@51cc514:~# systemctl status dnsmasq
Warning: The unit file, source configuration file or drop-ins of dnsmasq.service changed on disk. Run 'systemctl daemon-reload' to reload units.
● dnsmasq.service - DNS forwarder and DHCP server
   Loaded: loaded (/lib/systemd/system/dnsmasq.service; enabled; vendor preset: enabled)
  Drop-In: /etc/systemd/system/dnsmasq.service.d
           └─dnsmasq.conf
   Active: active (running) since Wed 2019-12-04 17:46:56 UTC; 2min 38s ago
  Process: 758 ExecStartPre=/usr/bin/dnsmasq --test (code=exited, status=0/SUCCESS)
 Main PID: 762 (dnsmasq)
   Memory: 672.0K
   CGroup: /system.slice/dnsmasq.service
           └─762 /usr/bin/dnsmasq -x /run/dnsmasq.pid -a 127.0.0.2,10.114.102.1 -7 /etc/dnsmasq.d/ -r /etc/resolv.dnsmasq -z --servers-file=/run/dnsmasq.servers -k --log->

Dec 04 17:46:56 51cc514 systemd[1]: Starting DNS forwarder and DHCP server...
Dec 04 17:46:56 51cc514 dnsmasq[758]: dnsmasq: syntax check OK.
Dec 04 17:46:56 51cc514 systemd[1]: Started DNS forwarder and DHCP server.
Dec 04 17:46:56 51cc514 dnsmasq[762]: dnsmasq[762]: started, version 2.78 cachesize 150
Dec 04 17:46:56 51cc514 dnsmasq[762]: dnsmasq[762]: compile time options: IPv6 GNU-getopt DBus no-i18n no-IDN DHCP DHCPv6 no-Lua TFTP no-conntrack ipset auth no-DNSSEC lo>
Dec 04 17:46:56 51cc514 dnsmasq[762]: dnsmasq[762]: DBus support enabled: connected to system bus
Dec 04 17:46:56 51cc514 dnsmasq[762]: dnsmasq[762]: read /etc/hosts - 6 addresses
Dec 04 17:46:56 51cc514 dnsmasq[762]: dnsmasq[762]: using nameserver 1.2.3.4#53
Dec 04 17:47:01 51cc514 dnsmasq[762]: dnsmasq[762]: failed to access /etc/resolv.dnsmasq: No such file or directory
```

As you can see, it's tried, and failed to get the `/etc/resolv.dnsmasq` file
and has just the one nameserver to use, `1.2.3.4`.

Now let's look at the Supervisor:

```shell
root@51cc514:~# systemctl status balena-supervisor
● balena-supervisor.service - Resin supervisor
   Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-12-04 17:47:07 UTC; 7min ago
  Process: 1328 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
  Process: 1310 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
 Main PID: 1330 (start-resin-sup)
   Memory: 7.8M
   CGroup: /system.slice/balena-supervisor.service
           ├─1330 /bin/sh /usr/bin/start-balena-supervisor
           ├─1337 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 1330
           └─1420 balena start --attach balena_supervisor

Dec 04 17:48:44 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:49:10 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:49:52 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:49:53 51cc514 balena-supervisor[1330]: Failed to get target state for device: Error: getaddrinfo EAI_AGAIN api.balena-cloud.com api.balena-cloud.com:443
Dec 04 17:51:02 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:52:03 51cc514 balena-supervisor[1330]: Failed to get target state for device: Error: getaddrinfo EAI_AGAIN api.balena-cloud.com api.balena-cloud.com:443
Dec 04 17:52:10 51cc514 balena-supervisor[1330]: Supervisor API: GET /v1/healthy 200 - 19.034 ms
Dec 04 17:52:12 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:53:22 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
Dec 04 17:54:32 51cc514 balena-supervisor[1330]: Event: Device state report failure {"error":{"message":""}}
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
root@51cc514:~# curl https://google.com
curl: (6) Could not resolve host: google.com
root@51cc514:~# curl https://api.balena-cloud.com/ping
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
root@51cc514:/etc# mount -o remount,rw /
root@51cc514:/etc# mv resolv.dnsmasq.moved resolv.dnsmasq
root@51cc514:/etc# jq -M 'del(.dnsServers)' /mnt/boot/config.json > /mnt/data/config.json && mv /mnt/data/config.json /mnt/boot/config.json
root@51cc514:/etc# sync
root@51cc514:/etc# reboot
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
from the API, once the device has been registered against the application. Let's
have a look at the journal output from a device that's been freshly provisioned
and started for the first time:

```shell
root@8117443:~# journalctl -f -n 300 -u os-config
-- Logs begin at Thu 2019-06-13 13:21:34 UTC. --
Dec 05 10:10:28 8117443 systemd[1]: Started OS configuration update service.
Dec 05 10:10:28 8117443 os-config[841]: Fetching service configuration from https://api.balena-cloud.com/os/v1/config...
Dec 05 10:10:28 8117443 os-config[841]: https://api.balena-cloud.com/os/v1/config: error trying to connect: failed to lookup address information: Temporary failure in name resolution
Dec 05 10:10:33 8117443 os-config[841]: Service configuration retrieved
Dec 05 10:10:33 8117443 os-config[841]: Stopping balena-supervisor.service...
Dec 05 10:10:33 8117443 os-config[841]: Awaiting balena-supervisor.service to exit...
Dec 05 10:10:34 8117443 os-config[841]: Stopping prepare-openvpn.service...
Dec 05 10:10:34 8117443 os-config[841]: Stopping openvpn.service...
Dec 05 10:10:34 8117443 os-config[841]: Awaiting prepare-openvpn.service to exit...
Dec 05 10:10:34 8117443 os-config[841]: Awaiting openvpn.service to exit...
Dec 05 10:10:34 8117443 os-config[841]: /etc/openvpn/ca.crt updated
Dec 05 10:10:34 8117443 os-config[841]: /etc/openvpn/openvpn.conf updated
Dec 05 10:10:34 8117443 os-config[841]: Starting prepare-openvpn.service...
Dec 05 10:10:34 8117443 os-config[841]: Starting openvpn.service...
Dec 05 10:10:34 8117443 os-config[841]: /home/root/.ssh/authorized_keys_remote updated
Dec 05 10:10:34 8117443 os-config[841]: Starting balena-supervisor.service...
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

So, what happens if the API *isn't* available? If this occurs on first boot,
then the device wouldn't be able to register, so there wouldn't be a
configuration to fetch for it.

On subsequent boots, the API not being initially available isn't as much of an
issue, because there is already a configuration and certificate for the VPN
which can be used until `os-config` can contact the API to check for new
configurations (and it is unlikely to have changed in the meantime).

Let's now look at the current OpenVPN journal entries on your device. SSH into
the device:

```shell
$ balena ssh 192.168.1.173
root@8117443:~# journalctl -f -n 200 -u openvpn.service
-- Logs begin at Thu 2019-06-13 13:21:34 UTC. --
Dec 05 10:42:57 8117443 systemd[1]: Started OpenVPN.
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 WARNING: file '/var/volatile/vpn-auth' is group or others accessible
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 OpenVPN 2.4.3 arm-poky-linux-gnueabi [SSL (OpenSSL)] [LZO] [LZ4] [EPOLL] [MH/PKTINFO] [AEAD] built on Apr 24 2019
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 library versions: OpenSSL 1.1.1a  20 Nov 2018, LZO 2.10
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 RESOLVE: Cannot resolve host address: vpn.balena-cloud.com:443 (Temporary failure in name resolution)
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 RESOLVE: Cannot resolve host address: vpn.balena-cloud.com:443 (Temporary failure in name resolution)
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 Could not determine IPv4/IPv6 protocol
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 NOTE: UID/GID downgrade will be delayed because of --client, --pull, or --up-delay
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 SIGUSR1[soft,init_instance] received, process restarting
Dec 05 10:42:57 8117443 openvpn[755]: Thu Dec  5 10:42:57 2019 Restart pause, 5 second(s)
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 RESOLVE: Cannot resolve host address: vpn.balena-cloud.com:443 (Temporary failure in name resolution)
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 RESOLVE: Cannot resolve host address: vpn.balena-cloud.com:443 (Temporary failure in name resolution)
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 Could not determine IPv4/IPv6 protocol
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 SIGUSR1[soft,init_instance] received, process restarting
Dec 05 10:43:02 8117443 openvpn[755]: Thu Dec  5 10:43:02 2019 Restart pause, 5 second(s)
Dec 05 10:43:07 8117443 openvpn[755]: Thu Dec  5 10:43:07 2019 NOTE: the current --script-security setting may allow this configuration to call user-defined scripts
Dec 05 10:43:07 8117443 openvpn[755]: Thu Dec  5 10:43:07 2019 TCP/UDP: Preserving recently used remote address: [AF_INET]18.232.192.190:443
Dec 05 10:43:07 8117443 openvpn[755]: Thu Dec  5 10:43:07 2019 Socket Buffers: R=[87380->87380] S=[16384->16384]
Dec 05 10:43:07 8117443 openvpn[755]: Thu Dec  5 10:43:07 2019 Attempting to establish TCP connection with [AF_INET]18.232.192.190:443 [nonblock]
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP connection established with [AF_INET]18.232.192.190:443
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP_CLIENT link local: (not bound)
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP_CLIENT link remote: [AF_INET]18.232.192.190:443
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TLS: Initial packet from [AF_INET]18.232.192.190:443, sid=78485d82 8553c618
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY OK: depth=1, C=AU, ST=Some-State, O=Internet Widgits Pty Ltd
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY KU OK
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 Validating certificate extended key usage
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY EKU OK
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY OK: depth=0, CN=vpn.balena-cloud.com
Dec 05 10:43:09 8117443 openvpn[755]: Thu Dec  5 10:43:09 2019 Control Channel: TLSv1.3, cipher TLSv1.3 TLS_AES_256_GCM_SHA384, 2048 bit RSA
Dec 05 10:43:09 8117443 openvpn[755]: Thu Dec  5 10:43:09 2019 [vpn.balena-cloud.com] Peer Connection Initiated with [AF_INET]18.232.192.190:443
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 SENT CONTROL [vpn.balena-cloud.com]: 'PUSH_REQUEST' (status=1)
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 PUSH: Received control message: 'PUSH_REPLY,sndbuf 0,rcvbuf 0,route 52.4.252.97,ping 10,ping-restart 60,socket-flags TCP_NODELAY,ifconfig 10.240.49.239 52.4.252.97,peer-id 0,cipher AES-256-GCM'
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: timers and/or timeouts modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: --sndbuf/--rcvbuf options modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Socket Buffers: R=[341760->341760] S=[44800->44800]
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: --socket-flags option modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Socket flags: TCP_NODELAY=1 succeeded
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: --ifconfig/up options modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: route options modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: peer-id set
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: adjusting link_mtu to 1627
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 OPTIONS IMPORT: data channel crypto options modified
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Data Channel: using negotiated cipher 'AES-256-GCM'
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Data Channel Encrypt: Cipher 'AES-256-GCM' initialized with 256 bit key
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Data Channel Decrypt: Cipher 'AES-256-GCM' initialized with 256 bit key
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 ROUTE_GATEWAY 192.168.1.1/255.255.255.0 IFACE=eth0 HWADDR=b8:27:eb:a1:10:56
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 TUN/TAP device resin-vpn opened
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 TUN/TAP TX queue length set to 100
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 do_ifconfig, tt->did_ifconfig_ipv6_setup=0
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 /sbin/ip link set dev resin-vpn up mtu 1500
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 /sbin/ip addr add dev resin-vpn local 10.240.49.239 peer 52.4.252.97
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 /etc/openvpn-misc/upscript.sh resin-vpn 1500 1555 10.240.49.239 52.4.252.97 init
Dec 05 10:43:10 8117443 openvpn[755]: resin-ntp-config: Found config.json in /mnt/boot/config.json .
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 /sbin/ip route add 52.4.252.97/32 via 52.4.252.97
Dec 05 10:43:10 8117443 openvpn[755]: ip: RTNETLINK answers: File exists
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 ERROR: Linux route add command failed: external program exited with error status: 2
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 GID set to openvpn
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 UID set to openvpn
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Initialization Sequence Completed
```

There's a lot to take in here, but there are some key lines here that show
that the VPN has negotiated with the backend and is connected and routing
traffic:

```shell
Dec 05 10:43:07 8117443 openvpn[755]: Thu Dec  5 10:43:07 2019 Attempting to establish TCP connection with [AF_INET]18.232.192.190:443 [nonblock]
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP connection established with [AF_INET]18.232.192.190:443
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP_CLIENT link local: (not bound)
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TCP_CLIENT link remote: [AF_INET]18.232.192.190:443
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 TLS: Initial packet from [AF_INET]18.232.192.190:443, sid=78485d82 8553c618
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY OK: depth=1, C=AU, ST=Some-State, O=Internet Widgits Pty Ltd
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY KU OK
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 Validating certificate extended key usage
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 ++ Certificate has EKU (str) TLS Web Server Authentication, expects TLS Web Server Authentication
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY EKU OK
Dec 05 10:43:08 8117443 openvpn[755]: Thu Dec  5 10:43:08 2019 VERIFY OK: depth=0, CN=vpn.balena-cloud.com
Dec 05 10:43:09 8117443 openvpn[755]: Thu Dec  5 10:43:09 2019 Control Channel: TLSv1.3, cipher TLSv1.3 TLS_AES_256_GCM_SHA384, 2048 bit RSA
Dec 05 10:43:09 8117443 openvpn[755]: Thu Dec  5 10:43:09 2019 [vpn.balena-cloud.com] Peer Connection Initiated with [AF_INET]18.232.192.190:443
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 SENT CONTROL [vpn.balena-cloud.com]: 'PUSH_REQUEST' (status=1)
...
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 GID set to openvpn
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 UID set to openvpn
Dec 05 10:43:10 8117443 openvpn[755]: Thu Dec  5 10:43:10 2019 Initialization Sequence Completed
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
a device *in* the network can create a connection and receive all data from
the Internet based on that connection), but to refuse any incoming connection
from the Internet, unless specifically allowed.

On that note, firewalls can include blacklists and whitelists.
Most industrial routers and firewalls blacklist everything by default,
requiring a set of whitelisted IPs and domain names where traffic can be
sent/received from.

However, firewalling on some networks can be very aggressive, where without
any whitelisting all outgoing and incoming traffic is blocked. Usually, what
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
to be operating normally, but a customer complains that their application seems
to not be able to contact their own cloud servers. It could be that the firewall
lets through all the traffic required by balena, but is blocking other arbitrary
ports, which might include the ports required by an application on the device.

These are all points which a support engineer should be aware of when
investigating a device that is showing abnormal behavior which might be related
to a network.

There are some very simple tests that can be carried out to see if most of the
network requirements are satisfied:

* `curl` to the API (`curl https://api.balena-cloud.com/ping`) and VPN
    (`curl https://vpn.balena-cloud.com/ping`) endpoints to see if a connection
    is attempted (in the latter case, you'll get an error, but shouldn't get
    a 'Not found' or 'Timeout' error)
* Check `chronyd.service` to see when it last updated
* Ensure that DNS is working (again a `curl` to the API endpoint will show if
    name resolution is working or not)
* Ensure that the registry endpoint is not blocked. This will exhibit as the
    Supervisor being unable to instruct balenaEngine to pull an application's
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

```text
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

### 7. Working with the `config.json` File

***IMPORTANT:*** Making changes to a device's configuration in-situ can
be extremely hazardous. This can potentially result in a device that, at best,
does not behave consistently and at worst needs its media removed and the
configuration reset before being replaced in the device. Do not change
configuration settings unless you know how to, and are assured that the changes
you've made are correct. If you do make a mistake, ensure that you do not
exit the device's SSH connection until the configuration *is* correct. Doing so
may result in the device becoming inaccessible.

A balenaOS image, by default, does not include any configuration information
to associate it with an application. When a customer downloads a provisioning
image from the Dashboard, balenaCloud injects the configuration for the specific
application the image is being downloaded for. Similarly, the balena CLI allows
the download of a balenaOS image for a device type (and specific version), but
requires that this image has a configuration added (usually via the use of
`balena os configure`) before flashing to bootable media.

The configuration data is stored on the boot partition of the media (the first
partition of the image). When an image is mounted under Windows or macOS
(and potentially Linux depending on any automounter being used), the boot
partition will be the one that shows up, usually named `resin-boot`.
The `config.json` file exists in the root of the partition and can be read/write
accessed from there.

On-device, the boot partition is mounted at `/mnt/boot/`. Assuming you're still
logged into your debug device, run the following:

```shell
root@dee2945:~# ls /mnt/boot/
bcm2708-rpi-0-w.dtb	bcm2710-rpi-3-b-plus.dtb	  bootcode.bin	    dt-blob.bin		kernel7.img	     splash
bcm2708-rpi-b-plus.dtb	bcm2710-rpi-3-b.dtb		  cmdline.txt	    fixup.dat		os-release	     start.elf
bcm2708-rpi-b.dtb	bcm2710-rpi-cm3.dtb		  config.json	    fixup_cd.dat	overlays	     start_cd.elf
bcm2708-rpi-cm.dtb	bcm2835-bootfiles-20181112.stamp  config.txt	    fixup_x.dat		resin-image	     start_x.elf
bcm2709-rpi-2-b.dtb	boot.scr			  device-type.json  image-version-info	resinos.fingerprint  system-connections
```

As you can see, all the boot required files exist in the root, including
`config.json`, and it is from the `/mnt/boot` mountpoint that any services that
require access to files on the boot partition (including the configuration)
read this data.

**Important note:** There is an occasional misunderstanding that the directory
`/resin-boot` when on-device is the correct directory to modify files in.
This is *not* the case, and in fact this directory is a pre-built directory
that exists as part of the root FS partition, and *not* the mounted boot
partition. Let's verify this:

```shell
root@dee2945:~# cat /resin-boot/config.json
{
  "deviceType": "fincm3",
  "hostname": "balena",
  "localMode": true,
  "persistentLogging": false
}
```

As you can see, there's very little information in the configuration file in
the `/resin-boot` directory, and certainly nothing that associates it with an
application. On the other hand, if we look at `/mnt/boot/config.json` you can
see that all the required information for the device to be associated with its
application exists:

```shell
root@dee2945:~# cat /mnt/boot/config.json | jq
{
  "apiEndpoint": "https://api.balena-cloud.com",
  "appUpdatePollInterval": 900000,
  "applicationId": "1234567",
  "applicationName": "DebugApp",
  "deltaEndpoint": "https://delta.balena-cloud.com",
  "deviceApiKey": "1234566edab91fe8cc9ed6b27ff81215",
  "deviceApiKeys": {
    "api.balena-cloud.com": "1234566edab91fe8cc9ed6b27ff81215"
  },
  "deviceType": "fincm3",
  "listenPort": "48484",
  "mixpanelToken": "123456ea64cb6cd8bbc96af72345d70d",
  "pubnubPublishKey": "",
  "pubnubSubscribeKey": "",
  "registryEndpoint": "registry2.balena-cloud.com",
  "userId": "1234",
  "username": "captaincaveman",
  "vpnEndpoint": "vpn.balena-cloud.com",
  "vpnPort": "443",
  "uuid": "1234565a13195b0d209ad88574447bf3",
  "registered_at": 1578331919919,
  "deviceId": 1234564
}
```

you can see that all the required information for the device to be associated
with its application exists.

There's a fairly easy way to remember which is the right place, the root FS
is read-only, so if you try and modify the `config.json` you'll be told it's
read-only.

For the configuration itself, as you can see we used `jq` to prettify the
output of the `config.json`. If we hadn't used it, you'd see the raw
file, which is essentially just a very long string:

```shell
root@dee2945:~# cat /mnt/boot/config.json
{"apiEndpoint": "https://api.balena-cloud.com","appUpdatePollInterval": 900000,"applicationId": "1234567","applicationName": "DebugApp","deltaEndpoint": "https://delta.balena-cloud.com","deviceApiKey": "1234566edab91fe8cc9ed6b27ff81215","deviceApiKeys": {  "api.balena-cloud.com": "1234566edab91fe8cc9ed6b27ff81215"},"deviceType": "fincm3","listenPort": "48484","mixpanelToken": "123456ea64cb6cd8bbc96af72345d70d","pubnubPublishKey": "","pubnubSubscribeKey": "","registryEndpoint": "registry2.balena-cloud.com","userId": "1234","username": "captaincaveman","vpnEndpoint": "vpn.balena-cloud.com","vpnPort": "443","uuid": "1234565a13195b0d209ad88574447bf3","registered_at": 1578331919919,"deviceId": 1234564}
```

This is difficult to read, so you should familiarize yourself with `jq` to parse
the file and also to make changes. `jq` will not make changes to the same file
it's reading, so we need to make a copy of the file to change it, and then copy
it back to its original location. This acts also as a guard, because it ensures
you keep a backup of the original configuration in case you make a mistake.

As an example, we're going to change the hostname from the short UUID of the
device to something else, `debug-device`:

```shell
root@2f69955:~# cd /mnt/boot/
root@04916bf:/mnt/boot# cp config.json config.json.backup && cat config.json.backup | jq ".hostname=\"debug-device\"" -c > config.json
root@04916bf:/mnt/boot# cat config.json | jq
{
  "apiEndpoint": "https://api.balena-cloud.com",
  "appUpdatePollInterval": 900000,
  "applicationId": "1544229",
  "applicationName": "DebugApp",
  "deltaEndpoint": "https://delta.balena-cloud.com",
  "deviceApiKey": "970f4b87b92fa891480b808521411cea",
  "deviceApiKeys": {
    "api.balena-cloud.com": "970f4b87b92fa891480b808521411cea"
  },
  "deviceType": "raspberrypi3",
  "listenPort": "48484",
  "mixpanelToken": "9ef939ea64cb6cd8bbc96af72345d70d",
  "pubnubPublishKey": "",
  "pubnubSubscribeKey": "",
  "registryEndpoint": "registry2.balena-cloud.com",
  "userId": "9505",
  "username": "heds",
  "vpnEndpoint": "vpn.balena-cloud.com",
  "vpnPort": "443",
  "uuid": "04916bff5023a7f8927816fb7476b3f6",
  "registered_at": 1579690512283,
  "deviceId": 1787904,
  "hostname": "debug-device"
}
root@04916bf:/mnt/boot# reboot
```

The reboot is required as the hostname change will not be picked up until the
device restarts. Wait a little while, and then SSH back into the device, we'll
see that the hostname has changed:

```shell
root@debug-device:~#
```

Whilst making the changes, the new configuration is written to the `config.json`
file, whilst we have a backup of the original (`config.json.backup`).

Remember, should you need to change anything, *always* keep a copy of the
original configuration so you can restore it before you exit the device
(or if another support agent needs to view it/restore it at a later date).

There is full documentation on the configuration of a balena device
[here](https://www.balena.io/docs/reference/OS/configuration/#sample-configjson)
which includes all the properties applicable.

### 8. Working with the Supervisor

Service: `balena-supervisor.service`

The balena Supervisor is the service that carries out the management of the
application on a device, including determining when to download updates,
the changing of device/environment variables, ensuring application services
are restarted correctly, etc. It is, in effect, the on-device agent for
balenaCloud.

As such, it's imperative that the Supervisor is operational and healthy at all
times, even when a device is not connected via the Internet, as it still
ensures the running of a device that is offline.

The Supervisor itself is a Docker service that runs alongside any installed
application services and the healthcheck container (more on that later). One
major advantage of running it as a Docker service is that it can be updated
just like any other service (although actually carrying that out is slightly
different to updating an application, see 'Updating the Supervisor').

Assuming you're still logged into your development device, run the following:

```shell
root@8117443:~# systemctl status balena-supervisor.service
● balena-supervisor.service - Resin supervisor
   Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2019-12-16 15:49:07 UTC; 16h ago
  Process: 1349 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
  Process: 1333 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
 Main PID: 1357 (start-resin-sup)
   Memory: 7.7M
   CGroup: /system.slice/balena-supervisor.service
           ├─1357 /bin/sh /usr/bin/start-balena-supervisor
           ├─1359 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 1357
           └─1448 balena start --attach balena_supervisor

Dec 17 07:29:18 8117443 balena-supervisor[1357]: Container log timestamp flush complete
Dec 17 07:31:56 8117443 balena-supervisor[1357]: Supervisor API: GET /v1/healthy 200 - 7.055 ms
Dec 17 07:36:57 8117443 balena-supervisor[1357]: Supervisor API: GET /v1/healthy 200 - 5.894 ms
Dec 17 07:39:18 8117443 balena-supervisor[1357]: Attempting container log timestamp flush...
Dec 17 07:39:18 8117443 balena-supervisor[1357]: Container log timestamp flush complete
Dec 17 07:41:58 8117443 balena-supervisor[1357]: Supervisor API: GET /v1/healthy 200 - 9.367 ms
Dec 17 07:46:58 8117443 balena-supervisor[1357]: Supervisor API: GET /v1/healthy 200 - 9.452 ms
Dec 17 07:49:18 8117443 balena-supervisor[1357]: Attempting container log timestamp flush...
Dec 17 07:49:18 8117443 balena-supervisor[1357]: Container log timestamp flush complete
Dec 17 07:51:59 8117443 balena-supervisor[1357]: Supervisor API: GET /v1/healthy 200 - 5.994 ms
```

You can see the Supervisor is just another `systemd` service
(`balena-supervisor.service)`, and that it is  started and run by balenaEngine.

Supervisor issues, due to their nature, vary quite significantly. It's also
commonly used to misattribute issues to. As the Supervisor is verbose about its
state and actions (such as the download of images), it tends to be suspected of
problems when in fact there are usually other underlying issues. A few examples
are:

* Networking problems - In the case of the Supervisor reporting failed downloads
    or attempting to retrieve the same images repeatedly (where in fact instable
    networking is usually the cause).
* Service container restarts - The default policy for service containers is to
    restart if they exit, and this sometimes is misunderstood. If a container's
    restarting, it's worth ensuring it's not because the container itself is
    exiting correctly either due to a bug in the service container code or
    because it has correctly come to the end of its running process.
* Staged releases - An application/device has been pinned to a particular
    version, and a new push is not being downloaded.

It's *always* worth considering how the system is configured, how releases were
produced, how the application or device is configured and what the current
networking state is when investigating Supervisor issues, to ensure that there
isn't something else amiss that the Supervisor is merely exposing via logging.

Another point to note is that the Supervisor is started using
[`healthdog`](https://github.com/balena-os/healthdog-rs) which continually
ensures that the Supervisor is present by using balenaEngine to find the
Supervisor image. If the image isn't present, or balenaEngine doesn't respond,
then the Supervisor is restarted. The default period for this check is 180
seconds at the time of writing, but inspect the
`/lib/systemd/system/balena-supervisor.service` file on-device to see what
it is for the device you're SSHd into. For example, using our example device:

```shell
root@14350bd:~# cat /lib/systemd/system/balena-supervisor.service
[Unit]
Description=Resin supervisor
Requires=\
    resin\x2ddata.mount \
    balena-device-uuid.service \
    os-config-devicekey.service \
    bind-etc-balena-supervisor.service
After=\
    balena.service \
    resin\x2ddata.mount \
    balena-device-uuid.service \
    os-config-devicekey.service \
    bind-etc-systemd-system-resin.target.wants.service \
    bind-etc-balena-supervisor.service \
    chronyd.service
Wants=balena.service

[Service]
Type=simple
Restart=always
RestartSec=10s
WatchdogSec=180
SyslogIdentifier=balena-supervisor
EnvironmentFile=/etc/balena-supervisor/supervisor.conf
EnvironmentFile=-/tmp/update-supervisor.conf
ExecStartPre=-/usr/bin/balena stop balena_supervisor
ExecStartPre=/bin/systemctl is-active balena.service
ExecStart=/usr/bin/healthdog --healthcheck=/usr/lib/balena-supervisor/balena-supervisor-healthcheck /usr/bin/start-balena-supervisor
ExecStop=-/usr/bin/balena stop balena_supervisor

[Install]
WantedBy=multi-user.target
```

#### 8.1 Restarting the Supervisor

It's actually incredibly rare to actually *need* a Supervisor restart. The
Supervisor will attempt to recover from issues that occur automatically, without
the requirement for a restart. If you've got to a point where you believe that
a restart is required, double check with the other agent on-duty, and if
required either with the Supervisor maintainer or another knowledgeable engineer
before doing so.

There are instances where the Supervisor is incorrectly restarted when in fact
the issue could be down to corruption of service images, containers, volumes
or networking. In these cases, you're better off dealing with the underlying
balenaEngine to ensure that anything corrupt is recreated correctly. See the
balenaEngine section for more details.

If a restart is required, ensure that you have gathered as much information
as possible before a restart, including pertinent logs and symptoms so that
investigations can occur asynchronously to determine what occurred and how it
may be mitigated in the future. Enabling permanent logging may also be of
benefit in cases where symptoms are repeatedly occurring.

To restart the Supervisor, simply restart the `systemd` service:

```shell
root@8117443:~# systemctl restart balena-supervisor.service
systroot@8117443:~# systemctl status balena-supervisor.service
● balena-supervisor.service - Resin supervisor
   Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-12-18 15:00:19 UTC; 1min 42s ago
  Process: 16605 ExecStop=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
  Process: 16657 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
  Process: 16649 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
 Main PID: 16658 (start-resin-sup)
   Memory: 7.4M
   CGroup: /system.slice/balena-supervisor.service
           ├─16658 /bin/sh /usr/bin/start-balena-supervisor
           ├─16659 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 16658
           └─16731 balena start --attach balena_supervisor
...
```

#### 8.2 Updating the Supervisor

Occasionally, there are situations where the Supervisor requires an update. This
may be because a device needs to use a new feature or because the version of
the Supervisor on a device is outdated and is causing an issue. Usually the best
way to achieve this is via a balenaOS update, either from the dashboard or via
the command line on the device.

If updating balenaOS is not desirable or a user prefers updating the Supervisor independently, this can easily be accomplished using the [self-service](https://www.balena.io/docs/reference/supervisor/supervisor-upgrades/) Supervisor upgrades. Alternatively, this can be programmatically done by using the Node.js SDK method [device.setSupervisorRelease](https://www.balena.io/docs/reference/sdk/node-sdk/#devicesetsupervisorreleaseuuidorid-supervisorversionorid-%E2%87%92-codepromisecode).

You can additionally write a script to manage this for a fleet of devices in combination with other SDK functions such as [device.getAll](https://www.balena.io/docs/reference/sdk/node-sdk/#devicegetalloptions-%E2%87%92-codepromisecode).

**Note:** In order to update the Supervisor release for a device, you must have edit permissions on the device (i.e., more than just support access).

#### 8.3 The Supervisor Database

The Supervisor uses a SQLite database to store persistent state (so in the
case of going offline, or a reboot, it knows exactly what state an
application should be in, and which images, containers, volumes and networks
to apply to it).

This database is located at
`/mnt/data/resin-data/balena-supervisor/database.sqlite` and can be accessed
inside the Supervisor, most easily by running Node. Assuming you're logged
into your device, run the following:

```shell
root@28c8bf0:~# balena exec -ti balena_supervisor node
```

This will get you into a Node interpreter in the Supervisor service
container. From here, we can use the `sqlite3` NPM module used by
the Supervisor to make requests to the database:

```shell
> sqlite3 = require('sqlite3');
{ Database: [Function: Database],
  Statement: [Function: Statement],
  Backup: [Function: Backup],
  OPEN_READONLY: 1,
  OPEN_READWRITE: 2,
  OPEN_CREATE: 4,
  OPEN_FULLMUTEX: 65536,
  OPEN_URI: 64,
  OPEN_SHAREDCACHE: 131072,
  OPEN_PRIVATECACHE: 262144,
  VERSION: '3.28.0',
  SOURCE_ID:
   '2019-04-16 19:49:53 884b4b7e502b4e991677b53971277adfaf0a04a284f8e483e2553d0f83156b50',
  VERSION_NUMBER: 3028000,
  OK: 0,
  ERROR: 1,
  INTERNAL: 2,
  PERM: 3,
  ABORT: 4,
  BUSY: 5,
  LOCKED: 6,
  NOMEM: 7,
  READONLY: 8,
  INTERRUPT: 9,
  IOERR: 10,
  CORRUPT: 11,
  NOTFOUND: 12,
  FULL: 13,
  CANTOPEN: 14,
  PROTOCOL: 15,
  EMPTY: 16,
  SCHEMA: 17,
  TOOBIG: 18,
  CONSTRAINT: 19,
  MISMATCH: 20,
  MISUSE: 21,
  NOLFS: 22,
  AUTH: 23,
  FORMAT: 24,
  RANGE: 25,
  NOTADB: 26,
  cached: { Database: [Function: Database], objects: {} },
  verbose: [Function] }
> db = new sqlite3.Database('/data/database.sqlite');
Database { open: false, filename: '/data/database.sqlite', mode: 65542 }
```

You can get a list of all the tables used by the Supervisor by issuing:

```shell
> db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;", console.log);
Database { open: true, filename: '/data/database.sqlite', mode: 65542 }
> null [
  { name: 'apiSecret' },
  { name: 'app' },
  { name: 'config' },
  { name: 'containerLogs' },
  { name: 'currentCommit' },
  { name: 'dependentApp' },
  { name: 'dependentAppTarget' },
  { name: 'dependentDevice' },
  { name: 'dependentDeviceTarget' },
  { name: 'deviceConfig' },
  { name: 'engineSnapshot' },
  { name: 'image' },
  { name: 'knex_migrations' },
  { name: 'knex_migrations_lock' },
  { name: 'logsChannelSecret' },
  { name: 'sqlite_sequence' }
]
```

With these, you can then examine and modify data, if required. Note that there's
usually little reason to do so, but this is included for completeness. For
example, to examine the configuration used by the Supervisor:

```shell
> db.all('SELECT * FROM config;', console.log);
Database { open: true, filename: '/data/database.sqlite', mode: 65542 }
> null [
  { key: 'localMode', value: 'false' },
  { key: 'initialConfigSaved', value: 'true' },
  { key: 'targetStateSet', value: 'true' },
  {
    key: 'initialConfigReported',
    value: 'https://api.balena-cloud.com'
  },
  { key: 'name', value: 'DevEnv' },
  { key: 'deltaVersion', value: '3' },
  { key: 'delta', value: 'true' }
]
```

Occasionally, should the Supervisor get into a state where it is unable to
determine which application images it should be downloading or running, it
is necessary to clear the database. This usually goes hand-in-hand with removing
the current containers and putting the Supervisor into a 'first boot' state,
whilst keeping the Supervisor and application images. This can be achieved by
carrying out the following:

```shell
root@dee2945:~# systemctl stop balena-supervisor.service update-balena-supervisor.timer
root@dee2945:~# balena rm -f $(balena ps -aq)
0780f5a88e52
18c0557ad6cc
88d1051bcc3f
root@dee2945:~# rm /mnt/data/resin-data/balena-supervisor/database.sqlite
```

This:

* Stops the Supervisor (and the timer that will attempt to restart it).
* Removes all current services containers (including the Supervisor).
* Removes the Supervisor database.
(If for some reason the images also need to be removed, run
`balena rmi -f $(balena images -q)` which will remove all images *including*
the Supervisor image).
You can now restart the Supervisor:

```shell
root@dee2945:~# systemctl start update-balena-supervisor.timer balena-supervisor.service
```

(If you deleted all the images, this will first download the Supervisor image
again before restarting it).
At this point, the Supervisor will start up as if the device has just been
provisioned (though it will already be registered), and the application will
be freshly downloaded (if the images were removed) before starting the service
containers.

### 9. Working with balenaEngine

Service: `balena.service`

balenaEngine is balena's fork of Docker, offering a range of added features
including real delta downloads, minimal disk writes (for improved media wear)
and other benefits for edge devices, in a small resource footprint.

balenaEngine is responsible for the fetching and storage of application service
images, as well as their execution as service containers, the creation of
defined networks and creation and storage of persistent data to service volumes.
As such, it is an extremely important part of balenaOS.

Additionally, as the Supervisor is also executed as a container, it is required
for its operation. This means that should balenaEngine fail for some reason,
it is likely that the Supervisor will also fail.

Issues with balenaEngine themselves are rare, although it can be initially
tempting to attribute them to balenaEngine instead of the actual underlying
issue. A couple of examples
of issues which are misattributed to :

* Failure to download application service updates - usually because there is an
    underlying network problem, or possibly issues with free space
* Failure to start service containers - most commonly customer services exit
    abnormally (or don't have appropriate error checking) although a full
    data partition can also occur, as can corrupt images

Reading the journal for balenaEngine is similar to all other `systemd` services.
Log into your device and then execute the following:

```shell
root@dee2945:~# journalctl --follow --unit balena.service
-- Logs begin at Tue 2020-01-14 11:37:45 UTC. --
Jan 15 14:31:48 dee2945 515ad785c072[765]: Container log timestamp flush complete
Jan 15 14:35:31 dee2945 515ad785c072[765]: Supervisor API: GET /v1/healthy 200 - 9.741 ms
Jan 15 14:40:32 dee2945 515ad785c072[765]: Supervisor API: GET /v1/healthy 200 - 6.365 ms
Jan 15 14:41:48 dee2945 515ad785c072[765]: Attempting container log timestamp flush...
Jan 15 14:41:48 dee2945 515ad785c072[765]: Container log timestamp flush complete
Jan 15 14:45:33 dee2945 515ad785c072[765]: Supervisor API: GET /v1/healthy 200 - 5.639 ms
Jan 15 14:50:34 dee2945 515ad785c072[765]: Supervisor API: GET /v1/healthy 200 - 6.897 ms
Jan 15 14:51:48 dee2945 515ad785c072[765]: Attempting container log timestamp flush...
Jan 15 14:51:48 dee2945 515ad785c072[765]: Container log timestamp flush complete
Jan 15 14:55:35 dee2945 515ad785c072[765]: Supervisor API: GET /v1/healthy 200 - 10.088 ms
```

What you'll first notice here is that there's Supervisor output here. This is
because balenaEngine is running the Supervisor and it pipes all Supervisor
logs to its own service output. This comes in particularly useful if you need to
examine the journal, because it will show both balenaEngine and Supervisor
output in the same logs chronologically.

Assuming your device is still running the pushed multicontainer application,
we can also see additionally logging for all the application service containers.
To do so, we'll restart balenaEngine, so that the services are started again:

```shell
root@dee2945:~# systemctl restart balena.service
root@dee2945:~# journalctl --follow -n 40 --unit balena.service
-- Logs begin at Tue 2020-01-14 11:37:45 UTC. --
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.131177535Z" level=info msg="Daemon has completed initialization"
Jan 15 15:02:41 dee2945 systemd[1]: Started Balena Application Container Engine.
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.176629455Z" level=info msg="API listen on [::]:2375"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179053804Z" level=info msg="API listen on /var/run/balena.sock"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179086252Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179107658Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 15 15:02:42 dee2945 1eb9fc69bb22[28215]: [17B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [1B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [35B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [16B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [1B blob data]
Jan 15 15:02:43 dee2945 2da77adc4b3d[28215]: [16B blob data]
Jan 15 15:02:43 dee2945 balenad[28215]: time="2020-01-15T15:02:43.948306475Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981/shim.sock debug=false pid=28793
Jan 15 15:02:45 dee2945 515ad785c072[28215]: Starting system message bus: dbus.
Jan 15 15:02:45 dee2945 515ad785c072[28215]:  * Starting Avahi mDNS/DNS-SD Daemon: avahi-daemon
Jan 15 15:02:45 dee2945 515ad785c072[28215]:    ...done.
Jan 15 15:02:49 dee2945 515ad785c072[28215]: (node:1) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting event tracker
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting up api binder
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting logging infrastructure
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Event: Supervisor start {}
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Performing database cleanup for container log timestamps
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Connectivity check enabled: true
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting periodic check for IP addresses
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Reporting initial state, supervisor version and API info
Jan 15 15:02:50 dee2945 515ad785c072[28215]: VPN status path exists.
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Waiting for connectivity...
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Skipping preloading
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting API server
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Applying target state
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Ensuring device is provisioned
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting current state report
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting target state poll
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Supervisor API listening on allowed interfaces only
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Finished applying target state
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Apply success!
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Applying target state
Jan 15 15:02:52 dee2945 515ad785c072[28215]: Finished applying target state
Jan 15 15:02:52 dee2945 515ad785c072[28215]: Apply success!
Jan 15 15:03:00 dee2945 515ad785c072[28215]: Internet Connectivity: OK
```

This is the last 40 lines of the balenaEngine journal after a restart. Note that
the Supervisor has been restarted, but also the following lines:

```shell
Jan 15 15:02:42 dee2945 1eb9fc69bb22[28215]: [17B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [1B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [35B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [16B blob data]
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: [1B blob data]
Jan 15 15:02:43 dee2945 2da77adc4b3d[28215]: [16B blob data]
```

By default, service container output is not displayed, and instead any output
from the containers are given as `blob data`. We can change this to output
the actual logs by using the `--all` (`-a`) switch. Let's try the same journal
command by requesting all output:

```shell
root@dee2945:~# journalctl --all --follow -n 40 --unit balena.service
-- Logs begin at Tue 2020-01-14 11:37:45 UTC. --
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.131177535Z" level=info msg="Daemon has completed initialization"
Jan 15 15:02:41 dee2945 systemd[1]: Started Balena Application Container Engine.
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.176629455Z" level=info msg="API listen on [::]:2375"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179053804Z" level=info msg="API listen on /var/run/balena.sock"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179086252Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 15 15:02:41 dee2945 balenad[28215]: time="2020-01-15T15:02:41.179107658Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 15 15:02:42 dee2945 1eb9fc69bb22[28215]: Started frontend
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]:
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: > backend@1.0.0 start /usr/src/app
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: > node index.js
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]:
Jan 15 15:02:43 dee2945 2da77adc4b3d[28215]: Started backend
Jan 15 15:02:43 dee2945 balenad[28215]: time="2020-01-15T15:02:43.948306475Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981/shim.sock debug=false pid=28793
Jan 15 15:02:45 dee2945 515ad785c072[28215]: Starting system message bus: dbus.
Jan 15 15:02:45 dee2945 515ad785c072[28215]:  * Starting Avahi mDNS/DNS-SD Daemon: avahi-daemon
Jan 15 15:02:45 dee2945 515ad785c072[28215]:    ...done.
Jan 15 15:02:49 dee2945 515ad785c072[28215]: (node:1) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting event tracker
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting up api binder
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting logging infrastructure
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Event: Supervisor start {}
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Performing database cleanup for container log timestamps
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Connectivity check enabled: true
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting periodic check for IP addresses
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Reporting initial state, supervisor version and API info
Jan 15 15:02:50 dee2945 515ad785c072[28215]: VPN status path exists.
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Waiting for connectivity...
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Skipping preloading
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting API server
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Applying target state
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Ensuring device is provisioned
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting current state report
Jan 15 15:02:50 dee2945 515ad785c072[28215]: Starting target state poll
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Supervisor API listening on allowed interfaces only
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Finished applying target state
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Apply success!
Jan 15 15:02:51 dee2945 515ad785c072[28215]: Applying target state
Jan 15 15:02:52 dee2945 515ad785c072[28215]: Finished applying target state
Jan 15 15:02:52 dee2945 515ad785c072[28215]: Apply success!
Jan 15 15:03:00 dee2945 515ad785c072[28215]: Internet Connectivity: OK
```

As you can see, this time we get the output from the service containers:

```shell
Jan 15 15:02:42 dee2945 1eb9fc69bb22[28215]: Started frontend
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]:
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: > backend@1.0.0 start /usr/src/app
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]: > node index.js
Jan 15 15:02:42 dee2945 2da77adc4b3d[28215]:
Jan 15 15:02:43 dee2945 2da77adc4b3d[28215]: Started backend
```

#### 9.1 Service Image, Container and Volume Locations

balenaEngine stores all its writeable data in the `/var/lib/docker` directory,
which is part of the data partition. We can see this by using the `mount`
command:

```shell
root@dee2945:~# mount | grep lib/docker
/dev/mmcblk0p6 on /var/lib/docker type ext4 (rw,relatime,data=ordered)
```

All balenaEngine state is stored in here, include images, containers and
volume data. Let's take a brief look through the most important directories
and explain the layout, which should help with investigations should they be
required.

Run `balena images` on your device:

```shell
root@dee2945:/var/lib/docker# balena images
REPOSITORY                                                       TAG                 IMAGE ID            CREATED             SIZE
registry2.balena-cloud.com/v2/9954d5f822472d8746c102abe2d81ff0   <none>              b55e61fcd743        2 days ago          238MB
registry2.balena-cloud.com/v2/90ed3ed07798f4b1c3faf3c4926b27ea   <none>              4c973956a691        2 days ago          233MB
balena/armv7hf-supervisor                                        v9.15.7             3977c88a7059        7 months ago        53.8MB
```

Each image has an image ID. These identify each image uniquely for operations
upon it, such as executing it as a container, removal, etc. We can inspect an
image to look at how it's made up:

```shell
root@dee2945:/var/lib/docker# balena inspect 4c973956a691
[
    {
        "Id": "sha256:4c973956a6911b65dab8c99ebd9c0c135b6a3de7e9dfcc9184b3c69d48a5d2b9",
        "RepoTags": [],
        "RepoDigests": [
            "registry2.balena-cloud.com/v2/90ed3ed07798f4b1c3faf3c4926b27ea@sha256:aca421984d407193b2f2dfbad9310e6e17edb2d808739c5d3e8a0fa8186540ef"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2020-01-14T16:50:09.769384881Z",
        "Container": "0dcf9f92cbe15e49bb1f70ab7f4f4aeaa82dd37992554d1f58d0de5cd174f78c",
        "ContainerConfig": {
            "Hostname": "6fbf3c3f54ca",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "LC_ALL=C.UTF-8",
                "DEBIAN_FRONTEND=noninteractive",
                "UDEV=off",
                "NODE_VERSION=10.18.0",
                "YARN_VERSION=1.21.1"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"npm\" \"start\"]"
            ],
            "ArgsEscaped": true,
            "Image": "sha256:3228b4f6a5bc76bde6520fb2009acdee8a925bb0c721361e05d45b5a536cdd47",
            "Volumes": null,
            "WorkingDir": "/usr/src/app",
            "Entrypoint": [
                "/usr/bin/entry.sh"
            ],
            "OnBuild": [],
            "Labels": {
                "io.balena.architecture": "armv7hf",
                "io.balena.device-type": "raspberry-pi2",
                "io.balena.qemu.version": "4.0.0+balena-arm"
            }
        },
        "DockerVersion": "dev",
        "Author": "",
        "Config": {
            "Hostname": "6fbf3c3f54ca",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "LC_ALL=C.UTF-8",
                "DEBIAN_FRONTEND=noninteractive",
                "UDEV=off",
                "NODE_VERSION=10.18.0",
                "YARN_VERSION=1.21.1"
            ],
            "Cmd": [
                "npm",
                "start"
            ],
            "ArgsEscaped": true,
            "Image": "sha256:3228b4f6a5bc76bde6520fb2009acdee8a925bb0c721361e05d45b5a536cdd47",
            "Volumes": null,
            "WorkingDir": "/usr/src/app",
            "Entrypoint": [
                "/usr/bin/entry.sh"
            ],
            "OnBuild": [],
            "Labels": {
                "io.balena.architecture": "armv7hf",
                "io.balena.device-type": "raspberry-pi2",
                "io.balena.qemu.version": "4.0.0+balena-arm"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 233307973,
        "VirtualSize": 233307973,
        "GraphDriver": {
            "Data": null,
            "Name": "aufs"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a",
                "sha256:b758ee6513f47a9887793b61c79a16d01465a58b674a916bf072e570a67d632f",
                "sha256:e75b857a7e564a04647cf216e029c9d6575de498287f0f67ae19c76fe48592d1",
                "sha256:20e2fb98cd33a796078954843bbaf91e1839b37d3555d7d149b57de2d5504b97",
                "sha256:46415434afc471ef45dc42717b992b58132ffe470a104d5adfdf09aa4d9fc359",
                "sha256:4d93bf852a4d895ba6e5ac08447ff0e5b8525f1341512e239083a314862569bb",
                "sha256:1da735bbae3856a3fb675718650b1f35c598a7db5fb78e8eaf091c60f31e1bfe",
                "sha256:cd89d51bc32d6c869e1d7304bb41c8bb8ee5912604dfb8e907777e5ebb6199cb",
                "sha256:6e05cd18ed1c3297666ac314d36087cf254fed083d833be3358a6a239a356ef4",
                "sha256:4860f5d2c966ae3a077bbbb71400b29c62d4670e1ea6ae1ce0c31945fdcfb2db",
                "sha256:dc17678c41dfa92f8169c216369e1298307c5a64865570cf055679ad54f625f4",
                "sha256:a2d865aefe5fd8d95f262b32c5c277ccb319e8aae9b88713e07a7adedccea027",
                "sha256:962566b343d1e8e15dc105c8e9f3c6ed603b103ea7febac2b8144a6ced80e8f7",
                "sha256:efb85f08e708d79d721ac3fff6643b006014d556f2de5ed82708539707914d9e",
                "sha256:98fae2fcb97e53467a4d64aa7f0a2c38af1a10a3e097cbcc48130e1256c2f7f2",
                "sha256:2c54bae2ed2448413f7ee4f58bffcd87b8ba3989c5069087187545ea2b5021eb",
                "sha256:c6653d8d6f94ee255dc8fa293ebabbed56908e4e1360b93afcbc79dd662e5cb8"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]
```

Of particular interest here is the `"RootFS"` section, which shows all of the
layers that make up an image. Without going into detail (there are plenty of
easily Googleable pages describing this), each balena image is made up of a
series of layers, usually associated with a `COPY`, `ADD`, `RUN`, etc.
Dockerfile command at build time. Each layer makes up part of the images
filing system, and when a service container is created from an image, it uses
these layers 'merged' together for the underlying filing system.

We can look at these individual layers by making a note of each SHA256 hash ID
and then finding this hash in the `/var/lib/docker/image/aufs/layerdb/sha256`
directory (note that we are moving to `overlay2` for all devices eventually,
and that this guide will work simply by replacing `aufs` by `overlay2`). This
directory holds a set of directories, each named after each unique layer using
the SHA256 associated with it. Let's look at the layer DB directory:

```shell
root@dee2945:/var/lib/docker/image/aufs/layerdb/sha256# ls
084d479ff39eee821c584315063f121a5fed634d8eb3dcd8cf8dd9274cc3908a  8e76114ec559fc7b9c9316286c595cad947b65e9aa4f81b8a7f440488f586870
09f49c7cda3e1c586c48bc764a16488fadda03b47d0ba819c3c8fe8ba20d5d05  9084a902d87b7a77fe23cfa2add4a202df04fffb772019230c6f871acf54fb9f
0d6c25eb492dd1b4e9e3d08fdc210c19745d368f1f251551af28f05c66f231a1  a1435aeefe15f0ba6265627cff1a21cb0325e67081154616938f62bd9e912a7c
17e287edb8e0c8060cdc93a188b1ac569d88249600a343f9c9731302157763a7  a4c299ddf37369983d3c2fafc3dd39accf25f43ee8c9852f35aa063d109a650b
1fef6aa406c258be25ad0df317685d82ee0a12a305b87086615359ce77f1d990  a72fe7d28b90078fb3bd5d447499af81e2216054f5128c6a9aba63f7ab850d15
2d4c0dd8e82aff971df61910a43c6fb461293553dd3f4eec4994bd6a3b4d4e20  a92c7704692b81efa274dd47c24642bce835cddc6f35ab2453ad721a5e4b91a5
353b96c9b98cef535de48d165bf8fbd6e25e40550424e54f815a8288421923ec  b428c157d64f5aad73cd60f2879fd2187db1ee59a1874ad287b41f62f8cb8c82
3c83891236fee7910ad140c13d32a2bded8aace3064cd51cffb2f841cd8929c7  b5d596c1b258931b41ade8abf25286cc9ea93252ea77e59be2722f9cbfb3b633
3e0ab82b73296ad755d89d677c640e1086e1b84c1d5f50720f82b44cfa2d7262  cc320321b28ac119284ee593532956b5ea152b2fb45810494c679f11fb2e5fcd
53e4f1087efbb02257e54309ec533fbd4c96f29ac91a7573eed1125bc748b6cc  d89c5fa69091b4cb79db0f740f8a0a0fdbdfba83a7be6a0ba4a584f2a19003bc
5eea2038dc6b2ecf7b780f1d9e29eb8655f33096e7ae22a51129c66223183f2e  e26d2d994a93ecb18ed87b952c186df8eeb5a7d445bf0c9a7fa1f244f6d5e38a
5f3a49e21e4c8bb5fd7493ba8f75354b6f829da1ab94435fb761de9bbb25da0d  e7d96f171f2d54fc95e99d853dff1b20ed0cf81148a7b64639bca6d2712a9d6a
73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a  f0278d96034e3b35c6a1b97321781d9fa2a1ceaa83df8206af317dfdfc0f3618
```

Note that there are layers named here that are *not* named in the `"RootFS"`
object in the image description (although base image layers usually are). This
is because of the way balenaEngine describes layers and naming internally
(which we will not go into here). However, each layer is described by a
`cache-id` which is a randomly generated UUID. You can find the `cache-id`
for a layer by searching for it in the layer DB directory:

```shell
root@dee2945:/var/lib/docker/image/aufs/layerdb/sha256# grep -r 73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a *
09f49c7cda3e1c586c48bc764a16488fadda03b47d0ba819c3c8fe8ba20d5d05/parent:sha256:73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a
73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a/diff:sha256:73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a
```

In this case, we find two entries, but we're only interested in the directory
with the `diff` file result, as this describes the diff for the layer:

```shell
root@dee2945:/var/lib/docker/image/aufs/layerdb/sha256# cat 73ff1dead1b5d9c1aef91835470f8e9870c3e2dbec82e368f08ac87172fcfe1a/cache-id
1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587
```

We now have the corresponding `cache-id` for the layer's directory layout,
and we can now examine the file system for this layer (all the diffs are
store in the `/var/lib/docker/aufs/diff` directory):

```shell
root@dee2945:/var/lib/docker/image/aufs/layerdb/sha256# root@dee2945:/var/lib/docker/image/aufs/layerdb/sha256# du -hc /var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/srv
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/proc
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/dev
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/boot
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/root
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/media
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/terminfo
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/update-motd.d
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/default
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc5.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/security/limits.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/security/namespace.d
48K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/security
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/kernel/postinst.d
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/kernel
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt/auth.conf.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt/sources.list.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt/preferences.d
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt/apt.conf.d
64K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt/trusted.gpg.d
112K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/apt
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/alternatives
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/logrotate.d
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/selinux
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/dpkg/origins
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/dpkg/dpkg.cfg.d
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/dpkg
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/skel
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc4.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rcS.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc1.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc2.d
72K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/pam.d
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/init.d
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/ld.so.conf.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/profile.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/systemd/system/timers.target.wants
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/systemd/system
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/systemd
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc6.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc0.d
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/cron.daily
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/opt
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc/rc3.d
596K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/etc
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/run/lock
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/run
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/udev/rules.d
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/udev
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/m
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/w
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/d
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/x
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/h
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/l
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/c
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/r
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/v
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/p
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/s
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/E
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo/a
216K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/terminfo
508K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/arm-linux-gnueabihf/security
6.5M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/arm-linux-gnueabihf
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/init
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/systemd/system
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib/systemd
6.7M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/lib
2.5M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/sbin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/tmp
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/mnt
3.2M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/bin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/home
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/sys
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/misc
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/apt/mirrors/partial
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/apt/mirrors
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/apt/periodic
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/apt/lists
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/apt
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg/parts
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg/updates
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg/alternatives
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg/triggers
3.6M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg/info
3.9M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/dpkg
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/systemd/deb-systemd-helper-enabled/timers.target.wants
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/systemd/deb-systemd-helper-enabled
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/systemd
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib/pam
4.0M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/lib
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/tmp
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/spool
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/local
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/cache/apt
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/cache/ldconfig
1.5M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/cache/debconf
1.5M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/cache
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/backups
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/log/apt
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/log
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/mail
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var/opt
5.5M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/var
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/opt
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/src
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/games
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/apt/solvers
568K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/apt/methods
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/apt/planners
636K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/apt
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/locale/C.UTF-8/LC_MESSAGES
1.7M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/locale/C.UTF-8
1.7M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/locale
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl
6.2M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/gconv
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Hash
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/Hash/Util
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/Hash
72K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/POSIX
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/File/Glob
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/File
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/attributes
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/List/Util
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/List
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/Cwd
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/Socket
456K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/re
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/IO
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto/Fcntl
732K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/auto
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Scalar
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Text
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/File/Spec
108K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/File
156K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Gc
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Blk
144K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Perl
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/NFDQC
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Jt
244K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Scx
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Vo
52K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/GCB
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/UIdeo
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/GrBase
128K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Sc
200K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Nv
48K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Ccc
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWU
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/XIDC
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/NFKDQC
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CE
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Cased
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/PatSyn
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CI
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Nt
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Dia
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWKCF
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Upper
88K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/InSC
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Ideo
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/IDC
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Dep
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWCF
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/PCM
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CompEx
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Term
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Alpha
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/SD
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWT
76K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Age
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/BidiC
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/NFCQC
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/STerm
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/IDS
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Hst
96K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Lb
72K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/SB
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/BidiM
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/QMark
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Hyphen
52K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/InPC
72K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Jg
60K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Bc
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Ea
60K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Dt
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Bpt
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/NFKCQC
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWL
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Math
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/XIDS
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Ext
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Lower
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Hex
140K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/In
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/CWCM
60K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/WB
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/DI
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib/Dash
2.3M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/lib
1.1M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore/To
3.4M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/unicore
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Exporter
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/List
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/warnings
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/IPC
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Carp
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Tie
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/IO/Socket
88K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/IO
48K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base/Getopt
4.9M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/perl-base
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/coreutils
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf/audit
20M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/arm-linux-gnueabihf
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/dpkg/methods/apt
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/dpkg/methods
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/dpkg
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/mime/packages
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/mime
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/tmpfiles.d
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/gcc/arm-linux-gnueabihf/8
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/gcc/arm-linux-gnueabihf
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib/gcc
22M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/lib
1.4M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/sbin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/src
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/games
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/etc
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/lib
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/sbin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/bin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/include
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/share/man
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local/share
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/local
8.6M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/bin
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/include
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/terminfo
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/bug/apt
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/bug/init-system-helpers
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/bug
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/menu
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/misc
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/pam-configs
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/locale
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/base-files
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/libc-bin
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/dpkg
264K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/common-licenses
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libp11-kit0
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/fdisk
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/zlib1g
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libfdisk1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libdebconfclient0
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libseccomp2
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libffi6
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/diffutils
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libsemanage1
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libmount1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libext2fs2
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/sysvinit-utils
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libblkid1
68K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/gcc-8-base
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/gpgv
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/apt
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/hostname
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libcom-err2
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libss2
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libidn2-0
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/base-files
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libc-bin
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libzstd1
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/ncurses-bin
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/debian-archive-keyring
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/liblzma5
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/util-linux
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libaudit1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/mawk
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libpam-modules
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libpcre3
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/dpkg
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libgpg-error0
116K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/perl
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/grep
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libsmartcols1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libpam-runtime
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libgmp10
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libtasn1-6
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libuuid1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libbz2-1.0
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libsemanage-common
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libsystemd0
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/debianutils
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libdb5.3
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libtinfo6
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/findutils
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libpam0g
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/liblz4-1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libaudit-common
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/e2fsprogs
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/ncurses-base
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/tar
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libunistring2
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/dash
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/base-passwd
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/coreutils
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/sed
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/tzdata
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libattr1
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libc6
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libpam-modules-bin
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/gzip
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/passwd
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/bash
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libselinux1
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libudev1
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libnettle6
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libgcrypt20
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/debconf
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libcap-ng0
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/init-system-helpers
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/bsdutils
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libgnutls30
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libsepol1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libapt-pkg5.0
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/mount
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/adduser
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/login
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc/libacl1
1.2M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc
104K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gcc-8/python/libstdcxx/v6
112K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gcc-8/python/libstdcxx
116K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gcc-8/python
120K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gcc-8
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Template
60K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/DbDriver
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Teletype
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Web
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Dialog
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Gnome
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Noninteractive
40K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element/Editor
260K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Element
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Format
60K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/FrontEnd
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf/Client
508K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debconf
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debian/DebConf/Client
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debian/DebConf
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5/Debian
536K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/perl5
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/tabset
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/debianutils
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/man
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Australia
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Europe
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Arctic
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Africa
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Canada
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/US
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Brazil
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Antarctica
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Atlantic
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Indian
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Pacific
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Etc
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Asia
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/America/Kentucky
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/America/Indiana
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/America/Argentina
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/America/North_Dakota
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/America
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/SystemV
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Chile
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix/Mexico
88K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/posix
52K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Australia
160K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Europe
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Arctic
52K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Australia
160K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Europe
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Arctic
76K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Africa
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Canada
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/US
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Brazil
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Antarctica
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Atlantic
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Indian
132K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Pacific
108K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Etc
280K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Asia
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/America/Kentucky
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/America/Indiana
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/America/Argentina
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/America/North_Dakota
536K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/America
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/SystemV
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Chile
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right/Mexico
1.7M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/right
76K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Africa
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Canada
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/US
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Brazil
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Antarctica
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Atlantic
36K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Indian
132K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Pacific
108K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Etc
280K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Asia
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/America/Kentucky
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/America/Indiana
32K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/America/Argentina
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/America/North_Dakota
524K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/America
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/SystemV
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Chile
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo/Mexico
3.4M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/zoneinfo
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gdb/auto-load/usr/lib/arm-linux-gnueabihf
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gdb/auto-load/usr/lib
16K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gdb/auto-load/usr
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gdb/auto-load
24K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/gdb
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/base-passwd
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/pixmaps
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/lintian/overrides
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/lintian/profiles/dpkg
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/lintian/profiles
20K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/lintian
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/info
44K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/pam
136K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/keyrings
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/doc-base
348K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/bash-completion/completions
352K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/bash-completion
28K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/debconf
4.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/dict
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/polkit-1/actions
12K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/polkit-1
8.0K	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share/adduser
6.3M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr/share
38M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587/usr
57M	/var/lib/docker/aufs/diff/1c02591c74b65735bde1fbd18acaf896910756a265672526caba3bb257c18587
57M	total
```

And there's all of the directories in the base image for the image! You can
find the diffs for subsequent layers in the same way.

However, whilst this allows you to examine all the layers for an image, the
situation changes slightly when an image is used to create a container. At this
point, a container can also bind to volumes (persistent data directories across
container restarts) and writeable layers that are used only for that container
(which are *not* persistent across container restarts). Volumes are described in
a later section dealing with media storage. However, we will show an example
here of creating a writeable layer in a container and finding it in the
appropriate `/var/lib/docker` directory.

Assuming you're running the application that goes along with this masterclass,
SSH into your device:

```shell
root@dee2945:~# balena ps
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS                 PORTS               NAMES
3ce646179335        8353bf5a40d9                        "/usr/bin/entry.sh n…"   4 minutes ago       Up 3 minutes                               frontend_1862610_1219773
5c36f880c4b3        95fb9c5f84d2                        "/usr/bin/entry.sh n…"   4 minutes ago       Up 3 minutes                               backend_1862611_1219773
515ad785c072        balena/armv7hf-supervisor:v9.15.7   "./entry.sh"             2 days ago          Up 2 hours (healthy)                       balena_supervisor
```

You should see something similar. Let's pick the `backend` service, which in
this instance is container `5c36f880c4b3`. We'll `exec` into it via a `bash`
shell, and create a new file. This will create a new writeable layer for the
container:

```shell
root@dee2945:~# balena exec -ti 5c36f880c4b3 /bin/bash
root@5c36f880c4b3:/usr/src/app# echo 'This is a new, container-only writeable file!' > /mynewfile.txt
root@5c36f880c4b3:/usr/src/app# cat /mynewfile.txt
This is a new, container-only writeable file!
root@5c36f880c4b3:/usr/src/app# exit
```

Now we'll determine where this new file has been stored by balenaEngine.
Similarly to the images, any writeable layer ends up in the
`/var/lib/docker/aufs/diff` directory, but to determine the correct layer ID
we need to examine the layer DB for it. We do this by looking in the
`/var/lib/docker/image/aufs/layerdb/mounts` directory, which lists all the
currently created containers:

```shell
root@dee2945:~# cd /var/lib/docker/image/aufs/layerdb/mounts
root@dee2945:/var/lib/docker/image/aufs/layerdb/mounts# ls
3ce646179335cedd38c8bd74bb434e5ce583ce07d4ddc29f17f16ea47e0ed428  5c36f880c4b3d6f8a73034fdce0efc44c2021b2b8575e11b215db7659a2282ba
515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981
```

As you can see, there's a list of all the container IDs of those container
that have been created. If we look for the `mount-id` file in the directory
for the `backend` container, that will include the layer ID of the layer that
has been created. From there, we simply look in the appropriate diff layer
directory to find our newly created file (the `awk` command below is to add
a newline to the end of the discovered value for clarity reasons):

```shell
root@dee2945:/var/lib/docker/image/aufs/layerdb/mounts# cat 5c36f880c4b3d6f8a73034fdce0efc44c2021b2b8575e11b215db7659a2282ba/mount-id | awk '{ print $1 }'
root@dee2945:/var/lib/docker/image/aufs/layerdb/mounts# ls /var/lib/docker/aufs/diff/7a1b70a76338b34aefc37763fdeb29ea876cb6d79ff8204ae9b74b8b90ee1fcb
mynewfile.txt  root  run  tmp
root@dee2945:/var/lib/docker/image/aufs/layerdb/mounts# cat /var/lib/docker/aufs/diff/7a1b70a76338b34aefc37763fdeb29ea876cb6d79ff8204ae9b74b8b90ee1fcb/mynewfile.txt
This is a new, container-only writeable file!
```

#### 9.2 Restarting balenaEngine

As with the Supervisor, it's very rare to actually need to carry this out.
However, for completeness, should you need to, this again is as simple as
carrying out a `systemd` restart with `systemctl restart balena.service`:

```shell
Jan 17 09:58:51 dee2945 systemd[1]: Stopping Balena Application Container Engine...
Jan 17 09:58:53 dee2945 balenad[772]: time="2020-01-17T09:58:53.817987274Z" level=info msg="Container failed to stop after sending signal 15 to the process, force killing"
Jan 17 09:58:53 dee2945 balenad[772]: time="2020-01-17T09:58:53.818949240Z" level=info msg="Container failed to stop after sending signal 15 to the process, force killing"
Jan 17 09:58:53 dee2945 balenad[772]: time="2020-01-17T09:58:53.818953615Z" level=info msg="Container failed to stop after sending signal 15 to the process, force killing"
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.452812004Z" level=info msg="libcontainerd: started new balena-engine-containerd process" pid=19414
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.597877145Z" level=info msg="starting containerd" revision= version=1.2.2+unknown
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.600199250Z" level=info msg="loading plugin \"io.containerd.content.v1.content\"..." type=io.containerd.content.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.600518725Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.aufs\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.606675624Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.native\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.606883798Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.overlayfs\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.607302230Z" level=info msg="loading plugin \"io.containerd.metadata.v1.bolt\"..." type=io.containerd.metadata.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.607420666Z" level=info msg="metadata content store policy set" policy=shared
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.607835400Z" level=info msg="loading plugin \"io.containerd.differ.v1.walking\"..." type=io.containerd.differ.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.607960138Z" level=info msg="loading plugin \"io.containerd.gc.v1.scheduler\"..." type=io.containerd.gc.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608133834Z" level=info msg="loading plugin \"io.containerd.service.v1.containers-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608231697Z" level=info msg="loading plugin \"io.containerd.service.v1.content-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608325654Z" level=info msg="loading plugin \"io.containerd.service.v1.diff-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608421434Z" level=info msg="loading plugin \"io.containerd.service.v1.images-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608515496Z" level=info msg="loading plugin \"io.containerd.service.v1.leases-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608607213Z" level=info msg="loading plugin \"io.containerd.service.v1.namespaces-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.608695910Z" level=info msg="loading plugin \"io.containerd.service.v1.snapshots-service\"..." type=io.containerd.service.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.609478921Z" level=info msg="loading plugin \"io.containerd.runtime.v1.linux\"..." type=io.containerd.runtime.v1
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.610460054Z" level=error msg="connecting to shim" error="dial unix \x00/containerd-shim/moby/1eb9fc69bb220e0442fbd6dda1c554f6868b8a6db0d6f5c02cabd2588bbcad34/shim.sock: connect: connection refused" id=1eb9fc69bb220e0442fbd6dda1c554f6868b8a6db0d6f5c02cabd2588bbcad34 namespace=moby
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.769884382Z" level=error msg="connecting to shim" error="dial unix \x00/containerd-shim/moby/2da77adc4b3d44688b743b42942fabdf8084c88cc6580964b496899f94cea6f7/shim.sock: connect: connection refused" id=2da77adc4b3d44688b743b42942fabdf8084c88cc6580964b496899f94cea6f7 namespace=moby
Jan 17 09:59:01 dee2945 balenad[772]: time="2020-01-17T09:59:01.946398384Z" level=error msg="connecting to shim" error="dial unix \x00/containerd-shim/moby/515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981/shim.sock: connect: connection refused" id=515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981 namespace=moby
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.239728833Z" level=info msg="loading plugin \"io.containerd.runtime.v2.task\"..." type=io.containerd.runtime.v2
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.240514864Z" level=info msg="loading plugin \"io.containerd.monitor.v1.cgroups\"..." type=io.containerd.monitor.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.248040443Z" level=info msg="loading plugin \"io.containerd.service.v1.tasks-service\"..." type=io.containerd.service.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.248365595Z" level=info msg="loading plugin \"io.containerd.internal.v1.restart\"..." type=io.containerd.internal.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.248797256Z" level=info msg="loading plugin \"io.containerd.grpc.v1.containers\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249001629Z" level=info msg="loading plugin \"io.containerd.grpc.v1.content\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249180585Z" level=info msg="loading plugin \"io.containerd.grpc.v1.diff\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249353395Z" level=info msg="loading plugin \"io.containerd.grpc.v1.events\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249519955Z" level=info msg="loading plugin \"io.containerd.grpc.v1.healthcheck\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249695891Z" level=info msg="loading plugin \"io.containerd.grpc.v1.images\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.249867659Z" level=info msg="loading plugin \"io.containerd.grpc.v1.leases\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.250040417Z" level=info msg="loading plugin \"io.containerd.grpc.v1.namespaces\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.250210884Z" level=info msg="loading plugin \"io.containerd.internal.v1.opt\"..." type=io.containerd.internal.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.250522234Z" level=warning msg="failed to load plugin io.containerd.internal.v1.opt" error="mkdir /opt: read-only file system"
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.250679576Z" level=info msg="loading plugin \"io.containerd.grpc.v1.snapshots\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.250868844Z" level=info msg="loading plugin \"io.containerd.grpc.v1.tasks\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.251043998Z" level=info msg="loading plugin \"io.containerd.grpc.v1.version\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.251210871Z" level=info msg="loading plugin \"io.containerd.grpc.v1.introspection\"..." type=io.containerd.grpc.v1
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.252537364Z" level=info msg=serving... address=/var/run/balena-engine/containerd/balena-engine-containerd-debug.sock
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.253431206Z" level=info msg=serving... address=/var/run/balena-engine/containerd/balena-engine-containerd.sock
Jan 17 09:59:02 dee2945 balenad[772]: time="2020-01-17T09:59:02.257138085Z" level=info msg="containerd successfully booted in 0.658867s"
Jan 17 09:59:06 dee2945 balenad[772]: time="2020-01-17T09:59:06.816100032Z" level=error msg="Force shutdown daemon"
Jan 17 09:59:06 dee2945 balenad[772]: time="2020-01-17T09:59:06.816369820Z" level=info msg="stopping healthcheck following graceful shutdown" module=libcontainerd
Jan 17 09:59:06 dee2945 balenad[772]: time="2020-01-17T09:59:06.816548203Z" level=info msg="stopping event stream following graceful shutdown" error="context canceled" module=libcontainerd namespace=moby
Jan 17 09:59:06 dee2945 balenad[772]: time="2020-01-17T09:59:06.816814189Z" level=info msg="stopping event stream following graceful shutdown" error="context canceled" module=libcontainerd namespace=plugins.moby
Jan 17 09:59:08 dee2945 systemd[1]: Stopped Balena Application Container Engine.
Jan 17 09:59:08 dee2945 systemd[1]: Starting Balena Application Container Engine...
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.028691773Z" level=warning msg="Running experimental build"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.031776524Z" level=warning msg="[!] DON'T BIND ON ANY IP ADDRESS WITHOUT setting --tlsverify IF YOU DON'T KNOW WHAT YOU'RE DOING [!]"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.040633076Z" level=info msg="libcontainerd: started new balena-engine-containerd process" pid=19476
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.177392023Z" level=info msg="starting containerd" revision= version=1.2.2+unknown
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.179182051Z" level=info msg="loading plugin \"io.containerd.content.v1.content\"..." type=io.containerd.content.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.179392622Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.aufs\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.185649728Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.native\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.185875766Z" level=info msg="loading plugin \"io.containerd.snapshotter.v1.overlayfs\"..." type=io.containerd.snapshotter.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.186246647Z" level=info msg="loading plugin \"io.containerd.metadata.v1.bolt\"..." type=io.containerd.metadata.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.186366854Z" level=info msg="metadata content store policy set" policy=shared
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.186792994Z" level=info msg="loading plugin \"io.containerd.differ.v1.walking\"..." type=io.containerd.differ.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.186922367Z" level=info msg="loading plugin \"io.containerd.gc.v1.scheduler\"..." type=io.containerd.gc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187099969Z" level=info msg="loading plugin \"io.containerd.service.v1.containers-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187200228Z" level=info msg="loading plugin \"io.containerd.service.v1.content-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187303821Z" level=info msg="loading plugin \"io.containerd.service.v1.diff-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187401371Z" level=info msg="loading plugin \"io.containerd.service.v1.images-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187503714Z" level=info msg="loading plugin \"io.containerd.service.v1.leases-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187596733Z" level=info msg="loading plugin \"io.containerd.service.v1.namespaces-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187686211Z" level=info msg="loading plugin \"io.containerd.service.v1.snapshots-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.187783241Z" level=info msg="loading plugin \"io.containerd.runtime.v1.linux\"..." type=io.containerd.runtime.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.188296828Z" level=info msg="loading plugin \"io.containerd.runtime.v2.task\"..." type=io.containerd.runtime.v2
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.188845884Z" level=info msg="loading plugin \"io.containerd.monitor.v1.cgroups\"..." type=io.containerd.monitor.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.192477139Z" level=info msg="loading plugin \"io.containerd.service.v1.tasks-service\"..." type=io.containerd.service.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.192660053Z" level=info msg="loading plugin \"io.containerd.internal.v1.restart\"..." type=io.containerd.internal.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.192863384Z" level=info msg="loading plugin \"io.containerd.grpc.v1.containers\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.192958174Z" level=info msg="loading plugin \"io.containerd.grpc.v1.content\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193046454Z" level=info msg="loading plugin \"io.containerd.grpc.v1.diff\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193149578Z" level=info msg="loading plugin \"io.containerd.grpc.v1.events\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193233327Z" level=info msg="loading plugin \"io.containerd.grpc.v1.healthcheck\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193344731Z" level=info msg="loading plugin \"io.containerd.grpc.v1.images\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193433168Z" level=info msg="loading plugin \"io.containerd.grpc.v1.leases\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193520302Z" level=info msg="loading plugin \"io.containerd.grpc.v1.namespaces\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193605822Z" level=info msg="loading plugin \"io.containerd.internal.v1.opt\"..." type=io.containerd.internal.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193735768Z" level=warning msg="failed to load plugin io.containerd.internal.v1.opt" error="mkdir /opt: read-only file system"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193810611Z" level=info msg="loading plugin \"io.containerd.grpc.v1.snapshots\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.193906235Z" level=info msg="loading plugin \"io.containerd.grpc.v1.tasks\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.194001025Z" level=info msg="loading plugin \"io.containerd.grpc.v1.version\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.194085711Z" level=info msg="loading plugin \"io.containerd.grpc.v1.introspection\"..." type=io.containerd.grpc.v1
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.194702526Z" level=info msg=serving... address=/var/run/balena-engine/containerd/balena-engine-containerd-debug.sock
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.194975752Z" level=info msg=serving... address=/var/run/balena-engine/containerd/balena-engine-containerd.sock
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.195078407Z" level=info msg="containerd successfully booted in 0.020871s"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.281511968Z" level=info msg="Graph migration to content-addressability took 0.00 seconds"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.282850128Z" level=warning msg="Your kernel does not support cgroup rt period"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.282952418Z" level=warning msg="Your kernel does not support cgroup rt runtime"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.283454651Z" level=warning msg="mountpoint for pids not found"
Jan 17 09:59:09 dee2945 balenad[19453]: time="2020-01-17T09:59:09.284340212Z" level=info msg="Loading containers: start."
Jan 17 09:59:11 dee2945 balenad[19453]: time="2020-01-17T09:59:11.848735650Z" level=info msg="Removing stale sandbox 300d5a91417cee5a4d2648204bd49326074ea21df1ab29b24349bb4756d4d21d (515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981)"
Jan 17 09:59:11 dee2945 balenad[19453]: time="2020-01-17T09:59:11.871655820Z" level=warning msg="Error (Unable to complete atomic operation, key modified) deleting object [endpoint 114484af9c2b13004e64ccf6fc84d1ea6447ffe930d3cfdbcc65124fc4648330 fd993d4b601306980de6b7fde37945157639181bfbb376b10859f15ecd5fb481], retrying...."
Jan 17 09:59:12 dee2945 balenad[19453]: time="2020-01-17T09:59:12.481754693Z" level=info msg="Removing stale sandbox c0cf014f8eb743f89538c8cc2edff3d76f16485a9180535bd0e22bff3c1b237a (1eb9fc69bb220e0442fbd6dda1c554f6868b8a6db0d6f5c02cabd2588bbcad34)"
Jan 17 09:59:12 dee2945 balenad[19453]: time="2020-01-17T09:59:12.496422471Z" level=warning msg="Error (Unable to complete atomic operation, key modified) deleting object [endpoint 114484af9c2b13004e64ccf6fc84d1ea6447ffe930d3cfdbcc65124fc4648330 493a4db20ffe61333920207747151e4fdaf92bc418d67e2cf90d5eafad383527], retrying...."
Jan 17 09:59:13 dee2945 balenad[19453]: time="2020-01-17T09:59:13.178202649Z" level=info msg="Removing stale sandbox dc992cf6b4a4bd22280f719a28938193f6a5e229186d0d2097244ca954e61c32 (2da77adc4b3d44688b743b42942fabdf8084c88cc6580964b496899f94cea6f7)"
Jan 17 09:59:13 dee2945 balenad[19453]: time="2020-01-17T09:59:13.218499832Z" level=warning msg="Error (Unable to complete atomic operation, key modified) deleting object [endpoint 5ca4eb69a9792c4089a90eb9d2c809fd9323ce9b20e7d063f3b0ca1dcca42304 d0a1ffa96b6b1b20c53442d40ab3983fdc825705d75864e9d63c20ea0e97eff5], retrying...."
Jan 17 09:59:13 dee2945 balenad[19453]: time="2020-01-17T09:59:13.278917170Z" level=warning msg="Error (Unable to complete atomic operation, key modified) deleting object [endpoint 6c245966c6cb4a2d2cb5f62055c76c1c4ae93f9fe44429863f05e26b29f7c3dd a1f27c82c6f0b9e034bfb29b5771d10b6cb27ee447f022ceff0e9a1af2d3ef97], retrying...."
Jan 17 09:59:14 dee2945 balenad[19453]: time="2020-01-17T09:59:14.314057900Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/1eb9fc69bb220e0442fbd6dda1c554f6868b8a6db0d6f5c02cabd2588bbcad34/shim.sock debug=false pid=19718
Jan 17 09:59:14 dee2945 balenad[19453]: time="2020-01-17T09:59:14.324304797Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/2da77adc4b3d44688b743b42942fabdf8084c88cc6580964b496899f94cea6f7/shim.sock debug=false pid=19723
Jan 17 09:59:17 dee2945 1eb9fc69bb22[19453]:
Jan 17 09:59:17 dee2945 1eb9fc69bb22[19453]: > frontend@1.0.0 start /usr/src/app
Jan 17 09:59:17 dee2945 1eb9fc69bb22[19453]: > node index.js
Jan 17 09:59:17 dee2945 1eb9fc69bb22[19453]:
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.671769979Z" level=info msg="Loading containers: done."
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.891942423Z" level=info msg="Docker daemon" commit=95c7371304f9cef494efe93f0a8ffd53a75eac21 graphdriver(s)=aufs version=18.09.6-dev
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.892111483Z" level=info msg="Daemon has completed initialization"
Jan 17 09:59:17 dee2945 systemd[1]: Started Balena Application Container Engine.
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.930547388Z" level=info msg="API listen on /var/run/balena.sock"
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.931250139Z" level=info msg="API listen on [::]:2375"
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.931670238Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 17 09:59:17 dee2945 balenad[19453]: time="2020-01-17T09:59:17.931087850Z" level=info msg="API listen on /var/run/balena-engine.sock"
Jan 17 09:59:19 dee2945 1eb9fc69bb22[19453]: Started frontend
Jan 17 09:59:19 dee2945 2da77adc4b3d[19453]:
Jan 17 09:59:19 dee2945 2da77adc4b3d[19453]: > backend@1.0.0 start /usr/src/app
Jan 17 09:59:19 dee2945 2da77adc4b3d[19453]: > node index.js
Jan 17 09:59:19 dee2945 2da77adc4b3d[19453]:
Jan 17 09:59:20 dee2945 2da77adc4b3d[19453]: Started backend
Jan 17 09:59:20 dee2945 balenad[19453]: time="2020-01-17T09:59:20.471432091Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/moby/515ad785c0727bf127195e44c632bc16db6e1290323321e340220aae7692f981/shim.sock debug=false pid=20031
Jan 17 09:59:21 dee2945 515ad785c072[19453]: Starting system message bus: dbus.
Jan 17 09:59:21 dee2945 515ad785c072[19453]:  * Starting Avahi mDNS/DNS-SD Daemon: avahi-daemon
Jan 17 09:59:21 dee2945 515ad785c072[19453]:    ...done.
Jan 17 09:59:26 dee2945 515ad785c072[19453]: (node:1) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Starting event tracker
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Starting up api binder
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Starting logging infrastructure
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Event: Supervisor start {}
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Performing database cleanup for container log timestamps
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Connectivity check enabled: true
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Starting periodic check for IP addresses
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Reporting initial state, supervisor version and API info
Jan 17 09:59:26 dee2945 515ad785c072[19453]: VPN status path exists.
Jan 17 09:59:26 dee2945 515ad785c072[19453]: Waiting for connectivity...
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Skipping preloading
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Starting API server
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Applying target state
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Ensuring device is provisioned
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Starting current state report
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Starting target state poll
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Supervisor API listening on allowed interfaces only
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Finished applying target state
Jan 17 09:59:27 dee2945 515ad785c072[19453]: Apply success!
Jan 17 09:59:28 dee2945 515ad785c072[19453]: Applying target state
Jan 17 09:59:28 dee2945 515ad785c072[19453]: Finished applying target state
Jan 17 09:59:28 dee2945 515ad785c072[19453]: Apply success!
Jan 17 09:59:36 dee2945 515ad785c072[19453]: Internet Connectivity: OK

```

However, doing so has also had another side-effect. Because the Supervisor is
itself comprised of a container, restarting balenaEngine has *also* stopped
and restarted the Supervisor. This is another good reason why balenaEngine
should only be stopped/restarted if absolutely necessary.

So, when is absolutely necessary? There are some issues which occasionally
occur that might require this. Some examples might include:

* Corruption in the `/var/lib/docker` directory, usually related to
* Memory exhaustion and investigation
* Container start/stop conflicts

Many examples of these are documented in the support knowledge base, so we will
not delve into them here.

### 10. Using the Kernel Logs

There are occasionally instances where a problem arises which is not immediately
obvious. In these cases, you might see services fail 'randomly', perhaps
attached devices don't behave as they should, or maybe spurious reboots occur.

If an issue isn't apparent fairly soon after looking at a device, the
examination of the kernel logs can be a useful check to see if anything is
causing an issue.

To examine the kernel log on-device, simply run `dmesg` from the host OS:

```shell
root@dee2945:/# dmesg
[    0.000000] Booting Linux on physical CPU 0x0
[    0.000000] Linux version 4.14.98 (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP Mon Jun 17 12:12:45 UTC 2019
[    0.000000] CPU: ARMv7 Processor [410fd034] revision 4 (ARMv7), cr=10c5383d
[    0.000000] CPU: div instructions available: patching division code
[    0.000000] CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
[    0.000000] OF: fdt: Machine model: Raspberry Pi Compute Module 3 Plus Rev 1.0
[    0.000000] Memory policy: Data cache writealloc
[    0.000000] cma: Reserved 8 MiB at 0x3dc00000
[    0.000000] On node 0 totalpages: 255488
[    0.000000] free_area_init_node: node 0, pgdat 8138ae00, node_mem_map bd336000
[    0.000000]   Normal zone: 2246 pages used for memmap
[    0.000000]   Normal zone: 0 pages reserved
[    0.000000]   Normal zone: 255488 pages, LIFO batch:31
[    0.000000] random: get_random_bytes called from start_kernel+0xac/0x448 with crng_init=0
[    0.000000] percpu: Embedded 17 pages/cpu @be59c000 s38796 r8192 d22644 u69632
[    0.000000] pcpu-alloc: s38796 r8192 d22644 u69632 alloc=17*4096
[    0.000000] pcpu-alloc: [0] 0 [0] 1 [0] 2 [0] 3
[    0.000000] Built 1 zonelists, mobility grouping on.  Total pages: 253242
[    0.000000] Kernel command line: bcm2708_fb.fbwidth=656 bcm2708_fb.fbheight=416 bcm2708_fb.fbdepth=16 bcm2708_fb.fbswap=1 smsc95xx.macaddr=B8:27:EB:A1:10:56 vc_mem.mem_base=0x3f000000 vc_mem.mem_size=0x3f600000  dwc_otg.lpm_enable=0 console=tty1 console=ttyAMA0,115200 rootfstype=ext4 rootwait root=PARTUUID=4194026e-02 rootwait
[    0.000000] PID hash table entries: 4096 (order: 2, 16384 bytes)
[    0.000000] Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)
[    0.000000] Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)
[    0.000000] Memory: 983756K/1021952K available (8192K kernel code, 600K rwdata, 2284K rodata, 7168K init, 704K bss, 30004K reserved, 8192K cma-reserved)
[    0.000000] Virtual kernel memory layout:
                   vector  : 0xffff0000 - 0xffff1000   (   4 kB)
                   fixmap  : 0xffc00000 - 0xfff00000   (3072 kB)
                   vmalloc : 0xbe800000 - 0xff800000   (1040 MB)
                   lowmem  : 0x80000000 - 0xbe600000   ( 998 MB)
                   modules : 0x7f000000 - 0x80000000   (  16 MB)
                     .text : 0x80008000 - 0x80900000   (9184 kB)
                     .init : 0x80c00000 - 0x81300000   (7168 kB)
                     .data : 0x81300000 - 0x8139622c   ( 601 kB)
                      .bss : 0x8139e624 - 0x8144e7b0   ( 705 kB)
[    0.000000] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1
[    0.000000] ftrace: allocating 27474 entries in 81 pages
[    0.000000] Hierarchical RCU implementation.
[    0.000000] NR_IRQS: 16, nr_irqs: 16, preallocated irqs: 16
[    0.000000] arch_timer: cp15 timer(s) running at 19.20MHz (phys).
[    0.000000] clocksource: arch_sys_counter: mask: 0xffffffffffffff max_cycles: 0x46d987e47, max_idle_ns: 440795202767 ns
[    0.000007] sched_clock: 56 bits at 19MHz, resolution 52ns, wraps every 4398046511078ns
[    0.000022] Switching to timer-based delay loop, resolution 52ns
[    0.000266] Console: color dummy device 80x30
[    0.000841] console [tty1] enabled
[    0.000879] Calibrating delay loop (skipped), value calculated using timer frequency.. 38.40 BogoMIPS (lpj=192000)
[    0.000920] pid_max: default: 32768 minimum: 301
[    0.001247] Mount-cache hash table entries: 2048 (order: 1, 8192 bytes)
[    0.001281] Mountpoint-cache hash table entries: 2048 (order: 1, 8192 bytes)
...
```

The rest of the output is truncated here. Note that the time output is in
seconds. If you want to display a human readable time, use the `-T` switch.
This will, however, strip the nanosecond accuracy and revert to chronological
order with a minimum granularity of a second.

Note that the 'Device Diagnostics' tab from the 'Diagnostics' section of a
device also runs `dmesg -T` and will display these in the output window.
However, due to the sheer amount of information presented here, it's sometimes
easier to run it on-device.

Some common issues to watch for include:

* Under-voltage warnings, signifying that a device is not receiving what it
    requires from the power supply to operate correctly (these warnings
    are only present on the Raspberry Pi series).
* Block device warnings, which could signify issues with the media that balenaOS
    is running from (for example, SD card corruption).
* Device detection problems, where devices that are expected to show in the
    device node list are either incorrectly detected or misdetected.

### 11. Media Issues

Sometimes issues occur with the media being used (the medium that balenaOS
and all other data is stored on, for example an SD card or eMMC drive).

This can include multiple issues, but the most common are that of exhaustion
of free space on a device, or that of SD card corruption.

#### 11.1 Out of Space Issues

A media partition that is full can cause issues such as the following:

* Failure to download application updates, or failure to start new/updated
    services after a download has occurred
* Failure for an application to store data into defined volumes
* Failure of services to start up (mostly those that need to store data that
    isn't in `tmpfs`)

Determining how much space is left on the media for a device can be achieved by
logging into the host OS and running:

```shell
root@dee2945:/# df -h
Filesystem                         Size  Used Avail Use% Mounted on
devtmpfs                           481M     0  481M   0% /dev
/dev/disk/by-partuuid/4194026e-02  300M  205M   75M  74% /mnt/sysroot/active
/dev/disk/by-label/resin-state      19M  3.3M   14M  20% /mnt/state
none                               300M  205M   75M  74% /
tmpfs                              488M  168K  488M   1% /dev/shm
tmpfs                              488M  828K  488M   1% /run
tmpfs                              488M     0  488M   0% /sys/fs/cgroup
/dev/mmcblk0p1                      40M  8.3M   32M  21% /mnt/boot
tmpfs                              488M     0  488M   0% /tmp
tmpfs                              488M   20K  488M   1% /var/volatile
overlay                            488M   20K  488M   1% /srv
overlay                            488M   20K  488M   1% /var/spool
overlay                            488M   20K  488M   1% /var/cache
overlay                            488M   20K  488M   1% /var/lib
/dev/mmcblk0p6                      57G  342M   54G   1% /mnt/data
```

The `-h` switch makes the figures returned 'human readable'. Without this switch
the returned figures will be in block sizes (usually 1k or 512byte blocks).

The two main mounts where full space problems commonly occur are `/mnt/data` and
`/mnt/state`. The former is the data partition where all application images, containers
and volumes are stored. The latter is the state partition, where overlays for the
root FS (such as user defined network configuraions) and the permanent logs
are stored.

There are a few ways to try and relieve out of space issues on a media drive.

##### 11.1.1 Image and Container Pruning

One fairly easy cleanup routine to perform is that of pruning the Docker tree
so that any unused images, containers, networks and volumes are removed. It
should be noted that in the day-to-day operation of the Supervisor, it attempts
to ensure that anything that is no longer used on the device *is* removed when
not required. However, there are issues that sometimes occur that can cause this
behavior to not work correctly. In these cases, a prune should help clean
anything that should not be present:

```shell
root@dee2945:/# balena system prune -a -f --volumes
Deleted Containers:
81473114c1ed742595d1f04aee193e1071a29dadfce619b1d72253c5f7a98388

Deleted Images:
untagged: balenalib/raspberrypi3-node:latest
untagged: balenalib/raspberrypi3-node@sha256:159a190198db61d4d6ed5ab10e5b0f643f51564b0ed97a688e615a33331722b3
deleted: sha256:5040ee970506c5446c3147b7a30d7f6a89e32b8170bafa258a790ad12400b160
deleted: sha256:3db1a2a86bb6a2fe5261856cf2f287b6f0aca107e884190a179cece8a8177ec5
deleted: sha256:ea46a56e67595cafbd7632b362b1b21b5c167d3188564987735a4f29ddee969d

Total reclaimed space: 98.85MB
```

Note that in the above, *all* unused images, containers, networks and volumes
will be removed. To just remove dangling images, you can use
`balena system prune -a`.

##### 11.1.2 Customer Data

Occasionally, customer volumes can also fill up the data partition. This
obviously causes more issues, because usually this is data that cannot just
be deleted. In these cases, it's imperative that the customer is informed that
they've filled the data partition and that appropriate pruning is required.
Filling disk space does not tend to stop access to devices, so in these cases
customers should be asked to enter the relevant services and manually prune
data.

Before discussion on persistent data, it's worth noting that occasionally
customer applications store data to the service container instead of a
persistent data volume. Sometimes, this data is intended as temporary, so doing
so is not an issue (although if they are doing so and expecting it to stay
permanent, this will not occur as service container rebuilds will remove the
layers where new data is stored). However there are cases where even this
temporary data can be so large that it fills the storage media. In these cases,
the Supervisor can be stopped, and then the service container affected, allowing
that container to be removed so the Supervisor can rebuild from the service
image. This will remove the layers filling the space. Care should be taken
and customers informed first, in case this data is required. They should also
be informed of persistent data and how to use it.

Because persistent data is stored as volumes, it's also possible to prune data
for a service from within the host OS. For example, should a service be filling
a volume so quickly as to prevent sensible data removal, an option is to stop
that service and then manually remove data from the service's volume.

Data volumes are always located in the `/var/lib/docker/volumes` directory. Care
needs to be taken to ensure the right volumes are examine/pruned of data, as
not all volumes pertain directly to customer data.

In single service applications, the relevant data volume is suffixed with the
`_resin-data` string. For example:

```shell
root@dee2945:/# ls -l /var/lib/docker/volumes/
total 28
drwxr-xr-x 3 root root  4096 Jan 14 11:10 1544229_resin-data
-rw------- 1 root root 32768 Jan 14 11:11 metadata.db
```

This tallies with the single service currently running, which can be inspected
to determine the relevant volume:

```shell
root@dee2945:/# balena ps
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS                  PORTS               NAMES
f596a2ac8d19        b1b05d58f2a7                        "/usr/bin/entry.sh n…"   18 seconds ago      Up 14 seconds                               main_1849012_1215051
62e5d3984a53        balena/armv7hf-supervisor:v9.15.7   "./entry.sh"             4 days ago          Up 24 hours (healthy)                       balena_supervisor
root@dee2945:/# balena inspect main_1849012_1215051 | grep /var/lib/docker/volumes
                "Source": "/var/lib/docker/volumes/1544229_resin-data/_data",
```

As you can see, all data that can be saved by a service into `/data` corresponds
to the `/var/lib/docker/volumes/1544229_resin-data/_data` on the host.
As `/var/lib/docker` is mapped to the host OS's data partition, this data gets
saved onto that partition. The bound volume uses the directory transparently,
so any data saved there by the service is immediately available on the host
OS.

In multicontainer applications, the suffix always corresponds with the name
of the bound volume. For example, let's look at the docker-compose manifest
for the `multicontainer-app` application used in this debugging masterclass:

```yaml
version: '2.1'
volumes:
  backend-data: {}
services:
  frontend:
    build: ./frontend
    network_mode: host
  backend:
    build: ./backend
    labels:
      io.balena.features.supervisor-api: '1'
      io.balena.features.balena-api: '1'
    privileged: true
    volumes:
      - 'backend-data:/mydata'
```

As you can see, a `backend-data` volume is defined, and then used by the
`backend` service. Assuming your device is still running the multicontainer
application for this masterclass, SSH into the device, and then examine the
running services:

```shell
root@dee2945:/# balena ps
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS                  PORTS               NAMES
75727d0a4bea        eeb7acdade4c                        "/usr/bin/entry.sh n…"   4 minutes ago       Up 4 minutes                                backend_1849057_1215070
2c4881a3a3cc        238fe0dacd83                        "/usr/bin/entry.sh n…"   19 minutes ago      Up 19 minutes                               frontend_1849056_1215070
62e5d3984a53        balena/armv7hf-supervisor:v9.15.7   "./entry.sh"             4 days ago          Up 25 hours (healthy)                       balena_supervisor
root@dee2945:/# balena inspect backend_1849057_1215070 | grep /var/lib/docker/volumes/
                "Source": "/var/lib/docker/volumes/1544229_backend-data/_data",
```

This time, the volume is denoted with the suffix of the defined volume name.
Should there be multiple volumes, then appropriate directories for these will
be created in the `/var/lib/docker/volumes` directory, with the relevant
suffixes.

Knowing this, it becomes fairly simple to stop services that have filled volumes
and to clear these out:

1. Stop the Supervisor and start timer (`balena-supervisor.service` and
    `update-balena-supervisor.timer`).
2. Determine the relevant data directories for the volumes filling the data
    partition.
3. Clean them appropriately.
4. Restart the Supervisor and start timer.

#### 11.2 Storage Media Corruption

Many device types use storage media that has high wear levels. This includes
devices such as the Raspberry Pi series, where SD cards are the usual storage
media. Because we recommend very hard-wearing cards (the SanDisk Extreme Pro
family are extremely resilient), we don't regularly have issues with customer devices
dying due to SD card failure. However, they do occur (and not just on SD cards,
any type of flash memory based storage includes a shorter lifespan compared to
media such as platter drives). Initially, media corruption and wearing exhibit
'random' signs, including but not limited to:

* Application updates failing to download/start/stop.
* Services suddenly restarting.
* Devices not being mapped to device nodes.
* Extreme lag when interacting with services/utilities from the CLI.
* Spurious kernel errors.

In fact, media corruption could potentially exhibit as *any* sort of issue,
because there's (generally) no way to determine where wearing may exhibit
itself. Additionally, we have seen issues where media write/reads take so
long that they also adversely impact the system (for example, healthchecks
may take too long to occur, which could potentially restart services including
the Supervisor and balenaEngine), in these cases swapping the media for a
known, working brand has caused this issues to be resolved.

One quick check that can be carried out is the root filing system integrity
check. This checks the MD5 hashes fingerprints of all the files in the filing
system against those when they were built. This tends to give an idea of
whether corruption may be an issue (but it certainly isn't guaranteed).
SSH into your device and run the following:

```shell
root@dee2945:/# grep -v "/var/cache/ldconfig/aux-cache" /resinos.fingerprint | md5sum --quiet -c -
root@dee2945:/#
```

If the check returns successfully, none of the files differ in their MD5
fingerprints from when they were built.

Generally, if it appears that media corruption may be an issue, we generally
check with customers if they're running a recommended media brand, and if
not ask them to do so.

Should the worst happen and a device is no longer bootable due to filesystem
corruption, they still have the option of recovering data from the device.
In this case, they'll need to remove the media (SD card, HDD, etc.) from the
device and then follow appropriate instructions. The Jellyfish knowledgebase
includes an entry for doing this (search for 'Recovery data from a dead
device').

### 12. Device connectivity status

When the device's network connectivity is fully operational, the status displays as Online, which is comprised of healthy Heartbeat and VPN statuses. When one of the aforementioned conditions is abnormal, the status will display as Heartbeat Only or VPN Only.

#### 12.1 Heartbeat Only

A device with a Heartbeat Only status has internet connectivity and can poll the cloud for new updates to apply. However, performing any actions which do not change the target state or attempting to access the device via SSH will error, as these actions only have effect with a VPN connection. Actions that do not change the target state include purging data, restarting, rebooting, or shutting down, and they all require the VPN because they are proxied from the dashboard API to the [Supervisor API](https://www.balena.io/docs/reference/supervisor/supervisor-api/) on device.

#### 12.2 VPN Only

A device with a VPN Only status is not able to apply any new changes made such as deploying new releases, applying service configuration values, or switching to local mode. However, it is accessible via SSH or the web terminal. Performing an action such as rebooting or restarting containers might work, but most likely will not. This is because the device loses its Heartbeat if it's not communicating with the API, which is usually when the Supervisor on the device is not running or crashing. Since we have VPN access, we can SSH into the device and investigate further.

#### 12.3 What do these states mean for my application ?

A device can be Heartbeat or VPN Only and still have full internet access, which means your applications may be deployed and continuing to run without interruption. However, in the case of VPN Only, future updates will not be deployed until the Supervisor on the device is fixed.

## Conclusion

In this masterclass, you've learned how to deal with balena devices as a
support agent. You should now be confident enough to:

* Request access from a customer and access their device, including 'offline'
    devices on the same network as one that is 'online'.
* Run diagnostics checks and understand their results.
* Understand the core balenaOS services that make up the system, including
    the ability to read journals from those services, as well as stopping,
    starting and restarting them.
* Enable persistent logs, and then examine them when required.
* Diagnose and handle a variety of network issues.
* Understand and work with the `config.json` configuration file.
* Understand the Supervisor's role, including key concepts.
* Understand the balenaEngine's role, including key concepts.
* Be able to look at kernel logs, and determine some common faults.
* Work with media issues, including dealing with full media, working with customer data, and diagnosing corruption issues.
* Understand why your device's status is Online (Heartbeat Only) or Online (VPN Only) and how it can be impacting your application.
