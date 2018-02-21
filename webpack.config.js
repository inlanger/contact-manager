const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.jsx$/,
        use: [
          'babel-loader'
        ],
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/gif'
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/jpg'
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 26000,
              mimetype: 'image/svg+xml'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
