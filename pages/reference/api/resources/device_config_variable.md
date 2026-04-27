# Device config variable

## Available Fields

| Field |
| :--- |
| `id` |
| `device` |
| `value` |
| `name` |


---
## Examples 

### Get all device config variables for a device

```bash
GET "https://api.balena-cloud.com/v7/device_config_variable?\$filter=device%20eq%20<DEVICE ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a device config variable

```bash
POST "https://api.balena-cloud.com/v7/device_config_variable" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "device": "<DEVICE ID>",
    "name": "<NAME>",
    "value": "<VALUE>"
}'
```

### Update a device config variable

```bash
PATCH "https://api.balena-cloud.com/v7/device_config_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Remove a device config variable

```bash
DELETE "https://api.balena-cloud.com/v7/device_config_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

