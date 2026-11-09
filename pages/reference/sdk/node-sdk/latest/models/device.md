# Device

`balena.models.device` : `object`

**Kind**: static namespace

***

## deactivate

`balena.models.device.deactivate(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Deactivate device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.deactivate('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.deactivate(123);
```

***

## disableDeviceUrl

`balena.models.device.disableDeviceUrl(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Disable device url for a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.disableDeviceUrl('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.disableDeviceUrl(123);
```

***

## disableLocalMode

`balena.models.device.disableLocalMode(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Disable local mode\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.disableLocalMode('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.disableLocalMode(123);
```

***

## disableLockOverride

`balena.models.device.disableLockOverride(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Disable lock override\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.disableLockOverride('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.disableLockOverride(123);
```

***

## enableDeviceUrl

`balena.models.device.enableDeviceUrl(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Enable device url for a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.enableDeviceUrl('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.enableDeviceUrl(123);
```

***

## enableLocalMode

`balena.models.device.enableLocalMode(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Enable local mode\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.enableLocalMode('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.enableLocalMode(123);
```

***

## enableLockOverride

`balena.models.device.enableLockOverride(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Enable lock override\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.enableLockOverride('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.enableLockOverride(123);
```

***

## generateDeviceKey

`balena.models.device.generateDeviceKey(uuidOrId, [keyName], [keyDescription])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Generate a device key\
**Access**: public

| Param             | Type                 | Description                         |
| ----------------- | -------------------- | ----------------------------------- |
| uuidOrId          | `String` \| `Number` | device uuid (string) or id (number) |
| \[keyName]        | `String`             | Device key name                     |
| \[keyDescription] | `String`             | Description for device key          |

**Example**

```js
balena.models.device.generateDeviceKey('7cf02a69e4d34c9da573914963cf54fd').then(function(deviceApiKey) {
	console.log(deviceApiKey);
});
```

**Example**

```js
balena.models.device.generateDeviceKey(123).then(function(deviceApiKey) {
	console.log(deviceApiKey);
});
```

***

## generateUniqueKey

`balena.models.device.generateUniqueKey()` ⇒ `String`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Generate a random key, useful for both uuid and api key.\
**Returns**: `String` - A generated key\
**Access**: public\
**Example**

```js
randomKey = balena.models.device.generateUniqueKey();
// randomKey is a randomly generated key that can be used as either a uuid or an api key
console.log(randomKey);
```

***

## get

`balena.models.device.get(uuidOrId, [options])` ⇒ `Promise`

This method returns a single device by id or uuid. In order to have the following computed properties in the result you have to explicitly define them in a `$select` in the extra options:

* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get a single device\
**Access**: public\
**Fulfil**: `Object` - device

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.get('7cf02a69e4d34c9da573914963cf54fd').then(function(device) {
	console.log(device);
})
```

**Example**

```js
balena.models.device.get(123).then(function(device) {
	console.log(device);
})
```

**Example**

```js
balena.models.device.get('7cf02a69e4d34c9da573914963cf54fd', { $select: ['overall_status', 'overall_progress'] }).then(function(device) {
	console.log(device);
})
```

***

## getAllByApplication

`balena.models.device.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

This method returns all devices of a specific application. In order to have the following computed properties in the result you have to explicitly define them in a `$select` in the extra options:

* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get all devices by application\
**Access**: public\
**Fulfil**: `Object[]` - devices

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.device.getAllByApplication('myorganization/myapp').then(function(devices) {
	console.log(devices);
});
```

**Example**

```js
balena.models.device.getAllByApplication(123).then(function(devices) {
	console.log(devices);
});
```

**Example**

```js
balena.models.device.getAllByApplication('myorganization/myapp', { $select: ['overall_status', 'overall_progress'] }).then(function(device) {
	console.log(device);
})
```

***

## getAllByOrganization

`balena.models.device.getAllByOrganization(handleOrId, [options])` ⇒ `Promise`

This method returns all devices of a specific application. In order to have the following computed properties in the result you have to explicitly define them in a `$select` in the extra options:

* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get all devices by organization\
**Access**: public\
**Fulfil**: `Object[]` - devices

| Param      | Type                 | Default | Description                                  |
| ---------- | -------------------- | ------- | -------------------------------------------- |
| handleOrId | `String` \| `Number` |         | organization handle (string) or id (number). |
| \[options] | `Object`             | `{}`    | extra pine options to use                    |

**Example**

```js
balena.models.device.getAllByOrganization('myorganization').then(function(devices) {
	console.log(devices);
});
```

**Example**

```js
balena.models.device.getAllByOrganization(123).then(function(devices) {
	console.log(devices);
});
```

**Example**

```js
balena.models.device.getAllByOrganization('myorganization', { $select: ['overall_status', 'overall_progress'] }).then(function(device) {
	console.log(device);
})
```

***

## getApplicationName

`balena.models.device.getApplicationName(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get application name\
**Access**: public\
**Fulfil**: `String` - application name

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getApplicationName('7cf02a69e4d34c9da573914963cf54fd').then(function(applicationName) {
	console.log(applicationName);
});
```

**Example**

```js
balena.models.device.getApplicationName(123).then(function(applicationName) {
	console.log(applicationName);
});
```

***

## getByName

`balena.models.device.getByName(name)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get devices by name\
**Access**: public\
**Fulfil**: `Object[]` - devices

| Param | Type     | Description |
| ----- | -------- | ----------- |
| name  | `String` | device name |

**Example**

```js
balena.models.device.getByName('MyDevice').then(function(devices) {
	console.log(devices);
});
```

***

## getDashboardUrl

`balena.models.device.getDashboardUrl(uuid)` ⇒ `String`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get Dashboard URL for a specific device\
**Returns**: `String` - - Dashboard URL for the specific device\
**Throws**:

* Exception if the uuid is empty

| Param | Type     | Description |
| ----- | -------- | ----------- |
| uuid  | `String` | Device uuid |

**Example**

```js
dashboardDeviceUrl = balena.models.device.getDashboardUrl('a44b544b8cc24d11b036c659dfeaccd8')
```

***

## getDeviceUrl

`balena.models.device.getDeviceUrl(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get a device url\
**Access**: public\
**Fulfil**: `String` - device url

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getDeviceUrl('7cf02a69e4d34c9da573914963cf54fd').then(function(url) {
	console.log(url);
});
```

**Example**

```js
balena.models.device.getDeviceUrl(123).then(function(url) {
	console.log(url);
});
```

***

## getLocalIPAddresses

`balena.models.device.getLocalIPAddresses(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the local IP addresses of a device\
**Access**: public\
**Fulfil**: `String[]` - local ip addresses\
**Reject**: `Error` Will reject if the device is offline

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getLocalIPAddresses('7cf02a69e4d34c9da573914963cf54fd').then(function(localIPAddresses) {
	localIPAddresses.forEach(function(localIP) {
		console.log(localIP);
	});
});
```

**Example**

```js
balena.models.device.getLocalIPAddresses(123).then(function(localIPAddresses) {
	localIPAddresses.forEach(function(localIP) {
		console.log(localIP);
	});
});
```

***

## getLocalModeSupport

`balena.models.device.getLocalModeSupport(device)` ⇒ `Object`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Returns whether local mode is supported along with a message describing the reason why local mode is not supported.\
**Returns**: `Object` - Local mode support info ({ supported: true/false, message: "..." })\
**Access**: public

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| device | `Object` | A device object |

**Example**

```js
balena.models.device.get('7cf02a69e4d34c9da573914963cf54fd').then(function(device) {
	balena.models.device.getLocalModeSupport(device);
})
```

***

## getMACAddresses

`balena.models.device.getMACAddresses(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the MAC addresses of a device\
**Access**: public\
**Fulfil**: `String[]` - mac addresses

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getMACAddresses('7cf02a69e4d34c9da573914963cf54fd').then(function(macAddresses) {
	macAddresses.forEach(function(mac) {
		console.log(mac);
	});
});
```

**Example**

```js
balena.models.device.getMACAddresses(123).then(function(macAddresses) {
	macAddresses.forEach(function(mac) {
		console.log(mac);
	});
});
```

***

## getMetrics

`balena.models.device.getMetrics(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the metrics related information for a device\
**Access**: public\
**Fulfil**: `Object` - device metrics

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getMetrics('7cf02a69e4d34c9da573914963cf54fd').then(function(deviceMetrics) {
	console.log(deviceMetrics);
});
```

**Example**

```js
balena.models.device.getMetrics(123).then(function(deviceMetrics) {
	console.log(deviceMetrics);
});
```

***

## getName

`balena.models.device.getName(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the name of a device\
**Access**: public\
**Fulfil**: `String` - device name

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getName('7cf02a69e4d34c9da573914963cf54fd').then(function(deviceName) {
	console.log(deviceName);
});
```

**Example**

```js
balena.models.device.getName(123).then(function(deviceName) {
	console.log(deviceName);
});
```

***

## getOsVersion

`balena.models.device.getOsVersion(device)` ⇒ `String`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the OS version (version number and variant combined) running on a device\
**Access**: public

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| device | `Object` | A device object |

**Example**

```js
balena.models.device.get('7cf02a69e4d34c9da573914963cf54fd').then(function(device) {
	console.log(device.os_version); // => 'balenaOS 2.26.0+rev1'
	console.log(device.os_variant); // => 'prod'
	balena.models.device.getOsVersion(device); // => '2.26.0+rev1.prod'
})
```

***

## getProgress

`balena.models.device.getProgress(uuidOrId)` ⇒ `Promise`

Convenience method for getting the overall progress of a device. It's recommended to use `balena.models.device.get()` instead, in case that you need to retrieve more device fields than just the progress.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the progress of a device\
**Access**: public\
**Fulfil**: `Number|null` - device progress\
**See**: [get](device.md#balena.models.device.get) for an example on selecting the `overall_progress` field.

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getProgress('7cf02a69e4d34c9da573914963cf54fd').then(function(progress) {
	console.log(progress);
});
```

**Example**

```js
balena.models.device.getProgress(123).then(function(progress) {
	console.log(progress);
});
```

***

## getStatus

`balena.models.device.getStatus(uuidOrId)` ⇒ `Promise`

Convenience method for getting the overall status of a device. It's recommended to use `balena.models.device.get()` instead, in case that you need to retrieve more device fields than just the status.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the status of a device\
**Access**: public\
**Fulfil**: `String` - device status\
**See**: [get](device.md#balena.models.device.get) for an example on selecting the `overall_status` field.

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getStatus('7cf02a69e4d34c9da573914963cf54fd').then(function(status) {
	console.log(status);
});
```

**Example**

```js
balena.models.device.getStatus(123).then(function(status) {
	console.log(status);
});
```

***

## getSupervisorState

`balena.models.device.getSupervisorState(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the supervisor state on a device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getSupervisorState('7cf02a69e4d34c9da573914963cf54fd').then(function(state) {
	console.log(state);
});
```

**Example**

```js
balena.models.device.getSupervisorState(123).then(function(state) {
	console.log(state);
});
```

***

## getSupervisorTargetState

`balena.models.device.getSupervisorTargetState(uuidOrId, version)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the target supervisor state on a device\
**Access**: public

| Param    | Type                 | Description                                            |
| -------- | -------------------- | ------------------------------------------------------ |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number)                    |
| version  | `Number`             | (optional) target state version (2 or 3), default to 2 |

**Example**

```js
balena.models.device.getSupervisorTargetState('7cf02a69e4d34c9da573914963cf54fd').then(function(state) {
	console.log(state);
});
```

**Example**

```js
balena.models.device.getSupervisorTargetState(123).then(function(state) {
	console.log(state);
});
```

**Example**

```js
balena.models.device.getSupervisorTargetState(123, 3).then(function(state) {
	console.log(state);
});
```

***

## getSupervisorTargetStateForApp

`balena.models.device.getSupervisorTargetStateForApp(uuidOrId, release)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the target supervisor state on a "generic" device on a fleet\
**Access**: public

| Param    | Type                 | Description                               |
| -------- | -------------------- | ----------------------------------------- |
| uuidOrId | `String` \| `Number` | fleet uuid (string) or id (number)        |
| release  | `String`             | (optional) release uuid (default tracked) |

**Example**

```js
balena.models.device.getSupervisorTargetStateForApp('7cf02a69e4d34c9da573914963cf54fd').then(function(state) {
	console.log(state);
});
```

**Example**

```js
balena.models.device.getSupervisorTargetStateForApp(123).then(function(state) {
	console.log(state);
});
```

**Example**

```js
balena.models.device.getSupervisorTargetStateForApp(123, '7cf02a69e4d34c9da573914963cf54fd').then(function(state) {
	console.log(state);
});
```

***

## getTargetReleaseHash

`balena.models.device.getTargetReleaseHash(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get the hash of the currently tracked release for a specific device\
**Access**: public\
**Fulfil**: `String` - The release hash of the currently tracked release

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.getTargetReleaseHash('7cf02a69e4d34c9da573914963cf54fd').then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.device.getTargetReleaseHash('7cf02a69e4d34c9da573914963cf54fd', function(release) {
	console.log(release);
});
```

***

## getWithServiceDetails

`balena.models.device.getWithServiceDetails(uuidOrId, [options])` ⇒ `Promise`

This method does not map exactly to the underlying model: it runs a larger prebuilt query, and reformats it into an easy to use and understand format. If you want more control, or to see the raw model directly, use `device.get(uuidOrId, options)` instead.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get a single device along with its associated services' details, including their associated commit\
**Access**: public\
**Fulfil**: `Object` - device with service details

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.getWithServiceDetails('7cf02a69e4d34c9da573914963cf54fd').then(function(device) {
	console.log(device);
})
```

**Example**

```js
balena.models.device.getWithServiceDetails(123).then(function(device) {
	console.log(device);
})
```

***

## grantSupportAccess

`balena.models.device.grantSupportAccess(uuidOrIdOrArray, expiryTimestamp)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Grant support access to a device until a specified time\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| expiryTimestamp | `Number`                                                     | a timestamp in ms for when the support access will expire         |

**Example**

```js
balena.models.device.grantSupportAccess('7cf02a69e4d34c9da573914963cf54fd', Date.now() + 3600 * 1000);
```

**Example**

```js
balena.models.device.grantSupportAccess(123, Date.now() + 3600 * 1000);
```

***

## has

`balena.models.device.has(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Check if a device exists\
**Access**: public\
**Fulfil**: `Boolean` - has device

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.has('7cf02a69e4d34c9da573914963cf54fd').then(function(hasDevice) {
	console.log(hasDevice);
});
```

**Example**

```js
balena.models.device.has(123).then(function(hasDevice) {
	console.log(hasDevice);
});
```

***

## hasDeviceUrl

`balena.models.device.hasDeviceUrl(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Check if a device is web accessible with device utls\
**Access**: public\
**Fulfil**: `Boolean` - has device url

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.hasDeviceUrl('7cf02a69e4d34c9da573914963cf54fd').then(function(hasDeviceUrl) {
	if (hasDeviceUrl) {
		console.log('The device has device URL enabled');
	}
});
```

**Example**

```js
balena.models.device.hasDeviceUrl(123).then(function(hasDeviceUrl) {
	if (hasDeviceUrl) {
		console.log('The device has device URL enabled');
	}
});
```

***

## hasLockOverride

`balena.models.device.hasLockOverride(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Check if a device has the lock override enabled\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.hasLockOverride('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.hasLockOverride(123);
```

***

## identify

`balena.models.device.identify(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Identify device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.identify('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.identify(123);
```

***

## isInLocalMode

`balena.models.device.isInLocalMode(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Check if local mode is enabled on the device\
**Access**: public\
**Fulfil**: `Boolean` - has device url

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.isInLocalMode('7cf02a69e4d34c9da573914963cf54fd').then(function(isInLocalMode) {
	if (isInLocalMode) {
		console.log('The device has local mode enabled');
	}
});
```

**Example**

```js
balena.models.device.isInLocalMode(123).then(function(isInLocalMode) {
	if (isInLocalMode) {
		console.log('The device has local mode enabled');
	}
});
```

***

## isOnline

`balena.models.device.isOnline(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Check if a device is online\
**Access**: public\
**Fulfil**: `Boolean` - is device online

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.isOnline('7cf02a69e4d34c9da573914963cf54fd').then(function(isOnline) {
	console.log('Is device online?', isOnline);
});
```

**Example**

```js
balena.models.device.isOnline(123).then(function(isOnline) {
	console.log('Is device online?', isOnline);
});
```

***

## isTrackingApplicationRelease

`balena.models.device.isTrackingApplicationRelease(uuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Get whether the device is configured to track the current application release\
**Access**: public\
**Fulfil**: `Boolean` - is tracking the current application release

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.isTrackingApplicationRelease('7cf02a69e4d34c9da573914963cf54fd').then(function(isEnabled) {
	console.log(isEnabled);
});
```

***

## move

`balena.models.device.move(uuidOrIdOrArray, applicationSlugOrUuidOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Move a device to another application\
**Access**: public

| Param                     | Type                                                         | Description                                                       |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray           | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| applicationSlugOrUuidOrId | `String` \| `Number`                                         | application slug (string), uuid (string) or id (number)           |

**Example**

```js
balena.models.device.move('7cf02a69e4d34c9da573914963cf54fd', 'myorganization/myapp');
```

**Example**

```js
balena.models.device.move(123, 'myorganization/myapp');
```

**Example**

```js
balena.models.device.move(123, 456);
```

***

## ping

`balena.models.device.ping(uuidOrId)` ⇒ `Promise`

This is useful to signal that the supervisor is alive and responding.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Ping a device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.ping('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.ping(123);
```

***

## pinToOsRelease

`balena.models.device.pinToOsRelease(uuidOrIdOrArray, osVersionOrId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Mark a specific device to be updated to a particular OS release\
**Access**: public\
**Experimental**:

| Param           | Type                                                         | Description                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids                                                                                                                                                                                                                                                                                         |
| osVersionOrId   | `String`                                                     | the raw version of a OS release (string) or id (number) Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number, a "prod" variant and greater than or equal to the one running on the device. To resolve compatible update targets for a device use `balena.models.os.getSupportedOsUpdateVersions`. |

**Example**

```js
await balena.models.device.pinToOsRelease('7cf02a687b74206f92cb455969cf8e98', '2.29.2+rev1.prod');
```

***

## pinToRelease

`balena.models.device.pinToRelease(uuidOrIdOrArray, fullReleaseHashOrId)` ⇒ `Promise`

Configures the device to run a particular release and not get updated when the current application release changes.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Set a specific device to run a particular release\
**Access**: public

| Param               | Type                                                         | Description                                                       |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray     | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| fullReleaseHashOrId | `String` \| `Number`                                         | the hash of a successful release (string) or id (number)          |

**Example**

```js
balena.models.device.pinToRelease('7cf02a69e4d34c9da573914963cf54fd', 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```

**Example**

```js
balena.models.device.pinToRelease(123, 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```

***

## pinToSupervisorRelease

`balena.models.device.pinToSupervisorRelease(uuidOrIdOrArray, supervisorVersionOrId)` ⇒ `Promise`

Configures the device to run a particular supervisor release.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Set a specific device to run a particular supervisor release\
**Access**: public

| Param                 | Type                                                         | Description                                                       |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray       | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| supervisorVersionOrId | `String` \| `Number`                                         | the raw version of a supervisor release (string) or id (number)   |

**Example**

```js
balena.models.device.pinToSupervisorRelease('7cf02a69e4d34c9da573914963cf54fd', '10.8.0').then(function() {
	...
});
```

**Example**

```js
balena.models.device.pinToSupervisorRelease(123, '11.4.14').then(function() {
	...
});
```

***

## purge

`balena.models.device.purge(uuidOrId)` ⇒ `Promise`

This function clears the user application's `/data` directory.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Purge device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.purge('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.purge(123);
```

***

## reboot

`balena.models.device.reboot(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Reboot device\
**Access**: public

| Param            | Type                 | Default | Description                         |
| ---------------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId         | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options]       | `Object`             |         | options                             |
| \[options.force] | `Boolean`            | `false` | override update lock                |

**Example**

```js
balena.models.device.reboot('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.reboot(123);
```

***

## register

`balena.models.device.register(applicationSlugOrUuidOrId, uuid, [deviceTypeSlug])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Register a new device with a Balena application.\
**Access**: public\
**Fulfil**: `Object` Device registration info ({ id: "...", uuid: "...", api\_key: "..." })

| Param                     | Type                 | Description                                             |
| ------------------------- | -------------------- | ------------------------------------------------------- |
| applicationSlugOrUuidOrId | `String` \| `Number` | application slug (string), uuid (string) or id (number) |
| uuid                      | `String`             | device uuid                                             |
| \[deviceTypeSlug]         | `String`             | device type slug (string) or alias (string)             |

**Example**

```js
var uuid = balena.models.device.generateUniqueKey();
balena.models.device.register('myorganization/myapp', uuid).then(function(registrationInfo) {
	console.log(registrationInfo);
});
```

**Example**

```js
var uuid = balena.models.device.generateUniqueKey();
balena.models.device.register('myorganization/myapp', uuid, 'raspberry-pi').then(function(registrationInfo) {
	console.log(registrationInfo);
});
```

**Example**

```js
var uuid = balena.models.device.generateUniqueKey();
balena.models.device.register(123, uuid).then(function(registrationInfo) {
	console.log(registrationInfo);
});
```

***

## remove

`balena.models.device.remove(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Remove device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.remove('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.remove(123);
```

***

## rename

`balena.models.device.rename(uuidOrId, newName)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Rename device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| newName  | `String`             | the device new name                 |

**Example**

```js
balena.models.device.rename('7cf02a69e4d34c9da573914963cf54fd', 'NewName');
```

**Example**

```js
balena.models.device.rename(123, 'NewName');
```

***

## restartApplication

`balena.models.device.restartApplication(uuidOrId)` ⇒ `Promise`

This function restarts the Docker container running the application on the device, but doesn't reboot the device itself.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Restart application on device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |

**Example**

```js
balena.models.device.restartApplication('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.restartApplication(123);
```

***

## restartService

`balena.models.device.restartService(uuidOrId, imageId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Restart a service on a device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| imageId  | `Number`             | id of the image to restart          |

**Example**

```js
balena.models.device.restartService('7cf02a69e4d34c9da573914963cf54fd', 123).then(function() {
	...
});
```

**Example**

```js
balena.models.device.restartService(1, 123).then(function() {
	...
});
```

***

## revokeSupportAccess

`balena.models.device.revokeSupportAccess(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Revoke support access to a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.revokeSupportAccess('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.revokeSupportAccess(123);
```

***

## setCustomLocation

`balena.models.device.setCustomLocation(uuidOrIdOrArray, location)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Set a custom location for a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| location        | `Object`                                                     | the location ({ latitude: 123, longitude: 456 })                  |

**Example**

```js
balena.models.device.setCustomLocation('7cf02a69e4d34c9da573914963cf54fd', { latitude: 123, longitude: 456 });
```

**Example**

```js
balena.models.device.setCustomLocation(123, { latitude: 123, longitude: 456 });
```

***

## setNote

`balena.models.device.setNote(uuidOrIdOrArray, note)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Note a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |
| note            | `String`                                                     | the note                                                          |

**Example**

```js
balena.models.device.setNote('7cf02a69e4d34c9da573914963cf54fd', 'My useful note');
```

**Example**

```js
balena.models.device.setNote(123, 'My useful note');
```

***

## shutdown

`balena.models.device.shutdown(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Shutdown device\
**Access**: public

| Param            | Type                 | Default | Description                         |
| ---------------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId         | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options]       | `Object`             |         | options                             |
| \[options.force] | `Boolean`            | `false` | override update lock                |

**Example**

```js
balena.models.device.shutdown('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.shutdown(123);
```

***

## startOsUpdate

`balena.models.device.startOsUpdate(uuidOrUuids, targetOsVersion, [options])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Start an OS update on a device\
**Access**: public\
**Fulfil**: `Object` - action response

| Param                  | Type                         | Description                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uuidOrUuids            | `String` \| `Array.<String>` | full device uuid or array of full uuids                                                                                                                                                                                                                                                                              |
| targetOsVersion        | `String`                     | semver-compatible version for the target device Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number, a "prod" variant and greater than the one running on the device. To resolve the semver-compatible range use `balena.model.os.getMaxSatisfyingVersion`. |
| \[options]             | `Object`                     | options                                                                                                                                                                                                                                                                                                              |
| \[options.runDetached] | `Boolean`                    | run the update in detached mode. True by default                                                                                                                                                                                                                                                                     |

**Example**

```js
balena.models.device.startOsUpdate('7cf02a687b74206f92cb455969cf8e98', '2.29.2+rev1.prod').then(function(status) {
	console.log(result.status);
});
```

***

## startService

`balena.models.device.startService(uuidOrId, imageId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Start a service on a device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| imageId  | `Number`             | id of the image to start            |

**Example**

```js
balena.models.device.startService('7cf02a69e4d34c9da573914963cf54fd', 123).then(function() {
	...
});
```

**Example**

```js
balena.models.device.startService(1, 123).then(function() {
	...
});
```

***

## stopService

`balena.models.device.stopService(uuidOrId, imageId)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Stop a service on a device\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| imageId  | `Number`             | id of the image to stop             |

**Example**

```js
balena.models.device.stopService('7cf02a69e4d34c9da573914963cf54fd', 123).then(function() {
	...
});
```

**Example**

```js
balena.models.device.stopService(1, 123).then(function() {
	...
});
```

***

## trackApplicationRelease

`balena.models.device.trackApplicationRelease(uuidOrIdOrArray)` ⇒ `Promise`

The device's current release will be updated with each new successfully built release.

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Configure a specific device to track the current application release\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.trackApplicationRelease('7cf02a69e4d34c9da573914963cf54fd').then(function() {
	...
});
```

***

## unsetCustomLocation

`balena.models.device.unsetCustomLocation(uuidOrIdOrArray)` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Clear the custom location of a device\
**Access**: public

| Param           | Type                                                         | Description                                                       |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| uuidOrIdOrArray | `String` \| `Array.<String>` \| `Number` \| `Array.<Number>` | device uuid (string) or id (number) or array of full uuids or ids |

**Example**

```js
balena.models.device.unsetCustomLocation('7cf02a69e4d34c9da573914963cf54fd');
```

**Example**

```js
balena.models.device.unsetCustomLocation(123);
```

***

## update

`balena.models.device.update(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`device`](device.md#balena.models.device)\
**Summary**: Trigger an update check on the supervisor\
**Access**: public

| Param            | Type                 | Default | Description                         |
| ---------------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId         | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options]       | `Object`             |         | options                             |
| \[options.force] | `Boolean`            | `false` | override update lock                |

**Example**

```js
balena.models.device.update('7cf02a69e4d34c9da573914963cf54fd', {
	force: true
});
```

**Example**

```js
balena.models.device.update(123, {
	force: true
});
```

***

## configVar

`balena.models.device.configVar` : `object`

**Kind**: static namespace of [`device`](device.md#balena.models.device)

***

### get

`balena.models.device.configVar.get(uuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`configVar`](device.md#balena.models.device.configVar)\
**Summary**: Get the value of a specific config variable\
**Access**: public\
**Fulfil**: `String|undefined` - the config variable value (or undefined)

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | config variable name                |

**Example**

```js
balena.models.device.configVar.get('7cf02a69e4d34c9da573914963cf54fd', 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.device.configVar.get(999999, 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.device.configVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`configVar`](device.md#balena.models.device.configVar)\
**Summary**: Get all device config variables by application\
**Access**: public\
**Fulfil**: `Object[]` - device config variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.device.configVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.configVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### getAllByDevice

`balena.models.device.configVar.getAllByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`configVar`](device.md#balena.models.device.configVar)\
**Summary**: Get all config variables for a device\
**Access**: public\
**Fulfil**: `Object[]` - device config variables

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.configVar.getAllByDevice('7cf02a69e4d34c9da573914963cf54fd').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.configVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.device.configVar.remove(uuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`configVar`](device.md#balena.models.device.configVar)\
**Summary**: Clear the value of a specific config variable\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | config variable name                |

**Example**

```js
balena.models.device.configVar.remove('7cf02a69e4d34c9da573914963cf54fd', 'BALENA_VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.device.configVar.remove(999999, 'BALENA_VAR').then(function() {
	...
});
```

***

### set

`balena.models.device.configVar.set(uuidOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`configVar`](device.md#balena.models.device.configVar)\
**Summary**: Set the value of a specific config variable\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | config variable name                |
| value    | `String`             | config variable value               |

**Example**

```js
balena.models.device.configVar.set('7cf02a69e4d34c9da573914963cf54fd', 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```

**Example**

```js
balena.models.device.configVar.set(999999, 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```

***

## envVar

`balena.models.device.envVar` : `object`

**Kind**: static namespace of [`device`](device.md#balena.models.device)

***

### get

`balena.models.device.envVar.get(uuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`envVar`](device.md#balena.models.device.envVar)\
**Summary**: Get the value of a specific environment variable\
**Access**: public\
**Fulfil**: `String|undefined` - the environment variable value (or undefined)

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | environment variable name           |

**Example**

```js
balena.models.device.envVar.get('7cf02a69e4d34c9da573914963cf54fd', 'VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.device.envVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.device.envVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`envVar`](device.md#balena.models.device.envVar)\
**Summary**: Get all device environment variables by application\
**Access**: public\
**Fulfil**: `Object[]` - device environment variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.device.envVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.envVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### getAllByDevice

`balena.models.device.envVar.getAllByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`envVar`](device.md#balena.models.device.envVar)\
**Summary**: Get all environment variables for a device\
**Access**: public\
**Fulfil**: `Object[]` - device environment variables

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.envVar.getAllByDevice('7cf02a69e4d34c9da573914963cf54fd').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.envVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.device.envVar.remove(uuidOrId, key)` ⇒ `Promise`

**Kind**: static method of [`envVar`](device.md#balena.models.device.envVar)\
**Summary**: Clear the value of a specific environment variable\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | environment variable name           |

**Example**

```js
balena.models.device.envVar.remove('7cf02a69e4d34c9da573914963cf54fd', 'VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.device.envVar.remove(999999, 'VAR').then(function() {
	...
});
```

***

### set

`balena.models.device.envVar.set(uuidOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`envVar`](device.md#balena.models.device.envVar)\
**Summary**: Set the value of a specific environment variable\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| key      | `String`             | environment variable name           |
| value    | `String`             | environment variable value          |

**Example**

```js
balena.models.device.envVar.set('7cf02a69e4d34c9da573914963cf54fd', 'VAR', 'newvalue').then(function() {
	...
});
```

**Example**

```js
balena.models.device.envVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```

***

## history

`balena.models.device.history` : `object`

**Kind**: static namespace of [`device`](device.md#balena.models.device)

***

### getAllByApplication

`balena.models.device.history.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`history`](device.md#balena.models.device.history)\
**Summary**: Get all device history entries by application with time frame\
**Access**: public\
**Fulfil**: `Object[]` - device history

| Param                  | Type                 | Default                  | Description                                                          |
| ---------------------- | -------------------- | ------------------------ | -------------------------------------------------------------------- |
| slugOrUuidOrId         | `String` \| `Number` |                          | application slug (string), uuid (string) or id (number)              |
| \[dateFilter.fromDate] | `Date`               | `subDays(new Date(), 7)` | history entries older or equal to this date - default now() - 7 days |
| \[dateFilter.toDate]   | `Date`               |                          | history entries younger or equal to this date                        |
| \[options]             | `Object`             |                          | extra pine options to use                                            |

**Example**

```js
balena.models.device.history.getAllByApplication('myorganization/myapp').then(function(entries) {
	console.log(entries);
});
```

**Example**

```js
balena.models.device.history.getAllByApplication(999999).then(function(entries) {
	console.log(entries);
});

 
```

**Example**

```js
// get all device history entries between now - 20 days and now - 10 days
balena.models.device.history.getAllByApplication(999999, { fromDate: subDays(new Date(), 20), toDate: subDays(new Date(), 10)})
```

**Example**

```js
// get all device history entries between now - 20 days and now - 10 days
balena.models.device.history.getAllByApplication(
  999999,
  { fromDate: subDays(new Date(), 20), toDate: subDays(new Date(), 10),
  { $top: 10, $orderby: { id: 'desc' }}
});
```

***

### getAllByDevice

`balena.models.device.history.getAllByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`history`](device.md#balena.models.device.history)\
**Summary**: Get all history entries for a device\
**Access**: public\
**Fulfil**: `Object[]` - device history

| Param                  | Type                 | Default                  | Description                                                          |
| ---------------------- | -------------------- | ------------------------ | -------------------------------------------------------------------- |
| uuidOrId               | `String` \| `Number` |                          | device uuid (32 / 62 digits string) or id (number)                   |
| \[dateFilter.fromDate] | `Date`               | `subDays(new Date(), 7)` | history entries older or equal to this date - default now() - 7 days |
| \[dateFilter.toDate]   | `Date`               |                          | history entries younger or equal to this date                        |
| \[options]             | `Object`             |                          | extra pine options to use                                            |

**Example**

```js
balena.models.device.history.getAllByDevice('7cf02a687b74206f92cb455969cf8e98').then(function(entries) {
	console.log(entries);
});
```

**Example**

```js
balena.models.device.history.getAllByDevice(999999).then(function(entries) {
	console.log(entries);
});
```

**Example**

```js
// get all device history entries between now - 20 days and now - 10 days
balena.models.device.history.getAllByDevice(999999, { fromDate: subDays(new Date(), 20), toDate: subDays(new Date(), 10)})
```

**Example**

```js
// get all device history entries between now - 20 days and now - 10 days
balena.models.device.history.getAllByDevice(
 999999,
 { fromDate: subDays(new Date(), 20), toDate: subDays(new Date(), 10)},
 { $top: 10, $orderby: { id: 'desc' }}
)
```

***

## serviceVar

`balena.models.device.serviceVar` : `object`

**Kind**: static namespace of [`device`](device.md#balena.models.device)

***

### get

`balena.models.device.serviceVar.get(uuidOrId, serviceNameOrId, key)` ⇒ `Promise`

**Kind**: static method of [`serviceVar`](device.md#balena.models.device.serviceVar)\
**Summary**: Get the overriden value of a service variable on a device\
**Access**: public\
**Fulfil**: `String|undefined` - the variable value (or undefined)

| Param           | Type                 | Description                          |
| --------------- | -------------------- | ------------------------------------ |
| uuidOrId        | `String` \| `Number` | device uuid (string) or id (number)  |
| serviceNameOrId | `String` \| `Number` | service name (string) or id (number) |
| key             | `String`             | variable name                        |

**Example**

```js
balena.models.device.serviceVar.get('7cf02a69e4d34c9da573914963cf54fd', 123, 'VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.device.serviceVar.get('7cf02a69e4d34c9da573914963cf54fd', 'myservice', 'VAR').then(function(value) {
	console.log(value);
});
```

**Example**

```js
balena.models.device.serviceVar.get(999999, 123, 'VAR').then(function(value) {
	console.log(value);
});
```

***

### getAllByApplication

`balena.models.device.serviceVar.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`serviceVar`](device.md#balena.models.device.serviceVar)\
**Summary**: Get all device service variable overrides by application\
**Access**: public\
**Fulfil**: `Object[]` - service variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.device.serviceVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.serviceVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```

***

### getAllByDevice

`balena.models.device.serviceVar.getAllByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`serviceVar`](device.md#balena.models.device.serviceVar)\
**Summary**: Get all service variable overrides for a device\
**Access**: public\
**Fulfil**: `Object[]` - service variables

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.serviceVar.getAllByDevice('7cf02a69e4d34c9da573914963cf54fd').then(function(vars) {
	console.log(vars);
});
```

**Example**

```js
balena.models.device.serviceVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```

***

### remove

`balena.models.device.serviceVar.remove(uuidOrId, serviceNameOrId, key)` ⇒ `Promise`

**Kind**: static method of [`serviceVar`](device.md#balena.models.device.serviceVar)\
**Summary**: Clear the overridden value of a service variable on a device\
**Access**: public

| Param           | Type                 | Description                          |
| --------------- | -------------------- | ------------------------------------ |
| uuidOrId        | `String` \| `Number` | device uuid (string) or id (number)  |
| serviceNameOrId | `String` \| `Number` | service name (string) or id (number) |
| key             | `String`             | variable name                        |

**Example**

```js
balena.models.device.serviceVar.remove('7cf02a69e4d34c9da573914963cf54fd', 123, 'VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.device.serviceVar.remove('7cf02a69e4d34c9da573914963cf54fd', 'myservice', 'VAR').then(function() {
	...
});
```

**Example**

```js
balena.models.device.serviceVar.remove(999999, 123, 'VAR').then(function() {
	...
});
```

***

### set

`balena.models.device.serviceVar.set(uuidOrId, serviceNameOrId, key, value)` ⇒ `Promise`

**Kind**: static method of [`serviceVar`](device.md#balena.models.device.serviceVar)\
**Summary**: Set the overriden value of a service variable on a device\
**Access**: public

| Param           | Type                 | Description                          |
| --------------- | -------------------- | ------------------------------------ |
| uuidOrId        | `String` \| `Number` | device uuid (string) or id (number)  |
| serviceNameOrId | `String` \| `Number` | service name (string) or id (number) |
| key             | `String`             | variable name                        |
| value           | `String`             | variable value                       |

**Example**

```js
balena.models.device.serviceVar.set('7cf02a69e4d34c9da573914963cf54fd', 123, 'VAR', 'override').then(function() {
	...
});
```

**Example**

```js
balena.models.device.serviceVar.set('7cf02a69e4d34c9da573914963cf54fd', 'myservice', 'VAR', 'override').then(function() {
	...
});
```

**Example**

```js
balena.models.device.serviceVar.set(999999, 123, 'VAR', 'override').then(function() {
	...
});
```

***

## tags

`balena.models.device.tags` : `object`

**Kind**: static namespace of [`device`](device.md#balena.models.device)

***

### getAllByApplication

`balena.models.device.tags.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`tags`](device.md#balena.models.device.tags)\
**Summary**: Get all device tags for an application\
**Access**: public\
**Fulfil**: `Object[]` - device tags

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.device.tags.getAllByApplication('myorganization/myapp').then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.device.tags.getAllByApplication(999999).then(function(tags) {
	console.log(tags);
});
```

***

### getAllByDevice

`balena.models.device.tags.getAllByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`tags`](device.md#balena.models.device.tags)\
**Summary**: Get all device tags for a device\
**Access**: public\
**Fulfil**: `Object[]` - device tags

| Param      | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| uuidOrId   | `String` \| `Number` |         | device uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use           |

**Example**

```js
balena.models.device.tags.getAllByDevice('7cf02a69e4d34c9da573914963cf54fd').then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.device.tags.getAllByDevice(123).then(function(tags) {
	console.log(tags);
});
```

***

### remove

`balena.models.device.tags.remove(uuidOrId, tagKey)` ⇒ `Promise`

**Kind**: static method of [`tags`](device.md#balena.models.device.tags)\
**Summary**: Remove a device tag\
**Access**: public

| Param    | Type                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number` | device uuid (string) or id (number) |
| tagKey   | `String`             | tag key                             |

**Example**

```js
balena.models.device.tags.remove('7cf02a69e4d34c9da573914963cf54fd', 'EDITOR');
```

***

### set

`balena.models.device.tags.set(uuidOrId, tagKey, value)` ⇒ `Promise`

**Kind**: static method of [`tags`](device.md#balena.models.device.tags)\
**Summary**: Set a device tag\
**Access**: public

| Param    | Type                    | Description                         |
| -------- | ----------------------- | ----------------------------------- |
| uuidOrId | `String` \| `Number`    | device uuid (string) or id (number) |
| tagKey   | `String`                | tag key                             |
| value    | `String` \| `undefined` | tag value                           |

**Example**

```js
balena.models.device.tags.set('7cf02a69e4d34c9da573914963cf54fd', 'EDITOR', 'vim');
```

**Example**

```js
balena.models.device.tags.set(123, 'EDITOR', 'vim');
```

***
