# Device debugging

## Balena Device Debugging Masterclass

### Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes. To gain the most from this masterclass, we recommend that you first undertake the following masterclasses:

* [Balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)
* [BalenaOS Masterclass](https://github.com/balena-io/balenaos-masterclass/)

### Introduction

At balena, we believe the best people to support a customer are the engineers who build the product. They have the depth and breadth of knowledge that can quickly identify and track down issues that traditional support agents usually do not. Not only does this help a customer quickly and efficiently solve most issues, but it also immerses balena engineers in sections of the product they might not otherwise encounter in their usual working life, which further improves the support each engineer can offer. This masterclass has been written as an initial guide for new engineers about to start support duties.

Whilst the majority of devices never see an issue, occasionally a customer will contact balena support with a query where one of their devices is exhibiting anomalous behavior.

Obviously, no guide can cover the range of queries that may occur, but it can give an insight into how to tackle problems and the most common problems that a balena support agent sees, as well as some potential solutions to these problems. In compiling this document, a group of highly seasoned balena engineers discussed their techniques for discovering and resolving on-device issues, as well as techniques for determining how best to mitigate an issue being exhibited.

In this masterclass, you will learn how to:

* Gain access to a customer device, when permission has been granted
* Retrieve initial diagnostics for the device
* Identify and solve common networking problems
* Work with the Supervisor
* Work with balenaEngine
* Examine the Kernel logs
* Understand media-based issues (such as SD card corruption)
* Understand how heartbeat and the VPN only status affects your devices

Whilst this masterclass is intended for new engineers about to start support duties at balena, it is also intended to act as an item of interest to customers who wish to know more about how we initially go about debugging a device (and includes information that customers themselves could use to give a support agent more information). We recommend, however, ensuring balena support is _always_ contacted should you have an issue with a device that is not working correctly.

**Note:** The balena VPN service was renamed to cloudlink in 2022 in customer facing documentation.

### Hardware and Software Requirements

It is assumed that the reader has access to the following:

* A local copy of the example in our [Balena Device Debugging Masterclass](https://github.com/balena-io-projects/debugging-masterclass) repository. This copy can be obtained by either method:
  * `git clone https://github.com/balena-io-projects/debugging-masterclass.git`
  * Download ZIP file (from 'Clone or download'->'Download ZIP') and then unzip it to a suitable directory
* A balena supported device, such as a [balenaFin 1.1](https://balena.io/fin), [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Intel NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/)
* A suitable shell environment for command execution (such as `bash`)
* A [balenaCloud](https://www.balena.io/) account
* A familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
* An installed instance of the [balena CLI](https://github.com/balena-io/balena-cli/)

### Exercises

The following exercises assume access to a device that has been provisioned. As per the other masterclasses in this series we're going to assume that's a Raspberry Pi 4, however you can simply alter the device type as appropriate in the following instructions. The balena CLI is going to be used instead of the WebTerminal in the balenaCloud Dashboard for accessing the device, but all of the exercises could be completed using the WebTerminal if preferred.

First login to your balena account via `balena login`, and then create a new fleet:

```shell
$ balena fleet create DebugFleet --type raspberrypi4-64 --organization ryanh
Fleet created: slug "ryanh/debugfleet", device type "raspberrypi4-64"
```

Now provision a device by downloading and flashing a _development_ image from the Dashboard (via Etcher), or by flashing via the command line.

```shell
$ balena os download raspberrypi4-64 --version "2022.7.0.dev" --output balena-debug.img
Getting device operating system for raspberrypi4-64
balenaOS image version 2022.7.0 downloaded successfully
```

**Note:** Above, we used a [balenaOS Extended Support Release (ESR)](https://www.balena.io/docs/reference/OS/extended-support-release/). These ESRs are currently available for many device types, but only on paid plans and balena team member accounts. If you are going through this masterclass on a free plan, just pick the latest release available and the remainder of the guide is still applicable.

Carry out any configuration generation required, should you be using a Wifi AP and inject the configuration into the image (see [balena CLI Advanced Masterclass](https://github.com/balena-io-projects/balena-cli-advanced-masterclass#32-configuring-a-provisioning-image) for more details), or use a configuration for an ethernet connection:

```shell
$ balena os configure balena-debug.img --fleet DebugFleet --config-network=ethernet
Configuring operating system image
$ balena util available-drives
DEVICE     SIZE    DESCRIPTION
/dev/disk2 31.9 GB TS-RDF5 SD Transcend Media

$ balena os initialize balena-debug.img --type raspberrypi4-64 --drive /dev/disk2 --yes
Initializing device

Note: Initializing the device may ask for administrative permissions
because we need to access the raw devices directly.
Going to erase /dev/disk2.
Admin privileges required: you may be asked for your computer password to continue.
Writing Device OS [========================] 100% eta 0s
Validating Device OS [========================] 100% eta 0s
You can safely remove /dev/disk2 now
```

You should now have a device that will appear as part of the DebugFleet fleet:

```shell
$ balena devices | grep debugfleet
7830516 9294512 average-fire  raspberrypi4-64   debugfleet       Idle   true      14.0.8             balenaOS 2022.7.0 https://dashboard.balena-cloud.com/devices/92945128a17b352b155c2ae799791389/summary
```

For convenience, export a variable to point to the root of this masterclass repository, as we'll use this for the rest of the exercises, eg:

```shell
$ export BALENA_DEBUGGING_MASTERCLASS=~/debugging-masterclass
```

Finally, push the code in the `multicontainer-app` directory to the fleet:

```shell
$ cd $BALENA_DEBUGGING_MASTERCLASS/multicontainer-app
$ balena push DebugFleet
```

#### 1. Accessing a User Device

{% include "../../../.gitbook/includes/access-device.md" %}

See: [#granting-support-access-to-a-support-agent](../../accounts/support-access.md#granting-support-access-to-a-support-agent "mention")

#### 2. Initial Diagnosis

The balenaCloud Dashboard includes the ability to run diagnostics on a device to determine its current condition. This should be the first step in attempting to diagnose an issue without having to actually access the device via SSH. Ensuring diagnostics and health checks are examined first ensures that you have a good idea of the state a device is in before SSHing into it, as well as ensuring that the information can be accessed later if required (should a device be in a catastrophic state). This helps significantly in a support post-mortem should one be required.

**2.1 Device Health Checks**

To run health checks through balenaCloud dashboard, head to the `Diagnostics` tab in the sidebar and click the `Run checks` button to start the tests.

![diagnostics](https://user-images.githubusercontent.com/22801822/154141814-6953717d-f90a-456b-ad51-474b14dcc5e9.png)

This will trigger a set of [health checks](https://www.balena.io/docs/reference/diagnostics#device-health-checks) to run on the device. You should see all the checks as `Succeeded` in the Success column if the device is healthy and there are no obvious faults.

That's no fun, let's create a fault.

SSH into your device, via `balena ssh <UUID>`, using the appropriate UUID. We want to SSH into the host OS, as that's where we'll wreak havoc:

```shell
$ balena ssh 9294512
=============================================================
    Welcome to balenaOS
=============================================================
root@9294512:~#
```

We're going to do a couple of things that will show up as problems. Something you'll often check, and that we'll discuss later, is the state of the balena Supervisor and balenaEngine.

First of all, we're going to kill the balenaEngine maliciously without letting it shut down properly:

```shell
root@9294512:~# ps aux | awk '!/awk/ && /balenad/ {print $2}' | xargs kill -9
```

What this does is list the processes running, look for the `balenad` executable (the balenaEngine itself) and then stop the engine with a `SIGKILL` signal, which will make it immediately terminate instead of shutting down correctly. In fact, we'll do it twice. Once you've waited about 30 seconds, run the command again.

Now if you run the health checks again. After a couple minutes, you'll see the 'check\_container\_engine\` section has changed:

| Check                    | Status | Notes                                                                                                                                                  |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| check\_container\_engine | Failed | Some container\_engine issues detected:                                                                                                                |
|                          |        | test\_container\_engine\_running\_now Container engine balena is NOT running                                                                           |
|                          |        | test\_container\_engine\_restarts Container engine balena has 2 restarts and may be crashlooping (most recent start time: Thu 2022-08-18 11:14:32 UTC) |
|                          |        | test\_container\_engine\_responding Error querying container engine:                                                                                   |

Unclean restarts usually mean that the engine crashed abnormally with an issue. This usually happens when something catastrophic occurs between the Supervisor and balenaEngine or corruption occurs in the image/container/volume store. Let's take a look at the journal for balenaEngine (`balena.service`) on the device:

```shell
root@9294512:~# journalctl --no-pager -n 400 -u balena.service
```

You'll see a _lot_ of output, as the logs don't just show the balenaEngine output but the output from the Supervisor as well. However, if you search through the output, you'll see a line like the following:

```shell
Aug 18 11:14:32 9294512 systemd[1]: balena.service: Main process exited, code=killed, status=9/KILL
```

As you can see, the `balena.service` was killed with a `SIGKILL` instruction.

You can also see the two times that our services were attempted to start after the engine was killed and restarted automatically by running:

```shell
root@7db55ce:~# journalctl --no-pager -n 400 -u balena.service | grep frontend -A 5
...
Aug 18 11:15:05 9294512 89fe7a71a40d[6061]: > frontend@1.0.0 start /usr/src/app
Aug 18 11:15:05 9294512 89fe7a71a40d[6061]: > node index.js
Aug 18 11:15:05 9294512 89fe7a71a40d[6061]:
Aug 18 11:15:06 9294512 422820756f15[6061]:
Aug 18 11:15:06 9294512 422820756f15[6061]: > backend@1.0.0 start /usr/src/app
Aug 18 11:15:06 9294512 422820756f15[6061]: > node index.js
```

As you can see, these have now been specifically output for the two running service containers.

If you _only_ want to see balenaEngine output and not from any of the service containers it is running, use `journalctl -u balena.service -t balenad`. The `-t` is the shortened form of `--identifier=<id>`, which in this case ensures that only messages from the `balenad` syslog identifier are shown.

We'll discuss issues with balenaEngine and the Supervisor later in this masterclass.

There are many other health checks that can immediately expose a problem. For example, warnings on low free memory or disk space can expose problems which will exhibit themselves as release updates failing to download, or service containers restarting abnormally (especially if a service runs unchecked and consumes memory until none is left). We'll also go through some of these scenarios later in this masterclass.

Checkout the [Diagnostics page](https://www.balena.io/docs/reference/diagnostics) for more information on tests you can run on the device.

#### 3. Device Access Responsibilities

When accessing a customer's device you have a number of responsibilities, both technically and ethically. A customer assumes that the support agent has a level of understanding and competence, and as such support agents should ensure that these levels are met successfully.

There are some key points which should be followed to ensure that we are never destructive when supporting a customer:

* Always ask permission before carrying out non-read actions. This includes situations such as stopping/restarting/starting services which are otherwise functional (such as the Supervisor). This is _especially_ important in cases where this would stop otherwise functioning services (such as stopping balenaEngine).
* Ensure that the customer is appraised of any non-trivial non-read actions that you are going to take before you carry those actions out on-device. If they have given you permission to do 'whatever it takes' to get the device running again, you should still pre-empt your actions by communicating this clearly.
* During the course of carrying out non-read actions on a device, should the customer be required to answer a query before being able to proceed, make it clear to them what you have already carried out, and that you need a response before continuing. Additionally ensure that any incoming agents that may need to access the device have all of your notes and actions up to this point, so they can take over in your stead.
* _Never_ reboot a device without permission, especially in cases where it appears that there is a chance that the device will not recover (which may be the case in situations where the networking is a non-optimal state). It is imperative in these cases that the customer is made aware that this could be an outcome in advance, and that they must explicitly give permission for a reboot to be carried out.

Occasionally it becomes very useful to copy files off from a device, so that they can be shared with the team. This might be logfiles, or the Supervisor database, etc.

A quick way of copying data from a device with a known UUID onto a local machine is to use SSH with your balena support username:

```shell
ssh -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 22 ${USER}@ssh.balena-devices.com host -s ${UUID} 'cat ${PATH_TO_FILE}' > ${LOCAL_PATH}
```

You can copy data from your local machine onto a device by piping the file in instead:

```shell
ssh -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 22 ${USER}@ssh.balena-devices.com host -s ${UUID} 'cat > ${PATH_TO_FILE}' < ${LOCAL_PATH}
```

#### 4. Accessing a Device using a Gateway Device

{% include "../../../.gitbook/includes/device-gateway.md" %}

#### 5. Component Checklist

The key to any support is context. As a support agent, you should have enough context from a customer to start an investigation. If you do not, then you should ask for as much context and detail about the device as you can before starting an investigation on the device.

When accessing a device, there are usually some things you can check to see why a device may be in a broken state. Obviously, this depends on the symptoms a customer has reported, as well as those a support agent may have found when running the device diagnostics. However, there are some common issues that can occur to put a device into a broken state that can be quickly fixed.

The following sections discuss some of the first components to check when carrying out on-device support. The components that should be checked and in what order comes down to the context of support, and the symptoms seen.

**5.1 Service Status and Journal Logs**

balenaOS uses [systemd](https://www.freedesktop.org/wiki/Software/systemd/) as its [init system](https://en.wikipedia.org/wiki/Init), and as such almost all the fundamental components in balenaOS run as systemd services. systemd builds a dependency graph of all of its unit files (in which services are defined) to determine the order that these should be started/shutdown in. This is generated when systemd is run, although there are ways to rebuild this after startup and during normal system execution.

Possibly the most important command is `journalctl`, which allows you to read the service's journal entries. This takes a variety of switches, the most useful being:

* `--follow`/`-f` - Continues displaying journal entries until the command is halted (eg. with Ctrl-C)
* `--unit=<unitFile>`/`-u <unitFile>` - Specifies the unit file to read journal entries for. Without this, all units entries are read.
* `--pager-end`/`-e` - Jump straight to the final entries for a unit.
* `--all`/`-a` - Show all entries, even if long or with unprintable characters. This is especially useful for displaying the service container logs from user containers when applied to `balena.service`.

A typical example of using `journalctl` might be following a service to see what's occuring. Here's it for the Supervisor, following journal entries in real time:

```shell
root@9294512:~# journalctl --follow --unit=balena-supervisor
-- Journal begins at Fri 2021-08-06 14:40:59 UTC. --
Aug 18 16:56:55 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:57:05 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:58:17 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:58:27 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:58:37 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:58:48 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:58:58 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:59:19 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 16:59:40 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
Aug 18 17:00:00 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
```

Any systemd service can be referenced in the same way, and there are some common commands that can be used with services:

*   `systemctl status <serviceName>` - Will show the status of a service. This includes whether it is currently loaded and/or enabled, if it is currently active (running) and when it was started, its PID, how much memory it is notionally (and beware here, this isn't always the amount of physical memory) using, the command used to run it and finally the last set of entries in its journal log. Here's example output from the OpenVPN service:

    ```shell
    root@9294512:~# journalctl --follow --unit=balena-supervisor
    -- Journal begins at Fri 2021-08-06 14:40:59 UTC. --
    Aug 18 16:56:55 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:57:05 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:58:17 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:58:27 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:58:37 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:58:48 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:58:58 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:59:19 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 16:59:40 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 17:00:00 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 17:00:11 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 17:00:31 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 17:00:42 9294512 balena-supervisor[6890]: [info]    Reported current state to the cloud
    Aug 18 17:00:49 9294512 balena-supervisor[6890]: [api]     GET /v1/healthy 200 - 3.272 ms
    ```
* `systemctl start <serviceName>` - Will start a non-running service. Note that this will _not_ restart a service that is already running.
* `systemctl stop <serviceName>` - Will stop a running service. If the service is not running, this command will not do anything.
* `systemctl restart <serviceName>` - Will restart a running service. If the service is not running, this will start it.
* `systemctl daemon-reload` - Will essentially run through the startup process systemd carries out at initialisation, but without restarting services or units. This allows the rebuild of the system dependency graph, and should be carried out if any of the unit files are changed whilst the system is running.

This last command may sound a bit confusing but consider the following. Imagine that you need to dynamically change the `balena-supervisor.service` unit file to increase the healthcheck timeout on a very slow system. Once that change has been made, you'll want to restart the service. However, first, you need to reload the unit file as this has changed from the loaded version. To do this, you'll run `systemctl daemon-reload` and then `systemctl restart balena-supervisor.service` to restart the Supervisor.

In general, there are some core services that need to execute for a device to come online, connect to the balenaCloud VPN, download releases and then run them:

* `chronyd.service` - Responsible for NTP duties and syncing 'real' network time to the device. Note that balenaOS versions less than v2.13.0 used `systemd-timesyncd.service` as their NTP service, although inspecting it is very similar to that of `chronyd.service`.
* `dnsmasq.service` - The local DNS service which is used for all host OS lookups (and is the repeater for user service containers by default).
* `NetworkManager.service` - The underlying Network Manager service, ensuring that configured connections are used for networking.
* `os-config.service` - Retrieves settings and configs from the API endpoint, including certificates, authorized keys, the VPN config, etc.
* `openvpn.service` - The VPN service itself, which connects to the balenaCloud VPN, allowing a device to come online (and to be SSHd to and have actions performed on it). Note that in balenaOS versions less than v2.10.0 this was called `openvpn-resin.service`, but the method for inspecting and dealing with the service is the same.
* `balena.service` - The balenaEngine service, the modified Docker daemon fork that allows the management and running of service images, containers, volumes and networking.
* `balena-supervisor.service` - The \{{ $names.company.short \}} Supervisor service, responsible for the management of releases, including downloading updates of the app and self-healing (via monitoring), variables (fleet/device), and exposure of these services to containers via an API endpoint.
* `dbus.service` - The DBus daemon socket can be used by services if the `io.balena.features.dbus` label is applied. This exposes the DBus daemon socket in the container which allows the service to control several host OS features, including the Network Manager.

Additionally, there are some utility services that, whilst not required for a barebones operation, are also useful:

* `ModemManager.service` - Deals with non-Ethernet or Wifi devices, such as LTE/GSM modems.
* `avahi-daemon.service` - Used to broadcast the device's local hostname (useful in development mode, responds to `balena scan`).

We'll go into several of these services in the following sections, but generally these are the first points to examine if a system is not behaving as it should, as most issues will be associated with these services.

Additionally there are a large number of utility services that facilitate the services above, such as those to mount the correct partitions for data storage, configuring the Supervisor and running it should it crash, etc.

**5.2 Persistent Logs**

See the [Device Logs](../../manage/device-logs.md) docs to learn about persistent logging.

#### 6. Determining Networking Issues

For determining networking issues, check out the [Network Debugging masterclass](network-masterclass.md).

#### 7. Working with the `config.json` File

See the docs on [Configuring balenaOS](../../../reference/OS/configuration.md) to learn about working with the `config.json` file.

#### 8. Working with the Supervisor

## Working with the Supervisor

Service: `balena-supervisor.service`, or `resin-supervisor.service` if OS < v2.78.0

The balena Supervisor is the service that carries out the management of the software release on a device, including determining when to download updates, the changing of variables, ensuring services are restarted correctly, etc. It is the on-device agent for balenaCloud.

As such, it's imperative that the Supervisor is operational and healthy at all times, even when a device is not connected to the Internet, as the Supervisor still ensures the running of a device that is offline.

The Supervisor itself is a Docker service that runs alongside any installed user services and the healthcheck container. One major advantage of running it as a Docker service is that it can be updated just like any other service, although carrying that out is slightly different than updating user containers. (See Updating the Supervisor).

Before attempting to debug the Supervisor, it's recommended to upgrade the Supervisor to the latest version, as we frequently release bugfixes and features that may resolve device issues.

Otherwise, assuming you're still logged into your development device, run the following:

```shell
root@debug-device:~# systemctl status balena-supervisor
● balena-supervisor.service - Balena supervisor
     Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-08-19 18:08:59 UTC; 41s ago
    Process: 2296 ExecStartPre=/usr/bin/balena stop resin_supervisor (code=exited, status=1/FAILURE)
    Process: 2311 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
    Process: 2325 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
   Main PID: 2326 (start-balena-su)
      Tasks: 10 (limit: 1878)
     Memory: 11.9M
     CGroup: /system.slice/balena-supervisor.service
             ├─2326 /bin/sh /usr/bin/start-balena-supervisor
             ├─2329 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 2326
             └─2486 balena start --attach balena_supervisor

Aug 19 18:09:07 debug-device balena-supervisor[2486]: [debug]   Starting target state poll
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a --follow -o json >
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [debug]   Finished applying target state
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [success] Device state apply success
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [info]    Applying target state
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [info]    Reported current state to the cloud
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [debug]   Finished applying target state
Aug 19 18:09:07 debug-device balena-supervisor[2486]: [success] Device state apply success
Aug 19 18:09:17 debug-device balena-supervisor[2486]: [info]    Internet Connectivity: OK
Aug 19 18:09:18 debug-device balena-supervisor[2486]: [info]    Reported current state to the cloud
```

You can see the Supervisor is just another `systemd` service (`balena-supervisor.service`) and that it is started and run by balenaEngine.

Supervisor issues, due to their nature, vary significantly. Issues may commonly be misattributed to the Supervisor. As the Supervisor is verbose about its state and actions, such as the download of images, it tends to be suspected of problems when in fact there are usually other underlying issues. A few examples are:

* Networking problems - The Supervisor reports failed downloads or attempts to retrieve the same images repeatedly, where in fact unstable networking is usually the cause.
* Service container restarts - The default policy for service containers is to restart if they exit, and this sometimes is misunderstood. If a container is restarting, it's worth ensuring it's not because the container itself is exiting either due to a bug in the service container code or because it has correctly come to the end of its running process.
* Release not being downloaded - For instance, a fleet/device has been pinned to a particular version, and a new push is not being downloaded.

It's _always_ worth considering how the system is configured, how releases were produced, how the fleet or device is configured and what the current networking state is when investigating Supervisor issues, to ensure that there isn't something else amiss that the Supervisor is merely exposing via logging.

Another point to note is that the Supervisor is started using [`healthdog`](https://github.com/balena-os/healthdog-rs) which continually ensures that the Supervisor is present by using balenaEngine to find the Supervisor image. If the image isn't present, or balenaEngine doesn't respond, then the Supervisor is restarted. The default period for this check is 180 seconds. Inspecting `/lib/systemd/system/balena-supervisor.service` on-device will show whether the timeout period is different for a particular device. For example:

```shell
root@debug-device:~# cat /lib/systemd/system/balena-supervisor.service
[Unit]
Description=Balena supervisor
Requires=\
    resin\x2ddata.mount \
    balena-device-uuid.service \
    os-config-devicekey.service \
    bind-etc-balena-supervisor.service \
    extract-balena-ca.service
Wants=\
    migrate-supervisor-state.service
After=\
    balena.service \
    resin\x2ddata.mount \
    balena-device-uuid.service \
    os-config-devicekey.service \
    bind-etc-systemd-system-resin.target.wants.service \
    bind-etc-balena-supervisor.service \
    migrate-supervisor-state.service \
    extract-balena-ca.service
Wants=balena.service
ConditionPathExists=/etc/balena-supervisor/supervisor.conf

[Service]
Type=simple
Restart=always
RestartSec=10s
WatchdogSec=180
SyslogIdentifier=balena-supervisor
EnvironmentFile=/etc/balena-supervisor/supervisor.conf
EnvironmentFile=-/tmp/update-supervisor.conf
ExecStartPre=-/usr/bin/balena stop resin_supervisor
ExecStartPre=-/usr/bin/balena stop balena_supervisor
ExecStartPre=/bin/systemctl is-active balena.service
ExecStart=/usr/bin/healthdog --healthcheck=/usr/lib/balena-supervisor/balena-supervisor-healthcheck /usr/bin/start-balena-supervisor
ExecStop=-/usr/bin/balena stop balena_supervisor

[Install]
WantedBy=multi-user.target
Alias=resin-supervisor.service
```

**8.1 Restarting the Supervisor**

It's rare to actually _need_ a Supervisor restart. The Supervisor will attempt to recover from issues that occur automatically, without the requirement for a restart. When in doubt about whether a restart is required, look at the Supervisor logs and double check other on-duty support agents if needed. If fairly certain, it's generally safe to restart the Supervisor, as long as the user is aware that some extra bandwidth and device resources will be used on startup.

There are instances where the Supervisor is incorrectly restarted when in fact the issue could be the corruption of service images, containers, volumes or networking. In these cases, you're better off dealing with the underlying balenaEngine to ensure that anything corrupt is recreated correctly. See the balenaEngine section for more details.

If a restart is required, ensure that you have gathered as much information as possible before a restart, including pertinent logs and symptoms so that investigations can occur asynchronously to determine what occurred and how it may be mitigated in the future. Enabling persistent logging may also be beneficial in cases where symptoms are repeatedly occurring.

To restart the Supervisor, simply restart the `systemd` service:

```shell
root@debug-device:~# systemctl restart balena-supervisor.service
root@debug-device:~# systemctl status balena-supervisor.service
● balena-supervisor.service - Balena supervisor
     Loaded: loaded (/lib/systemd/system/balena-supervisor.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-08-19 18:13:28 UTC; 10s ago
    Process: 3013 ExecStartPre=/usr/bin/balena stop resin_supervisor (code=exited, status=1/FAILURE)
    Process: 3021 ExecStartPre=/usr/bin/balena stop balena_supervisor (code=exited, status=0/SUCCESS)
    Process: 3030 ExecStartPre=/bin/systemctl is-active balena.service (code=exited, status=0/SUCCESS)
   Main PID: 3031 (start-balena-su)
      Tasks: 11 (limit: 1878)
     Memory: 11.8M
     CGroup: /system.slice/balena-supervisor.service
             ├─3031 /bin/sh /usr/bin/start-balena-supervisor
             ├─3032 /proc/self/exe --healthcheck /usr/lib/balena-supervisor/balena-supervisor-healthcheck --pid 3031
             └─3089 balena start --attach balena_supervisor

Aug 19 18:13:33 debug-device balena-supervisor[3089]: [info]    Waiting for connectivity...
Aug 19 18:13:33 debug-device balena-supervisor[3089]: [debug]   Starting current state report
Aug 19 18:13:33 debug-device balena-supervisor[3089]: [debug]   Starting target state poll
Aug 19 18:13:33 debug-device balena-supervisor[3089]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a --follow -o json >
Aug 19 18:13:33 debug-device balena-supervisor[3089]: [debug]   Finished applying target state
Aug 19 18:13:33 debug-device balena-supervisor[3089]: [success] Device state apply success
Aug 19 18:13:34 debug-device balena-supervisor[3089]: [info]    Applying target state
Aug 19 18:13:34 debug-device balena-supervisor[3089]: [info]    Reported current state to the cloud
Aug 19 18:13:34 debug-device balena-supervisor[3089]: [debug]   Finished applying target state
Aug 19 18:13:34 debug-device balena-supervisor[3089]: [success] Device state apply success
```

**8.2 Updating the Supervisor**

Occasionally, there are situations where the Supervisor requires an update. This may be because a device needs to use a new feature or because the version of the Supervisor on a device is outdated and is causing an issue. Usually the best way to achieve this is via a balenaOS update, either from the dashboard or via the command line on the device.

If updating balenaOS is not desirable or a user prefers updating the Supervisor independently, this can easily be accomplished using [self-service](https://www.balena.io/docs/reference/supervisor/supervisor-upgrades/) Supervisor upgrades. Alternatively, this can be programmatically done by using the Node.js SDK method [device.setSupervisorRelease](https://www.balena.io/docs/reference/sdk/node-sdk/#devicesetsupervisorreleaseuuidorid-supervisorversionorid-%E2%87%92-codepromisecode).

You can additionally write a script to manage this for a fleet of devices in combination with other SDK functions such as [device.getAll](https://www.balena.io/docs/reference/sdk/node-sdk/#devicegetalloptions-%E2%87%92-codepromisecode).

**Note:** In order to update the Supervisor release for a device, you must have edit permissions on the device (i.e., more than just support access).

**8.3 The Supervisor Database**

The Supervisor uses a SQLite database to store persistent state, so in the case of going offline, or a reboot, it knows exactly what state an app should be in, and which images, containers, volumes and networks to apply to it.

This database is located at `/mnt/data/resin-data/balena-supervisor/database.sqlite` and can be accessed inside the Supervisor container at `/data/database.sqlite` by running Node. Assuming you're logged into your device, run the following:

```shell
root@debug-device:~# balena exec -ti balena_supervisor node
```

This will get you into a Node interpreter in the Supervisor service container. From here, we can use the `sqlite3` NPM module used by the Supervisor to make requests to the database:

```shell
> sqlite3 = require('sqlite3');
{
  Database: [Function: Database],
  Statement: [Function: Statement],
  Backup: [Function: Backup],
  OPEN_READONLY: 1,
  OPEN_READWRITE: 2,
  OPEN_CREATE: 4,
  OPEN_FULLMUTEX: 65536,
  OPEN_URI: 64,
  OPEN_SHAREDCACHE: 131072,
  OPEN_PRIVATECACHE: 262144,
  VERSION: '3.30.1',
  SOURCE_ID: '2019-10-10 20:19:45 18db032d058f1436ce3dea84081f4ee5a0f2259ad97301d43c426bc7f3df1b0b',
  VERSION_NUMBER: 3030001,
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
  verbose: [Function]
}
> db = new sqlite3.Database('/data/database.sqlite');
Database {
  open: false,
  filename: '/data/database.sqlite',
  mode: 65542
}
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
  { name: 'deviceConfig' },
  { name: 'engineSnapshot' },
  { name: 'image' },
  { name: 'knex_migrations' },
  { name: 'knex_migrations_lock' },
  { name: 'logsChannelSecret' },
  { name: 'sqlite_sequence' }
]
```

With these, you can then examine and modify data, if required. Note that there's usually little reason to do so, but this is included for completeness. For example, to examine the configuration used by the Supervisor:

```shell
> db.all('SELECT * FROM config;', console.log);
Database { open: true, filename: '/data/database.sqlite', mode: 65542 }
> null [
  { key: 'localMode', value: 'false' },
  { key: 'initialConfigSaved', value: 'true' },
  {
    key: 'initialConfigReported',
    value: 'https://api.balena-cloud.com'
  },
  { key: 'name', value: 'shy-rain' },
  { key: 'targetStateSet', value: 'true' },
  { key: 'delta', value: 'true' },
  { key: 'deltaVersion', value: '3' }
]
```

Occasionally, should the Supervisor get into a state where it is unable to determine which release images it should be downloading or running, it is necessary to clear the database. This usually goes hand-in-hand with removing the current containers and putting the Supervisor into a 'first boot' state, whilst keeping the Supervisor and release images. This can be achieved by carrying out the following:

```shell
root@debug-device:~# systemctl stop balena-supervisor.service update-balena-supervisor.timer
root@debug-device:~# balena rm -f $(balena ps -aq)
1db1d281a548
6c5cde1581e5
2a9f6e83578a
root@debug-device:~# rm /mnt/data/resin-data/balena-supervisor/database.sqlite
```

This:

* Stops the Supervisor (and the timer that will attempt to restart it).
* Removes all current service containers, including the Supervisor.
* Removes the Supervisor database. (If for some reason the images also need to be removed, run `balena rmi -f $(balena images -q)` which will remove all images _including_ the Supervisor image). You can now restart the Supervisor:

```shell
root@debug-device:~# systemctl start update-balena-supervisor.timer balena-supervisor.service
```

If you deleted all the images, this will first download the Supervisor image again before restarting it. At this point, the Supervisor will start up as if the device has just been provisioned and already registered, and the device's target release will be freshly downloaded if images were removed before starting the service containers.

#### 9. Working with balenaEngine

Service: `balena.service`

balenaEngine is balena's fork of Docker, offering a range of added features including real delta downloads, minimal disk writes (for reduced media wear) and other benefits for edge devices, in a small resource footprint.

balenaEngine is responsible for the fetching and storage of service images, as well as their execution as service containers, the creation of defined networks and creation and storage of persistent data to service volumes. As such, it is an extremely important part of balenaOS.

Additionally, as the Supervisor is also executed as a container, it is required for its operation. This means that should balenaEngine fail for some reason, it is likely that the Supervisor will also fail.

Issues with balenaEngine themselves are rare, although it can be initially tempting to attribute them to balenaEngine instead of the actual underlying issue. A couple of examples of issues which are misattributed to :

* Failure to download release service updates - usually because there is an underlying network problem, or possibly issues with free space
* Failure to start service containers - most commonly customer services exit abnormally (or don't have appropriate error checking) although a full data partition can also occur, as can corrupt images

Reading the journal for balenaEngine is similar to all other `systemd` services. Log into your device and then execute the following:

```shell
root@dee2945:~# journalctl --follow -n 100 --unit balena.service
...
```

What you'll first notice here is that there's Supervisor output here. This is because balenaEngine is running the Supervisor and it pipes all Supervisor logs to its own service output. This comes in particularly useful if you need to examine the journal, because it will show both balenaEngine and Supervisor output in the same logs chronologically.

Assuming your device is still running the pushed multicontainer app, we can also see additionally logging for all the service containers. To do so, we'll restart balenaEngine, so that the services are started again. This output shows the last 50 lines of the balenaEngine journal after a restart.

```shell
root@debug-device:~# systemctl restart balena.service
root@debug-device:~# journalctl --all --follow -n 50 --unit balena.service
-- Journal begins at Fri 2022-08-19 18:08:10 UTC. --
Aug 19 18:24:36 debug-device balenad[4566]: time="2022-08-19T18:24:36.794621631Z" level=info msg="shim balena-engine-containerd-shim started" address=/containerd-shim/d7b6a623d687aea38a743fc79898e57bc3b43da3dbe144499bea2a068ad6700f.sock debug=false pid=5157
Aug 19 18:24:38 debug-device e593ab6439fe[4543]: [info]    Supervisor v14.0.8 starting up...
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Setting host to discoverable
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [warn]    Invalid firewall mode: . Reverting to state: off
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Applying firewall mode: off
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting systemd unit: avahi-daemon.service
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting systemd unit: avahi-daemon.socket
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting logging infrastructure
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Starting firewall
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Performing database cleanup for container log timestamps
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [success] Firewall mode applied
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting api binder
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Previous engine snapshot was not stored. Skipping cleanup.
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Handling of local mode switch is completed
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: (node:1) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a -S 2022-08-19 18:19:08 -o json CONTAINER_ID_FULL=4ce5bebc27c67bc198662cc38d7052e9d7dd3bfb47869ba83a88a74aa498c51f
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    API Binder bound to: https://api.balena-cloud.com/v6/
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [event]   Event: Supervisor start {}
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a -S 2022-08-19 18:19:07 -o json CONTAINER_ID_FULL=2e2a7fcfe6f6416e32b9fa77b3a01265c9fb646387dbf4410ca90147db73a4ff
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Connectivity check enabled: true
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting periodic check for IP addresses
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Reporting initial state, supervisor version and API info
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Skipping preloading
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Starting API server
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Supervisor API successfully started on port 48484
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   VPN status path exists.
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Applying target state
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Ensuring device is provisioned
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    VPN connection is active.
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [info]    Waiting for connectivity...
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting current state report
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Starting target state poll
Aug 19 18:24:39 debug-device e593ab6439fe[4543]: [debug]   Spawning journald with: chroot  /mnt/root journalctl -a --follow -o json _SYSTEMD_UNIT=balena.service
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [debug]   Finished applying target state
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [success] Device state apply success
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [info]    Reported current state to the cloud
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [info]    Applying target state
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [debug]   Finished applying target state
Aug 19 18:24:40 debug-device e593ab6439fe[4543]: [success] Device state apply success
Aug 19 18:24:49 debug-device e593ab6439fe[4543]: [info]    Internet Connectivity: OK
```

**9.1 Service Image, Container and Volume Locations**

balenaEngine stores all its writeable data in the `/var/lib/docker` directory, which is part of the data partition. We can see this by using the `mount` command:

```shell
root@debug-device:~# mount | grep lib/docker
/dev/mmcblk0p6 on /var/lib/docker type ext4 (rw,relatime)
/dev/mmcblk0p6 on /var/volatile/lib/docker type ext4 (rw,relatime)
```

All balenaEngine state is stored in here, include images, containers and volume data. Let's take a brief look through the most important directories and explain the layout, which should help with investigations should they be required.

Run `balena images` on your device:

```shell
root@debug-device:~# balena images
REPOSITORY                                                       TAG       IMAGE ID       CREATED        SIZE
registry2.balena-cloud.com/v2/8f425c77879116f77e6c8fcdebb37210   latest    f0735c857f39   32 hours ago   250MB
registry2.balena-cloud.com/v2/9664d653a6ecc4fe2c7e0cb18e64a3d2   latest    3128dae78199   32 hours ago   246MB
balena_supervisor                                                v14.0.8   936d20a463f5   7 weeks ago    75.7MB
registry2.balena-cloud.com/v2/04a158f884a537fc1bd11f2af797676a   latest    936d20a463f5   7 weeks ago    75.7MB
balena-healthcheck-image                                         latest    46331d942d63   5 months ago   9.14kB
```

Each image has an image ID. These identify each image uniquely for operations upon it, such as executing it as a container, removal, etc. We can inspect an image to look at how it's made up:

```shell
root@debug-device:~# balena inspect f0735c857f39
[
    {
        "Id": "sha256:f0735c857f39ebb303c5e908751f8ac51bbe0f999fe06b96d8bfc1a562e0f5ad",
        "RepoTags": [
            "registry2.balena-cloud.com/v2/8f425c77879116f77e6c8fcdebb37210:latest"
        ],
        "RepoDigests": [
            "registry2.balena-cloud.com/v2/8f425c77879116f77e6c8fcdebb37210@sha256:45c002b1bb325c1b93ff333a82ff401c9ba55ca7d00118b31a1c992f6fc5a4a4"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2022-08-18T10:17:31.25910477Z",
        "Container": "312d5c69d19954518ae932398ab9afa144feabff83906216759cffba925d9128",
        "ContainerConfig": {
            "Hostname": "faf98ca57090",
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
                "NODE_VERSION=10.22.0",
                "YARN_VERSION=1.22.4"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"npm\" \"start\"]"
            ],
            "Image": "sha256:c6072db33ab31c868fbce36621d57ddad8cf29b679027b7007d37ac40beea58c",
            "Volumes": null,
            "WorkingDir": "/usr/src/app",
            "Entrypoint": [
                "/usr/bin/entry.sh"
            ],
            "OnBuild": [],
            "Labels": {
                "io.balena.architecture": "aarch64",
                "io.balena.device-type": "jetson-tx2",
                "io.balena.qemu.version": "4.0.0+balena2-aarch64"
            }
        },
        "DockerVersion": "v19.03.12",
        "Author": "",
        "Config": {
            "Hostname": "faf98ca57090",
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
                "NODE_VERSION=10.22.0",
                "YARN_VERSION=1.22.4"
            ],
            "Cmd": [
                "npm",
                "start"
            ],
            "Image": "sha256:c6072db33ab31c868fbce36621d57ddad8cf29b679027b7007d37ac40beea58c",
            "Volumes": null,
            "WorkingDir": "/usr/src/app",
            "Entrypoint": [
                "/usr/bin/entry.sh"
            ],
            "OnBuild": [],
            "Labels": {
                "io.balena.architecture": "aarch64",
                "io.balena.device-type": "jetson-tx2",
                "io.balena.qemu.version": "4.0.0+balena2-aarch64"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 249802248,
        "VirtualSize": 249802248,
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/0bc07f1279e00affc344c22f64b9f3985225fe3e06f13103e24b983b1a9fdd0e/diff:/var/lib/docker/overlay2/27229498851db6327bf134ba8ab869655a20bf5e602a435a58e03684088baf7a/diff:/var/lib/docker/overlay2/b0d957f3e2636fe4dc5b10855ad276dc0e53fa95a5c3e2ed3fa56dcee23dc50f/diff:/var/lib/docker/overlay2/4489255833d1236ba41a2d15761f065eba992069569075d0a9edf2cd53e8415f/diff:/var/lib/docker/overlay2/f77ebf3b4836d289c2515c82537cd774354b7342c2a4899fcffb51ac23e9e9b7/diff:/var/lib/docker/overlay2/c5a96f1657a4073293c3364eab567a1f62b5d7761b8dbc3617369ffbd516c8f0/diff:/var/lib/docker/overlay2/168a1333d7a784f1b1ecbe6202f8a8189e592407195349f7d2dad943084876e6/diff:/var/lib/docker/overlay2/dd17e88dd38b700214d8f13c3d820d1f808c4b1a138f91dafd729f6369d95110/diff:/var/lib/docker/overlay2/641c77f5a0c9f25154fbd868c253c8a8e894e3cebd9ba5b96cebb9384c6283d7/diff:/var/lib/docker/overlay2/8d428280199e4dc05de155f1f3b0ef63fdeef14e09662ce5676d8b1d790bdf5d/diff:/var/lib/docker/overlay2/bcc97249ce05979fc9aa578c976f770083e9948a1c1d64c05444591a7aad35a9/diff:/var/lib/docker/overlay2/41773d1c239c8a0bf31096d43ae7e17b5ca48f10530c13d965259ed386cb20d9/diff:/var/lib/docker/overlay2/697de96abdf1ae56449b0b01ce99ef867c821404d876f2b55eac8ccb760a1bc1/diff:/var/lib/docker/overlay2/4518e2c4e4ca2b5b6b26ed40a8e3f130296625c9a8c6a47c61763bf789e8df12/diff:/var/lib/docker/overlay2/662d75e19e4a9a98442111f551f48bd8841de472f16c755405276462122e1969/diff:/var/lib/docker/overlay2/338c3b3a4977e96ed25d1f2b9fbc65562a8c62a185df6baabe64dd3e40632331/diff:/var/lib/docker/overlay2/88069ce00e7cf154912b583ac49e2eb655af35777a22f68d65e560a8f8f72fb0/diff:/var/lib/docker/overlay2/7fa0af02f451bafb29410b8d6712bb84cfead585aca227dd899631b357eba12c/diff:/var/lib/docker/overlay2/fbaf99abadbb408297dae5626b85415bf62fdc40dce4ec4df11ff5f8043306b3/diff:/var/lib/docker/overlay2/f871aa611f42e273ef69b8ee3a686e084b6eddaf9d20c36e10904e4e44013fe1/diff:/var/lib/docker/overlay2/d21067d6f38aebbe391336a2251aac02e0bda38db313de18d417c12f20eba067/diff:/var/lib/docker/overlay2/daa9d5a342f3234c8f7dc2905dbbaee1823821b828f3e92b0092c9e83e56cbde/diff:/var/lib/docker/overlay2/c31888f5276a034a32c1017906f32a79000971067dee4f85c3ef87717c00fe94/diff",
                "MergedDir": "/var/lib/docker/overlay2/2b7065b1b4192e5232b470d308e4992a47d7ab4786a7fcc9356682512c69d2ec/merged",
                "UpperDir": "/var/lib/docker/overlay2/2b7065b1b4192e5232b470d308e4992a47d7ab4786a7fcc9356682512c69d2ec/diff",
                "WorkDir": "/var/lib/docker/overlay2/2b7065b1b4192e5232b470d308e4992a47d7ab4786a7fcc9356682512c69d2ec/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:af0df278bec194015fd6f217c017da2cc48c7c0dfc55974a4f1da49f1fd9c643",
                "sha256:1d3545625acc456a3b1ffe0452dc7b21b912414514f6636776d1df5f7fc5b761",
                "sha256:d50c820f06af93966310405459feaa06ae25099493e924827ecc2b87d59b81bc",
                "sha256:c73bea5e51f02ae807581a4308b93bb15f2a4e8eff77980f04ca16ada3e5d8fe",
                "sha256:30781fcde1e029490e5e31142c6f87eea28f44daa1660bf727149255095aeb25",
                "sha256:06333a8766d373657969d2c5a1785426b369f0eb67d3131100562e814944bb61",
                "sha256:afe83b1715ba56fe1075387e987414f837ad1153e0dc83983b03b21af1fff524",
                "sha256:b5b49d315a0b1d90a0e7f5bf0c9f349b64b83868aa4965846b05fb1c899b4d31",
                "sha256:40e07aec657d65d0b3c2fd84983c3f725cf342a11ac8f694d19d8162556389ca",
                "sha256:1ec17697083e5ab6e6657cb2fd3ac213bfb621497196a9b4dd01be49a05fd0ba",
                "sha256:8cdee574cf2ff2bff80961902b11f378bd228d11f4e52135fd404f79ca7e1a63",
                "sha256:b4cb326982763715403b5101026ad8333e2b5d59868cce0ddf21d1a231715758",
                "sha256:94893f94e0143c27cfd1367699776035e144b4c3b3cff1c1423253f6e2b39723",
                "sha256:8a743afad01d015d44b64fd0bedf583145d04796a429aa261596e0e6943bda7f",
                "sha256:faa977113a35d9b622af3bb1a481a7ee5bdbc3f6c35dc8ff4ff5adb8b4a95641",
                "sha256:59461c292cd4bd0f3fbd808371d37845e1850ed7b9c2e676b484c60950bdd3ba",
                "sha256:285f1fb0f99ea936e0eeb5f78c83b050c3b8f334a956a40f9ec547ac29b3a58d",
                "sha256:d653d2b6a0bde68b3194e62baec92a2ef2223cd9c56e3ea4844b38886b63798e",
                "sha256:234dc1e17bed2bae6e5368c2667c30124dca94f0b584f5cd8b0f2be249311820",
                "sha256:c2630cbbb8b9413cc6d8d5bd4fcdebf54d987d62e0a2c68cf8dadb5cc831209d",
                "sha256:a5311ef02278680ab6c2cf1a5843845f5802ed024fce4f69eb8e8ea53b7a5b4e",
                "sha256:188bd1bf502d426d5e897e31773fa885399fd69ceef850609cdaa4a45f330c71",
                "sha256:43cb5b1fb08f5faa3ae526d509b5faa014ce9b8f1099b27e87f8cc3992a973c5",
                "sha256:896037576e604880800e50afde6184d54e3f50b3cede0f564dcdd3e3243bba5a"
            ]
        },
        "Metadata": {
            "LastTagTime": "2022-08-19T18:24:39.169388977Z"
        }
    }
]
```

Of particular interest here is the `"RootFS"` section, which shows all of the layers that make up an image. Without going into detail (there are plenty of easily Google-able pages describing this), each balena image is made up of a series of layers, usually associated with a `COPY`, `ADD`, `RUN`, etc. Dockerfile command at build time. Each layer makes up part of the images file system, and when a service container is created from an image, it uses these layers 'merged' together for the underlying file system.

We can look at these individual layers by making a note of each SHA256 hash ID and then finding this hash in the `/var/lib/docker/image/overlay2/layerdb/sha256` directory This directory holds a set of directories, each named after each unique layer using the SHA256 associated with it. Let's look at the layer DB directory:

```shell
root@debug-device:~# ls -lah /var/lib/docker/image/overlay2/layerdb/sha256
total 176K
drwxr-xr-x 44 root root 4.0K Aug 19 10:25 .
drwx------  5 root root 4.0K Aug 19 10:24 ..
drwx------  2 root root 4.0K Aug 19 10:25 09b78bc523987759f021e0a0e83e69c8084b1e3c20f14b4bb9534f3cdcc6ac3c
drwx------  2 root root 4.0K Jul  8 18:39 1036152b568007807de32d686a009c3f4f8adbb4f472e82ac274a27d92326d80
drwx------  2 root root 4.0K Jul  8 18:39 106a406f45c345ecbc3c42525606f80b084daf9f3423615a950c4cf5a696caa7
drwx------  2 root root 4.0K Aug 19 10:25 144d2c5112d686b5a4b14f3d4d9d8426981debc440ae533e3c374148089a66d3
drwx------  2 root root 4.0K Jul  8 18:39 1f9ad706e17e7786d85618534db2a36bb51b8aaaadd9a7e32d1e7080054ff620
drwx------  2 root root 4.0K Aug 19 10:25 21331e0e0fe982279deb041181d6af17bcd8ac70dc7dc023c225d2cfb3c33b7f
drwx------  2 root root 4.0K Jul  8 18:39 253123a3e5d5904ceeedc9b7f22f95baa93228cf7eeb8a659b2e7893e2206d32
drwx------  2 root root 4.0K Jul  8 18:39 294ac687b5fcac6acedb9a20cc756ffe39ebc87e8a0214d3fb8ef3fc3189ee2a
drwx------  2 root root 4.0K Jul  8 18:39 2ef1f0e36f419227844367aba4ddfa90df1294ab0fe4993e79d56d9fe3790362
drwx------  2 root root 4.0K Aug 19 10:24 35e3a8f4d7ed3009f84e29161552f627523e42aea57ac34c92502ead41691ce9
drwx------  2 root root 4.0K Jul  8 18:39 3eb45474328f8742c57bd7ba683431fe5f0a5154e12e382814a649cc0c4115b4
drwx------  2 root root 4.0K Jul  8 18:39 4acac926cb8671f570045c0a1dc1d73c1ca4fbfeee82b8b69b26b095a53bd9b7
drwx------  2 root root 4.0K Jul  8 18:39 4c345896c7e7169034e1cd5ae7a6ded46623c904503e37cfe0f590356aed869a
drwx------  2 root root 4.0K Aug 19 10:25 4c4fb86d946143f592f295993169aa9d48e51a2583d0905874a3a122843d6ef1
drwx------  2 root root 4.0K Jul  8 18:39 4eb65237b6a403037e5a629c93f0efd25c8cf6bc78a0c4c849e6a7d4f76892bc
drwx------  2 root root 4.0K Aug 19 10:25 521a7e6b1a2ca6e5417331c9bb9330fd94b48ec80d80099fc5cbffce33f0b871
drwx------  2 root root 4.0K Jul  8 18:39 5a5de1543b2bc574adae2f477ae308ea21d8bfcdd3828b01b1cf1b3e54e757bf
drwx------  2 root root 4.0K Aug 19 10:25 60ef73a52c9699144533715efa317f7e4ff0c066697ae0bb5936888ee4097664
drwx------  2 root root 4.0K Aug 19 10:25 7754099c5f93bb0d0269ea8193d7f81e515c7709b48c5a0ca5d7682d2f15def2
drwx------  2 root root 4.0K Aug 19 10:25 7a9f44ed69912ac134baabbe16c4e0c6293750ee023ec22488b3e3f2a73392a6
drwx------  2 root root 4.0K Aug 19 10:25 81713bf891edc214f586ab0d02359f3278906b2e53e034973300f8c7deb72ca2
drwx------  2 root root 4.0K Aug 19 10:25 8515f286995eb469b1816728f2a7dc140d1a013601f3a942d98441e49e6a38e9
drwx------  2 root root 4.0K Aug 19 10:25 8c0972b6057fafdf735562e0a92aa3830852b462d8770a9301237689dbfa6036
drwx------  2 root root 4.0K Aug 19 10:25 a1659a5774b2cd9f600b9810ac3fa159d1ab0b6c532ff22851412fe8ff21c45e
drwx------  2 root root 4.0K Aug 19 10:25 aa293c70cb6bdafc80e377b36c61368f1d418b33d56dcbc60b3088e945c24784
drwx------  2 root root 4.0K Aug 19 10:25 abaae3be7599181738152e68cfd2dcf719068b3e23de0f68a85f1bfe0a3ebe6e
drwx------  2 root root 4.0K Aug 19 10:25 acd72d7857fe303e90cd058c8b48155a0c2706ff118045baedf377934dcd5d63
drwx------  2 root root 4.0K Aug 19 10:24 af0df278bec194015fd6f217c017da2cc48c7c0dfc55974a4f1da49f1fd9c643
drwx------  2 root root 4.0K Aug 19 10:25 b9c29dbb49463dcc18dbf10d5188453a3c3d3159dd42b9fb403d3846649b8c1f
drwx------  2 root root 4.0K Aug 19 10:25 bc60d12607d916904e332fc94997d59b5619885fbb51af0e885ca21e88faec7f
drwx------  2 root root 4.0K Aug 19 10:25 c3414c33510eabf6a77f68f6714967484e7a937681d30f4578ed4415a889abbf
drwx------  2 root root 4.0K Aug 19 10:25 d89860b1b17fbfc46a8c09473504697efc768895910a383c21182c073caa249d
drwx------  2 root root 4.0K Aug 19 10:25 e665e5030545a1d1f8bb3ad1cda5a5d0bad976a23005313157e242e6a3a5932e
drwx------  2 root root 4.0K Aug 19 10:25 e80af4b706db8380d5bb3d88e4262147edfaad362fe4e43cf96658709c21195a
drwx------  2 root root 4.0K Jul  8 18:39 eb8f1151aa650015a9e6517542b193760795868a53b7644c54b5ecdac5453ede
drwx------  2 root root 4.0K Jul  8 18:39 efb53921da3394806160641b72a2cbd34ca1a9a8345ac670a85a04ad3d0e3507
drwx------  2 root root 4.0K Aug 19 10:25 f77763335291f524fee886c06f0f81f23b38638ba40c4695858cd8cca3c92c46
drwx------  2 root root 4.0K Aug 19 10:25 f92d2ac421bffffd2811552a43b88a0cc4b4fe2faa26ec85225d68e580447dc4
drwx------  2 root root 4.0K Aug 19 10:25 fae75b52757886e2f56dd7f8fbf11f5aa30ff848745b2ebf169477941282f9f9
drwx------  2 root root 4.0K Aug 19 10:25 fc810c085b1a4492e6191b546c9708b3777cbb8976744d5119ed9e00e57e7bc6
drwx------  2 root root 4.0K Jul  8 18:39 fd22d21dd7203b414e4d4a8d61f1e7feb80cbef515c7d38dc98f091ddaa0d4a2
drwx------  2 root root 4.0K Jul  8 18:39 fd6efabf36381d1f93ba9485e6b4d3d9d9bdb4eff7d52997362e4d29715eb18a
```

Note that there are layers named here that are _not_ named in the `"RootFS"` object in the image description (although base image layers usually are). This is because of the way balenaEngine describes layers and naming internally (which we will not go into here). However, each layer is described by a `cache-id` which is a randomly generated UUID. You can find the `cache-id` for a layer by searching for it in the layer DB directory:

```shell
root@debug-device:~# cd /var/lib/docker/image/overlay2/layerdb/sha256/
root@debug-device:/var/lib/docker/image/overlay2/layerdb/sha256# grep -r 09b78bc523987759f021e0a0e83e69c8084b1e3c20f14b4bb9534f3cdcc6ac3c *
7754099c5f93bb0d0269ea8193d7f81e515c7709b48c5a0ca5d7682d2f15def2/parent:sha256:09b78bc523987759f021e0a0e83e69c8084b1e3c20f14b4bb9534f3cdcc6ac3c
```

In this case, we find two entries, but we're only interested in the directory with the `diff` file result, as this describes the diff for the layer:

```shell
root@debug-device:/var/lib/docker/image/overlay2/layerdb/sha256# cat 09b78bc523987759f021e0a0e83e69c8084b1e3c20f14b4bb9534f3cdcc6ac3c/cache-id
f77ebf3b4836d289c2515c82537cd774354b7342c2a4899fcffb51ac23e9e9b7
```

We now have the corresponding `cache-id` for the layer's directory layout, and we can now examine the file system for this layer (all the diffs are stored in the `/var/lib/docker/overlay2/<ID>/diff` directory):

```shell
roroot@debug-device:~# du -hc /var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/
8.0K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/root/.config/configstore
16K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/root/.config
24K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/root
4.0K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/tmp/balena
4.0K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/tmp/resin
12K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/tmp
4.0K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/run/mount
8.0K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/run
48K	/var/lib/docker/overlay2/f278e81229574468df2f798e3ffbe576a51c2ad0c752c0b1997fdb33314130ae/diff/
48K	total
```

You can find the diffs for subsequent layers in the same way.

However, whilst this allows you to examine all the layers for an image, the situation changes slightly when an image is used to create a container. At this point, a container can also bind to volumes (persistent data directories across container restarts) and writeable layers that are used only for that container (which are _not_ persistent across container restarts). Volumes are described in a later section dealing with media storage. However, we will show an example here of creating a writeable layer in a container and finding it in the appropriate `/var/lib/docker` directory.

Assuming you're running the source code that goes along with this masterclass, SSH into your device:

```shell
root@debug-device:~# balena ps
CONTAINER ID   IMAGE                                                            COMMAND                  CREATED          STATUS                    PORTS     NAMES
4ce5bebc27c6   3128dae78199                                                     "/usr/bin/entry.sh n…"   27 minutes ago   Up 22 minutes                       backend_5298819_2265201_0a9d4b0e8c1ff1202773ac2104a2bb48
2e2a7fcfe6f6   f0735c857f39                                                     "/usr/bin/entry.sh n…"   27 minutes ago   Up 22 minutes                       frontend_5298818_2265201_0a9d4b0e8c1ff1202773ac2104a2bb48
e593ab6439fe   registry2.balena-cloud.com/v2/04a158f884a537fc1bd11f2af797676a   "/usr/src/app/entry.…"   27 minutes ago   Up 22 minutes (healthy)             balena_supervisor
```

You should see something similar. Let's pick the `backend` service, which in this instance is container `4ce5bebc27c6`. We'll `exec` into it via a `bash` shell, and create a new file. This will create a new writeable layer for the container:

```shell
root@debug-device:~# balena exec -ti 4ce5bebc27c6 /bin/bash
root@4ce5bebc27c6:/usr/src/app# echo 'This is a new, container-only writeable file!' > /mynewfile.txt
root@4ce5bebc27c6:/usr/src/app# cat /mynewfile.txt
This is a new, container-only writeable file!
root@4ce5bebc27c6:/usr/src/app# exit
```

Now we'll determine where this new file has been stored by balenaEngine. Similarly to the images, any writeable layer ends up in the `/var/lib/docker/overlay2/<ID>/diff` directory, but to determine the correct layer ID we need to examine the layer DB for it. We do this by looking in the `/var/lib/docker/image/overlay2/layerdb/mounts` directory, which lists all the currently created containers:

```shell
root@debug-device:~# cd /var/lib/docker/image/overlay2/layerdb/mounts
root@debug-device:~# ls -lh
total 12K
drwxr-xr-x 2 root root 4.0K Aug 19 18:19 2e2a7fcfe6f6416e32b9fa77b3a01265c9fb646387dbf4410ca90147db73a4ff
drwxr-xr-x 2 root root 4.0K Aug 19 18:19 4ce5bebc27c67bc198662cc38d7052e9d7dd3bfb47869ba83a88a74aa498c51f
drwxr-xr-x 2 root root 4.0K Aug 19 18:19 e593ab6439fee4f5003e68e616fbaf3c3dfd7e37838b1e27d9773ecb65fb26c6
```

As you can see, there's a list of all the container IDs of those container that have been created. If we look for the `mount-id` file in the directory for the `backend` container, that will include the layer ID of the layer that has been created. From there, we simply look in the appropriate diff layer directory to find our newly created file (the `awk` command below is to add a newline to the end of the discovered value for clarity reasons):

```shell
root@debug-device:~# cd /var/lib/docker/image/overlay2/layerdb/mounts
root@debug-device:/var/lib/docker/image/overlay2/layerdb/mounts# cat 4ce5bebc27c67bc198662cc38d7052e9d7dd3bfb47869ba83a88a74aa498c51f/mount-id | awk '{ print $1 }'
18d634420eceb9792f57554a5451510c1a3e38efe15552045d9b074c5120ef3c
root@debug-device:/var/lib/docker/image/overlay2/layerdb/mounts# cat /var/lib/docker/overlay2/18d634420eceb9792f57554a5451510c1a3e38efe15552045d9b074c5120ef3c/diff/mynewfile.txt
This is a new, container-only writeable file!
```

**9.2 Restarting balenaEngine**

As with the Supervisor, it's very rare to actually need to carry this out. However, for completeness, should you need to, this again is as simple as carrying out a `systemd` restart with `systemctl restart balena.service`:

```shell
root@debug-device:~# systemctl restart balena.service
root@debug-device:~# systemctl status balena.service
● balena.service - Balena Application Container Engine
     Loaded: loaded (/lib/systemd/system/balena.service; enabled; vendor preset: enabled)
    Drop-In: /etc/systemd/system/balena.service.d
             └─storagemigration.conf
     Active: active (running) since Fri 2022-08-19 19:00:03 UTC; 13s ago
TriggeredBy: ● balena-engine.socket
       Docs: https://www.balena.io/docs/getting-started
   Main PID: 8721 (balenad)
      Tasks: 60 (limit: 1878)
     Memory: 130.2M
     CGroup: /system.slice/balena.service
             ├─4544 /proc/self/exe --healthcheck /usr/lib/balena/balena-healthcheck --pid 4543
             ├─8721 /usr/bin/balenad --experimental --log-driver=journald --storage-driver=overlay2 -H fd:// -H unix:///var/run/balena.so>
             ├─8722 /proc/self/exe --healthcheck /usr/lib/balena/balena-healthcheck --pid 8721
             ├─8744 balena-engine-containerd --config /var/run/balena-engine/containerd/containerd.toml --log-level info
             ├─8922 balena-engine-containerd-shim -namespace moby -workdir /var/lib/docker/containerd/daemon/io.containerd.runtime.v1.lin>
             ├─8941 balena-engine-containerd-shim -namespace moby -workdir /var/lib/docker/containerd/daemon/io.containerd.runtime.v1.lin>
             ├─9337 balena-engine-containerd-shim -namespace moby -workdir /var/lib/docker/containerd/daemon/io.containerd.runtime.v1.lin>
             └─9343 balena-engine-runc --root /var/run/balena-engine/runtime-balena-engine-runc/moby --log /run/balena-engine/containerd/>

Aug 19 19:00:06 debug-device e593ab6439fe[8721]: [info]    Applying target state
Aug 19 19:00:06 debug-device e593ab6439fe[8721]: [debug]   Finished applying target state
Aug 19 19:00:06 debug-device e593ab6439fe[8721]: [success] Device state apply success
Aug 19 19:00:06 debug-device e593ab6439fe[8721]: [info]    Reported current state to the cloud
Aug 19 19:00:14 debug-device balenad[8721]: time="2022-08-19T19:00:14.615648023Z" level=info msg="Container failed to exit within 10s of >
Aug 19 19:00:15 debug-device balenad[8744]: time="2022-08-19T19:00:15.074224040Z" level=info msg="shim reaped" id=e593ab6439fee4f5003e68e>
Aug 19 19:00:15 debug-device balenad[8721]: time="2022-08-19T19:00:15.077066553Z" level=info msg="ignoring event" container=e593ab6439fee>
Aug 19 19:00:16 debug-device balenad[8721]: time="2022-08-19T19:00:16.870509180Z" level=warning msg="Configured runtime \"runc\" is depre>
Aug 19 19:00:16 debug-device balenad[8744]: time="2022-08-19T19:00:16.911032847Z" level=warning msg="runtime v1 is deprecated since conta>
Aug 19 19:00:16 debug-device balenad[8744]: time="2022-08-19T19:00:16.916761744Z" level=info msg="shim balena-engine-containerd-shim star>
```

However, doing so has also had another side-effect. Because the Supervisor is itself comprised of a container, restarting balenaEngine has _also_ stopped and restarted the Supervisor. This is another good reason why balenaEngine should only be stopped/restarted if absolutely necessary.

So, when is absolutely necessary? There are some issues which occasionally occur that might require this.

One example could be due to corruption in the `/var/lib/docker` directory, usually related to:

* Memory exhaustion and investigation
* Container start/stop conflicts

Many examples of these are documented in the support knowledge base, so we will not delve into them here.

**9.3 Quick Troubleshooting Tips**

Here are some quick tips we have found useful when troubleshooting balenaEngine issues.

**Running health check manually.** If you suspect balenaEngine's health check may be failing, a good thing to try is running the check manually:

```shell
root@debug-device:~# /usr/lib/balena/balena-healthcheck
```

On success, this return 0 and will not print any output. But on error, this may provide you more information than you'd get anywhere else.

**Is a pull running?** It's not always obvious that an image pull is really running. A quick way to check this is to look for any `docker-untar` processes:

```shell
root@b96099c:~# ps aux | grep docker-untar
root        2980 91.0  4.1 1267328 40488 ?       Rl   13:28   0:00 docker-untar / /var/lib/docker/overlay2/1f03416754d567ad88d58ea7fd40db3cdc8275c61de63c0ad8aa644bc87bb690/diff
```

This `docker-untar` process is spawned by balenaEngine to decompress the image data as it arrives, so it's a subtle but sure clue that a pull is running.

#### 10. Using the Kernel Logs

There are occasionally instances where a problem arises which is not immediately obvious. In these cases, you might see services fail 'randomly', perhaps attached devices don't behave as they should, or maybe spurious reboots occur.

If an issue isn't apparent fairly soon after looking at a device, the examination of the kernel logs can be a useful check to see if anything is causing an issue.

To examine the kernel log on-device, simply run `dmesg` from the host OS:

```shell
root@debug-device:~# dmesg
[    0.000000] Booting Linux on physical CPU 0x0000000000 [0x410fd083]
[    0.000000] Linux version 5.10.95-v8 (oe-user@oe-host) (aarch64-poky-linux-gcc (GCC) 11.2.0, GNU ld (GNU Binutils) 2.37.20210721) #1 SMP PREEMPT Thu Feb 17 11:43:01 UTC 2022
[    0.000000] random: fast init done
[    0.000000] Machine model: Raspberry Pi 4 Model B Rev 1.2
[    0.000000] efi: UEFI not found.
[    0.000000] Reserved memory: created CMA memory pool at 0x000000001ac00000, size 320 MiB
[    0.000000] OF: reserved mem: initialized node linux,cma, compatible id shared-dma-pool
[    0.000000] Zone ranges:
[    0.000000]   DMA      [mem 0x0000000000000000-0x000000003fffffff]
[    0.000000]   DMA32    [mem 0x0000000040000000-0x000000007fffffff]
[    0.000000]   Normal   empty
[    0.000000] Movable zone start for each node
[    0.000000] Early memory node ranges
[    0.000000]   node   0: [mem 0x0000000000000000-0x000000003e5fffff]
[    0.000000]   node   0: [mem 0x0000000040000000-0x000000007fffffff]
[    0.000000] Initmem setup node 0 [mem 0x0000000000000000-0x000000007fffffff]
[    0.000000] On node 0 totalpages: 517632
[    0.000000]   DMA zone: 4096 pages used for memmap
[    0.000000]   DMA zone: 0 pages reserved
[    0.000000]   DMA zone: 255488 pages, LIFO batch:63
[    0.000000]   DMA32 zone: 4096 pages used for memmap
[    0.000000]   DMA32 zone: 262144 pages, LIFO batch:63
[    0.000000] On node 0, zone DMA32: 512 pages in unavailable ranges
[    0.000000] percpu: Embedded 32 pages/cpu s92376 r8192 d30504 u131072
[    0.000000] pcpu-alloc: s92376 r8192 d30504 u131072 alloc=32*4096
[    0.000000] pcpu-alloc: [0] 0 [0] 1 [0] 2 [0] 3
[    0.000000] Detected PIPT I-cache on CPU0
[    0.000000] CPU features: detected: Spectre-v2
[    0.000000] CPU features: detected: Spectre-v4
[    0.000000] CPU features: detected: ARM errata 1165522, 1319367, or 1530923
[    0.000000] Built 1 zonelists, mobility grouping on.  Total pages: 509440
[    0.000000] Kernel command line: coherent_pool=1M 8250.nr_uarts=0 snd_bcm2835.enable_compat_alsa=0 snd_bcm2835.enable_hdmi=1  smsc95xx.macaddr=DC:A6:32:9E:18:DD vc_mem.mem_base=0x3f000000 vc_mem.mem_size=0x3f600000  dwc_otg.lpm_enable=0 rootfstype=ext4 rootwait dwc_otg.lpm_enable=0 rootwait vt.global_cursor_default=0 console=null cgroup_enable=memory root=UUID=ba1eadef-20c9-4504-91f4-275265fa5dbf rootwait
[    0.000000] cgroup: Enabling memory control group subsystem
[    0.000000] Dentry cache hash table entries: 262144 (order: 9, 2097152 bytes, linear)
[    0.000000] Inode-cache hash table entries: 131072 (order: 8, 1048576 bytes, linear)
[    0.000000] mem auto-init: stack:off, heap alloc:off, heap free:off
[    0.000000] software IO TLB: mapped [mem 0x000000003a600000-0x000000003e600000] (64MB)
[    0.000000] Memory: 1602680K/2070528K available (11392K kernel code, 2022K rwdata, 4460K rodata, 14208K init, 1284K bss, 140168K reserved, 327680K cma-reserved)
[    0.000000] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1
[    0.000000] ftrace: allocating 44248 entries in 173 pages
[    0.000000] ftrace: allocated 173 pages with 5 groups
[    0.000000] rcu: Preemptible hierarchical RCU implementation.
[    0.000000] rcu: 	RCU event tracing is enabled.
[    0.000000] rcu: 	RCU restricting CPUs from NR_CPUS=256 to nr_cpu_ids=4.
[    0.000000] 	Trampoline variant of Tasks RCU enabled.
[    0.000000] 	Rude variant of Tasks RCU enabled.
[    0.000000] 	Tracing variant of Tasks RCU enabled.
[    0.000000] rcu: RCU calculated value of scheduler-enlistment delay is 25 jiffies.
[    0.000000] rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=4
[    0.000000] NR_IRQS: 64, nr_irqs: 64, preallocated irqs: 0
[    0.000000] GIC: Using split EOI/Deactivate mode
[    0.000000] irq_brcmstb_l2: registered L2 intc (/soc/interrupt-controller@7ef00100, parent irq: 10)
[    0.000000] random: get_random_bytes called from start_kernel+0x3a4/0x570 with crng_init=1
[    0.000000] arch_timer: cp15 timer(s) running at 54.00MHz (phys).
[    0.000000] clocksource: arch_sys_counter: mask: 0xffffffffffffff max_cycles: 0xc743ce346, max_idle_ns: 440795203123 ns
[    0.000007] sched_clock: 56 bits at 54MHz, resolution 18ns, wraps every 4398046511102ns
[    0.000332] Console: color dummy device 80x25
[    0.000405] Calibrating delay loop (skipped), value calculated using timer frequency.. 108.00 BogoMIPS (lpj=216000)
[    0.000443] pid_max: default: 32768 minimum: 301
[    0.000643] LSM: Security Framework initializing
[    0.000891] Mount-cache hash table entries: 4096 (order: 3, 32768 bytes, linear)
[    0.000939] Mountpoint-cache hash table entries: 4096 (order: 3, 32768 bytes, linear)
...
```

The rest of the output is truncated here. Note that the time output is in seconds. If you want to display a human readable time, use the `-T` switch. This will, however, strip the nanosecond accuracy and revert to chronological order with a minimum granularity of a second.

Note that the 'Device Diagnostics' tab from the 'Diagnostics' section of a device also runs `dmesg -T` and will display these in the output window. However, due to the sheer amount of information presented here, it's sometimes easier to run it on-device.

Some common issues to watch for include:

* Under-voltage warnings, signifying that a device is not receiving what it requires from the power supply to operate correctly (these warnings are only present on the Raspberry Pi series).
* Block device warnings, which could signify issues with the media that balenaOS is running from (for example, SD card corruption).
* Device detection problems, where devices that are expected to show in the device node list are either incorrectly detected or misdetected.

#### 11. Media Issues

See the [Storage Media Debugging](../../../faq/debugging-storage-media.md) docs for help with debugging media issues.

#### 12. Device connectivity status

See the [Device Connectivity states](../../manage/device-statuses.md#device-connectivity-states) section of our [Device Statuses](../../manage/device-statuses.md) docs to learn about device connectivity statuses.

### Conclusion

In this masterclass, you've learned how to deal with balena devices as a support agent. You should now be confident enough to:

* Request access from a customer and access their device, including 'offline' devices on the same network as one that is 'online'.
* Run diagnostics checks and understand their results.
* Understand the core balenaOS services that make up the system, including the ability to read journals from those services, as well as stopping, starting and restarting them.
* Enable persistent logs, and then examine them when required.
* Diagnose and handle a variety of network issues.
* Understand and work with the `config.json` configuration file.
* Understand the Supervisor's role, including key concepts.
* Understand the balenaEngine's role, including key concepts.
* Be able to look at kernel logs, and determine some common faults.
* Work with media issues, including dealing with full media, working with customer data, and diagnosing corruption issues.
* Understand why your device's status is Online (Heartbeat Only) or Online (VPN Only) and how it can be impacting your app.
