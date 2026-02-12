# Interact with hardware

For many projects, you may need to control or have access to some external hardware via interfaces like GPIO, I2C or SPI. For single-container fleets, you will automatically have access to `/dev` and these interfaces as the container is run in [**privileged** mode](https://docs.docker.com/engine/reference/commandline/run/#/full-container-capabilities-privileged). This means you should be able to use any hardware modules like you would in a vanilla Linux environment.

Multicontainer fleets do not run containers in privileged mode by default. If you want to make use of hardware, you will have to appropriately configure your `docker-compose.yml` file to either set some services to privileged, using `privileged: true`, or use the `cap_add` and `devices` settings to map in the correct hardware access to the container.

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

{% hint style="warning" %}
If you are not using one of the Docker base images recommended in our [base images wiki](../../../../pages/reference/base-images/balena-base-images.md), then it's most likely you will need to handle the updating of `/dev` via [udev](https://www.freedesktop.org/software/systemd/man/udev.html) yourself.
{% endhint %}

For more details on interacting with external hardware, check out these guides:

* [GPIO](../../../../pages/learn/develop/hardware/gpio.md)
* [i2C and SPI](../../../../pages/learn/develop/hardware/i2c-and-spi.md)
* [USB](../../../../pages/learn/develop/hardware/usb.md)
* [Jetson Orin devices](nvidia-jetson-orin/)
