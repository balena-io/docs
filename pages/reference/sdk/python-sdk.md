## Balena Python SDK

Welcome to the balena python SDK documentation.
This document aims to describe all the functions supported by the SDK, as well as
showing examples of their expected usage.

Install the Balena SDK:

From Pip:
```
pip install balena-sdk
```

From Source (In case, you want to test a development branch):
```
https://github.com/balena-io/balena-sdk-python
```

Getting started:

```python
>>> from balena import Balena
>>> balena = Balena()
>>> credentials = {'username':<your email>, 'password':<your password>}
>>> balena.auth.login(**credentials)
...
```

If you feel something is missing, not clear or could be improved, [please don't
hesitate to open an issue in GitHub](https://github.com/balena-io/balena-sdk-python/issues), we'll be happy to help.

## Table of Contents
- [Balena](#balena)
    - [Models](#models)
        - [Application](#application)
        - [ApiKey](#apikey)
        - [Config](#config)
        - [ConfigVariable](#configvariable)
            - [ApplicationConfigVariable](#applicationconfigvariable)
            - [DeviceConfigVariable](#deviceconfigvariable)
        - [Device](#device)
        - [DeviceOs](#deviceos)
        - [EnvironmentVariable](#environmentvariable)
            - [ApplicationEnvVariable](#applicationenvvariable)
            - [ServiceEnvVariable](#serviceenvvariable)
            - [DeviceEnvVariable](#deviceenvvariable)
            - [DeviceServiceEnvVariable](#deviceserviceenvvariable)
        - [Image](#image)
        - [Release](#release)
        - [Service](#service)
        - [Tag](#tag)
            - [ApplicationTag](#applicationtag)
            - [DeviceTag](#devicetag)
            - [ReleaseTag](#releasetag)
        - [Key](#key)
        - [Supervisor](#supervisor)
    - [Auth](#auth)
    - [Logs](#logs)
    - [Settings](#settings)
    - [TwoFactorAuth](#twofactorauth)

## Models

This module implements all models for balena python SDK.
## Application

This class implements application model for balena python SDK.

The returned objects properties are `__metadata, actor, app_name, application_type, commit, depends_on__application, device_type, id, is_accessible_by_support_until__date, should_track_latest_release, slug, user`.
### Function: create(name, device_type, app_type)

Create an application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.
    device_type (str): device type (display form).
    app_type (Optional[str]): application type.

#### Returns:
    dict: application info.

#### Raises:
    InvalidDeviceType: if device type is not supported.
    InvalidApplicationType: if app type is not supported.

#### Examples:
```python
>>> balena.models.application.create('foo', 'Raspberry Pi 3', 'microservices-starter')
'{u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'foo', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12345)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12345, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/foo'}'
```
### Function: disable_device_urls(app_id)

Disable device urls for all devices that belong to an application.

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > balena.models.application.disable_device_urls('5685')
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
    >> > balena.models.application.disable_rolling_updates('106640')
    'OK'
### Function: enable_device_urls(app_id)

Enable device urls for all devices that belong to an application

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > balena.models.application.enable_device_urls('5685')
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
    >> > balena.models.application.enable_rolling_updates('106640')
    'OK'
### Function: generate_provisioning_key(app_id)

Generate a device provisioning key for a specific application.

#### Args:
    app_id (str): application id.

#### Returns:
    str: device provisioning key.

#### Examples:
    >> > balena.models.application.generate_provisioning_key('5685')
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
>>> balena.models.application.get('foo')
'{u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'foo', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12345)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12345, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/foo'}'
```
### Function: get_all()

Get all applications (including collaborator applications).

#### Returns:
    list: list contains info of applications.

#### Examples:
```python
>>> balena.models.application.get_all()
'[{u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'foo', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12345)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12345, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/foo'}, {u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'bar', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12346)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12346, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/bar'}]'
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
>>> balena.models.application.get_by_id(12345)
'{u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'foo', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12345)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12345, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/foo'}'
```
### Function: get_by_owner(name, owner)

Get a single application.

#### Args:
    name (str): application name.
    owner (str):  owner's username.

#### Returns:
    dict: application info.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
    AmbiguousApplication: when more than one application is returned.

#### Examples:
```python
>>> balena.models.application.get_by_owner('foo', 'my_user')
'{u'depends_on__application': None, u'should_track_latest_release': True, u'app_name': u'foo', u'application_type': {u'__deferred': {u'uri': u'/resin/application_type(5)'}, u'__id': 5}, u'__metadata': {u'type': u'', u'uri': u'/resin/application(12345)'}, u'is_accessible_by_support_until__date': None, u'actor': 12345, u'id': 12345, u'user': {u'__deferred': {u'uri': u'/resin/user(12345)'}, u'__id': 12345}, u'device_type': u'raspberrypi3', u'commit': None, u'slug': u'my_user/foo'}'
```
### Function: get_config(app_id, version)

Download application config.json.

#### Args:
    app_id (str): application id.
    version (str): the OS version of the image.
    **options (dict): OS configuration keyword arguments to use. The available options are listed below:
        network (Optional[str]): the network type that the device will use, one of 'ethernet' or 'wifi' and defaults to 'ethernet' if not specified.
        appUpdatePollInterval (Optional[str]): how often the OS checks for updates, in minutes.
        wifiKey (Optional[str]): the key for the wifi network the device will connect to.
        wifiSsid (Optional[str]): the ssid for the wifi network the device will connect to.
        ip (Optional[str]): static ip address.
        gateway (Optional[str]): static ip gateway.
        netmask (Optional[str]): static ip netmask.

#### Returns:
    dict: application config.json content.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
### Function: get_target_release_hash(app_id)

Get the hash of the current release for a specific application.

#### Args:
    app_id (str): application id.

#### Returns:
    str: The release hash of the current release.

#### Examples:
```python
>>> balena.models.application.get_target_release_hash('5685')
```
### Function: grant_support_access(app_id, expiry_timestamp)

Grant support access to an application until a specified time.

#### Args:
    app_id (str): application id.
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Returns:
    OK/error.

#### Examples:
    >> > balena.models.application.grant_support_access('5685', 1511974999000)
    'OK'
### Function: has(name)

Check if an application exists.

#### Args:
    name (str): application name.

#### Returns:
    bool: True if application exists, False otherwise.

#### Examples:
```python
>>> balena.models.application.has('foo')
True
```
### Function: has_any()

Check if the user has any applications.

#### Returns:
    bool: True if user has any applications, False otherwise.

#### Examples:
```python
>>> balena.models.application.has_any()
True
```
### Function: is_tracking_latest_release(app_id)

Get whether the application is up to date and is tracking the latest release for updates.

#### Args:
    app_id (str): application id.

#### Returns:
    bool: is tracking the latest release.

#### Examples:
    >> > balena.models.application.is_tracking_latest_release('5685')
    True
### Function: remove(name)

Remove application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.

#### Examples:
```python
>>> balena.models.application.remove('Edison')
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
>>> balena.models.application.restart('RPI1')
'OK'
```
### Function: revoke_support_access(app_id)

Revoke support access to an application.

#### Args:
    app_id (str): application id.

#### Returns:
    OK/error.

#### Examples:
    >> > balena.models.application.revoke_support_access('5685')
    'OK'
### Function: set_to_release(app_id, full_release_hash)

Set an application to a specific commit.

#### Args:
    app_id (str): application id.
    full_release_hash (str) : full_release_hash.

#### Returns:
    OK/error.

#### Examples:
    >> > balena.models.application.set_to_release('5685', '7dba4e0c461215374edad74a5b78f470b894b5b7')
    'OK'
### Function: track_latest_release(app_id)

Configure a specific application to track the latest available release.

#### Args:
    app_id (str): application id.

#### Examples:
```python
>>> balena.models.application.track_latest_release('5685')
```
### Function: will_track_new_releases(app_id)

Get whether the application is configured to receive updates whenever a new release is available.

#### Args:
    app_id (str): application id.

#### Returns:
    bool: is tracking the latest release.

#### Examples:
    >> > balena.models.application.will_track_new_releases('5685')
    True
## ApiKey

This class implements user API key model for balena python SDK.
### Function: create_api_key(name, description)

This function registers a new api key for the current user with the name given.

#### Args:
    name (str): user API key name.
    description (Optional[str]): API key description.

#### Returns:
    str: user API key.

#### Examples:
```python
>>> balena.models.api_key.create_api_key('myApiKey')
3YHD9DVPLe6LbjEgQb7FEFXYdtPEMkV9
```
### Function: get_all()

This function gets all API keys.

#### Returns:
    list: user API key.

#### Examples:
```python
>>> balena.models.api_key.get_all()
[{u'description': None, u'created_at': u'2018-04-06T03:53:34.189Z', u'__metadata': {u'type': u'', u'uri': u'/balena/api_key(1296047)'}, u'is_of__actor': {u'__deferred': {u'uri': u'/balena/actor(2454095)'}, u'__id': 2454095}, u'id': 1296047, u'name': u'myApiKey'}]
```
### Function: revoke(id)

This function revokes an API key.

#### Args:
    id (str): API key id.

#### Examples:
```python
>>> balena.models.api_key.revoke(1296047)
OK
```
### Function: update(id, api_key_info)

This function updates details of an API key.

#### Args:
    id (str): API key id.
    api_key_info: new API key info.
        name (str): new API key name.
        description (Optional[str]): new API key description.

#### Examples:
```python
>>> balena.models.api_key.update(1296047, {'name':'new name')
OK
```
## Config

This class implements configuration model for balena python SDK.

#### Attributes:
    _config (dict): caching configuration.
### Function: get_all()

Get all configuration.

#### Returns:
    dict: configuration information.

#### Examples:
```python
>>> balena.models.config.get_all()
{ all configuration details }
```
### Function: get_device_types()

Get device types configuration.

#### Returns:
    list: device types information.

#### Examples:
```python
>>> balena.models.config.get_device_types()
[ all configuration details ]
```
## ConfigVariable

This class is a wrapper for config variable models.
## ApplicationConfigVariable

This class implements application config variable model for balena python SDK.
### Function: create(app_id, config_var_name, value)

Create an application config variable.

#### Args:
    app_id (str): application id.
    config_var_name (str): application config variable name.
    value (str): application config variable value.

#### Returns:
    dict: new application config variable info.

#### Examples:
```python
>>> print(balena.models.config_variable.application_config_variable.create('1005160', 'BALENA_TEST_APP_CONFIG_VAR', 'test value'))
{"id":117738,"application":{"__deferred":{"uri":"/balena/application(1005160)"},"__id":1005160},"name":"BALENA_TEST_APP_CONFIG_VAR","value":"test value","__metadata":{"uri":"/balena/application_config_variable(117738)","type":""}}
```
### Function: get_all(app_id)

Get all application config variables belong to an application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: application config variables.

#### Examples:
```python
>>> balena.models.config_variable.application_config_variable.get_all('1005160')
[{u'application': {u'__deferred': {u'uri': u'/balena/application(1005160)'}, u'__id': 1005160}, u'__metadata': {u'type': u'', u'uri': u'/balena/application_config_variable(116965)'}, u'id': 116965, u'value': u'false', u'name': u'BALENA_SUPERVISOR_NATIVE_LOGGER'}]
```
### Function: remove(var_id)

Remove a application config environment variable.

#### Args:
    var_id (str): application config environment variable id.

#### Examples:
```python
>>> balena.models.config_variable.application_config_variable.remove('117738')
'OK'
```
### Function: update(var_id, value)

Update an application config variable.

#### Args:
    var_id (str): application config variable id.
    value (str): new application config variable value.

#### Examples:
```python
>>> balena.models.config_variable.application_config_variable.update('117738', 'new test value')
'OK'
```
## DeviceConfigVariable

This class implements device config variable model for balena python SDK.
### Function: create(uuid, config_var_name, value)

Create a device config variable.

#### Args:
    uuid (str): device uuid.
    config_var_name (str): device config variable name.
    value (str): device config variable value.

#### Returns:
    dict: new device config variable info.

#### Examples:
```python
>>> balena.models.config_variable.device_config_variable.create('f14a73b3a762396f7bfeacf5d530c316aa8cfeff307bea93422f71a106c344','BALENA_TEST_DEVICE_CONFIG_VAR','test value')
{u'device': {u'__deferred': {u'uri': u'/balena/device(1083716)'}, u'__id': 1083716}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_variable(163985)'}, u'id': 163985, u'value': u'test value', u'name': u'BALENA_TEST_DEVICE_CONFIG_VAR'}
```
### Function: get_all(uuid)

Get all device config variables belong to a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: device config variables.

#### Examples:
```python
>>> balena.models.config_variable.device_config_variable.get_all('f5213eac0d63ac47721b037a7406d306')
[{u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id74}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_variab8)'}, u'id': 130598, u'value': u'1', u'name': u'BALENA_HOST_CONFIG_avoid_'}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'_36574}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_var0597)'}, u'id': 130597, u'value': u'1', u'name': u'BALENA_HOST_CONFIG_disash'}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'},  1036574}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_(130596)'}, u'id': 130596, u'value': u'"i2c_arm=on","spi=on","audio=on"'': u'BALENA_HOST_CONFIG_dtparam'}, {u'device': {u'__deferred': {u'uri': udevice(1036574)'}, u'__id': 1036574}, u'__metadata': {u'type': u'', u'ubalena/device_config_variable(130595)'}, u'id': 130595, u'value': u'16', uu'BALENA_HOST_CONFIG_gpu_mem'}, {u'device': {u'__deferred': {u'uri': u'/rice(1036574)'}, u'__id': 1036574}, u'__metadata': {u'type': u'', u'uri':n/device_config_variable(130594)'}, u'id': 130594, u'value': u'false', uu'BALENA_HOST_LOG_TO_DISPLAY'}]
```
### Function: get_all_by_application(app_id)

Get all device config variables by application.

#### Args:
    app_id (int): application id.

#### Returns:
    list: device config variables.

#### Examples:
```python
>>> balena.models.config_variable.device_config_variable.get_all_by_application(1043050)
[{u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id74}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_variab8)'}, u'id': 130598, u'value': u'1', u'name': u'BALENA_HOST_CONFIG_avoid_'}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'_36574}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_var0597)'}, u'id': 130597, u'value': u'1', u'name': u'BALENA_HOST_CONFIG_disash'}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'},  1036574}, u'__metadata': {u'type': u'', u'uri': u'/balena/device_config_(130596)'}, u'id': 130596, u'value': u'"i2c_arm=on","spi=on","audio=on"'': u'BALENA_HOST_CONFIG_dtparam'}, {u'device': {u'__deferred': {u'uri': udevice(1036574)'}, u'__id': 1036574}, u'__metadata': {u'type': u'', u'ubalena/device_config_variable(130595)'}, u'id': 130595, u'value': u'16', uu'BALENA_HOST_CONFIG_gpu_mem'}, {u'device': {u'__deferred': {u'uri': u'/rice(1036574)'}, u'__id': 1036574}, u'__metadata': {u'type': u'', u'uri':n/device_config_variable(130594)'}, u'id': 130594, u'value': u'false', uu'BALENA_HOST_LOG_TO_DISPLAY'}]
```
### Function: remove(var_id)

Remove a device config environment variable.

#### Args:
    var_id (str): device config environment variable id.

#### Examples:
```python
>>> balena.models.config_variable.device_config_variable.remove('132715')
'OK'
```
### Function: update(var_id, value)

Update a device config variable.

#### Args:
    var_id (str): device config variable id.
    value (str): new device config variable value.

#### Examples:
```python
>>> balena.models.config_variable.device_config_variable.update('132715', 'new test value')
'OK'
```
## Device

This class implements device model for balena python SDK.

Due to API changes, the returned Device object schema has changed. Here are the formats of the old and new returned objects.

The old returned object's properties: `__metadata, actor, application, build, commit, created_at, custom_latitude, custom_longitude, device, device_type, download_progress, id, ip_address, is_connected_to_vpn, is_online, is_web_accessible, last_connectivity_event, last_vpn_event, latitude, local_id, location, lock_expiry_date, logs_channel, longitude, name, note, os_variant, os_version, provisioning_progress, provisioning_state, public_address, service_instance, status, supervisor_release, supervisor_version, support_expiry_date, user, uuid, vpn_address`.

The new returned object's properties (since python SDK v2.0.0): `__metadata, actor, belongs_to__application, belongs_to__user, created_at, custom_latitude, custom_longitude, device_type, download_progress, id, ip_address, is_accessible_by_support_until__date, is_connected_to_vpn, is_locked_until__date, is_managed_by__device, is_managed_by__service_instance, is_on__commit, is_online, is_web_accessible, last_connectivity_event, last_vpn_event, latitude, local_id, location, logs_channel, longitude, name, note, os_variant, os_version, provisioning_progress, provisioning_state, public_address, should_be_managed_by__supervisor_release, should_be_running__build, status, supervisor_version, uuid, vpn_address`.
### Function: disable_device_url(uuid)

Disable device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.device.disable_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
```
### Function: disable_lock_override(uuid)

Disable lock override.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: enable_device_url(uuid)

Enable device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
# Check if device url enabled.
>>> balena.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
False
# Enable device url.
>>> balena.models.device.enable_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
# Check device url again.
>>> balena.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
True
```
### Function: enable_lock_override(uuid)

Enable lock override.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: generate_device_key(uuid)

Generate a device key.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.device.generate_device_key('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a')
2UrtMWeLqYXfTznZo1xNuZQXmEE6cOZk
```
### Function: generate_uuid()

Generate a random device UUID.

#### Returns:
    str: a generated UUID.

#### Examples:
```python
>>> balena.models.device.generate_uuid()
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
>>> balena.models.device.get('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_connectivity_event': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}
```
### Function: get_all()

Get all devices.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all()
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_connectivity_event': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_all_by_application(name)

Get devices by application name.

#### Args:
    name (str): application name.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all_by_application('RPI1')
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_connectivity_event': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_all_by_application_id(appid)

Get devices by application name.

#### Args:
    appid (str): application id.

#### Returns:
    list: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all_by_application_id(1234)
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_connectivity_event': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
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
>>> balena.models.device.get_by_name('floral-mountain')
[{u'__metadata': {u'type': u'', u'uri': u'/ewa/device(122950)'}, u'last_connectivity_event': u'1970-01-01T00:00:00.000Z', u'is_web_accessible': False, u'device_type': u'raspberry-pi', u'id': 122950, u'logs_channel': None, u'uuid': u'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'note': None, u'os_version': None, u'location': u'', u'latitude': u'', u'status': None, u'public_address': u'', u'provisioning_state': None, u'user': {u'__deferred': {u'uri': u'/ewa/user(5397)'}, u'__id': 5397}, u'is_online': False, u'supervisor_version': None, u'ip_address': None, u'vpn_address': None, u'name': u'floral-mountain', u'download_progress': None, u'longitude': u'', u'commit': None, u'provisioning_progress': None, u'supervisor_release': None}]
```
### Function: get_dashboard_url(uuid)

Get balena Dashboard URL for a specific device.

#### Args:
    uuid (str): device uuid.

#### Examples:
```python
>>> balena.models.device.get_dashboard_url('19619a6317072b65a240b451f45f855d')
https://dashboard.balena.io/devices/19619a6317072b65a240b451f45f855d/summary
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
>>> balena.models.device.get_device_slug('Intel Edison')
u'intel-edison'
>>> balena.models.device.get_device_slug('Raspberry Pi')
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
>>> balena.models.device.get_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'https://8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143.balenadevice.io'
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
>>> balena.models.device.get_display_name('intel-edison')
u'Intel Edison'
>>> balena.models.device.get_display_name('raspberry-pi')
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
### Function: get_os_update_status(uuid)

        Get the OS update status of a device.

####         Args:
            uuid (str): device uuid.

####         Returns:
            dict: action response.

####         Examples:
```python
            >>> balena.models.device.get_os_update_status('b6070f4fea5edf808b576123157fe5ec')
            {u'status': u'done', u'parameters': {u'target_version': u'2.29.2+rev1.prod'}, u'stdout': u'[1554490814][LOG]Normalized target version: 2.29.2+rev1
', u'last_run': 1554491107242L, u'error': u'', u'action': u'resinhup'}
        
```
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
>>> balena.models.device.get_status('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'Offline'
```
### Function: get_supervisor_state(uuid)

Get the supervisor state on a device

#### Args:
    uuid (str): device uuid.

#### Returns:
    dict: supervisor state.

#### Examples:
```python
>>> balena.models.device.get_supervisor_state('b6070f4fea5edf808b576123157fe5ec')
{u'status': u'Idle', u'update_failed': False, u'os_version': u'balenaOS 2.29.0+rev1', u'download_progress': None, u'update_pending': False, u'api_port': u'48484', u'commit': u'd26dd8a68a47c40daaa1d32e03c96d934f37c53b', u'update_downloaded': False, u'supervisor_version': u'9.0.1', u'ip_address': u'192.168.100.16'}
```
### Function: get_supervisor_target_state(uuid)

Get the supervisor target state on a device

#### Args:
    uuid (str): device uuid.

#### Returns:
    dict: supervisor target state.

#### Examples:
```python
>>> balena.models.device.get_supervisor_target_state('b6070f4fea5edf808b576123157fe5ec')
{u'local': {u'name': u'holy-darkness', u'config': {u'RESIN_SUPERVISOR_NATIVE_LOGGER': u'true', u'RESIN_SUPERVISOR_POLL_INTERVAL': u'900000'}, u'apps': {u'1398898': {u'name': u'test-nuc', u'commit': u'f9d139b80a7df94f90d7b9098b1353b14ca31b85', u'releaseId': 850293, u'services': {u'229592': {u'imageId': 1016025, u'serviceName': u'main', u'image': u'registry2.balena-cloud.com/v2/27aa30131b770a4f993da9a54eca6ed8@sha256:f489c30335a0036ecf1606df3150907b32ea39d73ec6de825a549385022e3e22', u'running': True, u'environment': {}, u'labels': {u'io.resin.features.dbus': u'1', u'io.resin.features.firmware': u'1', u'io.resin.features.kernel-modules': u'1', u'io.resin.features.resin-api': u'1', u'io.resin.features.supervisor-api': u'1'}, u'privileged': True, u'tty': True, u'restart': u'always', u'network_mode': u'host', u'volumes': ['resin-data:/data']}}, u'volumes': {u'resin-data': {}}, u'networks': {}}}}, u'dependent': {u'apps': {}, u'devices': {}}}
```
### Function: get_supported_device_types()

Get device slug.

#### Returns:
    list: list of supported device types.
### Function: get_with_service_details(uuid)

Get a single device along with its associated services' essential details.

#### Args:
    uuid (str): device uuid.

#### Returns:
    dict: device info with associated services details.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.device.get_with_service_details('0fcd753af396247e035de53b4e43eec3')
{u'os_variant': u'prod', u'__metadata': {u'type': u'', u'uri': u'/balena/device(1136312)'}, u'is_managed_by__service_instance': {u'__deferred': {u'uri': u'/balena/service_instance(182)'}, u'__id': 182}, u'should_be_running__release': None, u'belongs_to__user': {u'__deferred': {u'uri': u'/balena/user(32986)'}, u'__id': 32986}, u'is_web_accessible': False, u'device_type': u'raspberrypi3', u'belongs_to__application': {u'__deferred': {u'uri': u'/balena/application(1116729)'}, u'__id': 1116729}, u'id': 1136312, u'is_locked_until__date': None, u'logs_channel': u'1da2f8db7c5edbf268ba6c34d91974de8e910eef0033a1172386ad27807552', u'uuid': u'0fcd753af396247e035de53b4e43eec3', u'is_managed_by__device': None, u'should_be_managed_by__supervisor_release': None, u'is_accessible_by_support_until__date': None, u'actor': 2895243, u'note': None, u'os_version': u'Balena OS 2.12.7+rev1', u'longitude': u'105.85', u'last_connectivity_event': u'2018-05-27T05:43:54.027Z', u'is_on__commit': u'01defe8bbd1b5b832b32c6e1d35890317671cbb5', u'location': u'Hanoi, Thanh Pho Ha Noi, Vietnam', u'status': u'Idle', u'public_address': u'14.231.243.124', u'is_connected_to_vpn': False, u'custom_latitude': u'', u'is_active': True, u'provisioning_state': u'', u'latitude': u'21.0333', u'custom_longitude': u'', 'current_services': {u'frontend': [{u'status': u'Running', u'download_progress': None, u'__metadata': {u'type': u'', u'uri': u'/balena/image_install(8952657)'}, u'install_date': u'2018-05-25T19:00:12.989Z', 'image_id': 296863, 'commit': u'01defe8bbd1b5b832b32c6e1d35890317671cbb5', 'service_id': 52327, u'id': 8952657}], u'data': [{u'status': u'Running', u'download_progress': None, u'__metadata': {u'type': u'', u'uri': u'/balena/image_install(8952656)'}, u'install_date': u'2018-05-25T19:00:12.989Z', 'image_id': 296864, 'commit': u'01defe8bbd1b5b832b32c6e1d35890317671cbb5', 'service_id': 52329, u'id': 8952656}], u'proxy': [{u'status': u'Running', u'download_progress': None, u'__metadata': {u'type': u'', u'uri': u'/balena/image_install(8952655)'}, u'install_date': u'2018-05-25T19:00:12.985Z', 'image_id': 296862, 'commit': u'01defe8bbd1b5b832b32c6e1d35890317671cbb5', 'service_id': 52328, u'id': 8952655}]}, u'is_online': False, u'supervisor_version': u'7.4.3', u'ip_address': u'192.168.0.102', u'provisioning_progress': None, u'owns__device_log': {u'__deferred': {u'uri': u'/balena/device_log(1136312)'}, u'__id': 1136312}, u'created_at': u'2018-05-25T10:55:47.825Z', u'download_progress': None, u'last_vpn_event': u'2018-05-27T05:43:54.027Z', u'device_name': u'billowing-night', u'local_id': None, u'vpn_address': None, 'current_gateway_downloads': []}
```
### Function: grant_support_access(uuid, expiry_timestamp)

Grant support access to a device until a specified time.

#### Args:
    uuid (str): device uuid.
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Returns:
    OK.

#### Examples:
    >> > balena.models.device.grant_support_access('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d', 1511974999000)
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
>>> balena.models.device.has_device_url('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
False
```
### Function: has_lock_override(uuid)

Check if a device has the lock override enabled.

#### Args:
    uuid (str): device uuid.

#### Returns:
    bool: lock override status.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: identify(uuid)

Identify device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.

#### Examples:
```python
>>> balena.models.device.identify('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
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
### Function: is_tracking_application_release(uuid)

Get whether the device is configured to track the current application release.

#### Args:
    uuid (str): device uuid.

#### Returns:
    bool: is tracking the current application release.

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
>>> balena.models.device.move('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'RPI1Test')
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
>>> balena.models.device.note('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'test device')
'OK'
```
### Function: register(app_id, uuid)

Register a new device with a balena application. This function only works if you log in using credentials or Auth Token.

#### Args:
    app_id (str): application id.
    uuid (str): device uuid.

#### Returns:
    dict: dictionary contains device info.

#### Examples:
```python
>>> device_uuid = balena.models.device.generate_uuid()
>>> balena.models.device.register('RPI1',device_uuid)
{'id':122950,'application':{'__deferred':{'uri':'/ewa/application(9020)'},'__id':9020},'user':{'__deferred':{'uri':'/ewa/user(5397)'},'__id':5397},'name':'floral-mountain','device_type':'raspberry-pi','uuid':'8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143','commit':null,'note':null,'status':null,'is_online':false,'last_connectivity_event':'1970-01-01T00:00:00.000Z','ip_address':null,'vpn_address':null,'public_address':'','os_version':null,'supervisor_version':null,'supervisor_release':null,'provisioning_progress':null,'provisioning_state':null,'download_progress':null,'is_web_accessible':false,'longitude':'','latitude':'','location':'','logs_channel':null,'__metadata':{'uri':'/ewa/device(122950)','type':''}}
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
>>> balena.models.device.rename('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143', 'python-sdk-test-device')
'OK'
# Check device name.
>>> balena.models.device.get_name('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
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
>>> balena.models.device.restart('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
'OK'
```
### Function: revoke_support_access(uuid)

Revoke support access to a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    OK.

#### Examples:
    >> > balena.models.device.revoke_support_access('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d')
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
>>> balena.models.device.set_custom_location('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a',location)
OK
```
### Function: set_to_release(uuid, commit_id)

Set device to a specific release.
Set an empty commit_id will restore rolling releases to the device.

#### Args:
    uuid (str): device uuid.
    commit_id (str) : commit id.

#### Returns:
    OK.

#### Examples:
```python
>>> balena.models.device.set_to_release('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d', '45c90004de73557ded7274d4896a6db90ea61e36')
'OK'
```
### Function: set_to_release_by_id(uuid, release_id)

Set device to a specific release by release id (please notice that release id is not the commit hash on balena dashboard).
Remove release_id will restore rolling releases to the device.

#### Args:
    uuid (str): device uuid.
    release_id (Optional[int]): release id.

#### Returns:
    OK.

#### Examples:
```python
>>> balena.models.device.set_to_release_by_id('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d', 165432)
'OK'
>>> balena.models.device.set_to_release_by_id('49b2a76b7f188c1d6f781e67c8f34adb4a7bfd2eec3f91d40b1efb75fe413d')
'OK'
```
### Function: start_os_update(uuid, target_os_version)

Start an OS update on a device.

#### Args:
    uuid (str): device uuid.
    target_os_version (str): semver-compatible version for the target device.
        Unsupported (unpublished) version will result in rejection.
        The version **must** be the exact version number, a "prod" variant and greater than the one running on the device.

#### Returns:
    dict: action response.

#### Raises:
    DeviceNotFound: if device couldn't be found.
    InvalidParameter|OsUpdateError: if target_os_version is invalid.

#### Examples:
```python
>>> balena.models.device.start_os_update('b6070f4fea5edf808b576123157fe5ec', '2.29.2+rev1.prod')
{u'status': u'in_progress', u'action': u'resinhup', u'parameters': {u'target_version': u'2.29.2+rev1.prod'}, u'last_run': 1554490809219L}
```
### Function: track_application_release(uuid)

Configure a specific device to track the current application release.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: unset_custom_location(uuid)

clear custom location for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.device.unset_custom_location('df09262c283b1dc1462d0e82caa7a88e52588b8c5d7475dd22210edec1c50a')
OK
```
## DeviceOs

This class implements device os model for balena python SDK.
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
>>> response = balena.models.device_os.download(**data)
>>> type(response)
<class 'requests.models.Response'>
>>> response['headers']
>>> response.headers
{'access-control-allow-methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS, HEAD', 'content-disposition': 'attachment; filename="balena-RPI1-0.1.0-1.1.0-7588720e0262.img"', 'content-encoding': 'gzip', 'transfer-encoding': 'chunked', 'x-powered-by': 'Express', 'connection': 'keep-alive', 'access-control-allow-credentials': 'true', 'date': 'Mon, 23 Nov 2015 15:13:39 GMT', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Content-Type, Authorization, Application-Record-Count, MaxDataServiceVersion, X-Requested-With', 'content-type': 'application/octet-stream', 'x-frame-options': 'DENY'}
```
### Function: get_config(app_id, options)

Get an application config.json.

#### Args:
    app_id (str): application id.
    options (dict): OS configuration options to use. The available options are listed below:
        version (str): the OS version of the image.
        network (Optional[str]): the network type that the device will use, one of 'ethernet' or 'wifi' and defaults to 'ethernet' if not specified.
        appUpdatePollInterval (Optional[str]): how often the OS checks for updates, in minutes.
        wifiKey (Optional[str]): the key for the wifi network the device will connect to.
        wifiSsid (Optional[str]): the ssid for the wifi network the device will connect to.
        ip (Optional[str]): static ip address.
        gateway (Optional[str]): static ip gateway.
        netmask (Optional[str]): static ip netmask.

#### Returns:
    dict: application config.json
### Function: get_device_os_semver_with_variant(os_version, os_variant)

Get current device os semver with variant.

#### Args:
    os_version (str): current os version.
    os_variant (str): os variant.

#### Examples:
```python
>>> balena.models.device_os.get_device_os_semver_with_variant('balenaOS 2.29.2+rev1', 'prod')
'2.29.2+rev1.prod'
```
### Function: get_supported_versions(device_type)

Get OS supported versions.

#### Args:
    device_type (str): device type slug

#### Returns:
    dict: the versions information, of the following structure:
        * versions - an array of strings, containing exact version numbers supported by the current environment.
        * recommended - the recommended version, i.e. the most recent version that is _not_ pre-release, can be `None`.
        * latest - the most recent version, including pre-releases.
        * default - recommended (if available) or latest otherwise.
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

This class is a wrapper for environment variable models.
## ApplicationEnvVariable

This class implements application environment variable model for balena python SDK.

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
    dict: new application environment info.

#### Examples:
```python
>>> balena.models.environment_variables.application.create('978062', 'test2', '123')
{'id': 91138, 'application': {'__deferred': {'uri': '/balena/application(978062)'}, '__id': 978062}, 'name': 'test2', 'value': '123', '__metadata': {'uri': '/balena/environment_variable(91138)', 'type': ''}}
```
### Function: get_all(app_id)

Get all environment variables by application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: application environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.application.get_all(9020)
[{u'application': {u'__deferred': {u'uri': u'/ewa/application(9020)'}, u'__id': 9020}, u'__metadata': {u'type': u'', u'uri': u'/ewa/environment_variable(5650)'}, u'id': 5650, u'value': u'7330634368117899', u'name': u'BALENA_RESTART'}]
```
### Function: is_system_variable(variable)

Check if a variable is system specific.

#### Args:
    variable (str): environment variable name.

#### Returns:
    bool: True if system variable, False otherwise.

#### Examples:
```python
>>> balena.models.environment_variables.application.is_system_variable('BALENA_API_KEY')
True
>>> balena.models.environment_variables.application.is_system_variable('APPLICATION_API_KEY')
False
```
### Function: remove(var_id)

Remove application environment variable.

#### Args:
    var_id (str): environment variable id.

#### Examples:
```python
>>> balena.models.environment_variables.application.remove(5652)
'OK'
```
### Function: update(var_id, value)

Update an environment variable value for application.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.

#### Examples:
```python
>>> balena.models.environment_variables.application.update(5652, 'new value')
'OK'
```
## ServiceEnvVariable

This class implements service environment variable model for balena python SDK.
### Function: create(app_id, service_name, env_var_name, value)

Create a service environment variable for application.

#### Args:
    app_id (str): application id.
    service_name(str): service name.
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Returns:
    str: new service environment variable info.

#### Examples:
```python
>>> balena.models.environment_variables.service_environment_variable.create('1005160', 'proxy', 'app_proxy', 'test value')
{"id":12444,"created_at":"2018-03-18T09:34:09.144Z","service":{"__deferred":{"uri":"/balena/service(21668)"},"__id":21668},"name":"app_proxy","value":"test value","__metadata":{"uri":"/balena/service_environment_variable(12444)","type":""}}
```
### Function: get_all_by_application(app_id)

Get all service environment variables by application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: service application environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.service_environment_variable.get_all_by_application('1005160')
[{u'name': u'app_data', u'service': {u'__deferred': {u'uri': u'/balena/service(21667)'}, u'__id': 21667}, u'created_at': u'2018-03-16T19:21:21.087Z', u'__metadata': {u'type': u'', u'uri': u'/balena/service_environment_variable(12365)'}, u'value': u'app_data_value', u'id': 12365}, {u'name': u'app_data1', u'service': {u'__deferred': {u'uri': u'/balena/service(21667)'}, u'__id': 21667}, u'created_at': u'2018-03-16T19:21:49.662Z', u'__metadata': {u'type': u'', u'uri': u'/balena/service_environment_variable(12366)'}, u'value': u'app_data_value', u'id': 12366}, {u'name': u'app_front', u'service': {u'__deferred': {u'uri': u'/balena/service(21669)'}, u'__id': 21669}, u'created_at': u'2018-03-16T19:22:06.955Z', u'__metadata': {u'type': u'', u'uri': u'/balena/service_environment_variable(12367)'}, u'value': u'front_value', u'id': 12367}]
```
### Function: remove(var_id)

Remove service environment variable.

#### Args:
    var_id (str): service environment variable id.

#### Examples:
```python
>>> balena.models.environment_variables.service_environment_variable.remove('12444')
'OK'
```
### Function: update(var_id, value)

Update a service environment variable value for application.

#### Args:
    var_id (str): service environment variable id.
    value (str): new service environment variable value.

#### Examples:
```python
>>> balena.models.environment_variables.service_environment_variable.update('12444', 'new test value')
'OK'
```
## DeviceEnvVariable

This class implements device environment variable model for balena python SDK.
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
>>> balena.models.environment_variables.device.create('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143','test_env4', 'testing1')
{'name': u'test_env4', u'__metadata': {u'type': u'', u'uri': u'/balena/device_environment_variable(42166)'}, u'value': u'testing1', u'device': {u'__deferred': {u'uri': u'/balena/device(115792)'}, u'__id': 115792}, u'id': 42166}
```
### Function: get_all(uuid)

Get all device environment variables.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: device environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.device.get_all('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
[{u'device': {u'__deferred': {u'uri': u'/ewa/device(122950)'}, u'__id': 122950}, u'__metadata': {u'type': u'', u'uri': u'/ewa/device_environment_variable(2173)'}, u'id': 2173, u'value': u'1322944771964103', u'env_var_name': u'BALENA_DEVICE_RESTART'}]
```
### Function: get_all_by_application(app_id)

Get all device environment variables for an application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: list of device environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.device.get_all_by_application('5780')
[{'name': u'device1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_environment_variable(40794)'}, u'value': u'test', u'device': {u'__deferred': {u'uri': u'/balena/device(115792)'}, u'__id': 115792}, u'id': 40794}, {'name': u'BALENA_DEVICE_RESTART', u'__metadata': {u'type': u'', u'uri': u'/balena/device_environment_variable(1524)'}, u'value': u'961506585823372', u'device': {u'__deferred': {u'uri': u'/balena/device(121794)'}, u'__id': 121794}, u'id': 1524}]
```
### Function: remove(var_id)

Remove a device environment variable.

#### Args:
    var_id (str): environment variable id.

#### Examples:
```python
>>> balena.models.environment_variables.device.remove(2184)
'OK'
```
### Function: update(var_id, value)

Update a device environment variable.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.

#### Examples:
```python
>>> balena.models.environment_variables.device.update(2184, 'new value')
'OK'
```
## DeviceServiceEnvVariable

This class implements device service variable model for balena python SDK.
### Function: create(uuid, service_name, env_var_name, value)

Create a device service environment variable.

#### Args:
    uuid (str): device uuid.
    service_name (str): service name.
    env_var_name (str): device service environment variable name.
    value (str): device service environment variable value.

#### Returns:
    dict: new device service environment variable info.

#### Examples:
```python
>>> balena.models.environment_variables.device_service_environment_variable.create('f5213eac0d63ac47721b037a7406d306', 'data', 'dev_data_sdk', 'test1')
{"id":28970,"created_at":"2018-03-17T10:13:14.184Z","service_install":{"__deferred":{"uri":"/balena/service_install(30789)"},"__id":30789},"value":"test1","name":"dev_data_sdk","__metadata":{"uri":"/balena/device_service_environment_variable(28970)","type":""}}
```
### Function: get_all(uuid)

Get all device service environment variables belong to a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: device service environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.device_service_environment_variable.get_all('f5213eac0d63ac47721b037a7406d306')
[{u'name': u'dev_proxy', u'created_at': u'2018-03-16T19:23:21.727Z', u'__metadata': {u'type': u'', u'uri': u'/balena/device_service_environment_variable(28888)'}, u'value': u'value', u'service_install': [{u'__metadata': {u'type': u'', u'uri': u'/balena/service_install(30788)'}, u'id': 30788, u'service': [{u'service_name': u'proxy', u'__metadata': {u'type': u'', u'uri': u'/balena/service(NaN)'}}]}], u'id': 28888}, {u'name': u'dev_data', u'created_at': u'2018-03-16T19:23:11.614Z', u'__metadata': {u'type': u'', u'uri': u'/balena/device_service_environment_variable(28887)'}, u'value': u'dev_data_value', u'service_install': [{u'__metadata': {u'type': u'', u'uri': u'/balena/service_install(30789)'}, u'id': 30789, u'service': [{u'service_name': u'data', u'__metadata': {u'type': u'', u'uri': u'/balena/service(NaN)'}}]}], u'id': 28887}, {u'name': u'dev_data1', u'created_at': u'2018-03-17T05:53:19.257Z', u'__metadata': {u'type': u'', u'uri': u'/balena/device_service_environment_variable(28964)'}, u'value': u'aaaa', u'service_install': [{u'__metadata': {u'type': u'', u'uri': u'/balena/service_install(30789)'}, u'id': 30789, u'service': [{u'service_name': u'data', u'__metadata': {u'type': u'', u'uri': u'/balena/service(NaN)'}}]}], u'id': 28964}]
```
### Function: get_all_by_application(app_id)

Get all device service environment variables belong to an application.

#### Args:
    app_id (int): application id.

#### Returns:
    list: list of device service environment variables.

#### Examples:
```python
>>> balena.models.environment_variables.device_service_environment_variable.get_all_by_application(1043050)
[{'name': u'device1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_environment_variable(40794)'}, u'value': u'test', u'device': {u'__deferred': {u'uri': u'/balena/device(115792)'}, u'__id': 115792}, u'id': 40794}, {'name': u'BALENA_DEVICE_RESTART', u'__metadata': {u'type': u'', u'uri': u'/balena/device_environment_variable(1524)'}, u'value': u'961506585823372', u'device': {u'__deferred': {u'uri': u'/balena/device(121794)'}, u'__id': 121794}, u'id': 1524}]
```
### Function: remove(var_id)

Remove a device service environment variable.

#### Args:
    var_id (str): device service environment variable id.

#### Examples:
```python
>>> balena.models.environment_variables.device_service_environment_variable.remove('28970')
'OK'
```
### Function: update(var_id, value)

Update a device service environment variable.

#### Args:
    var_id (str): device environment variable id.
    value (str): new device environment variable value.

#### Examples:
```python
>>> balena.models.environment_variables.device_service_environment_variable.update('28970', 'test1 new value')
'OK'
```
## Image

This class implements image model for balena python SDK.
### Function: get(id)

Get a specific image.

#### Args:
    id (str): image id.

#### Returns:
    dict: image info.

#### Raises:
    ImageNotFound: if image couldn't be found.
### Function: get_log(id)

Get the build log from an image.

#### Args:
    id (str): image id.

#### Returns:
    str: build log.

#### Raises:
    ImageNotFound: if image couldn't be found.
## Release

This class implements release model for balena python SDK.
### Function: get(id)

Get a specific release.

#### Args:
    id (str): release id.

#### Returns:
    dict: release info.

#### Raises:
    ReleaseNotFound: if release couldn't be found.
### Function: get_all_by_application(app_id)

Get all releases from an application.

#### Args:
    app_id (str): applicaiton id.

#### Returns:
    list: release info.
### Function: get_latest_by_application(app_id)

Get the latest successful release for an application.

#### Args:
    app_id (str): applicaiton id.

#### Returns:
    dict: release info.
### Function: get_with_image_details(id)

Get a specific release with the details of the images built.

#### Args:
    id (str): release id.

#### Returns:
    dict: release info.

#### Raises:
    ReleaseNotFound: if release couldn't be found.
## Service

This class implements service model for balena python SDK.
### Function: get_all_by_application(app_id)

Get all services from an application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: service info.
## Tag

This class is a wrapper for Tag models.
## DeviceTag

This class implements device tag model for balena python SDK.
### Function: get_all()

Get all device tags.

#### Returns:
    list: list contains device tags.

#### Examples:
```python
>>> balena.models.tag.device.get_all()
[{u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'db_tag', u'id': 20157, u'value': u'rpi3', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20157)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055117)'}, u'__id': 1055117}, u'tag_key': u'group1', u'id': 20158, u'value': u'aaa', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20158)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'group1', u'id': 20159, u'value': u'bbb', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20159)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'db_tag', u'id': 20160, u'value': u'aaa', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20160)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'newtag', u'id': 20161, u'value': u'test1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20161)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'newtag1', u'id': 20162, u'value': u'test1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20162)'}}]
```
### Function: get_all_by_application(app_id)

Get all device tags for an application.

#### Args:
    app_id (str): application id .

#### Returns:
    list: list contains device tags.

#### Examples:
```python
>>> balena.models.tag.device.get_all_by_application('1005160')
[{u'device': {u'__deferred': {u'uri': u'/balena/device(1055117)'}, u'__id': 1055117}, u'tag_key': u'group1', u'id': 20158, u'value': u'aaa', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20158)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'group1', u'id': 20159, u'value': u'bbb', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20159)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'db_tag', u'id': 20160, u'value': u'aaa', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20160)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'db_tag', u'id': 20157, u'value': u'rpi3', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20157)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'newtag', u'id': 20161, u'value': u'test1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20161)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'newtag1', u'id': 20162, u'value': u'test1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20162)'}}]
```
### Function: get_all_by_device(uuid)

Get all device tags for a device.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: list contains device tags.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.tag.device.get_all_by_device('a03ab646c01f39e39a1e3deb7fce76b93075c6d599fd5be4a889b8145e2f8f')
[{u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'group1', u'id': 20159, u'value': u'bbb', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20159)'}}, {u'device': {u'__deferred': {u'uri': u'/balena/device(1055116)'}, u'__id': 1055116}, u'tag_key': u'db_tag', u'id': 20160, u'value': u'aaa', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20160)'}}]
```
### Function: remove(uuid, tag_key)

Remove a device tag.

#### Args:
    uuid (str): device uuid.
    tag_key (str): tag key.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.tag.device.remove('f5213eac0d63ac47721b037a7406d306', 'testtag'))
OK
```
### Function: set(uuid, tag_key, value)

Set a device tag (update tag value if it exists).

#### Args:
    uuid (str): device uuid.
    tag_key (str): tag key.
    value (str): tag value.

#### Returns:
    dict: dict contains device tag info if tag doesn't exist.
    OK: if tag exists.

#### Raises:
    DeviceNotFound: if device couldn't be found.

#### Examples:
```python
>>> balena.models.tag.device.set('f5213eac0d63ac47721b037a7406d306', 'testtag','test1')
{u'device': {u'__deferred': {u'uri': u'/balena/device(1036574)'}, u'__id': 1036574}, u'tag_key': u'testtag', u'id': 20163, u'value': u'test1', u'__metadata': {u'type': u'', u'uri': u'/balena/device_tag(20163)'}}
>>> balena.models.tag.device.set('f5213eac0d63ac47721b037a7406d306', 'testtag','test2')
OK
```
## ApplicationTag

This class implements application tag model for balena python SDK.
### Function: get_all()

Get all application tags.

#### Returns:
    list: list contains application tags.

#### Examples:
```python
>>> balena.models.tag.application.get_all()
[{u'application': {u'__deferred': {u'uri': u'/balena/application(1005160)'}, u'__id': 1005160}, u'tag_key': u'appTag', u'id': 12886, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12886)'}}, {u'application': {u'__deferred': {u'uri': u'/balena/application(1005767)'}, u'__id': 1005767}, u'tag_key': u'appTa1', u'id': 12887, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12887)'}}, {u'application': {u'__deferred': {u'uri': u'/balena/application(1005767)'}, u'__id': 1005767}, u'tag_key': u'appTag2', u'id': 12888, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12888)'}}]
```
### Function: get_all_by_application(app_id)

Get all application tags for an application.

#### Args:
    app_id (str): application id .

#### Returns:
    list: list contains application tags.

#### Examples:
```python
>>> balena.models.tag.application.get_all_by_application('1005767')
[{u'application': {u'__deferred': {u'uri': u'/balena/application(1005767)'}, u'__id': 1005767}, u'tag_key': u'appTa1', u'id': 12887, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12887)'}}, {u'application': {u'__deferred': {u'uri': u'/balena/application(1005767)'}, u'__id': 1005767}, u'tag_key': u'appTag2', u'id': 12888, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12888)'}}]
```
### Function: remove(app_id, tag_key)

Remove an application tag.

#### Args:
    app_id (str): application id.
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.tag.application.remove('1005767', 'tag1')
OK
```
### Function: set(app_id, tag_key, value)

Set an application tag (update tag value if it exists).

#### Args:
    app_id (str): application id.
    tag_key (str): tag key.
    value (str): tag value.

#### Returns:
    dict: dict contains application tag info if tag doesn't exist.
    OK: if tag exists.

#### Examples:
```python
>>> balena.models.tag.application.set('1005767', 'tag1', 'Python SDK')
{u'application': {u'__deferred': {u'uri': u'/balena/application(1005767)'}, u'__id': 1005767}, u'tag_key': u'tag1', u'id': 12889, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/application_tag(12889)'}}
>>> balena.models.tag.application.set('1005767', 'tag1','Balena Python SDK')
OK
```
## ReleaseTag

This class implements release tag model for balena python SDK.
### Function: get_all()

Get all release tags.

#### Returns:
    list: list contains release tags.

#### Examples:
```python
>>> balena.models.tag.release.get_all()
[{u'release': {u'__deferred': {u'uri': u'/balena/release(465307)'}, u'__id': 465307}, u'tag_key': u'releaseTag1', u'id': 135, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/release_tag(135)'}}]
```
### Function: get_all_by_application(app_id)

Get all release tags for an application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: list contains release tags.

#### Examples:
```python
>>> balena.models.tag.release.get_all_by_application('1043050')
[{u'release': {u'__deferred': {u'uri': u'/balena/release(465307)'}, u'__id': 465307}, u'tag_key': u'releaseTag1', u'id': 135, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/release_tag(135)'}}]
```
### Function: get_all_by_release(release_id)

Get all release tags for a release.

#### Args:
    release_id (str): release id.

#### Returns:
    list: list contains release tags.

#### Examples:
```python
>>> balena.models.tag.release.get_all_by_release('135')
[{u'release': {u'__deferred': {u'uri': u'/balena/release(465307)'}, u'__id': 465307}, u'tag_key': u'releaseTag1', u'id': 135, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/release_tag(135)'}}]
```
### Function: remove(release_id, tag_key)

Remove a release tag.

#### Args:
    release_id (str): release id.
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.tag.release.remove('135', 'releaseTag1')
OK
```
### Function: set(release_id, tag_key, value)

Set a release tag (update tag value if it exists).

#### Args:
    release_id (str): release id.
    tag_key (str): tag key.
    value (str): tag value.

#### Returns:
    dict: dict contains release tag info if tag doesn't exist.
    OK: if tag exists.

#### Examples:
```python
>>> balena.models.tag.release.set('465307', 'releaseTag1', 'Python SDK')
{u'release': {u'__deferred': {u'uri': u'/balena/release(465307)'}, u'__id': 465307}, u'tag_key': u'releaseTag1', u'id': 135, u'value': u'Python SDK', u'__metadata': {u'type': u'', u'uri': u'/balena/release_tag(135)'}}
>>> balena.models.tag.release.set('465307', 'releaseTag1', 'Python SDK 1')
OK
```
## Key

This class implements ssh key model for balena python SDK.
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

This class implements supervisor model for balena python SDK.

#### Attributes:
    SUPERVISOR_API_VERSION (str): supervisor API version.
    SUPERVISOR_ADDRESS (str): supervisor endpoint address on device.
    SUPERVISOR_API_KEY (str): supervisor API key on device.
    _on_device (bool): API endpoint flag.
        If True then all commands will be sent to the API on device.
        If False then all command will be sent to the balena API proxy endpoint (api.balena.io/supervisor/<url>).
        If SUPERVISOR_ADDRESS and SUPERVISOR_API_KEY are available, _on_device will be set to True by default. Otherwise, it's False.
### Function: blink(device_uuid, app_id)

Start a blink pattern on a LED for 15 seconds. This is the same with `balena.models.device.identify()`.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.blink(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'OK'
```
### Function: force_api_endpoint(endpoint)

Force all API commands to a specific endpoint.

#### Args:
    endpoint (bool): True if selecting the API on device. False if selecting the balena API proxy endpoint.

#### Raises:
    InvalidOption: if endpoint value is not bool.
### Function: get_application_info(app_id, device_uuid)

***Deprecated***
Return information about the application running on the device.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains application information.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.get_application_info(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: get_device_state(app_id, device_uuid)

Return the current device state, as reported to the balena API and with some extra fields added to allow control over pending/locked updates.
This function requires supervisor v1.6 or higher.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains device state.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.get_device_state(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
{u'status': u'Idle', u'update_failed': False, u'update_pending': False, u'download_progress': None, u'os_version': u'Balena OS 1.1.1', u'api_port': 48484, u'commit': u'ff812b9a5f82d9661fb23c24aa86dce9425f1112', u'update_downloaded': False, u'supervisor_version': u'1.7.0', u'ip_address': u'192.168.0.102'}
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
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not set.

#### Examples:
```python
>>> balena.models.supervisor.ping(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
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
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.purge(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
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
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.reboot(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
{u'Data': u'OK', u'Error': u''}
```
### Function: regenerate_supervisor_api_key(app_id, device_uuid)

Invalidate the current SUPERVISOR_API_KEY and generates a new one.
The application will be restarted on the next update cycle to update the API key environment variable.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    app_id (Optional[str]): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    str: new supervisor API key.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.regenerate_supervisor_api_key(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
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
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.restart(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
'OK'
```
### Function: restart_service(device_uuid, image_id)

Restart a service on device.

#### Args:
    device_uuid (str): device uuid.
    image_id (int): id of the image to start

#### Examples:
```python
>>> balena.models.supervisor.restart_service('f3887b184396844f52402c5cf09bd3b9', 392229)
OK
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
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.shutdown(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='8362')
{u'Data': u'OK', u'Error': u''}
```
### Function: start_application(app_id, device_uuid)

***Deprecated***
Starts a user application container, usually after it has been stopped with `stop_application()`.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains started application container id.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.start_application(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: start_service(device_uuid, image_id)

Start a service on device.

#### Args:
    device_uuid (str): device uuid.
    image_id (int): id of the image to start

#### Examples:
```python
>>> balena.models.supervisor.start_service('f3887b184396844f52402c5cf09bd3b9', 392229)
OK
```
### Function: stop_application(app_id, device_uuid)

***Deprecated***
Temporarily stops a user application container. Application container will not be removed after invoking this function and a reboot or supervisor restart will cause the container to start again.
This function requires supervisor v1.8 or higher.
No need to set device_uuid if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_uuid (Optional[str]): device uuid.

#### Returns:
    dict: dictionary contains stopped application container id.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.stop_application(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
```
### Function: stop_service(device_uuid, image_id)

Stop a service on device.

#### Args:
    device_uuid (str): device uuid.
    image_id (int): id of the image to start

#### Examples:
```python
>>> balena.models.supervisor.stop_service('f3887b184396844f52402c5cf09bd3b9', 392229)
OK
```
### Function: update(device_uuid, app_id, force)

Triggers an update check on the supervisor. Optionally, forces an update when updates are locked.
No need to set device_uuid and app_id if command is sent to the API on device.

#### Args:
    device_uuid (Optional[str]): device uuid.
    app_id (Optional[str]): application id.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Raises:
    InvalidOption: if the endpoint is balena API proxy endpoint and device_uuid or app_id is not specified.

#### Examples:
```python
>>> balena.models.supervisor.update(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020')
(Empty Response)
```

```python
# Force an update
>>> balena.models.supervisor.update(device_uuid='8f66ec7335267e7cc7999ca9eec029a01ea7d823214c742ace5cfffaa21be3', app_id='9020', force=True)
(Empty Response)
```
## Auth

This class implements all authentication functions for balena python SDK.
### Function: authenticate()

This function authenticates provided credentials information.
You should use Auth.login when possible, as it takes care of saving the Auth Token and username as well.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Balena username.
        password (str): Password.

#### Returns:
    str: Auth Token,

#### Raises:
    LoginFailed: if the username or password is invalid.

#### Examples:
```python
>>> balena.auth.authenticate(username='<your email>', password='<your password>')
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
>>> balena.auth.get_email()
u'balenapythonsdktest@gmail.com'
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
>>> balena.auth.get_token()
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
>>> balena.auth.get_user_id()
5397
```
### Function: is_logged_in()

This function checks if you're logged in

#### Returns:
    bool: True if logged in, False otherwise.

#### Examples:
```python
# Check if user logged in.
>>> if balena.auth.is_logged_in():
...     print('You are logged in!')
... else:
...     print('You are not logged in!')
```
### Function: log_out()

This function is used for logging out from balena.

#### Returns:
    bool: True if successful, False otherwise.

#### Examples:
```python
# If you are logged in.
>>> balena.auth.log_out()
True
```
### Function: login()

This function is used for logging into balena using email and password.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Balena email.
        password (str): Password.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    LoginFailed: if the email or password is invalid.

#### Examples:
```python
>>> from balena import Balena
>>> balena = Balena()
>>> credentials = {'username': '<your email>', 'password': '<your password>''}
>>> balena.auth.login(**credentials)
(Empty Return)
```
### Function: login_with_token(token)

This function is used for logging into balena using Auth Token.
Auth Token can be found in Preferences section on balena Dashboard.

#### Args:
    token (str): Auth Token.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    MalformedToken: if token is invalid.

#### Examples:
```python
>>> from balena import Balena
>>> balena = Balena()
>>> auth_token = <your token>
>>> balena.auth.login_with_token(auth_token)
(Empty Return)
```
### Function: register()

This function is used for registering to balena.

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
>>> balena.auth.register(**credentials)
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
>>> balena.auth.who_am_i()
u'g_trong_nghia_nguyen'
```
## Logs

This class implements functions that allow processing logs from device.
### Function: history(uuid, count)

Get device logs history.

#### Args:
    uuid (str): device uuid.
    count (Optional[int]): this callback is called on receiving a message from the channel.
### Function: subscribe(uuid, callback, error, count)

Subscribe to device logs.

#### Args:
    uuid (str): device uuid.
    callback (function): this callback is called on receiving a message.
    error (Optional[function]): this callback is called on an error event.
    count (Optional[int]): number of historical messages to include.

#### Returns:
    dict: a log entry will contain the following keys: `isStdErr, timestamp, message, isSystem, createdAt`.
### Function: unsubscribe(uuid)

Unsubscribe from device logs for a specific device.

#### Args:
    uuid (str): device uuid.
### Function: unsubscribe_all()

Unsubscribe all subscribed devices.
## Settings

This class handles settings for balena python SDK.

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
>>> balena.settings.get('api_endpoint')
'https://api.balena.io/'
```
### Function: get_all()

Get all settings.

#### Returns:
    dict: all settings.

#### Examples:
```python
>>> balena.settings.get_all()
{'image_cache_time': '604800000', 'api_endpoint': 'https://api.balena.io/', 'data_directory': '/root/.balena', 'token_refresh_interval': '3600000', 'cache_directory': '/root/.balena/cache', 'pine_endpoint': 'https://api.balena.io/ewa/'}
```
### Function: has(key)

Check if a setting exists.

#### Args:
    key (str): setting.

#### Returns:
    bool: True if exists, False otherwise.

#### Examples:
```python
>>> balena.settings.has('api_endpoint')
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
>>> balena.settings.remove('tmp')
True
# Remove a non-existing key from settings
>>> balena.settings.remove('tmp1')
False
```
### Function: set(key, value)

Set value for a setting.

#### Args:
    key (str): setting.
    value (str): setting value.

#### Examples:
```python
>>> balena.settings.set(key='tmp',value='123456')
(Empty Return)
```
## TwoFactorAuth

This class implements basic 2FA functionalities for balena python SDK.
### Function: challenge(code)

Challenge two-factor authentication.
If your account has two-factor authentication enabled and logging in using credentials, you need to pass two-factor authentication before being allowed to use other functions.

#### Args:
    code (str): two-factor authentication code.

#### Examples:
```python
# You need to enable two-factor authentication on dashboard first.
# Check if two-factor authentication is passed for current session.
>>> balena.twofactor_auth.is_passed()
False
>>> secret = balena.twofactor_auth.get_otpauth_secret()
>>> balena.twofactor_auth.challenge(balena.twofactor_auth.generate_code(secret))
# Check again if two-factor authentication is passed for current session.
>>> balena.twofactor_auth.is_passed()
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
>>> secret = balena.twofactor_auth.get_otpauth_secret()
>>> balena.twofactor_auth.generate_code(secret)
'259975'
```
### Function: get_otpauth_secret()

Retrieve one time password authentication secret string.
This function only works if you disable two-factor authentication or log in using Auth Token from dashboard.

#### Returns:
    str: one time password authentication secret string.

#### Examples:
```python
>>> balena.twofactor_auth.get_otpauth_secret()
'WGURB3DIUWXTGQDBGFNGKDLV2L3LXOVN'
```
### Function: is_enabled()

Check if two-factor authentication is enabled.

#### Returns:
    bool: True if enabled. Otherwise False.

#### Examples:
```python
>>> balena.twofactor_auth.is_enabled()
False
```
### Function: is_passed()

Check if two-factor authentication challenge was passed.

#### Returns:
    bool: True if enabled. Otherwise False.

#### Examples:
```python
>>> balena.twofactor_auth.is_passed()
True
```
