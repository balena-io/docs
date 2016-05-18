Often while developing and deploying code, it helps to run a few test commands or check some log files. For this resin has a handy built in web terminal which you can use from the comfort of your dashboard, or command line (check the later section on CLI and resin sync for this).

To fire up a terminal session on your device you need to two things:
1. An online device.
2. A running container.
Number `.1` is usually pretty easy, but number `.2` catches people pretty often. Since if the main process of the docker container crashes or ends, the container effectively stops and there is nothing for the web terminal to SSH into `:(` . For this reason we normally recommend using the systemd init system during development as this will ensure your container is always up and running, even if your application code crashes.

<img src="/img/common/webterminal/terminal-{{ $device_details.id }}.png" width="80%">

To start a session, just navigate to the `>_ Terminal` page for the device and hit the "Start the terminal session" button. It will take a few seconds to establish a connection and then you are good to go.

__Note:__ Currently if you navigate away from the `>_ Terminal` page, you session will be killed. This is a known issue and will be remedied very soon.
