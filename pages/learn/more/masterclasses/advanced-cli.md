# Balena CLI Advanced Masterclass

- **Masterclass Type:** Core
- **Maximum Expected Time To Complete:** 2 Hours

## Prerequisites

To gain the most from this masterclass, we recommend that you first go through the [balena CLI Masterclass](https://www.balena.io/docs/learn/more/masterclasses/cli-masterclass/)

## Introduction

The balena Command Line Interface (balena CLI) consists of several commands that allow a user to develop, deploy, and manage balena fleets and devices.

The previous balena CLI masterclass covered some of the most common techniques and topics. This masterclass aims to build on top of that, introducing you to additional features that can be used to gain finer control over the provisioning, deployment, and management of devices.

In this masterclass, you will learn how to:

- Work with different balenaCloud environments
- Update balenaOS programmatically
- Preconfigure and preregister downloaded images
- Preload downloaded images with your application code

If you have any questions about this masterclass as you proceed through it, or would like clarifications on any of the topics raised here, please do raise an issue on the [GitHub repository](https://github.com/balena-io/balena-cli-advanced-masterclass/), or contact us on the [balena forums](https://forums.balena.io/) where we'll be delighted to answer your questions.

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

- A locally cloned copy of this repository [Balena CLI Advanced Masterclass](https://github.com/balena-io/balena-cli-advanced-masterclass) using either `git clone https://github.com/balena-io/balena-cli-advanced-masterclass.git` or by downloading the ZIP file (from 'Code'->'Download ZIP') and then unzipping it to a suitable directory
- A balena supported device, such as a [Raspberry Pi 5](https://www.raspberrypi.org/products/raspberry-pi-5/) or an [Intel NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/). In this guide, we'll be using a Raspberry Pi 4 device.
- A suitable text editor for developing code on your development platform (e.g. [Visual Code](https://code.visualstudio.com/))
- A suitable shell environment for command execution (such as `bash` or `zsh`)
- A [balenaCloud](https://dashboard.balena-cloud.com/signup) account and a [balenaCloud staging](https://dashboard.balena-staging.com/signup) account
- A local installation of [Docker](https://docs.docker.com/engine/install/) as well as a familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
- Should you wish to install via `npm`, a [NodeJS](https://nodejs.org/en/) installation, including [NPM](https://www.npmjs.com/get-npm) is required. The use of [`nvm`](https://github.com/nvm-sh/nvm) is recommended, which allows you to alter the version of Node/NPM being used per-user, and also removes the need to install global dependencies using `sudo`

## Exercises

The following exercises assume access to a device that has been provisioned. As per the other masterclasses in this series we're going to assume that's a Raspberry Pi 4, however you can simply alter the device type as appropriate in the following instructions.

All of the following exercises assume that you are running the balena CLI from a suitable Unix based shell. The exercises include commands which can be run in such a shell, and are represented by a line prefixed with `$`. Information returned from execution of a command may be appended under the line to show what might be returned. For example:

```shell
$ balena version
14.5.3
```

### 1. Communicating with Alternative balena Environments

By default, the balena CLI communicates with the production balenaCloud instance, using this environment to carry out operations such as fleet creation, code pushing, etc.

However, there are alternative environments available, such as balena's staging environment, where new service features are deployed and tested before being approved for the production environment, or a self-hosted openBalena environment.

There are a couple of ways to inform balena CLI that it should use a different environment.

#### 1.1 Environment Variable

The easiest way to quickly ensure balena CLI uses an alternative environment to that of production is to use the `BALENARC_BALENA_URL` environment variable. In a terminal, execute the following command:

```shell
$ BALENARC_BALENA_URL=balena-staging.com balena login
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \ / _` || | / __ \| '_ \  / _` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \__,_||_| \____/|_| |_| \__,_|


Logging in to balena-staging.com
? How would you like to login? (Use arrow keys)
❯ Web authorization (recommended)
  Credentials
  Authentication token
  I don't have a balena account!
```

Just like the production server, each alternative environment will require a login to allow balena CLI can operate. Login using your chosen method now.

Once logged in, successive uses of `BALENARC_BALENA_URL=balena-staging.com balena` will use the saved token to use the alternative environment, for example:

```shell
$ BALENARC_BALENA_URL=balena-staging.com balena fleets
 Id     App name            Slug                                     Device type     Device count Online devices
 ────── ─────────────────── ──────────────────────────────────────── ─────────────── ──────────── ──────────────
 146558 fleetOne            ryanh/fleetone                    intel-nuc       0            0
 146559 fleetTwo            ryanh/fleettwo                    raspberrypi4-64 0            0
```

#### 1.2 Configuration File

Should you just wish to use balena CLI without specifying the environment to use in an environment variable, you can use a configuration file instead.

By default, balena CLI looks for a configuration file in the user's home directory. We can demonstrate configuring balena CLI for an alternative environment by creating a new file as `~/.balenarc.yml` and then filling it with the following information:

```yaml
balenaUrl: 'balena-staging.com'
```

Now try listing the fleets from the staging environment again:

```shell
$ balena fleet list
 Id     App name            Slug                                     Device type     Device count Online devices
 ────── ─────────────────── ──────────────────────────────────────── ─────────────── ──────────── ──────────────
 146558 fleetOne            ryanh/fleetone                    intel-nuc       0            0
 146559 fleetTwo            ryanh/fleettwo                    raspberrypi4-64 0            0
```

Two things have happened here. The first is that balena CLI has found and used the new balena environment URL from the `~/.balenarc.yml` configuration file. The second is that it has used the token previously retrieved from logging in to the staging environment using the environment variable.

Token files are saved separately and can be found in the user's home directory (for example under Linux, macOS and Windows Subsystem for Linux, in `~/.balena/token`).

#### 1.3 Separate Environment Configurations

Usually when logging into an environment, the user's configuration file and token files are used to ensure successive commands use this information to authenticate the commands being executed.

However, there are operations where sometimes it is desirable to switch between environments (for example when testing new features available on staging but not production).

To enable this, balena CLI includes the ability to use a configuration file in the current working directory (CWD) to determine which environment to use, as well as to point to alternative data directories where authentication (login) tokens are stored.

When a configuration file is found in the current working directory, the CLI merges it with all other configuration sources, such as the `~/.balenarc.yml` file in the home dir. Settings defined in the `balenarc.yml` file in the current working directory take precedence over settings defined in `~/.balenarc.yml`.

To demonstrate using different configuration files for different environments, in your home directory, create two directories called `balenaProduction` and `balenaStaging`, and then fill in separate configuration files in each directory. The following commands will do this for you:

```shell
$ mkdir -p ~/balenaProduction
$ cd ~/balenaProduction
$ echo "balenaUrl: 'balena-cloud.com'" > balenarc.yml
$ echo "dataDirectory: '.'" >> balenarc.yml

$ mkdir -p ~/balenaStaging
$ cd ~/balenaStaging
$ echo "balenaUrl: 'balena-staging.com'" > balenarc.yml
$ echo "dataDirectory: '.'" >> balenarc.yml
```

Note that we do _not_ prefix the `balenarc.yml` file with a `.` to avoid hiding it. Note also that some lines above use `'>'` and others use `'>>'` as the shell redirection operator (the former creates a new file, and the latter appends to an existing file).

Now check that it works:

```shell
$ cd ~/balenaProduction
$ balena login
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

Login using your preferred method. Note that a new `token` file now exists in the `~/balenaProduction` directory. Now login to the staging directory, using the staging configuration directory:

```shell
$ cd ~/balenaStaging
$ balena login
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \ / _` || | / __ \| '_ \  / _` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \__,_||_| \____/|_| |_| \__,_|


Logging in to balena-staging.com
? How would you like to login? (Use arrow keys)
❯ Web authorization (recommended)
  Credentials
  Authentication token
  I don't have a balena account!
```

This time, a `token` file was created in the `~/balenaStaging` directory.

You can now switch between environments by changing directory to the one with the relevant `balenarc.yml` and `token` file, which will allow you to use either environment without any further authentication:

```shell
$ cd ~/balenaStaging
$ balena fleet list
 Id     App name            Slug                                     Device type     Device count Online devices
 ────── ─────────────────── ──────────────────────────────────────── ─────────────── ──────────── ──────────────
 146558 fleetOne            ryanh/fleetone                    intel-nuc       0            0
 146559 fleetTwo            ryanh/fleettwo                    raspberrypi4-64 0            0

$ cd ~/balenaProduction
$ balena fleet list
 Id      App name       Slug                 Device type     Device count Online devices
 ─────── ────────────── ──────────────────── ─────────────── ──────────── ──────────────
 1913403 balena-health  ryanh/balena-health  raspberrypi4-64 1            0
 1922430 balena-pricing ryanh/balena-pricing raspberrypi4-64 1            0
 1962591 notice-board   ryanh/notice-board   raspberrypi3-64 1            0
```

For the purposes of this document, we have chosen `'.'` (the current working directory) as the value for the `dataDirectory` property in the `balenarc.yml` file, but you could of course choose different directories such as `/home/ryanh/.balena/production` and `/home/ryanh/.balena/staging`. If this property is not specified, the default data directory is `.balena` or `_balena` (respectively on Linux/macOS and Windows) in the user's home directory.

> Watch out! The tilde character (`'~'`) is not resolved to the homedir when used inside a `balenarc.yml` file. Use the full directory such as `/home/ryanh/` instead of the tilde.

It is also worth noting that the CLI accepts the `BALENARC_DATA_DIRECTORY` environment variable as an alternative to the `dataDirectory` property in the `balenarc.yml` file. For example, the following command would allow the CLI to use the staging settings and token even if the current working directory was not `~/balenaStaging`:

```shell
$ cd /tmp
$ BALENARC_BALENA_URL=balena-staging.com \
  BALENARC_DATA_DIRECTORY=~/balenaStaging \
  balena whoami
```

We'll be using the two separate environments (staging and production) in the next set of exercises to show you how devices can be moved between fleets and environments. Don't delete them just yet!

### 2. Moving Devices between Fleets and Environments

Usually you'll provision a device that will exist on a particular balena fleet or environment, as the lifecycle of that device, will only make sense within that fleet.

However, there are times where it is useful to be able to move a device either from one fleet to another (for example when a major rewrite of your application occurs that is no longer backwards compatible with a prior version) or from one environment to another (perhaps you've created a locally hosted test environment using openBalena and now want to move from your test environment to the production environment of balenaCloud).

The following exercises will show you how to carry this out.

#### 2.1 Moving Devices between Fleets

Moving a device to another fleet in the same environment is extremely easy. To demonstrate this, first create a new fleet for the device:

```shell
$ cd ~/balenaProduction
$ balena fleet create altFleet --type raspberrypi4-64 --organization ryanh
Fleet created: slug "ryanh/altfleet", device type "raspberrypi4-64"
```

We should already have a device connecting to our previous 'cliFleet' (from the previous [balena CLI Masterclass](https://www.balena.io/docs/learn/more/masterclasses/cli-masterclass/)). See the [Creating a Fleet and Provisioning a Device](https://www.balena.io/docs/learn/more/masterclasses/cli-masterclass/#2-creating-a-fleet-and-provisioning-a-device) section to create an fleet and provision a device against it, if you haven't already done so, and wish to follow this exercise. Once a device is provisioned against the `cliFleet` fleet and online, execute the following command:

```shell
$ cd ~/balenaProduction
$ balena device list
ID      UUID    DEVICE NAME         DEVICE TYPE     FLEET              STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272148 ee13198 wide-street         raspberrypi4-64 ryanh/clifleet     Idle   true      14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/ee13198bbda819053446a47a9ad98853/summary
```

To interactively determine which Fleet to move a device to, simply use its UUID with the `balena device move` command:

```shell
$ cd ~/balenaProduction
$ balena device move ee13198
? Select an fleet (Use arrow keys)
❯ altFleet (ryanh/altfleet) [raspberrypi4-64]
```

As you can see, only Fleets that support the device type of the device that is being moved are available. For non-interactive movement, simply pass the optional `--fleet` switch to the command with the relevant Fleet name:

```shell
$ cd ~/balenaProduction
$ balena device move ee13198 --fleet altFleet
Device ee13198 was moved to fleet ryanh/altfleet
```

A call of `balena device` specifying the UUID of the moved device will now show it is owned by the specified Fleet:

```shell
$ cd ~/balenaProduction
$ balena device ee13198
== WIDE STREET
ID:                    9272148
DEVICE TYPE:           raspberrypi4-64
STATUS:                idle
IS ONLINE:             true
IP ADDRESS:            10.0.0.197 2601:902:8000:aa60::7124 2601:902:8000:aa60:b65d:ec41:408b:20c
PUBLIC ADDRESS:        98.244.131.52
MAC ADDRESS:           DC:A6:32:9E:18:DD 3A:6A:4C:77:1E:95
FLEET:                 ryanh/altfleet
LAST SEEN:             2022-11-11T13:26:27.603Z
UUID:                  ee13198bbda819053446a47a9ad98853
COMMIT:                N/a
SUPERVISOR VERSION:    14.0.14
IS WEB ACCESSIBLE:     false
OS VERSION:            balenaOS 2022.10.0
DASHBOARD URL:         https://dashboard.balena-cloud.com/devices/ee13198bbda819053446a47a9ad98853/summary
CPU USAGE PERCENT:     62
CPU TEMP C:            37
CPU ID:                100000005a47b351
MEMORY USAGE MB:       201
MEMORY TOTAL MB:       1900
MEMORY USAGE PERCENT:  11
STORAGE BLOCK DEVICE:  /dev/mmcblk0p6
STORAGE USAGE MB:      74
STORAGE TOTAL MB:      29007
STORAGE USAGE PERCENT: 0
```

The Supervisor on the device will remove any previously running services, as well as their images and any volumes associated with them and download the images associated with the new Fleet before starting them.

#### 2.2 Moving Devices between Environments

Moving a device between balena environments is slightly more involved, and differs depending on whether you're using a device running a development or production image. Let's cover the development image case here.

For a device running a development image, you can use `balena leave` and `balena join` to carry this out.

First, provision a device using a development image. You can do this using the balenaCloud dashboard's 'Add Device' downloading a 'Development' edition image from the `cliFleet` Fleet page. Provision your device with this image using either [balenaEtcher](https://www.balena.io/etcher/) or the [balena CLI].

Once the device is provisioned and has connected to the balena network, discover its hostname or IP address by using `balena device list`:

```shell
$ cd ~/balenaProduction
$ balena device list
ID      UUID    DEVICE NAME         DEVICE TYPE     FLEET              STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272148 ee13198 wide-street         raspberrypi4-64 ryanh/clifleet     Idle   true      14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/ee13198bbda819053446a47a9ad98853/summary

$ balena device ee13198
== WIDE STREET
ID:                    9272148
DEVICE TYPE:           raspberrypi4-64
STATUS:                idle
IS ONLINE:             true
IP ADDRESS:            10.0.0.197 2601:902:8000:aa60::7124 2601:902:8000:aa60:b65d:ec41:408b:20c
PUBLIC ADDRESS:        98.244.131.52
MAC ADDRESS:           DC:A6:32:9E:18:DD 3A:6A:4C:77:1E:95
FLEET:                 ryanh/clifleet
LAST SEEN:             2022-11-11T13:26:27.603Z
UUID:                  ee13198bbda819053446a47a9ad98853
COMMIT:                N/a
SUPERVISOR VERSION:    14.0.14
IS WEB ACCESSIBLE:     false
OS VERSION:            balenaOS 2022.10.0
DASHBOARD URL:         https://dashboard.balena-cloud.com/devices/ee13198bbda819053446a47a9ad98853/summary
CPU USAGE PERCENT:     62
CPU TEMP C:            35
CPU ID:                100000005a47b351
MEMORY USAGE MB:       201
MEMORY TOTAL MB:       1900
MEMORY USAGE PERCENT:  11
STORAGE BLOCK DEVICE:  /dev/mmcblk0p6
STORAGE USAGE MB:      74
STORAGE TOTAL MB:      29007
STORAGE USAGE PERCENT: 0
```

As we now have the local IP address for it, we can use this to call the command to leave the balenaCloud environment:

```shell
$ cd ~/balenaProduction
$ balena leave 10.0.0.197
[Success] Device successfully left the platform. The device will still be listed as part
[Success] of the fleet, but changes to the fleet will no longer affect the device and its
[Success] status will eventually be reported as 'Offline'. To irrecoverably delete the
[Success] device from the fleet, use the 'balena device rm' command or delete it through
[Success] the balenaCloud web dashboard.
```

The device now becomes _unmanaged_. This means it acts in the same way as a device that has been provisioned with an unconfigured balenaOS image, for example one that has been downloaded from [https://www.balena.io/os/#download](https://www.balena.io/os/#download).

We can now join a different balena environment by using balena CLI to login to it. As we previously did this for our staging environment, we can simply use the data and tokens we saved for this by changing directories and using the other environment information. We'll now create a new Fleet on the staging environment to move the device to:

```shell
$ cd ~/balenaStaging
$ balena fleet create stagingCliFleet --type raspberrypi4-64 --organization ryanh
Fleet created: slug "ryanh/stagingclifleet", device type "raspberrypi4-64"
```

Finally, we'll issue a command to the now unmanaged device to join the staging environment and the `stagingCliFleet` Fleet:

```shell
$ cd ~/balenaStaging
$ balena join 10.0.0.197 --fleet stagingCliFleet
? Check for updates every X minutes 5
[Success] Device successfully joined balena-staging.com!
```

We can now check the devices on the staging environment to ensure it's joined successfully:

```shell
$ cd ~/balenaStaging
$ balena device list
ID     UUID    DEVICE NAME               DEVICE TYPE           FLEET                                    STATUS      IS ONLINE SUPERVISOR VERSION OS VERSION            DASHBOARD URL
446451 ee13198 steamed-thunder           raspberrypi4-64       ryanh/stagingclifleet             Idle        false     14.0.14            balenaOS 2022.10.0    https://dashboard.balena-staging.com/devices/ee13198bbda819053446a47a9ad98853/summary
```

As can be seen, it's been given a new name and UUID.

If we hadn't specified the Fleet to join, we would have seen an interactive list of all the Fleets on the staging environment:

```shell
$ cd ~/balenaStaging
$ balena join 10.0.0.197
Select fleet (Use arrow keys)
❯ ryanh/fleetalt
  ryanh/stagingclifleet
  someorg/somefleet
```

**Note:** Fleets listed are not all of the `raspberrypi4-64` device type, but share a common architecture. You should be very careful when selecting a Fleet of a different device type, as you may find issues when the device attempts to run the application code for a device without the same peripherals or system-on-chip layout.

### 3. Downloading and Configuring a Provisioning Image using balena CLI

In the previous balena CLI masterclass, we provisioned an image by using the balenaCloud dashboard to download an image that could then be flashed to appropriate media (or directly to a device).

balena CLI also allows you to do this, but includes some powerful functionality that allows the modification of images.

The following exercises will introduce this functionality and provide some examples of suitable use cases.

However, to start with, as we're not going to use separate environments again, we'll remove the previous setups for production and staging environments and move back to a single set of environment configuration files.

```shell
$ cd ~
$ rm -rf balenaStaging
$ rm -rf balenaProduction
$ balena login
```

Use your preferred login method to recreate a `~/.balenarc.yml` and `~/.balena/token` file in your home directory.

#### 3.1 Downloading a Provisioning Image

Downloading an image via balena CLI requires you to specify the type of device the image downloaded should be suitable for, and optionally the OS version the image should use and output path.

We'll use the balenaCloud environment again, so first change back to the root repository for this masterclass and login to balenaCloud, for example:

```shell
$ cd ~/balena-cli-advanced-masterclass
```

Now we'll download the latest balenaOS image for the device, and determine the filename that it will be saved as:

```shell
$ balena os download raspberrypi4-64 --version 2022.10.0 --output balena-rpi4-image.img
Getting device operating system for raspberrypi4-64
Downloading balenaOS version 2022.10.0 [========================] 100% eta 0s
balenaOS image version 2022.10.0 downloaded successfully
```

Notice that we've passed the `--version` switch to the command, which tells balena CLI to download a specific version of balenaOS for the device. The parameter can take a variety of forms such as a specific version, a version greater or equal to that given, etc. See the full range of options available by using `balena os download --help`. If we had not specified a version, then the latest version of balenaOS for the device type would have been downloaded.

#### 3.2 Configuring a Provisioning Image

A downloaded balenaOS image via balena CLI is unconfigured, so to allow a device to use it as a provisioning image we need to specify, at a minimum, which Fleet the device should be associated with.

There are a few ways to achieve this. The simplest is to configure it interactively, passing either a Fleet name or device UUID so that the relevant Fleet can be determined:

```shell
$ balena os configure balena-rpi4-image.img --fleet cliFleet
? Network Connection ethernet
Configuring operating system image
```

Should you select `wifi`, then you'll be asked to enter the wireless SSID (and credentials for that network) that a device should connect to once booted.

The downloading image will now be configured (with access point details if required) and is ready to flash the SD card with.

There's another way to produce complete configured images for provisioning a device with, which is to produce a configuration and then injecting that configuration into a bare OS image.

This allows multiple configs to be generated, for example for different Fleets, and then using copies of a bare OS image of a particular version to prepare images for each of those apps.

You can generate independent configuration files using the `balena config generate` command. A mandatory OS version must be passed to this command, with either a Fleet name or device UUID. It will interactively ask for more details:

```shell
$ balena config generate --version 2022.10.0 --fleet cliFleet
? Network Connection (Use arrow keys)
❯ ethernet
  wifi
```

However, in most situations where you wish to programmatically define a set of configurations, you can use other switches to do so. We'll use the `--output` switch to write a JSON configuration, and a few of the network configuration switches to ensure it connects to a Wifi access point on startup. In the following command, ensure you replace the values for `--wifiKey` and `--wifiSsid` with values for your local network's Access Point:

```shell
$ balena config generate --version 2022.10.0 --fleet cliFleet --appUpdatePollInterval 5 --network wifi --wifi
Ssid MyNetworkSSID --wifiKey myw1f1n3tw0rk -o wifi-config.json
applicationId:         1988703
deviceType:            raspberrypi4-64
userId:                234385
appUpdatePollInterval: 300000
listenPort:            48484
vpnPort:               443
apiEndpoint:           https://api.balena-cloud.com
vpnEndpoint:           cloudlink.balena-cloud.com
registryEndpoint:      registry2.balena-cloud.com
deltaEndpoint:         https://delta.balena-cloud.com
mixpanelToken:         9ef939ea64cb6cd8bbc96af72345d70d
apiKey:                cuEFVvBJ7ATZrNrHy07IVLlFsK0mwmKV
wifiSsid:              MyNetworkSSID
wifiKey:               myw1f1n3tw0rk
```

This will generate a new JSON file in the current directory. We'll now use this to write to the downloaded image. Ensure you have an unconfigured image (EX: `balena os download raspberrypi4-64 --version 2022.10.0 --output balena-rpi4-image.img`):

```shell
$ balena os configure --fleet cliFleet --config wifi-config.json balena-rpi4-image.img
Configuring operating system image
```

If you want to use the same downloaded image for each new configuration, first make an uninitialized copy of the image, which itself can then be copied for each configuration you wish to initialize the image with.

#### 3.3 Writing a Configured Image

balena is the author of [balenaEtcher](https://www.balena.io/etcher/) which has fast become the preferred way for millions of users across the world to write OS images to different media. However, there are times where non-interactively writing an image is desired, especially in a test or manufacturing environment, where device media on a large number of devices need writing without any interactive involvement.

Luckily, balena CLI includes functionality to write a provisioning image to any attached, valid media that is exposed as a drive on the host machine.

We'll use the previously configured device image as our provisioning image. Insert an SD card into your development machine. This will expose a device node or mount point, referred to in balena CLI as a 'drive', depending on the OS you're running. You can discover which drive has been assigned by running the following:

```shell
$ balena util available-drives
DEVICE     SIZE    DESCRIPTION
/dev/disk2 31.9 GB TS-RDF5 SD Transcend Media
```

As you can see, the SD card is attached to drive `/dev/disk2`. We can now use another balena CLI command to write the configured image to that drive, which will provision the device:

```shell
$ balena os initialize balena-rpi4-image.img --type raspberrypi4-64 --drive /dev/disk2 --yes
Initializing device

Note: Initializing the device may ask for administrative permissions
because we need to access the raw devices directly.
Going to erase /dev/disk2.
Admin privileges required: you may be asked for your computer password to continue.
Password:
Writing Device OS [========================] 100% eta 0s
Validating Device OS [========================] 100% eta 0s
You can safely remove /dev/disk2 now
```

Note that you _must_ supply the device type, although the drive to write to is optional (but you will be asked interactively if you do not supply it). The `--yes` switch indicates we do not want an interactive prompt confirming we want to write to the drive (else a warning that you will wipe whatever is on that drive and a confirmation prompt is given).

Once provisioned, safely remove the SD card from you machine, insert it into your device and power it on. Shortly afterwards, it will connect to balenaCloud:

```shell
$ balena device list
ID      UUID    DEVICE NAME         DEVICE TYPE     FLEET              STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272981 0b9df5c average-darkness    raspberrypi4-64 ryanh/clifleet     Idle   true      14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/0b9df5cf5a21f8ae903b4e8eb0d94ad9/summary
```

### 4. Configuring Environment Variables

Devices using balenaOS allow the use of dynamic environment variables which may be updated remotely, altering the behavior of a service container.

For example, suppose that we had a production device out in the field, which is not behaving as expected. We may want to enable extra debugging by setting an environment variable dynamically that will get picked up by the device and start verbose logging.

We'll start by pushing code to the device, reusing our previous `cliFleet` Fleet but using the code from this masterclass:

```shell
$ cd example
$ balena push cliFleet
[Info]     Starting build for clifleet, user ryanh
[Info]     Dashboard link: https://dashboard.balena-cloud.com/apps/1988703/devices
[Info]     Building on arm03
[Info]     No suitable previous release for caching, skipping cache pull
[main]     Step 1/6 : FROM balenalib/raspberrypi4-64-node:16
[main]      ---> 8243f0ae72ab
[main]     Step 2/6 : WORKDIR /usr/src/app
[main]      ---> Running in 140841ec4431
[main]     Removing intermediate container 140841ec4431
[main]      ---> 7df727d7208f
[main]     Step 3/6 : COPY package.json ./
[main]      ---> d15ced4b5a90
[main]     Step 4/6 : RUN npm install
[main]      ---> Running in 082c0a329098
[main]     up to date, audited 1 package in 326ms
[main]     found 0 vulnerabilities
[main]     Removing intermediate container 082c0a329098
[main]      ---> f4f1a7b74bf2
[main]     Step 5/6 : COPY helloworld.js ./
[main]      ---> e0b94be1e7fa
[main]     Step 6/6 : CMD ["npm", "start"]
[main]      ---> Running in 8f0673952cc1
[main]     Removing intermediate container 8f0673952cc1
[main]      ---> 1d1811e0d49d
[main]     Successfully built 1d1811e0d49d
[Info]     Uploading images
[Success]  Successfully uploaded images
[Info]     Built on arm03
[Success]  Release successfully created!
[Info]     Release: 280fd54f44470b4ad659039a654720d2 (id: 2369346)
[Info]     ┌─────────┬────────────┬────────────┐
[Info]     │ Service │ Image Size │ Build Time │
[Info]     ├─────────┼────────────┼────────────┤
[Info]     │ main    │ 291.38 MB  │ 57 seconds │
[Info]     └─────────┴────────────┴────────────┘
[Info]     Build finished in 1 minute, 31 seconds
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

Once built and pushed to the device, you should see the following logs:

```shell
$ balena device logs 0b9df5c
[Logs]    [11/11/2022, 10:38:35 AM] Installing service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:38:35 AM] Installed service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:38:35 AM] Starting service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:38:36 AM] Started service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:38:37 AM] [main]
[Logs]    [11/11/2022, 10:38:37 AM] [main] > balena-cli-advanced-masterclass@2.0.0 start
[Logs]    [11/11/2022, 10:38:37 AM] [main] > node helloworld.js; sleep infinity
[Logs]    [11/11/2022, 10:38:37 AM] [main]
[Logs]    [11/11/2022, 10:38:38 AM] [main] ---> LOG_DEBUG not set, no debug mode
[Logs]    [11/11/2022, 10:38:38 AM] [main] Hello world!
```

As you can see in `helloworld.js`, it looks like if we set the `LOG_DEBUG` environment variable, we'll get some debug logging (If you don't see this message ensure you are pushing the code from this masterclass, and not the `balena-cli-masterclass`!). So let's use `balena env` to do this:

```shell
$ balena env add LOG_DEBUG true --fleet cliFleet
```

Now go to the dashboard for the `cliFleet` Fleet, and select 'variables'. 'Add' a new variable, called `DASH_VAR` and set it to `from-dash`. To verify we've now set our variables, let's use `balena env list` which will show all the environment variables set for our Fleet:

```shell
$ balena env list --fleet cliFleet
ID     NAME      VALUE     FLEET          SERVICE
676489 DASH_VAR  from-dash ryanh/clifleet *
676488 LOG_DEBUG true      ryanh/clifleet *
```

As you can see, both variables now show up in our list. However, if we now list the logs for the device, we'll see something else:

```shell
$ balena device logs 0b9df5c
[Logs]    [11/11/2022, 10:41:39 AM] Killed service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:41:40 AM] Installing service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:41:41 AM] Installed service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:41:41 AM] Starting service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:41:42 AM] Started service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:41:43 AM] [main]
[Logs]    [11/11/2022, 10:41:43 AM] [main] > balena-cli-advanced-masterclass@2.0.0 start
[Logs]    [11/11/2022, 10:41:43 AM] [main] > node helloworld.js; sleep infinity
[Logs]    [11/11/2022, 10:41:43 AM] [main]
[Logs]    [11/11/2022, 10:41:43 AM] [main] ---> This is debug mode!
[Logs]    [11/11/2022, 10:41:43 AM] [main] Hello world!
```

When we set the environment variable, the Supervisor on the device noted that the value had been added and restarted the service container to ensure the new environment variable was set, as a result we now see the extra debug log text `[main] ---> This is debug mode!`. This also occurs whenever the value of an environment variable is changed, or the environment variable is deleted. We'll try this now, by specifying the ID of the variable we want to remove:

```shell
$ balena env rm 676488 --yes
$ balena env list --fleet cliFleet
ID     NAME     VALUE     FLEET          SERVICE
676489 DASH_VAR from-dash ryanh/clifleet *
```

Note that we used the `--yes` switch to force the deletion of the variable. Without this, we would have been asked interactively to confirm the deletion.

Wait a little while to let the Supervisor see that the environment variable has been deleted, and then look at the logs again:

```shell
$ balena device logs 0b9df5c
[Logs]    [11/11/2022, 10:45:07 AM] Service exited 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:07 AM] Killed service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:08 AM] Installing service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:09 AM] Installed service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:09 AM] Starting service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:10 AM] Started service 'main sha256:2a357357dc8ac0cf055418c5d8e9ebfe6d499e5a8e6dfd378c76b1b355e8bf37'
[Logs]    [11/11/2022, 10:45:11 AM] [main]
[Logs]    [11/11/2022, 10:45:11 AM] [main] > balena-cli-advanced-masterclass@2.0.0 start
[Logs]    [11/11/2022, 10:45:11 AM] [main] > node helloworld.js; sleep infinity
[Logs]    [11/11/2022, 10:45:11 AM] [main]
[Logs]    [11/11/2022, 10:45:11 AM] [main] ---> LOG_DEBUG not set, no debug mode
[Logs]    [11/11/2022, 10:45:11 AM] [main] Hello world!
```

We're back to no debug logs again!

The balena CLI also allows you to rename environment variables, as well as set and remove them for specific devices instead of an entire Fleet. For device-based variables, most commands take an extra switch, `--device` which allows you to specify the UUID of the device you wish to make the variable change for.

### 5. Preloading and Preregistering

While for many cases provisioning a device, moving it to an installation location and then connecting it to a stable network with Internet access is fairly easy, there are times where a device may have to operate with a limited connection (for example a slow GSM connection). In these cases, installing a device and then attempting to download an initial application is not only slow but sometimes unachievable.

The way around this is to preload an application into an image that is then used to provision a device. Preloading injects the images required for the services that comprise the application, meaning that on device startup the Supervisor can immediately start running those services without having to first download the images from the balena registries.

Preloading on its own is a useful feature for ensuring devices are ready to start executing an application as soon as they're powered on, but for users who also want to ensure that they know about the devices that they're shipping it's only half the story.

Preregistering a device allows the creation of individually registered devices to a Fleet before those devices are ever physically powered on or connected to a network. This is extremely useful in situations such as manufacturing where a device may require tracking, as a specific device UUID can then be associated with a specific customer order, for example. This ensures that a customer then receives a device that already has information available
for it, for support, application updates, etc.

The following exercises will show you how to both preload and preregister devices.

#### 5.1 Preloading a Device Image

Note that `balena preload` actually uses a Docker container to carry out the actual preloading. This is to allow the system to be portable and run under Linux, macOS and Windows. As such, you'll need to ensure you've installed Docker on your development machine before going any further. Importantly, if Docker requires directories that can be bound to be explicitly defined, you'll need to ensure that you've added a parental root directory for any image that you want to preload (for example, if your image has a path of `/Work/images/my-image.img` then you'll either need to add `/Work` or `/Work/images` to Docker Desktop's File Sharing resources).

**Important Note:** Currently, Docker for Windows and Docker for Mac only ship with the 'overlay2' storage driver. This means that any Fleet image that does not use 'overlay2' as the storage driver can not be preloaded under these host platforms.

We'll take the current `cliFleet` Fleet and preload it with a new `balena-rpi4-image.img`. The `balena preload` command has a large number of switch options for catering to different situations, including the ability to use a particular release. However, for this exercise, we'll simply use the latest version of the code we previously pushed to `cliFleet`. In a terminal, execute the following:

```shell
$ balena os download raspberrypi4-64 --version 2022.10.0 --output balena-rpi4-image.img
$ balena os configure balena-rpi4-image.img --fleet cliFleet
$ balena preload balena-rpi4-image.img --fleet cliFleet --commit latest
Building Docker preloader image. [========================] 100%
/ Creating preloader container
\ Starting preloader container
- Fetching application cliFleet
| Reading image information
/ Resizing partitions and waiting for dockerd to start
Pulling 1 image [========================] 100%
\ Cleaning up temporary files
```

If we hadn't specified the `latest` commit, we'd have been given an interactive list of all of them to select from.

Now provision your device using the resulting image using `balena os initialize` or balenaEtcher. Once booted look at the logs for that device and notice that no download ocurred, and the Supervisor immediately started the preloaded application.

`balena preload` has a wealth of switches, and can modify the device significantly. It's well worth familiarizing yourself with the options [here](https://docs.balena.io/reference/balena-cli/latest/#preload).

#### 5.2 Preregistering a Device

The preregistering of a device involves a simple call with a unique identifier for the device. This identifier must be made up of hex characters and must be either 32 or 62 characters in length.

We'll generate a unique key for the device first, which we'll then use to modify the `config.json` in the `balena-rpi4-image.img` before writing this image to the SD card.

We'll verify that we're registering a device by first listing the devices currently associated with the `cliFleet` Fleet:

```shell
$ balena device list --fleet cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     FLEET          STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272981 0b9df5c average-darkness raspberrypi4-64 ryanh/clifleet Idle   true     14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/0b9df5cf5a21f8ae903b4e8eb0d94ad9/**summary**
```

First, generate a key. The `openssl` utility is fairly ubiquitous between both Linux and macOS (and in Windows is in most distributions compatible with Windows Subsystem for Linux), and this will allow us to create a suitable key:

```shell
$ openssl rand -hex 16
f494e3ff06df7dc5629208b2f2b01483
```

This gives us a random, 32 character UUID which we can now use to register a device that (hopefully) doesn't yet exist. In your terminal, execute the following:

```shell
$ balena device register cliFleet --uuid f494e3ff06df7dc5629208b2f2b01483
Registering to ryanh/clifleet: f494e3ff06df7dc5629208b2f2b01483
```

Note that if we had not used the `--uuid` switch, then a random UUID would have been generated and reported back to us.

Of course, our method of UUID generation, even though using `/dev/random`, is in no way guaranteed to be unique, so what if we regenerate the same UUID in another run? The API knows that each UUID must be unique, and if we were to try and register a UUID that already exists, it would be rejected. We can try this now:

```shell
$ balena device register cliFleet --uuid f494e3ff06df7dc5629208b2f2b01483
Registering to ryanh/clifleet: f494e3ff06df7dc5629208b2f2b01483
BalenaRequestError: Request error: "uuid" must be unique.
Additional information may be available with the `--debug` flag.
For further help or support, visit:
https://www.balena.io/docs/reference/balena-cli/#support-faq-and-troubleshooting
```

Now we'll look at the device list for the Fleet again:

```shell
$ balena device list --fleet cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     FLEET          STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272981 0b9df5c average-darkness raspberrypi4-64 ryanh/clifleet Idle   true      14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/0b9df5cf5a21f8ae903b4e8eb0d94ad9/summary
9273485 f494e3f tense-moon       raspberrypi4-64 ryanh/clifleet N/a    false     N/a                N/a                https://dashboard.balena-cloud.com/devices/f494e3ff06df7dc5629208b2f2b01483/summary
```

As you can see, we now have a newly registered device that has never been powered on.

The next step is to generate a configuration file that includes the UUID we've just generated, inject it into the preloaded device image and then provision a device with it, so that device uses the same UUID.

We'll use the command to generate a configuration as mentioned in a previous exercise:

```shell
$ balena config generate --version 2022.10.0 --device f494e3ff06df7dc5629208b2f2b01483 --network ethernet --appUpdatePollInterval 5 --output config.json
applicationId:         1988703
deviceType:            raspberrypi4-64
userId:                234385
appUpdatePollInterval: 300000
listenPort:            48484
vpnPort:               443
apiEndpoint:           https://api.balena-cloud.com
vpnEndpoint:           cloudlink.balena-cloud.com
registryEndpoint:      registry2.balena-cloud.com
deltaEndpoint:         https://delta.balena-cloud.com
mixpanelToken:         9ef939ea64cb6cd8bbc96af72345d70d
deviceApiKey:          tGoBWmSlaUcrnxWN2q1SujcgpG1UDWAk
registered_at:         1668183847
deviceId:              9273485
uuid:                  f494e3ff06df7dc5629208b2f2b01483
```

Note the extra switch option, `--device`, which allows us to pass our preregistered device UUID. Part of the configuration generation will assign a new internal ID for the device, and produce a configuration that can now be used by a device.

Now inject the configuration into the image:

```shell
$ balena os configure balena-rpi4-image.img --config config.json --device f494e3ff06df7dc5629208b2f2b01483
Configuring operating system image
```

Finally write it to the SD card, either using `balena os initialize` or balenaEtcher.

After it's been provisioned, power up the device again. You'll soon see our preregistered device come online:

```shell
$ balena device list --fleet cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     FLEET          STATUS IS ONLINE SUPERVISOR VERSION OS VERSION         DASHBOARD URL
9272981 0b9df5c average-darkness raspberrypi4-64 ryanh/clifleet Idle   false     14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/0b9df5cf5a21f8ae903b4e8eb0d94ad9/summary
9273485 f494e3f tense-moon       raspberrypi4-64 ryanh/clifleet Idle   true      14.0.14            balenaOS 2022.10.0 https://dashboard.balena-cloud.com/devices/f494e3ff06df7dc5629208b2f2b01483/summary
```

As before, the application will also start immediately as it was preloaded.

### 6. Updating balenaOS

As balena has an active Operating System team that is constantly adding new features and ensuring issues are resolved, it is common to see new versions of balenaOS be released. Host updates are available to any device running
an outdated version of balenaOS and this functionality is also available via balena CLI (although currently this is available _only_ for Production images). This allows fleet owners to upgrade to a newer version of the OS as fixes for issues or features they require for their application once they're available.

First, download an older version of a provisioning image for your device, for example v2.99.27 (Production edition, not Development), and then provision your device with it (either via balenaEtcher of `balena os initialize`).

Once the device is online and connected to the balenaCloud infrastructure,
verify this with:

```shell
$ balena device list --fleet cliFleet
ID      UUID    DEVICE NAME DEVICE TYPE     FLEET          STATUS IS ONLINE SUPERVISOR VERSION OS VERSION       DASHBOARD URL
9273603 b397534 still-sun   raspberrypi4-64 ryanh/clifleet Idle   true      14.0.8             balenaOS 2.99.27 https://dashboard.balena-cloud.com/devices/b3975341060c1c0f6297576092924fbf/summary
```

We'll now update the device to the latest version of balenaOS. We can do this
using the following command:

```shell
$ balena device os-update b397534 --version 2.106.2 --yes
Updating the OS of still-sun to v2.106.2 [========================] 100%
The device still-sun has been updated to v2.106.2 and will restart shortly!
```

If you look at the device in the balenaCloud dashboard whilst the command is executing, you'll see the progress as if you'd run the update from there (and obviously the balena CLI command also shows you the current progress).

If we hadn't passed the `--version` switch, balena CLI would have asked us to choose the version we wanted to update the device with. Additionally, the `--yes` switch ensures we are not interactively asked to confirm the update.

Finally, let's run `balena devices` again to see the new version of the device:

```shell
$ balena device list --fleet cliFleet
ID      UUID    DEVICE NAME DEVICE TYPE     FLEET          STATUS IS ONLINE SUPERVISOR VERSION OS VERSION       DASHBOARD URL
9273603 b397534 still-sun   raspberrypi4-64 ryanh/clifleet Idle   true      14.3.0             balenaOS 2.106.2 https://dashboard.balena-cloud.com/devices/b3975341060c1c0f6297576092924fbf/summary
```

## Conclusion

In this masterclass, you've learned how to use some of the more advanced
functionality that balena CLI offers. You should now be familiar and confident
enough with balena CLI to:

- Switch between balena environments, as well as move devices between them
  as well as different fleets
- Download, configure and provision device images using the balena CLI
- Modify environment and configuration variables for both fleets and devices
- Preregister a device with a balena environment
- preload a device provisioning image with a required version of an application for instant service startup
- Update a device from one version of balenaOS to another via the balena CLI
