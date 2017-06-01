---
title: Supported Devices
---

# Supported Devices

## Currently Supported

Currently we support over 22 single board computers (as well as some of their variants) and are capable of supporting customer boards for customers if requested. The boards are split into 3 different support tiers. The 1st level are the boards with the best support and we try to guarantee that all the hardware peripherals and drivers are working. These boards should work flawlessly like the would with Debian OS or the operating system the board ships with. For the 2nd tier boards, most of the hardware peripherals should work, but we can't guarantee complete compatibility and you may find a few things that don't work.

For the 3rd tier boards, we only guarantee that the machines boot and basic functionality is available. If you find any issues with hardware compatibility with tier 2 or 3 please report the issue on github.com/resin-os/resinos and we will try provide support.

If you think there is a popular or interesting widely available board that you think we should add support for, please create a GitHub issue in the
[resin-os-device-support](https://github.com/resin-os/resin-os-device-support) repository and we will see what we can do.

| Device                      | Tutorial      | ResinOS Yocto Repo                                     | Machine/Base Images Name  | Support Tier |
|-----------------------------|--------------------|--------------------------------------------------|---------------|---------------|
| [Raspberry Pi 3 Model B][rpi3]      | [Get Started][gs-rpi3]       | https://github.com/resin-os/resin-raspberrypi    | raspberrypi3  |   1st         |
| [Raspberry Pi 2 Model B][rpi2]      | [Get Started][gs-rpi2]       | https://github.com/resin-os/resin-raspberrypi    | raspberry-pi2 |   1st         |
| [Raspberry Pi 1 Model B+/A+][rpi1]       | [Get Started][gs-rpi1]       | https://github.com/resin-os/resin-raspberrypi    | raspberry-pi1 |   1st         |
| [Raspberry Pi ZERO][rpi0]           | [Get Started][gs-rpi1]       | https://github.com/resin-os/resin-raspberrypi    | raspberry-pi1 |   1st         |
| [Beaglebone Black][bbb]            | [Get Started][gs-bbb]        | https://github.com/resin-os/resin-beaglebone     | beaglebone    |   1st         |
| [Beaglebone Green][bbg]            | [Get Started][gs-bbb]        | https://github.com/resin-os/resin-beaglebone     | beaglebone-green      |   1st         |
| [Beaglebone Green Wireless][bbgw]   | [Get Started][gs-bbb]       | https://github.com/resin-os/resin-beaglebone     | beaglebone-green-wifi |   1st         |
| [Samsung Artik 5][artik5]             | [Get Started][gs-artik5]     | https://github.com/resin-os/resin-artik          | artik5        |   1st         |
| [Samsung Artik 10][artik10]            | [Get Started][gs-artik10]    | https://github.com/resin-os/resin-artik          | artik10       |   1st         |
| [Samsung Artik 710][artik710]           | [Get Started][gs-artik710]   | https://github.com/resin-os/resin-artik710       | artik710      |  1st  |
| [Intel NUC][nuc]                   | [Get Started][gs-nuc]        | https://github.com/resin-os/resin-intel | nuc | 1st |
| [Intel Edison][edison] | [Get Started][gs-edison] | https://github.com/resin-os/resin-edison | edison | 1st |
| [Technologic TS-4900][ts4900] | [Get Started][gs-ts4900] | https://github.com/resin-os/resin-ts | ts7700 | 1st |
| [Odroid C1/C1+][odroidc1]               | [Get Started][gs-odroidc1]   | https://github.com/resin-os/resin-odroid         | odroid-c1     |   2nd         |
| [Odroid XU4][odroidxu4]                  | [Get Started][gs-odroidxu4]  | https://github.com/resin-os/resin-odroid         | odroid-ux3    |   2nd         |
| [SolidRun HummingBoard-base][humming]  | [Get Started][gs-humming]    | https://github.com/resin-os/resin-fsl-arm        | cubox-i       |   2nd         |
| [Boundary Devices Nitrogen6X][nitro6x] | [Get Started][gs-nitro6x]    | https://github.com/resin-os/resin-fsl-arm        | nitrogen6x    |   2nd         |
| [Parallella Board][parallella]          | [Get Started][gs-parallella] | https://github.com/resin-os/resin-parallella | parallella-hdmi-resin | 3rd   |
| [NXP/Freescale i.MX6 Sabre Lite][sabre] | [Get Started][gs-nitro6x]    | https://github.com/resin-os/resin-fsl-arm        | nitrogen6x    |   2nd         |
| [VIA VAB-820][vab820] | [Get Started][gs-vab820] | https://github.com/resin-os/resin-via-arm | vab820-quad | 3rd |
| [Toradex Colibri iMX6DL][colibri] | [Get Started][gs-colibri]  | https://github.com/resin-os/resin-toradex | colibri-imx6 | 3rd |
| [Zynq ZC702 from Xilinx][zynq] | [Get Started][gs-zynq] | https://github.com/resin-os/resin-zc702 | zc702-zynq7 | 3rd |


<!-- Links -->
[rpi3]:https://www.raspberrypi.org/products/raspberry-pi-3-model-b/
[rpi2]:https://www.raspberrypi.org/products/raspberry-pi-2-model-b/
[rpi1]:https://www.raspberrypi.org/products/model-a-plus/
[rpi0]:https://www.raspberrypi.org/products/pi-zero/
[bbb]:http://beagleboard.org/black
[bbg]:http://beagleboard.org/green
[bbgw]:http://beagleboard.org/green-wireless
[artik5]:https://www.artik.io/modules/overview/artik-5/
[artik710]:https://www.artik.io/modules/artik-710/
[artik10]:https://www.artik.io/modules/overview/artik-10/
[nuc]:http://www.intel.co.uk/content/www/uk/en/nuc/overview.html
[edison]:https://software.intel.com/en-us/iot/hardware/edison
[odroidc1]:http://www.hardkernel.com/main/products/prdt_info.php?g_code=G141578608433
[odroidxu4]:http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143452239825
[humming]:https://www.solid-run.com/product/hummingboard-carrier-base/   
[nitro6x]:https://boundarydevices.com/product/nitrogen6x-board-imx6-arm-cortex-a9-sbc/
[sabre]:http://boundarydevices.com/product/sabre-lite-imx6-sbc/
[parallella]:https://www.parallella.org/board/
[vab820]:http://www.viatech.com/en/boards/pico-itx/vab-820/
[colibri]:https://www.toradex.com/computer-on-modules/colibri-arm-family/nxp-freescale-imx6
[ts4900]:https://www.embeddedarm.com/products/TS-4900
[zynq]:http://www.xilinx.com/products/boards-and-kits/ek-z7-zc702-g.html


[gs-rpi3]:https://docs.resin.io/raspberrypi3/nodejs/getting-started/
[gs-rpi2]:https://docs.resin.io/raspberrypi2/nodejs/getting-started/
[gs-rpi1]:https://docs.resin.io/raspberrypi/nodejs/getting-started/
[gs-bbb]:https://docs.resin.io/beaglebone/nodejs/getting-started/
[gs-artik5]:https://docs.resin.io/artik5/nodejs/getting-started/
[gs-artik710]:https://docs.resin.io/artik710/nodejs/getting-started/
[gs-artik10]:https://docs.resin.io/artik10/nodejs/getting-started/
[gs-nuc]:https://docs.resin.io/installing/gettingStarted-NUC
[gs-edison]:https://docs.resin.io/installing/gettingStarted-Edison
[gs-odroidc1]:https://docs.resin.io/installing/gettingStarted-Odroid-C1
[gs-odroidxu4]:https://docs.resin.io/installing/gettingStarted-Odroid-XU4
[gs-humming]:https://docs.resin.io/installing/gettingStarted-Humming
[gs-nitro6x]:https://docs.resin.io/installing/gettingStarted-Nitrogen6x
[gs-parallella]:https://docs.resin.io/installing/gettingStarted-Parallella
[gs-vab820]:https://docs.resin.io/installing/gettingStarted-VIA-VAB820
[gs-colibri]:https://docs.resin.io/raspberrypi3/nodejs/getting-started/
[gs-ts4900]:https://docs.resin.io/raspberrypi3/nodejs/getting-started/
[gs-zynq]:https://docs.resin.io/installing/gettingStarted-Zynq-ZC702

<!-- ### The Full Raspberry Pi family (Raspberry Pi 1, 2 and 3)

### Technologic TS-7700

[link](https://www.embeddedarm.com/products/TS-7700)

![Technologic TS-7700](/img/ts-7700.jpg)
-->
