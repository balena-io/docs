## Troubleshooting with host OS access

__Warning:__ Making changes to running services and network configurations carries the risk of losing access to your device. Before making changes to the host OS of a remote device, it is best to test locally. Changes made to the host OS will not be maintained when the OS is updated, and some changes could break the updating process. When in doubt, [reach out][forums] to us for guidance.

Host OS SSH access gives you a handful of tools that can help you gather more information about potential issues on your device. Here are some tips for troubleshooting common issues:

### Check logs

#### journalctl

Information from a variety of services can be found using the **journalctl** utility. As the number of **journalctl** messages can be quite large, it is good to know how to narrow your search.

To find messages from a specific service, use the `-u` flag:
```
journalctl -u systemd-timesyncd
```
To return the last *x* messages, use `-fn x`:
```
journalctl -fn 100 -u {{ $names.company.short }}-supervisor
```

#### dmesg

For displaying messages from the kernel, you can use **dmesg**. Similar to **journalctl**, **dmesg** may have an unmanageable output without some additional commands:
```
dmesg | tail -n 100
```

### Monitor {{ $names.engine.lower }}

{{ $names.os.upper }}, beginning with version 2.9.0, includes the lightweight container engine **[{{ $names.engine.lower }}][engine-link]** to manage **Docker** containers. If you think the supervisor or application container may be having problems, you’ll want to use **balena** for debugging.

This command will show the status of all containers:
```
balena ps -a
```
You can also check the **journalctl** logs for messages related to **balena**:
```
journalctl -fn 100 -u {{ $names.engine.lower }}
```
For devices with {{ $names.os.lower }} versions earlier than 2.9.0, you can replace `balena` in these commands with `docker`.

### Inspect network settings

#### NetworkManager

**NetworkManager** includes a [CLI][nmcli] that can be useful for debugging your ethernet and WiFi connections. The `nmcli` command, on its own, will show all interfaces and the connections they have. `nmcli c` provides a connection summary, showing all known connection files with the connected ones highlighted. `nmcli d` displays all network interfaces (devices).

Another useful place to look for **NetworkManager** information is in the **journalctl** logs:
```
journalctl -fn 100 -u NetworkManager
```

#### ModemManager

Similar to **NetworkManager**, **ModemManager** includes a [CLI][mmcli], `mmcli`, to manage cellular connections. `mmcli -L` provides a list of available modems.

### Look up version information

Knowing what version of a specific service is being run on your device can help you troubleshoot compatibility issues, known bugs, and supported features.

Many services provide a direct option for displaying their version:
```
udevadm --version
systemd --version
openssl version
```

### Understand the file system

In some cases, you may need to examine the contents of certain directories or files directly. One location that is useful for troubleshooting purposes is the `/data` directory, which contains your device's Docker images, [persistent application data][persistent-storage], and host OS update logs. The `/boot` directory includes configuration files, such as [config.txt][config-txt] and [**NetworkManager** connections][network].

Note that the [filesystem layout][filesystem] may look slightly different from what you’d expect—for example the two locations mentioned above are found at `/mnt/data` and `/mnt/boot`, respectively.


[forums]:{{$names.forums_domain}}/c/balena-cloud
[engine-link]:{{ $links.engineSiteUrl }}
[nmcli]:https://fedoraproject.org/wiki/Networking/CLI
[mmcli]:https://www.freedesktop.org/software/ModemManager/man/1.8.0/mmcli.8.html
[persistent-storage]:/learn/develop/runtime/#persistent-storage
[config-txt]:/reference/OS/advanced/#config-txt
[network]:/reference/OS/network/2.x
[filesystem]:/reference/OS/overview/2.x/#stateless-and-read-only-rootfs
