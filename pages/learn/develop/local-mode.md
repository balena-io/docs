---
title: Develop locally
excerpt: Use {{ $names.company.lower }} local mode to prototype quickly
thumbnail: /img/common/device/running-webterminal-session.png
---

# Develop locally

Local mode is the development mode for balena. It allows you to build and sync code to a single development device in your local network without having to go through the balenaCloud build service and deployment pipeline. It uses the Docker daemon on the device to build container images and then the supervisor starts the containers in the exact same way as if it were deployed via the cloud.

## Local mode requirements

In order to use local mode on a device:
- The device must be running balenaOS v2.29.0 or higher.
- The device must be running a [development][development] variant of the OS.
- You must have the [balena CLI][cli] installed on your workstation.
- Local mode must be enabled through the dashboard. To use local mode on a development device, click on the small *Actions* dropdown at the top right of the device page and select *Enable Local Mode*.

<img src="/img/local-mode/device-in-local-mode.png" width="100%">

## Scan the network and find your device

Before you can get any code running, you first have to find your device. To do this, login to the balena CLI and use `balena scan`. Note, you may need administrator privileges to run the scan as it needs access to all network interfaces.

All balenaOS devices advertise themselves on the network using Avahi. The names take the form `<short-uuid>.local`, where the short-uuid is the uuid you see on your device dashboard. The CLI allows you to scan the network and discover your device:

**Command**
```
sudo balena scan
```
**Output**
```
Reporting scan results
-
  host:          33bccbc.local
  address:       192.168.1.37
  dockerInfo:
    Containers:        2
    ContainersRunning: 2
    ContainersPaused:  0
    ContainersStopped: 0
    Images:            2
    Driver:            aufs
    SystemTime:        2019-01-25T12:08:44.42051896Z
    KernelVersion:     4.14.79
    OperatingSystem:   balenaOS 2.29.2+rev1
    Architecture:      armv7l
  dockerVersion:
    Version:    17.12.0-dev
    ApiVersion: 1.35
```

## Push over a new project

Now that we know where our device is on the network we can start pushing some code to it. To do this, we use the `balena push` command. This command instructs the device to do a Docker build and then runs your container(s) in the same configuration as the balenaOS device supervisor would. Currently you need to pass the device's IP address as an argument to the command and by default `balena push` will build from the current working directory, but it is also possible to specify the project directory via the `--source` option.

**Command**
```
balena push 192.168.1.37
```
**Output**
```
[Info]    Starting build on device 192.168.1.37
[Info]    Creating default composition with source: .
[Build]   [main] Step 1/8 : FROM balenalib/raspberrypi3-node:10-stretch-run
[Build]   [main]  ---> 194e23405dc9
[Build]   [main] Step 2/8 : WORKDIR /usr/src/app
[Build]   [main]  ---> Using cache
[Build]   [main]  ---> 3de04a1198aa
[Build]   [main] Step 3/8 : COPY package.json package.json
[Build]   [main]  ---> 4efbe5eef155
[Build]   [main] Step 4/8 : RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*
[Build]   [main]  ---> Running in b558ec5ad3de
[Build]   [main] npm
[Build]   [main] notice
[Build]   [main]  created a lockfile as package-lock.json. You should commit this file.
[Build]
[Build]   [main] added 49 packages from 38 contributors and audited 122 packages in 8.35s
[Build]   [main] found 0 vulnerabilities
[Build]   [main] Cache verified and compressed (~/.npm/_cacache):
[Build]   [main] Content verified: 99 (1240599 bytes)
[Build]   [main] Index entries: 150
[Build]   Finished in 1.335s
[Build]   [main] Removing intermediate container b558ec5ad3de
[Build]   [main]  ---> c1d45a62a3d7
[Build]   [main] Step 5/8 : COPY . .
[Build]   [main]  ---> 72986df714f5
[Build]   [main] Step 6/8 : ENV UDEV=1
[Build]   [main]  ---> Running in 4ca23cbe2e89
[Build]   [main] Removing intermediate container 4ca23cbe2e89
[Build]   [main]  ---> a83dac15ab3b
[Build]   [main] Step 7/8 : CMD ["npm", "start"]
[Build]   [main]  ---> Running in 9dfd4cefd73e
[Build]   [main] Removing intermediate container 9dfd4cefd73e
[Build]   [main]  ---> 48efc4862b23
[Build]   [main] Step 8/8 : LABEL "io.resin.local.image"='1' "io.resin.local.service"='main'
[Build]   [main]  ---> Running in b3eb682122e1
[Build]   [main] Removing intermediate container b3eb682122e1
[Build]   [main]  ---> 97200548c133
[Build]   [main] Successfully built 97200548c133
[Build]   [main] Successfully tagged local_image_main:latest
[Info]    Streaming device logs...
[Logs]    [1/25/2019, 1:14:20 PM] Installing service 'main sha256:97200548c13376aaf7445cb4c62fa13d2e758931cf34daf5ab20e3c00656a1b4'
[Logs]    [1/25/2019, 1:14:21 PM] Installed service 'main sha256:97200548c13376aaf7445cb4c62fa13d2e758931cf34daf5ab20e3c00656a1b4'
[Logs]    [1/25/2019, 1:14:21 PM] Starting service 'main sha256:97200548c13376aaf7445cb4c62fa13d2e758931cf34daf5ab20e3c00656a1b4'
[Logs]    [1/25/2019, 1:14:22 PM] Started service 'main sha256:97200548c13376aaf7445cb4c62fa13d2e758931cf34daf5ab20e3c00656a1b4'
[Logs]    [1/25/2019, 1:14:25 PM] [main]
[Logs]    [1/25/2019, 1:14:25 PM] [main] > simple-server-node@1.0.0 start /usr/src/app
[Logs]    [1/25/2019, 1:14:25 PM] [main] > node server.js
[Logs]    [1/25/2019, 1:14:25 PM] [main]
[Logs]    [1/25/2019, 1:14:28 PM] [main] Server listening on port  80
```

These containers will have access to all the features and environment that balenaCloud deployed devices have. For example, you will still be able to query and use the [supervisor API][supervisor API] and the containers will be brought up automatically on boot.

## Caveats
- In localMode, a device will not send logs back to the balenaCloud dashboard.
- Set device and service environment variables from the dashboard will not be applied to localMode containers, but it is still possible to set these in your `docker-compose.yml` or `Dockerfile`.
- Changes to Device configuration variables, for example `BALENA_HOST_CONFIG_gpu_mem`, will result in the device rebooting and applying those settings.
- Actions such as `Restart` and `purge Data` from balenaCloud interface will not apply to localMode containers.
- When switching out of localMode and back to tracking releases from balenaCloud, the balena supervisor will destroy any localMode containers and  volumes as well as clean up unneeded base images, and then start up the application that balenaCloud instructs it to run.

## SSH into the running app container or host OS

If we want to run some test commands in our app container, we can do this easily using `{{ $names.company.short }} ssh`. This command drops us directly into the host OS. From there, we can check system logs and [perform other troubleshooting tasks][troubleshooting]:
```
sudo {{ $names.company.short }} ssh 192.168.0.12
```
To connect to an application container, we can add the service name after the hostname or IP address:

```
sudo {{ $names.company.short }} ssh 192.168.36.12 my-service
```

## Using a Private Docker Registry

If your project relies on a private base image, then it is possible to specify your registry credentials when doing a `balena push`. To do this you simply pass the `--registry-secrets` option as shown below.

```bash
balena push 192.168.1.37 --registry-secrets /Path/To/File/dockerhub-secret.yml
```

Where `dockerhub-secret.yml` is a YAML file containing my private registry usernames and passwords to be used by the device balena-engine when pulling base images during a build.

Sample secrets YAML file:

```yaml
'https://index.docker.io/v2/':
  username: johnDoe
  password: myPassword
```


[development]:/reference/OS/overview/2.x/#dev-vs-prod-images
[cli]:/reference/cli
[supervisor API]:/reference/supervisor/supervisor-api/
[compose-remote]:{{ $links.githubPlayground }}/balenaos-compose
[troubleshooting]:/learn/manage/ssh-access/#troubleshooting-with-host-os-access
