# Non-Javascript Code

__NOTE:__ We plan to improve the means by which we expose this functionality,
however while we are in alpha you will need to use the node.js `package.json`
configuration file to specify how your native code installs and executes.

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

Where you can run arbitrary commands in `deps.sh` (or run whatever you like.)

The default base image we use is [raspbian][raspbian], so see their
documentation to determine available packages, default paths for things, etc.

### Script Errors

Note that it's wise to include the following commands to cause errors to result
in a script exit, both in individual commands and piped-to commands:-

```bash
set -o errexit
set -o pipefail
```

### Kernel Modules

A nice consequence of this flexibility is the capacity to load kernel modules
into your device - once you have either built code into a kernel module or
installed via a package that doesn't [insmod/modprobe][modprobe] automatically,
you can install a module by simply executing the appropriate command prior to
starting your application, e.g. in `package.json`:-

```
...
"start": "insmod kernel_module.ko && ./start_app"
...
```

__NOTE:__ You will need to recompile your module each time we update the kernel
for it to continue working correctly - we're planning on making life easier via
[DKMS][dkms] soon.

## Using a Custom Dockerfile

An alternative, far more flexible and powerful option is to make use of our
[containerisation][container] infrastructure directly, which currently makes use
of the [docker][docker] project.

We enable you to deploy your own custom docker via a [Dockerfile][Dockerfile] -
simply insert a file named `Dockerfile` at the root of your project, and it will
be used automatically when pushed to the `resin` endpoint.

For an example of a `Dockerfile` used in practice, check out the
[Hello Python][hello-python] project which uses
[its Dockerfile][hello-dockerfile] to deploy a simple Python project to a
device.

[raspbian]:http://www.raspbian.org/
[modprobe]:http://en.wikipedia.org/wiki/Modprobe
[dkms]:http://en.wikipedia.org/wiki/Dynamic_Kernel_Module_Support

[Dockerfile]:https://docs.docker.com/reference/builder/
[container]:https://wiki.archlinux.org/index.php/Linux_Containers
[docker]:http://docker.io
[hello-python]:https://github.com/alexandrosm/hello-python
[example-dockerfile]:https://github.com/alexandrosm/hello-python
[hello-dockerfile]:https://github.com/alexandrosm/hello-python/blob/master/Dockerfile
