---
title: Moving to {{ $names.os.lower }} 2.x
excerpt: How to migrate code from {{ $names.os.lower }} 1.x to 2.0 and what to watch out for
---
# Migrating from 1.x to 2.x

In {{ $names.os.lower }} 2.x, a number of changes were introduced to improve reliability and connectivity. This guide will highlight some of the major changes and how those changes may affect your code.

Perhaps one of the largest changes in 2.x is the change in the connection manager. {{ $names.os.upper }} now uses [**NetworkManager**][networkmanager-link] and [**ModemManager**][modemmanager-link] to provide a robust and flexible networking stack. This change has enabled much more simple and effective [GSM/cellular connectivity](/deployment/network/2.0/#cellular-modem-setup) and overall [simpler network configuration](/deployment/network/2.0/#introduction) process. However, this change has meant we had to remove the old connection manager [**ConnMan**][connman-link] and deprecate its interfaces.

What this means for you:
1. Your WiFi credentials will be preserved when you migrate from **ConnMan** to **NetworkManager**, so you will not lose your network connection.
2. The `/var/lib/connman` directory will no longer be available in your app container.
3. Any dbus calls to **ConnMan** will fail as the service no longer exists on the host OS.
4. If your application makes use of [**WiFi Connect**][wifi-connect-link] then you will need to update to version [2.0.5]({{ $links.githubMain }}/wifi-connect/releases/tag/v2.0.5). Note that this version is backward compatible, so will run on both 1.x and 2.x versions of {{ $names.os.lower }}.

Another significant change is in the way the container [update locking mechanism][update-locks-link] behaves. In {{ $names.os.lower }} 2.x update lock now needs to be created in `/tmp/{{ $names.company.short }}/`. The reason for this change is to fix an issue in the locking mechanism over device power cycle where the {{ $names.company.lower }} supervisor would not be able to determine if the lock was originally taken by itself or a user container before the power was pulled. So in this case the supervisor would remove the lock and erroneously update the container that should have been locked.

To prevent this case from happening, the lock is now written to a `tmpfs` which means its automatically cleared when the power is cut. What this means for your code is that it will need to always take the lock as soon as its container is started up. In this way it can ensure it will never be updated until the lock is [overridden from the dashboard](/learn/manage/actions/#update-locking) or your code.

Other smaller, but important changes to note are the following:
- `/host_run/dbus` has now been moved to `/host/run/dbus`. This newer path was actually introduced in devices that are running {{ $names.company.lower }} supervisor `1.7.0` or greater, so in most case you should be able to just update the path and your code will work for both 1.x and 2.x devices.

- The device `UUID` has been shortened from 31-bytes to 16-bytes to be a bit more standards compliant. This can cause some issues with external scripts or regex which rely on a set `UUID` length.

- If you use {{ $names.company.lower }} base images, you may notice that the hostname changes from `<device_type>-<short_uuid>` to just `<short_uuid>`, however, if you update to the latest version of your respective base image, the hostname will remain `<device_type>-<short_uuid>`. If you are interested in how the hostname is generated checkout this [bit of code in **GitHub**]({{ $links.githubMain }}-library/base-images/pull/256/files#diff-f1f5c90c015964785192b51de0187522R9). It's also important to know if you set a customized hostname in your config.json, this hostname will also be reflected as part of your container hostname.

- If you rely on some {{ $names.company.lower }} CLI functionality e.g.: `{{ $names.company.short }} sync` or `{{ $names.company.short }} ssh`, you will need update to at least version 5.7.0 to work with 2.x devices.

- It's also important to note that the {{ $names.os.lower }} versioning scheme has changed a bit in the 2.x series and any code that relies on parsing the OS version should take care in these cases. An example of the new scheme is `balenaOS 2.26.0-beta0+rev1 (prod)` and you can find more detail on how the versioning works [here]({{ $links.githubOS }}/meta-balena#versioning).


<!-- links -->
[connman-link]: https://en.wikipedia.org/wiki/ConnMan
[networkmanager-link]:https://developer.gnome.org/NetworkManager/
[modemmanager-link]:https://www.freedesktop.org/wiki/Software/ModemManager/
[wifi-connect-link]:{{ $links.githubMain }}/wifi-connect/
[update-locks-link]:/runtime/update-locking/
