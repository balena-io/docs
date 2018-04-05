Okay, so now we know how to provision a device and push code. There is just one glaring problem...
>Do I really have to go through the whole `git add`, `git commit`, `git push` dance every time I forget a semicolon?

Luckily, our nifty little command line tool `resin sync` is here to save the day. It allows you to quickly sync source code and file changes across to one of the devices in your fleet, so you can rapidly iterate code on this test device before releasing it to the whole fleet.

__Note:__ Resin sync will only work on {{ $names.os.upper }} v1.1.4+
and Agent v1.8.0+.

#### Setting up resin sync.

Resin sync is bundled in with our handy resin CLI. The CLI allows you to basically do all your {{ $names.company.lower }} management from the comfort of the command line. Read the [CLI reference][cli-ref-link] more info on all the cool things it can do.

__Warning:__ Currently resin sync is **NOT** supported on Windows. Support is currently being worked on, you can check the progress on this on the [git repository][windows-support].

To install resin CLI and sync you need at least [`node.js 4.0.0`][nodejs-link] on your development machine, then run:
```
$ npm install --global --production resin-cli
```
You may need to run the install with admin privileges depending on how you have installed node.js.

__Note:__ If you already have resin CLI installed, you will need to upgrade to resin-cli v4.0.0+

Once the CLI is installed globally, login with your resin account:
```
$ resin login
```
You should then be presented with 3 options to login. The recommended method is `Web authorisation` which will open a dialog in your web browser and ask you to authorise the use of the CLI.
```
resin:simple-server-node shaun$ resin login
______          _         _
| ___ \        (_)       (_)
| |_/ /___  ___ _ _ __    _  ___
|    // _ \/ __| | '_ \  | |/ _ \
| |\ \  __/\__ \ | | | |_| | (_) |
\_| \_\___||___/_|_| |_(_)_|\___/

Logging in to {{ $names.company.lower }}
? How would you like to login? (Use arrow keys)
❯ Web authorisation (recommended)
  Credentials
  Authentication token
  I don't have a Resin account!
```

[cli-ref-link]:/tools/cli/
[windows-support]:{{ $links.githubMain }}-modules/resin-sync/blob/feat/windows-support/README.md#windows
[nodejs-link]:https://nodejs.org/en/