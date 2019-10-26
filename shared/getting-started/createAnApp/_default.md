An application is a group of devices that share the same architecture and run the same code. When you provision a device, it is added to a specific application, but can be migrated to another application at any time.

To create your first application, log into your [balenaCloud dashboard][dashboard] and click the _Create application_ button.

<img src="/img/common/create-first-application.png" width="100%">

Select the **{{ $device.name }}** device type, choose an [application type][app-types], enter a name, and click *Create new application*:

<img src="/img/common/create-application.png" width="60%">

__Note:__ To create an application with multiple containers, you'll want to use the starter or microservices application type. The starter applications are full-featured and free for all users, with a limit of up to 10 total devices across all starter applications.

After the application has been created, you will be redirected to the dashboard for the newly created application, where you can add your first **{{ $device.name }}**.

[app-types]:/learn/manage/app-types
[dashboard]:{{ $links.dashboardUrl }}
