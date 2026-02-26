# Extra firmware

Some devices require specific Linux firmware files to enable hardware functionality such as WiFi, Bluetooth, or GPU acceleration. The balenaOS root filesystem has limited space, which restricts the firmware that can be included by default. The extra firmware block allows you to incorporate device-specific firmware into your fleet without waiting for an OS release.

### How it works

The extra firmware block mirrors the [linux-firmware](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/) repository and copies the required firmware files into a named volume `extra-firmware`, which mounts at `/extra-firmware` in container. When the feature is enabled, balenaOS configures itself to look in this volume location for Linux firmware in addition to the default firmware paths.

### Requirements

To use the extra firmware feature, your device must meet the following requirements:

| Requirement | Version           |
| ----------- | ----------------- |
| BalenaOS    | v6.10.7 or higher |
| Supervisor  | v17.5.2 or higher |

### Using the extra firmware block

#### Step 1: Add the firmware block to your fleet

Add the extra firmware block as a service in your `docker-compose.yml` file. We release firmware blocks for the following architectures:

| Architecture | Image                                    |
| ------------ | ---------------------------------------- |
| armv6        | `bh.cr/balena_os/linux-firmware-armv6hf` |
| armv7        | `bh.cr/balena_os/linux-firmware-armv7hf` |
| armv8        | `bh.cr/balena_os/linux-firmware-aarch64` |
| x86          | `bh.cr/balena_os/linux-firmware-amd64`   |

The firmware block **must** include the `io.balena.features.extra-firmware` label to enable the feature:

```yaml
version: '2.4'

services:
  firmware:
    image: bh.cr/balena_os/linux-firmware-aarch64
    labels:
      io.balena.features.extra-firmware: '1'
```

#### Step 2: Enable the feature in other services (optional)

If you have other services that need to add firmware files to the extra firmware location, you can also apply the `io.balena.features.extra-firmware` label to those services:

```yaml
version: '2.4'

services:
  firmware:
    image: bh.cr/balena_os/linux-firmware-aarch64
    labels:
      io.balena.features.extra-firmware: '1'

  my-service:
    build: ./my-service
    labels:
      io.balena.features.extra-firmware: '1'
```

#### Step 3: Deploy and reboot

After deploying a release that includes the firmware block, you must either reload the drivers that use the extra firmware, or reboot the device for the firmware to take effect. This is especially important for firmware that is used early in the application startup process.

You can initiate a reboot using the [Supervisor API](../../external-docs/supervisor-api.md#post-v1-reboot):

```bash
curl -X POST \
    -H "Content-Type:application/json" \
    -H "Authorization: Bearer $BALENA_SUPERVISOR_API_KEY"
    "$BALENA_SUPERVISOR_ADDRESS/v1/reboot"
```

{% hint style="warning" %}
To use the Supervisor API, your service must have the `io.balena.features.supervisor-api` [label](../../reference/supervisor/docker-compose.md#labels) set.
{% endhint %}

### Example configuration

Here is a complete example of a multicontainer fleet using the extra firmware block alongside an application service:

```yaml
version: '2.4'

services:
  firmware:
    image: bh.cr/balena_os/linux-firmware-aarch64
    labels:
      io.balena.features.extra-firmware: '1'

  custom-firmware:
    build: ./custom-firmware
    depends_on:
      - firmware
    labels:
      io.balena.features.extra-firmware: '1'
      io.balena.features.supervisor-api: '1'
    command:
      - /bin/sh
      - -c
      - |
        cp /usr/share/my-firmware/* /extra-firmware/
        exec /usr/src/app/wait-then-restart.sh
    restart: always
```
