# Auth

`balena.auth` : `object`

**Kind**: static namespace

***

## authenticate

`balena.auth.authenticate(credentials)` ⇒ `Promise`

You should use [login](auth.md#balena.auth.login) when possible, as it takes care of saving the token and email as well.

Notice that if `credentials` contains extra keys, they'll be discarted by the server automatically.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Authenticate with the server\
**Access**: protected\
**Fulfil**: `String` - session token

| Param                | Type     | Description                    |
| -------------------- | -------- | ------------------------------ |
| credentials          | `Object` | in the form of email, password |
| credentials.email    | `String` | the email                      |
| credentials.password | `String` | the password                   |

**Example**

```js
balena.auth.authenticate(credentials).then(function(token) {
	console.log('My token is:', token);
});
```

***

## getActorId

`balena.auth.getActorId()` ⇒ `Promise`

This will only work if you used [login](auth.md#balena.auth.login) or [loginWithToken](auth.md#balena.auth.loginWithToken) to log in.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Get current logged in actor id\
**Access**: public\
**Fulfil**: `Number` - actor id\
**Example**

```js
balena.auth.getActorId().then(function(actorId) {
	console.log(actorId);
});
```

***

## getToken

`balena.auth.getToken()` ⇒ `Promise`

This will only work if you used [login](auth.md#balena.auth.login) to log in.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Get current logged in user's raw API key or session token\
**Access**: public\
**Fulfil**: `String` - raw API key or session token\
**Example**

```js
balena.auth.getToken().then(function(token) {
	console.log(token);
});
```

***

## getUserInfo

`balena.auth.getUserInfo()` ⇒ `Promise`

This will only work if you used [login](auth.md#balena.auth.login) to log in.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Get current logged in user's info\
**Access**: public\
**Fulfil**: `Object` - user info\
**Example**

```js
balena.auth.getUserInfo().then(function(userInfo) {
	console.log(userInfo);
});
```

***

## isLoggedIn

`balena.auth.isLoggedIn()` ⇒ `Promise`

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Check if you're logged in\
**Access**: public\
**Fulfil**: `Boolean` - is logged in\
**Example**

```js
balena.auth.isLoggedIn().then(function(isLoggedIn) {
	if (isLoggedIn) {
		console.log('I\'m in!');
	} else {
		console.log('Too bad!');
	}
});
```

***

## login

`balena.auth.login(credentials)` ⇒ `Promise`

If the login is successful, the token is persisted between sessions.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Login\
**Access**: public

| Param                | Type     | Description                    |
| -------------------- | -------- | ------------------------------ |
| credentials          | `Object` | in the form of email, password |
| credentials.email    | `String` | the email                      |
| credentials.password | `String` | the password                   |

**Example**

```js
balena.auth.login(credentials);
```

***

## loginWithToken

`balena.auth.loginWithToken(authToken)` ⇒ `Promise`

Login to balena with a session token or api key instead of with credentials.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Login with a token or api key\
**Access**: public

| Param     | Type     | Description    |
| --------- | -------- | -------------- |
| authToken | `String` | the auth token |

**Example**

```js
balena.auth.loginWithToken(authToken);
```

***

## logout

`balena.auth.logout()` ⇒ `Promise`

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Logout\
**Access**: public\
**Example**

```js
balena.auth.logout();
```

***

## register

`balena.auth.register(credentials)` ⇒ `Promise`

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Register a user account\
**Access**: public\
**Fulfil**: `String` - session token

| Param                                 | Type                    | Description                                 |
| ------------------------------------- | ----------------------- | ------------------------------------------- |
| credentials                           | `Object`                | in the form of username, password and email |
| credentials.email                     | `String`                | the email                                   |
| credentials.password                  | `String`                | the password                                |
| \[credentials.'g-recaptcha-response'] | `String` \| `undefined` | the captcha response                        |

**Example**

```js
balena.auth.register({
	email: 'johndoe@gmail.com',
	password: 'secret'
}).then(function(token) {
	console.log(token);
});
```

***

## requestVerificationEmail

`balena.auth.requestVerificationEmail()` ⇒ `Promise`

This will only work if you used [login](auth.md#balena.auth.login) to log in.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Re-send verification email to the user\
**Access**: public\
**Example**

```js
balena.auth.requestVerificationEmail().then(function() {
	console.log('Requesting verification email operation complete!');
})
```

***

## verifyEmail

`balena.auth.verifyEmail(verificationPayload)` ⇒ `Promise`

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Verifies an email\
**Access**: public\
**Fulfil**: `String` - session token

| Param                     | Type     | Description                     |
| ------------------------- | -------- | ------------------------------- |
| verificationPayload       | `Object` | in the form of email, and token |
| verificationPayload.email | `String` | the email                       |
| verificationPayload.token | `String` | the verification token          |

**Example**

```js
balena.auth.verifyEmail({
	email: 'johndoe@gmail.com',
	token: '5bb11d90eefb34a70318f06a43ef063f'
}).then(function(jwt) {
	console.log(jwt);
});
```

***

## whoami

`balena.auth.whoami()` ⇒ `Promise`

This will only work if you used [login](auth.md#balena.auth.login) or [loginWithToken](auth.md#balena.auth.loginWithToken) to log in.

**Kind**: static method of [`auth`](auth.md#balena.auth)\
**Summary**: Return current logged in information\
**Access**: public\
**Fulfil**: `(Object|undefined)` - actor information, if it exists\
**Example**

```js
balena.auth.whoami().then(function(result) {
	if (!result) {
		console.log('I\'m not logged in!');
	} else {
		console.log('My result is:', result);
	}
});
```

***

## twoFactor

`balena.auth.twoFactor` : `object`

**Kind**: static namespace of [`auth`](auth.md#balena.auth)

***

### challenge

`balena.auth.twoFactor.challenge(code)` ⇒ `Promise`

You should use [login](auth.md#balena.auth.login) when possible, as it takes care of saving the token and email as well.

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Challenge two factor authentication and complete login\
**Access**: public

| Param | Type     | Description |
| ----- | -------- | ----------- |
| code  | `String` | code        |

**Example**

```js
balena.auth.twoFactor.challenge('1234');
```

***

### disable

`balena.auth.twoFactor.disable(password)` ⇒ `Promise`

Disables two factor authentication.

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Disable two factor authentication\
**Access**: public\
**Fulfil**: `String` - session token

| Param    | Type     | Description |
| -------- | -------- | ----------- |
| password | `String` | password    |

**Example**

```js
const token = balena.auth.twoFactor.disable('1234');
balena.auth.loginWithToken(token);
```

***

### enable

`balena.auth.twoFactor.enable(code)` ⇒ `Promise`

Enables two factor authentication.

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Enable two factor authentication\
**Access**: public\
**Fulfil**: `String` - session token

| Param | Type     | Description |
| ----- | -------- | ----------- |
| code  | `String` | code        |

**Example**

```js
const token = balena.auth.twoFactor.enable('1234');
balena.auth.loginWithToken(token);
```

***

### getSetupKey

`balena.auth.twoFactor.getSetupKey()` ⇒ `Promise`

Retrieves a setup key for enabling two factor authentication.

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Get two factor authentication setup key\
**Access**: public\
**Fulfil**: `String` - setup key\
**Example**

```js
const setupKey = balena.auth.twoFactor.getSetupKey();
console.log(setupKey);
```

***

### isEnabled

`balena.auth.twoFactor.isEnabled()` ⇒ `Promise`

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Check if two factor authentication is enabled\
**Access**: public\
**Fulfil**: `Boolean` - whether 2fa is enabled\
**Example**

```js
balena.auth.twoFactor.isEnabled().then(function(isEnabled) {
	if (isEnabled) {
		console.log('2FA is enabled for this account');
	}
});
```

***

### isPassed

`balena.auth.twoFactor.isPassed()` ⇒ `Promise`

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Check if two factor authentication challenge was passed\
**Access**: public\
**Fulfil**: `Boolean` - whether 2fa challenge was passed\
**Example**

```js
balena.auth.twoFactor.isPassed().then(function(isPassed) {
	if (isPassed) {
		console.log('2FA challenge passed');
	}
});
```

***

### verify

`balena.auth.twoFactor.verify(code)` ⇒ `Promise`

Verifies two factor authentication. Note that this method not update the token automatically. You should use [challenge](auth.md#balena.auth.twoFactor.challenge) when possible, as it takes care of that as well.

**Kind**: static method of [`twoFactor`](auth.md#balena.auth.twoFactor)\
**Summary**: Verify two factor authentication\
**Access**: public\
**Fulfil**: `String` - session token

| Param | Type     | Description |
| ----- | -------- | ----------- |
| code  | `String` | code        |

**Example**

```js
const token = balena.auth.twoFactor.verify('1234');
balena.auth.loginWithToken(token);
```

***
