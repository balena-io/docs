# this is a normal CoffeeScript CommonJS module.
# so you can use strings interpolation, reuse variables, and everything

RPI_PRODUCTS = "https://www.raspberrypi.org/products"
BB_PRODUCTS = "https://beagleboard.org"
DASHBOARD_URL = "https://dashboard.resin.io"

module.exports =
  raspberrypi:
    aplus: "#{RPI_PRODUCTS}/model-a-plus/"
    bplus: "#{RPI_PRODUCTS}/model-b-plus/"
  dashboard: DASHBOARD_URL
  beaglebone:
    black: "#{BB_PRODUCTS}/black"
    green: "#{BB_PRODUCTS}/green"
