# Balena SDK deprecation policy

The balena SDK uses [semver versioning](https://semver.org/), with the concepts
of major, minor and patch version releases.

The latest release of the previous major version of the balena SDK will remain
compatible with the balenaCloud backend services for one year from the date when
the next major version is released.
For example, balena SDK v12.33.4, as the latest v12 release, would remain
compatible with the balenaCloud backend for one year from the date when v13.0.0
is released.

At the end of this period, the older major version is considered deprecated and
some of the functionality that depends on balenaCloud services may stop working
at any time.
Users are encouraged to regularly update the balena SDK to the latest version.
