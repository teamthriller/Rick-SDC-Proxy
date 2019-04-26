// copied from Ian's component, not sure whether to use this
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, './ian-header-component/client/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        },
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js',
  }
};
