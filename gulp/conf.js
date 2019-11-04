// 設定ファイル
// 対象パスやオプションを指定

const DOMAIN = module.exports.DOMAIN = 'https://boon.com';
const DIR = module.exports.DIR = {
  PATH: '',
  SRC: 'src',
  DEST: 'dist',
  BUILD: 'docs'
};

const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
};

module.exports.scripts = {
  src: [
    `./${DIR.SRC}/**/*.js`,
  ],
  dest: {
    development: `./${DIR.DEST}${DIR.PATH}/assets/js`,
    production: `./${DIR.BUILD}/assets/js`,
  },
  wordpress: {
    development: `./${DIR.DEST_WP}/assets/js`,
    production: `./${DIR.DEST_WP}/assets/js`,
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
};

module.exports.pug = {
  src: [
    `${DIR.SRC}/**/*.pug`,
    `!${DIR.SRC}/**/_**/*.pug`,
    `!${DIR.SRC}/**/_*.pug`
  ],
  dest: `${DIR.DEST}${DIR.PATH}`,
  opts: {
    pretty: true
  },
  json: `${DIR.SRC}/data.json`,
};

module.exports.sass = {
  src: [
    `${DIR.SRC}/sass/**/*.{sass,scss}`,
    `!${DIR.SRC}/sass/**/_**/*.{sass,scss}`,
    `!${DIR.SRC}/sass/**/_*.{sass,scss}`
  ],
  dest: `${DIR.DEST}${DIR.PATH}/assets/css`,
  wordpress: `${DIR.DEST_WP}/assets/css`,
};

module.exports.replace = {
  html: {
    src: [
      `${DIR.DEST}${DIR.PATH}/**/*.html`
    ],
    dest: `${DIR.BUILD}`,
  }
};

module.exports.cleanCss = {
  src: `${DIR.DEST}${DIR.PATH}/assets/css/main.css`,
  dest: `${DIR.BUILD}/assets/css`,
};

module.exports.copy = {
  dest: {
    src: [
      `${DIR.SRC}/images/**/*.*`,
      `${DIR.SRC}/fonts/**/*.*`,
      `${DIR.SRC}/json/**/*.*`,
    ],
    dest: `${DIR.DEST}${DIR.PATH}/assets/`,
    wordpress: `${DIR.DEST_WP}/assets/`,
    opts: {
      base: `${DIR.SRC}`
    }
  },
  build: {
    src: [
      `${DIR.DEST}${DIR.PATH}/images/**/*.ico`,
      `${DIR.DEST}${DIR.PATH}/images/**/no_compress/*.*`,
      `${DIR.DEST}${DIR.PATH}/fonts/**/*.*`,
      `${DIR.DEST}${DIR.PATH}/json/**/*.*`,
    ],
    dest: `${DIR.BUILD}/assets/`,
    wordpress: `${DIR.DEST_WP}/assets/`,
    opts: {
      base: `${DIR.DEST}${DIR.PATH}`
    }
  },
};

module.exports.imagemin = {
  src: [
    `${DIR.SRC}${DIR.PATH}/images/**/*.{jpg,jpeg,png,gif,svg}`,
    `!${DIR.SRC}${DIR.PATH}/images/**/no_compress/*.*`,
  ],
  dest: `${DIR.BUILD}/assets/images`,
  opts: {
    pngquant: {
      quality: [.7, .8],
      speed: 1,
      floyd:0
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
};

module.exports.clean = {
  dest: {
    path: [`${DIR.DEST}`]
  },
  build: {
    path: [`${DIR.BUILD}`]
  },
  wordpress: {
    path: [`${DIR.DEST_WP}/assets`]
  },
};
