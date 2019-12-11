const gulp = require('gulp')
const browserSync = require('browser-sync')

const $ = require('../plugins')
const DIR = require('../conf').DIR

const reload = (done) => {
  browserSync.reload()
  done()
}

gulp.task('watch', () => {
  gulp.watch(
    [
      `./${DIR.SRC}/**/*.{scss,sass}`
    ],
    gulp.series('sass', reload)
  )

  gulp.watch(
    [
      `./${DIR.SRC}/**/*.pug`
    ],
    gulp.series(reload)
  )

  gulp.watch(
    [
      `./${DIR.SRC}/**/*.js`,
    ],
    gulp.series('scripts', reload)
  )

  gulp.watch(
    [
      `./${DIR.SRC}/images/**/*.{jpg,jpeg,png,gif,svg}`,
    ],
    gulp.series('copyImage', reload)
  )

  gulp.watch(
    [
      `./${DIR.PUBLIC}/**/**/*.*`,
    ],
    gulp.series('copyToDest', reload)
  )
})
