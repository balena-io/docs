# Organization Membership

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `user` |
| `is_member_of__organization` |
| `organization_membership_role` |
| `effective_seat_role` |


---
## Examples 

### Get all organization memberships

```bash
GET "https://api.balena-cloud.com/v7/organization_membership" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

