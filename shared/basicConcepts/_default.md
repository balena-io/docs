* **Application:**
>This is a group of devices or "fleet" that will all run the same application code. When you provision a device, it will automatically be associated to the application. You add as many devices to an application as you like, its also possible to migrate devices to other applications.

* **resin remote:**
> A remote [git repository][git-repo] that is associated to your application. Any code pushed to the `master` branch of this repo will be built and deployed as a container on all devices in the application. This git repo uses SSH keys to secure it, so don't forget to set up your SSH key.

* **Container:**
>A [Docker container][docker-containers] that essentially is a bundle of your application code and all its dependencies. It runs as an isolated process in userspace on the resinOS host.


[docker-containers]:https://docs.docker.com/engine/understanding-docker/#how-does-a-container-work
[git-repo]:https://www.sbf5.com/~cduan/technical/git/git-1.shtml
