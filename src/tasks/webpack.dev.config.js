(() => {
  const extend = require('extend');
  const path = require('path');
  const webpack = require('webpack');

  // Load webpack plugins.
  const StyleLintPlugin = require('stylelint-webpack-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  // Clone base.
  const config = Object.create(require('./webpack.base.config'));

  const root = path.resolve(__dirname, '../');

  // Load base configuration.
  module.exports = extend(true, {}, config, {
    cache: true,
    devtool: '#cheap-source-map',

    entry: {
      head: ['modernizr'],
      main: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true',
        'styles/main.scss',
        'js/main',
      ],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        DEBUG: true,
      }),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        eslint: {
          ignorePath: path.join(root, '.eslintignore'),
        },
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        warnings: true,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new StyleLintPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
  });
})();
