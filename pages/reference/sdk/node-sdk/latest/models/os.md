# Os

`balena.models.os` : `object`

**Kind**: static namespace

***

## download

`balena.models.os.download(options)` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Download an OS image\
**Access**: public\
**Fulfil**: `ReadableStream` - download stream

| Param                            | Type      | Default    | Description                                                                                                                                                               |
| -------------------------------- | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                          | `Object`  |            | OS image options to use.                                                                                                                                                  |
| options.deviceType               | `String`  |            | device type slug                                                                                                                                                          |
| \[options.version]               | `String`  | `'latest'` | semver-compatible version or 'latest', defaults to 'latest' Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number. |
| \[options.developmentMode]       | `Boolean` |            | controls development mode for unified balenaOS releases.                                                                                                                  |
| \[options.appId]                 | `Number`  |            | the application ID (number).                                                                                                                                              |
| \[options.fileType]              | `String`  |            | download file type. One of '.img' or '.zip' or '.gz'.                                                                                                                     |
| \[options.imageType]             | `String`  |            | download file type. One of 'raw' or 'flasher'                                                                                                                             |
| \[options.appUpdatePollInterval] | `Number`  |            | how often the OS checks for updates, in minutes.                                                                                                                          |
| \[options.network]               | `String`  |            | the network type that the device will use, one of 'ethernet' or 'wifi'.                                                                                                   |
| \[options.wifiKey]               | `String`  |            | the key for the wifi network the device will connect to if network is wifi.                                                                                               |
| \[options.wifiSsid]              | `String`  |            | the ssid for the wifi network the device will connect to if network is wifi.                                                                                              |

**Example**

```js
balena.models.os.download({deviceType: 'raspberry-pi'}).then(function(stream) {
	stream.pipe(fs.createWriteStream('foo/bar/image.img'));
});
```

***

## getAllOsVersions

`balena.models.os.getAllOsVersions(deviceTypes, [options])` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Get all OS versions for the provided device type(s), inlcuding invalidated ones\
**Access**: public\
**Fulfil**: `Object[]|Object` - An array of OsVersion objects when a single device type slug is provided, or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.

| Param       | Type                         | Default | Description                        |
| ----------- | ---------------------------- | ------- | ---------------------------------- |
| deviceTypes | `String` \| `Array.<String>` |         | device type slug or array of slugs |
| \[options]  | `Object`                     | `{}`    | extra pine options to use          |

**Example**

```js
balena.models.os.getAllOsVersions('raspberrypi3');
```

**Example**

```js
balena.models.os.getAllOsVersions(['fincm3', 'raspberrypi3']);
```

**Example**

```js
balena.models.os.getAllOsVersions(['fincm3', 'raspberrypi3'], { $filter: { is_invalidated: false } });
```

***

## getAvailableOsVersions

`balena.models.os.getAvailableOsVersions(deviceTypes, [pineOptions], [extraOptions])` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Get the supported OS versions for the provided device type(s)\
**Access**: public\
**Fulfil**: `Object[]|Object` - An array of OsVersion objects when a single device type slug is provided, or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.

| Param                        | Type                         | Default | Description                                            |
| ---------------------------- | ---------------------------- | ------- | ------------------------------------------------------ |
| deviceTypes                  | `String` \| `Array.<String>` |         | device type slug or array of slugs                     |
| \[pineOptions]               | `Object`                     |         | Extra pine options to use                              |
| \[extraOptions]              | `Object`                     |         | Extra convenience options to use                       |
| \[extraOptions.includeDraft] | `Boolean`                    | `false` | Whether pre-releases should be included in the results |

**Example**

```js
balena.models.os.getAvailableOsVersions('raspberrypi3');
```

**Example**

```js
balena.models.os.getAvailableOsVersions(['fincm3', 'raspberrypi3']);
```

***

## getConfig

`balena.models.os.getConfig(slugOrUuidOrId, options)` ⇒ `Promise`

Builds the config.json for a device in the given application, with the given options.

Note that an OS version is required. For versions < 2.7.8, config generation is only supported when using a session token, not an API key.

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Get an applications config.json\
**Access**: public\
**Fulfil**: `Object` - application configuration as a JSON object.

| Param                                | Type                 | Default      | Description                                                             |
| ------------------------------------ | -------------------- | ------------ | ----------------------------------------------------------------------- |
| slugOrUuidOrId                       | `String` \| `Number` |              | application slug (string), uuid (string) or id (number).                |
| options                              | `Object`             |              | OS configuration options to use.                                        |
| options.version                      | `String`             |              | Required: the OS version of the image.                                  |
| \[options.network]                   | `String`             | `'ethernet'` | The network type that the device will use, one of 'ethernet' or 'wifi'. |
| \[options.appUpdatePollInterval]     | `Number`             |              | How often the OS checks for updates, in minutes.                        |
| \[options.provisioningKeyName]       | `String`             |              | Name assigned to API key                                                |
| \[options.provisioningKeyExpiryDate] | `String`             |              | Expiry Date assigned to API key                                         |
| \[options.developmentMode]           | `Boolean`            |              | Controls development mode for unified balenaOS releases.                |
| \[options.wifiKey]                   | `String`             |              | The key for the wifi network the device will connect to.                |
| \[options.wifiSsid]                  | `String`             |              | The ssid for the wifi network the device will connect to.               |
| \[options.ip]                        | `String`             |              | static ip address.                                                      |
| \[options.gateway]                   | `String`             |              | static ip gateway.                                                      |
| \[options.netmask]                   | `String`             |              | static ip netmask.                                                      |

**Example**

```js
balena.models.os.getConfig('myorganization/myapp', { version: '2.12.7+rev1.prod' }).then(function(config) {
	fs.writeFile('foo/bar/config.json', JSON.stringify(config));
});

balena.models.os.getConfig(123, { version: '2.12.7+rev1.prod' }).then(function(config) {
	fs.writeFile('foo/bar/config.json', JSON.stringify(config));
});
```

***

## getDownloadSize

`balena.models.os.getDownloadSize(deviceType, [version])` ⇒ `Promise`

**Note!** Currently only the raw (uncompressed) size is reported.

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Get OS download size estimate\
**Access**: public\
**Fulfil**: `Number` - OS image download size, in bytes.

| Param      | Type     | Description                                                                                                    |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| deviceType | `String` | device type slug                                                                                               |
| \[version] | `String` | semver-compatible version or 'latest', defaults to 'latest'. The version **must** be the exact version number. |

**Example**

```js
balena.models.os.getDownloadSize('raspberry-pi').then(function(size) {
	console.log('The OS download size for raspberry-pi', size);
});
```

***

## getMaxSatisfyingVersion

`balena.models.os.getMaxSatisfyingVersion(deviceType, versionOrRange, [osType])` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Get the max OS version satisfying the given range\
**Access**: public\
**Fulfil**: `String|null` - the version number, or `null` if no matching versions are found

| Param          | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deviceType     | `String` | device type slug                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| versionOrRange | `String` | <p>can be one of</p><ul><li>the exact version number, in which case it is returned if the version is supported, or <code>null</code> is returned otherwise,</li><li>a <a href="https://www.npmjs.com/package/semver">semver</a>-compatible range specification, in which case the most recent satisfying version is returned if it exists, or <code>null</code> is returned,</li><li><code>'latest'</code> in which case the most recent version is returned, excluding pre-releases, Defaults to <code>'latest'</code>.</li></ul> |
| \[osType]      | `String` | can be one of 'default', 'esr' or null to include all types                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

**Example**

```js
balena.models.os.getMaxSatisfyingVersion('raspberry-pi', '^2.11.0').then(function(version) {
	console.log(version);
});
```

***

## getOsUpdateType

`balena.models.os.getOsUpdateType(deviceType, currentVersion, targetVersion)` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Returns the OS update type based on device type, current and target balenaOS versions\
**Access**: public\
**Fulfil**: `String` - Currently available types are:

* resinhup11
* resinhup12
* balenahup
  * takeover

Throws error in any of these cases:

* Current or target versions are invalid
* Current or target versions do not match in dev/prod type
* Current and target versions imply a downgrade operation
* Action is not supported by device type

| Param          | Type     | Description                                           |
| -------------- | -------- | ----------------------------------------------------- |
| deviceType     | `String` | device type slug                                      |
| currentVersion | `String` | semver-compatible version for the starting OS version |
| targetVersion  | `String` | semver-compatible version for the target OS version   |

**Example**

```js
balena.models.os.getOsUpdateType('raspberry-pi', '2.9.6+rev2.prod', '2.29.2+rev1.prod').then(function(osUpdateType) {
	console.log(osUpdateType);
});
```

***

## getSupervisorReleasesForCpuArchitecture

`balena.models.os.getSupervisorReleasesForCpuArchitecture(cpuArchitectureSlugOrId, [options])` ⇒ `Promise.<String>`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Returns the Releases of the supervisor for the CPU Architecture\
**Returns**: `Promise.<String>` - - An array of Release objects that can be used to manage a device as supervisors.\
**Access**: public

| Param                   | Type                 | Default | Description                                               |
| ----------------------- | -------------------- | ------- | --------------------------------------------------------- |
| cpuArchitectureSlugOrId | `String` \| `Number` |         | The slug (string) or id (number) for the CPU Architecture |
| \[options]              | `Object`             | `{}`    | extra pine options to use                                 |

**Example**

```js
const results = balena.models.os.getSupervisorReleasesForCpuArchitecture('aarch64');

const [result] = balena.models.os.getSupervisorReleasesForCpuArchitecture(
	'aarch64',
	{ $filter: { raw_version: '12.11.0' } },
);

const [result] = balena.models.os.getSupervisorReleasesForCpuArchitecture(
	'aarch64',
	{
			$select: ['id', 'raw_version', 'known_issue_list', 'created_at', 'contract'],
			$expand: {
				release_image: {
					$select: 'id',
					$expand: {
						image: {
							$select: 'is_stored_at__image_location',
						},
					},
				},
			},
		$filter: { raw_version: '12.11.0' }
	},
);
```

***

## getSupportedOsUpdateVersions

`balena.models.os.getSupportedOsUpdateVersions(deviceType, currentVersion, [options])` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Returns the supported OS update targets for the provided device type\
**Access**: public\
**Fulfil**: `Object[]|Object` - An array of OsVersion objects when a single device type slug is provided, or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.\
**Fulfil**: `Object` - the versions information, of the following structure:

* versions - an array of strings, containing exact version numbers that OS update is supported
* recommended - the recommended version, i.e. the most recent version that is _not_ pre-release, can be `null`
* current - the provided current version after normalization

| Param                   | Type               | Default | Description                                                     |
| ----------------------- | ------------------ | ------- | --------------------------------------------------------------- |
| deviceType              | `String`           |         | device type slug                                                |
| currentVersion          | `String`           |         | semver-compatible version for the starting OS version           |
| \[options]              | `Object`           |         | Extra options to filter the OS releases by                      |
| \[options.includeDraft] | `Boolean`          | `false` | Whether pre-releases should be included in the results          |
| \[options.osType]       | `String` \| `null` |         | Can be one of 'default', 'esr' or null which includes all types |

**Example**

```js
balena.models.os.getSupportedOsUpdateVersions('raspberry-pi', '2.9.6+rev2.prod').then(function(isSupported) {
	console.log(isSupported);
});
```

***

## isArchitectureCompatibleWith

`balena.models.os.isArchitectureCompatibleWith(osArchitecture, applicationArchitecture)` ⇒ `Boolean`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Returns whether the specified OS architecture is compatible with the target architecture\
**Returns**: `Boolean` - - Whether the specified OS architecture is capable of running applications build for the target architecture\
**Access**: public

| Param                   | Type     | Description                                                    |
| ----------------------- | -------- | -------------------------------------------------------------- |
| osArchitecture          | `String` | The OS's architecture as specified in its device type          |
| applicationArchitecture | `String` | The application's architecture as specified in its device type |

**Example**

```js
const result1 = balena.models.os.isArchitectureCompatibleWith('aarch64', 'armv7hf');
console.log(result1);

const result2 = balena.models.os.isArchitectureCompatibleWith('armv7hf', 'amd64');
console.log(result2);
```

***

## isSupportedOsUpdate

`balena.models.os.isSupportedOsUpdate(deviceType, currentVersion, targetVersion)` ⇒ `Promise`

**Kind**: static method of [`os`](os.md#balena.models.os)\
**Summary**: Returns whether the provided device type supports OS updates between the provided balenaOS versions\
**Access**: public\
**Fulfil**: `Boolean` - whether upgrading the OS to the target version is supported

| Param          | Type     | Description                                           |
| -------------- | -------- | ----------------------------------------------------- |
| deviceType     | `String` | device type slug                                      |
| currentVersion | `String` | semver-compatible version for the starting OS version |
| targetVersion  | `String` | semver-compatible version for the target OS version   |

**Example**

```js
balena.models.os.isSupportedOsUpgrade('raspberry-pi', '2.9.6+rev2.prod', '2.29.2+rev1.prod').then(function(isSupported) {
	console.log(isSupported);
});
```

***
