const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : './src/index.js',
  output : {
    path : path.join(__dirname, './static'),
      filename : 'bundle.js'
  },
  module : {
    rules: [
      {
        test: /.jsx?$/,
        loader : 'babel-loader',
        include: path.resolve('src'),
        query : {
          presets : ['env', 'react']
        }
      },
      {
        test : /\.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options : {
              importLoaders : 1,
              modules: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
    }),
  ],
};