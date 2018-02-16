---
title: Multicontainer Guide
excerpt: A guide to building multicontainer applications with resin.io
---

# Multicontainer Guide

As your applications grow more complex, you may find significant benefit in running some services in separate containers. Multicontainer applications allow you to better isolate, duplicate, and manage key services, making your applications more modular and secure. Starting with supervisor version 7.0.0, resin.io provides multicontainer application support, built around the [Docker Compose][docker-compose] tool. This guide will cover the considerations you need to take into account when using a multicontainer instance, including Docker Compose configuration, important resin.io specific settings, and single container applications.

## Docker Compose

At the root of your multicontainer application, you'll use a `docker-compose.yml` file to specify the configuration of your containers. The `docker-compose.yml` defines the services you'll be building, as well as how the services interact with each other and the host OS.

Here's an example `docker-compose.yml` for a [simple web server][simple-web-server]:

```
 version: '2'
 services:
   web:
     build: ./web
     ports:
      - "80:5000"
     depends_on:
      - redis
   redis:
    build: ./redis
```

Each service can either be built from a directory containing a Dockerfile, as shown here, or can use a **Docker** image that has already been built, by replacing `build:` with `image:`. If your containers need to started in a specific order, make sure to use the `depends_on:` [setting](https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on).

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

## resin.io settings

There are a few settings and considerations specific to resin.io that need to be taken into account when building multicontainer applications. First, using the `INITSYSTEM=on` setting in the Dockerfile of a service is only supported if the container is run as privileged, as **systemd** does not run correctly in unprivileged containers.

In addition, there are some resin.io specific labels that can be defined in the `docker-compose.yml` file. These provide access to certain bind mounts and environment variables without requiring you to run the container as privileged.

Label | Default | Description
--- | --- | ---
io.resin.features.dbus | false | Bind mounts the host OS dbus into the container using “/run/dbus:/host/run/dbus”
io.resin.features.kernel-modules | false | Bind mounts the host OS /lib/modules into the container. (i.e. “/lib/modules:/lib/modules”)
io.resin.features.firmware | false | Bind mounts the host OS /lib/firmware into the container
io.resin.features.supervisor-api | false | Ensures that RESIN_SUPERVISOR_HOST, RESIN_SUPERVISOR_PORT, RESIN_SUPERVISOR_ADDRESS, and RESIN_SUPERVISOR_API_KEY are added to the container environment variables, so the supervisor API can be used. (Currently will only work for services that have network_mode = “host” or “bridge” )
io.resin.features.resin-api | false | When enabled, it will make sure that RESIN_API_KEY is added to the container environment variables

These labels are applied to a specific service with the `labels:` setting

```
labels:
      io.resin.features.dbus: "true"
      io.resin.features.kernel-modules: "true"
      io.resin.features.firmware: "true"
      io.resin.features.supervisor-api: "true"
```

## Single container applications 

If you push a project with only a Dockerfile or Dockerfile.template, rather than a `docker-compose.yml`, a single container will be built and downloaded, and the experience will be very similar to using resin.io with multiple containers. The single container will show up on the device dashboard as a service with the name `main`. This service will have host networking, be privileged, and have `lib/modules`, `/lib/firmware`, and `/run/dbus` bind mounted into the container automatically. 

__Note:__ Code that ran on resin.io before multicontainer support should still seamlessly build and run on the multicontainer instance.

[docker-compose]:https://docs.docker.com/compose/overview/
[simple-web-server]:https://github.com/resin-io-playground/multicontainer-python-redis


