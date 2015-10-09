# Using the Web Terminal

__Note:__ Don't use this feature for production applications as it introduces security vulnerabilities. Use only for development versions of your applications and ensure you close the terminal session when you are done.

## Establishing a Terminal Session

Resin.io uses [tty.js][tty.js] to give you direct access to your devices. A button will appear giving you access to this interface once your device is **online** and code is **pushed to it** (if the button is not visible beneath the logging window, ensure that both of these conditions are met):-

![Terminal Session Button](/img/terminal-button.png)

Once a terminal session is established you'll be presented with an area in which the terminal session will be shown and a button to open the terminal:-

![Terminal](/img/terminal.png)

![Terminal Window](/img/terminal-window.png)

__Note:__ Often the button will be unresponsive to your first click, you will need to wait for the page to completely finish loading and then try click the `open` button again.

## Using the Terminal

The terminal session is hosted inside your application's [container][docker-container] where you are granted root privileges. By default your working directory will be the root directory of the filesystem.

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file. The recommended file path for your code is `/usr/src/app`.

To **copy** or **paste** in the web terminal you will need to use the `right click + paste` method since the shortcut keys of `ctrl+c` or `ctrl+v` do not work.

### Node Applications

If you're running  node application (i.e. an application that has no `Dockerfile` but rather a `package.json`), all your code will be automatically placed in `/app`, which is symlinked to `/usr/src/app`.

## Troubleshooting

### The 'Start the Terminal Session' Button Doesn't Appear

Ensure you application is online and code is deployed. If either of these criteria are not fulfilled then the button will not appear.

### Clicking 'Open Terminal' in the Session Does Nothing

If no window appears, wait a while or refresh, as sometimes the connection can take a while to be established.

If a terminal window flashes up then disappears, this is usually due to your application exiting before the terminal session is established. Ensure your application continues running long enough after being started to enable a terminal session to be connected.

If you are using one of the newer systemd base images such as [`resin/raspberrypi-python`][systemd-base-image-link], then you can enable `systemd` from your docker file using `ENV INITSYSTEM on` and this will keep your container process open even when your code fails, so you can use the web terminal to go in and test things.

### Terminal Closes On Update

When you push updates, the terminal session is automatically closed. To restart the terminal session, simply close the terminal session and restart it once the update is complete.

[tty.js]:https://github.com/chjj/tty.js/
[docker-container]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
[systemd-base-image-link]:https://hub.docker.com/r/resin/raspberrypi-python/
