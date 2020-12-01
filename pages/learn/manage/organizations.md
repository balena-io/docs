---
title: Organization management
---

# Organization management

Organizations in balenaCloud are based around the idea of easier collaboration and robust management of members and applications. The feature blends in with current workflows all the while improving what is already there.

## Sign up

{{> "general/signUp"}}


## Creating a new organization

To create a new organization, navigate to your balenaCloud dashboard and click the `Organizations` tab on the sidebar.

<img alt="Organizations tab" src="/img/common/app/organizations_tab.png" width="100%">

Next, click the `Create Organization` button to get the create organization modal below. Fill in the name of your organization and you are all set. This is also the page where you can check all organizations that you have access to. The user creating an organization is default given administrator access to that organization. Only administrators can delete an organization. Alternatively, anyone can leave an organization by clicking the `Leave organization` button on the organization summary page.

<img alt="Organizations tab" src="/img/common/app/create_organizations.png" width="100%">


## Managing roles & access in an organization

The roles inside the organization give granular control over access & visibility to the user. These roles can be assigned when inviting new members to your organization:

* **Administrator**: Full access to the organization, its applications, and all devices inside them. Administrators can set roles for incoming members, group them into teams, and provide application access to those teams with granular control over which roles are being assigned at the application level.

* **Member**: Members are provided with read-only access to the organization with explicit access to its applications and teams. Roles on the application level are assigned by administrators. Members have no visibility over other applications and teams which they haven't been given access to in the organization.


### Inviting members to an organization

Now, with your organization created let's invite some members. Only the administrator can invite users to an organization. To invite, click the `Manage members` button on the organization summary dashboard. On the page that opens, click the `Invite member` button to open the `Invite organization member` modal. Here, you can either add users with their email or with their balena username. After assigning them roles in your organization. Click `Add member` to invite the user to your organization.

<img alt="Invite Organization Member Modal" src="/img/common/app/" width="100%">

On basis of the role assigned, they will be able to access, see, and manage both apps and other members inside the organization. To change the roles of a member, navigate to the `Organization Members` tab in the sidebar and change the `Organization role` of the desired user by using the dropdown list against their username.

<img alt="Change Organization Member Roles" src="/img/common/app/" width="100%">


## Creating teams in your organization

With organizations, you can group your existing members to form teams as well. Teams are a robust way to manage members per their function and bulk provide access to applications as needed. Only administrators are allowed to create a team. To form a team, navigate to `Organization Teams` in the sidebar of the organization summary page. On the page that opens, click the `Create Team` button and enter the name of the team that is being created.

<img alt="Create Team in Organization" src="/img/common/app/" width="100%">

When the team is created, you can start adding members and applications to that specific team through the `Manage members` and `Manage applications` buttons respectively.

<img alt="Organization Team Summary" src="/img/common/app/" width="100%">


## Creating new applications under your organization

With members invited to the organization, let's get started on creating new applications under an organization. Navigate to the `Organization Applications` tab in the sidebar to find the `Create application` button for creating a new application under your organization. Learn more about creating an application from the [getting started](getting-started) guide.

<img alt="New Application under Organization" src="/img/common/app/" width="100%">

### Moving existing applications to an organization

Moving an existing application from your personal or any other organization to another organization is a common task that can be accomplished by [transferring ownership](transferring-ownership) of your application.

<img alt="Transfer Ownership" src="/img/common/app/" width="100%">

### Providing access to multiple applications

With organizations, providing access to individual members or teams becomes a hassle-free process. There are mainly 3 application-level roles that can be assigned, [`Developer`](developer), [`Observer`](observer) or [`Operator`](operator). Administrator default to [`Owner`](owner) role to all applications under a organization and are the only ones that can provide access to applications. Administrators won't be listed in members page of an organization.  

- **Providing access to members** - Once you are done inviting members, click the username you want to provide access to from the `Members` list. When the member page opens, click `Manage applications` to see all applications available under the org. From there, click the `Add applications to member` button to add the member to one or more applications available under the org with the desired role that you want to assign.

<img alt="Provide Member Access to Applications" src="/img/common/app/" width="100%">

- **Providing access to teams** - Once you are done creating a team, navigate to the team you want to provide access in the `Organization Teams` tab.  Next, click the `Manage applications` button on the team page to see all applications available under the org. From there, click the `Add applications to team` button to add the team to one or more applications available under the org with the desired roles that you want to assign. All members of that team will be provided access to the selected application with the specified role per application.

<img alt="Provide Team Access to Applications" src="/img/common/app/" width="100%">


## Users as an organization - Sharing your apps just became hassle-free

With organizations being a crucial feature for collaboration, we wanted the same for individual users. Each user in balenaCloud has their own "personal" organization named after their username. This "personal organization" with all applications and devices under it are private until explicitly shared by the user.

Personal organizations can be used to develop & test applications. When ready, these applications can be shared with other members or teams by inviting users to your organization. A personal organization is no different from any other organization that you can create and works in the same way. With this, each user is empowered to collaborate, manage and work on their fleets more easily & securely.

### I've got an app, how do I collaborate with others?

If you like to collaborate with other users on a single app, you can refer to adding an [application member](add-application-member). After adding them to your application, you will start to see them in your organization as a member with access to only the application you explicitly provided them access to. You can review the access of each member in your organization by clicking the username of the member in the `Members` list on the Organization summary. With your view as an administrator, you can check what teams and applications the member has access to.

[getting-started]:/installing/gettingStarted
[transferring-ownership]:learn/manage/actions/#transfer-application-ownership
[developer]:learn/manage/account/#developer
[owner]:learn/manage/account/#owner
[observer]:learn/manage/account/#observer
[operator]:learn/manage/account/#operator
[add-application-member]:learn/manage/account/#add-an-application-member
