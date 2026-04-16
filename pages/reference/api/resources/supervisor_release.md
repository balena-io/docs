# List Supervisor releases

## Available Fields

| Field |
| :--- |
| `id` |
| `raw_version` |


---
## Examples 

### Get all supervisor releases for a specific cpu architecture by slug (eg amd64/rpi/armv7hf/aarch64)

To request a list of the supported supervisor releases for a particular cpu architecture, the `CPU_ARCHITECTURE_SLUG` parameter is required. Even though this query only selects the `id` and `raw_version` fields, you can additionally specify any of the fields found in the release resource. The Authorization header is optional.

```bash
GET "https://api.balena-cloud.com/v7/release?\$select=id,raw_version&\$filter=(status%20eq%20%27success%27)%20and%20(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false)%20and%20(semver_major%20gt%200)%20and%20(belongs_to__application/any(a:(startswith(a/slug,%27balena_os%2F%27)%20and%20endswith(a/slug,%27-supervisor%27))%20and%20((a/is_public%20eq%20true)%20and%20(a/is_host%20eq%20false)%20and%20(a/is_for__device_type/any(dt:dt/is_of__cpu_architecture/any(c:c/slug%20eq%20%27<CPU_ARCHITECTURE_SLUG>%27))))))&\$orderby=semver_major%20desc,semver_minor%20desc,semver_patch%20desc,revision%20desc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get all supervisor releases for a specific cpu architecture by ID

```bash
GET "https://api.balena-cloud.com/v7/release?\$select=id,raw_version&\$filter=(status%20eq%20%27success%27)%20and%20(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false)%20and%20(semver_major%20gt%200)%20and%20(belongs_to__application/any(a:(startswith(a/slug,%27balena_os%2F%27)%20and%20endswith(a/slug,%27-supervisor%27))%20and%20((a/is_public%20eq%20true)%20and%20(a/is_host%20eq%20false)%20and%20(a/is_for__device_type/any(dt:dt/is_of__cpu_architecture%20eq%20<CPU_ARCHITECTURE_ID>)))))&\$orderby=semver_major%20desc,semver_minor%20desc,semver_patch%20desc,revision%20desc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Get a specific supervisor release version for a specific cpu architecture

```bash
GET "https://api.balena-cloud.com/v7/release?\$select=id,raw_version&\$filter=(status%20eq%20%27success%27)%20and%20(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false)%20and%20(semver_major%20gt%200)%20and%20(belongs_to__application/any(a:(startswith(a/slug,%27balena_os%2F%27)%20and%20endswith(a/slug,%27-supervisor%27))%20and%20((a/is_public%20eq%20true)%20and%20(a/is_host%20eq%20false)%20and%20(a/is_for__device_type/any(dt:dt/is_of__cpu_architecture/any(c:c/slug%20eq%20%27<CPU_ARCHITECTURE_SLUG>%27))))))%20and%20(raw_version%20eq%20%27<VERSION>%27)&\$orderby=semver_major%20desc,semver_minor%20desc,semver_patch%20desc,revision%20desc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

