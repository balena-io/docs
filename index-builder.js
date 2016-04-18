var fs = require('fs')
var lunr = require('./bower_components/lunr.js/lunr.js')
var async = require('async')

var PAGES_PATH = './pages'
var NAV_FILE = './navigation.md'

var idx = lunr(function () {
  this.ref('id')
  this.field('title', { boost: 10 })
  this.field('body')
})

var docsIdx = {}

var navigationIdx = (function () {
  var idx = {}
  var navigation = fs.readFileSync(NAV_FILE).toString()
  var LINK_RE = /\[(.+)\]\(\/pages\/(.+?)(\.md)?\)/g
  var match
  while (match = LINK_RE.exec(navigation)) {
    idx[match[2]] = match[1]
  }
  return idx
}())

function extractTitleFromText(body) {
  return body.substr(0, body.indexOf("\n")).replace(/\#+\s?/, '').trim()
}

function write() {
  var data = JSON.stringify({
    idx: idx, docsIdx: docsIdx
  })
  fs.writeFile('./lunr_index.json', data, function (err) {
    if (err) throw err
    console.log('Successfully finished indexing.')
  })
}

fs.readdir(PAGES_PATH + '/', function(err, dir) {
  if (err) throw err

  async.forEach(dir, function(dirName, callBackOuter) {
    fs.readdir(PAGES_PATH + '/' + dirName + '/', function(err, file) {
      if (err) throw err

      async.forEach(file, function(fileName, callBackInner) {
        var bodyText = fs
          .readFileSync(PAGES_PATH + '/' + dirName + '/' + fileName)
          .toString()

        var title = extractTitleFromText(bodyText)
        var ref = dirName + "/" + fileName.replace(/\.md$/, '')
        var page = {
          id: ref,
          title: title,
          body: bodyText,
        }

        idx.add(page)
        docsIdx[ref] = navigationIdx[ref] || title
        callBackInner()
      }, function(err) {
        // success, all files iterated
        callBackOuter()
        console.log(dirName + ' directory proccessed.')
      })

    })
  }, function(err) {
    // success, all folders iterated
    // only write once all pages are added
    write()
  })
})
