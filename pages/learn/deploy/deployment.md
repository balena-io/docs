---
title: Deploy to your fleet
excerpt: The process for deploying applications to your balenaCloud managed fleet
---

# Deploy to your Fleet

On balenaCloud when we deploy code to a fleet of devices, these devices are grouped under a single application and they all run what we refer to as a "release". A release consists of a Docker image or set of images on our registry. These images are built from a source code repository, either locally or remotely on the [balenaCloud build server](#the-balenacloud-build-server). When a successful release is created, all devices in the application are instructed to download and run the new deployment (according to the chosen [update strategy](/docs/learn/deploy/release-strategy/update-strategies/)).

There are 3 ways to create and deploy a release, namely [balena push](#balena-push), [balena deploy](#balena-build--deploy) and [git push](#git-push). Each method has slightly different use cases and differ on how and where the container images are built. We'll explain each of the options in more detail below. If you are just starting out with balenaCloud, we recommend using [balena push](#balena-push).

## Balena Push

### Overview

`balena push` is the recommended method for deployment and [development](/learn/develop/local-mode/) on the balenaCloud platform. To use `balena push` you need to first [install the balena CLI](/reference/cli/#install-the-cli) and ensure you are logged in to your account with `balena login`.

When you run the  `balena push <APP_NAME or DEVICE_IP>` command from your laptop it will essentially take your project (or repository) folder, compress it and send it to the [balenaCloud build server](#the-balenacloud-build-server) or local balenaOS device in [localMode](/learn/develop/local-mode/) where it will be built.

![how balena push works](/img/common/deployment/balena-push.jpg)

Once the cloud builder has successfully completed building all the images in the deployment, it will upload these images to the balenaCloud registry and create a release entry in the [balena API](https://www.balena.io/docs/reference/api/overview/) database. It will then notify all the devices in the fleet that a new release is available. If you need to pull in proprietary code or use a private base image during your builds you can do so using the [build time secrets](#build-time-secrets-and-variables) or [private base images](#private-base-images) feature of `balena push`.

It should be noted that `balena push` is independent of git, so you are free to use any version control system you wish. This also means that it is possible to use [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) in your project when deploying with `balena push`.

### Additional Options
#### `--source, -s <source>`

The `--source` flag allows you do define a path to your source code folder. This flag directs `push` to send that directory to be built on either the [cloud builder](#the-balenacloud-build-server) or [local device](/learn/develop/local-mode/). You should ensure your folder follows the [standard balena project structure](#project-structure).

#### `--emulated, -e`

The `--emulated` flag will force the [balenaCloud builder](#the-balenacloud-build-server) to run an [qemu](https://www.qemu.org/) emulated build. This means that your build will be executed on a `x86_64` CPU that emulates the target architecture of your application, rather than running on the native architecure of your device. You can see if the build is emulated in the first few lines of the builder output as below:

```
hobochild$ balena push myApp --emulated
[Info]     Starting build for myApp, user shaun_projects
[Info]     Dashboard link: https://dashboard.balena-cloud.com/apps/1426783/devices
[Info]     Running locally emulated build
[Info]     Pulling previous images for caching purposes...
[Success]  Successfully pulled cache images
[main]     Step 1/2 : FROM shaunmulligan/secret_sauce
[main]      ---> 6e48e49f10a6
[main]     Step 2/2 : CMD cat /etc/os-release
```

__Note:__ The `--emulated` option is not available when pushing to a [localMode](/learn/develop/local-mode/) device.

The emulated builds will also happen in the rare occasion that the native ARM builder is overloaded or unavailable.

#### `--nocache, -c`

The `--nocache` flag will initiate a fresh build and not use any cache from previous builds of this project. This is useful when you want to ensure you are pulling in the latest base image and packages for your project.

## Balena Build & Deploy

### Overview

The `balena deploy` command is functionally very similar to [balena push](#balena-push) but it avoids pushing any source code to the [balenaCloud build server](#the-balenacloud-build-server). It allows you more control over how and where your container images are built. `balena deploy` can fairly easily be integrated into your own [CI/CD](https://en.wikipedia.org/wiki/Continuous_deployment) build system.

In `balena deploy` the container images are built on your laptop or development machine and depending on your fleet's targeted CPU architecture, has the option to run [qemu](https://www.qemu.org/) emulated builds.

![how balena deploy works](/img/common/deployment/balena-deploy.jpg)

`balena deploy` will build all your container images on the machine the command is run on (or on a specified docker daemon) and upon success, it will upload the images to the balenaCloud image registry and then create a release entry in the [balena API](https://www.balena.io/docs/reference/api/overview/) database. The devices in the application will then be notified of a new release and download it. In order to build containers you will need to have [Docker installed](https://docs.docker.com/install/) on your development machine and you should be able to execute [Docker commands as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/). It is not necessary to install Docker on your development machine if you choose to use a device running balenaOS to build the images (a [development image](https://www.balena.io/docs/reference/OS/overview/2.x/#dev-vs-prod-images) is then required), by specifying a docker daemon's IP address and port number with the relevant command-line options.

Like `balena push` it is also independent of git and you can therefore use any version control system you wish. It is also possible to make use of [private base images](#private-base-images).

__Note:__ Currently `balena deploy` does not support the [build time secrets](#build-time-secrets-and-variables) feature.

It's also possible to use the `balena build` command without actually deploying. This command has all the same functionality as `balena deploy` but it does not upload the images to the registry or create a release on the API. This command can be useful if you want your CI/CD system to first run built images through some testing and validation stage before finally doing the deploy.

### Additional Options

#### `--projectName, -n <projectName>`
The `--projectName` option allows you to specify an alternate project name. By default the project name is set to the directory name. The images created will be named with the format `<projectName>_<serviceName>`.

For example running `$ balena deploy myApp --projectName projectName` for a multicontainer application with 2 services.
```
hobochild$ docker images
REPOSITORY                                                       TAG                    IMAGE ID            CREATED             SIZE
projectName_service1                                             latest                 e4c9585eb6a5        8 minutes ago       135MB
projectName_service2                                             latest                 7bed253dada2        8 minutes ago       102MB
```

__Note:__ by default docker image names need to be lower case, so any `projectName` will be converted to lower case as `projectname`.

#### `--build, -b`
This option on `balena deploy` will always force a build of the images before uploading and deploying. In the case when you don't specify the build option, `balena deploy` will use the images that already exist locally (you can see these by running `docker images`). Note that `--build` will not do a clean build every time and will make use of the local docker layer cache. If you want to do a full clean build you need to specify both the `--build` and `--nocache` flag (see below).

#### `--nocache`
The `--nocache` flag only applies when the `--build` flag is specified and it will cause Docker to build the images from scratch ignoring any layer cache from previous builds.

#### `--buildArg, -B <arg>`
Set a build-time variable (eg. "-B 'ARG=value'"). Can be specified multiple times. Warning: It is not recommended to use build-time variables for passing secrets like github keys, user credentials etc. Build-time variable values are visible to any user of the image with the `docker history` command. For this type of sensitive data it is recommended to use [build time secrets](#build-time-secrets-and-variables).

#### `--emulated, -e`
The `--emulated` flag enables you to run an emulated build using [qemu](https://www.qemu.org/) on your development machine. This should allow you to build `armv7l` binaries for devices like the Raspberry Pi on your development machine.

#### `--logs`
This option will stream the Docker build log output for all your services to the terminal where you run deploy. These are the same logs that will be available on the [release logs page](#view-past-deployments). Note that if `balena deploy` is run without the `--build` flag, no logs will be output because no build will occur.

#### `--nologupload`
This option disables the uploading of all the service build logs to balenaCloud, so they will not be visible in [release logs page](#view-past-deployments).

#### `--source, -s <source>`
The `--source` flag allows you do define a path to your source code folder. You should ensure your folder follows the [standard balena project structure](#project-structure).

## Git Push

### Overview

The `git push balena master` method of deployment is the original deployment mechanism for balenaCloud. While we will continue to support and improve git push, our primary focus going forward will be to improve [balena push](#balena-push).

The `git push` workflow requires that you have [git](https://git-scm.com/) installed on your development machine and that you have a [SSH key setup](/learn/getting-started/raspberrypi3/nodejs/#adding-an-ssh-key) on your balenaCloud account.

![how git push works](/img/common/deployment/git-push.png)

Then simply add your balenaCloud app's git endpoint to your your local git repository via `git remote add balena <application git endpoint>` . You can find the application git remote endpoint at the top-right corner of the application page of the web dashboard.

![Where to find git remote](/img/common/deployment/git-remote.png)

Whenever you subsequently need to push code to your devices, simply run
`git push balena master`.

__Warning:__ The balenaCloud git repository **is not** intended as a code hosting solution, and we cannot guarantee the persistence of data in balenaCloud git remotes. We recommend you use a service like [Github](https://github.com/) to manage and share your code.

If you want to push a different local git branch to your balena fleet all you need to do is:
`git push balena my-local-branch:master`

### Switching Between Apps

To completely change the code you have pushed to an application with `git` you will need to force a rewrite of the git remote endpoint's history. To do this you just need to run the same command with the `-f` flag from the new project you wish to deploy.

Example:
```
cd project/my-new-project
git push balena master -f
```

### Limitations

The `git push` workflow is a great way to deploy code, but it has a number of limitations when compared to `balena push` and `balena deploy`. One is mentioned above, where it is necessary to rewrite the history and force push to change application code.

Another is that it's not possible to use the [build time secrets](#build-time-secrets-and-variables) or [private base images](#private-base-images) without having to commit your secrets into your code repository.

In order to allow options like emulation and nocache, the `git push` workflow uses specifically named remote branches (see next section) however this has the limitation that it is not possible to invalidate the cache of a emulated build pushed with `git push`.

### Additional Options

Like `balena push` the `git push` workflow also allows one to trigger a build that invalidates the Docker layer cache and builds from scratch. This can be achieved by pushing to a special branch called `balena-nocache` as shown in the example below.
```
$ git push balena master:balena-nocache
```
Similarly one can also trigger a [qemu](https://www.qemu.org/) build on the [balenaCloud](#the-balenacloud-build-server) build server by pushing to the `balena-emulated` remote branch as shown below:
```
$ git push balena master:balena-emulated
```

## Project Structure

When deploying a balena project the build system will endeavour to build the most appropriate release for a specific set of devices. The following section will discuss some of the mechanisms you can use to control the type of builds that are produced.

### Project Resolutions

All the deployment methods will always try to determine the project type based on the following project resolution ordering.

**Project Resolution Ordering**
- docker-compose.yml
- Dockerfile.<device-type>
- Dockerfile.<arch>
- Dockerfile.template
- Dockerfile
- package.json

This resolution mechanism looks at the files in the root of the directory you are deploying. If it finds a `docker-compose.yml` file it will ignore all the other types and build a multicontainer release based on the service specification in the `docker-compose.yml` file.

If `docker-compose.yml` is not specified, the resolution system will assume a single container deployment and will build based on a `Dockerfile.*` file. These dockerfiles can have extensions of `.<device-type>`, `<.arch>` or `.template` and the build system will use the most appropriate file based on the targeted device or application. This is best described with an example.

In our example at the root of our project repo we have the following `Dockerfile.*` files:
```
project: $ tree -a
.
├── Dockerfile.raspberrypi3
├── Dockerfile.i386
└── Dockerfile
```

When we push this project to an application which has its default device type selected as `Raspberry Pi 3`, the build system will use the device type specific `Dockerfile.raspberrypi3` file to build from. If we instead pushed this to an `Intel Edison` application, the build would use the `Dockerfile.i386` file. When pushing to any other device type, the regular `Dockerfile` would be used to perform the build. This type of project selection will also work in service folders of multicontainer deployments; you can see an example of that in our [Getting started with multicontainer project](https://github.com/balena-io-projects/multicontainer-getting-started/tree/master/haproxy).

The file extensions are equivalent to `BALENA_MACHINE_NAME` for `.<device-type>` and `BALENA_ARCH` for `.<arch>` from the template files discussed in the next section. To find the correct name have a look at our [Machine names and architectures list](https://www.balena.io/docs/reference/base-images/devicetypes/).

### Template Files

Often it's desirable to create a single Dockerfile that can be used and built for multiple different device types and CPU architectures. For this case the `Dockerfile.template` is very handy. This template dockerfile will replace the template variables before the build is started.

Currently the variable `%%BALENA_MACHINE_NAME%%` will be replaced with the application's default device type and `%%BALENA_ARCH%%` variable will be replaced by the default device type's CPU architecture. You can find both of these for a specific device type listed [here](https://www.balena.io/docs/reference/base-images/devicetypes/).

<!-- TODO: Add info on ignore files -->
<!-- ### Ignore Files
- .dockerignore
- .gitignore -->

## Private Base Images

In many cases you will want to deploy container images from a private Docker Hub account or a personally hosted registry. In order to do this you need to enable `balena` to authenticate with the private registry during the build, which is done by passing the `--registry-secrets` option with a path to the authentication secrets. An example is shown below:

For `balena push`:
```
$ balena push myApp --registry-secrets ../registry-secrets.yml
```
Or for `balena deploy`:
```
$ balena deploy myApp --registry-secrets ../registry-secrets.yml
```
and the `registry-secrets.yml` file is outside of the code repository and has the following format:
```YAML
'':  # Use the empty string to refer to the Docker Hub
  username: mike
  password: cze14
'my-registry-server.com:25000':
  username: ann
  password: hunter2
'eu.gcr.io':  # Google Container Registry
  username: '_json_key'
  password: '{escaped contents of the GCR keyfile.json file}'
```

It should be noted that in this case the devices will still pull the container images from the balenaCloud registry. The authentication just allows the build step access to pull your private image at build time.

## Build Time Secrets and Variables

Often it is necessary to use passwords or secrets during your build to fetch proprietary files or code but not have these sensitive files be downloaded to all the devices. For this reason `balena push` allows one to define a `.balena` folder to hold secret files which will get exposed to the image build but not propagate down to devices.

{{import "deployment/secrets"}}

## The balenaCloud Build server

The build server is a powerful tool which compiles code specifically for your device's architecture. With our build servers, compiling a gnarly dependency tree can be done in seconds, as compared to the minutes or even hours it may take to build on your device.

All code that is pushed using `balena push <MY_APP>` or `git push` to your balenaCloud devices is sent to a build server and then, after it is built, the image is shipped to your devices.

The build server consists of a central build server and a number of Docker daemons on build slaves. When a build is triggered the builder first determines the default application type and based on that determines what build slave will be used for the build. For [ARM](https://en.wikipedia.org/wiki/ARM_architecture) device types there are build slaves with `armv6l`, `armv7l` and `armv8l` architectures. For [amd64](https://en.wikipedia.org/wiki/X86-64) based devices, native `x86_64` build slaves are used. Finally the `armv5e` and `i386` architecture device types are always built using emulation.

In the case where the `--emulated` flag is used, the build is built on an `x86_64` machines with qemu emulation to match the application's default device type CPU architecture.

If you push a project with only a `Dockerfile`, `Dockerfile.template`, or `package.json` file, a single container image will be built and sent to your device. The single container will show up on the device dashboard as a service with the name `main`.

For [multicontainer][multicontainer] applications (Microservices and Starter [application types][app-types]), a `docker-compose.yml` file at the root of the project directory will kick off multiple simultaneous image builds, each with their own [build logs][logs].

## View Past Deployments

All successful deployments will result in a release being added to balenaCloud. These releases are tracked in their own dashboard page. You can access this page by clicking *Releases* from the application dashboard:

<img src="/img/common/app/release_list.png" width="100%">

The releases page includes a list of all attempted and deployed releases, with information on the status of the release, when it was completed, how long it took, and how many devices are on that particular release. Clicking any row will open up a summary page specifically for that release, with windows showing the `docker-compose.yml` file and Build Logs:

<img src="/img/common/app/release_summary.png" width="100%">

Much like with the device list, [filters][filters] can be added to the release list by clicking *Add filter* and filling in the appropriate fields:

<img src="/img/common/app/release_filter.png" width="60%">

[Saved views][saved-views] can also be created to return to a specific collection of filters.

[docker]:https://www.docker.com/
[git]:http://git-scm.com/

[getting-started]:/learn/getting-started
[filters]:/learn/manage/filters-tags/#filters-and-tags
[saved-views]:/learn/manage/filters-tags/#create-a-view
[logs]:#release-logs
[multicontainer]:/learn/develop/multicontainer
[app-types]:/learn/manage/app-types