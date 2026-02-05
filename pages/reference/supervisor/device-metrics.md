---
title: Device Metrics
---

# Device Metrics

The balena Supervisor reports metrics about your device to the cloud. These metrics are available on your balenaCloud dashboard, on the device summary page:

![Device Metrics](https://assets.balena.io/blog-common/archive/2020/09/device-metrics-1.png)

You can also fetch device metrics data through balena's [open API](../../../reference/api/overview/), [Node SDK](../../../external-docs/sdk/node-sdk/latest.md), and [Python SDK](../../../external-docs/sdk/python-sdk/latest.md). This allows you to port metrics data to a custom dashboard in order to monitor the utilization and health of your fleet. Note that device metrics are available with balenaOS v2.56.0+rev1 and higher, running Supervisor v11.14.0 and higher.

The following table has descriptions for each metric reported by the balena Supervisor:

| Name                    | Type         | Description                                                                                                                                                                                                                                                                                                                                       | API Slug                          | Optional? |
| ----------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------- |
| CPU utilization         | integer (%)  | Utilization percentage of the CPU. Receive updates when the "bucket" of the CPU usage changes past certain milestones in increments of 20%.                                                                                                                                                                                                       | `cpu_usage`                       | Y         |
| CPU temperature         | integer (°C) | CPU temperature in degrees Centigrade in boundaries of 3 degrees, subject to bandwidth saving transfer strategies.                                                                                                                                                                                                                                | `cpu_temp`                        | Y         |
| Memory usage/total      | integer (Mb) | RAM usage on the device in megabytes.                                                                                                                                                                                                                                                                                                             | `memory_usage` / `memory_total`   | Y         |
| Disk storage used/total | integer (Mb) | Utilized storage and total storage in megabytes.                                                                                                                                                                                                                                                                                                  | `storage_usage` / `storage_total` | Y         |
| CPU ID                  | string       | CPU serial number provided by manufacturer.                                                                                                                                                                                                                                                                                                       | `cpu_id`                          | Y         |
| Undervoltage            | boolean      | Detect power supply insufficiency. Not supplying enough power most commonly leads to power brownouts or disk corruption. Will _not_ toggle back to false after true has been reported until reboot occurs. See the [FAQs](../../faq/questions.md#what-to-keep-in-mind-when-choosing-power-supply-units) for tips on choosing a power supply unit. | `is_undervolted`                  | N         |

## Toggling Metrics Reporting

In the table above, you may have noticed that some metrics are optional while others are not. From the perspective of the Supervisor, hardware metrics reported from the device are divided into two categories: optional system metrics, and non-optional system checks. Starting with Supervisor v12.8.0, you can control whether optional metrics are reported to the cloud to save bandwidth by toggling `BALENA_SUPERVISOR_HARDWARE_METRICS`. When metrics reporting is enabled, metrics are reported as part of device state at most every 10 seconds when metrics changes have occurred. When metrics reporting is disabled, optional metrics are not reported, but system checks are still reported.

{% hint style="warning" %}
The `BALENA_SUPERVISOR_HARDWARE_METRICS` configuration variable may be toggled at a fleet or device-specific level from the respective `Configuration` tabs on the dashboard. By default, metrics reporting is enabled.
{% endhint %}
