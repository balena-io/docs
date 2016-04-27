---
title: Getting Started with {{ $device_details.name }} and {{ $language_details.name }}

layout: getting-started.html

# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes: [ $device, $language ]
  url: $device/$language/$baseUrl
  partials_search: [ $device+$language, $device, $language, _default ]
  switch_text: Getting Started with $device and $language
---

# {{ title }}

{{import "introduction"}}

## What you will Need

{{import "whatYouNeed"}}

## Getting Help

Before we get started building something cool, lets just point out some places to get help.
{{import "usingSupport"}}

To help us understand all the moving parts in resin.io, lets first define a few terms that will be used later in the guide.
{{import "basicConcepts"}}

## Let's Jump in

If you don't already have a resin.io account head over to our [signup page][link-to-signup], during the sign up process you will be asked to set up an SSH key so you can securely push code.
{{import "sshKey/add"}}

## Creating an Application
{{import "createAnApp"}}

## Adding your First Device

{{import "getResinOS"}}

{{import "selectNetworkConfig"}}

### Create a bootable {{ $device_details.bootMedia }}
{{import "flashingOsToBootMedia"}}

{{import "getDeviceOnDash"}}

## Deploying Code

{{import "deployingCode"}}

{{import "diveIntoCode"}}

## Using the Web Terminal

{{import "usingWebTerminal"}}

## Using resin sync to develop fast

{{import "usingResinSync"}}

<!-- ## Example Projects to Build From

{{import "exampleProjects"}} -->

There are even more hidden treasures in the resin.io platform and tools, but we will get into those a bit later.

**Enjoy Resinifying all the things!**
<img src="/img/common/resinify.jpg" width="80%">

[link-to-signup]:https://dashboard.resin.io/signup
