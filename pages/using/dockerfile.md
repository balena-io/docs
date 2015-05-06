# Dockerfile Guide

Resin.io offers you the flexibility to deploy [Docker][docker] containers to devices. This enable you to define your own environment and use whatever tools you need.

## Images and Containers
To understand how this works we need to understand a bit about how [Docker][docker] works and what images and a containers are in this context. 
Basically an image is a read-only template or blueprint and the container is a running system built from an image. (see [Docker's introduction][docker-images-containers] for more details on this.)

## Dockerfiles

To create a container from an image we use a [Dockerfile][dockerfile] - this is similar to a `Makefile` in that it contains a recipe or set of instructions to build our container.

The syntax of Dockerfiles is fairly simple - at core there are 2 valid entries in a Dockerfile - comments, prepended with `#` as in script files, and instructions of the format `INSTRUCTION arguments`.

Typically you will only need to use 4 instructions - [FROM][from], [RUN][run] and [ADD][add] or [COPY][copy]:-

* [FROM][from] __has__ to be the first instruction in any valid `Dockerfile` and defines the base image to use as the basis for the container you're building.

* [RUN][run] simply executes commands in the container - this can be of the format of a single line to execute, e.g. `RUN apt-get -y update` which will be run via `/bin/sh -c`, or `[ "executable", "param1", "param2", ... ]` which is executed directly.

* [ADD][add] copies files from the current directory into the container, e.g. `ADD <src> <dest>`. Note that if `<dest>` doesn't exist, it will be created for you, e.g. if you specify a folder. It also allows the <src> to be a url, and if the <src> is a recognised compression format, it will unpack it for you. 

* [COPY][copy] is very similar to [ADD][add], but with out the compression and url functionality. According to [docker best practise][docker-best-practise] you should always use [COPY][copy] unless the auto-extraction capability of [ADD][add] is needed.

* [CMD][cmd] this command provides defaults for an executing container. This command will be run when the container starts up on your device, where as RUN commands will be executed on our build servers. In a resin.io application, this is typically used to execute a start script or entrypoint for the users application. [CMD][cmd] should always be the last command in your dockerfile. The only processes that will be running inside the container is the [CMD][cmd] command, and all processes that it spawns. 


For details on other instructions, consult the official [Dockerfile documentation][dockerfile].

## Using Dockerfiles with Resin.io

To use a `Dockerfile` to deploy to Resin.io simply place it at the root of your repository. When you push your code to Resin.io it will automatically recognise it and use that to deploy code to your device.

You can also include a `.dockerignore` file with your project if you wish the builder to ignore certain files.

__NOTE:__ You *don't* need to worry about ignoring `.git` as the builders already do this by default.  


## Resin.io Base Images

### Raspberry Pi

We provide a base [Raspbian][raspbian] Raspberry Pi image especially configured to run on resin.io at `resin/rpi-raspbian:wheezy`.

To use this image prefix your `Dockerfile`s with:-

```
FROM resin/rpi-raspbian:wheezy-2015-01-15
```

You will note that this image has a build date appended to it, we try to keep our builds as up-to-date as possible. To use the most up-to-date version or a previous version, check out the resin.io registry over [here][docker-registry].

## Example Dockerfile

Let's take a look at an example `Dockerfile`. This comes from the [Hello Python][hello-python] project and executes a simple Hello World Python project:-

```
FROM resin/rpi-raspbian:wheezy-2015-01-15

# Install Python.
RUN apt-get update && apt-get install -y python

COPY . /app

CMD ["python", "/app/hello.py"]
```

### Line-By-Line

Let's take a look at what's going on here, line-by-line:-

```
FROM resin/rpi-raspbian:wheezy-2015-01-15
```

Here we use the resin.io Raspberry Pi [Raspbian][raspbian] image as our base Docker image.

```
# Install Python.
RUN apt-get update && apt-get install -y python
```

Next we update Raspbian's packages and install Python (using the `-y` switch to prevent any
prompts on the build server.) 

__NOTE:__ All the commands in docker RUN are executed on our build servers in a virtual qemu ARM device, so be careful not to run commands that require user intervention or try to access IO, because these will call the build to hang and you won't get a lovely container pushed to your devices. 

```
COPY . /app
```

Now we need to get the files in our repository. This command *recursively* copies all the files in the local directory (on the build server this will be the files in the repository) into a new directory in the container, `/app`. This could also be done using ADD, but COPY is recommended by the folks over at docker.

```
CMD ["python", "/app/hello.py"]
```

And finally we need to actually make our container do something great, so we do that by telling python to run our awesome hello.py script, which it can find at "/app/hello.py" because it was kindly placed there by the COPY command.

## Dockerfiles for Other Programming Languages

There are a number of example Dockerfiles available for different languages listed on the [projects page][starter-projects].

[container]:https://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[docker]:https://www.docker.com/
[dockerfile]:https://docs.docker.com/reference/builder/
[docker-images-containers]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
[hello-python]:https://github.com/alexandrosm/hello-python
[raspbian]:http://www.raspbian.org/

[from]:https://docs.docker.com/reference/builder/#from
[run]:https://docs.docker.com/reference/builder/#run
[add]:https://docs.docker.com/reference/builder/#add
[copy]:https://docs.docker.com/reference/builder/#copy
[cmd]:https://docs.docker.com/reference/builder/#cmd

[starter-projects]:/pages/examples/projects.md#Programming_Language_Starter_Projects
[docker-best-practise]:https://docs.docker.com/articles/dockerfile_best-practices/#add-or-copy
[docker-registry]:https://registry.hub.docker.com/u/resin/rpi-raspbian/tags/manage/
[resin-docker-blog]:https://resin.io/blog/docker-on-raspberry-pi/
[dockerhub-link]:https://registry.hub.docker.com/search?q=rpi
[rpi-archlinux-link]:https://registry.hub.docker.com/u/digitallyseamless/archlinux-armv6h/
[docker-custom-base-os-repo]:https://github.com/nghiant2710/base-os-image-example
[docker-create-images-link]:https://docs.docker.com/userguide/dockerimages/#creating-our-own-images
[example-archlinux]:https://github.com/shaunmulligan/resin-archlinux-rpi
