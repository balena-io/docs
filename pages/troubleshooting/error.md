---
title: Error Notifications
---

# Error Notifications

When we are unable to notify you of problems with your device via the dashboard (e.g. the network is not available) we provide feedback through alternative means.

## Raspberry Pi

On the Raspberry Pi we notify you via the green 'ACT' LED using a distinctive pattern of flashes:

#### Unable to Connect to the Internet
If the Raspberry pi is unable to connect to the resin.io servers, the `ACT` LED will flash a repeated pattern of 4 short flashes followed by a pause (`*_*_*_*____*_*_*_*____`).

This is either because it is not connected to the network or because the network ports which resin.io relies on are blocked in some way.

* The first things to check in this case is that your device is correctly connected to ethernet or that you correctly entered the wifi credentials. To check that the wifi credentials are correct, you can check the `config.json` file on the `resin-conf` partition of the SD card.
* Secondly check that your network is not restricting or blocking the ports specified in the [resin.io network requirements](/deployment/network/#network-requirements).
* If you still aren't able to get your device online, reach out to us at our [community](https://gitter.im/resin-io/chat).

#### Can't Boot the Kernel.img
If the `ACT` LED blinks with the repeated pattern of 7 quick flashes and a pause (`*_*_*_*_*_*_*____*_*_*_*_*_*_*____`), this means that the raspberry pi boot loader is not able to load the correct kernel.img.
* The first thing to check here is that you are using the right OS image for your board type. If you look small white print near the GPIO pins of the Raspberry pi you should see the type of raspberry pi you have. You need to ensure that this is the same as the Application device type that you created on the resin.io dashboard.
* Its important to note that a Raspberry Pi 2 application OS image will not boot on a Rasberry Pi 1 board and vice versa.
* For more in depth info the boot related LED patterns have a look at the [raspberry pi wiki](http://elinux.org/R-Pi_Troubleshooting#Green_LED_blinks_in_a_specific_pattern).

#### Poor Power Supply
If you have a screen attached to your Raspberry Pi and notice that there is a small flashing colourful square in the top right of the screen, it could be the case that your power supply or USB cable is not suitable. Take a look at the [Troubleshooting Power Problems](http://elinux.org/R-Pi_Troubleshooting#Troubleshooting_power_problems) on the Raspberry Pi wiki.
