# Billing

`balena.models.billing` : `object`

**Note!** The billing methods are available on Balena.io exclusively.

**Kind**: static namespace

***

## changePlan

`balena.models.billing.changePlan(organization, planChangeOptions)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Change the current billing plan\
**Access**: public

| Param                           | Type                 | Description                                                |
| ------------------------------- | -------------------- | ---------------------------------------------------------- |
| organization                    | `String` \| `Number` | handle (string) or id (number) of the target organization. |
| planChangeOptions               | `Object`             | an object containing the billing plan change options       |
| billingInfo.tier                | `String`             | the code of the target billing plan                        |
| billingInfo.cycle               | `String`             | the billing cycle                                          |
| \[billingInfo.planChangeReason] | `String`             | the reason for changing the current plan                   |

**Example**

```js
balena.models.billing.changePlan(orgId, { billingCode: 'prototype-v2', cycle: 'annual' }).then(function() {
	console.log('Plan changed!');
});
```

***

## createSetupIntent

`balena.models.billing.createSetupIntent(setupIntentParams)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Create a Stripe setup intent required for setting billing information\
**Access**: public\
**Fulfil**: `Object` - partial stripe setup intent object

| Param                                 | Type                    | Description                                                       |
| ------------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| setupIntentParams                     | `Object`                | an object containing the parameters for the setup intent creation |
| extraParams.organization              | `String` \| `Number`    | handle (string) or id (number) of the target organization.        |
| \[extraParams.'g-recaptcha-response'] | `String` \| `undefined` | the captcha response                                              |

**Example**

```js
balena.models.billing.createSetupIntent(orgId).then(function(setupIntent) {
	console.log(setupIntent);
});
```

***

## downloadInvoice

`balena.models.billing.downloadInvoice(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Download a specific invoice\
**Access**: public\
**Fulfil**: `Blob|ReadableStream` - blob on the browser, download stream on node

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |
|              | `String`             | an invoice number                                          |

**Example**

```js
# Browser
balena.models.billing.downloadInvoice(orgId, '0000').then(function(blob) {
	console.log(blob);
});
# Node
balena.models.billing.downloadInvoice(orgId, '0000').then(function(stream) {
	stream.pipe(fs.createWriteStream('foo/bar/invoice-0000.pdf'));
});
```

***

## getAccount

`balena.models.billing.getAccount(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Get the user's billing account\
**Access**: public\
**Fulfil**: `Object` - billing account

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |

**Example**

```js
balena.models.billing.getAccount(orgId).then(function(billingAccount) {
	console.log(billingAccount);
});
```

***

## getBillingInfo

`balena.models.billing.getBillingInfo(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Get the current billing information\
**Access**: public\
**Fulfil**: `Object` - billing information

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |

**Example**

```js
balena.models.billing.getBillingInfo(orgId).then(function(billingInfo) {
	console.log(billingInfo);
});
```

***

## getInvoices

`balena.models.billing.getInvoices(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Get the available invoices\
**Access**: public\
**Fulfil**: `Object` - invoices

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |

**Example**

```js
balena.models.billing.getInvoices(orgId).then(function(invoices) {
	console.log(invoices);
});
```

***

## getPlan

`balena.models.billing.getPlan(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Get the current billing plan\
**Access**: public\
**Fulfil**: `Object` - billing plan

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |

**Example**

```js
balena.models.billing.getPlan(orgId).then(function(billingPlan) {
	console.log(billingPlan);
});
```

***

## removeBillingInfo

`balena.models.billing.removeBillingInfo(organization)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Remove an organization's billing information\
**Access**: public

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |

**Example**

```js
balena.models.billing.removeBillingInfo(orgId).then(function() {
	console.log("Success");
});
```

***

## updateAccountInfo

`balena.models.billing.updateAccountInfo(organization, accountInfo)`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Update the current billing account information\
**Access**: public

| Param        | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| organization | `String` \| `Number` | handle (string) or id (number) of the target organization. |
| accountInfo  | `AccountInfo`        | an object containing billing account info                  |

**Example**

```js
balena.models.billing.updateAccountInfo(orgId, { email: 'hello@balena.io' })
```

**Example**

```js
balena.models.billing.updateAccountInfo(orgId, { email: 'hello@balena.io' })
```

***

## updateBillingInfo

`balena.models.billing.updateBillingInfo(organization, billingInfo)` ⇒ `Promise`

**Kind**: static method of [`billing`](billing.md#balena.models.billing)\
**Summary**: Update the current billing information\
**Access**: public\
**Fulfil**: `Object` - billing information

| Param                                 | Type                    | Description                                                |
| ------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| organization                          | `String` \| `Number`    | handle (string) or id (number) of the target organization. |
| billingInfo                           | `Object`                | an object containing a billing info token\_id              |
| billingInfo.token\_id                 | `String`                | the token id generated for the billing info form           |
| \[billingInfo.'g-recaptcha-response'] | `String` \| `undefined` | the captcha response                                       |
| \[billingInfo.token\_type]            | `String` \| `undefined` | token type                                                 |

**Example**

```js
balena.models.billing.updateBillingInfo(orgId, { token_id: 'xxxxxxx' }).then(function(billingInfo) {
	console.log(billingInfo);
});
```

***
