# Latest

## v15.1.5


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

## Table of Contents
- [balena](#balena)
    - [.models](#models)
        - [.application](#application)
            - [create(name, device_type, organization, application_class)](#application.create) ⇒ [<code>TypeApplication</code>](#typeapplication)
            - [disable_device_urls(slug_or_uuid_or_id)](#application.disable_device_urls) ⇒ <code>None</code>
            - [enable_device_urls(slug_or_uuid_or_id)](#application.enable_device_urls) ⇒ <code>None</code>
            - [generate_provisioning_key(slug_or_uuid_or_id, key_name, description, expiry_date)](#application.generate_provisioning_key) ⇒ <code>str</code>
            - [get(slug_or_uuid_or_id, options, context)](#application.get) ⇒ [<code>TypeApplication</code>](#typeapplication)
            - [get_all(options, context)](#application.get_all) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)
            - [get_all_by_organization(org_handle_or_id, options)](#application.get_all_by_organization) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)
            - [get_all_directly_accessible(options)](#application.get_all_directly_accessible) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)
            - [get_by_name(app_name, options, context)](#application.get_by_name) ⇒ [<code>TypeApplication</code>](#typeapplication)
            - [get_dashboard_url(app_id)](#application.get_dashboard_url) ⇒ <code>str</code>
            - [get_directly_accessible(slug_or_uuid_or_id, options)](#application.get_directly_accessible) ⇒ [<code>TypeApplication</code>](#typeapplication)
            - [get_id(slug_or_uuid_or_id)](#application.get_id) ⇒ <code>int</code>
            - [get_target_release_hash(slug_or_uuid_or_id)](#application.get_target_release_hash) ⇒ <code>Optional[str]</code>
            - [get_with_device_service_details(slug_or_uuid_or_id, options)](#application.get_with_device_service_details) ⇒ [<code>TypeApplicationWithDeviceServiceDetails</code>](#typeapplicationwithdeviceservicedetails)
            - [grant_support_access(slug_or_uuid_or_id, expiry_timestamp)](#application.grant_support_access) ⇒ <code>None</code>
            - [has(slug_or_uuid_or_id)](#application.has) ⇒ <code>bool</code>
            - [has_any()](#application.has_any) ⇒ <code>bool</code>
            - [is_tracking_latest_release(slug_or_uuid_or_id)](#application.is_tracking_latest_release) ⇒ <code>bool</code>
            - [pin_to_release(slug_or_uuid_or_id, full_release_hash)](#application.pin_to_release) ⇒ <code>None</code>
            - [purge(app_id)](#application.purge) ⇒ <code>None</code>
            - [reboot(app_id, options)](#application.reboot) ⇒ <code>None</code>
            - [remove(slug_or_uuid_or_id)](#application.remove) ⇒ <code>None</code>
            - [rename(slug_or_uuid_or_id, new_name)](#application.rename) ⇒ <code>None</code>
            - [restart(slug_or_uuid_or_id)](#application.restart) ⇒ <code>None</code>
            - [revoke_support_access(slug_or_uuid_or_id)](#application.revoke_support_access) ⇒ <code>None</code>
            - [shutdown(app_id, options)](#application.shutdown) ⇒ <code>None</code>
            - [track_latest_release(slug_or_uuid_or_id)](#application.track_latest_release) ⇒ <code>None</code>
            - [will_track_new_releases(slug_or_uuid_or_id)](#application.will_track_new_releases) ⇒ <code>bool</code>
            - [.tags](#applicationtag)
                - [get_all_by_application(slug_or_uuid_or_id, options)](#applicationtag.get_all_by_application) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [remove(slug_or_uuid_or_id, tag_key)](#applicationtag.remove) ⇒ <code>None</code>
                - [set(slug_or_uuid_or_id, tag_key, value)](#applicationtag.set) ⇒ <code>None</code>
            - [.config_var](#applicationconfigvariable)
                - [get(slug_or_uuid_or_id, env_var_name)](#applicationconfigvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#applicationconfigvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(slug_or_uuid_or_id, key)](#applicationconfigvariable.remove) ⇒ <code>None</code>
                - [set(slug_or_uuid_or_id, env_var_name, value)](#applicationconfigvariable.set) ⇒ <code>None</code>
            - [.env_var](#applicationenvvariable)
                - [get(slug_or_uuid_or_id, env_var_name)](#applicationenvvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#applicationenvvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(slug_or_uuid_or_id, key)](#applicationenvvariable.remove) ⇒ <code>None</code>
                - [set(slug_or_uuid_or_id, env_var_name, value)](#applicationenvvariable.set) ⇒ <code>None</code>
            - [.build_var](#buildenvvariable)
                - [get(slug_or_uuid_or_id, env_var_name)](#buildenvvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#buildenvvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(slug_or_uuid_or_id, key)](#buildenvvariable.remove) ⇒ <code>None</code>
                - [set(slug_or_uuid_or_id, env_var_name, value)](#buildenvvariable.set) ⇒ <code>None</code>
            - [.membership](#applicationmembership)
                - [change_role(membership_id, role_name)](#applicationmembership.change_role) ⇒ <code>None</code>
                - [create(slug_or_uuid_or_id, username, role_name)](#applicationmembership.create) ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)
                - [get(membership_id, options)](#applicationmembership.get) ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)
                - [get_all(options)](#applicationmembership.get_all) ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)
                - [get_all_by_application(slug_or_uuid_or_id, options)](#applicationmembership.get_all_by_application) ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)
                - [remove(membership_id)](#applicationmembership.remove) ⇒ <code>None</code>
            - [.invite](#applicationinvite)
                - [accept(invite_token)](#applicationinvite.accept) ⇒ <code>None</code>
                - [create(slug_or_uuid_or_id, options)](#applicationinvite.create) ⇒ [<code>ApplicationInviteType</code>](#applicationinvitetype)
                - [get_all(options)](#applicationinvite.get_all) ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)
                - [get_all_by_application(slug_or_uuid_or_id, options)](#applicationinvite.get_all_by_application) ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)
                - [revoke(invite_id)](#applicationinvite.revoke) ⇒ <code>None</code>
        - [.device](#device)
            - [deactivate(uuid_or_id_or_ids)](#device.deactivate) ⇒ <code>None</code>
            - [disable_device_url(uuid_or_id_or_ids)](#device.disable_device_url) ⇒ <code>None</code>
            - [disable_local_mode(uuid_or_id)](#device.disable_local_mode) ⇒ <code>None</code>
            - [disable_lock_override(uuid_or_id)](#device.disable_lock_override) ⇒ <code>None</code>
            - [enable_device_url(uuid_or_id_or_ids)](#device.enable_device_url) ⇒ <code>None</code>
            - [enable_local_mode(uuid_or_id)](#device.enable_local_mode) ⇒ <code>None</code>
            - [enable_lock_override(uuid_or_id)](#device.enable_lock_override) ⇒ <code>None</code>
            - [generate_device_key(uuid_or_id, name, description, expiry_date)](#device.generate_device_key) ⇒ <code>str</code>
            - [generate_uuid()](#device.generate_uuid) ⇒ <code>str</code>
            - [get(uuid_or_id, options)](#device.get) ⇒ [<code>TypeDevice</code>](#typedevice)
            - [get_all(options)](#device.get_all) ⇒ [<code>List[TypeDevice]</code>](#typedevice)
            - [get_all_by_application(slug_or_uuid_or_id, options)](#device.get_all_by_application) ⇒ [<code>List[TypeDevice]</code>](#typedevice)
            - [get_all_by_organization(handle_or_id, options)](#device.get_all_by_organization) ⇒ [<code>List[TypeDevice]</code>](#typedevice)
            - [get_application_info(uuid_or_id)](#device.get_application_info) ⇒ <code>Any</code>
            - [get_application_name(uuid_or_id)](#device.get_application_name) ⇒ <code>str</code>
            - [get_by_name(name, options)](#device.get_by_name) ⇒ [<code>List[TypeDevice]</code>](#typedevice)
            - [get_dashboard_url(uuid)](#device.get_dashboard_url) ⇒ <code>None</code>
            - [get_device_url(uuid_or_id)](#device.get_device_url) ⇒ <code>str</code>
            - [get_local_ip_address(uuid_or_id)](#device.get_local_ip_address) ⇒ <code>List[str]</code>
            - [get_local_mode_support(uuid_or_id)](#device.get_local_mode_support) ⇒ <code>LocalModeResponse</code>
            - [get_mac_address(uuid_or_id)](#device.get_mac_address) ⇒ <code>List[str]</code>
            - [get_metrics(uuid_or_id)](#device.get_metrics) ⇒ [<code>DeviceMetricsType</code>](#devicemetricstype)
            - [get_name(uuid_or_id)](#device.get_name) ⇒ <code>str</code>
            - [get_os_update_status(uuid_or_id)](#device.get_os_update_status) ⇒ <code>HUPStatusResponse</code>
            - [get_status(uuid_or_id)](#device.get_status) ⇒ <code>str</code>
            - [get_supervisor_state(uuid_or_id)](#device.get_supervisor_state) ⇒ <code>SupervisorStateType</code>
            - [get_supervisor_target_state(uuid_or_id)](#device.get_supervisor_target_state) ⇒ <code>Any</code>
            - [get_supervisor_target_state_for_app(slug_or_uuid_or_id, release)](#device.get_supervisor_target_state_for_app) ⇒ <code>Any</code>
            - [get_with_service_details(uuid_or_id, options)](#device.get_with_service_details) ⇒ [<code>TypeDeviceWithServices</code>](#typedevicewithservices)
            - [grant_support_access(uuid_or_id_or_ids, expiry_timestamp)](#device.grant_support_access) ⇒ <code>None</code>
            - [has(uuid_or_id)](#device.has) ⇒ <code>bool</code>
            - [has_device_url(uuid_or_id)](#device.has_device_url) ⇒ <code>bool</code>
            - [has_lock_override(uuid_or_id)](#device.has_lock_override) ⇒ <code>bool</code>
            - [identify(uuid_or_id)](#device.identify) ⇒ <code>None</code>
            - [is_in_local_mode(uuid_or_id)](#device.is_in_local_mode) ⇒ <code>bool</code>
            - [is_online(uuid_or_id)](#device.is_online) ⇒ <code>bool</code>
            - [is_tracking_application_release(uuid_or_id)](#device.is_tracking_application_release) ⇒ <code>bool</code>
            - [move(uuid_or_id, app_slug_or_uuid_or_id)](#device.move) ⇒ <code>None</code>
            - [pin_to_release(uuid_or_id, full_release_hash_or_id)](#device.pin_to_release) ⇒ <code>None</code>
            - [ping(uuid_or_id)](#device.ping) ⇒ <code>None</code>
            - [purge(uuid_or_id)](#device.purge) ⇒ <code>None</code>
            - [reboot(uuid_or_id, force)](#device.reboot) ⇒ <code>None</code>
            - [register(application_slug_or_uuid_or_id, uuid, device_type_slug)](#device.register) ⇒ <code>RegisterResponse</code>
            - [remove(uuid_or_id_or_ids)](#device.remove) ⇒ <code>None</code>
            - [rename(uuid_or_id, new_name)](#device.rename) ⇒ <code>None</code>
            - [restart_application(uuid_or_id)](#device.restart_application) ⇒ <code>None</code>
            - [restart_service(uuid_or_id, image_id)](#device.restart_service) ⇒ <code>None</code>
            - [revoke_support_access(uuid_or_id_or_ids)](#device.revoke_support_access) ⇒ <code>None</code>
            - [set_custom_location(uuid_or_id_or_ids, location)](#device.set_custom_location) ⇒ <code>None</code>
            - [set_note(uuid_or_id_or_ids, note)](#device.set_note) ⇒ <code>None</code>
            - [set_supervisor_release(uuid_or_id, supervisor_version_or_id)](#device.set_supervisor_release) ⇒ <code>None</code>
            - [shutdown(uuid_or_id, force)](#device.shutdown) ⇒ <code>None</code>
            - [start_application(uuid_or_id)](#device.start_application) ⇒ <code>None</code>
            - [start_os_update(uuid_or_id, target_os_version)](#device.start_os_update) ⇒ <code>HUPStatusResponse</code>
            - [start_service(uuid_or_id, image_id)](#device.start_service) ⇒ <code>None</code>
            - [stop_application(uuid_or_id)](#device.stop_application) ⇒ <code>None</code>
            - [stop_service(uuid_or_id, image_id)](#device.stop_service) ⇒ <code>None</code>
            - [track_application_release(uuid_or_id_or_ids)](#device.track_application_release) ⇒ <code>None</code>
            - [unset_custom_location(uuid_or_id_or_ids)](#device.unset_custom_location) ⇒ <code>None</code>
            - [update(uuid_or_id, force)](#device.update) ⇒ <code>None</code>
            - [.tags](#devicetag)
                - [get(uuid_or_id, tag_key)](#devicetag.get) ⇒ <code>Optional[str]</code>
                - [get_all(options)](#devicetag.get_all) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [get_all_by_application(slug_or_uuid_or_id, options)](#devicetag.get_all_by_application) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [get_all_by_device(uuid_or_id, options)](#devicetag.get_all_by_device) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [remove(uuid_or_id, tag_key)](#devicetag.remove) ⇒ <code>None</code>
                - [set(uuid_or_id, tag_key, value)](#devicetag.set) ⇒ <code>None</code>
            - [.config_var](#deviceconfigvariable)
                - [get(uuid_or_id, env_var_name)](#deviceconfigvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#deviceconfigvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [get_all_by_device(uuid_or_id, options)](#deviceconfigvariable.get_all_by_device) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(uuid_or_id, key)](#deviceconfigvariable.remove) ⇒ <code>None</code>
                - [set(uuid_or_id, env_var_name, value)](#deviceconfigvariable.set) ⇒ <code>None</code>
            - [.env_var](#deviceenvvariable)
                - [get(uuid_or_id, env_var_name)](#deviceenvvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#deviceenvvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [get_all_by_device(uuid_or_id, options)](#deviceenvvariable.get_all_by_device) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(uuid_or_id, key)](#deviceenvvariable.remove) ⇒ <code>None</code>
                - [set(uuid_or_id, env_var_name, value)](#deviceenvvariable.set) ⇒ <code>None</code>
            - [.service_var](#deviceserviceenvvariable)
                - [get(uuid_or_id, service_name_or_id, key)](#deviceserviceenvvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#deviceserviceenvvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [get_all_by_device(uuid_or_id, options)](#deviceserviceenvvariable.get_all_by_device) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(uuid_or_id, service_name_or_id, key)](#deviceserviceenvvariable.remove) ⇒ <code>None</code>
                - [set(uuid_or_id, service_name_or_id, key, value)](#deviceserviceenvvariable.set) ⇒ <code>None</code>
            - [.history](#devicehistory)
                - [get_all_by_application(slug_or_uuid_or_id, from_date, to_date, options)](#devicehistory.get_all_by_application) ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)
                - [get_all_by_device(uuid_or_id, from_date, to_date, options)](#devicehistory.get_all_by_device) ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)
        - [.device_type](#devicetype)
            - [get(id_or_slug, options)](#devicetype.get) ⇒ [<code>DeviceTypeType</code>](#devicetypetype)
            - [get_all(options)](#devicetype.get_all) ⇒ [<code>List[DeviceTypeType]</code>](#devicetypetype)
            - [get_all_supported(options)](#devicetype.get_all_supported) ⇒ <code>None</code>
            - [get_by_slug_or_name(slug_or_name, options)](#devicetype.get_by_slug_or_name) ⇒ [<code>DeviceTypeType</code>](#devicetypetype)
            - [get_name(slug)](#devicetype.get_name) ⇒ <code>str</code>
            - [get_slug_by_name(name)](#devicetype.get_slug_by_name) ⇒ <code>str</code>
        - [.api_key](#apikey)
            - [create(name, description, expiry_date)](#apikey.create) ⇒ <code>str</code>
            - [get_all(options)](#apikey.get_all) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)
            - [get_all_named_user_api_keys(options)](#apikey.get_all_named_user_api_keys) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)
            - [get_device_api_keys_by_device(uuid_or_id, options)](#apikey.get_device_api_keys_by_device) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)
            - [get_provisioning_api_keys_by_application(slug_or_uuid_or_id, options)](#apikey.get_provisioning_api_keys_by_application) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)
            - [revoke(id)](#apikey.revoke) ⇒ <code>None</code>
            - [update(id, api_key_info)](#apikey.update) ⇒ <code>None</code>
        - [.key](#key)
            - [create(title, key)](#key.create) ⇒ [<code>SSHKeyType</code>](#sshkeytype)
            - [get(id)](#key.get) ⇒ [<code>SSHKeyType</code>](#sshkeytype)
            - [get_all(options)](#key.get_all) ⇒ [<code>List[SSHKeyType]</code>](#sshkeytype)
            - [remove(id)](#key.remove) ⇒ <code>None</code>
        - [.organization](#organization)
            - [create(name, handle, logo_image)](#organization.create) ⇒ [<code>OrganizationType</code>](#organizationtype)
            - [get(handle_or_id, options)](#organization.get) ⇒ [<code>OrganizationType</code>](#organizationtype)
            - [get_all(options)](#organization.get_all) ⇒ [<code>List[OrganizationType]</code>](#organizationtype)
            - [remove(handle_or_id)](#organization.remove) ⇒ <code>None</code>
            - [.membership](#organizationmembership)
                - [get(membership_id, options)](#organizationmembership.get) ⇒ [<code>OrganizationMembershipType</code>](#organizationmembershiptype)
                - [get_all(options)](#organizationmembership.get_all) ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)
                - [get_all_by_organization(handle_or_id, options)](#organizationmembership.get_all_by_organization) ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)
                - [.tags](#organizationmembershiptag)
                    - [get(membership_id, tag_key)](#organizationmembershiptag.get) ⇒ <code>Optional[str]</code>
                    - [get_all(options)](#organizationmembershiptag.get_all) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)
                    - [get_all_by_organization(handle_or_id, options)](#organizationmembershiptag.get_all_by_organization) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)
                    - [get_all_by_organization_membership(membership_id, options)](#organizationmembershiptag.get_all_by_organization_membership) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)
                    - [remove(membership_id, tag_key)](#organizationmembershiptag.remove) ⇒ <code>None</code>
                    - [set(membership_id, tag_key, value)](#organizationmembershiptag.set) ⇒ <code>None</code>
            - [.invite](#organizationinvite)
                - [accept(invite_token)](#organizationinvite.accept) ⇒ <code>None</code>
                - [create(handle_or_id, invitee, role_name, message)](#organizationinvite.create) ⇒ [<code>OrganizationInviteType</code>](#organizationinvitetype)
                - [get_all(options)](#organizationinvite.get_all) ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)
                - [get_all_by_organization(handle_or_id, options)](#organizationinvite.get_all_by_organization) ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)
                - [revoke(invite_id)](#organizationinvite.revoke) ⇒ <code>None</code>
        - [.os](#deviceos)
            - [download(device_type, version, options)](#deviceos.download) ⇒ <code>None</code>
            - [get_all_os_versions(device_type, options)](#deviceos.get_all_os_versions) ⇒ <code>None</code>
            - [get_available_os_versions(device_type)](#deviceos.get_available_os_versions) ⇒ <code>None</code>
            - [get_config(slug_or_uuid_or_id, options)](#deviceos.get_config) ⇒ <code>None</code>
            - [get_download_size(device_type, version)](#deviceos.get_download_size) ⇒ <code>float</code>
            - [get_max_satisfying_version(device_type, version_or_range, os_type)](#deviceos.get_max_satisfying_version) ⇒ <code>Optional[str]</code>
            - [get_supervisor_releases_for_cpu_architecture(cpu_architecture_slug_or_id, options)](#deviceos.get_supervisor_releases_for_cpu_architecture) ⇒ [<code>List[ReleaseType]</code>](#releasetype)
            - [get_supported_os_update_versions(device_type, current_version)](#deviceos.get_supported_os_update_versions) ⇒ <code>None</code>
            - [is_architecture_compatible_with(os_architecture, application_architecture)](#deviceos.is_architecture_compatible_with) ⇒ <code>None</code>
            - [is_supported_os_update(device_type, current_version, target_version)](#deviceos.is_supported_os_update) ⇒ <code>bool</code>
        - [.config](#config)
            - [get_all()](#config.get_all) ⇒ <code>ConfigType</code>
        - [.release](#release)
            - [create_from_url(slug_or_uuid_or_id, url, flatten_tarball)](#release.create_from_url) ⇒ <code>int</code>
            - [finalize(commit_or_id_or_raw_version)](#release.finalize) ⇒ <code>None</code>
            - [get(commit_or_id_or_raw_version, options)](#release.get) ⇒ [<code>ReleaseType</code>](#releasetype)
            - [get_all_by_application(slug_or_uuid_or_id, options)](#release.get_all_by_application) ⇒ [<code>List[ReleaseType]</code>](#releasetype)
            - [get_latest_by_application(slug_or_uuid_or_id, options)](#release.get_latest_by_application) ⇒ [<code>Optional[ReleaseType]</code>](#releasetype)
            - [get_with_image_details(commit_or_id_or_raw_version, image_options, release_options)](#release.get_with_image_details) ⇒ [<code>ReleaseWithImageDetailsType</code>](#releasewithimagedetailstype)
            - [set_is_invalidated(commit_or_id_or_raw_version, is_invalidated)](#release.set_is_invalidated) ⇒ <code>None</code>
            - [set_known_issue_list(commit_or_id_or_raw_version, known_issue_list)](#release.set_known_issue_list) ⇒ <code>None</code>
            - [set_note(commit_or_id_or_raw_version, note)](#release.set_note) ⇒ <code>None</code>
            - [set_release_version(commit_or_id, semver)](#release.set_release_version) ⇒ <code>None</code>
            - [.tags](#releasetag)
                - [get(commit_or_id_or_raw_version, tag_key)](#releasetag.get) ⇒ <code>Optional[str]</code>
                - [get_all(options)](#releasetag.get_all) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [get_all_by_application(slug_or_uuid_or_id, options)](#releasetag.get_all_by_application) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [get_all_by_release(commit_or_id_or_raw_version, options)](#releasetag.get_all_by_release) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)
                - [remove(commit_or_id_or_raw_version, tag_key)](#releasetag.remove) ⇒ <code>None</code>
                - [set(commit_or_id_or_raw_version, tag_key, value)](#releasetag.set) ⇒ <code>None</code>
        - [.service](#service)
            - [get_all_by_application(slug_or_uuid_or_id, options)](#service.get_all_by_application) ⇒ [<code>List[ServiceType]</code>](#servicetype)
            - [.var](#serviceenvvariable)
                - [get(service_id_or_natural_key, key)](#serviceenvvariable.get) ⇒ <code>Optional[str]</code>
                - [get_all_by_application(slug_or_uuid_or_id, options)](#serviceenvvariable.get_all_by_application) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [get_all_by_service(service_id_or_natural_key, options)](#serviceenvvariable.get_all_by_service) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)
                - [remove(service_id_or_natural_key, key)](#serviceenvvariable.remove) ⇒ <code>None</code>
                - [set(service_id_or_natural_key, key, value)](#serviceenvvariable.set) ⇒ <code>None</code>
        - [.image](#image)
            - [get(id, options)](#image.get) ⇒ [<code>ImageType</code>](#imagetype)
            - [get_logs(id)](#image.get_logs) ⇒ <code>str</code>
    - [.auth](#auth)
        - [authenticate()](#auth.authenticate) ⇒ <code>str</code>
        - [get_actor_id()](#auth.get_actor_id) ⇒ <code>int</code>
        - [get_token()](#auth.get_token) ⇒ <code>Optional[str]</code>
        - [get_user_info()](#auth.get_user_info) ⇒ <code>UserInfo</code>
        - [is_logged_in()](#auth.is_logged_in) ⇒ <code>bool</code>
        - [login()](#auth.login) ⇒ <code>None</code>
        - [login_with_token(token)](#auth.login_with_token) ⇒ <code>None</code>
        - [logout()](#auth.logout) ⇒ <code>None</code>
        - [register()](#auth.register) ⇒ <code>str</code>
        - [whoami()](#auth.whoami) ⇒ <code>Union[UserKeyWhoAmIResponse, ApplicationKeyWhoAmIResponse, DeviceKeyWhoAmIResponse, None]</code>
        - [.two_factor](#twofactorauth)
            - [challenge(code)](#twofactorauth.challenge) ⇒ <code>None</code>
            - [disable(password)](#twofactorauth.disable) ⇒ <code>str</code>
            - [enable(code)](#twofactorauth.enable) ⇒ <code>str</code>
            - [get_setup_key()](#twofactorauth.get_setup_key) ⇒ <code>str</code>
            - [is_enabled()](#twofactorauth.is_enabled) ⇒ <code>bool</code>
            - [is_passed()](#twofactorauth.is_passed) ⇒ <code>bool</code>
            - [verify(code)](#twofactorauth.verify) ⇒ <code>str</code>
    - [.logs](#logs)
        - [history(uuid_or_id, count)](#logs.history) ⇒ <code>List[Log]</code>
        - [stop()](#logs.stop) ⇒ <code>None</code>
        - [subscribe(uuid_or_id, callback, error, count)](#logs.subscribe) ⇒ <code>None</code>
        - [unsubscribe(uuid_or_id)](#logs.unsubscribe) ⇒ <code>None</code>
        - [unsubscribe_all()](#logs.unsubscribe_all) ⇒ <code>None</code>
    - [.settings](#module)
    - [.types](#types)

## Models

This module implements all models for balena python SDK.
## Application

This class implements application model for balena python SDK.

<a name="application.create"></a>
### Function: create(name, device_type, organization, application_class) ⇒ [<code>TypeApplication</code>](#typeapplication)

Create an application.

#### Args:
    name (str): application name.
    device_type (str): device type (slug).
    organization (Union[str, int]): handle or id of the organization that the application will belong to.
    application_class (Optional[Literal["app", "fleet", "block"]]): application class.

#### Returns:
    TypeApplication: application info.

#### Examples:
```python
>>> balena.models.application.create('foo', 'raspberry-pi', 12345)
>>> balena.models.application.create('foo', 'raspberry-pi', 12345, 'block')
```

<a name="application.disable_device_urls"></a>
### Function: disable_device_urls(slug_or_uuid_or_id) ⇒ <code>None</code>

Disable device urls for all devices that belong to an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.application.disable_device_urls(5685)
```

<a name="application.enable_device_urls"></a>
### Function: enable_device_urls(slug_or_uuid_or_id) ⇒ <code>None</code>

Enable device urls for all devices that belong to an application

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.application.enable_device_urls(5685)
```

<a name="application.generate_provisioning_key"></a>
### Function: generate_provisioning_key(slug_or_uuid_or_id, key_name, description, expiry_date) ⇒ <code>str</code>

Generate a device provisioning key for a specific application.

#### Args:
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    key_name (Optional[str]): provisioning key name.
    description (Optional[str]): description for provisioning key.
    expiry_date (Optional[str]): expiry date for provisioning key, for example: `2030-01-01T00:00:00Z`.

#### Returns:
    str: device provisioning key.

#### Examples:
```python
>>> balena.models.application.generate_provisioning_key(5685)
```

<a name="application.get"></a>
### Function: get(slug_or_uuid_or_id, options, context) ⇒ [<code>TypeApplication</code>](#typeapplication)

Get a single application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

#### Returns:
    TypeApplication: application info.

#### Examples:
```python
>>> balena.models.application.get("myorganization/myapp")
>>> balena.models.application.get(123)
```

<a name="application.get_all"></a>
### Function: get_all(options, context) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

Get all applications

#### Args:
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

#### Returns:
    List[TypeApplication]: application info.

#### Examples:
```python
>>> balena.models.application.get_all()
```

<a name="application.get_all_by_organization"></a>
### Function: get_all_by_organization(org_handle_or_id, options) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

Get all applications of an organization.

#### Args:
    org_handle_or_id (Union[str, int]): handle or id of the organization.
    options (AnyObject): extra pine options to use.

#### Returns:
    List[TypeApplication]: application info.

#### Examples:
```python
>>> balena.models.application.get_all_by_organization('myorg')
```

<a name="application.get_all_directly_accessible"></a>
### Function: get_all_directly_accessible(options) ⇒ [<code>List[TypeApplication]</code>](#typeapplication)

Get all applications directly accessible by the user

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[APIKeyType]: user API key

#### Examples:
```python
>>> balena.models.application.get_all_directly_accessible()
```

<a name="application.get_by_name"></a>
### Function: get_by_name(app_name, options, context) ⇒ [<code>TypeApplication</code>](#typeapplication)

 Get a single application using the appname.

#### Args:
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use
    context (Optional[str]): extra access filters, None or 'directly_accessible'

#### Returns:
    TypeApplication: application info.

#### Examples:
```python
>>> balena.models.application.get("myapp")
```

<a name="application.get_dashboard_url"></a>
### Function: get_dashboard_url(app_id) ⇒ <code>str</code>

Get Dashboard URL for a specific application.

#### Args:
    app_id (int): application id.

#### Returns:
    str: Dashboard URL for the specific application.

#### Examples:
```python
>>> balena.models.application.get_dashboard_url(1476418)
```

<a name="application.get_directly_accessible"></a>
### Function: get_directly_accessible(slug_or_uuid_or_id, options) ⇒ [<code>TypeApplication</code>](#typeapplication)

Get a single application directly accessible by the user

#### Args:
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    TypeApplication: application info.

#### Examples:
```python
>>> balena.models.application.get_directly_accessible("myorganization/myapp")
>>> balena.models.application.get_directly_accessible(123)
```

<a name="application.get_id"></a>
### Function: get_id(slug_or_uuid_or_id) ⇒ <code>int</code>

Given an application slug or uuid or id, returns it numeric id.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

#### Returns:
    int: The id.

#### Examples:
```python
>>> balena.models.application.get_dashboard_url(1476418)
```

<a name="application.get_target_release_hash"></a>
### Function: get_target_release_hash(slug_or_uuid_or_id) ⇒ <code>Optional[str]</code>

Get the hash of the current release for a specific application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

#### Returns:
    Optional[str]: The release hash of the current release or None.

#### Examples:
```python
>>> balena.models.application.get_target_release_hash(5685)
```

<a name="application.get_with_device_service_details"></a>
### Function: get_with_device_service_details(slug_or_uuid_or_id, options) ⇒ [<code>TypeApplicationWithDeviceServiceDetails</code>](#typeapplicationwithdeviceservicedetails)

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `application.get(uuidOrId, options)` instead.

#### Args:
    slug_or_uuid_or_id (str): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    TypeApplication: application info.

#### Examples:
```python
>>> balena.models.application.get_with_device_service_details('my_org_handle/my_app_name')
```

<a name="application.grant_support_access"></a>
### Function: grant_support_access(slug_or_uuid_or_id, expiry_timestamp) ⇒ <code>None</code>

Grant support access to an application until a specified time.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Examples:
```python
>>> balena.models.application.grant_support_access(5685, 1511974999000)
```

<a name="application.has"></a>
### Function: has(slug_or_uuid_or_id) ⇒ <code>bool</code>

Check if an application exists.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

#### Returns:
    bool: True if application exists, False otherwise.

#### Examples:
```python
>>> balena.models.application.has('my_org/foo')
```

<a name="application.has_any"></a>
### Function: has_any() ⇒ <code>bool</code>

Check if the user has any applications.

#### Returns:
    bool: True if user has any applications, False otherwise.

#### Examples:
```python
>>> balena.models.application.has_any()
```

<a name="application.is_tracking_latest_release"></a>
### Function: is_tracking_latest_release(slug_or_uuid_or_id) ⇒ <code>bool</code>

Get whether the application is up to date and is tracking the latest finalized release for updates

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Returns:
    bool: is tracking the latest release.

#### Examples:
```python
>>> balena.models.application.is_tracking_latest_release(5685)
```

<a name="application.pin_to_release"></a>
### Function: pin_to_release(slug_or_uuid_or_id, full_release_hash) ⇒ <code>None</code>

Configures the application to run a particular release
and not get updated when the latest release changes.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    full_release_hash (str) : the hash of a successful release (string)

#### Examples:
```python
>>> balena.models.application.set_to_release(5685, '7dba4e0c461215374edad74a5b78f470b894b5b7')
```

<a name="application.purge"></a>
### Function: purge(app_id) ⇒ <code>None</code>

Purge devices by application id

#### Args:
    app_id (int): application id (number)

#### Examples:
```python
>>> balena.models.application.purge(5685)
```

<a name="application.reboot"></a>
### Function: reboot(app_id, options) ⇒ <code>None</code>

Reboots devices by application id

#### Args:
    app_id (int): application id (number)
    options (ShutdownOptions): override update lock

#### Examples:
```python
>>> balena.models.application.reboot(5685)
>>> balena.models.application.reboot(5685, {"force": True})
```

<a name="application.remove"></a>
### Function: remove(slug_or_uuid_or_id) ⇒ <code>None</code>

Remove application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.application.remove('my_org/my_app')
>>> balena.models.application.remove('c184556293854781aea71b0bdae10e45')
>>> balena.models.application.remove(123)
```

<a name="application.rename"></a>
### Function: rename(slug_or_uuid_or_id, new_name) ⇒ <code>None</code>

Rename application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    new_name (str): new application name.

#### Examples:
```python
>>> balena.models.application.rename(1681618, 'py-test-app')
```

<a name="application.restart"></a>
### Function: restart(slug_or_uuid_or_id) ⇒ <code>None</code>

Restart application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.application.restart('myorg/RPI1')
```

<a name="application.revoke_support_access"></a>
### Function: revoke_support_access(slug_or_uuid_or_id) ⇒ <code>None</code>

Revoke support access to an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.application.revoke_support_access(5685)
```

<a name="application.shutdown"></a>
### Function: shutdown(app_id, options) ⇒ <code>None</code>

Shutdown devices by application id

#### Args:
    app_id (int): application id (number)
    options (ShutdownOptions): override update lock

#### Examples:
```python
>>> balena.models.application.shutdown(5685)
>>> balena.models.application.shutdown(5685, {"force": True})
```

<a name="application.track_latest_release"></a>
### Function: track_latest_release(slug_or_uuid_or_id) ⇒ <code>None</code>

Configure a specific application to track the latest available release.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)

#### Examples:
```python
>>> balena.models.application.track_latest_release(5685)
```

<a name="application.will_track_new_releases"></a>
### Function: will_track_new_releases(slug_or_uuid_or_id) ⇒ <code>bool</code>

 Get whether the application is configured to receive updates whenever a new release is available.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Returns:
    bool: is tracking the latest release.

#### Examples:
```python
>>> balena.models.application.will_track_new_releases(5685)
```
## ApplicationTag

This class implements application tag model for balena python SDK.

<a name="applicationtag.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all application tags for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.application.tags.get_all_by_application(1005160)
```

<a name="applicationtag.remove"></a>
### Function: remove(slug_or_uuid_or_id, tag_key) ⇒ <code>None</code>

Remove an application tag.

#### Args:
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.application.tags.remove(1005767, 'tag1')
```

<a name="applicationtag.set"></a>
### Function: set(slug_or_uuid_or_id, tag_key, value) ⇒ <code>None</code>

Set an application tag (update tag value if it exists).

#### Args:
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    tag_key (str): tag key.
    value (str): tag value.

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.application.tags.set(1005767, 'tag1', 'Python SDK')
```
## ApplicationConfigVariable

This class implements application config variable model for balena python SDK.

<a name="applicationconfigvariable.get"></a>
### Function: get(slug_or_uuid_or_id, env_var_name) ⇒ <code>Optional[str]</code>

Get application config variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.config_var.get('8deb12','test_env4')
```

<a name="applicationconfigvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all application config variables by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: application config variables.

#### Examples:
```python
>>> balena.models.application.config_var.get_all_by_application(9020)
```

<a name="applicationconfigvariable.remove"></a>
### Function: remove(slug_or_uuid_or_id, key) ⇒ <code>None</code>

Remove an application config variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.config_var.remove(2184, 'test_env')
```

<a name="applicationconfigvariable.set"></a>
### Function: set(slug_or_uuid_or_id, env_var_name, value) ⇒ <code>None</code>

Set the value of a specific application config variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.application.config_var.set('8deb12','test_env', 'testing1')
```
## ApplicationEnvVariable

This class implements application environment variable model for balena python SDK.

<a name="applicationenvvariable.get"></a>
### Function: get(slug_or_uuid_or_id, env_var_name) ⇒ <code>Optional[str]</code>

Get application environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.env_var.get('8deb12','test_env4')
```

<a name="applicationenvvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all application environment variables by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: application environment variables.

#### Examples:
```python
>>> balena.models.application.env_var.get_all_by_application(9020)
>>> balena.models.application.env_var.get_all_by_application("myorg/myslug")
```

<a name="applicationenvvariable.remove"></a>
### Function: remove(slug_or_uuid_or_id, key) ⇒ <code>None</code>

Remove an application environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.env_var.remove(2184,'test_env4')
```

<a name="applicationenvvariable.set"></a>
### Function: set(slug_or_uuid_or_id, env_var_name, value) ⇒ <code>None</code>

Set the value of a specific application environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.application.env_var.set('8deb12','test_env4', 'testing1')
```
## BuildEnvVariable

This class implements build environment variable model for balena python SDK.

<a name="buildenvvariable.get"></a>
### Function: get(slug_or_uuid_or_id, env_var_name) ⇒ <code>Optional[str]</code>

Get build environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.build_var.get('8deb12','test_env4')
```

<a name="buildenvvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all build environment variables by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: build environment variables.

#### Examples:
```python
>>> balena.models.application.build_var.get_all_by_application(9020)
>>> balena.models.application.build_var.get_all_by_application("myorg/myslug")
```

<a name="buildenvvariable.remove"></a>
### Function: remove(slug_or_uuid_or_id, key) ⇒ <code>None</code>

Remove an build environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    key (str): environment variable name.

#### Examples:
```python
>>> balena.models.application.build_var.remove(2184, 'test_env4')
```

<a name="buildenvvariable.set"></a>
### Function: set(slug_or_uuid_or_id, env_var_name, value) ⇒ <code>None</code>

Set the value of a specific build environment variable.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.application.build_var.set('8deb12','test_env4', 'testing1')
```
## ApplicationMembership

This class implements application membership model for balena python SDK.

<a name="applicationmembership.change_role"></a>
### Function: change_role(membership_id, role_name) ⇒ <code>None</code>

Changes the role of an application member.

#### Args:
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`
    numeric pair of the membership
    role_name (str): the role name to be granted to the membership.

#### Examples:
```python
>>> balena.models.application.membership.change_role(55074, 'observer')
```

<a name="applicationmembership.create"></a>
### Function: create(slug_or_uuid_or_id, username, role_name) ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)

Creates a new membership for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    username (str): the username of the balena user that will become a member.
    role_name (Optional[str]): the role name to be granted to the membership.

#### Returns:
    ApplicationMembershipType: application membership.

#### Examples:
```python
>>> balena.models.application.membership.create(1681618, 'testuser')
```

<a name="applicationmembership.get"></a>
### Function: get(membership_id, options) ⇒ [<code>ApplicationMembershipType</code>](#applicationmembershiptype)

Get a single application membership.

#### Args:
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`
    numeric pair of the membership
    options (AnyObject): extra pine options to use

#### Returns:
    ApplicationMembershipType: application membership.

#### Examples:
```python
>>> balena.models.application.membership.get(55074)
>>> balena.models.application.membership.get({"user": 123, "is_member_of__application": 125})
```

<a name="applicationmembership.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)

Get all application memberships.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[ApplicationMembershipType]: list contains info of application memberships.

#### Examples:
```python
>>> balena.models.application.membership.get_all()
```

<a name="applicationmembership.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[ApplicationMembershipType]</code>](#applicationmembershiptype)

Get all memberships by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    list: list contains info of application memberships.

#### Examples:
```python
>>> balena.models.application.membership.get_all_by_application(1681618)
```

<a name="applicationmembership.remove"></a>
### Function: remove(membership_id) ⇒ <code>None</code>

Remove a membership.

#### Args:
    membership_id (ResourceKey): the id or an object with the unique `user` & `is_member_of__application`
## ApplicationInvite

This class implements application invite model for balena python SDK.

<a name="applicationinvite.accept"></a>
### Function: accept(invite_token) ⇒ <code>None</code>

Accepts an invite.

#### Args:
    invite_token (str): invitationToken - invite token.

#### Examples:
```python
>>> balena.models.application.invite.accept("qwerty-invitation-token")
```

<a name="applicationinvite.create"></a>
### Function: create(slug_or_uuid_or_id, options) ⇒ [<code>ApplicationInviteType</code>](#applicationinvitetype)

Creates a new invite for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (ApplicationInviteOptions): Application Invite options dict to use.
        invitee (str): the email/balena_username of the invitee.
        role_name (Optional[str]): the role name to be granted to the invitee.
        One of "observer", "developer", "operator". Defaults to "developer"
        message (Optional[str]): the message to send along with the invite.

#### Returns:
    dict: application invite.

#### Examples:
```python
>>> balena.models.application.invite.create(1681618, 'invitee@example.org', 'developer', 'Test invite')
```

<a name="applicationinvite.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)

Get all invites.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[ApplicationInviteType]: list contains info of invites.

#### Examples:
```python
>>> balena.models.application.invite.get_all()
```

<a name="applicationinvite.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[ApplicationInviteType]</code>](#applicationinvitetype)

Get all invites by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    List[ApplicationInviteType]: list contains info of invites.

#### Examples:
```python
>>> balena.models.application.invite.get_all_by_application(1681618)
```

<a name="applicationinvite.revoke"></a>
### Function: revoke(invite_id) ⇒ <code>None</code>

Revoke an invite.

#### Args:
    invite_id (int): application invite id.

#### Examples:
```python
>>> balena.models.application.invite.revoke(5860)
```
## Device

This class implements device model for balena python SDK.

<a name="device.deactivate"></a>
### Function: deactivate(uuid_or_id_or_ids) ⇒ <code>None</code>

Deactivates a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

#### Examples:
```python
>>> balena.models.device.deactivate('44cc9d1861b9f992808c506276e5d31c')
>>> balena.models.device.deactivate([123, 234])
```

<a name="device.disable_device_url"></a>
### Function: disable_device_url(uuid_or_id_or_ids) ⇒ <code>None</code>

Disable device url for a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int]).

#### Examples:
```python
>>> balena.models.device.disable_device_url('8deb12a58')
>>> balena.models.device.disable_device_url([123, 345])
```

<a name="device.disable_local_mode"></a>
### Function: disable_local_mode(uuid_or_id) ⇒ <code>None</code>

Disable local mode.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    None.

#### Examples:
```python
>>> balena.models.device.disable_local_mode('b6070f4f')
```

<a name="device.disable_lock_override"></a>
### Function: disable_lock_override(uuid_or_id) ⇒ <code>None</code>

Disable lock override.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

<a name="device.enable_device_url"></a>
### Function: enable_device_url(uuid_or_id_or_ids) ⇒ <code>None</code>

Enable device url for a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int]).

#### Examples:
```python
>>> balena.models.device.enable_device_url('8deb12a58')
>>> balena.models.device.enable_device_url([123, 345])
```

<a name="device.enable_local_mode"></a>
### Function: enable_local_mode(uuid_or_id) ⇒ <code>None</code>

Enable local mode.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Examples:
```python
>>> balena.models.device.enable_local_mode('b6070f4f')
```

<a name="device.enable_lock_override"></a>
### Function: enable_lock_override(uuid_or_id) ⇒ <code>None</code>

Enable lock override.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

<a name="device.generate_device_key"></a>
### Function: generate_device_key(uuid_or_id, name, description, expiry_date) ⇒ <code>str</code>

Generate a device key.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    name (Optional[str]): device key name.
    description (Optional[str]): description for device key.
    expiry_date (Optional[str]): expiry date for device key, for example: `2030-01-01T00:00:00Z`.

#### Examples:
```python
>>> balena.models.device.generate_device_key('df0926')
```

<a name="device.generate_uuid"></a>
### Function: generate_uuid() ⇒ <code>str</code>

Generate a random device UUID.

#### Returns:
    str: a generated UUID.

#### Examples:
```python
>>> balena.models.device.generate_uuid()
```

<a name="device.get"></a>
### Function: get(uuid_or_id, options) ⇒ [<code>TypeDevice</code>](#typedevice)

This method returns a single device by id or uuid.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Returns:
    TypeDevice: device info.

#### Examples:
```python
>>> balena.models.device.get('8deb12a58e3b6d3920db1c2b6303d1ff32f23d5ab99781ce1dde6876e8d143')
>>> balena.models.device.get('8deb12')
>>> balena.models.device.get(12345)
```

<a name="device.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[TypeDevice]</code>](#typedevice)

This method returns all devices that the current user can access.
In order to have the following computed properties in the result
you have to explicitly define them in a `$select` in the extra options:
 - overall_status
 - overall_progress
 - is_frozen

####  Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[TypeDevice]: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all()
```

<a name="device.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[TypeDevice]</code>](#typedevice)

Get devices by application slug, uuid or id.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[TypeDevice]: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all_by_application('my_org/RPI1')
```

<a name="device.get_all_by_organization"></a>
### Function: get_all_by_organization(handle_or_id, options) ⇒ [<code>List[TypeDevice]</code>](#typedevice)

Get devices by organization slug, uuid or id.

#### Args:
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    List[TypeDevice]: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_all_by_organization('my_org')
>>> balena.models.device.get_all_by_organization(123)
```

<a name="device.get_application_info"></a>
### Function: get_application_info(uuid_or_id) ⇒ <code>Any</code>

***Deprecated***
Return information about the application running on the device.
This function requires supervisor v1.8 or higher.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

#### Returns:
    dict: dictionary contains application information.

#### Examples:
```python
>>> balena.models.device.get_application_info('7f66ec')
```

<a name="device.get_application_name"></a>
### Function: get_application_name(uuid_or_id) ⇒ <code>str</code>

Get application name by device uuid.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    str: application name.

<a name="device.get_by_name"></a>
### Function: get_by_name(name, options) ⇒ [<code>List[TypeDevice]</code>](#typedevice)

Get devices by device name.

#### Args:
    name (str): device name.

#### Returns:
    List[TypeDevice]: list contains info of devices.

#### Examples:
```python
>>> balena.models.device.get_by_name('floral-mountain')
```

<a name="device.get_dashboard_url"></a>
### Function: get_dashboard_url(uuid) ⇒ <code>None</code>

Get balena Dashboard URL for a specific device.

#### Args:
    uuid (str): device uuid.

#### Examples:
```python
>>> balena.models.device.get_dashboard_url('19619a6317072b65a240b451f45f855d')
```

<a name="device.get_device_url"></a>
### Function: get_device_url(uuid_or_id) ⇒ <code>str</code>

Get a device url for a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Examples:
```python
>>> balena.models.device.get_device_url('8deb12a')
```

<a name="device.get_local_ip_address"></a>
### Function: get_local_ip_address(uuid_or_id) ⇒ <code>List[str]</code>

Get the local IP addresses of a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    List[str]: IP addresses of a device.

<a name="device.get_local_mode_support"></a>
### Function: get_local_mode_support(uuid_or_id) ⇒ <code>LocalModeResponse</code>

Returns whether local mode is supported and a message describing the reason why local mode is not supported.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    dict: local mode support information ({'supported': True/False, 'message': '...'}).

#### Examples:
```python
>>> balena.models.device.get_local_mode_support('b6070f4')
```

<a name="device.get_mac_address"></a>
### Function: get_mac_address(uuid_or_id) ⇒ <code>List[str]</code>

Get the MAC addresses of a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    List[str]: MAC addresses of a device.

<a name="device.get_metrics"></a>
### Function: get_metrics(uuid_or_id) ⇒ [<code>DeviceMetricsType</code>](#devicemetricstype)

Gets the metrics related information for a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    dict: metrics of the device.

<a name="device.get_name"></a>
### Function: get_name(uuid_or_id) ⇒ <code>str</code>

Get device name by device uuid.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    str: device name.

<a name="device.get_os_update_status"></a>
### Function: get_os_update_status(uuid_or_id) ⇒ <code>HUPStatusResponse</code>

***Deprecated***
Get the OS update status of a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

#### Returns:
    HUPStatusResponse: action response.

#### Examples:
```python
>>> balena.models.device.get_os_update_status('b6070f4f')
```

<a name="device.get_status"></a>
### Function: get_status(uuid_or_id) ⇒ <code>str</code>

Get the status of a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    str: status of a device.

#### Examples:
```python
>>> balena.models.device.get_status('8deb12')
```

<a name="device.get_supervisor_state"></a>
### Function: get_supervisor_state(uuid_or_id) ⇒ <code>SupervisorStateType</code>

Get the supervisor state on a device

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

#### Returns:
    dict: supervisor state.

#### Examples:
```python
>>> balena.models.device.get_supervisor_state('b6070f4fea')
```

<a name="device.get_supervisor_target_state"></a>
### Function: get_supervisor_target_state(uuid_or_id) ⇒ <code>Any</code>

Get the supervisor target state on a device

#### Args:
    uuid_or_id (Union[str, int]): device uuid (str) or id (int).

#### Returns:
    DeviceStateType: supervisor target state.

#### Examples:
```python
>>> balena.models.device.get_supervisor_target_state('b6070f4fea5edf808b576123157fe5ec')
```

<a name="device.get_supervisor_target_state_for_app"></a>
### Function: get_supervisor_target_state_for_app(slug_or_uuid_or_id, release) ⇒ <code>Any</code>

Get the supervisor target state on a device

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
     release (Optional[Union[str, int]]): (optional) release uuid (default tracked)
#### Returns:
    DeviceStateType: supervisor target state.

#### Examples:
```python
>>> balena.models.device.get_supervisor_target_state_for_app('myorg/myapp')
```

<a name="device.get_with_service_details"></a>
### Function: get_with_service_details(uuid_or_id, options) ⇒ [<code>TypeDeviceWithServices</code>](#typedevicewithservices)

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `device.get(uuidOrId, options)` instead.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Returns:
    dict: device info with associated services details.

#### Examples:
```python
>>> balena.models.device.get_with_service_details('0fcd753af396247e035de53b4e43eec3')
```

<a name="device.grant_support_access"></a>
### Function: grant_support_access(uuid_or_id_or_ids, expiry_timestamp) ⇒ <code>None</code>

Grant support access to a device until a specified time.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    expiry_timestamp (int): a timestamp in ms for when the support access will expire.

#### Examples:
```python
>>> balena.models.device.grant_support_access('49b2a7', 1511974999000)
```

<a name="device.has"></a>
### Function: has(uuid_or_id) ⇒ <code>bool</code>

Check if a device exists.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    bool: True if device exists, False otherwise.

<a name="device.has_device_url"></a>
### Function: has_device_url(uuid_or_id) ⇒ <code>bool</code>

Check if a device is web accessible with device urls

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Examples:
```python
>>> balena.models.device.has_device_url('8deb12a')
```

<a name="device.has_lock_override"></a>
### Function: has_lock_override(uuid_or_id) ⇒ <code>bool</code>

Check if a device has the lock override enabled.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    bool: lock override status.

<a name="device.identify"></a>
### Function: identify(uuid_or_id) ⇒ <code>None</code>

Identify device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

#### Examples:
```python
>>> balena.models.device.identify('8deb12a5')
```

<a name="device.is_in_local_mode"></a>
### Function: is_in_local_mode(uuid_or_id) ⇒ <code>bool</code>

Check if local mode is enabled on the device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    bool: True if local mode enabled, otherwise False.

#### Examples:
```python
>>> balena.models.device.is_in_local_mode('b6070f4f')
```

<a name="device.is_online"></a>
### Function: is_online(uuid_or_id) ⇒ <code>bool</code>

Check if a device is online.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    bool: True if the device is online, False otherwise.

<a name="device.is_tracking_application_release"></a>
### Function: is_tracking_application_release(uuid_or_id) ⇒ <code>bool</code>

Get whether the device is configured to track the current application release.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

#### Returns:
    bool: is tracking the current application release.

<a name="device.move"></a>
### Function: move(uuid_or_id, app_slug_or_uuid_or_id) ⇒ <code>None</code>

Move a device to another application.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (str) or id (int).
    app_slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).

#### Examples:
```python
>>> balena.models.device.move(123, 'RPI1Test')
```

<a name="device.pin_to_release"></a>
### Function: pin_to_release(uuid_or_id, full_release_hash_or_id) ⇒ <code>None</code>

Configures the device to run a particular release
and not get updated when the current application release changes.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    full_release_hash_or_id (Union[str, int]) : the hash of a successful release (string) or id (number)

#### Examples:
```python
>>> balena.models.device.set_to_release('49b2a', '45c90004de73557ded7274d4896a6db90ea61e36')
```

<a name="device.ping"></a>
### Function: ping(uuid_or_id) ⇒ <code>None</code>

Ping a device.
This is useful to signal that the supervisor is alive and responding.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

#### Examples:
```python
>>> balena.models.device.ping('8f66ec7')
>>> balena.models.device.ping(1234)
```

<a name="device.purge"></a>
### Function: purge(uuid_or_id) ⇒ <code>None</code>

Purge device.
This function clears the user application's `/data` directory.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

#### Examples:
```python
>>> balena.models.device.purge('8f66ec7')
```

<a name="device.reboot"></a>
### Function: reboot(uuid_or_id, force) ⇒ <code>None</code>

Reboot the device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Examples:
```python
>>> balena.models.device.reboot('8f66ec7')
```

<a name="device.register"></a>
### Function: register(application_slug_or_uuid_or_id, uuid, device_type_slug) ⇒ <code>RegisterResponse</code>

Register a new device with a balena application.

#### Args:
    application_slug_or_uuid_or_id (Union[int, str]): application slug (string), uuid (string) or id (number).
    uuid (str): device uuid.
    device_type_slug (Optional[str]): device type slug or alias.

#### Returns:
    dict: dictionary contains device info.

#### Examples:
```python
>>> device_uuid = balena.models.device.generate_uuid()
>>> balena.models.device.register('RPI1',device_uuid)
```

<a name="device.remove"></a>
### Function: remove(uuid_or_id_or_ids) ⇒ <code>None</code>

Remove device(s).

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

<a name="device.rename"></a>
### Function: rename(uuid_or_id, new_name) ⇒ <code>None</code>

Renames a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (str) or id (int)
    new_name (str): device new name.

#### Examples:
```python
>>> balena.models.device.rename(123, 'python-sdk-test-device')
```

<a name="device.restart_application"></a>
### Function: restart_application(uuid_or_id) ⇒ <code>None</code>

This function restarts the Docker container running
the application on the device, but doesn't reboot
the device itself.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.

#### Examples:
```python
>>> balena.models.device.restart_application('8deb12a58')
>>> balena.models.device.restart_application(1234)
```

<a name="device.restart_service"></a>
### Function: restart_service(uuid_or_id, image_id) ⇒ <code>None</code>

Restart a service on device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to restart

#### Examples:
```python
>>> balena.models.device.restart_service('f3887b', 392229)
>>> balena.models.device.restart_service(None, 392229)  # if running on the device
```

<a name="device.revoke_support_access"></a>
### Function: revoke_support_access(uuid_or_id_or_ids) ⇒ <code>None</code>

Revoke support access to a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

#### Examples:
```python
>>> balena.models.device.revoke_support_access('49b2a7')
```

<a name="device.set_custom_location"></a>
### Function: set_custom_location(uuid_or_id_or_ids, location) ⇒ <code>None</code>

Set a custom location for a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    location (dict): device custom location { 'latitude': Union[int,, str], 'longitude': Union[int, str]}.

#### Examples:
```python
>>> balena.models.device.set_custom_location(123, {'latitude': '21.032777','longitude': '105.831586'})
```

<a name="device.set_note"></a>
### Function: set_note(uuid_or_id_or_ids, note) ⇒ <code>None</code>

Note a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])
    note (str): device note.

#### Examples:
```python
>>> balena.models.device.note(123, 'test note')
```

<a name="device.set_supervisor_release"></a>
### Function: set_supervisor_release(uuid_or_id, supervisor_version_or_id) ⇒ <code>None</code>

Set a specific device to run a particular supervisor release.
#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    supervisor_version_or_id (Union[str, int]): the version of a released supervisor (string) or id (number)
#### Examples:
```python
>>> balena.models.device.set_supervisor_release('f55dcdd9ad', 'v13.0.0')
```

<a name="device.shutdown"></a>
### Function: shutdown(uuid_or_id, force) ⇒ <code>None</code>

Shutdown the device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Examples:
```python
>>> balena.models.device.shutdown('8f66ec7')
```

<a name="device.start_application"></a>
### Function: start_application(uuid_or_id) ⇒ <code>None</code>

***Deprecated***
Starts a user application container, usually after it has been stopped with `stop_application()`.
This function requires supervisor v1.8 or higher.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

#### Returns:
    dict: dictionary contains started application container id.

#### Examples:
```python
>>> balena.models.device.start_application('8f66ec7')
```

<a name="device.start_os_update"></a>
### Function: start_os_update(uuid_or_id, target_os_version) ⇒ <code>HUPStatusResponse</code>

Start an OS update on a device.

If using run_detached option, monitor progress with device.get() --
status, provisioning_state and provisioning_progress entries.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).
    target_os_version (str): semver-compatible version for the target device.
        Unsupported (unpublished) version will result in rejection.
        The version **must** be the exact version number, a "prod" variant
        and greater than the one running on the device.
    run_detached (Optional[bool]): run the update in detached mode.
        Default behaviour is run_detached=False but is DEPRECATED and will be
        removed in a future release. Use run_detached=True for more reliable updates.

#### Returns:
    HUPStatusResponse: action response.

#### Examples:
```python
>>> balena.models.device.start_os_update('b6070f4', '2.29.2+rev1.prod')
>>> balena.models.device.start_os_update('b6070f4', '2.89.0+rev1')
>>> balena.models.device.start_os_update('b6070f4', '2.89.0+rev1', run_detached=True)
```

<a name="device.start_service"></a>
### Function: start_service(uuid_or_id, image_id) ⇒ <code>None</code>

Start a service on device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to start

#### Examples:
```python
>>> balena.models.device.start_service('f3887b1', 1234)
>>> balena.models.device.start_service(None, 1234)  # if running on the device
```

<a name="device.stop_application"></a>
### Function: stop_application(uuid_or_id) ⇒ <code>None</code>

***Deprecated***
Temporarily stops a user application container.
Application container will not be removed after invoking this function and a
reboot or supervisor restart will cause the container to start again.
This function requires supervisor v1.8 or higher.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int).

#### Returns:
    dict: dictionary contains stopped application container id.

#### Examples:
```python
>>> balena.models.device.stop_application('8f66ec')
```

<a name="device.stop_service"></a>
### Function: stop_service(uuid_or_id, image_id) ⇒ <code>None</code>

Stop a service on device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    image_id (int): id of the image to stop

#### Examples:
```python
>>> balena.models.device.stop_service('f3887b1', 392229)
>>> balena.models.device.stop_service(None, 392229)  # if running on the device
```

<a name="device.track_application_release"></a>
### Function: track_application_release(uuid_or_id_or_ids) ⇒ <code>None</code>

Configure a specific device to track the current application release.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

<a name="device.unset_custom_location"></a>
### Function: unset_custom_location(uuid_or_id_or_ids) ⇒ <code>None</code>

Clear the custom location of a device.

#### Args:
    uuid_or_id_or_ids (Union[str, int, List[int]]): device uuid (str) or id (int) or ids (List[int])

#### Examples:
```python
>>> balena.models.device.unset_custom_location(123)
```

<a name="device.update"></a>
### Function: update(uuid_or_id, force) ⇒ <code>None</code>

update the device.

#### Args:
    uuid_or_id (Optional[Union[str, int]]): device uuid (str) or id (int) or None for SDK running on device.
    force (Optional[bool]): If force is True, the update lock will be overridden.

#### Examples:
```python
>>> balena.models.device.update('8f66ec7')
```
## DeviceTag

This class implements device tag model for balena python SDK.

<a name="devicetag.get"></a>
### Function: get(uuid_or_id, tag_key) ⇒ <code>Optional[str]</code>

Get a device tag (update tag value if it exists).
___Note___: Notice that when using the device ID rather than UUID,
it will avoid one extra API roundtrip.

#### Args:
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.

#### Returns:
    Optional[str]: tag value

#### Examples:
```python
>>> balena.models.device.tags.get('f5213eac0d63ac4', 'testtag')
```

<a name="devicetag.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all device tags.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.device.tags.get_all()
```

<a name="devicetag.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all device tags for an application.

#### Args:
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.device.tags.get_all_by_application(1005160)
```

<a name="devicetag.get_all_by_device"></a>
### Function: get_all_by_device(uuid_or_id, options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all device tags for a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.device.tags.get_all_by_device('a03ab646c')
```

<a name="devicetag.remove"></a>
### Function: remove(uuid_or_id, tag_key) ⇒ <code>None</code>

Remove a device tag.

#### Args:
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.device.tags.remove('f5213eac0d63ac477', 'testtag')
```

<a name="devicetag.set"></a>
### Function: set(uuid_or_id, tag_key, value) ⇒ <code>None</code>

Set a device tag (update tag value if it exists).
___Note___: Notice that when using the device ID rather than UUID,
it will avoid one extra API roundtrip.

#### Args:
    uuid_or_id (Union[str, int]): device uuid or device id.
    tag_key (str): tag key.
    value (str): tag value.

#### Examples:
```python
>>> balena.models.device.tags.set('f5213eac0d63ac4', 'testtag', 'test1')
>>> balena.models.device.tags.set('f5213eac0d63ac4', 'testtag', 'test2')
```
## DeviceConfigVariable

This class implements device config variable model for balena python SDK.

<a name="deviceconfigvariable.get"></a>
### Function: get(uuid_or_id, env_var_name) ⇒ <code>Optional[str]</code>

Get a device config variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.

#### Examples:
```python
>>> balena.models.device.config_var.device.get('8deb12','test_env4')
```

<a name="deviceconfigvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device config variables for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: list of device environment variables.

#### Examples:
```python
>>> balena.models.device.config_var.device.get_all_by_application(5780)
```

<a name="deviceconfigvariable.get_all_by_device"></a>
### Function: get_all_by_device(uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device config variables belong to a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: device config variables.

#### Examples:
```python
>>> balena.models.device.config_var.get_all_by_device('f5213ea')
```

<a name="deviceconfigvariable.remove"></a>
### Function: remove(uuid_or_id, key) ⇒ <code>None</code>

Remove a device environment variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    key (str): environment variable name.

#### Examples:
```python
>>> balena.models.device.config_var.device.remove(2184, 'test_env4')
```

<a name="deviceconfigvariable.set"></a>
### Function: set(uuid_or_id, env_var_name, value) ⇒ <code>None</code>

Set the value of a device config variable.
Note that config variables must start with BALENA_ and RESIN_ prefixes.
#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.device.config_var.set('8deb12','BALENA_test_env4', 'testing1')
```
## DeviceEnvVariable

This class implements device environment variable model for balena python SDK.

<a name="deviceenvvariable.get"></a>
### Function: get(uuid_or_id, env_var_name) ⇒ <code>Optional[str]</code>

Get device environment variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.

#### Examples:
```python
>>> balena.models.device.env_var.get('8deb12', 'test_env4')
```

<a name="deviceenvvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device environment variables for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: list of device environment variables.

#### Examples:
```python
>>> balena.models.device.env_var.get_all_by_application(5780)
```

<a name="deviceenvvariable.get_all_by_device"></a>
### Function: get_all_by_device(uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device environment variables.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: device environment variables.

#### Examples:
```python
>>> balena.models.device.env_var.get_all_by_device('8deb12a')
```

<a name="deviceenvvariable.remove"></a>
### Function: remove(uuid_or_id, key) ⇒ <code>None</code>

Remove a device environment variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    key (str): environment variable name.

#### Examples:
```python
>>> balena.models.device.env_var.remove(2184, 'test_env4')
```

<a name="deviceenvvariable.set"></a>
### Function: set(uuid_or_id, env_var_name, value) ⇒ <code>None</code>

Set the value of a specific environment variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    env_var_name (str): environment variable name.
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.device.env_var.set('8deb12', 'test_env4', 'testing1')
```
## DeviceServiceEnvVariable

This class implements device service variable model for balena python SDK.

<a name="deviceserviceenvvariable.get"></a>
### Function: get(uuid_or_id, service_name_or_id, key) ⇒ <code>Optional[str]</code>

Get the overriden value of a service variable on a device

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name

#### Returns:
   Optional[str]: device service environment variables.

#### Examples:
```python
>>> balena.models.device.service_var.get('8deb12a', 'myservice', 'VAR')
>>> balena.models.device.service_var.get('8deb12a', 1234', 'VAR')
```

<a name="deviceserviceenvvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device service environment variables belong to an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: device service environment variables.

#### Examples:
```python
>>> balena.models.device.service_var.get_all_by_application(1043050)
```

<a name="deviceserviceenvvariable.get_all_by_device"></a>
### Function: get_all_by_device(uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all device environment variables.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: device service environment variables.

#### Examples:
```python
>>> balena.models.device.service_var.get_all_by_device(8deb12a)
```

<a name="deviceserviceenvvariable.remove"></a>
### Function: remove(uuid_or_id, service_name_or_id, key) ⇒ <code>None</code>

Remove a device service environment variable.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name

#### Examples:
```python
>>> balena.models.device.service_var.set('7cf02a6', 'myservice', 'VAR')
>>> balena.models.device.service_var.remove('7cf02a6', 28970, 'VAR')
```

<a name="deviceserviceenvvariable.set"></a>
### Function: set(uuid_or_id, service_name_or_id, key, value) ⇒ <code>None</code>

Set the overriden value of a service variable on a device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    service_name_or_id (Union[str, int]): service name (string) or service id (number)
    key (str): variable name
    value (str): variable value

#### Examples:
```python
>>> balena.models.device.service_var.set('7cf02a6', 'myservice', 'VAR', 'override')
>>> balena.models.device.service_var.set('7cf02a6', 123, 'VAR', 'override')
```
## DeviceHistory

This class implements device history model for balena python SDK.

<a name="devicehistory.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, from_date, to_date, options) ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)

Get all device history entries for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    from_date (datetime): history entries newer than or equal to this timestamp. Defaults to 7 days ago
    to_date (datetime): history entries younger or equal to this date.
    options (AnyObject): extra pine options to use

#### Returns:
    List[DeviceHistoryType]: device history entries.

#### Examples:
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

<a name="devicehistory.get_all_by_device"></a>
### Function: get_all_by_device(uuid_or_id, from_date, to_date, options) ⇒ [<code>List[DeviceHistoryType]</code>](#devicehistorytype)

Get all device history entries for a device.

#### Args:
    uuid_or_id (str): device uuid (32 / 62 digits string) or id (number) __note__: No short IDs supported
    from_date (datetime): history entries newer than or equal to this timestamp. Defaults to 7 days ago
    to_date (datetime): history entries younger or equal to this date.
    options (AnyObject): extra pine options to use

#### Returns:
    List[DeviceHistoryType]: device history entries.

#### Examples:
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
## DeviceType

This class implements user API key model for balena python SDK.

<a name="devicetype.get"></a>
### Function: get(id_or_slug, options) ⇒ [<code>DeviceTypeType</code>](#devicetypetype)

Get a single device type.

#### Args:
    id_or_slug (Union[str, int]): device type slug or alias (string) or id (int).
    options (AnyObject): extra pine options to use.

#### Returns:
    DeviceTypeType: Returns the device type

<a name="devicetype.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[DeviceTypeType]</code>](#devicetypetype)

Get all device types.

#### Args:
    options (AnyObject): extra pine options to use.

#### Returns:
    List[DeviceTypeType]: list contains info of device types.

<a name="devicetype.get_all_supported"></a>
### Function: get_all_supported(options) ⇒ <code>None</code>

Get all supported device types.

#### Args:
    options (AnyObject): extra pine options to use.

#### Returns:
    List[DeviceTypeType]: list contains info of all supported device types.

<a name="devicetype.get_by_slug_or_name"></a>
### Function: get_by_slug_or_name(slug_or_name, options) ⇒ [<code>DeviceTypeType</code>](#devicetypetype)

Get a single device type by slug or name.

#### Args:
    slug_or_name (str): device type slug or name.
    options (AnyObject): extra pine options to use.

#### Returns:
    DeviceTypeType: Returns the device type

<a name="devicetype.get_name"></a>
### Function: get_name(slug) ⇒ <code>str</code>

Get display name for a device.

#### Args:
    slug (str): device type slug.

<a name="devicetype.get_slug_by_name"></a>
### Function: get_slug_by_name(name) ⇒ <code>str</code>

Get device slug.

#### Args:
    name (str): device type name.
## ApiKey

This class implements user API key model for balena python SDK.

<a name="apikey.create"></a>
### Function: create(name, description, expiry_date) ⇒ <code>str</code>

This method registers a new api key for the current user with the name given.

#### Args:
    name (str): the API key name
    description (Optional[str]): the API key description
    expiry_date (Optional[str]): the API key expiring date

#### Returns:
    str: API key

#### Examples:
```python
>>> balena.models.api_key.create_api_key("myApiKey")
>>> balena.models.api_key.create_api_key("myApiKey", "my api key description")
>>> balena.models.api_key.create_api_key("myApiKey", "my descr", datetime.datetime.utcnow().isoformat())
```

<a name="apikey.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

This function gets all API keys.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[APIKeyType]: user API key

#### Examples:
```python
>>> balena.models.api_key.get_all()
```

<a name="apikey.get_all_named_user_api_keys"></a>
### Function: get_all_named_user_api_keys(options) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

Get all named user API keys of the current user.

#### Args:
    options (AnyObject): extra pine options to use

#### Examples:
```python
>>> balena.models.api_key.get_all_named_user_api_keys()
```

<a name="apikey.get_device_api_keys_by_device"></a>
### Function: get_device_api_keys_by_device(uuid_or_id, options) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

Get all API keys for a device.

#### Args:
    device_uuid (Union[str, int]): device, uuid (string) or id (int)
    options (AnyObject): extra pine options to use

#### Examples:
```python
>>> balena.models.api_key.get_device_api_keys_by_device("44cc9d186")
>>> balena.models.api_key.get_device_api_keys_by_device(1111386)
```

<a name="apikey.get_provisioning_api_keys_by_application"></a>
### Function: get_provisioning_api_keys_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[APIKeyType]</code>](#apikeytype)

Get all provisioning API keys for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Examples:
```python
>>> balena.models.api_key.get_provisioning_api_keys_by_application(1296047)
>>> balena.models.api_key.get_provisioning_api_keys_by_application("myorg/myapp")
```

<a name="apikey.revoke"></a>
### Function: revoke(id) ⇒ <code>None</code>

This function revokes an API key.

#### Args:
    id (int): API key id.

#### Examples:
```python
>>> balena.models.api_key.revoke(1296047)
```

<a name="apikey.update"></a>
### Function: update(id, api_key_info) ⇒ <code>None</code>

This function updates details of an API key.

#### Args:
    id (str): API key id.
    api_key_info (APIKeyInfoType): new API key info.

#### Examples:
```python
>>> balena.models.api_key.update(1296047, {"name":"new name"})
```
## Key

This class implements ssh key model for balena python SDK.

<a name="key.create"></a>
### Function: create(title, key) ⇒ [<code>SSHKeyType</code>](#sshkeytype)

Create a ssh key.

#### Args:
    title (str): key title.
    key (str): the public ssh key.

#### Returns:
    SSHKeyType: new ssh key id.

<a name="key.get"></a>
### Function: get(id) ⇒ [<code>SSHKeyType</code>](#sshkeytype)

Get a single ssh key.

#### Args:
    id (int): key id.

#### Returns:
    SSHKeyType: ssh key info.

<a name="key.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[SSHKeyType]</code>](#sshkeytype)

Get all ssh keys.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[SSHKeyType]: list of ssh keys.

<a name="key.remove"></a>
### Function: remove(id) ⇒ <code>None</code>

Remove a ssh key.

#### Args:
    id (int): key id.
## Organization

This class implements organization model for balena python SDK.

<a name="organization.create"></a>
### Function: create(name, handle, logo_image) ⇒ [<code>OrganizationType</code>](#organizationtype)

Creates a new organization.

#### Args:
    name (str): the name of the organization that will be created.
    handle (Optional[str]): The handle of the organization that will be created.
    logo_image (Optional[io.BufferedReader]): The organization logo to be used.

#### Returns:
    dict: organization info.

#### Examples:
```python
>>> balena.models.organization.create('My Org', 'test_org')
>>> with open('mypath/myfile.png', 'rb') as f:
>>>     org = sdk.models.organization.create("my-name", None, f)
```

<a name="organization.get"></a>
### Function: get(handle_or_id, options) ⇒ [<code>OrganizationType</code>](#organizationtype)

Get a single organization.

#### Args:
    handle_or_id (str): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    dict: organization info.

#### Raises:
    OrganizationNotFound: if organization couldn't be found.

#### Examples:
```python
>>> balena.models.organization.get(26474)
>>> balena.models.organization.get('myorg')
```

<a name="organization.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[OrganizationType]</code>](#organizationtype)

Get all organizations.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[OrganizationType]: list contains information of organizations.

#### Examples:
```python
>>> balena.models.organization.get_all()
```

<a name="organization.remove"></a>
### Function: remove(handle_or_id) ⇒ <code>None</code>

Remove an organization.

#### Args:
    handle_or_id (str): organization handle (string) or id (number).

#### Examples:
```python
>>> balena.models.organization.remove(148003)
```
## OrganizationMembership

This class implements organization membership model for balena python SDK.

<a name="organizationmembership.get"></a>
### Function: get(membership_id, options) ⇒ [<code>OrganizationMembershipType</code>](#organizationmembershiptype)

Get a single organization membership.

#### Args:
    membership_id (ResourceKey): the id (int) or an object with the unique
    `user` & `is_member_of__organization` numeric pair of the membership
    options (AnyObject): extra pine options to use

#### Returns:
    Organization membership.

#### Examples:
```python
>>> balena.models.organization.memberships.get(17608)
```

<a name="organizationmembership.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)

Get all organization memberships.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[OrganizationMembershipType]: organization memberships.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.get_all()
```

<a name="organizationmembership.get_all_by_organization"></a>
### Function: get_all_by_organization(handle_or_id, options) ⇒ [<code>List[OrganizationMembershipType]</code>](#organizationmembershiptype)

Get all memberships by organization.

#### Args:
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    List[OrganizationMembershipType]: organization memberships.

#### Examples:
```python
>>> balena.models.organization.memberships.get_all_by_organization(3014)
```
## OrganizationMembershipTag

This class implements organization membership tag model for balena python SDK.

<a name="organizationmembershiptag.get"></a>
### Function: get(membership_id, tag_key) ⇒ <code>Optional[str]</code>

Get an organization membership tag.

#### Args:
    membership_id: organization membership id.
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.get(17608, 'mTag1')
```

<a name="organizationmembershiptag.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

Get all organization membership tags.

#### Args:
    options (AnyObject): extra pine options to use


#### Examples:
```python
>>> balena.models.organization.memberships.tags.get_all()
```

<a name="organizationmembershiptag.get_all_by_organization"></a>
### Function: get_all_by_organization(handle_or_id, options) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

Get all organization membership tags for an organization.

#### Args:
    handle_or_id (Union[str, int]): organization handle (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    List[OrganizationMembershipTagType]: organization membership tags.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.get_all_by_organization(3014)
```

<a name="organizationmembershiptag.get_all_by_organization_membership"></a>
### Function: get_all_by_organization_membership(membership_id, options) ⇒ [<code>List[OrganizationMembershipTagType]</code>](#organizationmembershiptagtype)

Get all organization membership tags for a memberships of an organization.

#### Args:
    membership_id (int): organization membership id.
    options (AnyObject): extra pine options to use

#### Returns:
    list: organization membership tags.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.get_all_by_organization_membership(17608)
```

<a name="organizationmembershiptag.remove"></a>
### Function: remove(membership_id, tag_key) ⇒ <code>None</code>

Remove an organization membership tag.

#### Args:
    membership_id: organization membership id.
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.remove(17608, 'mTag1')
```

<a name="organizationmembershiptag.set"></a>
### Function: set(membership_id, tag_key, value) ⇒ <code>None</code>

Set an organization membership tag.

#### Args:
    membership_id: organization membership id.
    tag_key (str): tag key.
    value (str): tag value.

#### Examples:
```python
>>> balena.models.organization.memberships.tags.set(17608, 'mTag1', 'Python SDK')
```
## OrganizationInvite

This class implements organization invite model for balena python SDK.

<a name="organizationinvite.accept"></a>
### Function: accept(invite_token) ⇒ <code>None</code>

Accepts an invite.

#### Args:
    invite_token (str): invitation Token - invite token.

<a name="organizationinvite.create"></a>
### Function: create(handle_or_id, invitee, role_name, message) ⇒ [<code>OrganizationInviteType</code>](#organizationinvitetype)

Creates a new invite for an organization.

#### Args:
    handle_or_id (Union[str, int]): organization handle (string), or id (number).
    invitee (str): the email/balena_username of the invitee.
    role_name (Optional[str]): the role name to be granted to the invitee.
    message (Optional[str]): the message to send along with the invite.

#### Returns:
    OrganizationInviteType: organization invite.

#### Examples:
```python
>>> balena.models.organization.invite.create(26474, 'invitee@example.org', 'member', 'Test invite')
```

<a name="organizationinvite.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)

Get all invites.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[OrganizationInviteType]: list contains info of invites.

#### Examples:
```python
>>> balena.models.organization.invite.get_all()
```

<a name="organizationinvite.get_all_by_organization"></a>
### Function: get_all_by_organization(handle_or_id, options) ⇒ [<code>List[OrganizationInviteType]</code>](#organizationinvitetype)

Get all invites by organization.

#### Args:
    handle_or_id (Union[str, int]): organization handle (string), or id (number).
    options (AnyObject): extra pine options to use.

#### Returns:
    List[OrganizationInviteType]: list contains info of invites.

#### Examples:
```python
>>> balena.models.organization.invite.get_all_by_organization(26474)
```

<a name="organizationinvite.revoke"></a>
### Function: revoke(invite_id) ⇒ <code>None</code>

Revoke an invite.

#### Args:
    invite_id (int): organization invite id.

#### Examples:
```python
>>> balena.models.organization.invite.revoke(2862)
```
## DeviceOs

This class implements device os model for balena python SDK.

<a name="deviceos.download"></a>
### Function: download(device_type, version, options) ⇒ <code>None</code>

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

#### Args:
    device_type (str): device type slug.
    version (str): semver-compatible version or 'latest', defaults to 'latest'.
    * The version **must** be the exact version number.
    options (DownloadConfig): OS configuration options to use.

#### Returns:
    float: OS image download size, in bytes.

Example:
```python
>>> with b.models.device_os.download("raspberrypi3") as stream:
...    stream.raise_for_status()
...    with open("my-image-filename", "wb") as f:
...        for chunk in stream.iter_content(chunk_size=8192):
...            f.write(chunk)
```

<a name="deviceos.get_all_os_versions"></a>
### Function: get_all_os_versions(device_type, options) ⇒ <code>None</code>

Get all OS versions for the provided device type(s), inlcuding invalidated ones

#### Args:
    device_type (Union[str, List[str]]): device type slug.
    options (AnyObject): extra pine options to use

#### Returns:
    list: balenaOS versions.

<a name="deviceos.get_available_os_versions"></a>
### Function: get_available_os_versions(device_type) ⇒ <code>None</code>

Get the supported OS versions for the provided device type(s)

#### Args:
    device_type (Union[str, List[str]]): device type slug.

#### Returns:
    list: balenaOS versions.

<a name="deviceos.get_config"></a>
### Function: get_config(slug_or_uuid_or_id, options) ⇒ <code>None</code>

Download application config.json.

#### Args:
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

#### Returns:
    dict: application config.json content.

#### Raises:
    ApplicationNotFound: if application couldn't be found.

<a name="deviceos.get_download_size"></a>
### Function: get_download_size(device_type, version) ⇒ <code>float</code>

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

#### Args:
    device_type (str): device type slug.
    version (str): semver-compatible version or 'latest', defaults to 'latest'.
    * The version **must** be the exact version number.

#### Returns:
    float: OS image download size, in bytes.

<a name="deviceos.get_max_satisfying_version"></a>
### Function: get_max_satisfying_version(device_type, version_or_range, os_type) ⇒ <code>Optional[str]</code>

Get OS download size estimate. Currently only the raw (uncompressed) size is reported.

#### Args:
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

#### Returns:
    float: OS image download size, in bytes.

<a name="deviceos.get_supervisor_releases_for_cpu_architecture"></a>
### Function: get_supervisor_releases_for_cpu_architecture(cpu_architecture_slug_or_id, options) ⇒ [<code>List[ReleaseType]</code>](#releasetype)

Returns the Releases of the supervisor for the CPU Architecture

#### Args:
    cpu_architecture_slug_or_id (Union[str, int]): The slug (string) or id (number) for the CPU Architecture.
    options (AnyObject): extra pine options to use.

#### Returns:
    ReleaseType: release info.


Example:
    results = balena.models.os.get_supervisor_releases_for_cpu_architecture('aarch64');
    results = balena.models.os.get_supervisor_releases_for_cpu_architecture(
        'aarch64',
        { $filter: { raw_version: '12.11.0' } },
    );

<a name="deviceos.get_supported_os_update_versions"></a>
### Function: get_supported_os_update_versions(device_type, current_version) ⇒ <code>None</code>

Get OS supported versions.

#### Args:
    device_type (str): device type slug.
    current_version (str): device type slug.

<a name="deviceos.is_architecture_compatible_with"></a>
### Function: is_architecture_compatible_with(os_architecture, application_architecture) ⇒ <code>None</code>

Returns whether the specified OS architecture is compatible with the target architecture.

#### Args:
    os_architecture (str): The OS's architecture as specified in its device type.
    application_architecture (str): The application's architecture as specified in its device type.

#### Returns:
    bool: Whether the specified OS architecture is capable of
          running applications build for the target architecture.

<a name="deviceos.is_supported_os_update"></a>
### Function: is_supported_os_update(device_type, current_version, target_version) ⇒ <code>bool</code>

 Returns the supported OS update targets for the provided device type.

#### Args:
    device_type (str): device type slug.
    current_version (str): emver-compatible version for the starting OS version
    target_version (str): semver-compatible version for the target OS version
## Config

This class implements configuration model for balena python SDK.

<a name="config.get_all"></a>
### Function: get_all() ⇒ <code>ConfigType</code>

Get all configuration.

#### Returns:
    ConfigType: configuration information.

#### Examples:
```python
>>> balena.models.config.get_all()
```
## Release

This class implements release model for balena python SDK.

<a name="release.create_from_url"></a>
### Function: create_from_url(slug_or_uuid_or_id, url, flatten_tarball) ⇒ <code>int</code>

Create a new release built from the source in the provided url.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    url (str): a url with a tarball of the project to build.
    flatten_tarball (bool): Should be true when the tarball includes an extra root folder
    with all the content.

#### Returns:
    int: release Id.

<a name="release.finalize"></a>
### Function: finalize(commit_or_id_or_raw_version) ⇒ <code>None</code>

Finalizes a draft release.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)

<a name="release.get"></a>
### Function: get(commit_or_id_or_raw_version, options) ⇒ [<code>ReleaseType</code>](#releasetype)

Get a specific release.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string)
    pair of the release options
    options(AnyObject): extra pine options to use

#### Returns:
    ReleaseType: release info.

<a name="release.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[ReleaseType]</code>](#releasetype)

Get all releases from an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    List[ReleaseType]: release info.

<a name="release.get_latest_by_application"></a>
### Function: get_latest_by_application(slug_or_uuid_or_id, options) ⇒ [<code>Optional[ReleaseType]</code>](#releasetype)

Get the latest successful release for an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number).
    options (AnyObject): extra pine options to use

#### Returns:
    Optional[ReleaseType]: release info.

<a name="release.get_with_image_details"></a>
### Function: get_with_image_details(commit_or_id_or_raw_version, image_options, release_options) ⇒ [<code>ReleaseWithImageDetailsType</code>](#releasewithimagedetailstype)

Get a specific release with the details of the images built.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    image_options (AnyObject): extra pine options to use on image expand
    release_options (AnyObject): extra pine options to use on release expand

#### Returns:
    dict: release info.

#### Raises:
    ReleaseNotFound: if release couldn't be found.

<a name="release.set_is_invalidated"></a>
### Function: set_is_invalidated(commit_or_id_or_raw_version, is_invalidated) ⇒ <code>None</code>

Set the is_invalidated property of a release to True or False.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    is_invalidated (bool): True for invalidated, False for validated.

<a name="release.set_known_issue_list"></a>
### Function: set_known_issue_list(commit_or_id_or_raw_version, known_issue_list) ⇒ <code>None</code>

Set a known issue list for a release.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    known_issue_list (Optional[str]): the known issue list.

<a name="release.set_note"></a>
### Function: set_note(commit_or_id_or_raw_version, note) ⇒ <code>None</code>

Set a note for a release.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string)
    note (Optional[str]): the note.

<a name="release.set_release_version"></a>
### Function: set_release_version(commit_or_id, semver) ⇒ <code>None</code>

Set a direct semver for a given release.

#### Args:
    commit_or_id(Union[str, int]): release commit (string) or id (int)
    semver (str): the version to be released, must be a valid semver
## ReleaseTag

This class implements release tag model for balena python SDK.

<a name="releasetag.get"></a>
### Function: get(commit_or_id_or_raw_version, tag_key) ⇒ <code>Optional[str]</code>

Get a single release tag.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.release.tags.get(465307, 'releaseTag1')
```

<a name="releasetag.get_all"></a>
### Function: get_all(options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all release tags.

#### Args:
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.release.tags.get_all()
```

<a name="releasetag.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all device tags for an application.

#### Args:
    slug_or_uuid_or_id (int): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.release.tags.get_all_by_application(1005160)
```

<a name="releasetag.get_all_by_release"></a>
### Function: get_all_by_release(commit_or_id_or_raw_version, options) ⇒ [<code>List[BaseTagType]</code>](#basetagtype)

Get all release tags for a release.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    options (AnyObject): extra pine options to use

#### Returns:
    List[BaseTagType]: tags list.

#### Examples:
```python
>>> balena.models.release.tags.get_all_by_release(135)
```

<a name="releasetag.remove"></a>
### Function: remove(commit_or_id_or_raw_version, tag_key) ⇒ <code>None</code>

Remove a release tag.

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.

#### Examples:
```python
>>> balena.models.release.tags.remove(135, 'releaseTag1')
```

<a name="releasetag.set"></a>
### Function: set(commit_or_id_or_raw_version, tag_key, value) ⇒ <code>None</code>

Set a release tag (update tag value if it exists).

#### Args:
    commit_or_id_or_raw_version(Union[str, int, ReleaseRawVersionApplicationPair]): release commit (string) or
    tag_key (str): tag key.
    value (str): tag value.

#### Examples:
```python
>>> balena.models.release.tags.set(465307, 'releaseTag1', 'Python SDK')
```
## Service

This class implements service model for balena python SDK.

<a name="service.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[ServiceType]</code>](#servicetype)

Get all services from an application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[ServiceType]: service info.
## ServiceEnvVariable

This class implements Service environment variable model for balena python SDK.

<a name="serviceenvvariable.get"></a>
### Function: get(service_id_or_natural_key, key) ⇒ <code>Optional[str]</code>

Get the value of a specific service variable

#### Args:
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name

#### Examples:
```python
>>> balena.models.service.var.get(1234,'test_env4')
>>> balena.models.service.var.get({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR')
```

<a name="serviceenvvariable.get_all_by_application"></a>
### Function: get_all_by_application(slug_or_uuid_or_id, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all service variables by application.

#### Args:
    slug_or_uuid_or_id (Union[str, int]): application slug (string), uuid (string) or id (number)
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: application environment variables.

#### Examples:
```python
>>> balena.models.service.var.get_all_by_application(9020)
>>> balena.models.service.var.get_all_by_application("myorg/myslug")
```

<a name="serviceenvvariable.get_all_by_service"></a>
### Function: get_all_by_service(service_id_or_natural_key, options) ⇒ [<code>List[EnvironmentVariableBase]</code>](#environmentvariablebase)

Get all variables for a service.

#### Args:
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    options (AnyObject): extra pine options to use

#### Returns:
    List[EnvironmentVariableBase]: service environment variables.

#### Examples:
```python
>>> balena.models.service.var.get_all_by_service(1234)
>>> balena.models.service.var.get_all_by_service({'application': 'myorg/myapp', 'service_name': 'service'})
```

<a name="serviceenvvariable.remove"></a>
### Function: remove(service_id_or_natural_key, key) ⇒ <code>None</code>

Clear the value of a specific service variable

#### Args:
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name

#### Examples:
```python
>>> balena.models.service.var.remove({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR')
>>> balena.models.service.var.remove(1234,'test_env4')
```

<a name="serviceenvvariable.set"></a>
### Function: set(service_id_or_natural_key, key, value) ⇒ <code>None</code>

Set the value of a specific application environment variable.

#### Args:
    service_id_or_natural_key (Union[int, ServiceNaturalKey]): service id (number) or appliation-service_name
    key (str): variable name
    value (str): environment variable value.

#### Examples:
```python
>>> balena.models.service.var.set({'application': 'myorg/myapp', 'service_name': 'service'}, 'VAR', 'value')
>>> balena.models.service.var.set(1234,'test_env4', 'value')
```
## Image

This class implements image model for balena python SDK.

<a name="image.get"></a>
### Function: get(id, options) ⇒ [<code>ImageType</code>](#imagetype)

Get a specific image.

#### Args:
    id (int): image id.
    options (AnyObject): extra pine options to use.

#### Returns:
    ImageType: image info.

<a name="image.get_logs"></a>
### Function: get_logs(id) ⇒ <code>str</code>

Get the build log from an image.

#### Args:
    id (str): image id.

#### Returns:
    str: build log.
## Auth

This class implements all authentication functions for balena python SDK.

<a name="auth.authenticate"></a>
### Function: authenticate() ⇒ <code>str</code>

This function authenticates provided credentials information.
You should use Auth.login when possible, as it takes care of saving the Auth Token and username as well.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Balena username.
        password (str): Password.

#### Returns:
    str: Auth Token,

#### Examples:
```python
>>> balena.auth.authenticate(username='<your email>', password='<your password>')
```

<a name="auth.get_actor_id"></a>
### Function: get_actor_id() ⇒ <code>int</code>

Get current logged in actor id.

#### Returns:
    int: actor id

#### Examples:
```python
# If you are logged in.
>>> balena.auth.get_actor_id()
```

<a name="auth.get_token"></a>
### Function: get_token() ⇒ <code>Optional[str]</code>

This function retrieves Auth Token.

#### Returns:
    str: Auth Token.

#### Examples:
```python
>>> balena.auth.get_token()
```

<a name="auth.get_user_info"></a>
### Function: get_user_info() ⇒ <code>UserInfo</code>

Get current logged in user's info

#### Returns:
    UserInfo: user info.

#### Examples:
```python
# If you are logged in as a user.
>>> balena.auth.get_user_info()
```

<a name="auth.is_logged_in"></a>
### Function: is_logged_in() ⇒ <code>bool</code>

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

<a name="auth.login"></a>
### Function: login() ⇒ <code>None</code>

This function is used for logging into balena using email and password.

#### Args:
    **credentials: credentials keyword arguments.
        username (str): Balena email.
        password (str): Password.

#### Examples:
```python
>>> from balena import Balena
... balena = Balena()
... credentials = {'username': '<your email>', 'password': '<your password>'}
... balena.auth.login(**credentials)
... # or
... balena.auth.login(username='<your email>', password='<your password>')
```

<a name="auth.login_with_token"></a>
### Function: login_with_token(token) ⇒ <code>None</code>

This function is used for logging into balena using Auth Token.
Auth Token can be found in Preferences section on balena Dashboard.

#### Args:
    token (str): Auth Token.

#### Returns:
    This functions saves Auth Token to Settings and returns nothing.

#### Examples:
```python
>>> from balena import Balena
>>> balena = Balena()
>>> auth_token = <your token>
>>> balena.auth.login_with_token(auth_token)
```

<a name="auth.logout"></a>
### Function: logout() ⇒ <code>None</code>

This function is used for logging out from balena.

#### Examples:
```python
# If you are logged in.
>>> balena.auth.logout()
```

<a name="auth.register"></a>
### Function: register() ⇒ <code>str</code>

This function is used for registering to balena.

#### Args:
    **credentials: credentials keyword arguments.
        email (str): email to register.
        password (str): Password.

#### Returns:
    str: Auth Token for new account.

#### Examples:
```python
>>> credentials = {'email': '<your email>', 'password': '<your password>'}
>>> balena.auth.register(**credentials)
```

<a name="auth.whoami"></a>
### Function: whoami() ⇒ <code>Union[UserKeyWhoAmIResponse, ApplicationKeyWhoAmIResponse, DeviceKeyWhoAmIResponse, None]</code>

Return current logged in username.

#### Returns:
    Optional[WhoamiResult]: current logged in information

#### Examples:
```python
>>> balena.auth.whoami()
```
## TwoFactorAuth

This class implements basic 2FA functionalities for balena python SDK.

<a name="twofactorauth.challenge"></a>
### Function: challenge(code) ⇒ <code>None</code>

Challenge two-factor authentication.
If your account has two-factor authentication enabled and logging in using credentials,
you need to pass two-factor authentication before being allowed to use other functions.

#### Args:
    code (str): two-factor authentication code.

#### Examples:
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

<a name="twofactorauth.disable"></a>
### Function: disable(password) ⇒ <code>str</code>

Disable two factor authentication.
__Note__: Disable will only work when using a token that has 2FA enabled.

#### Args:
    password (str): password.

#### Returns:
    str: session token.

#### Examples:
```python
>>> balena.twofactor_auth.disable('your_password')
```

<a name="twofactorauth.enable"></a>
### Function: enable(code) ⇒ <code>str</code>

Enable two factor authentication.

#### Args:
    code (str): two-factor authentication code.

#### Returns:
    str: session token.

#### Examples:
```python
>>> balena.twofactor_auth.enable('123456')
```

<a name="twofactorauth.get_setup_key"></a>
### Function: get_setup_key() ⇒ <code>str</code>

Retrieves a setup key for enabling two factor authentication.
This value should be provided to your 2FA app in order to get a token.
This function only works if you disable two-factor authentication or log in using Auth Token from dashboard.

#### Returns:
    str: setup key.

#### Examples:
```python
>>> balena.twofactor_auth.get_setup_key()
```

<a name="twofactorauth.is_enabled"></a>
### Function: is_enabled() ⇒ <code>bool</code>

Check if two-factor authentication is enabled.

#### Returns:
    bool: True if enabled. Otherwise False.

#### Examples:
```python
>>> balena.twofactor_auth.is_enabled()
```

<a name="twofactorauth.is_passed"></a>
### Function: is_passed() ⇒ <code>bool</code>

Check if two-factor authentication challenge was passed.
If the user does not have 2FA enabled, this will be True.

#### Returns:
    bool: True if passed. Otherwise False.

#### Examples:
```python
>>> balena.twofactor_auth.is_passed()
```

<a name="twofactorauth.verify"></a>
### Function: verify(code) ⇒ <code>str</code>

Verifies two factor authentication.
Note that this method not update the token automatically.
You should use balena.twofactor_auth.challenge() when possible, as it takes care of that as well.

#### Args:
    code (str): two-factor authentication code.

#### Returns:
    str: session token.

#### Examples:
```python
>>> balena.twofactor_auth.verify('123456')
```
## Logs

This class implements functions that allow processing logs from device.

<a name="logs.history"></a>
### Function: history(uuid_or_id, count) ⇒ <code>List[Log]</code>

Get device logs history.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    count (Optional[Union[int, Literal["all"]]]): number of historical messages to include.

<a name="logs.stop"></a>
### Function: stop() ⇒ <code>None</code>

Will grecefully unsubscribe from all devices and stop the consumer thread.

<a name="logs.subscribe"></a>
### Function: subscribe(uuid_or_id, callback, error, count) ⇒ <code>None</code>

Subscribe to device logs.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)
    callback (Callable[[Log], None]): this callback is called on receiving a message.
    error (Optional[Callable[[Any], None]]): this callback is called on an error event.
    count (Optional[Union[int, Literal["all"]]]): number of historical messages to include.

<a name="logs.unsubscribe"></a>
### Function: unsubscribe(uuid_or_id) ⇒ <code>None</code>

Unsubscribe from device logs for a specific device.

#### Args:
    uuid_or_id (Union[str, int]): device uuid (string) or id (int)

<a name="logs.unsubscribe_all"></a>
### Function: unsubscribe_all() ⇒ <code>None</code>

Unsubscribe all subscribed devices.
## Settings

Create a module object.

The name must be a string; the optional doc argument can have any type.
## Types
### APIKeyInfoType


```python
{
    "name": str,
    "description": Optional[str],
    "expiry_date": Optional[str]
}
```


### APIKeyType


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


### ActorType


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


### ApplicationHostedOnApplication


```python
{
    "application": Union[List[TypeApplication], PineDeferred],
    "can_use__application_as_host": Union[List[TypeApplication], PineDeferred]
}
```


### ApplicationInviteType


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


### ApplicationMembershipRoleType


```python
{
    "id": int,
    "name": Literal["developer", "operator", "observer"]
}
```


### ApplicationMembershipType


```python
{
    "id": int,
    "user": Union[List[UserType], PineDeferred],
    "is_member_of__application": Union[List[TypeApplication], PineDeferred],
    "application_membership_role": Union[List[ApplicationMembershipRoleType], PineDeferred]
}
```


### ApplicationType


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


### BaseTagType


```python
{
    "id": int,
    "tag_key": str,
    "value": str
}
```


### BasicUserInfoType


```python
{
    "id": int,
    "username": str
}
```


### CpuArchitectureType


```python
{
    "id": int,
    "slug": str,
    "is_supported_by__device_type": Optional[List[CpuArchitectureType]]
}
```


### CreditBundleType


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


### DeviceFamilyType


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


### DeviceHistoryType


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


### DeviceManufacturerType


```python
{
    "created_at": str,
    "modified_at": str,
    "id": int,
    "slug": str,
    "name": str
}
```


### DeviceMetricsType


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


### DeviceTypeAliasType


```python
{
    "id": int,
    "is_referenced_by__alias": str,
    "references__device_type": Union[List[DeviceTypeType], PineDeferred]
}
```


### DeviceTypeType


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


### EnvironmentVariableBase


```python
{
    "id": int,
    "name": str,
    "value": str
}
```


### ImageBasicInfoType


```python
{
    "id": int,
    "service_name": str
}
```


### ImageInstallType


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


### ImageType


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


### InviteeType


```python
{
    "id": int,
    "created_at": str,
    "email": str
}
```


### OrganizationInviteType


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


### OrganizationMembershipRoleType


```python
{
    "id": int,
    "name": Literal["administrator", "member"]
}
```


### OrganizationMembershipTagType


```python
{
    "organization_membership": Union[List[OrganizationMembershipType], PineDeferred]
}
```


### OrganizationMembershipType


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


### OrganizationPrivateDeviceTypeAccess


```python
{
    "id": int,
    "organization": Union[List[OrganizationType], PineDeferred],
    "has_private_access_to__device_type": Union[List[TypeDevice], PineDeferred]
}
```


### OrganizationType


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


### PineDeferred


```python
{
    "_PineDeferred__id": int
}
```


### PublicDeviceType


```python
{
    "latitude": str,
    "longitude": str,
    "belongs_to__application": Union[List[TypeApplication], PineDeferred],
    "is_of__device_type": Union[List[TypeDevice], PineDeferred],
    "was_recently_online": bool
}
```


### PublicOrganizationType


```python
{
    "id": int,
    "name": str,
    "handle": str
}
```


### ReleaseImageType


```python
{
    "id": int,
    "created_at": str,
    "image": Union[List[ImageType], PineDeferred],
    "is_part_of__release": Union[List[ReleaseType], PineDeferred]
}
```


### ReleaseType


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


### ReleaseVersion


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


### ReleaseWithImageDetailsType


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


### SSHKeyType


```python
{
    "title": str,
    "public_key": str,
    "id": int,
    "created_at": str,
    "user": Union[List[UserType], PineDeferred]
}
```


### ServiceInstanceType


```python
{
    "id": int,
    "created_at": str,
    "service_type": str,
    "ip_address": str,
    "last_heartbeat": str
}
```


### ServiceType


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


### TeamApplicationAccessType


```python
{
    "id": int,
    "team": Union[List[TeamType], PineDeferred],
    "grants_access_to__application": Union[List[TypeApplication], PineDeferred],
    "application_membership_role": Union[List[ApplicationMembershipRoleType], PineDeferred]
}
```


### TeamMembershipType


```python
{
    "id": int,
    "created_at": str,
    "user": Union[List[UserType], PineDeferred],
    "is_member_of__team": Union[List[TeamType], PineDeferred]
}
```


### TeamType


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


### TypeApplication


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


### TypeApplicationWithDeviceServiceDetails


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


### TypeCurrentService


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


### TypeDevice


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


### TypeDeviceWithServices


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


### TypeVar


```python
{

}
```


### TypedDict


```python
{

}
```


### UserType


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


### WebResource


```python
{
    "filename": str,
    "href": str,
    "content_type": str,
    "content_disposition": str,
    "size": int
}
```


