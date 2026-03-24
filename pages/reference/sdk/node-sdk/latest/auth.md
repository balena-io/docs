# Auth

**balena.auth : <code>object</code>**

## authenticate
**balena.auth.authenticate(credentials) ⇒ <code>Promise</code>**

You should use [login](#login) when possible,
as it takes care of saving the token and email as well.

Notice that if `credentials` contains extra keys, they'll be discarted
by the server automatically.

**Summary**: Authenticate with the server  
**Access**: protected  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>credentials</td><td><code>Object</code></td><td><p>in the form of email, password</p>
</td>
    </tr><tr>
    <td>credentials.email</td><td><code>String</code></td><td><p>the email</p>
</td>
    </tr><tr>
    <td>credentials.password</td><td><code>String</code></td><td><p>the password</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.authenticate(credentials).then(function(token) {
	console.log('My token is:', token);
});
```

## getActorId
**balena.auth.getActorId() ⇒ <code>Promise</code>**

This will only work if you used [login](#loginWithToken) to log in.

**Summary**: Get current logged in actor id  
**Access**: public  
**Fulfil**: <code>Number</code> - actor id  
**Example**  
```js
balena.auth.getActorId().then(function(actorId) {
	console.log(actorId);
});
```

## getToken
**balena.auth.getToken() ⇒ <code>Promise</code>**

This will only work if you used [login](#login) to log in.

**Summary**: Get current logged in user's raw API key or session token  
**Access**: public  
**Fulfil**: <code>String</code> - raw API key or session token  
**Example**  
```js
balena.auth.getToken().then(function(token) {
	console.log(token);
});
```

## getUserInfo
**balena.auth.getUserInfo() ⇒ <code>Promise</code>**

This will only work if you used [login](#login) to log in.

**Summary**: Get current logged in user's info  
**Access**: public  
**Fulfil**: <code>Object</code> - user info  
**Example**  
```js
balena.auth.getUserInfo().then(function(userInfo) {
	console.log(userInfo);
});
```

## isLoggedIn
**balena.auth.isLoggedIn() ⇒ <code>Promise</code>**

**Summary**: Check if you're logged in  
**Access**: public  
**Fulfil**: <code>Boolean</code> - is logged in  
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

## login
**balena.auth.login(credentials) ⇒ <code>Promise</code>**

If the login is successful, the token is persisted between sessions.

**Summary**: Login  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>credentials</td><td><code>Object</code></td><td><p>in the form of email, password</p>
</td>
    </tr><tr>
    <td>credentials.email</td><td><code>String</code></td><td><p>the email</p>
</td>
    </tr><tr>
    <td>credentials.password</td><td><code>String</code></td><td><p>the password</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.login(credentials);
```

## loginWithToken
**balena.auth.loginWithToken(authToken) ⇒ <code>Promise</code>**

Login to balena with a session token or api key instead of with credentials.

**Summary**: Login with a token or api key  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>authToken</td><td><code>String</code></td><td><p>the auth token</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.loginWithToken(authToken);
```

## logout
**balena.auth.logout() ⇒ <code>Promise</code>**

**Summary**: Logout  
**Access**: public  
**Example**  
```js
balena.auth.logout();
```

## register
**balena.auth.register(credentials) ⇒ <code>Promise</code>**

**Summary**: Register a user account  
**Access**: public  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>credentials</td><td><code>Object</code></td><td><p>in the form of username, password and email</p>
</td>
    </tr><tr>
    <td>credentials.email</td><td><code>String</code></td><td><p>the email</p>
</td>
    </tr><tr>
    <td>credentials.password</td><td><code>String</code></td><td><p>the password</p>
</td>
    </tr><tr>
    <td>[credentials.'g-recaptcha-response']</td><td><code>String</code> | <code>undefined</code></td><td><p>the captcha response</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.register({
	email: 'johndoe@gmail.com',
	password: 'secret'
}).then(function(token) {
	console.log(token);
});
```

## requestVerificationEmail
**balena.auth.requestVerificationEmail() ⇒ <code>Promise</code>**

This will only work if you used [login](#login) to log in.

**Summary**: Re-send verification email to the user  
**Access**: public  
**Example**  
```js
balena.auth.requestVerificationEmail().then(function() {
	console.log('Requesting verification email operation complete!');
})
```

## verifyEmail
**balena.auth.verifyEmail(verificationPayload) ⇒ <code>Promise</code>**

**Summary**: Verifies an email  
**Access**: public  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>verificationPayload</td><td><code>Object</code></td><td><p>in the form of email, and token</p>
</td>
    </tr><tr>
    <td>verificationPayload.email</td><td><code>String</code></td><td><p>the email</p>
</td>
    </tr><tr>
    <td>verificationPayload.token</td><td><code>String</code></td><td><p>the verification token</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.verifyEmail({
	email: 'johndoe@gmail.com',
	token: '5bb11d90eefb34a70318f06a43ef063f'
}).then(function(jwt) {
	console.log(jwt);
});
```

## whoami
**balena.auth.whoami() ⇒ <code>Promise</code>**

This will only work if you used [login](#loginWithToken) to log in.

**Summary**: Return current logged in information  
**Access**: public  
**Fulfil**: <code>(Object\|undefined)</code> - actor information, if it exists  
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

## twoFactor
**balena.auth.twoFactor : <code>object</code>**

### challenge
**balena.auth.twoFactor.challenge(code) ⇒ <code>Promise</code>**

You should use [login](#login) when possible,
as it takes care of saving the token and email as well.

**Summary**: Challenge two factor authentication and complete login  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>code</td><td><code>String</code></td><td><p>code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
balena.auth.twoFactor.challenge('1234');
```

### disable
**balena.auth.twoFactor.disable(password) ⇒ <code>Promise</code>**

Disables two factor authentication.

**Summary**: Disable two factor authentication  
**Access**: public  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>password</td><td><code>String</code></td><td><p>password</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const token = balena.auth.twoFactor.disable('1234');
balena.auth.loginWithToken(token);
```

### enable
**balena.auth.twoFactor.enable(code) ⇒ <code>Promise</code>**

Enables two factor authentication.

**Summary**: Enable two factor authentication  
**Access**: public  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>code</td><td><code>String</code></td><td><p>code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const token = balena.auth.twoFactor.enable('1234');
balena.auth.loginWithToken(token);
```

### getSetupKey
**balena.auth.twoFactor.getSetupKey() ⇒ <code>Promise</code>**

Retrieves a setup key for enabling two factor authentication.

**Summary**: Get two factor authentication setup key  
**Access**: public  
**Fulfil**: <code>String</code> - setup key  
**Example**  
```js
const setupKey = balena.auth.twoFactor.getSetupKey();
console.log(setupKey);
```

### isEnabled
**balena.auth.twoFactor.isEnabled() ⇒ <code>Promise</code>**

**Summary**: Check if two factor authentication is enabled  
**Access**: public  
**Fulfil**: <code>Boolean</code> - whether 2fa is enabled  
**Example**  
```js
balena.auth.twoFactor.isEnabled().then(function(isEnabled) {
	if (isEnabled) {
		console.log('2FA is enabled for this account');
	}
});
```

### isPassed
**balena.auth.twoFactor.isPassed() ⇒ <code>Promise</code>**

**Summary**: Check if two factor authentication challenge was passed  
**Access**: public  
**Fulfil**: <code>Boolean</code> - whether 2fa challenge was passed  
**Example**  
```js
balena.auth.twoFactor.isPassed().then(function(isPassed) {
	if (isPassed) {
		console.log('2FA challenge passed');
	}
});
```

### verify
**balena.auth.twoFactor.verify(code) ⇒ <code>Promise</code>**

Verifies two factor authentication.
Note that this method not update the token automatically.
You should use [challenge](#challenge) when possible,
as it takes care of that as well.

**Summary**: Verify two factor authentication  
**Access**: public  
**Fulfil**: <code>String</code> - session token  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>code</td><td><code>String</code></td><td><p>code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const token = balena.auth.twoFactor.verify('1234');
balena.auth.loginWithToken(token);
```

* * *