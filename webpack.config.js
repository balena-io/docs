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
      {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      // Polyfills or mocks for various node stuff
			process: 'process/browser.js',
			Buffer: ['buffer', 'Buffer'],

    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${languages.join('|')})$`)
    ),
    new MiniCssExtractPlugin({filename: 'style.css'})
  ],
  resolve: {
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js',
      // 'handlebars': 'handlebars/runtime.js'
    },
    // Paths to look for modules.
		modules: ['node_modules'],
    // Extensions to search for when requiring files.
		extensions: ['.js', '.ts', '.tsx'],
    // Polyfills or mocks for various node stuff
    fallback: {
      fs: false,
      net: false,
      tls: false,
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve("url/"),
      util: require.resolve('util/'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
      process: require.resolve('process/browser'),
    },
  },

};
