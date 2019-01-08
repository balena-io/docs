path = require('path')
fs = require('fs')
_ = require('lodash')

root = path.resolve(__dirname, '..')

module.exports = (options = {}) ->
  prefix = options.pathPrefix

  redirects = fs.readFileSync(path.join(root, 'config', 'redirects.txt'))
  .toString()
  .split('\n')
  .map (s) -> s.trim()
  .filter (s) -> s && s[0] isnt '#'
  .map (s) -> s.split(/\s*->\s*/)
  .filter ([ match, replace ]) -> !!match
  .map ([ match, replace ]) ->
    if prefix
      return [
        new RegExp(match.replace(/\^\\\//, "^#{prefix}/")),
        if replace then prefix + replace else ''
      ]

    [ new RegExp(match), replace or '' ]

  _.memoize (originalUrl) ->
    for [ match, replace ] in redirects
      console.error('checking redirect', match, replace)
      if match.test(originalUrl)
        newUrl = originalUrl.replace(match, replace)
        console.log 'redirecting', originalUrl, '->', newUrl
        return newUrl

    originalUrl

