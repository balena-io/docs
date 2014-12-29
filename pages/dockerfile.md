# Dockerfile Guide

Resin.io offers you the flexibility to deploy [Docker][docker] containers to devices directly to enable you to define your own environment and use whatever tools you need.

Docker uses [containerisation][container] to allow the deployment of a completely isolated Linux instance configured exactly to your specifications with minimal performance penalty. This combination of control and performance is what makes containerisation the ideal approach for deployment of code to Resin.io devices.

## Images and Containers

Docker images and containers are to standard virtualisation as a saved snapshot of a fully installed OS with applications and a running virtual machine - i.e. the image is a read-only template and the container is a running system (see [Docker's introduction][docker-images-containers] for more details on this.)

## Dockerfiles

To create a container from an image in Docker we use a [Dockerfile][dockerfile] - this is similar to a `Makefile` in that it contains instructions to build our container.

The syntax of Dockerfiles is fairly simple - at core there are 2 valid entries in a Dockerfile - comments, prepended with `#` as in script files, and instructions of the format `INSTRUCTION arguments`.

Typically you will only need to use 3 instructions - [FROM][from], [RUN][run] and [ADD][add]:-

* [FROM][from] __has__ to be the first instruction in any valid `Dockerfile` and defines the base image to use as the basis for the container you're building.

* [RUN][run] simply executes commands in the container - this can be of the format of a single line to execute, e.g. `RUN apt-get -y update` which will be run via `/bin/sh -c`, or `[ "executable", "param1", "param2", ... ]` which is executed directly.

* [ADD][add] copies files from the current directory into the container, e.g. `ADD <src> <dest>`. Note that if `<dest>` doesn't exist, it will be created for you, e.g. if you specify a folder.

For details on other instructions, consult the official [Dockerfile documentation][dockerfile].

## Using Dockerfiles with Resin.io

To use a `Dockerfile` to deploy to Resin.io simply place it at the root of your repository. When you push your code to Resin.io it will automatically recognise it and use that to deploy code to your device.

__IMPORTANT:__ Resin.io assumes there will be an executable, `/start`, within the container and will treat this as the application to run on your devices. Make sure any `Dockerfile` you build creates this files and marks it executable.

## Resin.io Base Images

### Raspberry Pi

We provide a base [Raspbian][raspbian] Raspberry Pi image especially configured to run on Resin.io at `resin/rpi-buildstep-armv6hf`.

To use this image prefix your `Dockerfile`s with:-

```
FROM resin/rpi-raspbian:wheezy
```

## Example Dockerfile

Let's take a look at an example `Dockerfile`. This comes from the [Hello Python][hello-python] project and executes a simple Hello World Python project:-

```
FROM resin/rpi-raspbian:wheezy

# Install Python.
RUN apt-get update
RUN apt-get install -y python

ADD . /app

RUN echo python app/hello.py > /start
RUN chmod +x /start
```

### Line-By-Line

Let's take a look at what's going on here, line-by-line:-

```
FROM resin/rpi-raspbian:wheezy
```

Here we use the Resin.io Raspberry Pi [Raspbian][raspbian] image as our base Docker image.

```
# Install Python.
RUN apt-get update
RUN apt-get install -y python
```

Next we update Raspbian's packages and install Python (using the `-y` switch to prevent any
prompts on the build server.)

```
ADD . /app
```

Now we need to get the files in our repository. This command *recursively* copies all the files in the local directory (on the build server this will be the files in the repository) into a new directory in the container, `/app`.

```
RUN echo python app/hello.py > /start
RUN chmod +x /start
```

Finally, we create the `start` file which Resin.io will run on our devices. We simply use `RUN` to `echo` the command to start our Python script then use `chmod` to mark it executable.

At this point we're done - Resin.io will build this container on the build server and automatically run `start` on all our devices!

## Dockerfiles for Other Programming Languages

There are a number of example Dockerfiles avialable for different languages listed on the [projects page][starter-projects].

[container]:https://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[docker]:https://www.docker.com/
[dockerfile]:https://docs.docker.com/reference/builder/
[docker-images-containers]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
[hello-python]:https://github.com/alexandrosm/hello-python
[raspbian]:http://www.raspbian.org/

[from]:https://docs.docker.com/reference/builder/#from
[run]:https://docs.docker.com/reference/builder/#run
[add]:https://docs.docker.com/reference/builder/#add

[starter-projects]:/pages/projects.md#Programming_Language_Starter_Projects
