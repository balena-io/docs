# Organization

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `name` |
| `handle` |
| `company_name` |
| `website` |
| `industry` |
| `billing_account_code` |


---
## Examples 

### Get all organizations associated with authenticated user

```bash
GET "https://api.balena-cloud.com/v7/organization" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get organization by ID

```bash
GET "https://api.balena-cloud.com/v7/organization(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get organization by handle

Uniquely identifies an organization. Handles are currently automatically generated and read-only.

```bash
GET "https://api.balena-cloud.com/v7/organization(handle='<HANDLE>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

