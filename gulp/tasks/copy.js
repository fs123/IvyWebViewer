var gulp = require('gulp');

var config = require('../config');

gulp.task('copy', ['copySources','copyResources']);

gulp.task('copySources', function () {
    return gulp.src([config.app.src+'**/*'])
        .pipe(gulp.dest(config.app.dist));
});

gulp.task('copyResources', function () {
    return gulp.src([config.app.res+'**/*'], { base: './' })
        .pipe(gulp.dest(config.app.dist));
});