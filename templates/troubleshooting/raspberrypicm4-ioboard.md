### balenaOS boot issues with Rev 1.1 of Raspberry Pi Compute Module 4 hardware

Balena supports the use of the Raspberry Pi Compute Module 4 (CM4) on the Raspberry Pi CM4 IO Board. In April 2022, [Raspberry Pi](https://www.raspberrypi.com/) released [hardware Rev 1.1](https://forums.raspberrypi.com/viewtopic.php?t=337023) of the CM4. This revision of the module requires [balenaOS](https://balena.io/os) v2.91.1 or later. Earlier versions of balenaOS will not boot.

To determine if you have hardware Rev 1.1 of the CM4, follow either of the steps below:

1. If your CM4 has a Dialog DA9090 power management controller (see image below), then your CM4 is Rev 1.1 or later.

<img src="/img/troubleshooting/CM4_DA9090_identified_800.webp" width="50%">

2. Run the following command in Raspberry Pi OS (release date April 4th 2022 or later): The output should confirm the hardware revision.

```
$ cat /proc/cpuinfo | grep Model 
Raspberry Pi Compute Module 4 Rev 1.1
```

For more information about the CM4 Rev 1.1, please refer to the "CM4 Revision 5 PCN" in the [Product Information Portal](https://pip.raspberrypi.com/) by Raspberry Pi.