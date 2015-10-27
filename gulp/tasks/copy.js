var gulp = require('gulp');

var config = require('../config');

gulp.task('copy', ['copySources', 'copyAssets']);

gulp.task('copySources', function () {
    return gulp.src([config.app.src+'**/*'])
        .pipe(gulp.dest(config.app.dist));
});

gulp.task('copyAssets', function() {
    return gulp.src([config.app.assets + '**/*'])
        .pipe(gulp.dest(config.app.dist));
});