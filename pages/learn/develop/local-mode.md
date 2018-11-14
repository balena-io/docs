---
title: Develop locally
excerpt: Use {{ $names.company.lower }} local mode to prototype quickly
thumbnail: /img/common/device/running-webterminal-session.png
---

# Develop locally

Local mode is the development mode for {{ $names.company.lower }}. It allows you to build and sync code to a single development device in your local network without having to go through the whole git push, build, deployment pipeline. It uses the Docker daemon on the device to build container images and starts the container up in very much the same way the {{ $names.company.lower }} device supervisor would.

## Local mode requirements

In order to use local mode on a device:
- The device must be running {{ $names.os.lower }} v2.0 or higher with supervisor v4.0 or higher.
- The device must be running a [development][development] variant of the OS. If you try to use a production variant, you will not be able to use local mode. The production devices have SSH and the Docker socket locked down, both of which are needed for the local mode feature.
- You must have the [{{ $names.company.lower }} CLI][cli] installed on your workstation.
- Local mode must be enabled through the dashboard. To use local mode on a development device, click on the small *Actions* dropdown at the top right of the device page and select *Enable Local Mode*.

__Note:__ At the moment, `{{ $names.company.short }} local push` will not work for multicontainer applications. The recommended development workflow is to put the device in local mode and use the [Docker Compose remote API][compose-remote].

<img src="/img/local-mode/device-in-local-mode.png" width="100%">

## Scan the network and find your device

Before you can get any code running, you first have to find your device. To do this, login to the {{ $names.company.lower }} CLI and use `{{ $names.company.short }} local scan`.

All {{ $names.company.lower }} devices advertise themselves on the network using Avahi. The names take the form `<short-uuid>.local`, where the short-uuid is the uuid you see on your device dashboard. The {{ $names.company.lower }} CLI allows you to scan the network and discover your device:

**Command**
```
sudo {{ $names.company.short }} local scan
```
**Output**
```
  host:          bce2006.local
  address:       10.10.0.236
  dockerInfo: 
    Containers:        1
    ContainersRunning: 1
    ContainersPaused:  0
    ContainersStopped: 0
    Images:            1
    Driver:            aufs
    SystemTime:        2018-10-18T13:38:30.960146041Z
    KernelVersion:     4.14.48-yocto-standard
    OperatingSystem:   balenaOS 2.19.0+rev4
    Architecture:      x86_64
  dockerVersion: 
    Version:    17.12.0-dev
    ApiVersion: 1.35
```

## Push over a new project

Now that we know where our device is on the network we can start pushing some code to it. To do this, we use the `{{ $names.company.short }} local push` command. This command instructs the device to do a Docker build and then runs your container in the same configuration as the {{ $names.company.lower }} device supervisor supervisor would. You can either pass the command your device's IP address or `<short-uuid>.local` name. If you leave this out, you will be presented with a list of devices to choose from.

**Command**
```
sudo {{ $names.company.short }} local push f340127.local -s .
```
**Output**
```
* Building..
- Stopping and Removing any previous 'rainbow' container
- Building new 'rainbow' image
Step 1 : FROM {{ $names.base.lib }}/raspberrypi3-python:3-slim
 ---> aa2d93575b6c
Step 2 : WORKDIR /usr/src/app
 ---> Using cache
 ---> b94e519dbdf9
Step 3 : COPY requirements.txt ./
 ---> 3485a10ad432
Removing intermediate container 42b4f5138e73
Step 4 : RUN pip install -r requirements.txt
 ---> Running in f1814424d7e6
Collecting Flask==0.10.1 (from -r requirements.txt (line 1))
  Downloading Flask-0.10.1.tar.gz (544kB)
Collecting Werkzeug>=0.7 (from Flask==0.10.1->-r requirements.txt (line 1))
  Downloading Werkzeug-0.12-py2.py3-none-any.whl (312kB)
Collecting Jinja2>=2.4 (from Flask==0.10.1->-r requirements.txt (line 1))
  Downloading Jinja2-2.9.5-py2.py3-none-any.whl (340kB)
Collecting itsdangerous>=0.21 (from Flask==0.10.1->-r requirements.txt (line 1))
  Downloading itsdangerous-0.24.tar.gz (46kB)
Collecting MarkupSafe>=0.23 (from Jinja2>=2.4->Flask==0.10.1->-r requirements.txt (line 1))
  Downloading MarkupSafe-1.0.tar.gz
Installing collected packages: Werkzeug, MarkupSafe, Jinja2, itsdangerous, Flask
  Running setup.py install for MarkupSafe: started
    Running setup.py install for MarkupSafe: finished with status 'done'
  Running setup.py install for itsdangerous: started
    Running setup.py install for itsdangerous: finished with status 'done'
  Running setup.py install for Flask: started
    Running setup.py install for Flask: finished with status 'done'
Successfully installed Flask-0.10.1 Jinja2-2.9.5 MarkupSafe-1.0 Werkzeug-0.12 itsdangerous-0.24
 ---> 0de3e75604ef
Removing intermediate container f1814424d7e6
Step 5 : COPY . .
 ---> 731a390dabbd
Removing intermediate container c18df177d9df
Step 6 : CMD python -u main.py
 ---> Running in 57cac5778640
 ---> 579c2859dd81
Removing intermediate container 57cac5778640
Successfully built 579c2859dd81
- Cleaning up previous image of 'rainbow'
- Creating 'rainbow' container
- Starting 'rainbow' container

rdt push completed successfully!
* Streaming application logs..
 * Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
52.4.252.97 - - [10/Mar/2017 21:53:14] "GET / HTTP/1.1" 200 -
52.4.252.97 - - [10/Mar/2017 21:53:22] "GET / HTTP/1.1" 200 -
```

In your code you will still have access to most of the regular {{ $names.company.lower }} device features. For example, you will still be able to query and use the [supervisor API][supervisor API]. However, you will notice that your local mode device will not push logs back to the {{ $names.company.lower }} dashboard. You also won't be able to set environment or configuration variables from the dashboard, but you can set them in your `.{{ $names.company.short }}-sync.yml`.

## SSH into the running app container or host OS

If we want to run some test commands in our app container, we can do this easily using `{{ $names.company.short }} local ssh`. This command drops us directly into the selected container:
```
sudo {{ $names.company.short }} local ssh f340127.local
```
To connect to the host OS, we can add the `--host` option. From here, we can check system logs and [perform other troubleshooting tasks][troubleshooting]:

```
sudo {{ $names.company.short }} local ssh f340127.local --host
```
## Other useful local commands
There are many other {{ $names.company.short }} local commands, which can be used to stop containers, reconfigure device WiFi and a few other useful things.

```
local configure <target>            (Re)configure a {{ $names.os.lower }} drive or image                          
local flash <image>                 Flash an image to a drive                                       
local logs [deviceIp]               Get or attach to logs of a running container on a {{ $names.os.lower }} device
local promote [deviceIp]            Promote a {{ $names.os.lower }} device                                        
local ssh [deviceIp]                Get a shell into a {{ $names.os.lower }} device                               
local stop [deviceIp]               Stop a running container on a {{ $names.os.lower }} device   
```

[development]:/reference/OS/overview/2.x/#dev-vs-prod-images
[cli]:/reference/cli
[supervisor API]:/reference/supervisor/supervisor-api/
[compose-remote]:{{ $links.githubMain }}-playground/balenaos-compose
[troubleshooting]:/learn/manage/ssh-access/#troubleshooting-with-host-os-access
