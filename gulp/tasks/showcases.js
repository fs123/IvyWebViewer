var gulp = require('gulp');

var config = require('../config');

gulp.task('showcases', ['build'], function() {
    gulp.start('showcasesCopyDemo');
});

gulp.task('showcasesCopyDemo', function () {
    return gulp.src([config.app.dist+'**/*'], { base: './' })
        .pipe(gulp.dest(config.demo.dist));
});