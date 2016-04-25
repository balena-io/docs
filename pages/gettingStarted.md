---
title: Getting Started with $device and $language
layout: custom-test.html

# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes: [ $device, $language ]
  url: $device/$language/$baseUrl
  partials_search: [ $device+$language, $device, $language, _default ]

---
{{import "introduction"}}

## What you will Need

{{import "whatYouNeed"}}

## Getting Help

Before we get started on building cool stuff, lets just point out some places to get help if you need it.
{{import "usingSupport"}}



{{import "createAnApp"}}

{{import "sshKey/add"}}

## Adding your First Device

{{import "getResinOS"}}

{{import "selectNetworkConfig"}}

{{import "getDeviceOnDash"}}

## Deploying Code

{{import "deployingCode"}}

## Using the Web Terminal

{{import "usingWebTerminal"}}

## Using resin sync to develop fast

{{import "usingResinSync"}}

## Example Projects to Build From

{{import "exampleProjects"}}
