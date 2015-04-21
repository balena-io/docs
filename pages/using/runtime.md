# Runtime Environment

## Exposed Ports

Resin.io devices expose all ports by default, meaning you can run applications
which listen on any port without issue.

## Device URLS

Resin.io currently exposes port 8080 for web forwarding. To enable webforwarding, navigate to a device's actions tab on the resin.io dashboard and enable a public url for this device. Resin will then generate a url for that device.

![Enable device url](/img/screenshots/device-url.png)


Running a server listening on port 8080 with public device url enabled will allow you to serve content from the device to the world. Here is an example of an express server which will serve to the devices url. 

```javascript
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
