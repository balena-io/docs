---
title: Get started on developing with {{ $device.name }} and {{ $language.name }}

layout: getting-started.html

dynamic:
  variables: [ $device, $language ]
  ref: $original_ref/$device/$language
  $switch_text: I want to get started with a $device using $language
---

# {{ title }}

In this guide we'll cover:

- Setting up your **{{ $device.name }}** device and bringing it online on the {{ $names.cloud.lower }} dashboard
- Deploying a **{{ $language.name }}** hello-world project on the device
- Developing the sample project: making changes and testing them on the device in real-time

Once you've completed this guide you'll be equipped with the fundamentals needed to continue developing your application using {{ $names.cloud.lower }} and be on the path to deploying fleets of devices to production.

## What you'll need

{{import "getting-started/whatYouNeed"}}

## Create a fleet 

If you don't already have a {{ $names.company.lower }} account, make sure to [sign up][link-to-signup] before continuing.

A fleet is a group of devices that share the same [architecture][architecture] and run the same code. Devices are added to fleets and can be moved between fleets at any time.

To create your first fleet, log into your [{{ $names.cloud.lower }} dashboard][dashboard] and click the **Create fleet** button.

<img alt="Create a fleet" src="/img/common/create-first-fleet.png" width="100%">

Enter a fleet name, select the **{{ $device.name }}** device type, choose the *Starter* [fleet type][fleet-types], and click **Create new fleet**:

<img src="/img/getting-started/create-fleet.png" width="80%">

You'll then be redirected to the summary of the newly created fleet, where you can add your first {{ $device.name }}.


## Add a device and download OS

<!--add an anchor here to redirect old links-->
<a name="adding-your-first-device"></a>

<img alt="Add a device" src="/img/getting-started/fleet-view.png" width="100%">

To connect with {{ $names.cloud.lower }}, your **{{ $device.name }}** needs a {{ $names.os.lower }} image configured for your device type, fleet, and network. Start by clicking *Add device* in your fleet dashboard:

<img alt="Add new device" src="/img/getting-started/add-device.png" width="80%">

Select an OS type of _balenaOS_, and you will see a list of available {{ $names.os.lower }} versions with the latest preselected. Choose a **Development** version of the OS. The production OS does not facilitate the development workflow we'll be using. Find out more about the [differences between Development and Production images][devvprod].

<img alt="Network configuration" src="/img/common/app/network.png" width="80%">

Select the type of network connection you'll be using: *Ethernet Only* or *Wifi + Ethernet*. A network connection is required to allow the device to connect to {{ $names.cloud.lower }}. Selecting *Wifi + Ethernet* allows you to enter a *Wifi SSID* and *Wifi Passphrase* which is then built into the image.

<img alt="Download Image" src="/img/common/app/download_image.png" width="50%">

Finally, click the **Download {{ $names.os.lower }}** button. When the download completes, you should have a zipped image file with a name like `{{ $names.company.short }}-First-Fleet-{{ $device.id }}-2.80.3+rev1-v12.7.0.img.zip`.


## Provision device

<!-- This section is heavily customized based on the device -->

Next, we will flash the downloaded image onto the device. To do so, follow the following steps:

<!-- Loop through device instructions-->
{{#$device.instructions}}
{{this}}<br>
{{/$device.instructions}}

When complete, after a minute or two the device should appear on your {{$names.cloud.lower}} [dashboard]({{ $links.dashboardUrl }}), and you should now be ready to deploy some code! If your device still hasn't shown up on your dashboard after 10 minutes, something is definitely wrong. Check out our [troubleshooting guide for {{ $device.name }}][troubleshooting-{{ $device.id }}] for more information.

## Install the {{ $names.cli.lower }}

Now that a device online in your fleet, it's time to deploy some code. We will use the {{ $names.cli.lower }} for this. Follow the instructions below to install balenaCLI for the operating system available on your system.

{{import "getting-started/cliInstructions"}}

After {{ $names.cli.lower }} is installed, login to your {{ $names.company.lower}} account
using the `{{ $names.company.lower }} login` command on the terminal:

```shell
$ {{ $names.company.lower }} login
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \ / _` || | / __ \| '_ \  / _` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \__,_||_| \____/|_| |_| \__,_|


Logging in to cloud.com
? How would you like to login? (Use arrow keys)
❯ Web authorization (recommended)
  Credentials
  Authentication token
  I don't have a balena account!
```

You will be asked to choose an authentication method, choose _Web authorization_ which will 
bring up a web browser window that allows you to login to your {{ $names.cloud.lower }} 
account. Click the **Authorize** button, and head back to the terminal after the login 
successful message appears.

<img alt="Web authorization" src="/img/common/cli/web_authorization.png" width="70%">

## Create a release

After login, test the {{ $names.cli.lower }} by running the `{{ $names.company.lower }} fleets` command, which should return information about the fleet you created in the previous step. Take a note of the `FLEET NAME` as you'll need this in the next step to push the code to your device(s) in that fleet.

```shell
$ {{ $names.company.lower }} fleets
ID    FLEET NAME   DEVICE TYPE          ONLINE DEVICES DEVICE COUNT
98264 First-Fleet  {{ $device.name }}   0              0
```

A nice project to try is the [balena-{{ $language.id }}-hello-world][balena-{{ $language.id }}-hello-world] project.
It's a {{ $language.name }} web server that serves a static page on port 80. To get started, [download the project][github-download-{{ $language.id }}]
as a zipped file from GitHub, unzip it and open a terminal in the root of the extracted project directory.

To create a release, use the `{{ $names.company.lower }} push First-Fleet` command replacing 
`First-Fleet` with the name of your fleet. Ensure you are working from the root of the extracted 
project directory.

```shell
$ {{ $names.company.lower }} push First-Fleet
```

This command pushes the code to the {{ $names.company.lower }} builders, where it will be compiled, built, turned into a release, and applied to every device in the fleet.

You'll know your code has been successfully compiled and built when our friendly unicorn mascot appears in your terminal:

```shell
[hello-world]  Successfully built 51bd190f7530
[Info]       Generating image deltas from release 8acfdc579f7cb0fe424d1b800588b6f5 (id: 2186018)
[Success]    Successfully generated image deltas
[Info]       Uploading images
[Success]    Successfully uploaded images
[Info]       Built on builder05
[Success]    Release successfully created!
[Info]       Release: c0c593803588a304c173124827d96b99 (id: 2186339)
[Info]       ┌────────────────────┬────────────┬────────────┐
[Info]       │ Service            │ Image Size │ Build Time │
[Info]       ├────────────────────┼────────────┼────────────┤
[Info]       │ hello-world        │ 190.04 MB  │ 50 seconds │
[Info]       └────────────────────┴────────────┴────────────┘
[Info]       Build finished in 1 minutes, 4 seconds
                            \
                             \
                              \\
                               \\
                                >\/7
                            _.-(6'  \
                           (=___._/` \
                                )  \ |
                               /   / |
                              /    > /
                             j    < _\
                         _.-' :      ``.
                         \ r=._\        `.
                        <`\\_  \         .`-.
                         \ r-7  `-. ._  ' .  `\
                          \`,      `-.`7  7)   )
                           \/         \|  \'  / `-._
                                      ||    .'
                                       \\  (
                                        >\  >
                                    ,.-' >.'
                                   <.'_.''
                                     <'
```

The release will then be downloaded and started by all the devices in the fleet. You can see the progress of the device code updates on the device dashboard:

<img alt="Service download progress" src="/img/common/device/download-progress.png" width="100%">

After the download, you should now have a {{ $language.name }} web server running on your device and see some logs on your dashboard. 

To give your device a public URL, click the _Public Device URL_ toggle on the device dashboard. Public device URL allow you to serve content from the device to the world easily without configuration as long as the server is running on port 80. 

<img alt="Enable public URLs" src="/img/common/device/enable-public-url-device.png" width="60%">

Follow the URL to view the welcome page with additional resources. Alternatively, you can point your browser to your device's local IP address to access the server running on your device. You can find the device's IP address on the device dashboard page. This is what you should be seeing. 

<img alt="Success screen 1" src="/img/getting-started/success.png" width="60%">


## Developing your project

Now, let's try making some changes to this project and testing them right on the device. The project can be modified and pushed again using the same method as above, but since we are using a development version of the OS, we can enable *Local mode* and push directly to the device for a faster development cycle.

Activate local mode on the device via the dashboard.

<img alt="Enable Local Mode" src="/img/local-mode/enable-local-mode.png" width="60%">

Once enabled, you can now use `balena push` again, but this time we will push directly to the local IP address of the device obtained via the dashboard.

<img alt="Local IP address" src="/img/getting-started/local-ip-address.png" width="60%">

```shell
$ {{ $names.company.lower }} push 10.19.0.153
```

The same build process as before is carried out, but this time instead of using the {{ $names.company.lower }} builders, the build takes place locally on the device itself.

```shell
[Info]    Streaming device logs...
[Live]    Watching for file changes...
[Live]    Waiting for device state to settle...
[Logs]    [8/26/2021, 11:58:18 AM] Creating network 'default'
[Logs]    [8/26/2021, 11:58:19 AM] Installing service 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:58:20 AM] Installed service 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:58:20 AM] Starting service 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:58:23 AM] Started service 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:58:24 AM] [hello-world] Starting server on port 80
[Live]    Device state settled
```

The {{ $names.cli.lower }} will now watch for changes to all the files within the project, and automatically push changes to the device when detected. Let's try making a change to title of our balena welcome page. Navigate to the `index.html` file present in the `static` directory of the project. Open the file and change the title from `Welcome to balena!` to `Hello balena!` and save the file. After saving the changes, you can observe {{ $names.cli.lower }} automatically start rebuilding only the parts of the Dockerfile that has been changed.

```shell
[Live]    Detected changes for container hello-world, updating...

...

[Live]    [hello-world] Restarting service...
[Logs]    [8/26/2021, 11:59:01 AM, 2:42:32 AM] Service exited 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:59:04 AM, 2:42:35 AM] Restarting service 'hello-world sha256:...'
[Logs]    [8/26/2021, 11:59:05 AM, 2:42:36 AM] [hello-world] Starting server on port 80
```

When the rebuild is complete, take a look at the public device URL again to see your changes. The welcome page should have been updated with the new title.

<img alt="Success screen 2" src="/img/getting-started/success-change.png" width="60%">


## Next steps

Once you've finished making your changes, disable local mode and the device will revert back to running the latest release that's on your fleet. To update your fleet with the latest changes you've just worked on, use `balena push <fleet name>` once more to create a new release with those changes. 

When it's finished building the device(s) will update as before. Remember anything pushed to the fleet in this way can be applied to 10+ or 1000+ devices with no extra effort! To continue learning, explore parts of the guide in more detail:

- Learn more about [local mode][local-mode], which allows you to build and sync code to your device locally for rapid development.
- Develop an application with [multiple containers][multicontainer] to provide a more modular approach to fleet management.
- Manage your device fleet with the use of [configuration][configuration], [environment][service], and [service variables][service].
- Find out more about the [{{ $names.cli.lower }}][cli] and the functionality it offers.
- Visit our blog to find step-by-step tutorials for some [classic balena projects][projects].
- To publish what you will build or have already built, head over to [balenaHub][balenahub].
- If you find yourself stuck or confused, help is just a [click away][help].

**Enjoy balenafying all the things!**


[fleet-types]:/learn/manage/fleet-types
[architecture]:/reference/base-images/devicetypes/#machine-names-and-architectures
[balenablocks]:{{ $links.balenaHubUrl }}/blocks
[balenahub]:{{ $links.balenaHubUrl }}
[cli-install]:{{ $links.githubCli }}/blob/master/INSTALL.md
[cli]:/reference/cli/
[configuration]:/learn/manage/configuration/
[dashboard]:{{ $links.dashboardUrl }}
[devvprod]:/understanding/understanding-devices/2.0.0/#development-vs-production-images
[dockerfile]:/learn/develop/dockerfile
[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[gitdocs]:/learn/deploy/deployment/#git-push
[help]:{{ $links.supportUrl }}
[link-to-signup]:{{ $links.dashboardUrl }}/signup
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[npminstall]:{{ $links.githubCli }}/blob/master/INSTALL.md#npm-installation
[projects]:{{ $links.blogSiteUrl }}/tags/project/
[releases]:{{ $links.githubCli }}/releases
[service]:/learn/manage/variables/
[support]:/support/
[supported-devices]:/reference/hardware/devices/
[terminal]:/learn/manage/ssh-access
[token]:/learn/manage/account/#access-tokens
[variables]:/learn/manage/variables/


<!-- Language related links -->

[balena-{{ $language.id }}-hello-world]:{{ $links.githubExamples }}/balena-{{ $language.id }}-hello-world
[github-download-{{ $language.id }}]:{{ $links.githubExamples }}/balena-{{ $language.id }}-hello-world/archive/master.zip

<!-- Provison device links -->

[troubleshooting-{{ $device.id }}]:/faq/troubleshooting/troubleshooting/{{ $device.id }}