# Non-Javascript Code

## Using a Custom Dockerfile

The most flexible option is to make use of the [containerisation][container]
infrastructure directly by means of a Dockerfile.

We enable you to deploy your own custom environment on the device via a [Dockerfile][Dockerfile] -
simply add a file named `Dockerfile` at the root of your project and it will be
used automatically when pushed to the `resin` endpoint.

For an example of a `Dockerfile` used in practice, check out the
[Hello Python][hello-python] project which uses its
[Dockerfile][hello-dockerfile] to deploy a simple Python project to a device.

For more details on constructing a Dockerfile, read our
[Dockerfile guide][dockerfile-guide].

## Using `package.json`

It is possible to deploy native code by simply adapting the `package.json` file
in your repo to build and execute a native program on pre-install and startup,
respectively, e.g.:-

```
{
  "name": "some-native-app",
  "scripts": {
    "preinstall": "bash deps.sh",
    "start": "./native_code"
  }
}
```

You can run arbitrary commands in `deps.sh`, of course you can name this
whatever makes most sense to your project.

Code deployed using Resin.io runs on [Raspbian][raspbian] (i.e. our current
[Docker][docker] [base image][base_image] is a Raspbian image) - review
the [Raspbian repository][raspbian_repo] for a list of available packages.

### Script Errors

It's wise to add the following directions to bash files you use, in order to
make errors in any command cause the script to exit immediately:-

```bash
set -o errexit
set -o pipefail
```

### Kernel Modules

A nice consequence of the flexibility to deploy native code to your devices is
the ability to load kernel modules - once you have built code into a kernel
module or installed it via a package (assuming the package doesn't automatically
load the module) you can install it simply by executing the appropriate command
prior to starting your application, e.g. in `package.json`:-

```
...
"start": "insmod kernel_module.ko && ./start_app"
...
```

__NOTE:__ You will need to recompile your module each time we update the kernel
for it to continue working correctly - we're planning on making life easier via
[DKMS][dkms] soon.

[dockerfile-guide]:/pages/dockerfile.md

[raspbian]:http://www.raspbian.org/
[modprobe]:http://en.wikipedia.org/wiki/Modprobe
[dkms]:http://en.wikipedia.org/wiki/Dynamic_Kernel_Module_Support

[Dockerfile]:https://docs.docker.com/reference/builder/
[container]:https://wiki.archlinux.org/index.php/Linux_Containers
[docker]:http://docker.io
[hello-python]:https://github.com/alexandrosm/hello-python
[example-dockerfile]:https://github.com/alexandrosm/hello-python
[hello-dockerfile]:https://github.com/alexandrosm/hello-python/blob/master/Dockerfile
[base_image]:https://docs.docker.com/terms/image/#base-image-def
[raspbian_repo]:http://www.raspbian.org/RaspbianRepository
