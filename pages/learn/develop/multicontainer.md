---
title: Multiple containers
excerpt: A guide to running multiple containers with Docker Compose and resin.io
---

# Multiple containers

As your applications grow more complex, you may find significant benefit in running some services in separate containers. Splitting your application into multiple containers allows you to better isolate and maintain key services, providing a more modular and secure approach to application management. Each service can be packaged with the operating environment and tools it specifically needs to run, and each service can be limited to the minimum system resources necessary to perform its task. The benefits of multicontainer applications compound as the complexity of the application grows. Because each service can be updated independently, larger applications can be developed and maintained by separate teams, each free to work in a way that best supports their service. 

This guide will cover the considerations you need to take into account when running multiple containers, including `docker-compose.yml` configuration and some important resin.io specific settings.

__Note:__ Multicontainer functionality requires resinOS v2.12.0 or higher, and it is only available to microservices and starter [application types][app-types]. If you are creating an application and do not see microservices or starter as available application types, a multicontainer compatible OS version has not yet been released for the selected device type. 

## docker-compose.yml file

The multicontainer functionality provided by resin.io is built around the **[Docker Compose][docker-compose]** file format. The resin.io device supervisor implements a subset of the [Compose v2.1 feature set][compose-features]. You can find a full list of supported and known unsupported features in our [device supervisor reference docs][compose-support].

At the root of your multicontainer application, you'll use a `docker-compose.yml` file to specify the configuration of your containers. The `docker-compose.yml` defines the services you'll be building, as well as how the services interact with each other and the host OS.

Here's an example `docker-compose.yml` for a [simple multicontainer application][simple-app], composed of a static site server, a websocket server, and a proxy:

```
version: '2'
services:
  frontend:
    build: ./frontend
    expose:
      - "80"
  proxy:
    build: ./haproxy
    depends_on:
      - frontend
      - data
    ports:
      - "80:80"
  data:
    build: ./data
    expose:
      - "8080"
```

Each service can either be built from a directory containing a `Dockerfile`, as shown here, or can use a **Docker** image that has already been built, by replacing `build:` with `image:`. If your containers need to started in a specific order, make sure to use the `depends_on:` [setting][depends-on].

Unlike single container applications, multicontainer applications do not run containers in privileged mode by default. If you want to make use of hardware, you will either have to set some services to privileged, using `privileged: true`, or use the `cap_add` and `devices` settings to map in the correct hardware access to the container.

Here, the `gpio` service is set up to use **i2c** sensors:

```
gpio:
    build: ./gpio
    devices:
      - "/dev/i2c-1:/dev/i2c-1"
      - "/dev/mem:/dev/mem"
    cap_add: 
      - SYS_RAWIO
```

## Resin.io settings

There are a few settings and considerations specific to resin.io that need to be taken into account when building multicontainer applications. 

### Init system

Using the `INITSYSTEM=on` [setting][init-system] in the `Dockerfile` of a service is only supported if the container is run as privileged, as **systemd** does not run correctly in unprivileged containers. In addition, if you want to ensure your container is always kept running, set `restart` to `always`: 

```
privileged: true
restart: always
```

### Network mode

Setting `network_mode` to `host` allows the container to share the same network namespace as the host OS. When this is set, any ports exposed on the container will be exposed locally on the device. This is necessary for features such as bluetooth.

### Named volumes

With multicontainer applications, resin.io supports the use of named volumes, a feature that expands on the [persistent storage][persistent-storage] functionality used by older versions of resinOS. Named volumes can be given arbitrary names and can be linked to a directory in one or more containers. As long as every release of the application includes a `docker-compose.yml` and the volume name does not change, the data in the volume will persist across updates. 

Use the `volumes` field of the service to link a directory in your container to your named volume. The named volume should also be specified at the top level of the `docker-compose.yml`:

```
version: '2'
volumes: 
    resin-data:
services:
    example:
        build: ./example
        volumes: 
            - 'resin-data:/data'
```

For devices upgraded from older versions of resinOS to v2.12.0 or higher, a link will automatically be created from the `/data` directory of the container to the `resin-data` named volume (similar to above). This ensures application behavior will remain consistent across host OS versions. One notable difference is that accessing this data via the host OS is done at `/var/lib/docker/volumes/<APP ID>_resin-data/_data`, rather than the `/mnt/data/resin-data/<APP ID>` location used with earlier host OS versions. 

### Labels 

In addition to the settings above, there are some resin.io specific labels that can be defined in the `docker-compose.yml` file. These provide access to certain bind mounts and environment variables without requiring you to run the container as privileged:

{{> "general/labels" }}

These labels are applied to a specific service with the `labels:` setting:

```
labels:
      io.resin.features.kernel-modules: '1'
      io.resin.features.firmware: '1'
      io.resin.features.dbus: '1'
      io.resin.features.supervisor-api: '1'
      io.resin.features.resin-api: '1'
      io.resin.update.strategy: download-then-kill
      io.resin.update.handover-timeout: ''
```

[docker-compose]:https://docs.docker.com/compose/overview/
[simple-app]:https://github.com/resin-io-projects/multicontainer-getting-started
[compose-features]:https://docs.docker.com/compose/compose-file/compose-file-v2/
[compose-support]:/reference/supervisor/docker-compose
[depends-on]:https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on
[persistent-storage]:/learn/develop/runtime/#persistent-storage
[init-system]:/learn/develop/runtime/#init-system
[app-types]:/learn/manage/app-types
