var fs = require('fs');
var lunr = require('./static/lib/lunr.js/lunr.js');

var PAGES_PATH = './pages';

var idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('body');
});

function extractTitleFromText(body) {
  return body.substr(0, body.indexOf("\n")).replace(/\#\s?/, '').trim();
}

fs.readdir(PAGES_PATH, function(err, dir) {
  if (err) throw err;

  dir.forEach(function(dirName) {
      fs.readdir(PAGES_PATH + '/' + dirName,['*/'], function(err, file) {
      if (err) throw err;

          files.forEach(function(fileName) {
            var bodyText = fs.readFileSync(PAGES_PATH + '/' + fileName);
            bodyText = bodyText.toString();

            var title = extractTitleFromText(bodyText);
            var page = {
              id: fileName,
              title: title,
              body: bodyText
            };

            idx.add(page)
          });
      });
  });

  fs.writeFile('./lunr_index.json', JSON.stringify(idx), function (err) {
    if (err) throw err
    console.log('Successfull finished indexing.')
  })

});
