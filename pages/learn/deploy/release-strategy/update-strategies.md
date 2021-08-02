---
title: Application update strategy
excerpt: Choosing an update strategy for your {{ $names.company.lower }} devices
---

# Controlling the update strategy

With the {{ $names.company.lower }} device supervisor version 1.3, we added the ability to choose the update strategy on devices, that is, the order and way in which the steps to perform an update are executed. You can check whether your Supervisor has the appropriate version in the "Supervisor version" entry in the device dashboard page.
These update strategies allow users to choose between four modes that are suited for different applications, depending on available resources and the possible need to have a container running at all times.

Update strategies are selected using [Fleet Configuration environment variables][fleet-envs]. The two variables that are involved are

* `BALENA_SUPERVISOR_UPDATE_STRATEGY` and
* `BALENA_SUPERVISOR_HANDOVER_TIMEOUT`.

Setting `BALENA_SUPERVISOR_UPDATE_STRATEGY` to a valid value selects the update strategy. The possible values are:

* [`download-then-kill`](#download-then-kill),
* [`kill-then-download`](#kill-then-download),
* [`delete-then-download`](#delete-then-download), and
* [`hand-over`](#hand-over),

which are explained below. `BALENA_SUPERVISOR_HANDOVER_TIMEOUT` is only used in the  `hand-over` strategy, and its use is explained in the [strategy's description](#hand-over).

All update strategies below honor the [application update locks][update-locks] which you can use prevent updates temporarily.

## download-then-kill

This is the default strategy, and it is selected if the variable is not set or if it has an invalid value. Its behavior corresponds to the way balena traditionally works:

* When an update is available, the Supervisor downloads the new container image.
* Once the download is complete, the Supervisor kills the container for the old version.
* Immediately afterwards, the Supervisor creates and starts the container for the new version, and then deletes the old image.

This strategy is suited for the general case of container update, where resources are not particularly constrained (as pulling the new image while the old container runs takes up some extra RAM), and when a zero-downtime update is not necessary but we still want to keep downtime to a minimum.

## kill-then-download

This strategy is meant for resource-constrained scenarios or when the images be pulled are particularly large, so we need to keep RAM usage to the minimum, albeit at the cost of some extra downtime.
It works as follows:

* When an update is available, the Supervisor kills the container for the old version.
* After this, the Supervisor downloads the image for the new version.
* Once the download is complete, the Supervisor creates and starts the new container, and deletes the old image from disk.

## delete-then-download

This strategy is meant for resource-constrained scenarios or when the images be pulled are particularly large, so we need to keep disk usage to the minimum, albeit at the cost of a extra downtime and higher bandwidth usage.
It works as follows:

* When an update is available, the Supervisor kills the container for the old version, and then deletes the corresponding image.
* After this, the Supervisor downloads the image for the new version.
* Once the download is complete, the Supervisor creates and starts the new container.

**Note: Requires Supervisor >= v2.5.1**

## hand-over

This strategy is suited for scenarios where there are enough resources and it is critical that the downtime is *zero*, that is, that the app runs continually even during an update.
For this strategy to work properly, the user has to consider the way the update works and include code to perform a handover between the old and new versions of the application.
Its behavior is as follows:

* When an update is available, the Supervisor downloads the new image.
* When the download is complete, the Supervisor creates and starts the new container, *without killing the old one*.
* The old and new applications should communicate between each other so that the old one frees any resources that the new one needs (e.g. device files, database locks, etc) and the new version can start running fully.
* Once this "handover" is performed, the application (old or new) must signal to the Supervisor that the old version is ready to be killed, by creating a file at `/data/resin-kill-me`.
* When the Supervisor detects that the file has been created, the Supervisor kills the old container and deletes it from disk.
* If the file is not created after a time defined in `BALENA_SUPERVISOR_HANDOVER_TIMEOUT`, the Supervisor kills the old version.

The `BALENA_SUPERVISOR_HANDOVER_TIMEOUT` variable defines this timeout in milliseconds, and defaults to 60000 (i.e. 1 minute).
The communication between the old and new versions has to be implemented by the user in whatever way they see fit, for example by having the old version listen on a socket or port and having an endpoint for the new version to announce it's ready to take over. It is important to note that both versions will share the `/data` folder and network namespace, so they can use any of those to communicate.

[update-locks]:/learn/deploy/release-strategy/update-locking/
[fleet-envs]:/learn/manage/configuration/
