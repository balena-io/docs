---
title: What is {{ $names.os.lower }}?

layout: os-version-specific.html

dynamic:
  variables: [ $os_version ]
  ref: $original_ref/$os_version
  $switch_text: Select a version $os_version
---

{{import "overview"}}

