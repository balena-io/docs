---
title: IBM Bluemix Watson IoT integration
excerpt: Getting started with IBM Bluemix Watson IoT platform and {{ $names.company.lower }}
thumbnail: /img/integrations/bluemix/Bluemix_IoT_dashboard.png
---

# IBM Bluemix Watson IoT integration

[IBM Bluemix](https://new-console.ng.bluemix.net/) is an open standards, hybrid cloud development platform for building, running, and managing apps and services. It includes and connects a large number of different services to enable the creation of complex application. This document provides an overview how to use the [Watson IoT](http://www.ibm.com/internet-of-things/) component with {{ $names.company.lower }} to deploy IoT devices on the Bluemix platform. Setting up an IoT device allows sending data from devices, such as telemetry and sensor readings, and receive commands to perform actions.

## Configuring Bluemix Watson IoT

At this time there are two Bluemix consoles available, the [new console](https://new-console.ng.bluemix.net/) and the [classic console](https://console.ng.bluemix.net/). The new console will be used in this guide.

If you have not signed up for Bluemix, register a new account from the [console](https://new-console.ng.bluemix.net/). You will also be asked to set up a "[Region](https://new-console.ng.bluemix.net/docs/public/index.html#ov_intro_reg)", an "[Organization](https://new-console.ng.bluemix.net/docs/admin/orgs_spaces.html#orginfo)", and a "[Space](https://new-console.ng.bluemix.net/docs/admin/orgs_spaces.html#spaceinfo)". We recommend to choose the region closest to you, and set any values to the organization and space names that are meaningful for you. After logging in, you will be greeted by the IBM Bluemix Dasboard:

![IBM Bluemix Dashboard](/img/integrations/bluemix/Bluemix_dashboard.png)

### Creating an IoT Project and Device Types

On the dashboard select "Internet of Things", which section will contain your IoT projects, while initially it lists the available IoT components on Bluemix:

![IBM Bluemix Internet of Things projects](/img/integrations/bluemix/Bluemix_IoT.png)

For details beyond this guide, you can also check the [Bluemix IoT documentation](https://new-console.ng.bluemix.net/docs/services/IoT/index.html).

Start by adding a new project with the blue "+" sign, and selecting the **Internet of Things Platform** from the catalog:

![IBM Bluemix Internet of Things catalog](/img/integrations/bluemix/Bluemix_IoT_catalog.png)

This platform fulfills two of our aims, as highlighted on the page: "Connect your devices securely to the cloud" and "Build an app that talks to your devices". Fill out the service name, and continue with the button on the bottom of the page. When your new platform/service is set up, you'll be redirected to a new welcome page with a link to the control dashboard for this service.

![IBM Bluemix Internet of Things dashboard](/img/integrations/bluemix/Bluemix_IoT_dashboard.png)

To continue connecting your devices, follow the "Launch dashboard" link. That brings up the Internet of Things dashboard, with a number of key control panels. You can navigate between those panels using the left sidebar, listing "Boards", "Devices", "Access", "Usage", "Rules", and "Settings". Select Devices for the next step:

![IBM Bluemix Internet of Things devices dashboard](/img/integrations/bluemix/Bluemix_IoT_devices_dashboard.png)

On Bluemix, "device types" tie together a set of devices, and configure what sort of data those devices will send to the platform through "schemas".

To start create your first device type in the "Device Types" menu with "Create Type". Choose "Create device type", as opposed to "Create gateway type", meaning the the connecting machines of this type will be "devices", as opposed to "gateways", which pass on data from other machines. Add a name to the device (we suggest to use alpha-numerical characters only), and a description.

![Create new device type](/img/integrations/bluemix/Bluemix_create_device_type.png)

If you'd like, you can also define a template of common device attributes, but since they are mainly used to just search among devices, we'll ignore those at the moment.

The devices may send any kind of data to the Bluemix platform, but displaying the received data in the Watson IoT dashboards needs further settings. For those dashboards you have to define a schema, describing what data the devices of the given device type will send to Bluemix. When defining this schema, you may set the patterns based on data already received if have working devices, or may combine reading values mathematically to calculate a more complex display value.

### Creating Devices

There are two way to create new devices on the Watson IoT platform: setting them up manually, or programmatically through the [Application API](https://docs.internetofthings.ibmcloud.com/index.html).

#### Manual device creation

New devices need to be set up on the platform to get the appropriate API keys, and be able to send/receive data from Bluemix. On the Devices dashboard select "Browse" on the page header, and continue with "Add Device". There select the previously added device type, add any attributes you'd like (for later filtering between devices), finally chose whether you'd like to provide your own access token, or use the one auto-generated by the platform.

![Create new device](/img/integrations/bluemix/Bluemix_new_device.png)

Note down these five pieces of information from the final page during device creation ("organization", "device type", "device name", "authentication method", and "authentication token"), this is the information needed to connect the device to the Bluemix platform.

Repeat this device creation for each of the physical devices you would like to connect with, and note their respective credentials.

#### Automatic device creation

Watson IoT Applications are capable of registering devices to the platform, for example using the [HTTP REST API](https://docs.internetofthings.ibmcloud.com/swagger/v0002.html#!/Devices/post_device_types_typeId_devices) or the [Python API](https://docs.internetofthings.ibmcloud.com/applications/libraries/python.html#/device-operations#device-operations). When an application registers a Watson IoT device, it receives the auth token, which can be passed on to the corresponding physical devices to use that to communicate with Bluemix.

One way for devices to auto-register themselves is dividing the code running on the device into two parts: one is a Watson IoT Application, which handles the registration process, while the other part is a Watson IoT Device, which carries out the device's operation (sending and receiving data). This setup generally allows very scalable device deployment scenarios.

For more information about creating applications (and application API keys) see the next section.

### Creating Applications

Applications are code running on your own infrastructure (your laptop, or your own datacenter) with access to the same set of data on Bluemix than the devices created in the preceding steps. They can connect to Bluemix using API keys generated in the same dashboard.

Select "Access" from the left sidebar, then "API Keys" in the top menu, and choose "Generate API Key":

![API Key dashboard](/img/integrations/bluemix/Bluemix_application.png)

The platform will provide you with a pair of "API Key" and "Authentication Token", that you need to note down. You can also add a meaningful comment to make it easier to recall what the key is used for.

![Generated API key](/img/integrations/bluemix/Bluemix_app_api_key.png)

## Configuring {{ $names.company.upper }}

Go to your [{{ $names.company.lower }} dashboard]({{ $links.dashboardUrl }}/) and create a new application with the physical device type you are using.

The next step depends on whether you are doing manual or automatic device creation on Bluemix.

### Manual device setup

In the application dashboard define five [application-wide environment variables](/management/env-vars/#application-wide) to hold the credential values from for the devices for easy access in your code. For clarity you can choose:

* `BLUEMIX_ORG`: Watson IoT organization ID
* `BLUEMIX_DEVICE_TYPE`: name of device type
* `BLUEMIX_DEVICE_ID`: name of the particular device
* `BLUEMIX_AUTH_METHOD`: this usually has the value `token`
* `BLUEMIX_DEVICE_TOKEN`: auth token for the particular device

though can use any other value you like. Here `BLUEMIX_ORG`, `BLUEMIX_DEVICE_TYPE`, and `BLUEMIX_AUTH_METHOD` will likely be the same for all devices within a {{ $names.company.lower }} application, so set them to the correct values. `BLUEMIX_DEVICE_ID` and `BLUEMIX_DEVICE_TOKEN` will be different for all devices, so set them application-wide to `REDEFINE` or something similar to remind you to redefine them in the [device-level environment variables](/management/env-vars/#per-device)!

![Application Environment Variables](/img/integrations/bluemix/Bluemix_resin_env1.png)

Set up your device and connect to {{ $names.company.lower }}. Then in the device's dashboard, redefine the environment variables (the Device ID and Auth Token). If you have multiple devices, repeat these steps for all.

![Device Environment Variables](/img/integrations/bluemix/Bluemix_resin_env2.png)

After this, the credentials for the devices to talk to IBM Bluemix will be available from within your application code as environment variables!

### Automatic device setup

If using automatic device setup, you must have created a set of application API key & token. To make all the required information and credentials available to your code, you can use [application-wide environment variables](/management/env-vars/#application-wide). For clarity you can choose:

* `BLUEMIX_ORG`: Watson IoT organization ID
* `BLUEMIX_DEVICE_TYPE`: name of device type
* `BLUEMIX_API_KEY`: an application API key
* `BLUEMIX_API_TOKEN`: an application auth token

Your code then can interact with Bluemix to set up new devices as it fits your use case.

One common use case is setting up a device on Bluemix with the same device ID (name) as on {{ $names.company.lower }}. For this, at the moment you need to use the {{ $names.company.lower }} SDK ([Python](/tools/python-sdk/), [Node.js](/tools/sdk/)) to get the device's name. You can also use the SDK to create the relevant `BLUEMIX_DEVICE_ID` and `BLUEMIX_DEVICE_TOKEN` environment variables, if you device code uses them for authenticating to Bluemix (for example reusing code that can either manually or automatically register to Bluemix).

To use the {{ $names.company.lower }} SDK from a device, at the moment you have to pass your {{ $names.company.lower }} API key (found in the Dashboard / Preferences section) to the device, for example through environment variables.

For example projects implementing automatic device setup, see the [sample apps](#sample-apps) section below.

## Programming

Programming the IBM Bluemix Watson IoT platform has an [extensive documentation](https://docs.internetofthings.ibmcloud.com/index.html), detailing both device and application development. They provide HTTP, MQTT, Python, Node.js, Java, C#, Embedded C, mBed C++ documentation for devices and HTTP, MQTT, Python, Node.js, Java, and C# for applications. There are [Python](https://github.com/ibm-watson-iot/iot-python), [Node.js](https://github.com/ibm-watson-iot/iot-nodejs), [Java](https://github.com/ibm-watson-iot/iot-java), and [C#](https://github.com/ibm-watson-iot/iot-csharp) and other SDKs available on [GitHub](https://github.com/ibm-watson-iot/).

For devices on {{ $names.company.lower }}, the most commonly used languages are Python and Node.js, so will showcase some information for these languages below.

### Python

#### Using the Python SDK

For a complete Python example which includes a device and a command line application to interact with the device, you can check [bluemix-balena-python]({{ $links.githubProjects }}/bluemix-balena-python)).

The following are a few notes using the [Python SDK](https://github.com/ibm-watson-iot/iot-python) with {{ $names.company.lower }} devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the {{ $names.company.lower }} default Python images, for example:

```Dockerfile
FROM {{ $names.base_images.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-python
```

Add the `ibmiotf` dependency in your `requirements.txt` file, either using the latest published version, or pulling the library directly from GitHub.:

```
# uncomment next line to use last published version
ibmiotf
# uncomment next line to use latest development version instead
# -e git://github.com/ibm-watson-iot/iot-python.git#egg=ibmiotf
```

Later in your `Dockerfile.template` you can then install these dependencies as:

```Dockerfile
COPY requirements.txt ./
RUN pip install -r ./requirements.txt
```

Then in your application you can access the environmental variables through `os.getenv(VARIABLE)`, and send messages through the SDK. A very simple example is as follows:

```python
import ibmiotf.device

# Authenticate
try:
    options = {"org": os.getenv("BLUEMIX_ORG"),
               "type": os.getenv("BLUEMIX_DEVICE_TYPE"),
               "id": os.getenv("BLUEMIX_DEVICE_ID"),
               "auth-method": os.getenv("BLUEMIX_AUTH_METHOD"),
               "auth-token": os.getenv("BLUEMIX_AUTH_TOKEN")
              }
    client = ibmiotf.device.Client(options)
except ibmiotf.ConnectionException:
    raise

client.connect()
readings = { "temperature": 25.4 }
client.publishEvent("status", "json", readings)
client.disconnect()
```

If your device needs to receive commands, it can be set up as follows:

```python
import ibmiotf.device

# Authenticate
try:
    options = {"org": os.getenv("BLUEMIX_ORG"),
               "type": os.getenv("BLUEMIX_DEVICE_TYPE"),
               "id": os.getenv("BLUEMIX_DEVICE_ID"),
               "auth-method": os.getenv("BLUEMIX_AUTH_METHOD"),
               "auth-token": os.getenv("BLUEMIX_AUTH_TOKEN")
              }
    client = ibmiotf.device.Client(options)
except ibmiotf.ConnectionException:
    raise

def command_callback(cmd):
    """Handle incoming commands from Bluemix
    """
    print("Command received: %s" % cmd.command)
    if cmd.command == "myCommand":
        if 'variable' not in cmd.data:
            print("Error - command is missing required information: 'variable'")
        else:
            # handle action, for example:
            print("Variable = {}".format(cmd.data["variable"]))
    else:
        print("Error - unknown command")

# Handle incoming commands
client.commandCallback = command_callback
client.connect()
```

Applications can then be used to subscribe to data sent from devices (through [subscribeToDeviceEvents](https://docs.internetofthings.ibmcloud.com/applications/libraries/python.html#/subscribing-to-device-events#subscribing-to-device-events)), and send commands to devices (with [publishCommand](https://docs.internetofthings.ibmcloud.com/applications/libraries/python.html#/publishing-commands-to-devices#publishing-commands-to-devices)).

For further examples, you can check the [samples included in the Python SDK](https://github.com/ibm-watson-iot/iot-python/tree/master/samples).

### Node.js

#### Using the Node.js SDK

Here are a few notes using the [Node.js SDK](https://github.com/ibm-watson-iot/iot-nodejs) with {{ $names.company.lower }} devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the {{ $names.company.lower }} default Node.js images, for example:

```Dockerfile
FROM {{ $names.base_images.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-node:latest
```

Add the `ibmiotf` dependency in your `package.json` in your application's folder:

```bash
npm install ibmiotf --save
```

Later in your `Dockerfile.template` you can then configure the node modules installation as:

```Dockerfile
COPY package.json ./
RUN JOBS=MAX npm i --unsafe-perm --production && npm cache clean
```

Then in your application you can access the environmental variables through `process.env.VARIABLE`, and send messages through the SDK. A very simple example, which connects to Bluemix and sends a reading value is:

```javascript
var Client = require("ibmiotf");
var config = {
    "org" : process.env.BLUEMIX_ORG,
    "id" : process.env.BLUEMIX_DEVICE_ID,
    "domain": "internetofthings.ibmcloud.com",
    "type" : process.env.BLUEMIX_DEVICE_TYPE,
    "auth-method" : process.env.BLUEMIX_AUTH_METHOD,
    "auth-token" : process.env.BLUEMIX_AUTH_TOKEN
};

var deviceClient = new Client.IotfDevice(config);

deviceClient.connect();

deviceClient.on("connect", function () {
    //publishing event using the default quality of service
    deviceClient.publish("status","json",'{"d" : { "Temperature" : 25.4 }}');
});
```

For detailed description, check the [Node.js SDK's README](https://github.com/ibm-watson-iot/iot-nodejs/blob/master/README.md) or the [samples included in the SDK](https://github.com/ibm-watson-iot/iot-nodejs/tree/master/samples).

## Further information

### Shortcuts:

* [New Bluemix Console](https://new-console.ng.bluemix.net/)
* [New Bluemix Documentation](https://new-console.ng.bluemix.net/docs/)
* [Create a new Internet of Things Project](https://new-console.ng.bluemix.net/catalog/services/internet-of-things-platform/)
* [IBM Watson IoT Platform Documentation](https://new-console.ng.bluemix.net/docs/services/IoT/index.html)
* [IBM Watson IoT Application / Device / Gateway Development Documentation](https://docs.internetofthings.ibmcloud.com/)
* [IBM Watson IoT on Github](https://github.com/ibm-watson-iot): source code of SDKs and relevant projects
* [IBM Developerworks Recipes](https://developer.ibm.com/recipes/), [Internet of Things category](https://developer.ibm.com/recipes/tutorials/category/internet-of-things-iot/)

### Sample Apps

A few sample apps to get started:

* [bluemix-balena-python demo project]({{ $links.githubProjects }}/bluemix-balena-python): automatic or manual device registration, send data and receive actions
* [Bluemix boilerplate](https://github.com/hobochild/resin-bluemix-boilerplate): automatically register your device and publish data to your Bluemix app
