path = require('path')

config = require('./index')
links = require('./links')
names = require('./names')

root = path.resolve(__dirname, '..')

module.exports = {
  docsExt: config.docsExt
  rootDir: root
  sourceDir: config.docsSourceDir
  destDir: config.docsDestDir
  templatesDir: config.templatesDir
  partialsDir: config.partialsDir
  metaExtra: (fileName) ->
    fileMatch = fileName.match(config.dynamicDocs)
    improveDocsLink: if fileMatch then "#{config.editPageLink}/#{config.partialsDir}/#{fileMatch[1]}" else "#{config.editPageLink}/#{config.docsSourceDir}/#{fileName}"
    $links: links
    $names: names
  layoutLocals: config.layoutLocals
  parseNav: true
  serializeNav: path.join(root, 'server', 'nav.json')
  buildLunrIndex: path.join(root, 'server', 'lunr_index.json')
  pathPrefix: config.pathPrefix
}
