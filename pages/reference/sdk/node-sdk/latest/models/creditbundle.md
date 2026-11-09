# CreditBundle

`balena.models.creditBundle` : `object`

**Kind**: static namespace

***

## create

`balena.models.creditBundle.create(organization, featureId, creditsToPurchase)` ⇒ `Promise`

**Kind**: static method of [`creditBundle`](creditbundle.md#balena.models.creditBundle)\
**Summary**: Purchase a credit bundle for the given feature and org of the given quantity\
**Access**: public\
**Fulfil**: `Object[]` - credit bundles

| Param             | Type                 | Description                                                       |
| ----------------- | -------------------- | ----------------------------------------------------------------- |
| organization      | `String` \| `Number` | handle (string) or id (number) of the target organization.        |
| featureId         | `Number`             | id (number) of the feature for which credits are being purchased. |
| creditsToPurchase | `Number`             | number of credits being purchased.                                |

**Example**

```js
balena.models.creditBundle.create(orgId, featureId, creditsToPurchase).then(function(creditBundle) {
	console.log(creditBundle);
});
```

***

## getAllByOrg

`balena.models.creditBundle.getAllByOrg(organization, [options])` ⇒ `Promise`

**Kind**: static method of [`creditBundle`](creditbundle.md#balena.models.creditBundle)\
**Summary**: Get all of the credit bundles purchased by the given org\
**Access**: public\
**Fulfil**: `Object[]` - credit bundles

| Param        | Type                 | Default | Description                                                |
| ------------ | -------------------- | ------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` |         | handle (string) or id (number) of the target organization. |
| \[options]   | `Object`             | `{}`    | extra pine options to use                                  |

**Example**

```js
balena.models.creditBundle.getAllByOrg(orgId).then(function(creditBundles) {
	console.log(creditBundles);
});
```

***
