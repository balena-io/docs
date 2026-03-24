# Service

**models.service : <code>object</code>**

## var
**balena.models.service.var : <code>object</code>**

### getAllByService
**balena.models.service.var.getAllByService(serviceIdOrNaturalKey, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all variables for a service  
**Access**: public  
**Fulfil**: <code>Object[]</code> - service variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| serviceIdOrNaturalKey | <code>Number</code> \| <code>Object</code> |  | service id (number) or appliation-service_name pair |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.service.var.getAllByService(999999).then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.service.var.getAllByService({ application: 'myorganization/myapp', service_name: 'myservice' }).then(function(vars) {
	console.log(vars);
});
```
### getAllByApplication
**balena.models.service.var.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all service variables by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - service variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.service.var.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.service.var.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```
### get
**balena.models.service.var.get(serviceIdOrNaturalKey, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific service variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| serviceIdOrNaturalKey | <code>Number</code> \| <code>Object</code> | service id (number) or appliation-service_name pair |
| key | <code>String</code> | variable name |

**Example**  
```js
balena.models.service.var.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.service.var.get({ application: 'myorganization/myapp', service_name: 'myservice' }, 'VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.service.var.set(serviceIdOrNaturalKey, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific service variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| serviceIdOrNaturalKey | <code>Number</code> \| <code>Object</code> | service id (number) or appliation-service_name pair |
| key | <code>String</code> | variable name |
| value | <code>String</code> | variable value |

**Example**  
```js
balena.models.service.var.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.service.var.set({ application: 'myorganization/myapp', service_name: 'myservice' }, 'VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.service.var.remove(serviceIdOrNaturalKey, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific service variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| serviceIdOrNaturalKey | <code>Number</code> \| <code>Object</code> | service id (number) or appliation-service_name pair |
| key | <code>String</code> | variable name |

**Example**  
```js
balena.models.service.var.remove(999999, 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.service.var.remove({ application: 'myorganization/myapp', service_name: 'myservice' }, 'VAR').then(function() {
	...
});
```
## getAllByApplication
**balena.models.service.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all services from an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - services  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.service.getAllByApplication('myorganization/myapp').then(function(services) {
	console.log(services);
});
```
**Example**  
```js
balena.models.service.getAllByApplication(123).then(function(services) {
	console.log(services);
});
```