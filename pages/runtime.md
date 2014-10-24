# Runtime Configuration

Resin.io exposes runtime data to programs running on devices to enable you to
adapt your programs to specific runtime configurations.

We currently expose these via [environment variables][env_vars]:-

## Environment Variables

* `RESIN_DEVICE_UUID` - The unique identifier associated with the device the
  program is running on. Read-only.

[env_vars]:http://en.wikipedia.org/wiki/Environment_variable
