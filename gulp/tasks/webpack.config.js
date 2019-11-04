// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    entry: './src/js/main.js',
  },
  
  output: {
    filename: 'main.js'
  },
  // resolve: {
  //   modules: ['node_modules'],
  //   extensions: ['.js', '.vue'],
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   }
  // },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   use: [
      //     {
      //       loader: "vue-loader"
      //     }
      //   ]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false }]]
            // presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.glsl$/,
        use: {
          loader: 'webpack-glsl-loader'
        }
      }
    ]
  },
  // devtool: (process.env.NODE_ENV == 'production') ? 'none' : 'source-map',
  plugins: [
    // new VueLoaderPlugin(),
  ],
}
