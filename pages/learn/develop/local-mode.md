---
title: Develop locally
excerpt: Use {{ $names.company.lower }} local mode to prototype quickly
---

# Develop locally

Local mode is the development mode for {{ $names.company.lower }}. It allows you to build and sync code to a single development device in your local network without having to go through the {{ $names.cloud.lower }} build service and deployment pipeline. It uses the Docker daemon on the device to build container images, and then the device Supervisor starts the containers in the same way as if they were deployed via the cloud.

## Local mode requirements

To use local mode on a device:

- The device must be running {{ $names.os.lower }} v2.29.0 or higher.
- The device must be running a [development][development] variant of the OS.
- You must have the [{{ $names.company.lower }} CLI][cli] installed on your development machine.
- Local mode must be enabled through the {{ $names.cloud.lower }} dashboard. You can enable it from either the *Actions* menu of the device dashboard or click to expand the arrow located on the device dashboard and select *Enable Local Mode*.

![Enable local mode](/img/local-mode/enable-local-mode.png)

## Local mode caveats

- In local mode, a device will not send logs back to the {{ $names.cloud.lower }} dashboard. Refer to the [local mode logs section](#local-mode-logs) to view logs in local mode.
- Device and service environment variables set from the {{ $names.cloud.lower }} will not be applied to local mode containers. It is still possible to set environment variables in your `docker-compose.yml` or `Dockerfile`.
- Changes to device [configuration variables][configuration], for example, `BALENA_HOST_CONFIG_gpu_mem`, will result in the device rebooting and applying those settings.
- Actions such as _Restart_ and _Purge data_ from the {{ $names.cloud.lower }} dashboard will not apply to local mode containers.
- When switching out of local mode and back to tracking releases from {{ $names.cloud.lower }}, the Supervisor will destroy any local mode containers and  volumes, as well as clean up unneeded base images, and then start up the application that {{ $names.cloud.lower }} instructs it to run.

![Device in local mode](/img/local-mode/device-in-local-mode-20-01-09.png)

## Scan the network and find your device

Before you can get your application running on your device in local mode, you have to find your device. You can find the `short-uuid` and local IP address of the device from the device dashboard or by scanning the network. To perform a scan, login to the {{ $names.company.lower }} CLI and use `{{ $names.company.short }} scan` to find any local {{ $names.os.lower }} devices. All {{ $names.os.lower }} devices advertise themselves on the network using [Avahi][avahi]. The names take the form `<short-uuid>.local`, where the `short-uuid` is the UUID you see on your device dashboard.

__Note:__ You may need administrator privileges to run `{{ $names.company.short }} scan` as it requires access to all network interfaces.

**Command**

```bash
sudo {{ $names.company.short }} scan
```

**Output**

```bash
Reporting scan results
-
  host:          63ec46c.local
  address:       192.168.86.45
  dockerInfo:
    Containers:        1
    ContainersRunning: 1
    ContainersPaused:  0
    ContainersStopped: 0
    Images:            4
    Driver:            aufs
    SystemTime:        2020-01-09T21:17:11.703029598Z
    KernelVersion:     4.19.71
    OperatingSystem:   {{ $names.company.short }}OS 2.43.0+rev1
    Architecture:      armv7l
  dockerVersion:
    Version:    18.09.8-dev
    ApiVersion: 1.39

```

## Push over a new project

When local mode has been activated, {{ $names.company.lower }} CLI can push code directly to the local device instead of going via the {{ $names.cloud.lower }} builders. As code is built on the device and then executed, this can significantly speed up development when requiring frequent changes. To do this, we use the `{{ $names.company.lower }} push` command providing either the local IP address or `<short-uuid>.local`, obtained from the preceding `{{ $names.company.short }} scan` command.

__Note:__ By default `{{ $names.company.short }} push` will build from the current working directory, but it is also possible to specify the project directory via the `--source` option.

Once the code has been built on the device, it immediately starts executing, and logs are output to the console. At any time, you can disconnect from the local device by using `Ctrl-C`. Note that after disconnection, the services on the device will continue to run.

**Command**

```bash
{{ $names.company.short }} push 63ec46c.local
```

**Output**

```bash
[Info]    Starting build on device 63ec46c.local
[Info]    Creating default composition with source: .
[Build]   [main] Step 1/9 : FROM {{ $names.company.short }}lib/raspberrypi3-node:10-stretch-run
[Build]   [main]  ---> 383e163cf46d
[Build]   [main] Step 2/9 : WORKDIR /usr/src/app
[Build]   [main]  ---> Running in 9d8460cb9d11
[Build]   [main] Removing intermediate container 9d8460cb9d11
[Build]   [main]  ---> 143557c3351a
[Build]   [main] Step 3/9 : COPY package.json package.json
[Build]   [main]  ---> 5a5818881215
[Build]   [main] Step 4/9 : RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*
[Build]   [main]  ---> Running in 03a4e27048cc
[Build]   [main]
[Build]   > ejs@3.0.1 postinstall /usr/src/app/node_modules/ejs
[Build]   > node ./postinstall.js
[Build]   [main] Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
[Build]   [main] npm
[Build]   [main] notice created a lockfile as package-lock.json. You should commit this file.
[Build]
[Build]   [main] added 51 packages from 38 contributors and audited 127 packages in 9.334s
[Build]   [main] found 0 vulnerabilities
[Build]   [main] Cache verified and compressed (~/.npm/_cacache):
[Build]   [main] Content verified: 102 (1362229 bytes)
[Build]   [main] Index entries: 155
[Build]   [main] Finished in 1.568s
[Build]   [main] Removing intermediate container 03a4e27048cc
[Build]   [main]  ---> e199dbb1fe73
[Build]   [main] Step 5/9 : COPY . ./
[Build]   [main]  ---> 3309e8315a64
[Build]   [main] Step 6/9 : ENV UDEV=1
[Build]   [main]  ---> Running in 0867fd67e166
[Build]   [main] Removing intermediate container 0867fd67e166
[Build]   [main]  ---> cdb9c9a629df
[Build]   [main] Step 7/9 : CMD ["npm", "start"]
[Build]   [main]  ---> Running in b5e4aa98c5ab
[Build]   [main] Removing intermediate container b5e4aa98c5ab
[Build]   [main]  ---> 7b4a59f62bb5
[Build]   [main] Step 8/9 : LABEL io.resin.local.image=1
[Build]   [main]  ---> Running in 9d50c18f946c
[Build]   [main] Removing intermediate container 9d50c18f946c
[Build]   [main]  ---> 38935745a619
[Build]   [main] Step 9/9 : LABEL io.resin.local.service=main
[Build]   [main]  ---> Running in 5d8e9f324e28
[Build]   [main] Removing intermediate container 5d8e9f324e28
[Build]   [main]  ---> 88065a1a3f00
[Build]   [main] Successfully built 88065a1a3f00
[Build]   [main] Successfully tagged local_image_main:latest

[Info]    Streaming device logs...
[Live]    Watching for file changes...
[Live]    Waiting for device state to settle...
[Logs]    [1/9/2020, 1:46:58 PM] Creating network 'default'
[Logs]    [1/9/2020, 1:46:58 PM] Creating volume 'resin-data'
[Logs]    [1/9/2020, 1:46:58 PM] Installing service 'main sha256:88065a1a3f002ff7eaf6c56b5c8bdb477c43437d41fcbb3ec683842c86b25432'
[Logs]    [1/9/2020, 1:46:59 PM] Installed service 'main sha256:88065a1a3f002ff7eaf6c56b5c8bdb477c43437d41fcbb3ec683842c86b25432'
[Logs]    [1/9/2020, 1:46:59 PM] Starting service 'main sha256:88065a1a3f002ff7eaf6c56b5c8bdb477c43437d41fcbb3ec683842c86b25432'
[Logs]    [1/9/2020, 1:47:01 PM] Started service 'main sha256:88065a1a3f002ff7eaf6c56b5c8bdb477c43437d41fcbb3ec683842c86b25432'
[Logs]    [1/9/2020, 1:47:03 PM] [main]
[Live]    Device state settled
[Logs]    [1/9/2020, 1:47:03 PM] [main] > simple-server-node@1.0.0 start /usr/src/app
[Logs]    [1/9/2020, 1:47:03 PM] [main] > node server.js
[Logs]    [1/9/2020, 1:47:03 PM] [main]
[Logs]    [1/9/2020, 1:47:04 PM] [main] Example app listening on port  80
```

### Livepush

Local mode also has another huge benefit, known as [Livepush][livepush]. Livepush makes intelligent decisions on how, or even if, to rebuild an image when changes are made. Instead of creating a new image and container with every code change, the Dockerfile commands are executed from within the running container. This means that, for example, if you added a dependency to your `package.json`, rather than having to install all of the dependencies again, only the new dependency would be installed.

Once a file has been modified in the application, the Supervisor will immediately detect the change and then either rebuild the image or, for source files that run in-service, replace the changed files in situ in the relevant container layer and restart the service. As this happens in a few seconds, it makes the process of developing much faster and more convenient.

```bash
[Live]    Detected changes for container main, updating...
[Live]    [main] Restarting service..
```

__Note:__ You can disable Livepush by passing the `--nolive` option to `{{ $names.company.short }} push`. To rebuild the application on the device you will need to perform another `{{ $names.company.short }} push`.

### Local mode logs

By default, when pushing code to a device in local mode using the {{ $names.company.lower }} CLI, the logs will be output to the console. You can prevent this by passing the `--detached` (`-d`) option to the `{{ $names.company.short }} push` command (you may also detach the console at any time by pressing `Ctrl-C`).

```bash
{{ $names.company.short }} push 63ec46c.local --detached
```

When detached, the services continue to run on the device, and you can access the logs using the `{{ $names.company.short }} logs` command, again passing the local IP address or `<short-uuid>.local`.

```shell
{{ $names.company.short }} logs 63ec46c.local
```

This command will output logs for the system and all running services. You may optionally filter the output to include only system or specific service logs using the available `--system` (`-S`) and `--service` (`-s`) options. For example, to output only the system logs:

```bash
{{ $names.company.short }} logs 63ec46c.local --service <service name>
```

To filter logs by a service, use the `--service` option. You may specify this option multiple times to output logs from multiple services.

```bash
{{ $names.company.short }} logs 63ec46c.local --service main
{{ $names.company.short }} logs 63ec46c.local --service first --service second
```

These options can be combined to output system and selected service logs e.g.

```bash
{{ $names.company.short }} logs 827b231.local --system --service first --service second
```

__Note:__ You may also specify the `--service` and `--system` options using the  `{{ $names.company.short }} push` command to filter the log output.

## SSH into the running app container or host OS

To access the local device over [SSH][ssh], use the `{{ $names.company.short }} ssh` command specifying the device IP address or `<short-uuid>.local`.  By default, SSH access is routed into the host OS shell and, from there, we can check system logs and [perform other troubleshooting tasks][troubleshooting]:

```bash
{{ $names.company.short }} ssh 192.168.86.45
```

To connect to an application container, we can specify the service name e.g.

```bash
sudo {{ $names.company.short }} ssh 63ec46c.local my-service
```

__Note:__ If an IP address or a `.local` hostname is used (instead of an application name or device UUID), `{{ $names.company.short }} ssh` establishes a direct connection to the device on port `22222` that does not rely on the {{ $names.company.short }} VPN.

## Using a Private Docker Registry

If your project relies on a private base image, then it is possible to specify your registry credentials when doing a `{{ $names.company.short }} push` by passing the `--registry-secrets` option, as shown below.

```bash
{{ $names.company.short }} push 192.168.86.45 --registry-secrets /Path/To/File/dockerhub-secret.yml
```

Where `dockerhub-secret.yml` is a YAML file containing my private registry usernames and passwords to be used by the device {{ $names.engine.lower }} when pulling base images during a build.

Sample secrets YAML file:

```yaml
'https://index.docker.io/v2/':
  username: johnDoe
  password: myPassword
```

[development]:/reference/OS/overview/2.x/#development-vs-production-images
[cli]:/reference/cli
[supervisor API]:/reference/supervisor/supervisor-api/
[compose-remote]:{{ $links.githubPlayground }}/{{ $names.company.short }}os-compose
[troubleshooting]:/learn/manage/ssh-access/#troubleshooting-with-host-os-access
[configuration]:/learn/manage/configuration/
[cli-masterclass]:/learn/more/masterclasses/cli-masterclass/#6-using-local-mode-to-develop-applications
[livepush]:{{ $links.githubModules }}/livepush
[ssh]:/learn/manage/ssh-access/
[avahi]:https://linux.die.net/man/8/avahi-daemon
