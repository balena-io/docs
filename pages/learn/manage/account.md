---
title: Account management
---

# Account management

## Sign up

{{> "general/signUp"}}

## Access tokens

Access tokens are used for authentication in the resin.io [API][api], [CLI][cli], and [Node.js][node-sdk] and [Python][python-sdk] SDKs. They are managed in the *Access tokens* tab of the [*Preferences*][prefs] page, which can be found via the dropdown menu in the upper-right corner of the dashboard:

<img src="/img/common/preferences/access_tokens.png" width="80%">

There are two types of access tokens: session tokens and API keys. Both authentication types provide user-level permissions, meaning any user or application with one of these tokens can make changes across devices, applications, and the user account.

### Session tokens

Session tokens are retrieved from the *Preferences* page, and they can be refreshed with the [API][api-refresh]. These tokens expire after seven days, and they cannot be revoked.

### API keys

API keys are named tokens that do not expire and can be revoked as needed. To create a new API key, make sure you are in the *Access tokens* tab of the *Preferences* page, then select *Create API key*:

<img src="/img/common/preferences/create_api_key.png" width="80%">

You'll see a required field for *Token name*, as well as an optional field for *Token description*:

<img src="/img/common/preferences/api_key_name.png" width="40%"> 

When you click *Create token*, you will see a dialog with the new API key: 

<img src="/img/common/preferences/api_key_warning.png" width="60%">

__Warning__: This is your **only** opportunity to see the key, so make sure to download or copy to a secure location!

After you close the dialog, you'll see your API key in the list, complete with name, date of creation, and description:

<img src="/img/common/preferences/api_key_list.png" width="80%">

To revoke one or more API keys, select the boxes to the left of the tokens you wish to remove, then click *Delete selected*:

<img src="/img/common/preferences/api_key_delete.png" width="80%">

API keys can also be generated using the API, [CLI][cli-keys], and [Node.js][node-sdk-keys] and [Python][python-sdk-keys] SDKs.

## Collaboration management

An organization should create a main account to host all applications that the organization owns. This allows a strict separation between applications the organization owns and employee applications created via their accounts. The main account is bound to the organization itself—the organization should have a well defined process to manage the credentials for its main account. Employees are granted access to the organization applications as collaborators. When an employee should no longer have access to the organization applications, access can be revoked by removing them as a collaborator.

## Two Factor Authentication

We offer the option to enable [Two Factor Authentication][2fa] - this is a feature that prompts you to input a code from your smartphone/computer *in addition* to your password, providing an additional layer of security for your account.

__Note:__ We use the industry standard [Time-based One-time Password Algorithm][totp] to implement this functionality.

### Enabling Two-Factor Authentication

[Sign up][signup] for an account (or [log in][login] if you already have one) and go to your [preferences][prefs] page:-

![Preferences Page](/img/screenshots/2fa1.png)

From here, click on the 'Two factor authentication' tab then click `ENABLE` to switch it on:-

![Two Factor Authentication Tab, Disabled](/img/screenshots/2fa2.png)

Once you've enabled two factor authentication you will be given a QR code and prompted for a pairing code as shown below:-

__Note:__ Two factor authentication will only be enabled once you have finished configuring it against your smartphone/computer, so no need to worry about logging out before finishing the configuration then not having access to your account!

![Two Factor Authentication Tab, Configuring](/img/screenshots/2fa3.png)

In order to use your phone/computer as your added layer of security you will need to download a free authenticator application. There are many available, but one that works well and has been successfully tested against [resin.io][resin] is [Google Authenticator][google-auth] - download it for [Android][google-auth-android] or [iOS][google-auth-ios].

Once installed, navigate to the barcode scanner:-

__Note:__ The Android application is shown here - if you already have accounts installed, tap the 3 vertical dots in the top right-hand corner and select 'Set up account', otherwise you should be given the option when you first start the app.

![Google Authenticator Scan Barcode Menu](/img/screenshots/2fa3mobile1.png)

When you tap the option to scan a barcode your phone will turn on your camera and all you need to do to pair with your account is to simply point it at the QR code displayed on your monitor.

Once configured, you'll see a 6 digit generated code with a graphic beside it indicating a countdown. Once the countdown expires, the code becomes invalid:-

![Google Authenticator Codes](/img/screenshots/2fa3mobile2.png)

Next you'll need to input the displayed code into the 'Pairing code' input on the preferences page.

Once you've paired your authenticator to your [resin.io][resin] account you'll be all set up and the two factor authentication page will simply give you the option to disable it should you wish to later:-

__Note:__ It's best to wait for the countdown to show plenty of time remaining before doing this as the window during which the code is valid is rather short!

![Two Factor Authentication Tab, Enabled](/img/screenshots/2fa4.png)

Now when you log in you will be prompted for the code displayed in your authenticator app after you've input your username and password. Enjoy your added layer of security!

### List of verified authenticator applications

* [Google Authenticator](https://support.google.com/accounts/answer/1066447)
* [Authy](https://www.authy.com)
* [1Password](https://1password.com)

[resin]:https://resin.io

[signup]:https://dashboard.resin.io/signup
[login]:https://dashboard.resin.io/login
[prefs]:https://dashboard.resin.io/preferences?tab=details

[api]:/reference/data-api
[cli]:/reference/cli
[node-sdk]:/reference/sdk/node-sdk
[python-sdk]:/reference/sdk/python-sdk

[api-refresh]:/reference/data-api/#refresh-token

[cli-keys]:/reference/cli/#api-key-generate-name-
[node-sdk-keys]:/reference/sdk/node-sdk/#auth-createapikey-name-code-promise-code-
[python-sdk-keys]:/reference/sdk/python-sdk/#function-create_api_key-name-description-

[2fa]:https://en.wikipedia.org/wiki/Two_factor_authentication
[totp]:https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm
[google-auth]:https://en.wikipedia.org/wiki/Google_Authenticator
[google-auth-android]:https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB
[google-auth-ios]:https://itunes.apple.com/gb/app/google-authenticator/id388497605?mt=8
