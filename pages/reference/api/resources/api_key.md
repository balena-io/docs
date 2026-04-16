# API key

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `is_of__actor` |
| `name` |
| `description` |


---
## Examples 

### Get all API keys

```bash
GET "https://api.balena-cloud.com/v7/api_key" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all API keys of a device by UUID

```bash
GET "https://api.balena-cloud.com/v7/api_key?\$filter=is_of__actor/any(a:a/is_of__device/any(d:d/uuid%20eq%20'<DEVICE_UUID>'))" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all API keys of an application by slug

```bash
GET "https://api.balena-cloud.com/v7/api_key?\$filter=is_of__actor/any(a:a/is_of__application/any(ioa:ioa/slug%20eq%20'<SLUG>'))" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all user API keys for the authenticated user

```bash
GET "https://api.balena-cloud.com/v7/api_key?\$filter=is_of__actor/any(a:a/is_of__user%20eq%20<USER_ID>))" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Update the expiry date for an API Key

Note: Select a date in the past to expire an API Key immediately.

```bash
PATCH "https://api.balena-cloud.com/v7/api_key(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "expiry_date": "<ISO_8601_DATE_TIME>"
}'
```

### Clear the expiry date of an API Key

```bash
PATCH "https://api.balena-cloud.com/v7/api_key(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "expiry_date": null
}'
```

### Create new API key

```bash
POST "https://api.balena-cloud.com/api-key/user/full" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "name": "<NAME>",
    "description": "<DESCRIPTION>"
}'
```

