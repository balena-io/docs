#### Let's dive into the code
<!-- project link: https://github.com/resin-io-projects/simple-server-node -->
So in the root directory of our project we see a number of files, the most important ones to focus on are:-
* `Dockerfile.template` : This is basically a recipe file on how to build and run our application container.
* `package.json` : This is a [JSON][whatIsJson] file that describes how our node.js project is built, what dependencies it has and it's entry point. Read more about it on the [npm docs][npmDocs].
* `server.js` : This is the entry point to our application code and is where all the fun happens!

The most important part of a resin.io project repo is usually the `Dockerfile` or `Dockerfile.template`. The `.template` version allows you to define template variables like `%%RESIN_MACHINE_NAME%%` which enables you to push the same repository to multiple different architecture fleets.

If we look at our `Dockerfile.template`, the first thing we see is:
```Dockerfile
FROM resin/%%RESIN_MACHINE_NAME%%-node:slim
```
This line has quite a bit packed into it. The first thing that happens is that the `%%RESIN_MACHINE_NAME%%` place holder gets stripped and replaced with the resin device name. For example if your application type is a {{ $device.name }}, the line will be replaced with:
```Dockerfile
FROM resin/artik710-node:slim
```
Which tells the resin builder that this is the docker image we want as our base. Checkout the full [list of official resin device names][listOfResinNames] and the [matching dockerhub base images][resinDockerHub].

We also have a `:slim` tag associated to the base image which denotes that we want the stripped down version only contains the minimal packages needed to run node, so no [`node-gyp`][node-gyp-link] and other build-essentials. If you need to build some native modules, say node-i2c, you should switch to `:latest` tag. We also have a number of pinned version tags, which should be used for production devices. Checkout the full [list of -node tags](https://hub.docker.com/r/resin/artik710-node/tags/), if you want to target a specify node.js version or a fixed date build.

Next up we have 3 line which were commented out:
```Dockerfile
RUN apt-get update && apt-get install -yq \
   alsa-utils libasound2-dev && \
   apt-get clean && rm -rf /var/lib/apt/lists/*
```
This is just a demonstration of how you can use `apt-get` to install dependencies in your container. In this case we would install some useful linux sound utilities.

The next two directives are pretty straight forward and key parts of using docker.
```Dockerfile
# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json first for better cache on later pushes
COPY package.json package.json
```
As the comments say, `WORKDIR` set our working directory for any `RUN`, `COPY` or `CMD` commands following it. So the next line would effectively `COPY` our `package.json` in the root of our directory to `usr/src/app/package.json`. Check out the [Docker reference][docker-ref] pages for more info on these commands.

We can now build all our node.js modules and dependencies, this is done using the `RUN` command. We also build with the `--production` flag and clear the cache in the same step in order to keep the final image size smaller.
```Dockerfile
# This install npm dependencies on the resin.io build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean && rm -rf /tmp/*

# This will copy all files in our root to the working  directory in the container
COPY . ./

# Enable systemd init system in container
ENV INITSYSTEM on

# server.js will run when container starts up on the device
CMD ["npm", "start"]
```
After the `npm install` we copy the rest of our source code into the working directory, we do this after so that later builds can benefit from build caching. So we will only trigger a full npm install if we change something in `package.json`.

The last 2 commands are runtime directives. The `ENV INITSYSTEM on` is used to enable the [systemd][systemd-link] init within the container. This is useful for a number of reasons, like keeping the container open after application crash and handling `/dev` updates as new USB devices are plugged in. If you don't want an init system, just set it to `off` or remove the line for the `Dockerfile`.

The last command, `CMD` is perhaps one of the most important. This command defines what will run at container start on your {{ $device.name }}, in our example we have told npm to start a process. It should be noted that you can only have **one** `CMD` per `Dockerfile`.

In our `package.json` the parts to focus on are our "scripts" and "dependencies":
```JSON
{
  "name": "simple-server-node",
  "version": "1.0.0",
  "description": "A simple Expressjs Web server on resin.io",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "*"
  }
}
```
The "dependencies" section allows us to define node modules and their versions we want to use in our application. For a production application we recommend pinning the versions.

The "scripts" allow us to point to the `server.js` as our starting point for the whole application, so we get our awesome "Hello, World!" server when the container starts up :)


[whatIsJson]:http://www.json.org/
[npmDocs]:https://docs.npmjs.com/files/package.json
[resinDockerHub]:https://hub.docker.com/u/resin/
[node-gyp-link]:https://github.com/nodejs/node-gyp
[docker-ref]:https://docs.docker.com/engine/reference/builder/
[systemd-link]:https://en.wikipedia.org/wiki/Systemd
[listOfResinNames]:/devicetypes/
