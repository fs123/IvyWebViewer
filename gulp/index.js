var gulp = require('gulp');

/**
 * see
 * - https://github.com/greypants/gulp-starter/tree/2.0/gulpfile.js/tasks
 * - https://github.com/greypants/gulp-starter/tree/master/gulp/tasks
 */

module.exports = function(tasks) {
    tasks.forEach(function(name) {
        gulp.task(name, require('./tasks/' + name));
    });

    return gulp;
};