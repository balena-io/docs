---
title: Billing
---

# Billing

Billing is managed through [organizations][organizations]. Navigate to the organization for which you'd like to manage billing, and select "billing" from the left hand side menu.

<img width="189" alt="Screen Shot 2021-03-01 at 4 46 36 PM" src="https://user-images.githubusercontent.com/20308284/109579511-e54ea700-7aad-11eb-9cf7-5648f1fdb897.png">

From this dashboard, you can change your billing plan, update your billing information, monitor your usage, and download invoices. If you have any questions about billing for your account, please contact [our customer success team][solutions].

## Changing your billing plan

Changing your billing plan is self-serve on balenaCloud. If you'd like to upgrade to a paid plan, select "change plan" from the billing page: 

<img width="1208" alt="Screen Shot 2021-03-01 at 4 59 54 PM" src="https://user-images.githubusercontent.com/20308284/109580811-17f99f00-7ab0-11eb-992b-f3993060a808.png">

You'll be shown the available plan options; select which plan you'd like to upgrade to: 

<img width="1434" alt="Screen Shot 2021-03-01 at 5 02 05 PM" src="https://user-images.githubusercontent.com/20308284/109580819-1c25bc80-7ab0-11eb-8c86-57e54547ddfe.png">

Enter your billing information and complete the signup process: 

<img width="1437" alt="Screen Shot 2021-03-01 at 5 01 48 PM" src="https://user-images.githubusercontent.com/20308284/109580829-2051da00-7ab0-11eb-924a-ca86d0e187a8.png">

If you need to downgrade or cancel your plan, you can follow the same steps above. Just move to a lower tier or free plan instead. 

Certain plan levels and custom plans may require you to contact our customer success team in order to complete an upgrade or downgrade. If you find yourself in this situation, please contact [our customer success team][solutions]. 

## Account settings and usage

At the top of the billing page, you'll find a summary of your subscription with information on the total amount and due date for your next payment:

<img src="/img/common/billing/sub_sum.png" width="100%">

Beneath this you can see your current usage, including [active devices][inactive] and collaborators:

<img src="/img/common/billing/usage.png" width="80%">

Further down, you'll find a place to download invoices, add or edit payment methods, and update account information:

<img src="/img/common/billing/account_details.png" width="100%">

At the bottom of this page, you'll find more information on the available [plans][plans], and you can change plans as necessary.

## Dynamic billing

For any usage that is outside the usage included in your billing plan, we will track your usage, and you will be billed dynamically in arrears. Dynamic billing for devices and users outside of your plan will occur every month, even for those on annual plans.

For both devices and users, usage is calculated based on the maximum number in your account at any point during the month. **This includes all [active devices][inactive], whether online or offline.**

As an example, let's say you are on the Pilot plan, which includes up to 50 devices and 3 users. In one month, your active device count steadily climbs from 43 to 52. During this same month, you temporarily increase your user count from 3 to 4, before returning it to 3 at the end of the month. Based on this usage, your dynamic billing charges for the month will include an additional 2 devices and 1 user.

Charges for usage outside your plan will show up under the *Add-ons* section of your invoice. If you prefer, you can still contact us to pre-purchase devices and users and have them added to your plan, rather than be automatically billed in arrears for additional devices and users.

## Inactive devices

If you have devices that will be inactive for long periods of time, you can mark them as `Inactive`. This will keep them from being counted towards your device total. We’ll charge a one-time deactivation fee, and the devices will remain inactive until they come online.

Marking a device as `Inactive` is a [device action][device-action]. Device actions can be applied in one of three ways: as a group action applied to one or more devices in the device list, as an action selected from the dropdown on the device dashboard, or directly from the *Actions* tab of the device dashboard. Once a device has been marked `Inactive`, it will be faded out in the device list.

[solutions]:mailto:solutions@{{ $names.email_domain }}
[plans]:{{ $links.mainSiteUrl }}/pricing/
[device-action]:/learn/manage/actions/#device-specific-actions
[inactive]:#inactive-devices
[organizations]:/learn/manage/organizations/
