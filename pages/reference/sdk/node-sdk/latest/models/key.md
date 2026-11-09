# Key

`balena.models.key` : `object`

**Kind**: static namespace

***

## create

`balena.models.key.create(title, key)` ⇒ `Promise`

**Kind**: static method of [`key`](key.md#balena.models.key)\
**Summary**: Create a ssh key\
**Access**: public\
**Fulfil**: `Object` - ssh key

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| title | `String` | key title          |
| key   | `String` | the public ssh key |

**Example**

```js
balena.models.key.create('Main', 'ssh-rsa AAAAB....').then(function(key) {
	console.log(key);
});
```

***

## get

`balena.models.key.get(id)` ⇒ `Promise`

**Kind**: static method of [`key`](key.md#balena.models.key)\
**Summary**: Get a single ssh key\
**Access**: public\
**Fulfil**: `Object` - ssh key

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `Number` | key id      |

**Example**

```js
balena.models.key.get(51).then(function(key) {
	console.log(key);
});
```

***

## getAll

`balena.models.key.getAll([options])` ⇒ `Promise`

**Kind**: static method of [`key`](key.md#balena.models.key)\
**Summary**: Get all ssh keys\
**Access**: public\
**Fulfil**: `Object[]` - ssh keys

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.key.getAll().then(function(keys) {
	console.log(keys);
});
```

***

## remove

`balena.models.key.remove(id)` ⇒ `Promise`

**Kind**: static method of [`key`](key.md#balena.models.key)\
**Summary**: Remove ssh key\
**Access**: public

| Param | Type     | Description |
| ----- | -------- | ----------- |
| id    | `Number` | key id      |

**Example**

```js
balena.models.key.remove(51);
```

***
