To help you debug and develop your application in a resin.io container, we've provided a browser based terminal and a command line tool called [`resin ssh`](/tools/cli/#ssh-60-uuid-62-). This gives you console access to your running [container][container-link] on the device and allows you to test out small snippets of code or check some system logs on your device.

In order for you to start a terminal session for your device [container][container-link], you first need to ensure that your device is online and that it has a running application container. If your container code crashes or ends quickly, it is not possible to attach a console to it. One option to keep your containers running is to enable the `INITSYSTEM` in your container. This can easily be done by creating a device environment variable called `INITSYSTEM` and setting its value to `on`.

### Using the dashboard web terminal

To use this feature, navigate to your application and select the device you want to access. You will see a *Terminal* window below the *Logs* window:

<img src="/img/common/device/terminal.png" width="60%">

If your device is online and has a running container, then simply click the blue *>_ Start Terminal session* button and a terminal session should be initiated for you in a second or two. If you would like a bigger window for the terminal, you can click the *Expand* button in the upper-right corner.

### Using `resin ssh` from the CLI

If you prefer to work from the command line, you can use [`resin ssh`](/tools/cli/#ssh-60-uuid-62-) to connect to your running application container. First, you will need to install the [resin Command Line Interface (CLI)](/tools/cli/). Once that is set up, run the following in your development machine's terminal:

```shell
$ resin ssh <device-uuid>
```

`<device-uuid>` is the unique identifier for the device you want to access, which can be found on the dashboard.

`resin ssh` makes use of the resin VPN connection to access a device. This allows you to access and test devices wherever they are. If you want to SSH only on the internal network, you can simply install an SSH server in your container as in this example:

{{> icon class="octicon octicon-mark-github" }} [**resin-openssh**](https://github.com/resin-io-projects/resin-openssh).

One note is that if you run your own SSH in the container you won't automatically get your environment variables in the ssh session. To bring them in, simply run `. <(xargs -0 bash -c 'printf \"export %q\n\" \"\$@\"' -- < /proc/1/environ)`. Now any operations or code you run from the SSH session will be able to access the environment variables you set on your resin.io dashboard ([see gitter discussion for more info](https://gitter.im/resin-io/chat?at=57be336fce157d1b57a19e82)). Alternatively, use the following command in a Dockerfile to update the root's `.profile` so resin variables are sourced at each tty/ssh login:
```
echo ". <(xargs -0 bash -c 'printf \"export %q\n\" \"\$@\"' -- < /proc/1/environ)" >> /root/.profile
```
