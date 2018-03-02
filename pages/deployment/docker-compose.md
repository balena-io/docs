---
title: Docker Compose
excerpt: Docker Compose fields supported by resin.io
---

# Docker Compose

## Supported Compose fields

- `image`
- `expose`
- `ports` - but no port ranges yet
- `network_mode`
- `privileged`
- `environment`
- `command`
- `entrypoint`
- `labels`
- `volumes` (bind mounting to the host OS is not supported)
- `depends_on`
- `cap_add`
- `cap_drop`
- `devices`
- `networks` - i.e. several networks per service  - but with no support for configuration like setting static IPs for those networks yet
- `cpu_shares`
- `cpu_quota`
- `cpus`
- `cpuset`
- `domainname`
- `oom_score_adj`
- `read_only`
- `shm_size`
- `healthcheck`
- `stop_grace_period`
- `stop_signal`
- `ulimits`
- `dns`
- `dns_search`
- `dns_opt`
- `tmpfs`
- `extra_hosts`
- `init`
- `healthcheck`
- `sysctls`

## Known unsupported fields

- `container_name` is not supported, as this field is used by the supervisor internally.
- `cpu_count`, 
- `cpu_percent`
- `hostname`
- `ipc`
- `mac_address`
- `mem_limit`
- `memswap_limit`
- `mem_swappiness`
- `mem_reservation`
- `stdin_open`
- `tty`
- `user`
- `working_dir`
- Volume bind-mounts to the underlying host OS. Currently bind-mounting volumes to the host OS is unsupported. We have a number of special labels to mount common things (see labels table in the section below), but allowing arbitrary bind-mounts makes it difficult to maintain a good host OS/container interface and makes it much easier for a user to accidentally brick a device.

## Labels

{{> "general/labels"}}