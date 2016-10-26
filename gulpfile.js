var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var inlineCss = require('gulp-inline-css');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./src/templates/",
      index: "basic-template.html"
    }
  });
});

// Build Templates
gulp.task('build', function() {
  return gulp.src('./src/templates/*.html')
    .pipe(inlineCss())
    .pipe(gulp.dest('./build/'));
});

// Watch Files For Changes And Reload
gulp.task('watch', function() {
  gulp.watch('./src/templates/*.html', ['build', reload]);
  gulp.watch('./src/templates/css/*.css', ['build', reload]);
});

gulp.task('default', ['browser-sync', 'build', 'watch']);
