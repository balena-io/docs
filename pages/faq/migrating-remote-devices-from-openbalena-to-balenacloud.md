# Migrating remote devices from openBalena to balenaCloud

When migrating devices from openBalena to balenaCloud, the device must be reconfigured to communicate with the balenaCloud API, VPN, and registry. This process is known as "joining" the device to a fleet.

For devices located on your local network, you can use the interactive `balena join` command provided by the balenaCLI. However, for remote devices where the balenaCLI cannot automatically discover the target on the local network, you must execute the join process over an SSH connection.

## Prerequisites

To perform a remote migration, you will need the following:

1. SSH Access to the Host OS: You must have a way to securely SSH into the host OS of the remote device (e.g., via an existing VPN like Tailscale, a public IP, or a secure tunnel) as the `root` user.
2. A Fleet Configuration File: You need the `config.json` file for the specific balenaCloud fleet you want the devices to join.

### Obtaining the config.json file

You can obtain the `config.json` for your target fleet in two ways:

* Using the Dashboard: Navigate to your target fleet in the balenaCloud dashboard and click the Add device button. In the modal, configure your desired network settings, open the dropdown menu next to the "Flash" button, and select Download configuration file only.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

* Using the CLI: Alternatively, you can generate this file using the balenaCLI via the `balena os configure` command.

## Migrating a remote device

To join a remote device to balenaCloud, you need to pass the contents of your `config.json` file to the `os-config join` utility running on the device.

You can use SSH to run the command on the device:

```
ssh -p 22222 root@<device-ip or hostname> 'os-config join "$(cat)"' < config.json
```

Once the command executes successfully, the device will apply the new configuration, restart necessary services, and appear in your balenaCloud dashboard.

{% hint style="info" %}
If you are migrating a large fleet, running the SSH command manually for every device does not scale. Instead, you can write a short automation script in your preferred language (such as Python, Node.js, Go, or Bash) to process the devices in batch.
{% endhint %}

