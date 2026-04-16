# Fleet tag

## Available Fields

| Field |
| :--- |
| `id` |
| `application` |
| `tag_key` |
| `value` |


---
## Examples 

### Get all tags by fleet name

```bash
GET "https://api.balena-cloud.com/v7/application_tag?\$filter=application/app_name%20eq%20'<NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a new fleet tag

```bash
POST "https://api.balena-cloud.com/v7/application_tag" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "application": "<FLEET ID>",
    "tag_key": "<KEY>",
    "value": "<VALUE>"
}'
```

### Update a fleet tag

```bash
PATCH "https://api.balena-cloud.com/v7/application_tag/(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Delete a fleet tag

```bash
DELETE "https://api.balena-cloud.com/v7/application_tag/(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

