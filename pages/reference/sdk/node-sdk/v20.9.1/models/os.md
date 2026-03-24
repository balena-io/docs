# Os

**models.os : <code>object</code>**

## getAvailableOsVersions
**balena.models.os.getAvailableOsVersions(deviceTypes, [options]) ⇒ <code>Promise</code>**

**Summary**: Get the supported OS versions for the provided device type(s)  
**Access**: public  
**Fulfil**: <code>Object[]\|Object</code> - An array of OsVersion objects when a single device type slug is provided,
or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| deviceTypes | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | device type slug or array of slugs |
| [options] | <code>Object</code> |  | Extra options to filter the OS releases by |
| [options.includeDraft] | <code>Boolean</code> | <code>false</code> | Whether pre-releases should be included in the results |

**Example**  
```js
balena.models.os.getAvailableOsVersions('raspberrypi3');
```
**Example**  
```js
balena.models.os.getAvailableOsVersions(['fincm3', 'raspberrypi3']);
```
## getAllOsVersions
**balena.models.os.getAllOsVersions(deviceTypes, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all OS versions for the provided device type(s), inlcuding invalidated ones  
**Access**: public  
**Fulfil**: <code>Object[]\|Object</code> - An array of OsVersion objects when a single device type slug is provided,
or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| deviceTypes | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | device type slug or array of slugs |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getDownloadSize
**balena.models.os.getDownloadSize(deviceType, [version]) ⇒ <code>Promise</code>**

**Note!** Currently only the raw (uncompressed) size is reported.

**Summary**: Get OS download size estimate  
**Access**: public  
**Fulfil**: <code>Number</code> - OS image download size, in bytes.  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |
| [version] | <code>String</code> | semver-compatible version or 'latest', defaults to 'latest'. The version **must** be the exact version number. |

**Example**  
```js
balena.models.os.getDownloadSize('raspberry-pi').then(function(size) {
	console.log('The OS download size for raspberry-pi', size);
});
```
## getMaxSatisfyingVersion
**balena.models.os.getMaxSatisfyingVersion(deviceType, versionOrRange, [osType]) ⇒ <code>Promise</code>**

**Summary**: Get the max OS version satisfying the given range  
**Access**: public  
**Fulfil**: <code>String\|null</code> - the version number, or `null` if no matching versions are found  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |
| versionOrRange | <code>String</code> | can be one of * the exact version number, in which case it is returned if the version is supported, or `null` is returned otherwise, * a [semver](https://www.npmjs.com/package/semver)-compatible range specification, in which case the most recent satisfying version is returned if it exists, or `null` is returned, * `'latest'` in which case the most recent version is returned, including pre-releases, * `'recommended'` in which case the recommended version is returned, i.e. the most recent version excluding pre-releases, which can be `null` if only pre-release versions are available, * `'default'` in which case the recommended version is returned if available, or `latest` is returned otherwise. Defaults to `'latest'`. |
| [osType] | <code>String</code> | can be one of 'default', 'esr' or null to include all types |

**Example**  
```js
balena.models.os.getMaxSatisfyingVersion('raspberry-pi', '^2.11.0').then(function(version) {
	console.log(version);
});
```
## getLastModified
**balena.models.os.getLastModified(deviceType, [version]) ⇒ <code>Promise</code>**

**Summary**: Get the OS image last modified date  
**Access**: public  
**Fulfil**: <code>Date</code> - last modified date  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |
| [version] | <code>String</code> | semver-compatible version or 'latest', defaults to 'latest'. Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number. To resolve the semver-compatible range use `balena.model.os.getMaxSatisfyingVersion`. |

**Example**  
```js
balena.models.os.getLastModified('raspberry-pi').then(function(date) {
	console.log('The raspberry-pi image was last modified in ' + date);
});

balena.models.os.getLastModified('raspberrypi3', '2.0.0').then(function(date) {
	console.log('The raspberry-pi image was last modified in ' + date);
});
```
## download
**balena.models.os.download(options) ⇒ <code>Promise</code>**

**Summary**: Download an OS image  
**Access**: public  
**Fulfil**: <code>ReadableStream</code> - download stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | OS image options to use. |
| options.deviceType | <code>String</code> |  | device type slug |
| [options.version] | <code>String</code> | <code>&#x27;latest&#x27;</code> | semver-compatible version or 'latest', defaults to 'latest' Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number. |
| [options.developmentMode] | <code>Boolean</code> |  | controls development mode for unified balenaOS releases. |
| [options.appId] | <code>Number</code> |  | the application ID (number). |
| [options.fileType] | <code>String</code> |  | download file type. One of '.img' or '.zip' or '.gz'. |
| [options.imageType] | <code>String</code> |  | download file type. One of 'raw' or 'flasher' |
| [options.appUpdatePollInterval] | <code>Number</code> |  | how often the OS checks for updates, in minutes. |
| [options.network] | <code>String</code> |  | the network type that the device will use, one of 'ethernet' or 'wifi'. |
| [options.wifiKey] | <code>String</code> |  | the key for the wifi network the device will connect to if network is wifi. |
| [options.wifiSsid] | <code>String</code> |  | the ssid for the wifi network the device will connect to if network is wifi. |

**Example**  
```js
balena.models.os.download({deviceType: 'raspberry-pi'}).then(function(stream) {
	stream.pipe(fs.createWriteStream('foo/bar/image.img'));
});
```
## getConfig
**balena.models.os.getConfig(slugOrUuidOrId, options) ⇒ <code>Promise</code>**

Builds the config.json for a device in the given application, with the given
options.

Note that an OS version is required. For versions < 2.7.8, config
generation is only supported when using a session token, not an API key.

**Summary**: Get an applications config.json  
**Access**: public  
**Fulfil**: <code>Object</code> - application configuration as a JSON object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number). |
| options | <code>Object</code> |  | OS configuration options to use. |
| options.version | <code>String</code> |  | Required: the OS version of the image. |
| [options.network] | <code>String</code> | <code>&#x27;ethernet&#x27;</code> | The network type that the device will use, one of 'ethernet' or 'wifi'. |
| [options.appUpdatePollInterval] | <code>Number</code> |  | How often the OS checks for updates, in minutes. |
| [options.provisioningKeyName] | <code>String</code> |  | Name assigned to API key |
| [options.provisioningKeyExpiryDate] | <code>String</code> |  | Expiry Date assigned to API key |
| [options.developmentMode] | <code>Boolean</code> |  | Controls development mode for unified balenaOS releases. |
| [options.wifiKey] | <code>String</code> |  | The key for the wifi network the device will connect to. |
| [options.wifiSsid] | <code>String</code> |  | The ssid for the wifi network the device will connect to. |
| [options.ip] | <code>String</code> |  | static ip address. |
| [options.gateway] | <code>String</code> |  | static ip gateway. |
| [options.netmask] | <code>String</code> |  | static ip netmask. |

**Example**  
```js
balena.models.os.getConfig('myorganization/myapp', { version: '2.12.7+rev1.prod' }).then(function(config) {
	fs.writeFile('foo/bar/config.json', JSON.stringify(config));
});

balena.models.os.getConfig(123, { version: '2.12.7+rev1.prod' }).then(function(config) {
	fs.writeFile('foo/bar/config.json', JSON.stringify(config));
});
```
## isSupportedOsUpdate
**balena.models.os.isSupportedOsUpdate(deviceType, currentVersion, targetVersion) ⇒ <code>Promise</code>**

**Summary**: Returns whether the provided device type supports OS updates between the provided balenaOS versions  
**Access**: public  
**Fulfil**: <code>Boolean</code> - whether upgrading the OS to the target version is supported  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |
| currentVersion | <code>String</code> | semver-compatible version for the starting OS version |
| targetVersion | <code>String</code> | semver-compatible version for the target OS version |

**Example**  
```js
balena.models.os.isSupportedOsUpgrade('raspberry-pi', '2.9.6+rev2.prod', '2.29.2+rev1.prod').then(function(isSupported) {
	console.log(isSupported);
});
```
## getOsUpdateType
**balena.models.os.getOsUpdateType(deviceType, currentVersion, targetVersion) ⇒ <code>Promise</code>**

**Summary**: Returns the OS update type based on device type, current and target balenaOS versions  
**Access**: public  
**Fulfil**: <code>String</code> - Currently available types are:
  - resinhup11
  - resinhup12
  - balenahup
	 - takeover

 Throws error in any of these cases:
  - Current or target versions are invalid
  - Current or target versions do not match in dev/prod type
  - Current and target versions imply a downgrade operation
  - Action is not supported by device type  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |
| currentVersion | <code>String</code> | semver-compatible version for the starting OS version |
| targetVersion | <code>String</code> | semver-compatible version for the target OS version |

**Example**  
```js
balena.models.os.getOsUpdateType('raspberry-pi', '2.9.6+rev2.prod', '2.29.2+rev1.prod').then(function(osUpdateType) {
	console.log(osUpdateType);
});
```
## getSupportedOsUpdateVersions
**balena.models.os.getSupportedOsUpdateVersions(deviceType, currentVersion, [options]) ⇒ <code>Promise</code>**

**Summary**: Returns the supported OS update targets for the provided device type  
**Access**: public  
**Fulfil**: <code>Object[]\|Object</code> - An array of OsVersion objects when a single device type slug is provided,
or a dictionary of OsVersion objects by device type slug when an array of device type slugs is provided.  
**Fulfil**: <code>Object</code> - the versions information, of the following structure:
* versions - an array of strings,
containing exact version numbers that OS update is supported
* recommended - the recommended version, i.e. the most recent version
that is _not_ pre-release, can be `null`
* current - the provided current version after normalization  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| deviceType | <code>String</code> |  | device type slug |
| currentVersion | <code>String</code> |  | semver-compatible version for the starting OS version |
| [options] | <code>Object</code> |  | Extra options to filter the OS releases by |
| [options.includeDraft] | <code>Boolean</code> | <code>false</code> | Whether pre-releases should be included in the results |

**Example**  
```js
balena.models.os.getSupportedOsUpdateVersions('raspberry-pi', '2.9.6+rev2.prod').then(function(isSupported) {
	console.log(isSupported);
});
```
## isArchitectureCompatibleWith
**balena.models.os.isArchitectureCompatibleWith(osArchitecture, applicationArchitecture) ⇒ <code>Boolean</code>**

**Summary**: Returns whether the specified OS architecture is compatible with the target architecture  
**Returns**: <code>Boolean</code> - - Whether the specified OS architecture is capable of running
applications build for the target architecture  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| osArchitecture | <code>String</code> | The OS's architecture as specified in its device type |
| applicationArchitecture | <code>String</code> | The application's architecture as specified in its device type |

**Example**  
```js
const result1 = balena.models.os.isArchitectureCompatibleWith('aarch64', 'armv7hf');
console.log(result1);

const result2 = balena.models.os.isArchitectureCompatibleWith('armv7hf', 'amd64');
console.log(result2);
```
## getSupervisorReleasesForCpuArchitecture
**balena.models.os.getSupervisorReleasesForCpuArchitecture(cpuArchitectureSlugOrId, [options]) ⇒ <code>Promise.&lt;String&gt;</code>**

**Summary**: Returns the Releases of the supervisor for the CPU Architecture  
**Returns**: <code>Promise.&lt;String&gt;</code> - - An array of Release objects that can be used to manage a device as supervisors.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cpuArchitectureSlugOrId | <code>String</code> \| <code>Number</code> |  | The slug (string) or id (number) for the CPU Architecture |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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