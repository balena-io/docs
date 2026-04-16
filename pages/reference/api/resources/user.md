# User

## Available Fields

| Field |
| :--- |
| `id` |
| `actor` |
| `username` |
| `created_at` |


---
## Examples 

### Get users associated with account

```bash
GET "https://api.balena-cloud.com/v7/user" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get users associated with fleet

```bash
GET "https://api.balena-cloud.com/v7/user__is_member_of__application?\$expand=user(\$select=id,username,actor),application_membership_role(\$select=id,name,actor)&\$filter=is_member_of__application%20eq%20<ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create fleet membership

```bash
POST "https://api.balena-cloud.com/v7/user__is_member_of__application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "is_member_of_application": <ID>,
    "username": "<USERNAME>",
    "application_membership_role": <ROLE ID>
}'
```

### Delete fleet membership

```bash
DELETE "https://api.balena-cloud.com/v7/user__is_member_of__application(is_member_of__application=<ID>,user=<USER ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

