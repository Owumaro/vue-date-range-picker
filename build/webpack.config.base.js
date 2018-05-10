const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'vue-style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ]
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}