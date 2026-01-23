---
title: build-variables
---

| Variable Name         | Description                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BALENA\_APP\_NAME     | The name of the fleet.                                                                                                                                                                                                             |
| BALENA\_ARCH          | The instruction set architecture for the base images associated with this device.                                                                                                                                                  |
| BALENA\_MACHINE\_NAME | The name of the yocto machine this board is base on. It is the name that you will see in most of the balena Docker base images. This name helps us identify a specific [BSP](https://en.wikipedia.org/wiki/Board_support_package). |
| BALENA\_RELEASE\_HASH | The hash corresponding to the release.                                                                                                                                                                                             |
| BALENA\_SERVICE\_NAME | The name of the service defined in the `docker-compose.yml` file.                                                                                                                                                                  |
