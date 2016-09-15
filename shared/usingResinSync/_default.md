#### Using resin sync

You are now ready to start using `resin sync`, so open a terminal in the directory which we were using earlier in this guide. Make a trivial change to your source code and then run:
```
$ resin sync --source . --destination /usr/src/app
```
It should prompt you to select a device, then it will sync all the files in the root of your directory to `/usr/src/app` on your selected device and finally it will restart the container.
You should see something similar to:
```
resin:simple-server-node shaun$ resin sync --source . --destination /usr/src/app
Getting information for device: 5dc2c87ea2caf79bc4e25ae638c6d5a35a75cecf22e8f914331dcb2f588f4b
Application container stopped.
Synced /usr/src/app on 5dc2c87.
Application container started.

resin sync completed successfully!
```
Your new code changes should be up an running in under 30 seconds, **Great success!!**

##### Some Notes and Caveats on Resin Sync

* Resin sync directly syncs all the files in the root of your directory to the selected destination directory on your device. If you are using a compiled language you will need to set up cross-compiling on your local development machine and include a `.resin-sync.yml` file that tells `resin sync` how to compile your code and sync the resulting executable.

* It is not possible(~easy) to install dependencies using resin sync. So if you need to do an `apt-get` or add something to either your `Dockerfile`, `package.json` or `requirements.txt`, then you will need to go through the standard `git push resin master` build pipeline.

* If you know the device UUID you can just run: `resin sync <uuid>`. This is useful for using resin sync programmatically, in say a [gulp][gulp-link] workflow, as it does not require interactive action to confirm the destination device.

* If no `--destination / -d` option is set, an interactive dialog will ask you to provide a destination directory. You can skip this by hitting 'enter' and `resin sync` will use the `/usr/src/app` device directory as the default sync destination.

* After every `resin sync` the updated settings are saved in `.resin-sync.yml` in your projects's local directory and will be used in later invocations. You can also change any option by editing '.resin-sync.yml' directly.

* A caveat, if you are using a DSA key, some newer openSSH clients do not allow them by default. So you may have to add the following option to `~/.ssh/config` : `PubkeyAcceptedKeyTypes=+ssh-dss`

* Currently resin sync works with RSA/DSA/ECDSA keys. So if you are using an ED25519 key, it won't be able to sync correctly.

* Resin sync is currently permitted to device owners only. The owner of a device is the user who provisioned it, so you will not be able to use resin sync on devices of shared applications that you did not provision.

##### One last Tip!

{{import "resinSsh"}}

[cli-ref-link]:/tools/cli/
[nodejs-link]:https://nodejs.org/en/
[gulp-link]:http://gulpjs.com/
