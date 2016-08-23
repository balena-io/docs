
If you want specific data or configurations to persist on the device through the update process, you will need to store them in `/data` . This is a special folder on the device file system which is essentially a [docker data `VOLUME`][docker-volume-link].

This folder is guaranteed to be maintained across updates and thus files contained in it can act as persistent storage.	This is a good place to write system logs, etc.

Note that this folder is __not__ mounted when your project is building on our build server, so you can't access it from your `Dockerfile`. The `/data` volume only exists when the container is running on the deployed devices. 		

Additionally, it is worth mentioning that the `/data` folder is created per-device and it is not kept in sync between devices in your fleet, so ensure your application takes this into account.

[docker-volume-link]:https://docs.docker.com/userguide/dockervolumes/
