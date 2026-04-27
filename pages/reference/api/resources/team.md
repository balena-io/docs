# Team

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `name` |
| `description` |
| `belongs_to__organization` |


---
## Examples 

### Get all teams associated with user

```bash
GET "https://api.balena-cloud.com/v7/team" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get team by ID

```bash
GET "https://api.balena-cloud.com/v7/team(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Delete team with ID

```bash
Delete "https://api.balena-cloud.com/v7/team(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a new team in organization

```bash
POST "https://api.balena-cloud.com/v7/team" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "name": "<TEAM NAME>",
    "belongs_to__organization": "<ORG ID>"
}'
```

