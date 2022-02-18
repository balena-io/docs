# Google Cloud IoT integration with balena

While the [balena](https://www.balena.io/what-is-balena) platform allows you to build, deploy, and manage fleets of devices, it has no interaction with the fleet's application at the data layer. This is where Google's IoT Core offering can be utilized.

[Google IoT Core](https://cloud.google.com/iot/docs/) is a service designed to ingest data from connected devices and build rich applications that integrate with the other big data services of Google Cloud Platform. For more information visit [this](https://cloud.google.com/solutions/iot/) link.

We can harness the synergy between both technology stacks to create a compelling end-to-end solution that includes everything a fleet owner might need (from infrastructure to big data needs).

This project shows you how to integrate your devices, running balenaOS with Google IoT Core easily.

![diagram](https://github.com/balenalabs/google-iot/blob/master/img/diagram.png?raw=true)

## Installation

We've split the installation instructions into 4 different steps:

1. Create and configure the Google Cloud Platform (GCP) project
2. Create balenaCloud application
3. Provision your device
4. Configure environment variables

### 1. Create and configure the Google Cloud Platform (GCP) project

#### Before you begin

Before you begin, you will need to create a GCP account and a billing account. The following links will help you get started with that:

- [Create a Google account](https://support.google.com/accounts/answer/27441?hl=en)
- [Create your billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account)

Note that you *don't* need a credit card to get started if you opt for the free trial.

#### GCP setup script

The process of setting up the required GCP products is a bit involved. For your convenience, we created a script that automates all of the steps needed. You can review the source code of this script [here](https://github.com/balenalabs/google-iot/blob/master/scripts/gcp-setup.sh). If you are not comfortable running the script, you can check out [this](https://github.com/balenalabs/google-iot/blob/master/GCPManualSetup.md) step by step guide. The script will walk you through manually configuring everything that is required.

These are all the steps that the script performs for you:

- Request user login to GCP account
- Select an existing project or create a new one
- Link project to a billing account
- Enable required API's: `compute`, `pubsub` and `cloudiotcore`
- Select project region
- Create PubSub telemetry and state topics
- Create a PubSub subscription for testing
- Create IAM service account
- Add roles and create keys for the service account

The script is meant to be run only *once* on your development machine or any non-edge, non-cloud device. It will interactively guide you through all the steps required.

Before running the script, make sure you have Google's SDK command-line tool installed by running `gcloud --version` on your terminal (if you need to, [here](https://cloud.google.com/sdk/install) is how to install `gcloud`)

To run the script, download or clone the project from [here](https://github.com/balenalabs/google-iot), and from the root of the project directory run:

```bash
# If you have npm installed
npm run gcp-setup

# If you don't have npm
./scripts/gcp-setup.sh
```

When the script execution has completed, note down the value of the following variables: `GOOGLE_IOT_PROJECT`, `GOOGLE_IOT_REGION`, `GOOGLE_IOT_REGISTRY`, and  `GOOGLE_IOT_SERVICE_ACCOUNT_TOKEN` as we will need to add them as environment variables later.

The output of the script will look like this:

```bash
*** Export env variables ***
Setup completed, add the following env variables to your target:
GOOGLE_IOT_PROJECT=balena-gcp
GOOGLE_IOT_REGION=us-central1
GOOGLE_IOT_REGISTRY=balena-registry
GOOGLE_IOT_SERVICE_ACCOUNT_TOKEN=<YOUR_SERVICE_ACCOUNT_KEY_JSON_FORMATED>
```

### 2. Create balenaCloud application

If this is your first time using balena, we recommend going through the [getting started tutorial](https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/).

You'll need to:

- Sign up for or login to the [balenaCloud dashboard](https://dashboard.balena-cloud.com)
- Create an application, selecting the correct device type for your hardware device (Raspberry Pi, Intel NUC, etc.)
- Add a device to the application, enabling you to download the OS
- Flash the downloaded OS to your SD card with [balenaEtcher](https://balena.io/etcher)
- Power up the device and check it's online in the dashboard

### 3. Provision your device

You're now ready to provision your balena device and push your application's code. From the project's directory run:

```bash
balena push <appName>
```

Where `<appName>` is the name you gave your balenaCloud application in the previous step.

### 4. Configure environment variables

Once the app gets deployed to your device, you'll see errors on the logs, and possibly the `main` service will restart. This is because we have not configured the required application environment variables yet.

You need to create the following application environment variables and assign them the values you got from the script on step 1:

- `GOOGLE_IOT_PROJECT`
- `GOOGLE_IOT_REGION`
- `GOOGLE_IOT_REGISTRY`
- `GOOGLE_IOT_SERVICE_ACCOUNT_TOKEN`

To do so, you have two alternatives:

- Add them using the balenaCloud dashboard (more information [here](https://www.balena.io/docs/learn/manage/serv-vars/))
- Add them using the `balena-cli` by running `balena env add <ENV_VAR_NAME> <ENV_VAR_VALUE> --application <appName>`

Either way, once you add all environment variables, the `main` service will restart. Once it's started up again, it'll automatically register itself with Google Cloud IoT as a device, and start pushing telemetry data to the PubSub channel you've created.

## Verifying the data pipeline

Here is a quick way of verifying the data pipeline works both ways. If you are having trouble, you can reach us on our [forums](https://forums.balena.io/) or open an issue on this repository.

### Device to IoT Core

You can verify the telemetry data is going all the way to PubSub by tapping into the testing subscription that we created in step 1.

To do this:

- Visit the PubSub [subscriptions](https://console.cloud.google.com/cloudpubsub/subscription) page
- Click on your subscription, then `View Messages` and finally `PULL`

It might take a minute or so for the data to show up on the subscription.

### IoT Core to device

To verify that `config` messages sent by IoT Core are reaching the device, we can send a test message:

- Visit the [IoT Core](https://console.cloud.google.com/iot/registries) page
- Click on your registry, then go to devices and click on your device
- Click on the `UPDATE CONFIG` button and send a test message

You should see the message printed on your device's log.

## Next steps

This project provides an easy way of getting started with the balenaOS + IoT Core combo. For more complex applications, you can build your own using this sample app as the basis, or the Google samples for C, Java, NodeJS, and Python available [here](https://cloud.google.com/iot/docs/samples/mqtt-samples).

An overview of Google's cloud services that can be used to ingest, transform, and run analytics on the data is available [here](https://cloud.google.com/solutions/iot-overview).
