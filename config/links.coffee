# this is a normal CoffeeScript CommonJS module.
# so you can use strings interpolation, reuse variables, and everything

RPI_PRODUCTS = 'https://www.raspberrypi.org/products'
BB_PRODUCTS = 'https://beagleboard.org'
GITHUB_MAIN = process.env.GITHUB_MAIN || 'https://github.com/resin-io'
GITHUB_PROJECTS = process.env.GITHUB_PROJECTS || 'https://github.com/resin-io-projects'
GITHUB_OS = process.env.GITHUB_OS || 'https://github.com/resin-os'
API_BASE = process.env.API_BASE || 'https://api.resin.io/'
MAIN_SITE = process.env.MAIN_SITE || 'https://resin.io'
DASHBOARD_SITE = process.env.DASHBOARD_SITE || 'https://dashboard.resin.io'

module.exports =
  raspberrypi:
    aplus: "#{RPI_PRODUCTS}/model-a-plus/"
    bplus: "#{RPI_PRODUCTS}/model-b-plus/"
  beaglebone:
    black: "#{BB_PRODUCTS}/black"
    green: "#{BB_PRODUCTS}/green"
  githubMain: GITHUB_MAIN
  githubProjects: GITHUB_PROJECTS
  githubOS: GITHUB_OS
  apiBase: API_BASE
  mainSiteUrl: MAIN_SITE
  dashboardUrl: DASHBOARD_SITE