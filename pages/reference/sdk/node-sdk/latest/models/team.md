# Team

`balena.models.team` : `object`

**Kind**: static namespace

***

## create

`balena.models.team.create(organizationSlugOrId, name)` ⇒ `Promise`

This method creates a new team.

**Kind**: static method of [`team`](team.md#balena.models.team)\
**Summary**: Creates a new Team\
**Access**: public\
**Fulfil**: `Object` - Team

| Param                | Type     | Description                                                     |
| -------------------- | -------- | --------------------------------------------------------------- |
| organizationSlugOrId | `Number` | Required: the organization slug or id the team will be part of. |
| name                 | `String` | Required: the name of the team that will be created.            |

**Example**

```js
balena.models.team.create(1239948, 'MyTeam').then(function(team) {
	console.log(team);
});
```

**Example**

```js
balena.models.team.create('myOrgHandle', 'MyTeam')
.then(function(team) {
  console.log(team);
});
```

***

## get

`balena.models.team.get(teamId, [options])` ⇒ `Promise`

**Kind**: static method of [`team`](team.md#balena.models.team)\
**Summary**: Get a single Team\
**Access**: public\
**Fulfil**: `Object` - Team

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| teamId     | `Number` |         | team id (number).         |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.team.get(123).then(function(team) {
	console.log(team);
});
```

***

## getAllByOrganization

`balena.models.team.getAllByOrganization(organizationSlugOrId, [options])` ⇒ `Promise`

**Kind**: static method of [`team`](team.md#balena.models.team)\
**Summary**: Get all Teams of a specific Organization\
**Access**: public\
**Fulfil**: `Object[]` - Teams

| Param                | Type     | Default | Description                                                |
| -------------------- | -------- | ------- | ---------------------------------------------------------- |
| organizationSlugOrId | `Number` |         | Required: the organization slug or id the team is part of. |
| \[options]           | `Object` | `{}`    | extra pine options to use                                  |

**Example**

```js
balena.models.team.getAllByOrganization(123).then(function(teams) {
	console.log(teams);
});
```

**Example**

```js
balena.models.team.getAllByOrganization('MyOrganizationHandle').then(function(teams) {
	console.log(teams);
});
```

***

## remove

`balena.models.team.remove(teamId)` ⇒ `Promise`

**Kind**: static method of [`team`](team.md#balena.models.team)\
**Summary**: Remove a Team\
**Access**: public

| Param  | Type     | Description       |
| ------ | -------- | ----------------- |
| teamId | `Number` | team id (number). |

**Example**

```js
balena.models.team.remove(123);
```

***

## rename

`balena.models.team.rename(teamId, newName)` ⇒ `Promise`

**Kind**: static method of [`team`](team.md#balena.models.team)\
**Summary**: Rename Team\
**Access**: public

| Param   | Type     | Description            |
| ------- | -------- | ---------------------- |
| teamId  | `Number` | team id (number)       |
| newName | `String` | new team name (string) |

**Example**

```js
balena.models.team.rename(123, 'MyNewTeamName');
```

***

## applicationAccess

`balena.models.team.applicationAccess` : `object`

**Kind**: static namespace of [`team`](team.md#balena.models.team)

***

### get

`balena.models.team.applicationAccess.get(teamApplicationAccessId, [options])` ⇒ `Promise`

This method get specific team application access.

**Kind**: static method of [`applicationAccess`](team.md#balena.models.team.applicationAccess)\
**Summary**: Get team applications access\
**Access**: public\
**Fulfil**: `Object` - TeamApplicationAccess

| Param                   | Type     | Default | Description                               |
| ----------------------- | -------- | ------- | ----------------------------------------- |
| teamApplicationAccessId | `Number` |         | Required: the team application access id. |
| \[options]              | `Object` | `{}`    | extra pine options to use                 |

**Example**

```js
balena.models.team.applicationAccess.get(1239948).then(function(teamApplicationAccess) {
	console.log(teamApplicationAccess);
});
```

***

### getAllByTeam

`balena.models.team.applicationAccess.getAllByTeam(teamId, [options])` ⇒ `Promise`

This method get all team application access.

**Kind**: static method of [`applicationAccess`](team.md#balena.models.team.applicationAccess)\
**Summary**: Get all team applications access\
**Access**: public\
**Fulfil**: `Object[]` - team application access

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| teamId     | `Number` |         | Required: the team id.    |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.team.applicationAccess.getAllByTeam(1239948).then(function(teamApplicationAccesses) {
	console.log(teamApplicationAccesses);
});
```

***

### remove

`balena.models.team.applicationAccess.remove(teamApplicationAccessId)` ⇒ `Promise`

This remove a team application access.

**Kind**: static method of [`applicationAccess`](team.md#balena.models.team.applicationAccess)\
**Summary**: Remove team application access\
**Access**: public\
**Fulfil**: `void`

| Param                   | Type     | Description                               |
| ----------------------- | -------- | ----------------------------------------- |
| teamApplicationAccessId | `Number` | Required: the team application access id. |

**Example**

```js
balena.models.team.remove(123).then(function(teams) {
	console.log(teams);
});
```

***

### update

`balena.models.team.applicationAccess.update(teamApplicationAccessId, roleName)` ⇒ `Promise`

This method update a team application access role.

**Kind**: static method of [`applicationAccess`](team.md#balena.models.team.applicationAccess)\
**Summary**: Update team application access\
**Access**: public\
**Fulfil**: `Object` - TeamApplicationAccess

| Param                   | Type     | Description                                                    |
| ----------------------- | -------- | -------------------------------------------------------------- |
| teamApplicationAccessId | `Number` | Required: the team application access id.                      |
| roleName                | `String` | Required: The new role to assing (ApplicationMembershipRoles). |

**Example**

```js
balena.models.team.update(123, 'developer').then(function(teamApplicationAccess) {
	console.log(teamApplicationAccess);
});
```

***

## membership

`balena.models.team.membership` : `object`

**Kind**: static namespace of [`team`](team.md#balena.models.team)

***

### create

`balena.models.team.membership.create(options)` ⇒ `Promise`

This method adds a user to a team by their username.

**Kind**: static method of [`membership`](team.md#balena.models.team.membership)\
**Summary**: Creates a new membership for a team\
**Access**: public\
**Fulfil**: `Object` - team membership

| Param            | Type     | Description                                               |
| ---------------- | -------- | --------------------------------------------------------- |
| options          | `Object` | membership creation parameters                            |
| options.team     | `Number` | team id                                                   |
| options.username | `String` | the username of the balena user that will become a member |

**Example**

```js
balena.models.team.membership.create({ team: 123, username: "user123" }).then(function(membership) {
	console.log(membership);
});
```

***

### get

`balena.models.team.membership.get(membershipId, [options])` ⇒ `Promise`

This method returns a single team membership.

**Kind**: static method of [`membership`](team.md#balena.models.team.membership)\
**Summary**: Get a single team membership\
**Access**: public\
**Fulfil**: `Object` - team membership

| Param        | Type     | Default | Description               |
| ------------ | -------- | ------- | ------------------------- |
| membershipId | `Number` |         | the team membership id    |
| \[options]   | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.team.membership.get(5).then(function(membership) {
	console.log(membership);
});
```

***

### getAllByTeam

`balena.models.team.membership.getAllByTeam(teamId, [options])` ⇒ `Promise`

This method returns all team memberships for a specific team.

**Kind**: static method of [`membership`](team.md#balena.models.team.membership)\
**Summary**: Get all memberships by team\
**Access**: public\
**Fulfil**: `Object[]` - team memberships

| Param      | Type     | Default | Description               |
| ---------- | -------- | ------- | ------------------------- |
| teamId     | `Number` |         | the team id               |
| \[options] | `Object` | `{}`    | extra pine options to use |

**Example**

```js
balena.models.team.membership.getAllByTeam(123).then(function(memberships) {
	console.log(memberships);
});
```

***

### getAllByUser

`balena.models.team.membership.getAllByUser(usernameOrId, [options])` ⇒ `Promise`

This method returns all team memberships for a specific user.

**Kind**: static method of [`membership`](team.md#balena.models.team.membership)\
**Summary**: Get all memberships by user\
**Access**: public\
**Fulfil**: `Object[]` - team memberships

| Param        | Type                 | Default | Description                                 |
| ------------ | -------------------- | ------- | ------------------------------------------- |
| usernameOrId | `String` \| `Number` |         | the user's username (string) or id (number) |
| \[options]   | `Object`             | `{}`    | extra pine options to use                   |

**Example**

```js
balena.models.team.membership.getAllByUser('balena_os').then(function(memberships) {
	console.log(memberships);
});
```

**Example**

```js
balena.models.team.membership.getAllByUser(123).then(function(memberships) {
	console.log(memberships);
});
```

***

### remove

`balena.models.team.membership.remove(idOrIds)` ⇒ `Promise`

**Kind**: static method of [`membership`](team.md#balena.models.team.membership)\
**Summary**: Remove a team membership\
**Access**: public

| Param   | Type                         | Description                                        |
| ------- | ---------------------------- | -------------------------------------------------- |
| idOrIds | `Number` \| `Array.<Number>` | team membership id or array of team membership ids |

**Example**

```js
balena.models.team.membership.remove(123);
```

**Example**

```js
balena.models.team.membership.remove([123, 456]);
```

***
