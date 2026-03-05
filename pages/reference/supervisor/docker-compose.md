---
title: docker-compose.yml fields
excerpt: docker-compose.yml fields supported by balena
---

# docker-compose.yml fields

Our compose-file support is currently based on [version 2.4](https://docs.docker.com/compose/compose-file/compose-versioning/#version-24), as such any fields that were introduced in version 3 are not supported.

## Supported fields

| Field                                                                                             | Details                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [build](https://docs.docker.com/reference/compose-file/build/)                                    | when using a path it must point to project/app subfolders. URLs to git repositories are not currently supported.                                        |
| [build.args](https://docs.docker.com/reference/compose-file/build/#args)                          |                                                                                                                                                         |
| [build.cache\_from](https://docs.docker.com/reference/compose-file/build/#cache_from)             |                                                                                                                                                         |
| [build.context](https://docs.docker.com/reference/compose-file/build/#context)                    | must point to project/app subfolders. URLs to git repositories are not currently supported.                                                             |
| [build.dockerfile](https://docs.docker.com/reference/compose-file/build/#dockerfile)              |                                                                                                                                                         |
| [build.extra\_hosts](https://docs.docker.com/reference/compose-file/build/#extra_hosts)           |                                                                                                                                                         |
| [build.labels](https://docs.docker.com/reference/compose-file/build/#labels)                      |                                                                                                                                                         |
| [build.shm\_size](https://docs.docker.com/reference/compose-file/build/#shm_size)                 |                                                                                                                                                         |
| [build.target](https://docs.docker.com/reference/compose-file/build/#target)                      | currently incompatible with [Livepush](../../learn/develop/local-mode.md#livepush)                                                                      |
| [cap\_add](https://docs.docker.com/reference/compose-file/services/#cap_add)                      |                                                                                                                                                         |
| [cap\_drop](https://docs.docker.com/reference/compose-file/services/#cap_drop)                    |                                                                                                                                                         |
| [cgroup\_parent](https://docs.docker.com/reference/compose-file/services/#cgroup_parent)          |                                                                                                                                                         |
| [command](https://docs.docker.com/reference/compose-file/services/#command)                       |                                                                                                                                                         |
| [cpu\_quota](https://docs.docker.com/reference/compose-file/services/#cpu_quota)                  |                                                                                                                                                         |
| [cpu\_shares](https://docs.docker.com/reference/compose-file/services/#cpu_shares)                |                                                                                                                                                         |
| [cpuset](https://docs.docker.com/reference/compose-file/services/#cpuset)                         |                                                                                                                                                         |
| [depends\_on](https://docs.docker.com/reference/compose-file/services/#depends_on)                | Only array form and `service_started` condition                                                                                                         |
| [devices](https://docs.docker.com/reference/compose-file/services/#devices)                       |                                                                                                                                                         |
| [dns](https://docs.docker.com/reference/compose-file/services/#dns)                               |                                                                                                                                                         |
| [dns\_opt](https://docs.docker.com/reference/compose-file/services/#dns_opt)                      |                                                                                                                                                         |
| [dns\_search](https://docs.docker.com/reference/compose-file/services/#dns_search)                |                                                                                                                                                         |
| [domainname](https://docs.docker.com/reference/compose-file/services/#domainname)                 |                                                                                                                                                         |
| [entrypoint](https://docs.docker.com/reference/compose-file/services/#entrypoint)                 |                                                                                                                                                         |
| [environment](https://docs.docker.com/reference/compose-file/services/#environment)               |                                                                                                                                                         |
| [extra\_hosts](https://docs.docker.com/reference/compose-file/services/#extra_hosts)              |                                                                                                                                                         |
| [group\_add](https://docs.docker.com/reference/compose-file/services/#group_add)                  |                                                                                                                                                         |
| [healthcheck](https://docs.docker.com/reference/compose-file/services/#healthcheck)               |                                                                                                                                                         |
| [hostname](https://docs.docker.com/reference/compose-file/services/#hostname)                     |                                                                                                                                                         |
| [image](https://docs.docker.com/reference/compose-file/services/#image)                           |                                                                                                                                                         |
| [ipc](https://docs.docker.com/reference/compose-file/services/#ipc)                               |                                                                                                                                                         |
| [labels](https://docs.docker.com/reference/compose-file/services/#labels)                         |                                                                                                                                                         |
| [mac\_address](https://docs.docker.com/reference/compose-file/services/#mac_address)              |                                                                                                                                                         |
| [mem\_limit](https://docs.docker.com/reference/compose-file/services/#mem_limit)                  |                                                                                                                                                         |
| [mem\_reservation](https://docs.docker.com/reference/compose-file/services/#mem_reservation)      |                                                                                                                                                         |
| [network\_mode](https://docs.docker.com/reference/compose-file/services/#network_mode)            | Only support `bridge`, `host`, `service:[service name]`, or none                                                                                        |
| [networks](https://docs.docker.com/reference/compose-file/services/#networks)                     | Only support specifying network names                                                                                                                   |
| [oom\_kill\_disable](https://docs.docker.com/reference/compose-file/services/#oom_kill_disable)   |                                                                                                                                                         |
| [oom\_score\_adj](https://docs.docker.com/reference/compose-file/services/#oom_score_adj)         |                                                                                                                                                         |
| [pid](https://docs.docker.com/reference/compose-file/services/#pid)                               | Only support `host` or none                                                                                                                             |
| [pids\_limit](https://docs.docker.com/reference/compose-file/services/#pids_limit)                |                                                                                                                                                         |
| [ports](https://docs.docker.com/reference/compose-file/services/#ports)                           |                                                                                                                                                         |
| [privileged](https://docs.docker.com/reference/compose-file/services/#privileged)                 |                                                                                                                                                         |
| [read\_only](https://docs.docker.com/reference/compose-file/services/#read_only)                  |                                                                                                                                                         |
| [restart](https://docs.docker.com/reference/compose-file/services/#restart)                       | Defaults to `always`                                                                                                                                    |
| [security\_opt](https://docs.docker.com/reference/compose-file/services/#security_opt)            |                                                                                                                                                         |
| [shm\_size](https://docs.docker.com/reference/compose-file/services/#shm_size)                    |                                                                                                                                                         |
| [stop\_grace\_period](https://docs.docker.com/reference/compose-file/services/#stop_grace_period) |                                                                                                                                                         |
| [stop\_signal](https://docs.docker.com/reference/compose-file/services/#stop_signal)              |                                                                                                                                                         |
| [sysctls](https://docs.docker.com/reference/compose-file/services/#sysctls)                       |                                                                                                                                                         |
| [tmpfs](https://docs.docker.com/reference/compose-file/services/#tmpfs)                           |                                                                                                                                                         |
| [ulimits](https://docs.docker.com/reference/compose-file/services/#ulimits)                       |                                                                                                                                                         |
| [user](https://docs.docker.com/reference/compose-file/services/#user)                             |                                                                                                                                                         |
| [userns\_mode](https://docs.docker.com/reference/compose-file/services/#userns_mode)              |                                                                                                                                                         |
| [volumes](https://docs.docker.com/reference/compose-file/services/#volumes)                       | Only support short syntax and named volumes. Bind mounts are not supported, except for as allowed by balena specific [labels](docker-compose.md#labels) |
| [working\_dir](https://docs.docker.com/reference/compose-file/services/#working_dir)              |                                                                                                                                                         |

## Known unsupported fields

| Field                                                                                                                                                  | Details                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [blkio\_config](https://docs.docker.com/reference/compose-file/services/#blkio_config)                                                                 |                                                                                    |
| [build.isolation](https://docs.docker.com/reference/compose-file/build/#isolation)                                                                     |                                                                                    |
| [build.network](https://docs.docker.com/reference/compose-file/build/#network)                                                                         |                                                                                    |
| [container\_name](https://docs.docker.com/reference/compose-file/services/#container_name)                                                             | Used by the device supervisor                                                      |
| [cpu\_count](https://docs.docker.com/reference/compose-file/services/#cpu_count)                                                                       |                                                                                    |
| [cpu\_percent](https://docs.docker.com/reference/compose-file/services/#cpu_percent)                                                                   |                                                                                    |
| [cpus](https://docs.docker.com/reference/compose-file/services/#cpus)                                                                                  | Introduced by Docker Compose v2.2 and therefore not working                        |
| [env\_file and service.env\_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) |                                                                                    |
| [expose](https://docs.docker.com/reference/compose-file/services/#expose)                                                                              | Informational only. Removed to prevent conflicts with other network configurations |
| [external\_links](https://docs.docker.com/reference/compose-file/services/#external_links)                                                             |                                                                                    |
| [isolation](https://docs.docker.com/reference/compose-file/services/#isolation)                                                                        |                                                                                    |
| [links](https://docs.docker.com/reference/compose-file/services/#links)                                                                                |                                                                                    |
| [logging](https://docs.docker.com/reference/compose-file/services/#logging)                                                                            |                                                                                    |
| [mem\_swappiness](https://docs.docker.com/reference/compose-file/services/#mem_swappiness)                                                             |                                                                                    |
| [memswap\_limit](https://docs.docker.com/reference/compose-file/services/#memswap_limit)                                                               |                                                                                    |
| [runtime](https://docs.docker.com/reference/compose-file/services/#runtime)                                                                            |                                                                                    |
| [scale](https://docs.docker.com/reference/compose-file/services/#scale)                                                                                |                                                                                    |
| [stdin\_open](https://docs.docker.com/reference/compose-file/services/#stdin_open)                                                                     |                                                                                    |
| [tty](https://docs.docker.com/reference/compose-file/services/#tty)                                                                                    |                                                                                    |
| [volume\_driver](https://docs.docker.com/reference/compose-file/volumes/#driver)                                                                       |                                                                                    |
| [volumes\_from](https://docs.docker.com/reference/compose-file/services/#volumes_from)                                                                 |                                                                                    |

## Known unsupported features

| Feature                                                                                      | Details |
| -------------------------------------------------------------------------------------------- | ------- |
| [variable substitution](https://docs.docker.com/reference/dockerfile/#variable-substitution) |         |

## Labels

{% include "../../.gitbook/includes/labels-version-note.md" %}

| Label                             | Default            | Description                                                                                                                                                                                                                                                                | Supervisor | balenaOS\* |
| --------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- |
| io.balena.features.balena-socket  | false              | Bind mounts the balena container engine socket into the container and sets the environment variable `DOCKER_HOST` with the socket location for use by docker clients.                                                                                                      | v7.23.0    | v2.21.0    |
| io.balena.features.dbus           | false              | Bind mounts the host OS dbus into the container using `/run/dbus:/host/run/dbus`.                                                                                                                                                                                          | v7.23.0    | v2.21.0    |
| io.balena.features.sysfs          | false              | Bind mounts the host OS `/sys` into the container.                                                                                                                                                                                                                         | v10.8.0    | v2.48.0    |
| io.balena.features.procfs         | false              | Bind mounts the host OS `/proc` into the container.                                                                                                                                                                                                                        | v10.8.0    | v2.48.0    |
| io.balena.features.kernel-modules | false              | Bind mounts the host OS `/lib/modules` into the container (i.e. `/lib/modules:/lib/modules`).                                                                                                                                                                              | v7.23.0    | v2.21.0    |
| io.balena.features.firmware       | false              | Bind mounts the host OS `/lib/firmware` into the container.                                                                                                                                                                                                                | v7.23.0    | v2.21.0    |
| io.balena.features.journal-logs   | false              | Bind mounts journal log directories `/var/log/journal` and `/run/log/journal` as well as `/etc/machine-id` in read only mode. Required by some logging agents such as `promtail`. Journal logs can be read using libraries such as `sd-journal` in C or `sdjournal` in Go. | v12.0.1    | v2.61.0    |
| io.balena.features.extra-firmware | false              | Enables the service to provide [extra firmware](../../learn/develop/extra-firmware.md) files to the host OS. Use this with the extra firmware block to add Linux firmware without depending on an OS release.                                                              | v17.5.2    | v6.10.7    |
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
