#### Let's dive into the code
<!-- project link: https://github.com/josephroberts/resin-cpp-hello-world -->
So in the root directory of our project we see a number of files, the most important ones to focus on are:-
* `Dockerfile.template` : This is basically a recipe file on how to build and run our application container.
* `hello.cpp` : This is the entry point to our application code and is where all the fun happens!

The most important part of a resin.io project repo is usually the `Dockerfile` or `Dockerfile.template`. The `.template` version allows you to define template variables like `%%RESIN_MACHINE_NAME%%` which enables you to push the same repository to multiple different architecture fleets.

If we look at our `Dockerfile.template`, the first thing we see is:
```
FROM resin/%%RESIN_MACHINE_NAME%%-debian
```
This line has quite a bit packed into it. The first thing that happens is that the `%%RESIN_MACHINE_NAME%%` place holder gets stripped and replaced with the resin device name. For example if your application type is a {{ $device_details.name }}, the line will be replaced with:
```
FROM resin/{{ $device_details.id }}-debian
```
Which tells the resin builder that this is the docker image we want as our base. Checkout the full [list of official resin device names][listOfResinNames] and the [matching dockerhub base images][resinDockerHub].

The next line is used to enable the [systemd][systemd-link] init within the container. This is useful for a number of reasons, like keeping the container open after application crash and handling `/dev` updates as new USB devices are plugged in. If you want don't want an init system, just set it to `off` or remove the line for the `Dockerfile`.
```
ENV INITSYSTEM=on
```

Next up we have 3 lines which install all the dependencies needed by the container, in this case we need to install `build-essentials` so we can compile our C++ code.
```
RUN apt-get -q update && apt-get install -yq --no-install-recommends \
  build-essential \
  && apt-get clean && rm -rf /var/lib/apt/lists/*
```

The next two directives are pretty straight forward and key parts of using docker.
```
# This will copy all files in root to the working directory in the container
COPY . /usr/src/app

# This sets the working directory
WORKDIR /usr/src/app
```
As the comments say, `WORKDIR` set our working directory for any `RUN`, `COPY` or `CMD` commands following it. Check out the [Docker reference][docker-ref] pages for more info on these commands.

We can now compile our C++ code, this is done using the `RUN` command. `g++` compiles our `hello.cpp` code into an executable called `hello`.
```
RUN g++ -o hello hello.cpp
```

The last command, `CMD` is perhaps one of the most important. This command defines what will run at container start on your {{ $device_details.name }}, in our example we have told the container to run our `hello` executable. It should be noted that you can only have **one** `CMD` per `Dockerfile`.
```
CMD ./hello
```

[resinDockerHub]:https://hub.docker.com/u/resin/
[docker-ref]:https://docs.docker.com/engine/reference/builder/
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[listOfResinNames]:/devicetypes/
