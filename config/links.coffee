# this is a normal CoffeeScript CommonJS module.
# so you can use strings interpolation, reuse variables, and everything

RPI_PRODUCTS = 'https://www.raspberrypi.org/products'
BB_PRODUCTS = 'https://beagleboard.org'
GITHUB_MAIN = process.env.GITHUB_MAIN || 'https://github.com/balena-io'
GITHUB_PROJECTS = process.env.GITHUB_PROJECTS || 'https://github.com/balena-io-projects'
GITHUB_OS = process.env.GITHUB_OS || 'https://github.com/balena-os'
API_BASE = process.env.API_BASE || 'https://api.balena-cloud.com/'
MAIN_SITE = process.env.MAIN_SITE || 'https://balena.io'
DASHBOARD_SITE = process.env.DASHBOARD_SITE || 'https://dashboard.balena-cloud.com'

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