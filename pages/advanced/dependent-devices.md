# Getting Started with Dependent Devices

In this guide we will walk through getting started with a new feature on resin.io, dependent devices!

To enable this functionality we will use the [edge-node-manager][edge-node-manager-link] gateway application, designed to bridge the gap between Resin OS capable single board computers (e.g. the Raspberry Pi) and non Resin OS capable devices (e.g. micro-controllers).

The [edge-node-manager][edge-node-manager-link] has been designed to make it as easy as possible to add support for new dependent device types and to run alongside your user application. Along the way you will learn the basics of resin.io and deploy a simple `Hello World!` application to a [micro:bit][micro-bit-link].

## What You Will Need

* A Raspberry Pi 3.
* At least one micro:bit.
* A method of flashing a new Operating system on to the Raspberry Pi 3.
* A way of connecting the Raspberry Pi 3 to the internet, either through ethernet or wifi.
* A method of reliably powering the Raspberry Pi 3 and the micro:bit.
* Docker installed on your local machine.
* A resin.io account.

## Getting Help

Before we get started building something cool, lets just point out some places to get help.
{{import "usingSupport"}}

To help us understand all the moving parts in resin.io dependent devices support, lets first define a few terms that will be used later in the guide.
* **Gateway Application:**
> The gateway application is responsible for detecting, provisioning and managing dependent devices belonging to one of its dependent applications. This is possible leveraging a new set of [endpoints](https://github.com/resin-io/resin-supervisor/blob/master/docs/dependent-apps.md) exposed by the Resin Supervisor. The [edge-node-manager][edge-node-manager-link] is an example of a gateway application.

* **Gateway Device:**
> The gateway device runs the gateway application and has the needed on-board radios to communicate with the managed dependent devices, for example: Bluetooth, WiFi, LoRa or ZigBee.

* **Dependent Application:**
> A dependent application is a Resin application that targets devices not capable of interacting directly with the Resin API and is scoped under the gateway application. A dependent application follows the same development cycle as a conventional Resin application with a few key differences: it does not support Dockerfile templating, the Dockerfile must target an x86 base image and the actual firmware must be stored in the /assets folder within the built docker image.

* **Dependent Device:**
> A dependent device is a device not capable of interacting directly with the Resin API - the reasons can be several, the most common are: no direct Internet capabilities and not able to run the Resin OS (being a microcontroller, for example)


## Let's Jump In

If you don't already have a resin.io account head over to our [signup page][link-to-signup], during the sign up process you will be asked to set up an SSH key so you can securely push code.
{{import "sshKey/add"}}

## Creating an Application
To create an application simply type in a name, select the Raspberry Pi 3 device type from the drop down list and click the create button. You should now be taken to the dashboard of your newly created application:

<img src="/img/dependent_devices_dashboard/select_fleet_type.jpg" width="80%">

This dashboard may not look like much right now, but this is where you will command and manage a whole fleet of [micro:bits][micro-bit-link].

## Enabling dependent device support
To enable dependent device support we need to set two fleet wide configuration variables, defining `RESIN_SUPERVISOR_DELTA` as `1` and `RESIN_UI_ENABLE_DEPENDENT_APPLICATIONS` as `1`

![Setting the fleet configuration to enable dependent device support](/img/dependent_devices_dashboard/EnableSupport.jpg)

## Adding Your First Device

{{import "getResinOS"}}

{{import "selectNetworkConfig"}}

### Create a Bootable {{ $device.bootMedia }}
{{import "flashingOsToBootMedia"}}

{{import "getDeviceOnDash"}}

## Deploying Gateway Application code

Now that we have a device provisioned to a resin.io application, lets deploy some code and actually start building something.

The [edge-node-manager][edge-node-manager-link] is our example gateway application which will manage the dependent devices with the following functionality:

* Dependent device detection
* Dependent device provisioning
* Dependent device over-the-air (OTA) updating
* Dependent device logging and information updating

All the project source code can be found [here on github][edge-node-manager-link].

To clone the project, run the following command in a terminal or your preferred git client:

```
$ git clone https://github.com/resin-io/edge-node-manager.git
```

Once the repo is cloned, change directory into the newly created `edge-node-manager` directory and add the resin git remote endpoint by running the command `git remote add` shown in the top-right corner of your application page, here's an example:

```
$ cd edge-node-manager
$ git remote add resin charlie1@git.resin.io:charlie1/myfleet.git
```
__Note:__ On other git clients there may be an alternative way to add a remote repository.

So now we have set up a reference in our local git repository (the one on our development computer) to the resin.io application remote repository. So when we push new changes to this remote repository it will get compiled and built on our servers and deployed to every device in the application fleet.

Now to deploy this code to all device(s) in the application just run the command:
```
$ git push resin master
```

If you want to completely replace the source code of the application with a new source tree, you may need to force the push by running `git push resin master --force`, due to how git works.

__Note:__ On your very first push, git may ask you if you would like to add this host to your list of allowed hosts. Don't worry about this, just type 'yes' and carry on your merry way.

You'll know your code has been successfully compiled and built when our
friendly unicorn mascot appears in your terminal:

<img src="/img/common/pushing/success_unicorn_simple_nodejs.png" width="80%">

This means your code is safely built and stored on our image registry. It should only take about 2 minutes to build your code and subsequent builds will be quicker because of build caching.

Your application will now be downloaded and executed by all the devices you have connected in your application fleet. You may have to wait about 6 minutes for the first push... So time for more tea, but don't worry, all subsequent pushes are much, much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the device code updates on the device dashboard:

<img src="/img/common/device/device_dashboard_during_update_generic.png" width="80%">

You should now have the [edge-node-manager](edge-node-manager-link) gateway application running on your device and see some logs on your dashboard.

## Creating a dependent application
To create a dependent application navigate to the Dependent Applications tab and simply type in a name, and click the create button. You should now be taken to the dashboard of your newly created dependent application:

<img src="/img/dependent_devices_dashboard/select_dependent_fleet_type.jpg" width="80%">

## Configuring the dependent application
To configure the dependent application we need to set two fleet wide configuration variables, defining `RESIN_SUPERVISOR_DELTA` as `1` and `RESIN_HOST_TYPE` as `microbit`

![Setting the dependent application configuration](/img/dependent_devices_dashboard/ConfigureDependentApplication.jpg)

## Adding your first dependent device

To add a dependent device we first need to flash the [micro:bit][micro-bit-link] with some initial firmware that makes it advertise the ID of dependent application it belongs to.

All the project source code can be found [here on github][micro-bit-link].

To clone the project, run the following command in a terminal or your preferred git client:

```
$ git clone https://github.com/resin-io-projects/micro-bit.git
```

Once the repo is cloned, change directory into the newly created `micro-bit` directory and add the resin git remote endpoint by running the command `git remote add` shown in the top-right corner of your dependent application page, here's an example:

```
$ cd micro-bit
$ git remote add resin charlie1@git.resin.io:charlie1/myfleet.git
```
__Note:__ On other git clients there may be an alternative way to add a remote repository.

So now we have set up a reference in our local git repository (the one on our development computer) to the resin.io dependent application remote repository. So when we push new changes to this remote repository it will get compiled and built on our servers and deployed to every device in the dependent application fleet.

Next we need to retrieve the dependent application ID from the resin.io dashboard, for example: If your dependent application URL is `https://dashboard.io/apps/13829/devices` the ID is `13829`. Open you favourite editor and change [line 3](https://github.com/resin-io-projects/micro-bit/blob/master/source/main.cpp#L3) in `source/main.cpp` `#define APP_ID 1234567890` to point to your dependent application ID e.g. `#define APP_ID 13829`.

Finally run the provisioning script using the example command below:

```
./provision.sh
```

This will compile the initial firmware inside a docker container which includes all the required tools and dependencies. Once the initial firmware has been compiled the docker container will output a `micro-bit-combined.hex` file in the `micro-bit` directory. Next, connect the micro:bit to your computer with a USB cable and copy the `micro-bit-combined.hex` file to the micro:bit, the orange light on the micro:bit will blink whilst the flashing process is ongoing and you will know once its finished because a "Hello World!" message will scroll across the micro:bit display.

Now that the initial firmware has been flashed the micro:bit will start advertising the ID of the dependent application it belongs to, allowing the [edge-node-manager](edge-node-manager-link) gateway application to discover and provision the micro:bit onto resin. You will know once this has happened because the micro:bit will appear in the dashboard under the dependent application.

## Deploying dependent device code

Now to deploy updated code to all dependent device(s) in the dependent application just run the command:
```
$ git push resin master
```

If you want to completely replace the source code of the application with a new source tree, you may need to force the push by running `git push resin master --force`, due to how git works.

__Note:__ On your very first push, git may ask you if you would like to add this host to your list of allowed hosts. Don't worry about this, just type 'yes' and carry on your merry way.

You'll know your code has been successfully compiled and built when our
friendly unicorn mascot appears in your terminal:

<img src="/img/common/pushing/success_unicorn_simple_nodejs.png" width="80%">

This means your code is safely built and stored on our image registry. It should only take about 2 minutes to build your code and subsequent builds will be quicker because of build caching.

Your dependent application will now be pushed over-the-air via Bluetooth to all the dependent devices you have connected in your dependent application fleet. You may have to wait about 6 minutes for the first push... So time for more tea, but don't worry, all subsequent pushes are much, much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the dependent device code updates on the dependent device dashboard:

<img src="/img/common/device/device_dashboard_during_update_generic.png" width="80%">

You should now have the dependent device code running on your micro:bit, see some logs on your dashboard and have a nice `Hello world!` message scrolling on the micro:bit display.

## Update locks and the API
The [edge-node-manager](edge-node-manager-link) gateway application holds the [update lock](https://docs.resin.io/management/devices/#update-locking) whilst interacting with the dependent devices, this prevents the user container from updating or being restarted mid way through an over-air-update. You don't need to worry about this as the update lock is released whenever the [edge-node-manager](edge-node-manager-link) gateway application is not interacting with the dependent devices.

A final point is that the [edge-node-manager](edge-node-manager-link) gateway application provides an API that allows the you to set the target status of the main process. This is useful to free up the on-board radios allowing user code to interact directly with the dependent devices e.g. to collect sensor data.

**Warning** - Do not try and interact with the on-board radios whilst the edge-node-manager is running (this leads to inconsistent, unexpected behaviour).

### SET /v1/enm/status
Set the edge-node-manager process status.

#### Example
```
curl -i -H "Content-Type: application/json" -X PUT --data '{"targetStatus":"Paused"}' localhost:1337/v1/enm/status
curl -i -H "Content-Type: application/json" -X PUT --data '{"targetStatus":"Running"}' localhost:1337/v1/enm/status
```

#### Response
```
HTTP/1.1 200 OK
```

### GET /v1/enm/status
Get the edge-node-manager process status.

#### Example
```
curl -i -X GET localhost:1337/v1/enm/status
```

#### Response
```
HTTP/1.1 200 OK
{
    "currentStatus":"Running",
    "targetStatus":"Paused",
}
```

**Enjoy Resinifying All the Things!**
<img src="/img/common/resinify.jpg" width="80%">

[link-to-signup]:https://dashboard.resin.io/signup
[edge-node-manager-link]:https://github.com/resin-io/edge-node-manager
[micro-bit-link]:http://www.microbit.org/
[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
