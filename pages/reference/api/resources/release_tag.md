# Release tag

## Available Fields

| Field |
| :--- |
| `id` |
| `release` |
| `tag_key` |
| `value` |


---
## Examples 

### Get all tags by release commit

```bash
GET "https://api.balena-cloud.com/v7/release_tag?\$filter=release/commit%20eq%20'<COMMIT>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Create a new release tag

```bash
POST "https://api.balena-cloud.com/v7/release_tag" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" \
--data '{
    "release": "<RELEASE ID>",
    "tag_key": "<KEY>",
    "value": "<VALUE>"
}'
```

