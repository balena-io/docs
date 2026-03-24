# Settings

**balena.settings : <code>object</code>**

## get
**balena.settings.get([key]) ⇒ <code>Promise</code>**

**Summary**: Get a single setting. **Only implemented in Node.js**  
**Access**: public  
**Fulfil**: <code>\*</code> - setting value  

| Param | Type | Description |
| --- | --- | --- |
| [key] | <code>String</code> | setting key |

**Example**  
```js
balena.settings.get('apiUrl').then(function(apiUrl) {
	console.log(apiUrl);
});
```
## getAll
**balena.settings.getAll() ⇒ <code>Promise</code>**

**Summary**: Get all settings **Only implemented in Node.js**  
**Access**: public  
**Fulfil**: <code>Object</code> - settings  
**Example**  
```js
balena.settings.getAll().then(function(settings) {
	console.log(settings);
});
```