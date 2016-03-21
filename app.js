var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(require('prerender-node').set('prerenderToken', 'KoM2A547jD1EZCnwbTCW'));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
