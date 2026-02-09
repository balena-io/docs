---
title: Organization management
---

# Organization management

In balenaCloud, users manage fleets and collaborate in _organizations_. An organization is a group of members, teams, and fleets that is managed by one or more organization administrators. An organization can have any number of members that can be grouped into teams and granted varying levels of access to its fleets according to their assigned role.

Administrators are implicitly granted the ability to perform any possible action to the organization and its associated resources. Actions include inviting and removing members, managing fleets, teams, and billing of the organization. General members have much more limited administration capabilities and rely on Administrators to place them in teams, grant access to fleets, and more.

Each user can create or be a member of an unlimited number of organizations. A organization is automatically created upon user registration, and the user is assigned as its administrator. This organization is named after the user's balenaCloud username and is managed like any other but _currently cannot be deleted_.

{% hint style="warning" %}
Billing applies to each organization separately. Administrators can upgrade an organization at any time to the appropriate billing plan as needed.
{% endhint %}

## What can you do with organizations?

With organizations, you can:

* Invite users to an organization as members, and group them in teams.
* Manage access control at the team level, associating fleets with teams.
* Grant fleet access to teams or individual members in bulk.
* Granular access control at the fleet level to assign, modify or revoke user roles when needed.

## Creating a new organization

To create a new organization, navigate to your balenaCloud dashboard and click the `Organizations` tab on the sidebar.

<figure><img src="../../.gitbook/assets/organizations_tab (1).webp" alt=""><figcaption></figcaption></figure>

Next, click the `Create Organization` button to get the create organization modal below. Fill in the name of your organization, and you are all set. This is also the page where you can check all organizations that you have access to. The user creating an organization is, by default, given administrator access to that organization.

<figure><img src="../../.gitbook/assets/create_organization (1).webp" alt=""><figcaption></figcaption></figure>

Only administrators can delete an organization. Alternatively, anyone can leave an organization by clicking the `Leave organization` button on the organization summary page.

## Managing roles & access in an organization

The roles inside the organization give granular control over access & visibility to the user. These roles can be assigned when inviting new members to your organization:

* **Administrator**: Full access to the organization, its fleets, and all devices inside them. Administrators also have access to organization's invoices, payment methods, and subscription plan. Administrators can assign roles for incoming members, group them into teams, and grant application access to those teams with granular control over which roles are being assigned at the fleet level.
* **Member**: Members are granted read-only access to an organization with explicit access to its fleets and teams. Administrators assign roles on the fleet level. Members have no visibility over other fleets and teams that they haven't been assigned access to.

### Inviting members to an organization

With your organization created, let's invite some members. Only the administrator can invite users to an organization. To invite, click the `Manage members` button on the organization summary dashboard. On the page that opens, click the `Invite member` button to open the `Invite organization member` modal. Here, you can either add users with their email address or with their balena username after assigning them roles in your organization. Click `Add member` to invite the user to your organization.

<figure><img src="../../.gitbook/assets/invite_org_member (1).webp" alt=""><figcaption></figcaption></figure>

Depending on the role assigned, they can access and manage both apps and other members inside the organization. To change a member's role, navigate to the `Members` tab in the sidebar. Next, click the checkbox next to the member's name, and then go over to the `Actions` button, click that, and choose `Change membership`. Change the `Organization role` of the desired user using the dropdown list against their username.

<figure><img src="../../.gitbook/assets/modify_org_roles (1).webp" alt=""><figcaption></figcaption></figure>

## Creating teams in your organization

Organization members can be grouped into teams. Teams provide the means to manage members according to their function effectively. Only administrators can create, modify or delete teams.

To create a team, navigate to the `Teams` page via the sidebar and click the `Create Team` button. In the create team modal, enter the team name being created and click the `Create Team` button.

<figure><img src="../../.gitbook/assets/create_team (1).webp" alt=""><figcaption></figcaption></figure>

Once the team is created, add members or grant the team access to fleets by clicking on the `Manage members` and `Manage fleets` buttons, respectively.

<figure><img src="../../.gitbook/assets/org_team_summary (1).webp" alt=""><figcaption></figcaption></figure>

## Creating new fleets under your organization

With members invited to the organization, let's get started on creating new fleets under an organization. Navigate to the `fleets` tab in the sidebar (under the correct Organization if you have multiple ones) to find the `Create fleet` button for creating a new fleet under your organization. Learn more about creating a fleet from the [getting started](../../../getting-started/) guide.

<figure><img src="../../.gitbook/assets/create_app_under_org (1).webp" alt=""><figcaption></figcaption></figure>

### Moving existing fleets to an organization

Moving an existing fleet to an organization is a common task accomplished by [transferring ownership](../manage/actions.md#transfer-fleet-ownership) of your fleet.

<figure><img src="../../.gitbook/assets/transfer_ownership (1).webp" alt=""><figcaption></figcaption></figure>

### Granting access to fleets

Organization administrators can grant access to fleets either directly to individual members or to teams. There are three fleet-level roles that can be assigned, [`Developer`](../../../learn/accounts/fleet-members/#developer), [`Observer`](../../../learn/accounts/fleet-members/#observer), and [`Operator`](../../../learn/accounts/fleet-members/#operator), which grant varying levels of access. Administrators are implicitly granted full access to all fleets of the organization.

* **Granting individual members access to fleets** - Once you are done inviting members, click the username of the member you want to grant access from the `Members` list. On the member's summary page, click `Manage fleets`. From there, click the `Add to fleets` button to add the member to one or more fleets with the desired role.
* **Granting teams access to fleets** - Teams and their members can be granted access to specific fleets from the `Organization Teams` tab. Click the `Manage fleets` button on the team summary page. From there, click the `Add fleets to team` button to add the team to one or more fleets available under the org with the desired roles. All team members will be granted access to the selected application(s) with the specified role per fleet.

<figure><img src="../../.gitbook/assets/application_access_to_team (1).webp" alt=""><figcaption></figcaption></figure>

Alternatively to **remove access** to fleets, for individual members or teams, you can navigate back to the respective summary page of the member or team and click the `Manage fleets` button there. From the fleet list, check the checkboxes for the relevant fleets and click the `Remove access` button at the top of the page.

<figure><img src="../../.gitbook/assets/remove_access_applications (1).webp" alt=""><figcaption></figcaption></figure>

### I've got a fleet. How do I collaborate with others?

To collaborate with other users on a single fleet, you can refer to adding a [fleet member](fleet-members.md#add-a-fleet-member) using their email address or username. After adding the user, you will find them in your organization added as a member as well. Members will only have access to those application(s) in the organization that you explicitly grant them access to. You can review each member's access by clicking the member's username in the `Members` list present on the organization summary page. On the page with your view as an administrator, you can check what teams and fleets the member has access to.
