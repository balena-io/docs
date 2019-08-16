const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
const languages = require('./public/scripts/langs')

module.exports = {
  entry: path.resolve(__dirname, 'public/scripts/main.js'),
  output: {
    path: path.resolve(__dirname, 'public/docs/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      { test: /\.(woff2?|ttf|eot|svg|png|gif|jpg|jpeg)$/, use: 'url-loader?limit=10000' },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${languages.join('|')})$`)
    ),
    new ExtractTextPlugin('style.css')
  ]
};
