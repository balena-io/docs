# Fleet

## Available Fields

| Field |
| :--- |
| `id` |
| `uuid` |
| `organization` |
| `actor` |
| `app_name` |
| `slug` |
| `should_be_running__release` |
| `application_type` |
| `is_for__device_type` |
| `should_track_latest_release` |
| `is_accessible_by_support_until__date` |
| `is_public` |
| `is_host` |
| `is_archived` |
| `is_discoverable` |
| `is_stored_at__repository_url` |
| `created_at` |


---
## Examples 

### Get all fleets of an organization by its HANDLE

```bash
GET "https://api.balena-cloud.com/v7/application?\$filter=organization/any(o:o/handle%20eq%20%27<ORG_HANDLE>%27)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all fleets

Note: This will also include all public fleets of the platform. In most cases retrieving the fleets by their organization will be preferable.

```bash
GET "https://api.balena-cloud.com/v7/application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all fleets associated with authenticated user

```bash
GET "https://api.balena-cloud.com/v7/application?\$filter=is_directly_accessible_by__user/any(dau:true)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get fleet by ID

```bash
GET "https://api.balena-cloud.com/v7/application(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get fleet by SLUG

```bash
GET "https://api.balena-cloud.com/v7/application(slug='<SLUG>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get fleet by name

```bash
GET "https://api.balena-cloud.com/v7/application?\$filter=app_name%20eq%20'<NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get fleet by SLUG along with its devices

```bash
GET "https://api.balena-cloud.com/v7/application(slug='<SLUG>')?\$expand=owns__device" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get fleet by id along with its devices

```bash
GET "https://api.balena-cloud.com/v7/application(<ID>)?\$expand=owns__device" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Filter public fleets from result

```bash
GET "https://api.balena-cloud.com/v7/application?\$filter=is_public%20eq%20false" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create fleet

To retrieve the numeric ORGANIZATION_ID & DEVICE_TYPE_ID, check the respective documentation page for the organization & device type resources.

```bash
POST "https://api.balena-cloud.com/v7/application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "app_name": "<NAME>",
    "organization": <ORGANIZATION_ID>,
    "is_for__device_type": <DEVICE_TYPE_ID>
}'
```

### Delete fleet

```bash
DELETE "https://api.balena-cloud.com/v7/application(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get the target release of a fleet

```bash
GET "https://api.balena-cloud.com/v7/application(slug='<SLUG>')?\$select=should_be_running__release" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Pin entire fleet to a specific release by ID

```bash
PATCH "https://api.balena-cloud.com/v7/application(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_be_running__release": "<RELEASE ID>"
    "should_track_latest_release": false
}'
```

### Pin entire fleet to a specific release by SLUG

```bash
PATCH "https://api.balena-cloud.com/v7/application(slug='<SLUG>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_be_running__release": "<RELEASE ID>"
    "should_track_latest_release": false
}'
```

### Disable automatic update tracking for a fleet

```bash
PATCH "https://api.balena-cloud.com/v7/application(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_track_latest_release": "false"
}'
```

### Enable automatic update tracking for a fleet

```bash
PATCH "https://api.balena-cloud.com/v7/application(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "should_track_latest_release": "true"
}'
```

