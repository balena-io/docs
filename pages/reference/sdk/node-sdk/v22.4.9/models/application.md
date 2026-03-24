# Application

**models.application : <code>object</code>**

## tags
**balena.models.application.tags : <code>object</code>**

### getAllByApplication
**balena.models.application.tags.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all application tags for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application tags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.tags.getAllByApplication('myorganization/myapp').then(function(tags) {
	console.log(tags);
});
```
**Example**  
```js
balena.models.application.tags.getAllByApplication(999999).then(function(tags) {
	console.log(tags);
});
```
### set
**balena.models.application.tags.set(slugOrUuidOrId, tagKey, value) ⇒ <code>Promise</code>**

**Summary**: Set an application tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| tagKey | <code>String</code> | tag key |
| value | <code>String</code> \| <code>undefined</code> | tag value |

**Example**  
```js
balena.models.application.tags.set('myorganization/myapp', 'EDITOR', 'vim');
```
**Example**  
```js
balena.models.application.tags.set(123, 'EDITOR', 'vim');
```
### remove
**balena.models.application.tags.remove(slugOrUuidOrId, tagKey) ⇒ <code>Promise</code>**

**Summary**: Remove an application tag  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| tagKey | <code>String</code> | tag key |

**Example**  
```js
balena.models.application.tags.remove('myorganization/myapp', 'EDITOR');
```
## configVar
**balena.models.application.configVar : <code>object</code>**

### getAllByApplication
**balena.models.application.configVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all config variables for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application config variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.configVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.application.configVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```
### get
**balena.models.application.configVar.get(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific config variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the config variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | config variable name |

**Example**  
```js
balena.models.application.configVar.get('myorganization/myapp', 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.application.configVar.get(999999, 'BALENA_VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.application.configVar.set(slugOrUuidOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific config variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | config variable name |
| value | <code>String</code> | config variable value |

**Example**  
```js
balena.models.application.configVar.set('myorganization/myapp', 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.configVar.set(999999, 'BALENA_VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.application.configVar.remove(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific config variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | config variable name |

**Example**  
```js
balena.models.application.configVar.remove('myorganization/myapp', 'BALENA_VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.configVar.remove(999999, 'BALENA_VAR').then(function() {
	...
});
```
## envVar
**balena.models.application.envVar : <code>object</code>**

### getAllByApplication
**balena.models.application.envVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all environment variables for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application environment variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.envVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.application.envVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```
### get
**balena.models.application.envVar.get(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific environment variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the environment variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |

**Example**  
```js
balena.models.application.envVar.get('myorganization/myapp', 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.application.envVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.application.envVar.set(slugOrUuidOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |
| value | <code>String</code> | environment variable value |

**Example**  
```js
balena.models.application.envVar.set('myorganization/myapp', 'VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.envVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.application.envVar.remove(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | environment variable name |

**Example**  
```js
balena.models.application.envVar.remove('myorganization/myapp', 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.envVar.remove(999999, 'VAR').then(function() {
	...
});
```
## buildVar
**balena.models.application.buildVar : <code>object</code>**

### getAllByApplication
**balena.models.application.buildVar.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all build environment variables for an application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application build environment variables  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.buildVar.getAllByApplication('myorganization/myapp').then(function(vars) {
	console.log(vars);
});
```
**Example**  
```js
balena.models.application.buildVar.getAllByApplication(999999).then(function(vars) {
	console.log(vars);
});
```
### get
**balena.models.application.buildVar.get(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Get the value of a specific build environment variable  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - the build environment variable value (or undefined)  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | build environment variable name |

**Example**  
```js
balena.models.application.buildVar.get('myorganization/myapp', 'VAR').then(function(value) {
	console.log(value);
});
```
**Example**  
```js
balena.models.application.buildVar.get(999999, 'VAR').then(function(value) {
	console.log(value);
});
```
### set
**balena.models.application.buildVar.set(slugOrUuidOrId, key, value) ⇒ <code>Promise</code>**

**Summary**: Set the value of a specific build environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | build environment variable name |
| value | <code>String</code> | build environment variable value |

**Example**  
```js
balena.models.application.buildVar.set('myorganization/myapp', 'VAR', 'newvalue').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.buildVar.set(999999, 'VAR', 'newvalue').then(function() {
	...
});
```
### remove
**balena.models.application.buildVar.remove(slugOrUuidOrId, key) ⇒ <code>Promise</code>**

**Summary**: Clear the value of a specific build environment variable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| key | <code>String</code> | build environment variable name |

**Example**  
```js
balena.models.application.buildVar.remove('myorganization/myapp', 'VAR').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.buildVar.remove(999999, 'VAR').then(function() {
	...
});
```
## membership
**balena.models.application.membership : <code>object</code>**

### get
**balena.models.application.membership.get(membershipId, [options]) ⇒ <code>Promise</code>**

This method returns a single application membership.

**Summary**: Get a single application membership  
**Access**: public  
**Fulfil**: <code>Object</code> - application membership  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| membershipId | <code>number</code> \| <code>Object</code> |  | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.membership.get(5).then(function(memberships) {
	console.log(memberships);
});
```
### getAllByApplication
**balena.models.application.membership.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

This method returns all application memberships for a specific application.

**Summary**: Get all memberships by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application memberships  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.membership.getAllByApplication('myorganization/myapp').then(function(memberships) {
	console.log(memberships);
});
```
**Example**  
```js
balena.models.application.membership.getAllByApplication(123).then(function(memberships) {
	console.log(memberships);
});
```
### getAllByUser
**balena.models.application.membership.getAllByUser(usernameOrId, [options]) ⇒ <code>Promise</code>**

This method returns all application memberships for a specific user.

**Summary**: Get all memberships by user  
**Access**: public  
**Fulfil**: <code>Object[]</code> - application memberships  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| usernameOrId | <code>String</code> \| <code>Number</code> |  | the user's username (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.membership.getAllByUser('balena_os').then(function(memberships) {
	console.log(memberships);
});
```
**Example**  
```js
balena.models.application.membership.getAllByUser(123).then(function(memberships) {
	console.log(memberships);
});
```
### create
**balena.models.application.membership.create(options) ⇒ <code>Promise</code>**

This method adds a user to an application by their username if they are a member of the organization.

**Summary**: Creates a new membership for an application  
**Access**: public  
**Fulfil**: <code>Object</code> - application membership  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | membership creation parameters |
| options.application | <code>String</code> \| <code>Number</code> |  | application handle (string), or id (number) |
| options.username | <code>String</code> |  | the username of the balena user that will become a member |
| [options.roleName] | <code>String</code> | <code>&quot;member&quot;</code> | the role name to be granted to the membership |

**Example**  
```js
balena.models.application.membership.create({ application: "myApp", username: "user123", roleName: "member" }).then(function(membership) {
	console.log(membership);
});
```
### changeRole
**balena.models.application.membership.changeRole(idOrUniqueKey, roleName) ⇒ <code>Promise</code>**

This method changes the role of an application member.

**Summary**: Changes the role of an application member  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| idOrUniqueKey | <code>Number</code> \| <code>Object</code> | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership that will be changed |
| roleName | <code>String</code> | the role name to be granted to the membership |

**Example**  
```js
balena.models.application.membership.changeRole(123, "member").then(function() {
	console.log('OK');
});
```
**Example**  
```js
balena.models.application.membership.changeRole({
	user: 123,
	is_member_of__application: 125,
}, "member").then(function() {
	console.log('OK');
});
```
### remove
**balena.models.application.membership.remove(idOrUniqueKey) ⇒ <code>Promise</code>**

**Summary**: Remove a membership  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| idOrUniqueKey | <code>Number</code> \| <code>Object</code> | the id or an object with the unique `user` & `is_member_of__application` numeric pair of the membership that will be removed |

**Example**  
```js
balena.models.application.membership.remove(123);
```
**Example**  
```js
balena.models.application.membership.remove({
	user: 123,
	is_member_of__application: 125,
});
```
## invite
**balena.models.application.invite : <code>object</code>**

### getAll
**balena.models.application.invite.getAll([options]) ⇒ <code>Promise</code>**

This method returns all invites.

**Summary**: Get all invites  
**Access**: public  
**Fulfil**: <code>Object[]</code> - invites  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.invite.getAll().then(function(invites) {
	console.log(invites);
});
```
### getAllByApplication
**balena.models.application.invite.getAllByApplication(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

This method returns all invites for a specific application.

**Summary**: Get all invites by application  
**Access**: public  
**Fulfil**: <code>Object[]</code> - invites  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.invite.getAllByApplication('myorganization/myapp').then(function(invites) {
	console.log(invites);
});
```
**Example**  
```js
balena.models.application.invite.getAllByApplication(123).then(function(invites) {
	console.log(invites);
});
```
### create
**balena.models.application.invite.create(slugOrUuidOrId, options, [message]) ⇒ <code>Promise</code>**

This method invites a user by their email to an application.

**Summary**: Creates a new invite for an application  
**Access**: public  
**Fulfil**: <code>String</code> - application invite  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| options | <code>Object</code> |  | invite creation parameters |
| options.invitee | <code>String</code> |  | the email of the invitee |
| [options.roleName] | <code>String</code> | <code>&quot;developer&quot;</code> | the role name to be granted to the invitee |
| [message] | <code>String</code> | <code></code> | the message to send along with the invite |

**Example**  
```js
balena.models.application.invite.create('myorganization/myapp', { invitee: "invitee@example.org", roleName: "developer", message: "join my app" }).then(function(invite) {
	console.log(invite);
});
```
### revoke
**balena.models.application.invite.revoke(id) ⇒ <code>Promise</code>**

**Summary**: Revoke an invite  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | application invite id |

**Example**  
```js
balena.models.application.invite.revoke(123);
```
### accept
**balena.models.application.invite.accept(invitationToken) ⇒ <code>Promise</code>**

This method adds the calling user to the application.

**Summary**: Accepts an invite  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| invitationToken | <code>String</code> | invite token |

**Example**  
```js
balena.models.application.invite.accept("qwerty-invitation-token");
```
## getDashboardUrl
**balena.models.application.getDashboardUrl(id) ⇒ <code>String</code>**

**Summary**: Get Dashboard URL for a specific application  
**Returns**: <code>String</code> - - Dashboard URL for the specific application  
**Throws**:

- Exception if the id is not a finite number

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | Application id |

**Example**  
```js
balena.models.application.get('myorganization/myapp').then(function(application) {
	const dashboardApplicationUrl = balena.models.application.getDashboardUrl(application.id);
	console.log(dashboardApplicationUrl);
});
```
## getAll
**balena.models.application.getAll([options], [context]) ⇒ <code>Promise</code>**

**Summary**: Get all applications  
**Access**: public  
**Fulfil**: <code>Object[]</code> - applications  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |
| [context] | <code>String</code> |  | extra access filters, undefined or 'directly_accessible' |

**Example**  
```js
balena.models.application.getAll().then(function(applications) {
	console.log(applications);
});
```
## getAllDirectlyAccessible
**balena.models.application.getAllDirectlyAccessible([options]) ⇒ <code>Promise</code>**

**Summary**: Get all applications directly accessible by the user  
**Access**: public  
**Fulfil**: <code>Object[]</code> - applications  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.getAllDirectlyAccessible().then(function(applications) {
	console.log(applications);
});
```
## getAllByOrganization
**balena.models.application.getAllByOrganization(orgHandleOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all applications of an organization  
**Access**: public  
**Fulfil**: <code>Object[]</code> - applications  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| orgHandleOrId | <code>Number</code> \| <code>String</code> |  | organization handle (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.getAllByOrganization().then(function(applications) {
	console.log(applications);
});
```
## get
**balena.models.application.get(slugOrUuidOrId, [options], [context]) ⇒ <code>Promise</code>**

**Summary**: Get a single application  
**Access**: public  
**Fulfil**: <code>Object</code> - application  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |
| [context] | <code>String</code> |  | extra access filters, undefined or 'directly_accessible' |

**Example**  
```js
balena.models.application.get('myorganization/myapp').then(function(application) {
	console.log(application);
});
```
**Example**  
```js
balena.models.application.get('1bf99a68cf9e4266986e6dec7a6e8f46').then(function(application) {
	console.log(application);
});
```
**Example**  
```js
balena.models.application.get(123).then(function(application) {
	console.log(application);
});
```
## getDirectlyAccessible
**balena.models.application.getDirectlyAccessible(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a single application directly accessible by the user  
**Access**: public  
**Fulfil**: <code>Object</code> - application  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.getDirectlyAccessible('myorganization/myapp').then(function(application) {
	console.log(application);
});
```
**Example**  
```js
balena.models.application.getDirectlyAccessible(123).then(function(application) {
	console.log(application);
});
```
## getWithDeviceServiceDetails
**balena.models.application.getWithDeviceServiceDetails(slugOrUuidOrId, [options]) ⇒ <code>Promise</code>**

This method does not map exactly to the underlying model: it runs a
larger prebuilt query, and reformats it into an easy to use and
understand format. If you want more control, or to see the raw model
directly, use `application.get(uuidOrId, options)` instead.

**Summary**: Get a single application and its devices, along with each device's
associated services' essential details  
**Access**: public  
**Fulfil**: <code>Object</code> - application  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> |  | application slug (string), uuid (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.application.getWithDeviceServiceDetails('myorganization/myapp').then(function(device) {
	console.log(device);
})
```
**Example**  
```js
balena.models.application.getWithDeviceServiceDetails(123).then(function(device) {
	console.log(device);
})
```
## getAppByName
**balena.models.application.getAppByName(appName, [options], [context]) ⇒ <code>Promise</code>**

**Summary**: Get a single application using the appname and the handle of the owning organization  
**Access**: public  
**Fulfil**: <code>Object</code> - application  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| appName | <code>String</code> |  | application name |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |
| [context] | <code>String</code> |  | extra access filters, undefined or 'directly_accessible' |

**Example**  
```js
balena.models.application.getAppByName('MyApp').then(function(application) {
	console.log(application);
});
```
## has
**balena.models.application.has(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Check if an application exists  
**Access**: public  
**Fulfil**: <code>Boolean</code> - has application  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.has('myorganization/myapp').then(function(hasApp) {
	console.log(hasApp);
});
```
**Example**  
```js
balena.models.application.has(123).then(function(hasApp) {
	console.log(hasApp);
});
```
## hasAny
**balena.models.application.hasAny() ⇒ <code>Promise</code>**

**Summary**: Check if the user has access to any applications  
**Access**: public  
**Fulfil**: <code>Boolean</code> - has any applications  
**Example**  
```js
balena.models.application.hasAny().then(function(hasAny) {
	console.log('Has any?', hasAny);
});
```
## create
**balena.models.application.create(options) ⇒ <code>Promise</code>**

**Summary**: Create an application  
**Access**: public  
**Fulfil**: <code>Object</code> - application  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | application creation parameters |
| options.name | <code>String</code> | application name |
| [options.uuid] | <code>String</code> | application uuid |
| [options.applicationClass] | <code>String</code> | application class: 'app' | 'fleet' | 'block' |
| options.deviceType | <code>String</code> | device type slug |
| options.organization | <code>String</code> \| <code>Number</code> | handle (string) or id (number) of the organization that the application will belong to or null |

**Example**  
```js
balena.models.application.create({ name: 'My App', deviceType: 'raspberry-pi' }).then(function(application) {
	console.log(application);
});
```
**Example**  
```js
balena.models.application.create({ name: 'My Block', applicationClass: 'block', deviceType: 'raspberry-pi' }).then(function(application) {
	console.log(application);
});
```
**Example**  
```js
balena.models.application.create({ name: 'My App', deviceType: 'raspberry-pi', parent: 'ParentApp' }).then(function(application) {
	console.log(application);
});
```
## remove
**balena.models.application.remove(slugOrUuidOrIdOrIds) ⇒ <code>Promise</code>**

**Summary**: Remove application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrIdOrIds | <code>String</code> \| <code>Number</code> \| <code>Array.&lt;Number&gt;</code> | application slug (string), uuid (string) or id (number) or array of ids |

**Example**  
```js
balena.models.application.remove('myorganization/myapp');
```
**Example**  
```js
balena.models.application.remove(123);
```
## rename
**balena.models.application.rename(slugOrUuidOrId, newName) ⇒ <code>Promise</code>**

**Summary**: Rename application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| newName | <code>String</code> | new application name (string) |

**Example**  
```js
balena.models.application.rename('myorganization/myapp', 'MyRenamedApp');
```
**Example**  
```js
balena.models.application.rename(123, 'MyRenamedApp');
```
## restart
**balena.models.application.restart(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Restart application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.restart('myorganization/myapp');
```
**Example**  
```js
balena.models.application.restart(123);
```
## generateProvisioningKey
**balena.models.application.generateProvisioningKey(generateProvisioningKeyParams) ⇒ <code>Promise</code>**

**Summary**: Generate a device provisioning key for a specific application  
**Access**: public  
**Fulfil**: <code>String</code> - device provisioning key  

| Param | Type | Description |
| --- | --- | --- |
| generateProvisioningKeyParams | <code>Object</code> | an object containing the parameters for the provisioning key generation |
| generateProvisioningKeyParams.slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| generateProvisioningKeyParams.keyExpiryDate | <code>String</code> | Expiry Date for provisioning key |
| [generateProvisioningKeyParams.keyName] | <code>String</code> | Provisioning key name |
| [generateProvisioningKeyParams.keyDescription] | <code>String</code> | Description for provisioning key |

**Example**  
```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 'myorganization/myapp', keyExpiryDate: '2030-10-12'}).then(function(key) {
	console.log(key);
});
```
**Example**  
```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 123, keyExpiryDate: '2030-10-12'}).then(function(key) {
	console.log(key);
});
```
**Example**  
```js
balena.models.application.generateProvisioningKey({slugOrUuidOrId: 123, keyExpiryDate: '2030-10-12', keyName: 'api key name', keyDescription: 'api key long description'}).then(function(key) {
	console.log(key);
});
```
## purge
**balena.models.application.purge(appId) ⇒ <code>Promise</code>**

**Summary**: Purge devices by application id  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| appId | <code>Number</code> | application id |

**Example**  
```js
balena.models.application.purge(123);
```
## shutdown
**balena.models.application.shutdown(appId, [options]) ⇒ <code>Promise</code>**

**Summary**: Shutdown devices by application id  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| appId | <code>Number</code> |  | application id |
| [options] | <code>Object</code> |  | options |
| [options.force] | <code>Boolean</code> | <code>false</code> | override update lock |

**Example**  
```js
balena.models.application.shutdown(123);
```
## reboot
**balena.models.application.reboot(appId, [options]) ⇒ <code>Promise</code>**

**Summary**: Reboot devices by application id  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| appId | <code>Number</code> |  | application id |
| [options] | <code>Object</code> |  | options |
| [options.force] | <code>Boolean</code> | <code>false</code> | override update lock |

**Example**  
```js
balena.models.application.reboot(123);
```
## willTrackNewReleases
**balena.models.application.willTrackNewReleases(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get whether the application is configured to receive updates whenever a new release is available  
**Access**: public  
**Fulfil**: <code>Boolean</code> - is tracking the latest release  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.willTrackNewReleases('myorganization/myapp').then(function(isEnabled) {
	console.log(isEnabled);
});
```
**Example**  
```js
balena.models.application.willTrackNewReleases(123).then(function(isEnabled) {
	console.log(isEnabled);
});
```
## isTrackingLatestRelease
**balena.models.application.isTrackingLatestRelease(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get whether the application is up to date and is tracking the latest finalized release for updates  
**Access**: public  
**Fulfil**: <code>Boolean</code> - is tracking the latest release  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.isTrackingLatestRelease('myorganization/myapp').then(function(isEnabled) {
	console.log(isEnabled);
});
```
**Example**  
```js
balena.models.application.isTrackingLatestRelease(123).then(function(isEnabled) {
	console.log(isEnabled);
});
```
## pinToRelease
**balena.models.application.pinToRelease(slugOrUuidOrId, fullReleaseHash) ⇒ <code>Promise</code>**

Configures the application to run a particular release
and not get updated when the latest release changes.

**Summary**: Set a specific application to run a particular release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| fullReleaseHash | <code>String</code> | the hash of a successful release (string) |

**Example**  
```js
balena.models.application.pinToRelease('myorganization/myapp', 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.pinToRelease(123, 'f7caf4ff80114deeaefb7ab4447ad9c661c50847').then(function() {
	...
});
```
## getTargetReleaseHash
**balena.models.application.getTargetReleaseHash(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Get the hash of the current release for a specific application  
**Access**: public  
**Fulfil**: <code>String\|undefined</code> - The release hash of the current release  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.getTargetReleaseHash('myorganization/myapp').then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.application.getTargetReleaseHash(123).then(function(release) {
	console.log(release);
});
```
**Example**  
```js
balena.models.application.getTargetReleaseHash('myorganization/myapp', function(release) {
	console.log(release);
});
```
## trackLatestRelease
**balena.models.application.trackLatestRelease(slugOrUuidOrId) ⇒ <code>Promise</code>**

The application's current release will be updated with each new successfully built release.

**Summary**: Configure a specific application to track the latest finalized available release  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.trackLatestRelease('myorganization/myapp').then(function() {
	...
});
```
**Example**  
```js
balena.models.application.trackLatestRelease(123).then(function() {
	...
});
```
## enableDeviceUrls
**balena.models.application.enableDeviceUrls(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Enable device urls for all devices that belong to an application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.enableDeviceUrls('myorganization/myapp');
```
**Example**  
```js
balena.models.application.enableDeviceUrls(123);
```
## disableDeviceUrls
**balena.models.application.disableDeviceUrls(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Disable device urls for all devices that belong to an application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.disableDeviceUrls('myorganization/myapp');
```
**Example**  
```js
balena.models.application.disableDeviceUrls(123);
```
## grantSupportAccess
**balena.models.application.grantSupportAccess(slugOrUuidOrId, expiryTimestamp) ⇒ <code>Promise</code>**

**Summary**: Grant support access to an application until a specified time  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |
| expiryTimestamp | <code>Number</code> | a timestamp in ms for when the support access will expire |

**Example**  
```js
balena.models.application.grantSupportAccess('myorganization/myapp', Date.now() + 3600 * 1000);
```
**Example**  
```js
balena.models.application.grantSupportAccess(123, Date.now() + 3600 * 1000);
```
## revokeSupportAccess
**balena.models.application.revokeSupportAccess(slugOrUuidOrId) ⇒ <code>Promise</code>**

**Summary**: Revoke support access to an application  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slugOrUuidOrId | <code>String</code> \| <code>Number</code> | application slug (string), uuid (string) or id (number) |

**Example**  
```js
balena.models.application.revokeSupportAccess('myorganization/myapp');
```
**Example**  
```js
balena.models.application.revokeSupportAccess(123);
```