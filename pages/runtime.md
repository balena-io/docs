# Runtime Environment

## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue.

## Environment Variables

Resin.io exposes runtime data to programs running on devices to enable you to
adapt your programs to specific runtime configurations.

We currently expose these via [environment variables][env_vars]:-

* `RESIN_DEVICE_UUID` - The unique identifier associated with the device the
  program is running on. Read-only.

[env_vars]:http://en.wikipedia.org/wiki/Environment_variable
