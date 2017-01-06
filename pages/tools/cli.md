# Resin CLI Documentation

This tool allows you to interact with the resin.io api from the comfort of your command line.

To get started download the CLI from npm.

	$ npm install resin-cli -g

Then authenticate yourself:

	$ resin login

Now you have access to all the commands referenced below.

# Table of contents

- Application

	- [app create &#60;name&#62;](#app-create-60-name-62-)
	- [apps](#apps)
	- [app &#60;name&#62;](#app-60-name-62-)
	- [app restart &#60;name&#62;](#app-restart-60-name-62-)
	- [app rm &#60;name&#62;](#app-rm-60-name-62-)

- Authentication

	- [login](#login)
	- [logout](#logout)
	- [signup](#signup)
	- [whoami](#whoami)

- Device

	- [devices](#devices)
	- [device &#60;uuid&#62;](#device-60-uuid-62-)
	- [device register &#60;application&#62;](#device-register-60-application-62-)
	- [device rm &#60;uuid&#62;](#device-rm-60-uuid-62-)
	- [device identify &#60;uuid&#62;](#device-identify-60-uuid-62-)
	- [device reboot &#60;uuid&#62;](#device-reboot-60-uuid-62-)
	- [device rename &#60;uuid&#62; [newName]](#device-rename-60-uuid-62-newname-)
	- [device move &#60;uuid&#62;](#device-move-60-uuid-62-)
	- [device init](#device-init)

- Environment Variables

	- [envs](#envs)
	- [env rm &#60;id&#62;](#env-rm-60-id-62-)
	- [env add &#60;key&#62; [value]](#env-add-60-key-62-value-)
	- [env rename &#60;id&#62; &#60;value&#62;](#env-rename-60-id-62-60-value-62-)

- Help

	- [help [command...]](#help-command-)

- Information

	- [version](#version)

- Keys

	- [keys](#keys)
	- [key &#60;id&#62;](#key-60-id-62-)
	- [key rm &#60;id&#62;](#key-rm-60-id-62-)
	- [key add &#60;name&#62; [path]](#key-add-60-name-62-path-)

- Logs

	- [logs &#60;uuid&#62;](#logs-60-uuid-62-)

- Sync

	- [sync [uuid]](#sync-uuid-)

- SSH

	- [ssh [uuid]](#ssh-uuid-)

- Notes

	- [note &#60;|note&#62;](#note-60-note-62-)

- OS

	- [os download &#60;type&#62;](#os-download-60-type-62-)
	- [os configure &#60;image&#62; &#60;uuid&#62;](#os-configure-60-image-62-60-uuid-62-)
	- [os initialize &#60;image&#62;](#os-initialize-60-image-62-)

- Config

	- [config read](#config-read)
	- [config write &#60;key&#62; &#60;value&#62;](#config-write-60-key-62-60-value-62-)
	- [config inject &#60;file&#62;](#config-inject-60-file-62-)
	- [config reconfigure](#config-reconfigure)
	- [config generate](#config-generate)

- Settings

	- [settings](#settings)

- Wizard

	- [quickstart [name]](#quickstart-name-)

# Application

## app create &#60;name&#62;

Use this command to create a new resin.io application.

You can specify the application type with the `--type` option.
Otherwise, an interactive dropdown will be shown for you to select from.

You can see a list of supported device types with

	$ resin devices supported

Examples:

	$ resin app create MyApp
	$ resin app create MyApp --type raspberry-pi

### Options

#### --type, -t &#60;type&#62;

application type

## apps

Use this command to list all your applications.

Notice this command only shows the most important bits of information for each app.
If you want detailed information, use resin app <name> instead.

Examples:

	$ resin apps

## app &#60;name&#62;

Use this command to show detailed information for a single application.

Examples:

	$ resin app MyApp

## app restart &#60;name&#62;

Use this command to restart all devices that belongs to a certain application.

Examples:

	$ resin app restart MyApp

## app rm &#60;name&#62;

Use this command to remove a resin.io application.

Notice this command asks for confirmation interactively.
You can avoid this by passing the `--yes` boolean option.

Examples:

	$ resin app rm MyApp
	$ resin app rm MyApp --yes

### Options

#### --yes, -y

confirm non interactively

# Authentication

## login

Use this command to login to your resin.io account.

This command will prompt you to login using the following login types:

- Web authorization: open your web browser and prompt you to authorize the CLI
from the dashboard.

- Credentials: using email/password and 2FA.

- Token: using the authentication token from the preferences page.

Examples:

	$ resin login
	$ resin login --web
	$ resin login --token "..."
	$ resin login --credentials
	$ resin login --credentials --email johndoe@gmail.com --password secret

### Options

#### --token, -t &#60;token&#62;

auth token

#### --web, -w

web-based login

#### --credentials, -c

credential-based login

#### --email, --e,u, --e,u &#60;email&#62;

email

#### --password, -p &#60;password&#62;

password

## logout

Use this command to logout from your resin.io account.o

Examples:

	$ resin logout

## signup

Use this command to signup for a resin.io account.

If signup is successful, you'll be logged in to your new user automatically.

Examples:

	$ resin signup
	Email: me@mycompany.com
	Username: johndoe
	Password: ***********

	$ resin whoami
	johndoe

## whoami

Use this command to find out the current logged in username and email address.

Examples:

	$ resin whoami

# Device

## devices

Use this command to list all devices that belong to you.

You can filter the devices by application by using the `--application` option.

Examples:

	$ resin devices
	$ resin devices --application MyApp
	$ resin devices --app MyApp
	$ resin devices -a MyApp

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

## device &#60;uuid&#62;

Use this command to show information about a single device.

Examples:

	$ resin device 7cf02a6

## device register &#60;application&#62;

Use this command to register a device to an application.

Examples:

	$ resin device register MyApp

### Options

#### --uuid, -u &#60;uuid&#62;

custom uuid

## device rm &#60;uuid&#62;

Use this command to remove a device from resin.io.

Notice this command asks for confirmation interactively.
You can avoid this by passing the `--yes` boolean option.

Examples:

	$ resin device rm 7cf02a6
	$ resin device rm 7cf02a6 --yes

### Options

#### --yes, -y

confirm non interactively

## device identify &#60;uuid&#62;

Use this command to identify a device.

In the Raspberry Pi, the ACT led is blinked several times.

Examples:

	$ resin device identify 23c73a1

## device reboot &#60;uuid&#62;

Use this command to remotely reboot a device

Examples:

	$ resin device reboot 23c73a1

## device rename &#60;uuid&#62; [newName]

Use this command to rename a device.

If you omit the name, you'll get asked for it interactively.

Examples:

	$ resin device rename 7cf02a6
	$ resin device rename 7cf02a6 MyPi

## device move &#60;uuid&#62;

Use this command to move a device to another application you own.

If you omit the application, you'll get asked for it interactively.

Examples:

	$ resin device move 7cf02a6
	$ resin device move 7cf02a6 --application MyNewApp

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

## device init

Use this command to download the OS image of a certain application and write it to an SD Card.

Notice this command may ask for confirmation interactively.
You can avoid this by passing the `--yes` boolean option.

Examples:

	$ resin device init
	$ resin device init --application MyApp

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

#### --yes, -y

confirm non interactively

#### --advanced, -v

enable advanced configuration

# Environment Variables

## envs

Use this command to list all environment variables for
a particular application or device.

This command lists all custom environment variables.
If you want to see all environment variables, including private
ones used by resin, use the verbose option.

Example:

	$ resin envs --application MyApp
	$ resin envs --application MyApp --verbose
	$ resin envs --device 7cf02a6

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

#### --device, -d &#60;device&#62;

device uuid

#### --verbose, -v

show private environment variables

## env rm &#60;id&#62;

Use this command to remove an environment variable from an application.

Don't remove resin specific variables, as things might not work as expected.

Notice this command asks for confirmation interactively.
You can avoid this by passing the `--yes` boolean option.

If you want to eliminate a device environment variable, pass the `--device` boolean option.

Examples:

	$ resin env rm 215
	$ resin env rm 215 --yes
	$ resin env rm 215 --device

### Options

#### --yes, -y

confirm non interactively

#### --device, -d

device

## env add &#60;key&#62; [value]

Use this command to add an enviroment variable to an application.

If value is omitted, the tool will attempt to use the variable's value
as defined in your host machine.

Use the `--device` option if you want to assign the environment variable
to a specific device.

If the value is grabbed from the environment, a warning message will be printed.
Use `--quiet` to remove it.

Examples:

	$ resin env add EDITOR vim --application MyApp
	$ resin env add TERM --application MyApp
	$ resin env add EDITOR vim --device 7cf02a6

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

#### --device, -d &#60;device&#62;

device uuid

## env rename &#60;id&#62; &#60;value&#62;

Use this command to rename an enviroment variable from an application.

Pass the `--device` boolean option if you want to rename a device environment variable.

Examples:

	$ resin env rename 376 emacs
	$ resin env rename 376 emacs --device

### Options

#### --device, -d

device

# Help

## help [command...]

Get detailed help for an specific command.

Examples:

	$ resin help apps
	$ resin help os download

### Options

#### --verbose, -v

show additional commands

# Information

## version

Display the Resin CLI version.

# Keys

## keys

Use this command to list all your SSH keys.

Examples:

	$ resin keys

## key &#60;id&#62;

Use this command to show information about a single SSH key.

Examples:

	$ resin key 17

## key rm &#60;id&#62;

Use this command to remove a SSH key from resin.io.

Notice this command asks for confirmation interactively.
You can avoid this by passing the `--yes` boolean option.

Examples:

	$ resin key rm 17
	$ resin key rm 17 --yes

### Options

#### --yes, -y

confirm non interactively

## key add &#60;name&#62; [path]

Use this command to associate a new SSH key with your account.

If `path` is omitted, the command will attempt
to read the SSH key from stdin.

Examples:

	$ resin key add Main ~/.ssh/id_rsa.pub
	$ cat ~/.ssh/id_rsa.pub | resin key add Main

# Logs

## logs &#60;uuid&#62;

Use this command to show logs for a specific device.

By default, the command prints all log messages and exit.

To continuously stream output, and see new logs in real time, use the `--tail` option.

Note that for now you need to provide the whole UUID for this command to work correctly.

This is due to some technical limitations that we plan to address soon.

Examples:

	$ resin logs 23c73a1
	$ resin logs 23c73a1

### Options

#### --tail, -t

continuously stream output

# Sync

## sync [uuid]

WARNING: If you're running Windows, this command only supports `cmd.exe`.

Use this command to sync your local changes to a certain device on the fly.

After every 'resin sync' the updated settings will be saved in
'<source>/.resin-sync.yml' and will be used in later invocations. You can
also change any option by editing '.resin-sync.yml' directly.

Here is an example '.resin-sync.yml' :

	$ cat $PWD/.resin-sync.yml
	uuid: 7cf02a6
	destination: '/usr/src/app'
	before: 'echo Hello'
	after: 'echo Done'
	ignore:
		- .git
		- node_modules/

Command line options have precedence over the ones saved in '.resin-sync.yml'.

If '.gitignore' is found in the source directory then all explicitly listed files will be
excluded from the syncing process. You can choose to change this default behavior with the
'--skip-gitignore' option.

Examples:

	$ resin sync 7cf02a6 --source . --destination /usr/src/app
	$ resin sync 7cf02a6 -s /home/user/myResinProject -d /usr/src/app --before 'echo Hello' --after 'echo Done'
	$ resin sync --ignore lib/
	$ resin sync --verbose false
	$ resin sync

### Options

#### --source, -s &#60;path&#62;

local directory path to synchronize to device

#### --destination, -d &#60;path&#62;

destination path on device

#### --ignore, -i &#60;paths&#62;

comma delimited paths to ignore when syncing

#### --skip-gitignore

do not parse excluded/included files from .gitignore

#### --before, -b &#60;command&#62;

execute a command before syncing

#### --after, -a &#60;command&#62;

execute a command after syncing

#### --port, -t &#60;port&#62;

ssh port

#### --progress, -p

show progress

#### --verbose, -v

increase verbosity

# SSH

## ssh [uuid]

WARNING: If you're running Windows, this command only supports `cmd.exe`.

Use this command to get a shell into the running application container of
your device.

Examples:

	$ resin ssh MyApp
	$ resin ssh 7cf02a6
	$ resin ssh 7cf02a6 --port 8080
	$ resin ssh 7cf02a6 -v

### Options

#### --port, -p &#60;port&#62;

ssh gateway port

#### --verbose, -v

increase verbosity

# Notes

## note &#60;|note&#62;

Use this command to set or update a device note.

If note command isn't passed, the tool attempts to read from `stdin`.

To view the notes, use $ resin device <uuid>.

Examples:

	$ resin note "My useful note" --device 7cf02a6
	$ cat note.txt | resin note --device 7cf02a6

### Options

#### --device, --d,dev, --d,dev &#60;device&#62;

device uuid

# OS

## os download &#60;type&#62;

Use this command to download an unconfigured os image for a certain device type.

Examples:

	$ resin os download parallella -o ../foo/bar/parallella.img

### Options

#### --output, -o &#60;output&#62;

output path

## os configure &#60;image&#62; &#60;uuid&#62;

Use this command to configure a previously download operating system image with a device.

Examples:

	$ resin os configure ../path/rpi.img 7cf02a6

### Options

#### --advanced, -v

show advanced commands

## os initialize &#60;image&#62;

Use this command to initialize a previously configured operating system image.

Examples:

	$ resin os initialize ../path/rpi.img --type 'raspberry-pi'

### Options

#### --yes, -y

confirm non interactively

#### --type, -t &#60;type&#62;

device type

#### --drive, -d &#60;drive&#62;

drive

# Config

## config read

Use this command to read the config.json file from the mounted filesystem (e.g. SD card) of a provisioned device"

Examples:

	$ resin config read --type raspberry-pi
	$ resin config read --type raspberry-pi --drive /dev/disk2

### Options

#### --type, -t &#60;type&#62;

device type

#### --drive, -d &#60;drive&#62;

drive

## config write &#60;key&#62; &#60;value&#62;

Use this command to write the config.json file to the mounted filesystem (e.g. SD card) of a provisioned device

Examples:

	$ resin config write --type raspberry-pi username johndoe
	$ resin config write --type raspberry-pi --drive /dev/disk2 username johndoe
	$ resin config write --type raspberry-pi files.network/settings "..."

### Options

#### --type, -t &#60;type&#62;

device type

#### --drive, -d &#60;drive&#62;

drive

## config inject &#60;file&#62;

Use this command to inject a config.json file to the mounted filesystem (e.g. SD card) of a provisioned device"

Examples:

	$ resin config inject my/config.json --type raspberry-pi
	$ resin config inject my/config.json --type raspberry-pi --drive /dev/disk2

### Options

#### --type, -t &#60;type&#62;

device type

#### --drive, -d &#60;drive&#62;

drive

## config reconfigure

Use this command to reconfigure a provisioned device

Examples:

	$ resin config reconfigure --type raspberry-pi
	$ resin config reconfigure --type raspberry-pi --advanced
	$ resin config reconfigure --type raspberry-pi --drive /dev/disk2

### Options

#### --type, -t &#60;type&#62; (Check available types with _$ resin devices supported_)

device type

#### --drive, -d &#60;drive&#62;

drive

#### --advanced, -v

show advanced commands

## config generate

Use this command to generate a config.json for a device or application

Examples:

	$ resin config generate --device 7cf02a6
	$ resin config generate --device 7cf02a6 --output config.json
	$ resin config generate --app MyApp
	$ resin config generate --app MyApp --output config.json

### Options

#### --application, --a,app, --a,app &#60;application&#62;

application name

#### --device, -d &#60;device&#62;

device uuid

#### --output, -o &#60;output&#62;

output

# Settings

## settings

Use this command to display detected settings

Examples:

	$ resin settings

# Wizard

## quickstart [name]

Use this command to run a friendly wizard to get started with resin.io.

The wizard will guide you through:

	- Create an application.
	- Initialise an SDCard with the resin.io operating system.
	- Associate an existing project directory with your resin.io application.
	- Push your project to your devices.

Examples:

	$ resin quickstart
	$ resin quickstart MyApp

