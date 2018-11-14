---
title: Deploy to your fleet
excerpt: The process for deploying applications to your {{ $names.company.lower }} managed fleet
---

# Deploy to your fleet

## Overview

When you've finished prototyping and are ready to deploy your application to your fleet, you'll want to use the full {{ $names.company.lower }} build process. We use the familiar and popular [git][git] version control tool to push your code changes to a remote repository on our build servers. Each {{ $names.company.lower }} application has a unique remote repository associated to it and all code changes on the `master` branch of this repository will be built and delivered to your device fleet. When our servers receive your changes on `master` a chain reaction is set in motion in which your code is built for the specified target architecture, bundled into one or more [Docker container images][docker] and then systematically rolled out to your fleet of devices in the field.

__Note:__ The {{ $names.company.lower }} git repository is not intended as a code hosting solution, and we cannot guarantee the persistence of data in {{ $names.company.lower }} git remotes.

![how deployment works](/img/common/how_deploy_works.png)

## The build server

The build server is a powerful tool which compiles code specifically for your device's architecture. With our build servers, compiling a gnarly dependency tree can be done in seconds, as compared to the minutes or even hours it may take to build on your device.

All code that is pushed to your {{ $names.company.lower }} devices is sent to a build server and then, after it is built, the image is shipped to your devices.

The method our builders use to build your code depends on the project you are pushing. If your project includes a Dockerfile, the builders will execute every command in the Dockerfile, from including the base OS you define, to installing packages, pulling git repositories, and running any other commands you specify.

Alternatively, if your project includes a package.json (i.e. a Node.js project), then that will be used instead to create an implicit Dockerfile, which simulates the build process a node.js/npm project expects. In this way, we are able to transparently run node.js projects on {{ $names.company.lower }}, while taking advantage of some of Docker’s caching features.

A Dockerfile will always give you more power to fine-tune the build process, but it’s also good to start fast without one, since you can shift to a Dockerfile whenever you like. We will soon add more languages to the “first-class” support we give to Node.js. Until then, any other language can be used by adding a Dockerfile. It’s important to note that the environment within which your code gets built will match the devices you use for your app. So if you’re for example pushing to an app containing BeagleBone Black devices, we’ll build your code in an ARMv7 environment, while for the Raspberry Pi B+ it would be ARMv6.

If you push a project with only a `Dockerfile`, `Dockerfile.template`, or `package.json`, a single container image will be built and sent to your device. The single container will show up on the device dashboard as a service with the name `main`. 

For [multicontainer][multicontainer] applications (Microservices and Starter [application types][app-types]), a `docker-compose.yml` file at the root of the project directory will kick off multiple simultaneous image builds, each with their own [build logs][logs].

## How to deploy

In order to deploy code to your devices you must first ensure they are correctly connected to a {{ $names.company.lower }} application. See the [Getting Started Guide][getting-started] for details.

Then simply add your {{ $names.company.lower }} endpoint to your [git][git] repository via `git
remote add {{ $names.company.short }} [application endpoint]`.

Whenever you subsequently need to push code to your devices, simply run
`git push {{ $names.company.short }} master`.

__Warning:__ The {{ $names.company.lower }} git repository **is not** intended as a code hosting solution, and we cannot guarantee the persistence of data in {{ $names.company.lower }} git remotes.

If you want to push a different local git branch to your {{ $names.company.lower }} fleet all you need to do is:
`git push {{ $names.company.short }} my-local-branch:master`

## Release logs

All releases that are pushed to the {{ $names.company.lower }} build servers are tracked in their own dashboard page. You can access this page by clicking *Releases* from the application dashboard:

<img src="/img/common/app/release_list.png" width="100%">

The releases page includes a list of all attempted and deployed releases, with information on the status of the release, when it was completed, how long it took, and how many devices are on that particular release. Clicking any row will open up a summary page specifically for that release, with windows showing the `docker-compose.yml` file and Build Logs:

<img src="/img/common/app/release_summary.png" width="100%">

Much like with the device list, [filters][filters] can be added to the release list by clicking *Add filter* and filling in the appropriate fields:

<img src="/img/common/app/release_filter.png" width="60%">

[Saved views][saved-views] can also be created to return to a specific collection of filters.

[docker]:https://www.docker.com/
[git]:http://git-scm.com/

[getting-started]:/learn/getting-started
[filters]:/learn/manage/filters-tags/#filters-and-tags
[saved-views]:/learn/manage/filters-tags/#create-a-view
[logs]:#release-logs
[multicontainer]:/learn/develop/multicontainer
[app-types]:/learn/manage/app-types