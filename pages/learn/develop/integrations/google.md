---
title: Google IoT integration
excerpt: Get started with the Google IoT platform and {{ $names.company.lower }}
---

# Google Cloud IoT integration

The example project below shows you how to use Google Cloud IoT with resin.io to automatically create a Cloud IoT device on first boot. It also shows you how to run a sample to connect a device and publish device telemetry events.

Before you begin, grab the example project code from GitHub using the following command.
```bash
git clone https://github.com/resin-io-projects/google-iot
```

If you want to learn more about Google Cloud IoT check out https://cloud.google.com/solutions/iot/ 

## IoT Core Setup on the GCP Side
	
### Google Cloud Platform Account
Before you set up IoT Core, you'll need a Google account to log into the Google Cloud Platform. Once an account is created successfully, you will be able to run the gcloud commands below.

### Install the ​Google Cloud Command Line Tool
Follow the instructions [here](https://cloud.google.com/sdk/downloads) to the install google command line tool. After the google command line tool is installed, run the commands below: 

### Installing the components
```
gcloud components install beta
```

### Authenticate with Google Cloud
```
gcloud auth login
```

### Create cloud project - choose your unique project name
```
gcloud projects create ​ YOUR_PROJECT_NAME
```

### Set default values for gcloud
```
gcloud config set project ​ YOUR_PROJECT_NAME
```

### Create PubSub topic for device data
```
gcloud beta pubsub topics create ​ <iot-topic>
```

### Create PubSub subscription for device data
```
gcloud beta pubsub subscriptions create --topic ​ <iot-topic>​ ​ <iot-subscription>
```

### Create device registry
```
gcloud beta iot registries create ​<iot-registry>​ --region us-central1 --event-pubsub-topic=​<iot-topic>
```

### Create Service Account
1. Navigate to the IAM & admin page in the GCP Console and make sure your project is selected.
2. Open the [**Service Accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) page.
3. Click **Create Service Account.**
4. Enter a service account name and service account ID
5. Select the Pub/Sub project role
6. Click **Save.**

## Set up your resin application's environment
Go to the [resin dashboard](https://dashboard.resin.io/apps) and create or select your project

Click Environment Variables and create the following keys and matching values:
1. `GOOGLE_IOT_PROJECT` and enter the Project Id for your GCP Project, you can find that on the [GCP Home page](https://console.cloud.google.com/home)
2. `GOOGLE_IOT_REGION` and enter the GCP region you selected above (`us-central1`)
3. `GOOGLE_IOT_REGISTRY` and enter the device registry name you've selected above (`my-registry`)
4. `GOOGLE_IOT_SERVICE_JSON` and paste the entire content of the credentials json file you've downloaded above as value

## Provision your device

You're now ready to provision your resin.io device and push the code to the application. Once it boots, it will automatically register itself with Google Cloud IoT as a device, and allow you to push telemetry data to the pubsub channel you've created.

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
