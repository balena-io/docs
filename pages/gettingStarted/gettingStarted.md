---
title: Getting Started with $device and $language
layout: custom-test.html

# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes: [ $device, $language ]
  url_suffix: -$device-$language
  partials_search: [ $device+$language, $device, $language, _default ]

---

{{import "usingSupport"}}
{{import "whatYouNeed"}}
{{import "createAnApp"}}
{{import "sshKey/add"}}
{{import "getResinOS"}}
{{import "getDeviceOnDash"}}
{{import "selectNetworkConfig"}}
{{import "deployingCode"}}
