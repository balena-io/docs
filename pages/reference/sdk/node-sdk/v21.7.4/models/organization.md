# Organization

**models.organization : <code>object</code>**

## membership
**balena.models.organization.membership : <code>object</code>**

### get
**balena.models.organization.membership.get(membershipId, [options]) ⇒ <code>Promise</code>**

This method returns a single organization membership.

**Summary**: Get a single organization membership  
**Access**: public  
**Fulfil**: <code>Object</code> - organization membership  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| membershipId | <code>number</code> \| <code>Object</code> |  | the id or an object with the unique `user` & `is_member_of__organization` numeric pair of the membership |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.membership.get(5).then(function(memberships) {
	console.log(memberships);
});
```
### getAllByOrganization
**balena.models.organization.membership.getAllByOrganization(handleOrId, [options]) ⇒ <code>Promise</code>**

This method returns all organization memberships for a specific organization.

**Summary**: Get all memberships by organization  
**Access**: public  
**Fulfil**: <code>Object[]</code> - organization memberships  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> |  | organization handle (string) or id (number). |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.membership.getAllByOrganization('MyOrg').then(function(memberships) {
	console.log(memberships);
});
```
**Example**  
```js
balena.models.organization.membership.getAllByOrganization(123).then(function(memberships) {
	console.log(memberships);
});
```
### getAllByUser
**balena.models.organization.membership.getAllByUser(usernameOrId, [options]) ⇒ <code>Promise</code>**

This method returns all organization memberships for a specific user.

**Summary**: Get all memberships by user  
**Access**: public  
**Fulfil**: <code>Object[]</code> - organization memberships  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| usernameOrId | <code>String</code> \| <code>Number</code> |  | the user's username (string) or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.membership.getAllByUser('balena_os').then(function(memberships) {
	console.log(memberships);
});
```
**Example**  
```js
balena.models.organization.membership.getAllByUser(123).then(function(memberships) {
	console.log(memberships);
});
```
### changeRole
**balena.models.organization.membership.changeRole(idOrUniqueKey, roleName) ⇒ <code>Promise</code>**

This method changes the role of an organization member.

**Summary**: Changes the role of an organization member  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| idOrUniqueKey | <code>Number</code> \| <code>Object</code> | the id or an object with the unique `user` & `is_member_of__organization` numeric pair of the membership that will be changed |
| roleName | <code>String</code> | the role name to be granted to the membership |

**Example**  
```js
balena.models.organization.membership.changeRole(123, "member").then(function() {
	console.log('OK');
});
```
**Example**  
```js
balena.models.organization.membership.changeRole({
	user: 123,
	is_member_of__organization: 125,
}, "member").then(function() {
	console.log('OK');
});
```
### remove
**balena.models.organization.membership.remove(id) ⇒ <code>Promise</code>**

**Summary**: Remove a membership  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | organization membership id |

**Example**  
```js
balena.models.organization.membership.remove(123);
```
**Example**  
```js
balena.models.organization.membership.remove({
	user: 123,
	is_member_of__application: 125,
});
```
## invite
**balena.models.organization.invite : <code>object</code>**

### getAll
**balena.models.organization.invite.getAll([options]) ⇒ <code>Promise</code>**

This method returns all invites.

**Summary**: Get all invites  
**Access**: public  
**Fulfil**: <code>Object[]</code> - invites  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.invite.getAll().then(function(invites) {
	console.log(invites);
});
```
### getAllByOrganization
**balena.models.organization.invite.getAllByOrganization(handleOrId, [options]) ⇒ <code>Promise</code>**

This method returns all invites for a specific organization.

**Summary**: Get all invites by organization  
**Access**: public  
**Fulfil**: <code>Object[]</code> - invites  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> |  | organization handle (string), or id (number) |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.invite.getAllByOrganization('MyOrg').then(function(invites) {
	console.log(invites);
});
```
**Example**  
```js
balena.models.organization.invite.getAllByOrganization(123).then(function(invites) {
	console.log(invites);
});
```
### create
**balena.models.organization.invite.create(handleOrId, options, [message]) ⇒ <code>Promise</code>**

This method invites a user by their email to an organization.

**Summary**: Creates a new invite for an organization  
**Access**: public  
**Fulfil**: <code>String</code> - organization invite  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> |  | organization handle (string), or id (number) |
| options | <code>Object</code> |  | invite creation parameters |
| options.invitee | <code>String</code> |  | the email of the invitee |
| [options.roleName] | <code>String</code> | <code>&quot;developer&quot;</code> | the role name to be granted to the invitee |
| [message] | <code>String</code> | <code></code> | the message to send along with the invite |

**Example**  
```js
balena.models.organization.invite.create('MyOrg', { invitee: "invitee@example.org", roleName: "developer", message: "join my org" }).then(function(invite) {
	console.log(invite);
});
```
### revoke
**balena.models.organization.invite.revoke(id) ⇒ <code>Promise</code>**

**Summary**: Revoke an invite  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | organization invite id |

**Example**  
```js
balena.models.organization.invite.revoke(123);
```
### accept
**balena.models.organization.invite.accept(invitationToken) ⇒ <code>Promise</code>**

This method adds the calling user to the organization.

**Summary**: Accepts an invite  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| invitationToken | <code>String</code> | invite token |

**Example**  
```js
balena.models.organization.invite.accept("qwerty-invitation-token");
```
## create
**balena.models.organization.create(options) ⇒ <code>Promise</code>**

This method creates a new organization with the current user as an administrator.

**Summary**: Creates a new organization  
**Access**: public  
**Fulfil**: <code>String</code> - Organization  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Organization parameters to use. |
| options.name | <code>String</code> | Required: the name of the organization that will be created. |
| [options.handle] | <code>String</code> | The handle of the organization that will be created. |

**Example**  
```js
balena.models.organization.create({ name:'MyOrganization' }).then(function(organization) {
	console.log(organization);
});
```
**Example**  
```js
balena.models.organization.create({
  name:'MyOrganization',
  logo_image: new balena.utils.BalenaWebResourceFile(
    [fs.readFileSync('./img.jpeg')],
    'img.jpeg'
  );
})
.then(function(organization) {
  console.log(organization);
});
```
**Example**  
```js
balena.models.organization.create({
  name:'MyOrganization',
  // Only in case File API is avaialable (most browsers and Node 20+)
  logo_image: new File(
    imageContent,
    'img.jpeg'
  );
})
.then(function(organization) {
  console.log(organization);
});
```
## getAll
**balena.models.organization.getAll([options]) ⇒ <code>Promise</code>**

**Summary**: Get all Organizations  
**Access**: public  
**Fulfil**: <code>Object[]</code> - organizations  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.getAll().then(function(organizations) {
	console.log(organizations);
});
```
## get
**balena.models.organization.get(handleOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a single organization  
**Access**: public  
**Fulfil**: <code>Object</code> - organization  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> |  | organization handle (string) or id (number). |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.organization.get('myorganization').then(function(organization) {
	console.log(organization);
});
```
**Example**  
```js
balena.models.organization.get(123).then(function(organization) {
	console.log(organization);
});
```
## remove
**balena.models.organization.remove(handleOrId) ⇒ <code>Promise</code>**

**Summary**: Remove an Organization  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| handleOrId | <code>String</code> \| <code>Number</code> | organization handle (string) or id (number). |

**Example**  
```js
balena.models.organization.remove(123);
```