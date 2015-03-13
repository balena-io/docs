# Managing Your Devices and Applications

## Devices

![Populated Devices](/img/screenshots/devices_populated.png)

### What are Resin.io Devices?

Devices represent your actual hardware and are exclusively owned by applications, inheriting their environment variables.

All code pushed to an application's git endpoint is automatically pushed to the devices it owns.

### Identifying Devices

Each device has a unique identifier, however you can assign a more meaningful name to each device, by either clicking on the name in its application dashboard to edit it or changing it in the device detail page.

#### Raspberry Pi

We have also added a means of visually identifying [Raspberry Pi][rpi]s - clicking on the lightbulb icon on a device's application dashboard or the 'Identify Device (Blinks LED)' button on its details page will cause its 'ACT' (activity) LED to blink so you can physically tell one device apart from another.

### Logging

An extremely useful feature of the devices detail page is the log window. This is automatically synchronised with the application running on this device, showing both its standard out and standard error output in real time. You can expand this log window to occupy the whole page if you need to view more log output at once.

## Preferences

![Preferences Top](/img/screenshots/preferences.png)

In the preferences page you can change your password and manage the SSH keys assigned to your account.

[rpi]:http://www.raspberrypi.org/

