---
title: Container contracts
excerpt: A guide to using container contracts to enforce device compatibility
---

# Container contracts

**Note** Container contracts are available for devices running Supervisor versions >= 10.6.17. All prior versions will not enforce any contracts.

Container contracts are used to ensure the compatibility of a device to run an individual service of an application. For example, container contracts may be used to ensure that the device is running a specific version of [Supervisor][supervisor] or has a specific version of the [NVIDIA Tegra Linux Driver Package][l4t] (L4T).

Container contracts are enforced on the device via the device Supervisor. Each service can define the contract requirements that it enforces, and if a contract's requirements are not met, the release is not deployed to the device, unless it contains services labeled as [optional](#optional-containers). You only need to define a contract for services that you wish to enforce a contract upon. Currently, you may define contract requirements based on the versions of Supervisor and L4T.

## Contract specification

Container contracts are defined as a `contract.yml` file and must be placed in the root of the build context for a service. For example, the following [multi-container application][multicontainer] defines two services named `first-service` and `second-service`, each with a corresponding `contract.yml` file.

```shell
.
├── docker-compose.yml
├── first-service
│ ├── contract.yml
│ └── Dockerfile.template
└── second-service
  ├── contract.yml
  └── Dockerfile.template
```

`contract.yml` is a YAML file containing `type`, `slug`, `name`, and `requires` keys, which define the requirements of the contract. The following example requires the device to be running a version of L4T equal to 28.2 for the contract to pass. For Supervisor versions < 10.10.0, L4T exact versions (either 28.2 or 32.2) must be specified.

```yaml
type: "sw.container"
slug: "enforce-l4t-version"
name: "Enforce L4T Version"
requires:
  - type: "sw.l4t"
    version: "28.2"
```

- `type` should be set to `sw.container` for container contracts.
- `slug` should be a unique identifier to identify the contract.
- `name` should be a descriptive name of the contract.
- `requires` should be a list of requirements to be enforced by the contract defined by `type` and `version` keys. Currently, `type` may be either `sw.supervisor` for the device Supervisor version or `sw.l4t` for the L4T version.

**Note** If `type`, `slug`, or `name` are omitted, the build will fail.

Multiple requirements may be added to a single contract. The following example requires that the Supervisor version is greater than or equal to 10.6.17, and the L4T version is greater than or equal to 32.2.

```yaml
type: "sw.container"
slug: "enforce-supervisor-and-l4t"
name: "Enforce supervisor and l4t requirements"
requires:
  - type: "sw.supervisor"
    version: ">=10.6.17"
  - type: "sw.l4t"
    version: ">=32.2.0"
```

**Note** Any `requires` type other than `sw.supervisor` or `sw.l4t` will result in the contract being invalid.

When deploying a release, if the contract requirements are not met, the release will fail, and all services on the device will remain on their current release. This default behavior can be overridden by including an [optional label](#optional-containers) in the application docker-compose.yml file. This optional label specifies which services with unmet requirements will be ignored, with all other services on the device updating to the new release. If there are any existing running services with unmet requirements, they will not be destroyed and continue running the prior release.

Should a contract fail, the dashboard logs will contain detail about the failing contract:

```shell
Could not move to new release: Some releases were rejected due to having unmet requirements:
Contracts: Services with unmet requirements: first-service
```

**Note** For application fleets that contain a mixture of Supervisor and L4T versions, contracts may be used to ensure only compatible devices run specific services, as releases will only be deployed to those meeting the contract requirements.

## Optional containers

By default, when a container contract fails, none of the services are deployed to the device. However, in a multi-container application, it is possible to ignore those services that fail the contract requirements with the other services being deployed as normal. To do so, we make use of the `io.balena.features.optional: 1` [Supervisor label][labels] to indicate which services should be considered optional.

In the `docker-compose.yml` file of the application, add the `io.balena.features.optional: 1` to the labels list for each service you wish to mark as optional. In the following example, even if the `first-service` container contract fails, the `second-service` service will still be deployed (assuming it doesn’t have any failing contracts of its own).

```Dockerfile
version: '2'
services:
  first-service:
    build: ./first-service
    labels:
      io.balena.features.optional: '1'
  second-service:
    build: ./second-service
```

**Note** When using optional containers, if there are any existing running services of the failed contract, they will be killed and not continue running the old version.

## Board support

Container contracts are supported on all devices where the Supervisor version is >= 10.6.17. If a device in the application does not support L4T, and the contract specifies an L4T requirement, the device supervisor will reject the release unless the contract is marked as optional. L4T support is available on the following boards:

- Aetina N510 TX2
- Auvidea J120 TX2
- CTI Orbitty TX2
- CTI Spacely TX2
- Nvidia blackboard TX2
- Nvidia D3 TX2
- Nvidia Jetson Nano
- Nvidia Jetson TX1
- Nvidia Jetson TX2
- Nvidia Jetson Xavier
- SKX2

[os]: /reference/OS/overview/2.x/
[supervisor]: /reference/supervisor/supervisor-api/
[multicontainer]: /learn/develop/multicontainer/
[labels]: /learn/develop/multicontainer/#labels
[l4t]: https://developer.nvidia.com/embedded/linux-tegra
