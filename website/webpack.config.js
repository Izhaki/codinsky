const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
  devServer: {
    port: 9009,
  },
};
