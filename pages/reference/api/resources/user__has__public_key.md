# SSH key

## Available Fields

| Field |
| :--- |
| `id` |
| `user` |
| `title` |
| `public_key` |
| `created_at` |


---
## Examples 

### Get all SSH keys

```bash
GET "https://api.balena-cloud.com/v7/user__has__public_key" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get SSH key by ID

```bash
GET "https://api.balena-cloud.com/v7/user__has__public_key(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Add new SSH key to account

```bash
POST "https://api.balena-cloud.com/v7/user__has__public_key" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "public_key": "<SSH KEY>",
    "title": "<TITLE>",
    "user": "<USER ID>"
}'
```

### Remove SSH key

```bash
DELETE "https://api.balena-cloud.com/v7/user__has__public_key(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

