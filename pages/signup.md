---
title: Creating an account on Resin.io


# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes: [ $device, $language ]
  url: $device/$language/$baseUrl
  partials_search: [ $device+$language, $device, $language, _default ]

---

{{import "signingUp"}}
