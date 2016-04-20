fs = require('fs')
path = require('path')
_ = require('lodash')
Metalsmith = require('metalsmith')
markdown = require('metalsmith-markdown')
permalinks = require('metalsmith-permalinks')
layouts = require('metalsmith-layouts')
{ extractTitleFromText } = require('./util')
Index = require('./lunr-index')
ParseNav = require('./parse-nav')

root = path.resolve(__dirname, '..')
config = require(path.join(root, 'config'))

skipPrivate = ->
  return (files, metalsmith, done) ->
    for file of files
      if path.parse(file).name.match(/^_/)
        delete files[file]
    done()

fixPageTitles = ->
  return (files, metalsmith, done) ->
    for file of files
      obj = files[file]
      obj.title or= extractTitleFromText(obj.contents.toString())
    done()

addImproveDocsLink = ->
  return (files, metalsmith, done) ->
    for file of files
      obj = files[file]
      obj.improveDocsLink = "#{config.editPageLink}/#{config.docsSourceDir}/#{file}"
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
  setRef = (node) ->
    if node.level? and node.ref
      result["#{node.ref}.md"] = node
    if node.children?
      for child in node.children
        setRef(child)
  setRef(navTree)
  return result

fixNavTitles = ->
  fixNavNodeTitle = (node, files) ->
    if node.level?
      node.title or= files["#{node.ref}.md"]?.title
      node.slug = node.title
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '-')
        .replace(/-{2,}/g, '-')
    if node.children?
      for child in node.children
        fixNavNodeTitle(child, files)

  return (files, metalsmith, done) ->
    fixNavNodeTitle(navTree, files)
    done()

calcNavPaths = ->
  addNavPath = (node, prevPath) ->
    if node.level?
      prevPath = prevPath.concat(node)
      node.path = prevPath
    if node.children?
      for child in node.children
        addNavPath(child, prevPath)
  return (files, metalsmith, done) ->
    addNavPath(navTree, [])
    done()

# needed because of https://github.com/superwolff/metalsmith-layouts/issues/83
removeNavBackRefs = ->
  removeBackRef = (node) ->
    delete node.parent
    delete node.path
    if node.children?
      for child in node.children
        removeBackRef(child)
  return (files, metalsmith, done) ->
    removeBackRef(navTree)
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

addRefs = ->
  return (files, metalsmith, done) ->
    for file of files
      files[file].ref = file
      files[file].selfLink = '/' + file.replace(/\.md$/, '')
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

console.log('Building static HTML...')
Metalsmith(root)
.source(config.docsSourceDir)
.destination(config.docsDestDir)
.use(skipPrivate())

.use(fixPageTitles())
.use(addRefs())

.use(fixNavTitles())
.use(calcNavPaths())

.use(setBreadcrumbs())
.use(setNavPaths())
.use(addImproveDocsLink())

.use(buildIndex())

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
