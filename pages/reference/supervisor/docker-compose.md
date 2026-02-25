---
title: docker-compose.yml fields
excerpt: docker-compose.yml fields supported by balena
---

# docker-compose.yml fields

Our compose-file support is currently based on [version 2.4](https://docs.docker.com/compose/compose-file/compose-versioning/#version-24), as such any fields that were introduced in version 3 are not supported.

## Supported fields

| Field                                                                                                       | Details                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [build](https://docs.docker.com/compose/compose-file/compose-file-v2/#build)                                | when using a path it must point to project/app subfolders. URLs to git repositories are not currently supported.                                        |
| [build.context](https://docs.docker.com/compose/compose-file/compose-file-v2/#context)                      | must point to project/app subfolders. URLs to git repositories are not currently supported.                                                             |
| [build.dockerfile](https://docs.docker.com/compose/compose-file/compose-file-v2/#dockerfile)                |                                                                                                                                                         |
| [build.args](https://docs.docker.com/compose/compose-file/compose-file-v2/#args)                            |                                                                                                                                                         |
| [build.cache\_from](https://docs.docker.com/compose/compose-file/compose-file-v2/#cache_from)               |                                                                                                                                                         |
| [build.extra\_hosts](https://docs.docker.com/compose/compose-file/compose-file-v2/#extra_hosts)             |                                                                                                                                                         |
| [build.labels](https://docs.docker.com/compose/compose-file/compose-file-v2/#labels)                        |                                                                                                                                                         |
| [build.shm\_size](https://docs.docker.com/compose/compose-file/compose-file-v2/#shm_size)                   |                                                                                                                                                         |
| [build.target](https://docs.docker.com/compose/compose-file/compose-file-v2/#target)                        | currently incompatible with [Livepush](../../learn/develop/local-mode.md#livepush)                                                                      |
| [cap\_add](https://docs.docker.com/compose/compose-file/compose-file-v2/#cap_add-cap_drop)                  |                                                                                                                                                         |
| [cap\_drop](https://docs.docker.com/compose/compose-file/compose-file-v2/#cap_add-cap_drop)                 |                                                                                                                                                         |
| [cgroup\_parent](https://docs.docker.com/compose/compose-file/compose-file-v2/#cgroup_parent)               |                                                                                                                                                         |
| [command](https://docs.docker.com/compose/compose-file/compose-file-v2/#command)                            |                                                                                                                                                         |
| [cpu\_shares](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)        |                                                                                                                                                         |
| [cpu\_quota](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |                                                                                                                                                         |
| [cpuset](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)             |                                                                                                                                                         |
| [devices](https://docs.docker.com/compose/compose-file/compose-file-v2/#devices)                            |                                                                                                                                                         |
| [depends\_on](https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on)                     | Only array form and `service_started` condition                                                                                                         |
| [dns](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns)                                    |                                                                                                                                                         |
| [dns\_opt](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns_opt)                           |                                                                                                                                                         |
| [dns\_search](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns_search)                     |                                                                                                                                                         |
| [domainname](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |                                                                                                                                                         |
| [entrypoint](https://docs.docker.com/compose/compose-file/compose-file-v2/#entrypoint)                      |                                                                                                                                                         |
| [environment](https://docs.docker.com/compose/compose-file/compose-file-v2/#environment)                    |                                                                                                                                                         |
| [extra\_hosts](https://docs.docker.com/compose/compose-file/compose-file-v2/#extra_hosts)                   |                                                                                                                                                         |
| [group\_add](https://docs.docker.com/compose/compose-file/compose-file-v2/#group_add)                       |                                                                                                                                                         |
| [healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v2/#healthcheck)                    |                                                                                                                                                         |
| [hostname](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)           |                                                                                                                                                         |
| [image](https://docs.docker.com/compose/compose-file/compose-file-v2/#image)                                |                                                                                                                                                         |
| [ipc](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                |                                                                                                                                                         |
| [labels](https://docs.docker.com/compose/compose-file/compose-file-v2/#labels-1)                            |                                                                                                                                                         |
| [mac\_address](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)       |                                                                                                                                                         |
| [mem\_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |                                                                                                                                                         |
| [mem\_reservation](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)   |                                                                                                                                                         |
| [network\_mode](https://docs.docker.com/compose/compose-file/compose-file-v2/#network_mode)                 | Only support `bridge`, `host`, `service:[service name]`, or none                                                                                        |
| [networks](https://docs.docker.com/compose/compose-file/compose-file-v2/#networks)                          | Only support specifying network names                                                                                                                   |
| [oom\_kill\_disable](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |                                                                                                                                                         |
| [oom\_score\_adj](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)    |                                                                                                                                                         |
| [pid](https://docs.docker.com/compose/compose-file/compose-file-v2/#pid)                                    | Only support `host` or none                                                                                                                             |
| [pids\_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#pids_limit)                     |                                                                                                                                                         |
| [ports](https://docs.docker.com/compose/compose-file/compose-file-v2/#ports)                                |                                                                                                                                                         |
| [privileged](https://docs.docker.com/compose/compose-file/compose-file-v2/#privileged)                      |                                                                                                                                                         |
| [read\_only](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |                                                                                                                                                         |
| [restart](https://docs.docker.com/compose/compose-file/compose-file-v2/#restart)                            | Defaults to `always`                                                                                                                                    |
| [security\_opt](https://docs.docker.com/compose/compose-file/compose-file-v2/#security_opt)                 |                                                                                                                                                         |
| [shm\_size](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)          |                                                                                                                                                         |
| [stop\_grace\_period](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_grace_period)      |                                                                                                                                                         |
| [stop\_signal](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_signal)                   |                                                                                                                                                         |
| [sysctls](https://docs.docker.com/compose/compose-file/compose-file-v2/#sysctls)                            |                                                                                                                                                         |
| [tmpfs](https://docs.docker.com/compose/compose-file/compose-file-v2/#tmpfs)                                |                                                                                                                                                         |
| [ulimits](https://docs.docker.com/compose/compose-file/compose-file-v2/#ulimits)                            |                                                                                                                                                         |
| [user](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)               |                                                                                                                                                         |
| [userns\_mode](https://docs.docker.com/compose/compose-file/compose-file-v2/#userns_mode)                   |                                                                                                                                                         |
| [volumes](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes)                            | Only support short syntax and named volumes. Bind mounts are not supported, except for as allowed by balena specific [labels](docker-compose.md#labels) |
| [working\_dir](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)       |                                                                                                                                                         |

## Known unsupported fields

| Field                                                                                                                                                  | Details                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [build.isolation](https://docs.docker.com/compose/compose-file/compose-file-v2/#isolation)                                                             |                                                                                     |
| [build.network](https://docs.docker.com/compose/compose-file/compose-file-v2/#network)                                                                 |                                                                                     |
| [blkio\_config](https://docs.docker.com/compose/compose-file/compose-file-v2/#blkio_config)                                                            |                                                                                     |
| [container\_name](https://docs.docker.com/compose/compose-file/compose-file-v2/#container_name)                                                        | Used by the device supervisor                                                       |
| [cpu\_count](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                    |                                                                                     |
| [cpu\_percent](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                  |                                                                                     |
| [cpus](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                          | Introduced by Docker Compose v2.2 and therefore not working                         |
| [env\_file and service.env\_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) |                                                                                     |
| [expose](https://docs.docker.com/compose/compose-file/compose-file-v2/#expose)                                                                         | Informational only. Removed to prevent conflicts with other network configurations  |
| [external\_links](https://docs.docker.com/compose/compose-file/compose-file-v2/#external_links)                                                        |                                                                                     |
| [isolation](https://docs.docker.com/compose/compose-file/compose-file-v2/#isolation-1)                                                                 |                                                                                     |
| [links](https://docs.docker.com/compose/compose-file/compose-file-v2/#links)                                                                           |                                                                                     |
| [logging](https://docs.docker.com/compose/compose-file/compose-file-v2/#logging)                                                                       |                                                                                     |
| [memswap\_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                |                                                                                     |
| [mem\_swappiness](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                               |                                                                                     |
| [runtime](https://docs.docker.com/compose/compose-file/compose-file-v2/#runtime)                                                                       |                                                                                     |
| [scale](https://docs.docker.com/compose/compose-file/compose-file-v2/#scale)                                                                           |                                                                                     |
| [stdin\_open](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                   |                                                                                     |
| [tty](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)                                                           |                                                                                     |
| [volume\_driver](https://docs.docker.com/compose/compose-file/compose-file-v2/#volume_driver)                                                          |                                                                                     |
| [volumes\_from](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes_from)                                                            |                                                                                     |

## Known unsupported features

| Feature                                                                                                      | Details |
| ------------------------------------------------------------------------------------------------------------ | ------- |
| [variable substitution](https://docs.docker.com/compose/compose-file/compose-file-v2/#variable-substitution) |         |

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
