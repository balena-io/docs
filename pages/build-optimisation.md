# Optimise your Build

These are just a few tips and tricks to optimise your resin container build and hopefully reduce the time it takes to build and push. They mostly make use of the caching mechanism in the docker container builders on our servers. If you want to read more about how dockers caches layers and docker best practises, head over here - [Docker best practise][docker-best-practise]. 

## Move `ADD` and `COPY` Commands

Caching in docker is done by comparing the insturctions in the current `Dockerfile` with the ones in the previous build. If the instuctions have changed, the cache is invalidated. This however, is slightly different for the `ADD` and `COPY`, for these commands the contents of the files being put into the image are examined. If there are any changes, even in the file metadata, then the cache is invalidated. So we recommend you place your `ADD` or `COPY` statements near the end of your dockerfiles, after all your package installs and source compilation steps have been completed.

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
RUN apt-get update && apt-get install ... && apt-get clean && rm -rf /var/lib/apt/lists/*
```
Where `...` is a list of things you want to install.

__NOTE:__ The above command should not be split over two or more `RUN` commands, as benefit will be lost.

It is also wise to remove any .tar.gz or temporary files in a similar fashion to the above, as this will reduce build size.

[docker-best-practise]:https://docs.docker.com/articles/dockerfile_best-practices/