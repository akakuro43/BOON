const gulp = require('gulp')
const webp = require('gulp-webp')

const $ = require('../plugins')
const conf = require('../conf').toWebp

gulp.task('toWebp', () => {
  if (process.env.NODE_ENV == 'development') {
    srcPath = conf.src
    destPath = conf.dest
  } else {
    srcPath = conf.buildSrc
    destPath = conf.build
  }
  return gulp.src(srcPath)
    .pipe(webp({ quality: 50}))
    .pipe(gulp.dest(destPath))
})
