var gulp = require('gulp');

gulp.task('default', ['analyse'], function() {
    gulp.start('build');
});