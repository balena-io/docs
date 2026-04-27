# Fleet config variable

## Available Fields

| Field |
| :--- |
| `id` |
| `application` |
| `name` |
| `value` |


---
## Examples 

### Get all fleet config variables for a fleet

```bash
GET "https://api.balena-cloud.com/v7/application_config_variable?\$filter=application%20eq%20<FLEET ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a fleet config variable

```bash
POST "https://api.balena-cloud.com/v7/application_config_variable" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "application": "<FLEET ID>",
    "name": "<NAME>",
    "value": "<VALUE>"
}'
```

### Update a fleet environment variable

```bash
PATCH "https://api.balena-cloud.com/v7/application_config_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "value": "<NEW VALUE>"
}'
```

### Remove a fleet config variable

```bash
DELETE "https://api.balena-cloud.com/v7/application_config_variable(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

