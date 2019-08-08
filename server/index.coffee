path       = require('path')
express    = require('express')
_          = require('lodash')
Doxx       = require('@resin.io/doxx')
navTree    = require('./nav.json')
config     = require('../config')
redirect   = require('./redirect')({ pathPrefix: config.pathPrefix })
doxxConfig = require('../config/doxx')
redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

app = express()
app.use(redirectToHTTPS([/localhost:(\d{4})/]))
doxx = Doxx(doxxConfig)
doxx.configureExpress(app)

{ GOOGLE_VERIFICATION } = process.env
if GOOGLE_VERIFICATION
  if not GOOGLE_VERIFICATION.match(/\.html$/)
    GOOGLE_VERIFICATION += '.html'
  app.use "/#{GOOGLE_VERIFICATION}", (req, res) ->
    res.send("google-site-verification: #{GOOGLE_VERIFICATION}")

staticDir = path.join(__dirname, '..', 'static')
contentsDir = path.join(__dirname, '..', config.docsDestDir)

app.use("#{config.pathPrefix}/", express.static(staticDir))

app.use (req, res, next) ->
  originalUrl = req.originalUrl
  url = redirect(originalUrl)

  if url isnt originalUrl
    return res.redirect(url)
  next()

getLocals = (extra) ->
  doxx.getLocals({ nav: navTree }, extra)

doxx.loadLunrIndex()

console.error('serving everything under pathPrefix:', "#{config.pathPrefix}")
app.use("#{config.pathPrefix}/", express.static(contentsDir))

app.get '*', (req, res) ->
  res.redirect("#{config.pathPrefix}/404")

port = process.env.PORT ? 3000

app.listen port, ->
  console.log("Server started on port #{port}")
