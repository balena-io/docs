---
dynamic:
  variables: [ $cloud ]
  ref: $original_ref/$cloud
  $switch_text: $cloud message queue integration with cloud block
---

# {{ $cloud.name }} message queue integration with cloud block

Cloud service providers like {{ $cloud.fullName }} offer valuable tools for collection and management of data, like message queues and data storage, but often setup and use of these services is specific to the cloud provider. At balena our mission is to reduce friction for our fleet owners. So we provide a *cloud block* container, whose aim is to provide a simple, consistent interface to these services, configured by environment variables. Initially we support only the cloud provider's message queue service.

![cloud-block-app](/img/integrations/cloud-block/cloud-block-app.png)

The diagram above shows how the cloud block forwards data to a cloud messaging service. On the left is a balena device with three containers, where a data source publishes data to MQTT on some source topic to which the cloud block also subscribes. The cloud block then applies the user supplied configuration to forward the data to the provider's message queue service -- whether it's AWS SQS, Azure Event Hubs, or Google Pub/Sub.

The sections below show you how to implement this data flow.

 1. Define data source and cloud block services for balena device
 1. Create balena application and environment variables
 1. Push service definitions to balenaCloud and provision device

To illustrate how the cloud block works, we will use a data source that takes temperature readings from the device's CPU. These readings are readily available and do not require hardware or software setup. We will send these readings to {{ $cloud.name }} {{ $cloud.msgQueue.fullName }} as JSON data messages.

## Define device services

As shown in the architecture diagram above, our goal is to push data to a source topic on an MQTT broker on the balena device. We then wire the cloud block to subscribe to the source topic. See the [example application](https://github.com/kb2ma/cloudBlock-test/tree/main/cputemp) for the CPU temperature reader that does just that.

As shown in the [docker-compose.yml](https://github.com/kb2ma/cloudBlock-test/blob/main/cputemp/docker-compose.yml) for our example application, you must define three services, also shown in the table below.

| Service    | Notes                                                                                                                                                       |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data_source|Your service to generate data and publish to an MQTT topic                                                                                                   |
| mqtt       |Generic broker service, like [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto)                                                                   |
| cloud      |                                                                                         balena provided cloud block|

### Data source topic
For our example application, [data_source/main.py](https://github.com/kb2ma/cloudBlock-test/blob/main/cputemp/data_source/main.py) takes a temperature reading every 30 seconds, and publishes the reading to the *cpu_temp* MQTT topic. We must adapt the cloud block to subscribe to the *cpu_temp* topic used by the data source, as shown in the next section. By default the cloud block subscribes to the topic *cloud-input*.

## Create application
From your balenaCloud account, create a Microservices or Starter application as described in the balena Getting Started instructions. Next, you must define environment variables for the application that configure the cloud block, as described below.

### {{ $cloud.msgQueue.shortName }} variables

| Variable   | Notes                                              |
|------------|----------------------------------------------------|
{{#$cloud.msgQueue.envVars}}
   | {{{ name }}}              | {{{ notes }}}                              |
{{/$cloud.msgQueue.envVars}}

{{ $cloud.msgQueue.setupNotes }}

__Note:__ Alternatively you may define these values in a cloud based secret store as described in the cloud block [Reference](/learn/develop/integrations/cloud-block-reference/{{$cloud.id}}/#configuration-via-secret-store).

### Cloud block variables
These variables configure the cloud block on the balena device.

| Variable              | Notes                                                                                                                                             |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
|MQTT_INPUT_TOPIC|MQTT topic to which the cloud block subscribes for messages from the data source. Identified as `<source-topic>` in the architecture diagram above. Defaults to 'cloud-input'. |
|DAPR_DEBUG      |Define as 1 to write debug messages to the *cloud* service log                                                                                                   |

## Push service definitions to balenaCloud and provision device
Once you have defined the application, you may push the service definitions created above to balenaCloud with the `balena push <app-name>` CLI command. See the balena Getting Started instructions for details.

Finally, provision a device with the application you created! When the application runs, you should see data being pushed to the cloud like below when the `DAPR_DEBUG` environment variable is defined.

![cputemp-log](/img/integrations/cloud-block/cputemp-log.png)
