## Add your first device
<!--add an anchor here to redirect old links-->
<a name="adding-your-first-device"></a>

To connect with resin.io, your **{{ $device.name }}** will need a resinOS image that is configured for your device type, application, and network. Start by clicking *Add device* in your application dashboard:

<img src="/img/{{ $device.id }}/add-device.png" width="100%">

For most applications, you will have the option to select a device type. By default, the device type you chose when you first created the application will be selected. Applications can, however, support any devices that share the same architecture, so you can choose another device type if needed.

After selecting a device type, you will see a list of available resinOS versions. In general, the most recent version is recommended. You can also select whether you would prefer a *Development* or *Production* edition with the respective toggle:

<img src="/img/{{ $device.id }}/os-options.png" width="60%">

__Note:__ When you're first getting started, a Development image will be most useful, as it permits a number of testing and troubleshooting features. For production use, be sure to switch to a Production image. More details on the differences between Development and Production images can be found [here][devvprod].

[devvprod]:/understanding/understanding-devices/2.0.0/#dev-vs-prod-images