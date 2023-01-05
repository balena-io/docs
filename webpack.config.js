const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const languages = require('./static/scripts/langs')

module.exports = {
  entry: path.resolve(__dirname, 'static/scripts/main.js'),
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new MiniCssExtractPlugin({filename: 'style.css'})
  ]
};
