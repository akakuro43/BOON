// 設定ファイル
// 対象パスやオプションを指定

const DOMAIN = module.exports.DOMAIN = 'https://boon.com'
const DIR = module.exports.DIR = {
  PATH: '',
  SRC: 'src',
  PUBLIC: 'public',
  DEST: 'dist',
  BUILD: 'docs'
}

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports.serve = {
  dest: {
    notify: false,
    startPath: `${DIR.PATH}/`,
    ghostMode: false,
    server: {
      baseDir: DIR.DEST,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.DEST}${DIR.PATH}`
      }
    }
  },
  build: {
    notify: false,
    startPath: DIR.PATH,
    ghostMode: false,
    server: {
      baseDir: DIR.BUILD,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.BUILD}/`
      }
    }
  }
}

module.exports.scripts = {
  src: [
    `./${DIR.SRC}/**/*.js`,
  ],
  dest: {
    development: `./${DIR.DEST}${DIR.PATH}/assets/js`,
    production: `./${DIR.BUILD}${DIR.PATH}/assets/js`,
  },
  webpack: {

    entry: {
      main: `./${DIR.SRC}/js/main.js`,
      // main2: `./${DIR.SRC}/js/main2.js`,
    },
    output: {
      filename: `[name].js`
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: "vue-loader"
            }
          ]
        },
        {
          test: /\.js$/,
          // exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
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
    plugins: [
      new VueLoaderPlugin()
    ],
  },
}

module.exports.pug = {
  src: [
    `${DIR.SRC}/**/*.pug`,
    `!${DIR.SRC}/**/_**/*.pug`,
    `!${DIR.SRC}/**/_*.pug`
  ],
  dest: {
    development: `${DIR.DEST}${DIR.PATH}`,
    production: `${DIR.BUILD}${DIR.PATH}`,
  },
  opts: {
    pretty: true
  },
  json: `${DIR.SRC}/data.json`,
}

module.exports.sass = {
  src: [
    `${DIR.SRC}/sass/**/*.{sass,scss}`,
    `!${DIR.SRC}/sass/**/_**/*.{sass,scss}`,
    `!${DIR.SRC}/sass/**/_*.{sass,scss}`
  ],
  dest: {
    development: `${DIR.DEST}${DIR.PATH}/assets/css`,
    production: `${DIR.BUILD}${DIR.PATH}/assets/css`,
  },
}

module.exports.copy = {
  src: [
    `${DIR.PUBLIC}/**/**/*.*`,
  ],
  dest: {
    dest: `${DIR.DEST}${DIR.PATH}/`,
    opts: {
      base: `${DIR.DEST}${DIR.PATH}`
    }
  },
  build: {
    dest: `${DIR.BUILD}${DIR.PATH}/`,
    opts: {
      base: `${DIR.BUILD}${DIR.PATH}`
    }
  },
}

module.exports.copyImage = {
  dest: {
    src: [
      `${DIR.SRC}/images/**/*.{jpg,jpeg,png,gif,svg}`,
    ],
    dest: `${DIR.DEST}${DIR.PATH}/assets/images`,
  }
}


module.exports.toWebp = {
  src: [
    `${DIR.SRC}/images/**/*.{jpg,jpeg,png,gif,svg}`,
    `!${DIR.SRC}/images/**/no_compress/*.*`,
  ],
  buildSrc: `${DIR.BUILD}${DIR.PATH}/assets/images/**/*.{jpg,jpeg,png,gif,svg}`,
  dest: `${DIR.DEST}${DIR.PATH}/assets/images`,
  build: `${DIR.BUILD}${DIR.PATH}/assets/images`
}

module.exports.imagemin = {
  src: [
    `${DIR.SRC}/images/**/*.{jpg,jpeg,png,gif,svg}`,
    `!${DIR.SRC}/images/**/no_compress/*.*`,
  ],
  dest: `${DIR.BUILD}${DIR.PATH}/assets/images`,
  opts: {
    pngquant: {
      quality: [.7, .8],
      speed: 1,
      floyd: 0
    },
    mozjpeg: {
      quality: 70,
      progressive: true,
    },
    svgo: {
      plugins: [
        { removeViewBox: false },
        { cleanupIDs: true },
      ]
    },
  }
}

module.exports.clean = {
  dest: {
    path: [`${DIR.DEST}`]
  },
  build: {
    path: [`${DIR.BUILD}`]
  }
}
