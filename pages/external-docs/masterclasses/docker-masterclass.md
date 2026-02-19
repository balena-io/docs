# Docker Masterclass

* **Masterclass Type:** Core
* **Maximum Expected Time To Complete:** 2 hours

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Hardware and Software Requirements](#hardware-and-software-requirements)
- [Exercises](#exercises)
  - [1. Introduction to Docker](#1-introduction-to-docker)
  - [2. Installing Docker](#2-installing-docker)
  - [3. The `docker` Command Line Interface](#3-the-docker-command-line-interface)
  - [4. Introduction to Dockerfiles](#4-introduction-to-dockerfiles)
  - [5. Building a Docker Image](#5-building-a-docker-image)
  - [6. Docker Containers](#6-docker-containers)
  - [7. Tags and Caching in Docker Builds](#7-tags-and-caching-in-docker-builds)
  - [8. Running Containers in Detached, Command and Interactive Modes](#8-running-containers-in-detached-command-and-interactive-modes)
  - [9. Bind Mounts and Volumes](#9-bind-mounts-and-volumes)
  - [10. Container Privileges and Permissions](#10-container-privileges-and-permissions)
  - [11. Docker Registries and Repositories](#11-docker-registries-and-repositories)
- [Conclusion](#conclusion)

## Introduction

Docker is a set of services that use OS level virtualization to run
self-contained instances of software. These instances are known as containers,
and include everything that the software running within them needs to function
apart from the Linux kernel.

This Masterclass is an aside to the rest of the balena Masterclasses, in that
it focuses specifically on Docker, from the basics to some 'deep dives' into
how containers (and other components) function and are constructed.

It is anticipated that after reading the basic sections of this Masterclass,
the reading of the
[Services Masterclass](https://github.com/balena-io/services-masterclass)
will allow anybody to develop balena apps and services.

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

* A locally cloned copy of this repository,
	[Docker Masterclass](https://github.com/balena-io/docker-masterclass).
	Either:
  * `git clone https://github.com/balena-io/docker-masterclass.git`
  * Download ZIP file (from 'Clone or download'->'Download ZIP') and then unzip it to a suitable directory
* A suitable text editor for developing code on your development platform (eg.
    [Visual Code](https://code.visualstudio.com/))
* A suitable shell environment for command execution (such as `bash`)

## Exercises

All of the following exercises assume that you are running the Docker CLI from
a suitable Unix based shell. The exercises include commands which can be run
in such a shell, and are represented by a line prefixed with `$`. Information
returned from execution of a command may be appended under the line to show
what might be returned. For example:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
```

### 1. Introduction to Docker

Docker allows the execution of software in self-enclosed packages called
'containers'. Containers are essentially small execution environments, and
can range from being tiny environments where only a few binaries are included,
to fully blown Linux distributions such as Debian or Ubuntu where many packages
can be included for the container environment to use (eg. via the use of
`apt-get` in the case of Debian or Ubuntu).

As such, Docker features some very useful benefits:
* The ability to run applications/binaries in a sandboxed execution environment
    where malicious code will not have access to the host OS.
* Easy and rapid deployment to a machine that Docker is installed on, with the
    assurance that the containers will run in the same way as on any other
    system with Docker installed.
* Rapid development due to the quick building and recreation of containers, as
    opposed to having to reinstall an OS and dependencies on a bare-metal or
    Viritualised system.

Containerization is an alternative form of providing host OS separation to that
of an execution environment, where other forms include Virtualization, where
machine resources (such as CPU cores, memory and disk space) are partitioned
off from the host OS and used to run a guest OS instead. Unlike Virtualization,
Containerization uses host OS resources as it needs them at runtime. As such,
there is no need to pre-allocate resources.

Docker runs as a service, how this occurs depends on the host OS:
* Linux - Runs as an OS daemon service (such as a `systemd` unit
   file), which is then sent commands via the `docker` and `docker-compose`
   clients.
* macOS - A Xen Hypervisor Virtual Machine runs the Docker service, and a UI
  and CLI client connects to it.
* Windows - A Virtual Machine (called MobyVM) is run, with the UI and CLI client
  connecting to it, or via [WSL](https://docs.docker.com/docker-for-windows/wsl-tech-preview/).

At this point, it's worth introducing some terminology, so that we can easily
refer to concepts in the future. It's worth noting that some of the concepts
described in the terminology will be described later in the exercises.

* Layer - A layer is part of a Docker Image or Container. It represents a
  file system layout, comprised of both directories and files. Layers are
  created during the building of a Docker image, or whilst a container is
  currently running.
* Image - A Docker image is a self-contained object representing a file system,
  comprised of Docker layers. The number of layers in an image vary from a
  minimum of 1. Images are created from Dockerfile 'recipes', which contain a
  number of directives that allow the image to be created by carrying out
  operations such as copying files into the image, executing commands to
  configure the image (such as `apt-get` from a Debian base image, or running
  bash scripts to generate configuration files) and determining which binary
  will be executed when the image is run as a container.
* Container - A Docker container is a running instance of an image. When an
  image is selected to be run, a new container is created that uses the layers
  from the Docker image as the base filesystem (the image acts as a 'template'
  for the container and the container never alters the image), and then runs any
  command that has been given. Should the container create any new files, or
  update any files that existed in the Docker image *that is not located in a
  bound volume*, a new layer that is owned specifically by that instance of the
  container is created. Container layers persist for the duration of the
  container's life, but are removed on container removal.
* Volume - A volume is persistent storage that exists as a directory structure
  on the host OS, which can be bound to a container on startup. This can work
  in several different ways, such as binding a specific directory or file from
  the host OS into a specific location in the container (for example binding
  `/etc/hosts` from the host OS to `/etc/hosts` in the container) or binding
  a named volume (a Docker managed directory on the host OS) into a specific
  location in the container (for example using a volume called `shared-volume`
  into `/usr/share` in the container).
* Network - A Docker network is functionality to connect running containers
  to each other and/or other network interfaces running on the host OS.
  These can vary from simply using the host OS's networking interfaces, to
  user-defined networking bridges which are only used by particular containers.
  All containers that require incoming/outgoing network traffic require a
  Docker network of some description.
* Repository - A Docker repository is storage for Docker images. When a Docker
  image is built, it is stored in the local Docker repository. However, usually
  you'll want to store the image in a location where other users can retrieve
  it. Docker repositories can be private (so that only users with login
  credentials can retrieve images from them), public (so that any user may
  retrieve an image from them) or a mixture of both. The Docker CLI includes
  commands that allow you to pull/push images from/to repositories.

### 2. Installing Docker

How you install Docker onto your local host OS is dependent on the OS itself
and the distribution that you're running. Docker has instructions available
that allow the user to easily carry this out
[here](https://docs.docker.com/install/).

An important note here. When installing Docker under Linux, the Docker daemon
(usually, unless changed) runs as `root` (under Windows and macOS, this is not
an issue). As such, you'll need to follow the instructions to add any user that
also wants to run the `docker` command to the `docker` group. If you don't do
this, only the `root` user will be able to use Docker under Linux. For
convenience, the command to do this is:

```shell
$ sudo usermod -aG docker <your-user>
```

Where `<your-user>` is the username for the user to run as non-`root`.
However ensure that this is the latest command under the Docker installation
instructions before doing so. You'll need to log out of the shell and then
back in for the changes to take effect.

Under macOS and Windows this is slightly different, and the installing user will
be asked to enter their credentials so that the Docker Hypervisor/VM has
permission to run in the background.

Once you've installed Docker, you should be able to open a new shell terminal
and verify that Docker is running correctly by running:

```shell
$ docker version
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea
 Built:             Wed Nov 13 07:22:34 2019
 OS/Arch:           darwin/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.12
  Git commit:       633a0ea
  Built:            Wed Nov 13 07:29:19 2019
  OS/Arch:          linux/amd64
  Experimental:     true
 containerd:
  Version:          v1.2.10
  GitCommit:        b34a5c8af56e510852c35414db4c1f4fa6172339
 runc:
  Version:          1.0.0-rc8+dev
  GitCommit:        3e425f80a8c931f88e6d94a8c831b9d5aa481657
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```

### 3. The `docker` Command Line Interface

Whilst the Docker daemon runs continuously on your host OS, it can be controlled
via the `docker` CLI command. This contains all the functionality to build
images, run containers, create volumes and networks, push and pull images to
remote repositories, etc.

We'll be using `docker` for almost all of the exercises, so it's worth having
a quick look at all the available commands:

```shell
$ docker help

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/heds/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/Users/heds/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/Users/heds/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/Users/heds/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  checkpoint  Manage checkpoints
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  deploy      Deploy a new stack or update an existing stack
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.
```

### 4. Introduction to Dockerfiles

The basis of any Docker image is the Dockerfile. This is a list of instructions
that form a recipe for an image. When an image is built, Docker steps through
the instructions in the Dockerfile and carries out the directive at each step.
Directives are keywords which (usually) form the start of a new line in the
Dockerfile.

As mentioned, Dockerfiles are laid out as a series of directives, which are
executed in series. Here's a very basic example:

```dockerfile
FROM debian:buster

COPY helloworld /usr/src/helloworld

CMD "/usr/src/helloworld"
```

This Dockerfile:
1. Uses the latest Debian Buster base image (containing all the files in the
   Buster release) as the base for the image's file system.
2. Copies a local binary (`helloworld`) from the same directory that the
   Dockerfile is in into the image's `/usr/src` directory.
3. Sets the command that should be run when the image is run as a conatiner
   (in this case, it will run the `/usr/src/helloworld`) binary.

We'll go through some of the most common Dockerfile directives, and what they
do, followed by an exercise to build a very simple Dockerfile, but we'll
introduce some more keywords later in the Masterclass when we've pinned down the
basics.

#### 4.1 [`FROM`](https://docs.docker.com/engine/reference/builder/#from) Directive

The `FROM` directive usually starts a Dockerfile. It informs Docker of the image
that should be inherited from as a basis from with which to run the rest of the
directives in the Dockerfile.

Because images are formed of a set of file system layers, an image can actually
inherit another image as its base, which therefore gives it immediate access to
the filesystem layout that exists in the base image.

Here's a small example. Consider an image, let's call it 'simple-base', which
has the following directories and files in its layers:

```shell
.
├── directory-1
│   ├── directory-1-1
│   │   └── file2.txt
│   └── file1.txt
└── directory-2
    └── file3.txt
```

We can use the `FROM` directive at the start of a Dockerfile to inherit from
this base image:

```dockerfile
# Will use simple-base as a base images, so all the files/directories from
# simple-base are now available to work on.
FROM simple-base
```

You'll note that comments can be used in Dockerfiles, by simply using `#` at
the start of the line, very much like Linux/Unix shell operations.

Further directives in the file can carry out operations on the inherited
filesystem, as well as creating new layers which include new or modified
directories and files. Every time the filesystem is modified via the Dockerfile,
a new layer is created. This usually occurs after each directive.

As well as inheriting from base images, it's also possible to start a completely
new Docker image which does not include any layers. This can be achieved by
using the special image name `scratch`. This tells Docker it shouldn't try to
inherit from any other image, but start a brand new set of layers. In fact, this
is how a large number of 'standard' base images start, such as the Docker
versions of Linux distributions, by starting from `scratch` and copying in all
of the files that build up that distribution of Linux.

#### 4.2 [`COPY`](https://docs.docker.com/engine/reference/builder/#copy) Directive

Now we know how to use a base image to start with a filesystem in our own image,
but how do we get new files into it?

This is where the `COPY` directive comes in. This allows the copying of files
from the host's local filesystem into the Docker image being built. It's fairly
similar to the standard copying commands under most OS variants in
that it takes the location of a source file or directory on the host and a
destination where the contents of the source should be copied inside the image.
`COPY` preserves all flags on the file when copied. For example, if you copy
a shell script that has the execution flag set this will be preserved when
copied into the image.

**NOTE:** The directory location of the Dockerfile being used to build the image
    is known as the build context. Any files in the build context, or any of
    its sub-directory hierarchy, is also part of the build context.
    This can be changed by other commands, but this is the default and we'll be
    using it for the moment.

The following will recursively copy the contents of the  `directory-3`
directory in the current build context into the image at the location
`/directory-3`:

```dockerfile
COPY directory-3 /directory-3/
```

Note that you need to add the trailing `/` to the destination directory. If
the destination directory doesn't already exist, it'll be dynamically created
(which means you can specify a nested destination directory without having to
run `mkdir` in the image).

Wildcards also work, so that the following:

```dockerfile
COPY * /all-the-files/
```

Will recursively copy *everything* (including the Dockerfile) in the current
build context to the `/all-the-files/` directory in the built image.

It should be noted that the source of files are *always* relative to the build
context. Therefore files must be available to that context (you can't, for
example, reference files that are in the directory above where the Dockerfile
is, because it's not within the same context).

`COPY` has a few switches that include abilities to set ownership and
on files as they're copied. Refer to the
[Dockerfile documentation](https://docs.docker.com/engine/reference/builder/#copy)
for more details.

If you want to use files that are outside of the build context there are a few
tricks we can use, which we'll discuss in an advanced Docker Masterclass.

#### 4.3 [`RUN`](https://docs.docker.com/engine/reference/builder/#run) Directive

The `RUN` directive runs commands whilst building a Docker image. This is
sometimes confused, when starting out with Docker, with the `CMD` directive
which runs commands when the image is created as a *container* instance.

`RUN` is used to carry out processing on your image to make it more useful.
Because the `RUN` command has access to all of the filesystem layers currently
available *at the point when the directive is executed* inside the image, it's
used to do things like install useful libraries and packages. For example,
suppose we're using a Debian Buster base image, and we want to install the
Node.js package, we can use `RUN` to execute the `apt-get` binary to do this:

```dockerfile
RUN apt-get update \
    && apt-get install -y nodejs
```

Another example might be running a command on some files in the image, to
create new files or modify them. The following will create a new file with
some initial text in and then print that file out, before then modifying that
file using `sed` to change the text and printing out the next contents:

```dockerfile
RUN echo 'Hello there!' > /my-file.txt \
    && cat /my-file.txt

RUN sed -i 's/Hello/Goodbye/' /my-file.txt \
    && cat /my-file.txt
```

As you can see, any binary that's part of the distribution is available, and you
can even use files you copy in yourself. Suppose we had a script called
`list-files.sh` in the current build context that was simply:

```shell
#!/bin/bash
ls -l /
```

We could copy this into the Docker image during the build and then run it:

```dockerfile
COPY list-files.sh /list-files.sh

RUN /list-files.sh > /files.txt \
    && cat /files.txt
```

This would copy the script into the image at location `/list-files.sh`, and
then run that script to get a list of all the entries in the root directory to
a file and then outputing the contents to the build.

#### 4.4 [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd) Directive

The `CMD` directive is usually the last directive in a Dockerfile. This informs
Docker what should be run when a container instance is created from an image.

This tends to be a call to a single binary or script. Once the call has
finished, the container will exit. Because most Docker images are designed
around services or daemons (for example a web server or similar), it's unusual
for a `CMD` to not start up a daemon or script that restarts should that service
exit. But this doesn't mean it has to be like that.

Taking the example from the `RUN` directive explanation, the following will set
the command to run when the container is instantiated to list the entries in the
root of the file system:

```dockerfile
CMD /list-files.sh
```

After the command has run, it will return and the container running it will
exit. Parameters can be passed to it by simply adding a space between the
executable and the parameters:

```dockerfile
CMD echo "Hello there!"
```

We've actually used what is known as the 'shell' form of the `CMD` directive
here. In this case, before the `/list-files.sh` script is run, a shell is
created inside the container to run the command (it is essentially wrapped
inside a `/bin/sh -c <command>`).

There's also an alternative form of the command, called the 'exec' form, which
uses a JSON array to call an executable and pass parameters to it *without* a
shell. We'd call our script in the same way in this form as such:

```dockerfile
CMD ["/bin/sh", "-c", "/list-files.sh"]
```

Here, the command being executed is the shell itself (`/bin/sh`) and the
parameters passed signify to run a command in it (`-c`) and the command to
run (`/list-files.sh`). Of course, if the command to execute was a binary,
we could just use `CMD ["/path/to/binary", "param1", "param2"]` instead, and
in fact because `list-files.sh` includes the environment to use in its header
(`#!/bin/bash`) we could run the script without invoking `bash` first.

At this point, most users would say "I think I'll use the shell form, it's much
quicker to write". But beware! Whilst the second form of `CMD` does indeed
require you to use a JSON structure, it *also* ensures that signals
passed to the container are propagated to it. That means that when the
container is stopped using `docker stop`, the `SIGTERM` signal is correctly
passed to the script or executable that allows it to clean up correctly. Using
the 'shell' form will cause the process to be effectively be `SIGKILL`ed.

As such, you should always use the 'exec' form unless there are very good
reasons for not doing so.

As the `CMD` directive informs Docker of what to run when a container is
started, there should only ever be *one* `CMD` directive in a Dockerfile. If
more than one exist, only the *last* `CMD` directive seen will be run. Sometimes
this can be useful, if you want to use a base image which usually runs as a
service, but wish to override the `CMD` directive from that base image (perhaps
you want to run with different parameters, or use the base image because of the
filesystem layers it includes).

The `CMD` directive can also be used in conjunction with the `ENTRYPOINT`
directive, which we'll describe in a more advanced Docker Masterclass.

### 5. Building a Docker Image

Now that we know some of the basic Dockerfile directives, it's worth learning
how to put some of these together to build a simple Docker image.

For convenience, export a variable to point to the root of this masterclass
repository, as we'll use this for the rest of the exercises, e.g.:

```shell
$ export BALENA_DOCKER_MASTERCLASS=~/docker-masterclass
```

Now change directory to the simple-docker-app directory in the root of this
masterclass repository, e.g.:

```shell
$ cd $BALENA_DOCKER_MASTERCLASS/simple-docker-app
```

Note that for the rest of these exercises, we're assuming that you're using an
x64 based machine. Should you be using an alternative architecture, such as
Arm, you'll need to change the architecture of the base image that you're using
in the Dockerfiles.

We're going to use `balenalib` based images in the remainder of the exercises in
this Masterclass, as they include useful images which are 'ready to go' with
various languages, libraries, etc.

Load a code editor of your choice, and edit the `Dockerfile` file in the
`simple-docker-app` directory. Add the following:

```dockerfile
FROM balenalib/intel-nuc-debian-node:latest

COPY * /usr/src/app/

RUN cd /usr/src/app \
    && npm install

CMD ["/usr/local/bin/node", "/usr/src/app/index.js"]
```

Ensure you have a newline at the end of the Dockerfile. Let's quickly run
through exactly what this Dockerfile does:

`FROM balenalib/intel-nuc-debian-node:latest`
This declares that the Docker image built should inherit from the
`balenalib/intel-nuc-debian-node:latest` image, which in this case is the latest
Debian Node.js image built and tagged by balena. This image includes all
standard Debian packages, binaries and libraries, as well as a copy of the
Node.js language and runtime, and npm. This allows us to easily run the Node.js
source code located in `index.js`.

`COPY * /usr/src/app/`
This copies all of the files in the `simple-docker-app` directory (the current
Docker build context) into the image being built in the `/usr/src/app` directory
which is dynamically created first.

```dockerfile
RUN cd /usr/src/app \
    && npm install
```

After changing directory into the `/usr/src/app` directory, the `npm install`
command is run, which uses the `package.json` file previously copied to this
location to install all of the required npm packages specified in it.
This creates a `/usr/src/app/node_modules` directory with all the dependencies
in.

```dockerfile
CMD ["/usr/local/bin/node", "/usr/src/app/index.js"]
```

As previously described, the `CMD` directive informs Docker what to run when
the Docker image is instantiated as a container. In this case, because the
directive is using the `exec` format, full paths to the command to run need to
be given (`/usr/local/bin/node` for the Node.js executable), as well as the
source file (`/usr/src/app/index.js`).

Once you've edited the Dockerfile, we can build a Docker image from it using
the following `docker` CLI command:

```shell
$ docker build --tag simple-docker-app .
Sending build context to Docker daemon  18.94kB
Step 1/4 : FROM balenalib/intel-nuc-debian-node:latest
latest: Pulling from balenalib/intel-nuc-debian-node
68ced04f60ab: Pulling fs layer
1418738fb4eb: Pulling fs layer
28ddf06c756e: Pull complete
6544792768e8: Pull complete
6e7ea75f4464: Pull complete
38aca9ee3123: Pull complete
5e30c86f7b84: Pull complete
12febcfb1db1: Pull complete
4acc7449c8c2: Pull complete
45be4c06aae8: Pull complete
Digest: sha256:0a613216d7a23e2ebbb54c0d42f420e8ba65b7d5507149a6690141e4ed700531
Status: Downloaded newer image for balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/4 : COPY * /usr/src/app/
 ---> d9fad658bc39
Step 3/4 : RUN cd /usr/src/app     && npm install
 ---> Running in 5f4a3fa70ea5
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 4.182s
found 0 vulnerabilities

Removing intermediate container 5f4a3fa70ea5
 ---> 526ffdc6d52e
Step 4/4 : CMD ["/usr/local/bin/node", "/usr/src/app/index.js"]
 ---> Running in 9f9c787b7a1d
Removing intermediate container 9f9c787b7a1d
 ---> 630b3919abb5
Successfully built 630b3919abb5
Successfully tagged simple-docker-app:latest
```

The `docker build` command itself instructs the Docker daemon to build a new
image, the `--tag` (shortened form `-t`) switch informs it how to name the image
(naming is in the form of `repository:tag`, where the `tag` is optional), and
the `.` is the path to the build context, in this case the directory we're
running the command inside.

As you can see, quite a lot happens here. You'll see that there are several
steps which get output (eg.
`Step 1/4 : FROM balenalib/intel-nuc-debian-node:latest`). As you may have
noticed, each of these steps corresponds to a Dockerfile directive. Therefore
you can quickly see which directive is being run by the step that's being
carried out. In this case, the Docker daemon pulls the base image required (and
during this you can see each individual image layer that makes up the base image
being pulled), before copying the files into the image, carrying out the npm
install and then setting the command to run on container instantiation.

Another really important point to note here is that when a Dockerfile is
processed, new layers for that image are created by particular directives.
Generally, new layers are created by each new Dockerfile directive (this is not
always true, but at this point, thinking about it in this way is useful). As
such, consolidating command into statements such as `RUN` can be useful, as it
limits the number of layers produced in an image. We'll go more into these
techniques later in the Masterclass.

We can now list the images by running:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              630b3919abb5        14 minutes ago      272MB
balenalib/intel-nuc-debian-node   latest              4498fe12b99e        11 hours ago        270MB
```

Note that each image has a repository name, tag and image ID. Most Docker
commands working with images can take the name of the container or the ID.
If using the container name, note that a Docker image repository name can be
used with or without a tag, however if there is more than one tag for an image's
Docker repository name, the `latest` tag will be assumed if not given.

More information about repository naming and tags will be discussed in a later
exercise.

As you can see, we have a total of two images. The first is expected, because
this is the image we just built (`simple-docker-app`), but the base image that
our Docker image has inherited from is also present
(`balenalib/intel-nuc-debian-node`). This is because Docker stores each image,
including base images that others inherit, separately inside the system. When
a container is created from an image, all the layers that make up the image are
referenced and used by the container. This happens regardless of the number of
times an image is used, or how many parents it has. Because layers are
referenced and not directly copied, this allows many different containers to
run without the resource penalty of copying the same files and directory layouts
for each separate instance, thus saving a large amount of space.

#### 5.1 [`WORKDIR`](https://docs.docker.com/engine/reference/builder/#workdir) Directive

We now have a built image. However, even though we've a few steps, there's a
few things we could so to improve the way it's built. The first is to specify
a working directory. The `WORKDIR` directive tell the Docker daemon that this is
our default working directory. Think of it a bit like running `cd` to change to
the directory specified before running any commands.

With that in mind, add a new line to our Dockerfile after the `FROM` directive:

```dockerfile
WORKDIR /usr/src/app
```

We'll also now change a few of the other lines to remove specific references to
`/usr/src/app`.
Change:

```dockerfile
RUN cd /usr/src/app \
    && npm install
```

to:

```dockerfile
RUN npm install
```

And finally change:

```dockerfile
CMD ["/usr/local/bin/node", "/usr/src/app/index.js"]
```

to:

```dockerfile
CMD ["/usr/local/bin/node", "index.js"]
```

Let's rebuild the image again:

```shell
$ docker build -t simple-docker-app .
Sending build context to Docker daemon  18.94kB
Step 1/5 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/5 : WORKDIR /usr/src/app
 ---> ebec93079c63
Step 3/5 : COPY * /usr/src/app/
 ---> aa53bfc5582c
Step 4/5 : RUN npm install
 ---> Running in 7a726fbf79ad
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 2.249s
found 0 vulnerabilities

Removing intermediate container 7a726fbf79ad
 ---> 6c7e0341586d
Step 5/5 : CMD ["/usr/local/bin/node", "index.js"]
 ---> Running in c83a11a07b0f
Removing intermediate container c83a11a07b0f
 ---> ca72102d9256
Successfully built ca72102d9256
Successfully tagged simple-docker-app:latest
```

The first thing you'll notice is that the `FROM` line didn't show the Debian
base image being pulled. That's because it's already downloaded and stored it
in the local registry.

The next thing you'll notice is that we no longer have to specify the `cd`
to change directory in the `RUN` command. If we hadn't specified the `WORKDIR`
to use, it would be looking at the root `/` of the filesystem to run
`npm install` and would fail as the `package.json` would not exist there.

Finally, we no longer have to specify the full path of the `index.js` source
file, as this exists in the `/usr/src/app` directory (which is our working
directory).

As we've now specified the working directory as `/usr/src/app`, we could also
change the command used to actually run the Node.js app to npm, as it would find
the `package.json` in the same directory and use the `start` section from it.

Change the final `CMD` line to:

```dockerfile
CMD ["/usr/local/bin/npm", "start"]
```

Finally rebuild the image again so this final line is used, with:

```shell
$ docker build -t simple-docker-app .
```

### 6. Docker Containers

We now have a built Docker image, let's run it! First it's worth noting a
little bit about what happens when you run a Docker image and use it to create
a new container.

Docker containers run as processes spawned by the Docker daemon. Linux-based,
they use the underlying host kernel to do so. Under host OSs such as macOS
and Windows, these kernels are supplied by minimal Linux VMs that are closely
bound to the underlying host OS so that contexts such as device nodes,
networking, etc. are available to the VM kernel and therefore the container
running on it.

This explains why OS resources are acquired by containers dynamically (and also
released when no longer required), as each running process only consumes what it
needs, as it essentially *is* running on the host OS, albeit in a file system
and resource sandbox.

#### 6.1 Running a Container

To run an image as a container, we can use the
[`docker run`](https://docs.docker.com/engine/reference/commandline/run/)
command. We can either pass the repository and tag name or use the ID. We'll
just simply ask `docker run` to use the `simple-docker-app` image, without a tag
(which will assume it should use the `latest` tag):

```shell
$ docker run --tty simple-docker-app

> simple-docker-app@1.0.0 start /usr/src/app
> node index.js

Echo server is up and listening...
```

We'll explain the significance of `--tty` later, but for now it just means that
we can stop the container using `Ctrl+C` when we're done with it.
The act of running creates a new container instance based on that
image, which is now running under the Docker daemon. Open a new terminal (which
from this point on we'll call T2 with the terminal you ran the Docker image in
as T1), and enter:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
61578a11c16e        simple-docker-app   "/usr/bin/entry.sh /…"   About a minute ago   Up About a minute                       tender_gagarin
```

[`docker ps`](https://docs.docker.com/engine/reference/commandline/ps/) shows
us all the currently running container instances. In this case there's just the
one we've started. You can see the command that it's running, as well as the
image it's derived from. It also has a container ID (just like an image, each
container also has a unique ID) and a name (which because we didn't specifically
pick one when running is autogenerated). However, there's also another field you
might notice which doesn't have any value associated with it. This is the
`PORTS` field.

If you look at the source code in `index.js`, you'll see that we've a little
endpoint service listening for REST POST requests to the `/echo` endpoint.
You'll also see that the service is running on port 9854. So, let's use `curl`
in T2 to send a POST request:

```shell
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Hello there!'
curl: (7) Failed to connect to localhost port 9854: Connection refused
```

Well, that's odd! The source for the image shows that the Express server is
listening on port 9854, but `curl` can't get a connection to it. The reason is
that whilst the Express server in the container is trying to listen to the
port, we haven't actually told the Docker daemon that the container should open
a connection to the same port. This actually demonstrates a fundamental
principal behind containerization, in that unless specifically instructed,
Docker sandboxes all running containers securely away from the host OS.

#### 6.2 Stopping and Restarting a Container

First terminate the container using either `Ctrl+C` in T1 where it's running,
or stop it by running
[`docker stop`](https://docs.docker.com/engine/reference/commandline/stop/) in
T2, passing either its name or ID as a final parameter. In the case of the
container we've created here, that would be:

```shell
$ docker stop tender_gagarin
```

or:

```shell
$ docker stop 61578a11c16e
```

Once stopped, the container no longer shows up as running in `docker ps`:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

But it will show up as a stopped container in the list of all containers if we
pass `--all` (shortened form `-a`) to `docker ps`:

```shell
$ docker ps --all
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
61578a11c16e        simple-docker-app   "/usr/bin/entry.sh /…"   About a minute ago   Exited (0) a minute ago                 tender_gagarin
```

The `--all` (which can also be written `-a`) switch to `docker ps` tells it to
list *all* the container instances that are currently available, not just those
that are currently running.

We can restart the container easily with
[`docker start`](https://docs.docker.com/engine/reference/commandline/start/),
which will allow you to restart any previously created and stopped container
instance. Simply pass the name of the container or its ID and Docker will start
the container again using the same parameters that it was originally run or
created with.

```shell
$ docker start 61578a11c16e
61578a11c16e
```

Finally stop the container again before continuing with:

```shell
$ docker stop 61578a11c16e
61578a11c16e
```

#### 6.3 Creating a Container

Instead of using `docker run`, we could also use
[`docker create`](https://docs.docker.com/engine/reference/commandline/create/)
to create a new container from an image. However, this command only creates a
container and does not run it. `docker create` takes many of the same parameters
as `docker run`. To start running a created container, you then need to use
`docker start` on the container name or ID.

#### 6.4 Publishing Container Ports

We'll get into Docker networking later and how traffic is routed, but for now
all we need to know is that to ensure that traffic can get in and out of the
container so that Express can receive traffic on port 9854, we need to run the
container with the `--publish` command to signal to the Docker daemon that we'd
like to 'publish' traffic into it from the host OS.

We're going to re-run the image again, but this time specifying that the
right port should be opened up into the container. In T1, run the following:

```shell
$ docker run --tty --publish 9854:9854 simple-docker-app

> simple-docker-app@1.0.0 start /usr/src/app
> node index.js

Echo server is up and listening...
```

Note that we specified 9854 *twice* as the arguments to the `--publish` switch
(this can be shortened to `-p`).
This isn't an error, but it lets us map a specific port inside the container
to a port on the host. In this case, we want both port numbers to be the same,
but you can change the host port by altering the first argument to be the port
on the host you want to use, ie.
`--publish <hostPort>:<containerPort>`.
As a final note, `--publish` also allows ranges of ports from the host to be
published (for example mapping all traffic from ports 1234 to 1238 on the host
to a single port inside the container would be `--publish 1234-1238:1234-1238`).

In T2, have a look at the output of `docker ps` again:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
0579294093b6        simple-docker-app   "/usr/bin/entry.sh /…"   8 seconds ago       Up 8 seconds        0.0.0.0:9854->9854/tcp   jolly_banzai
```

Aha! Now we can see that the `PORTS` section has a value in it,
`0.0.0.0:9854->9854/tcp`. This states that port `9854` on IP address `0.0.0.0`
on the host OS is mapped to port `9854/tcp` inside the container. A couple of
things to note are that by default, unless otherwise specified, the Docker
daemon will allow traffic coming into the host on any interface through the
specified port into the container (hence `0.0.0.0` which states any IP assigned
to a valid host network interface). We could have specified a set IP address for
the host, for example if we wanted only to let traffic coming through localhost
into the container, we could use `--publish 127.0.0.1:9854/9854`.
Additionally you can see that the traffic entering the container from the host
on port 9854 is going to port `9854/tcp` in the container. TCP is always the
default if not otherwise stated. To use UDP instead, simply prefix the published
ports list with `/udp`, eg. `--publish 9854/udp:9854/udp` would map any traffic
from UDP port 9854 on the host to UDP port 9854 in the container.

Finally let's try the `curl` command again in T2:

```shell
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Hello there!'
Hello there!
```

Success! We've posted an HTTP request from the host to the Docker container
instance, and received a response.

Finally, stop the container currently running either with `Ctrl+C` in T1, or via
`docker stop` in T2.

#### 6.5 [EXPOSE](https://docs.docker.com/engine/reference/builder/#expose#expose) Directive

Whilst we're on the topic of ports, this is a good time to quickly discuss the
`EXPOSE` directive. This can be used in Dockerfiles to state that the container
would like to open a particular port when run as a container. Let's try this
by adding:

```dockerfile
EXPOSE 9854
```

to our Dockerfile (it doesn't matter particularly where for this example, but
good practice is near the start of the Dockerfile, after the `FROM` line).
(If you wanted to expose a UDP port, you'd simply specify `EXPOSE 9854/udp`.)

Now let's rebuild our Docker image in T1:

```shell
$ docker build -t simple-docker-app .
Sending build context to Docker daemon  18.94kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Running in a864220d9450
Removing intermediate container a864220d9450
 ---> 6c956e6eab8a
Step 3/6 : WORKDIR /usr/src/app
 ---> Running in 51b79d5d5e92
Removing intermediate container 51b79d5d5e92
 ---> e871df45a8ae
Step 4/6 : COPY * /usr/src/app/
 ---> 4cc2425acfa2
Step 5/6 : RUN npm install
 ---> Running in 4dad7c0549f3
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 2.332s
found 0 vulnerabilities

Removing intermediate container 4dad7c0549f3
 ---> f8d369f729ae
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 1c027dde602e
Removing intermediate container 1c027dde602e
 ---> 8d1460ff22b2
Successfully built 8d1460ff22b2
Successfully tagged simple-docker-app:latest
```

Now we'll run the new version of the image, but we'll remove the use of
`--publish` and instead use the `--publish-all` (shortened form `-P`) switch
instead, which will publish all ports specifed in `EXPOSE` directives in the
image to the host:

```shell
$ docker run --tty --publish-all simple-docker-app

> simple-docker-app@1.0.0 start /usr/src/app
> node index.js

Echo server is up and listening...
```

In T2 run the `curl` command again:

```shell
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Hello there!'
curl: (7) Failed to connect to localhost port 9854: Connection refused
```

It looks like `curl` can't actually connect to the host on port 9854. Let's use
T2 again to see what `docker ps` says:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
636c8f11fee2        simple-docker-app   "/usr/bin/entry.sh /…"   3 minutes ago       Up 3 minutes        0.0.0.0:32769->9854/tcp   epic_montalcini
```

Interestingly, whilst port 9854 in the container *is* mapped a port on the host,
it's not mapped to port 9854. This is because `--publish-all` maps ports
specified by the `EXPOSE` directive to
[ephemeral ports](https://en.wikipedia.org/wiki/Ephemeral_port) on the host,
usually the next free one. This initially doesn't sound particularly useful,
but becomes more so in the context of Docker deployments to Cloud hosts where
services are usually run.

If we now try `curl` again in T2 using port 32769 (this will most likely change
on your own machine, ensure you use the right mapped port), we'll see that all
works as expected:

```shell
$ curl -XPOST http://localhost:32769/echo -H 'Content-type: text/plain' -d 'Hello there!'
Hello there!
```

Any Docker image which has been built with the `EXPOSE` directive can still be
forced to map a specific host port to a specific container port just as before
by using the `--publish` switch to `docker run`.

Whilst the use of `EXPOSE` is not mandatory when writing Dockerfiles, its use
is encouraged as useful documentation and metadata to those who want to run your
Docker images. This stops extra documentation being required to state explicitly
which ports your image uses, and also means when you update your image, all a
user has to do is see if extra `EXPOSE` directives have been used and then map
the new ports appropriately to the host.

Finally, stop the container running in T1 and then close T2. We'll refer to
T1 from this point as 'the terminal' again.

#### 6.6 Container Instances

One thing you may have spotted whilst we were stopping and rerunning our Docker
image was that the name and the ID of the container kept changing.

In the terminal, run the following:

```shell
$ docker ps --all
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS               NAMES
636c8f11fee2        simple-docker-app   "/usr/bin/entry.sh /…"   20 minutes ago      Exited (0) 3 minutes ago                           epic_montalcini
0579294093b6        f50ceee6da24        "/usr/bin/entry.sh /…"   51 minutes ago      Exited (0) 26 minutes ago                          jolly_banzai
61578a11c16e        d00c59983bd8        "/usr/bin/entry.sh /…"   About an hour ago   Exited (0) About an hour ago                       tender_gagarin
```

However, looking at the list, this seems strange at first. We we just kept
running our `simple-docker-app`, so why are there several instances of it? Well,
every time we used `docker run simple-docker-app`, we were asking the Docker
daemon to run a *new* instance of the image, not to run the same container
image that we had before. If we want to re-start an already existing container,
we'd simply use
[`docker start`](https://docs.docker.com/engine/reference/commandline/start/).

### 7. Tags and Caching in Docker Builds

We've previously built an image using `docker build`, but currently if we make
any changes this rebuilds the entire image. In this section, we'll learn how
to tag images to give them versioning information, as well as how to use
caching to ensure quicker rebuilding of images.

#### 7.1 Tagging Images

You can also see from the container list that only the last container ran using
the `simple-docker-app` image, but why is this? If you remember earlier we
discussed that each image name had a repository and tag section. Because we
have rebuilt the image several times with changes to the Dockerfile, we've
actually changed the resulting image's file system layers and unique hash.
This has meant that the `latest` tag on the `simple-docker-app` repository has
moved each time we've made changes to the image to the newly built version of
it. In the above output, both images `d00c59983bd8` and `f50ceee6da24` *were*
previously called `simple-docker-app`, as they were the last version of the
image to be built. However, as we've built new versions, their name has been
changed to that of the image's ID instead, to differentiate them from the other
versions.

This again is consistent with how Docker denotes images and containers. If we
hadn't made any changes to the image but simply rebuilt it, it would have
checked the layers against those that already exist for the image, have seen
nothing had changed, and the image would not have been given a new ID or name.

We can easily check this by running the following in the terminal:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              8d1460ff22b2        29 minutes ago      272MB
...
```

The latest image ID for `simple-docker-app:latest` is `8d1460ff22b2`. Let's
try rebuilding the image:

```shell
$ docker build -t simple-docker-app .
Sending build context to Docker daemon  18.94kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> 6c956e6eab8a
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> e871df45a8ae
Step 4/6 : COPY * /usr/src/app/
 ---> Using cache
 ---> 4cc2425acfa2
Step 5/6 : RUN npm install
 ---> Using cache
 ---> f8d369f729ae
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Using cache
 ---> 8d1460ff22b2
Successfully built 8d1460ff22b2
Successfully tagged simple-docker-app:latest
```

The build will finish almost at once; because there were no changes, the image
ID build is *still* `8d1460ff22b2`, and the name remains the same:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              8d1460ff22b2        32 minutes ago      272MB
...
```

If we were to make any changes to the Dockerfile or any of the files built into
the image, the ID and the name would change again, to denote that the `latest`
version of the image is now different to that previously.

To make this a bit clearer, we'll remove all the current containers and images
and start again with a new naming scheme.

In the terminal run:

```shell
$ docker rm $(docker ps --all --quiet) && docker rmi $(docker images --quiet)
92b04db835b2
c7747c038ccb
646ee43d28ec
Untagged: simple-docker-app:latest
Deleted: sha256:d3916aacd72ef1e141885e7726dd8b1ca0388e6e10b2d8faf79f3cde60cf803d
Deleted: sha256:46d5233518e31e66f3447c830bb70372787d1873d012e9b8ad57fd108f4c4b02
Deleted: sha256:4187fd02a41805db6d6dbef6aab2b257aff00e166b8db2ede3060015247c9632
Deleted: sha256:bb46a70a9ea96fe011d030f518aabd7fa5619c42e0cc5adab5cb371d22bb1342
Deleted: sha256:419dff4dd6df34bba7cbab86dae5845c189b6c7dd6e08a9a7564de7d6df87af6
Deleted: sha256:4e71ef43d45dc3f7758b01c9b722331a22cf8a7c895ccdf4638c6dc62cdf4802
Deleted: sha256:bb249dbcb57e2548dbf63b0b3f148edd1380ac956ed5fca994d990331b3f00c3
Deleted: sha256:2183028d46ba9f26d13177acc9cfc9065f480673118360ff23ef81ac7915898e
Deleted: sha256:b9bb00a5e2249823a25a926a24c4f28292629fe42db30ce6e266eae32bff5b8d
Deleted: sha256:dbb5f06727dc12ecd7db5ea5ede261d4197e1cdbe009c7decc8edbb69e0a21ea
Deleted: sha256:0e9cc530a9220017f6687e024834f9220ec5e7e8acdc28dd88b40cc1a884b385
Deleted: sha256:063849044d81abc6006d5b7a5facfd6181ba0d1d4b648f4dddffed81d0d5b556
Deleted: sha256:a849ba8f23c4f8eeef20ac2ff3dcb587b6bc49874492aaaab313001337a2ead0
Deleted: sha256:01753aa7f35f274cc19cda7a05cf52f9453b4e8d50f949d2d1c1d240dbfc9ced
Deleted: sha256:b9c4eebbf47dd5650591125038aecb2d42c705720abd6f0dec5251b5addae859
Deleted: sha256:9737e0a4b16054e6a1477c2d3727f0f80e41b063894f878734a7b5f16c741568
Deleted: sha256:42f2cd768ae7bf3e8d41211db4d305ff25a7e90a952e643420fd48fa90885803
Deleted: sha256:222e19d39a010af250e7acc204ff5aeca1dff11991435d3bf4539ada9bea10f3
Deleted: sha256:e3fccddc6e65c39402683215147e79ee63fe6cd79ee38b8deacf01da0c8c63d6
Deleted: sha256:a4651a5f72e536808b761f364233aff6943adf92272ca0d63d27bbfa18a3da09
Deleted: sha256:4d15f60da9f321cdeefecfd0c5699cf0bddf6fcc371782a7f29105abf11f361f
Deleted: sha256:45783d47385fda0accce26aa731d61be719ffc9cc4889d43f64621cbf44e999c
Deleted: sha256:78ff73474fe0a280269358279dfde63d4f0d81c2fdf37b42dde76c3ef1583f6d
Deleted: sha256:f70452e65f0456c42f67affc22ef1f6c6530211fa9138c063a984e4a28315ead
Deleted: sha256:53c350e072b435330016235e6081255151c104c2a73664a39436f59c81b8d030
Untagged: balenalib/intel-nuc-debian-node:latest
Untagged: balenalib/intel-nuc-debian-node@sha256:0a613216d7a23e2ebbb54c0d42f420e8ba65b7d5507149a6690141e4ed700531
Deleted: sha256:4498fe12b99e2e5b0ed343ac14f53ceefa18b8d7a8ad458da05ffb094989bfe5
Deleted: sha256:6774853e36677eac96d376174993694fc24daa455724ba99b498d30eaaff581c
Deleted: sha256:191098869ebd8201a2e909969fb26db0a13d5ed20dc807bdb639c52fa0cd3aa5
Deleted: sha256:255db71d63d0f14a6babfed360cc8317c6f060046902c2492d25edbdd6efd74e
Deleted: sha256:54b05cf3c2b53f3aa35b63d6e517dcc66ad4e5c04cf3e10f8a77685b964b3b11
Deleted: sha256:5a8535c5253022eb99d04334c697d356cd6d28876965cc55f9c8cc8976ba44c5
Deleted: sha256:f77bc377ce89acd6568b3640f2d17ab69fba419f3c45ea5036842188fe610baa
Deleted: sha256:52638c47b14625df47fc7ece74f6508c056181e965e2acbc7e4e1ae269f7a0d0
Deleted: sha256:bd032d966a12ff731c1a46bf62b0fe079d4c412d3e290d4f6321c483ea9eb2eb
Deleted: sha256:6d378e46857b5177133d61d45333dae1f29e6171914bc5ee7bcc7e2f0fc75c17
Deleted: sha256:f2cb0ecef392f2a630fa1205b874ab2e2aedf96de04d0b8838e4e728e28142da
```

This will wipe *all* images and containers from the local repository. Let's
quickly break down what that command did:

```shell
docker rm $(docker ps --all --quiet)
```

The `docker ps --all --quiet` command lists all instances of containers, running
or not, and output their IDs and nothing else (the `--quiet` switch, which can
also be shortened to `-q`). The `$()` wrapper executes this for the `docker rm`
command, which then removes each of these container IDs from the local
repository. You can individually remove a container instance either by using its
name or ID, eg. `docker rm <IDorName>`.

After this, the next command is run:

```shell
docker rmi $(docker images --quiet)
```

Similarly to the `docker ps` command, the `--quiet` switch to `docker images`
will only output the IDs of the images. This is then exectured for `docker rmi`
which will remove each image by its ID. Again, you can manually remove a
Docker image from the local repository with `docker rmi <IDorRepositoryName>`.

A few things to note here, had we just tried to remove the images without first
remove the containers, Docker would have complained that the images were in use
by instantiated containers. A quick way round this is to use `--force`
(shortened form `-f`) when running `docker rmi`, but bear in mind it will never
remove the image from a running container, which must be manually stopped first.
Another important note is that whilst the images will be removed doing this,
it will not remove containers that have been created from these images.

We're going to now rebuild our image from the Dockerfile, but this time we're
explicitly going to give it version tags:

```shell
$ docker build -t simple-docker-app:v0.0.1 .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
latest: Pulling from balenalib/intel-nuc-debian-node
68ced04f60ab: Pull complete
1418738fb4eb: Pull complete
28ddf06c756e: Pull complete
6544792768e8: Pull complete
6e7ea75f4464: Pull complete
38aca9ee3123: Pull complete
5e30c86f7b84: Pull complete
12febcfb1db1: Pull complete
4acc7449c8c2: Pull complete
45be4c06aae8: Pull complete
Digest: sha256:0a613216d7a23e2ebbb54c0d42f420e8ba65b7d5507149a6690141e4ed700531
Status: Downloaded newer image for balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Running in d946211dd5c2
Removing intermediate container d946211dd5c2
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Running in 0dfe40907d63
Removing intermediate container 0dfe40907d63
 ---> 568a5e43a29e
Step 4/6 : COPY * /usr/src/app/
 ---> 14385fc25cae
Step 5/6 : RUN npm install
 ---> Running in 77c4a4af57d7
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 3.933s
found 0 vulnerabilities

Removing intermediate container 77c4a4af57d7
 ---> bdb6468729c5
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in a628f762ef4b
Removing intermediate container a628f762ef4b
 ---> 25d3625211c2
Successfully built 25d3625211c2
Successfully tagged simple-docker-app:v0.0.1
```

Now run:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 v0.0.1              25d3625211c2        24 seconds ago      273MB
balenalib/intel-nuc-debian-node   latest              4498fe12b99e        38 hours ago        270MB
```

Unlike when we built the image before, we have now set a specific tag for the
image repository. Also note how the `latest` tag is not present. Let's try
and run the image in the same way we did before, using just the repository name:

```shell
$ docker run --tty simple-docker-app
Unable to find image 'simple-docker-app:latest' locally
docker: Error response from daemon: pull access denied for simple-docker-app, repository does not exist or may require 'docker login': denied: requested access to the resource is denied.
See 'docker run --help'.
```

Docker can't find the `latest` tag, because it's not been set, so it is not
able to run the image. We *could* run it by specifying
`docker run simple-docker-app:v0.0.1`, but there's also a couple of ways we
can generate the latest tag too. The first would be to rebuild the image with
the `latest` tag as well:

```shell
$ docker build -t simple-docker-app:v0.0.1 -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/6 : COPY * /usr/src/app/
 ---> Using cache
 ---> 14385fc25cae
Step 5/6 : RUN npm install
 ---> Using cache
 ---> bdb6468729c5
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Using cache
 ---> 25d3625211c2
Successfully built 25d3625211c2
Successfully tagged simple-docker-app:v0.0.1
Successfully tagged simple-docker-app:latest
```

Again, this rebuild was very fast because nothing had actually changed, and
all that the Docker daemon actually had to do was add a new tag. Tags show up
as separate images. If we list the images again:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED              SIZE
simple-docker-app                 latest              25d3625211c2        About a minute ago   273MB
simple-docker-app                 v0.0.1              25d3625211c2        About a minute ago   273MB
balenalib/intel-nuc-debian-node   latest              4498fe12b99e        38 hours ago         270MB
```

You can see that the *same* image ID is actually related to two different tags.
We will now be able to run the image without the specific tag (defaulting to
`latest`) again.

However, if we now change something that alters the image that we build, this
will change he situation. In your code editor, change `index.js` and add a
line at the very top that says:

```js
// This comment changes the image
```

We'll now rebuild the image with:

```shell
$ docker build -t simple-docker-app .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/6 : COPY * /usr/src/app/
 ---> 984238d40dc5
Step 5/6 : RUN npm install
 ---> Running in 6daa75bedeb7
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 4.965s
found 0 vulnerabilities

Removing intermediate container 6daa75bedeb7
 ---> 2ffc21acaf16
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 97806c309a25
Removing intermediate container 97806c309a25
 ---> 4817e03f7def
Successfully built 4817e03f7def
Successfully tagged simple-docker-app:latest
```

Finally run:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              4817e03f7def        27 seconds ago      273MB
simple-docker-app                 v0.0.1              25d3625211c2        2 minutes ago       273MB
balenalib/intel-nuc-debian-node   latest              4498fe12b99e        38 hours ago        270MB
```

As you can see, because when we rebuilt we only specified the repository name
to `-t` and *not* an actual tag, `latest` was assumed and the `latest` tag now
points to the newer image.

It's always a really good idea to specifically tag the images you're building
with a suffix. This stops older built images from losing their repository and
tag name, which allows you to easily identify older versions of the image.

To reinforce that point, we'll add one final comment line to `index.js`, just
below the other:

```js
// Another comment changes the image
```

Finally, rebuild the image with a `v0.0.2` tag *and* the `latest` tag:

```shell
$ docker build -t simple-docker-app:v0.0.2 -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/6 : COPY * /usr/src/app/
 ---> ba616c670298
Step 5/6 : RUN npm install
 ---> Running in 0201cb715e8a
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 2.677s
found 0 vulnerabilities

Removing intermediate container 0201cb715e8a
 ---> b20eabc15eb0
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in dceef18cc322
Removing intermediate container dceef18cc322
 ---> d7fefc78916d
Successfully built d7fefc78916d
Successfully tagged simple-docker-app:v0.0.2
Successfully tagged simple-docker-app:latest
```

And run:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED              SIZE
simple-docker-app                 latest              d7fefc78916d        22 seconds ago       273MB
simple-docker-app                 v0.0.2              d7fefc78916d        22 seconds ago       273MB
<none>                            <none>              4817e03f7def        About a minute ago   273MB
simple-docker-app                 v0.0.1              25d3625211c2        3 minutes ago        273MB
balenalib/intel-nuc-debian-node   latest              4498fe12b99e        38 hours ago         270MB
```

We now have a new version, `v0.0.2`, which is also the `latest` version. We also
still have our original version, `v0.0.1`. But note that the version we built
without a tag has now been stripped of its repository and `latest` tag. Because
Docker was not given a full `repository:tag` name for the image, and because
we've moved the `latest` tag on, it's had to remove the name and tag from that
image, and it is now only know by it's original ID (`4817e03f7def`).

#### 7.2 Build Caching

Usually, especially during development of a Docker service, you'll want to
change things such as the packages being installed into the image, the source
code for the application itself, configuration files, etc.

Whilst our small example Docker image builds quite quickly, if we were to start
building very large images we wouldn't want the entire image to be rebuilt from
scratch every time we changed a source file that had nothing to do with OS
packages being installed.

As we've previously mentioned, when building an image each Dockerfile directive
(known as a step) is processed in serial, and these usually result in new
layers. However, when building an image, the Docker daemon actually examines the
directive and the layers already in the local repository, and determines if it
actually needs to create a new layer for that directive or just re-use what
already exists.

Let's visualize an example here to make it a bit clearer. Taking the contents
of the `simple-docker-app` Dockerfile you currently have, it'll look something
like this:

```dockerfile
FROM balenalib/intel-nuc-debian-node:latest

EXPOSE 9854

WORKDIR /usr/src/app

COPY * /usr/src/app/

RUN npm install

CMD ["/usr/local/bin/npm", "start"]
```

If we rebuild the app, without making any changes, we'll see that Docker
finishes it very quickly:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/6 : COPY * /usr/src/app/
 ---> Using cache
 ---> ba616c670298
Step 5/6 : RUN npm install
 ---> Using cache
 ---> b20eabc15eb0
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Using cache
 ---> d7fefc78916d
Successfully built d7fefc78916d
Successfully tagged simple-docker-app:latest
```

Note that for each step that gets carried out, Docker reports `Using cache`.
The reason for this is because Docker has noticed that there is already an image
that exists based on `balenalib/intel-nuc-debian-node:latest`, and that for
each step in the Dockerfile, there's already a layer that corresponds to
this step from a previous build. This *only* occurs because the steps are in
the same order and carry out the same operations. Because of this, it can reuse
the layers that already exist. This is called Docker caching, and it's another
powerful feature in building Docker images.

However, as soon as something changes either in the Dockerfile directives or
any of the files that are used in building the image, this causes Docker to
have to build a new layer as it no longer pertains to previously created layers
for that step. This is called 'cache busting'.

So now we know a bit more about this, let's change one of the last lines in the
Dockerfile so that change the way the output image is built. Just before the
final line in the Dockerfile (the `CMD` line), add the following:

```dockerfile
RUN echo "I'm a new layer!"
```

From what we now know, when we now rebuild the Docker image it'll use the cache
for all the layers up to the new step we've added with the new `RUN` directive:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon  4.096kB
Step 1/7 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/7 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/7 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/7 : COPY * /usr/src/app/
 ---> 1170dda6a85a
Step 5/7 : RUN npm install
 ---> Running in f0f10ee5cb1c
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 4.573s
found 0 vulnerabilities

Removing intermediate container f0f10ee5cb1c
 ---> a59c235d0394
Step 6/7 : RUN echo "I'm a new layer!"
 ---> Running in 2ffe6005e09e
I'm a new layer!
Removing intermediate container 2ffe6005e09e
 ---> c9d98338032c
Step 7/7 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 5b954db009d2
Removing intermediate container 5b954db009d2
 ---> 8c3c0d4e9665
Successfully built 8c3c0d4e9665
Successfully tagged simple-docker-app:latest
```

We can see from the build output though, that it has *not* used the cache for
all the steps up to the new directive. In fact, although it used the cache for
the `FROM`, `EXPOSE` and `WORKDIR` steps, it created a new layer for the `COPY`
command onwards. But we didn't change anything else apart from the Dockerfile!
Well, that actually explains exactly the reason *why* it created a new layer
from that point onwards. Let's look at the `COPY` command:

```dockerfile
COPY * /usr/src/app/
```

This says to copy everything from the current build context into the
`/usr/src/app` directory inside the image. But this *includes* the Dockerfile
itself, which we've changed. Because of this, the layer output would not be
the same as the ones from previous builds, as the contents of the Dockerfile
are now different. There's a pretty obvious way round this, which is to *not*
copy the Dockerfile as part of the build context. There's a couple of different
ways to do this.

The first is via the use of a
[`.dockerignore`](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
file. This allows us to specify files and directories that shouldn't be included
as part of the context sent via `COPY` (or `ADD` which we'll describe later in
the Masterclass). In the `simple-docker-app` directory, execute the following:

```shell
cat <<EOF >> .dockerignore
Dockerfile
.dockerignore
EOF
```

This will create a `.dockerignore` file that says not to copy the `Dockerfile`
and `.dockerignore` file to the new layer when the `COPY` command is run. Note
that if we hadn't included the `.dockerignore` file itself, then when a build
is next run, cache busting will still occur on the `COPY` line because the
`.dockerignore` file itself would be copied into the image!

And now let's add yet another line to the Dockerfile just before the `CMD`:

```dockerfile
RUN echo "I'm yet another new layer!"
```

Run the build again:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/8 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/8 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/8 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/8 : COPY * /usr/src/app/
 ---> 9dba319eb545
Step 5/8 : RUN npm install
 ---> e592d47811be
Step 6/8 : RUN echo "I'm a new layer!"
 ---> 50b9b858560a
Step 7/8 : RUN echo "I'm yet another new layer!"
 ---> Running in d2f1941af3f7
I'm yet another new layer!
Removing intermediate container d2f1941af3f7
 ---> 088cb20dc04e
Step 8/8 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in c73ee349d0c8
Removing intermediate container c73ee349d0c8
 ---> 8da0e5e54752
Successfully built 8da0e5e54752
Successfully tagged simple-docker-app:latest
```

So again, this didn't work, why not? Well, this time, the `COPY` instruction
has changed again because now we're *not* copying the Dockerfile in. Finally,
add another new line before the `CMD` directive:

```dockerfile
RUN echo "I'm a final layer!"
```

And now rerun the build:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/9 : FROM balenalib/intel-nuc-debian-node:latest
  ---> 4498fe12b99e
Step 2/9 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/9 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/9 : COPY * /usr/src/app/
 ---> Using cache
 ---> 9dba319eb545
Step 5/9 : RUN npm install
 ---> Using cache
 ---> e592d47811be
Step 6/9 : RUN echo "I'm a new layer!"
 ---> Using cache
 ---> 50b9b858560a
Step 7/9 : RUN echo "I'm yet another new layer!"
 ---> Using cache
 ---> 088cb20dc04e
Step 8/9 : RUN echo "I'm a final layer!"
 ---> Running in 6ac0e5fd891e
I'm a final layer!
Removing intermediate container 6ac0e5fd891e
 ---> 4bf14cfdce0b
Step 9/9 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 8730c2627796
Removing intermediate container 8730c2627796
 ---> 14984b3f702d
Successfully built 14984b3f702d
Successfully tagged simple-docker-app:latest
```

This time the cache was used for the build right up until the new step we added
to the Dockerfile because it's no longer being copied. Finally, remove the
`RUN` lines that we just added.

There's another way to use `COPY` so that the cache is used efficiently, and
that's to only copy files required to build your image. Change your Dockerfile
so that the line:

```dockerfile
COPY * /usr/src/app/
```

becomes:

```dockerfile
COPY package.json index.js /usr/src/app/
```

If we hadn't have already created a `.dockerignore` file, this would have much
the same effect in that the Dockerfile would not be copied, but only the
npm package manifest and the source code.

Only copying what's required for a Docker image build is a very good habit to
get into, and is usually used in conjunction with `.dockerignore` files to
ensure that the cache is always used as much as possible.

The second way to ensure that the cache is used as much as possible is to
consider how files and directives may affect those that come after it in
the Dockerfile. By now, your Dockerfile should look something like this:

```dockerfile
FROM balenalib/intel-nuc-debian-node:latest

EXPOSE 9854

WORKDIR /usr/src/app

COPY package.json index.js /usr/src/app/

RUN npm install

CMD ["/usr/local/bin/npm", "start"]
```

Ensure that's up-to-date by building it with
`docker build -t simple-docker-app:latest .`.

Now remove the two lines in the `index.js` source file we added earlier,
ie.:

```js
// This comment changes the image
// Another comment changes the image
```

Let's rebuild the image again:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/6 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/6 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/6 : COPY package.json index.js /usr/src/app/
 ---> 0b2e6fcc9fb6
Step 5/6 : RUN npm install
 ---> Running in bbec4d8050c0
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 3.593s
found 0 vulnerabilities

Removing intermediate container bbec4d8050c0
 ---> 1529009594ee
Step 6/6 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 674741c25eaa
Removing intermediate container 674741c25eaa
 ---> 4f6086286849
Successfully built 4f6086286849
Successfully tagged simple-docker-app:latest
```

As expected, because we've removed the two lines from the source file,
everything from the `COPY` directive onwards has forced a cache bust and new
layers. However, there's actually something we can do here to ensure that
fewer new layers are required and that the majority of the build is used from
the cache. Note that we need the npm manifest (`package.json`) file to carry
out the npm installation of required modules. But this isn't actually something
that altering the source file changes. As we're not changing the manifest,
we could actually split up the `COPY` commands so that if only the source file
changes, the previous npm installation layer is used from cache. Change the
following lines in the Dockerfile:

```dockerfile
COPY package.json index.js /usr/src/app/

RUN npm install
```

to:

```dockerfile
COPY package.json /usr/src/app/

RUN npm install

COPY index.js /usr/src/app/
```

And rebuild the image again:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/7 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/7 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/7 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/7 : COPY package.json /usr/src/app/
 ---> 2c51ccf2a7b2
Step 5/7 : RUN npm install
 ---> Running in 02c04604c1f0
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN simple-docker-app@1.0.0 No description
npm WARN simple-docker-app@1.0.0 No repository field.

added 50 packages from 37 contributors and audited 126 packages in 2.638s
found 0 vulnerabilities

Removing intermediate container 02c04604c1f0
 ---> 1705ac26c046
Step 6/7 : COPY index.js /usr/src/app/
 ---> eb4a5841b1f5
Step 7/7 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in faf3d745a235
Removing intermediate container faf3d745a235
 ---> 3a8c0a432bc2
Successfully built 3a8c0a432bc2
Successfully tagged simple-docker-app:latest
```

Now change the `index.js` source file again and re-add those two comment lines:

```js
// This comment changes the image
// Another comment changes the image
```

at the start of the file. Finally let's rebuild again:

```shell
$ docker build -t simple-docker-app:latest .
Sending build context to Docker daemon   5.12kB
Step 1/7 : FROM balenalib/intel-nuc-debian-node:latest
 ---> 4498fe12b99e
Step 2/7 : EXPOSE 9854
 ---> Using cache
 ---> ff63da014498
Step 3/7 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 568a5e43a29e
Step 4/7 : COPY package.json /usr/src/app/
 ---> Using cache
 ---> 2c51ccf2a7b2
Step 5/7 : RUN npm install
 ---> Using cache
 ---> 1705ac26c046
Step 6/7 : COPY index.js /usr/src/app/
 ---> 5233ceadf248
Step 7/7 : CMD ["/usr/local/bin/npm", "start"]
 ---> Running in 0c15ac7cfc32
Removing intermediate container 0c15ac7cfc32
 ---> 81a2fcf7791c
Successfully built 81a2fcf7791c
Successfully tagged simple-docker-app:latest
```

The build was far quicker as npm didn't have to reinstall the used modules
again, and the filesystem layer already built was reused:

```shell
Step 5/7 : RUN npm install
 ---> Using cache
```

Considering how your Dockerfile is constructed, and how the cache may be
utilized, is an extremely important part of using Docker. Whilst the example
we've used is very simplistic, for builds where a Dockerfile is many lines long
this can be critical in cutting down build time from hours to minutes.

### 8. Running Containers in Detached, Command and Interactive Modes

So far we've `docker run` to create a new container, which outputs all `stdout`
to the console.

However, there are multiple ways in which a container can be instantiated.

#### 8.1 Detached Mode

Detached mode is pretty much what it sounds like. A container can be run, and
then detached from the current terminal to be run in the background by the
Docker daemon. In this mode, once the container is started it is detached from
the terminal, with no output being logged to it.

This can be achieved by passing the `--detach` (shortened form `-d`) to the
`docker run` command. Let's give this a go now:

```shell
$ docker run --detach --publish "9854:9854" simple-docker-app
f0960149a42f7f01c219c325e18da7beac0ca9ff7072344642f56baaeb9cd641
```

Notice how this time, we haven't passed `--tty`. That's because we're inherently
detaching the terminal from the Docker container, and the `--detach` would
essentially be in conflict.
The output from this command is the ID of the now running docker container:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
f0960149a42f        simple-docker-app   "/usr/bin/entry.sh /…"   11 seconds ago      Up 11 seconds       0.0.0.0:9854->9854/tcp   compassionate_williams
```

We can still use the container in detached mode, of course:

```bash
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Hello!'
Hello!
```

The container will now run until explicitly stopped. However, we may want to see
what it's doing. We can easily do this by using the
[`docker attach`](https://docs.docker.com/engine/reference/commandline/attach/)
command specifying the name or ID of the container:

```shell
docker attach f0960149a42f
```

Start a new terminal and in it run the `curl` command to our container again:

```shell
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Attached echo!'
Attached echo!
```

Note that in the terminal where we attached to the container, we see:

```shell
Echoing Attached echo!...
```

`Ctrl+C` in the terminal where we attached to the container will stop that
container, because we reattached to it after starting it in detached mode.
However, it's very important to note that if you run a container in detached
mode (or use `docker start` with its default parameters on a stopped container),
you need to use `docker stop` explicitly to stop that container if you do not
reattach a terminal to it.

Finally (if you haven't already), stop the running container.

#### 8.2 Command Mode

A container can also be run by overriding the default command that it uses
(the `CMD` directive from the Dockerfile). Here, the command that you want to
run instead is passed as the last parameters to the `docker run` command. Let's
try this now by running the following:

```shell
$ docker run --publish "9854:9854" simple-docker-app ls -l /usr/src/app
total 28
-rw-r--r--  1 root root   488 Mar  5 00:09 index.js
drwxr-xr-x 52 root root  4096 Mar  5 00:09 node_modules
-rw-r--r--  1 root root 14293 Mar  5 00:09 package-lock.json
-rw-r--r--  1 root root   321 Mar  3 18:50 package.json
```

Note that once the command exits, the container itself stops running. This is
because the command that we've used to override the default container command
is not a long running command, which brings us to another important point.
Docker containers only run for as long as the command they've been asked to
execute runs. As soon as that command exits, the container stops running.

We also don't use the `--tty` switch, because we're running a command we expect
to exit either successfully or with an error code, rather than a long-running
process that might need to be manually terminated.

#### 8.3 Interactive Mode

##### 8.3.1 Via `docker run`

Docker containers can also run in interactive mode. The `stdin` stream is passed
to the container from the host, which allows input directly into the container.
The `--interactive` (shortened form `-i`) switch passed to `docker run` allows
this, and it's usually used in conjunction with `--tty` (shortened form `-t`) to
allocate a psuedo terminal to the container. This allows us to perform many
operations as well as send signals (which is why `Ctrl+C` stops the container
running), but is also a very good way of quickly running interactive commands
in the container. Because we're using Node.js inside our container to run the
listening HTTP server, we can use interactive mode to get a psuedo terminal into
the Node.js interpreter. Run the following:

```shell
$ docker run --interactive --tty --publish "9854:9854" simple-docker-app /usr/local/bin/node
Welcome to Node.js v13.9.0.
Type ".help" for more information.
>
```

As you can see, we've now been able to gain a TTY into the Node.js process.
Feel free to run some JavaScript statements in it, and when you've finished
hit `Ctrl+C` twice to exit the interpreter. This will finish the interactive
session within the container, and the container (because we overrode the default
command by running `/usr/local/bin/node`) will stop.

Most non-lightweight Docker images are built based on top of a Linux
distribution of one kind or another. Our particular image was built using Debian
Buster as its base. Because of this, we can very easily use the inbuilt `bash`
shell to get a TTY connection into the container and run it as if we were just
using another installation of Debian:

```shell
$ docker run --interactive --tty --publish "9854:9854" simple-docker-app /bin/bash
root@30e19e9a868b:/usr/src/app#
```

Again, because we overrode the default command, the HTTP server isn't listening,
but because we've started an interactive container session using the shell,
we can actually easily run it:

```shell
root@30e19e9a868b:/usr/src/app# npm start

> simple-docker-app@1.0.0 start /usr/src/app
> node index.js

Echo server is up and listening...
```

If you now sent a `curl` command to the HTTP server, it would respond
appropriately.

Finally, exit and stop the container by using `Ctrl+C` to stop the HTTP server
and then `exit` to leave the interactive bash shell in the container.

##### 8.3.2 Via [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/)

Whilst `docker run` in interactive mode is very useful for examining the
container and its contents, because we're overriding the default command from
the Dockerfile, it means we have to manually run the command which would have
otherwise run on startup if we want to see the container running 'as normal'.

There is another command though that allows us to run a command in an already
running container. This is `docker exec`, and it behaves in the same way as
sending a command parameter to `docker run`, except that it does this on already
running containers.

To demonstrate, run a container in detached mode to start the HTTP server:

```shell
$ docker run --detach --publish "9854:9854" simple-docker-app
6c4e438ffa43683d7cb8a9f52ba72c4ec874acd11cd5842ae34cba8243c3c527
```

As we're running in detached mode, we can now send a `curl` command to prove
the HTTP server is listening:

```shell
$ curl -XPOST http://localhost:9854/echo -H 'Content-type: text/plain' -d 'Running echo!'
Running echo!
```

As we have the ID of the running container, we can now execute a command using
`docker exec` (obviously change the container ID appropriately):

```shell
$ docker exec --interactive --tty 6c4e438ffa43683d7cb8a9f52ba72c4ec874acd11cd5842ae34cba8243c3c527 /bin/bash
root@6c4e438ffa43:/usr/src/app# # ps -ae
  PID TTY          TIME CMD
    1 ?        00:00:00 npm
   30 ?        00:00:00 sh
   31 ?        00:00:00 node
   42 pts/0    00:00:00 bash
   48 pts/0    00:00:00 ps
```

We now have a bash shell into the container and as we can see, the `npm start`
from the `CMD` in the Dockerfile is running correctly as PID 1.

Finally stop the container:

```shell
$ docker stop 6c4e438ffa43683d7cb8a9f52ba72c4ec874acd11cd5842ae34cba8243c3c527
```

### 9. Bind Mounts and Volumes

As we've discussed previously, when an image is run and becomes a container
instance it uses the image's layers as the base file system for that
container. Whenever a container makes changes to the file system, a new layer
is created for that specific container instance with the relevant changes.

Because of this, any changes that the container makes to the file system is
only persistent for the life of that particular instance. Other instances will
use different layers, and none of these changes will occur in the image.

Deletion or recreation of the container will see these container instance layers
discarded. Whilst this is useful for transient files and directories, there are
times when files need to persist.

For example, suppose you've written an application where one Docker image deals
with storing and retrieving data from a database. A container instanced from the
image *could* store all of the data in a new layer, but should you want to
change the underlying code, create a new version of the image and then use it,
you can't update to this new version without either throwing all of the stored
data away or carrying out a very painful migration of the data from the old
container instance to the new.

This is where bind mounts and volumes become useful. When a container is
created or run, you can specify a bind mount or a volume to attach to that
container. This allows the container to then use the bind mount or the volume as
another filesystem path within the container, which allows for persistent
storage outside of the container.

#### 9.1 Bind Mounts

Bind mounts are directories or files that pre-exist on the Docker host machine
that, when specified on running, or creating a new container, get bound into the
container at a given destination path within that container.

This essentially allows the host machine's filesystem structure to be shared
with a container. Any changes made to the bound directory/file inside the
container will therefore change in the host, and vice versa.

To bind a directory or filepath to a container, simply use the
[`--mount`](https://docs.docker.com/storage/bind-mounts/) switch passed to
`docker run` or `docker create`. `--mount` takes several options (separated by
commas), which allows the source filepath, destination filepath, type of mount,
etc. to be specified.

Let's carry out a quick example of this. We'll use the
`balenalib/intel-nuc-debian-node` image to create a new container which binds
to an already existing directory structure. Run the following in the terminal
to change to the bind-mounts-and-volumes and start running a new container which
we'll connect a psuedo terminal to:

```shell
$ cd $BALENA_DOCKER_MASTERCLASS/bind-mounts-and-volumes
$ docker run --interactive --tty --mount type=bind,source="${BALENA_DOCKER_MASTERCLASS}"/bind-mounts-and-volumes/bind-directory,destination=/bound-mount simple-docker-app /bin/bash
root@ce0c2aa62101:/usr/src/app# cat /bound-mount/testfile.txt
This is a bound file!
root@ce0c2aa62101:/usr/src/app# echo "This was added from the container!" >> /bound-mount/testfile.txt
root@ce0c2aa62101:/usr/src/app# exit
exit
bind-mounts-and-volumes heds$ cat bind-directory/testfile.txt
This is a bound file!
This was added from the container!
```

Here we ran a new container instance, bound a local directory
(`/bind-mounts-and-volumes/bind-directory`) which contained a file into it,
started an interactive psuedo terminal, printed the contents of the file to
STDOUT, then added a new line. Finally we exited the container, and then printed
the contents of the newly changed file out. As you can see, the changes made
in-container are echoed in the host filing system. Changes at the host level
would also have been echoed in the container.

**A quick note on the `--volume` option for bind mounts:** Traditionally, bind
mounts were specified with the `--volume` option. This diverged when volumes
became first class Docker citizens, which is when `--mount` was introduced.
Whilst you *can* attach a bind mount to a container using `--volume`, it is
not recommended for those starting Docker, as it reinforces legacy behavior.
Try to only use `--mount` for bind and volume mounts (and just `--volume` for
Docker volumes if really required). Another important note is that a directory
or file used for bind mounting must exist prior to the mount occuring.

#### 9.2 Volumes

Volumes, unlike bind mounts, are Docker managed storage areas which can also
be mounted into a container. Also unlike bind mounts, a directory path is not
passed to the container, but the name of the volume itself. This has several
immediately obvious benefit that only the name of the volume is required to
work with it instead of a filepath. Another big advantage is that volumes can
be of many forms, and not just of local filesystem hierarchies. There are
volume drivers for NFS, `tmpfs` and others for example, which allows them to
be far more flexible than bind mounts.

For these exercises, we're just going to use a local filesystem volume.

Volumes, if not pre-existing, are created when a new container that it is
bound is created or started. However, we'll go into a little more detail and
create one ourselves:

```shell
$ docker volume create my-volume
my-volume
```

We've created a volume with the name `my-volume`. Now we can attach it to a
new container:

```shell
$ docker run --interactive --tty --mount type=volume,source=my-volume,destination=/data-volume simple-docker-app /bin/bash
root@a3d4665bc8b1:/usr/src/app# echo "Data in my-volume!" > /data-volume/newfile.txt
root@a3d4665bc8b1:/usr/src/app# exit
```

Note that we've again used the `--mount` parameter to mount the volume into the
container, but this time we've change the `type` to `volume`. The container ran
and a new file was created with some text in the volume.

We'll now run a new container, using a different image, and mount the same
volume that we created:

```shell
$ docker run --interactive --tty --mount type=volume,source=my-volume,destination=/modified-data-volume balenalib/intel-nuc-debian-node  /bin/bash
root@ab2ad1db1bce:/# cat /modified-data-volume/newfile.txt
Data in my-volume!
root@ab2ad1db1bce:/# exit
exit
```

As we can see, the data in the volume has persisted.

Because the volume is just another Docker object, we're actually able to inspect
it via the command line with
[`docker volume inspect`](https://docs.docker.com/engine/reference/commandline/volume_inspect/):

```shell
$ docker volume inspect my-volume
[
    {
        "CreatedAt": "2020-03-12T00:07:30Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/my-volume/_data",
        "Name": "my-volume",
        "Options": {},
        "Scope": "local"
    }
]
```

The `Mountpoint` actually shows that the volume is created in the Docker storage
heirarchy, and if we were to inspect the
`/var/lib/docker/volumes/my-volume/_data` directory, we'd find the `newfile.txt`
file.

You can list the current volumes known by Docker with
[`docker volume ls`](https://docs.docker.com/engine/reference/commandline/volume_ls/)
, which we'll try now:

```shell
$ docker volume ls
DRIVER              VOLUME NAME
local               my-volume
```

Finally, let's remove the volume to tidy up, we use
[`docker volume rm`](https://docs.docker.com/engine/reference/commandline/volume_rm/)
to do this:

```shell
$ docker volume rm my-volume
Error response from daemon: remove my-volume: volume is in use - [a3d4665bc8b16aa7df75faefd1edfef0517015cb506a200f9bb29a00132167f0, ab2ad1db1bce61e632b6bea51d65d5febc1a814d07e1ebd4350d8dcca5cecf5c]
```

But as you can see, we're first warned that the volume we're using is already
in use! This is because we've previously attached it to a container that's only
been stopped and not removed.

Because we actually attached the same volume to two different containers, we
need to remove both of those containers before we can remove the volume. The
removal command actually told us which containers are using the volume, so
we can simply remove them first:

```shell
$ docker rm a3d4665bc8b16aa7df75faefd1edfef0517015cb506a200f9bb29a00132167f0 ab2ad1db1bce61e632b6bea51d65d5febc1a814d07e1ebd4350d8dcca5cecf5c
a3d4665bc8b16aa7df75faefd1edfef0517015cb506a200f9bb29a00132167f0
ab2ad1db1bce61e632b6bea51d65d5febc1a814d07e1ebd4350d8dcca5cecf5c
$ docker volume rm my-volume
my-volume
```

### 10. Container Privileges and Permissions

Containers, as described previously, share the kernel of the host OS (or the
underlying Hypervisor or VM). As such, processes run against this kernel.
However, this doesn't mean that processes in a container can carry out any
operations that they want. To explain this, we need to dig a little into both
the user model and the way containers are controlled.

#### 10.1 Users in Containers

Processes in containers run as a child process spawned by the Docker daemon. But
this actually raises some questions. The Docker daemon (under Linux) runs as
`root`, and under macOS and Windows runs as a Hypervisor/VM that also
essentially has `root` privileges. So doesn't this mean that all our containers
run processes as `root`?

Well, let's have a look at what we see on a Linux system when we run a Docker
container in it (**Note:** this will not work under Docker for Windows or
Docker for macOS, because the processes running will actually occur under the
VM and *not* the host OS). The following command will run the Docker container
for 60 seconds (whilst it sleeps) before exiting, and whilst it sleeps we'll
have a look at the process running:

```shell
$ whoami
heds
$ docker run --detach simple-docker-app sleep 60
1d9ad9d967c020ce1766a9080d05150e5e67f88c2d9980f7e3bd3cc3ef7751f4
$ ps aux | grep "[s]leep"
root      9384 18.0  0.0   4052   748 ?        Ss   23:26   0:00 /bin/sleep 60
```

The first line carries out a `whoami` to print the current user of the host OS,
the second starts our detached running container and the third searches the
host's process list for a command running `sleep`. This final command finds the
running container process (which is run as a child of the Docker daemon), but...
it's running as the `root` user, not as `heds`!

How can this be? Well, the Docker daemon is actually running (if you've
installed it using the default method) under the `root` user, and because of
this any process running in a container is also run by the `root` user.

Even though the default is to run as `root`, it's usually better to ensure that
the processes in a container run as a suitable user. There's a very easy way to
do this, which is to specify the
[`USER`](https://docs.docker.com/engine/reference/builder/#user)
directive in a Dockerfile. We'll go into
this in a later Masterclass.

However, the question a lot of new users have when they see the process running
as `root`is usually, 'Is this not incredibly dangerous?'. The short answer is
'No' and we'll explain why in the next section.

#### 10.2 Namespaces, Capabilities, Networking and Control Groups

Let's have a look at a quick example of running a command in a container. Pretty
much any Linux distribution allows you (as the `root` user) to mount a
filesystem, and as we've already discovered, processes inside our container are
running as root. So let's mount a `tmpfs` filesystem into `/mnt/tmp`:

```shell
$ docker run --interactive --tty simple-docker-app /bin/bash -c 'mkdir /mnt/tmp \
  && mount -t tmpfs none /mnt/tmp \
  && echo "Temp file!" > /mnt/tmp/newfile.txt \
  && cat /mnt/tmp/newfile.txt'
mount: /mnt/tmp: permission denied.
```

So even though the `root` user is trying to run the command to mount a `tmpfs`
filesystem inside the container, it's been denied permission. This answers
our previous question of why running container processes as `root` is not
inherently dangerous (although still not recommended).

This is due to the way in which containers operate. Whilst all containers share
the same Linux kernel that runs on the host OS (or Hypervisor/VM for Docker for
Mac or Windows), they run in a separate namespace. This means that any processes
that run inside these containers are not allowed to communicate or share
resources with any other namespace, including processes run on the the host OS
or other containers. Wikipedia has a good article on
[Linux namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) that goes
into this a little more.

As well as namespace separation, containers also adhere to the Linux capability
model, which allows very fine grained control over what container processes are
allowed to carry out. For example, should a process need to make changes to a
file's UIDs and GIDs, it would require the`CAP_CHOWN` capability to allow it
to make such changes. Without this capability, any attempt to change file
ownership in a volume or bind mount would fail, regardless of underlying process
user. You can read more about Linux capabilities and the functionality that each
capability has access to
[here](http://man7.org/linux/man-pages/man7/capabilities.7.html).
By default, Docker drops almost all capabilities for a container that are not
directly required for processes to run in them. Other capabilities are added
via a 'whitelist' to open up more functionality.

Containers also run their own network stacks. As we've already seen, just
because a container has a process listening on a defined port, it doesn't mean
that any traffic will actually make it into the container. There's essentially a
firewall between the container and the host's networking interfaces, and the act
of publishing ports on a container allows traffic through that firewall (note
that this is **not** true should `host` networking be used). Users can also
create their own Docker networks, and then run containers specifying these
networks so that containers can communicate with each other, and the host,
where required. These networks essentially contain their own namespacing, so
that they can only interact if given permission to do so. The
[Docker networking overview](https://docs.docker.com/network/)
is a good place to start to read up on networking features.

Docker containers are all subject to the use of control groups (also known as
`cgroups`). Control groups allocate host resources that can be used by a
container, and as such can limit the amount of CPU, memory or I/O usage
for it. This ensures that a rogue container cannot disrupt a host OS to the
point of bringing it down or making it unusable. Control groups for a container
are configurable, so a user can alter the resources available to it when
required. By default, Docker doesn't limit resources to containers, so in theory
you could max out the host OS by running an extremely CPU intensive process in a
container, or by using all its memory (though usually the OOM killer will kick
in). However, Docker allows you to specify limits when you run a container, and
it will then create appropriate `cgroup` rules on the host to limit the
container's resource use. More information on cgroups can be found on the
[Wikipedia page for cgroups](https://en.wikipedia.org/wiki/Cgroups)
here.

Containers can also use other security features in the Linux kernel, such as
[SELinux](https://selinuxproject.org/page/Main_Page) and
[AppArmor](https://gitlab.com/apparmor/apparmor) to further ensure that
containers are only given access to what they need.

Now that we know that a container has its own networking, namespace and
(potentially) limited `cgroups` rules, we can relax a bit knowing that there's
little chance of a container doing anything nasty to the host OS without the
knowledge of the user who's running it.

In fact, we've seen this already when creating our first container, where
although the HTTP server was listening inside the container, Docker did not
allow traffic from the host to the container unless the appropriate ports were
published. This is because the container was running its own network stack and
had not been given any rules to allow incoming traffic from the host into it.

However, for now, we want to try and still mount a `tmpfs` mount inside our
container, so how do we do it? The answer in this case lies in Linux
capabilities. It just so happens that to allow a filesystem mount to work inside
a container we need the `CAP_SYS_ADMIN` capability feature (which also enables a
large number of other capabilites for container processes). To enable this,
we'll use the `--cap-add` (for capability add) switch when executing
`docker run`:

```shell
$ docker run --interactive --tty --cap-add SYS_ADMIN simple-docker-app /bin/bash -c 'mkdir /mnt/tmp \
  && mount -t tmpfs none /mnt/tmp \
  && echo "Temp file!" > /mnt/tmp/newfile.txt \
  && cat /mnt/tmp/newfile.txt'
Temp file!
```

This time it worked correctly, because we eased the restriction on the container
to allow the `CAP_SYS_ADMIN` capability. Note that when passing the capability,
the `CAP_` prefix is dropped.

It's important to note that should your container require elevated permissions
or capabilities above that of the default controls, you should find the minimal
number of changes required for the functionality required. This way your
container will continue to be secured as much as possible from malicious code.

### 11. Docker Registries and Repositories

Once you've built a working docker image that contains all the functionality you
need, it will be stored in the local Docker registry on the machine that you've
carried out development on.

We've already seen the local registry, it's the store for images, the list of
which can be seen by running the following command:

```shell
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              b8a722866d8c        3 days ago          273MB
simple-docker-app                 v0.0.2              5e2c8c1cb9d9        5 days ago          273MB
simple-docker-app                 v0.0.1              8a65ba22f11f        6 days ago          273MB
balenalib/intel-nuc-debian-node   latest              ca37795ac1cc        2 weeks ago         270MB
```

This local repository stores all of the images that have been built or used
when building the images. But how do we now share these images, so that others
can use them? Well, think back to our Dockerfile, specifically the first line
where we determined which base image to use:

```dockerfile
FROM balenalib/intel-nuc-debian-node:latest
```

As we know, this tells Docker which image to base the rest of the image we're
building on. As you may also remember, on the first build, this downloaded the
image. This download came from a remote Docker registry, which Docker itself
hosts, called Docker Hub. Any user with an account on Docker Hub can upload
images they've built so that other users can download them and run them, or use
them as base images. Docker has both public and private registries, depending
on the type of account (unpaid accounts only allow the maximum of one private
repository, with all others being public, whereas paid accounts allow more
private repositories). Docker Hub is the default Docker registry that is used
when installing Docker, but other registries can also be used including private
ones that you can run yourself. We'll discuss this in a future Masterclass.

We discussed tags in a previous section, where we noted that tags that we give
images are of the format `repository:tag`. A repository name denotes a specific
location in a registry for a group of images. On Docker Hub, repositories are
usually denoted by the name of a user or organization using the registry and
then the repository name itself, these being split by the use of a forward slash
(`/`). For example, the base image we were using was a balena image, in the
repository where it stores all of its base images. The base images are owned by
the `balenalib` user, and the repository name is the device type they use as
well as the functionality they include, hence `balenalib/intel-nuc-debian-node`
is a base image owned by `balenalib` which runs on an `intel-nuc` device based
on a `debian` Linux distribution and includes `node` (Node.js). Simply, a
repository is made up of `user/repository-name`.

Versions of a particular repository image are then given by a tag, and as we
also learnt earlier in the Masterclass, if no tag is given then `latest` is
assumed, which is why the image that was downloaded to the local registry
is of tag `latest`.

We'll quickly ensure that our built Docker image is pushed to Docker Hub so that
we can use it anywhere else, or let others use it.

First [create a new account on Docker Hub](https://hub.docker.com/) if you don't
already have one, using the `Sign Up` panel (if you already have a Docker Hub)
account. If you do have one, sign into it. For the rest of the exercise, we'll
assume the user is called `dockerhub` so remember to replace this name with the
actual username (also called a Docker ID) you signed up with.

Next ensure that you login to the default Docker registry (Docker Hub), using:

```shell
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: dockerhub
Password:
Login Succeeded
```

First of all, there's the matter of naming our Docker image. When we built it,
we called it `simple-docker-app`. This isn't suitable for pushing to Docker Hub
however, because that name isn't prefixed by the name of the user who will own
the repository on Docker Hub. We'll quickly demonstrate this by using the
[`docker push`](https://docs.docker.com/engine/reference/commandline/push/)
command, which is used to push repository images to a registry:

```shell
$ docker push simple-docker-app:latest
The push refers to repository [docker.io/library/simple-docker-app]
d1584e117f97: Preparing
e5630e29b3ed: Preparing
7e1009fcbba1: Preparing
77b61c32e3ac: Preparing
88d4980a47f6: Preparing
56db180aad32: Waiting
711c9715952e: Waiting
f8cad89c2502: Waiting
381d6d079e1d: Waiting
8a4c2b7f231f: Waiting
3a2f92b02f7b: Waiting
04bd31396a7a: Waiting
034332202128: Waiting
f2cb0ecef392: Waiting
denied: requested access to the resource is denied
```

As you can see, we don't have access to the toplevel repository because we
don't own it.

Instead, we're going to ensure that Docker Hub knows that the image is owned
by us by creating a new tag for the repository to include our username. We'll be
pushing the `latest` version of the image we built, so we'll use
[`docker tag`](https://docs.docker.com/engine/reference/commandline/tag/)
to tag that:

```shell
$ docker tag simple-docker-app:latest dockerhub/simple-docker-app:latest
$ docker images
REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE
simple-docker-app                 latest              b8a722866d8c        3 days ago          273MB
dockerhub/simple-docker-app       latest              b8a722866d8c        3 days ago          273MB
simple-docker-app                 v0.0.2              5e2c8c1cb9d9        6 days ago          273MB
simple-docker-app                 v0.0.1              8a65ba22f11f        6 days ago          273MB
balenalib/intel-nuc-debian-node   latest              ca37795ac1cc        2 weeks ago         270MB
```

Note that when tagging you can use the name of the repository to create a new
tag for, or use the image ID.

We now have a repository called `dockerhub/simple-docker-app` which has a single
version tag of `latest`. We'll try pushing this again:

```shell
$ docker push dockerhub/simple-docker-app:latest
The push refers to repository [docker.io/dockerhub/simple-docker-app]
d1584e117f97: Pushed
e5630e29b3ed: Pushed
7e1009fcbba1: Pushed
77b61c32e3ac: Pushed
88d4980a47f6: Pushed
56db180aad32: Pushed
711c9715952e: Pushed
f8cad89c2502: Pushed
381d6d079e1d: Pushed
8a4c2b7f231f: Pushed
3a2f92b02f7b: Pushed
04bd31396a7a: Pushed
034332202128: Pushed
f2cb0ecef392: Pushed
latest: digest: sha256:eaf4f3d25964c6d56e4dec4fac93212d2fd315474a8040c00189bae46eded30d size: 3246
```

Success! If you now look at the Docker Hub site in your web browser and go to
the `My Profile` section of your user account, you'll notice that the image has
been stored on Docker Hub in the `simple-docker-app` repository owned by you.

Because we've carried out versioning with the tags, we can also add a new tag
to a previous version and then push that:

```shell
$ docker tag simple-docker-app:v0.0.2 whaleway/simple-docker-app:v0.0.2
$ docker push dockerhub/simple-docker-app:v0.0.2
The push refers to repository [docker.io/dockerhub/simple-docker-app]
d217d415dd8d: Pushed
715dcd4f6062: Pushed
77b61c32e3ac: Layer already exists
88d4980a47f6: Layer already exists
56db180aad32: Layer already exists
711c9715952e: Layer already exists
f8cad89c2502: Layer already exists
381d6d079e1d: Layer already exists
8a4c2b7f231f: Layer already exists
3a2f92b02f7b: Layer already exists
04bd31396a7a: Layer already exists
034332202128: Layer already exists
f2cb0ecef392: Layer already exists
v0.0.2: digest: sha256:c82f1c64bbdd86fdeba44de5393f0af6e9271ac9cbad8a626c320e61b29dbe64 size: 3039
```

Note the message `Layer already exists`. Because the repository we pushed to
already has an image (`dockerhub/simple-docker-app:latest`), Docker noted that
our latest push used several of the same layers for its image. Because of this,
it didn't need to push them separately to the registry. This is another good
example of how the use of layers saves space.

We've created new tags for our images here to push them to Docker Hub, but
usually you'll build an image with the user (owner name) directly so that
tagging doesn't have to take place before pushing, for example:

```shell
$ docker build -t dockerhub/simple-docker-app:latest .
```

If you again look at the profile for your user account and select the
`dockerhub/simple-docker-app` repository, this will take you to a page for that
specific repository (you can manage your repository here using
'Manage Repository'). If you select the 'Tags' panel, you'll see that there are
now two versions of the image stored in the registry, `latest` and `v0.0.2`.
This will also show you the compressed size of the images stored on Docker Hub,
as well as a copy and paste line that will allow you to pull the image
(for example `docker pull dockerhub/simple-docker-app:latest`).

[`docker pull`](https://docs.docker.com/engine/reference/commandline/pull/)
is the command used to pull images from a remote Docker registry,
allowing any image that has been stored in an accessible registry to be pulled
to a local machine's local registry.

So now you know how to store a built image into a remote registry that anyone
else with access to that registry can either use to pull and run the image, or
use it as a base image for further images (and of course there is no need to
`docker pull` a base image used in a `FROM` directive instruction in a
Dockerfile as it will occur as part of the build).

## Conclusion

This Docker Masterclass covered the basics of Docker, and you should now be able
to:

* Install Docker for Linux, Windows or Mac.
* Use the `docker` command line interface.
* Create a Dockerfile and build an image.
* Run, create, stop and start a container.
* Understand how to publish ports to enable network traffic in a container.
* Tag Docker images and write Dockerfiles in a way that allows use of caching
  when building.
* Run a container in detached, command mode and interactive mode.
* Use bind mounts to bind a host directory or file into a container, or create
  a new Docker volume for storing persistent data.
* Understand the restrictions on processes running in a container, including
  the users running the processes and how to enable access to restricted
  functionality.
* Be able to store built images on Docker Hub for use by anyone.
