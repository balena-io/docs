# Release

## Available Fields

| Field |
| :--- |
| `id` |
| `created_at` |
| `belongs_to__application` |
| `is_created_by__user` |
| `raw_version` |
| `semver` |
| `semver_major` |
| `semver_minor` |
| `semver_patch` |
| `semver_prerelease` |
| `semver_build` |
| `revision` |
| `variant` |
| `commit` |
| `composition` |
| `status` |
| `source` |
| `build_log` |
| `start_timestamp` |
| `end_timestamp` |
| `update_timestamp` |
| `is_invalidated` |
| `release_version` |
| `contract` |


---
## Examples 

### Get all releases for a fleet

```bash
GET "https://api.balena-cloud.com/v7/release?\$filter=belongs_to__application%20eq%20<FLEET ID>" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get the release raw_version field

The raw_version field is returned only when explicitly requested with $select.

```bash
GET "https://api.balena-cloud.com/v7/release(<ID>)?\$select=raw_version" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get a release ID given a specific fleet and version

```bash
GET "https://api.balena-cloud.com/v7/release?\$filter=belongs_to__application%20eq%20<FLEET ID>%20and%20raw_version%20eq%20'<RAW VERSION>'&\$select=id" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get a release ID given a specific fleet and commit

```bash
GET "https://api.balena-cloud.com/v7/release?\$filter=belongs_to__application%20eq%20<FLEET ID>%20and%20commit%20eq%20'<COMMIT HASH>'&\$select=id" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

