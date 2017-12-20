### Accessing the host OS

Starting with CLI release 6.12.0, it is possible to SSH into the host OS rather than the application container. This gives you access to logs and tools for services that operate outside the scope of your application, such as **NetworkManager**, **Docker**, and the supervisor.

__Warning:__ Making changes to running services and network configurations carries the risk of losing access to your device. Before making changes to the host OS of a remote device, it is best to test locally. When in doubt, [reach out][forums] to us for guidance. 

To use this option, add the `--host` or `-s` option to the `resin ssh` command:

```shell
$ resin ssh <device-uuid> -s
```

Host OS access is only available for devices running resinOS versions greater than 2.7.5. Like container SSH access, it requires the VPN to be active and connected.

[forums]:https://forums.resin.io/c/troubleshooting