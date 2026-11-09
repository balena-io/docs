# DeviceType

`balena.models.deviceType` : `object`

**Kind**: static namespace

***

## get

`balena.models.deviceType.get(idOrSlug, [options])` ⇒ `Promise`

This method returns a single device type.

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get a single deviceType\
**Access**: public\
**Fulfil**: `Object[]` - device types

| Param      | Type                 | Default | Description                                       |
| ---------- | -------------------- | ------- | ------------------------------------------------- |
| idOrSlug   | `String` \| `Number` |         | device type slug (string) or alias (string) or id |
| \[options] | `Object`             | `{}`    | extra pine options to use                         |

**Example**

```js
balena.models.deviceType.get('raspberry-pi').then(function(deviceType) {
	console.log(deviceType);
});
```

**Example**

```js
balena.models.deviceType.get('raspberrypi').then(function(deviceType) {
	console.log('resolved alias:', deviceType);
});
```

***

## getAll

`balena.models.deviceType.getAll([options])` ⇒ `Promise`

This method returns all device types.

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get all deviceTypes\
**Access**: public\
**Fulfil**: `Object[]` - device types

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.deviceType.getAll().then(function(deviceTypes) {
	console.log(deviceTypes);
});
```

**Example**

```js
balena.models.deviceType.getAll({ $select: ['name', 'slug'] }).then(function(deviceTypes) {
	console.log(deviceTypes);
})
```

***

## getAllSupported

`balena.models.deviceType.getAllSupported([options])` ⇒ `Promise`

This method returns all supported device types.

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get all supported deviceTypes\
**Access**: public\
**Fulfil**: `Object[]` - device types

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.deviceType.getAllSupported().then(function(deviceTypes) {
	console.log(deviceTypes);
});
```

**Example**

```js
balena.models.deviceType.getAllSupported({ $select: ['name', 'slug'] }).then(function(deviceTypes) {
	console.log(deviceTypes);
})
```

***

## getBySlugOrName

`balena.models.deviceType.getBySlugOrName(slugOrName)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get a deviceType by slug or name\
**Access**: public\
**Fulfil**: `Object` - device type

| Param      | Type     | Description     |
| ---------- | -------- | --------------- |
| slugOrName | `String` | deviceType slug |

**Example**

```js
balena.models.deviceType.getBySlugOrName('raspberry-pi').then(function(deviceType) {
	console.log(deviceType);
});
```

***

## getInstallMethod

`balena.models.deviceType.getInstallMethod(deviceTypeSlug)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get installation method on a given device type\
**Access**: public\
**Fulfil**: `String` - the installation method supported for the given device type slug

| Param          | Type     | Description      |
| -------------- | -------- | ---------------- |
| deviceTypeSlug | `String` | device type slug |

**Example**

```js
balena.models.deviceType.getInstallMethod('raspberry-pi').then(function(method) {
	console.log(method);
 // externalBoot
});
```

***

## getInstructions

`balena.models.deviceType.getInstructions(deviceTypeSlugOrContract)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get instructions for installing a host OS on a given device type\
**Access**: public\
**Fulfil**: `Object | String[]` - step by step instructions for installing the host OS to the device

| Param                    | Type                 | Description                  |
| ------------------------ | -------------------- | ---------------------------- |
| deviceTypeSlugOrContract | `String` \| `Object` | device type slug or contract |

**Example**

```js
balena.models.deviceType.getInstructions('raspberry-pi').then(function(instructions) {
 for (let instruction of instructions.values()) {
	 console.log(instruction);
 }
 // Insert the sdcard to the host machine.
 // Write the BalenaOS file you downloaded to the sdcard. We recommend using <a href="https://etcher.balena.io/">Etcher</a>.
 // Wait for writing of BalenaOS to complete.
 // Remove the sdcard from the host machine.
 // Insert the freshly flashed sdcard into the Raspberry Pi (v1 / Zero / Zero W).
 // Connect power to the Raspberry Pi (v1 / Zero / Zero W) to boot the device.
});
```

***

## getInterpolatedPartials

`balena.models.deviceType.getInterpolatedPartials(deviceTypeSlug)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get a contract with resolved partial templates\
**Access**: public\
**Fulfil**: `Contract` - device type contract with resolved partials

| Param          | Type     | Description      |
| -------------- | -------- | ---------------- |
| deviceTypeSlug | `String` | device type slug |

**Example**

```js
balena.models.deviceType.getInterpolatedPartials('raspberry-pi').then(function(contract) {
 for (const partial in contract.partials) {
 	console.log(`${partial}: ${contract.partials[partial]}`);
 }
	// bootDevice: ["Connect power to the Raspberry Pi (v1 / Zero / Zero W)"]
});
```

***

## getName

`balena.models.deviceType.getName(deviceTypeSlug)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get display name for a device\
**Access**: public\
**Fulfil**: `String` - device display name

| Param          | Type     | Description      |
| -------------- | -------- | ---------------- |
| deviceTypeSlug | `String` | device type slug |

**Example**

```js
balena.models.deviceType.getName('raspberry-pi').then(function(deviceTypeName) {
	console.log(deviceTypeName);
	// Raspberry Pi
});
```

***

## getSlugByName

`balena.models.deviceType.getSlugByName(deviceTypeName)` ⇒ `Promise`

**Kind**: static method of [`deviceType`](devicetype.md#balena.models.deviceType)\
**Summary**: Get device slug\
**Access**: public\
**Fulfil**: `String` - device slug name

| Param          | Type     | Description      |
| -------------- | -------- | ---------------- |
| deviceTypeName | `String` | device type name |

**Example**

```js
balena.models.deviceType.getSlugByName('Raspberry Pi').then(function(deviceTypeSlug) {
	console.log(deviceTypeSlug);
	// raspberry-pi
});
```

***
