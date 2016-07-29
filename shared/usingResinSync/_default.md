#### Using resin sync

You are now ready to start using `resin sync`, so open a terminal in the directory which we were using earlier in guide. Make a trivial change to your source code and then run:
```
$ resin sync
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

* Resin sync directly syncs all the files in the root of your directory to `/usr/src/app` on your device. If you are using a compiled language you will need to set up cross-compiling on your local development machine and include a `resin-sync.yml` file that tells `resin sync` how to compile your code and sync the resulting executable. 

* It is not possible(~easy) to install dependencies using resin sync. So if you need to do an `apt-get` or add something to either your `Dockerfile`, `package.json` or `requirements.txt`, then you will need to go through the standard `git push resin master` build pipeline.

* Resin sync will try its best to infer which device you want to sync with, but if you have more than one Application you need to specify the app name, e.g.: `resin sync myApp` and then sync will let you interactively select the device you want to sync if there are more than one in the app. Alternatively, if you know the device UUID you can just run: `resin sync <uuid>`, this is useful for using resin sync programmatically, in say a [gulp][gulp-link] workflow.

* A caveat, if you are using a DSA key, some newer openSSH clients do not allow them by default. So you may have to add the following option to `~/.ssh/config` : `PubkeyAcceptedKeyTypes=+ssh-dss`

* Currently resin sync only works with RSA/DSA keys. So if you are using another type, it won't be able to sync correctly.

##### One last Tip!

{{import "resinSsh"}}

[cli-ref-link]:/tools/cli/
[nodejs-link]:https://nodejs.org/en/
[gulp-link]:http://gulpjs.com/
