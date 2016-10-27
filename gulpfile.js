var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var inlineCss = require('gulp-inline-css');
var fileinclude = require('gulp-file-include');
var sendmail = require('gulp-mailgun');
var gutil = require('gulp-util');

var config = require('./config.json');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Build Templates
gulp.task('build', function() {
  return gulp.src('./src/templates/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
      }))
    .pipe(inlineCss({
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('./build/'));
});

// Watch Files For Changes And Reload
gulp.task('watch', function() {
  gulp.watch('./src/*/*.html', ['build', reload]);
  gulp.watch('./src/*/css/*.css', ['build', reload]);
  gulp.watch('./*/*.html', ['build', reload]);
  gulp.watch('./*/css/*.css', ['build', reload]);
});

// Add ability to send test emails
gulp.task('send', function () {
  gulp.src( './build/basic-template.html')
  .pipe(sendmail({
    key: config.auth.mailgun.apikey,
    sender: config.testing.from,
    recipient: config.testing.to,
    subject: 'This is a test email'
  }));
});

gulp.task('default', ['browser-sync', 'build', 'watch']);
