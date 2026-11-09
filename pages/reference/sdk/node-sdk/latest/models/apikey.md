# ApiKey

`balena.models.apiKey` : `object`

**Kind**: static namespace

***

## create

`balena.models.apiKey.create(createApiKeyParams)` ⇒ `Promise`

This method registers a new api key for the current user with the name given.

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Creates a new user API key\
**Access**: public\
**Fulfil**: `String` - API key

| Param                             | Type     | Default | Description                                                        |
| --------------------------------- | -------- | ------- | ------------------------------------------------------------------ |
| createApiKeyParams                | `Object` |         | an object containing the parameters for the creation of an API key |
| createApiKeyParams.name           | `String` |         | the API key name                                                   |
| createApiKeyParams.expiryDate     | `String` |         | the API key expiry date                                            |
| \[createApiKeyParams.description] | `String` |         | the API key description                                            |

**Example**

```js
balena.models.apiKey.create({name: apiKeyName, expiryDate: 2030-10-12}).then(function(apiKey) {
	console.log(apiKey);
});
```

**Example**

```js
balena.models.apiKey.create({name: apiKeyName, expiryDate: 2030-10-12, description: apiKeyDescription}).then(function(apiKey) {
	console.log(apiKey);
});
```

***

## getAll

`balena.models.apiKey.getAll([options])` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Get all accessible API keys\
**Access**: public\
**Fulfil**: `Object[]` - apiKeys

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.apiKey.getAll().then(function(apiKeys) {
	console.log(apiKeys);
});
```

***

## getAllNamedUserApiKeys

`balena.models.apiKey.getAllNamedUserApiKeys([options])` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Get all named user API keys of the current user\
**Access**: public\
**Fulfil**: `Object[]` - apiKeys

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.apiKey.getAllNamedUserApiKeys().then(function(apiKeys) {
	console.log(apiKeys);
});
```

***

## getDeviceApiKeysByDevice

`balena.models.apiKey.getDeviceApiKeysByDevice(uuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Get all API keys for a device\
**Access**: public\
**Fulfil**: `Object[]` - apiKeys

| Param      | Type                 | Default | Description                          |
| ---------- | -------------------- | ------- | ------------------------------------ |
| uuidOrId   | `String` \| `Number` |         | device, uuid (string) or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use            |

**Example**

```js
balena.models.apiKey.getDeviceApiKeysByDevice('7cf02a69e4d34c9da573914963cf54fd').then(function(apiKeys) {
	console.log(apiKeys);
});
```

***

## getProvisioningApiKeysByApplication

`balena.models.apiKey.getProvisioningApiKeysByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Get all provisioning API keys for an application\
**Access**: public\
**Fulfil**: `Object[]` - apiKeys

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.apiKey.getProvisioningApiKeysByApplication('myorganization/myapp').then(function(apiKeys) {
	console.log(apiKeys);
});
```

***

## revoke

`balena.models.apiKey.revoke(id)` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Revoke an API key\
**Access**: public

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `Number` | API key id  |

**Example**

```js
balena.models.apiKey.revoke(123);
```

***

## update

`balena.models.apiKey.update(id, apiKeyInfo)` ⇒ `Promise`

**Kind**: static method of [`apiKey`](apikey.md#balena.models.apiKey)\
**Summary**: Update the details of an API key\
**Access**: public

| Param      | Type     | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| id         | `Number` | API key id                                               |
| apiKeyInfo | `Object` | an object with the updated name\|description\|expiryDate |

**Example**

```js
balena.models.apiKey.update(123, { name: 'updatedName' });
```

**Example**

```js
balena.models.apiKey.update(123, { description: 'updated description' });
```

**Example**

```js
balena.models.apiKey.update(123, { expiryDate: '2022-04-29' });
```

**Example**

```js
balena.models.apiKey.update(123, { name: 'updatedName', description: 'updated description' });
```

***
