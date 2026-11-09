# Utils

`balena.utils` : `Object`

The utils instance offers some convenient features for clients.

**Kind**: static member\
**Summary**: Balena utils instance\
**Access**: public\
**Example**

```js
balena.utils.mergePineOptions(
 { $expand: { device: { $select: ['id'] } } },
 { $expand: { device: { $select: ['name'] } } },
);
```

***
