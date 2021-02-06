const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.STATIC_FILES_BACKEND_URL': JSON.stringify(env.STATIC_FILES_BACKEND_URL) }),
    new HtmlWebpackPlugin({ template: './src/templates/index.html' }),
  ],
});
