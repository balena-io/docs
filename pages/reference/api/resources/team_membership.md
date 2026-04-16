# Team Membership

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `user` |
| `is_member_of__team` |


---
## Examples 

### Get team membership of users

```bash
GET "https://api.balena-cloud.com/v7/team_membership" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

