# Fleet service variable

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

### Get all fleet service variables for a service

```bash
GET "https://api.balena-cloud.com/v7/service_environment_variable?\$filter=service%20eq%20<SERVICE ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a fleet service variable

```bash
POST "https://api.balena-cloud.com/v7/service_environment_variable" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "service": "<SERVICE ID>",
    "name": "<NAME>",
    "value": "<VALUE>"
}'
```

### Update a device service variable

```bash
PATCH "https://api.balena-cloud.com/v7/service_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Remove a fleet service variable

```bash
DELETE "https://api.balena-cloud.com/v7/service_environment_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

