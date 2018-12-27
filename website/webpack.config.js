const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const alias = require('../aliases.config');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  mode: 'development',
  context: resolve(__dirname),
  devtool: 'inline-source-map',
  entry: './src/index.js',
  resolve: {
    alias,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve(__dirname, 'src'),
        options: {
          // Pick up our root babel.config.js
          rootMode: 'upward',
          presets: [
            [
              '@babel/preset-env',
              {
                // Do not transform ES6 modules to another format.
                // Webpack will take care of that.
                modules: false,
              },
            ],
          ],
        },
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
  output: {
    path: resolve('dist'),
    filename: 'index.js',
  },
  devServer: {
    port: 9009,
  },
};
