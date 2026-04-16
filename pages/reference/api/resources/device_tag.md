# Device tag

## Available Fields

| Field |
| :--- |
| `id` |
| `device` |
| `tag_key` |
| `value` |


---
## Examples 

### Get all tags by device UUID

```bash
GET "https://api.balena-cloud.com/v7/device_tag?\$filter=device/uuid%20eq%20'<UUID>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a new device tag

```bash
POST "https://api.balena-cloud.com/v7/device_tag" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "device": "<DEVICE ID>",
    "tag_key": "<KEY>",
    "value": "<VALUE>"
}'
```

### Update a device tag

```bash
PATCH "https://api.balena-cloud.com/v7/device_tag(device=<DEVICE_ID>,tag_key='<EXISTING-KEY>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW-VALUE>"
}'
```

### Delete a device tag given its database ID

```bash
DELETE "https://api.balena-cloud.com/v7/device_tag(<TAG-ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

