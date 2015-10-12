# Preferences

## Two Factor Authentication

We offer the option to enable [Two Factor Authentication][2fa] - this is a feature that prompts you to input a code from your smartphone *in addition* to your password, providing an additional layer of security for your account.

__Note:__ We use the industry standard [Time-based One-time Password Algorithm][totp] to implement this functionality.

### Enabling Two-Factor Authentication

[Sign up][signup] for an account (or [log in][login] if you already have one) and go to your [preferences][prefs] page:-

![Preferences Page](/img/screenshots/2fa1.png)

From here, click on the 'Two factor authentication' tab then click ENABLE to switch it on:-

![Two Factor Authentication Tab, Disabled](/img/screenshots/2fa2.png)

Once you've enabled two factor authentication you will be given a QR code and prompted for a pairing code as shown below:-

__Note:__ Two factor authentication will only be enabled once you have finished configuring it against your mobile smartphone, so no need to worry about logging out before finishing the configuration then not having access to your account!

![Two Factor Authentication Tab, Configuring](/img/screenshots/2fa3.png)

In order to use your phone as your added layer of security you will need to download a free authenticator application. There are many available, but one that works well and has been successfully tested against [resin.io][resin] is [Google Authenticator][google-auth] - download it for [Android][google-auth-android] or [iOS][google-auth-ios].

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

[resin]:https://resin.io

[signup]:https://dashboard.resin.io/signup
[login]:https://dashboard.resin.io/login
[prefs]:https://dashboard.resin.io/preferences?tab=details

[2fa]:https://en.wikipedia.org/wiki/Two_factor_authentication
[totp]:https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm
[google-auth]:https://en.wikipedia.org/wiki/Google_Authenticator
[google-auth-android]:https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB
[google-auth-ios]:https://itunes.apple.com/gb/app/google-authenticator/id388497605?mt=8
