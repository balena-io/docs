# Enterprise Single Sign-On (SSO)

__Note:__ This feature is currently only available on [Enterprise plans](https://www.balena.io/pricing).

BalenaCloud Enterprise Single Sign-On (SSO) using SAML (Security Assertion Markup Language) allows organizations to manage user access and authentication through their existing identity providers (IdP). This integration simplifies the login process for users by enabling them to use their corporate credentials to access BalenaCloud services. By leveraging SAML, enterprises can enhance security, streamline user management, and ensure compliance with their internal policies and procedures.

Configuring an identity provider (IdP) as a login method necessitates setup within both balenaCloud and the identity provider itself. For detailed instructions on the required configurations, please refer to our example [IdP specific documentation](#how-to-setup-an-identity-provider).

## Link a SAML Identity Provider

To enable Single Sign-On (SSO) for BalenaCloud organizations, it is necessary to establish a connection with your external Identity Provider (IdP). This process assumes that you have already configured a SAML 2.0 IdP and possess an XML certificate ready for upload. If you have not yet set up an IdP, please refer to the section [How to Setup an Identity Provider](#how-to-setup-an-identity-provider) for guidance.

1. To configure an Identity Provider, you must be logged in as the `Administrator` of an organization subscribed to an [Enterprise plan](https://www.balena.io/).
2. From the dashboard navigate to and select [Identity Provider](https://dashboard.balena-cloud.com/identity-provider) from the left-hand menu.
3. Click on the Add Identity Provider button and upload or Enter IdP details.
<!-- TODO: update to latest screenshot -->
<img alt="Add Identity Provider form" src="/img/common/saml/add-idp-form-filled.png" width="100%">

In order to create a Identity Provider (IdP) entity, we first need to select a unique SSO identifier. For instance, if your organization is `ACME Corp`, you might choose `acme`. This identifier must be unique within balenaCloud and can only include lowercase letters (`a-z`), numbers (`0-9`), hyphens (`-`), and underscores (`_`). This identifier will be part of the URL that your team will use to log in.

After selecting an identifier, you need to configure the `Entry Point URL`, `Issuer (Entity ID)`, and `Public Certificate`. This can be accomplished by either uploading the XML metadata files provided by your IdP or manually entering the details into the form.

### Associate Organizations

Specify the organizations to which SAML users will be automatically added upon successful authentication. Only organizations subscribed to an [Enterprise plan](https://www.balena.io/) will appear in the list of selectable organizations. At least one organization must be provided when creating the IdP.

__Note:__ Removing organizations after IdP creation will not revoke access for SAML users who have previously authenticated with this IdP. However, new authentications will no longer include the removed organization.

You have successfully configured SAML 2.0 for your balenaCloud Enterprise SSO. Your team can now access the platform securely and seamlessly through the configured Identity Provider. For instructions on how your team can log in, refer to [Authenticating as a SAML/SSO User](#authenticating-as-a-samlsso-user). If you encounter any issues or need further assistance, please contact our support team.
<!-- TODO: Update to latest screenshot -->
<img alt="Fully configured IdP with two Orgs associated" src="/img/common/saml/idp-with-two-orgs.png" width="100%">

### (Optional) Configure a Default Team

You can configure a default team for each organization to which SAML users will be automatically added upon authentication.

__Note__: If you unlink the default team in the Identity Provider configuration, it will not remove team access for SAML users who have already authenticated. However, new SAML users will no longer be automatically added to this team.

## Authenticating as a SAML User

### Setting up a new SAML user

To log in using your enterprise SAML authentication, you must first have or [create](https://dashboard.balena-cloud.com/signup) a standard balenaCloud account using your company email address. Once logged in to this account, navigate to your [user preferences](https://dashboard.balena-cloud.com/preferences/details) and click "Merge Account".
<!-- TODO: Update to latest screenshot -->
<img alt="User preferences with merge account button highlighted" src="/img/common/saml/merge-account-accept.png" width="100%">

Next, provide the company `SSO Identifier` supplied by your balenaCloud organization administrator.
<!-- TODO: Update to latest screenshot -->
<img alt="Merge Account modal with SSO identifier filled in." src="/img/common/saml/add-sso-identifier-merge-modal.png" width="60%">

__Important:__ By activating SAML, you are transferring your personal account to a company account. The following changes will occur:
* **Your API keys will be deleted**
* You will no longer be able to create new API keys
* Ownership of your fleets and devices will be transferred to your company
* Your company can revoke your access at any time
* You will no longer be able to log in using `username` and `password`

You will still be subject to balenaCloud's **terms of service** and **master service agreement**, with the following changes:
* Transfer of Responsibility: The ownership and management of your account will be transferred from you, as an individual user, to the designated company. This means that all rights and obligations under the Terms of Service and the Master Service Agreement will now be governed by the company.
* Legal Entity: The company will become the legal entity responsible for the account. All contractual obligations, liabilities, and benefits associated with the account will be transferred to the company.
* Terms and Conditions: The terms and conditions that apply to your account will remain the same. However, the company will now be responsible for ensuring compliance with these terms.
* Data and Privacy: Your personal data associated with the account will be transferred to the company. The company will be responsible for the protection and use of your data in accordance with the existing privacy policy.
* Consent: By proceeding with this transfer, you confirm that you have the authority to transfer the account to the company and that you consent to the changes outlined above.

By clicking the "Merge account" button, you agree to the above terms. If you have any questions or concerns, please contact our support team before completing the transfer.

### Log in with a SAML account

Once you have enabled SAML on your account, you can log in by following the "Enterprise SSO" login button or the login URL provided by your balenaCloud organization administrator, e.g., `https://dashboard.balena-cloud.com/saml/acme`.
<!-- TODO: Update to latest screenshot -->
<img alt="Login page with Enterprise SSO login highlighted." src="/img/common/saml/login-page.png" width="60%">

__Warning:__ Once you have enabled SAML, you can no longer log in using a `password` and should always use the SSO login method.

## How to set up an Identity Provider

Each SAML Identity Provider (IdP) has its own unique implementation and terminology, which can result in variations in the configuration process. While it is not feasible to provide detailed configuration guidelines for every IdP, we have included example guides for two of the major providers: Microsoft Entra ID (formerly Azure Active Directory) and Google Workspace SAML. These examples are designed to help you understand the necessary steps and how to configure your own provider effectively.

### Microsoft Entra ID (formerly Azure Active Directory)

This section provides step-by-step instructions for setting up SAML 2.0 with Microsoft Entra ID (formerly Azure AD) for use with balenaCloud. Follow the steps below and refer to the accompanying screenshots for visual guidance.

#### Create a New Enterprise Application
1.	Go to: [Microsoft Entra ID Home](https://entra.microsoft.com/#home).
2.	On the left hand menu expand `Identity > Applications > Enterprise Applications`.
4.	Select Enterprise Applications.
5.	Click the `+ New application` button.
<img alt="Create new enterprise app in Microsoft entra ID" src="/img/common/saml/microsoft-entra-id/create-new-app.png" width="100%">

#### Create Your Own Application

1.	You should now be presented with a gallery of enterprise apps. Click the `+ Create your own application button` at the top left.
2.	In the right-hand form that opens, give your app a name.
3.	Leave the default option selected.
4.	Click `Create`.
<img alt="Create a custom app" src="/img/common/saml/microsoft-entra-id/create-your-own-application.png" width="100%">

#### Configure Single Sign-On

1.	In the left menu, click Single sign-on.
2.	Select SAML.
<img alt="Configure SSO" src="/img/common/saml/microsoft-entra-id/configure-single-sign-on.png" width="100%">

#### Basic SAML Configuration

1.	In the Basic SAML Configuration section, click `Edit`.
2.	Paste your Entity ID and Sign-on URL. To obtain this, you must first decide on a “SSO Identifier” for your enterprise, e.g. `acme`.
* Identifier: https://api.balena-cloud.com/auth/saml/`< sso-identifier >`
* Reply URL: https://api.balena-cloud.com/auth/saml/`< sso-identifier >`/callback
3.	Click Save.
<!-- TODO: update screenshots with production URLS -->
<img alt="Configure SSO" src="/img/common/saml/microsoft-entra-id/basic-saml-configuration.png" width="100%">

#### Set Unique User Identifier

1.	On the “Set up Single Sign-On with SAML” page, click `Edit` on the Attributes & Claims section.
2.	On the Unique User Identifier row, click it.
3.	Change the Source attribute field to `user.mail`.
4.	Click Save.
<img alt="Edit Unique User Identifier row" src="/img/common/saml/microsoft-entra-id/unique-user-identifier.png" width="100%">
<img alt="Change source attribute" src="/img/common/saml/microsoft-entra-id/change-source-attribute.png" width="100%">

#### Assign Users and Groups

1.	Go to Users & Groups in the Manage section of the SAML app.
2.	Add the users or groups you want to assign access to the SAML app.
3.	Click Assign at the bottom left.
<img alt="Assign Users or Groups" src="/img/common/saml/microsoft-entra-id/assign-users-and-groups.png" width="100%">

#### Download Federation Metadata XML

1.	On your SAML-based Sign-on app page, look for the Download link for Federation Metadata XML.
2.	Download this XML file to use later in [setting up your SAML IdP in balenaCloud](#link-a-saml-identity-provider).
<img alt="Download XML" src="/img/common/saml/microsoft-entra-id/download-metadata-xml.png" width="100%">

### Google Workspace SAML

This guide will walk you through the steps to create a SAML Identity Provider (IdP) using Google Workspace to integrate with balenaCloud.

##### Prerequisites

Access to a Google Workspace admin account capable of creating apps and users for the organization.

##### Steps to Create a SAML Identity Provider in Google Workspace

1.	Access the Google Admin Console
	* Go to [Google Admin Console Apps](https://admin.google.com/ac/apps/unified) using your Google Workspace admin account.
2.	Create a New Custom SAML App
	* Click on Add app.
	* Select Add custom SAML app.
3.	Configure the SAML App
	* Name Your App: Provide a meaningful name for the SAML app (e.g., “balenaCloud SSO”).
	* Download the Metadata: After naming your app, download the metadata file provided by Google. This file will be used later to set up the IdP in balenaCloud.
4.	Set Up Service Provider Details
	* ACS URL: Fill in the Assertion Consumer Service (ACS) URL with:
    ```
    https://dashboard.balena-cloud.com/saml/acme/callback
    ```
    Replace `acme` with the name you will give your IdP in balenaCloud.

	* Entity ID: Fill in the Entity ID with:
    ```
    https://dashboard.balena-cloud.com/saml/acme
    ```
    Again, replace `acme` with the name you will give your IdP.
5.	Skip Attribute Mapping
	* Ignore any mapping configuration. Currently, balenaCloud does not make use of these mappings.
6.	Enable the SAML App
	* In the Service Status section, ensure the new SAML app is set to `ON` for everyone or specific groups. This will those users in your organization access to login to balenaCloud via SSO.

##### Final Steps
Finally, you should a custom SAML app in your Google Workspace that looks similar to this:
<img alt="Download XML" src="/img/common/saml/google-workspace-saml-app-final.png" width="100%">

Upload Metadata to balenaCloud: Use the metadata file downloaded from Google Workspace to complete the IdP setup in balenaCloud. Follow the instructions provided in balenaCloud’s SAML configuration page to upload the metadata and finalize the integration.

## FAQs:

#### Can I enforce SAML on all users in my organization?
It is not yet possible to enforce SAML authentication across your entire organization, but this is a feature we plan to add in the near future.

#### How can I use API keys if SAML users can't create them?
Currently, SAML authentication users cannot create API keys. If you require API keys for automated processes, we suggest creating a new non-SAML account to act as a "service" account. We plan to add the ability to create fleet and organization-level API keys as a follow-up feature to address this limitation.

<!-- NOTE: we link to this FAQ in the dashboard -->
#### How do I delete a SAML account?
To delete a SAML account, you must use the `sdk`. Execute the following command: `sdk.models.pine.delete({ resource: 'saml_account'})` for the specific user. **Important:** This action is irreversible and the account cannot be recovered once deleted.

#### How do I delete an Identity Provider in balenaCloud?
An IdP can only be removed once all associated SAML accounts are removed from the associated organizations.

#### Why do I get an error when enabling 2FA on my SAML account?
If you continually get an error when trying to enable 2FA on your SAML user account, it is recommended to log out, re-login, and immediately try to enable 2FA again.