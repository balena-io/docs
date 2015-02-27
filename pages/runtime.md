# Runtime Environment

## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue.

## Device URLS

Resin.io currently exposes port 8080 for web forwarding. To enable webforwarding, navigate to a device's actions tab on the resin.io dashboard and enable a public url for this device. Resin will then generate a url for that device.

![Enable device url](/img/screenshots/device-url.png)


Running a server listening on port 8080 with public device url enabled will allow you to serve content from the device to the world. Here is an example of an express server which will serve to the devices url. 

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
```

## Environment Variables

Resin.io exposes runtime data to programs running on devices to enable you to
adapt your programs to specific runtime configurations.

We currently expose these via [environment variables][env_vars]:-

* `RESIN_DEVICE_UUID` - The unique identifier associated with the device the
  program is running on. Read-only.

## Persistent Storage

Applications can store data in the `/data` folder mounted on the application's
file system. This folder is guaranteed to be maintained across updates and thus
files contained in it can act as persistent storage.

Note that this folder is __not__ mounted when your project is building on our
build server, and is only created once your project is deployed to your actual
devices.

Additionally, the `/data` folder is created per-device and it not kept in sync
between devices, so ensure your application takes this into account.

[env_vars]:http://en.wikipedia.org/wiki/Environment_variable
