---
dynamic:
  variables: [ $cloud ]
  ref: $original_ref/$cloud
  $switch_text: I want to provision a device with $cloud IoT
---

# Cloud IoT Provisioning with {{ $cloud.name }}

{{#is $cloud.shortName "GCP"}}
  __Note:__ Google has issued a [deprecation notice](https://cloud.google.com/iot/docs/release-notes#August_16_2022) for the Cloud IoT service due to shutdown in August 2023. Balena's provisioning support for GCP IoT Core will not receive further updates.
{{/is}}

The [{{ $cloud.name }} {{#is $cloud.shortName "GCP"}}(GCP){{/is}} IoT]({{ $cloud.platformUrl }}) platform provides a valuable suite of services to collect, store, and distribute IoT data and actions. Its [{{ $cloud.iotCoreName }}]({{ $cloud.iotCoreUrl }}) service is the portal for registration and messaging with Internet-connected things. We want to make it easy for balena devices to register and interact with {{ $cloud.iotCoreName }}.

Our IoT provisioning tools automate device registration to {{ $cloud.iotCoreName }}, and leverage balenaCloud and environment variables to store and access the registration credentials. This guide shows you how provisioning works and gets you started with the tools in the [{{ $cloud.provisionRepoName }}](https://github.com/balena-io-examples/{{ $cloud.provisionRepoName}}) repository.

## How It Works

![summary](/img/cloud-iot/iot-overview.png)

Provisioning includes three components:

* **Service Container** like [Cloud Relay block](https://github.com/balena-io-examples/cloud-relay) on a device to request the provisioning and use the credential environment variables from balenaCloud
* **{{ $cloud.cloudFunctionName }} {{#isnt $cloud.shortName "GCP"}}(cloud){{/isnt}} function** to securely validate device identity and register the device with {{ $cloud.iotCoreName }}, triggered by an HTTP request ([source code](https://github.com/balena-io-examples/{{$cloud.provisionRepoName}}/blob/master/index.js))
* **balenaCloud** to accept and store the generated key/certificate credentials for the device

The cloud function first validates the device UUID in the provision request with balenaCloud. Then it generates a {{ $cloud.credentialType }} and registers with the {{ $cloud.iotCoreName }} service. The function then provides the generated credentials to balenaCloud, which stores and pushes them to the device as environment variables for use by the service container.

In addition to registration, Cloud Relay block makes it easy to send data to {{ $cloud.name }}. It integrates with balena's block [ecosystem](https://hub.balena.io/blocks) for application development and messaging. So you only need to send your data to an MQTT container on the device, and the block handles all of the interaction with {{ $cloud.iotCoreName }}.

__Note:__ A service container like Cloud Relay on the device is not *required* to send the provisioning request. You may call the cloud function HTTP endpoint from your compute infrastructure to pre-generate the key/certificate for the cloud. However, the device must be registered already with balenaCloud.

## Getting Started

The tools described here automate *per-device* integration with {{ $cloud.name }}. However, first you must complete some initial one-time configuration on your {{ $cloud.shortName }} account. See the [{{$cloud.shortName}} setup](https://github.com/balena-io-examples/{{ $cloud.provisionRepoName }}/#{{lowercase $cloud.shortName}}-setup) section of the provisioning repo documentation for details.

## Create, Deploy, and Test {{ $cloud.cloudFunctionName }} function

The provisioning tools set up the {{ $cloud.cloudFunctionName }} function itself as well as a `provision` HTTP endpoint to request provisioning based on a device's UUID. The [workspace setup](https://github.com/balena-io-examples/{{ $cloud.provisionRepoName }}/#workspace-setup) section of the documentation walks you through creation of this {{ $cloud.cloudFunctionName }} function and HTTP endpoint, including:


* configuration of the tools for testing and deployment
* testing the function locally
* deployment to {{ $cloud.shortName }} and end-to-end testing

The result is a functioning HTTP endpoint on {{ $cloud.name }}, ready for provisioning requests.

## Try a Tutorial

We created a blog post [tutorial](https://www.balena.io/blog/introducing-cloud-relay-block-send-data-to-cloud-provider/) on device provisioning with AWS IoT and use of Cloud Relay block to send system metrics data. The tutorial also shows how to route data sent to IoT Core on to Cloudwatch for graphing.
