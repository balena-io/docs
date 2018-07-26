---
title: docker-compose.yml fields
excerpt: docker-compose.yml fields supported by {{ $names.company.lower }}
---

# docker-compose.yml fields

## Supported fields

Field | Details
--- | ---
build |
cap_add | 
cap_drop |
cgroup_parent |
command |
cpu_shares |
cpu_quota |
cpus |
cpuset |
devices |
depends_on | Only array form is supported 
dns |
dns_opt |
dns_search |
domainname |
entrypoint | 
environment |
expose |
extra_hosts |
group_add |
healthcheck |
hostname |
image |
init | 
ipc |
labels |
mac_address |
mem_limit |
mem_reservation |
network_mode | Only support `bridge`, `host`, or none
networks | Only support specifiying network names
oom_kill_disable |
oom_score_adj |
pid | Only support `host` or none
pids_limit |
ports |
privileged |
read_only |
restart |
security_opt |
shm_size |
stop_grace_period |
stop_signal |
sysctls |
tmpfs |
ulimits |
user |
userns_mode |
volumes | Only support short syntax and named volumes. Bind mounts are not supported, except for as allowed by {{ $names.company.lower }} specific [labels](#labels)
working_dir |


## Known unsupported fields

Field | Details
--- | ---
blkio_config |
container_name | Used by the device supervisor
cpu_count |
cpu_percent |
external_links |
isolation |
links |
logging |
memswap_limit |
mem_swappiness |
runtime |
scale |
stdin_open |
tty |
volume_driver |
volumes_from |

## Labels

{{> "general/labels"}}