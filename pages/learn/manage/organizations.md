---
title: Organization management
---

# Organization management

In balenaCloud, users organize around and collaborate in _organizations_. An organization is a group of users, teams and applications, and is managed by one or more organization administrators. An organization can have any number of members that can be grouped into teams and granted varying levels of access to its applications according to their assigned role.

Administrators are implicitly granted the ability to perform any possible action to the organization and its associated resources. This includes inviting and removing members, managing applications, teams and billing.

Each user can create or be a member of an unlimited number of organizations. An organization is automatically created upon user registration, and that user is assigned as its administrator. This organization is managed like any other, but currently cannot be deleted.

Billing applies to each organization separately. Administrators can at any time upgrade an organization to the appropriate billing plan as needed.

## What can you do with organizations?

With organizations, you can:

* Invite users to an organization as members, and group them in teams.
* Manage access control at the team level, associating applications with teams.
* Provide application access to teams or individual members in bulk.
* Granular access control at the application level with ability to assign, modify or revoke user roles when needed.

## Creating a new organization

To create a new organization, navigate to your balenaCloud dashboard and click the `Organizations` tab on the sidebar.

<img alt="Organizations tab" src="/img/common/app/organizations_tab.png">

Next, click the `Create Organization` button to get the create organization modal below. Fill in the name of your organization, and you are all set. This is also the page where you can check all organizations that you have access to. The user creating an organization is, by default, given administrator access to that organization. 

<img alt="Organizations tab" src="/img/common/app/create_organization.png" width="100%">

Only administrators can delete an organization. Alternatively, anyone can leave an organization by clicking the `Leave organization` button on the organization summary page.

## Managing roles & access in an organization

The roles inside the organization give granular control over access & visibility to the user. These roles can be assigned when inviting new members to your organization:

* **Administrator**: Full access to the organization, its applications, and all devices inside them. Administrators can set roles for incoming members, group them into teams, and provide application access to those teams with granular control over which roles are being assigned at the application level.

* **Member**: Members are provided with read-only access to an organization with explicit access to its applications and teams. Administrators assign roles on the application level. Members have no visibility over other applications and teams that they haven't been assigned access to.

### Inviting members to an organization

With your organization created, let's invite some members. Only the administrator can invite users to an organization. To invite, click the `Manage members` button on the organization summary dashboard. On the page that opens, click the `Invite member` button to open the `Invite organization member` modal. Here, you can either add users with their email address or with their balena username after assigning them roles in your organization. Click `Add member` to invite the user to your organization.

<img alt="Invite Organization Member Modal" src="/img/common/app/invite_org_member.png">

Depending on the role assigned, they will be able to access, see, and manage both apps and other members inside the organization. To change a member's role, navigate to the `Organization Members` tab in the sidebar. Next, change the `Organization role` of the desired user using the dropdown list against their username.

<img alt="Change Organization Member Roles" src="/img/common/app/modify_org_roles.png" width="100%">


## Creating teams in your organization

Organization members can be grouped into teams. Teams provide a way to manage members according to their function. Only administrators can create and delete teams, and manage their members.

To create a team, navigate to the `Organization Teams` page via the sidebar and click the `Create Team` button to enter a name for the team.

<img alt="Create Team in Organization" src="/img/common/app/create_team.png" width="100%">

Once the team is created, add members and grant the team access to applications by clicking on the `Manage members` and `Manage applications` buttons, respectively.

<img alt="Organization Team Summary" src="/img/common/app/org_team_summary.png" width="100%">


## Creating new applications under your organization

With members invited to the organization, let's get started on creating new applications under an organization. Navigate to the `Organization Applications` tab in the sidebar to find the `Create application` button for creating a new application under your organization. Learn more about creating an application from the [getting started](getting-started) guide.

<img alt="New Application under Organization" src="/img/common/app/create_app_under_org.png" width="100%">

### Moving existing applications to an organization

Moving an existing application to an organization is a common task accomplished by [transferring ownership](transferring-ownership) of your application.

<img alt="Transfer Ownership" src="/img/common/app/transfer_ownership.png" width="100%">

### Granting members access to applications

Organization administrators can grant access to applications either directly for individual members or for teams. There are three application-level roles that can be assigned, [`Developer`](developer), [`Observer`](observer), and [`Operator`](operator), which grant varying levels of access. Administrators are implicitly granted full access to all applications of the organization.

- **Granting access to applications for individual members** - Once you are done inviting members, click the username of the member you want to provide access to from the `Members` list. When the member's summary page opens, click `Manage applications` to see all applications available under the org. From there, click the `Add to applications` button to add the member to one or more applications available under the org with the desired role.

<img alt="Provide Member Access to Applications" src="/img/common/app/application_access_to_member.png" width="100%">

- **Granting access to applications for teams** - Teams and their members can be granted access to specific applications from the `Organization Teams` tab.  Click the `Manage applications` button on the team page to see all applications available under the org. From there, click the `Add applications to team` button to add the team to one or more applications available under the org with the desired roles. All members of that team will be provided access to the selected application(s) with the specified role per application.

<img alt="Provide Team Access to Applications" src="/img/common/app/application_access_to_team.png" width="100%">



### I've got an app. How do I collaborate with others?

To collaborate with other users on a single app, you can refer to adding an [application member](add-application-member) using their email address or username. After adding the user, you will find them in your organization added as a member as well. Member will only have access to those application(s) you explicitly provide them access to. You can review each member's access by clicking the member's username in the `Members` list present on the organization summary page. On the page with your view as an administrator, you can check what teams and applications the member has access to.

[getting-started]:/installing/gettingStarted
[transferring-ownership]:learn/manage/actions/#transfer-application-ownership
[developer]:learn/manage/account/#developer
[owner]:learn/manage/account/#owner
[observer]:learn/manage/account/#observer
[operator]:learn/manage/account/#operator
[add-application-member]:learn/manage/account/#add-an-application-member
