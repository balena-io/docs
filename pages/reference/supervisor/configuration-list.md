---
title: Configuration List for {{ $device.name }} | balena

layout: config.html
extras: config-js

dynamic:
  variables: [ $device ]
  ref: $original_ref/$device
  $switch_text: Configuration for $device
---
