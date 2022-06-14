---
title: Grant support access
excerpt: Enable support access to the entire fleet or individual devices for a set period
---

# Support access

It is possible to grant support access to a device, all devices in a fleet or to a block to enable support and device troubleshooting by {{ $names.company.lower }} employees.

Access is granted for a set, user-defined period, and access may be revoked at any time. Access for support agents is limited, which includes restrictions on the changing of service and environment variables and configurations, and ensures that a device under investigation cannot be unnecessarily altered or modified.

Once support access has been granted, a support agent will be able to use the UUID of a device to gain access to it. Support access is enabled via SSH over cloudlink, so the device must be online and connected to cloudlink. Alternatively, it may be possible to access a problematic device from a gateway device operating on the same network.

__Note:__ It is possible to disable support access functionality by removing the {{ $names.company.lower }} SSH public key from the device. However, this will render the device inaccessible remotely for the purposes of support and updates to the host OS. For more details see our [security documentation][security].

## Grant support access for a device

To enable support access for a single device, select the _Actions_ menu in the Device dashboard, and choose the _Grant Support Access_ button and choose the period to grant device access. You may revoke access at any time by selecting _Revoke Support Access_ on the same page.

![Grant support for a device](/img/common/support/enable-support-access-device.gif)

## Grant support access for a fleet

To enable support access for all devices in a fleet, select the _Grant Support Access_ from the _Settings_ menu of the Fleet dashboard, and choose the period to grant access. This may be revoked at any time by selecting _Revoke Support Access_ on the same page.

![Grant support access for a fleet](/img/common/support/enable-support-access-fleet.png)

## Grant support access for a block

To enable support access for block, select the _Grant Support Access_ from the _Settings_ menu of the block dashboard, and choose the period to grant access. This may be revoked at any time by selecting _Revoke Support Access_ on the same page.

![Grant support access for a block](/img/common/support/enable-support-block.png)

[security]: /learn/welcome/security/#support-access
