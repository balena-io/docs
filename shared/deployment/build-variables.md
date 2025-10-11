| Variable Name | Description |
| ------------- |-------------|
| {{ $names.company.allCaps }}_APP_NAME | The name of the fleet.|
| {{ $names.company.allCaps }}_ARCH | The instruction set architecture for the base images associated with this device.|
| {{ $names.company.allCaps }}_MACHINE_NAME | The name of the yocto machine this board is base on. It is the name that you will see in most of the {{ $names.company.lower }} [Docker base images][base-images].  This name helps us identify a specific [BSP](https://en.wikipedia.org/wiki/Board_support_package).|
| {{ $names.company.allCaps }}_RELEASE_HASH | The hash corresponding to the release.|
| {{ $names.company.allCaps }}_SERVICE_NAME | The name of the service defined in the `docker-compose.yml` file.|
