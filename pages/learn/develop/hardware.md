---
title: Interact with hardware
excerpt: Access GPIO, I2C and SPI interfaces with resin.io
---

# Interact with hardware

For many projects, you may need to control or have access to some external hardware via interfaces like GPIO, I2C or SPI. With resin.io, your container application will automatically have access to `/dev` and these interfaces since the container is run in [**privileged** mode](https://docs.docker.com/engine/reference/commandline/run/#/full-container-capabilities-privileged). This means you should be able to use any hardware modules like you would in a vanilla Linux environment.

__Note:__ If you are not using one of the Docker base images recommended in our [base images wiki][base-image-wiki-link], then it's most likely you will need to handle the updating of `/dev` via [udev][udev-link] yourself. You can see an example of how our base images handle this [here](https://github.com/resin-io-library/base-images/blob/master/debian/armv7hf/jessie/entry.sh#L54).

For more details on interacting with external hardware, check out these guides:
- [GPIO][gpio]
- [i2C and SPI][i2c-spi]

[gpio]:/learn/develop/hardware/gpio
[i2c-spi]:/learn/develop/hardware/i2c-and-spi