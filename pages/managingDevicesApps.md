# Managing Your Devices and Applications

## Applications

![Empty Devices Screen Settings](/img/screenshots/devices_empty_settings.png)

### What is a Resin.io Application?

Resin.io *applications* store the code you want to run on a particular set of devices and are linked to the devices you want the code to run on.

In terms of hierarchy, users own applications which each own their own mutually exclusive set of devices - the applications literally represent an *application* of the devices they own, e.g. temperature monitoring or face recognition.

You should create an application whenever you want to program a set of devices to do something new. To do this you simply tap in a descriptive name in the [applications dashboard](http://alpha.resin.io/dashboard/apps) and hit create.

__Note__: Currently there are some restrictions on application names - they must be at least 4 characters long and can only contain letters and numbers. We hope to lift this limitation soon.

### Associating Devices with Applications

When you create an application an install image for your devices is automatically associated with it and available via the 'Download Zip File' button on each individual application dashboard.

When installed on your device an application's install image automatically associates that device with the application in question and has the device appear in its dashboard, no manual intervention required.

### Deploying Your Code to an Application

The key thing to know about any application from your perspective as a developer is its git endpoint - this is visible in the applications list on the [applications dashboard](http://alpha.resin.io/dashboard/apps) and also in the top-right hand corner of each individual application dashboard.

To configure a git repo to be able to push code to resin, you need to add a [git remote](http://gitref.org/remotes/) for resin. This is easier than it sounds - simply click the button to the right of the git endpoint to copy the git command you need to run to the clipboard and run it the folder where you git repo is located.

Alternatively, simply run `git remote add resin [git endpoint]`, and you're done. From then on in you can simply run `git push resin master` to push your master branch off to your application's devices.

For more details on deployment, check out our [deployment guide](http://docs.resin.io/#!/pages/deployment.md).

### Application Settings

![Empty Devices Dangerous Settings](/img/screenshots/devices_empty_settings_dangerous.png)

Hidden behind the 'Dangerous' section is the option to delete applications - note this is an *insanely* destructive action - all devices attached to the application will become 'orphaned' and will require re-downloads of new applications' install images and a brand new set up, not to mention of course you lose the application and all the data associated with it.

### Environment Variables

Applications can be customised through setting environment variables - this is available hidden behind the cog graphic at the bottom of each application's dashboard. Simply enter environment variable key/value pairs which can in turn be interpreted by your software to provide an additional level of customisation. We plan to provide device-specific environment variables configuration soon.

__Note:__ Changing an environment variable will, for the time being, result in your application restarting. This is *usually* desirable behaviour as this is often the only means of having code 'pick up' the fact that variables have changed.

### System Environment Variables

__Note:__ Environment variables that are set by the system are prefixed with `RESIN_` and are not available for user definition.

* `RESIN_UUID` - The value of this variable is the current device's unique identifier.

## Devices

![Populated Devices](/img/screenshots/devices_populated.png)

### What are Resin.io Devices?

Devices are Resin.io's representation of the actual hardware that is running the code you are pushing to its application. Devices are exclusively owned by applications and inherit their environment variables.

All code pushed to an application's git endpoint is automatically pushed onto
the devices it owns.

### Associating Devices with Applications

To associate a device with an application, simply download the install image contained in the application's zip file, unzip it onto a fat32 formatted SD card, connect an ethernet cable to your Raspberry Pi and plug in your SD card and power connector and the device will set itself up, pull the application's code and execute it, before appearing in the application dashboard.

### Identifying Devices

Each device is assigned a unique identifier, the short form of which is displayed on its application's dashboard, the long form displayed in its device details page.

In addition to this unique identifier you can assign a meaningful name to each device, both from its application dashboard by clicking on its default name 'new' and replacing it there or changing it in the device's detail page.

We have also added a means of visually identifying Raspberry Pis - clicking on the lightbulb icon on a device's application dashboard or the 'Identify Device (Blinks LED)' button on its details page causes its 'ACT' (activity) LED to blink.

### Logging

An extremely useful feature of the devices detail page is the log window. This is automatically synchronised with the application running on this device, showing both its standard out and standard error output in real time. The output even displays ANSI colour codes :)

## Preferences

![Preferences Top](/img/screenshots/prefs_top.png)

In the preferences page you can change your password and view your current
public SSH key.

For the time being you can't change anything other than password here, however
we will add the ability to change other fields soon!
