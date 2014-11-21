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

## Persistent Storage

Applications can store data in the `/data` folder mounted on the application's
file system. This folder is guaranteed to be maintained across updates and thus
files contained in it can act as persistent storage.

Note that this folder is __not__ mounted when your project is building on our
build server, and is only created once your project is deployed to your actual
devices.

Additionally, the `/data` folder is created per-device and it not kept in sync
between devices, so ensure your application takes this into account.

[env_vars]:http://en.wikipedia.org/wiki/Environment_variable
