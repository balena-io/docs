---
title: AWS IoT integration
excerpt: Get started with the Amazon AWS IoT platform and {{ $names.company.lower }}
thumbnail: /img/integrations/aws/AWS_IoT_resources.png
---

# AWS IoT Integration

![balena aws iot](/img/integrations/aws/aws_iot_logo.png)

The Amazon Web Services Internet-of-Things (AWS IoT) service enables bi-directional communication between Internet-connected things, such as sensors, embedded devices, or appliances, and other services on the AWS cloud, such as cloud servers, databases, analytics and more. This document provides an overview how to use [AWS IoT](https://console.aws.amazon.com/iot/home) component with {{ $names.company.lower }} to deploy IoT devices on the AWS IoT platform.

## Configuring AWS IoT

Sign up for an AWS account or log into your account at the [AWS Console](https://aws.amazon.com/). Once logged in, navigate to the [AWS IoT console](https://console.aws.amazon.com/iot/home) from AWS services dashboard.

For more details about the following steps, please check the [AWS Documentation](https://aws.amazon.com/documentation/), and in particular the [AWS IoT Documentation](https://aws.amazon.com/documentation/iot/). Most tasks are available both in the web interface and through the [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/).

### Create a thing

Physical devices that are sending and/or receiving data are called "things" on AWS IoT. They can connect to the platform using [certificates](http://docs.aws.amazon.com/iot/latest/developerguide/device-certs-create.html), and have to have [rules](http://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html) defined to give the device ability to communicate with AWS services. Optionally they are grouped with a [thing type](http://docs.aws.amazon.com/iot/latest/developerguide/thing-types.html) to make configuration of similar devices easier.

From the AWS IoT Core page, go to **Manage -> Things**. Then on the page, go ahead and register a thing, then on the next page select Create a single thing.

![create thing](/img/integrations/aws/01_aws_iot_manage.png)

![create thing](/img/integrations/aws/02_create_a_thing.png)

For this example project, we will create a thing called `balena_project`. All you need to do is to insert the name and click Next.

![generate certs](/img/integrations/aws/03_generate_certs.gif)

Each `device` or `thing`, must have its own certificates that will be used to authenticate with AWS IoT, so let’s use the One-click certificate creation option.

![generate certs](/img/integrations/aws/04_create_cert.png)

In order to authenticate with the service, you will first need to download all four certificates from the dashboard to your computer (make sure you also download the `root CA` for AWS IoT).

![download certs](/img/integrations/aws/05_download_cert.png)

### Create a policy

Now it’s time to create some policies to allow our devices to communicate with the platform. Go back to the **IoT Core**, open **Secure -> Policies** and click on **Create a policy**.

![create policy](/img/integrations/aws/06_create_policy.png)

For this project create a policy called `balena_control_policy`, and add the statement as shown below:

| Action       | iot:* |
|--------------|-------|
| Resource ARN | *     |
| Effect       | Allow |

![create policy](/img/integrations/aws/07_add_policy.png)

Go to **Secure -> Certificates*. Select the recently created certificate and attach both the thing and policy to it.

The policy previously created enables all devices (things) to connect to our AWS IoT broker, but for security reasons, when you add the **thing* to the certificate, it guarantees that only those with matching security keys will be able to connect to the server.

![create policy](/img/integrations/aws/08_attach_certs.gif)

The last step in configuring the AWS IoT is to get the endpoint URL to connect to the service. Simply go to **AWS IoT** and click on **Settings**. There you will find the endpoint. Save it as we will need it later on.

![endpoint](/img/integrations/aws/092_get_endpoint.png)

At this point everything is ready on the AWS side, so let’s go ahead and configure our device to communicate with it using balenaCloud.

## Flashing the Raspberry Pi and deploying code

### Step 1 - Set up the balenaCloud application

If you don’t have one already, [sign up for a balenaCloud account](https://dashboard.balena-cloud.com/signup). The first thing we need to do is to create a new application, for that click on **Create application**, give it a name and select a device type (on this example we will create a project called aws-iot to run on a Raspberry Pi 3).

With the application created, click on **Add device** and select the latest recommended balenaOS version, choose the network connection you desire, setup its credentials and download the balenaOS to your computer.

![add device](/img/integrations/aws/11_create_application.gif)

### Step 2 - Flash your device

Use [balenaEtcher](https://www.balena.io/etcher/) to flash your Raspberry Pi with the downloaded OS image from the previous section. Insert the SD card into your computer, select the balenaOS image file, select the SD Card and click Flash!

![etcher](/img/integrations/aws/12_etcher.png)

After flashing is done, insert the SD card into your device and turn it on. After a few seconds, it should connect to the internet and show up on the balenaCloud dashboard.

![etcher](/img/integrations/aws/13_device.png)

### Step 3 - Push the app code

Once your device is showing up on the dashboard, it is time to push the code to balenaCloud, after which it will automatically distribute it to all of the devices in your application. For that, we will download the source code from GitHub and push the project to the device using the [balena CLI tools](https://github.com/balena-io/balena-cli). I’ve summarised the process for this below, but if you need more information we have a [detailed deployment guide](https://www.balena.io/docs/learn/deploy/deployment/) available in our docs.

First of all, download the app from [the GitHub project repository]({{ $links.githubPlayground }}/balena-aws-iot-mqtt-example), and clone or download it to your computer.

![github](/img/integrations/aws/14_github.png)


Then, after [installing the balena CLI tools on your computer](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md), from the project directory, execute `balena push <appName>` where `<appName>` is the name of the application you created within the balenaCloud dashboard earlier. For this example project, we will use then `balena push aws-iot`.

If all went well you’ll see the balena unicorn mascot and the code you’ve just pushed will automatically be distributed to the devices in your application.

![balena push](/img/integrations/aws/15_balena_push.gif)

With your hardware provisioned and the code deployed, it’s time to configure the device so it can connect to the Amazon servers.

### Converting the certificates to base64

When configuring your device to communicate with AWS IoT, each device must contain its own certificates. The issue with the certificate files is that you can’t and shouldn’t add them to the project directory as it would create a security issue for the whole project. Instead, we will deploy all the devices with the same source-code and configure individual certificates from the balenaCloud dashboard, making use of **environment variables**.

The method we will apply is to convert the cert files we previously downloaded into base64 strings and paste them into our device’s variables.

You can generate the base64 encoded files from the terminal with: `openssl base64 -in <in file> -out <out file>`

For this project, you will need to convert the root CA `root-CA.crt`, the thing certificate `xxx.cert.pem` and the private key `xxx.private.key`. Then you will paste the content of the files into our balenaDash environment variables as described in the next session.

### Add Environment Variables

To add the environment variables for the device, on the device dashboard page, go to **D(x) Device Variables** and add the following variables with the values from the conversion in the previous step.

| ENV VAR          | Value                            |
|------------------|----------------------------------|
| AWS_ENDPOINT     | data.iot.us-west-2.amazonaws.com |
| AWS_PRIVATE_CERT | Base64 string of xxx.cert.pem    |
| AWS_ROOT_CERT    | Base64 string of root-CA.crt     |
| AWS_THING_CERT   | Base64 string of xxx.private.key |

You should now have something similar to:

![end vars](/img/integrations/aws/16_env_vars.png)

### Using Node.js

The previous part of the documentation describes how to create a sample project with Python. In case you want to create a Node.js application, the [AWS Javascript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html) package is capable of both working with the [AWS IoT resources](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Iot.html) and the data communication on the [IoT Data Plane](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html). Thus it can be used to implement both the provisioning and the device side of the application. However for security reasons it isn't encouraged to use the [AWS Javascript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html) on devices in the field, it is better instead to just use the [AWS IoT device SDK](https://github.com/aws/aws-iot-device-sdk-js) doesn't have resource management capabilities. Therefore for this example, we have split the code into two parts. `{{ $names.company.lower }}-aws-lambda` is responsible the resource provisioning and `{{ $names.company.lower }}-aws-device` only handles data communication.

For a complete Node.js example, please see the pair of [balena-aws-lambda]({{ $links.githubProjects }}/balena-aws-lambda) and [balena-aws-device]({{ $links.githubProjects }}/balena-aws-device) repositories!

Here are a few notes using the [AWS IoT device SDK](https://github.com/aws/aws-iot-device-sdk-js) with {{ $names.company.lower }} devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the {{ $names.company.lower }} default Node.js images, for example:

```Dockerfile
FROM {{ $names.base_images.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-node:latest
```

Add the `aws-iot-device-sdk` dependency in your `package.json` in your application's folder:

```bash
npm install --save aws-iot-device-sdk
```

Later in your `Dockerfile.template` you can then configure the node modules installation as:

```Dockerfile
COPY package.json ./
RUN JOBS=MAX npm i --unsafe-perm --production && npm cache clean
```

Then in your application you can access the environmental variables through `process.env.VARIABLE`, and send messages through the SDK. A simple example is shown below (where new-lines in the relevant environment variables were escaped base64 encoded strings):

```Javascript
var awsIot = require('aws-iot-device-sdk');
var Chance = require('chance'); // used to randomise bool values
var chance = new Chance();

var device = awsIot.device({
privateKey: new Buffer(process.env.AWS_PRIVATE_KEY, 'base64'),
clientCert: new Buffer(process.env.AWS_CERT, 'base64'),
    caCert: new Buffer(process.env.AWS_ROOT_CA, 'base64'),
  clientId: process.env.{{ $names.company.allCaps }}_DEVICE_UUID,
    region: process.env.AWS_REGION
});

device.on('connect', function() {
  console.log('connect');
  device.subscribe('sensor');
  // publish data
  setInterval(function () {
    var reading = chance.floating({min: 0, max: 200});
        device.publish('sensor', JSON.stringify({ reading: reading }));
  }, process.env.INTERVAL || 3000);
});

device.on('message', function(topic, payload) {
  console.log('message', topic, payload.toString());
});
```

### General

You can create base64 encoded strings from key files to be use with environment variables for example in Python as:

```Python
import base64

filename = "KEYFILE"
with open(filename, "rb") as key_file:
    key = key_file.read()
    encoded_key = base64.b64encode(key)
    print(encoded_key.decode("ascii") )
```

or in Linux as:

```Bash
cat KEYFILE | base64 -w 0
```

where you need to replace `KEYFILE` with the relevant filename (such as `xxxxxxxxxx-certificate.pem.crt` or `xxxxxxxxxx-private.pem.key`).

## Further information

### Shortcuts:

* [AWS IoT console](https://console.aws.amazon.com/iot/home)
* [AWS IoT Documentation](https://aws.amazon.com/documentation/iot/)
* [AWS IoT API Reference](http://docs.aws.amazon.com/iot/latest/apireference/Welcome.html)
* [AWS SDK reference](https://aws.amazon.com/tools/#sdk), list of SDKs in all supported languages
* [AWS IoT MQTT Client](https://console.aws.amazon.com/iot/home#/mqtt), useful for debugging AWS IoT communication

### Sample Apps

A few sample apps to get started:

* [balena-aws-lambda]({{ $links.githubProjects }}/balena-aws-lambda) and [balena-aws-device]({{ $links.githubProjects }}/balena-aws-device)
* [balenaCloud AWS IoT MQTT Broker Example]({{ $links.githubPlayground }}/balena-aws-iot-mqtt-example) with full blog post for example:
