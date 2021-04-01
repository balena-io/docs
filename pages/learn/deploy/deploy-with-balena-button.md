---
title: Deploy with {{ $names.company.lower }} button
excerpt: The Deploy with {{ $names.company.lower }} button allows users to do a single-click deployment and configuration of an application to {{ $names.cloud.lower }}
---

# Deploy with {{ $names.company.lower }} button

The **Deploy with {{ $names.company.lower }}** button allows users to perform a single-click deployment and configuration of an application to {{ $names.cloud.lower }}.

![Deploy with {{ $names.company.lower }}](https://balena.io/deploy.svg)

Clicking the **Deploy with {{ $names.company.lower }}** button opens the {{ $names.cloud.lower }} dashboard with a modal window pre-populated with everything required to deploy the application. Clicking the _Advanced_ toggle in the modal window allows adding additional configuration options. If the project has provided configuration variables via a [configuration file](#balenayml-configuration-file), they are pre-populated.

<img src="https://www.balena.io/docs/img/configuration/deploy-to-balena.png" width="80%">

Clicking _Create and deploy_ creates a new application and generates a release. Any devices added to the application will immediately download and begin running the release.

**Note:** Currently git submodules are not supported and will not build properly.

## Adding a deploy with {{ $names.company.lower }} button to a project

You can add the **Deploy with {{ $names.company.lower }}** button to any project that can be deployed to {{ $names.cloud.lower }}. To add the button to a project repository, add the following to, for example, the project repository's README.md file:

`[![balena deploy button](https://www.balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=<your-repo-url>)`

The above example uses an SVG logo as this renders better on GitHub - however, you can also use the PNG version by changing the file ending `.svg` to `.png`. Note that you can further customize the button's behavior through the use of [query string parameters](#query-string-parameters).

### Query string parameters

You can further customize the behavior of the **Deploy with {{ $names.company.lower }}** button by providing additional URL parameters. The following URL parameters are available and may be appended to the `https://dashboard.balena-cloud.com/deploy` link:

- `repoUrl` - The URL of the project repository. If you are placing the deploy button in a GitHub repo then {{ $names.cloud.lower }} can auto-determine the `repoUrl` from the referer info in the HTTP headers. However on Firefox and with some ad-blockers this may fail. So we recommend that you populate this query string parameter.
- `tarballUrl` - The URL of the project tarball. Automatically determined from `repoUrl` if not provided.
- `configUrl` - The URL of the configuration file of the application. Automatically determined from `repoUrl` if not provided.
- `defaultDeviceType` - The device type that will be pre-selected in the "Create application" modal. It defaults to Raspberry Pi 4 if not provided. You can find a list of [device types here](/reference/hardware/devices/).

### balena.yml configuration file

Through the use of a `balena.yml` config file, you may also provide application [configuration](/learn/manage/configuration/) and [environment](/learn/manage/serv-vars/) variables. If provided, they are pre-populated in the advanced modal dialog when using the **Deploy with {{ $names.company.lower }}** button.

The `balena.yml` file can also be used to provide additional metadata to be used if the app is submitted to [balenaHub][balenahub].

The file should be named `balena.yml` and be located in the root of the project repository, or the `configUrl` link must be specified. A full example of the `balena.yml` file is shown below:

```yaml

name: balenaSound
type: sw.application
description: >-
  Build a single or multi-room streamer for an existing audio device using a
  Raspberry Pi! Supports Bluetooth, Airplay and Spotify Connect
assets:
  repository:
    type: blob.asset
    data:
      url: 'https://github.com/balenalabs/balena-sound'
  logo:
    type: blob.asset
    data:
      url: >-
        https://raw.githubusercontent.com/balenalabs/balena-sound/master/logo.png
data:
  applicationEnvironmentVariables:
    - SOUND_VOLUME: 75
    - AUDIO_OUTPUT: AUTO
  defaultDeviceType: raspberry-pi
  supportedDeviceTypes:
    - raspberry-pi
    - raspberry-pi2
    - raspberrypi3
    - raspberrypi4-64
    - fincm3
    - intel-nuc
version: 3.5.2
```

- `type` - Required field. In most cases this would be `sw.application`, unless you are implementing a block, in which case you need to use `sw.block`.
- `name` - A user-friendly name of your application.
- `description`: A description of what the application does. This is what is displayed if the application is published on [balenaHub][balenahub].
- `assets`
  - `<asset-slug>`: Supported values are `repository` and `logo`. The size of logo needs to be size 512 x 512 px
    - `type`: A fixed value that should be set to 'blob.asset'
    - `data`:
      - `url` - The URL of the asset that is being uploaded.
- `data`
  - `applicationEnvironmentVariables` - Environment variables allow you to provide runtime configuration without having to modify your source code.
  - `applicationConfigVariables` - Configuration variables allow you to provide runtime configuration to the host OS and supervisor. These variables all begin with `BALENA_` or `RESIN_`.
  - `defaultDeviceType` - The device type that will be pre-selected in the "Create application" modal. It defaults to Raspberry Pi 4 if not provided. You can find a list of [device types](/reference/hardware/devices/) here.
  - `supportedDeviceType` - The device types that the application supports. You can find a list of [device types](/reference/hardware/devices/) here.

[balenahub]: https://hub.balena.io
