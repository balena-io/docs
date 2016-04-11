var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.use(function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
