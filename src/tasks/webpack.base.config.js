(() => {
  const path = require('path');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  const exclude = [
    /bower_components/,
    /node_modules/,
    /vendor/,
    /web_modules/,
  ];

  const root = path.resolve(__dirname, '../');

  module.exports = {
    context: root,

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude,
        },
        {
          test: /\.css$/,
          loader: 'css-loader!postcss-loader',
        },
        {
          test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
          loader: 'url-loader?limit=32768',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-template-loader',
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate-loader!babel-loader',
          exclude,
        },
        {
          test: /\.(jpeg|jpg|gif|png|svg)(\?.+)?$/,
          loader: 'url-loader?limit=32768!image-webpack-loader',
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css-loader?root=../../../..!postcss-loader!sass-loader'),
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('css-loader?root=../../../..!postcss-loader!less-loader'),
        },
        {
          test: /jquery\.js$/,
          loader: 'expose-loader?$',
        },
        {
          test: /jquery\.js$/,
          loader: 'expose-loader?jQuery',
        },
        {
          test: /\.js$/,
          loader: 'imports-loader?this=>window!exports-loader?window.Modernizr',
          include: /modernizr/,
        },
      ],
    },

    output: {
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js',
      path: path.join(root, '../src/dist'),
      publicPath: '/src/dist/',
    },

    resolve: {
      alias: {
        fonts: path.join(root, 'ui/fonts'),
        img: path.join(root, 'ui/img'),
        js: path.join(root, 'ui/js'),
        styles: path.join(root, 'ui/styles'),
        vendor: path.join(root, 'ui/js/vendor'),

        modernizr: 'vendor/modernizr.custom.js',
      },
      modules: ['web_modules', 'node_modules', 'bower_components'],
    },
  };
})();
