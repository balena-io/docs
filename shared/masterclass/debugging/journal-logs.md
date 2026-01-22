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

- `--follow`/`-f` - Continues displaying journal entries until the command is halted
  (eg. with Ctrl-C)
- `--unit=<unitFile>`/`-u <unitFile>` - Specifies the unit file to read journal
  entries for. Without this, all units entries are read.
- `--pager-end`/`-e` - Jump straight to the final entries for a unit.
- `--all`/`-a` - Show all entries, even if long or with unprintable
  characters. This is especially useful for displaying the service container
  logs from user containers when applied to `balena.service`.

A typical example of using `journalctl` might be following a service to see
what's occuring. Here's it for the Supervisor, following journal entries in
real time:

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

Any systemd service can be referenced in the same way, and there are some common
commands that can be used with services:

- `systemctl status <serviceName>` - Will show the status of a service. This
  includes whether it is currently loaded and/or enabled, if it is currently
  active (running) and when it was started, its PID, how much memory it is
  notionally (and beware here, this isn't always the amount of physical
  memory) using, the command used to run it and finally the last set of
  entries in its journal log. Here's example output from the OpenVPN service:

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

- `systemctl start <serviceName>` - Will start a non-running service. Note that
  this will _not_ restart a service that is already running.
- `systemctl stop <serviceName>` - Will stop a running service. If the service
  is not running, this command will not do anything.
- `systemctl restart <serviceName>` - Will restart a running service. If the
  service is not running, this will start it.
- `systemctl daemon-reload` - Will essentially run through the startup process
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
come online, connect to the balenaCloud VPN, download releases and then run
them:

- `chronyd.service` - Responsible for NTP duties and syncing 'real' network
  time to the device. Note that balenaOS versions less than v2.13.0 used
  `systemd-timesyncd.service` as their NTP service, although inspecting it is
  very similar to that of `chronyd.service`.
- `dnsmasq.service` - The local DNS service which is used for all host OS
  lookups (and is the repeater for user service containers by default).
- `NetworkManager.service` - The underlying Network Manager service, ensuring
  that configured connections are used for networking.
- `os-config.service` - Retrieves settings and configs from the API endpoint,
  including certificates, authorized keys, the VPN config, etc.
- `openvpn.service` - The VPN service itself, which connects to the balenaCloud
  VPN, allowing a device to come online (and to be SSHd to and have actions
  performed on it). Note that in balenaOS versions less than v2.10.0 this
  was called `openvpn-resin.service`, but the method for inspecting and
  dealing with the service is the same.
- `balena.service` - The balenaEngine service, the modified Docker daemon fork
  that allows the management and running of service images,
  containers, volumes and networking.
- `balena-supervisor.service` - The {{ $names.company.short }} Supervisor service,
  responsible for the management of releases, including downloading updates of the app and
  self-healing (via monitoring), variables (fleet/device), and exposure of these
  services to containers via an API endpoint.
- `dbus.service` - The DBus daemon socket can be used by services if the
  `io.balena.features.dbus` label is applied. This exposes the DBus daemon
  socket in the container which allows the service to control several
  host OS features, including the Network Manager.

Additionally, there are some utility services that, whilst not required
for a barebones operation, are also useful:

- `ModemManager.service` - Deals with non-Ethernet or Wifi devices, such as
  LTE/GSM modems.
- `avahi-daemon.service` - Used to broadcast the device's local hostname
  (useful in development mode, responds to `balena scan`).

We'll go into several of these services in the following sections, but generally
these are the first points to examine if a system is not behaving as it should,
as most issues will be associated with these services.

Additionally there are a large number of utility services that facilitate the
services above, such as those to mount the correct partitions for data storage,
configuring the Supervisor and running it should it crash, etc.
