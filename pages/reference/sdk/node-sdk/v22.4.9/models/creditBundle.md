# CreditBundle

**models.creditBundle : <code>object</code>**

## getAllByOrg
**balena.models.creditBundle.getAllByOrg(organization, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all of the credit bundles purchased by the given org  
**Access**: public  
**Fulfil**: <code>Object[]</code> - credit bundles  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> |  | handle (string) or id (number) of the target organization. |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.creditBundle.getAllByOrg(orgId).then(function(creditBundles) {
	console.log(creditBundles);
});
```
## create
**balena.models.creditBundle.create(organization, featureId, creditsToPurchase) ⇒ <code>Promise</code>**

**Summary**: Purchase a credit bundle for the given feature and org of the given quantity  
**Access**: public  
**Fulfil**: <code>Object[]</code> - credit bundles  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
| featureId | <code>Number</code> | id (number) of the feature for which credits are being purchased. |
| creditsToPurchase | <code>Number</code> | number of credits being purchased. |

**Example**  
```js
balena.models.creditBundle.create(orgId, featureId, creditsToPurchase).then(function(creditBundle) {
	console.log(creditBundle);
});
```