---
title: Develop with blocks
excerpt: A drop-in chunk of functionality that can be added to your application to provide.
---

# Getting Started with blocks

A software package is a collection of individual files or resources that are packed together to provide a certain functionality as part of a larger system. Blocks are just that. They are drop-in, independent chunks of functionality built to handle a specific task, allowing you to focus on solving the hard problems instead.

A block is a container image that can be added to a multi-container app in order to provide specific functionality. Blocks are intended to reduce the friction of application development by making it easier to re-use functionality, much like software packages. Similar to how software developers don't want to rewrite common functions, this is a DRY approach for IoT developers to not create containers of every function and re-use what's already out there for their application to work.

For example, getting a browser to run well in a container is a tedious task. So, why not use the [browser block][browser].


<img src="/img/blocks/diagram-1.png" width="100%">

## Develop with a block

Blocks being a container image can be added to a multi-container app. To use a block in your app, add the block's image as a new service in the `services` section of your app's `docker-compose.yml` file. This is similar to how we would [build multicontainer apps][multicontainer].

Here's an example of using the [browser block][browser] in a sample multi-container app running 2 services. More blocks 

```
version: '2'

services:
  # Browser block service goes here 
  browser:
    image: balenablocks/browser
    privileged: true 
    network_mode: host

  # Existing services in the multi-container app
  balena-node-hello-world:
    build: ./balena-node-hello-world
    restart: always
    depends_on:
      - browser
    ports: 
      - "80"
  importantBananaDb:
    image: importantBanana/db:latest
    ports: 
      - "8080"
    environment:
      DB_ROOT_PASSWORD: 'potassium'
      RUN_MODE: 'super-secure'
``` 

Similarly, each block will have be having their own set of [docker-compose fields][docker-compose] that it requires for configuration and usage. Do take care of syntax and conflicts in the docker-compose.yml file when composing and deploying your multi-container configuration. 


More resources: 


1. Video tutorial on [IoT Happy Hour](https://youtu.be/Mllay6Z2-qQ?t=1440) about using  balenaBlocks and building an [environmental sensor app](https://github.com/balenalabs-incubator/ruuvitag) using sensor, connector, and dashboard block.
   
2. Check out our guide on [how to compose multi-container apps](https://www.balena.io/blog/two-projects-one-device-turn-your-raspberry-pi-into-a-multitool/) for more details. 
   
3. Blog on [Introduction to blocks](https://www.balena.io/blog/introducing-balenablocks-jumpstart-your-iot-app-development/).

## Creating your own block 

Since blocks are container images, the process to create blocks is very similar to creating a container image. To learn more about the what can be a block, you can read this [blog post](https://www.balena.io/blog/how-to-make-your-own-balenablocks-simple-drop-in-edge-app-functionality/). In order to create your own block:

1. The code for your block should be in GitHub project and has to [include a balena.yml file](https://www.balena.io/docs/learn/deploy/deploy-with-balena-button/#balenayml-configuration-file) and a logo. Here's a balena.yml file of a block for reference:


```yml
name: capture-block
description: >-
  Sends an RTSP video feed from a connect camera to a configurable endpoint
version: 0.0.1
type: sw.block
assets:
  repository:
    type: blob.asset
    data:
      url: 'https://github.com/balenablocks/capture'
  logo:
    type: blob.asset
    data:
      url: 'https://raw.githubusercontent.com/balenablocks/capture/master/logo.png'
data:
  defaultDeviceType: raspberrypi4-64
  supportedDeviceTypes:
    - raspberry-pi
    - raspberry-pi2
    - raspberrypi3
    - raspberrypi3-64
    - raspberrypi4-64
```

Refer to the [browser block][browser] for an example of repository structure.

3. Create a new balenaCloud fleet and [push a new release][balena-push] from your GitHub project to the fleet. Follow the [Getting Started][getting-started] guide to learn how to create a fleet, and push releases.
4. In the balenaCloud dashboard, head to the `Settings` tab. Do something here.

That's it, you created your own block!

## Release management for blocks

Specific to blocks - See how things differ. I need to actually see the functionality for this. 


## Making your block public 

Blocks by default are set to private. Blocks when made public are neither joinable like fleets nor forkable like projects, but they’re a resource for everyone to use when creating their own fleets, projects, proof of concepts and prototypes.

With blocks being private, you can iterate, test and build more functionality into your block before making it available to the world. When you are ready for your block to be made public, head to the `Settings` tab in the sidebar and click the ‘Make public’ button to toggle the visibility on balenaHub; you’re free to toggle the visibility on and off as necessary at any time.

This would lead to your block being available on balenaHub for folks to use and build upon. BalenaHub is the ever-growing library of blocks, projects and fleets contributed by the community.

[browser]:https://github.com/balenablocks/browser
[multicontainer]:/learn/develop/multicontainer/#docker-composeyml-file
[docker-compose]:/reference/supervisor/docker-compose/
[balena-node-hello-world]:https://github.com/balena-io-examples/balena-node-hello-world
[balena-push]:/deploy/deployment/#balena-push
[getting-started]:/learn/getting-started/raspberrypi3/nodejs/
