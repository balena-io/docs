---
title: Get started developing with {{ $device.name }} and {{ $language.name }}

layout: getting-started.html

dynamic:
  variables: [ $device, $language ]
  ref: $original_ref/$device/$language
  $switch_text: I want to get started with a $device and $language
---

# {{ title }}

{{import "getting-started/introduction"}}

## What you'll need

{{import "getting-started/whatYouNeed"}}

## Create a fleet

A fleet is a group of devices that share the same [architecture][architecture] and run the same code. Devices are added to fleets and can be moved between fleets at any time.

To create your first fleet, log into your [{{ $names.cloud.lower }} dashboard][dashboard] and click the **Create fleet** button.

<img alt="Create a fleet" src="/img/common/create-first-fleet.png" width="100%">

Enter a fleet name, select the **{{ $device.name }}** device type, choose the *Starter* [fleet type][fleet-types], and click **Create new fleet**:

<img src="/img/getting-started/create-fleet/{{ $device.id }}.png" width="80%">

You'll then be redirected to the summary of the newly created fleet, where you can add your first {{ $device.name }}.

## Add a device and download OS
<!--add an anchor here to redirect old links-->
<a name="adding-your-first-device"></a>

<img alt="Add a device" src="/img/getting-started/fleet/{{ $device.id }}.png" width="100%">

{{ $names.cloud.lower }} builds a custom {{ $names.os.lower }} image for your {{ $device.name }} which allows any device provisioned with it to join your fleet. Start by clicking **Add device** on the fleet summary. Your device type will be preselected here since you already chose it when creating the fleet. Other device types of the same [architecture][architecture] can also join the fleet.

<img alt="Add new device" src="/img/getting-started/devices/{{ $device.id }}.png" width="80%">

Select an OS type of _balenaOS_, and you will see a list of available {{ $names.os.lower }} versions with the latest preselected. Choose a **Development** version of the OS. The production OS does not facilitate the development workflow we'll be using. [Find out more about the differences between Development and Production images][devvprod].

<img alt="Network configuration" src="/img/common/app/network.png" width="80%">

Select the type of network connection you'll be using: *Ethernet Only* or *Wifi + Ethernet*. A network connection is required to allow the device to connect to {{ $names.cloud.lower }}. Selecting *Wifi + Ethernet* allows you to enter a *Wifi SSID* and *Wifi Passphrase* which is then built into the image.

<img alt="Advanced options" src="/img/common/app/download_image.png" width="50%">

Finally, click the **Download {{ $names.os.lower }}** button. When the download completes, you should have a zipped image file with a name like `{{ $names.company.short }}-First-Fleet-{{ $device.id }}-2.80.3+rev1-v12.7.0.img.zip`.

## Provision device

<!-- This section is heavily customized based on the device -->
{{import "getting-started/getDeviceOnDash"}}

**Troubleshooting:** If you're not able to get the device to appear in the dashboard, take a look at [our troubleshooting guide][troubleshooting] or try our [support channels][support].

## Create a release

Now that there's a device online in our fleet, we can push code, which creates a release. The release will then be applied to all of the devices in that fleet.

The recommended way to deploy code is to use the [{{ $names.cli.lower }}](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md) as mentioned in the requirements above. After it is [installed][cli-install], login to your {{ $names.company.lower}} account
with the `{{ $names.company.lower }} login` command on the terminal:

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

You will be asked to choose an authentication method, choose _Web authorization_ which will bring up a
web browser window that allows you to login to your {{ $names.cloud.lower }} account, click the **Authorize** button, and head back to the terminal.

<img alt="Web authorization" src="/img/common/cli/web_authorization.png" width="70%">

After login, test the {{ $names.cli.lower }} by running the `{{ $names.company.lower }} fleets` command, which should return information about the fleet you created in the previous step. Take a note of the `FLEET NAME` as you'll need this in the next step to push the code to all devices in that fleet.

```shell
$ {{ $names.company.lower }} fleets
ID    FLEET NAME   DEVICE TYPE          ONLINE DEVICES DEVICE COUNT
98264 First-Fleet  {{ $device.name }}   0              0
```

<!-- This is language specific -->
{{import "getting-started/deployingCode"}}

To create a release, use the `{{ $names.company.lower }} push First-Fleet` command replacing `First-Fleet` with the name of your fleet. Ensure you are working from the root of the extracted project directory.

```shell
$ {{ $names.company.lower }} push First-Fleet
```

This pushes the code to the {{ $names.company.lower }} builders, where it will be compiled, built, turned into a release and applied to every device in the fleet.

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

The release will then be downloaded and started by all the devices in the fleet. You can see the progress of the device code updates on the device dashboard:

<img alt="Service download progress" src="/img/common/device/download-progress.png" width="100%">

<!-- This is language/project specific -->
{{import "getting-started/postPush"}}

<!-- This is project specific -->
{{import "getting-started/projectSpecific"}}

## Developing your project

Now, let's try making some changes to the sample project and testing them on the device. The project can be modified and pushed again using the same method as above, but since we are using a development version of the OS, we can enable *Local mode* and push directly to the device for a faster development cycle.

Activate local mode on the device via the dashboard.

![Enable local mode](/img/local-mode/enable-local-mode.png)

Once enabled, you can now use `balena push` again, but this time directly to the local IP address of the device obtained via the dashboard.

<img alt="Local IP address" src="/img/getting-started/local-ip-address.png" width="60%">

```shell
$ {{ $names.company.lower }} push 10.19.0.153
```

The same build process as before is carried out, but this time instead of using the {{ $names.company.lower }} builders, it's all happening locally on the device.

```shell
[Info]    Streaming device logs...
[Live]    Watching for file changes...
[Live]    Waiting for device state to settle...
[Logs]    [8/26/2021, 11:58:18 AM] Creating network 'default'
[Logs]    [8/26/2021, 11:58:18 AM] Creating volume 'resin-data'
[Logs]    [8/26/2021, 11:58:19 AM] Installing service 'main sha256:...'
[Logs]    [8/26/2021, 11:58:20 AM] Installed service 'main sha256:...'
[Logs]    [8/26/2021, 11:58:20 AM] Starting service 'main sha256:...'
[Logs]    [8/26/2021, 11:58:23 AM] Started service 'main sha256:...'
[Live]    Device state settled
```

The {{ $names.cli.lower }} will now watch for changes to all the files within the project, and automatically push changes to the device when detected. Try making a change to the source of the example project and note how the change is detected and applied.

```shell
[Live]    Detected changes for container main, updating...
[Live]    [main] Restarting service...
```

## Next steps

Once you've finished developing, disable local mode and the device will revert back to running the latest release that's on your fleet. To update your fleet with the latest changes you've just worked on, use `balena push <fleet name>` once more to create a new release; when it's finished building the device will update as before. Remember anything pushed to the fleet in this way can be applied to 1000s of devices with no extra effort!

To continue learning, explore any aspect of the getting started guide in more detail:

- Learn more about [local mode][local-mode], which allows you to build and sync code to your device locally for rapid development.
- Develop an application with [multiple containers][multicontainer] to provide a more modular approach to fleet management.
- Manage your device fleet with the use of [configuration][configuration], [environment][service], and [service variables][service].
- Find out more about the [{{ $names.cli.lower }}][cli] and the functionality it offers.
- Visit our blog to find step-by-step tutorials for some [classic balena projects][projects].
- To publish what you've built, head to [balenaHub][balenahub].
- If you find yourself stuck or confused, help is just a [click away][help].

**Enjoy balenafying all the things!**

[fleet-types]:/learn/manage/app-types
[architecture]:/reference/base-images/devicetypes/#machine-names-and-architectures
[cli]:/reference/cli/
[cli-install]:{{ $links.githubCli }}/blob/master/INSTALL.md
[configuration]:/learn/manage/configuration/
[dashboard]:{{ $links.dashboardUrl }}
[devvprod]:/understanding/understanding-devices/2.0.0/#development-vs-production-images
[dockerfile]:/learn/develop/dockerfile
[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[gitdocs]:/learn/deploy/deployment/#git-push
[help]:{{ $links.supportUrl }}
[balenahub]:{{ $links.balenaHubUrl }}
[balenablocks]:{{ $links.balenaHubUrl }}/blocks
[link-to-signup]:{{ $links.dashboardUrl }}/signup
[local-mode]:/learn/develop/local-mode
[multicontainer]:/learn/develop/multicontainer
[npminstall]:{{ $links.githubCli }}/blob/master/INSTALL.md#npm-installation
[projects]:{{ $links.blogSiteUrl }}/tag/project/
[releases]:{{ $links.githubCli }}/releases
[variables]:/learn/manage/variables/
[service]:/learn/manage/serv-vars/
[support]:/support/
[terminal]:/learn/manage/ssh-access
[troubleshooting]:/faq/troubleshooting/troubleshooting/
[token]:/learn/manage/account/#access-tokens
[supported-devices]:/reference/hardware/devices/
