# Release

**models.release : <code>object</code>**

## tags
**balena.models.release.tags : <code>object</code>**

### getAllByApplication
**balena.models.release.tags.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all release tags for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - release tags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### getAllByRelease
**balena.models.release.tags.getAllByRelease(commitOrIdOrRawVersion, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all release tags for a release  
**Access**: public  
**Fulfil**: <code>Object[]</code> - release tags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> |  | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.release.tags.getAllByRelease(123).then(function(tags) {
	console.log(tags);
});
```
**Example**  
```js
balena.models.release.tags.getAllByRelease('7cf02a6').then(function(tags) {
	console.log(tags);
});
```
**Example**  
```js
balena.models.release.tags.getAllByRelease({application: 456, rawVersion: '0.0.0'}).then(function(tags) {
	console.log(tags);
});
```
### set
**balena.models.release.tags.set(commitOrIdOrRawVersion, tagKey, value) ⇒ <code>Promise</code>**

**Summary**: Set a release tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| tagKey | <code>String</code> | tag key |
| value | <code>String</code> \| <code>undefined</code> | tag value |

**Example**  
```js
balena.models.release.tags.set(123, 'EDITOR', 'vim');
```
**Example**  
```js
balena.models.release.tags.set('7cf02a6', 'EDITOR', 'vim');
```
**Example**  
```js
balena.models.release.tags.set({application: 456, rawVersion: '0.0.0'}, 'EDITOR', 'vim');
```
### remove
**balena.models.release.tags.remove(commitOrIdOrRawVersion, tagKey) ⇒ <code>Promise</code>**

**Summary**: Remove a release tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| tagKey | <code>String</code> | tag key |

**Example**  
```js
balena.models.release.tags.remove(123, 'EDITOR');
```
**Example**  
```js
balena.models.release.tags.remove('7cf02a6', 'EDITOR');
```
**Example**  
```js
balena.models.release.tags.remove({application: 456, rawVersion: '0.0.0'}, 'EDITOR');
```
## asset
**balena.models.release.asset : <code>object</code>**

### getAllByRelease
**balena.models.release.asset.getAllByRelease(commitOrIdOrRawVersion, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all release assets for a release  
**Access**: public  
**Fulfil**: <code>Object[]</code> - release assets  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> |  | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.release.asset.getAllByRelease(123).then(function(assets) {
	console.log(assets);
});
```
**Example**  
```js
balena.models.release.asset.getAllByRelease('7cf02a6').then(function(assets) {
	console.log(assets);
});
```
**Example**  
```js
balena.models.release.asset.getAllByRelease({ application: 456, raw_version: '1.2.3' }).then(function(assets) {
	console.log(assets);
});
```
### get
**balena.models.release.asset.get(id, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a specific release asset  
**Access**: public  
**Fulfil**: <code>Object</code> - release asset  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>Number</code> \| <code>Object</code> |  | release asset ID or object specifying the unique release & asset_key pair |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
### download
**balena.models.release.asset.download(id) ⇒ <code>Promise</code>**

**Summary**: Download a release asset  
**Access**: public  
**Fulfil**: <code>NodeJS.ReadableStream</code> - download stream  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> \| <code>Object</code> | release asset ID or object specifying the unique release & asset_key pair |

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
### upload
**balena.models.release.asset.upload(uploadParams, [options]) ⇒ <code>Promise</code>**

**Summary**: Upload a release asset  
**Access**: public  
**Fulfil**: <code>Object</code> - uploaded release asset  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uploadParams | <code>Object</code> |  | upload parameters |
| uploadParams.asset | <code>String</code> \| <code>File</code> |  | asset file path (string, Node.js only) or File object (Node.js & browser). For File objects, use new File([content], filename, {type: mimeType}) |
| uploadParams.asset_key | <code>String</code> |  | unique key for the asset within the release |
| uploadParams.release | <code>Number</code> |  | release ID |
| [options] | <code>Object</code> | <code>{}</code> | upload options |
| [options.chunkSize] | <code>Number</code> | <code>5242880</code> | chunk size for multipart uploads (5MiB default) |
| [options.parallelUploads] | <code>Number</code> | <code>5</code> | number of parallel uploads for multipart |
| [options.overwrite] | <code>Boolean</code> | <code>false</code> | whether to overwrite existing asset |
| [options.onUploadProgress] | <code>function</code> |  | callback for upload progress |

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
### remove
**balena.models.release.asset.remove(id) ⇒ <code>Promise</code>**

**Summary**: Remove a release asset  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> \| <code>Object</code> | release asset ID or object specifying the unique release & asset_key pair |

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
## get
**balena.models.release.get(commitOrIdOrRawVersion, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a specific release  
**Access**: public  
**Fulfil**: <code>Object</code> - release  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> |  | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.release.get(123).then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.release.get('7cf02a6').then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.release.get({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log(release);
});
```
## getWithImageDetails
**balena.models.release.getWithImageDetails(commitOrIdOrRawVersion, [options]) ⇒ <code>Promise</code>**

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want significantly more control, or to see the
raw model directly, use `release.get(id, options)` instead.

**Summary**: Get a specific release with the details of the images built  
**Access**: public  
**Fulfil**: <code>Object</code> - release with image details  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> |  | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| [options] | <code>Object</code> | <code>{}</code> | a map of extra pine options |
| [options.release] | <code>Boolean</code> | <code>{}</code> | extra pine options for releases |
| [options.image] | <code>Object</code> | <code>{}</code> | extra pine options for images |

**Example**  
```js
balena.models.release.getWithImageDetails(123).then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.release.getWithImageDetails('7cf02a6').then(function(release) {
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
## getAllByApplication
**balena.models.release.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all releases from an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - releases  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## getLatestByApplication
**balena.models.release.getLatestByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get the latest successful release for an application  
**Access**: public  
**Fulfil**: <code>Object\|undefined</code> - release  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## createFromUrl
**balena.models.release.createFromUrl(slugOrUuidOrId, urlDeployOptions) ⇒ <code>Promise</code>**

**Summary**: Create a new release built from the source in the provided url  
**Access**: public  
**Fulfil**: <code>number</code> - release ID  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| urlDeployOptions | <code>Object</code> |  | builder options |
| urlDeployOptions.url | <code>String</code> |  | a url with a tarball of the project to build |
| [urlDeployOptions.shouldFlatten] | <code>Boolean</code> | <code>true</code> | Should be true when the tarball includes an extra root folder with all the content |

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
## finalize
**balena.models.release.finalize(commitOrIdOrRawVersion) ⇒ <code>Promise</code>**

**Summary**: Finalizes a draft release  
**Access**: public  
**Fulfil**: <code>void</code>  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |

**Example**  
```js
balena.models.release.finalize(123).then(function() {
	console.log('finalized!');
});
```
**Example**  
```js
balena.models.release.finalize('7cf02a6').then(function() {
	console.log('finalized!');
});
```
**Example**  
```js
balena.models.release.finalize({application: 456, raw_version: '0.0.0'}).then(function(release) {
	console.log('finalized!');
});
```
## setIsInvalidated
**balena.models.release.setIsInvalidated(commitOrIdOrRawVersion, isInvalidated) ⇒ <code>Promise</code>**

**Summary**: Set the is_invalidated property of a release to true or false  
**Access**: public  
**Fulfil**: <code>void</code>  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| isInvalidated | <code>Boolean</code> | boolean value, true for invalidated, false for validated |

**Example**  
```js
balena.models.release.setIsInvalidated(123, true).then(function() {
	console.log('invalidated!');
});
```
**Example**  
```js
balena.models.release.setIsInvalidated('7cf02a6', true).then(function() {
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
balena.models.release.setIsInvalidated('7cf02a6', false).then(function() {
	console.log('validated!');
});
```
## setNote
**balena.models.release.setNote(commitOrIdOrRawVersion, noteOrNull) ⇒ <code>Promise</code>**

**Summary**: Add a note to a release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| noteOrNull | <code>String</code> \| <code>Null</code> | the note |

**Example**  
```js
balena.models.release.setNote('7cf02a6', 'My useful note');
```
**Example**  
```js
balena.models.release.setNote(123, 'My useful note');
```
**Example**  
```js
balena.models.release.setNote({ application: 456, rawVersion: '0.0.0' }, 'My useful note');
```
## setKnownIssueList
**balena.models.release.setKnownIssueList(commitOrIdOrRawVersion, knownIssueListOrNull) ⇒ <code>Promise</code>**

**Summary**: Add a known issue list to a release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| commitOrIdOrRawVersion | <code>String</code> \| <code>Number</code> \| <code>Object</code> | release commit (string) or id (number) or an object with the unique `application` (number or string) & `rawVersion` (string) pair of the release |
| knownIssueListOrNull | <code>String</code> \| <code>Null</code> | the known issue list |

**Example**  
```js
balena.models.release.setKnownIssueList('7cf02a6', 'This is an issue');
```
**Example**  
```js
balena.models.release.setKnownIssueList(123, 'This is an issue');
```
**Example**  
```js
balena.models.release.setKnownIssueList({application: 456, rawVersion: '0.0.0'}, 'This is an issue');
```