# List balenaOS releases

## Examples 

### List the supported balenaOS versions for a device type

To request a list of the supported balenaOS versions for a particular device type, the `DEVICE TYPE SLUG` parameter is required. Even though this query only selects the `raw_version` field, you can additionally specify any of the fields found in the release resource. The Authorization header is optional.

```bash
GET "https://api.balena-cloud.com/v7/release?\$select=raw_version&\$filter=(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false)%20and%20(status%20eq%20'success')%20and%20(semver_major%20gt%200)%20and%20(belongs_to__application/any(bta:(bta/is_host%20eq%20true)%20and%20(bta/is_for__device_type/any(dt:dt/slug%20eq%20'<DEVICE TYPE SLUG>'))))&\$orderby=semver_major%20desc,semver_minor%20desc,semver_patch%20desc,revision%20desc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### List the supported balenaOS versions for a private device type

Same as above, but in order to access private device types, you must provide an authentication token.

```bash
GET "https://api.balena-cloud.com/v7/release?\$select=raw_version&\$filter=(is_final%20eq%20true)%20and%20(is_invalidated%20eq%20false)%20and%20(status%20eq%20'success')%20and%20(semver_major%20gt%200)%20and%20(belongs_to__application/any(bta:(bta/is_host%20eq%20true)%20and%20(bta/is_for__device_type/any(dt:dt/slug%20eq%20'<DEVICE TYPE SLUG>'))))&\$orderby=semver_major%20desc,semver_minor%20desc,semver_patch%20desc,revision%20desc" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

