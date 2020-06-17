# Contributing

Thank you for contributing to the docs! We have a few guidelines which will allow your awesome PR to pass our CI checks and successfully merge.

The docs version numbering adheres to [Semantic Versioning](http://semver.org/). Please ensure that each commit in your pull request conforms to the following format.

```
component: Description of my change

Change-type: patch
Signed-off-by: Joe Soap <joe.soap@example.com>
```

This will allow the system to automatically version the documentation using the `Change-type`. The versioning follows [semver](https://semver.org/) and changes can be of type `patch`, `minor` or `major`.

It is also worth noting that some of the reference documentation is sourced from the individual component repositories and should be updated at the source.

Currently the following reference material is pulled from other repos:
- [Device Supervisor API](https://www.balena.io/docs/reference/supervisor/supervisor-api/) and [Device Supervisor upgrades](https://www.balena.io/docs/reference/supervisor/supervisor-upgrades), sourced from https://github.com/balena-io/balena-supervisor/tree/master/docs
- [CLI](https://www.balena.io/docs/reference/cli/) sourced from https://github.com/balena-io/balena-cli/blob/master/doc/cli.markdown
- [Node SDK](https://www.balena.io/docs/reference/sdk/node-sdk/) sourced from https://github.com/balena-io/balena-sdk/blob/master/DOCUMENTATION.md
- [Python SDK](https://www.balena.io/docs/reference/sdk/python-sdk/) sourced from https://github.com/balena-io/balena-sdk-python/blob/master/DOCUMENTATION.md

Version numbers and commit messages are automatically added to the `CHANGELOG.md` file by the CI build flow, after a pull request is merged. It should not be manually edited.
