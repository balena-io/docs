# Billing

**models.billing : <code>object</code>**

**Note!** The billing methods are available on Balena.io exclusively.

## getAccount
**balena.models.billing.getAccount(organization) ⇒ <code>Promise</code>**

**Summary**: Get the user's billing account  
**Access**: public  
**Fulfil**: <code>Object</code> - billing account  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |

**Example**  
```js
balena.models.billing.getAccount(orgId).then(function(billingAccount) {
	console.log(billingAccount);
});
```
## getPlan
**balena.models.billing.getPlan(organization) ⇒ <code>Promise</code>**

**Summary**: Get the current billing plan  
**Access**: public  
**Fulfil**: <code>Object</code> - billing plan  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |

**Example**  
```js
balena.models.billing.getPlan(orgId).then(function(billingPlan) {
	console.log(billingPlan);
});
```
## getBillingInfo
**balena.models.billing.getBillingInfo(organization) ⇒ <code>Promise</code>**

**Summary**: Get the current billing information  
**Access**: public  
**Fulfil**: <code>Object</code> - billing information  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |

**Example**  
```js
balena.models.billing.getBillingInfo(orgId).then(function(billingInfo) {
	console.log(billingInfo);
});
```
## createSetupIntent
**balena.models.billing.createSetupIntent(setupIntentParams) ⇒ <code>Promise</code>**

**Summary**: Create a Stripe setup intent required for setting billing information  
**Access**: public  
**Fulfil**: <code>Object</code> - partial stripe setup intent object  

| Param | Type | Description |
| --- | --- | --- |
| setupIntentParams | <code>Object</code> | an object containing the parameters for the setup intent creation |
| extraParams.organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
| [extraParams.'g-recaptcha-response'] | <code>String</code> \| <code>undefined</code> | the captcha response |

**Example**  
```js
balena.models.billing.createSetupIntent(orgId).then(function(setupIntent) {
	console.log(setupIntent);
});
```
## updateBillingInfo
**balena.models.billing.updateBillingInfo(organization, billingInfo) ⇒ <code>Promise</code>**

**Summary**: Update the current billing information  
**Access**: public  
**Fulfil**: <code>Object</code> - billing information  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
| billingInfo | <code>Object</code> | an object containing a billing info token_id |
| billingInfo.token_id | <code>String</code> | the token id generated for the billing info form |
| [billingInfo.'g-recaptcha-response'] | <code>String</code> \| <code>undefined</code> | the captcha response |
| [billingInfo.token_type] | <code>String</code> \| <code>undefined</code> | token type |

**Example**  
```js
balena.models.billing.updateBillingInfo(orgId, { token_id: 'xxxxxxx' }).then(function(billingInfo) {
	console.log(billingInfo);
});
```
## removeBillingInfo
**balena.models.billing.removeBillingInfo(organization) ⇒ <code>Promise</code>**

**Summary**: Remove an organization's billing information  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |

**Example**  
```js
balena.models.billing.removeBillingInfo(orgId).then(function() {
	console.log("Success");
});
```
## updateAccountInfo
**balena.models.billing.updateAccountInfo(organization, accountInfo)**

**Summary**: Update the current billing account information  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
| accountInfo | <code>AccountInfo</code> | an object containing billing account info |

**Example**  
```js
balena.models.billing.updateAccountInfo(orgId, { email: 'hello@balena.io' })
```
**Example**  
```js
balena.models.billing.updateAccountInfo(orgId, { email: 'hello@balena.io' })
```
## changePlan
**balena.models.billing.changePlan(organization, planChangeOptions) ⇒ <code>Promise</code>**

**Summary**: Change the current billing plan  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
| planChangeOptions | <code>Object</code> | an object containing the billing plan change options |
| billingInfo.tier | <code>String</code> | the code of the target billing plan |
| billingInfo.cycle | <code>String</code> | the billing cycle |
| [billingInfo.planChangeReason] | <code>String</code> | the reason for changing the current plan |

**Example**  
```js
balena.models.billing.changePlan(orgId, { billingCode: 'prototype-v2', cycle: 'annual' }).then(function() {
	console.log('Plan changed!');
});
```
## getInvoices
**balena.models.billing.getInvoices(organization) ⇒ <code>Promise</code>**

**Summary**: Get the available invoices  
**Access**: public  
**Fulfil**: <code>Object</code> - invoices  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |

**Example**  
```js
balena.models.billing.getInvoices(orgId).then(function(invoices) {
	console.log(invoices);
});
```
## downloadInvoice
**balena.models.billing.downloadInvoice(organization) ⇒ <code>Promise</code>**

**Summary**: Download a specific invoice  
**Access**: public  
**Fulfil**: <code>Blob\|ReadableStream</code> - blob on the browser, download stream on node  

| Param | Type | Description |
| --- | --- | --- |
| organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the target organization. |
|  | <code>String</code> | an invoice number |

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