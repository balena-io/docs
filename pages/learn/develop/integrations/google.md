---
title: Google IoT integration
excerpt: Get started with the Google IoT platform and {{ $names.company.lower }}
---

# Google Cloud IoT integration

The example project below shows you how to use Google Cloud IoT with resin.io to automatically create a Cloud IoT device on first boot. It also shows you how to run a sample to connect a device and publish device telemetry events.

Before you begin go and grab the example project code from github using the following command.
```bash
git clone https://github.com/resin-io-projects/google-iot
```

If you want to learn more about Google Cloud IoT and its capabilities checkout https://cloud.google.com/solutions/iot/ 

## Before you begin

1. In the GCP Console, go to the [Manage resources page](https://console.cloud.google.com/cloud-resource-manager) and select or create a new project.
2. Make sure that [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project) for your project.
3. [Enable the Cloud IoT Core and Cloud Pub/Sub APIs](https://console.cloud.google.com/flows/enableapi?apiid=cloudiot.googleapis.com,pubsub).


## Set up your local environment and install prerequisites
1. Install and initialize the [Cloud SDK](https://cloud.google.com/sdk/docs/). Cloud IoT Core requires version 173.0.0 or higher of the SDK.
2. Set up a [Node.js](https://cloud.google.com/nodejs/docs/setup) development environment.

## Create a device registry

1. Go to the [Google Cloud IoT Core page](https://console.cloud.google.com/iot) in GCP Console.
2. Click Create a registry.
3. Enter `my-registry` for the Registry ID.
4. Select `us-central1` for the Cloud region.
5. Select `MQTT` for the Protocol.
6. In the Telemetry topic dropdown list, select Create a topic.
7. In the Create a topic dialog, enter `my-device-events` in the Name field.
8. Click Create in the Create a topic dialog.
9. The Device state topic and Certificate value fields are optional, so leave them blank.
10. Click Create on the Cloud IoT Core page.

You've just created a device registry with a Cloud Pub/Sub topic for publishing device telemetry events.

## Create role and credentials

1. Go to the [GCP Roles page](https://console.cloud.google.com/iam-admin/roles)
2. Click Create role
3. Name it `Create IoT Device`
4. Click Add permission
5. Enter `cloudiot.devices.create` and save
6. Go to the [GCP Credentials page](https://console.cloud.google.com/apis/credentials)
7. Click Create Credentials and select `Service account key` from the drop down
8. Create a new service account, and assign _only_ the `Create IoT Device` role to it, this limited scope is required as these credentials will be available on the device, and could potentially get exposed if the device is physically compromised
9. Download the credentials json file

## Set up your resin application's environment
Go to the [resin dashboard](https://dashboard.resin.io/apps) and create or select your project

Click Environment Variables and create the following keys and matching values:
1. `GOOGLE_IOT_PROJECT` and enter the Project Id for your GCP Project, you can find that on the [GCP Home page](https://console.cloud.google.com/home)
2. `GOOGLE_IOT_REGION` and enter the GCP region you selected above (`us-central1`)
3. `GOOGLE_IOT_REGISTRY` and enter the device registry name you've selected above (`my-registry`)
4. `GOOGLE_IOT_SERVICE_JSON` and paste the entire content of the credentials json file you've downloaded above as value

## Provision your device

You're now ready to provision your resin.io device and push the code to the application. Once it's started up it'll automatically register it's self with Google Cloud IoT as a device, and allow you to push telemetry data to the pubsub channel you've created.

## Viewing published messages

Once the device is online, the sample app will start pushing event messages with the CPU load and memory usage for the
device, which will be visible in the logs viewer in the resin dashboard.

You can retrieve and view published messages from Pub/Sub using the gcloud CLI:
1. Go to the GCP Pub/Sub page and click on `my-device-events` topic.
2. Click `Create Subscription` in the top toolbar.
3. Enter `my-subscription` as the subscription name.
4. Click Create.

You can then view the messages by running the following command in your terminal, replacing PROJECT_ID with your project ID:

```
# gcloud pubsub subscriptions pull --limit 100 --auto-ack projects/PROJECT_ID/subscriptions/my-subscription
```

## Next steps

Build your own application using this sample app, or the Google samples for C, Java, NodeJS and Python available at https://cloud.google.com/iot/docs/samples/mqtt-samples

When building your app, or using one of the samples, use the private key available at `/data/rsa-priv.pem`, and `GOOGLE_IOT_REGION, GOOGLE_IOT_PROJECT and GOOGLE_IOT_REGISTRY`
environment variables to configure your client.

An overview of Google's cloud services that can be used to ingest, transform, and run analytics on the data is available at: https://cloud.google.com/solutions/iot-overview