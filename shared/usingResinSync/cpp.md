Okay, so now we know how to provision a device and push code. There is just one glaring problem...
>Do I really have to go through the whole `git commit`, push, build dance every time I forget a semicolon?

Luckily, our nifty little command line tool `resin sync` is here to save the day. It allows you to quickly sync source code and file changes across to one of the devices in your fleet, so you can rapidly iterate code on this test device before releasing it to the whole fleet.

__Note:__ Resin sync will only work on ResinOS v1.1.4+
and Agent v1.8.0+.

__Warning:__ Resin sync directly copies files from your local machine to the container. It does not run any of the commands in the Docker file. This means that any changes to `.cpp` files will **NOT** take effect as the code is not re-compiled.

#### Setting up resin sync.

Resin sync is bundled in with our handy resin CLI. The CLI allows you to basically do all your resin.io management from the comfort of the command line. Read the [CLI reference][cli-ref-link] more info on all the cool things it can do.

__Warning:__ Currently resin sync is **NOT** supported on Windows. Support is currently being worked on, you can check the progress on this [branch of the repo](https://github.com/resin-io-modules/resin-sync/blob/feat/windows-support/README.md#windows).

To install resin CLI and sync you need at least [`node.js 4.0.0`][nodejs-link] on your development machine, then run:
```
npm install --global --production resin-cli
```
May need to run as the install with admin privileges depending on how you have installed node.js.

__Note:__ If you already have resin CLI installed, you will need to upgrade to resin-cli v4.0.0+

Once the CLI is installed globally, login with your resin account:
```
resin login
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

Logging in to resin.io
? How would you like to login? (Use arrow keys)
❯ Web authorisation (recommended)
  Credentials
  Authentication token
  I don't have a Resin account!
```
You are now ready to start using `resin sync`, so open a terminal in the directory which we were using earlier in guide. Make a trivial change to your source code (**NOT** in `Dockerfile`, `package.json` or `requirements.txt`). Then run:
```
resin sync
```
It should automatically connect to your device and sync all the files in the root of your directory to `/usr/src/app` on your device and then restart the container.
You should something similar to:
```
resin:simple-server-node shaun$ resin sync
Connecting with: 5dc2c87ea2caf79bc4e25ae638c6d5a35a75cecf22e8f914331dcb2f588f4b
Application container stopped.
Synced /usr/src/app on 5dc2c87.
Application container started.

resin sync completed successfully!
```
Your new code changes should be up an running in under 30 seconds, **Great success!!**

##### Some Notes and Caveats on Resin Sync

* It is not possible(~easy) to install dependencies using resin sync. So if you need to do an `apt-get` or add something to either your `Dockerfile`, `package.json` or `requirements.txt`, then you will need to go through the standard `git push resin master` build pipeline.

* Resin sync will try its best to infer which device you want to sync with, but if you have more than one Application you need to specify the app name, e.g.: `resin sync myApp` and then sync will let you interactively select the device you want to sync if there are more than one in the app. Alternatively, if you know the device UUID you can just run: `resin sync <uuid>`, this is useful for using resin sync programmatically, in say a [gulp][gulp-link] workflow.

* A caveat, if you are using a DSA key, some newer openSSH clients do not allow them by default. So you may have to add the following option to `~/.ssh/config` : `PubkeyAcceptedKeyTypes=+ssh-dss`

* Currently resin sync only works with RSA/DSA keys. So if you are using another type, it won't be able to sync correctly.

##### One last Tip!

{{import "resinSsh"}}

[cli-ref-link]:/tools/cli/
[nodejs-link]:https://nodejs.org/en/
[gulp-link]:http://gulpjs.com/
