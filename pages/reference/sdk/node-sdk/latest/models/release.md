# Release

`balena.models.release` : `object`

**Kind**: static namespace

***

## createFromUrl

`balena.models.release.createFromUrl(slugOrUuidOrId, urlDeployOptions)` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Create a new release built from the source in the provided url\
**Access**: public\
**Fulfil**: `number` - release ID

| Param                             | Type                 | Default | Description                                                                        |
| --------------------------------- | -------------------- | ------- | ---------------------------------------------------------------------------------- |
| slugOrUuidOrId                    | `String` \| `Number` |         | application slug (string), uuid (string) or id (number)                            |
| urlDeployOptions                  | `Object`             |         | builder options                                                                    |
| urlDeployOptions.url              | `String`             |         | a url with a tarball of the project to build                                       |
| \[urlDeployOptions.shouldFlatten] | `Boolean`            | `true`  | Should be true when the tarball includes an extra root folder with all the content |

**Example**

```js
balena.models.release.createFromUrl('myorganization/myapp', { url: 'https://github.com/balena-io-projects/simple-server-node/archive/v1.0.0.tar.gz' }).then(function(releaseId) {
	console.log(releaseId);
});
```

**Example**

```js
balena.models.release.createFromUrl(123, { url: 'https://github.com/balena-io-projects/simple-server-node/archive/v1.0.0.tar.gz' }).then(function(releaseId) {
	console.log(releaseId);
});
```

***

## finalize

`balena.models.release.finalize(commitOrIdOrRawVersion)` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Finalizes a draft release\
**Access**: public\
**Fulfil**: `void`

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |

**Example**

```js
balena.models.release.finalize(123).then(function() {
	console.log('finalized!');
});
```

**Example**

```js
balena.models.release.finalize('7cf02a69e4d34c9da573914963cf54fd').then(function() {
	console.log('finalized!');
});
```

**Example**

```js
balena.models.release.finalize({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log('finalized!');
});
```

***

## get

`balena.models.release.get(commitOrIdOrRawVersion, [options])` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Get a specific release\
**Access**: public\
**Fulfil**: `Object` - release

| Param                  | Type                             | Default | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` |         | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| \[options]             | `Object`                         | `{}`    | extra pine options to use                                                                                                                        |

**Example**

```js
balena.models.release.get(123).then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.release.get('7cf02a69e4d34c9da573914963cf54fd').then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.release.get({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log(release);
});
```

***

## getAllByApplication

`balena.models.release.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Get all releases from an application\
**Access**: public\
**Fulfil**: `Object[]` - releases

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.release.getAllByApplication('myorganization/myapp').then(function(releases) {
	console.log(releases);
});
```

**Example**

```js
balena.models.release.getAllByApplication(123).then(function(releases) {
	console.log(releases);
});
```

***

## getLatestByApplication

`balena.models.release.getLatestByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Get the latest successful release for an application\
**Access**: public\
**Fulfil**: `Object|undefined` - release

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.release.getLatestByApplication('myorganization/myapp').then(function(releases) {
	console.log(releases);
});
```

**Example**

```js
balena.models.release.getLatestByApplication(123).then(function(releases) {
	console.log(releases);
});
```

***

## getWithImageDetails

`balena.models.release.getWithImageDetails(commitOrIdOrRawVersion, [options])` ⇒ `Promise`

This method does not map exactly to the underlying model: it runs a larger prebuilt query, and reformats it into an easy to use and understand format. If you want significantly more control, or to see the raw model directly, use `release.get(id, options)` instead.

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Get a specific release with the details of the images built\
**Access**: public\
**Fulfil**: `Object` - release with image details

| Param                  | Type                             | Default | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` |         | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| \[options]             | `Object`                         | `{}`    | a map of extra pine options                                                                                                                      |
| \[options.release]     | `Boolean`                        | `{}`    | extra pine options for releases                                                                                                                  |
| \[options.image]       | `Object`                         | `{}`    | extra pine options for images                                                                                                                    |

**Example**

```js
balena.models.release.getWithImageDetails(123).then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.release.getWithImageDetails('7cf02a69e4d34c9da573914963cf54fd').then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.release.getWithImageDetails({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log(release);
});
```

**Example**

```js
balena.models.release.getWithImageDetails(123, { image: { $select: 'build_log' } })
.then(function(release) {
	console.log(release.images[0].build_log);
});
```

***

## setIsInvalidated

`balena.models.release.setIsInvalidated(commitOrIdOrRawVersion, isInvalidated)` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Set the is\_invalidated property of a release to true or false\
**Access**: public\
**Fulfil**: `void`

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| isInvalidated          | `Boolean`                        | boolean value, true for invalidated, false for validated                                                                                         |

**Example**

```js
balena.models.release.setIsInvalidated(123, true).then(function() {
	console.log('invalidated!');
});
```

**Example**

```js
balena.models.release.setIsInvalidated('7cf02a69e4d34c9da573914963cf54fd', true).then(function() {
	console.log('invalidated!');
});
```

**Example**

```js
balena.models.release.setIsInvalidated({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log('invalidated!);
});
```

**Example**

```js
balena.models.release.setIsInvalidated(123, false).then(function() {
	console.log('validated!');
});
```

**Example**

```js
balena.models.release.setIsInvalidated('7cf02a69e4d34c9da573914963cf54fd', false).then(function() {
	console.log('validated!');
});
```

***

## setKnownIssueList

`balena.models.release.setKnownIssueList(commitOrIdOrRawVersion, knownIssueListOrNull)` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Add a known issue list to a release\
**Access**: public

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| knownIssueListOrNull   | `String` \| `null`               | the known issue list                                                                                                                             |

**Example**

```js
balena.models.release.setKnownIssueList('7cf02a69e4d34c9da573914963cf54fd', 'This is an issue');
```

**Example**

```js
balena.models.release.setKnownIssueList(123, 'This is an issue');
```

**Example**

```js
balena.models.release.setKnownIssueList({application: 456, rawVersion: '0.0.0'}, 'This is an issue');
```

***

## setNote

`balena.models.release.setNote(commitOrIdOrRawVersion, noteOrNull)` ⇒ `Promise`

**Kind**: static method of [`release`](release.md#balena.models.release)\
**Summary**: Add a note to a release\
**Access**: public

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| noteOrNull             | `String` \| `null`               | the note                                                                                                                                         |

**Example**

```js
balena.models.release.setNote('7cf02a69e4d34c9da573914963cf54fd', 'My useful note');
```

**Example**

```js
balena.models.release.setNote(123, 'My useful note');
```

**Example**

```js
balena.models.release.setNote({ application: 456, rawVersion: '0.0.0' }, 'My useful note');
```

***

## asset

`balena.models.release.asset` : `object`

**Kind**: static namespace of [`release`](release.md#balena.models.release)

***

### download

`balena.models.release.asset.download(id)` ⇒ `Promise`

**Kind**: static method of [`asset`](release.md#balena.models.release.asset)\
**Summary**: Download a release asset\
**Access**: public\
**Fulfil**: `NodeJS.ReadableStream` - download stream

| Param | Type                 | Description                                                                |
| ----- | -------------------- | -------------------------------------------------------------------------- |
| id    | `Number` \| `Object` | release asset ID or object specifying the unique release & asset\_key pair |

**Example**

```js
balena.models.release.asset.download(123).then(function(stream) {
	stream.pipe(fs.createWriteStream('logo.png'));
});
```

**Example**

```js
balena.models.release.asset.download({
	asset_key: 'logo.png',
	release: 123
}).then(function(stream) {
	stream.pipe(fs.createWriteStream('logo.png'));
});
```

***

### get

`balena.models.release.asset.get(id, [options])` ⇒ `Promise`

**Kind**: static method of [`asset`](release.md#balena.models.release.asset)\
**Summary**: Get a specific release asset\
**Access**: public\
**Fulfil**: `Object` - release asset

| Param      | Type                 | Default | Description                                                                |
| ---------- | -------------------- | ------- | -------------------------------------------------------------------------- |
| id         | `Number` \| `Object` |         | release asset ID or object specifying the unique release & asset\_key pair |
| \[options] | `Object`             | `{}`    | extra pine options to use                                                  |

**Example**

```js
balena.models.release.asset.get(123).then(function(asset) {
	console.log(asset);
});
```

**Example**

```js
balena.models.release.asset.get({
	asset_key: 'logo.png',
	release: 123
}).then(function(asset) {
	console.log(asset);
});
```

***

### getAllByRelease

`balena.models.release.asset.getAllByRelease(commitOrIdOrRawVersion, [options])` ⇒ `Promise`

**Kind**: static method of [`asset`](release.md#balena.models.release.asset)\
**Summary**: Get all release assets for a release\
**Access**: public\
**Fulfil**: `Object[]` - release assets

| Param                  | Type                             | Default | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` |         | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| \[options]             | `Object`                         | `{}`    | extra pine options to use                                                                                                                        |

**Example**

```js
balena.models.release.asset.getAllByRelease(123).then(function(assets) {
	console.log(assets);
});
```

**Example**

```js
balena.models.release.asset.getAllByRelease('7cf02a69e4d34c9da573914963cf54fd').then(function(assets) {
	console.log(assets);
});
```

**Example**

```js
balena.models.release.asset.getAllByRelease({ application: 456, raw_version: '1.2.3' }).then(function(assets) {
	console.log(assets);
});
```

***

### remove

`balena.models.release.asset.remove(id)` ⇒ `Promise`

**Kind**: static method of [`asset`](release.md#balena.models.release.asset)\
**Summary**: Remove a release asset\
**Access**: public

| Param | Type                 | Description                                                                |
| ----- | -------------------- | -------------------------------------------------------------------------- |
| id    | `Number` \| `Object` | release asset ID or object specifying the unique release & asset\_key pair |

**Example**

```js
balena.models.release.asset.remove(123);
```

**Example**

```js
balena.models.release.asset.remove({
	asset_key: 'logo.png',
	release: 123
});
```

***

### upload

`balena.models.release.asset.upload(uploadParams, [options])` ⇒ `Promise`

**Kind**: static method of [`asset`](release.md#balena.models.release.asset)\
**Summary**: Upload a release asset\
**Access**: public\
**Fulfil**: `Object` - uploaded release asset

| Param                       | Type               | Default   | Description                                                                                                                                       |
| --------------------------- | ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| uploadParams                | `Object`           |           | upload parameters                                                                                                                                 |
| uploadParams.asset          | `String` \| `File` |           | asset file path (string, Node.js only) or File object (Node.js & browser). For File objects, use new File(\[content], filename, {type: mimeType}) |
| uploadParams.asset\_key     | `String`           |           | unique key for the asset within the release                                                                                                       |
| uploadParams.release        | `Number`           |           | release ID                                                                                                                                        |
| \[options]                  | `Object`           | `{}`      | upload options                                                                                                                                    |
| \[options.chunkSize]        | `Number`           | `5242880` | chunk size for multipart uploads (5MiB default)                                                                                                   |
| \[options.parallelUploads]  | `Number`           | `5`       | number of parallel uploads for multipart                                                                                                          |
| \[options.overwrite]        | `Boolean`          | `false`   | whether to overwrite existing asset                                                                                                               |
| \[options.onUploadProgress] | `function`         |           | callback for upload progress                                                                                                                      |

**Example**

```js
// Upload from file path (Node.js)
balena.models.release.asset.upload({
	asset: '/path/to/logo.png',
	asset_key: 'logo.png',
	release: 123
}).then(function(asset) {
	console.log('Asset uploaded:', asset);
});
```

**Example**

```js
// Upload with File API (Node.js and browser)
const content = Buffer.from('Hello, World!', 'utf-8');
const file = new File([content], 'readme.txt', { type: 'text/plain' });

balena.models.release.asset.upload({
	asset: file,
	asset_key: 'readme.txt',
	release: 123
}).then(function(asset) {
	console.log('Asset uploaded:', asset);
});
```

**Example**

```js
// Upload large file with File API and progress tracking
const largeContent = new Uint8Array(10 * 1024 * 1024); // 10MB
const largeFile = new File([largeContent], 'data.bin', { type: 'application/octet-stream' });

balena.models.release.asset.upload({
	asset: largeFile,
	asset_key: 'data.bin',
	release: 123
}, {
	chunkSize: 5 * 1024 * 1024, // 5MB chunks
	parallelUploads: 3,
	onUploadProgress: function(progress) {
		const percent = (progress.uploaded / progress.total * 100).toFixed(2);
		console.log(`Upload progress: ${percent}%`);
	}
}).then(function(asset) {
	console.log('Large file uploaded:', asset);
});
```

**Example**

```js
// Browser: Upload file from input element
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0]; // File object from input

balena.models.release.asset.upload({
	asset: file,
	asset_key: file.name,
	release: 123
}).then(function(asset) {
	console.log('File uploaded from browser:', asset);
});
```

**Example**

```js
// Upload with overwrite option
balena.models.release.asset.upload({
	asset: '/path/to/logo.png',
	asset_key: 'logo.png',
	release: 123
}, {
	overwrite: true
}).then(function(asset) {
	console.log('Asset uploaded/updated:', asset);
});
```

***

## tags

`balena.models.release.tags` : `object`

**Kind**: static namespace of [`release`](release.md#balena.models.release)

***

### getAllByApplication

`balena.models.release.tags.getAllByApplication(slugOrUuidOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`tags`](release.md#balena.models.release.tags)\
**Summary**: Get all release tags for an application\
**Access**: public\
**Fulfil**: `Object[]` - release tags

| Param          | Type                 | Default | Description                                             |
| -------------- | -------------------- | ------- | ------------------------------------------------------- |
| slugOrUuidOrId | `String` \| `Number` |         | application slug (string), uuid (string) or id (number) |
| \[options]     | `Object`             | `{}`    | extra pine options to use                               |

**Example**

```js
balena.models.release.tags.getAllByApplication('myorganization/myapp').then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.release.tags.getAllByApplication(999999).then(function(tags) {
	console.log(tags);
});
```

***

### getAllByRelease

`balena.models.release.tags.getAllByRelease(commitOrIdOrRawVersion, [options])` ⇒ `Promise`

**Kind**: static method of [`tags`](release.md#balena.models.release.tags)\
**Summary**: Get all release tags for a release\
**Access**: public\
**Fulfil**: `Object[]` - release tags

| Param                  | Type                             | Default | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` |         | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| \[options]             | `Object`                         | `{}`    | extra pine options to use                                                                                                                        |

**Example**

```js
balena.models.release.tags.getAllByRelease(123).then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.release.tags.getAllByRelease('7cf02a69e4d34c9da573914963cf54fd').then(function(tags) {
	console.log(tags);
});
```

**Example**

```js
balena.models.release.tags.getAllByRelease({application: 456, rawVersion: '0.0.0'}).then(function(tags) {
	console.log(tags);
});
```

***

### remove

`balena.models.release.tags.remove(commitOrIdOrRawVersion, tagKey)` ⇒ `Promise`

**Kind**: static method of [`tags`](release.md#balena.models.release.tags)\
**Summary**: Remove a release tag\
**Access**: public

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| tagKey                 | `String`                         | tag key                                                                                                                                          |

**Example**

```js
balena.models.release.tags.remove(123, 'EDITOR');
```

**Example**

```js
balena.models.release.tags.remove('7cf02a69e4d34c9da573914963cf54fd', 'EDITOR');
```

**Example**

```js
balena.models.release.tags.remove({application: 456, rawVersion: '0.0.0'}, 'EDITOR');
```

***

### set

`balena.models.release.tags.set(commitOrIdOrRawVersion, tagKey, value)` ⇒ `Promise`

**Kind**: static method of [`tags`](release.md#balena.models.release.tags)\
**Summary**: Set a release tag\
**Access**: public

| Param                  | Type                             | Description                                                                                                                                      |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| commitOrIdOrRawVersion | `String` \| `Number` \| `Object` | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| tagKey                 | `String`                         | tag key                                                                                                                                          |
| value                  | `String` \| `undefined`          | tag value                                                                                                                                        |

**Example**

```js
balena.models.release.tags.set(123, 'EDITOR', 'vim');
```

**Example**

```js
balena.models.release.tags.set('7cf02a69e4d34c9da573914963cf54fd', 'EDITOR', 'vim');
```

**Example**

```js
balena.models.release.tags.set({application: 456, rawVersion: '0.0.0'}, 'EDITOR', 'vim');
```

***
