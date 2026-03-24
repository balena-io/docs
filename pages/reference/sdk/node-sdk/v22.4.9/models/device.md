# Device

**models.device : <code>object</code>**

## tags
**balena.models.device.tags : <code>object</code>**

### getAllByApplication
**balena.models.device.tags.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device tags for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device tags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### getAllByDevice
**balena.models.device.tags.getAllByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device tags for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device tags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.tags.getAllByDevice('7cf02a6').then(function(tags) {
	console.log(tags);
});
```
**Example**  
```js
balena.models.device.tags.getAllByDevice(123).then(function(tags) {
	console.log(tags);
});
```
### set
**balena.models.device.tags.set(uuidOrId, tagKey, value) ⇒ <code>Promise</code>**

**Summary**: Set a device tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| tagKey | <code>String</code> | tag key |
| value | <code>String</code> \| <code>undefined</code> | tag value |

**Example**  
```js
balena.models.device.tags.set('7cf02a6', 'EDITOR', 'vim');
```
**Example**  
```js
balena.models.device.tags.set(123, 'EDITOR', 'vim');
```
### remove
**balena.models.device.tags.remove(uuidOrId, tagKey) ⇒ <code>Promise</code>**

**Summary**: Remove a device tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| tagKey | <code>String</code> | tag key |

**Example**  
```js
balena.models.device.tags.remove('7cf02a6', 'EDITOR');
```
## configVar
**balena.models.device.configVar : <code>object</code>**

### getAllByDevice
**balena.models.device.configVar.getAllByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all config variables for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device config variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.configVar.getAllByDevice('7cf02a6').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.device.configVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```
### getAllByApplication
**balena.models.device.configVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device config variables by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device config variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### get
**balena.models.device.configVar.get(uuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific config variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the config variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | config variable name |

**Example**  
```js
balena.models.device.configVar.get('7cf02a6', 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.device.configVar.get(999999, 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.device.configVar.set(uuidOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific config variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | config variable name |
| value | <code>String</code> | config variable value |

**Example**  
```js
balena.models.device.configVar.set('7cf02a6', 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.configVar.set(999999, 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.device.configVar.remove(uuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific config variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | config variable name |

**Example**  
```js
balena.models.device.configVar.remove('7cf02a6', 'BALENA_VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.configVar.remove(999999, 'BALENA_VAR').then(function() {
	...
});
```
## envVar
**balena.models.device.envVar : <code>object</code>**

### getAllByDevice
**balena.models.device.envVar.getAllByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all environment variables for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device environment variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.envVar.getAllByDevice('7cf02a6').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.device.envVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```
### getAllByApplication
**balena.models.device.envVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device environment variables by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device environment variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### get
**balena.models.device.envVar.get(uuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific environment variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the environment variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |

**Example**  
```js
balena.models.device.envVar.get('7cf02a6', 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.device.envVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.device.envVar.set(uuidOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |
| value | <code>String</code> | environment variable value |

**Example**  
```js
balena.models.device.envVar.set('7cf02a6', 'VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.envVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.device.envVar.remove(uuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |

**Example**  
```js
balena.models.device.envVar.remove('7cf02a6', 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.envVar.remove(999999, 'VAR').then(function() {
	...
});
```
## serviceVar
**balena.models.device.serviceVar : <code>object</code>**

### getAllByDevice
**balena.models.device.serviceVar.getAllByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all service variable overrides for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - service variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.serviceVar.getAllByDevice('7cf02a6').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.device.serviceVar.getAllByDevice(999999).then(function(vars) {
	console.log(vars);
});
```
### getAllByApplication
**balena.models.device.serviceVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device service variable overrides by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - service variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### get
**balena.models.device.serviceVar.get(uuidOrId, serviceNameOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the overriden value of a service variable on a device  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| serviceNameOrId | <code>String</code> \| <code>Number</code> | service name (string) or id (number) |
| key | <code>String</code> | variable name |

**Example**  
```js
balena.models.device.serviceVar.get('7cf02a6', 123, 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.device.serviceVar.get('7cf02a6', 'myservice', 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.device.serviceVar.get(999999, 123, 'VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.device.serviceVar.set(uuidOrId, serviceNameOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the overriden value of a service variable on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| serviceNameOrId | <code>String</code> \| <code>Number</code> | service name (string) or id (number) |
| key | <code>String</code> | variable name |
| value | <code>String</code> | variable value |

**Example**  
```js
balena.models.device.serviceVar.set('7cf02a6', 123, 'VAR', 'override').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.serviceVar.set('7cf02a6', 'myservice', 'VAR', 'override').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.serviceVar.set(999999, 123, 'VAR', 'override').then(function() {
	...
});
```
### remove
**balena.models.device.serviceVar.remove(uuidOrId, serviceNameOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the overridden value of a service variable on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| serviceNameOrId | <code>String</code> \| <code>Number</code> | service name (string) or id (number) |
| key | <code>String</code> | variable name |

**Example**  
```js
balena.models.device.serviceVar.remove('7cf02a6', 123, 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.serviceVar.remove('7cf02a6', 'myservice', 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.serviceVar.remove(999999, 123, 'VAR').then(function() {
	...
});
```
## history
**balena.models.device.history : <code>object</code>**

### getAllByDevice
**balena.models.device.history.getAllByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all history entries for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device history  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (32 / 62 digits string) or id (number) |
| [dateFilter.fromDate] | <code>Date</code> | <code>subDays(new Date(), 7)</code> | history entries older or equal to this date - default now() - 7 days |
| [dateFilter.toDate] | <code>Date</code> |  | history entries younger or equal to this date |
| [options] | <code>Object</code> |  | extra pine options to use |

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
### getAllByApplication
**balena.models.device.history.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all device history entries by application with time frame  
**Access**: public  
**Fulfil**: <code>Object[]</code> - device history  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [dateFilter.fromDate] | <code>Date</code> | <code>subDays(new Date(), 7)</code> | history entries older or equal to this date - default now() - 7 days |
| [dateFilter.toDate] | <code>Date</code> |  | history entries younger or equal to this date |
| [options] | <code>Object</code> |  | extra pine options to use |

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
## getDashboardUrl
**balena.models.device.getDashboardUrl(uuid) ⇒ <code>String</code>**

**Summary**: Get Dashboard URL for a specific device  
**Returns**: <code>String</code> - - Dashboard URL for the specific device  
**Throws**:

- Exception if the uuid is empty

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | Device uuid |

**Example**  
```js
dashboardDeviceUrl = balena.models.device.getDashboardUrl('a44b544b8cc24d11b036c659dfeaccd8')
```
## getAllByApplication
**balena.models.device.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

This method returns all devices of a specific application.
In order to have the following computed properties in the result
you have to explicitly define them in a `$select` in the extra options:
* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Summary**: Get all devices by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - devices  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getAllByOrganization
**balena.models.device.getAllByOrganization(handleOrId, [options]) ⇒ <code>Promise</code>**

This method returns all devices of a specific application.
In order to have the following computed properties in the result
you have to explicitly define them in a `$select` in the extra options:
* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Summary**: Get all devices by organization  
**Access**: public  
**Fulfil**: <code>Object[]</code> - devices  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> |  | organization handle (string) or id (number). |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## get
**balena.models.device.get(uuidOrId, [options]) ⇒ <code>Promise</code>**

This method returns a single device by id or uuid.
In order to have the following computed properties in the result
you have to explicitly define them in a `$select` in the extra options:
* `overall_status`
* `overall_progress`
* `should_be_running__release`

**Summary**: Get a single device  
**Access**: public  
**Fulfil**: <code>Object</code> - device  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.get('7cf02a6').then(function(device) {
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
balena.models.device.get('7cf02a6', { $select: ['overall_status', 'overall_progress'] }).then(function(device) {
	console.log(device);
})
```
## getWithServiceDetails
**balena.models.device.getWithServiceDetails(uuidOrId, [options]) ⇒ <code>Promise</code>**

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `device.get(uuidOrId, options)` instead.

**Summary**: Get a single device along with its associated services' details,
including their associated commit  
**Access**: public  
**Fulfil**: <code>Object</code> - device with service details  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.device.getWithServiceDetails('7cf02a6').then(function(device) {
	console.log(device);
})
```
**Example**  
```js
balena.models.device.getWithServiceDetails(123).then(function(device) {
	console.log(device);
})
```
## getByName
**balena.models.device.getByName(name) ⇒ <code>Promise</code>**

**Summary**: Get devices by name  
**Access**: public  
**Fulfil**: <code>Object[]</code> - devices  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | device name |

**Example**  
```js
balena.models.device.getByName('MyDevice').then(function(devices) {
	console.log(devices);
});
```
## getName
**balena.models.device.getName(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the name of a device  
**Access**: public  
**Fulfil**: <code>String</code> - device name  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getName('7cf02a6').then(function(deviceName) {
	console.log(deviceName);
});
```
**Example**  
```js
balena.models.device.getName(123).then(function(deviceName) {
	console.log(deviceName);
});
```
## getApplicationName
**balena.models.device.getApplicationName(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get application name  
**Access**: public  
**Fulfil**: <code>String</code> - application name  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getApplicationName('7cf02a6').then(function(applicationName) {
	console.log(applicationName);
});
```
**Example**  
```js
balena.models.device.getApplicationName(123).then(function(applicationName) {
	console.log(applicationName);
});
```
## has
**balena.models.device.has(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if a device exists  
**Access**: public  
**Fulfil**: <code>Boolean</code> - has device  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.has('7cf02a6').then(function(hasDevice) {
	console.log(hasDevice);
});
```
**Example**  
```js
balena.models.device.has(123).then(function(hasDevice) {
	console.log(hasDevice);
});
```
## isOnline
**balena.models.device.isOnline(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if a device is online  
**Access**: public  
**Fulfil**: <code>Boolean</code> - is device online  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.isOnline('7cf02a6').then(function(isOnline) {
	console.log('Is device online?', isOnline);
});
```
**Example**  
```js
balena.models.device.isOnline(123).then(function(isOnline) {
	console.log('Is device online?', isOnline);
});
```
## getLocalIPAddresses
**balena.models.device.getLocalIPAddresses(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the local IP addresses of a device  
**Access**: public  
**Fulfil**: <code>String[]</code> - local ip addresses  
**Reject**: <code>Error</code> Will reject if the device is offline  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getLocalIPAddresses('7cf02a6').then(function(localIPAddresses) {
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
## getMACAddresses
**balena.models.device.getMACAddresses(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the MAC addresses of a device  
**Access**: public  
**Fulfil**: <code>String[]</code> - mac addresses  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getMACAddresses('7cf02a6').then(function(macAddresses) {
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
## getMetrics
**balena.models.device.getMetrics(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the metrics related information for a device  
**Access**: public  
**Fulfil**: <code>Object</code> - device metrics  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getMetrics('7cf02a6').then(function(deviceMetrics) {
	console.log(deviceMetrics);
});
```
**Example**  
```js
balena.models.device.getMetrics(123).then(function(deviceMetrics) {
	console.log(deviceMetrics);
});
```
## remove
**balena.models.device.remove(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Remove device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.remove('7cf02a6');
```
**Example**  
```js
balena.models.device.remove(123);
```
## deactivate
**balena.models.device.deactivate(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Deactivate device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.deactivate('7cf02a6');
```
**Example**  
```js
balena.models.device.deactivate(123);
```
## rename
**balena.models.device.rename(uuidOrId, newName) ⇒ <code>Promise</code>**

**Summary**: Rename device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| newName | <code>String</code> | the device new name |

**Example**  
```js
balena.models.device.rename('7cf02a6', 'NewName');
```
**Example**  
```js
balena.models.device.rename(123, 'NewName');
```
## setNote
**balena.models.device.setNote(uuidOrIdOrArray, note) ⇒ <code>Promise</code>**

**Summary**: Note a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| note | <code>String</code> | the note |

**Example**  
```js
balena.models.device.setNote('7cf02a6', 'My useful note');
```
**Example**  
```js
balena.models.device.setNote(123, 'My useful note');
```
## setCustomLocation
**balena.models.device.setCustomLocation(uuidOrIdOrArray, location) ⇒ <code>Promise</code>**

**Summary**: Set a custom location for a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| location | <code>Object</code> | the location ({ latitude: 123, longitude: 456 }) |

**Example**  
```js
balena.models.device.setCustomLocation('7cf02a6', { latitude: 123, longitude: 456 });
```
**Example**  
```js
balena.models.device.setCustomLocation(123, { latitude: 123, longitude: 456 });
```
## unsetCustomLocation
**balena.models.device.unsetCustomLocation(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Clear the custom location of a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.unsetCustomLocation('7cf02a6');
```
**Example**  
```js
balena.models.device.unsetCustomLocation(123);
```
## move
**balena.models.device.move(uuidOrIdOrArray, applicationSlugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Move a device to another application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| applicationSlugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.device.move('7cf02a6', 'myorganization/myapp');
```
**Example**  
```js
balena.models.device.move(123, 'myorganization/myapp');
```
**Example**  
```js
balena.models.device.move(123, 456);
```
## getSupervisorTargetState
**balena.models.device.getSupervisorTargetState(uuidOrId, version) ⇒ <code>Promise</code>**

**Summary**: Get the target supervisor state on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| version | <code>Number</code> | (optional) target state version (2 or 3), default to 2 |

**Example**  
```js
balena.models.device.getSupervisorTargetState('7cf02a6').then(function(state) {
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
## getSupervisorTargetStateForApp
**balena.models.device.getSupervisorTargetStateForApp(uuidOrId, release) ⇒ <code>Promise</code>**

**Summary**: Get the target supervisor state on a "generic" device on a fleet  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | fleet uuid (string) or id (number) |
| release | <code>String</code> | (optional) release uuid (default tracked) |

**Example**  
```js
balena.models.device.getSupervisorTargetStateForApp('7cf02a6').then(function(state) {
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
balena.models.device.getSupervisorTargetStateForApp(123, '7cf02a6').then(function(state) {
	console.log(state);
});
```
## generateUniqueKey
**balena.models.device.generateUniqueKey() ⇒ <code>String</code>**

**Summary**: Generate a random key, useful for both uuid and api key.  
**Returns**: <code>String</code> - A generated key  
**Access**: public  
**Example**  
```js
randomKey = balena.models.device.generateUniqueKey();
// randomKey is a randomly generated key that can be used as either a uuid or an api key
console.log(randomKey);
```
## register
**balena.models.device.register(applicationSlugOrUuidOrId, uuid, [deviceTypeSlug]) ⇒ <code>Promise</code>**

**Summary**: Register a new device with a Balena application.  
**Access**: public  
**Fulfil**: <code>Object</code> Device registration info ({ id: "...", uuid: "...", api_key: "..." })  

| Param | Type | Description |
| --- | --- | --- |
| applicationSlugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| uuid | <code>String</code> | device uuid |
| [deviceTypeSlug] | <code>String</code> | device type slug (string) or alias (string) |

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
## generateDeviceKey
**balena.models.device.generateDeviceKey(uuidOrId, [keyName], [keyDescription]) ⇒ <code>Promise</code>**

**Summary**: Generate a device key  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| [keyName] | <code>String</code> | Device key name |
| [keyDescription] | <code>String</code> | Description for device key |

**Example**  
```js
balena.models.device.generateDeviceKey('7cf02a6').then(function(deviceApiKey) {
	console.log(deviceApiKey);
});
```
**Example**  
```js
balena.models.device.generateDeviceKey(123).then(function(deviceApiKey) {
	console.log(deviceApiKey);
});
```
## hasDeviceUrl
**balena.models.device.hasDeviceUrl(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if a device is web accessible with device utls  
**Access**: public  
**Fulfil**: <code>Boolean</code> - has device url  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.hasDeviceUrl('7cf02a6').then(function(hasDeviceUrl) {
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
## getDeviceUrl
**balena.models.device.getDeviceUrl(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get a device url  
**Access**: public  
**Fulfil**: <code>String</code> - device url  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getDeviceUrl('7cf02a6').then(function(url) {
	console.log(url);
});
```
**Example**  
```js
balena.models.device.getDeviceUrl(123).then(function(url) {
	console.log(url);
});
```
## enableDeviceUrl
**balena.models.device.enableDeviceUrl(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Enable device url for a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.enableDeviceUrl('7cf02a6');
```
**Example**  
```js
balena.models.device.enableDeviceUrl(123);
```
## disableDeviceUrl
**balena.models.device.disableDeviceUrl(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Disable device url for a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.disableDeviceUrl('7cf02a6');
```
**Example**  
```js
balena.models.device.disableDeviceUrl(123);
```
## enableLocalMode
**balena.models.device.enableLocalMode(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Enable local mode  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.enableLocalMode('7cf02a6');
```
**Example**  
```js
balena.models.device.enableLocalMode(123);
```
## disableLocalMode
**balena.models.device.disableLocalMode(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Disable local mode  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.disableLocalMode('7cf02a6');
```
**Example**  
```js
balena.models.device.disableLocalMode(123);
```
## isInLocalMode
**balena.models.device.isInLocalMode(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if local mode is enabled on the device  
**Access**: public  
**Fulfil**: <code>Boolean</code> - has device url  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.isInLocalMode('7cf02a6').then(function(isInLocalMode) {
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
## getLocalModeSupport
**balena.models.device.getLocalModeSupport(device) ⇒ <code>Object</code>**

**Summary**: Returns whether local mode is supported along with a message describing the reason why local mode is not supported.  
**Returns**: <code>Object</code> - Local mode support info ({ supported: true/false, message: "..." })  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>Object</code> | A device object |

**Example**  
```js
balena.models.device.get('7cf02a6').then(function(device) {
	balena.models.device.getLocalModeSupport(device);
})
```
## enableLockOverride
**balena.models.device.enableLockOverride(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Enable lock override  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.enableLockOverride('7cf02a6');
```
**Example**  
```js
balena.models.device.enableLockOverride(123);
```
## disableLockOverride
**balena.models.device.disableLockOverride(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Disable lock override  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.disableLockOverride('7cf02a6');
```
**Example**  
```js
balena.models.device.disableLockOverride(123);
```
## hasLockOverride
**balena.models.device.hasLockOverride(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if a device has the lock override enabled  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.hasLockOverride('7cf02a6');
```
**Example**  
```js
balena.models.device.hasLockOverride(123);
```
## getStatus
**balena.models.device.getStatus(uuidOrId) ⇒ <code>Promise</code>**

Convenience method for getting the overall status of a device.
It's recommended to use `balena.models.device.get()` instead,
in case that you need to retrieve more device fields than just the status.

**Summary**: Get the status of a device  
**Access**: public  
**Fulfil**: <code>String</code> - device status  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getStatus('7cf02a6').then(function(status) {
	console.log(status);
});
```
**Example**  
```js
balena.models.device.getStatus(123).then(function(status) {
	console.log(status);
});
```
## getProgress
**balena.models.device.getProgress(uuidOrId) ⇒ <code>Promise</code>**

Convenience method for getting the overall progress of a device.
It's recommended to use `balena.models.device.get()` instead,
in case that you need to retrieve more device fields than just the progress.

**Summary**: Get the progress of a device  
**Access**: public  
**Fulfil**: <code>Number\|Null</code> - device progress  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getProgress('7cf02a6').then(function(progress) {
	console.log(progress);
});
```
**Example**  
```js
balena.models.device.getProgress(123).then(function(progress) {
	console.log(progress);
});
```
## grantSupportAccess
**balena.models.device.grantSupportAccess(uuidOrIdOrArray, expiryTimestamp) ⇒ <code>Promise</code>**

**Summary**: Grant support access to a device until a specified time  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| expiryTimestamp | <code>Number</code> | a timestamp in ms for when the support access will expire |

**Example**  
```js
balena.models.device.grantSupportAccess('7cf02a6', Date.now() + 3600 * 1000);
```
**Example**  
```js
balena.models.device.grantSupportAccess(123, Date.now() + 3600 * 1000);
```
## revokeSupportAccess
**balena.models.device.revokeSupportAccess(uuidOrIdOrArray) ⇒ <code>Promise</code>**

**Summary**: Revoke support access to a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.revokeSupportAccess('7cf02a6');
```
**Example**  
```js
balena.models.device.revokeSupportAccess(123);
```
## lastOnline
**balena.models.device.lastOnline(device) ⇒ <code>String</code>~~**

***Will be dropped in the next major***

If the device has never been online this method returns the string `Connecting...`.

**Summary**: Get a string showing when a device was last set as online  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>Object</code> | A device object |

**Example**  
```js
balena.models.device.get('7cf02a6').then(function(device) {
	balena.models.device.lastOnline(device);
})
```
## getOsVersion
**balena.models.device.getOsVersion(device) ⇒ <code>String</code>**

**Summary**: Get the OS version (version number and variant combined) running on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>Object</code> | A device object |

**Example**  
```js
balena.models.device.get('7cf02a6').then(function(device) {
	console.log(device.os_version); // => 'balenaOS 2.26.0+rev1'
	console.log(device.os_variant); // => 'prod'
	balena.models.device.getOsVersion(device); // => '2.26.0+rev1.prod'
})
```
## isTrackingApplicationRelease
**balena.models.device.isTrackingApplicationRelease(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get whether the device is configured to track the current application release  
**Access**: public  
**Fulfil**: <code>Boolean</code> - is tracking the current application release  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.isTrackingApplicationRelease('7cf02a6').then(function(isEnabled) {
	console.log(isEnabled);
});
```
## getTargetReleaseHash
**balena.models.device.getTargetReleaseHash(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the hash of the currently tracked release for a specific device  
**Access**: public  
**Fulfil**: <code>String</code> - The release hash of the currently tracked release  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getTargetReleaseHash('7cf02a6').then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.device.getTargetReleaseHash('7cf02a6', function(release) {
	console.log(release);
});
```
## pinToRelease
**balena.models.device.pinToRelease(uuidOrIdOrArray, fullReleaseHashOrId) ⇒ <code>Promise</code>**

Configures the device to run a particular release
and not get updated when the current application release changes.

**Summary**: Set a specific device to run a particular release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| fullReleaseHashOrId | <code>String</code> \| <code>Number</code> | the hash of a successful release (string) or id (number) |

**Example**  
```js
balena.models.device.pinToRelease('7cf02a6', 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.pinToRelease(123, 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```
## trackApplicationRelease
**balena.models.device.trackApplicationRelease(uuidOrIdOrArray) ⇒ <code>Promise</code>**

The device's current release will be updated with each new successfully built release.

**Summary**: Configure a specific device to track the current application release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |

**Example**  
```js
balena.models.device.trackApplicationRelease('7cf02a6').then(function() {
	...
});
```
## setSupervisorRelease
**balena.models.device.setSupervisorRelease(uuidOrIdOrArray, supervisorVersionOrId) ⇒ <code>Promise</code>**

Configures the device to run a particular supervisor release.

**Summary**: Set a specific device to run a particular supervisor release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrIdOrArray | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | device uuid (string) or id (number) or array of full uuids or ids |
| supervisorVersionOrId | <code>String</code> \| <code>Number</code> | the raw version of a supervisor release (string) or id (number) |

**Example**  
```js
balena.models.device.setSupervisorRelease('7cf02a6', '10.8.0').then(function() {
	...
});
```
**Example**  
```js
balena.models.device.setSupervisorRelease(123, '11.4.14').then(function() {
	...
});
```
## startOsUpdate
**balena.models.device.startOsUpdate(uuidOrUuids, targetOsVersion, [options]) ⇒ <code>Promise</code>**

**Summary**: Start an OS update on a device  
**Access**: public  
**Fulfil**: <code>Object</code> - action response  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrUuids | <code>String</code> \| <code>Array.&lt;String&gt;</code> | full device uuid or array of full uuids |
| targetOsVersion | <code>String</code> | semver-compatible version for the target device Unsupported (unpublished) version will result in rejection. The version **must** be the exact version number, a "prod" variant and greater than the one running on the device. To resolve the semver-compatible range use `balena.model.os.getMaxSatisfyingVersion`. |
| [options] | <code>Object</code> | options |
| [options.runDetached] | <code>Boolean</code> | run the update in detached mode. True by default |

**Example**  
```js
balena.models.device.startOsUpdate('7cf02a687b74206f92cb455969cf8e98', '2.29.2+rev1.prod').then(function(status) {
	console.log(result.status);
});
```
## ping
**balena.models.device.ping(uuidOrId) ⇒ <code>Promise</code>**

This is useful to signal that the supervisor is alive and responding.

**Summary**: Ping a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.ping('7cf02a6');
```
**Example**  
```js
balena.models.device.ping(123);
```
## identify
**balena.models.device.identify(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Identify device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.identify('7cf02a6');
```
**Example**  
```js
balena.models.device.identify(123);
```
## restartApplication
**balena.models.device.restartApplication(uuidOrId) ⇒ <code>Promise</code>**

This function restarts the Docker container running
the application on the device, but doesn't reboot
the device itself.

**Summary**: Restart application on device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.restartApplication('7cf02a6');
```
**Example**  
```js
balena.models.device.restartApplication(123);
```
## reboot
**balena.models.device.reboot(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Reboot device  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> |  | options |
| [options.force] | <code>Boolean</code> | <code>false</code> | override update lock |

**Example**  
```js
balena.models.device.reboot('7cf02a6');
```
**Example**  
```js
balena.models.device.reboot(123);
```
## shutdown
**balena.models.device.shutdown(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Shutdown device  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> |  | options |
| [options.force] | <code>Boolean</code> | <code>false</code> | override update lock |

**Example**  
```js
balena.models.device.shutdown('7cf02a6');
```
**Example**  
```js
balena.models.device.shutdown(123);
```
## purge
**balena.models.device.purge(uuidOrId) ⇒ <code>Promise</code>**

This function clears the user application's `/data` directory.

**Summary**: Purge device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.purge('7cf02a6');
```
**Example**  
```js
balena.models.device.purge(123);
```
## update
**balena.models.device.update(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Trigger an update check on the supervisor  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> |  | options |
| [options.force] | <code>Boolean</code> | <code>false</code> | override update lock |

**Example**  
```js
balena.models.device.update('7cf02a6', {
	force: true
});
```
**Example**  
```js
balena.models.device.update(123, {
	force: true
});
```
## getSupervisorState
**balena.models.device.getSupervisorState(uuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the supervisor state on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |

**Example**  
```js
balena.models.device.getSupervisorState('7cf02a6').then(function(state) {
	console.log(state);
});
```
**Example**  
```js
balena.models.device.getSupervisorState(123).then(function(state) {
	console.log(state);
});
```
## startService
**balena.models.device.startService(uuidOrId, imageId) ⇒ <code>Promise</code>**

**Summary**: Start a service on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| imageId | <code>Number</code> | id of the image to start |

**Example**  
```js
balena.models.device.startService('7cf02a6', 123).then(function() {
	...
});
```
**Example**  
```js
balena.models.device.startService(1, 123).then(function() {
	...
});
```
## stopService
**balena.models.device.stopService(uuidOrId, imageId) ⇒ <code>Promise</code>**

**Summary**: Stop a service on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| imageId | <code>Number</code> | id of the image to stop |

**Example**  
```js
balena.models.device.stopService('7cf02a6', 123).then(function() {
	...
});
```
**Example**  
```js
balena.models.device.stopService(1, 123).then(function() {
	...
});
```
## restartService
**balena.models.device.restartService(uuidOrId, imageId) ⇒ <code>Promise</code>**

**Summary**: Restart a service on a device  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> | device uuid (string) or id (number) |
| imageId | <code>Number</code> | id of the image to restart |

**Example**  
```js
balena.models.device.restartService('7cf02a6', 123).then(function() {
	...
});
```
**Example**  
```js
balena.models.device.restartService(1, 123).then(function() {
	...
});
```