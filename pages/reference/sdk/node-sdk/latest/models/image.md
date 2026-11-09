# Image

`balena.models.image` : `object`

**Kind**: static namespace

***

## get

`balena.models.image.get(id, [options])` ⇒ `Promise`

**Kind**: static method of [`image`](image.md#balena.models.image)\
**Summary**: Get a specific image\
**Access**: public\
**Fulfil**: `Object` - image

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| id         | `Number` |         | image id                  |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.image.get(123).then(function(image) {
	console.log(image);
});
```

***

## getLogs

`balena.models.image.getLogs(id)` ⇒ `Promise`

**Kind**: static method of [`image`](image.md#balena.models.image)\
**Summary**: Get the logs for an image\
**Access**: public\
**Fulfil**: `string | null` - logs

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `Number` | image id    |

**Example**

```js
balena.models.image.getLogs(123).then(function(logs) {
	console.log(logs);
});
```

***
