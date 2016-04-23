fs = require('fs')
path = require('path')

DIR = "dictionaries"

files = fs.readdirSync("./#{DIR}")
  .filter (file) -> file.match(/\.(js|coffee|json)$/)
  .map (file) ->
    ext = path.extname(file)
    return path.basename(file, ext)

dicts = {}
for file in files
  dicts[file] = require("./#{DIR}/#{file}")

module.exports = dicts
