var express = require('express');
var app = express();

if (process.env.ACME_CHALLENGE && process.env.ACME_RESPONSE) {
  app.use('/.well-known/acme-challenge/' + process.env.ACME_CHALLENGE, function (req, res) {
    res.send(process.env.ACME_RESPONSE);
  });
}

if (process.env.GOOGLE_VERIFICATION) {
  var verificationCode = process.env.GOOGLE_VERIFICATION
  if (!verificationCode.match(/\.html$/)) {
    verificationCode += '.html'
  }
  app.use('/' + verificationCode, function (req, res) {
    res.send('google-site-verification: ' + verificationCode);
  });
}

app.use(express.static(__dirname));

app.use(function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
