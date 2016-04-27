fs = require('fs')
path = require('path')
_ = require('lodash')
{ walkTree } = require('./util')

root = path.resolve(__dirname, '..')

fixLinks = walkTree
  visitNode: (node) ->
    if node.level and not node.link
      if not node.children?.length
        throw new Error("No link and no child lines. #{node.raw}")
      node.isGateway = true
      node.link = node.children[0].link

calcRefs = walkTree
  visitNode: (node) ->
    if node.level
      { link } = node
      ref = if link[0] is '/' then link[1..] else null
      node.ref = ref

    if node.level? and not node.ref and not node.title
      throw new Error("No title for external link node. #{node.raw}")

exports.parse = ->
  lines = fs.readFileSync(path.join(root, 'config', 'navigation.txt'))
  .toString()
  .split('\n')
  .map (s) -> s.trimRight()
  .filter (s) -> s and not s.match(/\s*#/)
  .map (s) ->
    [ pad, line ] = s.match(/^(\s*)(.*)$/)[1..]
    if pad.length % 2 or not pad.match(/^ *$/)
      throw new Error("Wrong indent! Must be even and spaces-only. #{s}")
    return { level: pad.length / 2, raw: line }
  .map ({ level, raw }) ->
    [ title, skip, link ] = raw.match(/^([^\[]+)?(\[(.+)\])?$/)[1..]
    node = { level, raw, title, link }
    if link?.match(/\$/)
      node.isDynamic = true
      linkReParts = link.split(/\$[\w_]+/).map(_.escapeRegExp)
      node.linkRe = new RegExp('^' + linkReParts.join('.*') + '$')
      if not title
        throw new Error("Dynamic pages must specify the title. #{raw}")
      titleParts = title.split(/\s*~\s*/)
      node.title = titleParts[0]
      node.titleTemplate = titleParts[1] or titleParts[0]
    return node

  trees = []
  currentNode = null

  for line in lines
    if not currentNode?
      if line.level isnt 0
        throw new Error("First line must have no indent. #{line.raw}")

      trees.push(line)
    else
      if line.level > currentNode.level + 1
        throw new Error("Indent too big. #{line.raw}")

      while currentNode and line.level <= currentNode.level
        currentNode = currentNode.parent
      if not currentNode
        trees.push(line)
      else
        currentNode.children ?= []
        currentNode.children.push(line)
        line.parent = currentNode

    currentNode = line

  result =
    level: null
    ref: undefined
    link: null
    title: '<root>'
    raw: '<root>'
    children: trees

  fixLinks(result)
  calcRefs(result)

  return result

ppNode = walkTree
  visitNode: (node, indent = '') ->
    title = node.title or '(No title)'
    link = if node.level then "[#{node.link}]" else ''
    console.log "#{indent}|--#{title}#{link}"
  buildNextArgs: (node, indent = '') ->
    [ indent + '|  ' ]

exports.pp = (parsed) ->
  ppNode(parsed)
