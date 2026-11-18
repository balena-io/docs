---
title: Multiple containers
excerpt: A guide to running multiple containers with Docker Compose and balena
---

# Multiple containers

As your apps grow more complex, you may find significant benefit in running some services in separate containers. Splitting your app into multiple containers allows you to better isolate and maintain key services, providing a more modular and secure approach to fleet management. Each service can be packaged with the operating environment and tools it specifically needs to run, and each service can be limited to the minimum system resources necessary to perform its task. The benefits of multicontainer fleets compound as the complexity of the app grows. With multicontainer, each service is updated independently. Hence, larger apps can be developed and maintained by separate teams, each free to work in a way that best supports their service.

{% hint style="info" %}
For additional information on working with multiple containers with balena see the [services masterclass](https://docs.balena.io/learn/more/masterclasses/services-masterclass).
{% endhint %}

This guide will cover the considerations you need to take into account when running multiple containers, including `docker-compose.yml` configuration and some important balena specific settings.

### docker-compose.yml file

The multicontainer functionality provided by balena is built around the [**Docker Compose**](https://docs.docker.com/compose/) file format. The balena device supervisor implements a subset of the [Compose v2.1 feature set](https://docs.docker.com/compose/compose-file/compose-file-v2/). You can find a full list of supported and known unsupported features in our [device supervisor reference docs](https://docs.balena.io/reference/supervisor/docker-compose).

At the root of your multicontainer release, you'll use a `docker-compose.yml` file to specify the configuration of your containers. The `docker-compose.yml` defines the services you'll be building, as well as how the services interact with each other and the host OS.

Here's the `docker-compose.yml` from our [multicontainer getting started project](https://github.com/balena-io-examples/multicontainer-getting-started). It's the [Docker Compose getting started guide](https://docs.docker.com/compose/gettingstarted/) running on balenaOS: a Flask web app that counts how many times the page has been loaded, with the count stored in Redis.

```yaml
version: "2.1"

services:
  web:
    build: ./web
    ports:
      # balena's public device URL proxies port 80
      - "80:5000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    # Start order only. app.py retries in case redis isn't accepting
    # connections yet.
    depends_on:
      - redis
    networks:
      - default
      - backend

  redis:
    image: redis:7.4-alpine
    # Snapshot to disk every 60s if anything changed, so the count survives
    # power loss as well as a clean restart
    command: ["redis-server", "--save", "60", "1"]
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - backend

networks:
  # redis is only reachable from web, with no route out of the device
  backend:
    internal: true

volumes:
  redis-data:
```

Each service can either be built from a directory containing a `Dockerfile`, as `web` is here, or can use a **Docker** image that has already been built, as `redis` does with `image:`. The Redis data lives in the `redis-data` named volume, so the count survives updates and reboots.

{% hint style="warning" %}
`depends_on` doesn't behave the way it does with Docker Compose on your laptop:

* It only sets the order in which the supervisor starts services when it installs or updates a release. A service is started once the services it depends on have been started, not once they're ready.
* Only the list form is supported. Conditions such as `service_healthy` aren't, so a service can't wait for another service's `healthcheck` to pass. The engine still runs the healthcheck and reports the container's health, but nothing waits on it.
* When a device reboots, including after a power cut, balenaEngine restarts the containers itself according to their restart policy, and `depends_on` doesn't decide the order.
* It won't restart a service when a dependency restarts.
* If a service is expected to stop after performing some actions, do not include it as a dependency or the service that depends on it may not start.

Don't rely on start order for anything that matters. See section Waiting for a service to be ready (below).
{% endhint %}

Unlike single container fleets, multicontainer fleets do not run containers in privileged mode by default. If you want to make use of hardware, you will either have to set some services to privileged, using `privileged: true`, or use the `cap_add` and `devices` settings to map in the correct hardware access to the container.

Also, in a balena device, unlike with regular docker compose, containers restart by default if their process crashes or the device is restarted. This behavior can be changed by setting the restart policy to one of the [values supported by the engine](https://docs.docker.com/reference/compose-file/services/#restart) (the default is `restart: always`).

As an example, here the `gpio` service is set up to use i2c and serial uart sensors and a restart policy of `on-failure`.

```yaml
gpio:
  build: ./gpio
  devices:
    - "/dev/i2c-1:/dev/i2c-1"
    - "/dev/mem:/dev/mem"
    - "/dev/ttyACM0:/dev/ttyACM0"
  cap_add:
    - SYS_RAWIO
  restart: on-failure
```

#### Waiting for a service to be ready

Since `depends_on` can't tell you that another service is ready, each service needs to handle that itself. The simplest way is to make it cope with a dependency that isn't there yet. The getting started project does this: `web` retries its Redis connection a few times rather than failing on the first request.

{% hint style="info" %}
When a service really mustn't start until another one is ready, have the services signal each other with a file lock on a named volume they both mount. The service that others wait on takes an exclusive lock once it's ready and holds it for as long as it runs. The waiting service checks for the lock before starting.
{% endhint %}

Use a lock rather than a "ready" file. The kernel releases a lock as soon as the process holding it exits, including when the device loses power. A ready file in a volume would survive the reboot and tell the waiting service that its dependency is ready before it has even started.

```yaml
version: "2.1"
volumes:
  locks:
services:
  database:
    build: ./database
    volumes:
      - locks:/locks
  app:
    build: ./app
    volumes:
      - locks:/locks
```

In the `database` service's start script, wait until it's ready, then hold the lock in the background until the container stops:

```sh
#!/bin/sh
(
  until database-is-ready; do sleep 1; done
  exec flock -x /locks/database.lock tail -f /dev/null
) &
exec start-database
```

In the `app` service's start script, wait for the lock to be taken before starting. `flock -n` only succeeds while nobody holds the lock, which means `database` isn't ready yet:

```sh
#!/bin/sh
while flock -n /locks/database.lock true; do sleep 1; done
exec start-app
```

Replace `database-is-ready`, `start-database` and `start-app` with your own commands. For example, for Redis the readiness check could be `redis-cli ping`. `flock` is in util-linux on Debian-based images and in BusyBox on Alpine.

### Balena settings

There are a few settings and considerations specific to balena that need to be taken into account when building multicontainer fleets.

#### Network mode

Setting `network_mode` to `host` allows the container to share the same network namespace as the host OS. When this is set, any ports exposed on the container will be exposed locally on the device. This is necessary for features such as bluetooth.

#### Named volumes

With multicontainer fleets, balena supports the use of named volumes, a feature that expands on the [persistent storage](https://docs.balena.io/learn/develop/runtime#persistent-storage) functionality used by older versions of balenaOS. Named volumes can be given arbitrary names and can be linked to a directory in one or more containers. As long as every release of the fleet includes a `docker-compose.yml` and the volume name does not change, the data in the volume will persist across updates.

Use the `volumes` field of the service to link a directory in your container to your named volume. The named volume should also be specified at the top level of the `docker-compose.yml`:

```yaml
version: '2'
volumes:
  resin-data:
services:
  example:
    build: ./example
    volumes:
      - 'resin-data:/data'
```

For devices upgraded from older versions of balenaOS to v2.12.0 or higher, a link will automatically be created from the `/data` directory of the container to the `resin-data` named volume (similar to above). This ensures fleet behavior will remain consistent across host OS versions. One notable difference is that accessing this data via the host OS is done at `/var/lib/docker/volumes/<FLEET ID>_resin-data/_data`, rather than the `/mnt/data/resin-data/<FLEET ID>` location used with earlier host OS versions.

balena does not support the use of bind mounts at this time, aside from the ones which are provided by feature labels.

#### Core dumps for containers

BalenaOS v2.113.31 and later, by default, will not generate core dump files when a container crashes. This prevents a buggy container that is crash looping from filling up all available storage space on a device.

[Core dumps](https://en.wikipedia.org/wiki/Core_dump) are files with the contents of the memory used by a process at the time it crashes. They are a relatively advanced troubleshooting tool, particularly useful for low-level debugging of programs written in languages that compile to native code. For example, a tool like the `gdb` debugger can read a core dump and provide a stack trace showing the sequence of function calls that led to the crash.

If you need core dumps, you can easily enable them by editing your `docker-compose.yml` and setting `ulimits.core: -1` for the desired services. For example:

```yaml
version: '2'
services:
  example:
    ulimits:
      core: -1
```

#### Labels

In addition to the settings above, there are some balena specific labels that can be defined in the `docker-compose.yml` file. These provide access to certain bind mounts and environment variables without requiring you to run the container as privileged. You can find a detailed list of these labels on the [docker-compose.yml fields page](https://docs.balena.io/reference/supervisor/docker-compose#labels).

#### Container requirements

An additional set of labels ensures device compatibility for running a service. For example, before updating to a new release, it may be desirable to ensure that the device is running a specific version of [Supervisor](https://docs.balena.io/reference/supervisor/supervisor-api) or has a specific version of the [NVIDIA Tegra Linux Driver Package](https://developer.nvidia.com/embedded/linux-tegra) (L4T).

The following set of requirement labels are enforced via the supervisor. Each service may define one or more requirements and if any of them is not met for any non-optional service, then [the release will be rejected](https://docs.balena.io/learn/manage/device-statuses#update-statuses) and no changes will be performed for the new release.

| Label                                      | Description                                                                                                                             | Valid from Supervisor | Valid from CLI         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------- |
| io.balena.features.requires.sw.supervisor  | Device Supervisor version (specified as a [version range](https://www.npmjs.com/package/semver))                                        | 10.16.17              | All supported versions |
| io.balena.features.requires.sw.l4t         | [L4T](https://developer.nvidia.com/embedded/linux-tegra) version (specified as a [version range](https://www.npmjs.com/package/semver)) | 10.16.17              | All supported versions |
| io.balena.features.requires.hw.device-type | The [device type](https://docs.balena.io/reference/hardware/devices) as given by `BALENA_MACHINE_NAME`                                  | 11.1.0                | All supported versions |
| io.balena.features.requires.arch.sw        | The [architecture](https://docs.balena.io/reference/base-images/balena-base-images) as given by `BALENA_ARCH`                           | 14.10.11              | All supported versions |
| io.balena.features.requires.sw.balena-os   | balenaOS version (specified as a [version range](https://www.npmjs.com/package/semver))                                                 | 17.4.2                | 25.0.0                 |
| io.balena.features.requires.sw.linux       | Linux kernel version (specified as a [version range](https://www.npmjs.com/package/semver))                                             | 17.4.2                | 25.0.0                 |

For example, the following composition defines requirements on the supervisor and l4t version on the first service, and on the device type and architecture on the second service.

```yaml
version: '2'
services:
  first-service:
    build: ./first-service
    labels:
      io.balena.features.requires.sw.supervisor: '>=14'
      io.balena.features.requires.sw.l4t: '>=32.2.0'
  second-service:
    image: my-second-image
    labels:
      io.balena.features.requires.hw.device-type: 'jetson-nano'
      io.balena.features.requires.arch.sw: 'aarch64'
```

Here's an example of how to specify an OS and kernel requirement:

```yaml
version: '2'
services:
  first-service:
    build: ./first-service
    labels:
      io.balena.features.requires.sw.balena-os: '>6.3.0+rev4'
  second-service:
    image: my-second-image
    labels:
      io.balena.features.requires.sw.linux: '>5.15.*'
```

**Optional containers**

By default, when a container requirement is not met, none of the services are deployed to the device. However, in a multi-container release, it is possible to ignore those services that do not meet requirements with the other services being deployed as normal. To do so, we make use of the `io.balena.features.optional: 1` label to indicate which services should be considered optional.

In the `docker-compose.yml` file, add the `io.balena.features.optional: 1` to the labels list for each service you wish to mark as optional. In the following example, even if the `first-service` requirements fail, the `second-service` service will still be deployed.

```yaml
version: '2'
services:
  first-service:
    build: ./first-service
    labels:
      io.balena.features.requires.sw.supervisor: '>=14'
      io.balena.features.optional: '1'
  second-service:
    build: ./second-service
```

{% hint style="warning" %}
When updating between releases, if the new version of an optional service has unmet requirements, the old version of the service will still be killed.
{% endhint %}
