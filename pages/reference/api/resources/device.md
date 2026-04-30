# Device

## Available Fields

| Field |
| :--- |
| `id` |
| `belongs_to__application` |
| `belongs_to__user` |
| `actor` |
| `device_name` |
| `is_of__device_type` |
| `uuid` |
| `is_running__release` |
| `is_pinned_on__release` |
| `should_be_running__release` |
| `note` |
| `local_id` |
| `status` |
| `overall_status` |
| `is_online` |
| `last_connectivity_event` |
| `is_connected_to_vpn` |
| `last_vpn_event` |
| `ip_address` |
| `mac_address` |
| `public_address` |
| `os_version` |
| `os_variant` |
| `should_be_operated_by__release` |
| `supervisor_version` |
| `should_be_managed_by__release` |
| `is_managed_by__service_instance` |
| `provisioning_progress` |
| `provisioning_state` |
| `download_progress` |
| `is_web_accessible` |
| `longitude` |
| `latitude` |
| `location` |
| `custom_longitude` |
| `custom_latitude` |
| `is_locked_until__date` |
| `is_accessible_by_support_until__date` |
| `created_at` |
| `is_active` |
| `api_heartbeat_state` |
| `memory_usage` |
| `memory_total` |
| `storage_block_device` |
| `storage_usage` |
| `storage_total` |
| `cpu_temp` |
| `cpu_usage` |
| `cpu_id` |
| `is_undervolted` |


---
## Examples 

### Get all devices

```bash
GET "https://api.balena-cloud.com/v7/device" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all devices by fleet

```bash
GET "https://api.balena-cloud.com/v7/device?\$filter=belongs_to__application%20eq%20'<FLEET ID>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get device by ID

```bash
GET "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get device by UUID

```bash
GET "https://api.balena-cloud.com/v7/device(uuid='<UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get multiple devices by UUID

```bash
GET "https://api.balena-cloud.com/v7/device?\$filter=uuid%20in%20(%27<UUID1>%27,%27<UUID2>%27,%27<UUID3>%27)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get the device overall_status field

The overall_status field is returned only when explicitly requested with $select.

```bash
GET "https://api.balena-cloud.com/v7/device(<ID>)?\$select=overall_status" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get the release currently running on a device

```bash
GET "https://api.balena-cloud.com/v7/device(<ID>)?\$select=is_running__release" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get the release a device is pinned to

Note: is_pinned_on__release will be null/not set if the device isn't pinned to any release, in which case the device will be tracking the release of the application it belongs to.

```bash
GET "https://api.balena-cloud.com/v7/device(<ID>)?\$select=is_pinned_on__release" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Pin device to a specific release by ID

```bash
PATCH "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "is_pinned_on__release": <RELEASE ID>
}'
```

### Pin device to a specific release by UUID

```bash
PATCH "https://api.balena-cloud.com/v7/device(uuid='<UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "is_pinned_on__release": <RELEASE ID>
}'
```

### Get the target release of a device

This will be the release that the device is pinned to, or the target release of the fleet for non-pinned devices.

```bash
GET "https://api.balena-cloud.com/v7/device(uuid='<UUID>')?\$select=should_be_running__release" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Mark a device to be updated to a specific supervisor release

To request a list of available supervisor releases, check the 'List Supervisor releases' documentation page.

```bash
PATCH "https://api.balena-cloud.com/v7/device(uuid='<UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_be_managed_by__release": <SUPERVISOR RELEASE ID>
}'
```

### Mark a device to be updated to a specific OS release

This endpoint relies on the Experimental Queued OS updates feature.
To request a list of available OS releases, check the 'List balenaOS releases' documentation page.

```bash
PATCH "https://api.balena-cloud.com/v7/device(uuid='<UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_be_operated_by__release": <OS RELEASE ID>
}'
```

### Rename device

```bash
PATCH "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "device_name": "<NEW NAME>"
}'
```

### Delete device

```bash
DELETE "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Add note to a device

```bash
PATCH "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "note": "<NEW NOTE>"
}'
```

### Move device to another fleet

```bash
PATCH "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "belongs_to__application": "<FLEET ID>"
}'
```

### Deactivate an offline device (CHARGEABLE)

```bash
PATCH "https://api.balena-cloud.com/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "is_active": false
}'
```

