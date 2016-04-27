path = require('path')
_ = require('lodash')

config = require('../config')
dicts = require('./dictionaries')
hbHelper = require('./hb-helper')

{ replacePlaceholders } = require('./util')

tokenizeSwitchText = (text) ->
  return if not text
  result = []
  start = 0
  re = /\$[\w_]+/g
  while match = re.exec(text)
    result.push(text.substring(start, match.index).trim())
    result.push(match[0])
    start = match.index + match[0].length
  result.push(text.substring(start).trim())
  return result

buildSinglePage = (templateObj, dynamicMeta, axesContext) ->
  { url, partials_search: partialsSearchOrder, switch_text: switchText } = dynamicMeta

  extRe = new RegExp("\\.#{config.docsExt}$")
  baseUrl = templateObj.originalRef
    .replace(extRe, '')
  context = _.assign({}, axesContext, {
    $baseUrl: baseUrl
  })

  urlTemplate = '/' + url.replace('$baseUrl', baseUrl)

  populate = (arg) ->
    return arg if not arg

    if _.isArray(arg)
      return _.map(arg, populate)
    else if _.isObject(arg)
      return _.mapValues(arg, populate)
    else if _.isString(arg)
      return replacePlaceholders(arg, context)

  obj = _.assign({}, templateObj, {
    title: hbHelper.render(templateObj.title, templateObj),
    $partials_search: populate(partialsSearchOrder)
    $dictionaries: dicts
    $axes_values: axesContext
    $url_template: urlTemplate
    $switch_text: tokenizeSwitchText(switchText)
  })

  key = "#{populate(url)}.#{config.docsExt}"
  return { "#{key}": obj }

buildPagesRec = (templateObj, dynamicMeta, axesContext, remainingAxes) ->
  if not remainingAxes?.length
    return buildSinglePage(templateObj, dynamicMeta, axesContext)

  result = {}
  nextAxis = remainingAxes[0]
  remainingAxes = remainingAxes[1...]

  nextAxisDict = dicts.getDict(nextAxis)

  for details in nextAxisDict
    nextAxisValue = details.id
    nextTemplateObj = _.assign({}, templateObj, {
      "#{nextAxis}": nextAxisValue
      "#{nextAxis}_details": details
    })
    nextContext = _.extend({}, axesContext, { "#{nextAxis}": nextAxisValue})
    _.assign(result, buildPagesRec(
      nextTemplateObj,
      dynamicMeta,
      nextContext,
      remainingAxes
    ))
  return result

buildDynamicPages = (originalRef, templateObj) ->
  console.log("Expanding dynamic page #{originalRef}")
  templateObj = _.assign({ originalRef }, templateObj)
  dynamicMeta = templateObj.dynamic_page
  { axes: axesNames } = dynamicMeta
  if not axesNames
    throw new Error("No axes defined for the dynamic page #{originalRef}.")
  for axisName in axesNames
    if axisName[0] isnt '$'
      throw new Error("Axis name must start with $ sign \"#{axisName}\".")
    dict = dicts.getDict(axisName)
    if not dict
      throw new Error("Unknown dictionary \"#{dictName}\".")
    templateObj["#{axisName}_dictionary"] = dict
  return buildPagesRec(templateObj, dynamicMeta, {}, axesNames)

exports.expand = (files) ->
  for file of files
    obj = files[file]
    if not obj.dynamic_page
      continue
    delete files[file]
    _.assign(files, buildDynamicPages(file, obj))
