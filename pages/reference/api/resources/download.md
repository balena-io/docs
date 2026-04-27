# Download balenaOS

## Examples 

### Download private or ESR balenaOS images

In order to download an ESR or private balenaOS image, you need to provide your bearer token. The `deviceType` and `version` parameters are required. Add an `--output` flag to provide a path for the image to be downloaded.

```bash
GET "https://api.balena-cloud.com/download?deviceType=<DEVICE NAME>&version=<BALENAOS VERSION>&fileType=.zip'" \
-H "Content-Type: application/octet-stream" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

### Download public balenaOS images

Same as above but the auth header is optional to use. The `deviceType` and `version` parameters are required. These releases also available for download on balena.io/os and the dashboard.

```bash
GET "https://api.balena-cloud.com/download?deviceType=<DEVICE NAME>&version=<BALENAOS VERSION>&fileType=.gz'" \
-H "Content-Type: application/octet-stream" \
-H "Authorization: Bearer <AUTH_TOKEN>" 
```

