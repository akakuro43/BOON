const gulp = require('gulp')
const requireDir = require('require-dir')

const $ = require('./gulp/plugins')

requireDir('./gulp/tasks')

gulp.task('default', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'scripts', 'copyToDest', 'copyImage', 'toWebp'),
  gulp.parallel('serve', 'watch'),
))

gulp.task('build', gulp.series(
  'cleanDest',
  'cleanBuild',
  gulp.parallel('pug', 'sass', 'scripts', 'imagemin'),
  'copyToBuild',
  'toWebp'
))