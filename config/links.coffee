# this is a normal CoffeeScript CommonJS module.
# so you can use strings interpolation, reuse variables, and everything

RPI_PRODUCTS = "https://www.raspberrypi.org/products"

module.exports =
  raspberrypi:
    aplus: "#{RPI_PRODUCTS}/model-a-plus/"
    bplus: "#{RPI_PRODUCTS}/model-b-plus/"
