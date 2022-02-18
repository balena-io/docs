# Azure IoT Hub integration with balena

Azure IoT Hub is a managed service that acts as a central message hub for bi-directional communication between your IoT application and the devices it manages. You can read more about it [here](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub). To integrate IoT Hub with the [balena platform](https://www.balena.io/what-is-balena/), follow the steps below.

## 1. Create and configure an Azure IoT Hub

### Before you begin

Before you begin, you will need to create an Azure account. You can set up a free trial or pay as you go account [here](https://azure.microsoft.com/en-us/free/).

There are many options for setting up an Azure IoT Hub, especially when it comes to device provisioning, which can get quite complex. In this example, we will use a simple auto-generated key to authorize our device.

* Create an IoT Hub using the Azure portal by following [these instructions](https://docs.microsoft.com/en-us/azure/iot-dps/quick-setup-auto-provision). For this example, you do not need to create a Device Provisioning Service.
* In your Azure Portal IoT hub navigation menu, open "IoT Devices", then select "New" to add a device in your IoT hub. (Select "Symmetric key" and check "Auto-generate keys")
* After the device is created, open the device in the Azure Portal from the list in the IoT devices pane. Copy the Primary Connection String for use in a subsequent step below.

## 2. Create a balenaCloud application

If this is your first time using balena, we recommend going through the [getting started tutorial](https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/).

You'll need to:

* Sign up for, or log in to the [balenaCloud dashboard](https://dashboard.balena-cloud.com)
* Create an application, selecting the correct device type for your hardware device (In this example it can be any Raspberry Pi)
* Add a device to the application, enabling you to download the OS
* Flash the downloaded OS to your SD card with [balenaEtcher](https://www.balena.io/etcher/)
* Power up the device and check it's online in the dashboard

## 3. Provision your device

Clone [the Azure IoT Hub integration repository](https://github.com/balena-io-playground/balena-azure-iot-hub) to use as your application code. Also, ensure you have installed the [balena CLI](https://github.com/balena-io/balena-cli).

You're now ready to provision your balena device and push your application's code. From the project's directory run:

```shell
balena push <appName>
```

Where <appName> is the name you gave your balenaCloud application in the previous step.

## 4. Configure environment variables

Once the app gets deployed to your device, you'll see errors in the logs, and possibly the main service will restart. This is because we have not configured the required application environment variables yet.

You need to create the following application environment variable and assign it the value you got from the Azure Portal in step 1: `AZ_CONN_STR`

To do so, you have two alternatives:

* Add it using the balenaCloud dashboard (more information [here](https://www.balena.io/docs/learn/manage/serv-vars/))
* Add it using the `balena-cli` by running `balena env add <ENV_VAR_NAME> <ENV_VAR_VALUE> --application <appName>`

Either way, once you add the environment variable, the main service will restart. Once it's started up again, it will start pushing telemetry data to the Azure IoT Hub you created.

### Hardware Note

This example is designed to run on a Raspberry Pi with an I2C BME680 sensor connected. If no sensor is present on your device, set the balena environment variable `AZ_USE_RANDOM` to `true` to send random data instead.

### Verifying the data

To read back the data in real-time from the hub see: https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-python#read-the-telemetry-from-your-hub
