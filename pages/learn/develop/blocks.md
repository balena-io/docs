---
title: Develop with blocks
excerpt: A drop-in chunk of functionality that can be added to your fleet.
---

# Develop with blocks

A block is a container image that can be added to a multicontainer fleet in order to provide specific functionality. Blocks are intended to reduce the friction of app development by making it easier to re-use functionality, much like software packages. 

Similar to how software developers don't want to keep rewriting common functions, IOT developers don't want to keep creating containers for common tasks, such as handling Bluetooth connections or interacting with attached displays. Blocks provide solutions to common IoT application requirements, which developers can re-use to enable their fleet.

For example, getting a browser to run well in a container is a tedious task. Hence, why not use the [browser block][browser] to get things up and running faster..

<img src="/img/blocks/diagram-1.png" width="70%">

## Getting Started with blocks

Since blocks are container images, they can be added to a multicontainer fleet. To use a block in your fleet, add the block's image as a new service in the `services` section of your app's `docker-compose.yml` file. This is similar to how we would build [multicontainer fleets][multicontainer].

Here's an example of using the [browser block][browser] in a sample multicontainer fleet already running 2 services.

```
version: '2'

services:
  # Browser block service added to the multicontainer fleet
  browser:
    image: balenablocks/browser
    privileged: true
    network_mode: host

  # Existing services in the multicontainer fleet
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

Each block will have their own set of [docker-compose fields][docker-compose] which are required to configure the container they run within. Do take care of syntax and conflicts in the docker-compose.yml file when composing and deploying your multicontainer configuration.

More resources:

1. Blog on [Introduction to blocks](https://www.balena.io/blog/introducing-balenablocks-jumpstart-your-iot-app-development/).
2. Check out our guide on [how to compose multicontainer fleets](https://www.balena.io/blog/two-projects-one-device-turn-your-raspberry-pi-into-a-multitool/) for more details.
3. Video tutorial on [IoT Happy Hour](https://youtu.be/Mllay6Z2-qQ?t=1440) about using  balenaBlocks and building an [environmental sensor app](https://github.com/balenalabs-incubator/ruuvitag) using sensor, connector, and dashboard block.

## Creating your own block

Since blocks are container images, the process to create them is very similar to creating any other container. To learn more about what makes a good candidate for a block, refer to this [blog post](https://www.balena.io/blog/how-to-make-your-own-balenablocks-simple-drop-in-edge-app-functionality/). 

In order to create your own block, the code needs to be in a GitHub repository. It has to [include a balena.yml file](https://www.balena.io/docs/learn/deploy/deploy-with-balena-button/#balenayml-configuration-file) in the root directory of the project. Here's a balena.yml file of the [browser block](https://github.com/balenablocks/browser/) for reference:


```yml
name: browser
description: >-
  a hardware accelerated web browser to present internal and external URLs on a
  connected display
version: 2.3.2
type: sw.block
assets:
  repository:
    type: blob.asset
    data:
      url: 'https://github.com/balenablocks/browser'
  logo:
    type: blob.asset
    data:
      url: 'https://raw.githubusercontent.com/balenablocks/browser/master/logo.png'
data:
  defaultDeviceType: raspberrypi3
  supportedDeviceTypes:
    - raspberrypi4-64
    - fincm3
    - raspberrypi3
    - raspberrypi3-64
    - raspberrypi400-64
    - intel-nuc
    - genericx86-64-ext
```

Next, navigate to the `Blocks` tab in the sidebar and click the `Create block` button in the balenaCloud dashboard.

<img src="/img/blocks/image.png" width="100%">

Fill the details for your block in the modal, and click `Create new block` button to create your block.

<img src="/img/blocks/create-block.png" width="70%">

Next, we have to [push a new release][balena-push] from your project to your newly created block on balenaCloud. If you are new to this, then follow the [Getting Started][getting-started] guide. After the release has been created, your block is ready. You can manage, modify and iterate further on your block from the balenaCloud dashboard.

## Release management for blocks

To deploy new releases of your block, you can use the [balena-push][balena-push] command using the [balenaCLI](https://github.com/balena-io/balena-cli). The `Releases` tab in the sidebar will show the list of all releases of your block.

<img src="/img/blocks/release.png" width="80%">

By default, the block is set to `track latest`, which means that new releases are immediately tagged as the default release for the block. Expanding this _Default release_ dropdown menu displays all successful releases for the block, and you can select a specific release to pin the block to. When a particular release is selected, that release will be tagged as the default release of your block. After pinning to a specific release, releases will not be deployed until the _Default release_ is updated to a newer release or it's set back to `track latest`.

<img src="/img/blocks/release-mgmt.png" width="100%">

## Making your block public

When a block is created on balenaCloud it will not automatically be publicly visible on balenaHub. When a block is made public it is listed in the [Blocks section][blockhub] of balenaHub, but is not joinable like fleets or forkable like projects. Instead the card for the block allows users to find the source code for the block, and learn how to deploy and use it in their own fleet.

When blocks are private, you can iterate, test and build more functionality before making it available to the world. When you are ready to release, head to the `Settings` tab in the sidebar and add your block's GitHub repository to the `Repository URL`  section. Next, toggle the `Block visibility` button to `on` for your block to be visible on balenaHub. You’re free to toggle the visibility on and off as necessary at any time.

<img src="/img/blocks/settings.png" width="100%">

This would lead to your block being available on [balenaHub][blockhub] for folks to use and build upon as soon as your submission has been marked as public. BalenaHub is the ever-growing library of blocks, projects and fleets contributed by the community.

[browser]:https://github.com/balenablocks/browser
[multicontainer]:/learn/develop/multicontainer/#docker-composeyml-file
[docker-compose]:/reference/supervisor/docker-compose/
[balena-node-hello-world]:https://github.com/balena-io-examples/balena-node-hello-world
[balena-push]:/learn/deploy/deployment/#balena-push
[getting-started]:/learn/getting-started/raspberrypi3/nodejs/
[blockhub]:https://hub.balena.io/blocks
