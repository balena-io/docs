---
title: Apps
---

# Develop with Apps

{% hint style="warning" %}
Apps are an experimental feature. To enable them, go to _Preferences → Experimental Options_ and make sure "Display Apps" is checked.
{% endhint %}

An App is a multi-container resource which can be deployed to multiple fleets. Apps are intended to offer standalone functionality and can be constructed entirely or partially from [blocks](blocks.md). Apps are designed to facilitate functionality sharing between both public and private fleets. They can be published on [balenaHub](https://hub.balena.io/) in order to allow other users outside of your balenaCloud organization to install and utilize them on their own fleets. Apps can exist independently to solve for a complete use case.

## What can Apps be used for?

Apps are a way to group together multiple containers that are deployed to a fleet of devices together in order to perform a complete function. They differ from blocks since they are intended to work standalone and do not require any further development or external containers to function for their use case.

Apps exist today for those developers who wish to share what they have built on [balenaHub](https://hub.balena.io/) in order to enable deployment to other fleets owned by other people using balenaCloud. Apps are created within balenaCloud, releases are pushed in the exact same way as with fleets, and then they can be [marked public](apps.md#publishing-an-app-on-balenahub) to publish them on balenaHub and share with others. In this manner, one App can be installed on multiple fleets.

An example of an App constructed in this way is [balenaSense](https://github.com/balenalabs/balena-sense). BalenaSense is built from the [dashboard](https://github.com/balenablocks/dashboard) and [connector](https://github.com/balenablocks/connector) blocks along with some additional containers. An App such as balenaSense could be deployed to a fleet to create an air-quality monitoring network, for example.

## Creating Apps

If you’ve previously worked with fleets on balenaCloud, the process of creating an App and [deploying](../deploy/deployment.md) a release is very similar.

In order to create your own App, the code needs to be in a public GitHub repository. When an App is deployed, the latest code is pulled from GitHub. This will change in the future as and when we add support for private apps. The App has to include a [balena.yml](../deploy/deploy-with-balena-button.md#balena.yml-configuration-file) file in the root directory of the project. Here's a balena.yml file of [balenaDash](https://github.com/balenalabs/balena-dash) for reference:

```yaml
name: balenaDash
description: >-
  Raspberry Pi-powered digital signage or website viewer, remotely accessible
  from anywhere.
type: sw.application
assets:
  repository:
    type: blob.asset
    data:
      url: 'https://github.com/balenalabs/balena-dash'
  logo:
    type: blob.asset
    data:
      url: >-
        https://raw.githubusercontent.com/balenalabs/balena-dash/master/assets/logo.png
data:
  applicationConfigVariables:
    - BALENA_HOST_CONFIG_gpu_mem: 128
    - BALENA_HOST_CONFIG_dtoverlay: 'vc4-fkms-v3d'
  applicationEnvironmentVariables:
    - SHOW_CURSOR: 0
    - CONTROL_TV: 0
    - ENABLE_GPU: 0
    - KIOSK: 1
    - PERSISTENT: 1
    - PORTAL_SSID: balenaDash
    - PORTAL_PASSPHRASE: balenaDash
    - ACTIVITY_TIMEOUT: 600
    - LAUNCH_URL: ''
    - ROTATE_DISPLAY: normal
    - WINDOW_POSITION: '0,0'
    - LOCAL_HTTP_DELAY: 0
    - FBCP_DISPLAY: ''
  defaultDeviceType: raspberrypi4-64
  supportedDeviceTypes:
    - raspberrypi4-64
    - fincm3
    - raspberrypi3
    - raspberrypi3-64
    - intel-nuc
    - genericx86-64-ext
    - raspberrypi400-64
version: 2.0.0
```

Next, navigate to the Apps tab in the sidebar and click the `Create App` button in the balenaCloud dashboard. Fill the details for your App in the modal, and click `Create new app` button to create your App. Next, we need to push a new release to your newly created App on balenaCloud. If you are new to this, then follow the [Getting Started](../../../getting-started/) guide.

## Publishing an App on balenaHub

By default, Apps that you create within the balenaCloud dashboard are private and only accessible by the owner along with any other teams or members that you explicitly grant access to. When you are ready to release, head to the Settings tab in the sidebar and add your App’s GitHub repository to the Repository URL section. Next, toggle the App visibility button to on for your App to be visible on balenaHub. You’re free to toggle the visibility on and off as necessary at any time.

<figure><img src="../../../summary/.gitbook/assets/visibility-toggle (2).webp" alt=""><figcaption></figcaption></figure>

Apps marked with visibility set to ‘on’ in the dashboard will be made available as another resource for the community on balenaHub. Users can deploy Apps from balenaHub to their own fleets managed in their own balenaCloud accounts using the `Deploy` button with each App.

## Deploying Apps from balenaHub

<figure><img src="../../../summary/.gitbook/assets/deploy-from-balenahub (2).webp" alt=""><figcaption></figcaption></figure>

When the deploy button on balenaHub is used, the balenaCloud builder will fetch the latest source from the linked GitHub repository and create a new build for the chosen fleet. This process uses the [Deploy with balena](../deploy/deploy-with-balena-button.md) workflow in order to guide users through the process of creating/signing in to a balenaCloud account, creating a fleet and deploying the App.

## Support access

If you require assistance with an App and have contacted balena for support, agents may ask you to ‘enable support access’ for the App. This can be achieved via toggling the `Support access` setting, found within the settings page to on.

Once enabled, for security reasons, the support access toggle will revert back to ‘off’ at the time specified.

<figure><img src="../../../summary/.gitbook/assets/enable-support-access (2).webp" alt=""><figcaption></figcaption></figure>

## Release management

To deploy new releases of your App, you can use the `balena push` command using the balenaCLI. The Releases tab in the sidebar will show the list of all releases of your App.

An App can be pinned to a specific release which will control which release is used to display content on balenaHub. Note that when a user deploys an app, the latest code is pulled from Github and is independent of this setting.

## Transfer App ownership

Apps with all their associated releases and members can be transferred to any other balenaCloud organization. App transfers are between a source and a target organization.

Only organization administrators can initiate and complete App transfers. You must coordinate with one of the receiving organization's administrators to perform the following actions:

* Take note of the App name in the source organization and your balenaCloud username (in the top-right drop-down menu).
* Ask an administrator of the target balenaCloud organization to create a new empty App using the same block name (the type doesn't need to match).
* Ask the administrator of the target balenaCloud organization to add you as a member of the newly created App with a Developer role, using your username. If you are an administrator of the target organization, you already have access to the new App & this step can be skipped.
* In the source organization, select Settings --> Set App ownership and pick the target organization from the list to complete the transfer.

{% hint style="warning" %}
If the dropdown for the destination organization is empty and grayed out, ensure that you have created an empty App in the target organization with the same name as the source App, and that the user that is transferring ownership of the App from the source organization has been added as a Developer to the target App.
{% endhint %}

Once the ownership has been set to the new owner, the source App owner will no longer be a member of the target App. If required, you will need to invite them to become a member of the App again. All other members of the source App will retain their membership of the target App once the transfer is complete.

## The future roadmap

The functionality for Apps we have today is only the start. Apps added via the dashboard can be shared on balenaHub for others to deploy to their own fleets which serves to help others, and we’ll continue building out to expand to installing private Apps on private fleets, automatic updates, and eventually the ability to install multiple Apps on a single fleet. Keep an eye on [our blog](https://balena.io/blog) for all the latest news.
