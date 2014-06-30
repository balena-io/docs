# Caveats

The first and most important caveat to state is that Resin.io is in __alpha__ and thus should not be used for anything even approaching a critical project. You really should make yourself aware of the platform's current limitations.

## Raspberry Pi and node.js

We have chosen initially to target a single device, rather than trying to spread ourselves thin targeting a wide range of devices at once. The focus of a single device gets out there receiving feedback from you, the users, as soon as possible without the delays targeting more would inevitably cause, and additionally enables us to get an end-to-end system working which exercises all aspects of our product, giving us room to iterate and improve any issues which arise based on real-world experience.

For the same reason, we have chosen to use node.js to power our install and execution scripts when pushing code - though it's possible to use pretty much whatever environment you wish even now (though this is unsupported!), we leave the actual specification of what to build and what to execute to the standard node.js configuration of specified pre-install and start scripts.

We plan to expand target devices and deployment configurations as soon as possible, but this arrangement is of course a limitation for the time being.

## OS Updates

Whenever we release new operating system versions, you may need to replace the
files on your SD card. For a no-reflashing version, please be patient until we
get to the beta.

## WiFi Support

If you need wifi support for your application, we suggest the
[TP-Link nano router][router] that can be configured to receive WiFi signal and
provide Ethernet connectivity to your device. First-class WiFi support by means
of a WiPi or similar will be available during the beta.

## Reliability and Stability

As we mature the infrastructure and develop the codebase, occasional periods of downtime should be expected. While we work very hard to minimise these, and endeavour to avoid failing for the same reason twice, we do expect that there *will* be outages from time-to-time.

Again, we reiterate: please do *not* use Resin.io for critical projects.

The programming conventions and interfaces we use are also likely to change over time as we learn from real-world use cases. While we will not break backwards compatibility lightly, we value a clean experience very highly and going forward will break existing conventions if needed.
