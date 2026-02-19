# Cloud IoT Provisioning

The [ClearBlade-GCP IoT](https://www.clearblade.com/iot-core/) platform provides a valuable suite of services to collect, store, and distribute IoT data and actions. Its [IoT Core](https://iot.clearblade.com/iot-core) service is the portal for registration and messaging with Internet-connected things. We want to make it easy for balena devices to register and interact with IoT Core.

Our IoT provisioning tools automate device registration to ClearBlade IoT Core, and leverage balenaCloud and environment variables to store and access the registration credentials. This guide shows you how provisioning works and gets you started with the tools in the [cb-gcp-iot-provision](https://github.com/balena-io-examples/cb-gcp-iot-provision) repository.

 As its name suggests,  is a hybrid platform.  provides the IoT Core service, while Google Cloud (GCP) provides the underlying host platform for other services like the cloud function described below. 

## How It Works

Provisioning includes three components:

* **Service Container** like [Cloud Relay block](https://github.com/balena-io-examples/cloud-relay) on a device to request the provisioning and use the credential environment variables from balenaCloud
* **Cloud  function** to securely validate device identity and register the device with IoT Core, triggered by an HTTP request ([source code](https://github.com/balena-io-examples/%7B%7B$cloud.provisionRepoName%7D%7D/blob/master/index.js))
* **balenaCloud** to accept and store the generated key/certificate credentials for the device

The cloud function first validates the device UUID in the provision request with balenaCloud. Then it generates a public key pair and registers with the IoT Core service. The function then provides the generated credentials to balenaCloud, which stores and pushes them to the device as environment variables for use by the service container.

In addition to registration, Cloud Relay block makes it easy to send data to ClearBlade-GCP. It integrates with balena's block [ecosystem](https://hub.balena.io/blocks) for application development and messaging. So you only need to send your data to an MQTT container on the device, and the block handles all of the interaction with IoT Core.

**Note:** A service container like Cloud Relay on the device is not _required_ to send the provisioning request. You may call the cloud function HTTP endpoint from your compute infrastructure to pre-generate the key/certificate for the cloud. However, the device must be registered already with balenaCloud.

## Getting Started

The tools described here automate _per-device_ integration with ClearBlade-GCP. However, first you must complete some initial one-time configuration on your ClearBlade account. See the [ClearBlade setup](https://github.com/balena-io-examples/cb-gcp-iot-provision/#setup-and-testing) section of the provisioning repo documentation for details.

## Create, Deploy, and Test Cloud function

The provisioning tools set up the Cloud function itself as well as a `provision` HTTP endpoint to request provisioning based on a device's UUID. The [workspace setup](https://github.com/balena-io-examples/cb-gcp-iot-provision/#workspace-setup) section of the documentation walks you through creation of this Cloud function and HTTP endpoint, including:

* configuration of the tools for testing and deployment
* testing the function locally
* deployment to GCP and end-to-end testing

The result is a functioning HTTP endpoint on GCP, ready for provisioning requests.

## Try a Tutorial

We created a blog post [tutorial](https://www.balena.io/blog/introducing-cloud-relay-block-send-data-to-cloud-provider/) on device provisioning with AWS IoT and use of Cloud Relay block to send system metrics data. The tutorial also shows how to route data sent to IoT Core on to Cloudwatch for graphing.
