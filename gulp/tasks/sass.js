const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').sass;

gulp.task('sass', () => {
  let destPath
  if (process.env.NODE_ENV == 'development') {
    destPath = conf.dest.development
  } else {
    destPath = conf.dest.production
  }
  return gulp.src(conf.src)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      cascade: false
    }))
    .pipe($.rename(path => {
      path.dirname = path.dirname.replace('css', '.');
    }))
    .pipe(gulp.dest(destPath));
});
