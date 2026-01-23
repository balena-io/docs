---
title: labels
---

| Label                             | Default            | Description                                                                                                                                                                                                                                                                | Supervisor | balenaOS\* |
| --------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- |
| io.balena.features.balena-socket  | false              | Bind mounts the balena container engine socket into the container and sets the environment variable `DOCKER_HOST` with the socket location for use by docker clients.                                                                                                      | v7.23.0    | v2.21.0    |
| io.balena.features.dbus           | false              | Bind mounts the host OS dbus into the container using `/run/dbus:/host/run/dbus`.                                                                                                                                                                                          | v7.23.0    | v2.21.0    |
| io.balena.features.sysfs          | false              | Bind mounts the host OS `/sys` into the container.                                                                                                                                                                                                                         | v10.8.0    | v2.48.0    |
| io.balena.features.procfs         | false              | Bind mounts the host OS `/proc` into the container.                                                                                                                                                                                                                        | v10.8.0    | v2.48.0    |
| io.balena.features.kernel-modules | false              | Bind mounts the host OS `/lib/modules` into the container (i.e. `/lib/modules:/lib/modules`).                                                                                                                                                                              | v7.23.0    | v2.21.0    |
| io.balena.features.firmware       | false              | Bind mounts the host OS `/lib/firmware` into the container.                                                                                                                                                                                                                | v7.23.0    | v2.21.0    |
| io.balena.features.journal-logs   | false              | Bind mounts journal log directories `/var/log/journal` and `/run/log/journal` as well as `/etc/machine-id` in read only mode. Required by some logging agents such as `promtail`. Journal logs can be read using libraries such as `sd-journal` in C or `sdjournal` in Go. | v12.0.1    | v2.61.0    |
| io.balena.features.supervisor-api | false              | Ensures that `BALENA_SUPERVISOR_HOST`, `BALENA_SUPERVISOR_PORT`, `BALENA_SUPERVISOR_ADDRESS`, and `BALENA_SUPERVISOR_API_KEY` are added to the container environment variables, so the supervisor API can be used.                                                         | v7.23.0    | v2.21.0    |
| io.balena.features.balena-api     | false              | When enabled, it will make sure that `BALENA_API_KEY` is added to the container environment variables.                                                                                                                                                                     | v7.23.0    | v2.21.0    |
| io.balena.update.strategy         | download-then-kill | Set the fleet update strategy.                                                                                                                                                                                                                                             | v7.23.0    | v2.21.0    |
| io.balena.update.handover-timeout | 60000              | Time, in milliseconds, before an old container is automatically killed. Only used with the `hand-over` update strategy.                                                                                                                                                    | v7.23.0    | v2.21.0    |

\* balenaOS versions that ship with a compatible device supervisor version as per [balenaOS Changelog](https://github.com/balena-os/meta-balena/blob/master/CHANGELOG.md).

These labels are applied to a specific service with the `labels:` setting:

```yaml
labels:
  io.balena.features.balena-socket: '1'
  io.balena.features.kernel-modules: '1'
  io.balena.features.firmware: '1'
  io.balena.features.dbus: '1'
  io.balena.features.sysfs: '1'
  io.balena.features.procfs: '1'
  io.balena.features.journal-logs: '1'
  io.balena.features.supervisor-api: '1'
  io.balena.features.balena-api: '1'
  io.balena.update.strategy: download-then-kill
  io.balena.update.handover-timeout: ''
```
