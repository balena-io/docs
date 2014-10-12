# Using the Web Terminal

__NOTE:__ Don't use this feature for production applications as it introduces security vulnerabilities. Use only for development versions of your applications and ensure you close the terminal session when you are done.

## Establishing a Terminal Session

Resin.io uses [tty.js][tty.js] to give you direct access to your devices. A button will appear giving you access to this interface once your device is online and code is pushed to it (if the button is not visible beneath the logging window, ensure that both of these conditions are met):-

![Terminal Session Button](/img/terminal-button.png)

Once a terminal session is established you'll be presented with an area in which the terminal session will be shown and a button to open the terminal:-

![Terminal](/img/terminal.png)

![Terminal Window](/img/terminal-window.png)

## Using the Terminal

The terminal session is hosted inside your application's [container][docker-container] where you are granted root privileges. By default your working directory will be the root directory of the filesystem.

Note that your environment variables will *not* match those of the running process. To determine those environment variables, search running processes for your process, then use the following commands to examine them:-

```
# If a node app
ps aux | grep node
# If a custom Dockerfile
ps aux | grep start

# Prints environment variables (see http://serverfault.com/a/66366.)
cat /proc/<pid>/environ | xargs --null --max-args=1
```

If you're running a custom `Dockerfile` the location of your code will be as specified by you in the file.

### Node Applications

If you're running  node application, all your code will be automatically placed in `/app`.

By default, your environment won't have access to node. To be able to run the node executables add their directory to your `PATH` environment variable:-

```
export PATH=$PATH:/app/vendor/node/bin
```

## Troubleshooting

### The 'Start the Terminal Session' Button Doesn't Appear

Ensure you application is online and code is deployed. If either of these criteria are not fulfilled then the button will not appear.

### Clicking 'Open Terminal' in the Session Does Nothing

If no window appears, wait a while or refresh, as sometimes the connection can take a while to be established.

If a terminal window flashes up then disappears, this is usually due to your application exiting before the terminal session is established. Ensure your application continues running long enough after being started to enable a terminal session to be connected.

[tty.js]:https://github.com/chjj/tty.js/
[docker-container]:https://docs.docker.com/introduction/understanding-docker/#inside-docker
