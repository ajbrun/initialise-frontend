(() => {
  const extend = require('extend');
  const path = require('path');
  const webpack = require('webpack');

  // Load webpack plugins.
  const StyleLintPlugin = require('stylelint-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  // Clone base.
  const config = Object.create(require('./webpack.base.config'));

  const root = path.resolve(__dirname, '../');

  // Load base configuration.
  module.exports = extend(true, {}, config, {
    cache: false,
    devtool: '',

    entry: {
      head: ['modernizr'],
      main: [
        'styles/main.scss',
        'js/main',
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['../src/dist'], {
        root: path.resolve(__dirname, '..'),
      }),
      new ExtractTextPlugin('[name].css'),
      new webpack.DefinePlugin({
        DEBUG: false,
      }),
      new webpack.LoaderOptionsPlugin({
        jshint: {
          debug: false,
          emitErrors: true,
          esnext: true,
          failOnHint: true,
        },
        eslint: {
          ignorePath: path.join(root, '.eslintignore'),
        },
        minimize: true,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new StyleLintPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ],
  });
})();
