---
title: Optimize your builds
excerpt: Tips for reducing the time to build your {{ $names.company.lower }} container builds
---

# Optimize your builds

These are just a few tips and tricks to optimize your {{ $names.company.lower }} container builds and hopefully reduce the time it takes to build and push. They mostly make use of the caching mechanism in the Docker container builders on our servers. If you want to read more about how Docker caches layers and Docker best practices, head over here - [Docker best practices][docker-best-practices].

## Move `ADD` and `COPY` Commands

Caching in Docker is done by comparing the instructions in the current `Dockerfile` with the ones in the previous build. If the instructions have changed, the cache is invalidated. This however, is slightly different for the `ADD` and `COPY`, for these commands the contents of the files being put into the image are examined. If there are any changes, even in the file metadata, then the cache is invalidated. So we recommend you place your `ADD` or `COPY` statements near the end of your Dockerfiles, after all your package installs and source compilation steps have been completed.

## Minimize the number of layers

Reducing the number of layers in your Dockerfile can reduce the build and push time on {{ $names.company.lower }}. If we combine two instructions we avoid making another layer so we’re not storing intermediate (and maybe useless) states. Reducing the number of layers can be achieved by chaining multiple commands together with `&&` in `RUN` invocations. e.g. :
```Dockerfile
RUN apt-get update && apt-get install -y python
```
However, we recommend you find a balance between readability (and thus long-term maintainability) of the Dockerfile and minimizing the number of layers it uses.

## Avoid installing unnecessary packages
In order to reduce complexity, dependencies, file sizes, and build times, you should avoid installing extra or unnecessary packages just because they might be “nice to have.” For example, you don’t always need to include a text editor.

## Cleaning up after yourself

We can tidy up a bit by cleaning out the apt-cache and cleaning out tmp:

```Dockerfile
RUN apt-get update && apt-get install -y \
    curl \
    git \
    libsqlite3-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
```

__NOTE:__ The above command should never be split over two or more `RUN` commands, as the benefits will be lost.

It is also wise to remove any .tar.gz or temporary files in a similar fashion to the above, as this will reduce build size.

## Use .dockerignore

Make use of `.dockerignore` to ignore anything that is in the git repo, but is not strictly needed on the device(s). This can allow you to safely ignore images or assets used to document your project on github or bitbucket.

## Don't do apt-get update or upgrade

This isn't so much of an optimization tip, but more a guideline to ensure maintainable Docker images. Note the below tips were kindly borrowed from [Docker Best Practices][docker-best-practices].

* Don’t do `RUN apt-get update` on a single line. This will cause caching issues if the referenced archive gets updated, which will make your subsequent apt-get install fail without comment.

* Avoid `RUN apt-get upgrade` or `dist-upgrade`, since many of the “essential” packages from the base images will fail to upgrade inside an unprivileged container. If a base package is out of date, you should contact its maintainers. If you know there’s a particular package, foo, that needs to be updated, use apt-get install -y foo and it will update automatically.

## Starting long running tasks together
If you have commands that do not depend on each other, they can be started in the background at the same time to decrease build time. An example of this could be two downloads of unrelated sources:

```
RUN wget my-source-1.tar.gz & \
    && wget my-source-2.tar.gz & \
    && wait
```

This will start downloading both files and wait for them to complete. The next layer could then start the build on one or both of them.

## Pro Tips for slimming down your build

These are just a few tips from our engineers on how to reduce your build size

* npm install commands like `npm install --unsafe-perm -g @some/node-module` can have `&& npm cache clean --force && rm -rf /tmp/*` added in order to clean up the npm cache and the /tmp/npm-... folders it uses.

* apt-get update commands should have a matching `rm -rf /var/lib/apt/lists` in order to clean up the package lists (or `rm -rf /var/lib/apt/*` which is equivalent).

* You can combine the smaller layers together (each RUN/COPY/etc command creates a new layer) in order to reduce the metadata required for each layer and to speed up the updating process (each layer is downloaded individually), eg. you could change:
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
in order to merge those three layers into just one, without losing any benefits of Docker caching - this would also work well for combing the layers that add the apt mirrors.

* You can potentially add `--no-install-recommends` in your apt-get installs in order to only install the packages you really care about, rather than all the recommended but non-essential packages.

You can exclude docs/locales since they're not much use on the device, we do this via the command `COPY 01_nodoc /etc/dpkg/dpkg.cfg.d/` which has the contents:

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

[docker-best-practices]:https://docs.docker.com/articles/dockerfile_best-practices/
