swig = require('swig')
_ = require('lodash')
dicts = require('./dictionaries')

{ replacePlaceholders } = require('./util')

isCurrentPage = (navNode, selfLink) ->
  if navNode.isDynamic
    return selfLink.match(navNode.linkRe)
  return selfLink is navNode.link

swig.setFilter 'isCurrentPage', isCurrentPage

populateDynamic = (template, axesValues) ->
  defaults = dicts.getDefaults()
  context = _.assign({}, defaults, axesValues)
  replacePlaceholders(template, context)

swig.setFilter 'getLink', (navNode, selfLink) ->
  if isCurrentPage(navNode, selfLink)
    return selfLink
  else
    return populateDynamic(navNode.link)

swig.setFilter 'getTitle', (navNode, selfLink, title) ->
  if isCurrentPage(navNode, selfLink) and navNode.isDynamic
    return title
  else
    return navNode.title


swig.setFilter 'isCurrentTree', (navNode, navPath) ->
  return navPath[navNode.link]

exports.swig = swig
