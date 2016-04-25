fs = require('fs')
path = require('path')
_ = require('lodash')
Metalsmith = require('metalsmith')
markdown = require('metalsmith-markdown')
permalinks = require('metalsmith-permalinks')
layouts = require('metalsmith-layouts')
inplace = require('metalsmith-in-place')
Handlebars = require('handlebars')
consolidate = require('consolidate')
{ extractTitleFromText, walkTree, slugify } = require('./util')
Index = require('./lunr-index')
ParseNav = require('./parse-nav')
hbHelper = require('./hb-helper')
dynamicPages = require('./dynamic-pages')

root = path.resolve(__dirname, '..')
config = require(path.join(root, 'config'))

skipPrivate = ->
  return (files, metalsmith, done) ->
    for file of files
      if path.parse(file).name.match(/^_/)
        delete files[file]
    done()

populateFileMeta = ->
  extRe = new RegExp("\\.#{config.docsExt}$")

  return (files, metalsmith, done) ->
    for file of files
      obj = files[file]
      obj.title or= extractTitleFromText(obj.contents.toString())
      obj.improveDocsLink = "#{config.editPageLink}/#{config.docsSourceDir}/#{file}"
      obj.ref = file
      obj.selfLink = '/' + file.replace(extRe, '')

    done()

console.log('Building search index...')
index = Index.create()
buildIndex = ->
  return (files, metalsmith, done) ->
    for file of files
      obj = files[file]
      index.add
        id: file
        title: obj.title
        body: obj.contents.toString()
    index.write path.join(root, 'server', 'lunr_index.json'), (err) ->
      throw err if err
      console.log('Successfully finished indexing.')
      done()

console.log('Building navigation index...')
navTree = ParseNav.parse()

navByFile = do ->
  result = {}
  setRef = walkTree
    visitNode: (node) ->
      if node.level? and node.ref
        result["#{node.ref}.#{config.docsExt}"] = node
  setRef(navTree)
  return result

fixNavTitles = ->
  fixNavNodeTitle = walkTree
    visitNode: (node, files) ->
      if node.level?
        node.title or= files["#{node.ref}.md"]?.title
        node.slug = slugify(node.title)

  return (files, metalsmith, done) ->
    fixNavNodeTitle(navTree, files)
    done()

calcNavPaths = ->
  addNavPath = walkTree
    visitNode: (node, prevPath) ->
      if node.level?
        node.path = prevPath.concat(node)
    buildNextArgs: (node, prevPath) ->
      if node.level?
        [ prevPath.concat(node) ]
      else
        [ prevPath ]

  return (files, metalsmith, done) ->
    addNavPath(navTree, [])
    done()

# needed because of https://github.com/superwolff/metalsmith-layouts/issues/83
removeNavBackRefs = ->
  removeBackRefs = walkTree
    visitNode: (node) ->
      delete node.parent
      delete node.path

  return (files, metalsmith, done) ->
    removeBackRefs(navTree)
    done()

serializeNav = ->
  return (files, metalsmith, done) ->
    filename = path.join(root, 'server', 'nav.json')
    fs.writeFile filename, JSON.stringify(navTree), (err) ->
      throw err if err
      console.log('Successfully serialized navigation tree.')
    done()

setBreadcrumbs = ->
  setBreadcrumbsForFile = (file, obj) ->
    obj.breadcrumbs = navByFile[file]?.path
      .map (node) -> node.title
  return (files, metalsmith, done) ->
    for file of files
      setBreadcrumbsForFile(file, files[file])
    done()

setNavPaths = ->
  setPathForFile = (file, obj) ->
    obj.navPath = {}
    if navByFile[file]?.path
      for node in navByFile[file]?.path
        obj.navPath[node.link] = true
        obj.navPath[node.slug] = true
  return (files, metalsmith, done) ->
    for file of files
      setPathForFile(file, files[file])
    done()

expandDynamicPages = ->
  return (files, metalsmith, done) ->
    dynamicPages.expand(files)
    done()

Handlebars.registerHelper 'import', hbHelper.importHelper
consolidate.requires.handlebars = Handlebars

console.log('Building static HTML...')
Metalsmith(root)
.source(config.docsSourceDir)
.destination(config.docsDestDir)
.use(skipPrivate())

.use(populateFileMeta())
.use(expandDynamicPages())

.use(fixNavTitles())
.use(calcNavPaths())

.use(setBreadcrumbs())
.use(setNavPaths())

.use(buildIndex())

.use(inplace({
  engine: 'handlebars',
  pattern: '**/*.md',
  partials: 'shared'
}))

.use(markdown())
.use(permalinks())

.use(removeNavBackRefs())
.use(serializeNav())

.use(layouts({
  engine: 'swig',
  directory: 'templates',
  default: 'default.html',
  locals: _.assign({ nav: navTree }, config.templateLocals)
}))
.build (err) ->
  throw err if err
  console.log('Done')
