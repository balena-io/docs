# Runtime Environment

## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue. There is no need to have the docker `EXPOSE` command in your `Dockerfile`.

## Device URLS

Resin.io currently exposes port 80 for web forwarding. To enable web forwarding on a specific device, navigate to the device's **actions** tab on the resin.io dashboard and select the `Enable a public url for this device` checkbox. Resin will then generate a web accessable url for the device. The URL will be of the form `<RESIN_DEVICE_UUID>.resindevice.io`, where `<RESIN_DEVICE_UUID.` is the unique ID of the device which you can see on your dashboard.

![Enable device url](/img/screenshots/device-url-new.png)


Running a server listening on port 80 with public device url enabled will allow you to serve content from the device to the world. Here is an example of an [express.js][expressjs-link] server which will serve to the devices url. 

```javascript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
```

## Persistent Storage		
		
If you want specific data or configurations to persist on the device through the update process, you will need to store them in `/data` . `/data` is a special folder on the device file system which is essentially a [docker data `VOLUME`][docker-volume-link].

This folder is guaranteed to be maintained across updates and thus		
files contained in it can act as persistent storage.		
		
Note that this folder is __not__ mounted when your project is building on our		
build server, so you can't access it from your `Dockerfile`. It is only created once your project is deployed to the actual devices. 		
		
Additionally, it is worth mentioning that the `/data` folder is created per-device and it is not kept in sync between devices in your fleet, so ensure your application takes this into account.

[expressjs-link]:http://expressjs.com/
[docker-volume-link]:https://docs.docker.com/userguide/dockervolumes/
