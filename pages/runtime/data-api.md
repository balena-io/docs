# Data API Service

## Introduction
Resin's Data API Service constitutes a central node in resin architecture, since it provides interconnection between resin services and communication with the database. At the same time, it exposes an HTTP interface, based on Open Data ([OData](http://www.odata.org)) format, that provides a means to the user to interact with resin resources and fetch or update information regarding their applications, devices and environment variables.

This document aims to describe the endpoints that are provided by the Data API, as well as showing examples of their expected usage.

The requests are expected to follow the OData format, and the responses are provided in JSON format. The authorization token that is required in each request can be found under 'Preferences' in the user's dashboard.

### Base URL
The base URL for accessing the Data API is:

`{{ $links.apiBase }}`

Building the full URLs for accessing resources requires to append the corresponding endpoints to the base URL.

## Interacting with resources

### Resource: Application
#### Get all applications
* Summary: Get all applications along with the corresponding information (application name, id, device type, git repository, latest commit)
* Endpoint: `/application`
* Method: `GET`
* cURL Example:

```
curl "{{ $links.apiBase }}application"
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth token>"
```

#### Get application by ID
* Summary: Get a single application by ID
* Endpoint: `/application(<ID>)`
* Method: `GET`

Param | Type | Description
-------|------|------------:
ID | `INTEGER` | application ID

* cURL Example:

```
curl "{{ $links.apiBase }}application(<ID>)"
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Get application by name
* Summary: Get application with the specified name
* Endpoint: `/application?$filter=app_name eq '<name>'`
* Method: `GET`

Param | Type | Description
------|------|------------:
name | `STRING` | application name

* cURL Example:

```
curl "{{ $links.apiBase }}application?\$filter=app_name%20eq%20'<name>'" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Create application
* Summary: Create an application by specifying the name and the device type.
* Endpoint: `/application`
* Method: `POST` 


Payload | Type | Description
------|------|------------:
app_name | `STRING` | application name
device_type | `STRING` | device type

* cURL Example:

```
curl -X POST '{{ $links.apiBase }}application' 
-H 'Content-Type: application/json' 
-H 'Authorization: Bearer <auth_token>' 
--data '{"app_name":"<name>", 
		  "device_type":"<device type>"}'
```

*The available device types are:*

Device name| Device type
-------|-----:
Samsung Artik 10 (BETA) | [artik10](https://github.com/resin-os/resin-artik)
Samsung Artik 5 (BETA) | [artik5](https://github.com/resin-os/resin-artik)
BeagleBone Black | [beaglebone-black](https://github.com/resin-os/resin-beaglebone)
Hummingboard | [hummingboard](https://github.com/resin-os/resin-fsl-arm)
Intel Edison | [intel-edison](https://github.com/resin-os/resin-edison)
Intel NUC | [intel-nuc](https://github.com/resin-os/resin-intel)
Nitrogen 6X | [nitrogen6x](https://github.com/resin-os/resin-fsl-arm)
ODROID-C1+ | [odroid-c1](https://github.com/resin-os/resin-odroid)
ODROID-XU4 | [odroid-xu4](https://github.com/resin-os/resin-odroid)
Parallella | [parallella](https://github.com/resin-os/resin-parallella)
Raspberry Pi (v1 and Zero) | [raspberry-pi](https://github.com/resin-os/resin-raspberrypi)
Raspberry Pi 2 | [raspberry-pi2](https://github.com/resin-os/resin-raspberrypi)
Raspberry Pi 3 | [raspberrypi3](https://github.com/resin-os/resin-raspberrypi)
Technologic TS-4900 (BETA) | [ts4900](https://github.com/resin-os/resin-ts)
Technologic TS-7700 (BETA) | [ts7700](https://github.com/resin-os/resin-ts)
VIA VAB 820-quad | [via-vab820-quad](https://github.com/resin-os/resin-via-arm)
Zynq ZC702 | [zynq-xz702](https://github.com/resin-os/resin-zc702)


#### Delete application
* Summary: Delete a specific application
* Endpoint: `/application(<ID>)`
* Method: `DELETE`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | application ID

* cURL Example:

```
curl -X DELETE '{{ $links.apiBase }}application(<ID>)' 
-H 'Content-Type: application/json' 
-H 'Authorization: Bearer <auth_token>'
```

### Resource: Device
#### Get all devices
* Summary: Get all devices with the corresponding information for each device
* Endpoint: `/device`
* Method: `GET`
* cURL Example:

```
curl "{{ $links.apiBase }}device" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get all devices by application
* Summary: Get all devices that belong to a specific application, given the application ID
* Endpoint: `/application(<ID>)?$expand=device`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | application ID

* cURL Example:

```
curl "{{ $links.apiBase }}application(<ID>)?\$expand=device" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get device by ID
* Summary: Get a single device by ID
* Endpoint: `/device(<ID>)`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get device by name
* Summary: Get device with the specified name
* Endpoint: `/device?$filter=name eq '<name>'`
* Method: `GET`

Param | Type | Description
------|------|------------:
name | `STRING` | device display name

* cURL Example:

```
curl "{{ $links.apiBase }}device?\$filter=name%20eq%20'<name>'" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get name
* Summary: Get device display name
* Endpoint: `/device(<ID>)?$select=name`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=name" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Get type
* Summary: Get the device type
* Endpoint: `/device(<ID>)?$select=device_type`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=device_type" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Get application
* Summary: Get the application that the device with the specified ID belongs to
* Endpoint: `/application?$filter=device/id eq <ID>`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}application?\$filter=device/id%20eq%20<ID>" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Check if device is connected to VPN
* Summary: Check if the specified device is currently online and connected to the VPN
* Endpoint: `/device(<ID>)?$select=is_online`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=is_online" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Get status
* Summary: Get the current status of the specified device
* Endpoint: `/device(<ID>)?$select=status`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=status" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Get local IP address
* Summary: Get the local IP addresses of the specified device
* Endpoint: `/device(<ID>)?$select=ip_address`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=ip_address" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Check if web accessible
* Summary: Check if the specified device is web accessible
* Endpoint: `/device(<ID>)?$select=is_web_accessible`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device(<ID>)?\$select=is_web_accessible" 
-H "Content-Type: application/json"
-H "Authorization: Bearer <auth_token>"
```

#### Identify device
* Summary: Starts a blink pattern on a LED for 15 seconds, if your device has one. Please refer to the [corresponding endpoint](/runtime/supervisor-api/#post-v1-blink) of the Agent API.

#### Rename device
* Summary: Rename the device with the specified ID, with the given new name
* Endpoint: `/device(<ID>)`
* Method: `PATCH`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

Payload | Type | Description
------|------|------------:
name | `STRING` | device new name

* cURL Example:

```
curl -X PATCH "{{ $links.apiBase }}device(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
--data '{"name": "<new_name>"}'
```

#### Delete device
* Summary: Delete a specific device
* Endpoint: `/device(<ID>)`
* Method: `DELETE`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl -X DELETE '{{ $links.apiBase }}device(<ID>)' 
-H 'Content-Type: application/json' 
-H 'Authorization: Bearer <auth_token>'
```

#### Add note
* Summary: Add note to a specific device
* Endpoint: `/device(<ID>)`
* Method: `PATCH`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

Payload | Type | Description
------|------|------------:
note | `STRING` | device new note

* cURL Example:

```
curl -X PATCH "{{ $links.apiBase }}device(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
--data '{"note": "<new note>"}'
```

#### Restart application
* Summary: Restart application container. Please refer to the [corresponding endpoint](/runtime/supervisor-api/#post-v1-restart) of the Agent API.

#### Reboot
* Summary: Reboot the device. Please refer to the [corresponding endpoint](/runtime/supervisor-api/#post-v1-reboot) of the Agent API.


#### Shutdown
* Summary: Shut down the device. Please refer to the [corresponding endpoint](/runtime/supervisor-api/#post-v1-shutdown) of the Agent API.

#### Move device
* Summary: Move the specified device to another application, given the application ID
* Endpoint: `/device(<ID>)`
* Method: `PATCH`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

Payload | Type | Description
------|------|------------:
application | `INTEGER` | application ID

* cURL Example:

```
curl -X PATCH "{{ $links.apiBase }}device(<ID>)"
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
--data '{"application": <appID>}'
```

### Resource: Key
#### Get all keys
* Summary: Get all ssh keys
* Endpoint: `/user__has__public_key`
* Method: `GET`
* cURL Example:

```
curl "{{ $links.apiBase }}user__has__public_key" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get key by ID
* Summary: Get a single ssh key by ID
* Endpoint: `/user__has__public_key(<ID>)`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | ssh key ID

* cURL Example:

```
curl "{{ $links.apiBase}}user__has__public_key(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Create key
* Summary: Add a new ssh key to the user's account
* Endpoint: `/user__has__public_key`
* Method: `POST`


Payload | Type | Description
------|------|------------:
public_key | `STRING` | ssh key
title | `STRING` | key title
user | `INTEGER` | user ID

* cURL Example:

```
curl -X POST "{{ $links.apiBase }}user__has__public_key" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
--data '{"public_key": "<new ssh key>", 
         "title": "<key title>", 
         "user": <userID>}'
```

#### Remove key
* Summary: Delete a specific ssh key from user's account
* Endpoint: `/user__has__public_key(<ID>)`
* Method: `DELETE`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | key ID

* cURL Example:

```
curl -X DELETE "{{ $links.apiBase }}user__has__public_key(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

### Resource: Environment Variables

#### Get all device variables
* Summary: Get all environment variables of the device specified by the given id
* Endpoint: `/device_environment_variable?$filter=device eq <ID>`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | device ID

* cURL Example:

```
curl "{{ $links.apiBase }}device_environment_variable?\$filter=device%20eq%20<ID>" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Create device variable
* Summary: Create new environment variable with a given name and value, for the given device
* Endpoint: `/device_environment_variable`
* Method: `POST`


Payload | Type | Description
------|------|------------:
device | `INTEGER` | device ID
env_var_name | `STRING` | variable name
value | `STRING` | variable value

* cURL Example:

```
curl -X POST "{{ $links.apiBase }}device_environment_variable" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
--data '{"device": <deviceID>, 
         "env_var_name": "<name>", 
         "value": "<value>"}'
```

#### Update device variable
* Summary: Update a device environment variable with a new value, given the ID of the variable
* Endpoint: `/device_environment_variable(<ID>)`
* Method: `PATCH`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | environment variable ID

Payload | Type | Description
------|------|------------:
value | `STRING` | new variable value

* cURL Example:

```
curl -X PATCH "{{ $links.apiBase }}device_environment_variable(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
--data '{"value: "<new value>"}'
```

#### Delete device variable
* Summary: Remove a device environment variable with a specified ID
* Endpoint: `/device_environment_variable(<ID>)`
* Method: `DELETE`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | environment variable ID

* cURL Example:

```
curl -X DELETE "{{ $links.apiBase }}device_environment_variable(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```

#### Get all application variables
* Summary: Get all environment variables of the application specified by application ID
* Endpoint: `/environment_variable?$filter=application eq <ID>`
* Method: `GET`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | application ID

* cURL Example:

```
curl "{{ $links.apiBase }}environment_variable?\$filter=application%20eq%20<ID>" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
```

#### Create application variable
* Summary: Create new environment variable with a given name and value, for the given application
* Endpoint: `/environment_variable`
* Method: `POST`


Payload | Type | Description
------|------|------------:
application | `INTEGER` | application ID
name | `STRING` | variable name
value | `STRING` | variable value

* cURL Example:

```
curl -X POST "{{ $links.apiBase }}environment_variable" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>" 
--data '{"application": <appID>, 
         "name": "<name>", 
         "value": "<value>"}'
```

#### Update application variable
* Summary: Update an application environment variable with a new value, given the ID of the variable
* Endpoint: `/environment_variable(<ID>)`
* Method: `PATCH`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | environment variable ID

* cURL Example:

```
curl -X PATCH "{{ $links.apiBase }}environment_variable(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
--data '{"value: "<new value>"}'
```

#### Delete application variable
* Summary: Remove an application environment variable with a specified ID
* Endpoint: `/environment_variable(<ID>)`
* Method: `DELETE`

Param | Type | Description
------|------|------------:
ID | `INTEGER` | environment variable ID

* cURL Example:

```
curl -X DELETE "{{ $links.apiBase }}environment_variable(<ID>)" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer <auth_token>"
```
