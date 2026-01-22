---
title: Optimize your builds
excerpt: Tips for reducing the time to build your balena container builds
---

# Optimize your builds

These are just a few tips and tricks to optimize your balena container builds and hopefully reduce the time it takes to build and push. They mostly make use of the caching mechanism in the Docker container builders on our servers. If you want to read more about how Docker caches layers and Docker best practices, head over to [Docker best practices][docker-best-practices].

**Note:** For information on using multi-stage builds to reduce image sizes, see the [services masterclass][services-masterclass].

## Move `ADD` and `COPY` Commands

Caching in Docker is done by comparing the instructions in the current `Dockerfile` with the ones in the previous build. If the instructions have changed, the cache is invalidated. However, this is slightly different for the `ADD` and `COPY` commands. For these commands, the contents of the files being put into the image are examined. If there are any changes, even in the file metadata, then the cache is invalidated. We recommend you place your `ADD` or `COPY` statements near the end of your Dockerfiles, after all your package installs and source compilation steps have been completed.

## Minimize the number of layers

Reducing the number of layers in your Dockerfile can reduce the build and push time on balena. If we combine two instructions we avoid making another layer so we’re not storing intermediate (and maybe useless) states. Reducing the number of layers can be achieved by chaining multiple commands together with `&&` in `RUN` invocations. e.g. :

```Dockerfile
RUN apt-get update && apt-get install -y python
```

However, we recommend you find a balance between readability (and thus long-term maintainability) of the Dockerfile and minimizing the number of layers it uses.

## Avoid installing unnecessary packages

In order to reduce complexity, dependencies, file sizes, and build times, you should avoid installing extra or unnecessary packages just because they might be “nice to have.” For example, you don’t always need to include a text editor.

## Multi-stage builds

{{ $names.company.upper }} supports [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/). When building your application, you might require build-time dependencies, or other files which are not needed at _runtime_. With multi-stage builds, you can use multiple `FROM` statements to describe a new stage. Each stage can use a different base image and you can copy files and artifacts from one stage to another. This allows you to only copy necessary files and tools into the final image you want to ship, keeping it lean. Here is an example illustrating multi-stage build for a `golang` project.

```Dockerfile
FROM golang:1.24.3-bookworm AS build # define a build stage

WORKDIR /go/src/github.com/balena-io-projects/app

COPY /app ./

RUN go build

FROM debian:bookworm-20250428-slim # use a different, leaner image in final image

COPY --from=build /go/src/github.com/balena-io-projects/app/ . # copy build artifacts from build stage

CMD ["./app"]
```

{{ $names.company.upper }} base images come in two variants, namely `build` and `run`. Refer to the docs on [the differences between the two variants][run-vs-build].

### Using scratch

Most Dockerfiles start from a parent(base) image. Docker has a [reserved image][scratch] `scratch` that has no layers and can be used to create lightweight images. Note that there won't be a root filesystem(rootfs) in the scratch image. This typically means you have to _statically_ compile your application if possible or add all dependencies your application needs to run properly.

## Cleaning up after yourself

We can tidy up a bit by cleaning out the apt-cache and cleaning out tmp:

```Dockerfile
RUN apt-get update && apt-get install -y \
    curl \
    git \
    libsqlite3-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
```

**Note:** The above command should never be split over two or more `RUN` commands, as the benefits will be lost.

It is also wise to remove any .tar.gz or temporary files in a similar fashion to the above, as this will reduce build size.

## Use .dockerignore

Make use of `.dockerignore` to ignore anything that is in the git repo, but is not strictly needed on the device(s). This can allow you to safely ignore images or assets used to document your project on github or bitbucket.

## Don't do apt-get update or upgrade

This isn't so much of an optimization tip, but more a guideline to ensure maintainable Docker images. Note the below tips were kindly borrowed from [Docker Best Practices][docker-best-practices].

- Don’t do `RUN apt-get update` on a single line. This will cause caching issues if the referenced archive gets updated, which will make your subsequent apt-get install fail without comment.

- Avoid `RUN apt-get upgrade` or `dist-upgrade`, since many of the “essential” packages from the base images will fail to upgrade inside an unprivileged container. If a base package is out of date, you should contact its maintainers. If you know there’s a particular package, foo, that needs to be updated, use apt-get install -y foo and it will update automatically.

## Starting long running tasks together

If you have commands that do not depend on each other, they can be started in the background at the same time to decrease build time. An example of this could be two downloads of unrelated sources:

```
RUN wget my-source-1.tar.gz & \
    && wget my-source-2.tar.gz & \
    && wait
```

This will start downloading both files and wait for them to complete. The next layer could then start the build on one or both of them.

## Pro Tips for slimming down your build

These are just a few tips from our engineers on how to reduce your build size:

- npm install commands like `npm install --unsafe-perm -g @some/node-module` can have `&& npm cache clean --force && rm -rf /tmp/*` added in order to clean up the npm cache and the /tmp/npm-... folders it uses.

- apt-get update commands should have a matching `rm -rf /var/lib/apt/lists` in order to clean up the package lists (or `rm -rf /var/lib/apt/*` which is equivalent).

- You can combine the smaller layers together (each RUN/COPY/etc command creates a new layer) in order to reduce the metadata required for each layer and to speed up the updating process (each layer is downloaded individually), eg. you could change:

```Dockerfile
RUN mkdir /var/run/sshd
RUN echo 'root:{{ $names.os.short }}' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
```

into

```Dockerfile
RUN mkdir /var/run/sshd \
  && echo 'root:{{ $names.os.short }}' | chpasswd
  && sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
```

In order to merge those three layers into just one, without losing any benefits of Docker caching, this would also work well for combing the layers that add the apt mirrors.

- You can potentially add `--no-install-recommends` in your apt-get installs in order to only install the packages you really care about, rather than all the recommended but non-essential packages.

You can exclude `docs/locales` since they're not much use on the device, we do this via the command `COPY 01_nodoc /etc/dpkg/dpkg.cfg.d/` which has the contents:

```
path-exclude /usr/share/doc/*
path-exclude /usr/share/man/*
path-exclude /usr/share/groff/*
path-exclude /usr/share/info/*
path-exclude /usr/share/lintian/*
path-exclude /usr/share/linda/*

path-exclude /usr/share/locale/*
path-include /usr/share/locale/en*
```

[docker-best-practices]: https://docs.docker.com/articles/dockerfile_best-practices/
[services-masterclass]: /learn/more/masterclasses/services-masterclass/#6-multi-stage-builds
[scratch]: https://hub.docker.com/_/scratch
[run-vs-build]: /reference/base-images/balena-base-images/#run-vs-build
[install-packages]: /reference/base-images/balena-base-images/#installing-packages
