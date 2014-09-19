# Runtime Configuration

Resin.io exposes runtime data to programs running on devices to enable you to
adapt your programs to specific runtime configurations.

We currently expose these via [environment variables][env_vars]:-

## Environment Variables

* `RESIN_DEVICE_UUID` - The unique identifier associated with the device the
  program is running on. Read-only.
* `PORT` - Determines which port is exposed to the local network from the
  VPN. Read/Write.

[env_vars]:http://en.wikipedia.org/wiki/Environment_variable
