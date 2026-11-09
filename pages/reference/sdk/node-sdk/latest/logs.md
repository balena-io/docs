# Logs

`balena.logs` : `object`

**Kind**: static namespace

***

## history

`balena.logs.history(uuidOrId, [options])` ⇒ `Promise`

Get an array of the latest log messages for a given device.

**Kind**: static method of [`logs`](logs.md#balena.logs)\
**Summary**: Get device logs history\
**Access**: public\
**Fulfil**: `Object[]` - history lines

| Param            | Type                 | Default | Description                                                                  |
| ---------------- | -------------------- | ------- | ---------------------------------------------------------------------------- |
| uuidOrId         | `String` \| `Number` |         | device uuid (string) or id (number)                                          |
| \[options]       | `Object`             |         | options                                                                      |
| \[options.count] | `Number` \| `'all'`  | `1000`  | number of log messages to return (or 'all')                                  |
| \[options.start] | `Number` \| `String` |         | the timestamp or ISO Date string after which to retrieve historical messages |

**Example**

```js
balena.logs.history('7cf02a69e4d34c9da573914963cf54fd').then(function(lines) {
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

**Example**

```js
const oneDayAgoTimestamp = Date.now() - 24*60*60*1000;
balena.logs.history('7cf02a69e4d34c9da573914963cf54fd', { start: oneDayAgoTimestamp }).then(function(lines) {
	lines.forEach(function(line) {
		console.log(line);
	});
});
```

**Example**

```js
const oneDayAgoIsoDateString = new Date(Date.now() - 24*60*60*1000).toISOString();
balena.logs.history('7cf02a69e4d34c9da573914963cf54fd', { start: oneDayAgoIsoDateString }).then(function(lines) {
	lines.forEach(function(line) {
		console.log(line);
	});
});
```

***

## subscribe

`balena.logs.subscribe(uuidOrId, [options])` ⇒ `Promise.<LogSubscription>`

Connects to the stream of devices logs, returning a LogSubscription, which can be used to listen for logs as they appear, line by line.

**Kind**: static method of [`logs`](logs.md#balena.logs)\
**Summary**: Subscribe to device logs\
**Access**: public\
**Fulfil**: [`LogSubscription`](logs.md#balena.logs.LogSubscription)

| Param            | Type                 | Default | Description                                                                                                                                  |
| ---------------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| uuidOrId         | `String` \| `Number` |         | device uuid (string) or id (number)                                                                                                          |
| \[options]       | `Object`             |         | options                                                                                                                                      |
| \[options.count] | `Number` \| `'all'`  | `0`     | number of historical messages to include (or 'all')                                                                                          |
| \[options.start] | `Number` \| `String` |         | the timestamp or ISO Date string after which to retrieve historical messages. When specified, the count parameter needs to also be provided. |

**Example**

```js
balena.logs.subscribe('7cf02a69e4d34c9da573914963cf54fd').then(function(logs) {
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

***

## LogSubscription

`balena.logs.LogSubscription` : `EventEmitter`

The log subscription emits events as log data arrives. You can get a LogSubscription for a given device by calling `balena.logs.subscribe(deviceId)`

**Kind**: static typedef of [`logs`](logs.md#balena.logs)

***

### unsubscribe

`balena.logs.LogSubscription.unsubscribe()`

Disconnect from the logs feed and stop receiving any future events on this emitter.

**Kind**: static method of [`LogSubscription`](logs.md#balena.logs.LogSubscription)\
**Summary**: Unsubscribe from device logs\
**Access**: public\
**Example**

```js
logs.unsubscribe();
```

***

### error

`balena.logs.LogSubscription.event:error`

**Kind**: event emitted by [`LogSubscription`](logs.md#balena.logs.LogSubscription)\
**Summary**: Event fired when an error has occured reading the device logs\
**Example**

```js
logs.on('error', function(error) {
	console.error(error);
});
```

***

### line

`balena.logs.LogSubscription.event:line`

**Kind**: event emitted by [`LogSubscription`](logs.md#balena.logs.LogSubscription)\
**Summary**: Event fired when a new line of log output is available\
**Example**

```js
logs.on('line', function(line) {
	console.log(line);
});
```

***
