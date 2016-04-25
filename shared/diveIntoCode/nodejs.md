#### Let's dive into the code
<!-- project link: https://github.com/resin-io-projects/simple-server-node -->
So in the root directory of our project we see a number of files, the most important ones to focus on are:-
* `Dockerfile.template` : This is basically a recipe file on how to build our application container.
* `package.json` : This is a [JSON][whatIsJson] file that describes how our node.js project if built, what dependencies it has and how to run it. Read more about it on the [npm docs][npmDocs]
* `server.js` : This is the entry point to our application code and is where all the fun happens.

The most important part a resin.io project repo is usually the `Dockerfile` or `Dockerfile.template`. The `.template` version allows you to define template variables like `%%RESIN_MACHINE_NAME%%` which enables you to push the same repository to multiple different architecture fleets.

If we look at our `Dockerfile.template`, the first thing we see is:
```
FROM resin/%%RESIN_MACHINE_NAME%%-node:slim
```
This line has quite a bit packed into it. The first thing that happens is that the `%%RESIN_MACHINE_NAME%%` place holder gets stripped and replaced with the resin device name. For example if your application type is a Raspberry Pi 3, the line will be replaced with:
```
FROM resin/raspberrypi3-node:slim
```
Checkout the full [list of official resin device names][listOfResinNames] and the [matching dockerhub images][resinDockerHub].




[whatIsJson]:http://www.json.org/
[npmDocs]:https://docs.npmjs.com/files/package.json
[resinDockerHub]:https://hub.docker.com/u/resin/
