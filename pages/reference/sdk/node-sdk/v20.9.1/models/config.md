# Config

**models.config : <code>object</code>**

## getAll
**balena.models.config.getAll() ⇒ <code>Promise</code>**

**Summary**: Get all configuration  
**Access**: public  
**Fulfil**: <code>Object</code> - configuration  
**Example**  
```js
balena.models.config.getAll().then(function(config) {
	console.log(config);
});
```
## getDeviceTypes
**balena.models.config.getDeviceTypes() ⇒ <code>Promise</code>~~**

***use balena.models.deviceType.getAll***

**Summary**: Get device types  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device types  
**Example**  
```js
balena.models.config.getDeviceTypes().then(function(deviceTypes) {
	console.log(deviceTypes);
});
```
## getDeviceTypeManifestBySlug
**balena.models.config.getDeviceTypeManifestBySlug(slugOrName) ⇒ <code>Promise</code>~~**

***use balena.models.deviceType.getBySlugOrName***

**Summary**: Get a device type manifest by slug  
**Access**: public  
**Fulfil**: <code>Object</code> - device type manifest  

| Param | Type | Description |
| --- | --- | --- |
| slugOrName | <code>String</code> | device type slug |

**Example**  
```js
balena.models.config.getDeviceTypeManifestBySlug('raspberry-pi').then(function(manifest) {
	console.log(manifest);
});
```
## getDeviceOptions
**balena.models.config.getDeviceOptions(deviceType) ⇒ <code>Promise</code>**

**Summary**: Get configuration/initialization options for a device type  
**Access**: public  
**Fulfil**: <code>Object[]</code> - configuration options  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |

**Example**  
```js
balena.models.config.getDeviceOptions('raspberry-pi').then(function(options) {
	console.log(options);
});
```
## getConfigVarSchema
**balena.models.config.getConfigVarSchema(deviceType) ⇒ <code>Promise</code>**

**Summary**: Get configuration variables schema for a device type  
**Access**: public  
**Fulfil**: <code>Object[]</code> - configuration options  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>String</code> | device type slug |

**Example**  
```js
balena.models.config.getConfigVarSchema('raspberry-pi').then(function(options) {
	console.log(options);
});
```