const gulp = require('gulp')

const $ = require('../plugins')
const DOMAIN = require('../conf').DOMAIN
const DIR = require('../conf').DIR
const conf = require('../conf').pug

gulp.task('pug', () => {
  let destPath
  if (process.env.NODE_ENV == 'development') {
    destPath = conf.dest.development
  } else {
    destPath = conf.dest.production
  }

  const data = require(`../../${conf.json}`)
  data.meta.domain = DOMAIN
  data.meta.path = DIR.PATH
  return gulp.src(conf.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.data((file) => {
      return { data: data }
    }))
    .pipe($.pug(conf.opts))
    .pipe($.rename(path => {
      path.dirname = path.dirname.replace('html', '.')
    }))
    .pipe(gulp.dest(destPath))
})
