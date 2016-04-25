* **Application:**
>This is a group of devices that will all run the same application code. Often used interchangeably with "device fleet". When you provision a device, it

* **resin remote:**
> A remote [git repository][git-repo] that is associated to your application. Any code pushed to the `master` branch of this repo will be built and deployed as a container on all devices in the application.

* **Container:**
>A [Docker container][docker-containers] that essentially is a bundle of your application code and all its dependencies. It runs as an isolated process in userspace on the resinOS host.


[docker-containers]:https://docs.docker.com/engine/understanding-docker/#how-does-a-container-work
[git-repo]:https://www.sbf5.com/~cduan/technical/git/git-1.shtml
