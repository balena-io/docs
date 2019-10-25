---
title: Security
excerpt: The {{ $names.company.lower }} approach to securing your fleet
---

# Security

{{ $names.company.upper }} takes your fleet’s security very seriously.  We understand that your data and devices are valuable and often critical, and we take precautions to ensure that your devices and data are not compromised.

Security begins with the ability to send timely updates to your devices. By providing a mechanism for regular, reliable, and verifiable updates, {{ $names.company.lower }} gives you the tools you need to keep your device fleet up to date and protected against attacks.

To keep the {{ $names.company.lower }} ecosystem secure, we focus on the principle of least privilege—permissions are given only as necessary, and no information is available to any account or device unless it is required for the tasks being performed. We take a number of steps to isolate all components in the update process, so that unauthorized access to any one component will not provide enough information to access additional components, accounts, or devices.

The core mechanism for implementing this security approach is through API access control. By controlling access to the API, the actions that are permitted, and the available communication channels, we can protect fleets at all points of entry.

In this document, we will further explain how the {{ $names.company.lower }} infrastructure implements access control across the entire lifecycle, from device access and runtime management, to the image build process, and finally to the API and backend services.

## Access to {{ $names.company.lower }}

The first points of access to the {{ $names.company.lower }} ecosystem are the user dashboard and the CLI. From these, a user can add and remove SSH keys, retrieve an API token, and manage devices. Multiple methods of authentication are supported for logging in:

- Simple username/password authentication is supported, though not recommended for production accounts.
- {{ $names.company.upper }} supports a number of [OpenID Connect](https://openid.net/connect/) providers, including GitHub and Google.
- Two-factor authentication using the Time-based One-time Password Algorithm (TOTP) is fully supported.  This enables integration with tools such as Google Authenticator.

## Device access

Device access is managed by our host operating system, [{{ $names.os.lower }}](/reference/OS/overview/2.x). {{ $names.os.upper }} is a thin Linux environment that supports the {{ $names.company.lower }} services and user application containers.  {{ $names.os.upper }} is built using [Yocto Linux](https://www.yoctoproject.org/), the de facto standard for building lightweight embedded Linux environments. Using Yocto allows {{ $names.company.lower }} to build images that contain no unused or unnecessary code in either userspace or the running kernel, minimizing the device's available attack surface. All {{ $names.company.lower }} software running on devices is 100% open source and can be independently audited and verified.

When a {{ $names.os.lower }} image is downloaded and flashed to a device, it comes with a provisioning key that allows devices to be added to a specific application. When the device boots up for the first time, it uses the provisioning API to register itself with {{ $names.company.lower }}. A new device entry on the {{ $names.company.lower }} backend is created, and a device API key for this device is generated. Once the provisioning is successful, the provisioning API key is deleted from the device. The device API key allows control of the following:

- changing the device metadata
- reading metadata of the application associated with the device
- reading environment variables associated with the device
- reading environment variables for the application that is associated with the device
- reading build logs of the application associated with the device

If a device is compromised, the device API key can only be used to read information about the device or the application the device is associated with. A fleet owner can remove and revoke the API key of a compromised device by simply deleting the device from the dashboard.

A device API key also allows a device to request an application update. When a device requests an update, this API key is sent to {{ $names.company.lower }} and authenticated. Once the API key has been authenticated, a Docker pull is initiated on the device.

Both the Docker pull request and the actual image download process are performed using HTTPS, so are TLS encrypted. HTTPS connections are always outbound from the device to the {{ $names.company.lower }} service, meaning that no inbound connections are created and no inbound ports on the firewall are required.
## Runtime management

### VPN

{{ $names.company.upper }} uses [OpenVPN](https://openvpn.net/) to control the device state (e.g. device reboot, device shutdown, application restart, etc.). As mentioned above, devices only connect outbound to the VPN and all traffic over the VPN is encrypted with TLS.

When the VPN is enabled, SSH access is available to the application container using the {{ $names.company.lower }} dashboard or the CLI.

The {{ $names.company.lower }} VPN disallows device-to-device traffic and prohibits outbound traffic to the Internet.  If a device were compromised, this ensures that it cannot contaminate another device.

Currently, authentication against the VPN is performed with API token authentication.  API keys can be managed and revoked in the {{ $names.company.lower }} dashboard.

This VPN connection is optional and [can be disabled](/reference/supervisor/bandwidth-reduction/) to conserve bandwidth or to remove the option of outside device control through the {{ $names.company.lower }} dashboard or API.  When disabled, the VPN connection is not established from the device and no traffic will be transmitted or received through this channel.  If desired, the VPN can be enabled and disabled programmatically so that it is turned on only when in active use (e.g. for interactive debugging) and disabled normally.

### Support access

Device access is granted to a subset of {{ $names.company.lower }} employees to enable support and device troubleshooting.  This access is controlled by the same SSH access mechanisms described above, and only SSH key access is permitted.  {{ $names.company.upper }} employees access devices only for user support and to maintain device state and uptime with permission from the customer.

If desired, this functionality can be disabled by removing the {{ $names.company.lower }} SSH public key from the device (or from the base image before flashing it onto the device).  However, this will render the device inaccessible remotely for the purposes of support or repairs and updates to the base OS.  Thus this should be done with extreme caution and only after careful consideration of the tradeoffs.

### Ports used

All communication between devices and the {{ $names.company.lower }} service are outbound from the device.  Ports that are used by devices are:


Port | Protocol | Status | Description
--- | --- | --- | ---
53 | UDP | Required | DNS: used by devices to resolve {{ $names.company.lower }} hostnames for connection to the {{ $names.company.lower }} service
123 | UDP | Required | NTP: used by devices to synchronize time
443 | TCP | Required | HTTPS: used by devices to poll {{ $names.company.lower }} for updates and to download application and host OS updates.<br><br>OpenVPN: used by devices to connect to {{ $names.company.lower }} to provide real-status, control, and an interactive terminal (optional service)

### Device metadata

Devices contain metadata that identifies the device, application, and state of deployed software.  This metadata is used to track the state of the device within the {{ $names.company.lower }} dashboard and to associate the device with a specific application.

Currently, metadata such as device identifiers or WiFi credentials are not encrypted on disk by default.  This is because most commercially available devices do not support any form of hardware-level encryption, meaning that the decryption keys for this data would have to be stored in an accessible area of the device.  Storing the keys with the encrypted data means that it is trivial for anyone with physical access to the device to decrypt the data at any point, rendering the encryption itself moot. If you do have a device that is capable of hardware-level encryption, please contact us to discuss your options.

## Building images

The first step in deploying an application to a fleet of devices is to build a Docker image that contains everything necessary to run the application. While these images can be built locally, {{ $names.company.lower }} provides a powerful image builder that is more appropriate for most use cases. The builder for x86 images is hosted on AWS, while the builder for ARM images is hosted by [Packet.com](https://www.packet.com/).

{{ $names.company.upper }} maintains a repository of base images. These base images are built by the {{ $names.company.lower }} build infrastructure, so they inherit all the security protections provided to application images. While we provide images for a wide variety of distributions, architectures, and devices, the images built by the builder can also inherit from any publicly accessible Docker image repository.

Any resource added to base images is verified by GNU Privacy Guard (GPG) signatures where available, or a SHA256 checksum based on the original source material (if a GPG key is unavailable) to insure that all included files are verified.

For example, some {{ $names.company.lower }} base images include the Python language runtime.  {{ $names.company.upper }} downloads the Python source for building and verifies checksums and signatures to be sure the Python website was not compromised or that no man-in-the-middle attacks have occurred.

User application data is pushed to the builders via git using SSH with public key encryption, ensuring that application code or data is encrypted when sent to the {{ $names.company.lower }} builders. SSH keys are managed via the user dashboard or CLI tools.

Once user application container images are built, they are pushed to the {{ $names.company.lower }} Docker registry. Only the {{ $names.company.lower }} builder has permission to write to the Docker registry, preventing tampering with the images from external sources.

## The API and backend

The {{ $names.company.lower }} API provides a central mechanism for authentication, requesting information, and making changes to the database. The API manages communication both internally among the backend services and externally for users and devices.

The API interface is based on the Open Data (OData) format. All requests are authenticated with an API token, which users access on the dashboard and can refresh via the API.

When possible, all backend services and components are run with user-level permissions.  Where permission escalation is required, it is performed temporarily and de-escalated as soon as the escalated process is complete.  This reduces the risk of a particular backend component being leveraged to compromise other components or other users' data and processes.

All software and images built within {{ $names.company.lower }} track the upstream projects directly and are rebuilt regularly to integrate the latest functionality and security updates.  Internal services are run on Debian Linux and regularly rebuilt/updated.

HTTPS is mandatory for all services internally, meaning no data is transmitted unencrypted between {{ $names.company.lower }} servers.

The {{ $names.company.lower }} backend services, with the exception of the ARM image builders, are hosted on [Amazon Web Services](https://aws.amazon.com/) (AWS) using a Virtual Private Cloud (VPC).  Using a VPC isolates {{ $names.company.lower }} from any other services hosted in AWS, allowing an additional layer of security and separation.

## Conclusion

The safety and security of your data and devices is crucial to us at {{ $names.company.lower }}.  We do everything in our power to keep our services secure and transparent. If you have any questions about our security, please contact us at [security@{{ $names.email_domain }}](mailto:security@{{ $names.email_domain }}) and we will answer in detail.
