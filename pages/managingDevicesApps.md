# Managing Your Devices and Applications

## Applications

![Applications Page](/img/screenshots/applications_empty.png)

### What is a Resin.io Application?

A Resin.io __application__ contains both the code you want to run and the devices you want to run that code on.

To create an application you simply tap in a descriptive name in the [applications dashboard](http://alpha.resin.io/dashboard/apps) and hit create.

__Note__: Currently there are some restrictions on application names - they must be at least 4 characters long and can only contain letters and numbers. We hope to lift this limitation soon.

### Associating Devices with Applications

When you create an application an install zip is generated specifically for that application.

When you install this image onto your device it will automatically appear in your application dashboard, no manual intervention is required. You can copy this one download to multiple SD cards and resin.io will associate all these devices with their own unique ID and fancy name. 

### Deploying Your Code to an Application

The key thing to know about any application from your perspective as a developer is its git endpoint - this is visible in the applications list on the [applications dashboard](http://alpha.resin.io/dashboard/apps) and also in the top-right hand corner of each individual application dashboard.

To configure a git repo to be able to push code to resin, you need to add a [git remote](http://gitref.org/remotes/) - simply click the button to the right of the git endpoint to copy the command to the clipboard and run it in the folder where your local git repo is located.

Alternatively, simply run `git remote add resin [git endpoint]`, and you're done. From then on in you can simply run `git push resin master` to push your master branch to your devices.

For more details on deployment, check out our [deployment guide](http://docs.resin.io/#!/pages/deployment.md).

### Application Settings

![Application Settings](/img/screenshots/application_settings.png)

### Deleting the application

Hidden behind the 'Dangerous' section is the option to delete your application.

__Warning:__ All devices attached to the application will become orphaned and you will need to reconfigure them from scratch in another application.

### Environment Variables

Applications can be customised via environment variables - simply enter environment variable key/value pairs.

__Warning:__ Changing an environment variable will, for the time being, result in your application restarting.

### System-Defined Environment Variables

__Note:__ Environment variables that are set by the system are prefixed with `RESIN_`; as a consequence you cannot define environment variables for an application with this prefix in their name.

* `RESIN_DEVICE_UUID` - The value of this variable is the current device's unique identifier.

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
