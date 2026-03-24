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