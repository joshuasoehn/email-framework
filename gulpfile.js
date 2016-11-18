var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var inlineCss = require('gulp-inline-css');
var fileinclude = require('gulp-file-include');
var sendmail = require('gulp-mailgun');
var template = require('gulp-template');
var glob = require("glob")


var config = require('./config.json');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: "/panel/"
    });
});


// Build Panel
gulp.task('build-panel', function() {
    glob("./src/templates/*.html", {}, function(er, files) {
        var templates = files.map(function(file) {
            var pathArray = file.split("/");
            var fileName = pathArray[pathArray.length - 1];
            var templateName = fileName.split(".")[0];
            return {
                name: templateName,
                path: "/build/" + fileName
            };
        });
        return gulp.src('./src/panel/index.html')
            .pipe(template({
                templates: templates
            }))
            .pipe(gulp.dest('./panel'));
    });
});

// Build Templates
gulp.task('build-templates', function() {
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
    gulp.watch('./src/panel/**/*.html', ['build-panel', reload]);
    gulp.watch('./src/templates/**/*.html', ['build-templates', reload]);
    gulp.watch('./src/**/css/*.css', ['build-templates', reload]);
    gulp.watch('./**/*.html', reload);
    gulp.watch('./**/css/*.css', reload);
});

// Add ability to send test emails
gulp.task('send', function() {
    gulp.src('./build/basic-template.html')
        .pipe(sendmail({
            key: config.auth.mailgun.apikey,
            sender: config.testing.from,
            recipient: config.testing.to,
            subject: config.testing.subject
        }));
});

gulp.task('default', ['build-panel', 'browser-sync', 'build-templates', 'watch']);