---
title: AWS IoT integration
excerpt: Get started with the Amazon AWS IoT platform and {{ $names.company.lower }}
thumbnail: /img/integrations/aws/AWS_IoT_resources.png
---

# AWS IoT Integration

The Amazon Web Services Internet-of-Things (AWS IoT) service enables bi-directional communication between Internet-connected things, such as sensors, embedded devices, or appliances, and other services on the AWS cloud, such as cloud servers, databases, analytics and more. This document provides an overview how to use [AWS IoT](https://console.aws.amazon.com/iot/home) component with {{ $names.company.lower }} to deploy IoT devices on the AWS IoT platform.

## Configuring AWS IoT

Sign up for an AWS account or log into your account at the [AWS Console](https://aws.amazon.com/). Once logged in, navigate to the [AWS IoT console](https://console.aws.amazon.com/iot/home) from AWS services dashboard:

![AWS services dashboard](/img/integrations/aws/AWS_IoT.png)

For more details about the following steps, please check the [AWS Documentation](https://aws.amazon.com/documentation/), and in particular the [AWS IoT Documentation](https://aws.amazon.com/documentation/iot/). Most tasks are available both in the web interface and through the [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/).

### Creating Things

Physical devices that are sending and/or receiving data are called "things" on AWS IoT. They can connect to the platform using [certificates](http://docs.aws.amazon.com/iot/latest/developerguide/device-certs-create.html), and have to have [rules](http://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html) defined to give the device ability to communicate with AWS services. Optionally they are grouped with a [thing type](http://docs.aws.amazon.com/iot/latest/developerguide/thing-types.html) to make configuration of similar devices easier.

As a first experience with AWS IoT, you can try the [interactive tutorial](https://console.aws.amazon.com/iot/home#/tutorial).

AWS IoT is available in [selected regions](http://docs.aws.amazon.com/general/latest/gr/rande.html#iot_region), and all setup involves selecting your desired region.

#### Manual Thing Creation

Manual device creation involves setting up all relevant configuration either in the web console, or through the CLI. Select your thing type (optionally), and create a new thing for each of the physical devices you would like to use (that is for each of the boards you will be provisioning on {{ $names.company.lower }}).

![AWS IoT Resources](/img/integrations/aws/AWS_IoT_resources.png)

Create and activate certificates for each of the devices, attach each to the corresponding thing, and save the "private key" and "certificate" files: those will provide authentication for the physical devices when they try to connect to AWS IoT. The private key can only be downloaded in this step, if lost it needs to be regenerated.

Finally, add some policies to let the devices communicate with the AWS platform. The simplest policy allowing all actions on all available resources (such as things, policies, MQTT channels for communication, and so on):

![AWS IoT Simple Policy](/img/integrations/aws/AWS_IoT_policy_all_allowed.png)

After this steps, you'll have all information and setup required to connect a physical device to AWS IoT!

#### Automatic Thing Creation

All of AWS can be controlled over API calls, and AWS itself can be used to automate the creation of the things, certificates, policies, and other settings. Such automatic setups would tap into your {{ $names.company.lower }} resources, and when a new device is created, would automatically set up the required resources, and would notify the device of its credentials.

One such possible automatic setup example, [balena-aws-lambda]({{ $links.githubProjects }}/balena-aws-lambda) uses the [AWS Lambda](https://aws.amazon.com/documentation/lambda/) platform to run "serverless" AWS provisioning.

All automatic provisioning method would use the [AWS IoT API](http://docs.aws.amazon.com/iot/latest/apireference/Welcome.html).

## Configuring {{ $names.company.upper }}

Go to your [{{ $names.company.lower }} dashboard]({{ $links.dashboardUrl }}/) and create a new application with the physical device type you are using.

The next step depends on whether you are doing manual or automatic device creation on AWS IoT.

### Manual Device setup

If you are using manual device creation, then you must have set up a corresponding thing and certificate for each {{ $names.company.lower }} device. In this case you will likely need a number of environment variables defined, some [application-wide environment variable](/management/env-vars/#application-wide) if the setting applies for all devices (such as AWS region), and some [per-device](/management/env-vars/#per-device) (such as authentication credentials). The environment variables will be available from the code running on your device to correctly connect to AWS IoT.

The environment variables can not contain new-line characters (they can only be a single line), while the AWS IoT private key and certificates do use information in multiple lines. Some possible tricks are [base64 encoding](https://en.wikipedia.org/wiki/Base64) the credentials before adding them as an environment variable and decoding it within your application software.

### Automatic Device setup

Automatic device setup would involve the newly provisioned {{ $names.company.lower }} device notifying your AWS IoT setup service (from the earlier steps), which in turns sets up the credentials, and for example sets them up as environment variables for the device. An example of this automatic setup, working with the "balena-aws-lambda" above, is [balena-aws-device]({{ $links.githubProjects }}/balena-aws-device). The automatic setup procedure generally depends on your device software and the service you use for AWS provisioning.

## Programming

Data communication to and from AWS IoT is done over a number of [protocols](http://docs.aws.amazon.com/iot/latest/developerguide/protocols.html), the main ones being MQTT, HTTP REST API, and MQTT Over the WebSocket Protocol. See more information regarding these in the documentation. An important information is the list of connection endpoints and parameters for the specific [IoT regions](http://docs.aws.amazon.com/general/latest/gr/rande.html#iot_region).

Communication with AWS IoT usually involves authenticating with the AWS service, which might require the AWS IoT Root Certificate, available from [here](https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem), and also included in other certificate stores, such as [certifi](https://pypi.python.org/pypi/certifi) for Python.

### Using Python

The [boto3](https://pypi.python.org/pypi/boto3/) package is a Python SDK for AWS services, and it is capable of both working with the [AWS IoT resources](https://boto3.readthedocs.io/en/latest/reference/services/iot.html) and the data communication on the [IoT Data Plane](https://boto3.readthedocs.io/en/latest/reference/services/iot-data.html). Thus it can be used to implement both the provisioning and the device side of the application.

For easy communication between the devices and AWS IoT an MQTT library is recommended, such as [paho-mqtt](https://pypi.python.org/pypi/paho-mqtt).

Here are a few notes using Python with {{ $names.company.lower }} devices. Starting from a [Dockerfile templates](/deployment/docker-templates/), build on the {{ $names.company.lower }} default Python images, for example:

```Dockerfile
FROM {{ $names.base.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-python
```

Add the relevant dependencies to your `requirements.txt` file, for example

```
paho-mqtt
certifi
```

Later in your `Dockerfile.template` you can then install it as:

```
COPY requirements.txt ./
RUN pip install -r ./requirements.txt
```

Then in your application, you can access the environmental variables through `os.getenv(VARIABLE)`, and send messages through the MQTT library. A very simple example is shown below:

```Python
import base64
import json
import os
import ssl

import certifi
import paho.mqtt.client as paho

# Set up AWS variables
awshost = os.getenv("AWS_HOST", "data.iot.us-east-1.amazonaws.com")
awsport = os.getenv("AWS_PORT", 8883)
thing_name = os.getenv("UUID")

def on_connect(client, userdata, flags, rc):
    """Send data once when connected connection
    """
    print("Connection returned result: " + str(rc) )
    value = 42
    data = {"state": {"reported": {"reading": value}}}
    mqttc.publish("$aws/things/{}/shadow/update".format(thing_name), json.dumps(data), qos=1)
    print("msg sent: temperature " + "%.2f" % tempreading )

def set_cred(env_name, file_name):
    """Turn base64 encoded environmental variable into a certificate file
    """
    env = os.getenv(env_name)
    with open(file_name, "wb") as output_file:
        output_file.write(base64.b64decode(env))

# Set up key files
key_filename = "aws_private_key.key"
set_cred("AWS_PRIVATE_KEY", key_filename)
cert_filename = "aws_certificate.crt"
set_cred("AWS_CERTIFICATE", cert_filename)

mqttc = paho.Client()
mqttc.on_connect = on_connect

mqttc.tls_set(certifi.where(),
              certfile=cert_filename,
              keyfile=key_filename,
              cert_reqs=ssl.CERT_REQUIRED,
              tls_version=ssl.PROTOCOL_TLSv1_2,
              ciphers=None)

mqttc.connect(awshost, awsport, keepalive=60)
mqttc.loop_forever()
```

It sets up key files from the environment variables, as the MQTT library used requires those credentials to be available as files. Those files are set normally set up on the volatile portion of the file system within the Docker container, thus they will not be kept upon restarting the application, making them more secure.

### Using Node.js

The [AWS Javascript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html) package is capable of both working with the [AWS IoT resources](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Iot.html) and the data communication on the [IoT Data Plane](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html). Thus it can be used to implement both the provisioning and the device side of the application. However for security reasons it isn't encouraged to use the [AWS Javascript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html) on devices in the field, it is better instead to just use the [AWS IoT device SDK](https://github.com/aws/aws-iot-device-sdk-js) doesn't have resource management capabilities. Therefore for this example, we have split the code into two parts. `{{ $names.company.lower }}-aws-lambda` is responsible the resource provisioning and `{{ $names.company.lower }}-aws-device` only handles data communication.

For a complete Node.js example, please see the pair of [balena-aws-lambda]({{ $links.githubProjects }}/balena-aws-lambda) and [balena-aws-device]({{ $links.githubProjects }}/balena-aws-device) repositories!

Here are a few notes using the [AWS IoT device SDK](https://github.com/aws/aws-iot-device-sdk-js) with {{ $names.company.lower }} devices. Using [Dockerfile templates](/deployment/docker-templates/), start from the {{ $names.company.lower }} default Node.js images, for example:

```Dockerfile
FROM {{ $names.base.lib }}/%%{{ $names.company.allCaps }}_MACHINE_NAME%%-node:latest
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
* [Python and Paho for MQTT with AWS IoT project on Hackster.io](https://www.hackster.io/mariocannistra/python-and-paho-for-mqtt-with-aws-iot-921e41) and [its repository](https://github.com/mariocannistra/python-paho-mqtt-for-aws-iot)
