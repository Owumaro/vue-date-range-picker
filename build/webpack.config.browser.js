const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(base, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-date-range-picker.browser.js',
    libraryTarget: 'window',
    library: 'DateRangePicker'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  externals: {
    moment: 'moment'
  }
})