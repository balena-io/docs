## Add your first device
<!--add an anchor here to redirect old links-->
<a name="adding-your-first-device"></a>

To connect with {{ $names.company.lower }}, your **{{ $device.name }}** needs a {{ $names.os.lower }} image configured for your device type, application, and network. Start by clicking *Add device* in your application dashboard:

<img src="/img/common/add-first-device.png" width="100%">

For most applications, you will have the option to select a device type. By default, the device type you chose when you first created the application will be selected. Applications can, however, support any devices that share the same architecture, so you can choose another device type if needed.

After selecting a device type, you will see a list of available {{ $names.os.lower }} versions. In general, you should use the most recent version available. You can also select whether to use a *Development* or *Production* edition with the respective toggle:

<img src="/img/common/add-device.png" width="80%">

__Note:__ When you're getting started, a Development image is the most useful, as it permits many testing and troubleshooting features. For production use, be sure to switch to a Production image. More details on the differences between Development and Production images can be found [here][devvprod].

[devvprod]:/understanding/understanding-devices/2.0.0/#dev-vs-prod-images
