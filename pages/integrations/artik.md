---
title: Samsung ARTIK Cloud integration
excerpt: Getting started with ARTIK, ARTIK Cloud and resin.io
thumbnail: /img/integrations/artik/ARTIKCloud_new_device.png
---

# Samsung ARTIK Cloud integration

__NOTE:__  This page is work in progress!

The [Samsung ARTIK Cloud](https://artik.cloud/) is an open data exchange platform for the Internet of Things (IoT). It uses APIs for devices and services to interact with each other, to send, receive, and analyze data. This tutorial shows how to use ARTIK Cloud with devices deployed on resin.io.

As a simple illustration use case, an example device is used which reads local ambient temperatures, and send the readings to the ARTIK Cloud for logging and analysis.

## Configuring Artik Cloud

You need to create a Samsung account to [sign up](https://artik.cloud/account/signup) for the ARTIK Cloud. If you already have an account you can [log in](https://artik.cloud/account/login) to the portal.

ARTIK Cloud has two main dashboard. The [developers dashboard](https://developer.artik.cloud/dashboard) provides an interface to create and manage device types and applications. [My ARTIK Cloud](https://artik.cloud/my) allows manage devices, data, and automated actions.

### Device type creation

The first step is creating a new device type, which specifies  what kind of data can be sent send and what actions can be taken by actual devices deployed under this type. For example if a networked air conditioning system might send temperature measurements to the platform, and can turn a cooler unit on/off, this information would be set up as a device type, and all units of the system would be deployed on ARTIK Cloud following this device type.

To create your first device type, on the developer dashboard navigate to device types, and [create new device](https://developer.artik.cloud/dashboard/devicetypes/new), as it is shown on the following screenshot:

![New ARTIK Cloud device type](/img/integrations/artik/ARTIKCloud_new_devicetype.png)

Set a suitable _display name_, and a _unique name_ for the device type. In my example the display name is "My Resin Device", and the unique name is `my.resin.v1`. Unique names can, but do not have to follow the patter of reversed Internet domain name format, for example `io.resin.aircon`.

After the new device type is created, you have to declare the its capabilities through a manifest file. A manifest file is a specially formatted JSON file (see the [documentation](https://developer.artik.cloud/documentation/introduction/the-manifest.html)), which can be either manually created, or you can use the online manifest creator from the device type's dashboard:

![Device type manifest](/img/integrations/artik/ARTIKCloud_manifest.png)

Here you can list what data fields the should be accepted. This can be any kind of data: numbers, boolean values, strings, arrays of values. There are a number of other settings you can define for any data field, such as default units, description, use tags for later easy filtering of data groups, or can define field groups.

In this example above, a single data field is set, `Temperature`, with `Double` data type, default units if `℃`, a desciption, and some tags. If instead of using the online editor, you would want to upload a manifest file, the following is the equivalent setting:

```json
{
  "fields": [
    {
      "name": "Temperature",
      "type": "CUSTOM",
      "valueClass": "Double",
      "isCollection": false,
      "description": "Ambient temperature measurement",
      "tags": [
        "environment",
        "temperature"
      ],
      "unitSymbol": "℃"
    }
  ],
  "messageFormat": "json"
}
```

I've got this file by explorting the manifest from the device type dashboard, once it is set up. This way you can save and use version control on your manifest files as well.

The next step would be adding any actions that the device can take, but that is out of scope for this simple getting started tutorial and won't add any actions. For more advanced setup, you can consult the [device manifest documentation]([documentation](https://developer.artik.cloud/documentation/introduction/the-manifest.html)).

Once data fields and actions are set up, save and activate the manifest. Your new device type is ready to use:

![Device type set up](/img/integrations/artik/ARTIKCloud_devicetype_done.png)

There are advanced options available on that dashboard to manage the device type, for example setting the visibility of the device type, whether or not others on the ARTIK Cloud may discover and use it, updating the manifest, and checking error logs.

### Device creation

Next, need to create a new device with the above device type. This is done on the [My ARTIK Cloud dashboard](https://www.artik.cloud/my). When prompted to connect your first device, in the device type field you will be able to find the name, in this example "My Resin Device". You can use any convenient name for your device itself.

![New device](/img/integrations/artik/ARTIKCloud_new_device.png)

Once you save the settings, the dashboard will list the new device. Select the cog icon on device's tab, to bring up its settings:

![Device token](/img/integrations/artik/ARTIKCloud_device_token.png)

One important information to note is the Device ID, needed to authenticate with the actual device to the platform. The second piece of information required is the Device Token, generated on the same tab. Device Tokens can be revoked from the same tab if required.

If you are planning to connect multiple physical devices to this application, you'll need to repeat these device creation steps for each of them.

## Configuring Resin.io

Go to your [resin.io dashboard](https://dashboard.resin.io) and create a new application with the physical device type you are using (for example a Samsung ARTIK board, or any other). In the tutorial's example a BeagleBone Green Wifi is used (with a temperature sensor module).

In the application dashboard define two application-wide environmental variables for the Device ID and Device Token values. For clarity you can choose `ARTIKCLOUD_DEVICE_ID` `ARTIKCLOUD_DEVICE_TOKEN`, though can use any other value you like. In the application-wise setting just use a placeholder value, such as `REDEFINE`.

![Environment variables](/img/integrations/artik/ARTIKCloud_environment.png)

Set up your device and connect to resin. Then in the device's dashboard, redefine the environmenal variables (the Device ID and Device Token) saved from the previous step. If you have multiple devices, do these steps for all of them.

After this, the credentials for the devices to talk to ARTIK Cloud will be available from within your application code as environmental variables!

## Programming

There are multiple ways to connect to the ARTIK Cloud to send and receive data (see the [API reference](https://developer.artik.cloud/documentation/api-reference/)), and there are also a number of [native SDKs](https://developer.artik.cloud/documentation/tools/native-sdks.html) that you can speed things up with. For most applications in resin.io the [Python](https://github.com/artikcloud/artikcloud-python) or the [Javascript/Node.js](https://github.com/artikcloud/artikcloud-js) SDK are probably the most useful. The following section highlights some language-specific notes for using resin.io and ARTIK Cloud. For more detailed information see the rest of the docs, and be sure to check out the SDKs documentation.

### Python

Here are a few notes using the [Python SDK](https://github.com/artikcloud/artikcloud-python) with resin.io devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the resin default Python images, for example:

```
FROM resin/%%RESIN_MACHINE_NAME%%-python:2.7
```

Add the `artikcloud` dependency in your `requirements.txt` file:

```
# Uncomment to use latest released version
artikcloud
# Uncomment to use latest development version from GitHub
#-e git+https://github.com/artikcloud/artikcloud-python.git#egg=artikcloud
```

Later in your `Dockerfile.template` you can then install it as:

```
COPY requirements.txt ./
RUN pip install -r ./requirements.txt
```

Then in your application you can access the environmental variables through `os.getenv()`, and send messages through the SDK. A very simple example is as follows:

```python
import os
import time
import artikcloud

DEVICE_ID = os.getenv('ARTIKCLOUD_DEVICE_ID')
DEVICE_TOKEN = os.getenv('ARTIKCLOUD_DEVICE_TOKEN')

# Setting up ARTIK Cloud connection
api_client = artikcloud.ApiClient()
api_client.set_default_header(header_name="Authorization", header_value="Bearer {}".format(DEVICE_TOKEN))

# Setting up messaging
messages_api = artikcloud.MessagesApi(api_client)

# Send a new message
message = artikcloud.MessageAction()
message.type = "message"
message.sdid = "{}".format(DEVICE_ID)
message.ts = int(round(time.time() * 1000))  # timestamp, required
message.data = {'Temperature': 25.4}
response = messages_api.send_message_action(message)
print(response)
```

### Node.js

Here are a few notes using the [Javascript/Node.js SDK](https://github.com/artikcloud/artikcloud-js) with resin.io devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the resin default Node.js images, for example:

```
FROM resin/%%RESIN_MACHINE_NAME%%-node:latest
```

Add the `artikcloud-js` dependency in your `package.json` in your application's folder:

```
npm install artikcloud-js --save
```

Later in your `Dockerfile.template` you can then install it as:

```
COPY package.json ./
RUN JOBS=MAX npm i --unsafe-perm --production && npm cache clean
```

Then in your application you can access the environmental variables through `process.env.VARIABLE`, and send messages through the SDK. A very simple example is as follows:

__NOTE__: this code exmample is unfinished

```javascript
const device_token = process.env.ARTIKCLOUD_DEVICE_TOKEN || null; // Required
const device_id = process.env.ARTIKCLOUD_DEVICE_ID || null; // Required

var ArtikCloudApi = require('artikcloud-js');
var defaultClient = ArtikCloudApi.ApiClient.instance;

var artikcloud_oauth = defaultClient.authentications['artikcloud_oauth'];
artikcloud_oauth.accessToken = device_token;

// Messaging
```

## Further information

Once your code is deployed and data is sent succcessfully from your devices to the ARTIK Cloud, you can visualize [your data](https://artik.cloud/my/data):

![Data log](/img/integrations/artik/ARTIKCloud_temperature.png)

Once it is working, you can go to more advanced features, such as [setting rules](https://artik.cloud/my/rules) to act on the data received, or you [exporting](https://artik.cloud/my/exports) your data log.

If you have any questions, feel free to reach out to us at **hello@resin.io**, or chat with us on [Gitter](https://gitter.im/resin-io/chat)!

### Shortcuts:

* [Developers dashboard](https://developer.artik.cloud/dashboard)
* [My ARTIK Cloud](https://artik.cloud/my)

### Sample Apps

A few sample apps to get started:

* [Push events to the Artik cloud(sami)](https://github.com/resin-io-projects/resin-artik-cloud-publisher)
* [ARTIK Cloud documentation samples](https://developer.artik.cloud/documentation/samples/)

### Relevant Blogposts

Some relevant posts from our blog:

* [ARTIK & ARTIK Cloud tutorial](https://resin.io/blog/artikartikcloud/)
