# Device type

## Available Fields

| Field |
| :--- |
| `id` |
| `slug` |
| `name` |
| `is_private` |
| `is_of__cpu_architecture` |
| `belongs_to__device_family` |


---
## Examples 

### Get a device type by its ID

When querying a private device type it's necessary to include your bearer token. For public device types the auth header is optional.

```bash
GET "https://api.balena-cloud.com/v7/device_type(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get a device type by its SLUG

When querying a private device type it's necessary to include your bearer token. For public device types the auth header is optional.

```bash
GET "https://api.balena-cloud.com/v7/device_type(slug='<DEVICE TYPE SLUG>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get a device type by its NAME

When querying a private device type it's necessary to include your bearer token. For public device types the auth header is optional.

```bash
GET "https://api.balena-cloud.com/v7/device_type?\$filter=name%20eq%20'<DEVICE TYPE NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all supported device types

When querying a private device type it's necessary to include your bearer token. For public device types the auth header is optional.

```bash
GET "https://api.balena-cloud.com/v7/device_type?\$filter=is_default_for__application/any(idfa:(idfa/is_host%20eq%20true)%20and%20(idfa/is_archived%20eq%20false)%20and%20(idfa/owns__release/any(r:(r/status%20eq%20'success')%20and%20(r/is_final%20eq%20true)%20and%20(r/is_invalidated%20eq%20false))))&\$orderby=name%20asc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

