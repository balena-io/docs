# Balena Fleet Management Masterclass

- **Masterclass Type:** Core
- **Maximum Expected Time To Complete:** 90 minutes

## Prerequisite Classes

This masterclass builds upon knowledge that has been taught in previous classes. To gain the most from this masterclass, we recommend that you first undertake the following masterclasses:

- [balena CLI Masterclass](https://github.com/balena-io/balena-cli-masterclass)

## Introduction

This masterclass serves as an introduction to managing a fleet with balena. In this masterclass you will learn how to:

- Set configuration and variables.
- Tag and filter devices and releases.
- Use a release policy to pin fleets and devices to defined releases.
- Identify the different available roles for a user in balenaCloud.
- Obtain access tokens for interacting with the API, CLI, and SDKs.
- Describe best practices for fleets in a production environment.

If you have any questions about this masterclass as you proceed through it, or would like clarifications on any of the topics raised here, please do raise an issue as on the repository that contains this file, or contact us in the balena forums where we’ll be delighted to answer your questions.

The location of the repository that contains this masterclass and all associated code is [located here](https://github.com/balena-io/balena-fleet-management-masterclass).

## Hardware and Software Requirements

It is assumed that the reader has access to the following:

- A locally cloned copy of this repository [Balena Fleet Management Masterclass](https://github.com/balena-io/balena-fleet-management-masterclass). Either:
  - `git clone https://github.com/balena-io/balena-fleet-management-masterclass.git`.
  - Download ZIP file (from _Clone or download_->_Download ZIP_) and then unzip it to a suitable directory.
- A balena supported device, such as a [balenaFin 1.1](https://store.balena.io/products/balenafin-developer-kit-v1-1-cm3-l), [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Intel NUC](https://www.intel.co.uk/content/www/uk/en/products/boards-kits/nuc.html). If you don't have a device, you can emulate an Intel NUC by installing VirtualBox and following [this guide](https://www.balena.io/blog/no-hardware-use-virtualbox/) or by running balenaOS in a [Docker container](https://github.com/balena-os/balenaos-in-container) on your development machine.
- A suitable text editor for developing code on your development platform (e.g. [Visual Code](https://code.visualstudio.com/)).
- A suitable shell environment for command execution (such as `bash`).
- The [balena CLI](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md) tools installed.
- The [jq](https://stedolan.github.io/jq/download/) utility installed on the development machine.
- A [balenaCloud](https://www.balena.io/) account.
- A local installation of [Docker](https://docs.docker.com/v17.09/engine/installation/).

## Exercises

The exercises use a combination of the [balenaCloud dashboard](https://dashboard.balena-cloud.com/) (dashboard), [balena CLI](https://www.balena.io/docs/reference/cli/) (CLI) and [balena API](https://www.balena.io/docs/reference/api/overview/) (API). The exercises include commands which can be run in a shell and are represented by a line prefixed with `$`. Information returned from the execution of a command may be appended under the line to show the expected output. For example:

```bash
$ balena version
11.17.0
```

### 1. Fleet Setup

#### 1.1 Create Fleet and Provision a Device

For the following exercises, we need a fleet and a device to run the code. Create a fleet named _FleetMasterclass_ and device using either the [Getting Started Guide](https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/) (to use the dashboard) or the [CLI masterclass](https://github.com/balena-io/balena-cli-masterclass) (to use the CLI). Be sure to download a development image, and when the device has been provisioned, list the device(s) associated with the fleet using the `balena devices` command of the CLI.

```bash
$ balena devices --fleet FleetMasterclass
1750246 3a628fc frosty-wildflower raspberrypi4-64 FleetMasterclass      Idle   true      10.3.7             balenaOS 2.44.0+rev3 https://dashboard.balena-cloud.com/devices/3a628fcf6651dd61c94aef0fb88efee9/summary
```

You should see a device listed in the output. Take note of the device ID (`1750246`) and UUID (`3a628fc` in the example above) as we need these for the remainder of the exercises. For any issues using the CLI consult the [CLI masterclass](https://github.com/balena-io/balena-cli-masterclass).

#### 1.2 Push the First Release

Ensure you are in the base of the balena-fleet-masterclass repository, and use the CLI to push the first release.

```bash
$ balena push FleetMasterclass
[Info]     Starting build for FleetMasterclass, user gh_garethtdavies
[Info]     Dashboard link: https://dashboard.balena-cloud.com/apps/1550049/devices
[Info]     Building on arm01
[Info]     Pulling previous images for caching purposes...
[Success]  Successfully pulled cache images
[main]     Step 1/6 : FROM balenalib/raspberrypi4-64-python:3-stretch-run
[main]      ---> 80ed10cd539e
[main]     Step 2/6 : WORKDIR /usr/src/app
[main]      ---> Running in cc882c429498
[main]     Removing intermediate container cc882c429498
[main]      ---> 225a84f23f6a
[main]     Step 3/6 : COPY requirements.txt requirements.txt
[main]      ---> d3b90acd7a1f
[main]     Step 4/6 : RUN pip install -r requirements.txt
[main]      ---> Running in 409756ed0287
[main]     Collecting Flask==0.12.3
[main]       Downloading https://files.pythonhosted.org/packages/24/3e/1b6aa496fa9bb119f6b22263ca5ca9e826aaa132431fd78f413c8bcc18e3/Flask-0.12.3-py2.py3-none-any.whl (88kB)
[main]     Collecting itsdangerous>=0.21
[main]       Downloading https://files.pythonhosted.org/packages/76/ae/44b03b253d6fade317f32c24d100b3b35c2239807046a4c953c7b89fa49e/itsdangerous-1.1.0-py2.py3-none-any.whl
[main]     Collecting Jinja2>=2.4
[main]       Downloading https://files.pythonhosted.org/packages/65/e0/eb35e762802015cab1ccee04e8a277b03f1d8e53da3ec3106882ec42558b/Jinja2-2.10.3-py2.py3-none-any.whl (125kB)
[main]     Collecting Werkzeug>=0.7
[main]       Downloading https://files.pythonhosted.org/packages/ce/42/3aeda98f96e85fd26180534d36570e4d18108d62ae36f87694b476b83d6f/Werkzeug-0.16.0-py2.py3-none-any.whl (327kB)
[main]     Collecting click>=2.0
[main]       Downloading https://files.pythonhosted.org/packages/fa/37/45185cb5abbc30d7257104c434fe0b07e5a195a6847506c074527aa599ec/Click-7.0-py2.py3-none-any.whl (81kB)
[main]     Collecting MarkupSafe>=0.23
[main]       Downloading https://files.pythonhosted.org/packages/b9/2e/64db92e53b86efccfaea71321f597fa2e1b2bd3853d8ce658568f7a13094/MarkupSafe-1.1.1.tar.gz
[main]     Installing collected packages: itsdangerous, MarkupSafe, Jinja2, Werkzeug, click, Flask
[main]         Running setup.py install for MarkupSafe: started
[main]         Running setup.py install for MarkupSafe: finished with status 'done'
[main]     Successfully installed Flask-0.12.3 Jinja2-2.10.3 MarkupSafe-1.1.1 Werkzeug-0.16.0 click-7.0 itsdangerous-1.1.0
[main]     Removing intermediate container 409756ed0287
[main]      ---> 0673ebd2fac0
[main]     Step 5/6 : COPY . ./
[main]      ---> 6665152292f4
[main]     Step 6/6 : CMD ["python","-u","src/main.py"]
[main]      ---> Running in f3a8a9fd8216
[main]     Removing intermediate container f3a8a9fd8216
[main]      ---> fd57d9e0d71a
[main]     Successfully built fd57d9e0d71a
[Info]     Uploading images
[Success]  Successfully uploaded images
[Info]     Built on arm01
[Success]  Release successfully created!
[Info]     Release: 2e24c6a7a427d3ce01f4a5edbe967346 (id: 1154144)
[Info]     ┌─────────┬────────────┬────────────┐
[Info]     │ Service │ Image Size │ Build Time │
[Info]     ├─────────┼────────────┼────────────┤
[Info]     │ main    │ 231.49 MB  │ 19 seconds │
[Info]     └─────────┴────────────┴────────────┘
[Info]     Build finished in 32 seconds
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

The service itself is a simple Python Flask service, which we will use to echo details about the code running on the device by either accessing the device in the browser or via the `curl` command from the terminal of your development machine. Using the `UUID.local` syntax of your device issue the following command:

```bash
$ curl http://3a628fc.local
Welcome to the balena Fleet Management Masterclass
```

Alternatively, point your web browser to the device local IP address or `http://3a628fc.local`, replacing with your device `UUID` to see the _Welcome to the balena Fleet Management Masterclass_ text.

### 2. Access Tokens

During the masterclass, we will use the [balena API](https://www.balena.io/docs/reference/api/overview/) to manage the fleet and device(s). To get started using the API, you need an access token. Access tokens are managed via the _Access tokens tab_ of the [_Preferences_ page](https://dashboard.balena-cloud.com/preferences/access-tokens) of the dashboard.

![Access tokens](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/rmGIGgB.png)

Access tokens may be used to authenticate via the CLI, [SDKs](https://github.com/balena-io/balena-sdk), and all API endpoints. Access tokens should be treated as sensitive and stored securely and never committed to a version control system. Balena offers two types of access tokens that offer the same user-level permissions to manage fleets, devices, and the associated user account.

- **Session tokens** - these tokens expire after seven days and cannot be revoked, though they may be refreshed via the API.
- **API Keys** - these are named tokens that do not expire and may be revoked as needed.

Either type of access token can be used for this masterclass. Session tokens are much longer and may cause an issue in specific environments when executing shell commands using them, so using an API key for this masterclass is preferable. Once created, save the API key to an variable for the current shell with the following command, replacing `<YOUR_API_TOKEN>` with the value of the token obtained from the dashboard.

```bash
API_TOKEN=<YOUR_API_TOKEN>
```

We can test the API token by issuing a request to obtain information about the application named _FleetMasterclass_. The URL is encoded in the example below, which makes it hard to read; the decoded query we are making is: `https://api.balena-cloud.com/v5/application?$filter=app_name eq 'FleetMasterclass'`.

```bash
curl -X GET 'https://api.balena-cloud.com/v5/application?$filter=app_name%20eq%20%27FleetMasterclass%27' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'
```

If you have a fleet named _FleetMasterclass_ associated with your account, a JSON object containing the fleet data will be returned. To make this easier to read, pipe the output into the `jq` utility by appending `| jq '.'` to the end of the previous command:

```bash
curl -X GET 'https://api.balena-cloud.com/v5/application?$filter=app_name%20eq%20%27FleetMasterclass%27' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' | jq '.'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   492  100   492    0     0   1233      0 --:--:-- --:--:-- --:--:--  1230
{
  "d": [
    {
      "id": 1550049,
      "user": {
        "__deferred": {
          "uri": "/resin/user(129965)"
        },
        "__id": 129965
      },
      "depends_on__application": null,
      "actor": 4187117,
      "app_name": "FleetMasterclass",
      "slug": "gh_garethtdavies/masterclass",
      "commit": "06fe2d0180683294128ea2c7d8134d99",
      "application_type": {
        "__deferred": {
          "uri": "/resin/application_type(5)"
        },
        "__id": 5
      },
      "device_type": "raspberrypi4-64",
      "should_track_latest_release": true,
      "is_accessible_by_support_until__date": null,
      "__metadata": {
        "uri": "/resin/application(@id)?@id=1550049"
      }
    }
  ]
}
```

> Note: If you see a blank output or an unauthorized response, ensure that you have set the `API_TOKEN` variable. You can check this by running `echo $API_TOKEN` in your terminal, which should output the value of the access token. Variables set this way do not persist between sessions, so if you close your terminal, you will need to set the API_TOKEN variable again or [make it persistent](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-environment-variables-in-linux/).

### 3. Configuration

You can configure your entire fleet, devices, and individual services through the use of configuration, variables. Variables may be defined at both the fleet and device level, with any variables of the same name set at the device-level taking precedence.

#### 3.1 Configuration Variables

Configuration variables provide runtime configuration to the host OS and supervisor. A description of the various available configuration variables can be found [here](https://www.balena.io/docs/learn/manage/configuration/#variable-list).

Let's enable persistent logging for our device via the API. By default, logs are written to an 8MB journald RAM buffer to avoid wear on the storage medium, and so any logs do not persist on a reboot. Enabling persistent logging writes up to 32MB of logs to the data partition of the device (for balenaOS >= 2.45) and can assist in debugging issues over multiple reboots. To enable persistent logging for a device, send the following POST request replacing your `device_id` in the request below. You can obtain your device ID from the output of `balena devices --fleet FleetMasterclass`.

```bash
curl -X POST 'https://api.balena-cloud.com/v5/device_config_variable' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{
    "device": "2134742",
    "name": "RESIN_SUPERVISOR_PERSISTENT_LOGGING",
    "value": "1"
}'
```

On success, you will see the newly created device configuration value.

```json
{
  "id": 1423838,
  "device": {
    "__deferred": {
      "uri": "/resin/device(2134742)"
    },
    "__id": 2134742
  },
  "value": "1",
  "name": "RESIN_SUPERVISOR_PERSISTENT_LOGGING",
  "__metadata": {
    "uri": "/resin/device_config_variable(@id)?@id=1423838"
  }
}
```

Many configuration updates require a reboot of the device to apply, which is triggered automatically via a VPN notification when a configuration value is changed. Note that if the VPN is inaccessible this change will be picked up via the device supervisor when it next polls the API. Viewing the web terminal of the device, you should see a notification in the logs, and the device will subsequently reboot.

```bash
04.05.20 12:46:47 (-0700) Applying configuration change {"SUPERVISOR_PERSISTENT_LOGGING":"1"}
04.05.20 12:46:47 (-0700) Applied configuration change {"SUPERVISOR_PERSISTENT_LOGGING":"1"}
04.05.20 12:46:47 (-0700) Rebooting
04.05.20 10:24:40 (-0700) Supervisor starting
```

Let's disable persistent logging again with a `PATCH` request. To do so, the configuration variable id that was returned when creating the configuration value is required.

```bash
curl -X PATCH 'https://api.balena-cloud.com/v5/device_config_variable(1399394)' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{
    "value": "0"
}'
OK%
```

If you don't know the device configuration variable id, you can list all configuration values for a device via the following `GET` request, again replacing with your `device_id`.

```bash
curl -X GET 'https://api.balena-cloud.com/v5/device_config_variable?$filter=device%20eq%202134742' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'
```

You can also update this configuration value for the entire fleet. Access the _Configuration_ tab of the Fleet dashboard and select _activate_ next to _Enable persistent logging. Only supported by supervisor versions >= v7.15.0._. Then click on _Enable_ to set the configuration value. Note that because we have an existing override for the device, it will not be applied to our device but only to any additional devices joining the fleet.

![Enable persistent logging](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/2wGmef2.gif)

#### 3.2 Variables

Variables allow the providing of runtime configuration to one or more running services without having to modify your source code. You can add variables to an entire fleet or a single device. Use the CLI to create a fleet variable called _MY_NAME_ and give it a value of your own name e.g.

```bash
$ balena env add MY_NAME Gareth --fleet FleetMasterclass
```

Now we'll update our service to echo this fleet variable. Update line 7 of `src/main.py` taking care to keep the indentation:

```python
    return "Your name is " + os.environ.get('MY_NAME')
```

Now push the updated services:

```bash
$ balena push FleetMasterclass
```

Once it has been downloaded to the device, view the output on the device, which should match the variable we just set:

```bash
$ curl http://3a628fc.local
Your name is Gareth
```

We can override this fleet variable at the device level by creating a device variable of the same name. Do this from the _Device Variables_ tab of the Device dashboard, modifying the `MY_NAME` variable with a new value.

![Add a device variable](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/Zb7rasz.gif)

Confirm that the device variable takes precedence by accessing the device IP or via curl, which should display our updated variable.

```bash
$ curl http://3a628fc.local
Your name is Gareth Updated
```

#### 3.3 Variables

Variables are accessible to all services running on a device, whereas variables are assigned to a specific service. Variables can be created via the dashboard, the CLI, or via the API, either for the fleet or per device.

Create a new device variable named `MY_NAME` from the _Device Variables_ tab of the Device dashboard and give it a unique value. As we only have a single service for this fleet, the default service value of `main` is the only available option.

![Add device variable](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/HcEZd6b.gif)

Now you should see our device variable echoed correctly, taking precedence over the other variables.

```bash
curl 3a628fc.local
Your name is Gareth Service
```

### 4. Tagging

Tags provide an easy way to include more information about your devices and releases. Using tags, you have the option to create multiple _key:value_ pairs to add additional metadata to devices and releases that may be used, for example, to identify a user-defined group of devices or a specific release.

You can manage tags via the dashboard, CLI, API, or SDKs. Check the documentation [located here](https://www.balena.io/docs/reference/balena-cli/#tags-1) for more on how tags can be managed through the CLI.

#### 4.1 Add a Device Tag using the Dashboard

Add a tag from the Fleet dashboard by clicking the checkbox to the left of the device(s) you wish to tag, followed by the _Tags_ button on the right side of the dashboard.

Enter the name of the tag as `devDevice` to identify this device as a development one in the fleet for our use (we will later use this tag in the examples for filtering). We can specify a name only or both a name and value pair. In this example, we are just adding a tag name. Tag names must be unique.

> Note, the following GIFs and screenshots use the tag `development`. However, to avoid confusion with the host OS version (also named development) it is strongly recommended you create your tag as `devDevice` or similar.

![Adding a tag via the dashboard](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/ltzofvx.gif)

To edit the tag, you can repeat the process, selecting the device(s) and clicking the _Tags_ button where you can edit any existing tags. You can also manage tags from the device summary page.

![Device Summary](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/exXJPh8.png)

#### 4.2 Add a Release Tag using the API

Using release tags, we can identify releases by something other than a commit hash or release ID. For example, let's update our fleet and give the latest release a `version:v1.0.0` tag.

Update line 7 of `src/main.py` to the following:

```python
    return "I am version 1.0.0 of the Masterclass"
```

Push the latest version of the service noting the release ID in the build output (we'll see alternative ways of obtaining this information later).

```bash
$ balena push FleetMasterclass
[Info]     Starting build for FleetMasterclass, user gh_garethtdavies
...
[Success]  Release successfully created!
[Info]     Release: 56faf0d8be050fbd65e15d8ab0f23993 (id: 1156095)
...
```

Create the release tag by issuing the following POST request in your terminal, updating the release value to match your release ID. Again, we'll pipe the output to `jq` to make viewing the response easier.

```bash
curl -X POST 'https://api.balena-cloud.com/v5/release_tag' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{
    "release": 1156095,
    "tag_key": "version",
    "value": "v1.0.0"
}' | jq '.'
```

If the request is successful you will see a response for the newly created tag:

```json
{
  "id": 63744,
  "release": {
    "__deferred": {
      "uri": "/resin/release(1156095)"
    },
    "__id": 1156095
  },
  "tag_key": "version",
  "value": "v1.0.0",
  "__metadata": {
    "uri": "/resin/release_tag(@id)?@id=63744"
  }
}
```

We can confirm that this worked by visiting the Fleet dashboard and clicking the _Releases_ tab. You may need to add a new column to view the tags associated with the releases and our newly created `version:v1.0.0` tag.

![Release tag](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/1vrS6bw.png)

> You can edit a tag via the API by issuing a PATCH request to `https://api.balena-cloud.com/v5/release_tag(1156095)` again using the release ID. To delete the tag, send a DELETE request to the same URL. For more information, consult the [API documentation](https://www.balena.io/docs/reference/api/overview/).

#### 4.3 Identifying Releases

There is no CLI equivalent of `balena devices` to determine all releases for a fleet, and you will often need to identify specific releases for tagging purposes.

You can find all releases via the dashboard by clicking the _Releases_ tab in the Fleet dashboard.

![Dashboard releases](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/qJTGXKk.png)

Using the API, we can request all releases for a fleet by issuing the following request, using the `fleet_id` of the fleet (1542022) in this example. You can obtain the `fleet_id` via `balena fleets | grep FleetMasterclass`.

```bash
$ curl -X GET 'https://api.balena-cloud.com/v5/release?$filter=belongs_to__application%20eq%201542022' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' | jq '.'
```

### 5. Filtering

Once your fleet has at least 6 devices, you will be able to apply filters to the devices list. Filters provide a convenient way to find specific devices and releases based on shared characteristics quickly.

#### 5.1 Add a new filter

We are going to filter on a device tag that we just created, though you may filter on any device property available in the Device dashboard or on any user-defined tag. This feature is especially helpful when used on larger fleets.

Create a filter by clicking _Add filter_ on the Fleet dashboard and choose _Tag_ in the available filters and enter a _Name_ of `devDevice`.

![Create a filter](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/n8Sks0z.gif)

#### 5.2 Create a View

Views allow us to save filters, rather than having to reenter them each time we want to filter our devices. For example, we will save the current filter, which selects all devices with a tag name of `devDevice` to a view named _Development Devices_. Create this view by selecting the _Save as view_ link, which is visible whenever there is a filter applied.

![Save a view](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/1Yodp3X.png)

#### 5.3 Filter with the API

The API has powerful filter capabilities through the use of the `$filter` property. We will only cover the basic filters, and more detail can be found via the [OData specification](https://www.odata.org/) or this [OData cheatsheet](https://help.nintex.com/en-us/insight/OData/HE_CON_ODATAQueryCheatSheet.htm) for all available filter operations.

For example, let's find all the devices in our fleet that are online using the fleet id (1550049) in the example. For readability, the decoded version of this query is `https://api.balena-cloud.com/v5/device?$filter=belongs_to__application eq '1550049' and is_online eq true`.

```bash
curl -X GET 'https://api.balena-cloud.com/v5/device?$filter=belongs_to__application%20eq%20%271550049%27%20and%20is_online%20eq%20true' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'
```

```json
{
  "d": [
    {
      ...
      "id": 1750246,
      "device_name": "frosty-wildflower",
      "device_type": "raspberrypi4-64",
      "uuid": "3a628fcf6651dd61c94aef0fb88efee9",
      "is_on__commit": "f1d6967bd615f5e5947a83f788fadfbd",
      "note": null,
      "local_id": null,
      "status": "Idle",
      "is_online": true,
      "last_connectivity_event": "2019-11-19T21:51:39.705Z",
      "is_connected_to_vpn": true,
      "last_vpn_event": "2019-11-19T21:51:39.705Z",
      ...
      }
    }
  ]
}
```

The response from that query should return your online device(s). If you power off your device(s) and run the query again, you should get an empty response. Alternatively, change `is_online` to `false` to display the now offline device(s) for the _FleetMasterclass_ fleet.

```bash
curl -X GET 'https://api.balena-cloud.com/v5/device?$filter=belongs_to__application%20eq%20%271550049%27%20and%20is_online%20eq%20false' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'
```

We can also identify our devices tagged as `devDevice` via the API by using the following request:

```bash
curl -X GET 'https://api.balena-cloud.com/v5/device_tag?$filter=tag_key%20eq%20%27devDevice%27&$expand=device' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'
```

### 6. Release Policy

When managing a fleet, you may require devices to be running different releases, for example, when testing a new release. By default, new releases are deployed to all devices in the fleet once successfully built. However, you can customize this behavior, so the fleet or individual devices remain on a fixed release by _pinning_ them.

You can define the fleet and device release policy via the dashboard or programmatically through the API or SDKs.

#### 6.1 Pin a Fleet to a Release

In the last exercise, we pushed a release that we tagged as `version:v1.0.0`. We want our fleet to remain on this release even if newer releases are deployed (for example, we may wish to test the newer releases on a subset of devices before we push to the remainder of the fleet).

In the Fleet dashboard, there is a _Release policy_ header. By default, this is set to `track latest`, which means that new releases are immediately deployed to all devices in the fleet when built. Expanding this _Release policy_ dropdown menu displays all releases for the fleet, from which you can select a specific release to pin the fleet to. When the fleet is pinned, all devices are immediately updated to run the pinned release if they are not already running it, and in the future, releases will not be deployed until the _Release policy_ is updated to a newer release or set to `track latest`.

Pin your fleet to the latest release by selecting it from the dropdown.

![Pin fleet to release](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/OdrQvC7.gif)

Now update line #7 of `src/main.py` to read:

```python
    return "I am version 2.0.0 of the Masterclass"
```

Deploy this release via `balena push FleetMasterclass`, and now, despite there being a newer release, the fleet and device remain on the `v1.0.0` release which you can validate by issuing the following command:

```bash
curl 3a628fc.local
I am version 1.0.0 of the FleetMasterclass
```

#### 6.2 Pin Device to a Release

As well as pinning an entire fleet to a specific release, you may pin individual devices. By default, all devices track the fleet release policy. However, you may wish to run a different release on select devices, for example, a development device or when performing a canary deployment where a subset of devices receive the update to evaluate it before pushing more widely.

From the fleet dashboard, select the device(s) you wish to pin and choose _Pin to release_ from the Actions menu and select the latest release.

![Pin device to release](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/oIyfmmc.gif)

You may also pin a device from the device dashboard:

![Pin device via dashboard](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/DiG8bvQ.png)

The pinned device will update immediately to run the latest release (if it is not already). Once the device has updated, again validate it is running the latest release with the command:

```bash
curl 3a628fc.local
I am version 2.0.0 of the Masterclass
```

We can use the filter and view we created in exercise #5 to quickly select all of our development devices, from which we can quickly pin all the target devices to a specific version.

![Pin tagged version](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/hFH9Lis.png)

#### 6.3 Pin using the API

We can perform similar actions via the API to pin fleets and devices programmatically.

For fleets, the `should_track_latest_release` property specifies if the latest release should be deployed to devices. Let's see the result of our currently pinned fleet, again we'll get a list of fleets filtered by _FleetMasterclass_:

```bash
$ curl -X GET 'https://api.balena-cloud.com/v5/application?$filter=app_name%20eq%20%27FleetMasterclass%27' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' | jq '.'
```

```json
{
  "d": [
    {
      "id": 1550049,
      "user": {
        "__deferred": {
          "uri": "/resin/user(129965)"
        },
        "__id": 129965
      },
      "depends_on__application": null,
      "actor": 4187117,
      "app_name": "FleetMasterclass",
      "slug": "gh_garethtdavies/masterclass",
      "commit": "56faf0d8be050fbd65e15d8ab0f23993",
      "application_type": {
        "__deferred": {
          "uri": "/resin/application(5)"
        },
        "__id": 5
      },
      "device_type": "raspberrypi4-64",
      "should_track_latest_release": false,
      "is_accessible_by_support_until__date": null,
      "__metadata": {
        "uri": "/resin/application(@id)?@id=1550049"
      }
    }
  ]
}
```

Note that `should_track_latest_release` is `false`, and the commit corresponds to the release we pinned the fleet to. Let's update this so that the fleet once again follows the latest release. First, update line 7 of `src/main.py` to read:

```python
    return "I am version 3.0.0 of the Masterclass"
```

Followed by `$ balena push FleetMasterclass`.

As our device is pinned to the version 2.0.0 release, it will not follow any fleet updates, so first, via the Device dashboard, choose _Pin to release_ and change the device release policy to _Track_, so the device once again follows the fleet release policy (which is currently pinned to version 1.0.0).

![Set device to track fleet](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/TuNzfyb.png)

Once updated, confirm it is again following the fleet release policy:

```bash
$ curl 3a628fc.local
I am version 1.0.0 of the Masterclass
```

Now issue the following API request, which sends a PATCH request to set `should_track_latest` to `true`, so the fleet will deploy the latest available release, replacing the fleet_id with your fleet ID.

```bash
$ curl -X PATCH 'https://api.balena-cloud.com/v5/application(1542022)' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{
    "should_track_latest_release": true
}'
```

If successful, all devices that are following the fleet release policy will be updated to the latest available release. Now, accessing the device again we can confirm we are on the latest release:

```bash
$ curl 3a628fc.local
I am version 3.0.0 of the Masterclass
```

After we deployed this, let's imagine we found a bug in the version 3.0.0 release, and we want to set all devices back to version 2.0.0. We could either do this by pinning each device or set the entire fleet to a single commit.

In the API request, we will set both `should_track_latest_release` to `false` and set the commit to the commit hash of the version we want to roll back to. If we don't set `should_track_latest_release` to `false` while all devices will be updated to the specified commit, if any new releases are deployed, they will be pushed to all devices, which may not be the behavior we want.

```bash
$ curl -X PATCH 'https://api.balena-cloud.com/v5/application(1550049)' -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{
    "should_track_latest_release": false,
    "commit": "9ba8aa013aab5c0fd8c24977c3699f25"
}'
OK
```

Finally, we can confirm we are back on our stable version 2.0.0 release.

```bash
$ curl 3a628fc.local
I am version 2.0.0 of the Masterclass
```

For devices, the `should_be_running__release` property may be used to specify a release ID to pin the device to. When this is set, the device will no longer follow the fleet release policy. We can update our development device to v3.0.0 again and use this device to test our service (properly this time) while the rest of the fleet remains on v2.0.0. Issue the following API request replacing your device ID and release ID:

```bash
curl -X PATCH 'https://api.balena-cloud.com/v5/device(1750246)' -H 'Authorization: Bearer nmotTcNaNiS3p5DrQepRhk6hQ9luNX9f' -H 'Content-Type: application/json' -d '{
    "should_be_running__release": 1141794
}'
```

### 7. Best Practices for Production Fleets

When it is time to move your fleet to production, there are a number of recommended best practices:

- Use frozen images and fixed dependencies to ensure there are no unexpected updates.
- Minimize the size of your releases through the use of [multistage builds](https://github.com/balena-io/services-masterclass#6-multi-stage-builds) and the minimal `run` variants of the [balena base images](https://www.balena.io/docs/reference/base-images/base-images/).
- Use a release policy to safely roll out new service deployments through the use of release pinning.
- Enable [delta updates](https://www.balena.io/docs/learn/deploy/delta/) to reduce bandwidth and storage space required on the device. Note that delta updates are now enabled by default for any devices running balenaOS >= 2.47.1.
- Use an ESR version of the host OS if available.
- Test your releases before deployment with a CI/CD pipeline.
- If your service generates significant log data consider adding a log collection service to your fleet.
- Monitor your fleet with a solution such as [Prometheus](https://prometheus.io/).

#### 7.1 Selecting Base Images

In production, you should use a minimal image to reduce bandwidth requirements and to reduce deployment time. This can be achieved using multistage builds, which is covered in detail in the [services masterclass](https://github.com/balena-io/services-masterclass#6-multi-stage-builds) and the minimal `run` variants of the [balena base images](https://www.balena.io/docs/reference/base-images/base-images/).

In addition, you should choose a frozen image to remove any unexpected updates of the base image, which may result in additional bandwidth.

To illustrate this, we will update our fleet to use a more suitable base image for production. In the `Dockerfile.template` update the base image to:

```Docker
FROM balenalib/%%BALENA_MACHINE_NAME%%-debian-python:3.7.5-stretch-run-20191106
```

We are using a frozen image of `20191106`, which means this image will never be updated on DockerHub. While we are not using a multistage build, we are using a `run` variant of the base image, which is a minimal variant of the chosen distribution (Debian Stretch in this example).

#### 7.2 Integrating a CI/CD pipeline

Another aspect of fleet management is the deployment of a service to that fleet when new code for that service is available. Usually, the CI/CD pipeline for new functionality into a fleet consists of:

1. An engineer implementing this functionality and then testing it locally.
2. The release, or Pull Requesting (PRing), of code to a fleet branch for reviewing and end-to-end testing, usually in a staged environment.
3. The merging of code into the `master` branch of a fleet.

For feature implementation and testing, a development device can be put into 'local mode'. This allows an engineer to push new service code straight to a local device, saving time and not filling up releases with development code. See [the documentation for local mode](https://www.balena.io/docs/learn/develop/local-mode/) and the section in the [balena CLI masterclass](https://github.com/balena-io/balena-cli-masterclass#6-using-local-mode-to-develop-applications).

Usually, most customers use third-party CI/CD services such as Jenkins, CircleCI, Travis, etc. which pull changes from feature branches in source repositories, build them and then test the built service against a test 'rig'. All of the mentioned services (and almost all CI/CD services) allow the specification of custom scripts for initializing environments for these build/test cycles, and balena CLI can be installed via a script to carry out the final pushing of code to a fleet for release. Here's how a generic development, build, test cycle might work:

1. Engineer develops new functionality for a service using a device in local mode.
2. PR for changes are made to the service via a branch.
3. The branch change is picked up by the third-party CI/CD service, where the build and test environment includes the `balena-cli` NPM module, and a test fleet on balenaCloud is referenced.
4. The service is built using `balena push testFleet` and relevant test devices are updated and tested.
5. The test succeeds or fails, and the PR is updated accordingly.
6. Finally, after successful testing and review, the branch is merged to `master`.
7. The CI/CD service picks up the merge and carries out the final build, where the `master` branch swaps the service to build to the production fleet (i.e. `balena push masterFleet`).

### 8. Fleet Ownership

In balenaCloud, there are multiple member types, each offering different permissions (some of which are only available to paid plans). You can add members to the fleet on the _Members_ tab of the dashboard:

![Add fleet member](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/cNNoT1K.png)

- **Owner** - The user who created the fleet and has full permissions to add other members and remove the fleet.
- **Observer** - Observers are given read-only access to the fleet and its devices.
- **Operator** - Operators have all the access given to observers, plus the ability to manage fleet devices. This means operators can remove devices, perform device actions, and modify device tags, metadata, and variables. Operators also have full SSH access to the fleet devices.
- **Developer** - Developers are given, in addition to the access provided to operators, the ability to manage a fleet. This includes pushing new code, modifying fleet-wide variables, running fleet actions, and downloading fleet images.

### 9. Enabling Support

It is possible to enable support access to the entire fleet or to individual devices for a set time period.

To enable support access for a single device, select the _Actions_ menu in the Device dashboard, and choose the _Grant Support Access_ button and choose the period of time to grant device access. You may revoke access at any time by selecting _Revoke Support Access_ on the same page.

![Enable support for a device](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/L1EjGQa.gif)

To enable support access for an entire fleet, select the _Grant Support Access_ from the _Actions_ menu of the Fleet dashboard and choose the period of time to grant access to all devices in the fleet. Again, this may be revoked at any time by selecting _Revoke Support Access_ on the same page.

![Enable support access for a fleet](https://github.com/balena-io-projects/balena-fleet-management-masterclass/raw/master/resources/2eMvJf8.png)

It is possible to disable this functionality with the removal of the balena SSH public key from the device. However, this will render the device inaccessible remotely for the purposes of support or repairs and updates to the base OS.

## Conclusion

This masterclass has covered the fundamentals of fleet management with balena. You should now be able to perform various fleet management tasks using the dashboard, CLI, and API. You should now feel confident to:

- Create an API key and create an API request.
- Describe the different configuration, variables available.
- Tag devices and releases.
- Create filters and views in the dashboard and use filters with the API.
- Pin fleets and devices to specific releases.
- Detail the different ownership levels in a fleet.
- Recommend best practices in deploying a fleet to production.
- Enable support for fleets and individual devices.

## References

- [OData Specification](https://www.odata.org/)
- [OData Query Cheatsheet](https://help.nintex.com/en-us/insight/OData/HE_CON_ODATAQueryCheatSheet.htm)
- [balena API reference](https://www.balena.io/docs/reference/api/overview/)
- [balena CLI masterclass](https://github.com/balena-io/balena-cli-masterclass)
