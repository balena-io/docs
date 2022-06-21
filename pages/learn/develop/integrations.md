---
title: Integrate with 3rd parties
excerpt: Guides to integrate {{ $names.company.lower }} with a variety of IoT platforms
---

# Integrate with 3rd parties

{{ $names.company.upper }} can be integrated with external 3rd party services such as IoT messaging or data analytics platforms. Below are some tools to help you get started.

### Tools

[Cloud IoT Provisioning](cloud-iot-provisioning/aws) -- A cloud function (lambda) to generate a public key identity for a balena device in a cloud's IoT registry. Stores the key in the registry and on the device. Works with AWS, Microsoft Azure, and Google Cloud.

<a href="https://github.com/balena-io-examples/cloud-relay#readme" target="_blank">Cloud Relay block</a> -- Triggers the provisioning tool above from a balena device to bootstrap identity, and then securely sends MQTT data to the cloud.

