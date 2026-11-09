# Organization

`balena.models.organization` : `object`

**Kind**: static namespace

***

## create

`balena.models.organization.create(options)` ⇒ `Promise`

This method creates a new organization with the current user as an administrator.

**Kind**: static method of [`organization`](organization.md#balena.models.organization)\
**Summary**: Creates a new organization\
**Access**: public\
**Fulfil**: `String` - Organization

| Param             | Type     | Description                                                  |
| ----------------- | -------- | ------------------------------------------------------------ |
| options           | `Object` | Organization parameters to use.                              |
| options.name      | `String` | Required: the name of the organization that will be created. |
| \[options.handle] | `String` | The handle of the organization that will be created.         |

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
  logo_image: new File(
    imageContent,
    'img.jpeg'
  );
})
.then(function(organization) {
  console.log(organization);
});
```

***

## get

`balena.models.organization.get(handleOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`organization`](organization.md#balena.models.organization)\
**Summary**: Get a single organization\
**Access**: public\
**Fulfil**: `Object` - organization

| Param      | Type                 | Default | Description                                  |
| ---------- | -------------------- | ------- | -------------------------------------------- |
| handleOrId | `String` \| `Number` |         | organization handle (string) or id (number). |
| \[options] | `Object`             | `{}`    | extra pine options to use                    |

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

***

## getAll

`balena.models.organization.getAll([options])` ⇒ `Promise`

**Kind**: static method of [`organization`](organization.md#balena.models.organization)\
**Summary**: Get all Organizations\
**Access**: public\
**Fulfil**: `Object[]` - organizations

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.organization.getAll().then(function(organizations) {
	console.log(organizations);
});
```

***

## remove

`balena.models.organization.remove(handleOrId)` ⇒ `Promise`

**Kind**: static method of [`organization`](organization.md#balena.models.organization)\
**Summary**: Remove an Organization\
**Access**: public

| Param      | Type                 | Description                                  |
| ---------- | -------------------- | -------------------------------------------- |
| handleOrId | `String` \| `Number` | organization handle (string) or id (number). |

**Example**

```js
balena.models.organization.remove(123);
```

***

## invite

`balena.models.organization.invite` : `object`

**Kind**: static namespace of [`organization`](organization.md#balena.models.organization)

***

### accept

`balena.models.organization.invite.accept(invitationToken)` ⇒ `Promise`

This method adds the calling user to the organization.

**Kind**: static method of [`invite`](organization.md#balena.models.organization.invite)\
**Summary**: Accepts an invite\
**Access**: public

| Param           | Type     | Description  |
| --------------- | -------- | ------------ |
| invitationToken | `String` | invite token |

**Example**

```js
balena.models.organization.invite.accept("qwerty-invitation-token");
```

***

### create

`balena.models.organization.invite.create(handleOrId, options, [message])` ⇒ `Promise`

This method invites a user by their email to an organization.

**Kind**: static method of [`invite`](organization.md#balena.models.organization.invite)\
**Summary**: Creates a new invite for an organization\
**Access**: public\
**Fulfil**: `String` - organization invite

| Param               | Type                 | Default       | Description                                  |
| ------------------- | -------------------- | ------------- | -------------------------------------------- |
| handleOrId          | `String` \| `Number` |               | organization handle (string), or id (number) |
| options             | `Object`             |               | invite creation parameters                   |
| options.invitee     | `String`             |               | the email of the invitee                     |
| \[options.roleName] | `String`             | `"developer"` | the role name to be granted to the invitee   |
| \[message]          | `String`             |               | the message to send along with the invite    |

**Example**

```js
balena.models.organization.invite.create('MyOrg', { invitee: "invitee@example.org", roleName: "developer", message: "join my org" }).then(function(invite) {
	console.log(invite);
});
```

***

### getAll

`balena.models.organization.invite.getAll([options])` ⇒ `Promise`

This method returns all invites.

**Kind**: static method of [`invite`](organization.md#balena.models.organization.invite)\
**Summary**: Get all invites\
**Access**: public\
**Fulfil**: `Object[]` - invites

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.organization.invite.getAll().then(function(invites) {
	console.log(invites);
});
```

***

### getAllByOrganization

`balena.models.organization.invite.getAllByOrganization(handleOrId, [options])` ⇒ `Promise`

This method returns all invites for a specific organization.

**Kind**: static method of [`invite`](organization.md#balena.models.organization.invite)\
**Summary**: Get all invites by organization\
**Access**: public\
**Fulfil**: `Object[]` - invites

| Param      | Type                 | Default | Description                                  |
| ---------- | -------------------- | ------- | -------------------------------------------- |
| handleOrId | `String` \| `Number` |         | organization handle (string), or id (number) |
| \[options] | `Object`             | `{}`    | extra pine options to use                    |

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

***

### revoke

`balena.models.organization.invite.revoke(id)` ⇒ `Promise`

**Kind**: static method of [`invite`](organization.md#balena.models.organization.invite)\
**Summary**: Revoke an invite\
**Access**: public

| Param | Type     | Description            |
| ----- | -------- | ---------------------- |
| id    | `Number` | organization invite id |

**Example**

```js
balena.models.organization.invite.revoke(123);
```

***

## membership

`balena.models.organization.membership` : `object`

**Kind**: static namespace of [`organization`](organization.md#balena.models.organization)

***

### changeRole

`balena.models.organization.membership.changeRole(idOrUniqueKey, roleName)` ⇒ `Promise`

This method changes the role of an organization member.

**Kind**: static method of [`membership`](organization.md#balena.models.organization.membership)\
**Summary**: Changes the role of an organization member\
**Access**: public

| Param         | Type                 | Description                                                                                                                   |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| idOrUniqueKey | `Number` \| `Object` | the id or an object with the unique `user` & `is_member_of__organization` numeric pair of the membership that will be changed |
| roleName      | `String`             | the role name to be granted to the membership                                                                                 |

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

***

### get

`balena.models.organization.membership.get(membershipId, [options])` ⇒ `Promise`

This method returns a single organization membership.

**Kind**: static method of [`membership`](organization.md#balena.models.organization.membership)\
**Summary**: Get a single organization membership\
**Access**: public\
**Fulfil**: `Object` - organization membership

| Param        | Type                 | Default | Description                                                                                              |
| ------------ | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| membershipId | `number` \| `Object` |         | the id or an object with the unique `user` & `is_member_of__organization` numeric pair of the membership |
| \[options]   | `Object`             | `{}`    | extra pine options to use                                                                                |

**Example**

```js
balena.models.organization.membership.get(5).then(function(memberships) {
	console.log(memberships);
});
```

***

### getAllByOrganization

`balena.models.organization.membership.getAllByOrganization(handleOrId, [options])` ⇒ `Promise`

This method returns all organization memberships for a specific organization.

**Kind**: static method of [`membership`](organization.md#balena.models.organization.membership)\
**Summary**: Get all memberships by organization\
**Access**: public\
**Fulfil**: `Object[]` - organization memberships

| Param      | Type                 | Default | Description                                  |
| ---------- | -------------------- | ------- | -------------------------------------------- |
| handleOrId | `String` \| `Number` |         | organization handle (string) or id (number). |
| \[options] | `Object`             | `{}`    | extra pine options to use                    |

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

***

### getAllByUser

`balena.models.organization.membership.getAllByUser(usernameOrId, [options])` ⇒ `Promise`

This method returns all organization memberships for a specific user.

**Kind**: static method of [`membership`](organization.md#balena.models.organization.membership)\
**Summary**: Get all memberships by user\
**Access**: public\
**Fulfil**: `Object[]` - organization memberships

| Param        | Type                 | Default | Description                                 |
| ------------ | -------------------- | ------- | ------------------------------------------- |
| usernameOrId | `String` \| `Number` |         | the user's username (string) or id (number) |
| \[options]   | `Object`             | `{}`    | extra pine options to use                   |

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

***

### remove

`balena.models.organization.membership.remove(id)` ⇒ `Promise`

**Kind**: static method of [`membership`](organization.md#balena.models.organization.membership)\
**Summary**: Remove a membership\
**Access**: public

| Param | Type     | Description                |
| ----- | -------- | -------------------------- |
| id    | `Number` | organization membership id |

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

***
