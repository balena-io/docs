# this is a normal CoffeeScript CommonJS module.
# so you can use strings interpolation, reuse variables, and everything

RPI_PRODUCTS = 'https://www.raspberrypi.org/products'
BB_PRODUCTS = 'https://beagleboard.org'

module.exports =
  raspberrypi:
    aplus: "#{RPI_PRODUCTS}/raspberry-pi-1-model-a-plus/"
    bplus: "#{RPI_PRODUCTS}/raspberry-pi-1-model-b-plus/"
  beaglebone:
    black: "#{BB_PRODUCTS}/black"
    green: "#{BB_PRODUCTS}/green"
  githubMain: 'https://github.com/balena-io'
  githubProjects: 'https://github.com/balena-io-projects'
  githubPlayground: 'https://github.com/balena-io-playground'
  githubOS: 'https://github.com/balena-os'
  apiBase: process.env.API_BASE || 'https://api.balena-cloud.com'
  mainSiteUrl: 'https://balena.io'
  blogSiteUrl: 'https://balena.io/blog'
  osSiteUrl: 'https://www.balena.io/os'
  engineSiteUrl: 'https://www.balena.io/engine'
  dashboardUrl: process.env.DASHBOARD_SITE || 'https://dashboard.balena-cloud.com'
