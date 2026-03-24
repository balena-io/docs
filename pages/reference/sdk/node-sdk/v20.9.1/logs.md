# Logs

**balena.logs : <code>object</code>**

## subscribe
**balena.logs.subscribe(uuidOrId, [options]) ⇒ <code>Promise.&lt;LogSubscription&gt;</code>**

Connects to the stream of devices logs, returning a LogSubscription, which
can be used to listen for logs as they appear, line by line.

**Summary**: Subscribe to device logs  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> |  | options |
| [options.count] | <code>Number</code> \| <code>&#x27;all&#x27;</code> | <code>0</code> | number of historical messages to include (or 'all') |

**Example**  
```js
balena.logs.subscribe('7cf02a6').then(function(logs) {
	logs.on('line', function(line) {
		console.log(line);
	});
});
```
**Example**  
```js
balena.logs.subscribe(123).then(function(logs) {
	logs.on('line', function(line) {
		console.log(line);
	});
});
```
## history
**balena.logs.history(uuidOrId, [options]) ⇒ <code>Promise</code>**

Get an array of the latest log messages for a given device.

**Summary**: Get device logs history  
**Access**: public  
**Fulfil**: <code>Object[]</code> - history lines  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uuidOrId | <code>String</code> \| <code>Number</code> |  | device uuid (string) or id (number) |
| [options] | <code>Object</code> |  | options |
| [options.count] | <code>Number</code> \| <code>&#x27;all&#x27;</code> | <code>1000</code> | number of log messages to return (or 'all') |

**Example**  
```js
balena.logs.history('7cf02a6').then(function(lines) {
	lines.forEach(function(line) {
		console.log(line);
	});
});
```
**Example**  
```js
balena.logs.history(123).then(function(lines) {
	lines.forEach(function(line) {
		console.log(line);
	});
});
```
## LogSubscription
**balena.logs.LogSubscription : <code>EventEmitter</code>**

The log subscription emits events as log data arrives.
You can get a LogSubscription for a given device by calling `balena.logs.subscribe(deviceId)`

### unsubscribe
**balena.logs.LogSubscription.unsubscribe()**

Disconnect from the logs feed and stop receiving any future events on this emitter.

**Summary**: Unsubscribe from device logs  
**Access**: public  
**Example**  
```js
logs.unsubscribe();
```
### event_line
**balena.logs.LogSubscription.event_line**

**Summary**: Event fired when a new line of log output is available  
**Example**  
```js
logs.on('line', function(line) {
	console.log(line);
});
```
### event_error
**balena.logs.LogSubscription.event_error**

**Summary**: Event fired when an error has occured reading the device logs  
**Example**  
```js
logs.on('error', function(error) {
	console.error(error);
});
```