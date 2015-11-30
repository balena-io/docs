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
        - [Config](#config)
        - [Device](#device)
        - [DeviceOs](#deviceos)
        - [EnvironmentVariable](#environmentvariable)
            - [DeviceEnvVariable](#deviceenvvariable)
            - [ApplicationEnvVariable](#applicationenvvariable)
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
### Function: create(name, device_type)

Create an application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.
    device_type (str): device type (display form).

#### Returns:
    dict: application info.

#### Raises:
    InvalidDeviceType: if device type is not supported.
### Function: get(name)

Get a single application.

#### Args:
    name (str): application name.

#### Returns:
    dict: application info.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
### Function: get_all()

Get all applications.

#### Returns:
    list: list contains info of applications.
### Function: get_api_key(name)

Get the API key for a specific application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.

#### Returns:
    str: API key.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
### Function: get_by_id(app_id)

Get a single application by application id.

#### Args:
    app_id (str): application id.

#### Returns:
    dict: application info.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
### Function: has(name)

Check if an application exists.

#### Args:
    name (str): application name.

#### Returns:
    bool: True if application exists, False otherwise.
### Function: has_any()

Check if the user has any applications.

#### Returns:
    bool: True if user has any applications, False otherwise.
### Function: remove(name)

Remove application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.
### Function: restart(name)

Restart application. This function only works if you log in using credentials or Auth Token.

#### Args:
    name (str): application name.

#### Raises:
    ApplicationNotFound: if application couldn't be found.
## Device

This class implements device model for Resin Python SDK.
### Function: disable_device_url(uuid)

Disable device url for a device.

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
### Function: generate_uuid()

Generate a random device UUID.

#### Returns:
    str: a generated UUID.
### Function: get(uuid)

Get a single device by device uuid.

#### Args:
    uuid (str): device uuid.

#### Returns:
    dict: device info.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: get_all()

Get all devices.

#### Returns:
    list: list contains info of devices.
### Function: get_all_by_application(name)

Get devices by application name.

#### Args:
    name (str): application name.

#### Returns:
    list: list contains info of devices.
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
### Function: get_device_slug(device_type_name)

Get device slug.

#### Args:
    device_type_name (str): device type name.

#### Returns:
    str: device slug name.

#### Raises:
    InvalidDeviceType: if device type name is not supported.
### Function: get_device_url(uuid)

Get a device url for a device.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: get_display_name(device_type_slug)

Get display name for a device.

#### Args:
    device_type_slug (str): device type slug.

#### Returns:
    str: device display name.

#### Raises:
    InvalidDeviceType: if device type slug is not supported.
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
### Function: get_supported_device_types()

Get device slug.

#### Returns:
    list: list of supported device types.
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
### Function: identify(uuid)

Identify device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.
### Function: is_online(uuid)

Check if a device is online.

#### Args:
    uuid (str): device uuid.

#### Returns:
    bool: True if the device is online, False otherwise.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: note(uuid, note)

Note a device.

#### Args:
    uuid (str): device uuid.
    note (str): device note.

#### Raises:
    DeviceNotFound: if device couldn't be found.
### Function: register(app_name, uuid)

Register a new device with a Resin.io application. This function only works if you log in using credentials or Auth Token.

#### Args:
    app_name (str): application name.
    uuid (str): device uuid.

#### Returns:
    dict: dictionary contains device info.
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
### Function: restart(uuid)

Restart a device. This function only works if you log in using credentials or Auth Token.

#### Args:
    uuid (str): device uuid.

#### Raises:
    DeviceNotFound: if device couldn't be found.
## Config

This class implements configuration model for Resin Python SDK.

#### Attributes:
    _config (dict): caching configuration.
### Function: get_all()

Get all configuration.

#### Returns:
    dict: configuration information.
### Function: get_device_types()

Get device types configuration.

#### Returns:
    list: device types information.
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
### Function: parse_params()

Validate parameters for downloading device OS image.

#### Args:
    **parameters: os parameters keyword arguments.

#### Returns:
    dict: validated parameters.

    Raise:
        MissingOption: if mandatory option are missing.
        InvalidOption: if appId or network are invalid (appId is not a number or parseable string. network is not in NETWORK_TYPES)
## EnvironmentVariable

This class is a wrapper for device and application environment variable models.
## ApplicationEnvVariable

This class implements application environment variable model for Resin Python SDK.

#### Attributes:
    SYSTEM_VARIABLE_RESERVED_NAMES (list): list of reserved system variable names.
    OTHER_RESERVED_NAMES_START (list): list of prefix for system variable.
### Function: create(app_id, name, value)

Create an environment variable for application.

#### Args:
    app_id (str): application id.
    name (str): environment variable name.
    value (str): environment variable value.

#### Returns:
    dict: new application environment info.
### Function: get_all(app_id)

Get all environment variables by application.

#### Args:
    app_id (str): application id.

#### Returns:
    list: application environment variables.
### Function: is_system_variable(variable)

Check if a variable is system specific.

#### Args:
    variable (str): environment variable name.

#### Returns:
    bool: True if system variable, False otherwise.
### Function: remove(var_id)

Remove application environment variable.

#### Args:
    var_id (str): environment variable id.
### Function: update(var_id, value)

Update an environment variable value for application.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.
## DeviceEnvVariable

This class implements device environment variable model for Resin Python SDK.
### Function: create(uuid, name, value)

Create a device environment variable.

#### Args:
    uuid (str): device uuid.
    name (str): environment variable name.
    value (str): environment variable value.

#### Returns:
    dict: new device environment variable info.
### Function: get_all(uuid)

Get all device environment variables.

#### Args:
    uuid (str): device uuid.

#### Returns:
    list: device environment variables.
### Function: remove(var_id)

Remove a device environment variable.

#### Args:
    var_id (str): environment variable id.
### Function: update(var_id, value)

Update a device environment variable.

#### Args:
    var_id (str): environment variable id.
    value (str): new environment variable value.
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
### Function: blink(device_id, app_id)

Start a blink pattern on a LED for 15 seconds. This is the same with `resin.models.device.identify()`.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    device_id (Optional[str]): device id.
    app_id (Optional[str]): application id.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
### Function: force_api_endpoint(endpoint)

Force all API commands to a specific endpoint.

#### Args:
    endpoint (bool): True if selecting the API on device. False if selecting the Resin API proxy endpoint.

#### Raises:
    InvalidOption: if endpoint value is not bool.
### Function: ping(device_id, app_id)

Check that the supervisor is alive and well.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    device_id (Optional[str]): device id.
    app_id (Optional[str]): application id.

#### Returns:
    str: `OK` signals that the supervisor is alive and well.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not set.
### Function: purge(app_id, device_id)

Clears the user application's /data folder.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_id (Optional[str]): device id.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
### Function: reboot(device_id, app_id)

Reboot the device.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    device_id (Optional[str]): device id.
    app_id (Optional[str]): application id.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
### Function: restart(app_id, device_id)

Restart user application container.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    app_id (str): application id.
    device_id (Optional[str]): device id.

#### Returns:
    str: `OK` signals that the supervisor is alive and well.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
### Function: shutdown(device_id, app_id)

Shut down the device.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    device_id (Optional[str]): device id.
    app_id (Optional[str]): application id.

#### Returns:
    dict: when successful, this dictionary is returned `{ 'Data': 'OK', 'Error': '' }`.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
### Function: update(device_id, app_id, force)

Triggers an update check on the supervisor. Optionally, forces an update when updates are locked.
No need to set device_id and app_id if command is sent to the API on device.

#### Args:
    device_id (Optional[str]): device id.
    app_id (Optional[str]): application id.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Raises:
    InvalidOption: if the endpoint is Resin API proxy endpoint and device_id or app_id is not specified.
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
### Function: get_email()

This function retrieves current logged in user's get_email

#### Returns:
    str: user email.

#### Raises:
    InvalidOption: if not logged in.
### Function: get_token()

This function retrieves Auth Token.

#### Returns:
    str: Auth Token.

#### Raises:
    InvalidOption: if not logged in and there is no token in Settings.
### Function: get_user_id()

This function retrieves current logged in user's id.

#### Returns:
    str: user id.

#### Raises:
    InvalidOption: if not logged in.
### Function: is_logged_in()

This function checks if you're logged in

#### Returns:
    bool: True if logged in, False otherwise.
### Function: log_out()

This function is used for logging out from Resin.io.

#### Returns:
    bool: True if successful, False otherwise.
### Function: login()

This function is used for logging into Resin.io using username and password.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Resin.io username.
        password (str): Password.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    LoginFailed: if the username or password is invalid.
### Function: login_with_token(token)

This function is used for logging into Resin.io using Auth Token.
Auth Token can be found in Preferences section on Resin.io Dashboard.

#### Args:
    token (str): Auth Token.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Raises:
    MalformedToken: if token is invalid.
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
### Function: who_am_i()

This function retrieves username of logged in user.

#### Returns:
    str: username.

#### Raises:
    NotLoggedIn: if there is no user logged in.
## Logs

This class implements functions that allow processing logs from device.

This class is implemented using pubnub python sdk.

For more details about pubnub, please visit: https://www.pubnub.com/docs/python/pubnub-python-sdk
### Function: history()

This function allows fetching historical device logs.

#### Args:
    uuid (str): device uuid.
    callback (function): this callback is called on receiving a message from the channel.
    error (function): this callback is called on an error event.
    For more details about callbacks in pubnub subscribe, visit here: https://www.pubnub.com/docs/python/api-reference#history

#### Examples:
```python
def callback(message):
print(message)
```

```python
def error(message):
print('Error:'+ str(message))
```

    Logs.history(uuid=uuid, callback=callback, error=error)
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
def callback(message, channel):
print(message)
```

```python
def error(message):
print('Error:'+ str(message))
```

```python
Logs.subscribe(uuid=uuid, callback=callback, error=error)
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
### Function: get_all()

Get all settings.

#### Returns:
    dict: all settings.
### Function: has(key)

Check if a setting exists.

#### Args:
    key (str): setting.

#### Returns:
    bool: True if exists, False otherwise.
### Function: remove(key)

Remove a setting.

#### Args:
    key (str): setting.

#### Returns:
    bool: True if successful, False otherwise.
### Function: set(key, value)

Set value for a setting.

#### Args:
    key (str): setting.
    value (str): setting value.
## TwoFactorAuth

This class implements basic 2FA functionalities for Resin Python SDK.
### Function: challenge(code)

Challenge two-factor authentication.
If your account has two-factor authentication enabled and logging in using credentials, you need to pass two-factor authentication before being allowed to use other functions.

#### Args:
    code (str): two-factor authentication code.
### Function: generate_code(secret)

Generate two-factor authentication code.

#### Args:
    secret (str): one time password authentication secret string.

#### Returns:
    str: 6 digit two-factor authentication code.
### Function: get_otpauth_secret()

Retrieve one time password authentication secret string.
This function only works if you disable two-factor authentication or log in using Auth Token from dashboard.

#### Returns:
    str: one time password authentication secret string.
### Function: is_enabled()

Check if two-factor authentication is enabled.

#### Returns:
    bool: True if enabled. Otherwise False.
### Function: is_passed()

Check if two-factor authentication challenge was passed.

#### Returns:
    bool: True if enabled. Otherwise False.
