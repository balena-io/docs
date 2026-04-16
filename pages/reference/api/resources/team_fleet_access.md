# Team Fleet Access

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `team` |
| `grants_access_to__application` |
| `application_membership_role` |


---
## Examples 

### Get Team's fleet access

```bash
GET "https://api.balena-cloud.com/v7/team_application_access" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

