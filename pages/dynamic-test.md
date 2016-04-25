---
title: Dynamic page for {{ $device_details.name }} and {{ $language_details.name }}
layout: custom-test.html

# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes: [ $device, $language ]
  url: $device/$language/$baseUrl
  partials_search: [ $device+$language, $device, $language, _default ]

---

**It works**

Now let's try import:

{{import "test"}}
