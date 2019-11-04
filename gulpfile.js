const gulp = require('gulp');
const requireDir = require('require-dir');

const $ = require('./gulp/plugins');

requireDir('./gulp/tasks');

gulp.task('default', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'scripts', 'copyToDest'),
  gulp.parallel('serve', 'watch'),
));

gulp.task('build', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'copyToBuild'),
  'cleanBuild',
  gulp.parallel('replaceHtml', 'cleanCss', 'scripts', 'imagemin'),
  'copyToBuild',
));


gulp.task('wp', gulp.series(
  'cleanDestWP',
  gulp.parallel('pug', 'sassWP', 'scriptsWP', 'copyToDestWP'),
  gulp.parallel('watchWP'),
));

gulp.task('buildWP', gulp.series(
  'cleanDest',
  gulp.parallel('sass', 'copyToDest'),
  'cleanBuild',
  gulp.parallel('replaceHtml', 'cleanCss', 'scripts', 'imagemin'),
  'copyToBuildWP',
));