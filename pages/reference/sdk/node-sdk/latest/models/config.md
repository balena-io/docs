# Config

`balena.models.config` : `object`

**Kind**: static namespace

***

## getAll

`balena.models.config.getAll()` ⇒ `Promise`

**Kind**: static method of [`config`](config.md#balena.models.config)\
**Summary**: Get all configuration\
**Access**: public\
**Fulfil**: `Object` - configuration\
**Example**

```js
balena.models.config.getAll().then(function(config) {
	console.log(config);
});
```

***

## getConfigVarSchema

`balena.models.config.getConfigVarSchema(deviceType)` ⇒ `Promise`

**Kind**: static method of [`config`](config.md#balena.models.config)\
**Summary**: Get configuration variables schema for a device type\
**Access**: public\
**Fulfil**: `Object[]` - configuration options

| Param      | Type     | Description      |
| ---------- | -------- | ---------------- |
| deviceType | `String` | device type slug |

**Example**

```js
balena.models.config.getConfigVarSchema('raspberry-pi').then(function(options) {
	console.log(options);
});
```

***

## getDeviceOptions

`balena.models.config.getDeviceOptions(deviceType)` ⇒ `Promise`

**Kind**: static method of [`config`](config.md#balena.models.config)\
**Summary**: Get configuration/initialization options for a device type\
**Access**: public\
**Fulfil**: `Object[]` - configuration options

| Param      | Type     | Description      |
| ---------- | -------- | ---------------- |
| deviceType | `String` | device type slug |

**Example**

```js
balena.models.config.getDeviceOptions('raspberry-pi').then(function(options) {
	console.log(options);
});
```

***

## getDeviceTypeManifestBySlug

~~`balena.models.config.getDeviceTypeManifestBySlug(slugOrName)` ⇒ `Promise`~~

_**use balena.models.deviceType.getBySlugOrName**_

**Kind**: static method of [`config`](config.md#balena.models.config)\
**Summary**: Get a device type manifest by slug\
**Access**: public\
**Fulfil**: `Object` - device type manifest

| Param      | Type     | Description      |
| ---------- | -------- | ---------------- |
| slugOrName | `String` | device type slug |

**Example**

```js
balena.models.config.getDeviceTypeManifestBySlug('raspberry-pi').then(function(manifest) {
	console.log(manifest);
});
```

***

## getDeviceTypes

~~`balena.models.config.getDeviceTypes()` ⇒ `Promise`~~

_**use balena.models.deviceType.getAll**_

**Kind**: static method of [`config`](config.md#balena.models.config)\
**Summary**: Get device types\
**Access**: public\
**Fulfil**: `Object[]` - device types\
**Example**

```js
balena.models.config.getDeviceTypes().then(function(deviceTypes) {
	console.log(deviceTypes);
});
```

***
