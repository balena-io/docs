exports.extractTitleFromText = (body) ->
  headings = body
    .split('\n')
    .map (s) -> s.trim()
    .filter (s) -> s[0] is '#'
    .filter (s, i) -> i is 0
  return headings[0]?.replace(/\#+\s?/, '')
