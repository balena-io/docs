# Device service variable

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `service_install` |
| `value` |
| `name` |


---
## Examples 

### Get all service variables for a device by UUID

```bash
GET "https://api.balena-cloud.com/v7/device_service_environment_variable?\$filter=service_install/any(si:si/device/any(d:d/uuid%20eq%20'<DEVICE_UUID>'))" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all service variables for a device by UUID, including the service name

```bash
GET "https://api.balena-cloud.com/v7/device_service_environment_variable?\$filter=service_install/any(si:si/device/any(d:d/uuid%20eq%20'<DEVICE_UUID>'))&\$expand=service_install(\$expand=installs__service(\$select=id,service_name))" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all service variables for a device by ID

```bash
GET "https://api.balena-cloud.com/v7/device_service_environment_variable?\$filter=service_install/device%20eq%20<DEVICE ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a device service variable

```bash
POST "https://api.balena-cloud.com/v7/device_service_environment_variable" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "service_install": "<SERVICE INSTALL ID>",
    "name": "<NAME>",
    "value": "<VALUE>"
}'
```

### Update a device service variable

```bash
PATCH "https://api.balena-cloud.com/v7/device_service_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Remove a device service variable

```bash
DELETE "https://api.balena-cloud.com/v7/device_service_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

