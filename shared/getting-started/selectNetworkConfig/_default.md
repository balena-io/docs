A toggle is also used to select whether your network connection will be through *Ethernet Only* or with the option for *WiFi + Ethernet*. Selecting *WiFi + Ethernet* allows you to enter a *WiFi SSID* and *WiFi Passphrase*:

<img src="/img/common/app/network.png" width="60%">

Clicking *Advanced* presents the option to select the rate at which your device checks for updates and the option to download just a configuration file (`config.json`) rather than an entire image:

<img src="/img/common/app/advanced.png" width="60%">

Once you have finished your image configuration, click the *Download {{ $names.os.lower }}* button. When the download completes, you should have a zipped image file with a name like `{{ $names.company.short }}-FirstApp-2.3.0+rev1-dev-v6.1.3.img.zip`, where `FirstApp` is the name you gave your application on the dashboard.
