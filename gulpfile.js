var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

gulp.task('build', function() {
  gulp.src('./js/app.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./js/build'));
});

gulp.task('watch', function () {
  gulp.watch('./js/*', ['build', 'livereload']);
  gulp.watch('./css/*', ['livereload']);
});

gulp.task('connect', function() {
  connect.server({
    root : 'public',
    livereload : true
  });
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
});


gulp.task('livereload', function () {
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});


gulp.task('default', ['build', 'connect', 'watch', 'sass']);