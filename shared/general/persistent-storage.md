
If you have data or configurations that you would like to persist through application and host OS updates, you have the option to keep them in persistent storage. Persistent storage is a good place to write system logs and other application data that should remain untouched even as your code changes.

#### Before resinOS v2.12.0

On devices running resinOS versions before 2.12.0, the `/data` folder in the container is automatically linked to a directory on the host OS and guaranteed to persist across updates. The contents of the `/data` folder can be accessed via the host OS at `/mnt/data/resin-data/<APP ID>`.

The `/data` folder is not synced between devices in your fleet. In addition, the folder is unique to a specific application, so if you transfer your device to a new application the `/data` folder from the previous application will not be accessible in the container. It will, however, still be available via the host OS and if the device is moved back to the original application.

Note that the `/data` folder is __not__ mounted when your project is building on our build servers, so you can't access it from your `Dockerfile`. The `/data` volume only exists when the container is running on the deployed devices. 		

#### resinOS v2.12.0 and above

Beginning with resinOS v2.12.0, persistent storage is handled through [named volumes][multicontainer]. The behavior is much the same as persistent storage on older host OS versions. In fact, for single-container applications, the default `docker-compose.yml` sets up a `resin-data` named volume that links to a `/data` directory in the container. The only difference between this and earlier versions is that accessing this data via the host OS is done at `/var/lib/docker/volumes/<APP ID>_resin-data/_data`, rather than the `/mnt/data/resin-data/<APP ID>` location used with earlier host OS versions.

Named volumes can be given arbitrary names and can be linked to a directory in one or more containers. As long as every release of the application includes a `docker-compose.yml` and the volume name does not change, the data in the volume will persist across updates.

When using named volumes, note that:
- If a device is moved to a new application, the old `/data` folder will be automatically purged.
- During the build process, data added to a container directory that is configured to link to a named volume will be copied to the volume the first time it's created on the device.

#### Transfer large files

If you have large files you would like your containers to have access to, you can transfer them from your computer directly to your device's SD card. First insert the SD card in your computer and find the `resin-data` partition. Then look for the folder associated with your application, which will either be at `/resin-data/<APP ID>` or `/docker/volumes/<APP ID>_<VOLUME NAME>/_<CONTAINER DIRECTORY>`, depending on your host OS version. Note that these directories will only exist after your application has been started at least once.

[multicontainer]:/learn/develop/multicontainer/#named-volumes
