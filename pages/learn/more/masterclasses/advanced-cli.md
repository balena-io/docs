# Balena CLI Advanced Masterclass

* **Masterclass Type:** Core
* **Maximum Expected Time To Complete:** 120 minutes

## Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes.
To gain the most from this masterclass, we recommend that you first undertake
the following masterclasses:

* [balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)

## Introduction

The balena Command Line Interface (balena CLI) utility consists of a number
of commands that allow a user to develop, deploy and manage balena fleets,
and devices.

The previous balena CLI masterclass covered some of the most common techniques
and topics. This masterclass aims to build on top of that, introducing you to
additional features that can be used to gain finer control over the
provisioning, deployment and management of devices.

In this masterclass, you will learn how to:

* Work with different balenaCloud environments
* Preconfigure and preregister downloaded images
* Preload downloaded images with your application code
* Update balenaOS programmatically

If you have any questions about this masterclass as you proceed through it,
or would like clarifications on any of the topics raised here, please do
raise an issue on the repository this file is contained in, or contact
us on the [balena forums](https://forums.balena.io/) where we'll be
delighted to answer your questions.

The location of the repository that contains this masterclass and all associated
code is
[https://github.com/balena-io/balena-cli-advanced-masterclass](https://github.com/balena-io/balena-cli-advanced-masterclass).

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

* A locally cloned copy of this repository
	[Balena CLI Advanced Masterclass](https://github.com/balena-io/balena-cli-advanced-masterclass)
	Either:
  * `git clone https://github.com/balena-io/balena-cli-advanced-masterclass.git`
  * Download ZIP file (from 'Clone or download'->'Download ZIP') and then
	unzip it to a suitable directory
* A balena supported device, such as a [balenaFin 1.1](https://store.balena.io/collections/developer-kit/products/balenafin-developer-kit-v1-1-cm3-l),
	[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
	or [Intel NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by
	installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/)
* A suitable text editor for developing code on your development platform (e.g.
    [Visual Code](https://code.visualstudio.com/))
* A suitable shell environment for command execution (such as `bash`)
* A [balenaCloud](https://dashboard.balena-cloud.com/signup) account, and a [balenaCloud staging](https://dashboard.balena-staging.com/signup) account
* A local installation of [Docker](https://docs.docker.com/v17.09/engine/installation/)
	as well as a familiarity with [Dockerfiles](https://docs.docker.com/engine/reference/builder/)
* Should you wish to install via `npm`, a [NodeJS](https://nodejs.org/en/)
	installation, including [NPM](https://www.npmjs.com/get-npm) is required.
	The use of [`nvm`](https://github.com/nvm-sh/nvm)
	is recommended, which allows you to alter the version of Node/NPM being used
	per-user, and also removes the need to install global dependencies using
	`sudo`

## Exercises

All of the following exercises assume that you are running the balena CLI from
a suitable Unix based shell. The exercises include commands which can be run
in such a shell, and are represented by a line prefixed with `$`. Information
returned from execution of a command may be appended under the line to show
what might be returned. For example:

```shell
$ balena version
11.11.2
```

### 1. Communicating with Alternative balena Environments

By default, the balena CLI communicates with the production balenaCloud instance,
using this environment to carry out operations such as fleet creation,
code pushing, etc.

However, there are alternative environments available, such as balena's staging
environment, where new service features are deployed and tested before being
approved for the production environment, or a self-hosted openBalena
environment.

There are a couple of ways to inform balena CLI that it should use a different
environment.

#### 1.1 Environment Variable

The easiest way to quickly ensure balena CLI uses an alternative environment to
that of production is to use the `BALENARC_BALENA_URL` environment variable.
In a terminal, execute the following command:

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

Just like the production server, each alternative environment will require a
login to allow balena CLI can operate. Login using your chosen method now.

Once logged in, successive uses of
`BALENARC_BALENA_URL=balena-staging.com balena` will use the saved token to
use the alternative environment, for example:

```shell
$ BALENARC_BALENA_URL=balena-staging.com balena apps
ID    APP NAME          DEVICE TYPE  ONLINE DEVICES DEVICE COUNT
12345 appOne            intel-nuc    0              0
12346 appTwo            iot2000      0              0
```

#### 1.2 Configuration File

Should you just wish to use balena CLI without specifying the environment to use
in an environment variable, you can use a configuration file instead.

By default, balena CLI looks for a configuration file in the user's home
directory. We can demonstrate configuring balena CLI for an alternative
environment by creating a new file as `~/.balenarc.yml` and then filling
it with the following information:

```yaml
balenaUrl: 'balena-staging.com'
```

Now try listing the apps from the staging environment again:

```shell
$ balena apps
ID    APP NAME          DEVICE TYPE  ONLINE DEVICES DEVICE COUNT
12345 appOne            intel-nuc    0              0
12346 appTwo            iot2000      0              0
```

Two things have happened here. The first is that balena CLI has found and used
the new balena environment URL from the `~/.balenarc.yml` configuration file.
The second is that it has used the token previously retrieved from logging in
to the staging environment using the environment variable.

Token files are saved separately and can be found in the user's home directory
(for example under Linux, macOS and Windows Subsystem for Linux, in
`~/.balena/token`).

#### 1.3 Separate Environment Configurations

Usually when logging into an environment, the user's configuration file and
token files are used to ensure successive commands use this information to
authenticate the commands being executed.

However, there are operations where sometimes it is desirable to switch between
environments (for example when testing new features available on staging but
not production).

To enable this, balena CLI includes the ability to use a configuration file in
the current working directory (CWD) to determine which environment to use,
as well as to point to alternative data directories where authentication
(login) tokens are stored.

When a configuration file is found in the current working directory, the CLI
merges it with all other configuration sources, such as the `~/.balenarc.yml`
file in the home dir. Settings defined in the `balenarc.yml` file in the current
working directory take precedence over settings defined in `~/.balenarc.yml`.

To demonstrate using different configuration files for different environments,
in your home directory, create two directories called `balenaProduction` and
`balenaStaging`, and then fill in separate configuration files in each
directory. The following commands will do this for you:

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

Note that we do *not* prefix the `balenarc.yml` file with a `.` to avoid hiding
it. Note also that some lines above use `'>'` and others use `'>>'` as the shell
redirection operator (the former creates a new file, and the latter appends to
an existing file).

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

Login using your preferred method. Note that a new `token` file now exists in
the `~/balenaProduction` directory. Now login to the staging directory, using
the staging configuration directory:

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

You can now switch between environments by changing directory to the one
with the relevant `balenarc.yml` and `token` file, which will allow you
to use either environment without any further authentication:

```shell
$ cd ~/balenaStaging
$ balena apps
ID    APP NAME          DEVICE TYPE  ONLINE DEVICES DEVICE COUNT
12345 appOne            intel-nuc    0              0
12346 appTwo            iot2000      0              0

$ cd ~/balenaProduction
$ balena apps
ID      APP NAME         DEVICE TYPE      ONLINE DEVICES DEVICE COUNT
54321   artik530         artik533s        0              0
54322   bob              intel-nuc        0              0
54323   bbbtest          beaglebone-black 0              0
```

For the purposes of this document, we have chosen `'.'` (the current working
directory) as the value for the `dataDirectory` property in the `balenarc.yml`
file, but you could of course choose different directories such as, for example,
`/home/joe/.balena/production` and `/home/joe/.balena/staging`. If this property
is not specified, the default data directory is `.balena` or `_balena`
(respectively on Linux/macOS and Windows) in the user's home directory.

> Watch out! The tilde character (`'~'`) is not resolved to the homedir when
> used inside a `balenarc.yml` file. Use the full directory such as `/home/joe/`
> instead of the tilde.

It is also worth noting that the CLI accepts the `BALENARC_DATA_DIRECTORY`
environment variable as an alternative to the `dataDirectory` property in the
`balenarc.yml` file. For example, the following command would allow the CLI to
use the staging settings and token even if the current working directory was not
`~/balenaStaging`:

```shell
$ cd /tmp
$ BALENARC_BALENA_URL=balena-staging.com \
  BALENARC_DATA_DIRECTORY=~/balenaStaging \
  balena whoami
```

We'll be using the two separate environments (staging and production) in the
next set of exercises to show you how devices can be moved between fleets
and environments. Don't delete them just yet!

### 2. Moving Devices between Fleets and Environments

Usually you'll provision a device that will exist on a particular balena
fleet or environment, as the lifecycle of that device, will only make
sense within that fleet.

However, there are times where it is useful to be able to move a device either
from one fleet to another (for example when a major rewrite of your
application occurs that is no longer backwards compatible with a prior version)
or from one environment to another (perhaps you've created a locally hosted
test environment using openBalena and now want to move from your test
environment to the production environment of balenaCloud).

The following exercises will show you how to carry this out.

#### 2.1 Moving Devices between Fleets

Moving a device to another fleet in the same environment is extremely
easy. To demonstrate this, first create a new fleet for the balenaFin:

```shell
$ cd ~/balenaProduction
$ balena fleet create altFleet --type fincm3
Application created: altFleet (fincm3, id 987654)
```

We should already have a device connecting to our previous 'cliFleet' (from the
previous
[balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)). See the
[Creating an Application and Provisioning a Device](https://github.com/balena-io/balena-cli-masterclass#2-creating-an-application-and-provisioning-a-device)
section to create an application and provision a device against it, if you
haven't already done so, and wish to follow this exercise. Once a device
is provisioned against the `cliFleet` application and online, execute the
following command:

```shell
$ cd ~/balenaProduction
$ balena devices
ID      UUID    DEVICE NAME          DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE
1234556 7654321 weathered-wildflower fincm3          cliFleet           Idle   false     9.15.7             balenaOS 2.38.0+rev1 https://dashboard.balena-cloud.io/devices/1234567890abcdef/summary
```

To interactively determine which Fleet to move a device to, simply use
its UUID with the `balena device move` command:

```shell
$ cd ~/balenaProduction
$ balena device move 7654321
? Select an application (Use arrow keys)
❯ altFleet (fincm3)
  anotherFleet (raspberry-pi)
```

As you can see, only Fleets that support the device type of the device that is being moved are available. For non-interactive movement, simply pass the
optional `--application` switch to the command with the relevant Fleet
name:

```shell
$ cd ~/balenaProduction
$ balena device move 94095f8 --application altFleet
94095f8 was moved to altFleet
```

A call of `balena device` specifying the UUID of the moved device will now
show it is owned by the specified Fleet:

```shell
$ cd ~/balenaProduction
$ balena device 7654321
== WEATHERED WILDFLOWER
ID:                 1693707
DEVICE TYPE:        fincm3
STATUS:             idle
IS ONLINE:          true
IP ADDRESS:         192.168.1.171 192.168.1.169
APPLICATION NAME:   altApp
UUID:               76543217654321765432176543217654
COMMIT:             7efbc95825641b6482742a54c8e74010
SUPERVISOR VERSION: 9.15.7
IS WEB ACCESSIBLE:  false
OS VERSION:         balenaOS 2.38.0+rev1
DASHBOARD URL:      https://dashboard.balena-cloud.com/devices/76543217654321765432176543217654/summary
```

The Supervisor on the device will remove any previously running services, as
well as their images and any volumes associated with them and download the
images associated with the new Fleet before starting them.

#### 2.2 Moving Devices between Environments

Moving a device between balena environments is slightly more involved,
and differs depending on whether you're using a device running a development
or production image.

##### 2.2.1 Development Devices

For a device running a development image, you can use `balena leave` and
`balena join` to carry this out.

First, provision a device using a development image. You can do this using
the balenaCloud dashboard and downloading a 'Development' edition image from
the `cliFleet` Fleet page. Provision your balenaFin with this image
using either [balenaEtcher](https://www.balena.io/etcher/) or [balena CLI](#imagewriting).

Once the device is provisioned and has connected to the balena network,
discover its hostname or IP address by using `balena devices`:

```shell
$ cd ~/balenaProduction
$ balena devices
ID      UUID    DEVICE NAME      DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1234567 7654321 little-paper     fincm3          cliFleet           Idle   true      9.15.7             balenaOS 2.38.0+rev1 https://dashboard.balena-cloud.com/devices/76543217654321765432176543217654/summary

$ balena device 7654321
== LITTLE PAPER
ID:                 1234567
DEVICE TYPE:        fincm3
STATUS:             idle
IS ONLINE:          true
IP ADDRESS:         192.168.1.171
APPLICATION NAME:   cliFleet
UUID:               76543217654321765432176543217654
COMMIT:             7efbc95825641b6482742a54c8e74010
SUPERVISOR VERSION: 9.15.7
IS WEB ACCESSIBLE:  false
OS VERSION:         balenaOS 2.38.0+rev1
DASHBOARD URL:      https://dashboard.balena-cloud.com/devices/76543217654321765432176543217654/summary
```

As we now have the local IP address for it, we can use this to call the command
to leave the balenaCloud environment:

```shell
$ cd ~/balenaProduction
$ balena leave 192.168.1.171
[Success] Device successfully left the platform.
```

The device now becomes *unmanaged*. This means it acts in the same way as
a device that has been provisioned with an unconfigured balenaOS image, for
example one that has been downloaded from
[https://www.balena.io/os/#download](https://www.balena.io/os/#download).

We can now join a different balena environment by using balena CLI to login
to it. As we previously did this for our staging environment, we can simply
use the data and tokens we saved for this by changing directories and using
the other environment information. We'll now create a new Fleet on the
staging environment to move the device to:

```shell
$ cd ~/balenaStaging
$ balena app create stagingCliFleet --type fincm3
Application created: stagingCliFleet (fincm3, id 97654)
```

Finally, we'll issue a command to the now unmanaged device to join the staging
environment and the `stagingCliFleet` Fleet:

```shell
$ cd ~/balenaStaging
$ balena join 192.168.1.171 --application stagingCliFleet
? Check for updates every X minutes 10
[Success] Device successfully joined balena-staging.com!
```

We can now check the devices on the staging environment to ensure it's joined
successfully:

```shell
$ cd ~/balenaStaging
$ balena devices
ID     UUID    DEVICE NAME      DEVICE TYPE  APPLICATION NAME  STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
876542 3456789 purple-snowflake fincm3       stagingCliFleet     Idle   true      9.15.7             balenaOS 2.38.0+rev1 https://dashboard.balena-staging.com/devices/3456789345678934567893456789/summary
```

As can be seen, it's been given a new name and UUID.

If we hadn't specified the Fleet to join, we would have seen an
interactive list of all the Fleets on the staging environment:

```shell
$ cd ~/balenaStaging
$ balena join 192.168.1.171
? Select application
❯ heds/artik530
  heds/orangepi
  heds/stagingclifleet
  heds/switchapp
  heds/vpn-changed
```

Note that the Fleets listed are not all of the `fincm3` device type, but
share a common architecture, so this could be `aarch64`, `armv7hf` or `armv6`
for the Fin. You should be very careful when selecting a Fleet of a
different device type, as you may find issues when the device attempts to run
the application code for a device without the same peripherals or system-on-chip
layout.

##### 2.2.2 Production Devices

>>> THIS WILL NOT WORK FOR A PRODUCTION DEVICE, BECAUSE AS SOON AS YOU USE
    `os-config leave` YOU BECOME LOCKED OUT OF THE DEVICE

	https://github.com/balena-io/balena-cli/issues/1319

	`os-config join` appears to accept a config.json, but using one from
    a downloaded provisioning image does not work, eg:
    root@12dc2e5:~# os-config join {"applicationName":"switchapp","applicationId":"96231","deviceType":"fincm3","userId":"299","username":"heds","appUpdatePollInterval":"600000","listenPort":"48484","vpnPort":"443","apiEndpoint":"https://api.balena-staging.com","vpnEndpoint":"vpn.balena-staging.com","registryEndpoint":"registry2.balena-staging.com","deltaEndpoint":"https://delta.balena-staging.com","pubnubSubscribeKey":"","pubnubPublishKey":"","mixpanelToken":"cb974f32bab01ecc1171937026774b18","apiKey":"Dfk7XWZFZRi52TVoAtmFwLAQP9cqDJSP"}
    error: Found argument 'applicationId:96231' which wasn't expected, or isn't valid in this context

    USAGE:
        os-config join <JSON_CONFIG>

balena CLI offers `balena leave` to disconnect a device from a balena environment
and `balena join` to join a different target environment. However, this
currently only works on development devices due to an issue with the way that
balena CLI carries this out internally. Because of this, the following exercise
offers a solution for production devices (as balena CLI only currently allows
the download of production images), which will also work on development
devices. Future updates will move wholly to the balena CLI methodology.

>>> END

### 3. Downloading and Configuring a Provisioning Image using balena CLI

In the previous balena CLI masterclass, we provisioned an image by using the
balenaCloud dashboard to download an image that could then be flashed to
appropriate media (or directly to a device).

balena CLI also allows you to do this, but includes some powerful functionality
that allows the modification of images.

The following exercises will introduce this functionality and provide some
examples of suitable use cases.

However, to start with, as we're not going to use separate environments again,
we'll remove the previous setups for production and staging environments and
move back to a single set of environment configuration files.

```shell
$ cd ~
$ rm -rf balenaStaging
$ rm -rf balenaProduction
$ balena login
```

Use your preferred login method to recreate a `~/.balenarc.yml` and
`~/.balena/token` file in your home directory.

#### 3.1 Downloading a Provisioning Image

Downloading an image via balena CLI requires you to specify the type of device
the image downloaded should be suitable for, and optionally the OS version the
image should use and output path.

We'll use the balenaCloud environment again, so first change back to the
root repository for this masterclass and login to balenaCloud, for example:

```shell
$ cd ~/balena-cli-advanced-masterclass
```

Now we'll download the latest balenaOS image for the balenaFin, and determine
the filename that it will be saved as:

```shell
$ balena os download fincm3 --version 2.38.0+rev1 --output balena-fin-image.img
```

Notice that we've passed the  `--version` switch to the command, which tells
balena CLI to download a specific version of balenaOS for the device. The
parameter can take a variety of forms such as a specific version, a version
greater or equal to that given, etc. See the full range of options available by
using `balena os download --help`. If we had not specified a version, then
the latest version of balenaOS for the device type would have been downloaded.

#### 3.2 Configuring a Provisioning Image

A downloaded balenaOS image via balena CLI is unconfigured, so to allow a device
to use it as a provisioning image we need to specify, at a minimum, which
Fleet the device should be associated with.

There are a few ways to achieve this. The simplest is to configure it
interactively, passing either a Fleet name or device UUID so that
the relevant Fleet can be determined:

```shell
$ balena os configure balena-fin-image.img --app cliApp
Configuring operating system image
? Network Connection (Use arrow keys)
❯ ethernet
  wifi
```

Should you select `wifi`, then you'll be asked to enter the wireless SSID (and
credentials for that network) that a device should connect to once booted.

The downloading image will now be configured (with AP details if required)
and is ready to flash the balenaFin with.

There's another way to produce complete configured images for provisioning
a device with, which is to produce a configuration and then injecting that
configuration into a bare OS image.

This allows multiple configs to be generated, for example for different
Fleets, and then using copies of a bare OS image of a particular version
to prepare images for each of those apps.

You can generate independent configuration files using the
`balena config generate` command. A mandatory OS version must be passed to this
command, with either an Fleet name or device UUID. It will interactively
ask for more details:

```shell
$ balena config generate --version 2.38.0+rev1 --application cliApp
? Network Connection (Use arrow keys)
❯ ethernet
  wifi
```

However, in most situations where you wish to programmatically define a set of
configurations, you can use other switches to do so. We'll use the `--output`
switch to write a JSON configuration, and a few of the network configuration
switches to ensure it connects to a Wifi Access Point on startup. In the
following command, ensure you replace the values for `--wifiKey` and
`--wifiSsid` with values for your local network's Access Point:

```shell
$ balena config generate --version 2.38.0+rev1 --application cliFleet --appUpdatePollInterval 10 --network wifi --wifiSsid MyNetworkSSID --wifiKey myw1f1n3tw0rk -o wifi-config.json
```

This will generate a new JSON file in the current directory. We'll now use this
to write to the downloaded image. Ensure you have an unconfigured image, such
as the one we downloaded previously:

```shell
$ balena os configure --application cliFleet --config wifi-config.json balena-fin-image.img
Configuring operating system image
```

If you want to use the same downloaded image for each new configuration, first
make an uninitialized copy of the image, which itself can then be copied for
each configuration you wish to initialize the image with.

#### 3.3 Writing a Configured Image

balena are the authors of [balenaEtcher](https://www.balena.io/etcher/) which
has fast become the preferred way for millions of users across the world to
write OS images to different media. However, there are times where
non-interactively writing an image is desired, especially in a test or
manufacturing environment, where device media on a large number of devices
need writing without any interactive involvement.

Luckily, balena CLI includes functionality to write a provisioning image to
any attached, valid media that is exposed as a drive on the host machine.

We'll use the previously configured balenaFin image as our provisioning image.
Connect a balenaFin for flashing to your development machine (do this by
attaching a microUSB cable to your machine from the balenaFin, and then powering
up the Fin). Alternatively, insert an SD card/USB stick/etc. into your
development machine if using a different device type. This will expose a device
node or mount point, referred to in balena CLI as a 'drive', depending on the OS
you're running. You can discover which drive has been assigned by running
the following:

```shell
$ balena util available-drives
DEVICE     SIZE      DESCRIPTION
/dev/disk2 1000.2 GB Seagate BUP Slim BL Media
/dev/disk4 63.6 GB   Compute Module
```

As you can see, the balenaFin is attached to drive `/dev/disk4`. We can now use
another balena CLI command to write the configured image to that drive, which
will provision the device:

```shell
$ balena os initialize balena-fin-image.img --type fincm3 --drive /dev/disk4 --yes
Initializing device

Note: Initializing the device may ask for administrative permissions
because we need to access the raw devices directly.
Going to erase /dev/disk4.
Admin privileges required: you may be asked for your computer password to continue.
Password:
Writing Device OS [========================] 100% eta 0s
Validating Device OS [========================] 100% eta 0s
You can safely remove /dev/disk4 now
```

Note that you *must* supply the device type, although the drive to write to
is optional (but you will be asked interactively if you do not supply it).
The `--yes` switch indicates we do not want an interactive prompt confirming
we want to write to the drive (else a warning that you will wipe whatever is
on that drive and a confirmation prompt is given).

Once provisioned, reset the balenaFin by powering it off, removing the USB
cable from the host machine and then repowering the Fin. Shortly afterwards, it
will connect to balenaCloud:

```shell
$ balena devices
ID      UUID    DEVICE NAME          DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE
1234556 7654321 restless-glade       fincm3          cliFleet           Idle   false     9.15.7             balenaOS 2.38.0+rev1 https://dashboard.balena-cloud.io/devices/1234567890abcdef/summary
```

### 4. Configuring Environment Variables

Devices using balenaOS allow the use of dynamic environment variables which
may be updated remotely, altering the behavior of a service container.

For example, suppose that we had a production device out in the field, which
is not behaving as expected. We may want to enable extra debugging by setting
an environment variable dynamically that will get picked up by the device
and start verbose logging.

We'll start by pushing code to our balenaFin, reusing our previous `cliFleet`
Fleet but using the code from this masterclass:

```shell
$ balena push cliFleet
[Info]     Starting build for cliFleet, user heds
[Info]     Dashboard link: https://dashboard.balena-cloud.com/apps/1234567/devices
[Info]     Building on arm01
[Info]     Pulling previous images for caching purposes...
[Success]  Successfully pulled cache images
[main]     Step 1/6 : FROM balenalib/fincm3-node:8
[main]      ---> 43d29490f34a
[main]     Step 2/6 : WORKDIR /usr/src/app
[main]      ---> Running in e1e643eb590c
[main]     Removing intermediate container e1e643eb590c
[main]      ---> a1bf0010640e
[main]     Step 3/6 : COPY package.json package-lock.json ./
[main]      ---> 47b9589ea63e
[main]     Step 4/6 : RUN npm install --ci --production     && npm cache clean --force     && rm -f /tmp/*
[main]      ---> Running in 4d780139b2de
[main]     up to date in 0.789s
[main]     found 0 vulnerabilities
[main]     npm
[main]
[main]     WARN
[main]     using --force I sure hope you know what you are doing.
[main]
[main]     Removing intermediate container 4d780139b2de
[main]      ---> c699891127f9
[main]     Step 5/6 : COPY src/ ./src/
[main]      ---> 5281bad5c22c
[main]     Step 6/6 : CMD ["npm", "start"]
[main]      ---> Running in fe8c19c23718
[main]     Removing intermediate container fe8c19c23718
[main]      ---> 876b82c76b73
[main]     Successfully built 876b82c76b73
[Info]     Uploading images
[Success]  Successfully uploaded images
[Info]     Built on arm01
[Success]  Release successfully created!
[Info]     Release: 43260e126fc78d14d9edb1dbede38e61 (id: 1068171)
[Info]     ┌─────────┬────────────┬────────────┐
[Info]     │ Service │ Image Size │ Build Time │
[Info]     ├─────────┼────────────┼────────────┤
[Info]     │ main    │ 211.82 MB  │ 5 seconds  │
[Info]     └─────────┴────────────┴────────────┘
[Info]     Build finished in 22 seconds
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

Once built and pushed to the balenaFin, you should see the following logs:

```shell
$ balena logs 1234567
[Logs]    [9/17/2019, 10:55:21 AM] Installing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:55:21 AM] Installed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:55:21 AM] Starting service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:55:23 AM] Started service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:55:24 AM] [main]
[Logs]    [9/17/2019, 10:55:24 AM] [main] > balena-cli-advanced-masterclass@1.0.0 start /usr/src/app
[Logs]    [9/17/2019, 10:55:24 AM] [main] > node src/helloworld.js; sleep infinity
[Logs]    [9/17/2019, 10:55:24 AM] [main]
[Logs]    [9/17/2019, 10:55:24 AM] [main] ---> LOG_DEBUG not set, no debug mode
[Logs]    [9/17/2019, 10:55:24 AM] [main] Hello world!
```

As you can see, it looks like if we set the `LOG_DEBUG` environment variable,
we'll get some debug logging (If you don't see this message ensure you are pushing the code from this masterclass, and not `balena-cli-masterclass`!). So let's use `balena env` to do this:

```shell
$ balena env add LOG_DEBUG true --application cliFleet
```

Now go to the dashboard for the `cliFleet` Fleet, and select 'Environment
Variables'. 'Add' a new variable, called `DASH_VAR` and set it to `from-dash`.
To verify we've now set our variables, let's use `balena envs` which will show
all the environment variables set for our Fleet:

```shell
$ balena envs --application cliFleet
ID     NAME      VALUE
123456 DASH_VAR  from-dash
654321 LOG_DEBUG true
```

As you can see, both variables now show up in our list.
However, if we now list the logs for the balenaFin, we'll see something else:

```shell
$ balena logs 1234567
[Logs]    [9/17/2019, 10:55:24 AM] [main] Hello world!
[Logs]    [9/17/2019, 10:57:34 AM] Killing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:35 AM] Service exited 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:35 AM] Killed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:35 AM] Installing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:36 AM] Installed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:36 AM] Starting service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:37 AM] Started service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 10:57:39 AM] [main]
[Logs]    [9/17/2019, 10:57:39 AM] [main] > balena-cli-advanced-masterclass@1.0.0 start /usr/src/app
[Logs]    [9/17/2019, 10:57:39 AM] [main] > node src/helloworld.js; sleep infinity
[Logs]    [9/17/2019, 10:57:39 AM] [main]
[Logs]    [9/17/2019, 10:57:39 AM] [main] ---> This is debug mode!
[Logs]    [9/17/2019, 10:57:39 AM] [main] Hello world!
```

When we set the environment variable, the Supervisor on the device noted that
the value had been added and restarted the service container to ensure the
new environment variable was set, as a result we now see the extra debug log
text `[main] ---> This is debug mode!`.
This also occurs whenever the value of an environment variable is changed,
or the environment variable is deleted. We'll try this now, by specifying the
ID of the variable we want to remove:

```shell
$ balena env rm 654321 --yes
$ balena envs --application cliFleet
ID     NAME      VALUE
123456 DASH_VAR  from-dash
```

Note that we used the `--yes` switch to force the deletion of the variable.
Without this, we would have been asked interactively to confirm the deletion.
Wait a little while to let the Supervisor see that the environment variable
has been deleted, and then look at the logs again:

```shell
$ balena logs 1234567
[Logs]    [9/17/2019, 11:06:37 AM] Killing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:38 AM] Service exited 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:38 AM] Killed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:38 AM] Installing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:39 AM] Installed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:39 AM] Starting service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:40 AM] Started service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/17/2019, 11:06:42 AM] [main]
[Logs]    [9/17/2019, 11:06:42 AM] [main] > balena-cli-advanced-masterclass@1.0.0 start /usr/src/app
[Logs]    [9/17/2019, 11:06:42 AM] [main] > node src/helloworld.js; sleep infinity
[Logs]    [9/17/2019, 11:06:42 AM] [main]
[Logs]    [9/17/2019, 11:06:42 AM] [main] ---> LOG_DEBUG not set, no debug mode
[Logs]    [9/17/2019, 11:06:42 AM] [main] Hello world!
```

We're back to no debug logs again!

The balena CLI also allows you to rename environment variables, as well as set
and remove them for specific devices instead of an entire Fleet.
For device-based variables, most commands take an extra switch, `--device`
which allows you to specify the UUID of the device you wish to make the
variable change for.

### 5. Preloading and Preregistering

Whilst for many cases provisioning a device, moving it to an installation
location and then connecting it to a stable network with Internet access is
fairly easy, there are times where a device may have to operate with a limited
connection (for example a slow GSM connection). In these cases, installing
a device and then attempting to download an initial application is not only
slow but sometimes unachievable.

The way round this is to preload an application into an image that is then
used to provision a device. Preloading injects the images required for
the services that comprise the application, meaning that on device startup
the Supervisor can immediately start running those services without having
to first download the images from the balena registries.

Preloading on its own is a useful feature for ensuring devices are
ready to start executing an application as soon as they're powered on, but for
users who also want to ensure that they know about the devices that they're
shipping it's only half the story.

Preregistering a device allows the creation of individually registered devices
to a Fleet before those devices are ever physically powered on or
connected to a network. This is extremely useful in situations such as
manufacturing where a device may require tracking, as a specific device UUID can
then be associated with a specific customer order, for example. This ensures
that a customer then receives a device that already has information available
for it, for support, application updates, etc.

The following exercises will show you how to both preload and preregister
devices.

#### 5.1 Preloading a Device Image

Note that `balena preload` actually uses a Docker container to carry out the
actual preloading. This is to allow the system to be portable and run under
Linux, macOS and Windows. As such, you'll need to ensure you've installed
Docker on your development machine before going any further. Importantly, if
Docker requires directories that can be bound to be explicitly defined, you'll
need to ensure that you've added a parental root directory for any image that
you want to preload (for example, if your image has a path of
`/Work/images/my-image.img` then you'll either need to add `/Work` or
`/Work/images` to Docker Desktop's File Sharing resources).

**Important Note:** Currently, Docker for Windows and Docker for Mac only
	ship with the 'overlay2' storage driver. This means that any Fleet
	image that does not use 'overlay2' as the storage driver (including those
	for the balena Fin), can not be preloaded under these host platforms.

We'll take the current `cliFleet` Fleet and preload it into the same
`balena-fin-image.img` image we earlier configured and provisioned our device
with. The `balena preload` command has a large number of switch options for
catering with different situations, including the ability to use a particular
release. However, for this exercise, we'll simply use the latest version of
the code we previously pushed to `cliFleet`. In a terminal, execute the following:

```shell
$ balena preload balena-fin-image.img --app cliFleet --commit latest
Building Docker preloader image. [========================] 100%
/ Creating preloader container
\ Starting preloader container
- Fetching application cliFleet
| Reading image information
/ Resizing partitions and waiting for dockerd to start
Pulling 1 image [========================] 100%
\ Cleaning up temporary files
```

If we hadn't specified the `latest` commit, we'd have been given an interactive
list of all of them to select from.

Now provision your balenaFin using the resulting image using
`balena os initialize` or balenaEtcher. Once booted look at the logs for that device:

```shell
$ balena logs 1234567
[Logs]    [9/18/2019, 1:11:42 PM] Supervisor starting
[Logs]    [9/18/2019, 1:11:43 PM] Applying configuration change {"SUPERVISOR_POLL_INTERVAL":"900000"}
[Logs]    [9/18/2019, 1:11:44 PM] Applied configuration change {"SUPERVISOR_POLL_INTERVAL":"900000"}
[Logs]    [9/18/2019, 1:11:45 PM] Creating network 'default'
[Logs]    [9/18/2019, 1:11:45 PM] Creating volume 'resin-data'
[Logs]    [9/18/2019, 1:11:45 PM] Installing service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/18/2019, 1:11:46 PM] Installed service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/18/2019, 1:11:46 PM] Starting service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/18/2019, 1:11:47 PM] Started service 'main sha256:4e11240a66e7e86f38f0ccf9a806a079c4181d446bc026d6b62b83981781737b'
[Logs]    [9/18/2019, 1:11:50 PM] [main]
[Logs]    [9/18/2019, 1:11:50 PM] [main] > balena-cli-advanced-masterclass@1.0.0 start /usr/src/app
[Logs]    [9/18/2019, 1:11:50 PM] [main] > node src/helloworld.js; sleep infinity
[Logs]    [9/18/2019, 1:11:50 PM] [main]
[Logs]    [9/18/2019, 1:11:51 PM] [main] ---> LOG_DEBUG not set, no debug mode
[Logs]    [9/18/2019, 1:11:51 PM] [main] Hello world!
```

As can be seen, no download occurred for the device, but the Supervisor
immediately started the preloaded application.

`balena preload` has a wealth of switches, and can modify the device
significantly. It's well worth familiarizing yourself with the options
[here](https://github.com/balena-io/balena-cli/blob/master/docs/balena-cli.md#preload).

#### 5.2 Preregistering a Device

The preregistering of a device involves a simple call with a unique identifier
for the device. This identifier must be made up of hex characters and must be
either 32 or 62 characters in length.

We'll generate a unique key for the device first, which we'll then use to
modify the `config.json` in our `balena-fin-image.img` before writing this
image to the balenaFin.

We'll verify that we're registering a device by first listing the devices
currently associated with the `cliFleet` Fleet:

```shell
$ balena devices --application cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1696632 f1dd777 empty-sun        fincm3          cliTest          Idle   false     10.2.2             balenaOS 2.41.0+rev4 https://dashboard.balena-cloud.com/devices/12345678901234567890123456789012/summary
```

First, generate a key. The `openssl` utility is fairly ubiquitous between
both Linux and macOS (and in Windows is in most distributions compatible with
Windows Subsystem for Linux), and this will allow us to create a suitable key:

```shell
$ openssl rand -hex 16
6053dab8dc4721ed288c8dfc79e52967
```

This gives us a random, 32 character UUID which we can now use to register a
device that (hopefully) doesn't yet exist. In your terminal, execute the
following:

```shell
$ balena device register cliFleet --uuid 6053dab8dc4721ed288c8dfc79e52967
Registering to cliFleet: 6053dab8dc4721ed288c8dfc79e52967
```

Note that if we had not used the `--uuid` switch, then a random UUID would have
been generated and reported back to us.

Of course, our method of UUID generation, even though using `/dev/random`, is
in no way guaranteed to be unique, so what if we regenerate the same UUID in
another run? The API knows that each UUID must be unique, and if we were to try
and register a UUID that already exists, it would be rejected. We can try this
now:

```shell
$ balena device register cliFleet --uuid 6053dab8dc4721ed288c8dfc79e52967
BalenaRequestError: Request error: "uuid" must be unique.
```

Now we'll look at the device list for the Fleet again:

```shell
$ balena devices --application cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1696632 f1dd777 empty-sun        fincm3          cliTest          Idle   false     10.2.2             balenaOS 2.41.0+rev4 https://dashboard.balena-cloud.com/devices/12345678901234567890123456789012/summary
6053dab 93b40bc late-sunset raspberrypi4-64 pi4test                 false                                             https://dashboard.balena-cloud.com/devices/6053dab8dc4721ed288c8dfc79e52967/summary
```

As you can see, we now have a newly registered device that has never been
powered on.

The next step is to generate a configuration file that includes the UUID we've
just generated, inject it into the preloaded device image and then provision
a device with it, so that device uses the same UUID.

We'll use the command to generate a configuration as mentioned in a previous
exercise:

```shell
$ balena config generate --app cliFleet --version 2.38.0+rev1 --device 6053dab8dc4721ed288c8dfc79e52967 --network ethernet --appUpdatePollInterval 10 --output config.json
```

Note the extra switch option, `--device`, which allows us to pass our
preregistered device UUID. Part of the configuration generation will assign
a new internal ID for the device, and produce a configuration that can now
be used by a device.

Now inject the configuration into the image:

```shell
$ balena os configure balena-fin-image.img --config config.json --device 6053dab8dc4721ed288c8dfc79e52967
Configuring operating system image
```

Finally write it to the balenaFin, either using `balena os initialize` or
balena Etcher.

After it's been provisioned, power up the balenaFin. You'll soon see our
preregistered device come online:

```shell
$ balena devices --application cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE     APPLICATION NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1696632 f1dd777 empty-sun        fincm3          cliTest          Idle   false     10.2.2             balenaOS 2.41.0+rev4 https://dashboard.balena-cloud.com/devices/12345678901234567890123456789012/summary
1699866 93b40bc late-sunset      fincm3          cliFleet           Idle   true      10.2.2             balenaOS 2.41.0+rev4 https://dashboard.balena-cloud.com/devices/93b40bc440cfccc6d45fa8db4a777a06/summary
```

As before, the application will also start immediately as it was preloaded.

### 6. Updating balenaOS

As balena has an active Operating System team that is constantly adding new
features and ensuring issues are resolved, it is common to see new versions
of balenaOS be released. Host updates are available to any device running
an outdated version of balenaOS and this functionality is also available
via balena CLI (although currently this is available *only* for Production
images). This allows fleet owners to upgrade to a newer version of the OS
as fixes for issues or features they require for their application once
they're available.

First, download an old version of a provisioning image for the balenaFin,
for example v2.36.0+rev2 (Production, not Development), and then provision
your balenaFin with it (either via balenaEtcher of `balena os initialize`).

Once the device is online and connected to the balenaCloud infrastructure,
verify this with:

```shell
$ balena devices --application cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE  FLEET NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1696632 f1dd777 empty-sun        fincm3          cliTest          Idle   false      9.14.0             balenaOS 2.36.0+rev2 https://dashboard.balena-cloud.com/devices/12345678901234567890123456789012/summary
```

We'll now update the device to the latest version of balenaOS. We can do this
using the following command:

```shell
$ balena device os-update f1dd777 --version 2.38.0+rev1.prod --yes
Updating the OS of empty-sun to v2.38.0+rev1.prod [======================  ] 90%
The device empty-sun has been updated to v2.38.0+rev1.prod and will restart shortly!
```

If you look at the device in the balenaCloud dashboard whilst the command is
executing, you'll see the progress as if you'd run the update from there (and
obviously the balena CLI command also shows you the current progress).

If we hadn't passed the `--version` switch, balena CLI would have asked us to
choose the version we wanted to update the device with. Additionally, the
`--yes` switch ensures we are not interactively asked to confirm the update.

Finally, let's run `balena devices` again to see the new version of the device:

```shell
$ balena devices --fleet cliFleet
ID      UUID    DEVICE NAME      DEVICE TYPE  FLEET NAME STATUS IS ONLINE SUPERVISOR VERSION OS VERSION           DASHBOARD URL
1696632 f1dd777 empty-sun        fincm3          cliTest          Idle   false     9.15.7             balenaOS 2.38.0+rev1 https://dashboard.balena-cloud.com/devices/12345678901234567890123456789012/summary
```

## Conclusion

In this masterclass, you've learned how to use some of the more advanced
functionality that balena CLI offers. You should now be familiar and confident
enough with balena CLI to:

* Switch between balena environments, as well as move devices between them
    as well as different fleets
* Download, configure and provision device images using balena CLI
* Modify environment and configuration variables, both fleet and device
    based
* Preregister a device with a balena environment, as well as preload a device
    provisioning image with a required version of an application for
    'instant startup'
* Update a device from one version of balenaOS to another via balena CLI