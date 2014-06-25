# Managing Your Devices and Applications

## Managing Your Devices

![Populated Devices](/img/screenshots/devices_populated.png)

Once configured, your device shows up on the dashboard and is linked to the
application you downloaded the zip file from.

The image above shows a device that has been given a meaningful name - each
device starts out called `new`, to change this simply click on the name and
edit it to something more appropriate.

From here you can also blink the LED on devices labelled `ACT` in order to
identify them. To do this, click the lightbulb icon to the right of the device
entry.

Clicking elsewhere on the device takes you to the detailed device page:-

## Device Page

![Devices Top](/img/screenshots/device_top.png)

This page shows you various details of your device and lets you rename the
device or blink its 'ACT' LED as you can on the application page.

An important additional feature here is the logs window - it shows any and all
logs output by the application running on your device as well as events such as
the application starting. This is a very useful means of monitoring and
debugging your code.

## Dangerous Device Settings

![Device Dangerous Settings](/img/screenshots/device_dangerous.png)

Here you can choose to delete your device which removes it entirely from the
Resin.io network - note this will mean you'll have to go through the
[install procedure][getting-started] all over again, so be sure you want to do
this!

## Application Settings

![Empty Devices Screen Settings](/img/screenshots/devices_empty_settings.png)

All the application's settings are hidden behind the cogwheel located at the
bottom of the page - click it to gain access.

Here you can set [environment variables][envvars] for the devices attached to
the application. We are working on allowing you to set device-specific
environment variables too :)

Click on 'Dangerous' to gain access to settings which you wouldn't want to
accidentally click on:-

![Empty Devices Dangerous Settings](/img/screenshots/devices_empty_settings_dangerous.png)

For now the only such operation is deleting the application. Doing this will
orphan the devices connected to the application (meaning you will have to wipe
their SD cards and go through the [install procedure][getting-started] again),
and cause you to lose access to the code you pushed to our servers, so be
certain you want to do this before clicking!

## Preferences

![Preferences Top](/img/screenshots/prefs_top.png)

In the preferences page you can change your password and view your current
public SSH key.

For the time being you can't change anything other than password here, however
we will add the ability to change other fields soon :)

[envvars]:http://en.wikipedia.org/wiki/Environment_variables
[getting-started]:/pages/gettingStarted.md
