fs = require('fs')
path = require('path')
_ = require('lodash')
Metalsmith = require('metalsmith')
markdown = require('metalsmith-markdown')
permalinks = require('metalsmith-permalinks')
layouts = require('metalsmith-layouts')
inplace = require('metalsmith-in-place')
consolidate = require('consolidate')
{ extractTitleFromText, walkTree, slugify, replacePlaceholders } = require('./util')
Index = require('./lunr-index')
ParseNav = require('./parse-nav')
swigHelper = require('./swig-helper')
hbHelper = require('./hb-helper')
dynamicPages = require('./dynamic-pages')
dicts = require('./dictionaries')

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
searchIndex = Index.create()
buildSearchIndex = ->
  return (files, metalsmith, done) ->
    for file of files
      obj = files[file]
      searchIndex.add
        id: file
        title: obj.title
        body: obj.contents.toString()
    indexFilePath = path.join(root, 'server', 'lunr_index.json')
    searchIndex.write indexFilePath, (err) ->
      throw err if err
      console.log('Successfully finished indexing.')
      done()

console.log('Building navigation index...')
navTree = ParseNav.parse()

navByFile = do ->
  result = {}

  setRefRec = (ref, node, remainingAxes) ->
    if not remainingAxes?.length
      return setRef(ref, node)
    nextAxis = remainingAxes[0]
    remainingAxes = remainingAxes[1...]
    for value in dicts.getValues(nextAxis)
      setRefRec(
        replacePlaceholders(ref, { "#{nextAxis}": value }),
        node,
        remainingAxes
      )

  setRef = (ref, node) ->
    return if not ref
    if ref.match(/\$/)
      setRefRec(ref, node, dicts.dictNames)
    else
      result["#{ref}.#{config.docsExt}"] = node

  setRefs = walkTree
    visitNode: (node) ->
      if node.level?
        setRef(node.ref, node)
  setRefs(navTree)
  return result

fixNavTitles = ->
  fixNavNodeTitle = walkTree
    visitNode: (node, files) ->
      if node.level?
        node.title or= files["#{node.ref}.#{config.docsExt}"]?.title
        node.slug = slugify(node.title)

  return (files, metalsmith, done) ->
    fixNavNodeTitle(navTree, files)
    done()

calcNavParents = ->
  addNavParents = walkTree
    visitNode: (node, parents) ->
      if node.level?
        node.parents = parents.concat(node)
    buildNextArgs: (node, parents) ->
      if node.level?
        [ parents.concat(node) ]
      else
        [ parents ]

  return (files, metalsmith, done) ->
    addNavParents(navTree, [])
    done()

# needed because of https://github.com/superwolff/metalsmith-layouts/issues/83
removeNavBackRefs = ->
  removeBackRefs = walkTree
    visitNode: (node) ->
      delete node.parent
      delete node.parents

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
    # TODO: this logic is twisted and should be improved
    obj.breadcrumbs = navByFile[file]?.parents
      .map (node) -> node.title
    navNode = navByFile[file]
    if navNode?.isDynamic and obj.breadcrumbs?.length
      obj.breadcrumbs[obj.breadcrumbs.length - 1] =
        hbHelper.render(navNode.titleTemplate, obj)
  return (files, metalsmith, done) ->
    for file of files
      setBreadcrumbsForFile(file, files[file])
    done()

setNavPaths = ->
  setPathForFile = (file, obj) ->
    obj.navPath = {}
    if navPath = navByFile[file]?.parents
      for node in navPath
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

consolidate.requires.handlebars = hbHelper.Handlebars
consolidate.requires.swig = swigHelper.swig

console.log('Building static HTML...')
Metalsmith(root)
.source(config.docsSourceDir)
.destination(config.docsDestDir)
.use(skipPrivate())

.use(expandDynamicPages())
.use(populateFileMeta())

.use(fixNavTitles())
.use(calcNavParents())

.use(setBreadcrumbs())
.use(setNavPaths())

.use(buildSearchIndex())

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
