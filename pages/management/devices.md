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

[rpi]:http://www.raspberrypi.org/
