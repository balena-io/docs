# Service install

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `device` |
| `installs__service` |


---
## Examples 

### Get service name for all services on a device

```bash
GET "https://api.balena-cloud.com/v7/service_install?\$filter=device/uuid%20eq%20'<DEVICE UUID>'&\$expand=installs__service(\$select=service_name)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

