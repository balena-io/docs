fs = require('fs')
lunr = require('lunr')

exports.create = ->
  lunrIdx = lunr ->
    this.ref('id')
    this.field('title', boost: 10)
    this.field('body')

  docsIdx = {}

  return {

    add: (page) ->
      lunrIdx.add(page)
      docsIdx[page.id] = page.title

    write: (path, cb) ->
      data = JSON.stringify({ idx: lunrIdx, docsIdx })
      fs.writeFile(path, data, cb)

  }
