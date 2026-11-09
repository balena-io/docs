# Settings

`balena.settings` : `object`

**Kind**: static namespace

***

## get

`balena.settings.get([key])` ⇒ `Promise`

**Kind**: static method of [`settings`](settings.md#balena.settings)\
**Summary**: Get a single setting. **Only implemented in Node.js**\
**Access**: public\
**Fulfil**: `*` - setting value

| Param  | Type     | Description |
| ------ | -------- | ----------- |
| \[key] | `String` | setting key |

**Example**

```js
balena.settings.get('apiUrl').then(function(apiUrl) {
	console.log(apiUrl);
});
```

***

## getAll

`balena.settings.getAll()` ⇒ `Promise`

**Kind**: static method of [`settings`](settings.md#balena.settings)\
**Summary**: Get all settings **Only implemented in Node.js**\
**Access**: public\
**Fulfil**: `Object` - settings\
**Example**

```js
balena.settings.getAll().then(function(settings) {
	console.log(settings);
});
```

***
