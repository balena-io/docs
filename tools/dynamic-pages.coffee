_ = require('lodash')
path = require('path')

root = path.resolve(__dirname, '..')
config = require(path.join(root, 'config'))
dicts = require(path.join(root, 'dictionaries'))

buildPagesFinal = (templateObj, dynamicMeta, axesNames, axesValues) ->
  { url_suffix: urlSuffix, partials_search: partialsSearchOrder } = dynamicMeta

  populate = (arg) ->
    return arg if not arg
    if _.isArray(arg)
      return _.map(arg, populate)
    else if _.isObject(arg)
      return _.mapValues(arg, populate)
    else if _.isString(arg)
      for axis, i in axesNames
        value = axesValues[i]
        re = new RegExp(_.escapeRegExp(axis), 'ig')
        arg = arg.replace(re, value)
      return arg

  urlSuffix = populate(urlSuffix)
  obj = _.assign({}, templateObj, {
    title: populate(templateObj.title)
    $url_suffix: urlSuffix
    $partials_search: populate(partialsSearchOrder)
  })

  extRe = new RegExp("\\.#{config.docsExt}$")
  key = templateObj.originalRef
    .replace(extRe, "#{urlSuffix}.#{config.docsExt}")

  return { "#{key}": obj }

buildPagesRec = (templateObj, dynamicMeta, axesNames, definedAxes, remainingAxes) ->
  if not remainingAxes?.length
    return buildPagesFinal(templateObj, dynamicMeta, axesNames, definedAxes)

  result = {}
  nextAxis = remainingAxes[0]
  remainingAxes = remainingAxes[1...]

  dictName = nextAxis[1...]
  nextAxisDict = dicts[dictName]

  for details in nextAxisDict
    nextAxisValue = details.id
    _.assign(result, buildPagesRec(
      _.assign({}, templateObj, {
        "#{nextAxis}": nextAxisValue
        "#{nextAxis}_details": details
      }),
      dynamicMeta,
      axesNames,
      definedAxes.concat(nextAxisValue),
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
    dictName = axisName[1...]
    dict = dicts[dictName]
    if not dict
      throw new Error("Unknown dictionary \"#{dictName}\".")
    templateObj["#{axisName}_dictionary"] = dict
  return buildPagesRec(templateObj, dynamicMeta, axesNames, [], axesNames)

exports.expand = (files) ->
  for file of files
    obj = files[file]
    if not obj.dynamic_page
      continue
    delete files[file]
    _.assign(files, buildDynamicPages(file, obj))
