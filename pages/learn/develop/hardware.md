---
title: Interact with hardware
excerpt: Access GPIO, I2C and SPI interfaces with {{ $names.company.lower }}
---

# Interact with hardware

For many projects, you may need to control or have access to some external hardware via interfaces like GPIO, I2C or SPI. For single-container applications, you will automatically have access to `/dev` and these interfaces as the container is run in [**privileged** mode](https://docs.docker.com/engine/reference/commandline/run/#/full-container-capabilities-privileged). This means you should be able to use any hardware modules like you would in a vanilla Linux environment.

Multicontainer applications do not run containers in privileged mode by default. If you want to make use of hardware, you will have to appropriately configure your `docker-compose.yml` file to either set some services to privileged, using `privileged: true`, or use the `cap_add` and `devices` settings to map in the correct hardware access to the container.

As an example, here the `gpio` service is set up to use i2c and serial uart sensors:

```
gpio:
    build: ./gpio
    devices:
      - "/dev/i2c-1:/dev/i2c-1"
      - "/dev/mem:/dev/mem"
      - "/dev/ttyACM0:/dev/ttyACM0"
    cap_add:
      - SYS_RAWIO
```

__Note:__ If you are not using one of the Docker base images recommended in our [base images wiki][base-image-wiki-link], then it's most likely you will need to handle the updating of `/dev` via [udev][udev-link] yourself.

For more details on interacting with external hardware, check out these guides:
- [GPIO][gpio]
- [i2C and SPI][i2c-spi]

[gpio]:/learn/develop/hardware/gpio
[i2c-spi]:/learn/develop/hardware/i2c-and-spi
[base-image-wiki-link]:/reference/base-images/base-images/
[udev-link]:https://www.freedesktop.org/software/systemd/man/udev.html