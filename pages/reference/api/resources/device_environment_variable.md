# Device Environment Variable

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `device` |
| `name` |
| `value` |


---
## Examples 

### Get all device environment variables for a device by UUID

```bash
GET "https://api.balena-cloud.com/v7/device_environment_variable?\$filter=device/any(d:d/uuid%20eq%20'<DEVICE_UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all device environment variables for a device by ID

```bash
GET "https://api.balena-cloud.com/v7/device_environment_variable?\$filter=device%20eq%20<DEVICE ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a device environment variable

```bash
POST "https://api.balena-cloud.com/v7/device_environment_variable" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "device": "<DEVICE ID>",
    "name": "<NAME>",
    "value": "<VALUE>"
}'
```

### Update a device environment variable

```bash
PATCH "https://api.balena-cloud.com/v7/device_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Remove a device environment variable

```bash
DELETE "https://api.balena-cloud.com/v7/device_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

