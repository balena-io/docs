---
title: Coordinate services
excerpt: A guide to running multiple containers with Docker Compose and resin.io
---

# Coordinate services

As your applications grow more complex, you may find significant benefit in running some services in separate containers. Splitting your application into multiple containers allows you to better isolate and maintain key services, providing a more modular and secure approach to application management. Each service can be packaged with the operating environment and tools it specifically needs to run, and each service can be limited to the minimum system resources necessary to perform its task. The benefits of multicontainer applications compound as the complexity of the application grows. Because each service can be updated independently, larger applications can be developed and maintained by separate teams, each free to work in a way that best supports their service. 


For devices with supervisor version greater than 7.0.0, resin.io provides multicontainer application support, built around the **[Docker Compose][docker-compose]** tool. This guide will cover the considerations you need to take into account when using a multicontainer instance, including **Docker Compose** configuration, important resin.io specific settings, and single container applications.

## Docker Compose

The multicontainer functionality provided by resin.io is built around **[Docker Compose][docker-compose]**, an open-source tool for running multiple **Docker** containers and coordinating resources between services. The resin.io device supervisor implements a subset of the [Compose v2.1 feature set][compose-features]. You can find a full list of supported and known unsupported features in our [device supervisor reference docs][compose-support].

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

There are a few settings and considerations specific to resin.io that need to be taken into account when building multicontainer applications. For one, using the `INITSYSTEM=on` [setting][init-system] in the `Dockerfile` of a service is only supported if the container is run as privileged, as **systemd** does not run correctly in unprivileged containers. In addition, if you want to ensure your container is always kept running, set `restart` to `always`: 

```
privileged: true
restart: always
```

Setting `network_mode` to `host` allows the to container to share the same network namespace as the host OS. When this is set, any ports exposed on the container will be exposed locally on the device. This is necessary for features such as bluetooth.

To store data in [persistent storage][persistent-storage], you'll want to make sure to use the `volumes` field to link a directory in your container to the `resin-data` volume:

```
volumes:
      - 'resin-data:/data'
```

In addition, there are some resin.io specific labels that can be defined in the `docker-compose.yml` file. These provide access to certain bind mounts and environment variables without requiring you to run the container as privileged.

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

## Single-container applications 

If you push a project with only a `Dockerfile` or `Dockerfile.template`, rather than a `docker-compose.yml`, a single container will be built and downloaded, and the experience will be very similar to using resin.io with multiple containers. The single container will show up on the device dashboard as a service with the name `main`. This service will have host networking, be privileged, and have `lib/modules`, `/lib/firmware`, and `/run/dbus` bind mounted into the container automatically. 

__Note:__ Code that ran on resin.io before multicontainer support should still seamlessly build and run on the multicontainer instance.

The auto-generated Docker Compose file built for this service can be found be navigating from the device list to the *Releases* page and selecting the release you would like to examine. It will look something like this:

```
version: '2.1'
networks: {}
volumes:
  resin-data: {}
services:
  main:
    build:
      context: .
    privileged: true
    restart: always
    network_mode: host
    volumes:
      - 'resin-data:/data'
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
[compose-support]:/deployment/docker-compose
[depends-on]:https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on
[persistent-storage]:/runtime/runtime/#persistent-storage
[init-system]:/runtime/runtime/#init-system

