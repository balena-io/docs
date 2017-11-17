#### Let's dive into the code
<!-- project link: https://github.com/resin-io-projects/resin-go-hello-world-->
So in the root directory of our project we see a number of files, the most important ones to focus on are:-
* `Dockerfile.template` : This is basically a recipe file on how to build and run our application container.
* `main.go` : This is the entry point to our application code and is where all the fun happens!

The most important part of a resin.io project repo is usually the `Dockerfile` or `Dockerfile.template`. The `.template` version allows you to define template variables like `%%RESIN_MACHINE_NAME%%` which enables you to push the same repository to multiple different architecture fleets.

If we look at our `Dockerfile.template`, the first thing we see is:
```Dockerfile
FROM resin/%%RESIN_MACHINE_NAME%%-golang
```
This line has quite a bit packed into it. The first thing that happens is that the `%%RESIN_MACHINE_NAME%%` place holder gets stripped and replaced with the resin device name. For example if your application type is a **{{ $device.name }}**, the line will be replaced with:
```Dockerfile
FROM resin/{{ $device.id }}-golang
```
Which tells the resin builder that this is the Docker image we want as our base. Checkout the full [list of official resin device names][listOfResinNames] and the [matching Docker Hub base images][resinDockerHub].

The next line is used to enable the [systemd][systemd-link] init within the container. This is useful for a number of reasons, like keeping the container open after application crash and handling `/dev` updates as new USB devices are plugged in. If you don't want an init system, just set it to `off` or remove the line for the `Dockerfile`.
```Dockerfile
ENV INITSYSTEM on
```

Next up we have 3 lines which install all the dependencies needed by the container, in this case we don't need any dependencies so the lines are commented out.
```Dockerfile
RUN apt-get -q update && apt-get install -yq --no-install-recommends \
    build-essential \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
```

The next line is pretty straight forward and a key part of using Docker.
```Dockerfile
# This sets the working directory
WORKDIR /go/src/github.com/resin-io-projects/resin-go-hello-world
```
As the comments say, `WORKDIR` set our working directory for any `RUN`, `COPY` or `CMD` commands following it. Check out the [Docker reference][docker-ref] pages for more info on these commands.

Next all the files are copied to the working directory.
```Dockerfile
COPY . ./
```

We can now compile our {{ $language.name }} code, this is done using the `RUN` command. `go build` compiles our `main.go` code into an executable and ouputs it in to the working directory.
```Dockerfile
RUN go build
```

The last command, `CMD` is perhaps one of the most important. This command defines what will run at container start on your **{{ $device.name }}**, in our example we have told the container to run our `resin-go-hello-world` executable. It should be noted that you can only have **one** `CMD` per `Dockerfile`.
```Dockerfile
CMD ./resin-go-hello-world
```

[resinDockerHub]:https://hub.docker.com/u/resin/
[docker-ref]:https://docs.docker.com/engine/reference/builder/
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[listOfResinNames]:/devicetypes/
