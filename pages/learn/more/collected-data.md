---
title: Collected Data
---
# Data collected by {{ $names.company.lower }}

In order to make data driven decisions, {{ $names.company.lower }} collects usage related events via a 3rd party
analytics service [Amplitude][amplitude]. These events provide us context on the state of application
execution steps. This way we could observe the health of fleets of devices in {{ $names.cloud.lower }} ecosystem and
analyze the potential problems as well as trends.

## User data collected by {{ $names.company.lower }}

{{ $names.company.lower }} collects information about CLI and web dashboard usage behavior.
User data we process includes

* user name (login) and the email address used to log into the system,
* device type, operating system and browser versions,
* device screen size,
* IP address,
* referrer to {{ $names.company.lower }} sites,
* company user belongs to (when web dashboard is used only).

Please note that {{ $names.company.lower }} does not collect information about end users of devices managed with
{{ $names.company.lower }} platform, i.e. information about our customer users is not collected or processed.
We work only with data collected for users who use {{ $names.company.lower }} to manage their device fleets.

## {{ $names.etcher.lower }}

{{ $names.etcher.lower }} is an application maintained by {{ $names.company.lower }} team that can be used to easily
flash OS images to SD cards and USB drives. If user does not opt out from collecting the analytics data, the application
tracks its usage. In addition to the data described above, information about the type of SD cards and USB drives is
collected too.

## Device data collected by the supervisor

Data are submitted to Amplitude from {{ $names.company.lower }}-managed devices on the events listed in
the table below. Submitted packets [may contain][supervisor-data-mask] the following information:

* Application ID and name
* Docker image hash
* Service ID, name, labels
* Release ID and/or git commit hash used to make the release
* Device IP address (as reported in {{ $names.company.lower }} dashboard)
* OS and supervisor versions
* Error root cause message (in case of error events)
* Timing info about device management operations (see event names)


| Event name | Report type | Source file |
| ---------- | ----------- | ----------- |
| Device state report failure | EventTracker | src/api-binder.ts |
| Device bootstrap success | EventTracker | src/api-binder.ts |
| Device bootstrap | EventTracker | src/api-binder.ts |
| Update notification | EventTracker | src/api-binder.ts |
| Device bootstrap failed | EventTracker | src/api-binder.ts |
| Image downloaded | SystemEvent | src/compose/images.ts |
| Delta still processing remotely. | SystemEvent | src/compose/images.ts |
| Image removal | SystemEvent | src/compose/images.ts |
| Image removed | SystemEvent | src/compose/images.ts |
| Delta image download | SystemEvent | src/compose/images.ts |
| Docker image download | SystemEvent | src/compose/images.ts |
| Image cleanup error | SystemMessage | src/compose/images.ts |
| Image download error | SystemEvent | src/compose/images.ts |
| Image removal error | SystemEvent | src/compose/images.ts |
| Network creation error | SystemEvent | src/compose/network-manager.ts |
| Network creation | SystemEvent | src/compose/network.ts |
| Network removal | SystemEvent | src/compose/network.ts |
| Network creation error | SystemEvent | src/compose/network.ts |
| Remove dead container | SystemEvent | src/compose/service-manager.ts |
| Service install | SystemEvent | src/compose/service-manager.ts |
| Service installed | SystemEvent | src/compose/service-manager.ts |
| Service start | SystemEvent | src/compose/service-manager.ts |
| Service started | SystemEvent | src/compose/service-manager.ts |
| Service exit | SystemEvent | src/compose/service-manager.ts |
| Service kill | SystemEvent | src/compose/service-manager.ts |
| Service already stopped | SystemEvent | src/compose/service-manager.ts |
| Service stop | SystemEvent | src/compose/service-manager.ts |
| Remove dead container error | SystemEvent | src/compose/service-manager.ts |
| Service install error | SystemEvent | src/compose/service-manager.ts |
| Service start error | SystemEvent | src/compose/service-manager.ts |
| Service restart | SystemEvent | src/compose/service-manager.ts |
| Service already stopped and container removed | SystemEvent | src/compose/service-manager.ts |
| Service stop error | SystemEvent | src/compose/service-manager.ts |
| Volume migration error | SystemMessage | src/compose/volume-manager.ts |
| Volume creation error | SystemEvent | src/compose/volume-manager.ts |
| Volume creation | SystemEvent | src/compose/volume.ts |
| Volume removal | SystemEvent | src/compose/volume.ts |
| Volume removal error | SystemEvent | src/compose/volume.ts |
| Purge data | SystemMessage | src/device-api/common.coffee |
| Purge data success | SystemMessage | src/device-api/common.coffee |
| Purge data error | SystemMessage | src/device-api/common.coffee |
| Restart container (v1) | EventTracker | src/device-api/v1.coffee |
| GET app (v1) | EventTracker | src/device-api/v1.coffee |
| Apply config change (success/failed/in progress) | ConfigChange | src/device-config.ts |
| Apply boot config error | SystemMessage | src/device-config.ts |
| Apply boot config in progress | SystemMessage | src/device-config.ts |
| Apply boot config success | SystemMessage | src/device-config.ts |
| Reboot | SystemMessage | src/device-state.coffee |
| Shutdown | SystemMessage | src/device-state.coffee |
| Loading preloaded apps failed | EventTracker | src/device-state.coffee |
| Device blink | EventTracker | src/supervisor-api.ts |
| Supervisor start | SystemMessage | src/supervisor.ts |


## Data collected automatically by Amplitude
Amplitude library generates a unique identifier for each device that sends an event.
We associate the events with the device UUID provided by {{ $names.cloud.lower }} as well.
Besides these identifiers, we don’t send any other user ID to Amplitude.

Amplitude library automatically extracts geographical location data from the device’s IP address,
so it collects city, region and country information.
See more in a [relevant article by Amplitude][amplitude-auto-collection].

## About logging
Logs produced by applications deployed to the devices via {{ $names.company.lower }} supervisor application
can be streamed to web dashboard or CLI user who has permissions to view them through our cloud.
However, the logs are stored in the cloud temporarily only in order to allow the streaming
functionality - {{ $names.company.lower }} does not process device application logs unless technical support is
requested by our users.


[amplitude]:https://amplitude.com/
[amplitude-auto-collection]:https://help.amplitude.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties
[supervisor-data-mask]:https://github.com/balena-io/balena-supervisor/blob/v10.0.1/src/event-tracker.ts#L25
