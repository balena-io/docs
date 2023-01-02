# Accessing a Device using a Gateway Device

It may not always be possible to access the device directly, especially if the
the VPN component isn't working.

Usually, we're able to stay connected to the device when the OpenVPN
service isn't running because we're using a development image, and development
images allow passwordless root connections via SSH. Had we been running a
production image, then the device would have been in the 'Offline' state, but
it would still potentially have had network access and be otherwise running
correctly. This brings up an issue though, how can we connect to a faulty
production device in the field?

The answer comes from the mechanism behind how SSH is tunneled through the VPN,
and we can actually use another device (in the 'Online' state) on the same
local network as an 'Offline' device to do this.

You will need UUIDs of both the gateway ('Online') and target ('Offline') devices,
as well as your username and, if possible, the IP address of the target device (by
default, the last seen 'Online' state IP address will be used if the IP is not passed).
Once you have these details, you can carry this out by executing the following on your
host machine:

```shell
$ ssh -t \
   -o LogLevel=ERROR \
   -p 22 $USERNAME@ssh.balena-devices.com hostvia $UUID_GATEWAY $UUID_TARGET [$IPADDR]
```

Should this not work, it's possible that the IP address has changed (and if it
has, you _will_ need to specify the correct address). To find
the potentially correct IP address is to SSH into the gateway device and run the
following script (which should work for both legacy DropBear SSH daemons and
those running on more recent balenaOS installations):

```shell
( prefix=192.168.1; \
    for i in {2..254}; \
    do \
        addr=$prefix.$i; \
        curl -s -m 1 $addr:22222 --http0.9 | grep -q "SSH-2.0" && echo $addr BALENA DEVICE || echo $addr; \
     done \
)
```

Ensure you change the `prefix` variable to the correct prefix for the local
network before starting. This script will then go through the range `$prefix.2`
to `$prefix.254`, and flag those devices it believes are potential balena
devices. This should help you narrow down the address range to try connections
to balena devices, substituting the IP address appropriately in the SSH
connection command. 

All IP addresses will be printed by the script, but those
that are potentially balena devices will show up with `BALENA DEVICE` next to
them. If you have multiple potential UUIDs, you'll need to mix and match UUIDs
and IP addresses until you find a matching combination.

You may also try using mDNS from the gateway device to locate the IP of the
target based on its hostname. Simply ping the `.local` address and grab the IP
that way:

```shell
root@9294512:~# ping -c1 $(hostname).local
PING 9294512.local (172.17.0.1): 56 data bytes
64 bytes from 172.17.0.1: seq=0 ttl=64 time=0.400 ms

--- 9294512.local ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max = 0.400/0.400/0.400 ms
...
```