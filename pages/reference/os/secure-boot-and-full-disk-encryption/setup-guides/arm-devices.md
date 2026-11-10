# ARM Devices

### Introduction

Unlike secure boot on x86, ARM secure boot happens at a lower level that varies significantly from chip to chip without a unified hardware standard. Because of this, enabling Secure Boot on ARM is often irreversible. It requires permanently burning cryptographic keys into the chip’s physical silicon. Balena creates a unique signing key per customer for ARM devices with secure boot, to ensure hardware autonomy. Customers ultimately retain ownership of these keys.

{% hint style="warning" %}
Because of the additional operational management required for ARM Secure Boot, it is only available as a paid add-on feature, available for fleets on our Pilot, Production, and Enterprise tiers billed annually (not monthly). It is not available on Free or Prototype plans.
{% endhint %}

### Supported ARM devices

* **Raspberry Pi CM4 (IO Board)** - Secure Boot and disk encryption for the CM4 uses Raspberry Pi Ltd's [built-in OTP (One-Time Programmable) hardware mechanisms](https://pip.raspberrypi.com/categories/1260-security/documents/RP-003466-WP/Boot-Security-Howto.pdf) rather than relying on an add-on TPM module.
* **Compulab IOT-GATE-iMX8 & iMX8 PLUS -** Instead of a traditional Trusted Platform Module (TPM), this implementation leverages standard NXP High Assurance Boot (HAB) mechanisms and an on-board hardware security element.<br>

Because the device is tied to individual customer keys, these will not be public device types, but rather private device types visible only to each specific customer. Since ARM Secure Boot on balena is still under active development, it is only available as a private trial.

{% hint style="info" %}
To register your interest in ARM Secure Boot and Full Disk Encryption once it is in general release or to inquire about a pre-release trial, fill out [this form](https://e2b56.share.hsforms.com/2oo597r8ZTbexG49qyGTZ8Q).
{% endhint %}

Below are the details of the requirements and implementation steps for each of the secure boot device types.

### Raspberry Pi CM4 (IO Board)

**Requirements:**

* CM4 Secure Boot & Full Disk Encryption (SB & FDE) is only supported on the official Raspberry Pi Compute Module 4 IO Board. SB & FDE may work unofficially on other CM4 carriers, but that is not guaranteed. For guaranteed support of your custom CM4 carrier, please enquire about full "[Custom Device Support](../../customer-board-support.md)"
* The CM4 must have **eMMC** and at least **2GB of RAM**.

**Limitations:**

The Raspberry Pi approach to secure boot places config.txt within a signed image, and thus config.txt is immutable. Because of this, config.txt options (such as setting device tree overlays) cannot be changed after the device type is created. You may provide your own custom config.txt as part of the onboarding process for CM4 ARM Secure Boot.

All the kernel modules need to be signed with a trusted key. Balena signs the modules at build time so only modules that balena builds and ships as a part of balenaOS are properly signed. You can optionally provide us with a public key to be built into the kernel for your private device type, which will allow external kernel modules provided you sign such kernel modules with your private key.

Instructions for implementing CM4 secure boot once you have received access to your private device type:

#### Prepare the host

1. **Get a Mac or Linux computer to use as the host.**&#x54;hese instructions have been tested with MacOS 26.3. They may also work with Raspberry Pi OS on a Raspberry Pi 5 and with Ubuntu on a PC.<br>
2. **Install balena CLI.** Install the latest balena CLI version. See balena [CLI Installation Instructions](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md).<br>
3. **Download OS.** Download the latest balenaOS (must be at least v6.5.44) for the private device type you have been provided with. Uncompress the newly downloaded .zip file.<br>
4. **Configure OS.** Configure balenaOS image using the balena CLI e.g.

```
balena os configure \
  "<your private device type name.img>" \
  --fleet MyOrg/MyFleet \
  --secureBoot \
  --dev \
  --device-type raspberrypicm4-ioboard-sb
```

5. **Install usbboot**:

```
git clone --depth=1 --recurse-submodules --shallow-submodules https://github.com/raspberrypi/usbboot
cd usbboot
make
# MacOS
brew install libusb
# Linux
sudo apt install libusb-1.0-0 libusb-1.0-0-dev
```

6. Prepare EEPROM files

```
cd usbboot/recovery
./update-pieeprom.sh
```

You should see:

```
+ rpi-eeprom-config --config boot.conf --out pieeprom.bin pieeprom.original.bin
+ set +x
new-image: pieeprom.bin
source-image: pieeprom.original.bin
config: boot.conf
```

7. **Get locking files.** Get `secure-boot-lock.tar.gz` from the corresponding balenaOS page e.g. for [balenaOS 6.10.24+rev1](https://dashboard.balena-cloud.com/apps/2137483/releases/3889498/summary). Combine these tarball files with the existing `secure-boot-recovery` folder in usbboot.

```
cd ~/Downloads
tar xvzf secure-boot-lock.tar.gz
cd ~/Downloads/usbboot
cp -r secure-boot-recovery secure-boot-recovery-balenaOS-6.10.24+rev1
cd secure-boot-recovery-balenaOS-6.10.24+rev1
cp ~/Downloads/secure-boot-lock/pieeprom.bin .
cp ~/Downloads/secure-boot-lock/pieeprom.sig .
cp ~/Downloads/secure-boot-lock/config.txt .
# Note that we are NOT copying over the bootcode4.bin from the tarball
```

8. **Install** [**balenaEtcher**](https://etcher.balena.io/).

#### Prepare the device

1. **Connect host to device.** Connect your host computer to the micro-USB port on the CM4 IO Board.
2. **Set jumper on CM4 IO Board.** On the CM4 IO Board, attach a jumper to the pins on the board labeled "Fit jumper to eMMC Boot".
3. **Attach a display.** Attaching a HDMI display to the CM4 IO Board is optional, but can help demystify some steps in the process.

#### Provision the device

1. **Update EEPROM.**

* Power off / unplug the CM4 IO Board.
* Attach USB cable from host to microUSB port on the CM4 IO Board.
* Exit Etcher.
* On CM4 IO Board, attach jumper to the pins on the board labeled "Fit jumper to eMMC Boot".

```
cd ~/Downloads/usbboot/recovery
sudo ../rpiboot -d .
```

* Then power on the CM4 IO Board. You should see:

```
Please fit the EMMC_DISABLE / nRPIBOOT jumper before connecting the power and USB cables to the target device.
If the device fails to connect then please see https://rpltd.co/rpiboot for debugging tips.

Loading: ./bootcode4.bin
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Sending bootcode.bin
Successful read 4 bytes 
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Second stage boot server
Loading: ./config.txt
File read: config.txt
Loading: ./pieeprom.bin
Loading: ./pieeprom.bin
Loading: ./pieeprom.sig
File read: pieeprom.sig
Loading: ./pieeprom.bin
File read: pieeprom.bin
{
	"USER_SERIAL_NUM": "a9dbb16a",
	"MAC_ADDR": "88:a2:9e:7b:0e:4d",
	"EEPROM_UPDATE": "success",
	"EEPROM_HASH": "70e4763b38800587ede99a374572fb9cf35c3ac97ed9b9accbab16ab3957bd2c",
	"CUSTOMER_KEY_HASH": "0000000000000000000000000000000000000000000000000000000000000000",
	"BOOT_ROM": "000048b0",
	"BOARD_ATTR": "00000000",
	"USER_BOARDREV": "b03141",
	"JTAG_LOCKED": "0",
	"ADVANCED_BOOT": "0000e8e8"
}
Second stage boot server done
```

* If you have a display attached to the CM4, you should see the display from black to bright green.
* Once the command completes, power off / unplug the CM4 IO Board.<br>

2. **Flash.** Use balenaEtcher to flash the secure boot installer.

* Use the img file that you configured above e.g. `balena-cloud-CM4-IOBoard-SB-raspberrypicm4-ioboard-sb-6.10.24+rev1-v17.4.2.img`
* Keep the USB cable and jumper attached.
* On Ubuntu, go to the `usbboot` directory and issue command `sudo ./rpiboot -d mass-storage-gadget64`. On a Mac, this step is not necessary.
* Power on The CM4 IO Board.
* In Etcher on a Mac, flash to the `Compute Module` target. In Etcher on Ubuntu, flash to `mmcblk0 Raspberry …` .
* Once provisioning completes, power off / unplug the CM4 IO Board.
* Close Etcher and / or Raspberry Pi Imager. **This is a surprisingly important step.**

3. **Lock.** These locking steps are extracted from PR [manual provisioning instructions](https://github.com/balena-os/balena-raspberrypi/blob/338a05d529bf1fa91e63c52d8d85589f43b3cf74/docs/rpi-secure-boot.md#instructions) — read that if you need more details. Note that once a device is locked, `rpiboot` driven EEPROM updates will no longer work. Only EEPROM self-updates will then be possible. The core steps:

* Keep the USB cable and jumper attached.

```
cd ~/Downloads/usbboot
cd secure-boot-recovery-balenaOS-6.10.24+rev1
sudo ../rpiboot -d .
```

Then power on the CM4 IO Board. You should see:

```
RPIBOOT: build-date 2026/02/27 pkg-version local 101f2d00

Please fit the EMMC_DISABLE / nRPIBOOT jumper before connecting the power and USB cables to the target device.
If the device fails to connect then please see https://rpltd.co/rpiboot for debugging tips.

Loading: ./bootcode4.bin
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Sending bootcode.bin
Successful read 4 bytes 
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Second stage boot server
Loading: ./config.txt
File read: config.txt
Loading: ./pieeprom.bin
Loading: ./pieeprom.bin
Loading: ./pieeprom.sig
File read: pieeprom.sig
Loading: ./pieeprom.bin
File read: pieeprom.bin
{
	"USER_SERIAL_NUM": "f23c7009",
	"MAC_ADDR": "88:a2:9e:28:33:9e",
	"EEPROM_UPDATE": "success",
	"EEPROM_HASH": "97efc5a5edce706e58f96329ea6c75009ddba88dc049199f6b9987d621b6ca27",
	"SECURE_BOOT_PROVISION": "success",
	"CUSTOMER_KEY_HASH": "bcbc1c0181c676b9fbb795ba7ef8889eaee46eea550aa6b7050cb82498fe9c5b",
	"BOOT_ROM": "0000c8b0",
	"BOARD_ATTR": "00000000",
	"USER_BOARDREV": "b03141",
	"JTAG_LOCKED": "1",
	"ADVANCED_BOOT": "0000e8e8"
}
Second stage boot server done
```

* Once the command completes: power down / unplug, remove USB cable & jumper.<br>

4. **Power on the device and let the secure boot installer run.**

* Connect the CM4 IO Board to Ethernet.
* If you have an HDMI monitor attached, you'll see several reboots - this is normal. After about 5 minutes you'll see the balena logo and a minute later you should see the device appear in the balenaCloud dashboard.

5. **Validate.** Using the balenaCloud dashboard’s web terminal, connect to HostOS on the device. Then:

```
# Make sure partitions are encrypted:
source /usr/libexec/os-helpers-fs is_part_encrypted /dev/disk/by-state/resin-data \
  && echo "encrypted" || echo "not encrypted"

# Make sure secure boot is enabled:
source /usr/libexec/os-helpers-sb is_secured && echo "secured" || echo "not secured"
```

#### Troubleshooting

#### If you are unable to flash the secure boot installer onto the CM4's eMMC drive

**Extract and use `pieeprom-latest-stable.bin`and `pieeprom-latest-stable.sig`**

On a Pi OS or Mac host, open the balenaOS .img file and make a copy of `pieeprom-latest-stable.bin` and `pieeprom-latest-stable.sig`. Put them in a folder inside usbboot. We will use this later to update the EEPROM on the CM4.

```
cd ~/Downloads/usbboot
cp -r recovery recovery-balenaOS-6.10.24+rev1
cd recovery-balenaOS-6.10.24+rev1
cp ~/Downloads/pieeprom-latest-stable.bin pieeprom.bin
cp ~/Downloads/pieeprom-latest-stable.sig pieeprom.sig
```

Update the EEPROM:

```
cd ~/Downloads/usbboot
cd recovery-balenaOS-6.10.24+rev1
sudo ../rpiboot -d .
```

Then power on the CM4 IO Board. You should see

```
RPIBOOT: build-date 2026/02/27 pkg-version local 101f2d00

Please fit the EMMC_DISABLE / nRPIBOOT jumper before connecting the power and USB cables to the target device.
If the device fails to connect then please see https://rpltd.co/rpiboot for debugging tips.

Loading: ./bootcode4.bin
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Sending bootcode.bin
Successful read 4 bytes 
Waiting for BCM2835/6/7/2711/2712...

Loading: ./bootcode4.bin
Second stage boot server
Loading: ./config.txt
File read: config.txt
Loading: ./pieeprom.bin
Loading: ./pieeprom.bin
Loading: ./pieeprom.sig
File read: pieeprom.sig
Loading: ./pieeprom.bin
File read: pieeprom.bin
Second stage boot server done
```

Once the command completes, power off / unplug the CM4 IO Board.

#### If you are unable to flash the secure boot installer onto the CM4's eMMC drive

If you error message `Failed to control transfer (-7,24)` when trying to lock:

* Make sure you updated the EEPROM as one of the initial steps above.
* For locking, make sure that you properly mixed files from `secure-boot-lock.tar.gz` and usbboot's existing `secure-boot-recovery` folder. Specifically using `bootcode4.bin` from the `secure-boot-recovery` folder.
* Consider using an earlier version of usbboot e.g. `git clone --branch 20250227-132106 --depth=1 --recurse-submodules --shallow-submodules` [`https://github.com/raspberrypi/usbboot`](https://github.com/raspberrypi/usbboot)
* Try a different host.
* Make sure you have a sufficient power supply for the CM4 IO Board.
