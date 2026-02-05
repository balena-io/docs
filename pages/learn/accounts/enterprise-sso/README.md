---
title: Enterprise Single Sign-On
excerpt: Setup balenaCloud SSO authentication using SAML 2.0
---

# Enterprise Single Sign-On (SSO)

{% hint style="warning" %}
This feature is available to customers on [standard paid plans](https://www.balena.io/pricing) - Prototype Plan, Pilot Plan, Production Plan, or Enterprise Plan.
{% endhint %}

BalenaCloud Enterprise Single Sign-On (SSO) using SAML (Security Assertion Markup Language) allows organizations to manage user access and authentication through their existing Identity Providers (IdP). This integration enables users to use their corporate credentials to log in and access BalenaCloud services. By leveraging SAML, enterprises can simplify the login process, enhance security, streamline user management, and ensure compliance with their internal policies and procedures.

Configuring an Identity Provider (IdP) as a login method requires a one-time setup process within both balenaCloud and the IdP itself. Refer to our [IdP specific documentation](idp-setup/microsoft-entra-saml-setup.md) for detailed instructions on required configurations.

## Link a SAML Identity Provider

To enable Single Sign-On (SSO) for balenaCloud organizations, you must establish a connection with your external Identity Provider (IdP). BalenaCloud supports all SAML 2.0 Identity Providers, and we provide examples for [Microsoft Entra ID](idp-setup/microsoft-entra-saml-setup.md) (formerly Azure AD) and [Google Workspace](idp-setup/google-workspace-saml-setup.md). This process assumes that you have already configured a [SAML 2.0 IdP and possess an XML certificate](idp-setup/microsoft-entra-saml-setup.md) ready for upload.

1. To configure an Identity Provider, you must be logged in as the Administrator of an organization subscribed to a [standard paid plan](https://www.balena.io/pricing) (Prototype Plan, Pilot Plan, Production Plan, or Enterprise Plan).
2. From the balenaCloud dashboard, select the [Identity Provider](https://dashboard.balena-cloud.com/identity-provider) option from the left sidebar.
3. Click on the Add Identity Provider button. In the dialog that appears, either upload the XML file or manually enter the IdP details.

<figure><img src="../../../../summary/.gitbook/assets/add-idp-form-filled.webp" alt=""><figcaption></figcaption></figure>

To create an Identity Provider entity, start by first selecting a unique SSO identifier. This identifier will be part of your team's URL for logging in. For instance, if your organization is `ACME Corp`, you can choose your unique SSO identifier as `acme` and your team's login URL will be `https://dashboard.balena-cloud.com/saml/acme`.

This identifier must be unique within balenaCloud and can only include lowercase letters (`a-z`), numbers (`0-9`), hyphens (`-`), and underscores (`_`).

### Associate Organizations and Teams

BalenaCloud requires a list of organizations to which SAML users will be automatically added upon successful authentication. Only organizations subscribed to a [standard paid plan](https://www.balena.io/pricing) (Prototype Plan, Pilot Plan, Production Plan, or Enterprise Plan) will appear in the list of available organizations. At least one organization must be provided when setting up the IdP.

{% hint style="warning" %}
Removing organizations after IdP creation will not revoke access for SAML users who have previously authenticated with this IdP. However, new authentications will no longer include the removed organization. An IdP will always require at least one organization to be associated.
{% endhint %}

You have successfully configured SAML 2.0 for your balenaCloud Enterprise SSO. Your team can now access balenaCloud securely and seamlessly through the configured Identity Provider. For instructions on how your team can log in, refer to [Authenticating as a SAML/SSO User](./#authenticating-as-a-saml-user). If you encounter any issues or need further assistance, please contact our support team.

<figure><img src="../../../../summary/.gitbook/assets/idp-with-two-orgs.webp" alt=""><figcaption></figcaption></figure>

#### (Optional) Configure a Default Team

You can configure a default team for each organization to which SAML users will be automatically added upon authentication.

{% hint style="warning" %}
If you unlink the default team in the Identity Provider configuration, it will not remove team access for SAML users who have already authenticated. However, new SAML users will no longer be automatically added to this team.
{% endhint %}

## Authenticating as a SAML User

### Setting up a new SAML user

To log in using your enterprise SAML authentication, you must first have or [create](https://dashboard.balena-cloud.com/signup) a standard balenaCloud account using your company email address. Once logged in to this account, navigate to your [user preferences](https://dashboard.balena-cloud.com/preferences/details) and click "Enable" in the "Enterprise SSO" section.

<figure><img src="../../../../summary/.gitbook/assets/merge-account-accept.webp" alt=""><figcaption></figcaption></figure>

Next, provide the company `SSO Identifier` supplied by your balenaCloud organization administrator.

<figure><img src="../../../../summary/.gitbook/assets/add-sso-identifier-merge-modal.webp" alt=""><figcaption></figcaption></figure>

**Important:** By activating SAML, you are transferring your personal account to a company account. **This action is non-reversible**. The following changes will occur:

* **Your API keys will be deleted**
* You will no longer be able to create new API keys
* Ownership of your fleets and devices will be transferred to your company
* Your company can revoke your access at any time
* You will no longer be able to log in using `username` and `password`

You will still be subject to balenaCloud's [**Terms of Service**](https://www.balena.io/terms-of-service) and [**Master Service Agreement**](https://www.balena.io/master-agreement), with the following changes:

* Transfer of Responsibility: The ownership and management of your account will be transferred from you, as an individual user, to the designated company. This means that all rights and obligations under the Terms of Service and the Master Service Agreement will now be governed by the company.
* Legal Entity: The company will become the legal entity responsible for the account. All contractual obligations, liabilities, and benefits associated with the account will be transferred to the company.
* Terms and Conditions: The terms and conditions that apply to your account will remain the same. However, the company will now be responsible for ensuring compliance with these terms.
* Data and Privacy: Your personal data associated with the account will be transferred to the company. The company will be responsible for the protection and use of your data in accordance with the existing privacy policy.
* Consent: By proceeding with this transfer, you confirm that you have the authority to transfer the account to the company and that you consent to the changes outlined above.

By clicking the Enable button, you agree to the above terms. If you have any questions or concerns, please contact our support team before completing the transfer.

### Log in with a SAML account

Once you have enabled SAML on your account, you can log in using the Enterprise SSO login button or the login URL provided by your balenaCloud organization administrator, e.g., `https://dashboard.balena-cloud.com/saml/acme`.

<figure><img src="../../../../summary/.gitbook/assets/login-page.webp" alt=""><figcaption></figcaption></figure>

Once you have enabled SAML, you can no longer log in using a `username` and `password` combination and you must always use the SSO login method.

## FAQs

#### How do I set up an Identity Provider?

Each SAML Identity Provider (IdP) has its own unique implementation and terminology, which can result in variations in the configuration process. While it is not feasible to provide detailed configuration guidelines for every IdP, we have included example guides for two of the major providers: [Microsoft Entra ID (formerly Azure Active Directory)](idp-setup/microsoft-entra-saml-setup.md) and [Google Workspace SAML](idp-setup/google-workspace-saml-setup.md). These examples are designed to help you understand the necessary steps and how to configure your own provider effectively.

#### Can I use any identity provider with balena’s Enterprise SSO?

We support any identity provider as long as they are compliant with the SAML 2.0 protocol specification, for example, Okta. We have provided examples for [Microsoft Entra ID](idp-setup/microsoft-entra-saml-setup.md) (formerly Azure AD) and [Google Workspace](idp-setup/google-workspace-saml-setup.md) in our documentation. To setup your IdP, get the Federation Metadata XML as we have setup for Microsoft/Google IdP's and then follow the [instructions to link that IdP](./#link-a-saml-identity-provider) to balenaCloud's SSO.

#### Can I enforce SAML on all users in my organization?

It is not yet possible to enforce SAML authentication across your entire organization, but this is a feature we plan to add in the near future.

#### How can I use API keys if SAML users can't create them?

Currently, SAML authentication users cannot create API keys. If you require API keys for automated processes, we suggest creating a new non-SAML account to act as a "service" account. We plan to add the ability to create fleet and organization-level API keys as a follow-up feature to address this limitation.

#### How do I delete a SAML account?

To delete a SAML account, you need to use the [balena SDK](../../../../external-docs/sdk/node-sdk/latest.md). This step is only required if you intend to [delete your IdP](./#how-do-i-delete-an-identity-provider-in-balenacloud). **Removing the user from your IdP will block their access to balenaCloud**, but their current session will remain active for up to 12 hours after their last login.

{% hint style="danger" %}
Ensure that there is at least one non-SAML admin user in your organization before deleting all SAML users in the Identity Providers (IdPs). Failure to do so may result in being locked out of your organization.
{% endhint %}

If you really want to delete your SAML users, execute the following command:

```js
await sdk.pine.delete({
    resource: 'saml_account',
    options: {
        $filter: {
            remote_id: '<USER_EMAIL_GOES_HERE>'
        }
    }
})
```

**Important:** This action is irreversible and the account cannot be recovered once deleted.

#### How do I delete an Identity Provider in balenaCloud?

An IdP can only be removed once all associated SAML accounts are removed from the organizations connected to the IdP.

#### Why do I get an error when enabling 2FA on my SAML account?

If you continually get an error when trying to enable 2FA on your SAML user account, it is recommended to log out, re-login, and immediately try to enable 2FA again.
