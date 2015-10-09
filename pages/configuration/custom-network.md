# Custom Network Configuration

## Raspberry Pi

### Multiple WiFi Networks

We hope to eventually implement the ability to use Multiple WiFi SSIDs in the resin.io user interface however for the time being you can add this functionality manually by editing a configuration file on your `img`.

On the Raspberry Pi and Beaglebone, it is possible to change your wifi SSID or Passphrase after downloading by changing a configuration file inside of the downloaded OS image (`.img`).

Currently this can be done using the small config [writer tool](https://github.com/petrosagg/resin-net-config). This is a temporary tool and will be phased out very soon.

You will see an entry for the WiFi network you specified in the UI (if you did specify one) like this:-

```
[service_home_wifi]
Type = wifi
Name = [SSID]
Passphrase = [passphrase]
```

Simply duplicate this block in the configuration file for each network you want your device to connect to, ensuring that each network has a unique SSID.

### Custom Configuration

This configuration file follows the [ConnMan][connman] configuration file format. Follow the [official guide][connman-format] for details of how to configure your network if you have more complicated requirements than the standard configuration allows.

[connman]:http://en.wikipedia.org/wiki/ConnMan
[connman-format]:http://git.kernel.org/cgit/network/connman/connman.git/tree/doc/config-format.txt
