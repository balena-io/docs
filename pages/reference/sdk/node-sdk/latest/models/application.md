# Application

`balena.models.application` : `object`

**Kind**: static namespace

***

## create

`balena.models.application.create(options)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Create an application\
**Access**: public\
**Fulfil**: `Object` - application

| Param                       | Type                 | Description                                                                                    |
| --------------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| options                     | `Object`             | application creation parameters                                                                |
| options.name                | `String`             | application name                                                                               |
| options.organization        | `String` \| `Number` | handle (string) or id (number) of the organization that the application will belong to or null |
| \[options.uuid]             | `String`             | application uuid                                                                               |
| \[options.applicationClass] | `String`             | application class: 'app' \| 'fleet' \| 'block'                                                 |
| options.deviceType          | `String`             | device type slug                                                                               |

**Example**

```js
balena.models.application.create({ name: 'My App', organization: 'myorganization', deviceType: 'raspberry-pi' }).then(function(application) {
	console.log(application);
});
```

**Example**

```js
balena.models.application.create({ name: 'My Block', organization: 'myorganization', applicationClass: 'block', deviceType: 'raspberry-pi' }).then(function(application) {
	console.log(application);
});
```

***

## disableDeviceUrls

`balena.models.application.disableDeviceUrls(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Disable device urls for all devices that belong to an application\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.disableDeviceUrls('myorganization/myapp');
```

**Example**

```js
balena.models.application.disableDeviceUrls(123);
```

***

## enableDeviceUrls

`balena.models.application.enableDeviceUrls(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Enable device urls for all devices that belong to an application\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.enableDeviceUrls('myorganization/myapp');
```

**Example**

```js
balena.models.application.enableDeviceUrls(123);
```

***

## generateProvisioningKey

`balena.models.application.generateProvisioningKey(generateProvisioningKeyParams)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Generate a device provisioning key for a specific application\
**Access**: public\
**Fulfil**: `String` - device provisioning key

| Param                                           | Type                 | Description                                                             |
| ----------------------------------------------- | -------------------- | ----------------------------------------------------------------------- |
| generateProvisioningKeyParams                   | `Object`             | an object containing the parameters for the provisioning key generation |
| generateProvisioningKeyParams.slugOrUuidOrId    | `String` \| `Number` | application slug (string), uuid (string) or id (number)                 |
| generateProvisioningKeyParams.keyExpiryDate     | `String`             | Expiry Date for provisioning key                                        |
| \[generateProvisioningKeyParams.keyName]        | `String`             | Provisioning key name                                                   |
| \[generateProvisioningKeyParams.keyDescription] | `String`             | Description for provisioning key                                        |

**Example**

```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 'myorganization/myapp', keyExpiryDate: '2030-10-12'}).then(function(key) {
	console.log(key);
});
```

**Example**

```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 123, keyExpiryDate: '2030-10-12'}).then(function(key) {
	console.log(key);
});
```

**Example**

```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 123, keyExpiryDate: '2030-10-12', keyName: 'api key name', keyDescription: 'api key long description'}).then(function(key) {
	console.log(key);
});
```

***

## get

`balena.models.application.get(slugOrUuidOrId, [options], [context])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get a single application\
**Access**: public\
**Fulfil**: `Object` - application

| Param          | Type                 | Default | Description                                               |
| -------------- | -------------------- | ------- | --------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number)   |
| \[options]     | `Object`             | `{}`    | extra pine options to use                                 |
| \[context]     | `String`             |         | extra access filters, undefined or 'directly\_accessible' |

**Example**

```js
balena.models.application.get('myorganization/myapp').then(function(application) {
	console.log(application);
});
```

**Example**

```js
balena.models.application.get('1bf99a68cf9e4266986e6dec7a6e8f46').then(function(application) {
	console.log(application);
});
```

**Example**

```js
balena.models.application.get(123).then(function(application) {
	console.log(application);
});
```

***

## getAll

`balena.models.application.getAll([options], [context])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get all applications\
**Access**: public\
**Fulfil**: `Object[]` - applications

| Param      | Type     | Default | Description                                               |
| ---------- | -------- | ------- | --------------------------------------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use                                 |
| \[context] | `String` |         | extra access filters, undefined or 'directly\_accessible' |

**Example**

```js
balena.models.application.getAll().then(function(applications) {
	console.log(applications);
});
```

***

## getAllByOrganization

`balena.models.application.getAllByOrganization(orgHandleOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get all applications of an organization\
**Access**: public\
**Fulfil**: `Object[]` - applications

| Param         | Type                 | Default | Description                                 |
| ------------- | -------------------- | ------- | ------------------------------------------- |
| orgHandleOrId | `Number` \| `String` |         | organization handle (string) or id (number) |
| \[options]    | `Object`             | `{}`    | extra pine options to use                   |

**Example**

```js
balena.models.application.getAllByOrganization('myorganization').then(function(applications) {
	console.log(applications);
});
```

**Example**

```js
const applications = await sdk.models.application.getAllByOrganization('myorganization', {
		$select: ['app_name', 'slug'],
		$expand: {
			owns__device: {
				$select: ['uuid', 'overall_status', 'is_connected_to_vpn', 'api_heartbeat_state'],
			},
		},
	});
```

***

## getAllDirectlyAccessible

`balena.models.application.getAllDirectlyAccessible([options])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get all applications directly accessible by the user\
**Access**: public\
**Fulfil**: `Object[]` - applications

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.application.getAllDirectlyAccessible().then(function(applications) {
	console.log(applications);
});
```

***

## getAppByName

`balena.models.application.getAppByName(appName, [options], [context])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get a single application using the appname and the handle of the owning organization\
**Access**: public\
**Fulfil**: `Object` - application

| Param      | Type     | Default | Description                                               |
| ---------- | -------- | ------- | --------------------------------------------------------- |
| appName    | `String` |         | application name                                          |
| \[options] | `Object` | `{}`    | extra pine options to use                                 |
| \[context] | `String` |         | extra access filters, undefined or 'directly\_accessible' |

**Example**

```js
balena.models.application.getAppByName('MyApp').then(function(application) {
	console.log(application);
});
```

***

## getDashboardUrl

`balena.models.application.getDashboardUrl(id)` ⇒ `String`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get Dashboard URL for a specific application\
**Returns**: `String` - - Dashboard URL for the specific application\
**Throws**:

* Exception if the id is not a finite number

| Param | Type     | Description    |
| ----- | -------- | -------------- |
| id    | `Number` | Application id |

**Example**

```js
balena.models.application.get('myorganization/myapp').then(function(application) {
	const dashboardApplicationUrl = balena.models.application.getDashboardUrl(application.id);
	console.log(dashboardApplicationUrl);
});
```

***

## getDirectlyAccessible

`balena.models.application.getDirectlyAccessible(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get a single application directly accessible by the user\
**Access**: public\
**Fulfil**: `Object` - application

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.getDirectlyAccessible('myorganization/myapp').then(function(application) {
	console.log(application);
});
```

**Example**

```js
balena.models.application.getDirectlyAccessible(123).then(function(application) {
	console.log(application);
});
```

***

## getTargetReleaseHash

`balena.models.application.getTargetReleaseHash(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get the hash of the current release for a specific application\
**Access**: public\
**Fulfil**: `String|undefined` - The release hash of the current release

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.getTargetReleaseHash('myorganization/myapp').then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.application.getTargetReleaseHash(123).then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.application.getTargetReleaseHash('myorganization/myapp', function(release) {
	console.log(release);
});
```

***

## getWithDeviceServiceDetails

`balena.models.application.getWithDeviceServiceDetails(slugOrUuidOrId, [options])` ⇒ `Promise`

This method does not map exactly to the underlying model: it runs a larger prebuilt query, and reformats it into an easy to use and understand format. If you want more control, or to see the raw model directly, use `application.get(uuidOrId, options)` instead.

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get a single application and its devices, along with each device's associated services' essential details\
**Access**: public\
**Fulfil**: `Object` - application

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.getWithDeviceServiceDetails('myorganization/myapp').then(function(device) {
	console.log(device);
})
```

**Example**

```js
balena.models.application.getWithDeviceServiceDetails(123).then(function(device) {
	console.log(device);
})
```

***

## grantSupportAccess

`balena.models.application.grantSupportAccess(slugOrUuidOrId, expiryTimestamp)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Grant support access to an application until a specified time\
**Access**: public

| Param           | Type                 | Description                                               |
| --------------- | -------------------- | --------------------------------------------------------- |
| slugOrUuidOrId  | `String` \| `Number` | application slug (string), uuid (string) or id (number)   |
| expiryTimestamp | `Number`             | a timestamp in ms for when the support access will expire |

**Example**

```js
balena.models.application.grantSupportAccess('myorganization/myapp', Date.now() + 3600 * 1000);
```

**Example**

```js
balena.models.application.grantSupportAccess(123, Date.now() + 3600 * 1000);
```

***

## has

`balena.models.application.has(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Check if an application exists\
**Access**: public\
**Fulfil**: `Boolean` - has application

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.has('myorganization/myapp').then(function(hasApp) {
	console.log(hasApp);
});
```

**Example**

```js
balena.models.application.has(123).then(function(hasApp) {
	console.log(hasApp);
});
```

***

## hasAny

`balena.models.application.hasAny()` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Check if the user has access to any applications\
**Access**: public\
**Fulfil**: `Boolean` - has any applications\
**Example**

```js
balena.models.application.hasAny().then(function(hasAny) {
	console.log('Has any?', hasAny);
});
```

***

## isTrackingLatestRelease

`balena.models.application.isTrackingLatestRelease(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get whether the application is up to date and is tracking the latest finalized release for updates\
**Access**: public\
**Fulfil**: `Boolean` - is tracking the latest release

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.isTrackingLatestRelease('myorganization/myapp').then(function(isEnabled) {
	console.log(isEnabled);
});
```

**Example**

```js
balena.models.application.isTrackingLatestRelease(123).then(function(isEnabled) {
	console.log(isEnabled);
});
```

***

## pinToRelease

`balena.models.application.pinToRelease(slugOrUuidOrId, fullReleaseHash)` ⇒ `Promise`

Configures the application to run a particular release and not get updated when the latest release changes.

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Set a specific application to run a particular release\
**Access**: public

| Param           | Type                 | Description                                             |
| --------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId  | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| fullReleaseHash | `String`             | the hash of a successful release (string)               |

**Example**

```js
balena.models.application.pinToRelease('myorganization/myapp', 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```

**Example**

```js
balena.models.application.pinToRelease(123, 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```

***

## purge

`balena.models.application.purge(appId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Purge devices by application id\
**Access**: public

| Param | Type     | Description    |
| ----- | -------- | -------------- |
| appId | `Number` | application id |

**Example**

```js
balena.models.application.purge(123);
```

***

## reboot

`balena.models.application.reboot(appId, [options])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Reboot devices by application id\
**Access**: public

| Param            | Type      | Default | Description          |
| ---------------- | --------- | ------- | -------------------- |
| appId            | `Number`  |         | application id       |
| \[options]       | `Object`  |         | options              |
| \[options.force] | `Boolean` | `false` | override update lock |

**Example**

```js
balena.models.application.reboot(123);
```

***

## remove

`balena.models.application.remove(slugOrUuidOrIdOrIds)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Remove application\
**Access**: public

| Param               | Type                                     | Description                                                             |
| ------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| slugOrUuidOrIdOrIds | `String` \| `Number` \| `Array.<Number>` | application slug (string), uuid (string) or id (number) or array of ids |

**Example**

```js
balena.models.application.remove('myorganization/myapp');
```

**Example**

```js
balena.models.application.remove(123);
```

***

## rename

`balena.models.application.rename(slugOrUuidOrId, newName)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Rename application\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| newName        | `String`             | new application name (string)                           |

**Example**

```js
balena.models.application.rename('myorganization/myapp', 'MyRenamedApp');
```

**Example**

```js
balena.models.application.rename(123, 'MyRenamedApp');
```

***

## restart

`balena.models.application.restart(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Restart application\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.restart('myorganization/myapp');
```

**Example**

```js
balena.models.application.restart(123);
```

***

## revokeSupportAccess

`balena.models.application.revokeSupportAccess(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Revoke support access to an application\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.revokeSupportAccess('myorganization/myapp');
```

**Example**

```js
balena.models.application.revokeSupportAccess(123);
```

***

## shutdown

`balena.models.application.shutdown(appId, [options])` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Shutdown devices by application id\
**Access**: public

| Param            | Type      | Default | Description          |
| ---------------- | --------- | ------- | -------------------- |
| appId            | `Number`  |         | application id       |
| \[options]       | `Object`  |         | options              |
| \[options.force] | `Boolean` | `false` | override update lock |

**Example**

```js
balena.models.application.shutdown(123);
```

***

## trackLatestRelease

`balena.models.application.trackLatestRelease(slugOrUuidOrId)` ⇒ `Promise`

The application's current release will be updated with each new successfully built release.

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Configure a specific application to track the latest finalized available release\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.trackLatestRelease('myorganization/myapp').then(function() {
	...
});
```

**Example**

```js
balena.models.application.trackLatestRelease(123).then(function() {
	...
});
```

***

## willTrackNewReleases

`balena.models.application.willTrackNewReleases(slugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`application`](application.md#balena.models.application)\
**Summary**: Get whether the application is configured to receive updates whenever a new release is available\
**Access**: public\
**Fulfil**: `Boolean` - is tracking the latest release

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |

**Example**

```js
balena.models.application.willTrackNewReleases('myorganization/myapp').then(function(isEnabled) {
	console.log(isEnabled);
});
```

**Example**

```js
balena.models.application.willTrackNewReleases(123).then(function(isEnabled) {
	console.log(isEnabled);
});
```

***

## buildVar

`balena.models.application.buildVar` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### get

`balena.models.application.buildVar.get(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`buildVar`](application.md#balena.models.application.buildVar)\
**Summary**: Get the value of a specific build environment variable\
**Access**: public\
**Fulfil**: `String|undefined` - the build environment variable value (or undefined)

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | build environment variable name                         |

**Example**

```js
balena.models.application.buildVar.get('myorganization/myapp', 'VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.application.buildVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.application.buildVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`buildVar`](application.md#balena.models.application.buildVar)\
**Summary**: Get all build environment variables for an application\
**Access**: public\
**Fulfil**: `Object[]` - application build environment variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.buildVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.application.buildVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.application.buildVar.remove(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`buildVar`](application.md#balena.models.application.buildVar)\
**Summary**: Clear the value of a specific build environment variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | build environment variable name                         |

**Example**

```js
balena.models.application.buildVar.remove('myorganization/myapp', 'VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.application.buildVar.remove(999999, 'VAR').then(function() {
	...
});
```

***

### set

`balena.models.application.buildVar.set(slugOrUuidOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`buildVar`](application.md#balena.models.application.buildVar)\
**Summary**: Set the value of a specific build environment variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | build environment variable name                         |
| value          | `String`             | build environment variable value                        |

**Example**

```js
balena.models.application.buildVar.set('myorganization/myapp', 'VAR', 'newvalue').then(function() {
	...
});
```

**Example**

```js
balena.models.application.buildVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```

***

## configVar

`balena.models.application.configVar` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### get

`balena.models.application.configVar.get(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`configVar`](application.md#balena.models.application.configVar)\
**Summary**: Get the value of a specific config variable\
**Access**: public\
**Fulfil**: `String|undefined` - the config variable value (or undefined)

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | config variable name                                    |

**Example**

```js
balena.models.application.configVar.get('myorganization/myapp', 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.application.configVar.get(999999, 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.application.configVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`configVar`](application.md#balena.models.application.configVar)\
**Summary**: Get all config variables for an application\
**Access**: public\
**Fulfil**: `Object[]` - application config variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.configVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.application.configVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.application.configVar.remove(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`configVar`](application.md#balena.models.application.configVar)\
**Summary**: Clear the value of a specific config variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | config variable name                                    |

**Example**

```js
balena.models.application.configVar.remove('myorganization/myapp', 'BALENA_VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.application.configVar.remove(999999, 'BALENA_VAR').then(function() {
	...
});
```

***

### set

`balena.models.application.configVar.set(slugOrUuidOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`configVar`](application.md#balena.models.application.configVar)\
**Summary**: Set the value of a specific config variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | config variable name                                    |
| value          | `String`             | config variable value                                   |

**Example**

```js
balena.models.application.configVar.set('myorganization/myapp', 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```

**Example**

```js
balena.models.application.configVar.set(999999, 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```

***

## envVar

`balena.models.application.envVar` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### get

`balena.models.application.envVar.get(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`envVar`](application.md#balena.models.application.envVar)\
**Summary**: Get the value of a specific environment variable\
**Access**: public\
**Fulfil**: `String|undefined` - the environment variable value (or undefined)

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | environment variable name                               |

**Example**

```js
balena.models.application.envVar.get('myorganization/myapp', 'VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.application.envVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.application.envVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`envVar`](application.md#balena.models.application.envVar)\
**Summary**: Get all environment variables for an application\
**Access**: public\
**Fulfil**: `Object[]` - application environment variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.envVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.application.envVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.application.envVar.remove(slugOrUuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`envVar`](application.md#balena.models.application.envVar)\
**Summary**: Clear the value of a specific environment variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | environment variable name                               |

**Example**

```js
balena.models.application.envVar.remove('myorganization/myapp', 'VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.application.envVar.remove(999999, 'VAR').then(function() {
	...
});
```

***

### set

`balena.models.application.envVar.set(slugOrUuidOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`envVar`](application.md#balena.models.application.envVar)\
**Summary**: Set the value of a specific environment variable\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| key            | `String`             | environment variable name                               |
| value          | `String`             | environment variable value                              |

**Example**

```js
balena.models.application.envVar.set('myorganization/myapp', 'VAR', 'newvalue').then(function() {
	...
});
```

**Example**

```js
balena.models.application.envVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```

***

## invite

`balena.models.application.invite` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### accept

`balena.models.application.invite.accept(invitationToken)` ⇒ `Promise`

This method adds the calling user to the application.

**Kind**: static method of [`invite`](application.md#balena.models.application.invite)\
**Summary**: Accepts an invite\
**Access**: public

| Param           | Type     | Description  |
| --------------- | -------- | ------------ |
| invitationToken | `String` | invite token |

**Example**

```js
balena.models.application.invite.accept("qwerty-invitation-token");
```

***

### create

`balena.models.application.invite.create(slugOrUuidOrId, options, [message])` ⇒ `Promise`

This method invites a user by their email to an application.

**Kind**: static method of [`invite`](application.md#balena.models.application.invite)\
**Summary**: Creates a new invite for an application\
**Access**: public\
**Fulfil**: `String` - application invite

| Param               | Type                 | Default       | Description                                             |
| ------------------- | -------------------- | ------------- | ------------------------------------------------------- |
| slugOrUuidOrId      | `String` \| `Number` |               | application slug (string), uuid (string) or id (number) |
| options             | `Object`             |               | invite creation parameters                              |
| options.invitee     | `String`             |               | the email of the invitee                                |
| \[options.roleName] | `String`             | `"developer"` | the role name to be granted to the invitee              |
| \[message]          | `String`             |               | the message to send along with the invite               |

**Example**

```js
balena.models.application.invite.create('myorganization/myapp', { invitee: "invitee@example.org", roleName: "developer", message: "join my app" }).then(function(invite) {
	console.log(invite);
});
```

***

### getAll

`balena.models.application.invite.getAll([options])` ⇒ `Promise`

This method returns all invites.

**Kind**: static method of [`invite`](application.md#balena.models.application.invite)\
**Summary**: Get all invites\
**Access**: public\
**Fulfil**: `Object[]` - invites

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.application.invite.getAll().then(function(invites) {
	console.log(invites);
});
```

***

### getAllByApplication

`balena.models.application.invite.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

This method returns all invites for a specific application.

**Kind**: static method of [`invite`](application.md#balena.models.application.invite)\
**Summary**: Get all invites by application\
**Access**: public\
**Fulfil**: `Object[]` - invites

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.invite.getAllByApplication('myorganization/myapp').then(function(invites) {
	console.log(invites);
});
```

**Example**

```js
balena.models.application.invite.getAllByApplication(123).then(function(invites) {
	console.log(invites);
});
```

***

### revoke

`balena.models.application.invite.revoke(id)` ⇒ `Promise`

**Kind**: static method of [`invite`](application.md#balena.models.application.invite)\
**Summary**: Revoke an invite\
**Access**: public

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | `Number` | application invite id |

**Example**

```js
balena.models.application.invite.revoke(123);
```

***

## membership

`balena.models.application.membership` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### changeRole

`balena.models.application.membership.changeRole(idOrUniqueKey, roleName)` ⇒ `Promise`

This method changes the role of an application member.

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Changes the role of an application member\
**Access**: public

| Param         | Type                 | Description                                                                                                                  |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| idOrUniqueKey | `Number` \| `Object` | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership that will be changed |
| roleName      | `String`             | the role name to be granted to the membership                                                                                |

**Example**

```js
balena.models.application.membership.changeRole(123, "member").then(function() {
	console.log('OK');
});
```

**Example**

```js
balena.models.application.membership.changeRole({
	user: 123,
	is_member_of__application: 125,
}, "member").then(function() {
	console.log('OK');
});
```

***

### create

`balena.models.application.membership.create(options)` ⇒ `Promise`

This method adds a user to an application by their username if they are a member of the organization.

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Creates a new membership for an application\
**Access**: public\
**Fulfil**: `Object` - application membership

| Param               | Type                 | Default    | Description                                               |
| ------------------- | -------------------- | ---------- | --------------------------------------------------------- |
| options             | `Object`             |            | membership creation parameters                            |
| options.application | `String` \| `Number` |            | application handle (string), or id (number)               |
| options.username    | `String`             |            | the username of the balena user that will become a member |
| \[options.roleName] | `String`             | `"member"` | the role name to be granted to the membership             |

**Example**

```js
balena.models.application.membership.create({ application: "myApp", username: "user123", roleName: "member" }).then(function(membership) {
	console.log(membership);
});
```

***

### get

`balena.models.application.membership.get(membershipId, [options])` ⇒ `Promise`

This method returns a single application membership.

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Get a single application membership\
**Access**: public\
**Fulfil**: `Object` - application membership

| Param        | Type                 | Default | Description                                                                                             |
| ------------ | -------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| membershipId | `number` \| `Object` |         | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership |
| \[options]   | `Object`             | `{}`    | extra pine options to use                                                                               |

**Example**

```js
balena.models.application.membership.get(5).then(function(memberships) {
	console.log(memberships);
});
```

***

### getAllByApplication

`balena.models.application.membership.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

This method returns all application memberships for a specific application.

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Get all memberships by application\
**Access**: public\
**Fulfil**: `Object[]` - application memberships

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.membership.getAllByApplication('myorganization/myapp').then(function(memberships) {
	console.log(memberships);
});
```

**Example**

```js
balena.models.application.membership.getAllByApplication(123).then(function(memberships) {
	console.log(memberships);
});
```

***

### getAllByUser

`balena.models.application.membership.getAllByUser(usernameOrId, [options])` ⇒ `Promise`

This method returns all application memberships for a specific user.

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Get all memberships by user\
**Access**: public\
**Fulfil**: `Object[]` - application memberships

| Param        | Type                 | Default | Description                                 |
| ------------ | -------------------- | ------- | ------------------------------------------- |
| usernameOrId | `String` \| `Number` |         | the user's username (string) or id (number) |
| \[options]   | `Object`             | `{}`    | extra pine options to use                   |

**Example**

```js
balena.models.application.membership.getAllByUser('balena_os').then(function(memberships) {
	console.log(memberships);
});
```

**Example**

```js
balena.models.application.membership.getAllByUser(123).then(function(memberships) {
	console.log(memberships);
});
```

***

### remove

`balena.models.application.membership.remove(idOrUniqueKey)` ⇒ `Promise`

**Kind**: static method of [`membership`](application.md#balena.models.application.membership)\
**Summary**: Remove a membership\
**Access**: public

| Param         | Type                 | Description                                                                                                                  |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| idOrUniqueKey | `Number` \| `Object` | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership that will be removed |

**Example**

```js
balena.models.application.membership.remove(123);
```

**Example**

```js
balena.models.application.membership.remove({
	user: 123,
	is_member_of__application: 125,
});
```

***

## tags

`balena.models.application.tags` : `object`

**Kind**: static namespace of [`application`](application.md#balena.models.application)

***

### getAllByApplication

`balena.models.application.tags.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`tags`](application.md#balena.models.application.tags)\
**Summary**: Get all application tags for an application\
**Access**: public\
**Fulfil**: `Object[]` - application tags

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.application.tags.getAllByApplication('myorganization/myapp').then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.application.tags.getAllByApplication(999999).then(function(tags) {
	console.log(tags);
});
```

***

### remove

`balena.models.application.tags.remove(slugOrUuidOrId, tagKey)` ⇒ `Promise`

**Kind**: static method of [`tags`](application.md#balena.models.application.tags)\
**Summary**: Remove an application tag\
**Access**: public

| Param          | Type                 | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| tagKey         | `String`             | tag key                                                 |

**Example**

```js
balena.models.application.tags.remove('myorganization/myapp', 'EDITOR');
```

***

### set

`balena.models.application.tags.set(slugOrUuidOrId, tagKey, value)` ⇒ `Promise`

**Kind**: static method of [`tags`](application.md#balena.models.application.tags)\
**Summary**: Set an application tag\
**Access**: public

| Param          | Type                    | Description                                             |
| -------------- | ----------------------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number`    | application slug (string), uuid (string) or id (number) |
| tagKey         | `String`                | tag key                                                 |
| value          | `String` \| `undefined` | tag value                                               |

**Example**

```js
balena.models.application.tags.set('myorganization/myapp', 'EDITOR', 'vim');
```

**Example**

```js
balena.models.application.tags.set(123, 'EDITOR', 'vim');
```

***
