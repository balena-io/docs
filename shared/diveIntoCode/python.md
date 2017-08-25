#### Let's dive into the code
<!-- project link: https://github.com/resin-io-projects/simple-server-python -->
So in the root directory of our project we see a number of files, the most important ones to focus on are:-
* `Dockerfile.template` : This is basically a recipe file on how to build and run our application container.
* `requirements.txt` : This file defines all the python dependencies and their versions which will be in stalled by [pip][pip-package-manager]
* `src/main.py` : This is the entry point to our application code and is where all the fun happens!

The most important part of a resin.io project repo is usually the `Dockerfile` or `Dockerfile.template`. The `.template` version allows you to define template variables like `%%RESIN_MACHINE_NAME%%` which enables you to push the same repository to multiple different architecture fleets.

If we look at our `Dockerfile.template`, the first thing we see is:
```Dockerfile
FROM resin/%%RESIN_MACHINE_NAME%%-python
```
This line has quite a bit packed into it. The first thing that happens is that the `%%RESIN_MACHINE_NAME%%` place holder gets stripped and replaced with the resin device name. For example if your application type is a {{ $device.name }}, the line will be replaced with:
```Dockerfile
FROM resin/{{ $device.id }}-python
```
Which tells the resin builder that this is the Docker image we want as our base. Checkout the full [list of official resin device names][listOfResinNames] and the [matching Docker Hub base images][resinDockerHub]. For this image we don't define a tag, so `:latest` will be used, but there are [many other tags](https://hub.docker.com/r/resin/{{ $device.id }}-python/tags/), which allow you to specify the Python version, etc.

Next up we have 3 line which were commented out:
```Dockerfile
RUN apt-get update && apt-get install -yq \
   alsa-utils libasound2-dev && \
   apt-get clean && rm -rf /var/lib/apt/lists/*
```
This is just a demonstration of how you can use `apt-get` to install dependencies in your container. In this case we would install some useful linux sound utilities.

The next two directives are pretty straight forward and key parts of using Docker.
```Dockerfile
# Defines our working directory in container
WORKDIR /usr/src/app

# Copy requirements.txt first for better cache on later pushes
COPY ./requirements.txt /requirements.txt
```
As the comments say, `WORKDIR` set our working directory for any `RUN`, `COPY` or `CMD` commands following it. So the next line would effectively `COPY` our `requirements.txt` in the root of our directory to `usr/src/app/requirements.txt`. Check out the [Docker reference][docker-ref] pages for more info on these commands.

We can now build all our python modules and dependencies, this is done using the `RUN` command.
```Dockerfile
# pip install python deps from requirements.txt on the resin.io build server
RUN pip install -r /requirements.txt

# This will copy all files in our root to the working  directory in the container
COPY . ./

# switch on systemd init system in container
ENV INITSYSTEM on

# main.py will run when container starts up on the device
CMD ["python","src/main.py"]
```
After the `pip install` we copy the rest of our source code into the working directory, we do this after the install so that later builds can benefit from build caching. So we will only trigger a full pip install if we change something in `requirements.txt`.

The last 2 commands are runtime directives. The `ENV INITSYSTEM on` is used to enable the [systemd][systemd-link] init within the container. This is useful for a number of reasons, like keeping the container open after application crash and handling `/dev` updates as new USB devices are plugged in. If you don't want an init system, just set it to `off` or remove the line for the `Dockerfile`.

The last command, `CMD` is perhaps one of the most important. This command defines what will run at container start on your {{ $device.name }}, in our example we have told python to run the `src/main.py` script. It should be noted that you can only have **one** `CMD` per `Dockerfile`.

In our `requirements.txt` we only have the one line that specifies a version of [Flask][flask-link] to use, its highly recommended to pin to specific dependency versions, so your builds are reproducible:
```
Flask==0.10.1
```

[resinDockerHub]:https://hub.docker.com/u/resin/
[docker-ref]:https://docs.docker.com/engine/reference/builder/
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[listOfResinNames]:/devicetypes/
[pip-package-manager]:https://en.wikipedia.org/wiki/Pip_(package_manager)
[flask-link]:http://flask.pocoo.org/
