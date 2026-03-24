# Team

**models.team : <code>object</code>**

## applicationAccess
**balena.models.team.applicationAccess : <code>object</code>**

### getAllByTeam
**balena.models.team.applicationAccess.getAllByTeam(teamId, [options]) ⇒ <code>Promise</code>**

This method get all team application access.

**Summary**: Get all team applications access  
**Access**: public  
**Fulfil**: <code>Object[]</code> - team application access  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| teamId | <code>Number</code> |  | Required: the team id. |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.team.applicationAccess.getAllByTeam(1239948).then(function(teamApplicationAccesses) {
	console.log(teamApplicationAccesses);
});
```
### get
**balena.models.team.applicationAccess.get(teamApplicationAccessId, [options]) ⇒ <code>Promise</code>**

This method get specific team application access.

**Summary**: Get team applications access  
**Access**: public  
**Fulfil**: <code>Object</code> - TeamApplicationAccess  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| teamApplicationAccessId | <code>Number</code> |  | Required: the team application access id. |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.team.applicationAccess.get(1239948).then(function(teamApplicationAccess) {
	console.log(teamApplicationAccess);
});
```
### update
**balena.models.team.applicationAccess.update(teamApplicationAccessId, roleName) ⇒ <code>Promise</code>**

This method update a team application access role.

**Summary**: Update team application access  
**Access**: public  
**Fulfil**: <code>Object</code> - TeamApplicationAccess  

| Param | Type | Description |
| --- | --- | --- |
| teamApplicationAccessId | <code>Number</code> | Required: the team application access id. |
| roleName | <code>String</code> | Required: The new role to assing (ApplicationMembershipRoles). |

**Example**  
```js
balena.models.team.update(123, 'developer').then(function(teamApplicationAccess) {
	console.log(teamApplicationAccess);
});
```
### remove
**balena.models.team.applicationAccess.remove(teamApplicationAccessId) ⇒ <code>Promise</code>**

This remove a team application access.

**Summary**: Remove team application access  
**Access**: public  
**Fulfil**: <code>void</code>  

| Param | Type | Description |
| --- | --- | --- |
| teamApplicationAccessId | <code>Number</code> | Required: the team application access id. |

**Example**  
```js
balena.models.team.remove(123).then(function(teams) {
	console.log(teams);
});
```
## create
**balena.models.team.create(organizationSlugOrId, name) ⇒ <code>Promise</code>**

This method creates a new team.

**Summary**: Creates a new Team  
**Access**: public  
**Fulfil**: <code>Object</code> - Team  

| Param | Type | Description |
| --- | --- | --- |
| organizationSlugOrId | <code>Number</code> | Required: the organization slug or id the team will be part of. |
| name | <code>String</code> | Required: the name of the team that will be created. |

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
## getAllByOrganization
**balena.models.team.getAllByOrganization(organizationSlugOrId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get all Teams of a specific Organization  
**Access**: public  
**Fulfil**: <code>Object[]</code> - Teams  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationSlugOrId | <code>Number</code> |  | Required: the organization slug or id the team is part of. |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

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
## get
**balena.models.team.get(teamId, [options]) ⇒ <code>Promise</code>**

**Summary**: Get a single Team  
**Access**: public  
**Fulfil**: <code>Object</code> - Team  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| teamId | <code>Number</code> |  | team id (number). |
| [options] | <code>Object</code> | <code>{}</code> | extra pine options to use |

**Example**  
```js
balena.models.team.get(123).then(function(team) {
	console.log(team);
});
```
## rename
**balena.models.team.rename(teamId, newName) ⇒ <code>Promise</code>**

**Summary**: Rename Team  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>Number</code> | team id (number) |
| newName | <code>String</code> | new team name (string) |

**Example**  
```js
balena.models.team.rename(123, 'MyNewTeamName');
```
## remove
**balena.models.team.remove(teamId) ⇒ <code>Promise</code>**

**Summary**: Remove a Team  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>Number</code> | team id (number). |

**Example**  
```js
balena.models.team.remove(123);
```