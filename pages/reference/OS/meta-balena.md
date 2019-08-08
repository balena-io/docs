---
title: Custom board support
excerpt: Instructions for adding boards not currently supported by {{ $names.company.lower }}

---

# Custom board support

### Its important to note that the instructions for [meta-balena][meta-balena] are still a draft, we still may have some detail to cover, if you have any feedback please let us know - hello@{{ $names.email_domain }}.

__NOTE:__ Pre-requisites: yocto BSP layer for your particular board. Should be compatible to yocto sumo release at the time of writing this howto.

The following are the steps to follow in order to add a new board to {{ $names.company.lower }}.
I - Add the dependencies for your layer in the resin-yocto manifests. For examples, check out **resin-yocto/manifests/resin-master-board.xml**.

II - Create a layer in meta-balena that will hold the relevant files pertaining to the new board. The layer should follow the naming convention `meta-resin-${board_name}` **(i.e. meta-resin-nuc)**
Following files should be present in this layer:
Depending on the type of board you are adding suport for, you should have your device support either just resin-image or resin-image-flasher and resin-image. Generally, resin-image is for boards that boot directly from external storage (these boards do not have internal storage to install resin on). resin-image-flasher is used when the targeted board has internal storage so this flasher image is burned onto an SD card or USB stick that is used for the initial boot. When booted, this flasher image should automatically install resin on internal storage.

1. The resin-image and/or resin-image-flasher appends reside in **meta-balena/meta-resin-${board_name}/recipes-core/images/** directory.
One should define the following variables in the resin-image bbappend:

	- `IMAGE_FSTYPES_${board_name}` - using this variable one can declare the type of the produced image. It can be ext3, ext4, resin-sdcard etc. Usual type for a board that can boot from SD card, USB, is "resin-sdcard".

	- `RESIN_BOOT_PARTITION_FILES_${board_name}` - this allows adding needed files from the deploy directory into the boot partition (one can add here bootloader config files, first stage bootloader, initramfs etc).
	This is a list of files relative to `DEPLOY_DIR_IMAGE` that will be included in the vfat partition. It has the following format: "FilenameRelativeToDeployDir:FilenameOnTheTarget". if `FilenameOnTheTarget` is omitted the same filename will be used
	For example to have the `bzImage-nuc.bin` copied from deploy directory in the boot partition, renamed to vmlinuz: `RESIN_BOOT_PARTITION_FILES_nuc = "bzImage-nuc.bin:vmlinuz"`

	If using **resin-image-flasher**, the following variables should be defined/appended:

	- `IMAGE_DEPENDS` - this allows to add dependencies for the image. Use this for example if you need the initrams to be a dependency of your flasher image: `IMAGE_DEPENDS_resin-sdcard_append_nuc = " core-image-minimal-initramfs:do_rootfs"`

	- `BOOT_SPACE_${board_name}` - can be used to customize the space of the boot partition

	- `RESIN_BOOT_PARTITION_FILES_append_${board_name}` - one can use this append here to add extra files to the boot partition needed for the **resin-image-flasher** that are not already contained in resin-image.

2. Create a `.bbappend` for having the kernel recipe in your BSP layer inherit kernel-resin. This adds the necessary kernel configs for using with resin.

	This should reside in **meta-balena/meta-resin-${board_name}/recipes-kernel/linux/**

3. Create a `.bbappend` for specifying the build of the resin supervisor to be used with your board. This append resides in **meta-balena/meta-resin-${board-name}/recipes-support/resin-supervisor-disk/**

	Following variables should be defined:

	- `TARGET_REPOSITORY_${board-name}` - this defines the build of the supervisor. Can be one of the values(must match the arch of your board): *resin/rpi-supervisor*, *resin/armv7hf-supervisor*, *resin/i386-supervisor*, (TBC when we also have the *amd64 rce*)

	Optional variables:

	- `PARTITION_SIZE_${board_name}` - size of partition

	- `LED_FILE_${board_name}` - points to a sysfs property that allows an LED to be flashed on your board.

4. If using *resin-image-flasher*, you must define some variables to pass to the flashing script. Create a `resin-init-flasher.bbappend` in **meta-balena/meta-resin-${board_name}/recipes-support/resin-init/** and define in it:

	- `BOARD_BOOTLOADER_${board_name}` - for the moment, "grub-efi" and "u-boot" are the supported options

	- `INTERNAL_DEVICE_UBOOT_${board_name}` - variable used for u-boot based boards, to keep track of how uboot enumerates the internal emmc device on that particular board so we know where to load the kernel from after we flash it.

5. And of course your typical yocto `conf/layer.conf` file, COPYING and README.md file specifying what is the machine this layer adds support for and what are the yocto layers it depends on.


[meta-balena]:{{ $links.githubOS }}/meta-balena
