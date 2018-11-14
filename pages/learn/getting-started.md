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

{{import "getting-started/introduction"}}

## What you will need

{{import "getting-started/whatYouNeed"}}

## Need help?

{{import "getting-started/usingSupport"}}

## Account setup

If you don't already have a {{ $names.company.lower }} account, make sure to [sign up][link-to-signup].

{{import "getting-started/sshKey"}}

## Create an application

{{import "getting-started/createAnApp"}}

{{import "getting-started/getOS"}}

{{import "getting-started/selectNetworkConfig"}}

{{import "getting-started/flashingOsToBootMedia"}}

## Provision your device
{{import "getting-started/getDeviceOnDash"}}

## Deploy code

{{import "getting-started/deployingCode"}}

## Next steps

- Learn more about the [Dockerfile][dockerfile] that is used to build your application.
- Build an application that uses [multiple containers][multicontainer].
- Get to know the [web terminal][terminal], which can be used to SSH into your application containers and the host OS.
- Try out [local mode][local-mode], the most efficient way to rapidly develop and test your {{ $names.company.lower }} application.

## Example projects

These example projects will give you an idea of more things that can be done with {{ $names.company.lower }}:

{{import "getting-started/exampleProjects"}}



**Enjoy Balenafying All the Things!**
<!-- <img src="/img/common/resinify.jpg" width="80%"> -->

[dockerfile]:/learn/develop/dockerfile
[terminal]:/learn/manage/ssh-access
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[link-to-signup]:{{ $links.dashboardUrl }}/signup
