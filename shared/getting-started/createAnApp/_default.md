An application is a group of devices that share the same architecture and run the same code. When you provision a device, it is added to a specific application, but can be migrated to another application at any time.

To create an application, select the **{{ $device.name }}** device type, select an [application type][app-types], enter a name, and click *Create new application*:

<img src="/img/{{ $device.id }}/app-type.png" width="40%">

__Note:__ To create an application with multiple containers, you'll want to use the starter or microservices application type. The starter applications are full-featured and free for all users, with a limit of up to ten total devices across all starter applications.

This will take you to the dashboard for your newly created application, where you can manage your whole fleet of **{{ $device.name }}s**.

[app-types]:/learn/manage/app-types