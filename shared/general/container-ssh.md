To help you debug, develop, and work with your fleets, we've provided a browser-based terminal and a command line tool for easy SSH access to your devices. With these tools, you have console access to any of your running containers, as well as to the host OS, letting you test out small snippets of code and check system logs on your device. You can also access your device via a standalone SSH client.

__Note:__ Host OS SSH access is available for devices running {{ $names.os.lower }} version 2.7.5 and above.

SSH access is built on [Cloudlink](/learn/welcome/security/#cloudlink) and it not designed for high availability. It is not intended for use in the critical path of your application - you should not depend on it for continuous use as part of your own application.

## Using the dashboard web terminal

To use this feature, navigate to your fleet and select the device you want to access. You will see a *Terminal* window below the *Logs* window:

![SSH Terminal](/img/common/device/terminal.webp)

If your device is online, select a target as either the host OS or a running service, and click the blue *>_ Start Terminal session* button. In order to start a terminal session for a service, you need to ensure that the service container is running. If the container code crashes or ends quickly, it is not possible to attach a console to it.

A terminal session should be initiated for you in a second or two. If you would like a bigger window for the terminal, you can click the *Expand* button in the upper-right corner.

__Note:__ To copy and paste in the terminal window, you cannot use the normal Ctrl + C and Ctrl + V shortcuts. You can either select Copy and Paste from a menu, or use Ctrl + Insert for copy and Shift + Insert for Paste. For MacOS users, ⌘ + C and ⌘ + V work as expected.

## Using `{{ $names.company.short }} device ssh` from the CLI

To use the CLI, first [install it][cli-install] and [add an SSH key to {{ $names.cloud.lower }}][add-ssh-key]. Then run the following command on your development machine's terminal:

```shell
$ {{ $names.company.short }} device ssh <device-uuid>
```

`<device-uuid>` is the unique identifier for the device you want to access, which can be found via the dashboard or in the output of the `{{ $names.company.short }} device list` CLI command. By default, SSH access is routed into the host OS shell. However, you can SSH into a service by specifying its name as part of the command:

```shell
$ {{ $names.company.short }} device ssh <device-uuid> main
```

This also works in multicontainer fleets; simply pass the name of the appropriate service (as defined in docker-compose.yml) instead of `main`.

__Note:__ To run a command in a non-interactive way, you can pipe commands to the CLI's stdin. For example, `echo "uptime; exit;" | balena device ssh <device-uuid>`.

When a fleet name or device UUID is used as above, `{{ $names.company.short }}` ssh uses Cloudlink to create a secure tunnel to the device and then forward SSH traffic between the device and your development machine.

If an IP address or a .local hostname is used (instead of a fleet name or device UUID), `{{ $names.company.short }}` ssh establishes a direct connection that does not rely on Cloudlink:

```shell
$ balena device ssh 192.168.1.23
$ balena device ssh <device-uuid>.local
```

When used with a [production variant of {{ $names.os.lower }}][development-image], this
feature requires balena CLI v13.3.0 or later, and balenaOS v2.44.0 or later. Otherwise, an
SSH key must be added to the device's `config.json` file, [sshKeys
section][config-json-ssh]. These restrictions do not apply to [development variants of {{
$names.os.lower }}][development-image], which allow unauthenticated `root` access (and for
this reason, should never be directly exposed to the public internet).

## Using a standalone SSH client

The SSH server of a {{ $names.os.lower }} device (host OS) listens on TCP port `22222`, and
access is also possible with a standalone ssh client:

```shell
$ ssh -p 22222 <username>@<device_ip_address>
```

When the username is `root`, [production variants of {{ $names.os.lower }}][development-image]
perform authentication against public SSH keys previously added to the device's `config.json`
file, [sshKeys section][config-json-ssh]. When the username matches a valid
{{$names.cloud.lower}} user account, authentication is also performed against that user's
public SSH keys [stored in {{$names.cloud.lower}}][add-ssh-key]
(this feature requires balenaOS v2.44.0 or later). The username can be found in
the profile or preferences section of the web dashboard, or with the `{{$names.company.short}}
whoami` CLI command.

Development variants of {{ $names.os.lower }} allow unauthenticated access and should never be
directly exposed to the public internet.

The IP address will typically be a private IP address of a local network. For remote devices,
see [{{ $names.company.short }} device tunnel][balena-tunnel].

## {{ $names.company.short }} device tunnel

The SSH server of a {{ $names.os.lower }} device (host OS) listens on TCP port `22222`.
This port is not blocked by any firewall on the device itself, but external firewalls or NAT
routers will often block access at the network level. To get around this, you can use the
`{{$names.company.short }} device tunnel` command of the {{ $names.cli.lower }}, which tunnels a
TCP connection between a localhost port and a port on the device. For example, the following
command maps local port `4321` to remote port `22222` on the device:

```shell
$ balena device tunnel <device-uuid> -p 22222:4321
```

The device can then be accessed on local port `4321` with a standalone SSH client:

```shell
$ ssh -p 4321 <username>@127.0.0.1
```

See note in the [previous section](#using-a-standalone-ssh-client) regarding the username
(`root` _vs._ {{$names.cloud.lower}} user account).

[balena-ssh]:/reference/cli/#ssh-uuid-
[balena-openssh]:{{ $links.githubPlayground }}/balena-openssh
[balena-tunnel]:/learn/manage/ssh-access/#{{ $names.company.short }}-tunnel
[cli-install]:{{ $links.githubCli }}/blob/master/INSTALL.md
[github-ssh]:https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
[add-ssh-key]:/learn/manage/ssh-access/#add-an-ssh-key-to-balenacloud
[config-json-ssh]:/reference/OS/configuration/#sshkeys
[development-image]:/reference/OS/overview/2.x/#development-vs-production-mode

## Add an SSH key to {{ $names.cloud.lower }}

To add an SSH key, go to the _Preferences_ page of {{ $names.cloud.lower }} and select the _SSH Keys_ tab.

![SSH key preferences](/img/common/main_dashboard/eekVBTI.webp)

You may either import an existing SSH key from GitHub or manually enter the public SSH key of an existing SSH key on your development machine.

If you do not have an existing key, you can follow [GitHub's documentation][github-ssh], skipping the step about adding the key to your GitHub account, and instead adding the key to your {{ $names.cloud.lower }} account.
