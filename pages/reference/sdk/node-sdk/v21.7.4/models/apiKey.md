# ApiKey

**models.apiKey : <code>object</code>**

## create
**balena.models.apiKey.create(createApiKeyParams) ⇒ <code>Promise</code>**

This method registers a new api key for the current user with the name given.

**Summary**: Creates a new user API key  
**Access**: public  
**Fulfil**: <code>String</code> - API key  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| createApiKeyParams | <code>Object</code> |  | an object containing the parameters for the creation of an API key |
| createApiKeyParams.name | <code>String</code> |  | the API key name |
| createApiKeyParams.expiryDate | <code>String</code> |  | the API key expiry date |
| [createApiKeyParams.description] | <code>String</code> | <code></code> | the API key description |

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
## getAll
**balena.models.apiKey.getAll([options]) ⇒ <code>Promise</code>**

**Summary**: Get all accessible API keys  
**Access**: public  
**Fulfil**: <code>Object[]</code> - apiKeys  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.apiKey.getAll().then(function(apiKeys) {
	console.log(apiKeys);
});
```
## getAllNamedUserApiKeys
**balena.models.apiKey.getAllNamedUserApiKeys([options]) ⇒ <code>Promise</code>**

**Summary**: Get all named user API keys of the current user  
**Access**: public  
**Fulfil**: <code>Object[]</code> - apiKeys  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.apiKey.getAllNamedUserApiKeys().then(function(apiKeys) {
	console.log(apiKeys);
});
```
## getProvisioningApiKeysByApplication
**balena.models.apiKey.getProvisioningApiKeysByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all provisioning API keys for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - apiKeys  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.apiKey.getProvisioningApiKeysByApplication('myorganization/myapp').then(function(apiKeys) {
	console.log(apiKeys);
});
```
## getDeviceApiKeysByDevice
**balena.models.apiKey.getDeviceApiKeysByDevice(uuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all API keys for a device  
**Access**: public  
**Fulfil**: <code>Object[]</code> - apiKeys  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device, uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.apiKey.getDeviceApiKeysByDevice('7cf02a6').then(function(apiKeys) {
	console.log(apiKeys);
});
```
## update
**balena.models.apiKey.update(id, apiKeyInfo) ⇒ <code>Promise</code>**

**Summary**: Update the details of an API key  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | API key id |
| apiKeyInfo | <code>Object</code> | an object with the updated name|description|expiryDate |

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
## revoke
**balena.models.apiKey.revoke(id) ⇒ <code>Promise</code>**

**Summary**: Revoke an API key  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | API key id |

**Example**  
```js
balena.models.apiKey.revoke(123);
```