---
title: Self-service updates
excerpt: How to update resinOS versions from your dashboard
---

# Self-service updates

## Which devices and versions are supported?

Since we periodically release updates and improvements to resinOS (the host OS running on all resin.io devices), we encourage you to keep your device up to date. We offer self-service host OS updates between 2.x versions, from 1.x to 2.x versions, and between 1.x versions.

__Note__: ResinOS 1.x to 2.x updates limit the amount of data you can have in your application's `/data` folder to about 170MB (compressed). If you have more data, the update will fail and your device won't be modified.

For the **Raspberry Pi** series, self-service updates are available from resinOS versions 1.8.0 and upwards (including 2.x versions) to any versions after resinOS 2.2.0.

For **BeagleBone** devices, you can update resinOS 1.8.0 through 1.26.0 to the transitional 1.30.1 version, and from 1.30.1 and upwards (including 2.x versions) to versions after 2.2.0.

For **Intel NUC** and **UP Boards**, you can update 2.x versions to versions after 2.2.0.

At the moment, only production and release candidate resinOS versions can be updated. Development and beta versions cannot.

For device types and resinOS versions that are not yet supported, please contact us on the [forums][forums]. We are continuously expanding the range of versions and types that can be updated.

## Running an update

To run an update, navigate to your device's *Actions* tab, click *Update ResinOS*, and select the version of resinOS you would like to update to.

<img src="/img/common/updates/update-resinos.png" width="80%">

You will see a progress bar that marks the steps completed for the update. Some steps that take longer, such as the device downloading the new OS image, may make the progress bar appear stuck. This doesn't mean anything has gone wrong with your update. We are working on making the update process more informative.

Update time can vary significantly, depending on the speed of your network, the speed of your SD card (or other storage medium), and your device performance.

If your resinOS update fails for any reason, the device should still be recoverable. If you have any issues, please contact us on the [troubleshooting section of the forums][troubleshooting].

You can learn more about what exactly goes on during the update process [here][update-process].

<!-- links -->
[forums]:https://forums.resin.io/
[troubleshooting]:https://forums.resin.io/c/troubleshooting
[update-process]:/updates/update-process/