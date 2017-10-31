---
title: Getting Started With {{ $device.name }} and {{ $language.name }}

layout: getting-started.html

dynamic:
  variables: [ $device, $language ]
  ref: $device/$language/$original_ref
  $switch_text: Getting Started with $device and $language
---

# {{ title }}

## Introduction

{{import "introduction"}}

## What you will need

{{import "whatYouNeed"}}

## Need help?

{{import "usingSupport"}}

## Account setup

If you don't already have a resin.io account, make sure to [sign up][link-to-signup].

{{import "sshKey/add"}}

## Create an application

{{import "createAnApp"}}

## Download resinOS

{{import "getResinOS"}}

{{import "selectNetworkConfig"}}

## Create a bootable {{ $device.bootMedia }}
{{import "flashingOsToBootMedia"}}

## Provision your device
{{import "getDeviceOnDash"}}

## Deploy code

{{import "deployingCode"}}

{{import "diveIntoCode"}}

## Use the web terminal

{{import "usingWebTerminal"}}

## Use resin sync to develop quickly

{{import "resinSync"}}
{{import "crossCompilation"}}
{{import "usingResinSync"}}

## Example projects
There are even more hidden treasures in the resin.io platform and tools, but we will get into those a bit later. For now why not fork one or two of our example projects and build something grand.

{{import "exampleProjects"}}



**Enjoy Resinifying All the Things!**
<img src="/img/common/resinify.jpg" width="80%">

[link-to-signup]:https://dashboard.resin.io/signup
