To help you debug and develop your applications, we've provided a browser-based terminal and a command line tool for easy SSH access to your devices. With these tools, you have console access to any of your running containers, as well as to the host OS, letting you test out small snippets of code and check system logs on your device. You can also access your device via a standalone SSH client.

__Note:__ Host OS SSH access is available for devices running {{ $names.os.lower }} version 2.7.5 and above.

## Using the dashboard web terminal

To use this feature, navigate to your application and select the device you want to access. You will see a *Terminal* window below the *Logs* window:

![SSH Terminal](/img/common/device/terminal.png)

If your device is online, select a target as either the host OS or a running service, and click the blue *>_ Start Terminal session* button. In order to start a terminal session for a service, you need to ensure that the service container is running. If the container code crashes or ends quickly, it is not possible to attach a console to it.

A terminal session should be initiated for you in a second or two. If you would like a bigger window for the terminal, you can click the *Expand* button in the upper-right corner.

__Note:__ To copy and paste in the terminal window, you cannot use the normal Ctrl + C and Ctrl + V shortcuts. You can either select Copy and Paste from a menu, or use Ctrl + Insert for copy and Shift + Insert for Paste. For MacOS users, ⌘ + C and ⌘ + V work as expected.

## Using `{{ $names.company.short }} ssh` from the CLI

__Note:__ `balena ssh` to application services/containers requires CLI version 11 or above.

If you prefer to work from the command line, you can use [`{{ $names.company.short }} ssh`][balena-ssh] to connect to your application containers and the host OS. First, you will need to install the [{{ $names.company.lower }} Command Line Interface (CLI)](/tools/cli/). Once that is set up, run the following in your development machine's terminal:

```shell
$ {{ $names.company.short }} ssh <device-uuid>
```

`<device-uuid>` is the unique identifier for the device you want to access, which can be found via the dashboard or in the output of the `{{ $names.company.short }} devices` CLI command. By default, SSH access is routed into the host OS shell. However, you can SSH into a service by specifying its name as part of the command:

```shell
$ {{ $names.company.short }} ssh <device-uuid> main
```

This also works in multicontainer applications, simply pass the name of the appropriate service (as defined in docker-compose.yml) instead of `main`.

__Note:__ To run a command in a non-interactive way, you can pipe commands to the CLI's stdin. For example, `echo "uptime; exit;" | balena ssh <device-uuid>`.

When an application name or device UUID is used as above, `{{ $names.company.short }}` ssh uses the {{ $names.company.short }} VPN to create a secure tunnel to the device and then forward SSH traffic between the device and your development machine. For this method, you must have a SSH key configured on your development machine and [added to the {{ $names.cloud.lower }} dashboard][add-ssh-key].

If an IP address or a .local hostname is used (instead of an application name or device UUID), `{{ $names.company.short }}` ssh establishes a direct connection that does not rely on the {{ $names.company.short }} VPN:

```shell
$ balena ssh 192.168.1.23
$ balena ssh <device-uuid>.local
```

This should work without further configuration in the case of devices running a [development {{ $names.os.lower }} image][development-image], which allows passwordless root SSH access (and for this reason, should never be directly exposed to the public internet). In the case of a production {{ $names.os.lower }} image, an SSH key needs to be present in the config.json file of the device. More details about configuring SSH keys in config.json may be found [here][config-json-ssh].

## Add an SSH key to {{ $names.cloud.lower }}

To add an SSH key, go to the _Preferences_ page of {{ $names.cloud.lower }} and select the _SSH Keys_ tab.

![SSH key preferences](/img/common/main_dashboard/eekVBTI.png)

You may either import an existing SSH key from GitHub or manually enter the public SSH key of an existing SSH key on your development machine.

If you do not have an existing key, you can follow [GitHub's documentation][github-ssh], skipping the step about adding the key to your GitHub account, and instead adding the key to your {{ $names.cloud.lower }} account.

Once you have added a key your your account, you should also add an entry for `ssh.balena-devices.com` to your `~/.ssh/config` file so that the `balena ssh` command knows to use this key:

```shell
Host ssh.balena-devices.com
  User <USER>
  IdentityFile ~/.ssh/<PRIVATE_KEY>

```

## Using a standalone SSH client

If you prefer to use a standalone SSH client to connect to the device, the SSH server on a device listens on TCP port `22222`. While development images have passwordless root access enabled, production images require an SSH key to be added to the `config.json` file.

```shell
$ ssh -p 22222 root@<device_ip_address>
```

## {{ $names.company.short }} tunnel

The SSH server of the host OS will always be accessible on TCP port `22222` unless this has been blocked at the network level. To get around this, you can use the `{{ $names.company.short }} tunnel` command of the {{ $names.cli.lower }}, which may be used to map local ports to listening ports on the device. For example, the following command maps the local port `4321` to port `22222` on the device:

```shell
$ balena tunnel <device-uuid> -p 22222:4321
```

The device can then be accessed on port `4321` via the `balena ssh` command of the {{ $names.cli.lower }} or standalone SSH client:

```shell
$ balena ssh 127.0.0.1 -p 4321
```

```shell
$ ssh -p 4321 root@127.0.0.1
```

[balena-ssh]:/reference/cli/#ssh-uuid-
[balena-openssh]:{{ $links.githubPlayground }}/balena-openssh
[github-ssh]:https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
[add-ssh-key]:/learn/manage/ssh-access/#add-an-ssh-key-to-balenacloud
[config-json-ssh]:/reference/OS/configuration/#sshkeys
[development-image]:/reference/OS/overview/2.x/#dev-vs-prod-images
