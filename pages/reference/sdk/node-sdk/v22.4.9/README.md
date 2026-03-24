# v22.4.9


## Installation

Install the balena SDK by running:

```sh
$ npm install --save balena-sdk
```

### Bundling for browsers

If you're using webpack, browserify, or a similar tool then you probably want to bundle the balena SDK into your application yourself, rather than using the pre-built `balena-browser.min.js` bundle. 

If you intend to do that, be sure to remove the following dependencies that are actually unnecessary in the browser, because they're only used in Node environments. This will significantly reduce the size of your resulting bundle:

* fs
* path
* balena-settings-client
* node-localstorage
* fs/promises
* mime

### Bundling with pkg

The balena SDK includes builds for various ECMAScript versions that are
dynamically selected at runtime (using 
[@balena/es-version](https://github.com/balena-io-modules/balena-es-version)).
For this reason, packagers like [pkg](https://github.com/vercel/pkg) are not
able to automatically detect which assets to include in the output package. The
following sample `pkg` section should be added to your application's
`package.json` file to instruct `pkg` to bundle the required assets:

```json
  "pkg": {
    "scripts": [
      "node_modules/balena-sdk/**/*.js"
    ],
    "assets": [
      "node_modules/pinejs-client-core/**/*"
    ]
  }
```

For more information, please refer to the respective
[documentation from the `pkg` project](https://github.com/vercel/pkg#config).

## Trying balenaSDK in the browser

BalenaSDK is widely utilized in the [balenaCloud dashboard](https://dashboard.balena-cloud.com/) to perform operations. The SDK has been made available in the browser console by default to test balenaSDK queries on the go. 
To use it, head to the [balenaCloud dashboard](https://dashboard.balena-cloud.com/) and open the [browser developer console](https://support.monday.com/hc/en-us/articles/360002197259-How-to-Open-the-Developer-Console). There, you will find balenaSDK initialized in the console and ready to run SDK queries.

![](https://user-images.githubusercontent.com/22801822/157650701-d47ee5bc-28e4-4ca9-9aba-e208d47698c3.png)


If you feel something is missing, not clear or could be improved, please don't hesitate to open an
[issue in GitHub](https://github.com/balena-io/balena-sdk/issues/new), we'll be happy to help.****

## balena-sdk

### balena-sdk~getSdk()
The module exports a single factory function.

**Summary**: Creates a new SDK instance using the default or the provided options.  
**Example**  
```js
// with es6 imports
import { getSdk } from 'balena-sdk';
// or with node require
const { getSdk } = require('balena-sdk');

const balena = getSdk({
	apiUrl: "https://api.balena-cloud.com/",
	dataDirectory: "/opt/local/balena"
});
```
<a name="module_balena-sdk..setSharedOptions"></a>

### balena-sdk~setSharedOptions(options)
Set options that are used by calls to `fromSharedOptions()`.
The options accepted are the same as those used in the main SDK factory function.
If you use this method, it should be called as soon as possible during app
startup and before any calls to `fromSharedOptions()` are made.

**Summary**: Set shared default options  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The shared default options |
| [options.apiUrl] | <code>String</code> | <code>&#x27;https://api.balena-cloud.com/&#x27;</code> | the balena API url to use. |
| [options.builderUrl] | <code>String</code> | <code>&#x27;https://builder.balena-cloud.com/&#x27;</code> | the balena builder url to use. |
| [options.deviceUrlsBase] | <code>String</code> | <code>&#x27;balena-devices.com&#x27;</code> | the base balena device API url to use. |
| [options.requestLimit] | <code>Number</code> |  | the number of requests per requestLimitInterval that the SDK should respect. |
| [options.requestLimitInterval] | <code>Number</code> | <code>60000</code> | the timespan that the requestLimit should apply to in milliseconds, defaults to 60000 (1 minute). |
| [options.retryRateLimitedRequests] | <code>Boolean</code> \| <code>function</code> | <code>false</code> | Determines whether to automatically retry requests that are failing with a 429 Too Many Requests status code and that include a numeric Retry-After response header. - If `false`, rate-limited requests will not be retried, and the rate limit error will be propagated. - If `true`, all rate-limited requests will be retried after the duration specified by the `Retry-After` header. - If a function `(retryAfterMs: number) => boolean` is provided, it will be called with the retry duration in ms and the request will be retried only when `true` is returned. |
| [options.dataDirectory] | <code>String</code> \| <code>False</code> | <code>&#x27;$HOME/.balena&#x27;</code> | *ignored in the browser unless false*, the directory where the user settings are stored, normally retrieved like `require('balena-settings-client').get('dataDirectory')`. Providing `false` creates an isolated in-memory instance. |
| [options.isBrowser] | <code>Boolean</code> |  | the flag to tell if the module works in the browser. If not set will be computed based on the presence of the global `window` value. |
| [options.debug] | <code>Boolean</code> |  | when set will print some extra debug information. |

**Example**  
```js
import { setSharedOptions } from 'balena-sdk';
setSharedOptions({
	apiUrl: 'https://api.balena-cloud.com/',
	builderUrl: 'https://builder.balena-cloud.com/',
	isBrowser: true,
});
```
<a name="module_balena-sdk..fromSharedOptions"></a>

### balena-sdk~fromSharedOptions()
Create an SDK instance using shared default options set using the `setSharedOptions()` method.
If options have not been set using this method, then this method will use the
same defaults as the main SDK factory function.

**Summary**: Create an SDK instance using shared default options  
**Access**: public  
**Example**  
```js
import { fromSharedOptions } from 'balena-sdk';
const sdk = fromSharedOptions();
```