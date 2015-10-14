# Managing Your Devices and Applications

## Devices

### What are Resin.io Devices?

Devices represent your actual hardware and are exclusively owned by applications, inheriting their environment variables.

All code pushed to an application's git endpoint is automatically pushed to the devices it owns.

<img src="/img/raspberrypi2/newly_provisioned_device_dash.png" class="shadow" width="80%">

### Identifying Devices

Each device has a unique identifier or `UUID`, however you can assign a more meaningful name to each device, by either clicking on the name in its application dashboard to edit it or changing it in the device detail page.

#### Blink to Identify

We have also added a means of visually identifying devices that have an onboard LED. Clicking on the lightbulb icon on a device's application dashboard or the 'Identify Device (Blinks LED)' button on its details page will cause the onboard LED to blink so you can physically tell one device apart from the others.

### Logging

An extremely useful feature of the devices detail page is the log window. This is automatically synchronised with the application running on this device, showing both it's standard out and standard error output in real time. You can expand this log window to occupy the whole page if you need to view more log output at once.

<img src="/img/common/device/device_dashboard_empty_logs.png" class="shadow" width="80%">

## Device Actions

On the device's Actions page we give you access to a number of useful per-device actions.

* [Enable Public URL](/pages/management/devices.md#enable-public-device-url)
* [Restart Device Container](/pages/management/devices.md#restart-device-container)
* [Move to Another Application](/pages/management/devices.md#move-to-another-application)
* [Purge Data](/pages/management/devices.md#purge-data)
* [Delete Device](/pages/management/devices.md#delete-device)

### Enable Public Device URL

Resin.io currently exposes **port 80** for web forwarding. To enable web forwarding on a specific device, select the `Enable a public url for this device` checkbox. Resin will then generate a web accessible url for the device. The URL will be of the form `<RESIN_DEVICE_UUID>.resindevice.io`, where `<RESIN_DEVICE_UUID.` is the unique ID of the device which you can see on your dashboard.

<img src="/img/screenshots/device-url-new.png" class="shadow" width="80%">

To see what your device is serving on port 80, just click on the URL. If your application is not serving anything on port 80 or your webserver on the device crashes, you should see something like this:

<img src="/img/common/device/device_url_404.png" class="shadow" width="80%">

### Restart Device Container

### Move to Another Application

## Dangerous Device Actions

### Purge Data

### Delete Device


[rpi]:http://www.raspberrypi.org/
