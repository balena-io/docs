# Service

`balena.models.service` : `object`

**Kind**: static namespace

***

## getAllByApplication

`balena.models.service.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`service`](service.md#balena.models.service)\
**Summary**: Get all services from an application\
**Access**: public\
**Fulfil**: `Object[]` - services

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

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

***

## var

`balena.models.service.var` : `object`

**Kind**: static namespace of [`service`](service.md#balena.models.service)

***

### get

`balena.models.service.var.get(serviceIdOrNaturalKey, key)` ⇒ `Promise`

**Kind**: static method of [`var`](service.md#balena.models.service.var)\
**Summary**: Get the value of a specific service variable\
**Access**: public\
**Fulfil**: `String|undefined` - the variable value (or undefined)

| Param                 | Type                 | Description                                          |
| --------------------- | -------------------- | ---------------------------------------------------- |
| serviceIdOrNaturalKey | `Number` \| `Object` | service id (number) or appliation-service\_name pair |
| key                   | `String`             | variable name                                        |

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

***

### getAllByApplication

`balena.models.service.var.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`var`](service.md#balena.models.service.var)\
**Summary**: Get all service variables by application\
**Access**: public\
**Fulfil**: `Object[]` - service variables

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

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

***

### getAllByService

`balena.models.service.var.getAllByService(serviceIdOrNaturalKey, [options])` ⇒ `Promise`

**Kind**: static method of [`var`](service.md#balena.models.service.var)\
**Summary**: Get all variables for a service\
**Access**: public\
**Fulfil**: `Object[]` - service variables

| Param                 | Type                 | Default | Description                                          |
| --------------------- | -------------------- | ------- | ---------------------------------------------------- |
| serviceIdOrNaturalKey | `Number` \| `Object` |         | service id (number) or appliation-service\_name pair |
| \[options]            | `Object`             | `{}`    | extra pine options to use                            |

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

***

### remove

`balena.models.service.var.remove(serviceIdOrNaturalKey, key)` ⇒ `Promise`

**Kind**: static method of [`var`](service.md#balena.models.service.var)\
**Summary**: Clear the value of a specific service variable\
**Access**: public

| Param                 | Type                 | Description                                          |
| --------------------- | -------------------- | ---------------------------------------------------- |
| serviceIdOrNaturalKey | `Number` \| `Object` | service id (number) or appliation-service\_name pair |
| key                   | `String`             | variable name                                        |

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

***

### set

`balena.models.service.var.set(serviceIdOrNaturalKey, key, value)` ⇒ `Promise`

**Kind**: static method of [`var`](service.md#balena.models.service.var)\
**Summary**: Set the value of a specific service variable\
**Access**: public

| Param                 | Type                 | Description                                          |
| --------------------- | -------------------- | ---------------------------------------------------- |
| serviceIdOrNaturalKey | `Number` \| `Object` | service id (number) or appliation-service\_name pair |
| key                   | `String`             | variable name                                        |
| value                 | `String`             | variable value                                       |

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

***
