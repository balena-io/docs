One of the many useful features of [resin-cli][resin-cli-link] is `{{ $names.company.lower }} ssh`, this command allows you to quickly SSH into a device's running container and run test commands or pull out some logs.

Provided you are already logged in on the CLI and you have a device online, you can use `resin ssh <uuid>` to access the container. Here is an example:
```shell
resin:simple-server-node shaun$ resin ssh 5dc2c87
Connecting with: 5dc2c87
root@{{ $device.id }}-5dc2c8:/# uname -a
Linux {{ $device.name }}-5dc2c8 3.10.93 #1 SMP PREEMPT Wed Apr 20 10:25:12 CEST 2016 {{ $device.arch }} GNU/Linux
```

[resin-cli-link]:/tools/cli/
