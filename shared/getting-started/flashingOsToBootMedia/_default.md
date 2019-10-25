The next step is to flash the downloaded image onto your {{ $device.bootMedia }} using [**Etcher**][etcher-link], a simple, cross-platform {{ $device.bootMedia }} writer and validator. Once you have **Etcher** installed, start it up. To give **Etcher** access to your {{ $device.bootMedia }}, your system may prompt you to grant administrative privileges.

To create a bootable {{ $names.os.lower }} {{ $device.bootMedia }}, follow these steps:

1. Click *Select image* and find your application's {{ $names.os.lower }} image file.
2. If you haven't already done so, insert your {{ $device.bootMedia }} into your computer. **Etcher** will automatically detect it. If you have more than one {{ $device.bootMedia }} inserted, you will need to select the appropriate one.
3. Click the *Flash!* button.

<img src="/img/common/etcher/etcher.gif" width="60%">

**Etcher** will prepare a bootable {{ $device.bootMedia }} and validate that it was flashed correctly. This can take roughly 3 or more minutes, depending on the quality of your {{ $device.bootMedia }}. You'll receive a notification when it completes, and **Etcher** will safely eject the {{ $device.bootMedia }} for you.

__Note:__ You can burn several {{ $device.bootMedia }}s with the same image file, and all the devices will boot and provision into your application's fleet. You can also disable the auto-ejecting or validation steps from the **Etcher** settings panel.

[etcher-link]:https://www.balena.io/etcher
