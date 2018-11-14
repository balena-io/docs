To help you debug and develop your applications, we've provided a browser based terminal and a command line tool for easy SSH access to your devices. With these tools, you have console access to any of your running containers, as well as to the host OS, letting you test out small snippets of code and check system logs on your device.

__Note:__ Host OS SSH access is available for devices running {{ $names.os.lower }} version 2.7.5 and above.

## Using the dashboard web terminal

To use this feature, navigate to your application and select the device you want to access. You will see a *Terminal* window below the *Logs* window:

<img src="/img/common/device/terminal.png" width="60%">

In order to start a terminal session for a service, you first need to ensure that your device is online and that the service container is running. If the container code crashes or ends quickly, it is not possible to attach a console to it. Check out our [Dockerfile][dockerfile-init] and [Docker Compose][compose-init] guides for more information on keeping your containers running.

If your device is online, select a target and click the blue *>_ Start Terminal session* button. A terminal session should be initiated for you in a second or two. If you would like a bigger window for the terminal, you can click the *Expand* button in the upper-right corner.

__Note:__ To copy and paste in the terminal window,  you cannot use the normal Ctrl + C and Ctrl + V shortcuts. You can either select Copy and Paste from a menu, or use Ctrl + Insert for copy and Shift + Insert for Paste. For MacOS users, ⌘ + C and ⌘ + V work as expected.

## Using `{{ $names.company.short }} ssh` from the CLI

If you prefer to work from the command line, you can use [`{{ $names.company.short }} ssh`][balena-ssh] to connect to your application containers and the host OS. First, you will need to install the [{{ $names.company.lower }} Command Line Interface (CLI)](/tools/cli/). Once that is set up, run the following in your development machine's terminal:

```shell
$ {{ $names.company.short }} ssh <device-uuid>
```

`<device-uuid>` is the unique identifier for the device you want to access, which can be found on the dashboard.

To access the host OS, add the `--host` or `-s` option:

```shell
$ {{ $names.company.short }} ssh <device-uuid> -s
```

__Note:__ Host OS access via the CLI requires CLI version 6.12.0 or above


`{{ $names.company.short }} ssh` makes use of the {{ $names.company.short }} VPN connection to access a device. This allows you to access and test devices wherever they are. If you want to SSH only on the internal network, you can install an SSH server in your container, as we show in the [balena-openssh][balena-openssh] project.

One note is that if you run your own SSH in the container you won't automatically get your environment variables in the SSH session. To bring them in, simply run `. <(xargs -0 bash -c 'printf \"export %q\n\" \"\$@\"' -- < /proc/1/environ)`. Now any operations or code you run from the SSH session will be able to access the environment variables you set on your {{ $names.company.lower }} dashboard ([see gitter discussion for more info](https://gitter.im/resin-io/chat?at=57be336fce157d1b57a19e82)). Alternatively, use the following command in a Dockerfile to update the root's `.profile` so {{ $names.company.short }} variables are sourced at each tty/ssh login:
```
echo ". <(xargs -0 bash -c 'printf \"export %q\n\" \"\$@\"' -- < /proc/1/environ)" >> /root/.profile
```

[dockerfile-init]:/learn/develop/dockerfile/#init-system
[compose-init]:/learn/develop/multicontainer/#balena-settings
[balena-ssh]:/reference/cli/#ssh-uuid-
[balena-openssh]:{{ $links.githubProjects }}/balena-openssh