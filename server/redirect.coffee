path = require('path')
fs = require('fs')
_ = require('lodash')

root = path.resolve(__dirname, '..')

redirects = fs.readFileSync(path.join(root, 'config', 'redirects.txt'))
.toString()
.split('\n')
.map (s) -> s.trim()
.filter (s) -> s && s[0] isnt '#'
.map (s) -> s.split(/\s*->\s*/)
.filter ([ match, replace ]) -> !!match
.map ([ match, replace ]) -> [
  new RegExp(match)
  replace or ''
]

module.exports = _.memoize (originalUrl) ->
  url = originalUrl
  console.log originalUrl
  for [ match, replace ] in redirects
    if match.test(url)
      url = url.replace(match, replace)
      console.log '  ->', url
  return url
