_ = require('lodash')

exports.extractTitleFromText = (body) ->
  headings = body
    .split('\n')
    .map (s) -> s.trim()
    .filter (s) -> s[0] is '#'
    .filter (s, i) -> i is 0
  return headings[0]?.replace(/\#+\s?/, '')

exports.walkTree = ({ visitNode, buildNextArgs }) ->
  self = (node, restArgs...) ->
    visitNode(node, restArgs...)
    if node.children?
      nextArgs = if buildNextArgs? then buildNextArgs(node, restArgs...) else restArgs
      for child in node.children
        self(child, nextArgs...)

  return self

exports.slugify = (s) ->
  s.toLowerCase()
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '')

exports.stringifyPairs = (obj) ->
  s = []
  for key, value of obj
    s.push("#{key}: #{value}")
  return s.join(', ')

exports.replacePlaceholders = (arg, context) ->
  for key, value of context
    re = new RegExp(_.escapeRegExp(key), 'g')
    arg = arg.replace(re, value)
  return arg
