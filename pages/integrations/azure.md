# [Microsoft Azure IoT Suite][azure] integration

[Resin.io][resin] makes it simple to deploy, update, and maintain code running on remote devices. Microsoft's new IoT Suite makes it easy manage and capture the data those devices generate. This tutorial will walk you through using the two in conjuction. 

## Connect your device to resin.io

Follow our [getting started guide][installing] or watch our screencast to get your device connect to your resin.io dashboard. Once your device shows up on the dashboard your ready for the next step.

![factory-build](/img/integrations/azure/factory-build.png)

## Create the resin.io API Key 

Find your the Applications ID from the dashboard url: https://dashboard.resin.io/apps/NNNN/devices and your auth-token from the [preferences panel](https://dashboard.resin.io/preferences?tab=details). Then combine insert the two into the curl request below, it will return a permanent API key.

```
curl -H 'Authorization: Bearer AUTH_TOKEN' -X POST https://api.resin.io/application/NNNN/generate-api-key
```

## Add resin.io API key to IoT Hub Admin portal 

Go to the IoT Hub Admin portal select 'Resin.io Config' and set the `App ID` and the newly generated `API Key`.

![IoT-hub-creds](/img/integrations/azure/iot-hub-creds.png)

This will automatically create a new device on IoT Hub with every device you have on resin.io. 

![devices-pending](/img/integrations/azure/devices-pending.png)

This also automatically creates application wide and per device environment variables on resin.io that are accessible by your code. eg. `$IOT_HUB_DEVICE_IOT`. This obviously simplifies sending data to the IoT hub.

![resin-envar](/img/integrations/azure/envar.png)

## Push the sample app to your devices

When you push code to resin git endpoint several things happen, including:
* resin creates a docker container
* it provisions it following the instructions in Dockerfile (for example, it automatically installs Linux packages and builds C sources in our case)
* it notifies the devices about the new container availability

When you power on the device resin-agent connects to resin API server and fetches the application container. It also does it every time a new container is available (when you push the updated code).

First clone the repository to your local machine

```
git clone https://github.com/emirotin/resin-azure-iot-suite-c/tree/resin-sample-app && cd resin-sample-app
```

Then add your resin.io applications remote endpoint to the git repository. It can be found in the top right hand corner of your resin applications dashboard.

```
git remote add resin <your-applications-remote-endpoint>
```

Then all thats left to do is push your the repository to your resin.io application.

```
git push resin master
```

Once the container is successfully built(you'll see a unicorn), the container will begin to download to the device. 

![downloading](/img/integrations/azure/downloading.png)

Once the download is complete, head to the device logs you'll notice that we are sending an integer to the IoT Hub. 

![resin-logs](/img/integrations/azure/logs.png)


## Have fun!

Now you’re done. Provision as many devices as you need with resin (you can use the same device OS image you’ve downloaded at step 1, burn it to multiple SD cards and power on the devices). You can watch devices appearing online through resin dashboard. You can check app and device environment variables that should be created quickly after the device is online. Then you can check the device logs and see as they send the information to the IoT Hub. Finally you can go to the IoT Hub Admin portal and check that the news devices appear as running there.

![devices-running](/img/integrations/azure/devices-running.png)

If you have any further questions drop us a mail at **azure@resin.io**.

[resin]:http://resin.io
[installing]:/pages/installing/gettingStarted.md
[azure]:http://www.microsoft.com/en-us/server-cloud/internet-of-things.aspx
[screencast]:https://vimeo.com/136840643
[sampleApp]:https://github.com/emirotin/resin-azure-iot-suite-c/tree/resin-sample-app