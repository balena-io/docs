---
title: Delta updates
excerpt: How binary delta updates work on {{ $names.company.lower }}, and how to enable it for your applications
thumbnail: /img/runtime/ResinSupervisorDelta.png
---

# Delta updates

When a new version of your application is pushed to {{ $names.company.lower }} servers, your devices are notified, and will initiate an update of their running containers. The regular device update uses the Docker pull mechanism. It requests all the [layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/#/images-and-layers) of the new container image that are not present on the device (i.e. not shared with the previous image). Then from these layers the new image is assembled on the device, and replaced the previous version of the application. This process potentially moves a lot of data, uses a lot of space on the device to hold both the old and the new images, and the device can be in a sensitive state while Docker is updating (e.g. in case there's an unexpected power outage during that time).

To address some of these issues, we have implemented a "binary delta" update process. Instead of initiating a Docker pull when the device is notified about an update, it requests the {{ $names.company.lower }} servers to provide just the differences between the old and new container image. This comparison is done on the full image level, comparing the actual content, regardless of the layers used, resulting in the minimum amount of change required to get from the previous application version to the new one. In the worst case (i.e. completely replaced application image) the binary delta is equal size to the Docker pull (the device needs to download the full image). In most cases, the binary delta will be much smaller.

Once the delta (difference between the old and new image) is calculated, the device downloads and applies this delta onto the old application image, in place. When the process is finished, the new container image (new version of the application) is started.

These binary deltas save on the amount of data needed to be downloaded, reduce the storage space requirements on the device to perform an application update, and shorten the time when Docker is updating.

## Enabling/Disabling delta updates

__Note__: Delta updates are enabled by default for devices running {{ $names.os.lower }} >= 2.47.1 or [ESR](esr) versions >= 2020.04

For any devices running {{ $names.os.lower }} >= 2.47.1, the delta update behavior is enabled by default. For devices running {{ $names.os.lower }} < 2.47.1, updating to >= 2.47.1 via a [self-service update][self-service-update] will enable delta updates for the device. Alternatively, the delta update behavior may be enabled or disabled application-wide or per-device with the `RESIN_SUPERVISOR_DELTA` configuration variable.

![Setting the fleet configuration to enable delta behavior](/img/runtime/ResinSupervisorDelta.png)

To enable this behavior application-wide, that is for all devices of a given application, set the above variable at **Fleet Configuration** in the {{ $names.company.lower }} dashboard of your application, through the {{ $names.company.lower }} [API](/reference/api/resources/application_config_variable/), through the SDK (in [Node.js](/reference/sdk/node-sdk/#configvar-set-nameorid-key-value-code-promise-code-) or [Python](/reference/sdk/python-sdk/#applicationconfigvariable)), or the [command line interface](/tools/cli/#envs).

To enable this behavior on a per-device basis, set the above variable at **Device Configuration** in the {{ $names.company.lower }} dashboard for your device, through the {{ $names.company.lower }} [API](/runtime/data-api/#create-device-variable), through the SDK (in [Node.js](/reference/sdk/node-sdk/#configvar-set-uuidorid-key-value-code-promise-code-) or [Python](/reference/sdk/python-sdk/#deviceconfigvariable)), or the [command line interface](/tools/cli/#envs). If the device is [moved to another application](/management/devices/#move-to-another-application), it will keep the delta updates behavior regardless of the application setting.

Similarly, you may disable the delta update behavior application-wide or per-device.

## Delta behavior

Before devices can update using deltas, a delta must be generated between the release a device is currently running and the one it is updating to. There are two ways deltas are generated:

1. Automatically between the last successful and the new release during a build on the {{$names.cloud.lower}} builder - these are known as "build-time" deltas.
2. Automatically when a device is requesting to update from or to a release for which no delta has been generated before - these are known as "on-demand" deltas and can typically happen if the device was not on the latest release when the new release was pushed, or the user did not use the {{$names.cloud.lower}} builder for the new release.

On-demand deltas may take a while to generate, depending primarily on the size of the images involved. While the delta is generating, the device keeps polling the API, checking if the delta is ready. If a delta already exists, this step is skipped.

The *Download progress* bar on the dashboard might show for only a short time, much shorter than in a normal application update. In the most common development patterns, there are usually very small changes between one version of the application image and the next (e.g. fixing typos, adding a new source file, or installing an extra OS package), so when using deltas these changes are downloaded much quicker than before.

Devices using delta updates still follow the prescribed [update strategy](update-strategies).

[esr]:/reference/OS/extended-support-release/
[self-service-update]:/reference/OS/updates/self-service/
[update-strategies]:/learn/deploy/release-strategy/update-strategies/
