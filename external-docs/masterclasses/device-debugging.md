<!-- 

This masterclass is being generated dynamically.

At build stage, partials being pulled from balenaCloud docs to fill parts of the masterclass 
You can find the section to section related docs referenced in this script https://github.com/balena-io/docs/tree/master/tools/build-masterclass.sh

-->

# Balena Device Debugging Masterclass

## Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes.
To gain the most from this masterclass, we recommend that you first undertake
the following masterclasses:

- [Balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)
- [BalenaOS Masterclass](https://github.com/balena-io/balenaos-masterclass/)

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

- Gain access to a customer device, when permission has been granted
- Retrieve initial diagnostics for the device
- Identify and solve common networking problems
- Work with the Supervisor
- Work with balenaEngine
- Examine the Kernel logs
- Understand media-based issues (such as SD card corruption)
- Understand how heartbeat and the VPN only status affects your devices

Whilst this masterclass is intended for new engineers about to start
support duties at balena, it is also intended to act as an item of interest
to customers who wish to know more about how we initially go about debugging
a device (and includes information that customers themselves could use
to give a support agent more information). We recommend, however, ensuring
balena support is _always_ contacted should you have an issue with a device
that is not working correctly.

**Note:** The balena VPN service was renamed to cloudlink in 2022 in customer facing documentation.

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

- A local copy of this repository [Balena Device Debugging Masterclass](https://github.com/balena-io-projects/debugging-masterclass). This copy can be obtained by either method:
  - `git clone https://github.com/balena-io-projects/debugging-masterclass.git`
  - Download ZIP file (from 'Clone or download'->'Download ZIP') and then unzip it to a suitable directory
- A balena supported device, such as a [balenaFin
  1.1](https://balena.io/fin), [Raspberry Pi
  3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Intel
  NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by
  installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/)
- A suitable shell environment for command execution (such as `bash`)
- A [balenaCloud](https://www.balena.io/) account
- A familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
- An installed instance of the [balena CLI](https://github.com/balena-io/balena-cli/)

## Exercises

The following exercises assume access to a device that has been provisioned.
As per the other masterclasses in this series we're going to assume that's a
Raspberry Pi 4, however you can simply alter the device type as appropriate in the
following instructions. The balena CLI is going to be used instead of the
WebTerminal in the balenaCloud Dashboard for accessing the device, but all of
the exercises could be completed using the WebTerminal if preferred.

First login to your balena account via `balena login`, and then create a new
fleet:

```shell
$ balena fleet create DebugFleet --type raspberrypi4-64 --organization ryanh
Fleet created: slug "ryanh/debugfleet", device type "raspberrypi4-64"
```

Now provision a device by downloading and flashing a _development_ image from the
Dashboard (via Etcher), or by flashing via the command line.

```shell
$ balena os download raspberrypi4-64 --version "2022.7.0.dev" --output balena-debug.img
Getting device operating system for raspberrypi4-64
balenaOS image version 2022.7.0 downloaded successfully
```

**Note:** Above, we used a [balenaOS Extended Support Release (ESR)](https://www.balena.io/docs/reference/OS/extended-support-release/). These ESRs are currently available for many device types, but only on paid plans and balena team member accounts. If you are going through this masterclass on a free plan, just pick the latest release available and the remainder of the guide is still applicable.

Carry out any configuration generation required, should you be using a Wifi
AP and inject the configuration into the image (see
[balena CLI Advanced Masterclass](https://github.com/balena-io-projects/balena-cli-advanced-masterclass#32-configuring-a-provisioning-image)
for more details), or use a configuration for an ethernet connection:

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

For convenience, export a variable to point to the root of this masterclass
repository, as we'll use this for the rest of the exercises, eg:

```shell
$ export BALENA_DEBUGGING_MASTERCLASS=~/debugging-masterclass
```

Finally, push the code in the `multicontainer-app` directory to the fleet:

```shell
$ cd $BALENA_DEBUGGING_MASTERCLASS/multicontainer-app
$ balena push DebugFleet
```

### 1. Accessing a User Device

{{>"masterclass/debugging/access-device"}}

#### 1.1 Granting Support Access to a Support Agent

{{>"masterclass/debugging/support-access-device"}}

### 2. Initial Diagnosis

The balenaCloud Dashboard includes the ability to run diagnostics on
a device to determine its current condition. This should
be the first step in attempting to diagnose an issue without having to
actually access the device via SSH. Ensuring diagnostics and health checks
are examined first ensures that you have a good idea of the state a
device is in before SSHing into it, as well as ensuring that the information can
be accessed later if required (should a device be in a catastrophic state). This
helps significantly in a support post-mortem should one be required.

#### 2.1 Device Health Checks

To run health checks through balenaCloud dashboard, head to the `Diagnostics` tab in the sidebar and click the `Run checks` button to start the tests.

![diagnostics](https://user-images.githubusercontent.com/22801822/154141814-6953717d-f90a-456b-ad51-474b14dcc5e9.png)

This will trigger a set of [health checks](https://www.balena.io/docs/reference/diagnostics#device-health-checks) to run on the device. You should see all the checks as `Succeeded` in the Success column if the device is healthy and there are no obvious faults. 

That's no fun, let's create a fault.

SSH into your device, via `balena ssh <UUID>`, using the appropriate UUID. We want to
SSH into the host OS, as that's where we'll wreak havoc:

```shell
$ balena ssh 9294512
=============================================================
    Welcome to balenaOS
=============================================================
root@9294512:~#
```

We're going to do a couple of things that will show up as problems. Something
you'll often check, and that we'll discuss later, is the state of the balena
Supervisor and balenaEngine.

First of all, we're going to kill the balenaEngine maliciously without letting
it shut down properly:

```shell
root@9294512:~# ps aux | awk '!/awk/ && /balenad/ {print $2}' | xargs kill -9
```

What this does is list the processes running, look for the `balenad` executable
(the balenaEngine itself) and then stop the engine with a `SIGKILL` signal,
which will make it immediately terminate instead of shutting down correctly.
In fact, we'll do it twice. Once you've waited about 30 seconds, run the command
again.

Now if you run the health checks again. After a couple minutes, you'll see the 'check_container_engine`
section has changed:

| Check                  | Status | Notes                                                                                                                                               |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| check_container_engine | Failed | Some container_engine issues detected:                                                                                                              |
|                        |        | test_container_engine_running_now Container engine balena is NOT running                                                                            |
|                        |        | test_container_engine_restarts Container engine balena has 2 restarts and may be crashlooping (most recent start time: Thu 2022-08-18 11:14:32 UTC) |
|                        |        | test_container_engine_responding Error querying container engine:                                                                                   |

Unclean restarts usually mean that the engine crashed abnormally with an issue.
This usually happens when something catastrophic occurs between the Supervisor
and balenaEngine or corruption occurs in the image/container/volume store.
Let's take a look at the journal for balenaEngine (`balena.service`) on the
device:

```shell
root@9294512:~# journalctl --no-pager -n 400 -u balena.service
```

You'll see a _lot_ of output, as the logs don't just show the balenaEngine
output but the output from the Supervisor as well. However, if you search
through the output, you'll see a line like the following:

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

As you can see, these have now been specifically output for the two running
service containers.

If you _only_ want to see balenaEngine output and not from any of the service
containers it is running, use `journalctl -u balena.service -t balenad`. The
`-t` is the shortened form of `--identifier=<id>`, which in this case ensures
that only messages from the `balenad` syslog identifier are shown.

We'll discuss issues with balenaEngine and the Supervisor later in this masterclass.

There are many other health checks that can immediately expose a problem.
For example, warnings on low free memory or disk space can expose problems which
will exhibit themselves as release updates failing to download, or service
containers restarting abnormally (especially if a service runs
unchecked and consumes memory until none is left). We'll also go through some
of these scenarios later in this masterclass.

Checkout the [Diagnostics page](https://www.balena.io/docs/reference/diagnostics) for more information on tests you can run on the device.

### 3. Device Access Responsibilities

When accessing a customer's device you have a number of responsibilities, both
technically and ethically. A customer assumes that the support agent has a level
of understanding and competence, and as such support agents should ensure that
these levels are met successfully.

There are some key points which should be followed to ensure that we are never
destructive when supporting a customer:

- Always ask permission before carrying out non-read actions. This includes
  situations such as stopping/restarting/starting services which are otherwise
  functional (such as the Supervisor). This is _especially_ important in cases
  where this would stop otherwise functioning services (such as stopping
  balenaEngine).
- Ensure that the customer is appraised of any non-trivial non-read actions that
  you are going to take before you carry those actions out on-device. If they
  have given you permission to do 'whatever it takes' to get the device
  running again, you should still pre-empt your actions by communicating this
  clearly.
- During the course of carrying out non-read actions on a device, should the
  customer be required to answer a query before being able to proceed, make it
  clear to them what you have already carried out, and that you need a
  response before continuing. Additionally ensure that any incoming agents
  that may need to access the device have all of your notes and actions up
  to this point, so they can take over in your stead.
- _Never_ reboot a device without permission, especially in cases where it
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

### 4. Accessing a Device using a Gateway Device

{{>"masterclass/debugging/device-gateway-partial"}}

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

{{>"masterclass/debugging/journal-logs"}}

#### 5.2 Persistent Logs

{{>"masterclass/debugging/device-logs-partial"}}

### 6. Determining Networking Issues

{{>"masterclass/debugging/network"}}

### 7. Working with the `config.json` File

{{>"masterclass/debugging/configuration-partial"}}

### 8. Working with the Supervisor

{{>"masterclass/debugging/supervisor"}}

### 9. Working with balenaEngine

{{>"masterclass/debugging/engine"}}

### 10. Using the Kernel Logs

{{>"masterclass/debugging/kernel-logs"}}

### 11. Media Issues

{{>"masterclass/debugging/storage-media"}}

### 12. Device connectivity status

{{>"masterclass/debugging/device-connectivity"}}


## Conclusion

In this masterclass, you've learned how to deal with balena devices as a
support agent. You should now be confident enough to:

- Request access from a customer and access their device, including 'offline'
  devices on the same network as one that is 'online'.
- Run diagnostics checks and understand their results.
- Understand the core balenaOS services that make up the system, including
  the ability to read journals from those services, as well as stopping,
  starting and restarting them.
- Enable persistent logs, and then examine them when required.
- Diagnose and handle a variety of network issues.
- Understand and work with the `config.json` configuration file.
- Understand the Supervisor's role, including key concepts.
- Understand the balenaEngine's role, including key concepts.
- Be able to look at kernel logs, and determine some common faults.
- Work with media issues, including dealing with full media, working with customer data, and diagnosing corruption issues.
- Understand why your device's status is Online (Heartbeat Only) or Online (VPN Only) and how it can be impacting your app.
