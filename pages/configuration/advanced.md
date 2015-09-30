# Advanced Boot Configuration Guide

__Warning:__ This page contains details of the more *involved* configuration
options that expose more functionality but potentially enable you to break
things should you configure them incorrectly - tread carefully!

## Raspberry Pi

### config.txt

The Raspberry Pi exposes device configuration options via a text file on the
boot medium, `config.txt` - you change boot options simply by editing this file.

__Note:__ You will only find the `config.txt` file after first boot, it can then easily be found in the `resin-boot` partition of the SD card.

#### Post-Boot

The `config.txt` is located in the root of the `resin-boot` partition.

### GPU Memory

You can configure the amount of memory shared with the GPU by adding entries to
`config.txt` as follows:-

```
gpu_mem=16
gpu_mem_256=64
gpu_mem_512=128
```

Each of these values is specified in megabytes.

Note that `gpu_mem_256` is used by the 256MB Raspberry Pi (Model A - you
probably *don't* have one of these), and `gpu_mem_512` is used by the 512MB
Raspberry Pi (Model B/B+ - this is probably what you have.)

The Model A Raspberry Pi ignores the 512MB setting altogether while the model B
and B+ ignore the 256MB setting. Both `gpu_mem_256` and `gpu_mem_512` override
`gpu_mem`.

By default we assign 16MB of memory to the GPU (specified by `gpu_mem`.) This
may well be less than you require depending on your application (particularly
applications which make heavy use of the Pi's graphics card.)

### Custom Network Configuration

See the [custom network configuration guide][custom-network] for details on
configuring your network if you have specialist networking requirements or want
to be able to connect to a one of multiple WiFi networks.

### Further Reading

There are more details on the options available in `config.txt` over at
[elinux's RPi Config page][elinux].

[custom-network]:/pages/configuration/custom-network.md

[dd]:http://en.wikipedia.org/wiki/Dd
[elinux]:http://elinux.org/RPiconfig
