# Runtime Configuration

There are various configuration options exposed to programs running on
Resin.io. Currently these are limited to two configuration options:-

## Environment Variables

* `RESIN_DEVICE_UUID` - The unique identifier associated with the device the
  program is running on. Read-only.
* `PORT` - Determines which port is exposed to the local network from the
  VPN. Read/Write.
