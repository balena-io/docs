# balenaCloud Documentation

![GitHub tag](https://img.shields.io/github/v/tag/balena-io/docs) ![GitHub issues](https://img.shields.io/github/issues/balena-io/docs) ![GitHub License](https://img.shields.io/github/license/balena-io/docs)

Documentation for the [balenaCloud](https://balena.io/) platform lives here.  
Join our [forums](https://forums.balena.io/) to chat.

This repo intends to provide our public-facing documentation. The documentation in this repo is hosted at https://docs.balena.io.

## How to Contribute

If you think something is not documented, is outdated, or can be improved, don't hesitate to open a PR! Check our [CONTRIBUTING document](CONTRIBUTING.md) for the guidelines to ensure your PR can be merged as quickly as possible.
One can open or check existing issues on [GitHub issues](https://github.com/balena-io/docs/issues). Looking forward to seeing your contributions!

> Pro tip: Use the "Edit on GitHub" button to make changes to the correct file. It can be found via the dropdown by the `Ask` button

## Style manual

### Balena-specific words

For all instances, we use `balena` as lower-case capitalization unless beginning a sentence (Ex. _I like balena. Balena is great._). More instances as follows,

- **balena** (used to refer to the company as a whole, not in place of balenaCloud, balenaOS or any other project)
- **balenaEtcher**
- **balenaOS** (note the capitalization of **OS**)
- **balenaEngine**
- **balenaFin**
- **balenaCloud**
- the **balena CLI**
- the **balena Supervisor**
- **openbalena**

### Using Resuable Content

When creating new content or altering current pages, it's recommended to try and keep things DRY (Don't Repeat Yourself). This is accomplished in the balenaCloud documentation by using "reusable content". The `/pages/.gitbook/includes` folder contain snippets of the docs, which can be reused anywhere in the documentation.

To use reusable content in a page, all you need to do is add the following onto the page:

```
{% include "../../../.gitbook/includes/balena-example-projects.md" %}
```

> Warning: You are _not_ able to link to headings in reusable content.

### Using Templates

Many of our docs are dynamically generated via templates and scripts. These scripts pass information with varied details to a template in order to populate the placeholdersin the text.

Here is an example:

```
# Getting Started with {{ $device.name }}
```

## License

The project is licensed under the Apache 2.0 license.
