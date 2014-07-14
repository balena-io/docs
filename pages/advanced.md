# Advanced Configuration Guide

This page contains details of the more *involved* configuration options that
expose more functionality but potentially enable you to break things should you
configure them incorrectly - tread carefully :)

## config.txt

The Raspberry Pi differs from many devices in that it provides device
configuration via a text file. This means you can change the configuration of
various boot options by editing the file, `config.txt`, whose location varies
depending on whether you have booted your pi using your SD card yet:-

### Pre-Boot

The `config.txt` file is located in the root of the image zip file (and thus
your SD card after unzipping there.)

Note we update this file quite a bit during the first boot, however any changes
you make will be retained.

### Post-Boot

The `config.txt` is located in the root of the `BOOT` partition.

## GPU Memory

You can configure the amount of memory shared with the GPU by adding entries as
follows:-

```
gpu_mem=16
gpu_mem_256=64
gpu_mem_512=128
```

Each of these values is specified in megabytes.

Note that `gpu_mem_256` is used by the 256mb Raspberry Pi (Model A - you
probably *don't* have one of these), and `gpu_mem_512` is used by the 512mb
Raspberry Pi (Model B - this is probably what you have.)

The Model A Raspberry Pi ignores the 512mb setting altogether, and the Model B
Raspberry Pi ignores the 256mb setting altogether. Both `gpu_mem_256` and
`gpu_mem_512` override `gpu_mem` - which Resin.io defaults to 16mb which may
well be less than you require depending on your application.

## Further Reading

There are more details on the options available in this file over at
[elinux's RPi Config page][elinux].

[dd]:http://en.wikipedia.org/wiki/Dd
[elinux]:http://elinux.org/RPiconfig
