---
title: USB Interface
---

# USB

## BalenaFin

On certain USB hubs, one can control the power per port. This is usually referred to as per port power switching or PPPS. BalenaFin 1.x uses the LAN9514 USB 2.0 hub + ethernet controller which supports PPPS. The recommended way to implement this is to make use of the [`uhubctl`](https://github.com/mvp/uhubctl) tool.

1. You can add `uhubctl` to your container

```dockerfile
ENV UDEV=on
RUN install_packages uhubctl
```

2. Once you have it installed, you can see the list of USB devices by simply running `uhubctl`

```bash
root@01d925a:/usr/src/app# uhubctl
Current status for hub 1-1 [0424:9514, USB 2.00, 5 ports]
  Port 1: 0503 power highspeed enable connect [0424:ec00]
  Port 2: 0100 power
  Port 3: 0100 power
  Port 4: 0103 power enable connect [0a12:0001]
  Port 5: 0503 power highspeed enable connect [0781:5567]
```

3. You can then turn off a particular port, in this case port 1 as follows -

```
root@01d925a:/usr/src/app# uhubctl -p 1 -a 0
Current status for hub 1-1 [0424:9514, USB 2.00, 5 ports]
  Port 1: 0503 power highspeed enable connect [0424:ec00]
Sent power off request
New status for hub 1-1 [0424:9514, USB 2.00, 5 ports]
  Port 1: 0000 off
```

4. If you run the `uhubctl` command again, you should see that port 1 is now off

```
root@01d925a:/usr/src/app# uhubctl
Current status for hub 1-1 [0424:9514, USB 2.00, 5 ports]
  Port 1: 0000 off
  Port 2: 0100 power
  Port 3: 0100 power
  Port 4: 0103 power enable connect [0a12:0001]
  Port 5: 0503 power highspeed enable connect [0781:5567]
```

## Raspberry Pi Family

`uhubctl` is also [supported](https://github.com/mvp/uhubctl#compatible-usb-hubs) on Raspberry Pi boards. Check the [balenaFin](usb.md#balenafin) section above for instructions on getting started with `uhubctl`
