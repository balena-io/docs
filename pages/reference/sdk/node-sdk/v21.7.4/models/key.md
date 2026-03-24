# Key

**models.key : <code>object</code>**

## getAll
**balena.models.key.getAll([options]) ⇒ <code>Promise</code>**

**Summary**: Get all ssh keys  
**Access**: public  
**Fulfil**: <code>Object[]</code> - ssh keys  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.key.getAll().then(function(keys) {
	console.log(keys);
});
```
## get
**balena.models.key.get(id) ⇒ <code>Promise</code>**

**Summary**: Get a single ssh key  
**Access**: public  
**Fulfil**: <code>Object</code> - ssh key  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | key id |

**Example**  
```js
balena.models.key.get(51).then(function(key) {
	console.log(key);
});
```
## remove
**balena.models.key.remove(id) ⇒ <code>Promise</code>**

**Summary**: Remove ssh key  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | key id |

**Example**  
```js
balena.models.key.remove(51);
```
## create
**balena.models.key.create(title, key) ⇒ <code>Promise</code>**

**Summary**: Create a ssh key  
**Access**: public  
**Fulfil**: <code>Object</code> - ssh key  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | key title |
| key | <code>String</code> | the public ssh key |

**Example**  
```js
balena.models.key.create('Main', 'ssh-rsa AAAAB....').then(function(key) {
	console.log(key);
});
```