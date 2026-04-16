# Service

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `application` |
| `service_name` |


---
## Examples 

### Get all services belonging to a fleet

```bash
GET "https://api.balena-cloud.com/v7/service?\$filter=application/app_name%20eq%20'<FLEET NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

