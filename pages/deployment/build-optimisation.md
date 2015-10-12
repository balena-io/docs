# Optimise your Build

These are just a few tips and tricks to optimise your resin.io container build and hopefully reduce the time it takes to build and push. They mostly make use of the caching mechanism in the Docker container builders on our servers. If you want to read more about how Docker caches layers and Docker best practices, head over here - [Docker best practices][docker-best-practices].

## Move `ADD` and `COPY` Commands

Caching in Docker is done by comparing the instructions in the current `Dockerfile` with the ones in the previous build. If the instructions have changed, the cache is invalidated. This however, is slightly different for the `ADD` and `COPY`, for these commands the contents of the files being put into the image are examined. If there are any changes, even in the file metadata, then the cache is invalidated. So we recommend you place your `ADD` or `COPY` statements near the end of your dockerfiles, after all your package installs and source compilation steps have been completed.

## Minimize the number of layers

Reducing the number of layers in your dockerfile can reduce the build and push time on resin.io. If we combine two instructions we avoid making another layer so we’re not storing intermediate (and maybe useless) states. Reducing the number of layers can be achieved by chaining multiple commands together with `&&` in `RUN` invocations. e.g. :
```
RUN apt-get update && apt-get install -y python
```
However, we recommend you find a balance between readability (and thus long-term maintainability) of the Dockerfile and minimizing the number of layers it uses.

## Avoid installing unnecessary packages
In order to reduce complexity, dependencies, file sizes, and build times, you should avoid installing extra or unnecessary packages just because they might be “nice to have.” For example, you don’t always need to include a text editor.

## Cleaning up after yourself

We can tidy up a bit by cleaning out the apt-cache and cleaning out tmp:

```
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

This isn't so much of an optimisation tip, but more a guideline to ensure maintainable Docker images. Note the below tips were kindly borrowed from [Docker Best Practices][docker-best-practices].

* Don’t do `RUN apt-get update` on a single line. This will cause caching issues if the referenced archive gets updated, which will make your subsequent apt-get install fail without comment.

* Avoid `RUN apt-get upgrade` or `dist-upgrade`, since many of the “essential” packages from the base images will fail to upgrade inside an unprivileged container. If a base package is out of date, you should contact its maintainers. If you know there’s a particular package, foo, that needs to be updated, use apt-get install -y foo and it will update automatically.

[docker-best-practices]:https://docs.docker.com/articles/dockerfile_best-practices/