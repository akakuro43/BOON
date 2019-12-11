const gulp = require('gulp')

const conf = require('../conf').copy

gulp.task('copyToDest', () => {
  return gulp.src(conf.src, conf.dest.dest.opts)
    .pipe(gulp.dest(conf.dest.dest))
})

gulp.task('copyToBuild', () => {
  return gulp.src(conf.src, conf.build.dest.opts)
    .pipe(gulp.dest(conf.build.dest))
})
