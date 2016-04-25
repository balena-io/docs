fs = require('fs')
path = require('path')
_ = require('lodash')


DIR = "../dictionaries"

files = fs.readdirSync(path.resolve(__dirname, DIR))
  .filter (file) -> file.match(/\.(js|coffee|json)$/)
  .map (file) ->
    ext = path.extname(file)
    return path.basename(file, ext)

module.exports = dicts = {}

for file in files
  dicts["$#{file}"] = require("#{DIR}/#{file}")

keys = files.map (file) -> "$#{file}"

dicts.dictNames = keys

dicts.getDict = (key) -> dicts[key]

dicts.getValues = (key) ->
  _.map dicts[key], 'id'

dicts.getDetails = (key, id) ->
  _.find dicts.getDict(key), { id }

dicts.getDefault = (key) ->
  _.first(dicts.getDict(key))?.id

dicts.getDefaults = ->
  result = {}
  for key in keys
    result[key] = dicts.getDefault(key)
  return result
