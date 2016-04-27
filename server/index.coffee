path = require('path')
express = require('express')
consolidate = require('consolidate')
_ = require('lodash')
redirect = require('./redirect')
search = require('./search')
navTree = require('./nav.json')
swigHelper = require('../lib/swig-helper')
config = require('../config')

app = express()

consolidate.requires.swig = swigHelper.swig

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '..', 'templates'))

{ ACME_CHALLENGE, ACME_RESPONSE } = process.env
if ACME_CHALLENGE and ACME_RESPONSE
  app.use "/.well-known/acme-challenge/#{ACME_CHALLENGE}", (req, res) ->
    res.send(ACME_RESPONSE)

{ GOOGLE_VERIFICATION } = process.env
if GOOGLE_VERIFICATION
  if not GOOGLE_VERIFICATION.match(/\.html$/)
    GOOGLE_VERIFICATION += '.html'
  app.use "/#{GOOGLE_VERIFICATION}", (req, res) ->
    res.send("google-site-verification: #{GOOGLE_VERIFICATION}")

staticDir = path.join(__dirname, '..', 'static')
contentsDir = path.join(__dirname, '..', config.docsDestDir)

app.use(express.static(staticDir))

app.use (req, res, next) ->
  originalUrl = req.originalUrl
  url = redirect(originalUrl)
  if url isnt originalUrl
    return res.redirect(url)
  next()

templateLocals = _.assign({ nav: navTree }, config.templateLocals)
getLocals = (extra) ->
  _.assign {}, templateLocals, extra

app.get '/search-results', (req, res) ->
  { searchTerm } = req.query
  res.render 'search', getLocals
    title: "Search results for \"#{searchTerm}\""
    breadcrumbs: [
      'Search Results'
      searchTerm
    ]
    searchTerm: searchTerm
    searchResults: search.search(searchTerm)

app.use(express.static(contentsDir))

port = process.env.PORT ? 3000

app.listen port, ->
  console.log("Server started on port #{port}")
