# Fleet members

BalenaCloud offers the ability to collaborate with other users on the platform by inviting members to your fleets, apps or blocks and assigning them a varying degree of access as per your requirement using Member types. To invite members to your organization, refer to [organization management](organizations.md#granting-access-to-fleets).

When a fleet needs to be shared with more than one user, the fleet owner can add new members. With paid accounts, it's possible to assign a level of access for a new member, based on the following types:

### Member types

| Member Type   | [Add members](organizations.md#managing-roles-and-access-in-an-organization) | Delete App | Add/Remove device | Manage provisioning keys | [Device specific actions](../manage/actions.md) | [Tags](../manage/filters-tags.md) | [Variables](../manage/variables.md) | [SSH access](../manage/ssh-access.md) | [Push](../deploy/deployment.md) | [Configuration](../manage/configuration.md) | [Fleet specific actions](../manage/actions.md) |
| ------------- | :--------------------------------------------------------------------------: | ---------: | ----------------: | -----------------------: | ----------------------------------------------: | --------------------------------: | ----------------------------------: | ------------------------------------: | ------------------------------: | ------------------------------------------: | ---------------------------------------------: |
| Administrator |                                      Yes                                     |        Yes |               Yes |                      Yes |                                             Yes |                               Yes |                                 Yes |                                   Yes |                             Yes |                                         Yes |                                            Yes |
| Developer     |                                      No                                      |         No |               Yes |                      Yes |                                             Yes |                               Yes |                                 Yes |                                   Yes |                             Yes |                                         Yes |                                            Yes |
| Operator      |                                      No                                      |         No |               Yes |                      Yes |                                             Yes |                               Yes |                                 Yes |                                   Yes |                              No |                                          No |                                             No |
| Observer      |                                      No                                      |         No |                No |                       No |                                              No |                                No |                                  No |                                    No |                              No |                                          No |                                             No |

#### Administrator

A new fleet in balenaCloud can only be created by an [administrator](organizations.md#managing-roles-and-access-in-an-organization) of an organization. Administrators are the only users who can add other fleet members or delete the fleet. Learn more about the [administrator role](organizations.md#managing-roles-and-access-in-an-organization) in an organization.

#### Observer

Observers are given read-only access to the fleet and its devices. They are not able to modify, add, or remove any devices, nor are they able to perform device actions. This role can only be assigned by fleet owners on paid plans.

#### Operator

Operators have all the access given to observers, plus the ability to manage a fleet's devices. This means operators can add and remove devices, generate & revoke provisioning API keys, perform device actions, and modify device tags, metadata, and environment variables. Operators also have full [SSH access](../manage/ssh-access.md) to the fleet's devices. This role can only be assigned by fleet owners on paid plans.

#### Developer

Developers are given, in addition to the access provided to operators, the ability to manage fleet software. This includes creating new releases, modifying fleet variables, and downloading balenaOS images. This role is the closest to a fleet owner—developers can do everything owners can except for deleting the fleet or adding new members. The Developer role can be assigned by fleet owners on free or paid accounts.

### Add a fleet member

To add a new member to your fleet, click on the _Members_ tab of the fleet:

<figure><img src="../../.gitbook/assets/members_tab (1).webp" alt=""><figcaption></figcaption></figure>

This brings up a list of all fleet members, if any have been assigned. Click on the _Add member_ button in the top left:

<figure><img src="../../.gitbook/assets/add_member (1).webp" alt=""><figcaption></figcaption></figure>

The _Add member_ dialog has a dropdown with descriptions of the member types, as well as information about which types are available based on your billing plan. Choose a level of access, then enter the username or email address of the new member:

<figure><img src="../../.gitbook/assets/member_dialog (1).webp" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
Fleet members must have already signed up for a balena account before they can be added to a fleet.
{% endhint %}

After you click _Add_, you will see the username of the new member in the list. From here, you can edit access levels or remove the user if necessary:

<figure><img src="../../.gitbook/assets/member_list (1).webp" alt=""><figcaption></figcaption></figure>

All users that have been added to a fleet will see that fleet in their dashboard, with an indicator to designate it has been shared by the fleet owner:

<figure><img src="../../.gitbook/assets/shared_app (1).webp" alt=""><figcaption></figcaption></figure>

Fleet members will have the option to remove themselves from a fleet by clicking on the members tab, selecting the checkbox by their name from the member list, clicking on the _Modify_ button, and selecting _Delete member_.

{% hint style="danger" %}
If you remove your member access to a fleet, you will not be able to undo the action. Only the fleet owner will be able to restore your access.
{% endhint %}
