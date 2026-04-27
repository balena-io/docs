# Who am I

## Available Fields

| Field |
| :--- |
| `id` |
| `username` |
| `email` |


---
## Examples 

### Get user associated with token

```bash
GET "https://api.balena-cloud.com/user/v1/whoami" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

