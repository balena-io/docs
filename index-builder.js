var fs = require('fs');
var lunr = require('./static/lib/lunr.js/lunr.js');
var async = require('async');
var PAGES_PATH = './pages';

var idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('body');
});

function extractTitleFromText(body) {
  return body.substr(0, body.indexOf("\n")).replace(/\#\s?/, '').trim();
}

function write() {
    fs.writeFile('./lunr_index.json', JSON.stringify(idx), function (err) {
      if (err) throw err
      console.log('Successfull finished indexing.')
    });
}

fs.readdir(PAGES_PATH + '/', function(err, dir) {
  if (err) throw err;
    async.forEach(dir, function(dirName, callBackOuter) {

        fs.readdir(PAGES_PATH + '/' + dirName + '/', function(err, file) {
          if (err) throw err;

          async.forEach(file, function(fileName, callBackInner) {
            var bodyText = fs.readFileSync(PAGES_PATH + '/' + dirName + '/' + fileName);
            bodyText = bodyText.toString();

            var title = extractTitleFromText(bodyText);
            var page = {
              id: dirName + "/" + fileName,
              title: title,
              body: bodyText,
            };

            idx.add(page);
            callBackInner();

          }, function(err) {
            // success, all files iterated
            callBackOuter();
            console.log(dirName + ' directory proccessed.')
          }); // foreach file

        });

    }, function(err) {
        // success, all folders iterated
        //only write once all pages are added
        write();
    }); // forEach folder
});
