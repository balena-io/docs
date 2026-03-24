# DeviceType

**models.deviceType : <code>object</code>**

## get
**balena.models.deviceType.get(idOrSlug, [options]) ⇒ <code>Promise</code>**

This method returns a single device type.

**Summary**: Get a single deviceType  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device types  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| idOrSlug | <code>String</code> \| <code>Number</code> |  | device type slug (string) or alias (string) or id |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getAll
**balena.models.deviceType.getAll([options]) ⇒ <code>Promise</code>**

This method returns all device types.

**Summary**: Get all deviceTypes  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device types  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getAllSupported
**balena.models.deviceType.getAllSupported([options]) ⇒ <code>Promise</code>**

This method returns all supported device types.

**Summary**: Get all supported deviceTypes  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device types  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getBySlugOrName
**balena.models.deviceType.getBySlugOrName(slugOrName) ⇒ <code>Promise</code>**

**Summary**: Get a deviceType by slug or name  
**Access**: public  
**Fulfil**: <code>Object</code> - device type  

| Param | Type | Description |
| --- | --- | --- |
| slugOrName | <code>String</code> | deviceType slug |

**Example**  
```js
balena.models.deviceType.getBySlugOrName('raspberry-pi').then(function(deviceType) {
	console.log(deviceType);
});
```
## getName
**balena.models.deviceType.getName(deviceTypeSlug) ⇒ <code>Promise</code>**

**Summary**: Get display name for a device  
**Access**: public  
**Fulfil**: <code>String</code> - device display name  

| Param | Type | Description |
| --- | --- | --- |
| deviceTypeSlug | <code>String</code> | device type slug |

**Example**  
```js
balena.models.deviceType.getName('raspberry-pi').then(function(deviceTypeName) {
	console.log(deviceTypeName);
	// Raspberry Pi
});
```
## getSlugByName
**balena.models.deviceType.getSlugByName(deviceTypeName) ⇒ <code>Promise</code>**

**Summary**: Get device slug  
**Access**: public  
**Fulfil**: <code>String</code> - device slug name  

| Param | Type | Description |
| --- | --- | --- |
| deviceTypeName | <code>String</code> | device type name |

**Example**  
```js
balena.models.deviceType.getSlugByName('Raspberry Pi').then(function(deviceTypeSlug) {
	console.log(deviceTypeSlug);
	// raspberry-pi
});
```
## getInterpolatedPartials
**balena.models.deviceType.getInterpolatedPartials(deviceTypeSlug) ⇒ <code>Promise</code>**

**Summary**: Get a contract with resolved partial templates  
**Access**: public  
**Fulfil**: <code>Contract</code> - device type contract with resolved partials  

| Param | Type | Description |
| --- | --- | --- |
| deviceTypeSlug | <code>String</code> | device type slug |

**Example**  
```js
balena.models.deviceType.getInterpolatedPartials('raspberry-pi').then(function(contract) {
 for (const partial in contract.partials) {
 	console.log(`${partial}: ${contract.partials[partial]}`);
 }
	// bootDevice: ["Connect power to the Raspberry Pi (v1 / Zero / Zero W)"]
});
```
## getInstructions
**balena.models.deviceType.getInstructions(deviceTypeSlugOrContract) ⇒ <code>Promise</code>**

**Summary**: Get instructions for installing a host OS on a given device type  
**Access**: public  
**Fulfil**: <code>Object \| String[]</code> - step by step instructions for installing the host OS to the device  

| Param | Type | Description |
| --- | --- | --- |
| deviceTypeSlugOrContract | <code>String</code> \| <code>Object</code> | device type slug or contract |

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
## getInstallMethod
**balena.models.deviceType.getInstallMethod(deviceTypeSlug) ⇒ <code>Promise</code>**

**Summary**: Get installation method on a given device type  
**Access**: public  
**Fulfil**: <code>String</code> - the installation method supported for the given device type slug  

| Param | Type | Description |
| --- | --- | --- |
| deviceTypeSlug | <code>String</code> | device type slug |

**Example**  
```js
balena.models.deviceType.getInstallMethod('raspberry-pi').then(function(method) {
	console.log(method);
 // externalBoot
});
```