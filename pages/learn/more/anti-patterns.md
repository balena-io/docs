---
title: Development Anti-patterns
---

# Anti-patterns, or how to break your balenaOS devices

As you are building your fleet and preparing for production, there are a number of things to keep in mind that can cause problems on a device. Many of these items may seem obvious or even desired, but often cause more trouble than they are worth.

## Networking

One of the biggest causes of issues during deployment is either a misconfigured local network or otherwise a network that does not adhere to the balenaOS [networking requirements](../../reference/OS/network.md#network-requirements).

### Connectivity dependent on container (e.g. kernel module for wifi dongle, or udev rule for modem)

Since there can be cases where containers fail to start, having any networking configuration depend on those containers without a fallback is generally discouraged. Using a project like [wifi-connect](https://github.com/balena-os/wifi-connect) can help configure the networking stack after launch, but devices should be connected as reliably as possible at boot.

### Iptables rules that block supervisor/cloudlink traffic

it is enticing to use custom iptables rules to filter traffic, to limit the surface of the api. those rules combined with host networking however can prevent the supervisor or cloudlink from successfully connecting to balenaCloud, and therefore should be treated with caution. for a full list of networking requirements, consult [this document](../../reference/OS/network.md#network-requirements).

### Manually changing the system clock, or blocking NTP requests

Since balenaOS and the supervisor communicate with balenaCloud using an HTTPS API, it is important that time is synchronized on the device. If the system date/time drifts substantially, SSL certificate validation may fail and the device may unexpectedly lose the ability to reach HTTPS websites or update the balenaCloud web dashboard, and may even no longer be reachable over ssh or cloudlink. BalenaOS provides a [number of mechanisms](../../reference/OS/time.md) to keep time as up-to-date as possible, but ensuring [NTP is accessible over the network](../../reference/OS/network.md#network-requirements) is critical.

## Local storage

### Writing to files in the container file system (and not a volume)

Commonly, users misunderstand the distinction between the container's file system and a volume. Named volumes are preserved across updates unless specifically dereferenced or destroyed, while anything written to the container's file system will be purged during updates to new releases. In addition, the container's file system often uses the AUFS driver, which typically has worse performance both in disk space and CPU utilization when compared to a named volume's standard Linux ext4 file system. For an in-depth comparison of the two, it is recommended to complete the following [services masterclass](masterclasses/services-masterclass.md). Additionally, the [supervisor provides an API](../../reference/supervisor/supervisor-api.md#cleanup-volumes-with-no-references) to manage named volumes.

### Running out of disk space

One of the most common issues moving from a project to a product is considering what is written to local disk. Often, either logs or important data are written locally but without giving thought to the data's lifecycle. It is important to ensure that some mitigations are in place to prevent any local storage from filling. [Some examples include](https://balena.io/blog/how-to-create-a-custom-logging-system-for-longer-log-retention/):

* configuring logrotate
* external logging service
* logging only to stderr/stdout to take advantage of balenaEngine's built-in logging features

If the data partition (`/mnt/data`) fills up completely, balenaEngine may not be able to restart the container on device reboot, new releases may fail to apply, and the only way to recover the device may be by deleting the image through manual intervention, including loss of all data written to the container's file system (named volumes are preserved).

### Excessive writes causing SD / Flash failure / corruption

If the device type uses flash memory or an SD card, any write-heavy workload will cause that storage medium to wear prematurely and may cause devices to crash irrecoverably. Limiting any writing to temporary locations in-memory is one strategy to avoid having to replace SD cards in the field. There are further SD card recommendations [available here](../welcome/production-plan.md#hardware)

## Host OS services

### Modifying the OS image

Any modifications made to the host OS before flashing or at runtime carry undue risk. If the host OS has been modified in some way (other than connection details), any subsequent behavior cannot be guaranteed.

### Modifying the host’s systemd services via D-Bus

While balenaOS provides lots of flexibility in terms of interacting with the host OS via D-Bus, with great power comes great responsibility. Since these interactions can potentially cause balenaOS devices to disconnect from balenaCloud or even fall offline, these API calls should be carefully guarded and carefully considered.

### DoSing the supervisor with API requests

Since the supervisor is the brain of the update process for balenaOS devices, any interactions with the API provided should be carefully considered and rate-limited. If a container engages in denial-of-service style behavior, the supervisor may be unable to recover and perform any necessary updates.

### Incorrect config.txt/config.json settings

These two configuration files are critical for the boot process on most devices. Specifically, a malformed `config.json` will cause any balenaOS devices to not boot properly, and a mangled `config.txt` (on certain Raspberry Pi-based devices) may cause a loss in functionality at boot. There are some tools that can help manage these files across devices, like [configizer](https://github.com/balena-io-playground/configizer) and [dtparam tuneables](../../reference/OS/advanced.md#setting-device-tree-overlays-dtoverlay-and-parameters-dtparam).

## Managing Resources

### Creating a reboot loop

One common anti-pattern is to trigger reboots if some condition is met (using the supervisor API or D-Bus directly). Often this "fix" can cause reboot loops that are unexpected and cause more trouble than they fix. Nearly all components of balenaOS are health-checked and restarted if found to be non-functional, including the [operating system itself](https://balena.io/blog/keeping-your-system-running-watchdog/) (when available).

### Causing an out-of-memory (OOM) scenario

When developing on low-footprint devices or for a heterogeneous fleet, it is easy to forget about managing memory consumption. Due to the nature of [Linux's out-of-memory killer](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html#oom-killer), these events are often difficult to catch and debug. Individual services can be limited by balenaEngine using [directives in `docker-compose.yml`](../../reference/supervisor/docker-compose.md#supported-fields).

## Managing Fleets

### Not pinning base image versions

It is important to make a conscious decision regarding pinning a container's base image to a specific version, for example:

```
FROM debian:bookworm-20250428
```

instead of:

```
FROM debian:bookworm
```

During app development, pinning versions of various components as much as possible prevents pieces from changing unintentionally later on during a redeployment when new versions are silently pulled in (like libraries, OS versions, base images, etc). In the same vein, pinning versions encourages builder cache reuse as components cannot change underneath the build process itself, ensuring a more reliable and repeatable build.
