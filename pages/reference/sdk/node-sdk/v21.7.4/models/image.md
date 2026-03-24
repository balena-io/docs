# Image

**models.image : <code>object</code>**

## get
**balena.models.image.get(id, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a specific image  
**Access**: public  
**Fulfil**: <code>Object</code> - image  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>Number</code> |  | image id |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.image.get(123).then(function(image) {
	console.log(image);
});
```
## getLogs
**balena.models.image.getLogs(id) ⇒ <code>Promise</code>**

**Summary**: Get the logs for an image  
**Access**: public  
**Fulfil**: <code>string \| null</code> - logs  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | image id |

**Example**  
```js
balena.models.image.getLogs(123).then(function(logs) {
	console.log(logs);
});
```