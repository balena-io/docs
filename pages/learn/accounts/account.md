---
title: Account management
---

# Account management

## Sign up

In order to use balena and deploy code to devices you will need a balena account.

If you don't already have an account head over to our [signup page](https://dashboard.balena-cloud.com/signup). You can sign up with a GitHub or Google account or via an email address. When you create your account, you will be asked to create a password for the account. Your password needs to be at least 8 characters long.

## Password reset

If you forget your password, you may request to reset it via the [password reset](https://dashboard.balena-cloud.com/password-reset) page. Enter the email address associated with your balenaCloud account. If the email address has an associated account, a password reset link will be sent to that address. Following the link, you will be able to enter a new password.

## Add a password to social login

To add a password to an account created with a social login (Google, Github), navigate to the [_Preferences_](https://dashboard.balena-cloud.com/preferences?tab=details) page found by clicking on your profile in the top right of the dashboard. Under the _Account details_ tab you can set a password for your account.

## Access tokens

Access tokens are used for authentication in the balena [API](../../reference/api/overview.md), [CLI](../../external-docs/balena-cli/latest.md), and [Node.js](../../external-docs/sdk/node-sdk/latest.md) and [Python](../../external-docs/sdk/python-sdk/latest.md) SDKs. They are managed in the _Access tokens_ tab of the [_Preferences_](https://dashboard.balena-cloud.com/preferences?tab=details) page, which can be found via the dropdown menu in the upper-right corner of the dashboard:

<figure><img src="../../.gitbook/assets/access_tokens (2) (1).webp" alt=""><figcaption></figcaption></figure>

There are two types of access tokens: session tokens and API keys. Both authentication types provide user-level permissions, meaning any user or application with one of these tokens can make changes across devices, fleets, and the user account.

### Session tokens

Session tokens are retrieved from the _Preferences_ page, and they can be refreshed with the [API](../../reference/api/resources/). These tokens expire after seven days, and they cannot be revoked.

### API keys

API keys are named tokens that do not expire and can be revoked as needed. To create a new API key, make sure you are in the _Access tokens_ tab of the _Preferences_ page, then select _Create API key_:

<figure><img src="../../.gitbook/assets/create_api_key (2) (1).webp" alt=""><figcaption></figcaption></figure>

You'll see a required field for _Token name_, as well as an optional field for _Token description_:

<figure><img src="../../.gitbook/assets/api_key_name (2) (1).webp" alt=""><figcaption></figcaption></figure>

When you click _Create token_, you will see a dialog with the new API key:

<figure><img src="../../.gitbook/assets/api_key_warning (2) (1).webp" alt=""><figcaption></figcaption></figure>

{% hint style="danger" %}
This is your **only** opportunity to see the key, so make sure to download or copy to a secure location!
{% endhint %}

After you close the dialog, you'll see your API key in the list, complete with name, date of creation, and description:

<figure><img src="../../.gitbook/assets/api_key_list (2) (1).webp" alt=""><figcaption></figcaption></figure>

To revoke one or more API keys, select the boxes to the left of the tokens you wish to remove, then click _Delete selected_:

<figure><img src="../../.gitbook/assets/api_key_delete (2) (1).webp" alt=""><figcaption></figcaption></figure>

API keys can also be generated using the API, [CLI](../../external-docs/balena-cli/latest.md#api-key-generate), and [Node.js](../../external-docs/sdk/node-sdk/latest.md#models.apikey-object) and [Python](../../external-docs/sdk/python-sdk/latest.md#apikey) SDKs.

## Fleet members

When a fleet needs to be shared with more than one user, the fleet owner can add new members. Check out [fleet members](fleet-members.md) to understand member types, how to add a member and more.

## Two-factor Authentication

We offer the option to enable [Two-factor Authentication](https://en.wikipedia.org/wiki/Two_factor_authentication) - this is a feature that prompts you to input a code from your smartphone/computer _in addition_ to your password, providing an additional layer of security for your account.

{% hint style="warning" %}
We use the industry standard [Time-based One-time Password Algorithm](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) to implement this functionality.
{% endhint %}

### Enabling Two-factor Authentication

[Sign up](https://dashboard.balena-cloud.com/signup) for an account (or [log in](https://dashboard.balena-cloud.com/login) if you already have one) and go to your [preferences](https://dashboard.balena-cloud.com/preferences?tab=details) page. From here, click on the _Two-factor Authentication_ tab then click _Enable two-factor authentication_ to enable:

<figure><img src="../../.gitbook/assets/enable_2fa (2) (1).webp" alt=""><figcaption></figcaption></figure>

Next, you will be shown a QR code and prompted for a pairing code as shown below:

{% hint style="warning" %}
Two-factor authentication will only be enabled once you have finished configuring it against your smartphone/computer, so no need to worry about logging out before finishing the configuration then not having access to your account!
{% endhint %}

<figure><img src="../../.gitbook/assets/pairing_2fa (2) (1).webp" alt=""><figcaption></figcaption></figure>

In order to use your phone/computer as your added layer of security you will need to download a free authenticator app. There are many available, but one that works well and has been successfully tested against balena is [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) - download it for [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2\&hl=en_GB) or [iOS](https://itunes.apple.com/gb/app/google-authenticator/id388497605?mt=8).

Once installed, navigate to the barcode scanner:

{% hint style="warning" %}
The Android app is shown here - if you already have accounts installed, tap the 3 vertical dots in the top right-hand corner and select 'Set up account', otherwise you should be given the option when you first start the app.
{% endhint %}

<figure><img src="../../.gitbook/assets/2fa3mobile1 (2) (1).webp" alt=""><figcaption></figcaption></figure>

When you tap the option to scan a barcode your phone will turn on your camera and all you need to do to pair with your account is to simply point it at the QR code displayed on your monitor.

Once configured, you'll see a 6 digit generated code with a graphic beside it indicating a countdown. Once the countdown expires, the code becomes invalid:

<figure><img src="../../.gitbook/assets/2fa3mobile2 (2) (1).webp" alt=""><figcaption></figcaption></figure>

Next, you'll need to input the displayed code into the 'Pairing code' input on the preferences page. If successful, you will be shown recovery codes that may be used in the event that you cannot access your two-factor authentication app. These codes should be downloaded and stored in a safe place.

<figure><img src="../../.gitbook/assets/recovery_codes_2fa (2) (1).webp" alt=""><figcaption></figcaption></figure>

Once you've downloaded your recovery codes and clicked _OK_, the next time you log in, you will be prompted for the code displayed in your authenticator app after you've input your username and password. Enjoy your added layer of security!

To disable two-factor authentication, visit the _Two-factor Authentication_ tab of the _Account Preference_ and click _Disable two-factor authentication_. You will be prompted for your account password before it is disabled.

<figure><img src="../../.gitbook/assets/disable_2fa (2) (1).webp" alt=""><figcaption></figcaption></figure>

### List of verified authenticator apps

* [Google Authenticator](https://support.google.com/accounts/answer/1066447)
* [Authy](https://www.authy.com)
* [1Password](https://1password.com)

## Delete account

If you wish to delete your balenaCloud account, go to your [_Preferences_](https://dashboard.balena-cloud.com/preferences?tab=details) page, and under the _Account Details_ tab, select the _Delete Account_ button. You will need to confirm this action by entering your password. If your account does not have a password, you will be prompted to set one in your account preferences. Upon confirmation, the account will be permanently deleted, including all fleets and devices. If you would also like to request deletion of your data in accordance with GDPR, please refer to the instructions in our [privacy policy](https://balena.io/privacy-policy/).

<figure><img src="../../.gitbook/assets/delete-balena-account (2) (1).webp" alt=""><figcaption></figcaption></figure>
