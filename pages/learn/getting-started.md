---
title: Get started with {{ $device.name }} and {{ $language.name }}

layout: getting-started.html

dynamic:
  variables: [ $device, $language ]
  ref: $original_ref/$device/$language
  $switch_text: Get started with $device and $language
---

# {{ title }}

## Introduction

{{import "getting-started/introduction"}}

## What you will need

{{import "getting-started/whatYouNeed"}}

## Account setup

If you don't already have a {{ $names.company.lower }} account, make sure to [sign up][link-to-signup] before continuing.

## Create an application

An application is a group of devices that share the same [architecture][architecture] and run the same code. When you provision a device, it is added to a specific application, but can be migrated to another application at any time.

To create your first application, log into your [{{ $names.cloud.lower }} dashboard][dashboard] and click the _Create application_ button.

<img alt="Create an application" src="/img/common/create-first-application.png" width="100%">

Select the **{{ $device.name }}** device type, choose an [application type][app-types], enter a name, and click *Create new application*:

<img src="/img/getting-started/create-application/{{ $device.id }}.png" width="80%">

__Note:__ To create an application with multiple containers, you'll want to use the Starter or Microservices application type. The Starter applications are full-featured and free for all users, with a limit of up to 10 total devices across all Starter applications.

After the application has been created, you will be redirected to the dashboard for the newly created application, where you can add your first **{{ $device.name }}**.

## Add your first device
<!--add an anchor here to redirect old links-->
<a name="adding-your-first-device"></a>

To connect with {{ $names.cloud.lower }}, your **{{ $device.name }}** needs a {{ $names.os.lower }} image configured for your device type, application, and network. Start by clicking *Add device* in your application dashboard:

<img alt="Add a device" src="/img/getting-started/application/{{ $device.id }}.png" width="100%">

For most applications, you will have the option to select a device type. By default, the device type you chose when you first created the application will be selected. Applications can, however, support any devices that share the same [architecture][architecture], so you can choose another device type if needed.

After selecting a device type, select an OS type of _balenaOS_, and you will see a list of available {{ $names.os.lower }} versions. In general, you should use the most recent version available. You can also select whether to use a *Development* or *Production* edition with the respective toggle:

<img alt="Add new device" src="/img/getting-started/devices/{{ $device.id }}.png" width="80%">

__Note:__ When you're getting started, a Development image is the most useful, as it permits many testing and troubleshooting features. For production use, be sure to switch to a Production image. More details on the differences between Development and Production images are detailed [here][devvprod].

A toggle is also used to select whether your network connection will be through *Ethernet Only* or with the option for *Wifi + Ethernet*. Selecting *Wifi + Ethernet* allows you to enter a *Wifi SSID* and *Wifi Passphrase*:

<img alt="Network configuration" src="/img/common/app/network.png" width="80%">

Clicking *Advanced* presents the option to select the rate at which your device checks for updates and the option to download just a configuration file (`config.json`) rather than an entire image:

<img alt="Advanced options" src="/img/common/app/advanced.png" width="80%">

Once you have finished your image configuration, click the *Download {{ $names.os.lower }}* button. When the download completes, you should have a zipped image file with a name like `{{ $names.company.short }}-First-App-2.47.1+rev1-v10.6.27.img.zip`, where `First-App` is the name you gave your application on the dashboard.

## Provision device

<!-- This section is heavily customized based on the device -->
{{import "getting-started/getDeviceOnDash"}}

## Add release

Now that we have a device or two connected to a {{ $names.company.lower }} application, let's deploy some code.

The recommended way to deploy code is to install the [{{ $names.cli.lower }}][cli]. The easiest way to do this is to use the installer for your OS available on the [releases page][releases]. Choose the latest release of the installer for your OS, and follow the [installation instructions][install].

<img alt="{{ $names.company.lower }} CLI installer" src="/img/common/cli/cli-release.png" width="100%">

__Note:__ You may also install the {{ $names.company.lower }} CLI via npm on a system running NodeJS, as explained in [NPM Installation][npminstall].

To use the [{{ $names.cli.lower }}][cli], you need to login to your {{ $names.company.lower }} account. Login via the terminal using the `{{ $names.company.lower }} login` command:

```shell
$ {{ $names.company.lower }} login
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \ / _` || | / __ \| '_ \  / _` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \__,_||_| \____/|_| |_| \__,_|


Logging in to balena-cloud.com
? How would you like to login? (Use arrow keys)
❯ Web authorization (recommended)
  Credentials
  Authentication token
  I don't have a balena account!
```

You will be asked how you wish to authenticate. The recommended method is that of _Web authorization_, which will bring up a browser window (and prompt you to first login to {{ $names.cloud.lower }} if you have not) and ask for confirmation that you wish to authorize the CLI. Click _Authorize_ and head back to your terminal.

<img alt="Web authorization" src="/img/common/cli/web_authorization.png" width="70%">

__Note:__ Other authentication methods include using your username and password credentials or obtaining an [authentication token][token] from the dashboard. Authentication tokens come in two types, API tokens, and JSON Web Token (JWT) session tokens. While API tokens do not expire, JWT session tokens do after 7 days.

After logging in, test out the {{ $names.company.lower }} CLI by running the `{{ $names.company.lower }} apps` command, which should return information about the application you created in the previous step. Take a note of the `APP NAME` as you'll need this in the next step to push the code to all devices in that application.

```shell
$ {{ $names.company.lower }} apps
ID    APP NAME   DEVICE TYPE          ONLINE DEVICES DEVICE COUNT
98264 First-App  {{ $device.name }}   0              0
```

__Note:__ See all the commands available with {{ $names.company.lower }} CLI by running `{{ $names.company.lower }} help`

<!-- This is language specific -->
{{import "getting-started/deployingCode"}}

__Note:__ You may also use git to deploy code to a device. If you wish to deploy via git, see the instructions [here][gitdocs].

Now to deploy this code to all device(s) in the application, use the `{{ $names.company.lower }} push First-App` command replacing `First-App` with the name of your application. Ensure you are in the root of the project directory before issuing this command or specify the `--source` option to provide an alternate location of the project directory.

```shell
$ {{ $names.company.lower }} push First-App
```

This command will package up and push the code from the local directory to the {{ $names.company.lower }} builders, where it will be compiled, built and deployed to every device in the application fleet.

You'll know your code has been successfully compiled and built when our friendly unicorn mascot appears in your terminal:

```shell
[main]     Successfully built d5f1de77fad3
[Info]     Uploading images
[Success]  Successfully uploaded images
[Success]  Release successfully created!
[Info]     Release: f4e3925bf7d32226365225e1b7201b90 (id: 89693)
[Info]     ┌─────────┬────────────┬────────────┐
[Info]     │ Service │ Image Size │ Build Time │
[Info]     ├─────────┼────────────┼────────────┤
[Info]     │ main    │ 205.13 MB  │ 1 second   │
[Info]     └─────────┴────────────┴────────────┘
[Info]     Build finished in 7 seconds
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

Your application will then be downloaded and executed by all the devices you have connected in your application fleet. The first push is slower to deploy, but all subsequent pushes are much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the device code updates on the device dashboard:

<img alt="Service download progress" src="/img/common/device/download-progress.png" width="100%">

<!-- This is language/project specific -->
{{import "getting-started/postPush"}}

{{> "getting-started/deviceUrl"}}

## Next steps

- Try out [local mode][local-mode], which allows you to build and sync code to your device locally for rapid development.
- Develop an application with [multiple containers][multicontainer] to provide a more modular approach to application management.
- Manage your device fleet with the use of [configuration][configuration], [environment][service], and [service variables][service].
- Explore these [example projects][projects] to give you an idea of more things you can do with {{ $names.company.lower }}.
- If you find yourself stuck or confused, help is just a [click away][help].

**Enjoy Balenafying All the Things!**

[app-types]:/learn/manage/app-types
[architecture]:/reference/base-images/devicetypes/#machine-names-and-architectures
[cli]:/reference/cli/
[configuration]:/learn/manage/configuration/
[dashboard]:{{ $links.dashboardUrl }}
[devvprod]:/understanding/understanding-devices/2.0.0/#dev-vs-prod-images
[dockerfile]:/learn/develop/dockerfile
[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[gitdocs]:/learn/deploy/deployment/#git-push
[help]:{{ $links.supportUrl }}
[install]:{{ $links.githubCli }}/blob/master/INSTALL.md
[link-to-signup]:{{ $links.dashboardUrl }}/signup
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[npminstall]:{{ $links.githubCli }}/blob/master/INSTALL.md#npm-installation
[projects]:{{ $links.blogSiteUrl }}/tag/etcher-featured/
[releases]:{{ $links.githubCli }}/releases
[service]:/learn/manage/serv-vars/
[terminal]:/learn/manage/ssh-access
[token]:/learn/manage/account/#access-tokens
