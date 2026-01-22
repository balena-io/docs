---
title: Security
excerpt: The balena approach to securing your fleet
---

# Security

Balena takes your fleet’s security very seriously. We understand that your data and devices are valuable and often critical, and we take precautions to ensure that your devices and data are not compromised.

## Trust and Transparency

At balena, our approach to security is guided by ISO 27001:2022, ensuring a structured, reliable system that aligns with our values. Our ISMS (Information Security Management System) has undergone multiple audits by accredited third parties to verify our compliance and effectiveness.

Rather than using rigid templates, we customized our implementation to fit our team's way of working, maintaining transparency without compromising our culture. This system is continually monitored and improved, demonstrating our commitment to providing a secure and dependable platform while staying true to who we are.

For transparency we maintain a trust center at [trust.balena.io](https://trust.balena.io), where we surface our monitored information security controls, sub processors and security acknowledgements.

## Secure Ecosystem

Security begins with the ability to send timely updates to your devices. By providing a mechanism for regular, reliable, and verifiable updates, balena gives you the tools you need to keep your device fleet up to date and protected against attacks.

To keep the balena ecosystem secure, we focus on the principle of least privilege—permissions are given only as necessary, and no information is available to any account or device unless it is required for the tasks being performed. We take a number of steps to isolate all components in the update process, so that unauthorized access to any one component will not provide enough information to access additional components, accounts, or devices.

The core mechanism for implementing this security approach is through API access control. By controlling access to the API, the actions that are permitted, and the available communication channels, we can protect fleets at all points of entry.

In this document, we will further explain how the balena infrastructure implements access control across the entire lifecycle, from device access and runtime management, to the image build process, and finally to the API and backend services.

## Access to balena

The first points of access to the balena ecosystem are the user dashboard and the CLI. From these, a user can add and remove SSH keys, retrieve an API token, and manage devices. Multiple methods of authentication are supported for logging in:

- Simple username/password authentication is supported, though not recommended for production accounts.
- Balena supports a number of [OpenID Connect](https://openid.net/connect/) providers, including GitHub and Google.
- Two-factor authentication using the Time-based One-time Password Algorithm (TOTP) is fully supported. This enables integration with tools such as Google Authenticator.

## Device access

Device access is managed by our host operating system, [balenaOS](/reference/OS/overview/2.x). BalenaOS is a thin Linux that supports the balena services and user containers. BalenaOS is built using [Yocto Linux](https://www.yoctoproject.org/), the de facto standard for building lightweight embedded Linux environments. Using Yocto allows balena to build images that contain no unused or unnecessary code in either userspace or the running kernel, minimizing the device's available attack surface. All balena software running on devices is 100% open source and can be independently audited and verified. Device access is granted to a subset of balena employees to enable support and device troubleshooting. This access is controlled by ssh key access and only after access is explicitly granted to balena.

User source code and images are stored on balena backend servers with access limited only to administrative/operational staff and are not exposed to anyone outside of balena. It is also possible to bypass the balena builder entirely and push only pre-built artifacts, meaning that balena never has access to the code at any point.

When a balenaOS image is downloaded and flashed to a device, it comes with a provisioning key that allows devices to join a specific fleet. When the device boots up for the first time, it uses the provisioning API to register itself with balena. A new device entry on the balena backend is created, and a device API key for this device is generated. Once the provisioning is successful, the provisioning API key is deleted from the device. The device API key allows control of the following:

- changing the device metadata
- reading metadata of the fleet associated with the device
- reading variables associated with the device
- reading variables for the fleet that is associated with the device
- reading build logs of the fleet associated with the device

If a device is compromised, the device API key can only be used to read information about the device or the fleet the device is associated with. A fleet owner can remove and revoke the API key of a compromised device by simply deleting the device from the dashboard.

A device API key also allows a device to request the latest release. When a device requests an update, this API key is sent to balena and authenticated. Once the API key has been authenticated, a Docker pull is initiated on the device.

Both the Docker pull request and the actual image download process are performed using HTTPS, so are TLS encrypted. HTTPS connections are always outbound from the device to the balena service, meaning that no inbound connections are created and no inbound ports on the firewall are required.

## Runtime management

### Cloudlink

Cloudlink status in the dashboard represents a device connection to the balenaCloud backend. This connection is the underlying technology that enables the following functionalities within balenaCloud, and as such we indicate the status of Cloudlink to help you to understand the status of your device and what functionality may or may not be available.

- [SSH access](/learn/manage/ssh-access/) via CLI or web terminal
- [Public Device Url](/learn/manage/actions/#public-device-url)
- [Device actions](/learn/manage/actions/#device-actions) that allow controlling device state
- [Host OS Updates](/reference/OS/updates/self-service/)
- [Device Diagnostics](/reference/diagnostics/)

Currently, Cloudlink uses [OpenVPN](https://openvpn.net/) as an underlying technology to achieve its functionality. Devices only connect outbound to Cloudlink, and all traffic over Cloudlink is encrypted with TLS.

Cloudlink disallows device-to-device traffic and prohibits outbound traffic to the Internet. If a device were compromised, this ensures that it cannot contaminate another device. To achieve this the Cloudlink service is configured to run with iptables default `FORWARD` policy set to `DROP` and we do not enable OpenVPN [--client-to-client](https://www.mankier.com/8/openvpn#--client-to-client) config option server side, so there is no way for the traffic between clients to traverse the interface(s).

Currently, authentication against Cloudlink is performed with API token authentication. API keys can be managed and revoked in the balena dashboard.

Cloudlink connection is optional and [can be disabled](/reference/supervisor/bandwidth-reduction/) to conserve bandwidth or to remove the option of outside device control through the balenaCloud dashboard or API. When disabled, the Cloudlink connection will not be established from the device. No traffic will be transmitted or received through this channel. If desired, Cloudlink can be enabled and disabled programmatically so that it is turned on only when in active use (e.g. for interactive debugging) and disabled normally.

It is important to understand that due to its current design, Cloudlink is not architected for high availability. Cloudlink will periodically drop connections momentarily due to re-configuration or scaling, but it reconnects with the device automatically. For mission-critical workflows, we recommend designing your solution to be resilient to the potential brief unavailability of these specific interactive features. Furthermore, to protect overall platform stability for all users, devices that send/receive large amounts of data via Cloudlink continuously may be throttled.

### Support access

Device access is granted to a subset of balena employees to enable support and device troubleshooting. This access is controlled by the same SSH access mechanisms described above, and only SSH key access is permitted. Balena employees access devices only for user support and to maintain device state and uptime with permission from the customer.

If desired, this functionality can be disabled by removing the balena SSH public key from the device (or from the base image before flashing it onto the device). However, this will render the device inaccessible remotely for the purposes of support or repairs and updates to the base OS. Thus this should be done with extreme caution and only after careful consideration of the tradeoffs.

### Ports used

All communication between devices and the balena service are outbound from the device. Ports that are used by devices are:

| Port | Protocol | Status   | Description                                                                                                                                                                                                                            |
| ---- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 53   | UDP      | Required | DNS: used by devices to resolve balena hostnames for connection to the balena service                                                                                                                                                  |
| 123  | UDP      | Required | NTP: used by devices to synchronize time                                                                                                                                                                                               |
| 443  | TCP      | Required | HTTPS: used by devices to poll balena for updates and to download releases and host OS updates.<br><br>Cloudlink: used by devices to connect to balena to provide real-status, control, and an interactive terminal (optional service) |

### Device metadata

Devices contain metadata that identifies the device, fleet, and state of deployed software. This metadata is used to track the state of the device within the balena dashboard and to associate the device with a specific fleet.

Currently, metadata such as device identifiers or WiFi credentials are not encrypted on disk by default. This is because most commercially available devices do not support any form of hardware-level encryption, meaning that the decryption keys for this data would have to be stored in an accessible area of the device. Storing the keys with the encrypted data means that it is trivial for anyone with physical access to the device to decrypt the data at any point, rendering the encryption itself moot. If you do have a device that is capable of hardware-level encryption, please contact us to discuss your options.

## Building images

The first step in deploying to a fleet of devices is to build a Docker image that contains everything necessary to run your application. While these images can be built locally, balena provides a powerful image builder that is more appropriate for most use cases. The builder for x86 images is hosted on AWS, while the builder for ARM images is hosted by a combination of AWS and Hetzner.

User code and data is pushed to the builders via git using SSH with public key encryption, ensuring that it is encrypted when sent to the balena builders. SSH keys are managed via the user dashboard or CLI tools.

Once user container images are built, they are pushed to the balena Docker registry. Only the balena builder has permission to write to the Docker registry, preventing tampering with the images from external sources.

## The API and backend

The balena API provides a central mechanism for authentication, requesting information, and making changes to the database. The API manages communication both internally among the backend services and externally for users and devices.

The API interface is based on the Open Data (OData) format. All requests are authenticated with an API token, which users access on the dashboard and can refresh via the API.

When possible, all backend services and components are run with user-level permissions. Where permission escalation is required, it is performed temporarily and de-escalated as soon as the escalated process is complete. This reduces the risk of a particular backend component being leveraged to compromise other components or other users' data and processes.

All software and images built within balena track the upstream projects directly and are rebuilt regularly to integrate the latest functionality and security updates. Internal services are run on Debian Linux and regularly rebuilt/updated.

HTTPS is mandatory for all services internally, meaning no data is transmitted unencrypted between balena servers.

The balena backend services, with the exception of the ARM image builders, are hosted on [Amazon Web Services](https://aws.amazon.com/) (AWS) using a Virtual Private Cloud (VPC). Using a VPC isolates balena from any other services hosted in AWS, allowing an additional layer of security and separation.

## Conclusion

The safety and security of your data and devices is crucial to us at balena. We do everything in our power to keep our services secure and transparent. If you have any questions about our security or want to engage in our [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure) process, please contact us at [security@{{ $names.email_domain }}](mailto:security@{{ $names.email_domain }}) and we will answer in detail.
