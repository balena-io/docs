### Device doesn't boot into {{ $names.os.lower }}

you may need to go back into the **BIOS** and make sure the boot order correctly selects to boot from the internal SATA drive and not from USB.

Press the F10 key while the **BIOS** is loading in order to enter the boot menu. Next, select the `UEFI : USB` (or `resinOS`) option from the boot menu so that the device will boot from your USB drive.

### Device boots with the text, "Image Authorization Fail"

You might encounter an error message when the device boots with the text, "Image Authorization Fail". This message appears when Secure Boot is enabled. Follow the steps present in the [Intel support document](https://www.intel.com/content/www/us/en/support/articles/000038401/intel-nuc/intel-nuc-kits.html) to access the BIOS setup screen and disable secure boot. After saving, press the F10 key once again when the NUC reboots to enter the boot menu and select to boot from USB/resinOS.