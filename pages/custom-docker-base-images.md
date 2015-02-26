# Custom Base Images for your Fleet

Raspbian and Debian are great, but sometimes you just want to let your hair loose and get crazy with Arch Linux or some other distro. With resin.io this is actually pretty easy and what follows are a few simple steps to get your own custom base image.

__Note:__ This guide assumes some knowledge of [Docker][docker] and expects that you have docker or somekind or boot2docker installed on your host machine. It also expects you to have an account over at the [docker hub][dockerhub-link].

### Step 1:
First things, first. Find image you like on [dockerhub][dockerhub-link] or build your own from [here][resin-docker-blog]. Remember this image needs to be architecture specific, i.e. an Ubuntu base image is not going to work on your raspberry pi B+.

For this step, we selected [digitallyseamless/archlinux-armv6h][rpi-archlinux-link], which is an Arch Linux distribution targeting armv6, the architecture of the raspberry pi A and B.

__Note:__ The newer Raspberry Pi 2 has a different architecture based on armv7 and will in fact work with Ubuntu.

### Step 2:
Next clone this [repo][docker-custom-base-os-repo] and edit the `Dockerfile`, so that it bases from the dockerhub image you selected in step 1.
This is what it should look like for the Arch Linux image:
```
FROM digitallyseamless/archlinux-armv6h

COPY qemu-arm-static /usr/bin/
```

This image builds qemu-arm into your base image. This is needed in the resin.io builder so that all your code can be correctly cross compiled for the targeted ARM architecture.

### Step 3:
From this point, we are going to dive into docker land, so make sure you are familiar with docker commands. If you are unsure of building docker images, start with a little reading from over [here][docker-create-images-link]

From the terminal cd into the folder you cloned in step 2 and run:
```
docker build -t myDockerHubName/myNewBaseImageName .
```
Where `myDockerHubName` is your account name on [docker hub][dockerhub-link] and `myNewBaseImageName` is some fancy name you came up with for your new base image.

__Note:__ The period `.` at the end of this command is important!!

This will take a short while to pull down the image from docker hub and build it. Once it is finished you should be able to see it in your docker images list by doing:
```
docker images
```


### Step 4:
Again from the terminal run:
```
docker push myDockerHubName/myNewBaseImageName
```

After a short while you should have your new base image reading and waiting on dockerhub.

### Step 5:
Make a new resin.io project that uses your new image as its base. It could look like this in the case of the Arch Linux ARM example:
```
FROM shaunmulligan/arch-armv6h-resin

RUN pacman -Sy --noconfirm python2 python2-flask dropbear

RUN dropbearkey -t dss -f etc/dropbear/dropbear_dss_host_key
RUN dropbearkey -t rsa -f /etc/dropbear/dropbear_rsa_host_key

COPY . /app

CMD ["bash", "/app/start.sh"]
```

This is from my [demo project][example-archlinux], which just launches an ssh daemon and small hello world python-flask server on boot.

One pretty cool consequence of this is that users can share their base images, for instance you can now base you resin.io projects on shaunmulligan/arch-arm6h-resin because it is a public image.

So there you have it. Brand new base images for your resin.io projects in 4 simple steps (step 5 doesnt really count :P ).

[docker]:https://www.docker.com/
[dockerfile]:https://docs.docker.com/reference/builder/
[docker-registry]:https://registry.hub.docker.com/u/resin/rpi-raspbian/tags/manage/
[resin-docker-blog]:https://resin.io/blog/docker-on-raspberry-pi/
[dockerhub-link]:https://registry.hub.docker.com/search?q=rpi
[rpi-archlinux-link]:https://registry.hub.docker.com/u/digitallyseamless/archlinux-armv6h/
[docker-custom-base-os-repo]:https://github.com/nghiant2710/base-os-image-example
[docker-create-images-link]:https://docs.docker.com/userguide/dockerimages/#creating-our-own-images
[example-archlinux]:https://github.com/shaunmulligan/resin-archlinux-rpi