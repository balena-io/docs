
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

The Balena object can be configured with a dict of type Settings

```python
balena = Balena({
    "balena_host": "balena-cloud.com",
    "api_version": "v7",
    "device_actions_endpoint_version": "v1",
    "data_directory": "/home/example/.balena",
    "image_cache_time": str(1 * 1000 * 60 * 60 * 24 * 7), # 1 week
    "token_refresh_interval": str(1 * 1000 * 60 * 60),    # 1 hour
    "timeout": str(30 * 1000),                            # request timeout, 30s
    "request_limit": str(300), # the number of requests per request_limit_interval that the SDK should respect, defaults to unlimited.
    "request_limit_interval": str(60), # the timespan that the request_limit should apply to in seconds, defaults to 60s (1 minute).
    "retry_rate_limited_request": False, # awaits and retry once a request is rate limited (429)
})
```

Notice that if you want to change for the staging environment, you could simply do:
balena = Balena({"balena_host": "balena-staging.com"})

However, this will overwrite your balena-cloud settings (stored api keys etc). So we recommend using
a different data_directory for each balena-sdk instance, e.g:

```python
balena_prod = Balena()
balena_staging = Balena({
    "balena_host": "balena-staging.com",
    "data_directory": "/home/balena-staging-sdk/.balena",
})
```

In adition, you can also run balena-python-sdk completely in memory, without writing anything to the file system like:

```python
balena_prod = Balena({"data_directory": False})
balena_staging = Balena({
    "balena_host": "balena-staging.com",
    "data_directory": False
})
```

By default the SDK will throw once a request is Rate limited by the API (with a 429 status code).
A 429 request will contain a header called "retry-after" which informs how long the client should wait before trying a new request.
If you would like the SDK to use this header and wait and automatically retry the request, just do:

```python
balena = Balena({"retry_rate_limited_request": True})
```

If you feel something is missing, not clear or could be improved, [please don't
hesitate to open an issue in GitHub](https://github.com/balena-io/balena-sdk-python/issues), we'll be happy to help.

# Models

This module implements all models for balena python SDK.
# Application

This class implements application model for balena python SDK.
## create

Create an application.

**Signature:** `balena.models.application.create(name, device_type, organization, application_class)` ⇒ [<code>TypeApplication</code>](#typeapplication)

**Args:**
    name (str): application name.
    device_type (str): device type (slug).
    organization (Union[str, int]): handle or id of the organization that the application will belong to.
    application_class (Optional[Literal["app", "fleet", "block"]]): application class.

**Returns:**
    TypeApplication: application info.

**Examples:**
```python
>>> balena.models.application.create('foo', 'raspberry-pi', 12345)
>>> balena.models.application.create('foo', 'raspberry-pi', 12345, 'block')
```

## disable_device_urls

Disable device urls for all devices that belong to an application.

**Signature:** `balena.models.application.disable_device_urls(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.application.disable_device_urls(5685)
```

## enable_device_urls

Enable device urls for all devices that belong to an application

**Signature:** `balena.models.application.enable_device_urls(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.application.enable_device_urls(5685)
```

## generate_provisioning_key

Generate a device provisioning key for a specific application.

**Signature:** `balena.models.application.generate_provisioning_key(slug_or_uuid_or_id, key_name, description, expiry_date)` ⇒ <code>str</code>

**Args:**
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    key_name (Optional[str]): provisioning key name.
    description (Optional[str]): description for provisioning key.
    expiry_date (Optional[str]): expiry date for provisioning key, for example: `2030-01-01T00:00:00Z`.

**Returns:**
    str: device provisioning key.

**Examples:**
```python
>>> balena.models.application.generate_provisioning_key(5685)
```

## get

Get a single application.

**Signature:** `balena.models.application.get(slug_or_uuid_or_id, options, context)` ⇒ [<code>TypeApplication</code>](#typeapplication)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

**Returns:**
    TypeApplication: application info.

**Examples:**
```python
>>> balena.models.application.get("myorganization/myapp")
>>> balena.models.application.get(123)
```

## get_all

Get all applications

**Signature:** `balena.models.application.get_all(options, context)` ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

**Args:**
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

**Returns:**
    List[TypeApplication]: application info.

**Examples:**
```python
>>> balena.models.application.get_all()
```

## get_all_by_organization

Get all applications of an organization.

**Signature:** `balena.models.application.get_all_by_organization(org_handle_or_id, options)` ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

**Args:**
    org_handle_or_id (Union[str, int]): handle or id of the organization.
    options (AnyObject): extra pine options to use.

**Returns:**
    List[TypeApplication]: application info.

**Examples:**
```python
>>> balena.models.application.get_all_by_organization('myorg')
```

## get_all_directly_accessible

Get all applications directly accessible by the user

**Signature:** `balena.models.application.get_all_directly_accessible(options)` ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[APIKeyType]: user API key

**Examples:**
```python
>>> balena.models.application.get_all_directly_accessible()
```

## get_by_name

 Get a single application using the appname.

**Signature:** `balena.models.application.get_by_name(app_name, options, context)` ⇒ [<code>TypeApplication</code>](#typeapplication)

**Args:**
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

**Returns:**
    TypeApplication: application info.

**Examples:**
```python
>>> balena.models.application.get("myapp")
```

## get_dashboard_url

Get Dashboard URL for a specific application.

**Signature:** `balena.models.application.get_dashboard_url(app_id)` ⇒ <code>str</code>

**Args:**
    app_id (int): application id.

**Returns:**
    str: Dashboard URL for the specific application.

**Examples:**
```python
>>> balena.models.application.get_dashboard_url(1476418)
```

## get_directly_accessible

Get a single application directly accessible by the user

**Signature:** `balena.models.application.get_directly_accessible(slug_or_uuid_or_id, options)` ⇒ [<code>TypeApplication</code>](#typeapplication)

**Args:**
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    TypeApplication: application info.

**Examples:**
```python
>>> balena.models.application.get_directly_accessible("myorganization/myapp")
>>> balena.models.application.get_directly_accessible(123)
```

## get_id

Given an application slug or uuid or id, returns it numeric id.

**Signature:** `balena.models.application.get_id(slug_or_uuid_or_id)` ⇒ <code>int</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

**Returns:**
    int: The id.

**Examples:**
```python
>>> balena.models.application.get_dashboard_url(1476418)
```

## get_target_release_hash

Get the hash of the current release for a specific application.

**Signature:** `balena.models.application.get_target_release_hash(slug_or_uuid_or_id)` ⇒ <code>Optional[str]</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

**Returns:**
    Optional[str]: The release hash of the current release or None.

**Examples:**
```python
>>> balena.models.application.get_target_release_hash(5685)
```

## get_with_device_service_details

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `application.get(uuidOrId, options)` instead.

**Signature:** `balena.models.application.get_with_device_service_details(slug_or_uuid_or_id, options)` ⇒ [<code>TypeApplicationWithDeviceServiceDetails</code>](#typeapplicationwithdeviceservicedetails)

**Args:**
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    TypeApplication: application info.

**Examples:**
```python
>>> balena.models.application.get_with_device_service_details('my_org_handle/my_app_name')
```

## grant_support_access

Grant support access to an application until a specified time.

**Signature:** `balena.models.application.grant_support_access(slug_or_uuid_or_id, expiry_timestamp)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

**Examples:**
```python
>>> balena.models.application.grant_support_access(5685, 1511974999000)
```

## has

Check if an application exists.

**Signature:** `balena.models.application.has(slug_or_uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

**Returns:**
    bool: True if application exists, False otherwise.

**Examples:**
```python
>>> balena.models.application.has('my_org/foo')
```

## has_any

Check if the user has any applications.

**Signature:** `balena.models.application.has_any()` ⇒ <code>bool</code>

**Returns:**
    bool: True if user has any applications, False otherwise.

**Examples:**
```python
>>> balena.models.application.has_any()
```

## is_tracking_latest_release

Get whether the application is up to date and is tracking the latest finalized release for updates

**Signature:** `balena.models.application.is_tracking_latest_release(slug_or_uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Returns:**
    bool: is tracking the latest release.

**Examples:**
```python
>>> balena.models.application.is_tracking_latest_release(5685)
```

## pin_to_release

Configures the application to run a particular release
and not get updated when the latest release changes.

**Signature:** `balena.models.application.pin_to_release(slug_or_uuid_or_id, full_release_hash)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    full_release_hash (str) : the hash of a successful release (string)

**Examples:**
```python
>>> balena.models.application.set_to_release(5685, '7dba4e0c461215374edad74a5b78f470b894b5b7')
```

## purge

Purge devices by application id

**Signature:** `balena.models.application.purge(app_id)` ⇒ <code>None</code>

**Args:**
    app_id (int): application id (number)

**Examples:**
```python
>>> balena.models.application.purge(5685)
```

## reboot

Reboots devices by application id

**Signature:** `balena.models.application.reboot(app_id, options)` ⇒ <code>None</code>

**Args:**
    app_id (int): application id (number)
    options (ShutdownOptions): override update lock

**Examples:**
```python
>>> balena.models.application.reboot(5685)
>>> balena.models.application.reboot(5685, {"force": True})
```

## remove

Remove application.

**Signature:** `balena.models.application.remove(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.application.remove('my_org/my_app')
>>> balena.models.application.remove('c184556293854781aea71b0bdae10e45')
>>> balena.models.application.remove(123)
```

## rename

Rename application.

**Signature:** `balena.models.application.rename(slug_or_uuid_or_id, new_name)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    new_name (str): new application name.

**Examples:**
```python
>>> balena.models.application.rename(1681618, 'py-test-app')
```

## restart

Restart application.

**Signature:** `balena.models.application.restart(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.application.restart('myorg/RPI1')
```

## revoke_support_access

Revoke support access to an application.

**Signature:** `balena.models.application.revoke_support_access(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.application.revoke_support_access(5685)
```

## shutdown

Shutdown devices by application id

**Signature:** `balena.models.application.shutdown(app_id, options)` ⇒ <code>None</code>

**Args:**
    app_id (int): application id (number)
    options (ShutdownOptions): override update lock

**Examples:**
```python
>>> balena.models.application.shutdown(5685)
>>> balena.models.application.shutdown(5685, {"force": True})
```

## track_latest_release

Configure a specific application to track the latest available release.

**Signature:** `balena.models.application.track_latest_release(slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

**Examples:**
```python
>>> balena.models.application.track_latest_release(5685)
```

## will_track_new_releases

 Get whether the application is configured to receive updates whenever a new release is available.

**Signature:** `balena.models.application.will_track_new_releases(slug_or_uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Returns:**
    bool: is tracking the latest release.

**Examples:**
```python
>>> balena.models.application.will_track_new_releases(5685)
```

# ApplicationTag

This class implements application tag model for balena python SDK.
## get_all_by_application

Get all application tags for an application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.application.tags.get_all_by_application(1005160)
```

## remove

Remove an application tag.

**Signature:** `balena.models.application.remove(slug_or_uuid_or_id, tag_key)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.application.tags.remove(1005767, 'tag1')
```

## set

Set an application tag (update tag value if it exists).

**Signature:** `balena.models.application.set(slug_or_uuid_or_id, tag_key, value)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    tag_key (str): tag key.
    value (str): tag value.

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.application.tags.set(1005767, 'tag1', 'Python SDK')
```

# ApplicationConfigVariable

This class implements application config variable model for balena python SDK.
## get

Get application config variable.

**Signature:** `balena.models.application.get(slug_or_uuid_or_id, env_var_name)` ⇒ <code>Optional[str]</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.config_var.get('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4')
```

## get_all_by_application

Get all application config variables by application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: application config variables.

**Examples:**
```python
>>> balena.models.application.config_var.get_all_by_application(9020)
```

## remove

Remove an application config variable.

**Signature:** `balena.models.application.remove(slug_or_uuid_or_id, key)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.config_var.remove(2184, 'test_env')
```

## set

Set the value of a specific application config variable.

**Signature:** `balena.models.application.set(slug_or_uuid_or_id, env_var_name, value)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.application.config_var.set('8deb12a7d7592c2b7f9e44735c2b0a41','test_env', 'testing1')
```

# ApplicationEnvVariable

This class implements application environment variable model for balena python SDK.
## get

Get application environment variable.

**Signature:** `balena.models.application.get(slug_or_uuid_or_id, env_var_name)` ⇒ <code>Optional[str]</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.env_var.get('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4')
```

## get_all_by_application

Get all application environment variables by application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: application environment variables.

**Examples:**
```python
>>> balena.models.application.env_var.get_all_by_application(9020)
>>> balena.models.application.env_var.get_all_by_application("myorg/myslug")
```

## remove

Remove an application environment variable.

**Signature:** `balena.models.application.remove(slug_or_uuid_or_id, key)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.env_var.remove(2184,'test_env4')
```

## set

Set the value of a specific application environment variable.

**Signature:** `balena.models.application.set(slug_or_uuid_or_id, env_var_name, value)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.application.env_var.set('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4', 'testing1')
```

# BuildEnvVariable

This class implements build environment variable model for balena python SDK.
## get

Get build environment variable.

**Signature:** `balena.models.application.get(slug_or_uuid_or_id, env_var_name)` ⇒ <code>Optional[str]</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.build_var.get('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4')
```

## get_all_by_application

Get all build environment variables by application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: build environment variables.

**Examples:**
```python
>>> balena.models.application.build_var.get_all_by_application(9020)
>>> balena.models.application.build_var.get_all_by_application("myorg/myslug")
```

## remove

Remove an build environment variable.

**Signature:** `balena.models.application.remove(slug_or_uuid_or_id, key)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

**Examples:**
```python
>>> balena.models.application.build_var.remove(2184, 'test_env4')
```

## set

Set the value of a specific build environment variable.

**Signature:** `balena.models.application.set(slug_or_uuid_or_id, env_var_name, value)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.application.build_var.set('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4', 'testing1')
```

# ApplicationMembership

This class implements application membership model for balena python SDK.
## change_role

Changes the role of an application member.

**Signature:** `balena.models.application.change_role(membership_id, role_name)` ⇒ <code>None</code>

**Args:**
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`
    numeric pair of the membership
    role_name (str): the role name to be granted to the membership.

**Examples:**
```python
>>> balena.models.application.membership.change_role(55074, 'observer')
```

## create

Creates a new membership for an application.

**Signature:** `balena.models.application.create(slug_or_uuid_or_id, username, role_name)` ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    username (str): the username of the balena user that will become a member.
    role_name (Optional[str]): the role name to be granted to the membership.

**Returns:**
    ApplicationMembershipType: application membership.

**Examples:**
```python
>>> balena.models.application.membership.create(1681618, 'testuser')
```

## get

Get a single application membership.

**Signature:** `balena.models.application.get(membership_id, options)` ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)

**Args:**
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`
    numeric pair of the membership
    options (AnyObject): extra pine options to use

**Returns:**
    ApplicationMembershipType: application membership.

**Examples:**
```python
>>> balena.models.application.membership.get(55074)
>>> balena.models.application.membership.get({"user": 123, "is_member_of__application": 125})
```

## get_all

Get all application memberships.

**Signature:** `balena.models.application.get_all(options)` ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[ApplicationMembershipType]: list contains info of application memberships.

**Examples:**
```python
>>> balena.models.application.membership.get_all()
```

## get_all_by_application

Get all memberships by application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    list: list contains info of application memberships.

**Examples:**
```python
>>> balena.models.application.membership.get_all_by_application(1681618)
```

## remove

Remove a membership.

**Signature:** `balena.models.application.remove(membership_id)` ⇒ <code>None</code>

**Args:**
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`

# ApplicationInvite

This class implements application invite model for balena python SDK.
## accept

Accepts an invite.

**Signature:** `balena.models.application.accept(invite_token)` ⇒ <code>None</code>

**Args:**
    invite_token (str): invitationToken - invite token.

**Examples:**
```python
>>> balena.models.application.invite.accept("qwerty-invitation-token")
```

## create

Creates a new invite for an application.

**Signature:** `balena.models.application.create(slug_or_uuid_or_id, options)` ⇒ [<code>ApplicationInviteType</code>](#applicationinvitetype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (ApplicationInviteOptions): Application Invite options dict to use.
        invitee (str): the email/balena_username of the invitee.
        role_name (Optional[str]): the role name to be granted to the invitee.
        One of "observer", "developer", "operator". Defaults to "developer"
        message (Optional[str]): the message to send along with the invite.

**Returns:**
    dict: application invite.

**Examples:**
```python
>>> balena.models.application.invite.create(1681618, 'invitee@example.org', 'developer', 'Test invite')
```

## get_all

Get all invites.

**Signature:** `balena.models.application.get_all(options)` ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[ApplicationInviteType]: list contains info of invites.

**Examples:**
```python
>>> balena.models.application.invite.get_all()
```

## get_all_by_application

Get all invites by application.

**Signature:** `balena.models.application.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    List[ApplicationInviteType]: list contains info of invites.

**Examples:**
```python
>>> balena.models.application.invite.get_all_by_application(1681618)
```

## revoke

Revoke an invite.

**Signature:** `balena.models.application.revoke(invite_id)` ⇒ <code>None</code>

**Args:**
    invite_id (int): application invite id.

**Examples:**
```python
>>> balena.models.application.invite.revoke(5860)
```

# Device

This class implements device model for balena python SDK.
## deactivate

Deactivates a device.

**Signature:** `balena.models.device.deactivate(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

**Examples:**
```python
>>> balena.models.device.deactivate('44cc9d1861b9f992808c506276e5d31c')
>>> balena.models.device.deactivate([123, 234])
```

## disable_device_url

Disable device url for a device.

**Signature:** `balena.models.device.disable_device_url(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int]).

**Examples:**
```python
>>> balena.models.device.disable_device_url('8deb12a7d7592c2b7f9e44735c2b0a41')
>>> balena.models.device.disable_device_url([123, 345])
```

## disable_local_mode

Disable local mode.

**Signature:** `balena.models.device.disable_local_mode(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    None.

**Examples:**
```python
>>> balena.models.device.disable_local_mode('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## disable_lock_override

Disable lock override.

**Signature:** `balena.models.device.disable_lock_override(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

## enable_device_url

Enable device url for a device.

**Signature:** `balena.models.device.enable_device_url(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int]).

**Examples:**
```python
>>> balena.models.device.enable_device_url('8deb12a7d7592c2b7f9e44735c2b0a41')
>>> balena.models.device.enable_device_url([123, 345])
```

## enable_local_mode

Enable local mode.

**Signature:** `balena.models.device.enable_local_mode(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Examples:**
```python
>>> balena.models.device.enable_local_mode('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## enable_lock_override

Enable lock override.

**Signature:** `balena.models.device.enable_lock_override(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

## generate_device_key

Generate a device key.

**Signature:** `balena.models.device.generate_device_key(uuid_or_id, name, description, expiry_date)` ⇒ <code>str</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    name (Optional[str]): device key name.
    description (Optional[str]): description for device key.
    expiry_date (Optional[str]): expiry date for device key, for example: `2030-01-01T00:00:00Z`.

**Examples:**
```python
>>> balena.models.device.generate_device_key('df0926d8a5cf4293a1b3742c98a500a1')
```

## generate_uuid

Generate a random device UUID.

**Signature:** `balena.models.device.generate_uuid()` ⇒ <code>str</code>

**Returns:**
    str: a generated UUID.

**Examples:**
```python
>>> balena.models.device.generate_uuid()
```

## get

This method returns a single device by id or uuid.

**Signature:** `balena.models.device.get(uuid_or_id, options)` ⇒ [<code>TypeDevice</code>](#typedevice)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Returns:**
    TypeDevice: device info.

**Examples:**
```python
>>> balena.models.device.get('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
>>> balena.models.device.get('8deb12a7d7592c2b7f9e44735c2b0a41')
>>> balena.models.device.get(12345)
```

## get_all

This method returns all devices that the current user can access.
In order to have the following computed properties in the result
you have to explicitly define them in a `$select` in the extra options:
 - overall_status
 - overall_progress
 - is_frozen

**Signature:** `balena.models.device.get_all(options)` ⇒ [<code>List[TypeDevice]</code>](#typedevice)

** Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[TypeDevice]: list contains info of devices.

**Examples:**
```python
>>> balena.models.device.get_all()
```

## get_all_by_application

Get devices by application slug, uuid or id.

**Signature:** `balena.models.device.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[TypeDevice]</code>](#typedevice)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[TypeDevice]: list contains info of devices.

**Examples:**
```python
>>> balena.models.device.get_all_by_application('my_org/RPI1')
```

## get_all_by_organization

Get devices by organization slug, uuid or id.

**Signature:** `balena.models.device.get_all_by_organization(handle_or_id, options)` ⇒ [<code>List[TypeDevice]</code>](#typedevice)

**Args:**
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    List[TypeDevice]: list contains info of devices.

**Examples:**
```python
>>> balena.models.device.get_all_by_organization('my_org')
>>> balena.models.device.get_all_by_organization(123)
```

## get_application_info

***Deprecated***
Return information about the application running on the device.
This function requires supervisor v1.8 or higher.

**Signature:** `balena.models.device.get_application_info(uuid_or_id)` ⇒ <code>Any</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

**Returns:**
    dict: dictionary contains application information.

**Examples:**
```python
>>> balena.models.device.get_application_info('7f66ec3c5da146c3b6a84aaed1c07581')
```

## get_application_name

Get application name by device uuid.

**Signature:** `balena.models.device.get_application_name(uuid_or_id)` ⇒ <code>str</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    str: application name.

## get_by_name

Get devices by device name.

**Signature:** `balena.models.device.get_by_name(name, options)` ⇒ [<code>List[TypeDevice]</code>](#typedevice)

**Args:**
    name (str): device name.

**Returns:**
    List[TypeDevice]: list contains info of devices.

**Examples:**
```python
>>> balena.models.device.get_by_name('floral-mountain')
```

## get_dashboard_url

Get balena Dashboard URL for a specific device.

**Signature:** `balena.models.device.get_dashboard_url(uuid)` ⇒ <code>None</code>

**Args:**
    uuid (str): device uuid.

**Examples:**
```python
>>> balena.models.device.get_dashboard_url('19619a6317072b65a240b451f45f855d')
```

## get_device_url

Get a device url for a device.

**Signature:** `balena.models.device.get_device_url(uuid_or_id)` ⇒ <code>str</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Examples:**
```python
>>> balena.models.device.get_device_url('8deb12a7d7592c2b7f9e44735c2b0a41')
```

## get_local_ip_address

Get the local IP addresses of a device.

**Signature:** `balena.models.device.get_local_ip_address(uuid_or_id)` ⇒ <code>List[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    List[str]: IP addresses of a device.

## get_local_mode_support

Returns whether local mode is supported and a message describing the reason why local mode is not supported.

**Signature:** `balena.models.device.get_local_mode_support(uuid_or_id)` ⇒ <code>LocalModeResponse</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    dict: local mode support information ({'supported': True/False, 'message': '...'}).

**Examples:**
```python
>>> balena.models.device.get_local_mode_support('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## get_mac_address

Get the MAC addresses of a device.

**Signature:** `balena.models.device.get_mac_address(uuid_or_id)` ⇒ <code>List[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    List[str]: MAC addresses of a device.

## get_metrics

Gets the metrics related information for a device.

**Signature:** `balena.models.device.get_metrics(uuid_or_id)` ⇒ [<code>DeviceMetricsType</code>](#devicemetricstype)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    dict: metrics of the device.

## get_name

Get device name by device uuid.

**Signature:** `balena.models.device.get_name(uuid_or_id)` ⇒ <code>str</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    str: device name.

## get_os_update_status

***Deprecated***
Get the OS update status of a device.

**Signature:** `balena.models.device.get_os_update_status(uuid_or_id)` ⇒ <code>HUPStatusResponse</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

**Returns:**
    HUPStatusResponse: action response.

**Examples:**
```python
>>> balena.models.device.get_os_update_status('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## get_status

Get the status of a device.

**Signature:** `balena.models.device.get_status(uuid_or_id)` ⇒ <code>str</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    str: status of a device.

**Examples:**
```python
>>> balena.models.device.get_status('8deb12a7d7592c2b7f9e44735c2b0a41')
```

## get_supervisor_state

Get the supervisor state on a device

**Signature:** `balena.models.device.get_supervisor_state(uuid_or_id)` ⇒ <code>SupervisorStateType</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

**Returns:**
    dict: supervisor state.

**Examples:**
```python
>>> balena.models.device.get_supervisor_state('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## get_supervisor_target_state

Get the supervisor target state on a device

**Signature:** `balena.models.device.get_supervisor_target_state(uuid_or_id)` ⇒ <code>Any</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (str) or id (int).

**Returns:**
    DeviceStateType: supervisor target state.

**Examples:**
```python
>>> balena.models.device.get_supervisor_target_state('b6070f4fea5edf808b576123157fe5ec')
```

## get_supervisor_target_state_for_app

Get the supervisor target state on a device

**Signature:** `balena.models.device.get_supervisor_target_state_for_app(slug_or_uuid_or_id, release)` ⇒ <code>Any</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
     release (Optional[Union[str, int]]): (optional) release uuid (default tracked)
**Returns:**
    DeviceStateType: supervisor target state.

**Examples:**
```python
>>> balena.models.device.get_supervisor_target_state_for_app('myorg/myapp')
```

## get_with_service_details

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `device.get(uuidOrId, options)` instead.

**Signature:** `balena.models.device.get_with_service_details(uuid_or_id, options)` ⇒ [<code>TypeDeviceWithServices</code>](#typedevicewithservices)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Returns:**
    dict: device info with associated services details.

**Examples:**
```python
>>> balena.models.device.get_with_service_details('0fcd753af396247e035de53b4e43eec3')
```

## grant_support_access

Grant support access to a device until a specified time.

**Signature:** `balena.models.device.grant_support_access(uuid_or_id_or_ids, expiry_timestamp)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

**Examples:**
```python
>>> balena.models.device.grant_support_access('49b2a76e8a8d4a2b918c08a23b423580', 1511974999000)
```

## has

Check if a device exists.

**Signature:** `balena.models.device.has(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    bool: True if device exists, False otherwise.

## has_device_url

Check if a device is web accessible with device urls

**Signature:** `balena.models.device.has_device_url(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Examples:**
```python
>>> balena.models.device.has_device_url('8deb12a7d7592c2b7f9e44735c2b0a41')
```

## has_lock_override

Check if a device has the lock override enabled.

**Signature:** `balena.models.device.has_lock_override(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    bool: lock override status.

## identify

Identify device.

**Signature:** `balena.models.device.identify(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

**Examples:**
```python
>>> balena.models.device.identify('8deb12a7d7592c2b7f9e44735c2b0a41')
```

## is_in_local_mode

Check if local mode is enabled on the device.

**Signature:** `balena.models.device.is_in_local_mode(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    bool: True if local mode enabled, otherwise False.

**Examples:**
```python
>>> balena.models.device.is_in_local_mode('b6070f4fea5a4f11b4d05c1f1c3b4e72')
```

## is_online

Check if a device is online.

**Signature:** `balena.models.device.is_online(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    bool: True if the device is online, False otherwise.

## is_tracking_application_release

Get whether the device is configured to track the current application release.

**Signature:** `balena.models.device.is_tracking_application_release(uuid_or_id)` ⇒ <code>bool</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

**Returns:**
    bool: is tracking the current application release.

## move

Move a device to another application.

**Signature:** `balena.models.device.move(uuid_or_id, app_slug_or_uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (str) or id (int).
    app_slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

**Examples:**
```python
>>> balena.models.device.move(123, 'RPI1Test')
```

## pin_to_os_release

Mark a specific device to be updated to a particular OS release

**Signature:** `balena.models.device.pin_to_os_release(uuid_or_id, target_os_version)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).
    target_os_version (str): semver-compatible version for the target device.
        Unsupported (unpublished) version will result in rejection.
        The version **must** be the exact version number, a "prod" variant
        and greater or equal to the one running on the device.

**Examples:**
```python
>>> balena.models.device.pin_to_os_release('b6070f4fea5a4f11b4d05c1f1c3b4e72', '2.29.2+rev1.prod')
>>> balena.models.device.pin_to_os_release('b6070f4fea5a4f11b4d05c1f1c3b4e72', '2.89.0+rev1')
```

## pin_to_release

Configures the device to run a particular release
and not get updated when the current application release changes.

**Signature:** `balena.models.device.pin_to_release(uuid_or_id, full_release_hash_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    full_release_hash_or_id (Union[str, int]) : the hash of a successful release (string) or id (number)

**Examples:**
```python
>>> balena.models.device.pin_to_release('49b2a', '45c90004de73557ded7274d4896a6db90ea61e36')
```

## pin_to_supervisor_release

Set a specific device to run a particular supervisor release.
**Signature:** `balena.models.device.pin_to_supervisor_release(uuid_or_id, supervisor_version_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    supervisor_version_or_id (Union[str, int]): the version of a released supervisor (string) or id (number)
**Examples:**
```python
>>> balena.models.device.pin_to_supervisor_release('f55dcdd9ada04b11b4d05c1f1c3b4e72', 'v13.0.0')
```

## ping

Ping a device.
This is useful to signal that the supervisor is alive and responding.

**Signature:** `balena.models.device.ping(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

**Examples:**
```python
>>> balena.models.device.ping('8f66ec7335dd4a97b7661faa131b1502')
>>> balena.models.device.ping(1234)
```

## purge

Purge device.
This function clears the user application's `/data` directory.

**Signature:** `balena.models.device.purge(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

**Examples:**
```python
>>> balena.models.device.purge('8f66ec7335dd4a97b7661faa131b1502')
```

## reboot

Reboot the device.

**Signature:** `balena.models.device.reboot(uuid_or_id, force)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

**Examples:**
```python
>>> balena.models.device.reboot('8f66ec7335dd4a97b7661faa131b1502')
```

## register

Register a new device with a balena application.

**Signature:** `balena.models.device.register(application_slug_or_uuid_or_id, uuid, device_type_slug)` ⇒ <code>RegisterResponse</code>

**Args:**
    application_slug_or_uuid_or_id (Union[int, str]): application slug (string), uuid (string) or id (number).
    uuid (str): device uuid.
    device_type_slug (Optional[str]): device type slug or alias.

**Returns:**
    dict: dictionary contains device info.

**Examples:**
```python
>>> device_uuid = balena.models.device.generate_uuid()
>>> balena.models.device.register('RPI1',device_uuid)
```

## remove

Remove device(s).

**Signature:** `balena.models.device.remove(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

## rename

Renames a device.

**Signature:** `balena.models.device.rename(uuid_or_id, new_name)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (str) or id (int)
    new_name (str): device new name.

**Examples:**
```python
>>> balena.models.device.rename(123, 'python-sdk-test-device')
```

## restart_application

This function restarts the Docker container running
the application on the device, but doesn't reboot
the device itself.

**Signature:** `balena.models.device.restart_application(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

**Examples:**
```python
>>> balena.models.device.restart_application('8deb12a7d7592c2b7f9e44735c2b0a41')
>>> balena.models.device.restart_application(1234)
```

## restart_service

Restart a service on device.

**Signature:** `balena.models.device.restart_service(uuid_or_id, image_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to restart

**Examples:**
```python
>>> balena.models.device.restart_service('f3887b1de5b54c6a9e6e5e3a2e57b642', 392229)
>>> balena.models.device.restart_service(None, 392229)  # if running on the device
```

## revoke_support_access

Revoke support access to a device.

**Signature:** `balena.models.device.revoke_support_access(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

**Examples:**
```python
>>> balena.models.device.revoke_support_access('49b2a76e8a8d4a2b918c08a23b423580')
```

## set_custom_location

Set a custom location for a device.

**Signature:** `balena.models.device.set_custom_location(uuid_or_id_or_ids, location)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    location (dict): device custom location { 'latitude': Union[int,, str], 'longitude': Union[int, str]}.

**Examples:**
```python
>>> balena.models.device.set_custom_location(123, {'latitude': '21.032777','longitude': '105.831586'})
```

## set_note

Note a device.

**Signature:** `balena.models.device.set_note(uuid_or_id_or_ids, note)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    note (str): device note.

**Examples:**
```python
>>> balena.models.device.note(123, 'test note')
```

## shutdown

Shutdown the device.

**Signature:** `balena.models.device.shutdown(uuid_or_id, force)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

**Examples:**
```python
>>> balena.models.device.shutdown('8f66ec7335dd4a97b7661faa131b1502')
```

## start_application

***Deprecated***
Starts a user application container, usually after it has been stopped with `stop_application()`.
This function requires supervisor v1.8 or higher.

**Signature:** `balena.models.device.start_application(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

**Returns:**
    dict: dictionary contains started application container id.

**Examples:**
```python
>>> balena.models.device.start_application('8f66ec7335dd4a97b7661faa131b1502')
```

## start_os_update

Start an OS update on a device.

If using run_detached option, monitor progress with device.get() --
status, provisioning_state and provisioning_progress entries.

**Signature:** `balena.models.device.start_os_update(uuid_or_id, target_os_version)` ⇒ <code>HUPStatusResponse</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).
    target_os_version (str): semver-compatible version for the target device.
        Unsupported (unpublished) version will result in rejection.
        The version **must** be the exact version number, a "prod" variant
        and greater than the one running on the device.
    run_detached (Optional[bool]): run the update in detached mode.
        Default behaviour is run_detached=True for more reliable updates.

**Returns:**
    HUPStatusResponse: action response.

**Examples:**
```python
>>> balena.models.device.start_os_update('b6070f4fea5a4f11b4d05c1f1c3b4e72', '2.29.2+rev1.prod')
>>> balena.models.device.start_os_update('b6070f4fea5a4f11b4d05c1f1c3b4e72', '2.89.0+rev1')
```

## start_service

Start a service on device.

**Signature:** `balena.models.device.start_service(uuid_or_id, image_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to start

**Examples:**
```python
>>> balena.models.device.start_service('f3887b1de5b54c6a9e6e5e3a2e57b642', 1234)
>>> balena.models.device.start_service(None, 1234)  # if running on the device
```

## stop_application

***Deprecated***
Temporarily stops a user application container.
Application container will not be removed after invoking this function and a
reboot or supervisor restart will cause the container to start again.
This function requires supervisor v1.8 or higher.

**Signature:** `balena.models.device.stop_application(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

**Returns:**
    dict: dictionary contains stopped application container id.

**Examples:**
```python
>>> balena.models.device.stop_application('8f66ec7335dd4a97b7661faa131b1502')
```

## stop_service

Stop a service on device.

**Signature:** `balena.models.device.stop_service(uuid_or_id, image_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to stop

**Examples:**
```python
>>> balena.models.device.stop_service('f3887b1de5b54c6a9e6e5e3a2e57b642', 392229)
>>> balena.models.device.stop_service(None, 392229)  # if running on the device
```

## track_application_release

Configure a specific device to track the current application release.

**Signature:** `balena.models.device.track_application_release(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

## unset_custom_location

Clear the custom location of a device.

**Signature:** `balena.models.device.unset_custom_location(uuid_or_id_or_ids)` ⇒ <code>None</code>

**Args:**
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

**Examples:**
```python
>>> balena.models.device.unset_custom_location(123)
```

## update

update the device.

**Signature:** `balena.models.device.update(uuid_or_id, force)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

**Examples:**
```python
>>> balena.models.device.update('8f66ec7335dd4a97b7661faa131b1502')
```

# DeviceTag

This class implements device tag model for balena python SDK.
## get

Get a device tag (update tag value if it exists).
___Note___: Notice that when using the device ID rather than UUID,
it will avoid one extra API roundtrip.

**Signature:** `balena.models.device.get(uuid_or_id, tag_key)` ⇒ <code>Optional[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.

**Returns:**
    Optional[str]: tag value

**Examples:**
```python
>>> balena.models.device.tags.get('f5213eac0d63ac4', 'testtag')
```

## get_all

Get all device tags.

**Signature:** `balena.models.device.get_all(options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.device.tags.get_all()
```

## get_all_by_application

Get all device tags for an application.

**Signature:** `balena.models.device.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.device.tags.get_all_by_application(1005160)
```

## get_all_by_device

Get all device tags for a device.

**Signature:** `balena.models.device.get_all_by_device(uuid_or_id, options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.device.tags.get_all_by_device('a03ab646ca5a4f11b4d05c1f1c3b4e72')
```

## remove

Remove a device tag.

**Signature:** `balena.models.device.remove(uuid_or_id, tag_key)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.device.tags.remove('f5213eac0d63ac477', 'testtag')
```

## set

Set a device tag (update tag value if it exists).
___Note___: Notice that when using the device ID rather than UUID,
it will avoid one extra API roundtrip.

**Signature:** `balena.models.device.set(uuid_or_id, tag_key, value)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.
    value (str): tag value.

**Examples:**
```python
>>> balena.models.device.tags.set('f5213eac0d63ac4', 'testtag', 'test1')
>>> balena.models.device.tags.set('f5213eac0d63ac4', 'testtag', 'test2')
```

# DeviceConfigVariable

This class implements device config variable model for balena python SDK.
## get

Get a device config variable.

**Signature:** `balena.models.device.get(uuid_or_id, env_var_name)` ⇒ <code>Optional[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.

**Examples:**
```python
>>> balena.models.device.config_var.device.get('8deb12a7d7592c2b7f9e44735c2b0a41','test_env4')
```

## get_all_by_application

Get all device config variables for an application.

**Signature:** `balena.models.device.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: list of device environment variables.

**Examples:**
```python
>>> balena.models.device.config_var.device.get_all_by_application(5780)
```

## get_all_by_device

Get all device config variables belong to a device.

**Signature:** `balena.models.device.get_all_by_device(uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: device config variables.

**Examples:**
```python
>>> balena.models.device.config_var.get_all_by_device('f5213eac574a4fba8b9e32ab3a9cba12')
```

## remove

Remove a device environment variable.

**Signature:** `balena.models.device.remove(uuid_or_id, key)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    key (str): environment variable name.

**Examples:**
```python
>>> balena.models.device.config_var.device.remove(2184, 'test_env4')
```

## set

Set the value of a device config variable.
Note that config variables must start with BALENA_ and RESIN_ prefixes.
**Signature:** `balena.models.device.set(uuid_or_id, env_var_name, value)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.device.config_var.set('8deb12a7d7592c2b7f9e44735c2b0a41','BALENA_test_env4', 'testing1')
```

# DeviceEnvVariable

This class implements device environment variable model for balena python SDK.
## get

Get device environment variable.

**Signature:** `balena.models.device.get(uuid_or_id, env_var_name)` ⇒ <code>Optional[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.

**Examples:**
```python
>>> balena.models.device.env_var.get('8deb12a7d7592c2b7f9e44735c2b0a41', 'test_env4')
```

## get_all_by_application

Get all device environment variables for an application.

**Signature:** `balena.models.device.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: list of device environment variables.

**Examples:**
```python
>>> balena.models.device.env_var.get_all_by_application(5780)
```

## get_all_by_device

Get all device environment variables.

**Signature:** `balena.models.device.get_all_by_device(uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: device environment variables.

**Examples:**
```python
>>> balena.models.device.env_var.get_all_by_device('8deb12a7d7592c2b7f9e44735c2b0a41')
```

## remove

Remove a device environment variable.

**Signature:** `balena.models.device.remove(uuid_or_id, key)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    key (str): environment variable name.

**Examples:**
```python
>>> balena.models.device.env_var.remove(2184, 'test_env4')
```

## set

Set the value of a specific environment variable.

**Signature:** `balena.models.device.set(uuid_or_id, env_var_name, value)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.device.env_var.set('8deb12a7d7592c2b7f9e44735c2b0a41', 'test_env4', 'testing1')
```

# DeviceServiceEnvVariable

This class implements device service variable model for balena python SDK.
## get

Get the overriden value of a service variable on a device

**Signature:** `balena.models.device.get(uuid_or_id, service_name_or_id, key)` ⇒ <code>Optional[str]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name

**Returns:**
   Optional[str]: device service environment variables.

**Examples:**
```python
>>> balena.models.device.service_var.get('8deb12a7d7592c2b7f9e44735c2b0a41', 'myservice', 'VAR')
>>> balena.models.device.service_var.get('8deb12a7d7592c2b7f9e44735c2b0a41', 1234', 'VAR')
```

## get_all_by_application

Get all device service environment variables belong to an application.

**Signature:** `balena.models.device.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: device service environment variables.

**Examples:**
```python
>>> balena.models.device.service_var.get_all_by_application(1043050)
```

## get_all_by_device

Get all device environment variables.

**Signature:** `balena.models.device.get_all_by_device(uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: device service environment variables.

**Examples:**
```python
>>> balena.models.device.service_var.get_all_by_device(8deb12a)
```

## remove

Remove a device service environment variable.

**Signature:** `balena.models.device.remove(uuid_or_id, service_name_or_id, key)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name

**Examples:**
```python
>>> balena.models.device.service_var.set('7cf02a6a016a4b3c9e3b7a8d5f46e127', 'myservice', 'VAR')
>>> balena.models.device.service_var.remove('7cf02a6a016a4b3c9e3b7a8d5f46e127', 28970, 'VAR')
```

## set

Set the overriden value of a service variable on a device.

**Signature:** `balena.models.device.set(uuid_or_id, service_name_or_id, key, value)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name
    value (str): variable value

**Examples:**
```python
>>> balena.models.device.service_var.set('7cf02a6a016a4b3c9e3b7a8d5f46e127', 'myservice', 'VAR', 'override')
>>> balena.models.device.service_var.set('7cf02a6a016a4b3c9e3b7a8d5f46e127', 123, 'VAR', 'override')
```

# DeviceHistory

This class implements device history model for balena python SDK.
## get_all_by_application

Get all device history entries for an application.

**Signature:** `balena.models.history.get_all_by_application(slug_or_uuid_or_id, from_date, to_date, options)` ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    from_date (datetime): history entries newer than or equal to this timestamp. Defaults to 7 days ago
    to_date (datetime): history entries younger or equal to this date.
    options (AnyObject): extra pine options to use

**Returns:**
    List[DeviceHistoryType]: device history entries.

**Examples:**
```python
>>> balena.models.device.history.get_all_by_application('myorg/myapp')
>>> balena.models.device.history.get_all_by_application(11196426)
>>> balena.models.device.history.get_all_by_application(
...     11196426, from_date=datetime.utcnow() + timedelta(days=-5)
... )
>>> balena.models.device.history.get_all_by_application(
...     11196426,
...     from_date=datetime.utcnow() + timedelta(days=-10),
...     to_date=from_date = datetime.utcnow() + timedelta(days=-5))
... )
```

## get_all_by_device

Get all device history entries for a device.

**Signature:** `balena.models.history.get_all_by_device(uuid_or_id, from_date, to_date, options)` ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)

**Args:**
    uuid_or_id (str): device uuid (32 / 62 digits string) or id (number) __note__: No short IDs supported
    from_date (datetime): history entries newer than or equal to this timestamp. Defaults to 7 days ago
    to_date (datetime): history entries younger or equal to this date.
    options (AnyObject): extra pine options to use

**Returns:**
    List[DeviceHistoryType]: device history entries.

**Examples:**
```python
>>> balena.models.device.history.get_all_by_device('6046335305c8142883a4466d30abe211')
>>> balena.models.device.history.get_all_by_device(11196426)
>>> balena.models.device.history.get_all_by_device(
...     11196426, from_date=datetime.utcnow() + timedelta(days=-5)
... )
>>> balena.models.device.history.get_all_by_device(
...     11196426,
...     from_date=datetime.utcnow() + timedelta(days=-10),
...     to_date=from_date = datetime.utcnow() + timedelta(days=-5))
... )
```

# DeviceType

This class implements user API key model for balena python SDK.
## get

Get a single device type.

**Signature:** `balena.models.device_type.get(id_or_slug, options)` ⇒ [<code>DeviceTypeType</code>](#devicetypetype)

**Args:**
    id_or_slug (Union[str, int]): device type slug or alias (string) or id (int).
    options (AnyObject): extra pine options to use.

**Returns:**
    DeviceTypeType: Returns the device type

## get_all

Get all device types.

**Signature:** `balena.models.device_type.get_all(options)` ⇒ [<code>List[DeviceTypeType]</code>](#devicetypetype)

**Args:**
    options (AnyObject): extra pine options to use.

**Returns:**
    List[DeviceTypeType]: list contains info of device types.

## get_all_supported

Get all supported device types.

**Signature:** `balena.models.device_type.get_all_supported(options)` ⇒ <code>None</code>

**Args:**
    options (AnyObject): extra pine options to use.

**Returns:**
    List[DeviceTypeType]: list contains info of all supported device types.

## get_by_slug_or_name

Get a single device type by slug or name.

**Signature:** `balena.models.device_type.get_by_slug_or_name(slug_or_name, options)` ⇒ [<code>DeviceTypeType</code>](#devicetypetype)

**Args:**
    slug_or_name (str): device type slug or name.
    options (AnyObject): extra pine options to use.

**Returns:**
    DeviceTypeType: Returns the device type

## get_name

Get display name for a device.

**Signature:** `balena.models.device_type.get_name(slug)` ⇒ <code>str</code>

**Args:**
    slug (str): device type slug.

## get_slug_by_name

Get device slug.

**Signature:** `balena.models.device_type.get_slug_by_name(name)` ⇒ <code>str</code>

**Args:**
    name (str): device type name.

# ApiKey

This class implements user API key model for balena python SDK.
## create

This method registers a new api key for the current user with the name given.

**Signature:** `balena.models.api_key.create(name, description, expiry_date)` ⇒ <code>str</code>

**Args:**
    name (str): the API key name
    description (Optional[str]): the API key description
    expiry_date (Optional[str]): the API key expiring date

**Returns:**
    str: API key

**Examples:**
```python
>>> balena.models.api_key.create_api_key("myApiKey")
>>> balena.models.api_key.create_api_key("myApiKey", "my api key description")
>>> balena.models.api_key.create_api_key("myApiKey", "my descr", datetime.datetime.utcnow().isoformat())
```

## get_all

This function gets all API keys.

**Signature:** `balena.models.api_key.get_all(options)` ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[APIKeyType]: user API key

**Examples:**
```python
>>> balena.models.api_key.get_all()
```

## get_all_named_user_api_keys

Get all named user API keys of the current user.

**Signature:** `balena.models.api_key.get_all_named_user_api_keys(options)` ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

**Args:**
    options (AnyObject): extra pine options to use

**Examples:**
```python
>>> balena.models.api_key.get_all_named_user_api_keys()
```

## get_device_api_keys_by_device

Get all API keys for a device.

**Signature:** `balena.models.api_key.get_device_api_keys_by_device(uuid_or_id, options)` ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

**Args:**
    device_uuid (Union[str, int]): device, uuid (string) or id (int)
    options (AnyObject): extra pine options to use

**Examples:**
```python
>>> balena.models.api_key.get_device_api_keys_by_device("44cc9d186")
>>> balena.models.api_key.get_device_api_keys_by_device(1111386)
```

## get_provisioning_api_keys_by_application

Get all provisioning API keys for an application.

**Signature:** `balena.models.api_key.get_provisioning_api_keys_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Examples:**
```python
>>> balena.models.api_key.get_provisioning_api_keys_by_application(1296047)
>>> balena.models.api_key.get_provisioning_api_keys_by_application("myorg/myapp")
```

## revoke

This function revokes an API key.

**Signature:** `balena.models.api_key.revoke(id)` ⇒ <code>None</code>

**Args:**
    id (int): API key id.

**Examples:**
```python
>>> balena.models.api_key.revoke(1296047)
```

## update

This function updates details of an API key.

**Signature:** `balena.models.api_key.update(id, api_key_info)` ⇒ <code>None</code>

**Args:**
    id (str): API key id.
    api_key_info (APIKeyInfoType): new API key info.

**Examples:**
```python
>>> balena.models.api_key.update(1296047, {"name":"new name"})
```

# Key

This class implements ssh key model for balena python SDK.
## create

Create a ssh key.

**Signature:** `balena.models.key.create(title, key)` ⇒ [<code>SSHKeyType</code>](#sshkeytype)

**Args:**
    title (str): key title.
    key (str): the public ssh key.

**Returns:**
    SSHKeyType: new ssh key id.

## get

Get a single ssh key.

**Signature:** `balena.models.key.get(id)` ⇒ [<code>SSHKeyType</code>](#sshkeytype)

**Args:**
    id (int): key id.

**Returns:**
    SSHKeyType: ssh key info.

## get_all

Get all ssh keys.

**Signature:** `balena.models.key.get_all(options)` ⇒ [<code>List[SSHKeyType]</code>](#sshkeytype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[SSHKeyType]: list of ssh keys.

## remove

Remove a ssh key.

**Signature:** `balena.models.key.remove(id)` ⇒ <code>None</code>

**Args:**
    id (int): key id.

# Organization

This class implements organization model for balena python SDK.
## create

Creates a new organization.

**Signature:** `balena.models.organization.create(name, handle, logo_image)` ⇒ [<code>OrganizationType</code>](#organizationtype)

**Args:**
    name (str): the name of the organization that will be created.
    handle (Optional[str]): The handle of the organization that will be created.
    logo_image (Optional[io.BufferedReader]): The organization logo to be used.

**Returns:**
    dict: organization info.

**Examples:**
```python
>>> balena.models.organization.create('My Org', 'test_org')
>>> with open('mypath/myfile.png', 'rb') as f:
>>>     org = sdk.models.organization.create("my-name", None, f)
```

## get

Get a single organization.

**Signature:** `balena.models.organization.get(handle_or_id, options)` ⇒ [<code>OrganizationType</code>](#organizationtype)

**Args:**
    handle_or_id (str): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    dict: organization info.

**Raises:**
    OrganizationNotFound: if organization couldn't be found.

**Examples:**
```python
>>> balena.models.organization.get(26474)
>>> balena.models.organization.get('myorg')
```

## get_all

Get all organizations.

**Signature:** `balena.models.organization.get_all(options)` ⇒ [<code>List[OrganizationType]</code>](#organizationtype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[OrganizationType]: list contains information of organizations.

**Examples:**
```python
>>> balena.models.organization.get_all()
```

## remove

Remove an organization.

**Signature:** `balena.models.organization.remove(handle_or_id)` ⇒ <code>None</code>

**Args:**
    handle_or_id (str): organization handle (string) or id (number).

**Examples:**
```python
>>> balena.models.organization.remove(148003)
```

# OrganizationMembership

This class implements organization membership model for balena python SDK.
## get

Get a single organization membership.

**Signature:** `balena.models.organization.get(membership_id, options)` ⇒ [<code>OrganizationMembershipType</code>](#organizationmembershiptype)

**Args:**
    membership_id (ResourceKey): the id (int) or an object with the unique
    `user` & `is_member_of__organization` numeric pair of the membership
    options (AnyObject): extra pine options to use

**Returns:**
    Organization membership.

**Examples:**
```python
>>> balena.models.organization.memberships.get(17608)
```

## get_all

Get all organization memberships.

**Signature:** `balena.models.organization.get_all(options)` ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[OrganizationMembershipType]: organization memberships.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.get_all()
```

## get_all_by_organization

Get all memberships by organization.

**Signature:** `balena.models.organization.get_all_by_organization(handle_or_id, options)` ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)

**Args:**
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    List[OrganizationMembershipType]: organization memberships.

**Examples:**
```python
>>> balena.models.organization.memberships.get_all_by_organization(3014)
```

# OrganizationMembershipTag

This class implements organization membership tag model for balena python SDK.
## get

Get an organization membership tag.

**Signature:** `balena.models.organization.get(membership_id, tag_key)` ⇒ <code>Optional[str]</code>

**Args:**
    membership_id: organization membership id.
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.get(17608, 'mTag1')
```

## get_all

Get all organization membership tags.

**Signature:** `balena.models.organization.get_all(options)` ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

**Args:**
    options (AnyObject): extra pine options to use


**Examples:**
```python
>>> balena.models.organization.memberships.tags.get_all()
```

## get_all_by_organization

Get all organization membership tags for an organization.

**Signature:** `balena.models.organization.get_all_by_organization(handle_or_id, options)` ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

**Args:**
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    List[OrganizationMembershipTagType]: organization membership tags.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.get_all_by_organization(3014)
```

## get_all_by_organization_membership

Get all organization membership tags for a memberships of an organization.

**Signature:** `balena.models.organization.get_all_by_organization_membership(membership_id, options)` ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

**Args:**
    membership_id (int): organization membership id.
    options (AnyObject): extra pine options to use

**Returns:**
    list: organization membership tags.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.get_all_by_organization_membership(17608)
```

## remove

Remove an organization membership tag.

**Signature:** `balena.models.organization.remove(membership_id, tag_key)` ⇒ <code>None</code>

**Args:**
    membership_id: organization membership id.
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.remove(17608, 'mTag1')
```

## set

Set an organization membership tag.

**Signature:** `balena.models.organization.set(membership_id, tag_key, value)` ⇒ <code>None</code>

**Args:**
    membership_id: organization membership id.
    tag_key (str): tag key.
    value (str): tag value.

**Examples:**
```python
>>> balena.models.organization.memberships.tags.set(17608, 'mTag1', 'Python SDK')
```

# OrganizationInvite

This class implements organization invite model for balena python SDK.
## accept

Accepts an invite.

**Signature:** `balena.models.organization.accept(invite_token)` ⇒ <code>None</code>

**Args:**
    invite_token (str): invitation Token - invite token.

## create

Creates a new invite for an organization.

**Signature:** `balena.models.organization.create(handle_or_id, invitee, role_name, message)` ⇒ [<code>OrganizationInviteType</code>](#organizationinvitetype)

**Args:**
    handle_or_id (Union[str, int]): organization handle (string), or id (number).
    invitee (str): the email/balena_username of the invitee.
    role_name (Optional[str]): the role name to be granted to the invitee.
    message (Optional[str]): the message to send along with the invite.

**Returns:**
    OrganizationInviteType: organization invite.

**Examples:**
```python
>>> balena.models.organization.invite.create(26474, 'invitee@example.org', 'member', 'Test invite')
```

## get_all

Get all invites.

**Signature:** `balena.models.organization.get_all(options)` ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[OrganizationInviteType]: list contains info of invites.

**Examples:**
```python
>>> balena.models.organization.invite.get_all()
```

## get_all_by_organization

Get all invites by organization.

**Signature:** `balena.models.organization.get_all_by_organization(handle_or_id, options)` ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)

**Args:**
    handle_or_id (Union[str, int]): organization handle (string), or id (number).
    options (AnyObject): extra pine options to use.

**Returns:**
    List[OrganizationInviteType]: list contains info of invites.

**Examples:**
```python
>>> balena.models.organization.invite.get_all_by_organization(26474)
```

## revoke

Revoke an invite.

**Signature:** `balena.models.organization.revoke(invite_id)` ⇒ <code>None</code>

**Args:**
    invite_id (int): organization invite id.

**Examples:**
```python
>>> balena.models.organization.invite.revoke(2862)
```

# DeviceOs

This class implements device os model for balena python SDK.
## download

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

**Signature:** `balena.models.os.download(device_type, version, options)` ⇒ <code>None</code>

**Args:**
    device_type (str): device type slug.
    version (str): semver-compatible version or 'latest', defaults to 'latest'.
    * The version **must** be the exact version number.
    options (DownloadConfig): OS configuration options to use.

**Returns:**
    float: OS image download size, in bytes.

Example:
```python
>>> with b.models.device_os.download("raspberrypi3") as stream:
...    stream.raise_for_status()
...    with open("my-image-filename", "wb") as f:
...        for chunk in stream.iter_content(chunk_size=8192):
...            f.write(chunk)
```

## get_all_os_versions

Get all OS versions for the provided device type(s), inlcuding invalidated ones

**Signature:** `balena.models.os.get_all_os_versions(device_type, options)` ⇒ <code>None</code>

**Args:**
    device_type (Union[str, List[str]]): device type slug.
    options (AnyObject): extra pine options to use

**Returns:**
    list: balenaOS versions.

## get_available_os_versions

Get the supported OS versions for the provided device type(s)

**Signature:** `balena.models.os.get_available_os_versions(device_type)` ⇒ <code>None</code>

**Args:**
    device_type (Union[str, List[str]]): device type slug.

**Returns:**
    list: balenaOS versions.

## get_config

Download application config.json.

**Signature:** `balena.models.os.get_config(slug_or_uuid_or_id, options)` ⇒ <code>None</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (ImgConfigOptions): OS configuration dict to use. The available options
    are listed below:
        network (Optional[Literal["ethernet", "wifi"]]): The network type that
        the device will use, one of 'ethernet' or 'wifi'.
        appUpdatePollInterval (Optional[int]): How often the OS checks for updates, in minutes.
        provisioningKeyName (Optional[str]): Name assigned to API key
        provisioningKeyExpiryDate (Optional[str]): Expiry Date assigned to API key
        wifiKey (Optional[str]): The key for the wifi network the device will connect to.
        wifiSsid (Optional[str]): The ssid for the wifi network the device will connect to.
        ip (Optional[str]): static ip address
        gateway (Optional[str]): static ip gateway.
        netmask (Optional[str]): static ip netmask.
        deviceType (Optional[str]): The device type.
        version (str): Required: the OS version of the image.
        developmentMode (Optional[bool]): If the device should be in development mode.

**Returns:**
    dict: application config.json content.

**Raises:**
    ApplicationNotFound: if application couldn't be found.

## get_download_size

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

**Signature:** `balena.models.os.get_download_size(device_type, version)` ⇒ <code>float</code>

**Args:**
    device_type (str): device type slug.
    version (str): semver-compatible version or 'latest', defaults to 'latest'.
    * The version **must** be the exact version number.

**Returns:**
    float: OS image download size, in bytes.

## get_max_satisfying_version

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

**Signature:** `balena.models.os.get_max_satisfying_version(device_type, version_or_range, os_type)` ⇒ <code>Optional[str]</code>

**Args:**
    device_type (str): device type slug.
    version_or_range (str): can be one of the exact version number,
    in which case it is returned if the version is supported,
    or `None` is returned otherwise,
    * a [semver](https://www.npmjs.com/package/semver)-compatible
    range specification, in which case the most recent satisfying version is returned
    if it exists, or `None` is returned,
    `'latest'` in which case the most recent version is returned, including pre-releases,
    `'recommended'` in which case the recommended version is returned, i.e. the most
    recent version excluding pre-releases, which can be `None` if only pre-release versions
    are available,
    `'default'` in which case the recommended version is returned if available,
    or `latest` is returned otherwise.
    Defaults to `'latest'`
    os_type (Optional[Literal["default", "esr"]]): The used OS type.

**Returns:**
    float: OS image download size, in bytes.

## get_supervisor_releases_for_cpu_architecture

Returns the Releases of the supervisor for the CPU Architecture

**Signature:** `balena.models.os.get_supervisor_releases_for_cpu_architecture(cpu_architecture_slug_or_id, options)` ⇒ [<code>List[ReleaseType]</code>](#releasetype)

**Args:**
    cpu_architecture_slug_or_id (Union[str, int]): The slug (string) or id (number) for the CPU Architecture.
    options (AnyObject): extra pine options to use.

**Returns:**
    ReleaseType: release info.


Example:
    results = balena.models.os.get_supervisor_releases_for_cpu_architecture('aarch64');
    results = balena.models.os.get_supervisor_releases_for_cpu_architecture(
        'aarch64',
        { $filter: { raw_version: '12.11.0' } },
    );

## get_supported_os_update_versions

Get OS supported versions.

**Signature:** `balena.models.os.get_supported_os_update_versions(device_type, current_version)` ⇒ <code>None</code>

**Args:**
    device_type (str): device type slug.
    current_version (str): device type slug.

## is_architecture_compatible_with

Returns whether the specified OS architecture is compatible with the target architecture.

**Signature:** `balena.models.os.is_architecture_compatible_with(os_architecture, application_architecture)` ⇒ <code>None</code>

**Args:**
    os_architecture (str): The OS's architecture as specified in its device type.
    application_architecture (str): The application's architecture as specified in its device type.

**Returns:**
    bool: Whether the specified OS architecture is capable of
          running applications build for the target architecture.

## is_supported_os_update

 Returns the supported OS update targets for the provided device type.

**Signature:** `balena.models.os.is_supported_os_update(device_type, current_version, target_version)` ⇒ <code>bool</code>

**Args:**
    device_type (str): device type slug.
    current_version (str): emver-compatible version for the starting OS version
    target_version (str): semver-compatible version for the target OS version

# Config

This class implements configuration model for balena python SDK.
## get_all

Get all configuration.

**Signature:** `balena.models.config.get_all()` ⇒ <code>ConfigType</code>

**Returns:**
    ConfigType: configuration information.

**Examples:**
```python
>>> balena.models.config.get_all()
```

# Release

This class implements release model for balena python SDK.
## create_from_url

Create a new release built from the source in the provided url.

**Signature:** `balena.models.release.create_from_url(slug_or_uuid_or_id, url, flatten_tarball)` ⇒ <code>int</code>

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    url (str): a url with a tarball of the project to build.
    flatten_tarball (bool): Should be true when the tarball includes an extra root folder
    with all the content.

**Returns:**
    int: release Id.

## finalize

Finalizes a draft release.

**Signature:** `balena.models.release.finalize(commit_or_id_or_raw_version)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)

## get

Get a specific release.

**Signature:** `balena.models.release.get(commit_or_id_or_raw_version, options)` ⇒ [<code>ReleaseType</code>](#releasetype)

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string)
    pair of the release options
    options(AnyObject): extra pine options to use

**Returns:**
    ReleaseType: release info.

## get_all_by_application

Get all releases from an application.

**Signature:** `balena.models.release.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[ReleaseType]</code>](#releasetype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    List[ReleaseType]: release info.

## get_latest_by_application

Get the latest successful release for an application.

**Signature:** `balena.models.release.get_latest_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>Optional[ReleaseType]</code>](#releasetype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

**Returns:**
    Optional[ReleaseType]: release info.

## get_with_image_details

Get a specific release with the details of the images built.

**Signature:** `balena.models.release.get_with_image_details(commit_or_id_or_raw_version, image_options, release_options)` ⇒ [<code>ReleaseWithImageDetailsType</code>](#releasewithimagedetailstype)

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    image_options (AnyObject): extra pine options to use on image expand
    release_options (AnyObject): extra pine options to use on release expand

**Returns:**
    dict: release info.

**Raises:**
    ReleaseNotFound: if release couldn't be found.

## set_is_invalidated

Set the is_invalidated property of a release to True or False.

**Signature:** `balena.models.release.set_is_invalidated(commit_or_id_or_raw_version, is_invalidated)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    is_invalidated (bool): True for invalidated, False for validated.

## set_known_issue_list

Set a known issue list for a release.

**Signature:** `balena.models.release.set_known_issue_list(commit_or_id_or_raw_version, known_issue_list)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    known_issue_list (Optional[str]): the known issue list.

## set_note

Set a note for a release.

**Signature:** `balena.models.release.set_note(commit_or_id_or_raw_version, note)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    note (Optional[str]): the note.

## set_release_version

Set a direct semver for a given release.

**Signature:** `balena.models.release.set_release_version(commit_or_id, semver)` ⇒ <code>None</code>

**Args:**
    commit_or_id(Union[str, int]): release commit (string) or id (int)
    semver (str): the version to be released, must be a valid semver

# ReleaseTag

This class implements release tag model for balena python SDK.
## get

Get a single release tag.

**Signature:** `balena.models.release.get(commit_or_id_or_raw_version, tag_key)` ⇒ <code>Optional[str]</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.release.tags.get(465307, 'releaseTag1')
```

## get_all

Get all release tags.

**Signature:** `balena.models.release.get_all(options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.release.tags.get_all()
```

## get_all_by_application

Get all device tags for an application.

**Signature:** `balena.models.release.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.release.tags.get_all_by_application(1005160)
```

## get_all_by_release

Get all release tags for a release.

**Signature:** `balena.models.release.get_all_by_release(commit_or_id_or_raw_version, options)` ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    options (AnyObject): extra pine options to use

**Returns:**
    List[BaseTagType]: tags list.

**Examples:**
```python
>>> balena.models.release.tags.get_all_by_release(135)
```

## remove

Remove a release tag.

**Signature:** `balena.models.release.remove(commit_or_id_or_raw_version, tag_key)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.

**Examples:**
```python
>>> balena.models.release.tags.remove(135, 'releaseTag1')
```

## set

Set a release tag (update tag value if it exists).

**Signature:** `balena.models.release.set(commit_or_id_or_raw_version, tag_key, value)` ⇒ <code>None</code>

**Args:**
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.
    value (str): tag value.

**Examples:**
```python
>>> balena.models.release.tags.set(465307, 'releaseTag1', 'Python SDK')
```

# Service

This class implements service model for balena python SDK.
## get_all_by_application

Get all services from an application.

**Signature:** `balena.models.service.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[ServiceType]</code>](#servicetype)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[ServiceType]: service info.

# ServiceEnvVariable

This class implements Service environment variable model for balena python SDK.
## get

Get the value of a specific service variable

**Signature:** `balena.models.service.get(service_id_or_natural_key, key)` ⇒ <code>Optional[str]</code>

**Args:**
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name

**Examples:**
```python
>>> balena.models.service.var.get(1234,'test_env4')
>>> balena.models.service.var.get({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR')
```

## get_all_by_application

Get all service variables by application.

**Signature:** `balena.models.service.get_all_by_application(slug_or_uuid_or_id, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: application environment variables.

**Examples:**
```python
>>> balena.models.service.var.get_all_by_application(9020)
>>> balena.models.service.var.get_all_by_application("myorg/myslug")
```

## get_all_by_service

Get all variables for a service.

**Signature:** `balena.models.service.get_all_by_service(service_id_or_natural_key, options)` ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

**Args:**
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    options (AnyObject): extra pine options to use

**Returns:**
    List[EnvironmentVariableBase]: service environment variables.

**Examples:**
```python
>>> balena.models.service.var.get_all_by_service(1234)
>>> balena.models.service.var.get_all_by_service({'application': 'myorg/myapp', 'service_name': 'service'})
```

## remove

Clear the value of a specific service variable

**Signature:** `balena.models.service.remove(service_id_or_natural_key, key)` ⇒ <code>None</code>

**Args:**
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name

**Examples:**
```python
>>> balena.models.service.var.remove({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR')
>>> balena.models.service.var.remove(1234,'test_env4')
```

## set

Set the value of a specific application environment variable.

**Signature:** `balena.models.service.set(service_id_or_natural_key, key, value)` ⇒ <code>None</code>

**Args:**
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name
    value (str): environment variable value.

**Examples:**
```python
>>> balena.models.service.var.set({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR', 'value')
>>> balena.models.service.var.set(1234,'test_env4', 'value')
```

# Image

This class implements image model for balena python SDK.
## get

Get a specific image.

**Signature:** `balena.models.image.get(id, options)` ⇒ [<code>ImageType</code>](#imagetype)

**Args:**
    id (int): image id.
    options (AnyObject): extra pine options to use.

**Returns:**
    ImageType: image info.

## get_logs

Get the build log from an image.

**Signature:** `balena.models.image.get_logs(id)` ⇒ <code>str</code>

**Args:**
    id (str): image id.

**Returns:**
    str: build log.

# Auth

This class implements all authentication functions for balena python SDK.
## authenticate

This function authenticates provided credentials information.
You should use Auth.login when possible, as it takes care of saving the Auth Token and username as well.

**Signature:** `balena.auth.authenticate()` ⇒ <code>str</code>

**Args:**
    **credentials: credentials keyword arguments.
        username (str): Balena username.
        password (str): Password.

**Returns:**
    str: Auth Token,

**Examples:**
```python
>>> balena.auth.authenticate(username='<your email>', password='<your password>')
```

## get_actor_id

Get current logged in actor id.

**Signature:** `balena.auth.get_actor_id()` ⇒ <code>int</code>

**Returns:**
    int: actor id

**Examples:**
```python
# If you are logged in.
>>> balena.auth.get_actor_id()
```

## get_token

This function retrieves Auth Token.

**Signature:** `balena.auth.get_token()` ⇒ <code>Optional[str]</code>

**Returns:**
    str: Auth Token.

**Examples:**
```python
>>> balena.auth.get_token()
```

## get_user_info

Get current logged in user's info

**Signature:** `balena.auth.get_user_info()` ⇒ <code>UserInfo</code>

**Returns:**
    UserInfo: user info.

**Examples:**
```python
# If you are logged in as a user.
>>> balena.auth.get_user_info()
```

## is_logged_in

This function checks if you're logged in

**Signature:** `balena.auth.is_logged_in()` ⇒ <code>bool</code>

**Returns:**
    bool: True if logged in, False otherwise.

**Examples:**
```python
# Check if user logged in.
>>> if balena.auth.is_logged_in():
...     print('You are logged in!')
... else:
...     print('You are not logged in!')
```

## login

This function is used for logging into balena using email and password.

**Signature:** `balena.auth.login()` ⇒ <code>None</code>

**Args:**
    **credentials: credentials keyword arguments.
        username (str): Balena email.
        password (str): Password.

**Examples:**
```python
>>> from balena import Balena
... balena = Balena()
... credentials = {'username': '<your email>', 'password': '<your password>'}
... balena.auth.login(**credentials)
... # or
... balena.auth.login(username='<your email>', password='<your password>')
```

## login_with_token

This function is used for logging into balena using Auth Token.
Auth Token can be found in Preferences section on balena Dashboard.

**Signature:** `balena.auth.login_with_token(token)` ⇒ <code>None</code>

**Args:**
    token (str): Auth Token.

**Returns:**
    This functions saves Auth Token to Settings and returns nothing.

**Examples:**
```python
>>> from balena import Balena
>>> balena = Balena()
>>> auth_token = <your token>
>>> balena.auth.login_with_token(auth_token)
```

## logout

This function is used for logging out from balena.

**Signature:** `balena.auth.logout()` ⇒ <code>None</code>

**Examples:**
```python
# If you are logged in.
>>> balena.auth.logout()
```

## register

This function is used for registering to balena.

**Signature:** `balena.auth.register()` ⇒ <code>str</code>

**Args:**
    **credentials: credentials keyword arguments.
        email (str): email to register.
        password (str): Password.

**Returns:**
    str: Auth Token for new account.

**Examples:**
```python
>>> credentials = {'email': '<your email>', 'password': '<your password>'}
>>> balena.auth.register(**credentials)
```

## whoami

Return current logged in username.

**Signature:** `balena.auth.whoami()` ⇒ <code>Union[UserKeyWhoAmIResponse, ApplicationKeyWhoAmIResponse, DeviceKeyWhoAmIResponse, None]</code>

**Returns:**
    Optional[WhoamiResult]: current logged in information

**Examples:**
```python
>>> balena.auth.whoami()
```

# TwoFactorAuth

This class implements basic 2FA functionalities for balena python SDK.
## challenge

Challenge two-factor authentication.
If your account has two-factor authentication enabled and logging in using credentials,
you need to pass two-factor authentication before being allowed to use other functions.

**Signature:** `balena.twofactor_auth.challenge(code)` ⇒ <code>None</code>

**Args:**
    code (str): two-factor authentication code.

**Examples:**
```python
# You need to enable two-factor authentication on dashboard first.
# Check if two-factor authentication is passed for current session.
>>> balena.twofactor_auth.is_passed()
False
>>> balena.twofactor_auth.challenge('123456')
# Check again if two-factor authentication is passed for current session.
>>> balena.twofactor_auth.is_passed()
True
```

## disable

Disable two factor authentication.
__Note__: Disable will only work when using a token that has 2FA enabled.

**Signature:** `balena.twofactor_auth.disable(password)` ⇒ <code>str</code>

**Args:**
    password (str): password.

**Returns:**
    str: session token.

**Examples:**
```python
>>> balena.twofactor_auth.disable('your_password')
```

## enable

Enable two factor authentication.

**Signature:** `balena.twofactor_auth.enable(code)` ⇒ <code>str</code>

**Args:**
    code (str): two-factor authentication code.

**Returns:**
    str: session token.

**Examples:**
```python
>>> balena.twofactor_auth.enable('123456')
```

## get_setup_key

Retrieves a setup key for enabling two factor authentication.
This value should be provided to your 2FA app in order to get a token.
This function only works if you disable two-factor authentication or log in using Auth Token from dashboard.

**Signature:** `balena.twofactor_auth.get_setup_key()` ⇒ <code>str</code>

**Returns:**
    str: setup key.

**Examples:**
```python
>>> balena.twofactor_auth.get_setup_key()
```

## is_enabled

Check if two-factor authentication is enabled.

**Signature:** `balena.twofactor_auth.is_enabled()` ⇒ <code>bool</code>

**Returns:**
    bool: True if enabled. Otherwise False.

**Examples:**
```python
>>> balena.twofactor_auth.is_enabled()
```

## is_passed

Check if two-factor authentication challenge was passed.
If the user does not have 2FA enabled, this will be True.

**Signature:** `balena.twofactor_auth.is_passed()` ⇒ <code>bool</code>

**Returns:**
    bool: True if passed. Otherwise False.

**Examples:**
```python
>>> balena.twofactor_auth.is_passed()
```

## verify

Verifies two factor authentication.
Note that this method not update the token automatically.
You should use balena.twofactor_auth.challenge() when possible, as it takes care of that as well.

**Signature:** `balena.twofactor_auth.verify(code)` ⇒ <code>str</code>

**Args:**
    code (str): two-factor authentication code.

**Returns:**
    str: session token.

**Examples:**
```python
>>> balena.twofactor_auth.verify('123456')
```

# Logs

This class implements functions that allow processing logs from device.
## history

Get device logs history.

**Signature:** `balena.logs.history(uuid_or_id, count)` ⇒ <code>List[Log]</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    count (Optional[Union[int, Literal["all"]]]): number of historical messages to include.

## stop

Will grecefully unsubscribe from all devices and stop the consumer thread.
**Signature:** `balena.logs.stop()` ⇒ <code>None</code>


## subscribe

Subscribe to device logs.

**Signature:** `balena.logs.subscribe(uuid_or_id, callback, error, count)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    callback (Callable[[Log], None]): this callback is called on receiving a message.
    error (Optional[Callable[[Any], None]]): this callback is called on an error event.
    count (Optional[Union[int, Literal["all"]]]): number of historical messages to include.

## unsubscribe

Unsubscribe from device logs for a specific device.

**Signature:** `balena.logs.unsubscribe(uuid_or_id)` ⇒ <code>None</code>

**Args:**
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

## unsubscribe_all

Unsubscribe all subscribed devices.
**Signature:** `balena.logs.unsubscribe_all()` ⇒ <code>None</code>


# Settings

Create a module object.

The name must be a string; the optional doc argument can have any type.
# Types
## APIKeyInfoType


```python
{
    "name": str,
    "description": Optional[str],
    "expiry_date": Optional[str]
}
```


## APIKeyType


```python
{
    "id": int,
    "created_at": str,
    "name": str,
    "description": Optional[str],
    "expiry_date": Optional[str],
    "is_of__actor": Union[List[ActorType], PineDeferred]
}
```


## ActorType


```python
{
    "id": int,
    "is_of__user": Union[List[UserType], PineDeferred, None],
    "is_of__application": Union[List[TypeApplication], PineDeferred, None],
    "is_of__device": Union[List[TypeDevice], PineDeferred, None],
    "is_of__public_device": Union[List[PublicDeviceType], PineDeferred, None],
    "api_key": Union[List[APIKeyType], PineDeferred, None]
}
```


## ApplicationHostedOnApplication


```python
{
    "application": Union[List[TypeApplication], PineDeferred],
    "can_use__application_as_host": Union[List[TypeApplication], PineDeferred]
}
```


## ApplicationInviteType


```python
{
    "id": int,
    "message": str,
    "created_at": str,
    "invitationToken": str,
    "application_membership_role": Union[List[ApplicationMembershipRoleType], PineDeferred],
    "invitee": Union[List[InviteeType], PineDeferred],
    "is_invited_to__application": Union[List[ApplicationType], PineDeferred]
}
```


## ApplicationMembershipRoleType


```python
{
    "id": int,
    "name": Literal["developer", "operator", "observer"]
}
```


## ApplicationMembershipType


```python
{
    "id": int,
    "user": Union[List[UserType], PineDeferred],
    "is_member_of__application": Union[List[TypeApplication], PineDeferred],
    "application_membership_role": Union[List[ApplicationMembershipRoleType], PineDeferred]
}
```


## ApplicationType


```python
{
    "id": int,
    "name": str,
    "slug": str,
    "description": Optional[str],
    "supports_multicontainer": bool,
    "supports_web_url": bool,
    "is_legacy": bool,
    "requires_payment": bool,
    "needs__os_version_range": Optional[str],
    "maximum_device_count": Optional[int]
}
```


## BaseTagType


```python
{
    "id": int,
    "tag_key": str,
    "value": str
}
```


## BasicUserInfoType


```python
{
    "id": int,
    "username": str
}
```


## CpuArchitectureType


```python
{
    "id": int,
    "slug": str,
    "is_supported_by__device_type": Optional[List[CpuArchitectureType]]
}
```


## CreditBundleType


```python
{
    "id": int,
    "created_at": str,
    "is_created_by__user": Union[List[UserType], PineDeferred, None],
    "original_quantity": float,
    "total_balance": float,
    "total_cost": float,
    "payment_status": Literal["processing", "paid", "failed", "complimentary", "cancelled", "refunded"],
    "belongs_to__organization": Union[List[OrganizationType], PineDeferred],
    "is_for__feature": Any,
    "is_associated_with__invoice_id": Optional[str],
    "error_message": Optional[str]
}
```


## DeviceFamilyType


```python
{
    "created_at": str,
    "modified_at": str,
    "id": int,
    "slug": str,
    "name": str,
    "is_manufactured_by__device_manufacturer": Union[List[DeviceManufacturerType], PineDeferred, None]
}
```


## DeviceHistoryType


```python
{
    "created_at": str,
    "id": int,
    "end_timestamp": str,
    "is_created_by__actor": Union[List[ActorType], PineDeferred, None],
    "is_ended_by__actor": Union[List[ActorType], PineDeferred, None],
    "tracks__device": Union[List[TypeDevice], PineDeferred],
    "tracks__actor": Union[List[ActorType], PineDeferred, None],
    "uuid": Optional[str],
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "is_active": bool,
    "is_running__release": Union[List[ReleaseType], PineDeferred, None],
    "should_be_running__release": Union[List[ReleaseType], PineDeferred, None],
    "os_version": Optional[str],
    "os_variant": Optional[str],
    "supervisor_version": Optional[str],
    "is_of__device_type": Union[List[DeviceTypeType], PineDeferred, None],
    "should_be_managed_by__release": Union[List[ReleaseType], PineDeferred, None]
}
```


## DeviceManufacturerType


```python
{
    "created_at": str,
    "modified_at": str,
    "id": int,
    "slug": str,
    "name": str
}
```


## DeviceMetricsType


```python
{
    "memory_usage": int,
    "memory_total": int,
    "storage_block_device": str,
    "storage_usage": int,
    "storage_total": int,
    "cpu_usage": int,
    "cpu_temp": int,
    "cpu_id": str,
    "is_undervolted": bool
}
```


## DeviceTypeAliasType


```python
{
    "id": int,
    "is_referenced_by__alias": str,
    "references__device_type": Union[List[DeviceTypeType], PineDeferred]
}
```


## DeviceTypeType


```python
{
    "id": int,
    "slug": str,
    "name": str,
    "is_private": bool,
    "logo": str,
    "contract": Any,
    "belongs_to__device_family": Union[List[DeviceFamilyType], PineDeferred, None],
    "is_default_for__application": Optional[List[TypeApplication]],
    "is_of__cpu_architecture": Union[List[CpuArchitectureType], PineDeferred],
    "is_accessible_privately_by__organization": Optional[List[OrganizationType]],
    "describes_device": Optional[List[TypeDevice]],
    "device_type_alias": Optional[List[DeviceTypeAliasType]]
}
```


## EnvironmentVariableBase


```python
{
    "id": int,
    "name": str,
    "value": str
}
```


## ImageBasicInfoType


```python
{
    "id": int,
    "service_name": str
}
```


## ImageInstallType


```python
{
    "id": int,
    "download_progress": Optional[float],
    "status": str,
    "install_date": str,
    "installs__image": Union[List[ImageType], PineDeferred],
    "device": Union[List[TypeDevice], PineDeferred],
    "is_provided_by__release": Union[List[ReleaseType], PineDeferred]
}
```


## ImageType


```python
{
    "id": int,
    "created_at": str,
    "build_log": str,
    "contract": Any,
    "content_hash": str,
    "project_type": str,
    "status": str,
    "is_stored_at__image_location": str,
    "start_timestamp": str,
    "end_timestamp": str,
    "push_timestamp": str,
    "image_size": str,
    "dockerfile": str,
    "error_message": str,
    "is_a_build_of__service": Union[List[ServiceType], PineDeferred],
    "release_image": Optional[List[ReleaseImageType]]
}
```


## InviteeType


```python
{
    "id": int,
    "created_at": str,
    "email": str
}
```


## OrganizationInviteType


```python
{
    "id": int,
    "message": str,
    "created_at": str,
    "invitationToken": str,
    "organization_membership_role": Union[List[OrganizationMembershipRoleType], PineDeferred],
    "invitee": Union[List[InviteeType], PineDeferred],
    "is_invited_to__organization": Union[List[OrganizationType], PineDeferred]
}
```


## OrganizationMembershipRoleType


```python
{
    "id": int,
    "name": Literal["administrator", "member"]
}
```


## OrganizationMembershipTagType


```python
{
    "organization_membership": Union[List[OrganizationMembershipType], PineDeferred]
}
```


## OrganizationMembershipType


```python
{
    "id": int,
    "created_at": str,
    "user": Union[List[UserType], PineDeferred],
    "is_member_of__organization": Union[List[OrganizationType], PineDeferred],
    "organization_membership_role": Union[List[OrganizationMembershipRoleType], PineDeferred],
    "effective_seat_role": str,
    "organization_membership_tag": Optional[List[OrganizationMembershipTagType]]
}
```


## OrganizationPrivateDeviceTypeAccess


```python
{
    "id": int,
    "organization": Union[List[OrganizationType], PineDeferred],
    "has_private_access_to__device_type": Union[List[TypeDevice], PineDeferred]
}
```


## OrganizationType


```python
{
    "id": int,
    "created_at": str,
    "name": str,
    "handle": str,
    "logo_image": WebResource,
    "has_past_due_invoice_since__date": str,
    "application": Optional[List[TypeApplication]],
    "organization_membership": Optional[List[OrganizationMembershipType]],
    "owns__team": Optional[List[TeamType]],
    "organization__has_private_access_to__device_type": Optional[List[OrganizationPrivateDeviceTypeAccess]]
}
```


## PineDeferred


```python
{
    "_PineDeferred__id": int
}
```


## PublicDeviceType


```python
{
    "latitude": str,
    "longitude": str,
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "is_of__device_type": Union[List[TypeDevice], PineDeferred],
    "was_recently_online": bool
}
```


## PublicOrganizationType


```python
{
    "id": int,
    "name": str,
    "handle": str
}
```


## ReleaseImageType


```python
{
    "id": int,
    "created_at": str,
    "image": Union[List[ImageType], PineDeferred],
    "is_part_of__release": Union[List[ReleaseType], PineDeferred]
}
```


## ReleaseType


```python
{
    "id": int,
    "created_at": str,
    "commit": str,
    "composition": Any,
    "contract": Any,
    "status": Literal["cancelled", "error", "failed", "interrupted", "local", "running", "success", "timeout"],
    "source": str,
    "build_log": str,
    "is_invalidated": bool,
    "start_timestamp": str,
    "update_timestamp": str,
    "end_timestamp": str,
    "phase": Literal["next", "current", "sunset", "end-of-life"],
    "semver": str,
    "semver_major": int,
    "semver_minor": int,
    "semver_patch": int,
    "semver_prerelease": str,
    "semver_build": str,
    "variant": str,
    "revision": int,
    "known_issue_list": str,
    "raw_version": str,
    "version": ReleaseVersion,
    "is_final": bool,
    "is_finalized_at__date": str,
    "note": str,
    "invalidation_reason": str,
    "is_created_by__user": Union[List[UserType], PineDeferred, None],
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "release_image": Optional[List[ReleaseImageType]],
    "should_be_running_on__application": Optional[List[TypeApplication]],
    "is_running_on__device": Optional[List[TypeDevice]],
    "is_pinned_to__device": Optional[List[TypeDevice]],
    "should_operate__device": Optional[List[TypeDevice]],
    "should_manage__device": Optional[List[TypeDevice]],
    "release_tag": Optional[List[BaseTagType]]
}
```


## ReleaseVersion


```python
{
    "raw": str,
    "major": int,
    "minor": int,
    "patch": int,
    "version": str,
    "build": List[str],
    "prerelease": List[Union[str, int]]
}
```


## ReleaseWithImageDetailsType


```python
{
    "id": int,
    "created_at": str,
    "commit": str,
    "composition": Any,
    "contract": Any,
    "status": Literal["cancelled", "error", "failed", "interrupted", "local", "running", "success", "timeout"],
    "source": str,
    "build_log": str,
    "is_invalidated": bool,
    "start_timestamp": str,
    "update_timestamp": str,
    "end_timestamp": str,
    "phase": Literal["next", "current", "sunset", "end-of-life"],
    "semver": str,
    "semver_major": int,
    "semver_minor": int,
    "semver_patch": int,
    "semver_prerelease": str,
    "semver_build": str,
    "variant": str,
    "revision": int,
    "known_issue_list": str,
    "raw_version": str,
    "version": ReleaseVersion,
    "is_final": bool,
    "is_finalized_at__date": str,
    "note": str,
    "invalidation_reason": str,
    "is_created_by__user": Union[List[UserType], PineDeferred, None],
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "release_image": Optional[List[ReleaseImageType]],
    "should_be_running_on__application": Optional[List[TypeApplication]],
    "is_running_on__device": Optional[List[TypeDevice]],
    "is_pinned_to__device": Optional[List[TypeDevice]],
    "should_operate__device": Optional[List[TypeDevice]],
    "should_manage__device": Optional[List[TypeDevice]],
    "release_tag": Optional[List[BaseTagType]],
    "images": List[ImageBasicInfoType],
    "user": BasicUserInfoType
}
```


## SSHKeyType


```python
{
    "title": str,
    "public_key": str,
    "id": int,
    "created_at": str,
    "user": Union[List[UserType], PineDeferred]
}
```


## ServiceInstanceType


```python
{
    "id": int,
    "created_at": str,
    "service_type": str,
    "ip_address": str,
    "last_heartbeat": str
}
```


## ServiceType


```python
{
    "id": int,
    "created_at": str,
    "service_name": str,
    "application": Union[List[TypeApplication], PineDeferred],
    "is_built_by__image": Optional[List[ImageType]],
    "service_environment_variable": Optional[List[EnvironmentVariableBase]],
    "device_service_environment_variable": Optional[List[EnvironmentVariableBase]]
}
```


## TeamApplicationAccessType


```python
{
    "id": int,
    "team": Union[List[TeamType], PineDeferred],
    "grants_access_to__application": Union[List[TypeApplication], PineDeferred],
    "application_membership_role": Union[List[ApplicationMembershipRoleType], PineDeferred]
}
```


## TeamMembershipType


```python
{
    "id": int,
    "created_at": str,
    "user": Union[List[UserType], PineDeferred],
    "is_member_of__team": Union[List[TeamType], PineDeferred]
}
```


## TeamType


```python
{
    "id": int,
    "created_at": str,
    "name": str,
    "belongs_to__organization": Union[List[OrganizationType], PineDeferred],
    "team_membership": Optional[List[TeamMembershipType]],
    "team_application_access": Optional[List[TeamApplicationAccessType]]
}
```


## TypeApplication


```python
{
    "id": int,
    "created_at": str,
    "app_name": str,
    "actor": Union[List[ActorType], PineDeferred],
    "slug": str,
    "uuid": str,
    "is_accessible_by_support_until__date": str,
    "is_host": bool,
    "should_track_latest_release": bool,
    "is_public": bool,
    "is_of__class": Literal["fleet", "block", "app"],
    "is_archived": bool,
    "is_discoverable": bool,
    "is_stored_at__repository_url": str,
    "public_organization": Union[List[PublicOrganizationType], PineDeferred, None],
    "application_type": Union[List[ApplicationType], PineDeferred],
    "is_for__device_type": Union[List[DeviceTypeType], PineDeferred],
    "depends_on__application": Union[List[ApplicationType], PineDeferred, None],
    "organization": Union[List[OrganizationType], PineDeferred],
    "should_be_running__release": Union[List[ReleaseType], PineDeferred, None],
    "application_config_variable": Optional[List[EnvironmentVariableBase]],
    "application_environment_variable": Optional[List[EnvironmentVariableBase]],
    "build_environment_variable": Optional[List[EnvironmentVariableBase]],
    "application_tag": Optional[List[BaseTagType]],
    "owns__device": Optional[List[TypeDevice]],
    "owns__public_device": Optional[List[PublicDeviceType]],
    "owns__release": Optional[List[ReleaseType]],
    "service": Optional[List[ServiceType]],
    "is_depended_on_by__application": Optional[List[ApplicationType]],
    "is_directly_accessible_by__user": Optional[List[UserType]],
    "user_application_membership": Optional[List[ApplicationMembershipType]],
    "team_application_access": Optional[List[TeamApplicationAccessType]],
    "can_use__application_as_host": Optional[List[ApplicationHostedOnApplication]]
}
```


## TypeApplicationWithDeviceServiceDetails


```python
{
    "id": int,
    "created_at": str,
    "app_name": str,
    "actor": Union[List[ActorType], PineDeferred],
    "slug": str,
    "uuid": str,
    "is_accessible_by_support_until__date": str,
    "is_host": bool,
    "should_track_latest_release": bool,
    "is_public": bool,
    "is_of__class": Literal["fleet", "block", "app"],
    "is_archived": bool,
    "is_discoverable": bool,
    "is_stored_at__repository_url": str,
    "public_organization": Union[List[PublicOrganizationType], PineDeferred, None],
    "application_type": Union[List[ApplicationType], PineDeferred],
    "is_for__device_type": Union[List[DeviceTypeType], PineDeferred],
    "depends_on__application": Union[List[ApplicationType], PineDeferred, None],
    "organization": Union[List[OrganizationType], PineDeferred],
    "should_be_running__release": Union[List[ReleaseType], PineDeferred, None],
    "application_config_variable": Optional[List[EnvironmentVariableBase]],
    "application_environment_variable": Optional[List[EnvironmentVariableBase]],
    "build_environment_variable": Optional[List[EnvironmentVariableBase]],
    "application_tag": Optional[List[BaseTagType]],
    "owns__device": List[TypeDeviceWithServices],
    "owns__public_device": Optional[List[PublicDeviceType]],
    "owns__release": Optional[List[ReleaseType]],
    "service": Optional[List[ServiceType]],
    "is_depended_on_by__application": Optional[List[ApplicationType]],
    "is_directly_accessible_by__user": Optional[List[UserType]],
    "user_application_membership": Optional[List[ApplicationMembershipType]],
    "team_application_access": Optional[List[TeamApplicationAccessType]],
    "can_use__application_as_host": Optional[List[ApplicationHostedOnApplication]]
}
```


## TypeCurrentService


```python
{
    "id": int,
    "image_id": int,
    "service_id": int,
    "download_progress": int,
    "status": str,
    "install_date": str
}
```


## TypeDevice


```python
{
    "id": int,
    "actor": Union[List[ActorType], PineDeferred],
    "created_at": str,
    "modified_at": str,
    "custom_latitude": str,
    "custom_longitude": str,
    "device_name": str,
    "download_progress": int,
    "ip_address": str,
    "public_address": str,
    "mac_address": str,
    "is_accessible_by_support_until__date": str,
    "is_connected_to_vpn": bool,
    "is_locked_until__date": str,
    "is_web_accessible": bool,
    "is_active": bool,
    "is_frozen": bool,
    "is_online": bool,
    "last_connectivity_event": str,
    "last_vpn_event": str,
    "latitude": str,
    "local_id": str,
    "location": str,
    "longitude": str,
    "note": str,
    "os_variant": str,
    "os_version": str,
    "provisioning_progress": int,
    "provisioning_state": str,
    "status": str,
    "supervisor_version": str,
    "uuid": str,
    "api_heartbeat_state": Literal["online", "offline", "timeout", "unknown"],
    "memory_usage": int,
    "memory_total": int,
    "storage_block_device": str,
    "storage_usage": int,
    "storage_total": int,
    "cpu_usage": int,
    "cpu_temp": int,
    "cpu_id": str,
    "is_undervolted": bool,
    "overall_status": Literal["configuring", "inactive", "post-provisioning", "updating", "operational", "disconnected", "reduced-functionality"],
    "overall_progress": int,
    "is_of__device_type": Union[List[DeviceTypeType], PineDeferred],
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "belongs_to__user": Union[List[UserType], PineDeferred, None],
    "is_running__release": Union[List[ReleaseType], PineDeferred, None],
    "is_pinned_on__release": Union[List[ReleaseType], PineDeferred, None],
    "is_managed_by__service_instance": Union[List[ServiceInstanceType], PineDeferred, None],
    "should_be_operated_by__release": Union[List[ReleaseType], PineDeferred, None],
    "should_be_managed_by__release": Union[List[ReleaseType], PineDeferred, None],
    "device_config_variable": Optional[List[EnvironmentVariableBase]],
    "device_environment_variable": Optional[List[EnvironmentVariableBase]],
    "device_tag": Optional[List[BaseTagType]],
    "service_install": Optional[List[ServiceInstanceType]],
    "image_install": Optional[List[ImageInstallType]]
}
```


## TypeDeviceWithServices


```python
{
    "id": int,
    "actor": Union[List[ActorType], PineDeferred],
    "created_at": str,
    "modified_at": str,
    "custom_latitude": str,
    "custom_longitude": str,
    "device_name": str,
    "download_progress": int,
    "ip_address": str,
    "public_address": str,
    "mac_address": str,
    "is_accessible_by_support_until__date": str,
    "is_connected_to_vpn": bool,
    "is_locked_until__date": str,
    "is_web_accessible": bool,
    "is_active": bool,
    "is_frozen": bool,
    "is_online": bool,
    "last_connectivity_event": str,
    "last_vpn_event": str,
    "latitude": str,
    "local_id": str,
    "location": str,
    "longitude": str,
    "note": str,
    "os_variant": str,
    "os_version": str,
    "provisioning_progress": int,
    "provisioning_state": str,
    "status": str,
    "supervisor_version": str,
    "uuid": str,
    "api_heartbeat_state": Literal["online", "offline", "timeout", "unknown"],
    "memory_usage": int,
    "memory_total": int,
    "storage_block_device": str,
    "storage_usage": int,
    "storage_total": int,
    "cpu_usage": int,
    "cpu_temp": int,
    "cpu_id": str,
    "is_undervolted": bool,
    "overall_status": Literal["configuring", "inactive", "post-provisioning", "updating", "operational", "disconnected", "reduced-functionality"],
    "overall_progress": int,
    "is_of__device_type": Union[List[DeviceTypeType], PineDeferred],
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "belongs_to__user": Union[List[UserType], PineDeferred, None],
    "is_running__release": Union[List[ReleaseType], PineDeferred, None],
    "is_pinned_on__release": Union[List[ReleaseType], PineDeferred, None],
    "is_managed_by__service_instance": Union[List[ServiceInstanceType], PineDeferred, None],
    "should_be_operated_by__release": Union[List[ReleaseType], PineDeferred, None],
    "should_be_managed_by__release": Union[List[ReleaseType], PineDeferred, None],
    "device_config_variable": Optional[List[EnvironmentVariableBase]],
    "device_environment_variable": Optional[List[EnvironmentVariableBase]],
    "device_tag": Optional[List[BaseTagType]],
    "service_install": Optional[List[ServiceInstanceType]],
    "image_install": Optional[List[ImageInstallType]],
    "current_services": Dict[str, List[TypeCurrentService]]
}
```


## TypeVar


```python
{

}
```


## TypedDict


```python
{

}
```


## UserType


```python
{
    "id": int,
    "actor": Union[List[ActorType], PineDeferred],
    "created_at": str,
    "username": str,
    "organization_membership": Optional[List[OrganizationMembershipType]],
    "user_application_membership": Optional[List[ApplicationMembershipType]],
    "team_membership": Optional[List[TeamMembershipType]],
    "has_direct_access_to__application": Optional[List[TypeApplication]]
}
```


## WebResource


```python
{
    "filename": str,
    "href": str,
    "content_type": str,
    "content_disposition": str,
    "size": int
}
```


