# Caveats

The first and most important caveat to state is that Resin.io is in __alpha__ and thus should not be used for anything even approaching a critical project.

## Raspberry Pi and node.js

We have chosen initially to target a single device rather than trying to spread ourselves thin targeting a wide range of devices at once.

The focus provided by targeting a single device gets Resin.io out there receiving feedback from users as soon as possible, without the delays targeting more would inevitably cause.

This additionally enables us to get an end-to-end system working which exercises all aspects of our product, giving us room to iterate and improve any issues which arise based on real-world experience.

For the same reason, we have chosen to use node.js to power our install and execution scripts when pushing code - though it's possible to use pretty much whatever environment you wish even now (though this is unsupported!), we leave the actual specification of what to build and what to execute to the standard node.js configuration of pre-install and start scripts.

## OS Updates

When we release new version of the install image, you may need to manually
updated your SD cards. We expect to remove this limitation once the beta version
of the software is available.

## Reliability

As we mature the infrastructure and develop the codebase, occasional periods of downtime should be expected. While we work very hard to minimise these, and endeavour to avoid failing for the same reason twice, we do expect outages from time-to-time.

Again, we reiterate: please do *not* use Resin.io for critical projects.

## Stability

The programming conventions and interfaces we use are also likely to change over time as we learn from real-world use cases. While we will not break backwards compatibility lightly, we value a clean experience very highly, and going forward will break existing conventions if needed.
