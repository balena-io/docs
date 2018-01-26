## Resin Python SDK

Welcome to the Resin Python SDK documentation.
This document aims to describe all the functions supported by the SDK, as well as
showing examples of their expected usage.
If you feel something is missing, not clear or could be improved, please don't
hesitate to open an issue in GitHub, we'll be happy to help.

## Table of Contents
- [Resin](#resin)
    - [Models](#models)
        - [Application](#application)
        - [Build](#build)
        - [Config](#config)
        - [Device](#device)
        - [DeviceOs](#deviceos)
        - [EnvironmentVariable](#environmentvariable)
            - [ApplicationEnvVariable](#applicationenvvariable)
            - [DeviceEnvVariable](#deviceenvvariable)
        - [Key](#key)
        - [Supervisor](#supervisor)
    - [Auth](#auth)
    - [Logs](#logs)
    - [Settings](#settings)
    - [TwoFactorAuth](#twofactorauth)

## Models

This module implements all models for Resin Python SDK.
## Application

This class implements application model for Resin Python SDK.

Due to API changes, the returned Application object schema has changed. Here are the formats of the old and new returned objects.

The old returned object's properties: `__metadata, actor, app_name, application, commit, device_type, git_repository, id, should_track_latest_release, support_expiry_date, user, version`.

The new returned object's properties (since Python SDK v2.0.0): `__metadata, actor, app_name, commit, depends_on__application, device_type, git_repository, id, is_accessible_by_support_until__date, should_track_latest_release, user, version`.
### Function: create(name, device_type)

Create an application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.
    device_type (str): device type (display form).

#### Returns:
    dict: application info.

#### Raises:
    InvalidDeviceType: if device type is not supported.

#### Examples:
```python
>>> resin.models.application.create('Edison','Intel Edison')
'{"id":9021,"user":{"__deferred":{"uri":"/ewa/user(5397)"},"__id":5397},"app_name":"Edison","git_repository":"g_trong_nghia_nguyen@git.resin.io:g_trong_nghia_nguyen/edison.git","commit":null,"device_type":"intel-edison","__metadata":{"uri":"/ewa/application(9021)","type":""}}'
```
### Function: disable_device_urls(app_id)

Disable device urls for all devices that belong to an application.

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > resin.models.application.disable_device_urls('5685')
    'OK'
### Function: disable_rolling_updates(app_id)

Disable Rolling update on application.

#### Args:
    name (str): application id.

#### Returns:
    OK/error.

#### Raises:
    ApplicationNotFound: if application couldn't be found.

#### Examples:
    >> > resin.models.application.disable_rolling_updates('106640')
    'OK'
### Function: enable_device_urls(app_id)

Enable device urls for all devices that belong to an application

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > resin.models.application.enable_device_urls('5685')
    'OK'
### Function: enable_rolling_updates(app_id)

Enable Rolling update on application.

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Raises:
    ApplicationNotFound: if application couldn't be found.

#### Examples:
    >> > resin.models.application.enable_rolling_updates('106640')
    'OK'
### Function: generate_provisioning_key(app_id)

Generate a device provisioning key for a specific application.

#### Args:
    app_id (str): application id.

#### Returns:
    str: device provisioning key.

#### Examples:
    >> > resin.models.application.generate_provisioning_key('5685')
    'GThZJps91PoJCdzfYqF7glHXzBDGrkr9'
### Function: get(name)

Get a single application.

#### Args:
    name (str): application name.

#### Returns:
    dict: application info.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
    AmbiguousApplication: when more than one application is returned.

#### Examples:
```python
>>> resin.models.application.get('RPI1')
{u'app_name': u'RPI1', u'__metadata': {u'type': u'', u'uri': u'/ewa/application(9020)'}, u'git_repository': u'g_trong_nghia_nguyen@git.resin.io:g_trong_nghia_nguyen/rpi1.git', u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'device_type': u'raspberry-pi', u'commit': None, u'id': 9020}
```
### Function: get_all()

Get all applications.

#### Returns:
    list: list contains info of applications.

#### Examples:
```python
>>> resin.models.application.get_all()
[{u'app_name': u'RPI1', u'__metadata': {u'type': u'', u'uri': u'/ewa/application(9020)'}, u'git_repository': u'g_trong_nghia_nguyen@git.resin.io:g_trong_nghia_nguyen/rpi1.git', u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'device_type': u'raspberry-pi', u'commit': None, u'id': 9020}, {u'app_name': u'RPI2', u'__metadata': {u'type': u'', u'uri': u'/ewa/application(9019)'}, u'git_repository': u'g_trong_nghia_nguyen@git.resin.io:g_trong_nghia_nguyen/rpi2.git', u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'device_type': u'raspberry-pi2', u'commit': None, u'id': 9019}]
```
### Function: get_by_id(app_id)

Get a single application by application id.

#### Args:
    app_id (str): application id.

#### Returns:
    dict: application info.

#### Raises:
    ApplicationNotFound: if application couldn't be found.

#### Examples:
```python
>>> resin.models.application.get_by_id(9020)
{u'app_name': u'RPI1', u'__metadata': {u'type': u'', u'uri': u'/ewa/application(9020)'}, u'git_repository': u'g_trong_nghia_nguyen@git.resin.io:g_trong_nghia_nguyen/rpi1.git', u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'device_type': u'raspberry-pi', u'commit': None, u'id': 9020}
```
### Function: get_config(app_id)

        Download application config.json.

####         Args:
            app_id (str): application id.

####         Returns:
            dict: application config.json content.

####         Raises:
            ApplicationNotFound: if application couldn't be found.

####         Examples:
```python
            >>> resin.models.application.get_config('106640')
            {u'applicationName': u'RPI3', u'username': u'nghiant2710', u'apiKey': u'kIaqS6ZLOoxkFzpzqSYhWtr2lj6m8KZi', u'vpnPort': 443, u'listenPort': 48484, u'pubnubSubscribeKey': u'sub-c-bbc12eba-ce4a-11e3-9782-02ee2ddab7fe', u'vpnEndpoint': u'vpn.resin.io', u'userId': 189, u'files': {u'network/network.config': u'[service_home_ethernet]
Type = ethernet
Nameservers = 8.8.8.8,8.8.4.4', u'network/settings': u'[global]
OfflineMode=false
TimeUpdates=manual
```

[WiFi]
Enable=true
Tethering=false

[Wired]
Enable=true
Tethering=false

[Bluetooth]
Enable=true
Tethering=false'}, u'pubnubPublishKey': u'pub-c-6cbce8db-bfd1-4fdf-a8c8-53671ae2b226', u'apiEndpoint': u'https://api.resin.io', u'connectivity': u'connman', u'deviceType': u'raspberrypi3', u'mixpanelToken': u'99eec53325d4f45dd0633abd719e3ff1', u'deltaEndpoint': u'https://delta.resin.io', u'appUpdatePollInterval': 60000, u'applicationId': 106640, u'registryEndpoint': u'registry.resin.io'}
        
### Function: grant_support_access(app_id, expiry_timestamp)

Grant support access to an application until a specified time.

#### Args:
    app_id (str): application id.
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Returns:
    OK/error.

#### Examples:
    >> > resin.models.application.grant_support_access('5685', 1511974999000)
    'OK'
### Function: has(name)

Check if an application exists.

#### Args:
    name (str): application name.

#### Returns:
    bool: True if application exists, False otherwise.

#### Examples:
```python
>>> resin.models.application.has('RPI1')
True
```
### Function: has_any()

Check if the user has any applications.

#### Returns:
    bool: True if user has any applications, False otherwise.

#### Examples:
```python
>>> resin.models.application.has_any()
True
```
### Function: remove(name)

Remove application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.

#### Examples:
```python
>>> resin.models.application.remove('Edison')
'OK'
```
### Function: restart(name)

Restart application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.

#### Raises:
    ApplicationNotFound: if application couldn't be found.

#### Examples:
```python
>>> resin.models.application.restart('RPI1')
'OK'
```
### Function: revoke_support_access(app_id)

Revoke support access to an application.

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > resin.models.application.revoke_support_access('5685')
    'OK'
## Build

This class implements build model for Resin Python SDK.
### Function: get(id)

Get a specific build.

#### Args:
    id (str): build id.

#### Returns:
    dict: build info.

#### Raises:
    BuildNotFound: if build couldn't be found.
### Function: get_all_by_application(app_id, include_logs)

Get list of builds belonging to an application.

#### Args:
    app_id (str): application id.
    include_logs (Optional[bool]): Defaults to False since these may be very large. True if user wants to include build logs in build info.

#### Returns:
    list: list of build info.
## Config

This class implements configuration model for Resin Python SDK.

#### Attributes:
    _config (dict): caching configuration.
### Function: get_all()

Get all configuration.

#### Returns:
    dict: configuration information.

#### Examples:
```python
>>> resin.models.config.get_all()
{ all configuration details }
```
### Function: get_device_types()

Get device types configuration.

#### Returns:
    list: device types information.

#### Examples:
```python
>>> resin.models.config.get_device_types()
[ all configuration details ]
```
## Device

This class implements device model for Resin Python SDK.

Due to API changes, the returned Device object schema has changed. Here are the formats of the old and new returned objects.

The old returned object's properties: `__metadata, actor, application, build, commit, created_at, custom_latitude, custom_longitude, device, device_type, download_progress, id, ip_address, is_connected_to_vpn, is_online, is_web_accessible, last_connectivity_event, last_vpn_event, latitude, local_id, location, lock_expiry_date, logs_channel, longitude, name, note, os_variant, os_version, provisioning_progress, provisioning_state, public_address, service_instance, status, supervisor_release, supervisor_version, support_expiry_date, user, uuid, vpn_address`.

The new returned object's properties (since Python SDK v2.0.0): `__metadata, actor, belongs_to__application, belongs_to__user, created_at, custom_latitude, custom_longitude, device_type, download_progress, id, ip_address, is_accessible_by_support_until__date, is_connected_to_vpn, is_locked_until__date, is_managed_by__device, is_managed_by__service_instance, is_on__commit, is_online, is_web_accessible, last_connectivity_event, last_vpn_event, latitude, local_id, location, logs_channel, longitude, name, note, os_variant, os_version, provisioning_progress, provisioning_state, public_address, should_be_managed_by__supervisor_release, should_be_running__build, status, supervisor_version, uuid, vpn_address`.
### Function: disable_device_url(uuid)

Disable device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.disable_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
```
### Function: enable_device_url(uuid)

Enable device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
# Check if device url enabled.
>>> resin.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
False
# Enable device url.
>>> resin.models.device.enable_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
# Check device url again.
>>> resin.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
True
```
### Function: generate_device_key(uuid)

Generate a device key.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.generate_device_key('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a')
2UrtMWeLqYXfTznZo1xNuZQXmEE6cOZk
```
### Function: generate_uuid()

Generate a random device UUID.

#### Returns:
    str: a generated UUID.

#### Examples:
```python
>>> resin.models.device.generate_uuid()
'19dcb86aa288c66ffbd261c7bcd46117c4c25ec655107d7302aef88b99d14c'
```
### Function: get(uuid)

Get a single device by device uuid.

#### Args:
    uuid (str): device uuid.

#### Returns:
    dict: device info.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.get('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_seen_time': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}
```
### Function: get_all()

Get all devices.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> resin.models.device.get_all()
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_seen_time': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_all_by_application(name)

Get devices by application name.

#### Args:
    name (str): application name.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> resin.models.device.get_all_by_application('RPI1')
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_seen_time': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_all_by_application_id(appid)

Get devices by application name.

#### Args:
    appid (str): application id.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> resin.models.device.get_all_by_application_id(1234)
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_seen_time': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_application_name(uuid)

Get application name by device uuid.

#### Args:
    uuid (str): device uuid.

#### Returns:
    str: application name.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: get_by_name(name)

Get devices by device name.

#### Args:
    name (str): device name.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> resin.models.device.get_by_name('floral-mountain')
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_seen_time': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_dashboard_url(uuid)

Get Resin Dashboard URL for a specific device.

#### Args:
    uuid (str): device uuid.

#### Examples:
```python
>>> resin.models.device.get_dashboard_url('19619a6317072b65a240b451f45f855d')
https://dashboard.resin.io/devices/19619a6317072b65a240b451f45f855d/summary
```
### Function: get_device_slug(device_type_name)

Get device slug.

#### Args:
    device_type_name (str): device type name.

#### Returns:
    str: device slug name.

#### Raises:
    InvalidDeviceType: if device type name is not supported.

#### Examples:
```python
>>> resin.models.device.get_device_slug('Intel Edison')
u'intel-edison'
>>> resin.models.device.get_device_slug('Raspberry Pi')
u'raspberry-pi'
```
### Function: get_device_url(uuid)

Get a device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.get_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'https://8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143.resindevice.io'
```
### Function: get_display_name(device_type_slug)

Get display name for a device.

#### Args:
    device_type_slug (str): device type slug.

#### Returns:
    str: device display name.

#### Raises:
    InvalidDeviceType: if device type slug is not supported.

#### Examples:
```python
>>> resin.models.device.get_display_name('intel-edison')
u'Intel Edison'
>>> resin.models.device.get_display_name('raspberry-pi')
u'Raspberry Pi'
```
### Function: get_local_ip_address(uuid)

Get the local IP addresses of a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: IP addresses of a device.

#### Raises:
    DeviceNotFound: if device couldn't be found.
    DeviceOffline: if device is offline.
### Function: get_manifest_by_application(app_name)

Get a device manifest by application name.

#### Args:
    app_name (str): application name.

#### Returns:
    dict: dictionary contains device manifest.
### Function: get_manifest_by_slug(slug)

Get a device manifest by slug.

#### Args:
    slug (str): device slug name.

#### Returns:
    dict: dictionary contains device manifest.

#### Raises:
    InvalidDeviceType: if device slug name is not supported.
### Function: get_name(uuid)

Get device name by device uuid.

#### Args:
    uuid (str): device uuid.

#### Returns:
    str: device name.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: get_status(uuid)

Get the status of a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Returns:
    str: status of a device. List of available statuses: Idle, Configuring, Updating, Offline and Post Provisioning.

#### Examples:
```python
>>> resin.models.device.get_status('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'Offline'
```
### Function: get_supported_device_types()

Get device slug.

#### Returns:
    list: list of supported device types.
### Function: grant_support_access(uuid, expiry_timestamp)

Grant support access to a device until a specified time.

#### Args:
    uuid (str): device uuid.
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Returns:
    OK.

#### Examples:
    >> > resin.models.device.grant_support_access('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d', 1511974999000)
    'OK'
### Function: has(uuid)

Check if a device exists.

#### Args:
    uuid (str): device uuid.

#### Returns:
    bool: True if device exists, False otherwise.
### Function: has_device_url(uuid)

Check if a device is web accessible with device urls

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
False
```
### Function: identify(uuid)

Identify device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.

#### Examples:
```python
>>> resin.models.device.identify('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
```
### Function: is_online(uuid)

Check if a device is online.

#### Args:
    uuid (str): device uuid.

#### Returns:
    bool: True if the device is online, False otherwise.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: move(uuid, app_name)

Move a device to another application.

#### Args:
    uuid (str): device uuid.
    app_name (str): application name.

#### Raises:
    DeviceNotFound: if device couldn't be found.
    ApplicationNotFound: if application couldn't be found.
    IncompatibleApplication: if moving a device to an application with different device-type.

#### Examples:
```python
>>> resin.models.device.move('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'RPI1Test')
'OK'
```
### Function: note(uuid, note)

Note a device.

#### Args:
    uuid (str): device uuid.
    note (str): device note.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.note('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'test device')
'OK'
```
### Function: register(app_id, uuid)

Register a new device with a Resin.io application. This function only works if you log in using credentials or Auth Token.

#### Args:
    app_id (str): application id.
    uuid (str): device uuid.

#### Returns:
    str: dictionary contains device info (can be parsed to dict).

#### Examples:
```python
>>> device_uuid = resin.models.device.generate_uuid()
>>> resin.models.device.register('RPI1',device_uuid)
'{"id":122950,"application":{"__deferred":{"uri":"/ewa/application(9020)"},"__id":9020},"user":{"__deferred":{"uri":"/ewa/user(5397)"},"__id":5397},"name":"floral-mountain","device_type":"raspberry-pi","uuid":"8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143","commit":null,"note":null,"status":null,"is_online":false,"last_seen_time":"1970-01-01T00:00:00.000Z","ip_address":null,"vpn_address":null,"public_address":"","os_version":null,"supervisor_version":null,"supervisor_release":null,"provisioning_progress":null,"provisioning_state":null,"download_progress":null,"is_web_accessible":false,"longitude":"","latitude":"","location":"","logs_channel":null,"__metadata":{"uri":"/ewa/device(122950)","type":""}}'
```
### Function: remove(uuid)

Remove a device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.
### Function: rename(uuid, new_name)

Rename a device.

#### Args:
    uuid (str): device uuid.
    new_name (str): device new name.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.rename('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'python-sdk-test-device')
'OK'
# Check device name.
>>> resin.models.device.get_name('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
u'python-sdk-test-device'
```
### Function: restart(uuid)

Restart a user application container on device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.restart('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
```
### Function: revoke_support_access(uuid)

Revoke support access to a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    OK.

#### Examples:
    >> > resin.models.device.revoke_support_access('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d')
    'OK'
### Function: set_custom_location(uuid, location)

Set a custom location for a device.

#### Args:
    uuid (str): device uuid.
    location (dict): device custom location, format: { 'latitude': <latitude>, 'longitude': <longitude> }.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> location = {
    'latitude': '21.032777',
    'longitude': '105.831586'
}
>>> resin.models.device.set_custom_location('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a',location)
OK
```
### Function: set_to_build(uuid, build)

Set a device to specific build id.

#### Args:
    uuid (str): device uuid.
    build (str): build id.

#### Raises:
    DeviceNotFound: if device couldn't be found.
    ApplicationNotFound: if application couldn't be found.
    IncompatibleApplication: if moving a device to an application with different device-type.

#### Examples:
    >> > resin.models.device.set_to_build('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', '123098')
    'OK'
### Function: unset_custom_location(uuid)

clear custom location for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> resin.models.device.unset_custom_location('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a')
OK
```
## DeviceOs

This class implements device os model for Resin Python SDK.
### Function: download(raw)

Download an OS image. This function only works if you log in using credentials or Auth Token.

#### Args:
    raw (bool): determining function return value.
    **data: os parameters keyword arguments.
        Details about os parameters can be found in parse_params function

#### Returns:
    object:
        If raw is True, urllib3.HTTPResponse object is returned.
        If raw is False, original response object is returned.

#### Notes:
    default OS image file name can be found in response headers.

#### Examples:
```python
>>> data = {'appId':'9020', 'network':'ethernet'}
>>> response = resin.models.device_os.download(**data)
>>> type(response)
<class 'requests.models.Response'>
>>> response['headers']
>>> response.headers
{'access-control-allow-methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS, HEAD', 'content-disposition': 'attachment; filename="resin-RPI1-0.1.0-1.1.0-7588720e0262.img"', 'content-encoding': 'gzip', 'transfer-encoding': 'chunked', 'x-powered-by': 'Express', 'connection': 'keep-alive', 'access-control-allow-credentials': 'true', 'date': 'Mon, 23 Nov 2015 15:13:39 GMT', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Content-Type, Authorization, Application-Record-Count, MaxDataServiceVersion, X-Requested-With', 'content-type': 'application/octet-stream', 'x-frame-options': 'DENY'}
```
### Function: get_config(app_id)

Get an application config.json

#### Args:
    app_id (str): application id.

#### Returns:
    dict: application config.json
### Function: parse_params()

Validate parameters for downloading device OS image.

#### Args:
    **parameters: os parameters keyword arguments.

#### Returns:
    dict: validated parameters.

#### Raises:
    MissingOption: if mandatory option are missing.
    InvalidOption: if appId or network are invalid (appId is not a number or parseable string. network is not in NETWORK_TYPES)
## EnvironmentVariable

This class is a wrapper for device and application environment variable models.
## ApplicationEnvVariable

This class implements application environment variable model for Resin Python SDK.

#### Attributes:
    SYSTEM_VARIABLE_RESERVED_NAMES (list): list of reserved system variable names.
    OTHER_RESERVED_NAMES_START (list): list of prefix for system variable.
### Function: create(app_id, env_var_name, value)

Create an environment variable for application.

#### Args:
    app_id (str): application id.
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Returns:
    str: new application environment info.

#### Examples:
```python
>>> resin.models.environment_variables.application.create(9020, 'app-test-env', 'test')
'{"id":5652,"application":{"__deferred":{"uri":"/ewa/application(9020)"},"__id":9020},"name":"app-test-env","value":"test","__metadata":{"uri":"/ewa/environment_variable(5652)","type":""}}'
```
### Function: get_all(app_id)

Get all environment variables by application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: application environment variables.

#### Examples:
```python
>>> resin.models.environment_variables.application.get_all(9020)
[{u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'__metadata': {u'type': u'', u'uri': u'/ewa/environment_variable(5650)'}, u'id': 5650, u'value': u'7330634368117899', u'name': u'RESIN_RESTART'}]
```
### Function: is_system_variable(variable)

Check if a variable is system specific.

#### Args:
    variable (str): environment variable name.

#### Returns:
    bool: True if system variable, False otherwise.

#### Examples:
```python
>>> resin.models.environment_variables.application.is_system_variable('RESIN_API_KEY')
True
>>> resin.models.environment_variables.application.is_system_variable('APPLICATION_API_KEY')
False
```
### Function: remove(var_id)

Remove application environment variable.

#### Args:
    var_id (str): environment variable id.

#### Examples:
```python
>>> resin.models.environment_variables.application.remove(5652)
'OK'
```
### Function: update(var_id, value)

Update an environment variable value for application.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.

#### Examples:
```python
>>> resin.models.environment_variables.application.update(5652, 'new value')
'OK'
```
## DeviceEnvVariable

This class implements device environment variable model for Resin Python SDK.
### Function: create(uuid, env_var_name, value)

Create a device environment variable.

#### Args:
    uuid (str): device uuid.
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Returns:
    dict: new device environment variable info.

#### Examples:
```python
>>> resin.models.environment_variables.device.create('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143','test_env4', 'testing1')
{'name': u'test_env4', u'__metadata': {u'type': u'', u'uri': u'/resin/device_environment_variable(42166)'}, u'value': u'testing1', u'device': {u'__deferred': {u'uri': u'/resin/device(115792)'}, u'__id': 115792}, u'id': 42166}
```
### Function: get_all(uuid)

Get all device environment variables.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: device environment variables.

#### Examples:
```python
>>> resin.models.environment_variables.device.get_all('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
[{u'device': {u'__deferred': {u'uri': u'/ewa/device(122950)'}, u'__id': 122950}, u'__metadata': {u'type': u'', u'uri': u'/ewa/device_environment_variable(2173)'}, u'id': 2173, u'value': u'1322944771964103', u'env_var_name': u'RESIN_DEVICE_RESTART'}]
```
### Function: get_all_by_application(app_id)

Get all device environment variables for an application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: list of device environment variables.

#### Examples:
```python
>>> resin.models.environment_variables.device.get_all_by_application('5780')
[{'name': u'device1', u'__metadata': {u'type': u'', u'uri': u'/resin/device_environment_variable(40794)'}, u'value': u'test', u'device': {u'__deferred': {u'uri': u'/resin/device(115792)'}, u'__id': 115792}, u'id': 40794}, {'name': u'RESIN_DEVICE_RESTART', u'__metadata': {u'type': u'', u'uri': u'/resin/device_environment_variable(1524)'}, u'value': u'961506585823372', u'device': {u'__deferred': {u'uri': u'/resin/device(121794)'}, u'__id': 121794}, u'id': 1524}]
```
### Function: remove(var_id)

Remove a device environment variable.

#### Args:
    var_id (str): environment variable id.

#### Examples:
```python
>>> resin.models.environment_variables.device.remove(2184)
'OK'
```
### Function: update(var_id, value)

Update a device environment variable.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.

#### Examples:
```python
>>> resin.models.environment_variables.device.update(2184, 'new value')
'OK'
```
## Key

This class implements ssh key model for Resin Python SDK.
### Function: create(title, key)

Create a ssh key. This function only works if you log in using credentials or Auth Token.

#### Args:
    title (str): key title.
    key (str): the public ssh key.

#### Returns:
    str: new ssh key id.
### Function: get(id)

Get a single ssh key.

#### Args:
    id (str): key id.

#### Returns:
    dict: ssh key info.

#### Raises:
    KeyNotFound: if ssh key couldn't be found.
### Function: get_all()

Get all ssh keys.

#### Returns:
    list: list of ssh keys.
### Function: remove(id)

Remove a ssh key. This function only works if you log in using credentials or Auth Token.

#### Args:
    id (str): key id.
## Supervisor

This class implements supervisor model for Resin Python SDK.

#### Attributes:
    SUPERVISOR_API_VERSION (str): supervisor API version.
    RESIN_SUPERVISOR_ADDRESS (str): supervisor endpoint address on device.
    RESIN_SUPERVISOR_API_KEY (str): supervisor API key on device.
    _on_device (bool): API endpoint flag.
        If True then all commands will be sent to the API on device.
        If False then all command will be sent to the Resin API proxy endpoint (api.resin.io/supervisor/<url>).
        If RESIN_SUPERVISOR_ADDRESS and RESIN_SUPERVISOR_API_KEY are available, _on_device will be set to True by default. Otherwise, it's False.
### Function: blink(device_uuid, app_id)

Start a blink pattern on a LED for 15 seconds. This is the same with `resin.models.device.identify()`.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.blink(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'OK'
```
### Function: disable_tcp_ping(app_id, device_uuid)

Disable TCP ping.
When the device's connection to the Resin VPN is down, by default the device performs a TCP ping heartbeat to check for connectivity.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.disable_tcp_ping(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
(Empty response)
```
### Function: enable_tcp_ping(app_id, device_uuid)

Enable TCP ping in case it has been disabled.
When the device's connection to the Resin VPN is down, by default the device performs a TCP ping heartbeat to check for connectivity.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.enable_tcp_ping(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
(Empty response)
```
### Function: force_api_endpoint(endpoint)

Force all API commands to a specific endpoint.

#### Args:
    endpoint (bool): True if selecting the API on device. False if selecting the Resin API proxy endpoint.

#### Raises:
    InvalidOption: if endpoint value is not bool.
### Function: get_application_info(app_id, device_uuid)

Return information about the application running on the device.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains application information.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.get_application_info(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: get_device_state(app_id, device_uuid)

Return the current device state, as reported to the Resin API and with some extra fields added to allow control over pending/locked updates.
This function requires supervisor v1.6 or higher.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains device state.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.get_device_state(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
{u'status': u'Idle', u'update_failed': False, u'update_pending': False, u'download_progress': None, u'os_version': u'Resin OS 1.1.1', u'api_port': 48484, u'commit': u'ff812b9a5f82d9661fb23c24aa86dce9425f1112', u'update_downloaded': False, u'supervisor_version': u'1.7.0', u'ip_address': u'192.168.0.102'}
```
### Function: ping(device_uuid, app_id)

Check that the supervisor is alive and well.
No need to set device uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.

#### Returns:
    str: `OK` signals that the supervisor is alive and well.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not set.

#### Examples:
```python
>>> resin.models.supervisor.ping(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'OK'
```
### Function: purge(app_id, device_uuid)

Clears the user application's /data folder.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.purge(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
{u'Data': u'OK', u'Error': u''}
```
### Function: reboot(device_uuid, app_id, force)

Reboot the device.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.reboot(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
{u'Data': u'OK', u'Error': u''}
```
### Function: regenerate_supervisor_api_key(app_id, device_uuid)

Invalidate the current RESIN_SUPERVISOR_API_KEY and generates a new one.
The application will be restarted on the next update cycle to update the API key environment variable.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    str: new supervisor API key.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.regenerate_supervisor_api_key(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'480af7bb8a9cf56de8a1e295f0d50e6b3bb46676aaddbf4103aa43cb57039364'
```
### Function: restart(app_id, device_uuid)

Restart user application container.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    str: `OK` signals that the supervisor is alive and well.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.restart(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'OK'
```
### Function: shutdown(device_uuid, app_id, force)

Shut down the device.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.shutdown(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='8362')
{u'Data': u'OK', u'Error': u''}
```
### Function: start_application(app_id, device_uuid)

Starts a user application container, usually after it has been stopped with `stop_application()`.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains started application container id.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.start_application(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: stop_application(app_id, device_uuid)

Temporarily stops a user application container. Application container will not be removed after invoking this function and a reboot or supervisor restart will cause the container to start again.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains stopped application container id.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.stop_application(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: update(device_uuid, app_id, force)

Triggers an update check on the supervisor. Optionally, forces an update when updates are locked.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> resin.models.supervisor.update(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
(Empty Response)
```

```python
# Force an update
>>> resin.models.supervisor.update(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020', force=True)
(Empty Response)
```
## Auth

This class implements all authentication functions for Resin Python SDK.
### Function: authenticate()

This function authenticates provided credentials information.
You should use Auth.login when possible, as it takes care of saving the Auth Token and username as well.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Resin.io username.
        password (str): Password.

#### Returns:
    str: Auth Token,

#### Raises:
    LoginFailed: if the username or password is invalid.

#### Examples:
```python
>>> resin.auth.authenticate(username='<your email>', password='<your password>')
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTM5NywidXNlcm5hbWUiOiJnX3Ryb25nX25naGlhX25ndXllbiIsImVtYWlsIjoicmVzaW5weXRob25zZGt0ZXN0QGdtYWlsLmNvbSIsInNvY2lhbF9zZXJ2aWNlX2FjY291bnQiOlt7ImNyZWF0ZWRfYXQiOiIyMDE1LTExLTIzVDAzOjMwOjE0LjU3MloiLCJpZCI6MTE2NiwidXNlciI6eyJfX2RlZmVycmVkIjp7InVyaSI6Ii9ld2EvdXNlcig1Mzk3KSJ9LCJfX2lkIjo1Mzk3fSwicHJvdmlkZXIiOiJnb29nbGUiLCJyZW1vdGVfaWQiOiIxMDE4OTMzNzc5ODQ3NDg1NDMwMDIiLCJkaXNwbGF5X25hbWUiOiJUcm9uZyBOZ2hpYSBOZ3V5ZW4iLCJfX21ldGFkYXRhIjp7InVyaSI6Ii9ld2Evc29jaWFsX3NlcnZpY2VfYWNjb3VudCgxMTY2KSIsInR5cGUiOiIifX1dLCJoYXNfZGlzYWJsZWRfbmV3c2xldHRlciI6ZmFsc2UsImp3dF9zZWNyZXQiOiI0UDVTQzZGV1pIVU5JR0NDT1dJQUtST0tST0RMUTRNVSIsImhhc1Bhc3N3b3JkU2V0Ijp0cnVlLCJuZWVkc1Bhc3N3b3JkUmVzZXQiOmZhbHNlLCJwdWJsaWNfa2V5Ijp0cnVlLCJmZWF0dXJlcyI6W10sImludGVyY29tVXNlck5hbWUiOiJnX3Ryb25nX25naGlhX25ndXllbiIsImludGVyY29tVXNlckhhc2giOiI5YTM0NmUwZTgzNjk0MzYxODU3MTdjNWRhZTZkZWZhZDdiYmM4YzZkOGNlMzgxYjhhYTY5YWRjMTRhYWZiNGU0IiwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE0NDgyNTYzMDYsImV4cCI6MTQ0ODg2MTEwNn0.U9lfEpPHBRvGQSayASE-glI-lQtAjyIFYd00uXOUzLI'
```
### Function: get_email()

This function retrieves current logged in user's get_email

#### Returns:
    str: user email.

#### Raises:
    InvalidOption: if not logged in.

#### Examples:
```python
# If you are logged in.
>>> resin.auth.get_email()
u'resinpythonsdktest@gmail.com'
```
### Function: get_token()

This function retrieves Auth Token.

#### Returns:
    str: Auth Token.

#### Raises:
    InvalidOption: if not logged in and there is no token in Settings.

#### Examples:
```python
# If you are logged in.
>>> resin.auth.get_token()
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTM5NywidXNlcm5hbWUiOiJnX3Ryb25nX25naGlhX25ndXllbiIsImVtYWlsIjoicmVzaW5weXRob25zZGt0ZXN0QGdtYWlsLmNvbSIsInNvY2lhbF9zZXJ2aWNlX2FjY291bnQiOlt7ImNyZWF0ZWRfYXQiOiIyMDE1LTExLTIzVDAzOjMwOjE0LjU3MloiLCJpZCI6MTE2NiwidXNlciI6eyJfX2RlZmVycmVkIjp7InVyaSI6Ii9ld2EvdXNlcig1Mzk3KSJ9LCJfX2lkIjo1Mzk3fSwicHJvdmlkZXIiOiJnb29nbGUiLCJyZW1vdGVfaWQiOiIxMDE4OTMzNzc5ODQ3NDg1NDMwMDIiLCJkaXNwbGF5X25hbWUiOiJUcm9uZyBOZ2hpYSBOZ3V5ZW4iLCJfX21ldGFkYXRhIjp7InVyaSI6Ii9ld2Evc29jaWFsX3NlcnZpY2VfYWNjb3VudCgxMTY2KSIsInR5cGUiOiIifX1dLCJoYXNfZGlzYWJsZWRfbmV3c2xldHRlciI6ZmFsc2UsImp3dF9zZWNyZXQiOiI0UDVTQzZGV1pIVU5JR0NDT1dJQUtST0tST0RMUTRNVSIsImhhc1Bhc3N3b3JkU2V0Ijp0cnVlLCJuZWVkc1Bhc3N3b3JkUmVzZXQiOmZhbHNlLCJwdWJsaWNfa2V5Ijp0cnVlLCJmZWF0dXJlcyI6W10sImludGVyY29tVXNlck5hbWUiOiJnX3Ryb25nX25naGlhX25ndXllbiIsImludGVyY29tVXNlckhhc2giOiI5YTM0NmUwZTgzNjk0MzYxODU3MTdjNWRhZTZkZWZhZDdiYmM4YzZkOGNlMzgxYjhhYTY5YWRjMTRhYWZiNGU0IiwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE0NDgyNTY2ODMsImV4cCI6MTQ0ODg2MTQ4M30.oqq4DUI4cTbhzYznSwODZ_4zLOeGiJYuZRn82gTfQ6o'
```
### Function: get_user_id()

This function retrieves current logged in user's id.

#### Returns:
    str: user id.

#### Raises:
    InvalidOption: if not logged in.

#### Examples:
```python
# If you are logged in.
>>> resin.auth.get_user_id()
5397
```
### Function: is_logged_in()

This function checks if you're logged in

#### Returns:
    bool: True if logged in, False otherwise.

#### Examples:
```python
# Check if user logged in.
>>> if resin.auth.is_logged_in():
...     print('You are logged in!')
... else:
...     print('You are not logged in!')
```
### Function: log_out()

This function is used for logging out from Resin.io.

#### Returns:
    bool: True if successful, False otherwise.

#### Examples:
```python
# If you are logged in.
>>> resin.auth.log_out()
True
```
### Function: login()

This function is used for logging into Resin.io using email and password.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Resin.io email.
        password (str): Password.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    LoginFailed: if the email or password is invalid.

#### Examples:
```python
>>> from resin import Resin
>>> resin = Resin()
>>> credentials = {'username': '<your email>', 'password': '<your password>''}
>>> resin.auth.login(**credentials)
(Empty Return)
```
### Function: login_with_token(token)

This function is used for logging into Resin.io using Auth Token.
Auth Token can be found in Preferences section on Resin.io Dashboard.

#### Args:
    token (str): Auth Token.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    MalformedToken: if token is invalid.

#### Examples:
```python
>>> from resin import Resin
>>> resin = Resin()
>>> auth_token = <your token>
>>> resin.auth.login_with_token(auth_token)
(Empty Return)
```
### Function: register()

This function is used for registering to Resin.io.

#### Args:
    **credentials: credentials keyword arguments.
        email (str): email to register.
        password (str): Password.

#### Returns:
    str: Auth Token for new account.

#### Raises:
    RequestError: if error occurs during registration.

#### Examples:
```python
>>> credentials = {'email': '<your email>', 'password': '<your password>'}
>>> resin.auth.register(**credentials)
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTM5OCwidXNlcm5hbWUiOiJ0ZXN0MjcxMCIsImVtYWlsIjoidGVzdDI3MTBAZ21haWwuY29tIiwic29jaWFsX3NlcnZpY2VfYWNjb3VudCI6bnVsbCwiaGFzX2Rpc2FibGVkX25ld3NsZXR0ZXIiOmZhbHNlLCJqd3Rfc2VjcmV0IjoiQlJXR0ZIVUgzNVBKT0VKTVRSSVo2MjdINjVKVkJKWDYiLCJoYXNQYXNzd29yZFNldCI6dHJ1ZSwibmVlZHNQYXNzd29yZFJlc2V0IjpmYWxzZSwicHVibGljX2tleSI6ZmFsc2UsImZlYXR1cmVzIjpbXSwiaW50ZXJjb21Vc2VyTmFtZSI6InRlc3QyNzEwIiwiaW50ZXJjb21Vc2VySGFzaCI6IjNiYTRhZDRkZjk4MDQ1OTc1YmU2ZGUwYWJmNjFiYjRmYWY4ZmEzYTljZWI0YzE4Y2QxOGU1NmViNmI1NzkxZDAiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTQ0ODI1NzgyOCwiZXhwIjoxNDQ4ODYyNjI4fQ.chhf6deZ9BNDMmPr1Hm-SlRoWkK7t_4cktAPo12aCoE'
```
### Function: who_am_i()

This function retrieves username of logged in user.

#### Returns:
    str: username.

#### Raises:
    NotLoggedIn: if there is no user logged in.

#### Examples:
```python
>>> resin.auth.who_am_i()
u'g_trong_nghia_nguyen'
```
## Logs

This class implements functions that allow processing logs from device.

This class is implemented using pubnub python sdk.

For more details about pubnub, please visit: https://www.pubnub.com/docs/python/pubnub-python-sdk
### Function: get_channel(uuid)

This function returns pubnub channel for a specific device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    str: device channel.
### Function: history()

This function allows fetching historical device logs.

#### Args:
    uuid (str): device uuid.
    callback (function): this callback is called on receiving a message from the channel.
    error (function): this callback is called on an error event.
    For more details about callbacks in pubnub subscribe, visit here: https://www.pubnub.com/docs/python/api-reference#history

#### Examples:
```python
# Define callback and error.
>>> def callback(message):
...     print(message)
>>> def error(message):
...     print('Error:'+ str(message))
Logs.history(uuid=uuid, callback=callback, error=error)
```
### Function: subscribe()

This function allows subscribing to device logs.
Testing

#### Args:
    uuid (str): device uuid.
    callback (function): this callback is called on receiving a message from the channel.
    error (function): this callback is called on an error event.
    For more details about callbacks in pubnub subscribe, visit here: https://www.pubnub.com/docs/python/api-reference#subscribe

#### Examples:
```python
# Define callback and error.
>>> def callback(message, channel):
...     print(message)
>>> def error(message):
...     print('Error:'+ str(message))
>>> Logs.subscribe(uuid=uuid, callback=callback, error=error)
```
### Function: unsubscribe(uuid)

This function allows unsubscribing to device logs.

#### Args:
    uuid (str): device uuid.
## Settings

This class handles settings for Resin Python SDK.

#### Attributes:
    HOME_DIRECTORY (str): home directory path.
    CONFIG_SECTION (str): section name in configuration file.
    CONFIG_FILENAME (str): configuration file name.
    _setting (dict): default value to settings.
### Function: get(key)

Get a setting value.

#### Args:
    key (str): setting.

#### Returns:
    str: setting value.

#### Raises:
    InvalidOption: If getting a non-existent setting.

#### Examples:
```python
>>> resin.settings.get('api_endpoint')
'https://api.resin.io/'
```
### Function: get_all()

Get all settings.

#### Returns:
    dict: all settings.

#### Examples:
```python
>>> resin.settings.get_all()
{'image_cache_time': '604800000', 'api_endpoint': 'https://api.resin.io/', 'data_directory': '/root/.resin', 'token_refresh_interval': '3600000', 'cache_directory': '/root/.resin/cache', 'pine_endpoint': 'https://api.resin.io/ewa/'}
```
### Function: has(key)

Check if a setting exists.

#### Args:
    key (str): setting.

#### Returns:
    bool: True if exists, False otherwise.

#### Examples:
```python
>>> resin.settings.has('api_endpoint')
True
```
### Function: remove(key)

Remove a setting.

#### Args:
    key (str): setting.

#### Returns:
    bool: True if successful, False otherwise.

#### Examples:
```python
# Remove an existing key from settings
>>> resin.settings.remove('tmp')
True
# Remove a non-existing key from settings
>>> resin.settings.remove('tmp1')
False
```
### Function: set(key, value)

Set value for a setting.

#### Args:
    key (str): setting.
    value (str): setting value.

#### Examples:
```python
>>> resin.settings.set(key='tmp',value='123456')
(Empty Return)
```
## TwoFactorAuth

This class implements basic 2FA functionalities for Resin Python SDK.
### Function: challenge(code)

Challenge two-factor authentication.
If your account has two-factor authentication enabled and logging in using credentials, you need to pass two-factor authentication before being allowed to use other functions.

#### Args:
    code (str): two-factor authentication code.

#### Examples:
```python
# You need to enable two-factor authentication on dashboard first.
# Check if two-factor authentication is passed for current session.
>>> resin.twofactor_auth.is_passed()
False
>>> secret = resin.twofactor_auth.get_otpauth_secret()
>>> resin.twofactor_auth.challenge(resin.twofactor_auth.generate_code(secret))
# Check again if two-factor authentication is passed for current session.
>>> resin.twofactor_auth.is_passed()
True
```
### Function: generate_code(secret)

Generate two-factor authentication code.

#### Args:
    secret (str): one time password authentication secret string.

#### Returns:
    str: 6 digit two-factor authentication code.

#### Examples:
```python
>>> secret = resin.twofactor_auth.get_otpauth_secret()
>>> resin.twofactor_auth.generate_code(secret)
'259975'
```
### Function: get_otpauth_secret()

Retrieve one time password authentication secret string.
This function only works if you disable two-factor authentication or log in using Auth Token from dashboard.

#### Returns:
    str: one time password authentication secret string.

#### Examples:
```python
>>> resin.twofactor_auth.get_otpauth_secret()
'WGURB3DIUWXTGQDBGFNGKDLV2L3LXOVN'
```
### Function: is_enabled()

Check if two-factor authentication is enabled.

#### Returns:
    bool: True if enabled. Otherwise False.

#### Examples:
```python
>>> resin.twofactor_auth.is_enabled()
False
```
### Function: is_passed()

Check if two-factor authentication challenge was passed.

#### Returns:
    bool: True if enabled. Otherwise False.

#### Examples:
```python
>>> resin.twofactor_auth.is_passed()
True
```
