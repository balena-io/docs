---
title: Account management
---

# Account management

## Sign up

{{> "general/signUp"}}

## Password reset

If you forget your password, you may request to reset it via the [password reset][password-reset] page. Enter the email address associated with your {{ $names.cloud.lower }} account. If the email address has an associated account, a password reset link will be sent to that address. Following the link, you will be able to enter a new password.

## Add a password to social login

To add a password to an account created with a social login (Google, Github), navigate to the [*Preferences*][prefs] page found by clicking on your profile in the top right of the dashboard. Under the *Account details* tab you can set a password for your account.

## Access tokens

Access tokens are used for authentication in the {{ $names.company.lower }} [API][api], [CLI][cli], and [Node.js][node-sdk] and [Python][python-sdk] SDKs. They are managed in the *Access tokens* tab of the [*Preferences*][prefs] page, which can be found via the dropdown menu in the upper-right corner of the dashboard:

<img src="/img/common/preferences/access_tokens.webp" width="100%">

There are two types of access tokens: session tokens and API keys. Both authentication types provide user-level permissions, meaning any user or application with one of these tokens can make changes across devices, fleets, and the user account.

### Session tokens

Session tokens are retrieved from the *Preferences* page, and they can be refreshed with the [API][api-refresh]. These tokens expire after seven days, and they cannot be revoked.

### API keys

API keys are named tokens that do not expire and can be revoked as needed. To create a new API key, make sure you are in the *Access tokens* tab of the *Preferences* page, then select *Create API key*:

<img alt="Create API Key" src="/img/common/preferences/create_api_key.webp" width="100%">

You'll see a required field for *Token name*, as well as an optional field for *Token description*:

<img alt="Name API Key" src="/img/common/preferences/api_key_name.webp" width="60%">

When you click *Create token*, you will see a dialog with the new API key:

<img alt="API Key Warning" src="/img/common/preferences/api_key_warning.webp" width="80%">

__Warning:__ This is your **only** opportunity to see the key, so make sure to download or copy to a secure location!

After you close the dialog, you'll see your API key in the list, complete with name, date of creation, and description:

<img alt="List API Keys" src="/img/common/preferences/api_key_list.webp" width="100%">

To revoke one or more API keys, select the boxes to the left of the tokens you wish to remove, then click *Delete selected*:

<img alt="Delete API Key" src="/img/common/preferences/api_key_delete.webp" width="100%">

API keys can also be generated using the API, [CLI][cli-keys], and [Node.js][node-sdk-keys] and [Python][python-sdk-keys] SDKs.

## Fleet members

When a fleet needs to be shared with more than one user, the fleet owner can add new members. Check out [fleet members][team] to understand member types, how to add a member and more.


## Two-factor Authentication

We offer the option to enable [Two-factor Authentication][2fa] - this is a feature that prompts you to input a code from your smartphone/computer *in addition* to your password, providing an additional layer of security for your account.

__Note:__ We use the industry standard [Time-based One-time Password Algorithm][totp] to implement this functionality.

### Enabling Two-factor Authentication

[Sign up][signup] for an account (or [log in][login] if you already have one) and go to your [preferences][prefs] page. From here, click on the *Two-factor Authentication* tab then click *Enable two-factor authentication* to enable:

<img alt="Enable two-factor authentication" src="/img/common/preferences/enable_2fa.webp" width="100%">

Next, you will be shown a QR code and prompted for a pairing code as shown below:

__Note:__ Two-factor authentication will only be enabled once you have finished configuring it against your smartphone/computer, so no need to worry about logging out before finishing the configuration then not having access to your account!

<img alt="Two-factor authentication pairing" src="/img/common/preferences/pairing_2fa.webp" width="80%">

In order to use your phone/computer as your added layer of security you will need to download a free authenticator app. There are many available, but one that works well and has been successfully tested against {{ $names.company.lower }} is [Google Authenticator][google-auth] - download it for [Android][google-auth-android] or [iOS][google-auth-ios].

Once installed, navigate to the barcode scanner:

__Note:__ The Android app is shown here - if you already have accounts installed, tap the 3 vertical dots in the top right-hand corner and select 'Set up account', otherwise you should be given the option when you first start the app.

![Google Authenticator Scan Barcode Menu](/img/screenshots/2fa3mobile1.webp)

When you tap the option to scan a barcode your phone will turn on your camera and all you need to do to pair with your account is to simply point it at the QR code displayed on your monitor.

Once configured, you'll see a 6 digit generated code with a graphic beside it indicating a countdown. Once the countdown expires, the code becomes invalid:

![Google Authenticator Codes](/img/screenshots/2fa3mobile2.webp)

Next, you'll need to input the displayed code into the 'Pairing code' input on the preferences page. If successful, you will be shown recovery codes that may be used in the event that you cannot access your two-factor authentication app. These codes should be downloaded and stored in a safe place.

<img alt="Two-factor authentication recovery codes" src="/img/common/preferences/recovery_codes_2fa.webp" width="100%">

Once you've downloaded your recovery codes and clicked _OK_, the next time you log in, you will be prompted for the code displayed in your authenticator app after you've input your username and password. Enjoy your added layer of security!

To disable two-factor authentication, visit the _Two-factor Authentication_ tab of the _Account Preference_ and click _Disable two-factor authentication_. You will be prompted for your account password before it is disabled.

<img alt="Two-factor authentication recovery codes" src="/img/common/preferences/disable_2fa.webp" width="100%">

### List of verified authenticator apps

* [Google Authenticator](https://support.google.com/accounts/answer/1066447)
* [Authy](https://www.authy.com)
* [1Password](https://1password.com)

## Delete account

If you wish to delete your {{ $names.cloud.lower }} account, go to your [_Preferences_][prefs] page, and under the _Account Details_ tab, select the _Delete Account_ button. You will need to confirm this action by entering your password. If your account does not have a password, you will be prompted to set one in your account preferences. Upon confirmation, the account will be permanently deleted, including all fleets and devices. If you would also like to request deletion of your data in accordance with GDPR, please refer to the instructions in our [privacy policy][privacy-policy].

![Delete {{ $names.company.lower }} Account](/img/screenshots/delete-balena-account.webp)

[signup]:{{ $links.dashboardUrl }}/signup
[login]:{{ $links.dashboardUrl }}/login
[prefs]:{{ $links.dashboardUrl }}/preferences?tab=details
[password-reset]:{{ $links.dashboardUrl }}/password-reset
[privacy-policy]:{{ $links.mainSiteUrl }}/privacy-policy/

[api]:/reference/api/overview/
[cli]:/reference/cli
[node-sdk]:/reference/sdk/node-sdk
[python-sdk]:/reference/sdk/python-sdk

[api-refresh]:/reference/api/resources/whoami/

[cli-keys]:/reference/cli/#api-key-generate-name-
[node-sdk-keys]:/reference/sdk/node-sdk/#auth-createapikey-name-code-promise-code-
[python-sdk-keys]:/reference/sdk/python-sdk/#function-create_api_key-name-description-

[2fa]:https://en.wikipedia.org/wiki/Two_factor_authentication
[totp]:https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm
[google-auth]:https://en.wikipedia.org/wiki/Google_Authenticator
[google-auth-android]:https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB
[google-auth-ios]:https://itunes.apple.com/gb/app/google-authenticator/id388497605?mt=8

[team]:/learn/accounts/fleet-members/