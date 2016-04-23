fs = require('fs')
path = require('path')
root = path.resolve(__dirname, '..')

fixLinks = (node) ->
  if node.level and not node.link
    if not node.children?.length
      throw new Error("No link and no child lines. #{node.raw}")
    node.link = node.children[0].link
  if node.children?
    for child in node.children
      fixLinks(child)

calcRefs = (node) ->
  if node.level
    { link } = node
    ref = if link[0] is '/' then link[1..] else null
    node.ref = ref

  if node.level? and not node.ref and not node.title
    throw new Error("No title for external link node. #{node.raw}")
  if node.children?
    for child in node.children
      calcRefs(child)

exports.parse = ->
  lines = fs.readFileSync(path.join(root, 'navigation.txt'))
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
    return { level, raw, title, link }

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

ppNode = (node, indent = '') ->
  title = node.title or '(No title)'
  link = if node.level then "[#{node.link}]" else ''
  console.log "#{indent}|--#{title}#{link}"
  if node.children?
    for child in node.children
      ppNode(child, indent + '|  ')

exports.pp = (parsed) ->
  ppNode(parsed)
