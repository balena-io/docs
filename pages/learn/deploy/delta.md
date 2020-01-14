---
title: Delta updates
excerpt: How binary delta updates work on {{ $names.company.lower }}, and how to enable it for your applications
thumbnail: /img/runtime/ResinSupervisorDelta.png
---

# Delta updates

When a new version of your application is pushed to {{ $names.company.lower }} servers, your devices are notified, and will initiate an update of their running containers. The regular device update uses the Docker pull mechanism. It requests all the [layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/#/images-and-layers) of the new container image that are not present on the device (i.e. not shared with the previous image). Then from these layers the new image is assembled on the device, and replaced the previous version of the application. This process potentially moves a lot of data, uses a lot of space on the device to hold both the old and the new images, and the device can be in a sensitive state while Docker is updating (e.g. in case there's an unexpected power outage during that time).

To address some of these issues, we have implemented a "binary delta" update process. Instead of initiating a Docker pull when the device is notified about an update, it requests the {{ $names.company.lower }} servers to provide just the differences between the old and new container image. This comparison is done on the full image level, comparing the actual content, regardless of the layers used, resulting the minimum amount of change required to get from the previous application version to the new one. In the worst case (i.e. completely replaced application image) the binary delta is equal size to the Docker pull (the device needs to download the full image). In most cases, the binary delta will be much smaller.

Once the delta (difference between the old and new image) is calculated, the device downloads and applies this delta onto the old application image, in place. When the process is finished, the new container image (new version of the application) is started.

These binary deltas save on the amount of data needed to be downloaded, reduce the storage space requirements on the device to perform an application update, and shorten the time when Docker is updating.

## Enabling delta updates

Delta update behavior is enabled with the `RESIN_SUPERVISOR_DELTA` configuration variable:

![Setting the fleet configuration to enable delta behavior](/img/runtime/ResinSupervisorDelta.png)

To enable this behavior application-wide, that is for all devices of a given application, set the above variable at **Fleet Configuration** in the {{ $names.company.lower }} dashboard of your application, through the {{ $names.company.lower }} [API](/reference/api/resources/application_config_variable/), through the SDK (in [Node.js](/reference/sdk/node-sdk/#configvar-set-nameorid-key-value-code-promise-code-) or [Python](/reference/sdk/python-sdk/#applicationconfigvariable)), or the [command line interface](/tools/cli/#envs).

To enable this behavior on a per-device basis, set the above variable at **Device Configuration** in the {{ $names.company.lower }} dashboard for your device, through the {{ $names.company.lower }} [API](/runtime/data-api/#create-device-variable), through the SDK (in [Node.js](/reference/sdk/node-sdk/#configvar-set-uuidorid-key-value-code-promise-code-) or [Python](/reference/sdk/python-sdk/#deviceconfigvariable)), or the [command line interface](/tools/cli/#envs). If the device is [moved to another application](/management/devices/#move-to-another-application), it will keep the delta updates behavior regardless of the application setting.

## Delta behavior

If you are using delta updates, you might notice the following changes in {{ $names.company.lower }} behavior:

The *Download progress* bar on the dashboard might show for only a short time—much shorter than in a normal application update. This is because in the most common development patterns, there are usually very small changes between one version of the application image and the next (e.g. fixing typos, adding a new source file, or installing an extra OS package), and when using deltas these changes are downloaded much quicker than before.

Delta updates are resumable, so if the connection drops or otherwise stalls, the update will resume from the last byte received. A user can configure the number of times a delta is retried before it bails out and signals failure to the supervisor. This is set by the `RESIN_SUPERVISOR_DELTA_RETRY_COUNT` configuration variable.

In addition, the wait time before a connection is considered stalled and the time between retries are configurable, using `RESIN_SUPERVISOR_DELTA_REQUEST_TIMEOUT` and `RESIN_SUPERVISOR_DELTA_RETRY_INTERVAL`. These are both specified in milliseconds. The defaults for these options allow for a 20 minute time frame where no byte is received before giving up, after which the supervisor retries the delta from the beginning.

The only case where the deltas fall back to pulling the entire image is if corruption is detected.
