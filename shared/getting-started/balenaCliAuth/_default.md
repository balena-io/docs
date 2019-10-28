The recommended way to deploy code is to install the [balenaCLI][cli]. The easiest way to do this is to use the installer for your OS available on the [releases page][releases]. Choose the latest release of the installer for your OS, and follow the [installation instructions][install].

<img src="/img/common/cli/download-installer.png" width="60%">

__Note:__ You may also install the balenaCLI via npm on a system running NodeJS, as explained in
[NPM Installation][npminstall].

To use the [balenaCLI][cli], you need to login to your {{ $names.company.lower }} account. Login via the terminal using the `balena login` command:

```shell
$ balena login
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \ / _` || | / __ \| '_ \  / _` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \__,_||_| \____/|_| |_| \__,_|


Logging in to balena-cloud.com
? How would you like to login? (Use arrow keys)
❯ Web authorization (recommended)
  Credentials
  Authentication token
  I don't have a balena account!
```

You will be asked how you wish to authenticate. The recommended method is that of _Web authorization_, which will bring up a browser window (and prompt you to first login to {{ $names.company.lower }} if you have not) and ask for confirmation that you wish to authorize the CLI. Click _Authorize_ and head back to your terminal.

<img src="/img/common/cli/web_authorization.png" width="60%">

__Note__ Other authentication methods include using your username and password credentials or obtaining an authentication token from the dashboard. Authentication tokens come in two types, API tokens, and JSON Web Token (JWT) session tokens. While API tokens do not expire, JWT session tokens do after 7 days.

After logging in, test out the balenaCLI by running the `balena apps` command, which should return information about the application you created in the previous step. Take a note of the `APP NAME` as you'll need this in the next step to push the code to all devices in that application.

```shell
$ balena apps
ID    APP NAME   DEVICE TYPE     ONLINE DEVICES DEVICE COUNT
98264 FirstApp   raspberrypi4-64 0              0
```

__Note__ See all the commands available with balenaCLI by running `balena help` 

[cli]:https://www.balena.io/docs/reference/cli/
[releases]:https://github.com/balena-io/balena-cli/releases
[install]:https://github.com/balena-io/balena-cli/blob/master/INSTALL.md
[npminstall]:https://github.com/balena-io/balena-cli/blob/master/INSTALL.md#npm-installation
