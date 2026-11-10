---
description: >-
  Balena uses semantic versioning for our OS releases, however major changes
  between versions are not typically breaking changes for most users, but rather
  changes to internal libraries or components.
icon: clock-rotate-left
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: false
  outline:
    visible: true
  pagination:
    visible: false
  metadata:
    visible: false
  tags:
    visible: true
  actions:
    visible: true
  anchors:
    visible: true
---

# balenaOS Release Notes

{% updates format="full" %}
{% update date="2026-08-20" %}
## balenaOS v8

The major change in balenaOS v8 is that the default partition size has increased. New device types introduced after the release of balenaOS v8 will get larger partitions by default, but existing device types, along with provisioned devices updating from versions prior to v8, will keep their standard partitions.

In practice this should have no immediate effect, but it does open the door for upcoming features to take advantage of the increased size.
{% endupdate %}

{% update date="2026-04-23" %}
## balenaOS v7

The major change in balenaOS v7 was to begin mounting the root filesystem as read-only. With mobynit v1.0.0 in balenaOS v7, the hostapp container layers are mounted exclusively as overlay lowerdirs, which are read-only by construction. This means:

* `mount -o remount, rw /` will no longer work
* Writes to `/etc/`, `/usr/`, `/lib/`, or any path on the rootfs will fail.&#x20;
* Tools that modify system configuration files in place will fail

<a href="https://blog.balena.io/introducing-balenaos-v7-read-only-root-by-design/" class="button primary">Read v7 blog post</a>
{% endupdate %}

{% update date="2024-08-12" %}
## balenaOS v6

balenaOS v6 introduced module compression by default across all device types. This traded a small amount of compute power when loading modules for a large space savings.&#x20;

Only users loading kernel modules shipped with balenaOS from inside a container, such as by using the `io.balena.features.kernel-modules` label to bind mount the host OS modules directory into a container followed by an explicit file path load (such as using insmod) are potentially affected

<a href="https://blog.balena.io/introducing-balenaos-6/" class="button primary">Read v6 blog post</a>
{% endupdate %}

{% update date="2023-11-30" %}
## balenaOS v5 <a href="#docs-internal-guid-affea982-7fff-1824-7778-06a71a4ba479" id="docs-internal-guid-affea982-7fff-1824-7778-06a71a4ba479"></a>

The main change in balenaOS v5 was a major Supervisor update.
{% endupdate %}

{% update date="2023-09-15" %}
## balenaOS v4

The balenaOS v4 major update had no breaking changes from v3. It was triggered by a major automation dependency update.
{% endupdate %}

{% update date="2023-07-06" %}
## balenaOS v3

The major change in balenaOS v3 was in how kernel headers were handled. Running `make modules_prepare` was optional in balenaOS v2 but running `make modules_prepare` before use was mandatory in balenaOS v3. BalenaOS v3 also removes the alternative kernel-source kernel headers artifact. Previous users of `kernel-source` must now modify their application to use `kernel-modules-headers` instead.
{% endupdate %}

{% update date="2019-10-07" %}
## balenaOS v2

balenaOS v2 (originally named resinOS v2) was the first stand-alone version of balenaOS, rather than a component of the resin.io platform. Major changes included:

* AUFS replaced BTRFS as the data partition filesystem.
* Network Manager replaced ConnMan.

All balenaOS versions numbered 2.50 and below reached their official end-of-life on March 31, 2026.
{% endupdate %}

{% update date="2014-04-08" %}
## resinOS v1

The OS was originally named resinOS before being renamed to balenaOS in October 2018 when Resin.io officially became balena. Version 1 was deprecated as of May 1, 2019.
{% endupdate %}
{% endupdates %}
