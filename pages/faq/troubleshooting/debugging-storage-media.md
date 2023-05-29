# Storage Media Debugging

Sometimes issues occur with the media being used (the medium that balenaOS
and all other data is stored on, for example an SD card or eMMC drive).

This can include multiple issues, but the most common are that of exhaustion
of free space on a device, or that of SD card corruption.

#### 11.1 Out of Space Issues

A media partition that is full can cause issues such as the following:

- Failure to download release updates, or failure to start new/updated
  services after a download has occurred
- Failure for a service to store data into defined volumes
- Failure of services to start up (mostly those that need to store data that
  isn't in `tmpfs`)

Determining how much space is left on the media for a device can be achieved by
logging into the host OS and running:

```shell
root@debug-device:~# df -h
Filesystem                      Size  Used Avail Use% Mounted on
devtmpfs                        783M     0  783M   0% /dev
tmpfs                           950M  5.3M  945M   1% /run
/dev/mmcblk0p2                  300M  276M  4.5M  99% /mnt/sysroot/active
/dev/disk/by-state/resin-state   18M   75K   16M   1% /mnt/state
overlay                         300M  276M  4.5M  99% /
/dev/mmcblk0p6                   29G  367M   27G   2% /mnt/data
tmpfs                           950M     0  950M   0% /dev/shm
tmpfs                           4.0M     0  4.0M   0% /sys/fs/cgroup
tmpfs                           950M     0  950M   0% /tmp
tmpfs                           950M   40K  950M   1% /var/volatile
/dev/mmcblk0p1                   40M  7.2M   33M  19% /mnt/boot
/dev/mmcblk0p3                  300M   14K  280M   1% /mnt/sysroot/inactive
```

The `-h` switch makes the figures returned 'human readable'. Without this switch
the returned figures will be in block sizes (usually 1k or 512byte blocks).

The two main mounts where full space problems commonly occur are `/mnt/data` and
`/mnt/state`. The former is the data partition where all service images, containers
and volumes are stored. The latter is the state partition, where overlays for the
root FS (such as user defined network configuraions) and the permanent logs
are stored.

There are a few ways to try and relieve out of space issues on a media drive.

##### 11.1.1 Image and Container Pruning

One fairly easy cleanup routine to perform is that of pruning the Docker tree
so that any unused images, containers, networks and volumes are removed. It
should be noted that in the day-to-day operation of the Supervisor, it attempts
to ensure that anything that is no longer used on the device _is_ removed when
not required. However, there are issues that sometimes occur that can cause this
behavior to not work correctly. In these cases, a prune should help clean
anything that should not be present:

```shell
root@debug-device:~# balena system prune -a -f --volumes
Deleted Images:
untagged: balena-healthcheck-image:latest
deleted: sha256:46331d942d6350436f64e614d75725f6de3bb5c63e266e236e04389820a234c4
deleted: sha256:efb53921da3394806160641b72a2cbd34ca1a9a8345ac670a85a04ad3d0e3507
untagged: balena_supervisor:v14.0.8

Total reclaimed space: 9.136kB
```

Note that in the above, _all_ unused images, containers, networks and volumes
will be removed. To just remove dangling images, you can use
`balena system prune -a`.

##### 11.1.2 Customer Data

Occasionally, customer volumes can also fill up the data partition. This
obviously causes more issues, because usually this is data that cannot just
be deleted. In these cases, it's imperative that the customer is informed that
they've filled the data partition and that appropriate pruning is required.
Filling disk space does not tend to stop access to devices, so in these cases
customers should be asked to enter the relevant services and manually prune
data.

Before discussion on persistent data, it's worth noting that occasionally
customer apps store data to the service container instead of a
persistent data volume. Sometimes, this data is intended as temporary, so doing
so is not an issue (although if they are doing so and expecting it to stay
permanent, this will not occur as service container rebuilds will remove the
layers where new data is stored). However there are cases where even this
temporary data can be so large that it fills the storage media. In these cases,
the Supervisor can be stopped, and then the service container affected, allowing
that container to be removed so the Supervisor can rebuild from the service
image. This will remove the layers filling the space. Care should be taken
and customers informed first, in case this data is required. They should also
be informed of persistent data and how to use it.

Because persistent data is stored as volumes, it's also possible to prune data
for a service from within the host OS. For example, should a service be filling
a volume so quickly as to prevent sensible data removal, an option is to stop
that service and then manually remove data from the service's volume.

Data volumes are always located in the `/var/lib/docker/volumes` directory. Care
needs to be taken to ensure the right volumes are examine/pruned of data, as
not all volumes pertain directly to customer data. Let's list the volumes:

```shell
root@debug-device:~# ls -l /var/lib/docker/volumes/
total 28
drwx-----x 3 root root  4096 Aug 19 19:15 1958513_backend-data
-rw------- 1 root root 32768 Aug 19 19:15 metadata.db
```

In single service apps, the relevant data volume is suffixed with the
`_balena-data` string.

In multicontainer apps, the suffix always corresponds with the name
of the bound volume. For example, let's look at the docker-compose manifest
for the `multicontainer-app` app used in this debugging masterclass:

```yaml
version: '2.1'
volumes:
  backend-data: {}
services:
  frontend:
    build: ./frontend
    network_mode: host
  backend:
    build: ./backend
    labels:
      io.balena.features.supervisor-api: '1'
      io.balena.features.balena-api: '1'
    privileged: true
    volumes:
      - 'backend-data:/mydata'
```

As you can see, a `backend-data` volume is defined, and then used by the
`backend` service. Assuming your device is still running the multicontainer
app for this masterclass, SSH into the device, and then examine the
running services:

```shell
root@debug-device:~# balena ps
CONTAINER ID   IMAGE                                                            COMMAND                  CREATED              STATUS                    PORTS     NAMES
330d34540489   3128dae78199                                                     "/usr/bin/entry.sh n…"   About a minute ago   Up About a minute                   backend_5302053_2266082_28d1b0e8e99c2ae6b7361f3b0f835f5c
2e2a7fcfe6f6   f0735c857f39                                                     "/usr/bin/entry.sh n…"   57 minutes ago       Up 16 minutes                       frontend_5302052_2266082_28d1b0e8e99c2ae6b7361f3b0f835f5c
e593ab6439fe   registry2.balena-cloud.com/v2/04a158f884a537fc1bd11f2af797676a   "/usr/src/app/entry.…"   57 minutes ago       Up 16 minutes (healthy)             balena_supervisor
root@debug-device:~# balena inspect backend_5302053_2266082_28d1b0e8e99c2ae6b7361f3b0f835f5c | grep /var/lib/docker/volumes
                "Source": "/var/lib/docker/volumes/1958513_backend-data/_data",
```

The volume is denoted with the suffix of the defined volume name.
Should there be multiple volumes, then appropriate directories for these will
be created in the `/var/lib/docker/volumes` directory, with the relevant
suffixes.

Knowing this, it becomes fairly simple to stop services that have filled volumes
and to clear these out:

1. Stop the Supervisor and start timer (`balena-supervisor.service` and
   `update-balena-supervisor.timer`).
2. Determine the relevant data directories for the volumes filling the data
   partition.
3. Clean them appropriately.
4. Restart the Supervisor and start timer.

#### 11.2 Storage Media Corruption

Many device types use storage media that has high wear levels. This includes
devices such as the Raspberry Pi series, where SD cards are the usual storage
media. Because we recommend very hard-wearing cards (the SanDisk Extreme Pro
family are extremely resilient), we don't regularly have issues with customer devices
dying due to SD card failure. However, they do occur (and not just on SD cards,
any type of flash memory based storage includes a shorter lifespan compared to
media such as platter drives). Initially, media corruption and wearing exhibit
'random' signs, including but not limited to:

- Release updates failing to download/start/stop.
- Services suddenly restarting.
- Devices not being mapped to device nodes.
- Extreme lag when interacting with services/utilities from the CLI.
- Spurious kernel errors.

In fact, media corruption could potentially exhibit as _any_ sort of issue,
because there's (generally) no way to determine where wearing may exhibit
itself. Additionally, we have seen issues where media write/reads take so
long that they also adversely impact the system (for example, healthchecks
may take too long to occur, which could potentially restart services including
the Supervisor and balenaEngine), in these cases swapping the media for a
known, working brand has caused this issues to be resolved.

One quick check that can be carried out is the root filing system integrity
check. This checks the MD5 hashes fingerprints of all the files in the filing
system against those when they were built. This tends to give an idea of
whether corruption may be an issue (but it certainly isn't guaranteed).
SSH into your device and run the following:

```shell
root@debug-device:~# grep -v "/var/cache/ldconfig/aux-cache" /balenaos.fingerprint | md5sum --quiet -c -
```

If the check returns successfully, none of the files differ in their MD5
fingerprints from when they were built.

Generally, if it appears that media corruption may be an issue, we generally
check with customers if they're running a recommended media brand, and if
not ask them to do so.

Should the worst happen and a device is no longer bootable due to filesystem
corruption, they still have the option of recovering data from the device.
In this case, they'll need to remove the media (SD card, HDD, etc.) from the
device and then follow appropriate instructions.

Similar commands to check for storage corruption although can sometime provide false positives. 

```bash
journalctl -n 10000 | grep "corrupt|Data will be lost|block allocation failed|invalid magic|dockerd: error -117|EXT4-fs error|error count since last fsck|failed checksum|checksum invalid|Please run e2fsck|I/O error"
```