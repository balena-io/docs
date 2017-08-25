---
title: Delta Updates
excerpt: How binary delta updates work on resin.io, and how to enable it for your applications
thumbnail: /img/runtime/ResinSupervisorDelta.png
---

# Delta Updates

When a new version of your application is pushed to resin.io servers, your devices are notified, and will initiate an update of their running containers. The regular device update uses the Docker pull mechanism. It requests all the [layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/#/images-and-layers) of the new container image that are not present on the device (i.e. not shared with the previous image). Then from these layers the new image is assembled on the device, and replaced the previous version of the application. This process potentially moves a lot of data, uses a lot of space on the device to hold both the old and the new images, and the device can be in a sensitive state while Docker is updating (e.g. in case there's an unexpected power outage during that time).

To address some of these issues, we have implemented a "binary delta" update process. Instead of initiating a Docker pull when the device is notified about an update, it requests the resin.io servers to provide just the differences between the old and new container image. This comparison is done on the full image level, comparing the actual content, regardless of the layers used, resulting the minimum amount of change required to get from the previous application version to the new one. In the worst case (i.e. completely replaced application image) the binary delta is equal size to the Docker pull (the device needs to download the full image). In most cases, the binary delta will be much smaller.

Once the delta (difference between the old and new image) is calculated, the device downloads and applies this delta onto the old application image, in place. When the process is finished, the new container image (new version of the application) is started.

These binary deltas save on the amount of data needed to be downloaded, reduce the storage space requirements on the device to perform an application update, and shorten the time when Docker is updating.

## Enabling Delta Updates

The resin.io [supervisor](/understanding/understanding-devices/#resin-io-supervisor) is responsible to manage your applications on the device, and the delta update behaviour is enabled through setting a supervisor configuration variable: defining `RESIN_SUPERVISOR_DELTA` as `1`.

![Setting the fleet configuration to enable delta behaviour](/img/runtime/ResinSupervisorDelta.png)

To enable this behaviour application-wide, that is for all devices of a given application, set the above variable at **Fleet Configuration** in the resin.io dashboard of your application, through the resin.io [API](/runtime/data-api/#create-application-variable), through the SDK (in [Node.js](/tools/sdk/#resin.models.environment-variables.create) or [Python](/tools/python-sdk/#applicationenvvariable)), or the [command line interface](/tools/cli/#envs).

To enable this behaviour on a per-device basis, set the above variable at **Device Configuration** in the resin.io dashboard for your device, through the resin.io [API](/runtime/data-api/#create-device-variable), through the SDK (in [Node.js](/tools/sdk/#resin.models.environment-variables.device.create) or [Python](/tools/python-sdk/#function-create-uuid-name-value-)), or the [command line interface](/tools/cli/#envs). If the device is [moved to another application](/management/devices/#move-to-another-application), it will keep the delta updates behaviour regardless of the application setting.

## Delta Behaviour

When you are using delta updates, you might notice the following changes in resin.io behaviour.

The **download progress bar** on the dashboard might show only for a very short time, much shorter than it takes in a normal application update. This is because in the most common development patterns there are usually very small changes between one version of the application image and the next (e.g. fixing typos, adding a new source file, or installing an extra OS package), and using deltas these changes are downloaded much quicker than before.

You might still observe the application **downloading the full application image**. This happens if there was an issue during the delta download, and in that case the supervisor will fall back to the original Docker pull approach to recover.

## Further Information

* [Feature announcement](https://resin.io/blog/the-next-resin/#deltaupdates) on the resin.io blog
