---
title: Billing
---

# Billing

The billing page can be found in the dropdown at the top-right of the dashboard, directly beneath the account preferences. From this dashboard, you can sign up for a paid plan, update your information, change your plan, monitor your usage, and download invoices. If you have any doubts or questions about the billing information shown for your account, please contact [our sales team][sales].

## Account settings and usage

At the top of the billing page, you'll find a summary of your subscription with information on the total amount and due date for your next payment:

<img src="/img/common/billing/sub_sum.png" width="100%">

Beneath this you can see your current usage, including [active devices][inactive] and collaborators:

<img src="/img/common/billing/usage.png" width="80%">

Further down, you'll find a place to download invoices, add or edit payment methods, and update account information:

<img src="/img/common/billing/account_details.png" width="100%">

At the bottom of this page, you'll find more information on the available [plans][plans], and you can change plans as necessary.

## Dynamic billing

From August 15th, 2018, and onward, we will be tracking usage dynamically. For any usage that is outside the limits defined by your plan, you will be billed. Dynamic billing for devices and users outside of your plan will occur every month, even for those on annual plans.

For both devices and users, usage is calculated based on the maximum number in your account at any point during the month. **This includes all [active devices][inactive], whether online or offline.**

As an example, let's say you are on the Pilot plan, which includes up to 50 devices and 3 users. In one month, your active device count steadily climbs from 43 to 52. During this same month, you temporarily increase your user count from 3 to 4, before returning it to 3 at the end of the month. Based on this usage, your dynamic billing charges for the month will include an additional 2 devices and 1 user.

Charges for usage outside your plan will show up under the *Add-ons* section of your invoice. If you prefer, you can still contact us to pre-purchase devices and users and have them added to your plan, rather than be automatically billed in arrears for additional devices and users.

## Inactive devices

If you have devices that will be inactive for long periods of time, you can mark them as `Inactive`. This will keep them from being counted towards your device total. We’ll charge a one-time deactivation fee, and the devices will remain inactive until they come online.

Marking a device as `Inactive` is a [device action][device-action]. Device actions can be applied in one of three ways: as a group action applied to one or more devices in the device list, as an action selected from the dropdown on the device dashboard, or directly from the *Actions* tab of the device dashboard. Once a device has been marked `Inactive`, it will be faded out in the device list.

[sales]:mailto:sales@{{ $names.email_domain }}
[plans]:{{ $links.mainSiteUrl }}/pricing/
[device-action]:/learn/manage/actions/#device-specific-actions
[inactive]:#inactive-devices
