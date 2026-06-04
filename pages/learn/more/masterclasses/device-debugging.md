# Balena Device Debugging Masterclass

## Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes. To gain the most from this masterclass, we recommend that you first undertake the following masterclasses:

* [Balena CLI Masterclass](../../../external-docs/masterclasses/cli-masterclass.md)
* [BalenaOS Masterclass](../../../external-docs/masterclasses/host-os-masterclass.md)

## Introduction

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

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

* A local copy of the example in our [Balena Device Debugging Masterclass](https://github.com/balena-io-projects/debugging-masterclass) repository. This copy can be obtained by either method:
  * `git clone https://github.com/balena-io-projects/debugging-masterclass.git`
  * Download ZIP file (from 'Clone or download'->'Download ZIP') and then unzip it to a suitable directory
* A balena supported device, such as a [balenaFin 1.1](https://balena.io/fin), [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Intel NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/)
* A suitable shell environment for command execution (such as `bash`)
* A [balenaCloud](https://www.balena.io/) account
* A familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
* An installed instance of the [balena CLI](https://github.com/balena-io/balena-cli/)

## Exercises

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

**Note:** Above, we used a [balenaOS Extended Support Release (ESR)](../../../reference/os/extended-support-release.md). These ESRs are currently available for many device types, but only on paid plans and balena team member accounts. If you are going through this masterclass on a free plan, just pick the latest release available and the remainder of the guide is still applicable.

Carry out any configuration generation required, should you be using a Wifi AP and inject the configuration into the image (see [balena CLI Advanced Masterclass](../../../external-docs/masterclasses/advanced-cli.md#id-3.2-configuring-a-provisioning-image) for more details), or use a configuration for an ethernet connection:

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

## 1. Accessing a User Device

{% include "../../../.gitbook/includes/access-device.md" %}

See: [#granting-support-access-to-a-support-agent](../../accounts/support-access.md#granting-support-access-to-a-support-agent "mention")

## 2. Initial Diagnosis

The balenaCloud Dashboard includes the ability to run diagnostics on a device to determine its current condition. This should be the first step in attempting to diagnose an issue without having to actually access the device via SSH. Ensuring diagnostics and health checks are examined first ensures that you have a good idea of the state a device is in before SSHing into it, as well as ensuring that the information can be accessed later if required (should a device be in a catastrophic state). This helps significantly in a support post-mortem should one be required.

### 2.1 Device Health Checks

To run health checks through balenaCloud dashboard, head to the `Diagnostics` tab in the sidebar and click the `Run checks` button to start the tests.

![diagnostics](https://user-images.githubusercontent.com/22801822/154141814-6953717d-f90a-456b-ad51-474b14dcc5e9.png)

This will trigger a set of [health checks](../../../external-docs/diagnostics.md#device-health-checks) to run on the device. You should see all the checks as `Succeeded` in the Success column if the device is healthy and there are no obvious faults.

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

Checkout the [Diagnostics page](../../../external-docs/diagnostics.md) for more information on tests you can run on the device.

## 3. Device Access Responsibilities

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

## 4. Accessing a Device using a Gateway Device

{% include "../../../.gitbook/includes/device-gateway.md" %}

## 5. Component Checklist

The key to any support is context. As a support agent, you should have enough context from a customer to start an investigation. If you do not, then you should ask for as much context and detail about the device as you can before starting an investigation on the device.

When accessing a device, there are usually some things you can check to see why a device may be in a broken state. Obviously, this depends on the symptoms a customer has reported, as well as those a support agent may have found when running the device diagnostics. However, there are some common issues that can occur to put a device into a broken state that can be quickly fixed.

The following sections discuss some of the first components to check when carrying out on-device support. The components that should be checked and in what order comes down to the context of support, and the symptoms seen.

### 5.1 Service Status and Journal Logs

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

### 5.2 Persistent Logs

See the [Device Logs](../../manage/device-logs.md) docs to learn about persistent logging.

## 6. Determining Networking Issues

For determining networking issues, check out the [Network Debugging masterclass](network-masterclass.md).

## 7. Working with the `config.json` File

See the docs on [Configuring balenaOS](../../../reference/os/configuration.md) to learn about working with the `config.json` file.

## 8. Working with the Supervisor

Service: `balena-supervisor.service`, or `resin-supervisor.service` if OS < v2.78.0

The balena Supervisor is the service that carries out the management of the software release on a device, including determining when to download updates, the changing of variables, ensuring services are restarted correctly, etc. It is the on-device agent for balenaCloud.

As such, it's imperative that the Supervisor is operational and healthy at all times, even when a device is not connected to the Internet, as the Supervisor still ensures the running of a device that is offline.

The Supervisor itself is a Docker service that runs alongside any installed user services and the healthcheck container. One major advantage of running it as a Docker service is that it can be updated just like any other service, although carrying that out is slightly different than updating user containers. (See [Updating the Supervisor](device-debugging.md#82-updating-the-supervisor)).

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

### 8.1 Restarting the Supervisor

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

### 8.2 Updating the Supervisor

Occasionally, there are situations where the Supervisor requires an update. This may be because a device needs to use a new feature or because the version of the Supervisor on a device is outdated and is causing an issue. Usually the best way to achieve this is via a balenaOS update, either from the dashboard or via the command line on the device.

If updating balenaOS is not desirable or a user prefers updating the Supervisor independently, this can easily be accomplished using [self-service](../../../reference/supervisor/supervisor-upgrades/) Supervisor upgrades. Alternatively, this can be programmatically done by using the Node.js SDK method [device.pinToSupervisorRelease](../../../external-docs/sdk/node-sdk/latest/models/device.md#pintosupervisorrelease).

You can additionally write a script to manage this for a fleet of devices in combination with other SDK functions such as [device.getAllByApplication](../../../external-docs/sdk/node-sdk/latest/models/device.md#getallbyapplication).

**Note:** In order to update the Supervisor release for a device, you must have edit permissions on the device (i.e., more than just support access).

### 8.3 The Supervisor Database

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

## 9. Using the Kernel Logs

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

## 10. Media Issues

See the [Storage Media Debugging](../../../faq/debugging-storage-media.md) docs for help with debugging media issues.

## 11. Device connectivity status

See the [Device Connectivity states](../../manage/device-statuses.md#device-connectivity-states) section of our [Device Statuses](../../manage/device-statuses.md) docs to learn about device connectivity statuses.

## Conclusion

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
