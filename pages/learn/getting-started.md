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

## Account setup

If you don't already have a {{ $names.company.lower }} account, make sure to [sign up][link-to-signup] before continuing.

## Create an application

{{import "getting-started/createAnApp"}}

{{import "getting-started/getOS"}}

{{import "getting-started/selectNetworkConfig"}}

{{import "getting-started/flashingOsToBootMedia"}}

## Provision device

{{import "getting-started/getDeviceOnDash"}}

## Add release

Now that we have a device or two connected to a {{ $names.company.lower }} application, let's deploy some code and actually build something.

{{import "getting-started/balenaCliAuth"}}

{{import "getting-started/deployingCode"}}

{{import "getting-started/balenaPush"}}

{{import "getting-started/postPush"}}

{{import "getting-started/deviceUrl"}}

## Next steps

{{import "getting-started/nextSteps"}}

**Enjoy Balenafying All the Things!**
<!-- <img src="/img/common/resinify.jpg" width="80%"> -->

[dockerfile]:/learn/develop/dockerfile
[terminal]:/learn/manage/ssh-access
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[link-to-signup]:{{ $links.dashboardUrl }}/signup
[dashboard]:{{ $links.dashboardUrl }}
