### Accessing the host OS

For devices running resinOS versions 2.7.5 and above, it is possible to SSH into the host OS as well as the application container. This gives you access to logs and tools for services that operate outside the scope of your application, such as **NetworkManager**, **Docker**, the VPN, and the supervisor. Like container SSH access, it requires the VPN to be active and connected.

__Warning:__ Making changes to running services and network configurations carries the risk of losing access to your device. Before making changes to the host OS of a remote device, it is best to test locally. Changes made to the host OS will not be maintained when the OS is updated, and some changes could break the updating process. When in doubt, [reach out][forums] to us for guidance. 

Host OS SSH access is available via the dashboard. To start a session, click *Select a target* in the *Terminal* window, and then select *Host OS*:

<img src="/img/common/device/host_terminal.png" width="60%">

To use this option in the CLI, add the `--host` or `-s` option to the `resin ssh` command:

```shell
$ resin ssh <device-uuid> -s
```

Host OS access via the CLI requires version 6.12.0 or above. 

[forums]:https://forums.resin.io/c/troubleshooting