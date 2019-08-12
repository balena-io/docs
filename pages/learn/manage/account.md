---
title: Account management
---

# Account management

## Sign up

{{> "general/signUp"}}

## Access tokens

Access tokens are used for authentication in the {{ $names.company.lower }} [API][api], [CLI][cli], and [Node.js][node-sdk] and [Python][python-sdk] SDKs. They are managed in the *Access tokens* tab of the [*Preferences*][prefs] page, which can be found via the dropdown menu in the upper-right corner of the dashboard:

<img src="/img/common/preferences/access_tokens.png" width="100%">

There are two types of access tokens: session tokens and API keys. Both authentication types provide user-level permissions, meaning any user or application with one of these tokens can make changes across devices, applications, and the user account.

### Session tokens

Session tokens are retrieved from the *Preferences* page, and they can be refreshed with the [API][api-refresh]. These tokens expire after seven days, and they cannot be revoked.

### API keys

API keys are named tokens that do not expire and can be revoked as needed. To create a new API key, make sure you are in the *Access tokens* tab of the *Preferences* page, then select *Create API key*:

<img src="/img/common/preferences/create_api_key.png" width="100%">

You'll see a required field for *Token name*, as well as an optional field for *Token description*:

<img src="/img/common/preferences/api_key_name.png" width="60%">

When you click *Create token*, you will see a dialog with the new API key:

<img src="/img/common/preferences/api_key_warning.png" width="60%">

__Warning__: This is your **only** opportunity to see the key, so make sure to download or copy to a secure location!

After you close the dialog, you'll see your API key in the list, complete with name, date of creation, and description:

<img src="/img/common/preferences/api_key_list.png" width="100%">

To revoke one or more API keys, select the boxes to the left of the tokens you wish to remove, then click *Delete selected*:

<img src="/img/common/preferences/api_key_delete.png" width="100%">

API keys can also be generated using the API, [CLI][cli-keys], and [Node.js][node-sdk-keys] and [Python][python-sdk-keys] SDKs.

## Application members

When an application needs to be shared with more than one user, the application owner can add new members. With paid accounts, it's possible to assign a level of access for a new member, based on the following types:

### Member types

#### Owner

The application owner is the user who first creates an application. The owner is the only user who can add other application members or delete the application.

#### Observer

Observers are given read-only access to the application and its devices. They are not able to modify, add, or remove any devices, nor are they able to perform device actions. This role can only be assigned by application owners on paid plans.

#### Operator

Operators have all the access given to observers, plus the ability to manage an application's devices. This means operators can remove devices, perform device actions, and modify device tags, metadata, and environment variables. Operators also have full [SSH access][ssh] to the application's devices. This role can only be assigned by application owners on paid plans.

#### Developer

Developers are given, in addition to the access provided to operators, the ability to manage an application. This includes pushing new code, modifying fleet-wide environment variables, running application actions, and downloading application images. This role is the closest to an application owner—developers can do everything owners can except for deleting the application or adding new members. The Developer role can be assigned by application owners on free or paid accounts, and it is the only role available for [Starter][starter] applications.

### Add an application member

To add a new member to your application, click on the *Members* tab of the application summary page:

<img src="/img/common/app/members_tab.png" width="15%">

This brings up a list of all application members, if any have been assigned. Click on the *Add member* button in the top left:

<img src="/img/common/app/add_member.png" width="100%">

The *Add application member* dialog has a dropdown with descriptions of the member types, as well as information about which types are available based on your billing plan. Choose a level of access, then enter the username or email address of the new application member:

<img src="/img/common/app/member_dialog.png" width="60%">

__Note__: Application members must have already [signed up][signup] for a {{ $names.company.lower }} account before they can be added to an application.

After you click *Add*, you will see the username of the new application member in the list. From here, you can edit access levels or remove the user if necessary:

<img src="/img/common/app/member_list.png" width="100%">

All users that have been added to an application will see that application in their dashboard, with an indicator to designate it has been shared by the application owner:

<img src="/img/common/app/shared_app.png" width="40%">

The shared application will also have a header with the application owner and the member's role:

<img src="/img/common/app/app_header.png" width="40%">

In addition to the application actions permitted by the assigned member role, application members will have the option to remove themselves from an application. This is done by clicking the *Actions* tab from the application summary page, then clicking *Remove Member Access*:

<img src="/img/common/app/remove_access.png" width="100%">

__Warning__: If you remove your member access to an application, you will not be able to undo the action. Only the application owner will be able to restore your access.

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

In order to use your phone/computer as your added layer of security you will need to download a free authenticator application. There are many available, but one that works well and has been successfully tested against {{ $names.company.lower }} is [Google Authenticator][google-auth] - download it for [Android][google-auth-android] or [iOS][google-auth-ios].

Once installed, navigate to the barcode scanner:-

__Note:__ The Android application is shown here - if you already have accounts installed, tap the 3 vertical dots in the top right-hand corner and select 'Set up account', otherwise you should be given the option when you first start the app.

![Google Authenticator Scan Barcode Menu](/img/screenshots/2fa3mobile1.png)

When you tap the option to scan a barcode your phone will turn on your camera and all you need to do to pair with your account is to simply point it at the QR code displayed on your monitor.

Once configured, you'll see a 6 digit generated code with a graphic beside it indicating a countdown. Once the countdown expires, the code becomes invalid:-

![Google Authenticator Codes](/img/screenshots/2fa3mobile2.png)

Next you'll need to input the displayed code into the 'Pairing code' input on the preferences page.

Once you've paired your authenticator to your {{ $names.company.lower }} account you'll be all set up and the two factor authentication page will simply give you the option to disable it should you wish to later:-

__Note:__ It's best to wait for the countdown to show plenty of time remaining before doing this as the window during which the code is valid is rather short!

![Two Factor Authentication Tab, Enabled](/img/screenshots/2fa4.png)

Now when you log in you will be prompted for the code displayed in your authenticator app after you've input your username and password. Enjoy your added layer of security!

### List of verified authenticator applications

* [Google Authenticator](https://support.google.com/accounts/answer/1066447)
* [Authy](https://www.authy.com)
* [1Password](https://1password.com)

[ssh]:/learn/manage/ssh-access
[starter]:/learn/manage/app-types#starter

[signup]:{{ $links.dashboardUrl }}/signup
[login]:{{ $links.dashboardUrl }}/login
[prefs]:{{ $links.dashboardUrl }}/preferences?tab=details

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
