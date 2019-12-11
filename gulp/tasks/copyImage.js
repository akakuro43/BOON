const gulp = require('gulp')

const conf = require('../conf').copyImage

gulp.task('copyImage', () => {
  return gulp.src(conf.dest.src)
    .pipe(gulp.dest(conf.dest.dest))
})