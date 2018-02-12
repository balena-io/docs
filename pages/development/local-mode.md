---
title: Local Mode
excerpt: Developing locally on a resin.io device
thumbnail: /img/common/device/running-webterminal-session.png
---

Local mode is the new experimental development mode for resin.io. It allows you to build and sync code to a single development device in your local network without having to go through the whole git push, build, deployment pipeline. It uses the Docker daemon on the device to do the builds and starts the container up in very much the same way as the resin-supervisor would.

<img src="/img/local-mode/local-mode-diagram.png" width="100%">

In order to use local mode on a device:
* You must have the [resin CLI](https://docs.resin.io/tools/cli/) on your workstation.
* The device must be running resinOS v2.0 or higher with supervisor v4.0 or higher.
* The device must be running a [development][development] variant of the OS. If you try to use a production variant, you will not be able to use local mode. The production devices have SSH and the Docker socket locked down, both of which are needed for the local mode feature.
* Local mode must be enabled through the dashboard. To use local mode on a development device, click on the small *Actions* dropdown at the top right of the device page and select *Enable Local Mode*.

<img src="/img/local-mode/device-in-local-mode.png" width="80%">

### Scan the Network and Find your Device
Before we can get any code running, we first have to find our device. To do this we can use `resin local scan`.

All resin.io devices advertise themselves on the network using Avahi. All of their names are of the form `<short-uuid>.local`, where the short-uuid is the uuid you see on your device dashboard. The resin cli allows you to scan the network and discover your device.

**Command**
```
sudo resin local scan
```
**Output**
```
Reporting scan results
-
  host:          f340127.local
  address:       192.168.1.133
  dockerInfo:
    Containers:        2
    ContainersRunning: 1
    ContainersPaused:  0
    ContainersStopped: 1
    Images:            5
    Driver:            aufs
    SystemTime:        2017-03-10T21:11:21.849756652Z
    KernelVersion:     4.4.48
    OperatingSystem:   Resin OS 2.0.0-beta13.rev3
    Architecture:      armv7l
  dockerVersion:
    Version:    1.10.3
    ApiVersion: 1.22
```

### Push over a new project
Now that we know where our device is on the network we can start pushing some code to it. To do this we use the `resin local push` command. This command instructs the device to do a Docker build and then runs your container in the same configuration as the resin supervisor would. You can either pass the command your devices IP addess or `<short-uuid>.local` name. If you are feeling lazy you can even leave it out and you will be presented with a list of devices to choose from.

**Command**
```
sudo resin local push f340127.local -s .
```
**Output**
```
* Building..
- Stopping and Removing any previous 'rainbow' container
- Building new 'rainbow' image
Step 1 : FROM resin/raspberrypi3-python:3-slim
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

In your code you will still have access to most of the regular resin.io device features. For example, you will still be able to query and use the [supervisor API][supervisor API]. However, you will notice that your local mode device will not push logs back to the resin.io dashboard and you won't be able to set environment variables from the dashboard, but you can set them in you `.resin-sync.yml`.

### SSH into the Running App Container or HostOS

If we can to run some test commands in our app container, we can do this easily using `resin local ssh`, this command drops us directly into the selected container.
```
sudo resin local ssh f340127.local
```
If we want to rather check whats going on in the hostOS, to perhaps check logs or something else, we can add the `--host` option and we will land up in the devices hostOS and be able to run the usual Docker commands, etc.

```
sudo resin local ssh f340127.local --host
```
### Other useful resin local commands
There are many other resin local commands, which can be used to stop containers, reconfigure device wifi and a few other useful things.

```
local configure <target>            (Re)configure a resinOS drive or image                          
local flash <image>                 Flash an image to a drive                                       
local logs [deviceIp]               Get or attach to logs of a running container on a resinOS device
local promote [deviceIp]            Promote a resinOS device                                        
local ssh [deviceIp]                Get a shell into a resinOS device                               
local stop [deviceIp]               Stop a running container on a resinOS device   
```

[development]:/understanding/understanding-devices/2.0.0/#dev-vs-prod-images
[supervisor API]:/runtime/supervisor-api/
