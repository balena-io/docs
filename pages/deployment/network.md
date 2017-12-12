---
title: Network Setup on {{ $os_version.name }}

layout: os-version-specific.html

dynamic:
  variables: [ $os_version ]
  ref: $original_ref/$os_version
  $switch_text: Network Setup on $os_version
---
{{import "networking"}}
