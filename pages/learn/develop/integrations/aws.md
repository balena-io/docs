---
title: AWS IoT integration
excerpt: Get started with the Amazon AWS IoT platform and {{ $names.company.lower }}
thumbnail: /img/integrations/aws/aws_iot_logo.png
---
![logo](/img/integrations/aws/aws_iot_logo.png)

The Amazon Web Services [AWS IoT](https://aws.amazon.com/iot) platform provides a suite of services to collect, manage, and analyze IoT data. Its [IoT Core](https://aws.amazon.com/iot-core) service provides the foundational registration and two-way communication for Internet-connected things like balena devices with the AWS cloud. This guide shows you how to automate secure and scalable deployment of balena devices to IoT Core.

![summary](/img/integrations/aws/iot-overview.png)

The integration includes two components: an AWS Lambda cloud function to validate device identity and provision the device to IoT Core, and a balena app to request the provisioning as well as send/receive data. The cloud function validates the device UUID to your fleet, generates an X.509 certificate and registers with the IoT Core service. The function then pushes the generated credentials to the device as environment variables, and the balena app uses the credentials to connect to IoT Core via MQTT and send some data.

# Getting Started

Sign up for an AWS account or log into your account at the [AWS Console](https://aws.amazon.com/). Once logged in, the [AWS IoT console](https://console.aws.amazon.com/iot/home) will show the IoT Things as you create them.

This guide automates per-device integration with AWS IoT. However, you also must complete some one-time configuration on your AWS account, which we describe as needed below. These tasks may be accomplished either in the web interface or through the [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/). You also can review the [AWS Documentation](https://aws.amazon.com/documentation/) for specifics and [IoT Tutorials](https://docs.aws.amazon.com/iot/latest/developerguide/iot-tutorials.html) for more background.

## Create Lambda cloud function

See the [balena-aws-lambda](https://github.com/balena-io-examples/balena-aws-lambda) project, which creates the AWS Lambda function. The project README describes how to set it up and how it works.

You'll need to add some permission policies to your AWS Identity and Access Management (IAM) configuration, which are detailed in the project setup instructions. You'll also create an Amazon API Gateway HTTP endpoint so a device can call the Lambda function.

## Load and run example app

See the [balena-aws-device](https://github.com/balena-io-examples/balena-aws-lambda) example app, which calls the Lambda function to provision the device with AWS IoT and then sends data securely over MQTT. The project README describes how to setup and load the app on a device.

The result is a self provisioned device sending data to AWS IoT. You then can reuse the example code in your own AWS IoT integration.
