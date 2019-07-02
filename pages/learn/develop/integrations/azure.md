---
title: Microsoft Azure IoT Suite integration
excerpt: Get started with the Microsoft Azure IoT Suire and {{ $names.company.lower }}
---

# [Microsoft Azure IoT Suite][azure] integration

[{{ $names.company.upper }}][balena] makes it simple to deploy, update, and maintain code running on remote devices. Microsoft's new IoT Suite makes it easy to manage and capture the data those devices generate. This tutorial will walk you through using the two in conjunction.


## Connect your device to {{ $names.company.lower }}

Follow our [getting started guide][installing] to get your device connect to your {{ $names.company.lower }} dashboard. Once your device shows up on the dashboard you're ready for the next step.

![factory-build](/img/integrations/azure/factory-build.png)

## Create the {{ $names.company.lower }} API Key

Find your Application ID in the {{ $names.company.lower }} dashboard url: {{ $links.dashboardUrl }}/apps/NNNN/devices and your auth-token from the [preferences panel]({{ $links.dashboardUrl }}/preferences?tab=details). Then combine insert the two into the curl request below.

```
curl -H 'Authorization: Bearer AUTH_TOKEN' -X POST https://api.{{ $names.dashboard_domain }}/application/NNNN/generate-api-key
```

This will return your new API key.

__NOTE:__ The key will be returned in quotation marks, but these should be stripped before using it in the following step.

## Add {{ $names.company.lower }} API key to IoT Hub Admin portal

Signup and following the [Azure IoT Suite getting started guide](https://azure.microsoft.com/en-us/overview/iot/product-selector/).

__NOTE:__ you'll have to use the [special version][integration] with {{ $names.company.lower }} integration additions as our integration is not currently a part of the code Microsoft releases.

Go to the IoT Hub Admin portal, select '{{ $names.company.upper }} Config' and set the `App ID` and the newly generated `API Key`.

![IoT-hub-creds](/img/integrations/azure/iot-hub-creds.png)

This will automatically create a new device on IoT Hub with every device you currently have on {{ $names.company.lower }} as well as every future device you may have, as it constantly polls for new devices.

![devices-pending](/img/integrations/azure/devices-pending.png)

This also automatically creates application wide and per device environment variables on {{ $names.company.lower }} that are accessible by your code. e.g. `$IOT_HUB_DEVICE_ID`. This obviously simplifies sending data to the IoT hub.

The variables are:
* Application-wide
  * `IOT_HUB_HOST` - full hostname, like _MyHub.azure-devices.net_
  * `IOT_HUB_NAME` - first part of the hostname, like _MyHub_
  * `IOT_HUB_SUFFIX` - rest of the hostname, like _azure-devices.net_
* Per-device:
  * `IOT_HUB_DEVICE_ID`
  * `IOT_HUB_DEVICE_KEY`

![resin-envar](/img/integrations/azure/envar.png)

## Push the sample app to your devices

When you push code to the {{ $names.company.lower }} git endpoint several things happen, including:
* {{ $names.company.lower }} creates a Docker container
* it provisions it following the instructions in Dockerfile (for example, it automatically installs Linux packages and builds C sources in our case)
* it notifies the devices about the new container availability

When you power on the device, it connects to the {{ $names.company.lower }} API and fetches the application container. It also does it every time a new container is available (when you push the updated code).

First clone the the [sample application][sampleApp] to your local machine.

__NOTE:__ Our integration is not part of the code Microsoft releases, instead it will stay as a separate fork that should be used instead of the official sample solution.

```
git clone {{ $links.githubProjects }}/balena-azure-iot-sample && cd balena-azure-iot-sample && git checkout resin-node
```

Then add your {{ $names.company.lower }} applications remote endpoint to the git repository. It can be found in the top right hand corner of your {{ $names.company.lower }} applications dashboard.

```
git remote add {{ $names.company.short }} <your-applications-remote-endpoint>
```

Then all that's left to do is push your repository to your {{ $names.company.lower }} application endpoint we have just created.

```
git push {{ $names.company.short }} resin-node:master
```

Once the container is successfully built (you'll see a unicorn), the container will begin to download to the device.

![downloading](/img/integrations/azure/downloading.png)

Once the download is complete, head to the device logs you'll notice that we are sending telemetry data to the IoT Hub.

![resin-logs](/img/integrations/azure/logs.png)


## Have fun!

Now you’re done. Provision as many devices as you need with {{ $names.company.lower }} (you can use the same device OS image you’ve downloaded at step 1, burn it to multiple SD cards and power on the devices). You can watch devices appearing online through {{ $names.company.lower }} dashboard. You can check app and device environment variables that should be created quickly after the device is online. Then you can check the device logs and see as they send the information to the IoT Hub. Finally you can go to the IoT Hub Admin portal and check that the new devices appear as running there.

![devices-running](/img/integrations/azure/devices-running.png)

[balena]:{{ $links.mainSiteUrl }}
[installing]:/installing/gettingStarted
[azure]:https://azure.microsoft.com/en-us/product-categories/iot/
[screencast]:https://vimeo.com/136840643
[integration]:{{ $links.githubProjects }}/balena-azure-iot-remote-monitoring
[sampleApp]:{{ $links.githubProjects }}/balena-azure-iot-sample
