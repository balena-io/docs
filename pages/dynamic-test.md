---
title: Dynamic page for $device and $type
layout: custom-test.html

# this is dynamic page definition
# hope it's self-explanatory
dynamic_page:
  axes:
    $device:
      dictionary: devices
      key: slug
    $lang:
      dictionary: languages
      key: slug
  url_suffix: -$device-$lang
  partials_search: [ $device+$lang, $device, $lang, _default ]

---

**It works**

Now let's try import:

{{import "test"}}
