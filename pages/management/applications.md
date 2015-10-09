# Applications

### What is a Resin.io Application?

A Resin.io __application__ contains both the code you want to run and the devices you want to run that code on.

To create an application you simply tap in a descriptive name in the [applications dashboard](https://dashboard.resin.io/) and hit create.

<img src="/img/raspberrypi2/app_dashboard_fresh_device.png" class="shadow" width="80%">

Here we have an application named "myFleet" and currently it only has one device ("dawn-wildflower") provisioned.

### Associating Devices with Applications

When you create an application a special resin.io operating system is generated specifically for that application and its associated device type.

When you install this image onto your device it will automatically appear in your application dashboard, no manual intervention is required. You can copy this one download to multiple SD cards and resin.io will associate all these devices with their own unique ID and fancy name.

### Deploying Your Code to an Application

The key thing to know about any application from your perspective as a developer is it's git endpoint - this is visible in the applications list on the [applications dashboard](http://dashboar.resin.io) and also in the top-right hand corner of each individual application dashboard.

To configure a git repo to be able to push code to resin, you need to add a [git remote](http://gitref.org/remotes/) - simply click the button to the right of the git endpoint to copy the command to the clipboard and run it in the folder where your local git repo is located.

Alternatively, simply run `git remote add resin [git endpoint]`, and you're done. From then on in you can simply run `git push resin master` to push your master branch to your devices.

For more details on deployment, check out our [deployment guide](/pages/deployment/deployment.md).

### Deleting the application

Hidden behind the 'Dangerous' section is the option to delete your application.

__Warning:__ All devices attached to the application will become orphaned and you will need to reconfigure them from scratch in another application.

### Environment Variables

Applications can be customised via environment variables - simply enter environment variable key/value pairs.

__Warning:__ Changing an environment variable will, for the time being, result in your application restarting.

### System-Defined Environment Variables

__Note:__ Environment variables that are set by the system are prefixed with `RESIN_`; as a consequence you cannot define environment variables for an application with this prefix in their name.

* `RESIN_DEVICE_UUID` - The value of this variable is the current device's unique identifier.
