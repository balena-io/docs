---
title: docker-compose.yml fields
excerpt: docker-compose.yml fields supported by balena
---

# docker-compose.yml fields

Our compose-file support is currently based on [version 2.4](https://docs.docker.com/compose/compose-file/compose-versioning/#version-24), as such any fields that were introduced in version 3 are not supported.

## Supported fields

| Field                                                                                                     | Details                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [build](https://docs.docker.com/compose/compose-file/compose-file-v2/#build)                              | when using a path it must point to project/app subfolders. URLs to git repositories are not currently supported.                       |
| [build.context](https://docs.docker.com/compose/compose-file/compose-file-v2/#context)                    | must point to project/app subfolders. URLs to git repositories are not currently supported.                                            |
| [build.dockerfile](https://docs.docker.com/compose/compose-file/compose-file-v2/#dockerfile)              |
| [build.args](https://docs.docker.com/compose/compose-file/compose-file-v2/#args)                          |
| [build.cache_from](https://docs.docker.com/compose/compose-file/compose-file-v2/#cache_from)              |
| [build.extra_hosts](https://docs.docker.com/compose/compose-file/compose-file-v2/#extra_hosts)            |
| [build.labels](https://docs.docker.com/compose/compose-file/compose-file-v2/#labels)                      |
| [build.shm_size](https://docs.docker.com/compose/compose-file/compose-file-v2/#shm_size)                  |
| [build.target](https://docs.docker.com/compose/compose-file/compose-file-v2/#target)                      | currently incompatible with [Livepush](/learn/develop/local-mode/#livepush)                                                            |
| [cap_add](https://docs.docker.com/compose/compose-file/compose-file-v2/#cap_add-cap_drop)                 |
| [cap_drop](https://docs.docker.com/compose/compose-file/compose-file-v2/#cap_add-cap_drop)                |
| [cgroup_parent](https://docs.docker.com/compose/compose-file/compose-file-v2/#cgroup_parent)              |
| [command](https://docs.docker.com/compose/compose-file/compose-file-v2/#command)                          |
| [cpu_shares](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)       |
| [cpu_quota](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)        |
| [cpuset](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)           |
| [devices](https://docs.docker.com/compose/compose-file/compose-file-v2/#devices)                          |
| [depends_on](https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on)                    | Only array form and `service_started` condition                                                                                        |
| [dns](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns)                                  |
| [dns_opt](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns_opt)                          |
| [dns_search](https://docs.docker.com/compose/compose-file/compose-file-v2/#dns_search)                    |
| [domainname](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)       |
| [entrypoint](https://docs.docker.com/compose/compose-file/compose-file-v2/#entrypoint)                    |
| [environment](https://docs.docker.com/compose/compose-file/compose-file-v2/#environment)                  |
| [extra_hosts](https://docs.docker.com/compose/compose-file/compose-file-v2/#extra_hosts)                  |
| [group_add](https://docs.docker.com/compose/compose-file/compose-file-v2/#group_add)                      |
| [healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v2/#healthcheck)                  |
| [hostname](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |
| [image](https://docs.docker.com/compose/compose-file/compose-file-v2/#image)                              |
| [ipc](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)              |
| [labels](https://docs.docker.com/compose/compose-file/compose-file-v2/#labels-1)                          |
| [mac_address](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)      |
| [mem_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)        |
| [mem_reservation](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)  |
| [network_mode](https://docs.docker.com/compose/compose-file/compose-file-v2/#network_mode)                | Only support `bridge`, `host`, `service:[service name]`, or none                                                                       |
| [networks](https://docs.docker.com/compose/compose-file/compose-file-v2/#networks)                        | Only support specifying network names                                                                                                  |
| [oom_kill_disable](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
| [oom_score_adj](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)    |
| [pid](https://docs.docker.com/compose/compose-file/compose-file-v2/#pid)                                  | Only support `host` or none                                                                                                            |
| [pids_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#pids_limit)                    |
| [ports](https://docs.docker.com/compose/compose-file/compose-file-v2/#ports)                              |
| [privileged](https://docs.docker.com/compose/compose-file/compose-file-v2/#privileged)                    |
| [read_only](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)        |
| [restart](https://docs.docker.com/compose/compose-file/compose-file-v2/#restart)                          | Defaults to `always`                                                                                                                   |
| [security_opt](https://docs.docker.com/compose/compose-file/compose-file-v2/#security_opt)                |
| [shm_size](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)         |
| [stop_grace_period](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_grace_period)      |
| [stop_signal](https://docs.docker.com/compose/compose-file/compose-file-v2/#stop_signal)                  |
| [sysctls](https://docs.docker.com/compose/compose-file/compose-file-v2/#sysctls)                          |
| [tmpfs](https://docs.docker.com/compose/compose-file/compose-file-v2/#tmpfs)                              |
| [ulimits](https://docs.docker.com/compose/compose-file/compose-file-v2/#ulimits)                          |
| [user](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)             |
| [userns_mode](https://docs.docker.com/compose/compose-file/compose-file-v2/#userns_mode)                  |
| [volumes](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes)                          | Only support short syntax and named volumes. Bind mounts are not supported, except for as allowed by balena specific [labels](#labels) |
| [working_dir](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)      |

## Known unsupported fields

| Field                                                                                                | Details                                                     |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [build.isolation](https://docs.docker.com/compose/compose-file/compose-file-v2/#isolation)           |
| [build.network](https://docs.docker.com/compose/compose-file/compose-file-v2/#network)               |
| [blkio_config](https://docs.docker.com/compose/compose-file/compose-file-v2/#blkio_config)           |
| [container_name](https://docs.docker.com/compose/compose-file/compose-file-v2/#container_name)       | Used by the device supervisor                               |
| [cpu_count](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)   |
| [cpu_percent](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
| [cpus](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources)        | Introduced by Docker Compose v2.2 and therefore not working |

[env_file and service.env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute)
[expose](https://docs.docker.com/compose/compose-file/compose-file-v2/#expose) | Informational only. Removed to prevent conflicts with other network configurations
[external_links](https://docs.docker.com/compose/compose-file/compose-file-v2/#external_links) |
[isolation](https://docs.docker.com/compose/compose-file/compose-file-v2/#isolation-1) |
[links](https://docs.docker.com/compose/compose-file/compose-file-v2/#links) |
[logging](https://docs.docker.com/compose/compose-file/compose-file-v2/#logging) |
[memswap_limit](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
[mem_swappiness](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
[runtime](https://docs.docker.com/compose/compose-file/compose-file-v2/#runtime) |
[scale](https://docs.docker.com/compose/compose-file/compose-file-v2/#scale) |
[stdin_open](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
[tty](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) |
[volume_driver](https://docs.docker.com/compose/compose-file/compose-file-v2/#volume_driver) |
[volumes_from](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes_from) |

## Known unsupported features

| Feature                                                                                                      | Details |
| ------------------------------------------------------------------------------------------------------------ | ------- |
| [variable substitution](https://docs.docker.com/compose/compose-file/compose-file-v2/#variable-substitution) |

## Labels

{{> "general/labels-version-note" }}

{{> "general/labels" }}
