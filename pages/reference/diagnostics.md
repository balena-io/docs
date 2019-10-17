# Check Descriptions

As part of the diagnostics suite, you will find a group of checks that can be collectively run on-device. Below is a
description of each check and what each means or how to triage.

A `check` in this context is defined as a function that returns a result (good/bad status plus some descriptive text), whereas a
command is simply a data collection tool without any filtering or logic built in. Checks are intended to be used by
everyone, while typically command output is used by support/subject matter experts and power users.

### check_balenaOS
#### Summary
This check confirms that the version of balenaOS is >2.x. There is further confirmation that the OS release has not since
been yanked.

As of May 1, 2019, `balenaOS 1.x` has been deprecated. These OSes are now unsupported. For more information, read our
blog post: https://www.balena.io/blog/all-good-things-come-to-an-end-including-balenaos-1-x/.

#### Triage
Upgrade your device to the latest `balenaOS 2.x` (contact support if running 1.x).

### check_under_voltage
#### Summary
Often seen on Raspberry Pi devices, these kernel messages indicate that the power supply is insufficient for the device and any peripherals that might be attached. These errors also precede seemingly erratic behavior.

#### Triage
Replace the power supply with a known-good supply (supplying at least 5V / >2.5A).

### check_memory
#### Summary
This check simply confirms that a given device is running at a given memory threshold (set to 90% at the moment).
Oversubsribed memory can lead to OOM events (learn more about the out-of-memory killer
[here](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html#oom-killer)).

#### Triage
Using a tool like `top`, scan the process table for which process(es) are consuming the most memory (`%VSZ`) and check
for memory leaks in those applications.

### check_container_engine
#### Summary
This check confirms the container engine is up and healthy. Additionally, this check confirms that there have been no
unclean restarts of the engine. These restarts could be caused by crashlooping. The container engine is an integral part
of the balenaCloud pipeline.

#### Triage
It is best to let balena's support team take a look before restarting the container engine. At the very least, take a
diagnostics snapshot before restarting anything.

### check_supervisor
#### Summary
This check confirms the supervisor is up and healthy. The supervisor is an integral part of the balenaCloud pipeline.
The supervisor depends on the container engine being healthy (see [check_container_engine](#check_container_engine)).

#### Triage
It is best to let balena's support team take a look before restarting the supervisor. At the very least, take a
diagnostics snapshot before restarting anything.

### check_dns
#### Summary
Misconfigured DNS can often cause network issues if the local `dnsmasq` instance is bypassed. In the hostOS, the
aforementioned instance should always be the first entry.

#### Triage
Contact support to investigate further.

### check_diskspace
#### Summary
This check simply confirms that a given device is running beneath a given disk utilization threshold (set to 90% at the moment).
If a local disk fills up, there are often knock-on issues in the supervisor and application containers.

#### Triage
Run `du -a /mnt/data/docker | sort -nr | head -10` in the hostOS shell to list the ten largest files and directories.
If the results indicate large files in `/mnt/data/docker/containers`, this result often indicates a leakage in an
application container that can be cleaned up (runaway logs, too much local data, etc).

### check_write_latency
#### Summary
This check compares each partition's average write latency to a predefined target.

#### Triage
Slow disk writes could indicate faulty hardware or heavy disk I/O. It is best to investigate the hardware further for
signs of degradation.

### check_service_restarts
#### Summary
This check interrogates the engine to see if any services are restarting uncleanly/unexpectedly.

#### Triage
Investigate the logs of whichever service(s) are restarting uncleanly; this issue could be a bug in the error handling
or start-up of the aforementioned unhealthy services.

### check_timesync
#### Summary
This check confirms that the system clock is actively disciplined.

#### Triage
Confirm that NTP is not blocked at the network level, and that any specified upstream NTP servers are accessible. If
absolutely necessary, it is possible to temporarily sync the clock using HTTP headers (though this change will not
persist across reboots).

#### DIAGNOSE_VERSION=4.8.0
