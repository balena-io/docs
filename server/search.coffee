lunr = require('lunr')
indexDump = require('./lunr_index.json')

index = {
  lunr: lunr.Index.load(indexDump.idx),
  docs: indexDump.docsIdx
}

exports.search = (searchTerm) ->
  return index.lunr.search(searchTerm)
  .map (result) ->
    { ref } = result
    return {
      id: ref,
      title: index.docs[ref],
      link: '/' + ref
    }
