---
title: Get started with {{ $device.name }} and {{ $language.name }}

layout: getting-started.html

dynamic:
  variables: [ $device, $language ]
  ref: $original_ref/$device/$language
  $switch_text: Get started with $device and $language
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

## Add your first device

{{import "getResinOS"}}

{{import "selectNetworkConfig"}}

{{import "flashingOsToBootMedia"}}

## Provision your device
{{import "getDeviceOnDash"}}

## Deploy code

{{import "deployingCode"}}

## Next steps

- Learn more about the [Dockerfile][dockerfile] that is used to build your application.
- Build an application that uses [multiple containers][multicontainer].
- Get to know the [web terminal][terminal], which can be used to SSH into your application containers and the host OS.
- Try out [local mode][local-mode], the most efficient way to rapidly develop and test your resin.io application.

## Example projects

These example projects will give you an idea of more things that can be done with resin.io:

{{import "exampleProjects"}}



**Enjoy Resinifying All the Things!**
<img src="/img/common/resinify.jpg" width="80%">

[dockerfile]:/learn/develop/dockerfile
[terminal]:/learn/manage/ssh-access
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[link-to-signup]:https://dashboard.resin.io/signup
