var browserify = require('browserify');
var gulp = require('gulp');

gulp.task('browserify', function () {
  return browserify('src/scripts/scripts.js')
    .bundle()
    .pipe(gulp.dest('src/js/'));
});
