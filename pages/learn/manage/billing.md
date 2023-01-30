---
title: Billing
---

# Billing

Billing in balenaCloud is managed through [organizations][organizations]. To manage billing for a specific organization, navigate to the organization and select the `Billing` tab from the sidebar on the left:

<img src="/img/common/billing/billing_nav.png" width="25%">

From this dashboard, you can change your billing plan, update your billing information, monitor your usage, and download invoices. If you have any questions about billing for your account, please contact [our customer success team][solutions].

## Changing your billing plan

To modify or upgrade your billing plan, click the "Change plan" button on the billing page:

<img src="/img/common/billing/current_plan.png" width="100%">

Select the plan you'd like to upgrade to from the list of available options:

<img src="/img/common/billing/plan_selection.png" width="100%">

Enter your billing information and complete the signup process:

<img src="/img/common/billing/billing_info.png" width="50%">

If you need to downgrade or cancel your plan, you can follow the steps mentioned above by choosing a lower tier or free plan instead.

Certain plan levels and custom plans may require you to contact our customer success team in order to complete an upgrade or downgrade. If you find yourself in this situation, please contact [our customer success team][solutions].

## Account settings and usage

At the top of the billing page, you'll find a summary of your subscription with information on the total amount and due date for your next payment:

<img src="/img/common/billing/sub_sum.png" width="100%">

Beneath this you can see your current usage, including [active devices][inactive] and collaborators:

<img src="/img/common/billing/usage.png" width="80%">

Further down, you'll find a place to download invoices, add or edit payment methods, and update account information:

<img src="/img/common/billing/account_details.png" width="100%">

At the bottom of this page, you'll find more information on the available [plans][plans], and you can change plans as necessary.

## Credits

To enable customers to drive down their device usage costs, balena has enabled a system known as "Credits". A Credit is a pre-purchased unit that corresponds to the usage of one device exceeding plan allowance for one month. Any unused Credits would be used before a dynamic charge is initiated at the end of your monthly billing cycle.

The discount premise is simple—the greater your volume in a single purchase, the lower your per-Credit cost will be. The discount computation also takes into account the previously purchased and unused Credits. Credit purchases of any size will result in paying less for device usage on the platform. To estimate Credit pricing at different volumes, head over to the "Volume Device Purchase Calculator" section on the [pricing page](https://www.balena.io/pricing/#devices).

This system is available to all non-Prototype customers. Our Pilot, Production, and Enterprise customers have full access to Credit discounts by paying in advance for device usage for any volume.

To manage Credits for a specific organization, navigate to the organization and select the `Credits` tab from the sidebar on the left:

<img src="/img/common/billing/credits_nav.png" width="25%">

On the Credits page, you're able to see Credit purchase history and the number of Credits that have been purchased and are still allocatable for device usage. This is also where you can initiate Credit purchases. An invoice will be automatically generated and listed on the Billing page when a bulk Credit purchase is initiated.

Credits will expire 10 years after the date of purchase. If there is no activity for 2 years we may at our discretion cancel any outstanding credits and will provide 60 days notice to the customer of our intention to do so. Credit purchases are non-refundable and cannot be refunded due to project or plan cancellation.

## Dynamic billing

Any usage above what is included in your current billing plan or covered by Credits will be tracked and billed dynamically in arrears. Dynamic billing will occur every month, even for those on annual plans.

For both devices and users, usage is calculated based on the maximum number in your account at any point during the month after any available credits have been used. **This includes all [active devices][inactive], whether online or offline.**

As an example, let's say you are on the Pilot plan, which includes up to 50 devices and 3 users. In one month, your active device count steadily climbs from 43 to 52. During this same month, you temporarily increase your user count from 3 to 4, before returning it to 3 at the end of the month. Based on this usage, your dynamic billing charges for the month will include an additional 2 devices and 1 user.

Furthermore, we charge a device or user only once for the most feature-rich usage tier within the same billing period. For example, a user was assigned a Developer role for the first half of the billing period and was later reassigned the Operator role for the second half of the billing period. In this scenario, we would charge the usage as a Developer role for the entire billing period. This is because the Developer role is a more feature-rich usage tier than the Operator role, as seen in [fleet membership types][fleet-membership-types]. It's important to note that we are not double charging for the same user.

Charges for usage outside your plan will show up under the _Add-ons_ section of your invoice. If you prefer, you can still contact us to pre-purchase devices and users and have them added to your plan, rather than be automatically billed in arrears for additional devices and users.

## Inactive devices

If you have devices that will be inactive for long periods of time, you can mark them as `Inactive`. This will keep them from being counted towards your device total. We’ll charge a one-time deactivation fee, and the devices will remain inactive until they come online.

Marking a device as `Inactive` is a [device setting][device-settings]. Device operations can be applied in one of three ways: as a group operation applied to one or more devices in the device list, as an operation selected from the dropdown on the device dashboard, or directly from the _Settings_ tab of the device dashboard. Once a device has been marked `Inactive`, it will be faded out in the device list.

[solutions]:mailto:solutions@{{ $names.email_domain }}
[plans]:{{ $links.mainSiteUrl }}/pricing/
[device-settings]:/learn/manage/actions/#device-settings
[inactive]:#inactive-devices
[organizations]:/learn/manage/organizations/
[fleet-membership-types]: /learn/manage/account/#fleet-members

## Inactive vs Offline Devices

To understand the difference between inactive and offline devices, we define them in the following ways:

- **Inactive**: The device has been either [deactivated](https://www.balena.io/docs/learn/manage/actions/#deactivate-device) or [preregistered](https://www.balena.io/docs/learn/more/masterclasses/advanced-cli/#52-preregistering-a-device) but hasn't connected to the balenaCloud API yet.
- **Offline**: The device is not connected to cloudlink and didn't have any recent API communications.

If you have a device **offline and active**, you will **still be billed for that device**. Those devices are usually still deployed in the field and ready to be used at any time. If you make the decision to have your devices offline intentionally, you will still be able see them in your fleet and can take some actions such as applying updates, that will take effect as soon as they come online.

Once you deactivate a device, you will not be able to monitor nor apply updates to that device. After the de-activation fee is charged, you won't be charged again until the device comes back online.

## Device Freezing

In the event that your balena invoices are overdue, all devices under that organization in the balenaCloud dashboard may be "frozen". Frozen devices will continue to run their application containers as usual, but users will no longer be able to access or manage those devices from the dashboard until the overdue invoices are paid and the devices are unfrozen. Frozen devices are indicated by a snowflake icon in the dashboard.

Users can determine which invoices are overdue under their organization's billing page. To settle overdue payments, update your payment method or contact the sales team at <sales@balena.io>.
