_ = require('lodash')
Handlebars = require('handlebars')

exports.compileTemplate = compileTemplate = _.memoize (tpl) ->
  Handlebars.compile(tpl)

exports.getPartial = getPartial = _.memoize (key) ->
  partial = Handlebars.partials[key]
  return if not partial
  compileTemplate(partial)

exports.getBestPartial = getBestPartial = (prefix, options, sep = '/') ->
  for option in options
    partial = getPartial("#{prefix}#{sep}#{option}")
    return partial if partial

exports.importHelper = (prefix) ->
  if not this.dynamic_page
    throw new Error("Using import in non-dynamic page #{this.ref}.")
  partial = getBestPartial(prefix, this.$partials_search)
  if partial
    return new Handlebars.SafeString(partial(this))
  throw new Error("Can't find any matching import for \"#{prefix}\".")
